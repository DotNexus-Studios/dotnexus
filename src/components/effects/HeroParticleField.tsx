"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 72;
const FOCAL = 520;
const DEPTH_SPREAD = 280;
const CONNECT_BASE = 72;
const CONNECT_SCROLL_BOOST = 110;
const SCROLL_IDLE_MS = 120;
const MOTION_SCALE = 0.014;

type Particle = {
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
};

type Projected = {
  sx: number;
  sy: number;
  radius: number;
  opacity: number;
  z: number;
};

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    baseX: (Math.random() - 0.5) * 1.8,
    baseY: (Math.random() - 0.5) * 1.8,
    baseZ: 40 + Math.random() * (DEPTH_SPREAD - 40),
    phase: Math.random() * Math.PI * 2,
  }));
}

/** Scroll position on the page drives motion (bidirectional, no time-based drift). */
function getScrollMotion(container: HTMLElement): number {
  const rect = container.getBoundingClientRect();
  const vh = window.innerHeight;
  const startLine = vh * 0.88;
  const traveledPx = startLine - rect.top;
  return traveledPx * MOTION_SCALE;
}

function getScrollProgress(container: HTMLElement): number {
  const rect = container.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh * 0.88;
  const end = -rect.height * 0.3;
  return Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
}

function project(
  p: Particle,
  width: number,
  height: number,
  motion: number
): Projected {
  const x =
    p.baseX +
    Math.sin(motion * 1.05 + p.phase) * 0.38 +
    Math.cos(motion * 0.55 + p.phase * 1.7) * 0.12;
  const y =
    p.baseY +
    Math.cos(motion * 0.92 + p.phase * 1.25) * 0.36 +
    Math.sin(motion * 0.48 + p.phase * 0.9) * 0.1;
  const z = Math.max(
    35,
    p.baseZ + Math.sin(motion * 0.68 + p.phase * 0.75) * 52
  );

  const scale = FOCAL / (FOCAL + z);
  const spreadX = width * 0.46;
  const spreadY = height * 0.42;

  const sx = width * 0.5 + x * spreadX * scale;
  const sy = height * 0.5 + y * spreadY * scale;
  const radius = (1.1 + scale * 2.8) * (0.85 + scale * 0.35);
  const opacity = 0.18 + scale * 0.72;

  return { sx, sy, radius, opacity, z };
}

type HeroParticleFieldProps = {
  className?: string;
  label: string;
  hint: string;
};

export function HeroParticleField({
  className = "",
  label,
  hint,
}: HeroParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>(createParticles());
  const inViewRef = useRef(false);
  const scrollingRef = useRef(false);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);
  const drawRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const markScrolling = () => {
      scrollingRef.current = true;
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = setTimeout(() => {
        scrollingRef.current = false;
        drawRef.current?.();
      }, SCROLL_IDLE_MS);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!inViewRef.current) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      if (w <= 0 || h <= 0) return;

      const motion = getScrollMotion(container);
      const scroll = getScrollProgress(container);
      const showLinks =
        scrollingRef.current && !reducedMotionRef.current;

      const connectDist = CONNECT_BASE + scroll * CONNECT_SCROLL_BOOST;
      const linkStrength = 0.1 + scroll * 0.45;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const projected = particlesRef.current.map((p) =>
        project(p, w, h, motion)
      );
      projected.sort((a, b) => a.z - b.z);

      if (showLinks) {
        for (let i = 0; i < projected.length; i++) {
          for (let j = i + 1; j < projected.length; j++) {
            const a = projected[i];
            const b = projected[j];
            const dist = Math.hypot(a.sx - b.sx, a.sy - b.sy);
            if (dist > connectDist) continue;

            const depthFactor = (a.opacity + b.opacity) * 0.5;
            const fade = 1 - dist / connectDist;
            const alpha = linkStrength * fade * depthFactor;
            if (alpha < 0.03) continue;

            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
            ctx.lineWidth = 0.55 + scroll * 0.35;
            ctx.stroke();
          }
        }
      }

      for (const p of projected) {
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${p.opacity})`;
        ctx.fill();
      }
    };

    drawRef.current = draw;

    resize();
    draw();

    const onScroll = () => {
      if (!inViewRef.current) return;
      markScrolling();
      draw();
    };

    const onResize = () => {
      resize();
      draw();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) draw();
      },
      { threshold: 0.08 }
    );
    io.observe(container);

    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(container);

    return () => {
      drawRef.current = null;
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="relative h-56 w-full overflow-hidden sm:h-72 md:h-80"
        aria-hidden
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-mono text-xs tracking-[0.2em] text-foreground uppercase">
          {label}
        </p>
        <p className="max-w-md text-sm text-muted">{hint}</p>
      </div>
    </div>
  );
}
