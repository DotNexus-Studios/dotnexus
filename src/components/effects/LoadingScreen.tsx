"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const BRAND = "DOTNEXUS";
const SPACING = 13;
const DOT_RADIUS = 1.6;
const FILL_DURATION = 2200;
const CONNECT_DURATION = 1400;
const MORPH_DURATION = 1600;
const HOLD_DURATION = 700;
const FADE_DURATION = 600;

type Dot = {
  gx: number;
  gy: number;
  baseX: number;
  baseY: number;
  revealOrder: number;
  isBrand: boolean;
  brandX: number;
  brandY: number;
};

function sampleBrandDots(
  width: number,
  height: number,
  gridDots: Dot[]
): void {
  const canvas = document.createElement("canvas");
  const fontSize = Math.min(width * 0.11, 80);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#000";
  ctx.font = `600 ${fontSize}px var(--font-geist-sans), system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(BRAND, width / 2, height / 2);

  const { data } = ctx.getImageData(0, 0, width, height);
  const targets: { x: number; y: number }[] = [];
  const step = 5;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 140) targets.push({ x, y });
    }
  }

  const used = new Set<number>();
  for (const target of targets) {
    let bestIdx = -1;
    let bestDist = Infinity;
    for (let i = 0; i < gridDots.length; i++) {
      if (used.has(i)) continue;
      const d = Math.hypot(gridDots[i].baseX - target.x, gridDots[i].baseY - target.y);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    if (bestIdx >= 0 && bestDist < SPACING * 2.2) {
      used.add(bestIdx);
      const dot = gridDots[bestIdx];
      dot.isBrand = true;
      dot.brandX = target.x;
      dot.brandY = target.y;
    }
  }
}

function buildGrid(width: number, height: number): Dot[] {
  const cols = Math.ceil(width / SPACING) + 1;
  const rows = Math.ceil(height / SPACING) + 1;
  const maxDiag = cols + rows;
  const dots: Dot[] = [];

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      dots.push({
        gx,
        gy,
        baseX: gx * SPACING,
        baseY: gy * SPACING,
        revealOrder: (gx + gy) / maxDiag,
        isBrand: false,
        brandX: 0,
        brandY: 0,
      });
    }
  }

  sampleBrandDots(width, height, dots);
  return dots;
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function waveOffset(x: number, y: number, time: number) {
  return (
    Math.sin(x * 0.018 + time * 1.8) * 5 +
    Math.sin(y * 0.014 + time * 1.4) * 4 +
    Math.sin((x + y) * 0.01 + time * 2.2) * 2.5
  );
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const completeRef = useRef(false);

  const totalDuration =
    FILL_DURATION + CONNECT_DURATION + MORPH_DURATION + HOLD_DURATION;

  const draw = useCallback((elapsed: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const dots = dotsRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const time = elapsed / 1000;

    let fillT = 0;
    let connectT = 0;
    let morphT = 0;
    let holdT = 0;

    if (elapsed < FILL_DURATION) {
      fillT = easeOutCubic(elapsed / FILL_DURATION);
    } else if (elapsed < FILL_DURATION + CONNECT_DURATION) {
      fillT = 1;
      connectT = easeOutCubic((elapsed - FILL_DURATION) / CONNECT_DURATION);
    } else if (elapsed < FILL_DURATION + CONNECT_DURATION + MORPH_DURATION) {
      fillT = 1;
      connectT = 1;
      morphT = easeInOutCubic(
        (elapsed - FILL_DURATION - CONNECT_DURATION) / MORPH_DURATION
      );
    } else if (elapsed < totalDuration) {
      fillT = 1;
      connectT = 1;
      morphT = 1;
      holdT = (elapsed - FILL_DURATION - CONNECT_DURATION - MORPH_DURATION) / HOLD_DURATION;
    } else {
      fillT = 1;
      connectT = 1;
      morphT = 1;
      holdT = 1;
    }

    const revealThreshold = fillT * 1.15;
    type LiveDot = {
      x: number;
      y: number;
      opacity: number;
      isBrand: boolean;
      gx: number;
      gy: number;
    };
    const live: LiveDot[] = [];

    for (const dot of dots) {
      const revealed = dot.revealOrder < revealThreshold;
      if (!revealed && morphT < 0.05) continue;

      const appear = Math.min(1, (revealThreshold - dot.revealOrder) * 10);
      let x = dot.baseX;
      let y = dot.baseY + waveOffset(dot.baseX, dot.baseY, time);

      let opacity = appear;

      if (morphT > 0) {
        if (dot.isBrand) {
          const tx = dot.brandX;
          const ty =
            dot.brandY + waveOffset(dot.brandX, dot.brandY, time) * (1 - morphT);
          x = x + (tx - x) * morphT;
          y = y + (ty - y) * morphT;
          opacity = Math.max(appear, 0.4 + morphT * 0.6);
        } else {
          opacity = appear * (1 - morphT);
          if (opacity < 0.03) continue;
        }
      }

      live.push({
        x,
        y,
        opacity,
        isBrand: dot.isBrand,
        gx: dot.gx,
        gy: dot.gy,
      });
    }

    const byCell = new Map<string, LiveDot>();
    for (const p of live) {
      byCell.set(`${p.gx},${p.gy}`, p);
    }

    const connectionStrength = connectT * (1 - morphT * 0.35) + morphT * 0.85;
    const neighbors: [number, number][] = [
      [1, 0],
      [0, 1],
      [1, 1],
    ];

    const drawLink = (a: LiveDot, b: LiveDot) => {
      const linkOpacity = connectionStrength * Math.min(a.opacity, b.opacity) * 0.42;
      if (linkOpacity < 0.02) return;
      const emphasize = morphT > 0.3 && a.isBrand && b.isBrand;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = emphasize
        ? `rgba(0,0,0,${Math.min(linkOpacity * 1.8, 0.7)})`
        : `rgba(0,0,0,${linkOpacity})`;
      ctx.lineWidth = emphasize ? 1.1 : 0.6;
      ctx.stroke();
    };

    for (const a of live) {
      for (const [dx, dy] of neighbors) {
        const b = byCell.get(`${a.gx + dx},${a.gy + dy}`);
        if (b) drawLink(a, b);
      }
    }

    for (const p of live) {
      const radius = p.isBrand && morphT > 0.5 ? DOT_RADIUS * 1.35 : DOT_RADIUS;
      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,0,0,${Math.min(p.opacity, 1)})`;
      ctx.fill();
    }

    if (holdT > 0.6 && morphT >= 1) {
      ctx.font = `600 ${Math.min(w * 0.11, 80)}px var(--font-geist-sans), system-ui, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `rgba(0,0,0,${Math.min((holdT - 0.6) / 0.4, 1) * 0.08})`;
      ctx.fillText(BRAND, w / 2, h / 2);
    }

    if (elapsed >= totalDuration && !completeRef.current) {
      completeRef.current = true;
      setFadeOut(true);
      window.setTimeout(() => {
        setVisible(false);
        onComplete();
      }, FADE_DURATION);
    }
  }, [onComplete, totalDuration]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      dotsRef.current = buildGrid(w, h);
    };

    resize();
    window.addEventListener("resize", resize);
    startRef.current = performance.now();

    const loop = (now: number) => {
      draw(now - startRef.current);
      if (!completeRef.current || fadeOut) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [draw, fadeOut]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: fadeOut ? 0 : 1 }}
          transition={{ duration: FADE_DURATION / 1000, ease: "easeInOut" }}
          aria-hidden={fadeOut}
        >
          <canvas ref={canvasRef} className="block h-full w-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
