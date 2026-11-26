"use client";
import { useEffect, useRef, useState } from "react";
import { Loader2, Inbox, AlertTriangle, RefreshCw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { faNumber } from "@/lib/persian";
import { useLang } from "@/lib/i18n";

export function CountUp({ value }: { value: number }) {
 const [shown,setShown]=useState(0); const ref=useRef(0);
 useEffect(()=>{
  const from=ref.current,to=value;
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.dataset.a11yMotion==="reduce";
  if(from===to||reduce){setShown(to);ref.current=to;return;}
  const start=performance.now(),duration=520;let frame=0;
  const tick=(now:number)=>{const p=Math.min(1,(now-start)/duration),e=1-Math.pow(1-p,3),v=Math.round(from+(to-from)*e);setShown(v);if(p<1)frame=requestAnimationFrame(tick);else ref.current=to;};
  frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);
 },[value]);
 return <><span aria-hidden="true">{faNumber(shown)}</span><span className="sr-only">{faNumber(value)}</span></>;
}

export function PageHeader({title,desc,action}:{title:string;desc?:string;action?:React.ReactNode;grad?:boolean}) {
 return <header data-bahar-page-heading className="no-print flex flex-wrap items-center justify-between gap-4"><div className="flex min-w-0 flex-col gap-1"><h1>{title}</h1>{desc?<p>{desc}</p>:null}</div>{action?<div className="flex shrink-0 flex-wrap items-center gap-2">{action}</div>:null}</header>;
}

type StatTone="spring"|"ink"|"blossom"|"soft"|"warning";
export function StatCard({icon:Icon,label,value,tone="spring",hint}:{icon:LucideIcon;label:string;value:React.ReactNode;tone?:StatTone;hint?:string}) {
 const display=typeof value==="number"?<CountUp value={value}/>:value;
 return <article data-bahar-kpi data-tone={tone} className="b-card-sm flex items-center gap-3"><span className="bahar-stat-icon flex shrink-0 items-center justify-center"><Icon className="h-5 w-5" aria-hidden="true"/></span><div className="flex min-w-0 flex-col gap-1"><span className="text-[22px] font-bold leading-tight tabular-nums">{display}</span><span className="text-[12px] leading-snug">{label}</span>{hint?<span className="text-[12px] leading-snug">{hint}</span>:null}</div></article>;
}

export function LoadingBlock({label}:{label?:string}) {
 const {t}=useLang(),text=label??t("common.loading");
 return <section className="bahar-loading-state flex flex-col gap-4 py-5" role="status" aria-label={text}>
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">{[0,1,2,3].map(i=><div key={i} className="b-card-sm flex items-center gap-3"><span className="h-10 w-10 shrink-0 rounded-lg b-shimmer"/><span className="flex flex-1 flex-col gap-2"><span className="h-3.5 w-2/3 rounded b-shimmer"/><span className="h-3 w-1/2 rounded b-shimmer"/></span></div>)}</div>
  <div className="b-card-sm flex flex-col gap-3">{[0,1,2].map(i=><span key={i} className="h-3.5 rounded b-shimmer" style={{width:`${88-i*14}%`}}/>)}</div>
  <span className="flex items-center justify-center gap-2 text-sm text-steel"><Loader2 className="h-4 w-4 animate-spin text-spring" aria-hidden="true"/>{text}</span>
 </section>;
}

export function EmptyState({icon:Icon=Inbox,title,desc,action}:{icon?:LucideIcon;title:string;desc?:string;action?:React.ReactNode}) {
 return <section className="b-card-sm bahar-empty-state flex flex-col items-center gap-3 text-center" aria-live="polite"><span className="flex items-center justify-center"><Icon className="h-5 w-5" aria-hidden="true"/></span><h3>{title}</h3>{desc?<p className="max-w-md">{desc}</p>:null}{action?<div className="mt-1 flex flex-wrap items-center justify-center gap-2">{action}</div>:null}</section>;
}

export function ErrorBox({message,onRetry}:{message:string;onRetry?:()=>void}) {
 const {t}=useLang();
 return <section role="alert" className="b-card-sm flex items-start gap-3 border border-[var(--v5-danger)] bg-[var(--v5-danger-bg)] p-4"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--v5-danger)]" aria-hidden="true"/><div className="min-w-0 flex-1 space-y-3"><p className="text-sm leading-7 text-text-primary">{message}</p>{onRetry?<button type="button" className="b-btn b-btn-outline inline-flex items-center gap-2" onClick={onRetry}><RefreshCw className="h-4 w-4" aria-hidden="true"/>{t("common.retry")}</button>:null}</div></section>;
}

export function RoleBadge({role}:{role:string}) {
 const {t}=useLang();
 const roles:Record<string,{label:string;tone:string}>={
  SUPER_ADMIN:{label:t("role.badge.superAdmin"),tone:"ink"},ADMIN:{label:t("role.badge.admin"),tone:"ink"},
  MANAGER:{label:t("role.badge.manager"),tone:"spring"},DEPUTY:{label:t("role.badge.deputy"),tone:"blossom"},
  TEACHER:{label:t("role.badge.teacher"),tone:"neutral"},CUSTODIAN:{label:t("role.badge.custodian"),tone:"neutral"},
  STUDENT:{label:t("role.badge.student"),tone:"neutral"},PARENT:{label:t("role.badge.parent"),tone:"neutral"}
 };
 const item=roles[role]??{label:role,tone:"neutral"};
 return <span className={`b-badge b-badge-${item.tone}`}>{item.label}</span>;
}
export function StatusBadge({ok,okLabel,badLabel}:{ok:boolean;okLabel:string;badLabel:string}) {
 return <span className={`b-badge ${ok?"b-badge-success":"b-badge-critical"}`}>{ok?okLabel:badLabel}</span>;
}
