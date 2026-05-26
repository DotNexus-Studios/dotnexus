"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 72;
const FOCAL = 520;
const DEPTH_SPREAD = 280;
const CONNECT_BASE = 72;
const CONNECT_SCROLL_BOOST = 110;
const SCROLL_IDLE_MS = 120;

type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
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
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
    z: Math.random() * DEPTH_SPREAD,
    vx: (Math.random() - 0.5) * 0.00035,
    vy: (Math.random() - 0.5) * 0.00035,
    vz: (Math.random() - 0.5) * 0.45,
    phase: Math.random() * Math.PI * 2,
  }));
}

function project(
  p: Particle,
  width: number,
  height: number,
  motionTime: number,
  animate: boolean
): Projected {
  const driftX = animate ? Math.sin(motionTime * 0.55 + p.phase) * 0.12 : 0;
  const driftY = animate ? Math.cos(motionTime * 0.48 + p.phase * 1.3) * 0.1 : 0;
  const driftZ = animate ? Math.sin(motionTime * 0.35 + p.phase * 0.7) * 28 : 0;

  const z = Math.max(40, p.z + driftZ);
  const scale = FOCAL / (FOCAL + z);
  const spreadX = width * 0.46;
  const spreadY = height * 0.42;

  const sx = width * 0.5 + (p.x + driftX) * spreadX * scale;
  const sy = height * 0.5 + (p.y + driftY) * spreadY * scale;
  const radius = (1.1 + scale * 2.8) * (0.85 + scale * 0.35);
  const opacity = 0.18 + scale * 0.72;

  return { sx, sy, radius, opacity, z };
}

function updateParticles(particles: Particle[], motionTime: number) {
  for (const p of particles) {
    p.x += p.vx + Math.sin(motionTime * 0.4 + p.phase) * 0.00008;
    p.y += p.vy + Math.cos(motionTime * 0.38 + p.phase) * 0.00008;
    p.z += p.vz;

    if (p.x < -1.1 || p.x > 1.1) p.vx *= -1;
    if (p.y < -1.1 || p.y > 1.1) p.vy *= -1;
    if (p.z < 30 || p.z > DEPTH_SPREAD) p.vz *= -1;

    p.x = Math.max(-1.15, Math.min(1.15, p.x));
    p.y = Math.max(-1.15, Math.min(1.15, p.y));
    p.z = Math.max(25, Math.min(DEPTH_SPREAD, p.z));
  }
}

export function HeroParticleField({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>(createParticles());
  const scrollProgressRef = useRef(0);
  const inViewRef = useRef(false);
  const scrollingRef = useRef(false);
  const motionTimeRef = useRef(0);
  const lastFrameRef = useRef(0);
  const rafRef = useRef<number>(0);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateScrollProgress = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = -rect.height * 0.35;
      const raw = (start - rect.top) / (start - end);
      scrollProgressRef.current = Math.max(0, Math.min(1, raw));
    };

    const markScrolling = () => {
      scrollingRef.current = true;
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = setTimeout(() => {
        scrollingRef.current = false;
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

    resize();
    updateScrollProgress();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (time: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      const delta = lastFrameRef.current ? (time - lastFrameRef.current) * 0.001 : 0;
      lastFrameRef.current = time;

      const active =
        inViewRef.current &&
        scrollingRef.current &&
        !reducedMotionRef.current;

      if (active) {
        motionTimeRef.current += delta;
        updateParticles(particlesRef.current, motionTimeRef.current);
      }

      const scroll = scrollProgressRef.current;
      const connectDist = active
        ? CONNECT_BASE + scroll * CONNECT_SCROLL_BOOST
        : 0;
      const linkStrength = active ? 0.08 + scroll * 0.42 : 0;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const projected = particlesRef.current.map((p) =>
        project(p, w, h, motionTimeRef.current, active)
      );
      projected.sort((a, b) => a.z - b.z);

      if (active) {
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
            ctx.lineWidth = 0.5 + scroll * 0.4;
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

    const loop = (now: number) => {
      if (inViewRef.current) {
        draw(now);
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onScroll = () => {
      if (!inViewRef.current) return;
      markScrolling();
      updateScrollProgress();
    };

    const onResize = () => resize();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          updateScrollProgress();
          draw(performance.now());
        }
      },
      { threshold: 0.12 }
    );
    io.observe(container);

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
