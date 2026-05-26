"use client";

import { motion } from "framer-motion";
import { Layers, LineChart, Share2 } from "lucide-react";
import { useLocale } from "@/context/LocaleProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons = [LineChart, Layers, Share2];

export function Services() {
  const { t } = useLocale();

  return (
    <section id="services" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionLabel>{t.services.label}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t.services.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-muted"
        >
          {t.services.subtitle}
        </motion.p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.services.items.map((item, i) => {
            const Icon = icons[i] ?? LineChart;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-border-strong hover:bg-surface-hover"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-black">
                  <Icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-wider text-muted uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
