import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  Car,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Plus,
  Sparkles,
  Wrench,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { contact, images, whatsappLink } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { QuoteForm } from "@/components/site/QuoteForm";
import {
  ParallaxImage,
  ScrollReveal,
  SplitTextReveal,
} from "@/components/motion/primitives";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Call or WhatsApp +233 594 775 550, email us or send an enquiry for cleaning services in Accra.",
  openGraph: {
    title: "Contact Us — Polished by Evestair Ghana",
    description:
      "Call or WhatsApp +233 594 775 550, email us or send an enquiry for cleaning services in Accra.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const contactChannels = [
  {
    icon: Phone,
    title: "Call us",
    subtitle: "Speak directly with our Accra team.",
    value: contact.phoneDisplay,
    href: contact.phoneHref,
    external: false,
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp us",
    subtitle: "Fast replies and photo estimates.",
    value: "Chat on WhatsApp",
    href: whatsappLink(),
    external: true,
  },
  {
    icon: Mail,
    title: "Email us",
    subtitle: "For quotes and commercial contracts.",
    value: contact.email,
    href: `mailto:${contact.email}`,
    external: false,
  },
  {
    icon: MapPin,
    title: "Service area",
    subtitle: "Homes, offices, events & sites across",
    value: contact.location,
    href: undefined,
    external: false,
  },
] as const;

const contactFaqs = [
  {
    icon: MapPin,
    q: "What areas in Accra do you cover?",
    a: "We serve residential, commercial, industrial, and event clients across Accra. Share your neighbourhood in the form or on WhatsApp and we will confirm scheduling availability.",
  },
  {
    icon: Sparkles,
    q: "How is pricing calculated for a job?",
    a: "Every space, vehicle, or event is assessed individually so you receive a tailored quotation based on size, surface condition, frequency, and scope of work.",
  },
  {
    icon: CalendarCheck,
    q: "Can we arrange regular or commercial contract cleaning?",
    a: "Yes — we offer one-off deep cleans as well as scheduled weekly, monthly, or long-term commercial contracts tailored around your operating hours.",
  },
  {
    icon: Wrench,
    q: "Do your cleaners bring their own equipment and supplies?",
    a: "Yes. Our trained and supervised team arrives equipped with commercial-grade tools and surface-appropriate cleaning products.",
  },
  {
    icon: Car,
    q: "Do you offer mobile vehicle and heavy machinery care on site?",
    a: "Yes — we bring hand washing, detailing, fleet care, and heavy-machinery washing to your home, office, depot, or project site, subject to safe access.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      {/* Band 1: Airy Grid Hero Header */}
      <section className="relative overflow-hidden border-b border-border/70">
        <div
          aria-hidden="true"
          className="bg-contact-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_85%_85%_at_50%_35%,#000_65%,transparent_100%)]"
        />
        <div className="container-page relative pt-28 pb-12 sm:pt-32 sm:pb-16 text-center md:pt-36 md:pb-24">
          {/* <ScrollReveal direction="up" distance={16}>
            <div className="mx-auto grid size-12 place-items-center rounded-2xl border border-border bg-card text-primary">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <ellipse
                  cx="12"
                  cy="12"
                  rx="8.5"
                  ry="3.6"
                  transform="rotate(-32 12 12)"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <circle cx="12" cy="12" r="3.4" fill="currentColor" />
                <circle cx="17.8" cy="7.2" r="1.2" fill="currentColor" />
              </svg>
            </div>
          </ScrollReveal> */}

          <ScrollReveal direction="up" distance={22} delay={0.08}>
            <h1 className="mt-6 text-3xl sm:text-4xl md:text-6xl leading-[1.12] font-medium text-primary">
              Contact our{" "}
              <span className="inline-block rounded-full bg-mint px-4 md:px-8 py-0.5 text-primary">
                friendly team
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={18} delay={0.16}>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Let us know how we can help. Reach our Accra team directly or send an enquiry for a tailored
              cleaning quotation.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" distance={16} delay={0.22}>
            <div className="mt-7 flex items-center justify-center gap-3">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="grid size-10 place-items-center rounded-full bg-mint text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full bg-mint text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="size-4" />
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="grid size-10 place-items-center rounded-full bg-mint text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <WhatsAppIcon className="size-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Band 2: 4-Column Quick Contact Channel Cards */}
      <section className="container-page relative z-10 -mt-6 pt-10 md:pt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactChannels.map(({ icon: Icon, title, subtitle, value, href, external }) => {
            const cardBody = (
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-card/95 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-background text-primary">
                    <Icon className="size-5" />
                  </span>
                  {href && (
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105 group-hover:bg-accent">
                      <ArrowUpRight className="size-4" />
                    </span>
                  )}
                </div>

                <div className="mt-10">
                  <h2 className="text-base font-semibold text-primary">{title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
                  <span className="mt-4 inline-block break-all text-sm font-semibold text-primary underline decoration-accent/60 underline-offset-4 transition-colors group-hover:text-accent">
                    {value}
                  </span>
                </div>
              </div>
            );

            return href ? (
              <a
                key={title}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="block h-full"
              >
                {cardBody}
              </a>
            ) : (
              <div key={title} className="h-full">
                {cardBody}
              </div>
            );
          })}
        </div>
      </section>

      {/* Band 3: Framed Split Showcase (Photo + Contracts Card & QuoteForm) */}
      <section className="container-page py-12 md:py-16">
        <div className="bg-card/80 p-2 rounded-4xl shadow-soft backdrop-blur-xs md:p-3">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.28fr] lg:items-stretch">
            <div className="flex flex-col gap-5">
              <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-3xl">
                <ParallaxImage
                  src={images.interior}
                  alt="Freshly cleaned space in Accra by Polished by Evestair"
                  width={1600}
                  height={1104}
                  intensity={34}
                  className="h-full min-h-[20rem] w-full border-0"
                />
                <span className="pointer-events-none absolute top-4 left-4 sm:top-6 sm:left-6 rounded-full bg-card/95 px-3.5 py-1.5 text-xs font-medium text-primary shadow-soft backdrop-blur">
                  UK-founded standards · Serving Accra
                </span>
                <a
                  href={whatsappLink(
                    "Hello Polished by Evestair Ghana, I'd like to discuss a commercial or recurring contract.",
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="group absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex items-center justify-between gap-3 rounded-lg bg-card/20 p-4 sm:p-5 shadow-soft backdrop-blur-md"
                >
                  <div className="min-w-0">
                    <span className="block text-xs font-normal text-white">
                      Commercial &amp; Recurring Contracts
                    </span>
                    <span className="mt-1 block truncate text-xs sm:text-sm font-normal text-white">
                      {contact.email}
                    </span>
                  </div>
                  <span className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-full bg-white text-black transition-colors group-hover:bg-accent">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
              </div>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Band 4: Two-Column Quick-Action Cards */}
      <section className="container-page pb-12 md:pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card/95 p-8 backdrop-blur-sm">
            <h2 className="text-2xl text-primary">Explore All 11 Services</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Browse residential, commercial, post-construction, event, vehicle, and heavy machinery cleaning
              across Accra.
            </p>
            <Button asChild variant="premium" className="mt-6">
              <Link href="/services">
                View Services <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <div className="rounded-3xl border border-border bg-card/95 p-8 backdrop-blur-sm">
            <h2 className="text-2xl text-primary">Request a Tailored Quotation</h2>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              Every job is assessed individually so you get an accurate scope of work and price tailored to
              your space.
            </p>
            <Button asChild variant="premium" className="mt-6">
              <Link href="/quote">
                Get a Quote <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Band 5A: Centered FAQ Accordion */}
      <section className="container-page py-12 md:py-16">
        {/* <ScrollReveal direction="up" distance={16}>
          <p className="eyebrow text-center">Quick answers</p>
        </ScrollReveal> */}
        <SplitTextReveal
          as="h2"
          text="Frequently asked questions"
          className="mt-3 text-center text-3xl text-primary md:text-5xl"
        />
        <ScrollReveal direction="up" distance={14} delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm text-muted-foreground md:text-base">
            Common questions about bookings, equipment, and service coverage across Accra.
          </p>
        </ScrollReveal>

        <Accordion type="single" collapsible className="mx-auto mt-10 max-w-3xl">
          
          {contactFaqs.map(({ icon: Icon, q, a }) => (
            <AccordionItem
              key={q}
              value={q}
              className=" first-of-type:border-t border-y-black last-of-type:border-b border-y-[0.25] bg-card/95 py-2 pr-5 transition-colors"
            >
              <AccordionTrigger icon="plus" className="py-2 text-left text-lg md:text-xl font-medium text-primary hover:no-underline">
                <span className="flex items-center gap-3.5">
                  <span>{q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm md:text-base leading-relaxed text-muted-foreground">
                {a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Band 5B: Vibrant Mint Full-Width CTA Banner */}
      <section className="container-page pt-6 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-mint px-6 py-14 text-center md:px-14 md:py-18">
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
            text="Ready for a Sparkling Space in Accra?"
            className="relative mx-auto max-w-2xl text-3xl leading-tight text-primary md:text-5xl"
          />
          <ScrollReveal direction="up" distance={14} delay={0.12}>
            <p className="relative mx-auto mt-4 max-w-xl text-sm text-primary/75 md:text-base">
              Tell us what you need and our team will prepare a tailored plan and quotation around your
              schedule.
            </p>
          </ScrollReveal>

          <div className="relative mx-auto mt-8 flex max-w-xl flex-col items-center justify-between gap-3 rounded-3xl bg-card/95 p-2.5 pl-5 shadow-soft sm:flex-row sm:rounded-full">
            <span className="text-sm font-medium text-primary">
              Chat with our team on WhatsApp for a fast estimate.
            </span>
            <Button asChild variant="premium" className="shrink-0">
              <a
                href={whatsappLink(
                  "Hello Polished by Evestair Ghana, I'd like to enquire about your services.",
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp Us <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
