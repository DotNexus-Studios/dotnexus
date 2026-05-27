"use client";

import { useEffect, useRef, useState } from "react";
import { GridBackground } from "@/components/effects/GridBackground";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import { ScanLine } from "@/components/effects/ScanLine";
import { ScrollProgressTrail } from "@/components/effects/ScrollProgressTrail";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Approach } from "@/components/sections/Approach";
import { Cta } from "@/components/sections/Cta";
import { Hero } from "@/components/sections/Hero";
import { Marketing } from "@/components/sections/Marketing";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { LocaleProvider } from "@/context/LocaleProvider";

const VISITED_KEY = "dotnexus-visited";

export function HomePage() {
  const [ready, setReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(VISITED_KEY) === "1") {
        setReady(true);
        return;
      }
    } catch {
      setReady(true);
      return;
    }
    setShowLoader(true);
  }, []);

  const handleLoadComplete = () => {
    try {
      localStorage.setItem(VISITED_KEY, "1");
    } catch {
      /* private browsing / blocked storage */
    }
    setShowLoader(false);
    setReady(true);
  };

  return (
    <LocaleProvider>
      {showLoader && <LoadingScreen onComplete={handleLoadComplete} />}
      <div
        className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <GridBackground />
        <ScanLine />
        <Header />
        <main>
          <Hero />
          <div ref={progressRef} className="relative isolate">
            <ScrollProgressTrail containerRef={progressRef} />
            <div className="relative z-10">
              <Services />
              <Approach />
              <Marketing />
              <Showcase />
              <Cta />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
