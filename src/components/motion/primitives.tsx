"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const SPRING_SNAPPY = { type: "spring" as const, stiffness: 320, damping: 28 };
export const SPRING_SOFT = { type: "spring" as const, stiffness: 180, damping: 24 };
export const DEFAULT_VIEWPORT = { once: true, amount: 0.15 } as const;

type RevealDirection = "up" | "down" | "left" | "right" | "none";

/**
 * Scroll-triggered directional reveal with optional blur and scale settling.
 */
export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 36,
  blur = false,
  scale = 0.97,
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  scale?: number;
}) {
  const reduced = useReducedMotion();

  const offset = reduced
    ? { x: 0, y: 0 }
    : {
        x: direction === "left" ? -distance : direction === "right" ? distance : 0,
        y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      };

  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? { opacity: 0 }
          : {
              opacity: 0,
              x: offset.x,
              y: offset.y,
              scale,
              ...(blur ? { filter: "blur(8px)" } : {}),
            }
      }
      whileInView={
        reduced
          ? { opacity: 1 }
          : {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              ...(blur ? { filter: "blur(0px)" } : {}),
            }
      }
      viewport={DEFAULT_VIEWPORT}
      transition={{ duration: reduced ? 0.25 : duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

const SPLIT_TEXT_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

/**
 * Splits a heading or sentence into masked word tokens that glide up smoothly.
 */
export function SplitTextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  mode = "inView",
}: {
  text: string;
  as?: keyof typeof SPLIT_TEXT_TAGS;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: "mount" | "inView";
}) {
  const reduced = useReducedMotion();
  const Tag = SPLIT_TEXT_TAGS[as];

  if (reduced) {
    return (
      <Tag
        className={className}
        initial={{ opacity: 0 }}
        animate={mode === "mount" ? { opacity: 1 } : undefined}
        whileInView={mode === "inView" ? { opacity: 1 } : undefined}
        viewport={mode === "inView" ? DEFAULT_VIEWPORT : undefined}
        transition={{ duration: 0.25, delay }}
      >
        {text}
      </Tag>
    );
  }

  const words = text.split(" ");

  return (
    <Tag
      className={className}
      aria-label={text}
      initial="hidden"
      animate={mode === "mount" ? "visible" : undefined}
      whileInView={mode === "inView" ? "visible" : undefined}
      viewport={mode === "inView" ? DEFAULT_VIEWPORT : undefined}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="mr-[0.26em] -mb-[0.08em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0"
          aria-hidden="true"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0, rotate: 2.5 },
              visible: {
                y: "0%",
                opacity: 1,
                rotate: 0,
                transition: {
                  duration: 0.7,
                  ease: EASE_OUT_EXPO,
                },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

const STAGGER_GROUP_TAGS = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
} as const;

const STAGGER_ITEM_TAGS = {
  div: motion.div,
  li: motion.li,
} as const;

/**
 * Coordinates staggered entrance choreography across direct StaggerItem children.
 */
export function StaggerGroup({
  children,
  className,
  as = "div",
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof STAGGER_GROUP_TAGS;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const Tag = STAGGER_GROUP_TAGS[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={DEFAULT_VIEWPORT}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
            delayChildren: reduced ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Individual staggered item paired with StaggerGroup.
 */
export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof typeof STAGGER_ITEM_TAGS;
}) {
  const reduced = useReducedMotion();
  const Tag = STAGGER_ITEM_TAGS[as];

  return (
    <Tag
      className={className}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: reduced ? 0.25 : 0.65, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </Tag>
  );
}

/**
 * Scroll-scrubbed entrance that scales and rises showcase panels smoothly into frame.
 */
export function ScrollScaleSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  const scale = useTransform(smooth, [0, 1], [0.93, 1]);
  const y = useTransform(smooth, [0, 1], [44, 0]);
  const opacity = useTransform(smooth, [0, 0.45, 1], [0.6, 0.95, 1]);

  if (reduced) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ scale, y, opacity }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Scroll-scrubbed vertical parallax image frame with zoomed edge safety.
 */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  intensity = 48,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  intensity?: number;
  loading?: "lazy" | "eager";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.16, 1.09, 1.16]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        style={reduced ? undefined : { y, scale }}
        className={cn("absolute inset-0 h-full w-full object-cover will-change-transform", imgClassName)}
      />
    </div>
  );
}

/**
 * Animates numeric stat metrics up from zero when entering the viewport.
 */
export function CountUpMetric({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  const match = /^(\d+)(.*)$/.exec(value.trim());
  const targetNum = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState<number>(0);

  useEffect(() => {
    if (reduced || targetNum === null || !isInView) return;

    const controls = animate(0, targetNum, {
      duration: 1.5,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });

    return () => controls.stop();
  }, [isInView, reduced, targetNum]);

  if (reduced || targetNum === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {isInView ? `${display}${suffix}` : `0${suffix}`}
    </span>
  );
}

function wrapPercent(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Infinite dual-track ticker whose speed and direction respond to scroll velocity.
 */
export function ScrollVelocityMarquee({
  items,
  baseVelocity = -35,
  className,
}: {
  items: { label: string; href?: string }[];
  baseVelocity?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-3.5, 0, 3.5]);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;

    const dt = Math.min(delta, 50) / 1000;
    const hoverMultiplier = isHovered ? 0.25 : 1;

    const currentVel = velocityFactor.get();
    if (currentVel < 0) {
      directionFactor.current = -1;
    } else if (currentVel > 0) {
      directionFactor.current = 1;
    }

    // Scale px-like velocity down to percentage units of the dual track
    let moveBy = directionFactor.current * (baseVelocity * 0.08) * dt * hoverMultiplier;
    moveBy *= 1 + Math.abs(currentVel);
    baseX.set(wrapPercent(-50, 0, baseX.get() + moveBy));
  });

  const x = useTransform(baseX, (v) => `${v}%`);

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-4 px-4", className)}>
        {items.map((item) =>
          item.href ? (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-xs transition-colors hover:text-accent"
            >
              <Sparkles className="size-3.5 text-accent" />
              {item.label}
            </Link>
          ) : (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm font-medium text-primary shadow-xs"
            >
              <Sparkles className="size-3.5 text-accent" />
              {item.label}
            </span>
          ),
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div className="flex w-max items-center" style={{ x }}>
        {[0, 1].map((trackIndex) => (
          <div
            key={trackIndex}
            className="flex shrink-0 items-center gap-4 pr-4"
            aria-hidden={trackIndex === 1}
          >
            {items.map((item) =>
              item.href ? (
                <Link
                  key={`${trackIndex}-${item.label}`}
                  href={item.href}
                  tabIndex={trackIndex === 1 ? -1 : undefined}
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-medium text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <Sparkles className="size-3.5 text-accent" />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  key={`${trackIndex}-${item.label}`}
                  className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-border/80 bg-card px-4 py-2 text-sm font-medium text-primary"
                >
                  <Sparkles className="size-3.5 text-accent" />
                  <span>{item.label}</span>
                </span>
              ),
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Gentle infinite floating motion wrapper for accent badges.
 */
export function FloatingBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -7, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
