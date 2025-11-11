import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import WhatsAppButton from "@/components/WAButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const EB = Playfair_Display({
  variable: "--font-eb",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zarwaorganics.com"), // your final domain
  title: {
    default: "Zarwa Organics – Premium Natural & Organic Care",
    template: "%s | Zarwa Organics",
  },
  description:
    "Zarwa Organics creates premium, handcrafted products made from 100% natural ingredients. Experience the perfect blend of purity, luxury, and sustainability.",
  keywords: [
    "organic skincare",
    "natural care products",
    "luxury organic brand",
    "premium natural cosmetics",
    "sustainable skincare",
    "Zarwa Organics",
  ],
  openGraph: {
    title: "Zarwa Organics – Premium Natural & Organic Care",
    description:
      "Discover Zarwa Organics – luxury organic products crafted from 100% natural ingredients for a radiant, healthy lifestyle.",
    url: "https://www.zarwaorganics.com",
    siteName: "Zarwa Organics",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zarwa Organics – Premium Natural & Organic Care",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zarwa Organics – Premium Natural & Organic Care",
    description:
      "Experience purity and elegance through Zarwa Organics' handcrafted natural products.",
    images: ["/images/og-image.png"],
    creator: "@zarwaorganics",
  },
  icons: {
    icon: "/images/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
  authors: [{ name: "Zarwa Organics Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-arp="" dir="ltr">
      <head>
        <link rel="canonical" href="https://www.zarwaorganics.com" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.zarwaorganics.com"
        />
      </head>
      <body className={`${EB.variable} antialiased`}>
        {/* <Navbar />
        <Header */}
        <Header />
        {children}
        <WhatsAppButton />
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />

        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zarwa Organics",
              url: "https://www.zarwaorganics.com",
              logo: "https://www.zarwaorganics.com/logo.png",
              sameAs: [
                "https://www.instagram.com/zarwaorganics",
                "https://www.facebook.com/zarwaorganics",
              ],
              description:
                "Premium natural and organic care products handcrafted for elegance and wellness.",
            }),
          }}
        />
      </body>
    </html>
  );
}
