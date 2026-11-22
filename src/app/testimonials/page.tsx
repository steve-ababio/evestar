import type { Metadata } from "next";
import { FinalCta, PageIntro, TestimonialGrid } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description: "Five-star reviews from customers of Polished by Evestair's UK operations on Bark.",
  openGraph: {
    title: "Customer Reviews — Polished by Evestair",
    description: "Five-star reviews from customers of Polished by Evestair's UK operations on Bark.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function TestimonialsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Reviews"
        title="Five-star service, in our clients' words."
        text="Reviews from customers of our UK operations, published on Bark."
        showGrid
      />
      <section className="section">
        <div className="container-page">
          <TestimonialGrid />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
