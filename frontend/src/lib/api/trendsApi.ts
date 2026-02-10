import { cachedGet } from "@/lib/api/http";

export interface TrendData {
  domains?: Record<string, number>;
  technologies?: Record<string, number>;
  years?: Record<string, number>;
}

export async function getTrends(): Promise<TrendData> {
  return cachedGet<TrendData>("/trends");
}
