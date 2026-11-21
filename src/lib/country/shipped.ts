import type { CountryProfile } from "./types";
import countryManifest from "./manifest.json";
import {
  loadCountryPack,
  loadIrVillages,
} from "../shipped-assets";

/* ============================================================
   بهار | بسته‌های کشورِ همراه سامانه (shipped packs)
   این‌ها دادهٔ محصول‌اند و با کد سامانه می‌آیند؛ واردات بستهٔ
   تازه (سوپرادمین، از مسیر /api/countries) جداگانه در پایگاه
   داده ذخیره می‌شود و این رجیستری را تغییر نمی‌دهد.
   صادقانه: روستاهای ایران در سطح استان وارد شده‌اند (۵۲٬۲۲۵ نام از
   GeoNames، بدون تفکیک شهرستان — چون منبع، شهرستان را ندارد)؛
   divisions تا سطح روستا را دارد ولی فهرست روستاهای هر شهر هنوز
   خالی است. امارات و عربستان هنوز روستا ندارند. آلمان، آمریکا،
   فرانسه و ایتالیا فقط در سطح استان/ایالت‌اند (بدون شهر و روستا)؛
   کانادا (۱۳)، استرالیا (۸)، اسپانیا (۱۹)، برزیل (۲۷)، ترکیه (۸۱)
   و بریتانیا (۴) نیز در همین سطح‌اند. مقیاس نمره و فهرست پایه‌هایشان عمومی است، نه نظام رسمی کشور.
   ============================================================ */

export type ShippedPackSummary = {
  code: string;
  name: string;
  nativeName: string;
  // direction و calendar هم از همان فایل واقعی هر کشور در manifest آمده‌اند،
  // تا GET /api/countries بتواند از SHIPPED_SUMMARIES استفاده کند.
  direction: string;
  calendar: string;
  level: string; // سطح پوشش واقعی، نه ادعا
  provinces: number;
  cities: number;
  villages: number;
  regions: number;
  counties: number;
};

type CountryManifestEntry = ShippedPackSummary;

const COUNTRY_MANIFEST =
  countryManifest as CountryManifestEntry[];

export const SHIPPED_SUMMARIES: ShippedPackSummary[] =
  COUNTRY_MANIFEST.map((entry) => ({
    code: entry.code,
    name: entry.name,
    nativeName: entry.nativeName,
    direction: entry.direction,
    calendar: entry.calendar,
    level: entry.level,
    provinces: entry.provinces,
    cities: entry.cities,
    villages: entry.villages,
    regions: entry.regions,
    counties: entry.counties,
  }));

export const SHIPPED_CODES: string[] =
  SHIPPED_SUMMARIES.map((pack) => pack.code);

const iranSummary = SHIPPED_SUMMARIES.find(
  (pack) => pack.code.toUpperCase() === "IR",
);

if (!iranSummary) {
  throw new Error(
    "Invalid country manifest: the IR country summary is missing.",
  );
}

// روستاهای ایران در سطح استان (منبع: GeoNames — تفکیک شهرستان ندارد).
export const IR_PROVINCE_VILLAGE_COUNT = iranSummary.villages;

let allPacksPromise: Promise<CountryProfile[]> | null = null;

/** بارگذاری همهٔ بسته‌های کشور همراه سامانه، به ترتیب manifest. */
export function getShippedPacks(): Promise<CountryProfile[]> {
  if (!allPacksPromise) {
    allPacksPromise = Promise.all(
      SHIPPED_CODES.map((code) => loadCountryPack(code)),
    ).catch((error) => {
      allPacksPromise = null;
      throw error;
    });
  }

  return allPacksPromise;
}

/** دریافت بستهٔ کشور همراه سامانه بر اساس کد کشور. */
export async function shippedPack(
  code: string,
): Promise<CountryProfile | null> {
  if (!code) return null;

  const normalized = code.toUpperCase();

  if (!SHIPPED_CODES.some((item) => item.toUpperCase() === normalized)) {
    return null;
  }

  return loadCountryPack(normalized);
}

/** روستاهای یک استان — فقط برای ایران؛ برای سایر کشورها آرایهٔ خالی. */
export async function provinceVillagesFor(
  code: string,
  province: string,
): Promise<string[]> {
  if (code.toUpperCase() !== "IR") {
    return [];
  }

  const data = await loadIrVillages();

  const found = data.provinces.find(
    (item) => item.province === province,
  );

  return found?.villages ?? [];
}

export async function placesFor(
  code: string,
  province?: string,
  city?: string,
): Promise<{
  provinces: string[];
  cities: string[];
  villages: string[];
  provinceVillages: number;
} | null> {
  const pack = await shippedPack(code);

  if (!pack || !pack.divisions) {
    return null;
  }

  const provinces = pack.divisions.map(
    (division) => division.province,
  );

  if (!province) {
    return {
      provinces,
      cities: [],
      villages: [],
      provinceVillages: 0,
    };
  }

  const division = pack.divisions.find(
    (item) => item.province === province,
  );

  if (!division) {
    return {
      provinces,
      cities: [],
      villages: [],
      provinceVillages: 0,
    };
  }

  const cities = division.cities.map((item) => item.name);
  const provinceVillages = (
    await provinceVillagesFor(code, province)
  ).length;

  if (!city) {
    return {
      provinces,
      cities,
      villages: [],
      provinceVillages,
    };
  }

  const found = division.cities.find(
    (item) => item.name === city,
  );

  return {
    provinces,
    cities,
    villages: found ? found.villages : [],
    provinceVillages,
  };
}
