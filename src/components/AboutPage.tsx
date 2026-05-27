"use client";

import { GridBackground } from "@/components/effects/GridBackground";
import { ScanLine } from "@/components/effects/ScanLine";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutCompany } from "@/components/sections/AboutCompany";
import { AboutHero } from "@/components/sections/AboutHero";
import { Cta } from "@/components/sections/Cta";
import { Team } from "@/components/sections/Team";
import { LocaleProvider } from "@/context/LocaleProvider";

export function AboutPage() {
  return (
    <LocaleProvider>
      <GridBackground />
      <ScanLine />
      <Header />
      <main>
        <AboutHero />
        <AboutCompany />
        <Team />
        <Cta />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
