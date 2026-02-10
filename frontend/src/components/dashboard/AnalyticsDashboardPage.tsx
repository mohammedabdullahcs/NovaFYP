import { motion } from "framer-motion";
import LoadingState from "@/components/common/LoadingState";
import { useTrendsData } from "@/lib/hooks/useTrendsData";

export default function AnalyticsDashboardPage() {
  const {
    loading,
    offline,
    hasTrendsData,
    domainEntries,
    techEntries,
    maxDomain,
    maxTech,
    summary
  } = useTrendsData();

  if (loading) {
    return <LoadingState message="Loading trend analytics..." />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display text-text-100">Analytics Overview</h1>
      <a
        href="https://www.kaggle.com/datasets/nabeelqureshitiii/past-fyp-data"
        target="_blank"
        rel="noreferrer"
        className="text-sm text-accent-500 hover:text-accent-400"
      >
        Dataset source (Kaggle)
      </a>
      {offline ? (
        <div className="glass-card rounded-2xl p-4 text-sm text-text-200">
          Backend is offline. Showing cached/demo insights for now.
        </div>
      ) : !hasTrendsData ? (
        <div className="glass-card rounded-2xl p-4 text-sm text-text-200">
          No live analytics yet. Showing demo insights.
        </div>
      ) : null}
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            label: "Total Projects",
            value: summary.totalProjects
          },
          {
            label: "Top Domains",
            value: summary.topDomains
          },
          {
            label: "Popular Tech",
            value: summary.topTech
          }
        ].map((card) => (
          <motion.div
            key={card.label}
            className="glass-card rounded-2xl p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm text-text-200">{card.label}</p>
            <p className="text-2xl font-semibold text-text-100 mt-2">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-card rounded-2xl p-6 h-64 flex flex-col">
          <p className="text-sm text-text-200">Domain Trends</p>
          <div className="flex-1 mt-4 space-y-3 overflow-y-auto pr-1">
            {domainEntries.slice(0, 6).map(([label, value]) => (
              <div key={label} className="text-xs text-text-200">
                <div className="flex items-center justify-between">
                  <span className="text-text-100">{label}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/5">
                  <div
                    className="h-2 rounded-full bg-brand-500"
                    style={{ width: maxDomain ? `${(value / maxDomain) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-2xl p-6 h-64 flex flex-col">
          <p className="text-sm text-text-200">Technology Adoption</p>
          <div className="flex-1 mt-4 space-y-3 overflow-y-auto pr-1">
            {techEntries.slice(0, 6).map(([label, value]) => (
              <div key={label} className="text-xs text-text-200">
                <div className="flex items-center justify-between">
                  <span className="text-text-100">{label}</span>
                  <span>{value}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/5">
                  <div
                    className="h-2 rounded-full bg-accent-500"
                    style={{ width: maxTech ? `${(value / maxTech) * 100}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
