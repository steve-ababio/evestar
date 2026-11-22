"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { services } from "@/lib/site";
import { EASE_OUT_EXPO, SPRING_SNAPPY } from "@/components/motion/primitives";
import { ServiceCardIllustration } from "@/components/site/ServiceNavIllustrations";

const nav = [
  { href: "/about", label: "About" },
  { href: "/why-choose-us", label: "Why Us" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

const DEFAULT_FEATURED_SLUG = services[0]?.slug ?? "post-construction-cleaning";

type DropdownServiceItem = {
  slug: string;
  title: string;
  tagline: string;
  href: string;
  badge?: string;
};

const dropdownItems: DropdownServiceItem[] = [
  ...services.map((s) => ({
    slug: s.slug,
    title: s.title,
    tagline: s.tagline,
    href: `/services/${s.slug}`,
    ...(s.slug === "mobile-vehicle-care" ? { badge: "Popular" } : {}),
  })),
  {
    slug: "all-services",
    title: "All Services",
    tagline: "Compare every residential, commercial & vehicle plan.",
    href: "/services",
  },
];

export function Logo() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      transition={SPRING_SNAPPY}
      className="shrink-0"
    >
      <Link
        href="/"
        aria-label="Polished by Evestair Ghana home"
      >
        <img src="/images/evestar-logo.png" className="h-7 md:h-8.5 w-auto object-contain rounded-full" height="34" width="150" alt="Evestar logo"/>
      </Link>
    </motion.div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [activeCardSlug, setActiveCardSlug] = useState<string>(DEFAULT_FEATURED_SLUG);
  const [scrolled, setScrolled] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  function openServices() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesOpen(true);
  }

  function scheduleCloseServices() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
      setActiveCardSlug(DEFAULT_FEATURED_SLUG);
    }, 140);
  }

  function closeServicesImmediately() {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesOpen(false);
    setHoveredHref(null);
    setActiveCardSlug(DEFAULT_FEATURED_SLUG);
  }

  const isServicesActive = pathname.startsWith("/services");

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex w-full flex-col items-center px-4 py-3"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeServicesImmediately();
          setOpen(false);
        }
      }}
    >
      <div className="relative flex w-full max-w-md flex-col items-center lg:w-max lg:max-w-none">
        <motion.header
          initial={reduced ? { opacity: 0 } : { y: -28, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          className={`pointer-events-auto relative flex w-full items-center justify-between gap-2 rounded-full bg-white p-1.5  text-primary backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 lg:w-max lg:justify-center lg:gap-2 xl:gap-2.5 lg:px-7 lg:py-3 ${
            scrolled
              ? "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),10px_18px_44px_-10px_oklch(0.24_0.055_258/0.18)]"
              : "shadow-[inset_0_1px_0_rgba(255,255,255,0.9),10px_12px_36px_-10px_oklch(0.24_0.055_258/0.12)]"
          }`}
        >
          <div className="flex shrink-0 items-center gap-2">
            <Logo />
          </div>

          <nav
            className="hidden shrink-0 items-center gap-0.5 px-0.5 lg:flex"
            aria-label="Main"
            onMouseLeave={() => setHoveredHref(null)}
          >
            <div
              className="relative flex items-center"
              onMouseEnter={() => {
                openServices();
                setHoveredHref("/services");
              }}
              onMouseLeave={scheduleCloseServices}
              onFocus={() => {
                openServices();
                setHoveredHref("/services");
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                  scheduleCloseServices();
                  setHoveredHref(null);
                }
              }}
            >
              <Link
                href="/services"
                onClick={closeServicesImmediately}
                className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 lg:px-3 xl:px-3.5 py-1.5 text-[13px] tracking-[-0.01em] transition-colors ${
                  isServicesActive
                    ? "text-accent font-semibold"
                    : hoveredHref === "/services" || servicesOpen
                    ? "text-primary font-medium"
                    : "text-primary/70 hover:text-primary font-medium"
                }`}
              >
                {hoveredHref === "/services" && (
                  <motion.span
                    layoutId="navbar-hover-pill"
                    className="pointer-events-none absolute inset-0 rounded-full bg-secondary/80"
                    transition={SPRING_SNAPPY}
                  />
                )}
                <motion.span
                  animate={{ y: hoveredHref === "/services" && !reduced ? -1.5 : 0 }}
                  transition={SPRING_SNAPPY}
                  className="relative z-10 inline-flex items-center gap-1"
                >
                  Services
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                    className="inline-flex"
                  >
                    <ChevronDown className="size-3.5" />
                  </motion.span>
                </motion.span>
              </Link>
            </div>

            {nav.map((n) => {
              const isActive = pathname === n.href;
              const isHovered = hoveredHref === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onMouseEnter={() => setHoveredHref(n.href)}
                  onFocus={() => setHoveredHref(n.href)}
                  className={`relative inline-flex items-center justify-center whitespace-nowrap rounded-full px-2.5 lg:px-3 xl:px-3.5 py-1.5 text-[13px] tracking-[-0.01em] transition-colors ${
                    isActive
                      ? "text-accent font-semibold"
                      : isHovered
                      ? "text-primary font-medium"
                      : "text-primary/70 hover:text-primary font-medium"
                  }`}
                >
                  {isHovered && (
                    <motion.span
                      layoutId="navbar-hover-pill"
                      className="pointer-events-none absolute inset-0 rounded-full bg-secondary/80"
                      transition={SPRING_SNAPPY}
                    />
                  )}
                  <motion.span
                    animate={{ y: isHovered && !reduced ? -1.5 : 0 }}
                    transition={SPRING_SNAPPY}
                    className="relative z-10 inline-block"
                  >
                    {n.label}
                  </motion.span>
                </Link>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <motion.div
              whileHover={reduced ? undefined : { scale: 1.03, y: -1 }}
              whileTap={reduced ? undefined : { scale: 0.96 }}
              transition={SPRING_SNAPPY}
              className="hidden sm:block"
            >
              <Link
                href="/quote"
                className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3.5 xl:px-4 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-accent"
              >
                Request a Quote
                <ArrowUpRight className="size-3.5 shrink-0" />
              </Link>
            </motion.div>

            <motion.button
              whileTap={reduced ? undefined : { scale: 0.9 }}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-white/75 text-primary transition-colors hover:bg-white lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.8 }}
                    transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                    className="inline-flex"
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: 45, scale: 0.8 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: -45, scale: 0.8 }}
                    transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                    className="inline-flex"
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.header>

        {/* Uniform 12-Card Frosted Glass Services Mega-Dropdown */}
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
              className="pointer-events-auto absolute top-full left-1/2 z-50 hidden w-[min(94vw,66rem)] -translate-x-1/2 pt-3 lg:block"
            >
              <div
                data-lenis-prevent
                className="max-h-[calc(100vh-6rem)] overflow-y-auto rounded-[1.5rem] border border-white/75 bg-white/72 p-3 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_28px_64px_-16px_oklch(0.24_0.055_258/0.2)]"
              >
                <div className="grid grid-cols-4 gap-2.5">
                  {dropdownItems.map((item) => {
                    const isFeatured = activeCardSlug === item.slug;
                    return (
                      <Link
                        key={item.slug}
                        href={item.href}
                        onMouseEnter={() => setActiveCardSlug(item.slug)}
                        onFocus={() => setActiveCardSlug(item.slug)}
                        onClick={closeServicesImmediately}
                        className={`group relative flex h-[10.5rem] flex-col justify-between overflow-hidden rounded-xl p-4 transition-colors duration-200 ${
                          isFeatured
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-white/95 text-primary shadow-[0_2px_10px_-4px_oklch(0.24_0.055_258/0.1)]"
                        }`}
                      >
                        <div className="relative z-10 pr-2">
                          <h3 className="text-[0.95rem] leading-snug font-semibold tracking-tight">{item.title}</h3>
                          <p
                            className={`mt-1 line-clamp-2 text-[11px] leading-relaxed ${
                              isFeatured ? "text-primary-foreground/75" : "text-muted-foreground"
                            }`}
                          >
                            {item.tagline}
                          </p>
                          {item.badge && (
                            <span
                              className={`mt-2 inline-flex w-fit rounded-md px-2.5 py-0.5 text-[10px] font-medium ${
                                isFeatured
                                  ? "bg-mint text-primary"
                                  : "bg-primary text-primary-foreground"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <div className="pointer-events-none relative -mr-1.5 -mb-1.5 self-end">
                          <ServiceCardIllustration slug={item.slug} dark={isFeatured} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modern Glass Mobile Drawer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0, y: -8 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: EASE_OUT_EXPO }}
            className="pointer-events-auto mt-2 w-full max-w-md overflow-hidden rounded-3xl border border-white/75 bg-white/78 text-primary backdrop-blur-2xl backdrop-saturate-150 shadow-[0_24px_50px_-12px_oklch(0.24_0.055_258/0.18)] lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 p-4">
              {[{ href: "/services", label: "Services" }, ...nav].map((n, idx) => {
                const isActive =
                  n.href === "/services" ? isServicesActive : pathname === n.href;
                return (
                  <motion.div
                    key={n.href}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: reduced ? 0 : idx * 0.04, ease: EASE_OUT_EXPO }}
                  >
                    <Link
                      href={n.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl px-3 py-3 text-base transition-colors hover:bg-white/70 ${
                        isActive ? "bg-white/80 text-accent font-semibold" : "text-primary/75 font-medium"
                      }`}
                    >
                      <span>{n.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: reduced ? 0 : 0.2, ease: EASE_OUT_EXPO }}
                className="mt-2"
              >
                <Link
                  href="/quote"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
                >
                  Request a Quote
                  <ArrowUpRight className="size-4" />
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
