"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { images, services, testimonials } from "@/lib/site";
import { QuoteForm } from "@/components/site/QuoteForm";

export function QuoteSplitLayout({ defaultService = "" }: { defaultService?: string }) {
  const [selectedSlug, setSelectedSlug] = useState(defaultService);
  const [activeReview, setActiveReview] = useState(0);

  const selectedService = services.find((s) => s.slug === selectedSlug);
  const panelImage = selectedService?.image ?? images.interior;
  const review = testimonials[activeReview] ?? testimonials[0];

  function prevReview() {
    setActiveReview((i) => (i - 1 + testimonials.length) % testimonials.length);
  }

  function nextReview() {
    setActiveReview((i) => (i + 1) % testimonials.length);
  }

  return (
    <div className="rounded-[2rem] bg-white p-3 shadow-soft sm:p-5 lg:p-5">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1.18fr] lg:items-stretch lg:gap-10">
        {/* Desktop Left Image Panel with Frosted Testimonial Overlay */}
        <div className="relative hidden min-h-[42rem] overflow-hidden rounded-[1.5rem] bg-primary lg:block">
          <img
            src={panelImage}
            alt={selectedService ? selectedService.title : "Spotless interior cleaned by Polished by Evestair Ghana"}
            className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10"
          />

          {/* Bottom Frosted Testimonial Card */}
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-black/40 p-6 text-white backdrop-blur-md">
            <p className="min-h-[4.5rem] text-[15px] leading-relaxed text-white/95">
              &ldquo;{review.text}&rdquo;
            </p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{review.name}</p>
                <p className="text-xs text-white/65">Verified Client · {review.date}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <button
                  type="button"
                  onClick={prevReview}
                  aria-label="Previous client review"
                  className="grid size-10 cursor-pointer place-items-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={nextReview}
                  aria-label="Next client review"
                  className="grid size-10 cursor-pointer place-items-center rounded-full bg-white text-black transition-transform hover:scale-105"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Brand Header + Existing Quote Form */}
        <div className="flex flex-col justify-center px-2 py-4 sm:px-5 sm:py-6 lg:py-8 lg:pr-8 lg:pl-0">
          <img
            src="/images/evestar-logo.png"
            alt="Polished by Evestair"
            className="h-8 w-auto self-start object-contain"
          />
          <h2 className="mt-6 text-3xl leading-[1.14] tracking-tight text-primary sm:text-[2.15rem]">
            <span className="font-normal">Need a spotless space?</span>
            <br />
            <span className="font-semibold">Let&apos;s plan it together.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            Tell us a little about your property, vehicle, or event and we&apos;ll get back to you with a tailored plan
            and price.
          </p>

          <div className="mt-7">
            <QuoteForm
              defaultService={defaultService}
              embedded
              onServiceChange={setSelectedSlug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
