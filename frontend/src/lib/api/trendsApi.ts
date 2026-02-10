import { cachedGet } from "@/lib/api/http";

export async function getTrends() {
  return cachedGet("/trends");
}
