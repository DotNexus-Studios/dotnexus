type BrandWordmarkProps = {
  className?: string;
};

/** Visual: DOTNEXUS. Screen readers: DotNexus */
export function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  return (
    <span
      aria-label="DotNexus"
      className={`font-medium tracking-tight text-foreground ${className}`}
    >
      DOTNEXUS
    </span>
  );
}
