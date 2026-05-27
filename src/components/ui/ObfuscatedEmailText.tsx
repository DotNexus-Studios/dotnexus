"use client";

import { useEffect, useState } from "react";
import { getContactEmail } from "@/lib/obfuscatedEmail";

type ObfuscatedEmailTextProps = {
  className?: string;
};

/** Renders the contact email only after hydration (not in static HTML). */
export function ObfuscatedEmailText({ className }: ObfuscatedEmailTextProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getContactEmail());
  }, []);

  if (!email) {
    return (
      <span className={className} aria-hidden>
        ···
      </span>
    );
  }

  return (
    <span className={className} style={{ userSelect: "none" }} aria-label={email}>
      {email}
    </span>
  );
}
