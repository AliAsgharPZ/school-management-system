#!/usr/bin/env node
/**
 * بهار | ساخت منیفست بسته‌های همراه سامانه (shipped packs)
 *
 * بسته‌های کامل زبان و کشور دیگر در باندل ورکر نیستند؛ در
 * `public/bahar-data/{languages,countries}` زندگی می‌کنند و در زمان اجرا
 * از Static Assets خوانده می‌شوند. این اسکریپت فقط خلاصه‌های کوچکی را که
 * باید همگام (sync) در دسترس باشند از همان فایل‌های واقعی می‌سازد:
 *
 * - `src/lib/country/manifest.json`: خلاصهٔ هر کشور (کد، نام، سطح پوشش،
 *   تعداد استان/شهر/روستا) — همان چیزی که `summarize()` در
 *   `src/lib/country/shipped.ts` می‌ساخت؛ ترتیب دقیقاً ترتیب
 *   SHIPPED_PACKS است (IR اول … BI آخر).
 * - `src/lib/langs/manifest.json`: شناسهٔ هر زبان (کد، نام، نام بومی،
 *   جهت) — همان چیزی که SITE_LANGS از SHIPPED_LANG_PACKS می‌گرفت؛
 *   ترتیب دقیقاً ترتیب SHIPPED_LANG_PACKS است (fa جداگانه اول می‌آید).
 *
 * اجرا: `node scripts/generate-country-manifest.mjs`
 * ورودی‌ها را از مکان نهایی‌شان (`public/bahar-data/...`) می‌خواند؛
 * اگر فایلی جا افتاده باشد یا ترتیب به‌هم بخورد، با خطا متوقف می‌شود —
 * هرگز خلاصهٔ ساختگی تولید نمی‌کند.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const countriesDir = join(root, "public", "bahar-data", "countries");
const languagesDir = join(root, "public", "bahar-data", "languages");

// ترتیب دقیق SHIPPED_PACKS در src/lib/country/shipped.ts (IR اول … BI آخر).
const COUNTRY_ORDER = [
  "ir", "ae", "sa", "de", "us", "fr", "it", "ca", "au", "es", "br", "tr",
  "gb", "se", "kr", "pl", "nl", "be", "af", "pk", "iq", "az", "cn", "jp",
  "eg", "kz", "uz", "mn", "np", "kh", "ad", "ag", "ai", "al", "ao", "am",
  "ar", "at", "aw", "bb", "ax", "ba", "bd", "bf", "bh", "bg", "bj", "bm",
  "bi",
];

// ترتیب دقیق SHIPPED_LANG_PACKS در src/lib/langs/shipped.ts.
const LANG_ORDER = [
  "en", "ar", "tr", "fr", "es", "de", "it", "pt", "ur", "az", "hi", "zh",
  "ja", "ko", "bn", "ru", "ak", "ab", "an", "as", "aa", "am", "be", "bg",
  "bh", "bi", "af", "ay", "ba",
];

function loadJson(path, label) {
  if (!existsSync(path)) throw new Error(`فایل پیدا نشد: ${label} (${path})`);
  return JSON.parse(readFileSync(path, "utf8"));
}

// روستاهای ایران در سطح استان (منبع: GeoNames — تفکیک شهرستان ندارد).
const irVillages = loadJson(join(countriesDir, "ir-villages.json"), "ir-villages.json");
const IR_PROVINCE_VILLAGE_COUNT = irVillages.provinces.reduce(
  (s, p) => s + p.villages.length, 0,
);

// همان منطق summarize() در src/lib/country/shipped.ts — کلمه‌به‌کلمه.
function summarize(pack) {
  const divisions = pack.divisions ?? [];
  const cities = divisions.reduce((s, d) => s + d.cities.length, 0);
  const cityVillages = divisions.reduce(
    (s, d) => s + d.cities.reduce((t, c) => t + c.villages.length, 0), 0,
  );
  const provinceVillages = pack.code === "IR" ? IR_PROVINCE_VILLAGE_COUNT : 0;
  const villages = cityVillages + provinceVillages;
  const level = cityVillages > 0 ? "استان + شهر + روستا"
    : provinceVillages > 0 ? "استان + شهر + روستا (روستاها در سطح استان)"
    : cities > 0 ? "استان + شهر (روستا هنوز وارد نشده)" : "استان";
  // regions/counties: همان چیزی که GET /api/countries از SHIPPED_PACKS می‌خواند.
  const regions = pack.regions ?? [];
  const counties = regions.reduce((s, r) => s + (r.counties?.length ?? 0), 0);
  // direction/calendar: آن‌ها هم از همان فایل واقعی می‌آیند تا GET /api/countries
  // بتواند از SHIPPED_SUMMARIES استفاده کند و لازم نباشد هر بار ۴۹ بسته را لود کند.
  return {
    code: pack.code, name: pack.name, nativeName: pack.nativeName,
    direction: pack.direction, calendar: pack.calendar,
    level, provinces: divisions.length, cities, villages,
    regions: regions.length, counties,
  };
}

const countryManifest = COUNTRY_ORDER.map((code) => {
  const pack = loadJson(join(countriesDir, `${code}.json`), `${code}.json`);
  if (pack.code.toLowerCase() !== code) {
    throw new Error(`کد داخل فایل با نام فایل نمی‌خواند: ${code}.json دارد ${pack.code}`);
  }
  return summarize(pack);
});

const langManifest = LANG_ORDER.map((code) => {
  const pack = loadJson(join(languagesDir, `${code}.json`), `${code}.json`);
  if (pack.code.toLowerCase() !== code) {
    throw new Error(`کد داخل فایل با نام فایل نمی‌خواند: ${code}.json دارد ${pack.code}`);
  }
  if (pack.direction !== "rtl" && pack.direction !== "ltr") {
    throw new Error(`جهت نامعتبر در ${code}.json: ${pack.direction}`);
  }
  return {
    code: pack.code, name: pack.name,
    nativeName: pack.nativeName, direction: pack.direction,
  };
});

const countryOut = join(root, "src", "lib", "country", "manifest.json");
const langOut = join(root, "src", "lib", "langs", "manifest.json");
writeFileSync(countryOut, JSON.stringify(countryManifest, null, 2) + "\n", "utf8");
writeFileSync(langOut, JSON.stringify(langManifest, null, 2) + "\n", "utf8");

const ir = countryManifest[0];
console.log(`کشورها: ${countryManifest.length} بسته — اول ${countryManifest[0].code}، آخر ${countryManifest.at(-1).code}`);
console.log(`ایران: ${ir.provinces} استان، ${ir.cities} شهر، ${ir.villages} روستا`);
console.log(`زبان‌ها: ${langManifest.length} بسته — اول ${langManifest[0].code}، آخر ${langManifest.at(-1).code}`);
console.log(`نوشته شد: ${countryOut}`);
console.log(`نوشته شد: ${langOut}`);
