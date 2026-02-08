import { motion } from "framer-motion";

const features = [
  {
    title: "NLP-first discovery",
    description:
      "Search in plain language and let semantic ranking surface the most relevant ideas.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/wand.svg"
  },
  {
    title: "RAG Advisor guidance",
    description:
      "Get instant explanations, scope tips, and feasibility signals for every idea.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/robot.svg"
  },
  {
    title: "Curated insights",
    description:
      "Track trends, domains, and technology adoption across 1300+ archived FYPs.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/chart-line.svg"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="section-title">Built for clarity and momentum</h2>
            <p className="text-text-200 mt-3 max-w-2xl">
              NovaFYP Advisor blends NLP search, RAG reasoning, and analytics to
              help students lock in confident, relevant projects faster.
            </p>
          </div>
          <img
            src="https://cdn.jsdelivr.net/gh/AnandChowdhary/undrawcdn/illustrations/data-trends.svg"
            alt="Insight illustration"
            className="w-full max-w-xs opacity-90"
            loading="lazy"
          />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="glass-card rounded-2xl p-6 border border-transparent hover:border-brand-500/50 transition"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <img src={feature.iconUrl} alt="" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-text-100 mt-4">
                {feature.title}
              </h3>
              <p className="text-sm text-text-200 mt-2 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
