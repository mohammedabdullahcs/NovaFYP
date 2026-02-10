import { useState, type FormEvent } from "react";
import { getPersonalizedRecommendations } from "@/lib/api/personalizedRecommendationsApi";
import type { Project } from "@/lib/api/projectsApi";

type ProfileFormState = {
  skills: string;
  interests: string;
  domain: string;
  difficulty: string;
};

export function useProfileRecommendations() {
  const [profile, setProfile] = useState<ProfileFormState>({
    skills: "",
    interests: "",
    domain: "",
    difficulty: ""
  });
  const [recommendations, setRecommendations] = useState<Project[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const skills = profile.skills
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    const interests = profile.interests
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const data = await getPersonalizedRecommendations({
      skills,
      interests,
      difficulty: profile.difficulty || "medium",
      hardware_required: false,
      top_k: 5
    });
    setRecommendations(Array.isArray(data) ? data : []);
  };

  return {
    profile,
    setProfile,
    recommendations,
    handleSubmit
  };
}
