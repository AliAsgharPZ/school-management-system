import {
  CATALOG_KEYS,
  LONG_CATALOG,
  LONG_KEYS,
  SITE_CATALOG,
  SITE_KEYS,
  validateLanguagePack,
  validateLongPack,
  validateSitePack,
} from "../langs";

import langManifest from "./manifest.json";
import { loadLangPack } from "../shipped-assets";

/* ============================================================
   بهار | بسته‌های زبانِ همراه سامانه (shipped packs) — ۱۳ بسته، راند ۳
   کاتالوگ کامل = ۵۴۰ کلید (۲۰۰ اپ + ۳۰۱ سایت + ۳۹ متن بلند). هشت بستهٔ
   بازبینی‌شده (انگلیسی، عربی، ترکی، فرانسوی، اسپانیایی، آلمانی، ایتالیایی،
   پرتغالی) فعلاً فقط اپ را کامل دارند (۲۰۰/۲۰۰) و سایت/بلندشان در دست ترجمه
   است؛ پنج بستهٔ دستیِ بدون بازبینی تخصصی: اردو، آذربایجانی، هندی (اپ کامل،
   سایت/بلند صفر) و چینی و ژاپنی از z.ai (اپ کامل + ۱۳۳/۳۰۱ سایت مرحلهٔ ۱،
   بلند صفر — تکمیل مرحلهٔ ۲ در راه است). کلیدهای ترجمه‌نشده به فارسی پایه
   بازمی‌گردند. فهرست نام همهٔ زبان‌های جهان (بدون ترجمه) جداگانه در
   ./world.ts است و بستهٔ کامل شمرده نمی‌شود.
   ============================================================ */

type LangManifestEntry = {
  code: string;
  name: string;
  nativeName: string;
  direction: "rtl" | "ltr";
};

const LANG_MANIFEST = langManifest as LangManifestEntry[];

export type ShippedLangPack = {
  code: string;
  name: string;
  nativeName: string;
  direction: "rtl" | "ltr";
  strings: Record<string, string>;
  keyCount: number;
  coverage: number;
  missingKeys: string[];
  /** جملات سایت عمومی (کاتالوگ SITE) — جدا از کلیدهای اپ، با fallback فارسی. */
  siteStrings: Record<string, string>;
  siteKeyCount: number;
  siteCoverage: number;
  siteMissingKeys: string[];
  /** متن‌های بلند (FAQ، پاراگراف‌های کیت) — جدا از SITE، با fallback فارسی. */
  longStrings: Record<string, string>;
  longKeyCount: number;
  longCoverage: number;
  longMissingKeys: string[];
};

type LanguagePackInput = {
  code: string;
  name: string;
  nativeName: string;
  direction: string;
  strings: Record<string, string>;
  siteStrings?: Record<string, string>;
  longStrings?: Record<string, string>;
};

function build(pack: LanguagePackInput): ShippedLangPack {
  const result = validateLanguagePack(pack);
  const siteResult = validateSitePack(pack);
  const longResult = validateLongPack(pack.longStrings);

  const missingKeys = CATALOG_KEYS.filter(
    (k) => !(k in pack.strings),
  );

  const siteStrings = pack.siteStrings ?? {};
  const siteMissingKeys = SITE_KEYS.filter(
    (k) => !(k in siteStrings),
  );

  const longStrings = pack.longStrings ?? {};
  const longMissingKeys = LONG_KEYS.filter(
    (k) => !(k in longStrings),
  );

  return {
    code: pack.code,
    name: pack.name,
    nativeName: pack.nativeName,
    direction: pack.direction as "rtl" | "ltr",

    strings: pack.strings,
    keyCount: result.stats.keyCount,
    coverage: result.stats.coverage,
    missingKeys,

    siteStrings,
    siteKeyCount: siteResult.stats.keyCount,
    siteCoverage: siteResult.stats.coverage,
    siteMissingKeys,

    longStrings,
    longKeyCount: longResult.stats.keyCount,
    longCoverage: longResult.stats.coverage,
    longMissingKeys,
  };
}

const builtPackCache = new Map<string, Promise<ShippedLangPack>>();

function builtLangPack(code: string): Promise<ShippedLangPack> {
  const normalized = code.toLowerCase();

  const cached = builtPackCache.get(normalized);
  if (cached) return cached;

  const pending = loadLangPack(normalized)
    .then((pack) => build(pack))
    .catch((error) => {
      builtPackCache.delete(normalized);
      throw error;
    });

  builtPackCache.set(normalized, pending);

  return pending;
}

let allPacksPromise: Promise<ShippedLangPack[]> | null = null;

/** بارگذاری همهٔ بسته‌های همراه سامانه به ترتیب manifest. */
export function getShippedLangPacks(): Promise<ShippedLangPack[]> {
  if (!allPacksPromise) {
    allPacksPromise = Promise.all(
      LANG_MANIFEST.map((entry) => builtLangPack(entry.code)),
    ).catch((error) => {
      allPacksPromise = null;
      throw error;
    });
  }

  return allPacksPromise;
}

/** دریافت بستهٔ همراه سامانه بر اساس کد زبان. */
export async function shippedLangPack(
  code: string,
): Promise<ShippedLangPack | null> {
  if (!code) return null;

  const normalized = code.toLowerCase();

  const exists = LANG_MANIFEST.some(
    (entry) => entry.code.toLowerCase() === normalized,
  );

  if (!exists) return null;

  return builtLangPack(normalized);
}

/** جملات سایت برای یک زبان — فارسی پایه + ترجمهٔ بسته (فقدان = فارسی). */
export async function siteStringsFor(
  code: string,
): Promise<{
  code: string;
  direction: "rtl" | "ltr";
  siteStrings: Record<string, string>;
}> {
  const pack =
    code && code.toLowerCase() !== "fa"
      ? await shippedLangPack(code)
      : null;

  if (!pack) {
    return {
      code: "fa",
      direction: "rtl",
      siteStrings: SITE_CATALOG,
    };
  }

  return {
    code: pack.code,
    direction: pack.direction,
    siteStrings: {
      ...SITE_CATALOG,
      ...pack.siteStrings,
    },
  };
}

/** متن‌های بلند برای یک زبان — فارسی پایه + ترجمهٔ بسته (فقدان = فارسی). */
export async function longStringsFor(
  code: string,
): Promise<{
  code: string;
  direction: "rtl" | "ltr";
  longStrings: Record<string, string>;
}> {
  const pack =
    code && code.toLowerCase() !== "fa"
      ? await shippedLangPack(code)
      : null;

  if (!pack) {
    return {
      code: "fa",
      direction: "rtl",
      longStrings: LONG_CATALOG,
    };
  }

  return {
    code: pack.code,
    direction: pack.direction,
    longStrings: {
      ...LONG_CATALOG,
      ...pack.longStrings,
    },
  };
}

/** زبان‌های قابل انتخاب در سایت عمومی (فارسی + بسته‌های همراه). */
export const SITE_LANGS: {
  code: string;
  nativeName: string;
  direction: "rtl" | "ltr";
}[] = [
  {
    code: "fa",
    nativeName: "فارسی",
    direction: "rtl",
  },
  ...LANG_MANIFEST.map((pack) => ({
    code: pack.code,
    nativeName: pack.nativeName,
    direction: pack.direction,
  })),
];

/** پوشش کاتالوگ به تفکیک دامنه (بخش پیش از نقطهٔ کلید). */
export function catalogDomains(): Record<string, number> {
  const out: Record<string, number> = {};

  for (const k of CATALOG_KEYS) {
    const d = k.split(".")[0];
    out[d] = (out[d] ?? 0) + 1;
  }

  return out;
}
