"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Star, Search, FileText, BrushCleaning, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { differentiators, steps, testimonials, whatsappLink, type Service } from "@/lib/site";
import {
  DEFAULT_VIEWPORT,
  EASE_OUT_EXPO,
  ScrollReveal,
  SplitTextReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/primitives";

export function PageIntro({
  eyebrow,
  title,
  text,
  showGrid,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  showGrid?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden  bg-white">
      {showGrid && (
        <div
          aria-hidden="true"
          className="bg-contact-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_85%_85%_at_50%_35%,#000_65%,transparent_100%)]"
        />
      )}
      <div className="container-page relative pt-28 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-28">
        <motion.p
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="eyebrow"
        >
          {eyebrow}
        </motion.p>
        <SplitTextReveal
          text={title}
          as="h1"
          mode="mount"
          delay={0.08}
          className="mt-4 max-w-3xl text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-medium text-primary"
        />
        {text && (
          <motion.p
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.28, ease: EASE_OUT_EXPO }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            {text}
          </motion.p>
        )}
      </div>
    </section>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-accent">
      <Link href={`/services/${s.slug}`} className="block aspect-[4/3] overflow-hidden">
        <img
          src={s.image}
          alt={`${s.title} by Polished by Evestair in Accra`}
          loading="lazy"
          width={1200}
          height={912}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{s.category}</p>
        <h3 className="mt-2 text-2xl text-primary">{s.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.tagline}</p>
        <div className="mt-6 flex items-center justify-between">
          <Link
            href={`/services/${s.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Learn more{" "}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link href={`/quote?service=${s.slug}`} className="text-sm text-muted-foreground transition-colors hover:text-accent">
            Get a quote
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Differentiators() {
  return (
    <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
      {differentiators.map((d, i) => (
        <div key={d.title} className="group bg-card p-8 transition-colors duration-300 hover:bg-secondary/35">
          <span className="inline-block font-display text-sm text-accent">0{i + 1}</span>
          <h3 className="mt-4 text-2xl text-primary">{d.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.text}</p>
        </div>
      ))}
    </div>
  );
}

const serviceWorkflowSteps = [
  {
    step: "1",
    tag: "Step 01",
    title: "Enquiry & Assessment",
    description:
      "We discuss your cleaning needs, property size, and schedule to uncover what your space truly requires.",
    icon: Search,
    variant: "mint" as const,
  },
  {
    step: "2",
    tag: "Step 02",
    title: "Tailored Quotation",
    description:
      "We build a clear, transparent quotation and custom cleaning checklist with no hidden extras or unexpected surprises.",
    icon: FileText,
    variant: "neutral" as const,
  },
  {
    step: "3",
    tag: "Step 03",
    title: "Professional Cleaning",
    description:
      "Our trained, uniformed team arrives on schedule equipped with commercial tools and surface-appropriate products.",
    icon: BrushCleaning,
    variant: "neutral" as const,
  },
  {
    step: "4",
    tag: "Step 04",
    title: "Supervisor Inspection",
    description:
      "A supervisor inspects every detail against our strict checklist before sign-off, ensuring a spotless, guaranteed result.",
    icon: ShieldCheck,
    variant: "mint" as const,
  },
] as const;

export function Steps() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Track scroll through the steps container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.72", "end 0.48"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 24,
    restDelta: 0.001,
  });

  // Line drawing animations (fill forwards as you scroll down, rewind as you scroll up)
  const pathLength1 = useTransform(smoothProgress, [0.05, 0.32], [0, 1]);
  const pathLength2 = useTransform(smoothProgress, [0.36, 0.64], [0, 1]);
  const pathLength3 = useTransform(smoothProgress, [0.68, 0.95], [0, 1]);

  // Arrowhead appearances
  const arrow1Opacity = useTransform(smoothProgress, [0.28, 0.34], [0, 1]);
  const arrow1Scale = useTransform(smoothProgress, [0.28, 0.34], [0.5, 1]);

  const arrow2Opacity = useTransform(smoothProgress, [0.60, 0.66], [0, 1]);
  const arrow2Scale = useTransform(smoothProgress, [0.60, 0.66], [0.5, 1]);

  const arrow3Opacity = useTransform(smoothProgress, [0.91, 0.97], [0, 1]);
  const arrow3Scale = useTransform(smoothProgress, [0.91, 0.97], [0.5, 1]);

  // Card activation border colors
  // const borderColor1 = useTransform(smoothProgress, [0.0, 0.08], ["#cfe7cf", "#10b981"]);
  // const borderColor2 = useTransform(smoothProgress, [0.30, 0.38], ["rgba(226, 232, 240, 0.8)", "#10b981"]);
  // const borderColor3 = useTransform(smoothProgress, [0.62, 0.70], ["rgba(226, 232, 240, 0.8)", "#10b981"]);
  // const borderColor4 = useTransform(smoothProgress, [0.92, 0.99], ["#cfe7cf", "#10b981"]);

  // Icon badge background color transitions
  const iconBg1 = useTransform(smoothProgress, [0.0, 0.08], ["rgba(255, 255, 255, 0.9)", "#10b981"]);
  const iconColor1 = useTransform(smoothProgress, [0.0, 0.08], ["#0c4a34", "#ffffff"]);

  const iconBg2 = useTransform(smoothProgress, [0.30, 0.38], ["#f1f5f9", "#10b981"]);
  const iconColor2 = useTransform(smoothProgress, [0.30, 0.38], ["#0f172a", "#ffffff"]);

  const iconBg3 = useTransform(smoothProgress, [0.62, 0.70], ["#f1f5f9", "#10b981"]);
  const iconColor3 = useTransform(smoothProgress, [0.62, 0.70], ["#0f172a", "#ffffff"]);

  const iconBg4 = useTransform(smoothProgress, [0.92, 0.99], ["rgba(255, 255, 255, 0.9)", "#10b981"]);
  const iconColor4 = useTransform(smoothProgress, [0.92, 0.99], ["#0c4a34", "#ffffff"]);

  // Left vertical pill highlight transforms
  const pillScale1 = useTransform(smoothProgress, [0.0, 0.08], [1, 1.05]);
  const pillScale2 = useTransform(smoothProgress, [0.30, 0.38], [0.96, 1.05]);
  const pillScale3 = useTransform(smoothProgress, [0.62, 0.70], [0.96, 1.05]);
  const pillScale4 = useTransform(smoothProgress, [0.92, 0.99], [0.96, 1.05]);

  // const cardBorderColors = [borderColor1, borderColor2, borderColor3, borderColor4];
  const iconBgs = [iconBg1, iconBg2, iconBg3, iconBg4];
  const iconColors = [iconColor1, iconColor2, iconColor3, iconColor4];
  const pillScales = [pillScale1, pillScale2, pillScale3, pillScale4];
  const pathLengths = [pathLength1, pathLength2, pathLength3];
  const arrowOpacities = [arrow1Opacity, arrow2Opacity, arrow3Opacity];

  return (
    <div ref={containerRef} className="relative mx-auto max-w-5xl">
      {/* Desktop connecting dashed curved lines with arrowheads */}
      <svg
        viewBox="0 0 1000 800"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
      >
        {/* Subtle background inactive dashed guide tracks */}
        <path
          d="M 450 85 H 759 Q 775 85 775 101 V 172"
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
          opacity="0.18"
        />
        <path
          d="M 550 265 H 241 Q 225 265 225 281 V 362"
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
          opacity="0.18"
        />
        <path
          d="M 450 455 H 759 Q 775 455 775 471 V 552"
          stroke="#059669"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          vectorEffect="non-scaling-stroke"
          opacity="0.18"
        />

        {/* Scroll-animated active path 1 (Step 1 -> Step 2) */}
        {reduced ? (
          <path
            d="M 450 85 H 759 Q 775 85 775 101 V 172"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            opacity="0.85"
          />
        ) : (
          <motion.path
            d="M 450 85 H 759 Q 775 85 775 101 V 172"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: pathLength1 }}
          />
        )}

        {/* Scroll-animated active path 2 (Step 2 -> Step 3) */}
        {reduced ? (
          <path
            d="M 550 265 H 241 Q 225 265 225 281 V 362"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            opacity="0.85"
          />
        ) : (
          <motion.path
            d="M 550 265 H 241 Q 225 265 225 281 V 362"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: pathLength2 }}
          />
        )}

        {/* Scroll-animated active path 3 (Step 3 -> Step 4) */}
        {reduced ? (
          <path
            d="M 450 455 H 759 Q 775 455 775 471 V 552"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            opacity="0.85"
          />
        ) : (
          <motion.path
            d="M 450 455 H 759 Q 775 455 775 471 V 552"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: pathLength3 }}
          />
        )}

        {/* Interactive arrowheads pointing down at receiving cards */}
        {reduced ? (
          <>
            <path
              d="M 770 164 L 775 174 L 780 164"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 220 354 L 225 364 L 230 354"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 770 544 L 775 554 L 780 544"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : (
          <>
            <motion.path
              d="M 770 164 L 775 174 L 780 164"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ opacity: arrow1Opacity, scale: arrow1Scale }}
            />
            <motion.path
              d="M 220 354 L 225 364 L 230 354"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ opacity: arrow2Opacity, scale: arrow2Scale }}
            />
            <motion.path
              d="M 770 544 L 775 554 L 780 544"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              style={{ opacity: arrow3Opacity, scale: arrow3Scale }}
            />
          </>
        )}
      </svg>

      {/* Grid container */}
      <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-20 lg:gap-y-10">
        {serviceWorkflowSteps.map((s, i) => {
          const Icon = s.icon;
          const placementClass =
            i === 0
              ? "lg:col-start-1 lg:row-start-1"
              : i === 1
                ? "lg:col-start-2 lg:row-start-2 lg:-mt-10"
                : i === 2
                  ? "lg:col-start-1 lg:row-start-3 lg:-mt-10"
                  : "lg:col-start-2 lg:row-start-4 lg:-mt-10";

          return (
            <div key={s.step} className={placementClass}>
              {reduced ? (
                <article
                  className={`relative flex items-center rounded-[1.75rem] border p-4 sm:p-6 md:p-7 ${
                    s.variant === "mint"
                      ? "bg-[#edf8ed] text-primary"
                      : "bg-white text-primary"
                  }`}
                >
                  {/* Left vertical pill capsule */}
                  <div
                    className={`flex w-8 sm:w-10 shrink-0 flex-col items-center justify-center self-stretch rounded-full py-3 sm:py-4 ${
                      s.variant === "mint"
                        ? "bg-[#0c4a34] text-white"
                        : "bg-[#181d1a] text-white"
                    }`}
                  >
                    <span className="select-none text-[10px] sm:text-[11px] font-semibold tracking-wider text-white uppercase [writing-mode:vertical-rl] rotate-180">
                      {s.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="ml-3.5 flex-1 sm:ml-5 md:ml-6">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span
                        className={`grid size-8 sm:size-10 shrink-0 place-items-center rounded-xl ${
                          s.variant === "mint"
                            ? "bg-white/90 text-[#0c4a34]"
                            : "bg-secondary text-primary"
                        }`}
                      >
                        <Icon className="size-4 sm:size-5" />
                      </span>
                      <h3 className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-primary">
                        <span className="mr-1.5 font-normal text-muted-foreground">{s.step}</span>
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 sm:mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
                      {s.description}
                    </p>
                  </div>
                </article>
              ) : (
                <motion.article
                  className={`relative flex items-center rounded-[1.75rem] p-4 transition-colors sm:p-6 md:p-7 ${
                    s.variant === "mint"
                      ? "bg-[#edf8ed] text-primary"
                      : "bg-white text-primary border"
                  }`}
                >
                  {/* Left vertical pill capsule */}
                  <motion.div
                    style={{ scale: pillScales[i] }}
                    className={`flex w-8 sm:w-10 shrink-0 flex-col items-center justify-center self-stretch rounded-full py-3 sm:py-4 transition-transform ${
                      s.variant === "mint"
                        ? "bg-[#0c4a34] text-white"
                        : "bg-[#181d1a] text-white"
                    }`}
                  >
                    <span className="select-none text-[10px] sm:text-[11px] font-semibold tracking-wider text-white uppercase [writing-mode:vertical-rl] rotate-180">
                      {s.tag}
                    </span>
                  </motion.div>

                  {/* Content */}
                  <div className="ml-3.5 flex-1 sm:ml-5 md:ml-6">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <motion.span
                        style={{
                          backgroundColor: iconBgs[i],
                          color: iconColors[i],
                        }}
                        className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-xl"
                      >
                        <Icon className="size-4 sm:size-5" />
                      </motion.span>
                      <h3 className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-primary">
                        <span className="mr-1.5 font-normal text-muted-foreground">{s.step}</span>
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 sm:mt-3 text-xs leading-relaxed text-muted-foreground sm:text-sm md:text-base">
                      {s.description}
                    </p>
                  </div>
                </motion.article>
              )}

              {/* Mobile dashed vertical arrow connector between items */}
              {i < serviceWorkflowSteps.length - 1 && (
                <div
                  className="my-3 flex flex-col items-center justify-center text-accent/60 lg:hidden"
                  aria-hidden="true"
                >
                  <div className="relative h-7 w-[2px] overflow-hidden rounded-full bg-border">
                    {reduced ? (
                      <div className="h-full w-full bg-emerald-500" />
                    ) : (
                      <motion.div
                        style={{ scaleY: pathLengths[i] }}
                        className="h-full w-full origin-top bg-emerald-500"
                      />
                    )}
                  </div>
                  {reduced ? (
                    <svg className="-mt-0.5 size-3.5 text-emerald-500" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M 2 3 L 5 7 L 8 3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <motion.svg
                      style={{ opacity: arrowOpacities[i] }}
                      className="-mt-0.5 size-3.5 text-emerald-500"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M 2 3 L 5 7 L 8 3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TestimonialGrid({ limit }: { limit?: number }) {
  const list = limit ? testimonials.slice(0, limit) : testimonials;
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <figure key={t.name} className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
            <div className="flex gap-0.5 text-accent" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 flex-1 font-display text-xl leading-snug text-primary">
              “{t.text}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-semibold text-foreground">{t.name}</span>
              <span className="block text-muted-foreground">{t.date} · Bark, UK operations</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollReveal direction="up" distance={14} delay={0.15}>
        <p className="mt-8 text-xs text-muted-foreground">
          These reviews are from customers of Polished by Evestair&apos;s UK operations, published on Bark.
        </p>
      </ScrollReveal>
    </div>
  );
}

export function Coverage({ items }: { items: string[] }) {
  return (
    <StaggerGroup as="ul" stagger={0.055} className="grid gap-3 sm:grid-cols-2">
      {items.map((c) => (
        <StaggerItem as="li" key={c} className="flex items-start gap-3 text-foreground">
          <span className="mt-0.5 rounded-full bg-mint p-1 text-primary">
            <Check className="size-3" />
          </span>
          {c}
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export function FinalCta() {
  return (
    <section className="section">
      <div className="container-page px-2">
        <div className="relative overflow-hidden rounded-3xl bg-mint px-8 py-16 text-center md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 size-44 rotate-12 opacity-45 [background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,0.7)_0,rgba(255,255,255,0.7)_6px,transparent_6px,transparent_16px)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -bottom-8 size-44 -rotate-12 opacity-45 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.7)_0,rgba(255,255,255,0.7)_6px,transparent_6px,transparent_16px)]"
          />
          <div className="relative">
            <ScrollReveal direction="up" distance={16}>
              <p className="eyebrow">Let&apos;s get started</p>
            </ScrollReveal>
            <SplitTextReveal
              as="h2"
              text="A tailored cleaning solution for your space."
              className="mx-auto mt-4 max-w-2xl text-4xl leading-tight text-primary md:text-5xl"
            />
            <ScrollReveal direction="up" distance={18} delay={0.15}>
              <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                Tell us what you need and we&apos;ll prepare a quotation that fits.
              </p>
            </ScrollReveal>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild variant="premium" size="xl">
                <Link href="/quote">Request a Quote</Link>
              </Button>
              <Button asChild variant="soft" size="xl">
                <a
                  href={whatsappLink(
                    "Hello Polished by Evestair Ghana, I'd like to enquire about your services.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
