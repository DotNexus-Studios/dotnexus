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
  title: "DotNexus — Strategie, operatie & marketing",
  description:
    "DotNexus adviseert en voert uit: strategisch advies, bedrijfsvoering en organic social marketing in één bundel voor bedrijven die willen groeien.",
  openGraph: {
    title: "DotNexus",
    description:
      "Strategie, bedrijfsvoering en organic social marketing — één bundel voor groei.",
    url: "https://dotnexus.nl",
    siteName: "DotNexus",
    locale: "nl_NL",
    type: "website",
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
