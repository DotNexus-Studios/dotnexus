"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLocale } from "@/context/LocaleProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Marketing() {
  const { t } = useLocale();

  return (
    <section className="px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel>{t.marketing.label}</SectionLabel>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t.marketing.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-muted"
          >
            {t.marketing.subtitle}
          </motion.p>
        </div>

        <ul className="space-y-4">
          {t.marketing.points.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4 rounded-xl border border-border bg-surface p-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border-strong bg-foreground">
                <Check className="h-4 w-4 text-background" strokeWidth={2} />
              </span>
              <span className="text-sm leading-relaxed sm:text-base">{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
