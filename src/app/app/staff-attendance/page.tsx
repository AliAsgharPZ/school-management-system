"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ClipboardCheck, Loader2, Save, Trash2 } from "lucide-react";
import { apiGet, apiPost, apiDelete } from "@/lib/client";
import { PageHeader, EmptyState, LoadingBlock, ErrorBox } from "@/components/shared/bits";
import { Select, useConfirm } from "@/components/shared/pickers";
import { enDigits, todayKey } from "@/lib/persian";
import { useLang } from "@/lib/i18n";

type StaffMark = { status: string; checkIn: string; checkOut: string; note: string };
type StaffRow = {
  user: { id: string; firstName: string; lastName: string; role: string };
  record: { status: string; checkIn: string | null; checkOut: string | null; note: string | null } | null;
};
type MgrData = { manager: true; date: string; staff: StaffRow[] };
type OwnData = {
  manager: false;
  date: string;
  mine: Array<{ id: string; date: string; status: string; checkIn: string | null; checkOut: string | null; note: string | null }>;
};

const STATUS_OPTIONS = [
  { value: "PRESENT", tkey: "enum.attendance.PRESENT" },
  { value: "LATE", tkey: "dashboard.hint.late" },
  { value: "ABSENT", tkey: "dashboard.hint.absent" },
  { value: "LEAVE", tkey: "enum.staffAttendanceStatus.LEAVE" },
  { value: "MISSION", tkey: "enum.staffAttendanceStatus.MISSION" },
];
const STATUS_TKEY: Record<string, string> = Object.fromEntries(STATUS_OPTIONS.map((o) => [o.value, o.tkey]));
const ROLE_TKEY: Record<string, string> = {
  MANAGER: "common.manager",
  DEPUTY: "common.deputy",
  TEACHER: "common.teacher",
  CUSTODIAN: "role.custodian",
};

export default function StaffAttendancePage() {
  const { t } = useLang();
  const confirm = useConfirm();
  const [data, setData] = useState<MgrData | OwnData | null>(null);
  const [date, setDate] = useState(todayKey());
  const [dateDraft, setDateDraft] = useState(todayKey());
  const [marks, setMarks] = useState<Record<string, StaffMark>>({});
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const requestSequence = useRef(0);

  const load = useCallback((d: string) => {
    const requestId = ++requestSequence.current;
    setLoading(true);
    setLoadError(null);
    setData(null);
    apiGet<MgrData | OwnData>(`/api/staff-attendance?date=${encodeURIComponent(d)}`)
      .then((res) => {
        if (requestId !== requestSequence.current) return;
        setData(res);
        if (res.manager) {
          const next: Record<string, StaffMark> = {};
          for (const row of res.staff) {
            next[row.user.id] = {
              status: row.record?.status ?? "",
              checkIn: row.record?.checkIn ?? "",
              checkOut: row.record?.checkOut ?? "",
              note: row.record?.note ?? "",
            };
          }
          setMarks(next);
        } else {
          setMarks({});
        }
      })
      .catch((error: unknown) => {
        if (requestId !== requestSequence.current) return;
        setData(null);
        setLoadError(error instanceof Error ? error.message : t("common.errorShort"));
      })
      .finally(() => {
        if (requestId === requestSequence.current) setLoading(false);
      });
  }, [t]);

  useEffect(() => {
    load(date);
    return () => { requestSequence.current += 1; };
  }, [load, date]);

  function updateMark(userId: string, patch: Partial<StaffMark>) {
    setMarks((current) => ({
      ...current,
      [userId]: { status: "", checkIn: "", checkOut: "", note: "", ...current[userId], ...patch },
    }));
  }

  function applyDateDraft() {
    const normalized = enDigits(dateDraft.trim());
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(normalized);
    if (!match) {
      toast.error(t("common.invalidDate"));
      setDateDraft(date);
      return;
    }
    const month = Number(match[2]);
    const day = Number(match[3]);
    const maxDay = month <= 6 ? 31 : 30;
    if (month < 1 || month > 12 || day < 1 || day > maxDay) {
      toast.error(t("common.invalidDate"));
      setDateDraft(date);
      return;
    }
    setDate(normalized);
  }

  async function save() {
    if (!data?.manager) return;
    const records = Object.entries(marks)
      .filter(([, mark]) => Boolean(mark.status))
      .map(([userId, mark]) => ({
        userId,
        status: mark.status,
        checkIn: mark.checkIn || undefined,
        checkOut: mark.checkOut || undefined,
        note: mark.note || undefined,
      }));
    if (!records.length) {
      toast.error(t("common.errorShort"));
      return;
    }
    setBusy(true);
    try {
      const result = await apiPost<{ saved: number }>("/api/staff-attendance", { date, records });
      toast.success(`${result.saved} ${t("staffAttendance.nfr-sbt-shd")}`);
      load(date);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t("common.errorShort"));
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <LoadingBlock label={t("staffAttendance.hzvr-v-ghyab-karknan")} />;
  if (loadError || !data) {
    return <ErrorBox message={loadError || t("common.error")} onRetry={() => load(date)} />;
  }

  if (!data.manager) {
    return (
      <div className="flex flex-col gap-5">
        <PageHeader title={t("staffAttendance.hzvr-v-ghyab-mn")} desc={t("staffAttendance.svabq-hzvr-shma-dr-mdrsh")} />
        {data.mine.length === 0 ? (
          <EmptyState icon={ClipboardCheck} title={t("staffAttendance.sabqh-ay-nyst")} desc={t("staffAttendance.hnvz-hzvry-bray-shma-sbt-nshdh-ast")} />
        ) : (
          <section className="b-card-sm overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="bg-cloud text-steel">
                  <th scope="col" className="p-3 text-start">{t("common.date")}</th>
                  <th scope="col" className="p-3 text-start">{t("common.status")}</th>
                  <th scope="col" className="p-3 text-start">{t("auth.login.submit")}</th>
                  <th scope="col" className="p-3 text-start">{t("shell.logoutShort")}</th>
                  <th scope="col" className="p-3 text-start">{t("common.note")}</th>
                  <th scope="col" className="p-3 text-start">{t("common.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {data.mine.map((record) => (
                  <tr key={record.id} className="border-t border-hairline-soft">
                    <td className="p-3 font-semibold tabular-nums">{record.date}</td>
                    <td className="p-3">{t(STATUS_TKEY[record.status] ?? record.status)}</td>
                    <td className="p-3 tabular-nums" dir="ltr">{record.checkIn ?? "—"}</td>
                    <td className="p-3 tabular-nums" dir="ltr">{record.checkOut ?? "—"}</td>
                    <td className="p-3">{record.note ?? "—"}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        className="b-btn b-btn-ghost b-btn-sm text-destructive"
                        aria-label={t("staffAttendance.hzf-rkvrd")}
                        onClick={async () => {
                          const accepted = await confirm({ title: t("staffAttendance.ayn-rkvrd-hzvr-hzf-shvd"), danger: true });
                          if (!accepted) return;
                          try {
                            await apiDelete(`/api/staff-attendance?id=${encodeURIComponent(record.id)}`);
                            toast.success(t("staffAttendance.hzf-shd"));
                            load(date);
                          } catch (error) {
                            toast.error(error instanceof Error ? error.message : t("common.errorShort"));
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    );
  }

  const markedCount = Object.values(marks).filter((mark) => Boolean(mark.status)).length;

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        title={t("nav.staffAttendance")}
        desc={t("staffAttendance.sbt-rvzanh-hzvr-mdyr-maavn-malman-v-sraydar-mbnay-mrkhsy-v-hqvq")}
        action={
          <button type="button" className="b-btn b-btn-spring" disabled={busy || markedCount === 0 || dateDraft !== date} onClick={save}>
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {t("staffAttendance.sbt-hmh")}
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold" htmlFor="staff-attendance-date">
          {t("common.date")} ({t("staffAttendance.shmsy")}):
        </label>
        <input
          id="staff-attendance-date"
          type="text"
          className="b-input !w-44 tabular-nums"
          dir="ltr"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          placeholder="1404-08-05"
        />
        <button type="button" className="b-btn b-btn-outline b-btn-sm" onClick={applyDateDraft} disabled={dateDraft === date}>{t("common.apply")}</button>
        <span className="text-xs text-steel">{markedCount} / {data.staff.length}</span>
      </div>

      <section className="b-card-sm divide-y divide-hairline-soft">
        {data.staff.length === 0 ? (
          <div className="p-4">
            <EmptyState icon={ClipboardCheck} title={t("staffAttendance.karmndy-nyst")} desc={t("staffAttendance.karbr-faaly-ba-nqsh-karknan-dr-ayn-mdrsh-nyst")} />
          </div>
        ) : (
          data.staff.map((row) => {
            const mark = marks[row.user.id] ?? { status: "", checkIn: "", checkOut: "", note: "" };
            const fullName = `${row.user.firstName} ${row.user.lastName}`;
            return (
              <div key={row.user.id} className="grid grid-cols-1 gap-3 p-4 md:grid-cols-[minmax(12rem,1fr)_12rem_8rem_8rem_minmax(12rem,1.2fr)] md:items-center">
                <div className="min-w-0">
                  <b className="text-sm font-semibold">{fullName}</b>
                  <span className="block text-xs text-steel">{t(ROLE_TKEY[row.user.role] ?? row.user.role)}</span>
                </div>
                <Select
                  value={mark.status}
                  onChange={(value) => updateMark(row.user.id, { status: value })}
                  placeholder={t("users.notRegistered")}
                  options={STATUS_OPTIONS.map((option) => ({ value: option.value, label: t(option.tkey) }))}
                  ariaLabel={`${t("common.status")} ${fullName}`}
                />
                <label className="flex flex-col gap-1 text-xs text-steel">
                  <span>{t("auth.login.submit")}</span>
                  <input
                    type="time"
                    className="b-input w-full"
                    value={mark.checkIn}
                    onChange={(event) => updateMark(row.user.id, { checkIn: event.target.value })}
                    aria-label={`${t("auth.login.submit")} ${fullName}`}
                    dir="ltr"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs text-steel">
                  <span>{t("shell.logoutShort")}</span>
                  <input
                    type="time"
                    className="b-input w-full"
                    value={mark.checkOut}
                    onChange={(event) => updateMark(row.user.id, { checkOut: event.target.value })}
                    aria-label={`${t("shell.logoutShort")} ${fullName}`}
                    dir="ltr"
                  />
                </label>
                <label className="flex min-w-0 flex-col gap-1 text-xs text-steel">
                  <span>{t("common.note")}</span>
                  <input
                    type="text"
                    maxLength={200}
                    className="b-input w-full"
                    value={mark.note}
                    onChange={(event) => updateMark(row.user.id, { note: event.target.value })}
                  />
                </label>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
