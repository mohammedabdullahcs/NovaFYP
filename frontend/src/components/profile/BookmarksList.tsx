import { useEffect, useState } from "react";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/api/projectsApi";
import EmptyState from "@/components/common/EmptyState";

export default function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<Project[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const loadBookmarks = () => {
      const saved = localStorage.getItem("novafyp_bookmarks");
      if (saved) {
        try {
          setBookmarks(JSON.parse(saved));
        } catch {
          setBookmarks([]);
        }
      } else {
        setBookmarks([]);
      }
    };

    loadBookmarks();

    const handleStorage = (event: StorageEvent) => {
      if (event.key === "novafyp_bookmarks") {
        loadBookmarks();
      }
    };

    const handleBookmarkUpdate = () => {
      loadBookmarks();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("novafyp_bookmarks_updated", handleBookmarkUpdate);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("novafyp_bookmarks_updated", handleBookmarkUpdate);
    };
  }, []);

  if (bookmarks.length === 0) {
    return (
      <EmptyState
        title="No bookmarks yet"
        description="Save your favorite project ideas for quick access."
      />
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {bookmarks.map((project) => (
        <ProjectCard key={String(project.id)} project={project} />
      ))}
    </div>
  );
}
