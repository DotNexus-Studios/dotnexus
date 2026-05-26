"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BRAND = "DOTNEXUS";
const SPACING = 13;
const DOT_RADIUS = 1.6;

/** Phase durations (ms) — total ~9.5s before fade */
const FILL_DURATION = 2600;
const CONNECT_DURATION = 2000;
const MORPH_DURATION = 3200;
const HOLD_DURATION = 2000;
const FADE_DURATION = 700;

const TOTAL_DURATION =
  FILL_DURATION + CONNECT_DURATION + MORPH_DURATION + HOLD_DURATION;

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

type Phase = "fill" | "connect" | "morph" | "hold" | "fade" | "done";

function sampleBrandDots(
  width: number,
  height: number,
  gridDots: Dot[]
): void {
  const canvas = document.createElement("canvas");
  const fontSize = Math.min(width * 0.12, 88);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = "#000";
  ctx.font = `600 ${fontSize}px system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(BRAND, width / 2, height / 2);

  const { data } = ctx.getImageData(0, 0, width, height);
  const targets: { x: number; y: number }[] = [];
  const step = 4;

  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha > 120) targets.push({ x, y });
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
    if (bestIdx >= 0 && bestDist < SPACING * 3) {
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

function waveOffset(x: number, y: number, time: number, dampen: number) {
  const d = dampen;
  return (
    (Math.sin(x * 0.018 + time * 1.8) * 5 +
      Math.sin(y * 0.014 + time * 1.4) * 4 +
      Math.sin((x + y) * 0.01 + time * 2.2) * 2.5) *
    d
  );
}

function getPhaseProgress(elapsed: number): {
  phase: Phase;
  fillT: number;
  connectT: number;
  morphT: number;
  holdT: number;
} {
  const fillEnd = FILL_DURATION;
  const connectEnd = fillEnd + CONNECT_DURATION;
  const morphEnd = connectEnd + MORPH_DURATION;
  if (elapsed < fillEnd) {
    return {
      phase: "fill",
      fillT: easeOutCubic(elapsed / FILL_DURATION),
      connectT: 0,
      morphT: 0,
      holdT: 0,
    };
  }
  if (elapsed < connectEnd) {
    const t = (elapsed - fillEnd) / CONNECT_DURATION;
    return {
      phase: "connect",
      fillT: 1,
      connectT: easeOutCubic(t),
      morphT: 0,
      holdT: 0,
    };
  }
  if (elapsed < morphEnd) {
    const t = (elapsed - connectEnd) / MORPH_DURATION;
    return {
      phase: "morph",
      fillT: 1,
      connectT: 1,
      morphT: easeInOutCubic(t),
      holdT: 0,
    };
  }
  if (elapsed < TOTAL_DURATION) {
    const t = (elapsed - morphEnd) / HOLD_DURATION;
    return {
      phase: "hold",
      fillT: 1,
      connectT: 1,
      morphT: 1,
      holdT: easeOutCubic(t),
    };
  }
  return {
    phase: elapsed < TOTAL_DURATION + FADE_DURATION ? "fade" : "done",
    fillT: 1,
    connectT: 1,
    morphT: 1,
    holdT: 1,
  };
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const onCompleteRef = useRef(onComplete);
  const finishedRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w !== sizeRef.current.w || h !== sizeRef.current.h) {
        sizeRef.current = { w, h };
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        dotsRef.current = buildGrid(w, h);
      }
    };

    setupSize();

    const draw = (elapsed: number) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const dots = dotsRef.current;
      const { phase, fillT, connectT, morphT, holdT } = getPhaseProgress(elapsed);
      const time = elapsed / 1000;

      const waveDampen =
        phase === "hold"
          ? 0.06
          : Math.max(0.12, 1 - morphT * 0.92);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      const revealThreshold = fillT * 1.15;
      const brandOnly = morphT >= 1;

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
        let y = dot.baseY + waveOffset(dot.baseX, dot.baseY, time, waveDampen);

        let opacity = appear;

        if (morphT > 0) {
          if (dot.isBrand) {
            const waveOnBrand =
              waveOffset(dot.brandX, dot.brandY, time, waveDampen) * (1 - morphT);
            const tx = dot.brandX;
            const ty = dot.brandY + waveOnBrand;
            x = x + (tx - x) * morphT;
            y = y + (ty - y) * morphT;
            opacity = Math.max(appear, 0.55 + morphT * 0.45);
          } else {
            opacity = appear * (1 - morphT);
            if (opacity < 0.03) continue;
          }
        }

        if (brandOnly && !dot.isBrand) continue;

        if (brandOnly && dot.isBrand) {
          opacity = Math.min(1, 0.85 + holdT * 0.15);
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

      const connectionStrength =
        connectT * (1 - morphT * 0.3) + morphT * 0.9 + holdT * 0.1;
      const neighbors: [number, number][] = [
        [1, 0],
        [0, 1],
        [1, 1],
        [-1, 1],
      ];

      const drawLink = (a: LiveDot, b: LiveDot) => {
        const linkOpacity =
          connectionStrength * Math.min(a.opacity, b.opacity) * 0.48;
        if (linkOpacity < 0.02) return;
        const emphasize = (morphT > 0.25 || holdT > 0) && a.isBrand && b.isBrand;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = emphasize
          ? `rgba(0,0,0,${Math.min(linkOpacity * 2, 0.85)})`
          : `rgba(0,0,0,${linkOpacity})`;
        ctx.lineWidth = emphasize ? 1.2 : 0.6;
        ctx.stroke();
      };

      for (const a of live) {
        for (const [dx, dy] of neighbors) {
          const b = byCell.get(`${a.gx + dx},${a.gy + dy}`);
          if (b) drawLink(a, b);
        }
      }

      for (const p of live) {
        const radius =
          p.isBrand && (morphT > 0.4 || holdT > 0)
            ? DOT_RADIUS * (1.25 + holdT * 0.2)
            : DOT_RADIUS;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${Math.min(p.opacity, 1)})`;
        ctx.fill();
      }

      if (holdT > 0.15 && morphT >= 1) {
        const textAlpha = Math.min(1, holdT) * 0.12;
        ctx.font = `600 ${Math.min(w * 0.12, 88)}px system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = `rgba(0,0,0,${textAlpha})`;
        ctx.fillText(BRAND, w / 2, h / 2);
      }

      if (elapsed >= TOTAL_DURATION && !finishedRef.current) {
        finishedRef.current = true;
        setFadeOut(true);
        window.setTimeout(() => {
          setVisible(false);
          onCompleteRef.current();
        }, FADE_DURATION);
      }
    };

    startRef.current = performance.now();

    const loop = (now: number) => {
      draw(now - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      if (finishedRef.current) return;
      setupSize();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
