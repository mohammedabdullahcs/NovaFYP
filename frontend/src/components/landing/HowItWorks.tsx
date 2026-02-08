import InfoGraphicCard from "@/components/common/InfoGraphicCard";

const steps = [
  {
    stepNumber: "01",
    title: "Tell us your skills & interests",
    description: "Share domains, tools, and goals to guide the AI.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/brain.svg"
  },
  {
    stepNumber: "02",
    title: "Search 1300+ curated FYPs",
    description: "Explore past projects with smart filters and tags.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/search.svg"
  },
  {
    stepNumber: "03",
    title: "Get AI-powered recommendations",
    description: "NLP + RAG surfaces the best-fit ideas instantly.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/sparkles.svg"
  },
  {
    stepNumber: "04",
    title: "Chat with the NovaFYP Advisor",
    description: "Refine ideas, ask questions, and build clarity fast.",
    iconUrl: "https://cdn.jsdelivr.net/npm/@tabler/icons@latest/icons/message-2.svg"
  }
];

export default function HowItWorks() {
  return (
    <section id="how" className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">How NovaFYP Advisor Works</h2>
        <p className="text-text-200 mt-3 max-w-2xl">
          A seamless journey from curiosity to a confident final year project.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <InfoGraphicCard key={step.stepNumber} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
