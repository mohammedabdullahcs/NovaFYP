import api from "@/lib/api/http";

export async function getRecommendations(payload?: Record<string, unknown>) {
  const { data } = await api.post("/recommend", payload ?? {});
  return data?.recommendations ?? data;
}
