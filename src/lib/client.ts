"use client";

import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";

// ============================================================
// بهار | ابزار کلاینت API
// ============================================================

export class ApiClientError extends Error {
  status: number;
  code: string;
  shad?: boolean;
  captchaRequired?: boolean;
  constructor(status: number, code: string, message: string, shad?: boolean, captchaRequired?: boolean) {
    super(message);
    this.status = status;
    this.code = code;
    this.shad = shad;
    this.captchaRequired = captchaRequired;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  });
  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    /* خالی */
  }
  if (!res.ok) {
    const err = (data as { error?: { code?: string; message?: string; captchaRequired?: boolean } })?.error;
    throw new ApiClientError(
      res.status,
      err?.code ?? "ERROR",
      err?.message ?? "خطای ارتباط با سرور",
      err?.code === "TOO_LONG_SHAD",
      err?.captchaRequired === true
    );
  }
  return data as T;
}

export const apiGet = <T,>(url: string) => request<T>(url);
export const apiPost = <T,>(url: string, body?: unknown) =>
  request<T>(url, { method: "POST", body: JSON.stringify(body ?? {}) });
export const apiPatch = <T,>(url: string, body?: unknown) =>
  request<T>(url, { method: "PATCH", body: JSON.stringify(body ?? {}) });
export const apiPut = <T,>(url: string, body?: unknown) =>
  request<T>(url, { method: "PUT", body: JSON.stringify(body ?? {}) });
export const apiDelete = <T,>(url: string) => request<T>(url, { method: "DELETE" });

/** هوک دریافت داده با رفرش دستی */
export function useApi<T>(url: string | null, deps: unknown[] = []) {
  const [state, setState] = useState<{
    url: string | null;
    data: T | null;
    loading: boolean;
    error: string | null;
  }>({ url, data: null, loading: !!url, error: null });

  const setData = useCallback<Dispatch<SetStateAction<T | null>>>((value) => {
    setState((current) => ({
      ...current,
      url,
      data: typeof value === "function"
        ? (value as (previous: T | null) => T | null)(current.url === url ? current.data : null)
        : value,
    }));
  }, [url]);

  const refetch = useCallback(async () => {
    if (!url) return;
    setState((current) => ({
      url,
      data: current.url === url ? current.data : null,
      loading: true,
      error: null,
    }));
    try {
      const d = await request<T>(url);
      setState({ url, data: d, loading: false, error: null });
    } catch (e) {
      setState((current) => ({
        url,
        data: current.url === url ? current.data : null,
        loading: false,
        error: e instanceof Error ? e.message : "خطا",
      }));
    }
  }, [url]);

  useEffect(() => {
    if (url) void refetch();
  }, [url, refetch, ...deps]);

  const visible = state.url === url
    ? state
    : { url, data: null, loading: !!url, error: null };

  return {
    data: visible.data,
    loading: visible.loading,
    error: visible.error,
    refetch,
    setData,
  };
}

/** هوک نظرسنجی دوره‌ای (پیام‌رسان) */
export function usePolling<T>(url: string | null, intervalMs = 6000) {
  const { data, loading, error, refetch, setData } = useApi<T>(url);
  useEffect(() => {
    if (!url) return;
    const id = setInterval(() => {
      request<T>(url).then(setData).catch(() => {});
    }, intervalMs);
    return () => clearInterval(id);
  }, [url, intervalMs, setData]);
  return { data, loading, error, refetch, setData };
}
