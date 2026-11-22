"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { StaggerGroup, StaggerItem } from "@/components/motion/primitives";

export interface PurposeItem {
  title: string;
  description: string;
}

const DEFAULT_PURPOSE: readonly PurposeItem[] = [
  {
    title: "Mission",
    description:
      "To deliver reliable, detailed and professional cleaning solutions that create cleaner, safer and more welcoming spaces for every client.",
  },
  {
    title: "Vision",
    description:
      "To become one of Ghana's most trusted cleaning and mobile vehicle-care brands, recognised for dependable service, consistent standards and attention to detail.",
  },
  {
    title: "Our Process",
    description:
      "Every job is carried out by trained staff using professional equipment, guided by structured checklists and finished with a supervisor inspection.",
  },
];

export function PurposeCards({
  items = DEFAULT_PURPOSE,
}: {
  items?: readonly PurposeItem[];
}) {
  const desktopRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Scroll animation for desktop curves
  const { scrollYProgress: desktopProgress } = useScroll({
    target: desktopRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const smoothDesktop = useSpring(desktopProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  const maxProgress = useMotionValue(0);

  useEffect(() => {
    const initial = smoothDesktop.get();
    if (initial > maxProgress.get()) {
      maxProgress.set(Math.min(1, initial));
    }
  }, [smoothDesktop, maxProgress]);

  useMotionValueEvent(smoothDesktop, "change", (latest) => {
    if (latest > maxProgress.get()) {
      maxProgress.set(Math.min(1, latest));
    }
  });

  const path1Length = useTransform(maxProgress, [0.05, 0.45], [0, 1]);
  const path2Length = useTransform(maxProgress, [0.35, 0.75], [0, 1]);
  const path3Length = useTransform(maxProgress, [0.65, 0.95], [0, 1]);

  const dot0Scale = useTransform(maxProgress, [0.02, 0.08], [0.3, 1]);
  const dot1Scale = useTransform(maxProgress, [0.4, 0.48], [0, 1]);
  const dot2Scale = useTransform(maxProgress, [0.35, 0.42], [0.3, 1]);
  const dot3Scale = useTransform(maxProgress, [0.7, 0.78], [0, 1]);
  const dot4Scale = useTransform(maxProgress, [0.65, 0.72], [0.3, 1]);
  const dot5Scale = useTransform(maxProgress, [0.9, 0.98], [0, 1]);

  const desktopDots = [
    { x: 110, y: 240, scale: dot0Scale },
    { x: 411, y: 360, scale: dot1Scale },
    { x: 789, y: 300, scale: dot2Scale },
    { x: 900, y: 240, scale: dot3Scale },
    { x: 880, y: 0, scale: dot4Scale },
    { x: 1040, y: 0, scale: dot5Scale },
  ];

  return (
    <div ref={desktopRef} className="relative mt-12 lg:mt-20 lg:h-[27rem]">
      {/* Desktop Curved Connectors (hidden on mobile, visible on lg) */}
      <svg
        viewBox="0 0 1200 432"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block"
      >
        <g stroke="var(--border)" strokeWidth="1.5" vectorEffect="non-scaling-stroke">
          <motion.path
            d="M 110 240 C 80 350, 250 380, 411 360"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduced ? 1 : path1Length }}
          />
          <motion.path
            d="M 789 300 C 850 300, 900 290, 900 240"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduced ? 1 : path2Length }}
          />
          <motion.path
            d="M 880 0 C 850 -110, 1090 -120, 1040 0"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: reduced ? 1 : path3Length }}
          />
        </g>
      </svg>

      {/* Desktop Connector Dots (HTML spans so they stay perfectly round) */}
      {desktopDots.map((dot, idx) => (
        <motion.span
          key={`${dot.x}-${dot.y}-${idx}`}
          aria-hidden="true"
          style={{
            left: `${(dot.x / 1200) * 100}%`,
            top: `${(dot.y / 432) * 100}%`,
            scale: reduced ? 1 : dot.scale,
          }}
          className="absolute z-10 hidden size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-border lg:block"
        />
      ))}

      {/* Cards List: Clean stacked cards with gap on mobile, 3-column staggered on desktop */}
      <StaggerGroup
        stagger={0.12}
        className="relative grid gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8"
      >
        {items.map((item, i) => (
          <div key={item.title} className={i === 1 ? "lg:mt-48" : ""}>
            <StaggerItem className="h-full">
              <article className="flex h-full flex-col rounded-2xl bg-white p-6 sm:p-7 shadow-soft lg:h-[15rem]">
                <h3 className="text-base font-semibold tracking-wide text-primary uppercase">
                  <span className="mr-2 text-lg text-accent">
                    {String(i + 1).padStart(2, "0")}/
                  </span>
                  {item.title}
                </h3>
                <p className="mt-6 sm:mt-8 text-sm leading-relaxed text-muted-foreground lg:mt-auto">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          </div>
        ))}
      </StaggerGroup>
    </div>
  );
}

