import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
};

const heights = { sm: 32, md: 40, lg: 56 };

export function Logo({ size = "md", showWordmark = true, className = "" }: LogoProps) {
  const height = heights[size];

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label="DotNexus"
    >
      <Image
        src="/logo.png"
        alt=""
        width={height}
        height={height}
        className="rounded-lg object-contain"
        style={{ height, width: height }}
        priority={size === "md"}
      />
      {showWordmark && (
        <span className="text-sm font-medium tracking-tight text-foreground group-hover:text-foreground/80">
          DotNexus
        </span>
      )}
    </Link>
  );
}
