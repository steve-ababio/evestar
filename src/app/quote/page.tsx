import type { Metadata } from "next";
import { PageIntro } from "@/components/site/blocks";
import { QuoteSplitLayout } from "@/components/site/QuoteSplitLayout";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a tailored cleaning quotation in Accra — homes, offices, events, vehicles and heavy machinery.",
  openGraph: {
    title: "Request a Quote — Polished by Evestair Ghana",
    description:
      "Request a tailored cleaning quotation in Accra — homes, offices, events, vehicles and heavy machinery.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const resolvedParams = await searchParams;
  const service = resolvedParams?.service ?? "";

  return (
    <>
      <PageIntro
        eyebrow="Request a quote"
        title="A tailored quotation, without the phone call."
        text="Tell us a little about the job and we'll get back to you with a plan and price."
        showGrid
      />
      <section className="section">
        <div className="container-page max-w-8xl">
          <QuoteSplitLayout defaultService={service} />
        </div>
      </section>
    </>
  );
}
