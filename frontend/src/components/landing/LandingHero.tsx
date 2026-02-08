import { motion } from "framer-motion";
import Link from "next/link";
import LottieWrapper from "@/components/common/LottieWrapper";

const heroLottieUrl =
  "https://assets7.lottiefiles.com/packages/lf20_5ngs2ksb.json";

export default function LandingHero() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-12 px-6 py-16">
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
            Get Started - Sign In
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
        <LottieWrapper
          animationUrl={heroLottieUrl}
          className="w-full h-full"
        />
      </div>
    </section>
  );
}
