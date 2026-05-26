"use client";

import { motion } from "framer-motion";

export function SectionLabel({ children }: { children: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-4 flex items-center gap-3"
    >
      <span className="h-px w-8 bg-white/40" />
      <span className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
        {children}
      </span>
    </motion.div>
  );
}
