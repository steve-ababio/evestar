"use client";

import { useRef } from "react";
import {
  Calendar,
  FileText,
  HardHat,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { processSteps } from "@/lib/site";

const STEP_ICONS: readonly LucideIcon[] = [
  MessageCircle,
  Users,
  FileText,
  Calendar,
  HardHat,
  ShieldCheck,
];

const STEP_LINE_COLORS = [
  "#10b981", // Step 1 -> 2 start (emerald-teal)
  "#10b981", // Step 1 -> 2 start (emerald-teal)
  "#10b981", // Step 1 -> 2 start (emerald-teal)
  "#10b981", // Step 1 -> 2 start (emerald-teal)
  "#10b981", // Step 1 -> 2 start (emerald-teal)
  "#10b981", // Step 1 -> 2 start (emerald-teal)
] as const;

function TimelineRow({
  index,
  title,
  description,
  Icon,
  total,
  smoothProgress,
  reduced,
}: {
  index: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  total: number;
  smoothProgress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const isLast = index === total - 1;
  const stepColor = STEP_LINE_COLORS[index % STEP_LINE_COLORS.length];
  const nextColor = STEP_LINE_COLORS[(index + 1) % STEP_LINE_COLORS.length];

  const nodeAt = total > 1 ? index / (total - 1) : 0;
  const nodeStart = index === 0 ? 0 : Math.max(0, nodeAt - 0.08);
  const nodeEnd = index === 0 ? 0.06 : nodeAt;

  const segStart = total > 1 ? index / (total - 1) : 0;
  const segEnd = total > 1 ? (index + 1) / (total - 1) : 1;

  const iconBorderColor = useTransform(
    smoothProgress,
    [nodeStart, nodeEnd],
    ["rgba(203, 213, 225, 0.75)", stepColor],
  );
  const iconColor = useTransform(smoothProgress, [nodeStart, nodeEnd], ["#0d9488", stepColor]);

  const segScaleY = useTransform(smoothProgress, [segStart, segEnd], [0, 1]);
  const segColor = useTransform(smoothProgress, [segStart, segEnd], [stepColor, nextColor]);

  return (
    <li className="grid grid-cols-[3rem_1fr] gap-x-6">
      <div className="flex flex-col items-center">
        {reduced ? (
          <span
            style={{ borderColor: stepColor, color: stepColor }}
            className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-white"
          >
            <Icon className="size-5" />
          </span>
        ) : (
          <motion.span
            style={{ borderColor: iconBorderColor, color: iconColor }}
            className="flex size-12 shrink-0 items-center justify-center rounded-full border-2 bg-white"
          >
            <Icon className="size-5" />
          </motion.span>
        )}

        {!isLast && (
          <div className="relative my-1.5 min-h-16 w-[2px] flex-1 overflow-hidden rounded-full bg-border/80">
            {reduced ? (
              <div
                style={{
                  background: `linear-gradient(to bottom, ${stepColor}, ${nextColor})`,
                }}
                className="absolute inset-0 rounded-full"
              />
            ) : (
              <motion.div
                style={{
                  scaleY: segScaleY,
                  backgroundColor: segColor,
                }}
                className="absolute inset-0 origin-top rounded-full will-change-transform"
              />
            )}
          </div>
        )}
      </div>

      <div className={isLast ? "pb-2" : "pb-10 md:pb-12"}>
        <span className="block text-[0.7rem] font-semibold tracking-[0.16em] uppercase text-accent">
          STEP {index + 1}
        </span>
        <h3 className="mt-1 text-lg font-semibold text-primary">{title}</h3>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </li>
  );
}

/**
 * White-background vertical icon timeline whose connecting lines fill and change color on scroll.
 */
export function ServiceTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.72", "end 0.58"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <div ref={timelineRef} className="relative">
      <ol className="flex flex-col">
        {processSteps.map((step, index) => (
          <TimelineRow
            key={step.title}
            index={index}
            title={step.title}
            description={step.description}
            Icon={STEP_ICONS[index % STEP_ICONS.length]}
            total={processSteps.length}
            smoothProgress={smoothProgress}
            reduced={reduced}
          />
        ))}
      </ol>
    </div>
  );
}

/**
 * Two-column white-background process showcase matching the split sticky heading + animated timeline layout.
 */
export function ServiceProcessSection() {
  return (
    <section className="bg-white py-4 md:py-10">
      <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[0.7rem] font-bold tracking-[0.14em] uppercase text-accent">
            How our service works
          </span>
          <h2 className="mt-5 text-4xl leading-[1.12] font-semibold tracking-tight md:text-7xl">
            <span className="block text-primary">A structured process,</span>
            <span className="block text-accent">every single time</span>
          </h2>
          <p className="mt-5 max-w-md text-sm md:text-lg leading-relaxed text-muted-foreground">
            From first message to final inspection, every assignment follows the same clear steps — so you always
            know what happens next.
          </p>
        </div>
        <ServiceTimeline />
      </div>
    </section>
  );
}
