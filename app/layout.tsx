import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trust The Thumb | 2,000 Miles Across America with Lee & Jake",
  description:
    "Follow Lee and Jake Parsons as they hitchhike 2,000 miles from Los Angeles to Ohio starting October 1st, testing real-world American kindness and human connection.",
  keywords: [
    "hitchhiking america",
    "Lee Parsons",
    "Jake Parsons",
    "Trust The Thumb",
    "cross country hitchhiking",
    "LA to Ohio road trip",
    "human kindness experiment",
    "highway adventure",
  ],
  authors: [
    { name: "Lee Parsons", url: "https://instagram.com/theleeparsons" },
    { name: "Jake Parsons", url: "https://instagram.com/Jake_thedrummer26" },
  ],
  openGraph: {
    title: "Trust The Thumb: 2,000 Miles Across America",
    description:
      "The algorithm says be afraid. We're going to find the truth. Live route map, countdown timer, and brotherhood journey launching October 1st.",
    url: "https://trustthethumb.com",
    siteName: "Trust The Thumb",
    images: [
      {
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Trust The Thumb - 2,000 Miles Across America",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust The Thumb: 2,000 Miles Across America",
    description:
      "Testing American kindness from LA to Ohio with thumbs out and open minds launching Oct 1st.",
    creator: "@theleeparsons",
  },
};

export const viewport: Viewport = {
  themeColor: "#161917",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-asphalt-darker text-parchment antialiased selection:bg-amber-desert/30 selection:text-parchment">
        {children}
      </body>
    </html>
  );
}
