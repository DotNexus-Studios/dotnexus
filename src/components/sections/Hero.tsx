"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { useLocale } from "@/context/LocaleProvider";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative flex min-h-screen flex-col justify-center px-6 pt-24 pb-20">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="mb-6 font-mono text-xs tracking-[0.25em] text-muted uppercase"
          >
            {t.hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">{t.hero.title}</span>
            <br />
            <span className="text-foreground">{t.hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${t.cta.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:bg-foreground/90"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3.5 text-sm text-foreground transition hover:border-foreground/30 hover:bg-surface"
            >
              {t.hero.ctaSecondary}
              <ArrowDownRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-24 grid gap-8 border-t border-border pt-12 sm:grid-cols-3"
        >
          {t.hero.stats.map((stat) => (
            <div key={stat.label}>
              <AnimatedCounter
                value={stat.value}
                className="block font-mono text-3xl font-medium tracking-tight sm:text-4xl"
              />
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute right-6 bottom-12 hidden lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border">
          <div className="h-2 w-2 rounded-full bg-foreground" />
        </div>
      </motion.div>
    </section>
  );
}
