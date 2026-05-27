"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function AboutCompany() {
  const { t } = useLocale();

  return (
    <section className="border-y border-border px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{t.about.company.label}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t.about.company.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-3xl text-lg leading-relaxed text-muted"
        >
          {t.about.company.description}
        </motion.p>
      </div>
    </section>
  );
}
