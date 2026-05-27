"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Dot = {
  x: number;
  y: number;
  isAnchor: boolean;
};

type ScrollProgressTrailProps = {
  containerRef: RefObject<HTMLElement | null>;
};

const ANCHOR_SELECTOR = "[data-scroll-dot]";
const ANCHOR_X = 30;
const X_PATTERN = [12, 44, 20, 48, 16, 40, 24, 36];
const SCROLL_MARKER_RATIO = 0.42;

function buildDotPath(anchors: { y: number }[]): Dot[] {
  const dots: Dot[] = [];

  for (let i = 0; i < anchors.length; i++) {
    dots.push({ x: ANCHOR_X, y: anchors[i].y, isAnchor: true });

    if (i >= anchors.length - 1) continue;

    const span = anchors[i + 1].y - anchors[i].y;
    const count = span > 520 ? 3 : span > 280 ? 2 : 1;

    for (let j = 1; j <= count; j++) {
      const t = j / (count + 1);
      dots.push({
        x: X_PATTERN[(i * 2 + j) % X_PATTERN.length],
        y: anchors[i].y + span * t,
        isAnchor: false,
      });
    }
  }

  return dots.sort((a, b) => a.y - b.y);
}

function getSegmentProgress(marker: number, y0: number, y1: number) {
  if (marker <= y0) return 0;
  if (marker >= y1) return 1;
  return (marker - y0) / (y1 - y0);
}

export function ScrollProgressTrail({
  containerRef,
}: ScrollProgressTrailProps) {
  const [layout, setLayout] = useState<{
    height: number;
    dots: Dot[];
    visible: boolean;
  }>({ height: 0, dots: [], visible: false });
  const [scrollMarker, setScrollMarker] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const anchors = Array.from(
        container.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR),
      );

      if (anchors.length < 2) {
        setLayout({ height: 0, dots: [], visible: false });
        return;
      }

      const contentWidth = Math.min(window.innerWidth - 48, 1152);
      const sideMargin = (window.innerWidth - contentWidth) / 2;

      if (sideMargin < 52) {
        setLayout({ height: 0, dots: [], visible: false });
        return;
      }

      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      const anchorYs = anchors.map((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY - containerTop + rect.height * 0.45;
      });

      const height = container.offsetHeight;
      const dots = buildDotPath(anchorYs.map((y) => ({ y })));

      setLayout({
        height,
        dots,
        visible: true,
      });
    };

    const updateScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.getBoundingClientRect().top + window.scrollY;
      setScrollMarker(window.scrollY + window.innerHeight * SCROLL_MARKER_RATIO - containerTop);
    };

    const schedule = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        measure();
        updateScroll();
      });
    };

    measure();
    updateScroll();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const ro = new ResizeObserver(schedule);
    ro.observe(container);

    const mo = new MutationObserver(schedule);
    mo.observe(container, { childList: true, subtree: true, attributes: true });

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      mo.disconnect();
    };
  }, [containerRef]);

  if (!layout.visible || layout.dots.length < 2 || layout.height <= 0) {
    return null;
  }

  const { dots, height } = layout;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 z-0"
      style={{
        left: "max(12px, calc((100% - min(calc(100% - 3rem), 72rem)) / 2 - 52px))",
        width: 56,
      }}
      aria-hidden
    >
      <svg
        className="absolute left-0 top-0 overflow-visible"
        width={56}
        height={height}
        viewBox={`0 0 56 ${height}`}
      >
        {dots.slice(0, -1).map((dot, i) => {
          const next = dots[i + 1];
          const progress = reducedMotion
            ? scrollMarker >= next.y
              ? 1
              : scrollMarker <= dot.y
                ? 0
                : getSegmentProgress(scrollMarker, dot.y, next.y)
            : getSegmentProgress(scrollMarker, dot.y, next.y);

          if (progress <= 0) return null;

          const x2 = dot.x + (next.x - dot.x) * progress;
          const y2 = dot.y + (next.y - dot.y) * progress;
          const reached = progress >= 1;

          return (
            <line
              key={`${dot.y}-${next.y}`}
              x1={dot.x}
              y1={dot.y}
              x2={x2}
              y2={y2}
              stroke="rgba(0,0,0,0.85)"
              strokeWidth={reached ? 1.1 : 0.9}
              strokeLinecap="round"
              style={{
                opacity: reached ? 0.55 : 0.25 + progress * 0.35,
                transition: reducedMotion ? undefined : "opacity 0.15s ease",
              }}
            />
          );
        })}

        {dots.map((dot, index) => {
          const reached = scrollMarker >= dot.y;
          const distance = dot.y - scrollMarker;
          const upcoming = distance > 0 && distance < 120;
          const opacity = reached ? 0.9 : upcoming ? 0.35 : 0.18;
          const radius = dot.isAnchor ? 4.5 : 3;

          return (
            <circle
              key={`dot-${index}`}
              cx={dot.x}
              cy={dot.y}
              r={radius}
              fill="rgba(0,0,0,0.9)"
              style={{
                opacity,
                transition: reducedMotion ? undefined : "opacity 0.2s ease",
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
