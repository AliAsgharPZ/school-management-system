"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, Printer, ShieldX, Sprout } from "lucide-react";
import { LangProvider, useLang } from "@/lib/i18n";
import { faNumber } from "@/lib/persian";

type Assignment = { id: string; studentId: string; sessionNo: number; roomName: string; seatNo: number; studentName: string; studentNumber: string; className: string };
type MineCard = Assignment & { planId: string; planTitle: string; planDate: string };
type Detail = {
  plan: { id: string; title: string; date: string; sessions: number };
  schoolName: string;
  assignments: Assignment[];
};

/** کارت ورود به جلسه: هر کارت یک‌چهارم A5 (۱۰۵×۷۴٫۲۵ میلی‌متر)؛ هشت کارت روی هر برگ A4 */
function CardsInner() {
  const { t } = useLang();
  const params = useParams<{ planId: string }>();
  const [data, setData] = useState<Detail | null>(null);
  const [failed, setFailed] = useState(false);
  const [session, setSession] = useState(1);
  const [studentFilter, setStudentFilter] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const s = Number(q.get("session") ?? "1");
    setStudentFilter(q.get("student") ?? "");
    (async () => {
      try {
        const student = new URLSearchParams(window.location.search).get("student") ?? "";
        if (student) {
          // نمای دانش‌آموز/ولی: فقط کارت‌های خودشان از مسیر mine
          const res = await fetch("/api/exam-seats/mine");
          if (!res.ok) throw new Error();
          const json = (await res.json()) as { data?: { schoolName: string; cards: MineCard[] } };
          const mine = (json.data?.cards ?? []).filter((c) => c.planId === params.planId);
          if (!mine.length) throw new Error();
          const first = mine[0];
          setData({
            plan: { id: params.planId, title: first.planTitle, date: first.planDate, sessions: Math.max(...mine.map((c) => c.sessionNo)) },
            schoolName: json.data?.schoolName ?? "",
            assignments: mine,
          });
          const availableSessions = [...new Set(mine.map((card) => card.sessionNo))].sort((a, b) => a - b);
          setSession(availableSessions.includes(s) ? s : availableSessions[0] ?? 1);
          return;
        }
        const res = await fetch(`/api/exam-seats?id=${params.planId}`);
        if (!res.ok) throw new Error();
        const json = (await res.json()) as { data?: Detail } & Detail;
        const detail = json.data ?? json;
        setData(detail);
        setSession(Number.isInteger(s) && s >= 1 && s <= detail.plan.sessions ? s : 1);
      } catch {
        setFailed(true);
      }
    })();
  }, [params.planId]);

  const cards = (data?.assignments ?? []).filter((a) => a.sessionNo === session && (!studentFilter || a.studentId === studentFilter));
  const sheets = Array.from({ length: Math.ceil(cards.length / 8) }, (_, index) => cards.slice(index * 8, index * 8 + 8));

  async function handlePrint() {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((image) => image.decode().catch(() => undefined)));
    window.print();
  }

  return (
    <main className="min-h-dvh bg-white text-ink">
      <style>{`
        @page { size: A4 portrait; margin: 0; }
        .cards-sheet { display: grid; grid-template-columns: 105mm 105mm; grid-auto-rows: 74.25mm; grid-template-rows: repeat(4, 74.25mm); width: 210mm; min-height: 297mm; margin: 0 auto 12mm; }
        .exam-card { width: 105mm; height: 74.25mm; box-sizing: border-box; border: 0.4mm dashed var(--hairline); padding: 5mm 6mm; display: flex; flex-direction: column; gap: 2mm; break-inside: avoid; page-break-inside: avoid; overflow: hidden; }
        @media print { .cards-toolbar { display: none !important; } .cards-sheet { margin: 0; break-inside: avoid; page-break-inside: avoid; break-after: page; page-break-after: always; } .cards-sheet:last-child { break-after: auto; page-break-after: auto; } .exam-card { break-inside: avoid !important; page-break-inside: avoid !important; } }
      `}</style>

      <div className="cards-toolbar flex items-center gap-2 p-4 flex-wrap">
        <button type="button" className="b-btn b-btn-spring" onClick={handlePrint} disabled={!data}>
          <Printer className="w-4 h-4" />
          {t("examSeats.printCards")}
        </button>
        {data && data.plan.sessions > 1 && (
          <span className="flex gap-1.5" role="tablist" aria-label={t("examSeats.session")}>
            {Array.from({ length: data.plan.sessions }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                role="tab"
                aria-selected={session === n}
                onClick={() => setSession(n)}
                className={`b-pill-tab ${session === n ? "b-pill-tab-active" : ""}`}
              >
                {t("examSeats.session")} {faNumber(n)}
              </button>
            ))}
          </span>
        )}
        <Link href="/app/exam-seats" className="b-btn b-btn-ghost">
          {t("attendance.g.goApp")}
        </Link>
        {data && <span className="text-xs text-steel">{faNumber(cards.length)}</span>}
      </div>

      {failed ? (
        <div className="flex flex-col items-center gap-2 mt-16 text-center">
          <ShieldX className="w-10 h-10 text-danger" />
          <p className="font-bold">{t("attendance.g.invalid")}</p>
        </div>
      ) : !data ? (
        <Loader2 className="w-8 h-8 animate-spin text-spring mx-auto mt-16" />
      ) : (
        {cards.length === 0 ? (
          <p className="p-8 text-center text-sm text-steel">{t("common.empty")}</p>
        ) : (
          sheets.map((sheet, sheetIndex) => (
            <div key={sheetIndex} className="cards-sheet">
              {sheet.map((a) => (
            <section key={a.id} className="exam-card">
              <header className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-spring shrink-0" />
                <b className="text-sm truncate">{data.schoolName}</b>
                <span className="ms-auto text-xs text-steel shrink-0">{t("examSeats.card.exam")}</span>
              </header>
              <p className="text-xs text-steel truncate">
                {data.plan.title} · {faNumber(data.plan.date)}
              </p>
              <b className="text-xl leading-7 truncate">{a.studentName}</b>
              <div className="flex items-end gap-3 mt-auto">
                <span className="flex flex-col">
                  <span className="text-xs text-steel">{t("examSeats.card.seatNo")}</span>
                  <b className="text-4xl leading-9">{faNumber(a.seatNo)}</b>
                </span>
                <span className="flex flex-col gap-0.5 text-xs leading-4 pb-1">
                  <span>{t("examSeats.card.room")}: <b>{a.roomName}</b></span>
                  <span>{t("examSeats.card.session")}: <b>{faNumber(a.sessionNo)}</b> · {t("examSeats.card.class")}: <b>{a.className}</b></span>
                  <span>{t("examSeats.card.studentNo")}: <b dir="ltr">{a.studentNumber}</b></span>
                </span>
              </div>
            </section>
              ))}
            </div>
          ))
        )}
      )}
    </main>
  );
}

export default function ExamCardsPrintPage() {
  return (
    <LangProvider>
      <CardsInner />
    </LangProvider>
  );
}
