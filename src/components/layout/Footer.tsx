"use client";

import Link from "next/link";
import { useLocale } from "@/context/LocaleProvider";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" className="font-mono text-sm tracking-widest">
            DOTNEXUS
          </Link>
          <p className="mt-2 text-sm text-muted">{t.footer.tagline}</p>
        </div>
        <p className="font-mono text-xs text-muted">
          © {year} DotNexus. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
