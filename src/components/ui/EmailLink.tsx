"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { openContactEmail } from "@/lib/obfuscatedEmail";

type EmailLinkProps = {
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "className" | "type" | "onClick">;

/** Opens mail client on click — no mailto: in the HTML source. */
export function EmailLink({ children, className, ...props }: EmailLinkProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={openContactEmail}
      {...props}
    >
      {children}
    </button>
  );
}
