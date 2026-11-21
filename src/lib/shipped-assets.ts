import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { LanguagePack } from "./langs";
import type { CountryProfile } from "./country/types";

export type ShippedLanguageAsset = LanguagePack & {
  siteStrings?: Record<string, string>;
  longStrings?: Record<string, string>;
};

export type IrVillagesData = {
  provinces: {
    province: string;
    villages: string[];
  }[];
};

type StaticAssetsBinding = {
  fetch(request: Request): Promise<Response>;
};

type CloudflareEnv = {
  ASSETS?: StaticAssetsBinding;
};

const cache = new Map<string, Promise<unknown>>();

function getAssetsBinding(): StaticAssetsBinding {
  try {
    const env = getCloudflareContext().env as CloudflareEnv;

    if (env?.ASSETS) {
      return env.ASSETS;
    }
  } catch {
    // خارج از درخواست Cloudflare یا بدون request context
  }

  throw new Error(
    "Bahar shipped assets are unavailable: Cloudflare ASSETS binding was not found. " +
      "Run this code in a Cloudflare/OpenNext request context with the existing ASSETS binding.",
  );
}

async function fetchJson<T>(path: string): Promise<T> {
  const assets = getAssetsBinding();

  const request = new Request(
    `https://bahar-static-assets.local${path}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    },
  );

  const response = await assets.fetch(request);

  if (!response.ok) {
    throw new Error(
      `Failed to load Bahar static asset "${path}": HTTP ${response.status} ${response.statusText}`,
    );
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new Error(
      `Invalid JSON in Bahar static asset "${path}": ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
}

function loadCached<T>(key: string, path: string): Promise<T> {
  const existing = cache.get(key);

  if (existing) {
    return existing as Promise<T>;
  }

  const pending = fetchJson<T>(path).catch((error) => {
    // خطا cache نمی‌شود؛ درخواست بعدی می‌تواند دوباره تلاش کند.
    cache.delete(key);
    throw error;
  });

  cache.set(key, pending);

  return pending;
}

/** بارگذاری بستهٔ زبان از Static Assets. */
export function loadLangPack(
  code: string,
): Promise<ShippedLanguageAsset> {
  const normalized = code.trim().toLowerCase();

  if (!/^[a-z][a-z0-9-]{1,14}$/.test(normalized)) {
    throw new Error(`Invalid shipped language code: "${code}"`);
  }

  return loadCached<ShippedLanguageAsset>(
    `languages/${normalized}`,
    `/bahar-data/languages/${normalized}.json`,
  );
}

/** بارگذاری پروفایل کامل کشور از Static Assets. */
export function loadCountryPack(
  code: string,
): Promise<CountryProfile> {
  const normalized = code.trim().toLowerCase();

  if (!/^[a-z]{2}$/.test(normalized)) {
    throw new Error(`Invalid shipped country code: "${code}"`);
  }

  return loadCached<CountryProfile>(
    `countries/${normalized}`,
    `/bahar-data/countries/${normalized}.json`,
  );
}

/** بارگذاری فهرست روستاهای ایران از Static Assets. */
export function loadIrVillages(): Promise<IrVillagesData> {
  return loadCached<IrVillagesData>(
    "countries/ir-villages",
    "/bahar-data/countries/ir-villages.json",
  );
}
