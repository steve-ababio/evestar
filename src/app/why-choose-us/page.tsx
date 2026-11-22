import type { Metadata } from "next";
import { Differentiators, FinalCta, PageIntro, Steps } from "@/components/site/blocks";
import { ScrollReveal, SplitTextReveal } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "Why Choose Us",
  description:
    "UK-inspired standards, trained teams, professional equipment, tailored plans, quality checks and flexible service in Accra.",
  openGraph: {
    title: "Why Choose Us — Polished by Evestair Ghana",
    description:
      "UK-inspired standards, trained teams, professional equipment, tailored plans, quality checks and flexible service in Accra.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function WhyChooseUsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Why choose us"
        title="Professional service. Trained teams. Quality checks."
        text="The standards we built in the UK, delivered with care across Accra."
        showGrid
      />
      <section className="section">
        <div className="container-page">
          <Differentiators />
        </div>
      </section>
      <section className="section border-t border-border/70 bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal direction="up" distance={16}>
              <p className="eyebrow text-accent">How it works</p>
            </ScrollReveal>
            <SplitTextReveal
              as="h2"
              text="Our service, step by step."
              className="mt-3 text-4xl font-medium tracking-tight text-primary md:text-5xl"
            />
            <ScrollReveal direction="up" distance={14} delay={0.1}>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                From initial assessment to final inspection, every clean follows a transparent, predictable process.
              </p>
            </ScrollReveal>
          </div>
          <div className="mt-14 md:mt-20">
            <Steps />
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
