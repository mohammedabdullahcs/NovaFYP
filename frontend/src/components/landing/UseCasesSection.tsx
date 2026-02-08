import { motion } from "framer-motion";

const cases = [
  {
    title: "Students starting from scratch",
    description:
      "Identify viable ideas with clear scope, datasets, and tooling in minutes.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/compass.svg"
  },
  {
    title: "Supervisors guiding cohorts",
    description:
      "Spot domain trends, avoid repeats, and recommend higher-impact topics.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/target-arrow.svg"
  },
  {
    title: "Teams validating feasibility",
    description:
      "Use similarity scores to benchmark against proven project patterns.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/bolt.svg"
  }
];

export default function UseCasesSection() {
  return (
    <section id="use-cases" className="px-6 py-16">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div className="space-y-4">
          <h2 className="section-title">Purpose-built use cases</h2>
          <p className="text-text-200">
            Whether you are proposing, supervising, or refining an idea, the
            platform adapts to your role and decision-making stage.
          </p>
          <div className="grid gap-4">
            {cases.map((item) => (
              <motion.div
                key={item.title}
                className="glass-card rounded-2xl p-5 border border-transparent hover:border-accent-500/50 transition"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ x: 6 }}
              >
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                    <img src={item.iconUrl} alt="" className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-text-100">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-200 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <img
          src="https://cdn.jsdelivr.net/gh/AnandChowdhary/undrawcdn/illustrations/team-spirit.svg"
          alt="Teamwork illustration"
          className="w-full max-w-sm opacity-90 justify-self-center"
          loading="lazy"
        />
      </div>
    </section>
  );
}
