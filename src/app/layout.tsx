import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { PageEntrance, SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Polished by Evestair Ghana — Cleaning Services in Accra",
    template: "%s | Polished by Evestair Ghana",
  },
  description: "Professional cleaning and mobile vehicle care in Accra. A sparkling touch you can trust.",
  authors: [{ name: "Polished by Evestair Ghana" }],
  openGraph: {
    title: "Polished by Evestair Ghana",
    description: "Professional cleaning and mobile vehicle care in Accra.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: [{ url: "/images/evestar.ico", type: "image/png" }],
    shortcut: "/images/evestar-logo.png",
    apple: "/images/evestar-logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <SiteHeader />
          <main className="relative z-10">
            <PageEntrance>{children}</PageEntrance>
          </main>
          <SiteFooter />
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
