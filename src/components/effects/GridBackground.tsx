"use client";

import { motion } from "framer-motion";

export function GridBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.06), transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="noise absolute inset-0 opacity-30 mix-blend-overlay" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}
