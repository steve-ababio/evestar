"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO, ScrollReveal, SplitTextReveal } from "@/components/motion/primitives";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pricingCategories, pricingFaqs } from "@/lib/site";

export function PricingCards() {
  const [activeCategory, setActiveCategory] = useState(pricingCategories[0].id);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isRecurring, setIsRecurring] = useState(true);
  const reduced = useReducedMotion();

  const currentCategory =
    pricingCategories.find((c) => c.id === activeCategory) ||
    pricingCategories[0];

  return (
    <div className="space-y-20 md:space-y-28">
      {/* Main Pricing Container Card */}
      <div className="rounded-[2.5rem] bg-muted/30 p-4 sm:p-8 md:p-12 lg:p-16">
        {/* Top Category Tabs Bar with Animated Indicator */}
        <div className="mx-auto flex justify-center">
          <div
            className="relative flex items-center justify-center border-b border-border/80 gap-3 sm:gap-8 md:gap-12"
            role="tablist"
            aria-label="Pricing categories"
          >
            {pricingCategories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat.id)}
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`relative shrink-0 whitespace-nowrap pb-3.5 pt-1 text-xs sm:text-sm md:text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {/* Subtle hover background highlight */}
                  {!reduced && hoveredCategory === cat.id && !isActive && (
                    <motion.span
                      layoutId="pricingTabHover"
                      className="absolute inset-x-0 top-0 bottom-2.5 rounded-lg bg-muted/80"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      aria-hidden="true"
                    />
                  )}

                  <span className="relative z-10 px-1 sm:px-2">
                    <span className="hidden sm:inline">{cat.label}</span>
                    <span className="sm:hidden">{cat.shortLabel || cat.label}</span>
                  </span>

                  {/* Active sliding indicator bar resting directly on the border line */}
                  {isActive && (
                    <motion.span
                      layoutId="pricingTabIndicator"
                      className="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-full bg-accent z-10"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={reduced ? undefined : { opacity: 0, y: 14 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
          >
            {/* Header Block */}
            <div className="mx-auto mt-12 max-w-2xl text-center md:mt-16">
              <h2 className="text-3xl font-medium tracking-tight text-primary sm:text-4xl md:text-5xl">
                {currentCategory.title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                {currentCategory.subtitle}
              </p>

              {/* Billing Toggle (One-Off vs Recurring with Save 20% badge) */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors ${
                    !isRecurring ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  One-Off Visit
                </span>

                <button
                  type="button"
                  role="switch"
                  aria-checked={isRecurring}
                  onClick={() => setIsRecurring(!isRecurring)}
                  className="relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-primary p-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span
                    className={`pointer-events-none inline-block size-5.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isRecurring ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>

                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-xs sm:text-sm font-medium transition-colors ${
                      isRecurring ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    Recurring Plan
                  </span>
                  <span className="rounded-full bg-mint px-2 py-1 text-[11px] font-medium text-primary">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>

            {/* Pricing Cards Grid (3 Cards matching the reference layout) */}
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch lg:gap-8">
              {currentCategory.tiers.map((tier, idx) => {
                const isDark = tier.popular;
                const price = isRecurring ? tier.price.monthly : tier.price.oneOff;

                return (
                  <motion.div
                    key={tier.name}
                    initial={reduced ? undefined : { opacity: 0, y: 16 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { duration: 0.35, delay: idx * 0.07, ease: EASE_OUT_EXPO }
                    }
                    className={`flex flex-col justify-between rounded-3xl p-2 sm:p-3 transition-transform duration-200 ${
                      isDark
                        ? "bg-primary text-primary-foreground shadow-soft ring-1 ring-primary/20 md:-translate-y-2"
                        : "shadow-soft bg-white text-primary"
                    }`}
                  >
                    {/* Top Section */}
                    <div className="px-4 pt-4">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`text-xl font-medium tracking-tight ${
                            isDark ? "text-white" : "text-primary"
                          }`}
                        >
                          {tier.name}
                        </h3>
                        {isDark && (
                          <span className="rounded-full bg-mint/20 px-2.5 py-1  text-xs font-medium text-mint">
                            Popular
                          </span>
                        )}
                      </div>
                      <p
                        className={`mt-1.5 text-xs sm:text-sm ${
                          isDark ? "text-primary-foreground/75" : "text-muted-foreground"
                        }`}
                      >
                        {tier.tagline}
                      </p>

                      {/* Animated Price display */}
                      <div className="mt-6 flex items-baseline gap-1.5">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={price}
                            initial={reduced ? undefined : { opacity: 0, y: -6 }}
                            animate={reduced ? undefined : { opacity: 1, y: 0 }}
                            exit={reduced ? undefined : { opacity: 0, y: 6 }}
                            transition={{ duration: 0.16 }}
                            className={`text-3xl sm:text-3xl lg:text-4xl font-medium tracking-tight ${
                              isDark ? "text-mint" : "text-primary"
                            }`}
                          >
                            {price}
                          </motion.span>
                        </AnimatePresence>
                        <span
                          className={`text-xs sm:text-sm ${
                            isDark ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {tier.period}
                        </span>
                      </div>

                      {/* CTA Button */}
                      <div className="mt-12">
                        <Link
                          href={tier.ctaHref}
                          className={`inline-flex w-full items-center justify-center rounded-full py-3 text-sm font-semibold transition-all ${
                            isDark
                              ? "bg-mint text-primary shadow-sm hover:bg-mint/90"
                              : "border border-border/90 bg-white text-primary hover:bg-muted/70"
                          }`}
                        >
                          {tier.ctaText}
                        </Link>
                      </div>
                    </div>

                    {/* Bottom Nested Tray with Feature Checklist */}
                    <div
                      className={`mt-4 flex-1 rounded-2xl p-5 sm:p-6 ${
                        isDark ? "bg-white text-primary" : "bg-gray-200/60 text-foreground"
                      }`}
                    >
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm">
                            <div className={`h-6 w-6 flex items-center justify-center rounded-full ${isDark ?"bg-gray-200/70":"bg-white"}`}>
                             <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            </div>
                           
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Frequently Asked Questions Section */}
      <section className="mx-auto max-w-3xl">
        <div className="text-center">
          <ScrollReveal direction="up" distance={16}>
            <p className="eyebrow text-accent">Got questions?</p>
            <SplitTextReveal
              as="h2"
              text="Frequently Asked Questions"
              className="mt-3 text-3xl font-medium tracking-tight text-primary sm:text-4xl"
            />
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">
              Everything you need to know about our rates, scheduling, and UK-inspired quality standards.
            </p>
          </ScrollReveal>
        </div>

        <div className="mt-10">
          <Accordion type="single" collapsible className="w-full space-y-0">
            {pricingFaqs.map((faq, idx) => (
              <AccordionItem
                key={faq.question}
                value={`item-${idx}`}
                className="border-y-[0.25px] border-y-gray-200 first-of-type:border-t last-of-type:border-b px-6"
              >
                <AccordionTrigger
                  icon="plus"
                  className="text-left text-base font-medium text-primary hover:no-underline"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
