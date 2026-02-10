import api, { cachedGet } from "@/lib/api/http";

export interface Project {
  id?: string | number;
  title: string;
  abstract?: string;
  domain?: string;
  technologies?: string[] | string;
  year?: number;
  difficulty?: string;
  hardware?: boolean;
  source_url?: string;
  uniqueness_score?: number;
  similarity_score?: number;
}

export interface ProjectFilters {
  domain?: string;
  technology?: string;
  year?: number | string;
  difficulty?: string;
  hardware?: boolean;
}

type ProjectsResponse = {
  projects: Project[];
};

type ProjectResponse = {
  project: Project;
};

export async function getProjects(filters?: ProjectFilters) {
  const data = await cachedGet<Project[] | ProjectsResponse>("/projects", {
    params: filters
  });
  if (Array.isArray(data)) {
    return data;
  }
  if (data && "projects" in data) {
    return data.projects;
  }
  return [];
}

export async function getProjectById(id: string | number) {
  const data = await cachedGet<Project | ProjectResponse>(`/projects/${id}`);
  if (data && typeof data === "object" && "project" in data) {
    return data.project;
  }
  return data as Project;
}
