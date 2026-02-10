import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
export const API_BASE_URL = rawBaseUrl.replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;

const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_STORAGE_KEY = "novafyp_http_cache_v1";

type CacheEntry = {
  ts: number;
  data: unknown;
};

const memoryCache = new Map<string, CacheEntry>();

const buildCacheKey = (url: string, config?: AxiosRequestConfig) => {
  const params = config?.params ?? null;
  return `${url}?${JSON.stringify(params)}`;
};

const readStorageCache = () => {
  if (typeof window === "undefined") {
    return {} as Record<string, CacheEntry>;
  }
  const raw = window.localStorage.getItem(CACHE_STORAGE_KEY);
  if (!raw) {
    return {} as Record<string, CacheEntry>;
  }
  try {
    return JSON.parse(raw) as Record<string, CacheEntry>;
  } catch {
    return {} as Record<string, CacheEntry>;
  }
};

const writeStorageCache = (data: Record<string, CacheEntry>) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(data));
};

const getCachedEntry = (key: string) => {
  const memoryEntry = memoryCache.get(key);
  if (memoryEntry) {
    return memoryEntry;
  }

  const storage = readStorageCache();
  const entry = storage[key];
  if (entry) {
    memoryCache.set(key, entry);
  }
  return entry;
};

const setCachedEntry = (key: string, entry: CacheEntry) => {
  memoryCache.set(key, entry);
  if (typeof window === "undefined") {
    return;
  }
  const storage = readStorageCache();
  storage[key] = entry;
  writeStorageCache(storage);
};

export async function cachedGet<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const key = buildCacheKey(url, config);
  const cached = getCachedEntry(key);
  const now = Date.now();

  if (cached && now - cached.ts < CACHE_TTL_MS) {
    return cached.data as T;
  }

  if (cached) {
    api
      .get(url, config)
      .then(({ data }) => {
        setCachedEntry(key, { ts: Date.now(), data });
      })
      .catch(() => undefined);
    return cached.data as T;
  }

  const { data } = await api.get(url, config);
  setCachedEntry(key, { ts: Date.now(), data });
  return data as T;
}
