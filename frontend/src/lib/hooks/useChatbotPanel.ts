import { useEffect, useMemo, useState } from "react";
import { sendMessage } from "@/lib/api/chatbotApi";
import type { ChatHistoryItem } from "@/lib/api/chatbotApi";
import { getProjects } from "@/lib/api/projectsApi";
import type { Project } from "@/lib/api/projectsApi";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  recommendedProjects?: Project[];
}

const quickPrompts = [
  "Suggest AI projects",
  "Show IoT ideas",
  "Find data science FYPs"
];

const formatRelativeTime = (timestamp: number, now: number) => {
  const diffSeconds = Math.max(0, Math.round((now - timestamp) / 1000));
  if (diffSeconds < 15) {
    return "just now";
  }
  if (diffSeconds < 60) {
    return `${diffSeconds} sec ago`;
  }
  const diffMinutes = Math.round(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }
  const diffHours = Math.round(diffMinutes / 60);
  return `${diffHours} hr ago`;
};

export function useChatbotPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Project[]>([]);
  const [offline, setOffline] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  const latestRecommendations = useMemo(
    () =>
      [...messages]
        .reverse()
        .find(
          (message) =>
            message.role === "assistant" && message.recommendedProjects?.length
        )?.recommendedProjects ?? recommendations,
    [messages, recommendations]
  );

  const updatedLabel = lastUpdatedAt
    ? `Updated ${formatRelativeTime(lastUpdatedAt, now)} · ${new Date(
        lastUpdatedAt
      ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })}`
    : "Waiting for recommendations";

  useEffect(() => {
    if (!lastUpdatedAt) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 15000);

    return () => window.clearInterval(timer);
  }, [lastUpdatedAt]);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await getProjects();
        setRecommendations(Array.isArray(data) ? data : []);
        setOffline(false);
        setLastUpdatedAt(Date.now());
      } catch {
        setOffline(true);
        setRecommendations([]);
      }
    };

    loadRecommendations();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) {
      return;
    }

    const nextMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, nextMessage]);
    setInput("");
    setLoading(true);

    try {
      const history: ChatHistoryItem[] = messages.map((message) => ({
        role: message.role === "assistant" ? "bot" : "user",
        message: message.content
      }));
      const response = await sendMessage(input, history, 5);
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response?.bot_response || "Here are some ideas to explore.",
        recommendedProjects: Array.isArray(response?.recommended_projects)
          ? response.recommended_projects
          : undefined
      };
      setMessages((prev) => [...prev, assistantMessage]);
      if (Array.isArray(response?.recommended_projects)) {
        setRecommendations(response.recommended_projects);
        setLastUpdatedAt(Date.now());
      }
      setOffline(false);
    } catch {
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          "The advisor is offline right now. Please try again once the backend is running."
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setOffline(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    offline,
    isMaximized,
    setIsMaximized,
    lastUpdatedAt,
    latestRecommendations,
    updatedLabel,
    handleSend,
    quickPrompts
  };
}
