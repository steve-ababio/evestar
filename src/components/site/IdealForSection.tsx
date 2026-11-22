"use client";

import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Briefcase,
  Building2,
  Car,
  ChefHat,
  ClipboardCheck,
  Factory,
  GraduationCap,
  HardHat,
  Home,
  Hotel,
  Key,
  Landmark,
  Music,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  UtensilsCrossed,
  Warehouse,
  Wine,
  Wrench,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/primitives";
import type { IdealForItem } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  Armchair,
  Briefcase,
  Building2,
  Car,
  ChefHat,
  ClipboardCheck,
  Factory,
  GraduationCap,
  HardHat,
  Home,
  Hotel,
  Key,
  Landmark,
  Music,
  PartyPopper,
  ShieldCheck,
  Sparkles,
  Store,
  Truck,
  Users,
  UtensilsCrossed,
  Warehouse,
  Wine,
  Wrench,
};

interface IdealForSectionProps {
  items?: IdealForItem[];
  serviceTitle: string;
}

export function IdealForSection({ items, serviceTitle }: IdealForSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="section border-t border-border/70 bg-white">
      <div className="container-page">
        {/*
          3-column grid layout on desktop matching the reference layout:
          Row 1: [Heading Block] [Card 1] [Card 2]
          Row 2: [Card 3]        [Card 4] [Card 5]
        */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6">
          {/* Heading Block */}
          <div className="col-span-1 flex flex-col justify-center pr-2 sm:col-span-2 sm:mb-2 lg:col-span-1 lg:mb-0 lg:pr-6">
            <ScrollReveal direction="up" distance={16}>
              <p className="eyebrow text-accent mb-2">Ideal for</p>
              <h2 className="text-3xl font-medium tracking-tight text-primary sm:text-4xl lg:text-5xl leading-[1.08]">
                Tailored For <span className="text-accent block sm:inline lg:block">Every Space.</span>
              </h2>
              <p className="mt-3.5 text-sm sm:text-base leading-relaxed text-muted-foreground">
                Specialised cleaning and care solutions matched to the exact standards of your property, event, or facility.
              </p>
            </ScrollReveal>
          </div>

          {/* Cards */}
          {items.map((item, index) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <ScrollReveal
                key={item.title}
                direction="up"
                distance={18}
                delay={0.06 * (index + 1)}
                className="h-full"
              >
                <article className="group flex h-full min-h-[155px] sm:min-h-[175px] flex-col justify-between rounded-2xl bg-secondary/35 p-6 sm:p-7 transition-all duration-200  hover:bg-mint/35">
                  <div className="text-accent transition-transform duration-200 group-hover:scale-105">
                    <Icon className="size-7 sm:size-8 stroke-[1.75]" />
                  </div>
                  <h3 className="mt-8 text-base font-semibold tracking-tight text-primary sm:text-lg">
                    {item.title}
                  </h3>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
