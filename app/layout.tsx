import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gymtex Flooring | Premium Gym Flooring Manufacturer in India",
    template: "%s | Gymtex Flooring",
  },
  description: "India's leading manufacturer of premium gym flooring solutions. High-quality rubber gym mats, tiles, rolls, and sports flooring for commercial gyms, fitness centers, and home gyms. Pan-India delivery.",
  keywords: [
    "gym flooring India",
    "rubber gym mats",
    "gym tiles",
    "gym rubber rolls",
    "fitness flooring",
    "sports flooring",
    "commercial gym flooring",
    "home gym flooring",
    "rubber flooring manufacturer",
    "gym equipment flooring",
  ],
  authors: [{ name: "Gymtex Flooring" }],
  creator: "Gymtex Flooring",
  publisher: "Gymtex Flooring",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gymtexflooring.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Gymtex Flooring | Premium Gym Flooring Manufacturer in India",
    description: "India's leading manufacturer of premium gym flooring solutions. High-quality rubber gym mats, tiles, rolls for commercial and home gyms.",
    url: "https://gymtexflooring.com",
    siteName: "Gymtex Flooring",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gymtex Premium Gym Flooring",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gymtex Flooring | Premium Gym Flooring Manufacturer in India",
    description: "India's leading manufacturer of premium gym flooring solutions. High-quality rubber gym mats, tiles, rolls.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "PgZ53aBXVhRgUMwUYJFuBvyUiz00lRcJa-R9e-cXDys",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${playfair.variable} antialiased font-sans`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
