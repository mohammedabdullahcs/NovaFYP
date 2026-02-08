import Head from "next/head";
import LandingHero from "@/components/landing/LandingHero";
import AuthSection from "@/components/landing/AuthSection";
import HowItWorks from "@/components/landing/HowItWorks";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>NovaFYP Advisor</title>
      </Head>
      <LandingHero />
      <AuthSection />
      <HowItWorks />
    </div>
  );
}
