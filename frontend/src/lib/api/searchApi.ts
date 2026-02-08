import api from "@/lib/api/http";
import type { ProjectFilters } from "@/lib/api/projectsApi";

export async function searchProjects(
  query: string,
  filters?: ProjectFilters
) {
  const { data } = await api.post("/search", { query, filters });
  return data?.results ?? data;
}
