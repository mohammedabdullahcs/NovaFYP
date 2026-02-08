import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import BookmarksList from "@/components/profile/BookmarksList";
import { getPersonalizedRecommendations } from "@/lib/api/personalizedRecommendationsApi";
import type { Project } from "@/lib/api/projectsApi";
import ProjectCard from "@/components/projects/ProjectCard";
import EmptyState from "@/components/common/EmptyState";
import { supabase } from "@/lib/supabaseClient";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({
    skills: "",
    interests: "",
    domain: "",
    difficulty: ""
  });
  const [recommendations, setRecommendations] = useState<Project[]>([]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await getPersonalizedRecommendations(profile);
    setRecommendations(Array.isArray(data) ? data : []);
  };

  return (
    <div className="space-y-10">
      <motion.div
        className="glass-card rounded-2xl p-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-display text-text-100">
            Your Profile
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs text-text-200 hover:text-text-100"
          >
            Logout
          </button>
        </div>
        <p className="text-text-200 mt-2">
          Update your preferences to unlock tailored recommendations.
        </p>
        <form className="mt-6 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Skills (e.g., React, Python)"
            className="px-4 py-3 rounded-xl input-surface text-text-100"
            value={profile.skills}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, skills: event.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Interests (e.g., NLP, IoT)"
            className="px-4 py-3 rounded-xl input-surface text-text-100"
            value={profile.interests}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, interests: event.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Preferred domain"
            className="px-4 py-3 rounded-xl input-surface text-text-100"
            value={profile.domain}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, domain: event.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Difficulty level"
            className="px-4 py-3 rounded-xl input-surface text-text-100"
            value={profile.difficulty}
            onChange={(event) =>
              setProfile((prev) => ({ ...prev, difficulty: event.target.value }))
            }
          />
          <button
            type="submit"
            className="md:col-span-2 bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-xl transition"
          >
            Get personalized recommendations
          </button>
        </form>
      </motion.div>

      <div>
        <h2 className="text-xl font-semibold text-text-100 mb-4">
          Personalized Recommendations
        </h2>
        {recommendations.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((project) => (
              <ProjectCard key={String(project.id)} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No recommendations yet"
            description="Complete your profile to see tailored ideas."
          />
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-text-100 mb-4">Bookmarks</h2>
        <BookmarksList />
      </div>
    </div>
  );
}
