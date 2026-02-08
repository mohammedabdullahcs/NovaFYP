import api from "@/lib/api/http";

export interface Project {
  id: string | number;
  title: string;
  domain?: string;
  technologies?: string[];
  year?: number;
  description?: string;
  similarity?: number;
}

export interface ProjectFilters {
  domain?: string;
  technologies?: string[];
  year?: number | string;
  difficulty?: string;
}

export async function getProjects(filters?: ProjectFilters) {
  const { data } = await api.get("/projects", { params: filters });
  return data?.projects ?? data;
}

export async function getProjectById(id: string | number) {
  const { data } = await api.get(`/projects/${id}`);
  return data?.project ?? data;
}
