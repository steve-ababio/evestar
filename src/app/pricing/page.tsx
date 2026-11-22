import type { Metadata } from "next";
import { FinalCta, PageIntro } from "@/components/site/blocks";
import { PricingCards } from "@/components/site/PricingCards";

export const metadata: Metadata = {
  title: "Pricing & Plans",
  description:
    "Transparent, flexible cleaning plans for homes, offices, vehicles, and commercial spaces across Accra. One-off visits or scheduled recurring care.",
  openGraph: {
    title: "Pricing & Plans — Polished by Evestair Ghana",
    description:
      "Transparent, flexible cleaning plans for homes, offices, vehicles, and commercial spaces across Accra.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function PricingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Pricing & Plans"
        title="Transparent rates. Consistent standards."
        text="UK-inspired cleaning methods with upfront, structured pricing. Choose a one-off deep clean or save with a scheduled recurring plan."
        showGrid
      />

      <section className="section bg-white pt-2 sm:pt-4">
        <div className="container-page px-3">
          <PricingCards />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
