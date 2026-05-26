"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Approach() {
  const { t } = useLocale();

  return (
    <section id="approach" className="relative border-y border-border px-6 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionLabel>{t.approach.label}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t.approach.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-muted"
        >
          {t.approach.subtitle}
        </motion.p>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {t.approach.pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-border p-6"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-medium">{pillar.title}</h3>
              <p className="mt-2 text-sm text-muted">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-black/[0.04] to-transparent p-10 sm:p-14"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <h3 className="text-2xl font-semibold sm:text-3xl">
                {t.approach.bundle.title}
              </h3>
              <p className="mt-4 text-muted">{t.approach.bundle.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 font-mono text-xs tracking-widest text-muted uppercase">
              {t.approach.bundleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-4 py-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
