"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLocale } from "@/context/LocaleProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SHOWCASE_URL = "https://maskingmaster.com";
const SHOWCASE_IMAGE = "/Producten_MM-InHand.webp";

export function Showcase() {
  const { t } = useLocale();

  return (
    <section id="showcase" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{t.showcase.label}</SectionLabel>
        <motion.h2
          data-scroll-dot
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t.showcase.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-muted"
        >
          {t.showcase.subtitle}
        </motion.p>

        <motion.a
          href={SHOWCASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.6 }}
          className="group relative mt-16 block overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-neutral-100">
            <Image
              src={SHOWCASE_IMAGE}
              alt="Masking Master producten"
              fill
              className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 1152px"
              priority={false}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.04),transparent_55%)]" />
          </div>

          <div className="relative z-20 flex flex-col gap-6 p-8 sm:flex-row sm:items-end sm:justify-between sm:p-12">
            <div>
              <p className="font-mono text-xs tracking-widest text-muted uppercase">
                dotnexus.nl / showcase
              </p>
              <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                {t.showcase.project}
              </h3>
              <p className="mt-2 text-sm text-muted">{t.showcase.role}</p>
              <div className="mt-6 flex flex-wrap gap-6">
                {t.showcase.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="font-mono text-lg font-medium">{m.value}</p>
                    <p className="text-xs text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border-strong bg-foreground px-5 py-2.5 text-sm font-medium text-background transition group-hover:bg-foreground/90">
              {t.showcase.visit}
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
