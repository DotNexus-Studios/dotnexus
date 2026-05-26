import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dotnexus.nl"),
  title: "DotNexus: Growth bureau",
  description:
    "Growth bureau voor startups en corporates: strategie, branding, content, webdevelopment, AI, workflow automation en data-gedreven groei.",
  openGraph: {
    title: "DotNexus: Growth bureau",
    description:
      "Van startup tot corporate: strategie, branding, content, web, AI en automatisering in één beweging.",
    url: "https://dotnexus.nl",
    siteName: "DotNexus",
    locale: "nl_NL",
    type: "website",
    images: [{ url: "/logo.png", width: 1000, height: 1000, alt: "DotNexus" }],
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
