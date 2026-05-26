"use client";

export function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px overflow-hidden">
      <div className="scan-line glow-line h-px w-full" />
    </div>
  );
}
