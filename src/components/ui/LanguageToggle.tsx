"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/context/LocaleProvider";
import type { Locale } from "@/lib/i18n/types";

const locales: { code: Locale; label: string }[] = [
  { code: "nl", label: "NL" },
  { code: "en", label: "EN" },
];

export function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="relative flex rounded-full border border-border bg-surface p-0.5">
      {locales.map(({ code, label }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className="relative z-10 px-3 py-1.5 font-mono text-xs tracking-wider transition-colors"
            aria-label={code === "nl" ? "Nederlands" : "English"}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`relative z-10 ${active ? "text-background" : "text-muted hover:text-foreground"}`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
