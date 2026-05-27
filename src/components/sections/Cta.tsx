"use client";

import { EmailLink } from "@/components/ui/EmailLink";
import { ObfuscatedEmailText } from "@/components/ui/ObfuscatedEmailText";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useLocale } from "@/context/LocaleProvider";

export function Cta() {
  const { t } = useLocale();

  return (
    <section id="contact" className="px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border-strong px-8 py-16 text-center sm:px-16 sm:py-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.05),transparent_60%)]" />
        </div>
        <div className="relative">
          <h2 data-scroll-dot className="text-3xl font-semibold tracking-tight sm:text-5xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t.cta.subtitle}</p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <EmailLink className="inline-flex items-center gap-3 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition hover:bg-foreground/90">
              <Mail className="h-4 w-4" />
              {t.cta.button}
            </EmailLink>
            <ObfuscatedEmailText className="font-mono text-sm text-muted" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
