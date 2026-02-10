import Head from "next/head";
import LandingNavbar from "@/components/landing/LandingNavbar";
import LandingHero from "@/components/landing/LandingHero";
import FeaturesSection from "@/components/landing/FeaturesSection";
import UseCasesSection from "@/components/landing/UseCasesSection";
import AuthSection from "@/components/landing/AuthSection";
import HowItWorks from "@/components/landing/HowItWorks";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>NovaFYP Advisor</title>
      </Head>
      <LandingNavbar />
      <LandingHero />
      <FeaturesSection />
      <AuthSection />
      <HowItWorks />
      <UseCasesSection />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 600
  };
}
