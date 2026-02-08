import api from "@/lib/api/http";

export async function getTrends() {
  const { data } = await api.get("/trends");
  return data;
}
