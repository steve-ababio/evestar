"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrushCleaning,
  CheckCircle2,
  ClipboardList,
  Smile,
  Phone,
  ShieldCheck,
  Users,
  Wrench,
  CalendarCheck,
  Star,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { contact, images, services, testimonials } from "@/lib/site";
import { QuoteForm } from "@/components/site/QuoteForm";
import { ServiceProcessSection } from "@/components/site/ServiceTimeline";
import {
  CountUpMetric,
  EASE_OUT_EXPO,
  ParallaxImage,
  ScrollReveal,
  SplitTextReveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/motion/primitives";

const Eyebrow = ({ children, light }: { children: string; light?: boolean }) => (
  <p className={`eyebrow flex items-center gap-2 [.text-center_&]:justify-center ${light ? "text-mint" : ""}`}>
    {children}
  </p>
);

const faqs: [string, string][] = [
  [
    "What areas do you cover?",
    "We serve homes, businesses, sites and events across Accra. Get in touch with your location and we'll confirm availability.",
  ],
  [
    "How much does a clean cost?",
    "Every job is assessed individually, so we prepare a tailored quotation based on size, condition and what you need.",
  ],
  [
    "Do you bring your own equipment and products?",
    "Yes. Our trained team arrives with professional equipment and suitable cleaning products.",
  ],
  [
    "Can I book regular cleaning?",
    "Absolutely — choose one-off, scheduled or contract cleaning to fit your timetable.",
  ],
];

export function HomeContent() {
  const reduced = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "18%"]);
  const heroImgScale = useTransform(heroScroll, [0, 1], [1.04, 1.15]);

  const stepsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: stepsScroll } = useScroll({
    target: stepsRef,
    offset: ["start 0.85", "center 0.55"],
  });
  const stepsLineScale = useSpring(stepsScroll, {
    stiffness: 160,
    damping: 26,
  });

  const featured = [
    "post-construction-cleaning",
    "commercial-cleaning",
    "carpet-cleaning",
    "move-in-move-out-cleaning",
  ].map((s) => services.find((x) => x.slug === s)!);

  const feats = [
    { icon: ClipboardList, t: "Tailored Quotes", d: "Every space assessed for a plan and price that fits." },
    { icon: Wrench, t: "Professional Equipment", d: "Commercial-grade tools and products for each surface." },
    { icon: ShieldCheck, t: "Structured Quality Checks", d: "Checklists and supervisor inspections on every job." },
    { icon: Users, t: "Trained & Supervised Team", d: "Cleaners trained in our UK-inspired methods." },
  ];

  return (
    <div className="space-y-6 pb-6 md:space-y-8">
      {/* Hero */}
      <section className="container-page px-0 md:px-5 max-w-full w-full md:max-w-[150rem] pt-0 md:pt-3">
        <div ref={heroRef} className="relative overflow-hidden md:rounded-[2rem] bg-secondary">
          {/* Top-center cutout notch that cradles the floating navbar (desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-px left-1/2 z-20 hidden -translate-x-1/2 items-start lg:flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="-mr-px size-6 shrink-0 text-background"
            >
              <path d="M24 0H0C13.255 0 24 10.745 24 24V0Z" fill="currentColor" />
            </svg>
            <div className="h-[4.375rem] w-[54.5rem] rounded-b-[2rem] bg-background" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="-ml-px size-6 shrink-0 text-background"
            >
              <path d="M0 0H24C10.745 0 0 10.745 0 24V0Z" fill="currentColor" />
            </svg>
          </div>

          <motion.div
            className="absolute inset-0"
            initial={reduced ? undefined : { scale: 1.12 }}
            animate={reduced ? undefined : { scale: 1 }}
            transition={{ duration: 1.3, ease: EASE_OUT_EXPO }}
          >
            <motion.img
              src={images.cleaning}
              alt="A Polished by Evestair cleaner wiping glass in a bright office"
              width={1200}
              height={912}
              style={reduced ? undefined : { y: heroImgY, scale: heroImgScale }}
              className="h-full w-full object-cover object-[70%_center] will-change-transform"
            />
          </motion.div>

          <div className="relative grid min-h-[85vh] items-center p-4 pt-20 sm:p-8 sm:pt-24 md:p-12 md:pt-28 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl bg-card/95 p-6 shadow-soft backdrop-blur sm:p-8 md:p-10">
              <SplitTextReveal
                as="h1"
                mode="mount"
                delay={0.12}
                text="Sparkling Residential & Commercial Cleaning in Accra"
                className="text-3xl leading-[1.14] font-semibold text-primary sm:text-4xl md:text-5xl"
              />
              <motion.p
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.35, ease: EASE_OUT_EXPO }}
                className="mt-4 sm:mt-5 text-sm sm:text-base text-muted-foreground"
              >
                From homes and offices to construction sites, events and vehicles — professional cleaning with
                attention to every detail.
              </motion.p>
              <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row flex-wrap gap-3">
                <Button asChild variant="mint" size="xl" className="w-full sm:w-auto">
                  <Link href="/quote">Free Quote</Link>
                </Button>
                <Button asChild variant="soft" size="xl" className="w-full sm:w-auto">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: reduced ? 0 : 0.08,
                      delayChildren: reduced ? 0 : 0.55,
                    },
                  },
                }}
                className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
              >
                {["Professional", "Trusted", "UK standards"].map((x) => (
                  <motion.li
                    key={x}
                    variants={{
                      hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 10 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.45, ease: EASE_OUT_EXPO },
                      },
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="size-4 text-accent" />
                    {x}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* <div className="absolute right-6 bottom-6 hidden items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-soft md:flex">
            <Star className="size-4 fill-accent text-accent" />
            <span className="text-sm font-semibold text-primary">5.0</span>
            <span className="text-xs text-muted-foreground">Bark reviews (UK)</span>
          </div> */}
        </div>
      </section>

      {/* Steps */}
      <section className="container-page py-10 sm:py-14 text-center">
        <ScrollReveal direction="up" distance={20}>
          <Eyebrow>How it works</Eyebrow>
        </ScrollReveal>
        <SplitTextReveal as="h2" text="Quick and Easy" className="mt-3 text-3xl sm:text-4xl text-primary" />

        <div ref={stepsRef} className="relative mt-10 sm:mt-12">
          <svg
            viewBox="0 0 900 110"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="pointer-events-none absolute top-0 right-[16.666%] left-[16.666%] z-0 block h-16 sm:h-28 w-[66.666%] overflow-visible"
          >
            <defs>
              <linearGradient id="steps-curve-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--mint)" />
                <stop offset="50%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>
            </defs>
            <path
              d="M 0 48 C 140 2, 310 2, 450 48 C 590 94, 760 94, 900 48"
              stroke="var(--mint)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity="0.75"
            />
            <motion.path
              d="M 0 48 C 140 2, 310 2, 450 48 C 590 94, 760 94, 900 48"
              stroke="url(#steps-curve-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              style={reduced ? undefined : { pathLength: stepsLineScale }}
            />
            {!reduced && (
              <motion.path
                d="M 0 48 C 140 2, 310 2, 450 48 C 590 94, 760 94, 900 48"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="24 160"
                animate={{ strokeDashoffset: [0, -184] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                opacity="0.7"
              />
            )}
          </svg>
          <StaggerGroup stagger={0.12} className="relative z-10 grid grid-cols-3 gap-2 sm:gap-10">
            {[
              { i: Phone, t: "Free Quote", d: "Tell us about your space and get a tailored quotation." },
              { i: BrushCleaning, t: "We Clean", d: "Our trained team arrives with professional equipment." },
              { i: Smile, t: "Relax", d: "Enjoy a spotless space, checked by a supervisor." },
            ].map(({ i: Icon, t, d }) => (
              <StaggerItem key={t} className="flex flex-col items-center">
                <span className="relative z-10 grid size-16 sm:size-24 place-items-center rounded-full border-2 border-mint bg-secondary text-primary">
                  <Icon className="size-6 sm:size-9" />
                </span>
                <h3 className="mt-3 text-xs sm:text-xl font-medium sm:font-normal text-primary">{t}</h3>
                <p className="mt-1 sm:mt-2 max-w-xs text-[10px] sm:text-sm leading-snug sm:leading-normal text-muted-foreground">{d}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* About */}
      <section className="container-page">
        <div className="grid items-center gap-10 rounded-[2rem] bg-muted py-8 px-6 md:p-12 lg:grid-cols-2">
          <div>
            <ScrollReveal direction="up" distance={16}>
              <Eyebrow>Who we are</Eyebrow>
            </ScrollReveal>
            <SplitTextReveal
              as="h2"
              text="We Are the Best Option for a Sparkling Space"
              className="mt-3 text-2xl md:text-4xl leading-tight text-primary"
            />
            <ScrollReveal direction="up" distance={22} delay={0.12}>
              <p className="mt-5 text-muted-foreground">
                Polished by Evestair is a UK-founded cleaning brand, now bringing the same consistent standards to
                residential, commercial, industrial and event clients across Accra.
              </p>
            </ScrollReveal>
            <StaggerGroup as="ul" stagger={0.1} delay={0.2} className="mt-6 space-y-3 text-sm text-foreground">
              <StaggerItem as="li" className="flex gap-2">
                <CheckCircle2 className="size-5 shrink-0 text-accent" />
                Trained staff, structured checklists and supervisor inspections.
              </StaggerItem>
              <StaggerItem as="li" className="flex gap-2">
                <CheckCircle2 className="size-5 shrink-0 text-accent" />
                One-off, scheduled or contract cleaning — around your timetable.
              </StaggerItem>
            </StaggerGroup>
            <Button asChild variant="mint" size="xl" className="mt-8">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <ParallaxImage
            src={images.interior}
            alt="A bright, freshly cleaned living room"
            loading="lazy"
            width={1600}
            height={1104}
            intensity={44}
            className="aspect-[4/3] w-full rounded-3xl shadow-soft"
          />
        </div>
      </section>

      {/* Experience panel */}
      <section className="container-page">
        <div className="relative rounded-[2rem] bg-accent px-4 pt-14 pb-20 sm:px-6 sm:pt-16 sm:pb-24 text-center md:px-12">
          <ScrollReveal direction="up" distance={16}>
            <Eyebrow light>Why choose us</Eyebrow>
          </ScrollReveal>
          <SplitTextReveal
            as="h2"
            text="We Are Experienced & We Have Expert Teams"
            className="mx-auto mt-3 max-w-xl text-3xl sm:text-4xl leading-tight text-accent-foreground"
          />
          <div className="mt-12 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            {feats.map(({ icon: Icon, t, d }) => (
              <div key={t} className="h-full rounded-2xl bg-card p-6 shadow-soft">
                <Icon className="size-7 text-accent" />
                <h3 className="mt-4 text-lg text-primary">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-8 text-accent-foreground md:grid-cols-4">
            {[
              ["11", "services offered"],
              ["2", "countries: UK & Ghana"],
              ["8", "five-star Bark reviews"],
              ["100%", "quality-checked jobs"],
            ].map(([a, b]) => (
              <div key={b}>
                <dt className="text-4xl font-medium">
                  <CountUpMetric value={a} />
                </dt>
                <dd className="mt-1 text-sm opacity-80">{b}</dd>
              </div>
            ))}
          </dl>

          {/* Bottom-center cutout tab for Our Process button */}
          <div className=" absolute -bottom-px left-1/2 flex -translate-x-1/2 items-end">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="-mr-px size-6 shrink-0 text-background"
            >
              <path d="M24 24H0C13.255 24 24 13.255 24 0V24Z" fill="currentColor" />
            </svg>
            <div className="rounded-t-[1.75rem] bg-background px-3.5 pt-3 pb-0.5">
              <Button
                asChild
                variant="soft"
                className="h-11 rounded-2xl bg-secondary hover:border-0 hover:outline-0 hover:ring-0 px-7 text-sm font-semibold text-primary hover:shadow-soft"
              >
                <Link href="/why-choose-us">Our Process</Link>
              </Button>
            </div>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="-ml-px size-6 shrink-0 text-background"
            >
              <path d="M0 24H24C10.745 24 0 13.255 0 0V24Z" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="container-page py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <ScrollReveal direction="left" distance={28}>
            <Eyebrow>Our services</Eyebrow>
            <h2 className="mt-3 max-w-md text-4xl leading-tight text-primary">Here&apos;s What We Can Do for You</h2>
          </ScrollReveal>
          <Button asChild variant="soft">
            <Link href="/services">View all services</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group flex h-full flex-col rounded-3xl bg-secondary p-3"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1200}
                  height={912}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-4">
                <h3 className="text-xl text-primary">{s.title}</h3>
                <span className="mt-4 flex items-center justify-between rounded-full bg-card px-4 py-2 text-sm font-medium text-primary">
                  Learn more{" "}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Our service, step by step */}
      <ServiceProcessSection />

      {/* Testimonials */}
      <section className="container-page">
        <div className="rounded-[2rem] bg-muted px-4 py-16 md:px-12">
          <div className="text-center">
            <ScrollReveal direction="up" distance={16}>
              <Eyebrow>Testimonials</Eyebrow>
            </ScrollReveal>
            <SplitTextReveal
              as="h2"
              text="Trusted by Homes and Businesses"
              className="mx-auto mt-3 max-w-lg text-4xl leading-tight text-primary"
            />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {testimonials.slice(0, 2).map((t) => (
              <figure key={t.name} className="h-full rounded-3xl bg-card p-8 shadow-soft">
                <span className="text-5xl leading-none text-accent">“</span>
                <blockquote className="mt-2 text-lg text-foreground">{t.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-mint font-semibold text-primary">
                    {t.name[0]}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold text-primary">{t.name}</span>
                    <span className="text-muted-foreground">{t.date} · Bark, UK</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollReveal direction="up" distance={14} delay={0.18} className="mt-8 text-center">
            <Link
              href="/testimonials"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-accent"
            >
              Read all reviews{" "}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Quote */}
      <section className="container-page py-8">
        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-[2rem] bg-secondary py-6 px-4 md:p-10">
            <div className="text-center">
              <Eyebrow>Get your free estimate</Eyebrow>
              <SplitTextReveal as="h2" text="Get a Quote" className="mt-3 mb-6 text-4xl text-primary" />
            </div>
            <QuoteForm />
          </div>
          <div className="flex flex-col gap-6">
            <ParallaxImage
              src={images.chores}
              alt="Mobile vehicle care in Accra"
              loading="lazy"
              width={1200}
              height={912}
              intensity={40}
              className="min-h-[20rem] w-full flex-1 rounded-[2rem] shadow-soft"
            />
            <div className="rounded-[2rem] bg-muted p-8">
              <h3 className="flex items-center gap-2 text-xl text-primary">
                <CalendarCheck className="size-5 text-accent" />
                Quality Guaranteed
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every job finishes with a supervisor inspection, so your space meets our standard before we leave.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <ScrollReveal direction="left" distance={28}>
              <Eyebrow>FAQ</Eyebrow>
              <SplitTextReveal
                as="h2"
                text="Frequently Asked Questions"
                className="mt-3 text-4xl leading-tight text-primary"
              />
            </ScrollReveal>
            <div className="mt-8 rounded-3xl bg-secondary p-8">
              <p className="text-lg text-primary">Looking for cleaning services in Accra? Contact us now!</p>
              <Button asChild variant="mint" className="mt-5">
                <a href={contact.phoneHref}>
                  <Phone />
                  {contact.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
          <Accordion type="single" collapsible className="space-y-0 mt-10">
            {faqs.map(([q, a]) => (
              <AccordionItem
                key={q}
                value={q}
                className="border-y border-y-gray-100 px-6 transition-colors duration-200"
              >
                <AccordionTrigger icon="plus" className="text-left text-base text-primary hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page">
        <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] bg-primary p-10 md:flex-row md:items-center md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-8 -left-8 size-44 rotate-12 opacity-45 [background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,0.7)_0,rgba(255,255,255,0.7)_6px,transparent_6px,transparent_16px)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -bottom-8 size-44 -rotate-12 opacity-45 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.7)_0,rgba(255,255,255,0.7)_6px,transparent_6px,transparent_16px)]"
          />
          <SplitTextReveal
            as="h2"
            text="Our Goal Is to Wow You With Every Clean"
            className="relative max-w-lg text-4xl leading-tight text-primary-foreground"
          />
          <Button asChild variant="mint" size="xl" className="relative">
            <Link href="/quote">Get a Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
