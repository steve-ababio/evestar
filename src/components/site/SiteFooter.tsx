"use client";

import Link from "next/link";
import { contact, whatsappLink } from "@/lib/site";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/motion/primitives";

const serviceLinks = [
  { href: "/services/post-construction-cleaning", label: "Post-Construction" },
  { href: "/services/commercial-cleaning", label: "Commercial" },
  { href: "/services/carpet-cleaning", label: "Carpet & Rugs" },
  { href: "/services/move-in-move-out-cleaning", label: "Move-In / Move-Out" },
  { href: "/services/mobile-vehicle-care", label: "Vehicle Care" },
  { href: "/services", label: "All Services" },
] as const;

const exploreLinks = [
  { href: "/about", label: "About Us" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/pricing", label: "Pricing & Plans" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  const linkClass = "inline-block text-[13px] text-primary/70 transition-colors duration-200 hover:text-primary";

  return (
    <footer className="relative z-10 overflow-hidden border-t border-border/70 bg-white pt-8 md:pt-12">
      <div className="container-page">
        {/* Top Row: Brand Wordmark on Left, 4 Editorial Columns on Right */}
        <StaggerGroup
          stagger={0.07}
          className="grid gap-10 pb-12 md:pb-24 lg:grid-cols-12 lg:gap-8"
        >
          <StaggerItem className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block text-xl font-semibold tracking-tight text-primary transition-opacity hover:opacity-80"
            >
              <img src="/images/evestar-logo.png" className="h-8.5 md:h-14 w-auto object-contain rounded-full"  width="200" alt="Evestar logo"/>
            </Link>
          </StaggerItem>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            <StaggerItem>
              <p className="text-[13.5px] font-medium text-primary">Services</p>
              <ul className="mt-3 space-y-1.5">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[13.5px] font-medium text-primary">Explore</p>
              <ul className="mt-3 space-y-1.5">
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[13.5px] font-medium text-primary">Connect</p>
              <ul className="mt-3 space-y-1.5">
                <li>
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className={linkClass}
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </StaggerItem>

            <StaggerItem>
              <p className="text-[13.5px] font-medium text-primary">Support</p>
              <ul className="mt-3 space-y-1.5">
                <li>
                  <a href={contact.phoneHref} className={linkClass}>
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    Email Support
                  </a>
                </li>
                <li>
                  <Link href="/quote" className={linkClass}>
                    Book a Clean
                  </Link>
                </li>
                <li className="pt-0.5 text-[13px] text-primary/60">{contact.location}</li>
              </ul>
            </StaggerItem>
          </div>
        </StaggerGroup>

        {/* Crisp Horizontal Rule + Copyright Row */}
        <div className="border-t border-primary/80">
          <ScrollReveal
            direction="up"
            distance={12}
            delay={0.1}
            className="flex flex-col justify-between gap-2 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center"
          >
            <p>
              © Copyright {new Date().getFullYear()}.{" "}
              <span className="font-semibold text-primary">Polished</span> All Rights Reserved.
            </p>
            <p>Polished by Evestair · {contact.location}</p>
          </ScrollReveal>
        </div>

        {/* Monumental Cropped Bottom Wordmark */}
        <div
          aria-hidden="true"
          className="pointer-events-none relative select-none overflow-hidden pt-3"
        >
          <p className="translate-y-[0%] text-center font-sans text-[clamp(4.25rem,21vw,17.25rem)] leading-[0.84] font-bold tracking-[-0.055em] text-black [mask-image:linear-gradient(to_bottom,black_22%,rgba(0,0,0,0.65)_58%,transparent_98%)]">
            Evestar
          </p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-white via-white/65 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
