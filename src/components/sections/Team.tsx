"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLocale } from "@/context/LocaleProvider";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Team() {
  const { t } = useLocale();

  return (
    <section className="relative px-6 py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.03),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionLabel>{t.about.team.label}</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t.about.team.title}
        </motion.h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {t.about.team.members.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-2xl border border-border"
            >
              <div className="relative aspect-square w-full bg-surface">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col p-8">
                <p className="font-mono text-xs tracking-widest text-muted uppercase">
                  {member.role}
                </p>
                <h3 className="mt-2 text-2xl font-semibold">{member.name}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {member.bio}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[10px] tracking-wider text-muted uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
