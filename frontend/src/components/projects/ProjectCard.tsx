import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/lib/api/projectsApi";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      className="glass-card rounded-2xl p-5 border border-transparent hover:border-brand-400/60 transition shadow-glow"
      whileHover={{ y: -4 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-text-100">
            {project.title}
          </h3>
          <p className="text-xs text-text-200 mt-1">
            {project.domain || "General"} {project.year ? `- ${project.year}` : ""}
          </p>
        </div>
        {project.similarity ? (
          <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-1 rounded-full">
            {Math.round(project.similarity * 100)}% match
          </span>
        ) : null}
      </div>
      <p className="text-sm text-text-200 mt-3 line-clamp-3">
        {project.description || "Smart project recommendation aligned to your profile."}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(project.technologies || []).slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded-full bg-white/5 text-text-200"
          >
            {tech}
          </span>
        ))}
      </div>
      <Link
        href={`/app/project/${project.id}`}
        className="inline-block mt-4 text-sm text-accent-500 hover:text-accent-400"
      >
        View details
      </Link>
    </motion.div>
  );
}
