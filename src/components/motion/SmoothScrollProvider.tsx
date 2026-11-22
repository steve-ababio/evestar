"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { MotionConfig, cancelFrame, frame, motion } from "motion/react";
import { usePathname } from "next/navigation";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/**
 * Animates each route change into view smoothly without blocking Next.js App Router navigation.
 */
export function PageEntrance({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Provides global inertial smooth scrolling via Lenis synchronized with Motion's RAF loop.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    function update(data: { timestamp: number }) {
      lenis.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
