"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Inbox, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { faNumber } from "@/lib/persian";
import { useLang } from "@/lib/i18n";

/** شمارندهٔ متحرک اعداد (الگوی NumberTicker) — از صفر تا مقدار با شتاب‌نرم */
export function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);
  const ref = useRef<number>(0);
  useEffect(() => {
    const from = ref.current;
    const to = value;
    const reduceMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.a11yMotion === "reduce";
    if (from === to || reduceMotion) {
      setShown(to);
      ref.current = to;
      return;
    }
    const start = performance.now();
    const dur = 700;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(from + (to - from) * eased);
      setShown(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
      else ref.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <>
      <span aria-hidden="true">{faNumber(shown)}</span>
      <span className="sr-only">{faNumber(value)}</span>
    </>
  );
}

export function PageHeader({
  title, desc, action, grad = false,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
  grad?: boolean;
}) {
  return (
    <header data-bahar-page-heading className="no-print flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h1 className="text-[24px] md:text-[30px] font-semibold leading-[1.35] text-ink">
          {grad ? <span className="b-grad-text">{title}</span> : title}
        </h1>
        {desc && <p className="text-sm text-steel max-w-3xl leading-7">{desc}</p>}
      </div>
      {action && <div className="flex items-center gap-2 flex-wrap shrink-0">{action}</div>}
    </header>
  );
}

export function StatCard({
  icon: Icon, label, value, tone = "spring", hint,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  tone?: "spring" | "ink" | "blossom" | "soft" | "warning";
  hint?: string;
}) {
  const display = typeof value === "number" ? <CountUp value={value} /> : value;
  const tones: Record<string, string> = {
    spring: "bg-spring text-primary-foreground",
    ink: "bg-invert text-invert-foreground",
    blossom: "bg-blossom text-blossom-foreground",
    soft: "bg-spring-tint text-spring",
    warning: "bg-warning text-warning-foreground",
  };
  return (
    <article className="b-card-sm b-rise b-card-hover bahar-stat-card p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
      <span className={`bahar-stat-icon w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon className="w-5 h-5" />
      </span>
      <div className="flex flex-col min-w-0 gap-1">
        <span className="text-[22px] sm:text-[25px] font-bold leading-tight tracking-tight tabular-nums">{display}</span>
        <span className="text-[12px] text-steel leading-snug line-clamp-2 [word-break:break-word]">{label}</span>
        {hint && <span className="text-[12px] text-stone truncate">{hint}</span>}
      </div>
    </article>
  );
}

export function LoadingBlock({ label }: { label?: string }) {
  const { t } = useLang();
  const text = label ?? t("common.loading");
  return (
    <div className="flex flex-col gap-4 py-6" role="status" aria-label={text}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="b-card-sm p-5 flex items-center gap-4">
            <span className="w-11 h-11 rounded-full b-shimmer shrink-0" />
            <span className="flex flex-col gap-2 flex-1">
              <span className="h-4 w-2/3 rounded-md b-shimmer" />
              <span className="h-3 w-1/2 rounded-md b-shimmer" />
            </span>
          </div>
        ))}
      </div>
      <div className="b-card-sm p-6 flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-4 rounded-md b-shimmer" style={{ width: `${88 - i * 14}%` }} />
        ))}
      </div>
      <span className="flex items-center justify-center gap-2 text-steel t-sm">
        <Loader2 className="w-4 h-4 animate-spin text-spring" /> {text}
      </span>
    </div>
  );
}

export function EmptyState({
  icon: Icon = Inbox, title, desc, action,
}: {
  icon?: LucideIcon;
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="b-card-sm bahar-empty-state px-6 py-10 flex flex-col items-center text-center gap-3" aria-live="polite">
      <span className="w-12 h-12 rounded-xl bg-spring-tint text-spring flex items-center justify-center">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </span>
      <h3 className="font-semibold text-base text-ink">{title}</h3>
      {desc && <p className="text-sm text-steel max-w-md leading-7">{desc}</p>}
      {action}
    </section>
  );
}

export function ErrorBox({ message, onRetry }: { message: string; onRetry?: () => void }) {
  const { t } = useLang();
  return (
    <div role="alert" className="b-card-sm !border-destructive/30 bg-destructive/5 p-4 flex items-start gap-3 text-destructive">
      <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0 space-y-3">
        <span className="text-[14px] font-medium leading-relaxed block">{message}</span>
        {onRetry && (
          <button type="button" className="b-btn b-btn-ghost min-h-11" onClick={onRetry}>
            {t("common.retry")}
          </button>
        )}
      </div>
    </div>
  );
}

export function RoleBadge({ role }: { role: string }) {
  const { t } = useLang();
  const map: Record<string, string> = {
    SUPER_ADMIN: "b-badge-ink",
    ADMIN: "b-badge-ink",
    MANAGER: "b-badge-spring",
    DEPUTY: "b-badge-blossom",
    TEACHER: "b-badge-neutral",
    CUSTODIAN: "b-badge-neutral",
    STUDENT: "b-badge-neutral",
    PARENT: "b-badge-neutral",
  };
  const labels: Record<string, string> = {
    SUPER_ADMIN: t("role.badge.superAdmin"),
    ADMIN: t("role.badge.admin"),
    MANAGER: t("role.badge.manager"),
    DEPUTY: t("role.badge.deputy"),
    TEACHER: t("role.badge.teacher"),
    CUSTODIAN: t("role.badge.custodian"),
    STUDENT: t("role.badge.student"),
    PARENT: t("role.badge.parent"),
  };
  return <span className={`b-badge ${map[role] ?? "b-badge-neutral"}`}>{labels[role] ?? role}</span>;
}

export function StatusBadge({ ok, okLabel, badLabel }: { ok: boolean; okLabel: string; badLabel: string }) {
  return <span className={`b-badge ${ok ? "b-badge-success" : "b-badge-critical"}`}>{ok ? okLabel : badLabel}</span>;
}
