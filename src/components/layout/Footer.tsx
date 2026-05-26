"use client";

import { useLocale } from "@/context/LocaleProvider";
import { BrandWordmark } from "@/components/ui/BrandWordmark";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-center gap-4 sm:justify-start">
          <Logo size="sm" showWordmark={false} className="shrink-0" />
          <p className="text-sm text-muted">{t.footer.tagline}</p>
        </div>
        <p className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-xs text-muted sm:justify-end">
          <span>© {year}</span>
          <BrandWordmark className="font-mono text-xs" />
          <span>{t.footer.rights}</span>
        </p>
      </div>
    </footer>
  );
}
