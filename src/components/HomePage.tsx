"use client";

import { GridBackground } from "@/components/effects/GridBackground";
import { ScanLine } from "@/components/effects/ScanLine";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Approach } from "@/components/sections/Approach";
import { Cta } from "@/components/sections/Cta";
import { Hero } from "@/components/sections/Hero";
import { Marketing } from "@/components/sections/Marketing";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { LocaleProvider } from "@/context/LocaleProvider";

export function HomePage() {
  return (
    <LocaleProvider>
      <GridBackground />
      <ScanLine />
      <Header />
      <main>
        <Hero />
        <Services />
        <Approach />
        <Marketing />
        <Showcase />
        <Cta />
      </main>
      <Footer />
    </LocaleProvider>
  );
}
