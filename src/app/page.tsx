import type { Metadata } from "next";
import { HomeContent } from "@/components/site/HomeContent";

export const metadata: Metadata = {
  title: "Polished by Evestair Ghana — Professional Cleaning in Accra",
  description:
    "UK-founded cleaning and mobile vehicle care in Accra: homes, offices, construction sites, events and vehicles.",
  openGraph: {
    title: "Polished by Evestair Ghana — Professional Cleaning in Accra",
    description: "UK-founded cleaning and mobile vehicle care in Accra.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
