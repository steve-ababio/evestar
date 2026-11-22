import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { getService, services, whatsappLink } from "@/lib/site";
import { Coverage, FinalCta, ServiceCard } from "@/components/site/blocks";
import { IdealForSection } from "@/components/site/IdealForSection";
import {
  ParallaxImage,
  ScrollReveal,
  SplitTextReveal,
} from "@/components/motion/primitives";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Service Not Found" };

  const title = `${s.title} in Accra`;
  const desc = `${s.tagline} ${s.intro}`;

  return {
    title,
    description: desc,
    openGraph: {
      title: `${s.title} in Accra — Polished by Evestair Ghana`,
      description: desc,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getService(slug);

  if (!s) {
    notFound();
  }

  const related = services
    .filter((x) => x.category === s.category && x.slug !== s.slug)
    .concat(services.filter((x) => x.category !== s.category))
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-white">
        <div
          aria-hidden="true"
          className="bg-contact-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_85%_85%_at_50%_35%,#000_65%,transparent_100%)]"
        />
        <div className="container-page relative grid items-center gap-10 pt-28 pb-14 sm:pt-32 sm:pb-18 md:pt-36 md:pb-24 lg:grid-cols-2">
          <div>
            <ScrollReveal direction="up" distance={24}>
              <Link href="/services" className="eyebrow hover:underline">
                ← All services
              </Link>
              <SplitTextReveal
                as="h1"
                mode="mount"
                delay={0.08}
                text={s.title}
                className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.08] font-medium text-primary"
              />
              <p className="mt-3 sm:mt-4 font-display text-xl sm:text-2xl italic text-accent">{s.tagline}</p>
              <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">{s.intro}</p>
            </ScrollReveal>
            <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Button asChild variant="premium" size="xl" className="w-full sm:w-auto">
                <Link href={`/quote?service=${s.slug}`}>Request a Quote</Link>
              </Button>
              <Button asChild variant="soft" size="xl" className="w-full sm:w-auto">
                <a href={whatsappLink(`Hello, I'd like to enquire about ${s.title}.`)} target="_blank" rel="noreferrer">
                  <WhatsAppIcon className="size-4" /> WhatsApp enquiry
                </a>
              </Button>
            </div>
          </div>
          <ParallaxImage
            src={s.image}
            alt={`${s.title} in Accra`}
            loading="eager"
            width={1200}
            height={912}
            intensity={38}
            className="aspect-[4/3] w-full rounded-[2rem] shadow-soft"
          />
        </div>
      </section>
      <section className="section">
        <div className="container-page grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <ScrollReveal direction="up" distance={16}>
              <p className="eyebrow">What&apos;s covered</p>
            </ScrollReveal>
            <SplitTextReveal as="h2" text="Coverage" className="mt-4 mb-8 text-4xl text-primary" />
            <Coverage items={s.coverage} />
          </div>
          <aside className="h-fit space-y-6 rounded-2xl bg-primary p-8 text-primary-foreground lg:sticky lg:top-28">
            <div className="space-y-6">
              <div>
                <p className="eyebrow text-mint">Tailored Scope</p>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/90">
                  Customised cleaning schedules and equipment configured specifically for your premises.
                </p>
              </div>
              <div className="border-t border-primary-foreground/20 pt-6">
                <p className="eyebrow text-mint">Good to know</p>
                <p className="mt-3 text-sm leading-relaxed text-primary-foreground/80">{s.note}</p>
              </div>
            </div>
            <Button asChild variant="mint" size="xl" className="w-full">
              <Link href={`/quote?service=${s.slug}`}>Get a tailored quote</Link>
            </Button>
          </aside>
        </div>
      </section>
      <IdealForSection items={s.idealFor} serviceTitle={s.title} />
      <section className="bg-white pb-20 md:pb-28">
        <div className="container-page">
          <ScrollReveal direction="up" distance={16}>
            <p className="eyebrow">How it works</p>
          </ScrollReveal>
          <SplitTextReveal as="h2" text="Our process" className="mt-3 mb-10 text-4xl text-primary" />
          <ol
            className={
              s.process.length === 4
                ? "grid grid-cols-1 divide-y divide-border border-t border-border sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0"
                : "grid grid-cols-1 divide-y divide-border border-t border-border md:grid-cols-3 md:divide-x md:divide-y-0"
            }
          >
            {s.process.map((p, i) => (
              <li
                key={p.title}
                className={
                  s.process.length === 4
                    ? "flex flex-col justify-between py-8 sm:px-6 lg:px-8 lg:py-10 lg:first:pl-0 lg:last:pr-0"
                    : "flex flex-col justify-between py-8 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0"
                }
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-2xl font-normal text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="border border-primary/55 bg-white px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-primary">
                    {p.tag}
                  </span>
                </div>
                <div className="mt-12">
                  <h3 className="text-xl font-semibold tracking-tight uppercase text-primary md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section border-t border-border bg-muted/60">
        <div className="container-page">
          <SplitTextReveal as="h2" text="Related services" className="mb-10 text-4xl text-primary" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ServiceCard key={r.slug} s={r} />
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
