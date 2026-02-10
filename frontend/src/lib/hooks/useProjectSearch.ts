import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Project, ProjectFilters } from "@/lib/api/projectsApi";
import { getProjects } from "@/lib/api/projectsApi";
import { searchProjects } from "@/lib/api/searchApi";

export function useProjectSearch(pageSize = 6) {
  const [query, setQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filters = useMemo<ProjectFilters>(
    () => ({ technology: selectedFilters[0] }),
    [selectedFilters]
  );

  const loadProjects = async (nextFilters?: ProjectFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects(nextFilters);
      setProjects(Array.isArray(data) ? data : []);
    } catch {
      setError("Unable to load projects.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        const data = await searchProjects(trimmedQuery, filters, 24);
        setProjects(Array.isArray(data) ? data : []);
      } else {
        const data = await getProjects(filters);
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch {
      setError("Search failed. Try again.");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const trimmedQuery = query.trim();
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      if (trimmedQuery) {
        searchProjects(trimmedQuery, filters, 24)
          .then((data) => setProjects(Array.isArray(data) ? data : []))
          .catch(() => {
            setError("Search failed. Try again.");
            setProjects([]);
          })
          .finally(() => setLoading(false));
      } else {
        loadProjects(filters);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query, filters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((item) => item !== filter) : [filter]
    );
  };

  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const pagedProjects = useMemo(
    () => projects.slice((page - 1) * pageSize, page * pageSize),
    [projects, page, pageSize]
  );

  useEffect(() => {
    setPage(1);
  }, [query, selectedFilters]);

  return {
    query,
    setQuery,
    selectedFilters,
    toggleFilter,
    projects,
    loading,
    error,
    page,
    setPage,
    pageSize,
    totalPages,
    pagedProjects,
    handleSearch
  };
}
