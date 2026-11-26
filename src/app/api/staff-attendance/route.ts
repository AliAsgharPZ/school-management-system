import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { requireUser, apiOk, apiErr, handleApiError, readJson, audit, actingSchoolIdFor, demoWriteBlock} from "@/lib/api";
import { enDigits, isValidCalendarDateKey, todayKey } from "@/lib/persian";

/* ============================================================
   بهار | حضور و غیاب کارکنان — ثبت روزانه توسط مدیریت،
   مشاهدهٔ سابقه برای خود کارمند
   ============================================================ */

const STATUSES = ["PRESENT", "ABSENT", "LATE", "LEAVE", "MISSION"] as const;
const STAFF_ROLES = ["MANAGER", "DEPUTY", "TEACHER", "CUSTODIAN"];

export async function GET(req: NextRequest) {
  try {
    const me = await requireUser(req);
    const schoolId = me.schoolId ?? actingSchoolIdFor(req, me) ?? null;
    if (!schoolId) return apiErr(400, "کاربر به مدرسه‌ای متصل نیست.", "NO_SCHOOL");
    const url = new URL(req.url);
    const date = url.searchParams.get("date") ?? todayKey();
    const isManager = me.role === "MANAGER" || me.role === "DEPUTY" || me.role === "SUPER_ADMIN" || me.role === "ADMIN";

    if (isManager) {
      const [staff, records] = await Promise.all([
        db.user.findMany({
          where: { schoolId, role: { in: STAFF_ROLES }, isActive: true },
          select: { id: true, firstName: true, lastName: true, role: true },
          orderBy: [{ role: "asc" }, { lastName: "asc" }],
        }),
        db.staffAttendance.findMany({ where: { schoolId, date } }),
      ]);
      const byUser = new Map(records.map((r) => [r.userId, r]));
      return apiOk({
        manager: true,
        date,
        staff: staff.map((u) => ({ user: u, record: byUser.get(u.id) ?? null })),
      });
    }

    const mine = await db.staffAttendance.findMany({
      where: { schoolId, userId: me.id },
      orderBy: { date: "desc" },
      take: 60,
    });
    return apiOk({ manager: false, date, mine });
  } catch (e) {
    return handleApiError(e);
  }
}

export async function POST(req: NextRequest) {
  try {
    const me = await requireUser(req, ["MANAGER", "DEPUTY", "SUPER_ADMIN", "ADMIN"]);
    const blocked = await demoWriteBlock(me);
    if (blocked) return blocked;
    const schoolId = me.schoolId ?? actingSchoolIdFor(req, me) ?? null;
    if (!schoolId) return apiErr(400, "کاربر به مدرسه‌ای متصل نیست.", "NO_SCHOOL");
    const body = await readJson<{
      date?: string;
      records?: Array<{ userId?: string; status?: string; checkIn?: string; checkOut?: string; note?: string }>;
    }>(req);
    const date = enDigits(String(body.date ?? todayKey()).trim());
    if (!isValidCalendarDateKey(date)) return apiErr(400, "تاریخ واردشده معتبر نیست.", "INVALID_DATE");
    const records = (body.records ?? []).slice(0, 500);
    if (!records.length) return apiErr(400, "رکوردی ارسال نشده است.", "EMPTY");

    const staffIds = new Set(
      (await db.user.findMany({ where: { schoolId, role: { in: STAFF_ROLES }, isActive: true }, select: { id: true } })).map((u) => u.id),
    );
    const seen = new Set<string>();
    const normalized = records.map((record) => {
      const userId = String(record.userId ?? "");
      const status = String(record.status ?? "");
      const checkIn = typeof record.checkIn === "string" ? enDigits(record.checkIn.trim()) : "";
      const checkOut = typeof record.checkOut === "string" ? enDigits(record.checkOut.trim()) : "";
      const note = typeof record.note === "string" ? record.note.trim().slice(0, 200) : "";
      return { userId, status, checkIn, checkOut, note };
    });

    for (const record of normalized) {
      if (!record.userId || !staffIds.has(record.userId)) {
        return apiErr(400, "یکی از کارکنان انتخاب‌شده معتبر نیست.", "INVALID_STAFF");
      }
      if (seen.has(record.userId)) return apiErr(400, "برای یک کارمند بیش از یک رکورد ارسال شده است.", "DUPLICATE_STAFF");
      seen.add(record.userId);
      if (!STATUSES.includes(record.status as (typeof STATUSES)[number])) {
        return apiErr(400, "وضعیت حضور و غیاب معتبر نیست.", "INVALID_STATUS");
      }
      if (record.checkIn && !/^([01]\d|2[0-3]):[0-5]\d$/.test(record.checkIn)) {
        return apiErr(400, "ساعت ورود معتبر نیست.", "INVALID_CHECK_IN");
      }
      if (record.checkOut && !/^([01]\d|2[0-3]):[0-5]\d$/.test(record.checkOut)) {
        return apiErr(400, "ساعت خروج معتبر نیست.", "INVALID_CHECK_OUT");
      }
      if (record.checkIn && record.checkOut && record.checkOut < record.checkIn) {
        return apiErr(400, "ساعت خروج نمی‌تواند زودتر از ساعت ورود باشد.", "INVALID_TIME_RANGE");
      }
    }

    let saved = 0;
    for (const record of normalized) {
      await db.staffAttendance.upsert({
        where: { userId_date: { userId: record.userId, date } },
        create: {
          schoolId, userId: record.userId, date, status: record.status,
          checkIn: record.checkIn || null,
          checkOut: record.checkOut || null,
          note: record.note || null,
        },
        update: {
          status: record.status,
          checkIn: record.checkIn || null,
          checkOut: record.checkOut || null,
          note: record.note || null,
        },
      });
      saved++;
    }
    await audit({ user: me, action: "ثبت حضور و غیاب کارکنان", entityType: "StaffAttendance", schoolId, meta: { date, saved } });
    return apiOk({ saved });
  } catch (e) {
    return handleApiError(e);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const me = await requireUser(req);
    const blocked = await demoWriteBlock(me);
    if (blocked) return blocked;
    const schoolId = me.schoolId ?? actingSchoolIdFor(req, me) ?? null;
    if (!schoolId) return apiErr(400, "کاربر به مدرسه‌ای متصل نیست.", "NO_SCHOOL");
    const id = new URL(req.url).searchParams.get("id") ?? "";
    if (!id) return apiErr(400, "شناسه لازم است.", "NO_ID");
    const row = await db.staffAttendance.findUnique({ where: { id }, select: { schoolId: true, userId: true } });
    if (!row) return apiErr(404, "رکورد یافت نشد.", "NOT_FOUND");
    const isMgr = ["MANAGER", "DEPUTY", "SUPER_ADMIN", "ADMIN"].includes(me.role);
    if (row.schoolId !== schoolId || (row.userId !== me.id && !isMgr)) {
      return apiErr(403, "دسترسی ندارید.", "FORBIDDEN");
    }
    await db.staffAttendance.delete({ where: { id } });
    await audit({ user: me, action: "حذف سابقهٔ حضور و غیاب کارکنان", entityType: "StaffAttendance", schoolId, meta: { id } });
    return apiOk({ ok: true });
  } catch (e) { return handleApiError(e); }
}
