import type { Metadata } from "next";
import { services } from "@/lib/site";
import { FinalCta, PageIntro, ServiceCard } from "@/components/site/blocks";
import { ScrollReveal } from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "Cleaning Services in Accra",
  description:
    "Post-construction, commercial, event, carpet, sofa, window, vehicle and heavy machinery cleaning plus supplies in Accra.",
  openGraph: {
    title: "Cleaning Services in Accra — Polished by Evestair Ghana",
    description:
      "Post-construction, commercial, event, carpet, sofa, window, vehicle and heavy machinery cleaning plus supplies in Accra.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const groups = ["Property", "Commercial", "Specialist", "Vehicle", "Supplies"] as const;

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our services"
        title="Complete cleaning solutions. One trusted team."
        text="Eleven services covering homes, workplaces, events, vehicles and heavy machinery — each with a tailored plan and quotation."
        showGrid
      />
      {groups.map((g) => (
        <section key={g} className="container-page border-b border-border py-16 last:border-0">
          <ScrollReveal direction="left" distance={24}>
            <h2 className="mb-8 text-3xl text-primary">
              {g === "Specialist"
                ? "Specialist cleaning"
                : g === "Vehicle"
                  ? "Vehicle & machinery"
                  : g === "Supplies"
                    ? "Cleaning supplies"
                    : `${g} cleaning`}
            </h2>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.category === g)
              .map((s) => (
                <ServiceCard key={s.slug} s={s} />
              ))}
          </div>
        </section>
      ))}
      <FinalCta />
    </>
  );
}
