type BrandWordmarkProps = {
  className?: string;
  dotClassName?: string;
  textClassName?: string;
  /** Written brand name for screen readers */
  label?: string;
};

export function BrandWordmark({
  className = "",
  dotClassName = "h-1.5 w-1.5",
  textClassName = "",
  label = "DotNexus",
}: BrandWordmarkProps) {
  return (
    <span
      aria-label={label}
      className={`inline-flex items-center gap-1.5 font-medium tracking-tight text-foreground ${className}`}
    >
      <span
        className={`shrink-0 rounded-full bg-foreground ${dotClassName}`}
        aria-hidden
      />
      <span className={textClassName}>NEXUS</span>
    </span>
  );
}
