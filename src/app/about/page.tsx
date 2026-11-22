import type { Metadata } from "next";
import { FinalCta, PageIntro } from "@/components/site/blocks";
import {
  ScrollReveal,
  SplitTextReveal,
} from "@/components/motion/primitives";
import { PurposeCards } from "@/components/site/PurposeCards";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A UK-founded cleaning brand bringing consistent, professional standards to homes and businesses across Accra.",
  openGraph: {
    title: "About Us — Polished by Evestair Ghana",
    description:
      "A UK-founded cleaning brand bringing consistent, professional standards to homes and businesses across Accra.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const values = [
  { title: "Professionalism", description: "Trained, uniformed teams who respect your space and time." },
  { title: "Reliability", description: "We arrive when agreed and finish what we promise." },
  { title: "Quality", description: "Professional equipment and products suited to every surface." },
  { title: "Attention to detail", description: "Corners, edges and touch-points never get overlooked." },
  { title: "Consistency", description: "Structured checklists keep every visit to the same standard." },
  { title: "Trust", description: "Supervised work and honest, tailored quotations." },
] as const;

// Desktop staircase: rows step one column to the right (heading sits in column 1).
const valuePlacement = [
  "lg:col-start-2 lg:row-start-1",
  "lg:col-start-3 lg:row-start-1",
  "lg:col-start-3 lg:row-start-2",
  "lg:col-start-4 lg:row-start-2",
  "lg:col-start-4 lg:row-start-3",
  "lg:col-start-5 lg:row-start-3",
] as const;

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About us"
        title="UK-founded. Now serving Accra."
        text="Polished by Evestair is a professional cleaning brand operating in the United Kingdom and Ghana. Our Ghana team provides cleaning and mobile vehicle care for residential, commercial, industrial and event customers across Accra."
        showGrid
      />
      <section className="section">
        <div className="container-page px-4">
          <div className="rounded-[2rem] bg-muted/50 py-6 px-4 md:p-12">
            {/* Header row */}
            <div className="flex flex-wrap items-end justify-between gap-3 sm:gap-4">
              <SplitTextReveal
                as="h2"
                text="Our Purpose"
                className="text-3xl sm:text-5xl md:text-7xl leading-none font-medium tracking-tight text-primary"
              />
              <ScrollReveal direction="up" distance={12} delay={0.1}>
                <p className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-primary">
                  © {new Date().getFullYear()}
                </p>
              </ScrollReveal>
            </div>

            {/* Staggered cards with curved connectors */}
            <PurposeCards />
          </div>
        </div>
      </section>
      <section className="section bg-primary text-primary-foreground">
        <div className="container-page grid grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {/* Heading block (top-left) */}
          <div className="col-span-1 sm:col-span-2 mb-6 sm:mb-8 md:col-span-3 lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:mb-0 lg:pr-6">
            <ScrollReveal direction="up" distance={16}>
              <p className="eyebrow text-mint">Core values</p>
              <h2 className="mt-4 text-3xl sm:text-4xl leading-tight font-medium tracking-tight uppercase md:text-5xl lg:text-4xl">
                What we stand for.
              </h2>
              <p className="mt-3 sm:mt-4 max-w-xs text-sm leading-relaxed text-primary-foreground/70">
                Six principles guide every clean — from the first message to the final supervisor check.
              </p>
            </ScrollReveal>
          </div>

          {/* Staircase value tiles */}
          {values.map((v, i) => (
            <ScrollReveal
              key={v.title}
              direction="up"
              distance={18}
              delay={i * 0.06}
              className={`${valuePlacement[i]} ${i === 1 || i === 4 ? "bg-white" : "bg-muted"} flex min-h-[10.5rem] sm:aspect-square flex-col justify-between rounded-xl p-5 text-primary md:p-6`}
            >
              <span className="text-3xl font-medium tracking-tight md:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-base font-semibold md:text-lg">{v.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground md:text-[13px]">
                  {v.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
