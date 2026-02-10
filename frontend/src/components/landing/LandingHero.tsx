import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingHero() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 px-6 pt-28 pb-16">
      <div className="flex-1">
        <motion.h1
          className="text-4xl md:text-5xl font-display text-text-100 leading-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Discover Intelligent Final Year Project Ideas with NovaFYP Advisor
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-text-200 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          AI-powered discovery using NLP + RAG to personalize recommendations
          across 1300+ archived FYPs.
        </motion.p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="#auth"
            className="bg-brand-500 hover:bg-brand-400 text-white px-6 py-3 rounded-xl transition shadow-glow"
          >
            Getting Started
          </Link>
          <Link
            href="#how"
            className="border border-accent-500 text-accent-500 hover:text-accent-400 hover:border-accent-400 px-6 py-3 rounded-xl transition"
          >
            See How It Works
          </Link>
        </div>
      </div>
      <div className="flex-1 w-full max-w-md">
        <div className="glass-card rounded-3xl p-6">
          <svg
            viewBox="0 0 520 380"
            role="img"
            aria-label="Project insights infographic"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="heroGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#22c55e" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="heroLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <rect x="12" y="12" width="496" height="356" rx="28" fill="url(#heroGlow)" />
            <rect x="36" y="48" width="310" height="196" rx="18" fill="#0f172a" fillOpacity="0.6" />
            <rect x="360" y="48" width="132" height="120" rx="16" fill="#0f172a" fillOpacity="0.6" />
            <rect x="360" y="184" width="132" height="84" rx="16" fill="#0f172a" fillOpacity="0.6" />

            <g opacity="0.85">
              <rect x="58" y="78" width="120" height="10" rx="5" fill="#38bdf8" />
              <rect x="58" y="98" width="190" height="8" rx="4" fill="#e2e8f0" fillOpacity="0.35" />
              <rect x="58" y="116" width="150" height="8" rx="4" fill="#e2e8f0" fillOpacity="0.25" />
            </g>

            <polyline
              points="64,202 122,168 176,188 232,140 296,160"
              fill="none"
              stroke="url(#heroLine)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g fill="#38bdf8">
              <circle cx="64" cy="202" r="5" />
              <circle cx="122" cy="168" r="5" />
              <circle cx="176" cy="188" r="5" />
              <circle cx="232" cy="140" r="5" />
              <circle cx="296" cy="160" r="5" />
            </g>

            <g>
              <rect x="376" y="74" width="100" height="10" rx="5" fill="#22c55e" />
              <rect x="376" y="96" width="74" height="10" rx="5" fill="#e2e8f0" fillOpacity="0.25" />
              <rect x="376" y="118" width="92" height="10" rx="5" fill="#e2e8f0" fillOpacity="0.25" />
            </g>

            <g>
              <rect x="380" y="208" width="18" height="44" rx="6" fill="#38bdf8" />
              <rect x="406" y="198" width="18" height="54" rx="6" fill="#a855f7" />
              <rect x="432" y="216" width="18" height="36" rx="6" fill="#22c55e" />
              <rect x="458" y="204" width="18" height="48" rx="6" fill="#f97316" />
            </g>

            <g opacity="0.6">
              <circle cx="96" cy="284" r="18" fill="#38bdf8" />
              <circle cx="152" cy="304" r="12" fill="#22c55e" />
              <circle cx="210" cy="292" r="8" fill="#a855f7" />
              <line x1="96" y1="284" x2="152" y2="304" stroke="#38bdf8" strokeWidth="2" />
              <line x1="152" y1="304" x2="210" y2="292" stroke="#22c55e" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
