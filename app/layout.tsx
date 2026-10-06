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
  title: "Trust The Thumb | 2,000 Miles Across America (Restarting 2027)",
  description:
    "Follow Lee and Jake Parsons on Trust The Thumb. Our 2026 journey concluded in Phoenix, Arizona due to unexpected circumstances and lack of preparation. We are regrouping to start over from Los Angeles to Ohio in 2027, testing real-world American kindness and human connection.",
  keywords: [
    "hitchhiking america",
    "Lee Parsons",
    "Jake Parsons",
    "Trust The Thumb",
    "cross country hitchhiking",
    "LA to Ohio road trip",
    "Phoenix Arizona hitchhiking",
    "2027 restart",
    "LA to Ohio 2027",
    "human kindness experiment",
    "highway adventure",
  ],
  authors: [
    { name: "Lee Parsons", url: "https://instagram.com/theleeparsons" },
    { name: "Jake Parsons", url: "https://instagram.com/Jake_thedrummer26" },
  ],
  openGraph: {
    title: "Trust The Thumb: 2,000 Miles Across America (Restarting 2027)",
    description:
      "The algorithm says be afraid. We're going to find the truth. 2026 journey concluded in Phoenix, AZ — full 2,000-mile restart from LA to Ohio in 2027.",
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
    title: "Trust The Thumb: 2,000 Miles Across America (Restarting 2027)",
    description:
      "Testing American kindness from LA to Ohio. 2026 journey concluded in Phoenix, AZ — starting over from LA to Ohio in 2027.",
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
