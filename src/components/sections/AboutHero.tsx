"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function AboutHero() {
  const { t } = useLocale();

  return (
    <section className="relative px-6 pt-32 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.04),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            variants={fadeUp}
            className="mb-6 font-mono text-xs tracking-[0.25em] text-muted uppercase"
          >
            {t.about.label}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">{t.about.title}</span>
            <br />
            <span className="text-foreground">{t.about.titleAccent}</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted"
          >
            {t.about.subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
