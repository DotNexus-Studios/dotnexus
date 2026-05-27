"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "@/context/LocaleProvider";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Logo } from "@/components/ui/Logo";

export function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const hashPrefix = pathname === "/" ? "" : "/";

  const links = [
    { href: "/about", label: t.nav.about, isRoute: true },
    { href: `${hashPrefix}#services`, label: t.nav.services, isRoute: false },
    { href: `${hashPrefix}#approach`, label: t.nav.approach, isRoute: false },
    { href: `${hashPrefix}#showcase`, label: t.nav.showcase, isRoute: false },
    { href: `${hashPrefix}#contact`, label: t.nav.contact, isRoute: false },
  ];

  const linkClass =
    "text-sm text-muted transition-colors hover:text-foreground";
  const mobileLinkClass =
    "rounded-lg px-3 py-3 text-lg text-foreground/90 hover:bg-surface";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-white/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo size="md" />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                className={`${linkClass} ${
                  pathname === link.href ? "text-foreground" : ""
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <a
            href={`mailto:${t.cta.email}`}
            className="hidden rounded-full border border-border-strong bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:bg-foreground/90 sm:inline-block"
          >
            {t.cta.button}
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden border-b border-border bg-white/95 backdrop-blur-xl md:hidden"
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`${mobileLinkClass} ${
                  pathname === link.href ? "bg-surface" : ""
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={mobileLinkClass}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
      </motion.div>
    </header>
  );
}
