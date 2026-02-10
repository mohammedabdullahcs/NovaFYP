import { useEffect, useMemo, useState } from "react";
import { getTrends, type TrendData } from "@/lib/api/trendsApi";

const fallbackTrends: Required<TrendData> = {
  domains: {
    AI: 320,
    IoT: 210,
    Web: 185,
    Security: 140,
    Data: 120,
    Mobile: 95
  },
  technologies: {
    Python: 360,
    React: 230,
    FastAPI: 170,
    TensorFlow: 150,
    Node: 120,
    Flutter: 90
  },
  years: {
    2019: 6,
    2020: 8,
    2021: 10,
    2022: 12,
    2023: 1,
    2024: 4
  }
};

type TrendSummary = {
  totalProjects: number;
  topDomains: string;
  topTech: string;
};

export function useTrendsData() {
  const [trends, setTrends] = useState<TrendData | null>(null);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const loadTrends = async () => {
      setLoading(true);
      setOffline(false);
      try {
        const data = await getTrends();
        setTrends(data);
      } catch {
        setOffline(true);
        setTrends(null);
      } finally {
        setLoading(false);
      }
    };

    loadTrends();
  }, []);

  const hasTrendsData = Boolean(
    trends &&
      (Object.keys(trends.domains ?? {}).length ||
        Object.keys(trends.technologies ?? {}).length ||
        Object.keys(trends.years ?? {}).length)
  );

  const safeDomains = trends?.domains ?? fallbackTrends.domains;
  const safeTechnologies = trends?.technologies ?? fallbackTrends.technologies;

  const effectiveDomains = Object.keys(safeDomains).length
    ? safeDomains
    : fallbackTrends.domains;
  const effectiveTechnologies = Object.keys(safeTechnologies).length
    ? safeTechnologies
    : fallbackTrends.technologies;

  const domainEntries = useMemo(
    () => Object.entries(effectiveDomains).sort((a, b) => b[1] - a[1]),
    [effectiveDomains]
  );
  const techEntries = useMemo(
    () => Object.entries(effectiveTechnologies).sort((a, b) => b[1] - a[1]),
    [effectiveTechnologies]
  );

  const maxDomain = domainEntries[0]?.[1] ?? 0;
  const maxTech = techEntries[0]?.[1] ?? 0;

  const summary: TrendSummary = useMemo(
    () => ({
      totalProjects: trends?.years
        ? Object.values(trends.years).reduce((sum, value) => sum + value, 0)
        : 1300,
      topDomains: trends?.domains
        ? Object.entries(trends.domains)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key]) => key)
            .join(", ")
        : "AI, IoT, Web",
      topTech: trends?.technologies
        ? Object.entries(trends.technologies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([key]) => key)
            .join(", ")
        : "Python, React, FastAPI"
    }),
    [trends]
  );

  return {
    loading,
    offline,
    hasTrendsData,
    domainEntries,
    techEntries,
    maxDomain,
    maxTech,
    summary
  };
}
