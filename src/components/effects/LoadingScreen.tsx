"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BRAND_TEXT = "DOTNEXUS";

/** Max 6s total: 5.5s animation + 0.5s fade */
const FILL_DURATION = 1900;
const MORPH_DURATION = 2400;
const HOLD_DURATION = 1200;
const FADE_DURATION = 500;

const TOTAL_DURATION = FILL_DURATION + MORPH_DURATION + HOLD_DURATION;

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

type BrandLayout = {
  fontSize: number;
  targets: { x: number; y: number }[];
};

function getSpacing(width: number) {
  if (width < 400) return 9;
  if (width < 768) return 11;
  return 12;
}

function getDotRadius(spacing: number) {
  return spacing < 10 ? 1.35 : 1.55;
}

function drawBrandMark(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  fontSize: number,
  alpha = 1
) {
  ctx.save();
  ctx.fillStyle = `rgba(0,0,0,${alpha})`;
  ctx.font = `700 ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textBaseline = "middle";

  const letterSpacing = fontSize * 0.045;
  const chars = BRAND_TEXT.split("");
  const charWidths = chars.map((char) => ctx.measureText(char).width);
  const totalWidth =
    charWidths.reduce((sum, w) => sum + w, 0) +
    letterSpacing * (chars.length - 1);

  let x = (width - totalWidth) / 2;
  const y = height / 2;

  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x, y);
    x += charWidths[i] + letterSpacing;
  }

  ctx.restore();
}

function measureBrandTextWidth(
  ctx: CanvasRenderingContext2D,
  fontSize: number,
): number {
  const letterSpacing = fontSize * 0.045;
  const chars = BRAND_TEXT.split("");
  const charWidths = chars.map((char) => ctx.measureText(char).width);
  return (
    charWidths.reduce((sum, w) => sum + w, 0) +
    letterSpacing * (chars.length - 1)
  );
}

function measureBrandFontSize(
  ctx: CanvasRenderingContext2D,
  width: number
): number {
  const maxTextWidth = width * 0.88;
  let fontSize = Math.floor(width / (BRAND_TEXT.length * 0.68));
  fontSize = Math.max(22, Math.min(fontSize, 72));

  const setFont = (size: number) => {
    ctx.font = `700 ${size}px system-ui, -apple-system, sans-serif`;
  };

  setFont(fontSize);
  while (measureBrandTextWidth(ctx, fontSize) > maxTextWidth && fontSize > 18) {
    fontSize -= 1;
    setFont(fontSize);
  }
  return fontSize;
}

/** Evenly sample text pixels so strokes don't cluster at horizontal bars. */
function sampleBrandTargets(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  spacing: number,
  isDesktop: boolean,
): { x: number; y: number }[] {
  const cellSize = isDesktop
    ? Math.max(6, Math.round(spacing * 0.92))
    : Math.max(4, Math.round(spacing * 0.75));
  const bins = new Map<string, { x: number; y: number; score: number }>();
  const scanStep = isDesktop ? 2 : 3;

  for (let y = 0; y < height; y += scanStep) {
    for (let x = 0; x < width; x += scanStep) {
      const alpha = data[(y * width + x) * 4 + 3];
      if (alpha <= 100) continue;

      const bx = Math.floor(x / cellSize);
      const by = Math.floor(y / cellSize);
      const key = `${bx},${by}`;
      const cx = bx * cellSize + cellSize / 2;
      const cy = by * cellSize + cellSize / 2;
      const score = -Math.hypot(x - cx, y - cy);
      const existing = bins.get(key);

      if (!existing || score > existing.score) {
        bins.set(key, { x, y, score });
      }
    }
  }

  return Array.from(bins.values()).map(({ x, y }) => ({ x, y }));
}

function createBrandLayout(
  width: number,
  height: number,
  spacing: number,
): BrandLayout {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { fontSize: 32, targets: [] };

  const fontSize = measureBrandFontSize(ctx, width);
  drawBrandMark(ctx, width, height, fontSize);

  const { data } = ctx.getImageData(0, 0, width, height);
  const isDesktop = width >= 768;
  const targets = sampleBrandTargets(data, width, height, spacing, isDesktop);

  return { fontSize, targets };
}

function assignBrandDots(gridDots: Dot[], layout: BrandLayout, spacing: number) {
  const used = new Set<number>();
  const isDesktop = spacing >= 12;
  const maxDist = spacing * (isDesktop ? 4.2 : spacing < 10 ? 4 : 3.2);
  const center = sizeCenter(layout.targets);

  const sortedTargets = [...layout.targets].sort((a, b) => {
    const da = Math.hypot(a.x - center.x, a.y - center.y);
    const db = Math.hypot(b.x - center.x, b.y - center.y);
    return da - db;
  });

  for (const target of sortedTargets) {
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
    if (bestIdx >= 0 && bestDist < maxDist) {
      used.add(bestIdx);
      const dot = gridDots[bestIdx];
      dot.isBrand = true;
      dot.brandX = target.x;
      dot.brandY = target.y;
    }
  }
}

function sizeCenter(targets: { x: number; y: number }[]) {
  if (targets.length === 0) return { x: 0, y: 0 };
  const x = targets.reduce((sum, t) => sum + t.x, 0) / targets.length;
  const y = targets.reduce((sum, t) => sum + t.y, 0) / targets.length;
  return { x, y };
}

function buildGrid(width: number, height: number): {
  dots: Dot[];
  spacing: number;
  brandFontSize: number;
} {
  const spacing = getSpacing(width);
  const cols = Math.ceil(width / spacing) + 1;
  const rows = Math.ceil(height / spacing) + 1;
  const maxDiag = cols + rows;
  const dots: Dot[] = [];

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      dots.push({
        gx,
        gy,
        baseX: gx * spacing,
        baseY: gy * spacing,
        revealOrder: (gx + gy) / maxDiag,
        isBrand: false,
        brandX: 0,
        brandY: 0,
      });
    }
  }

  const layout = createBrandLayout(width, height, spacing);
  assignBrandDots(dots, layout, spacing);
  return { dots, spacing, brandFontSize: layout.fontSize };
}

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function waveOffset(x: number, y: number, time: number, dampen: number) {
  return (
    (Math.sin(x * 0.018 + time * 1.8) * 5 +
      Math.sin(y * 0.014 + time * 1.4) * 4 +
      Math.sin((x + y) * 0.01 + time * 2.2) * 2.5) *
    dampen
  );
}

function getPhaseProgress(elapsed: number) {
  const fillEnd = FILL_DURATION;
  const morphEnd = fillEnd + MORPH_DURATION;

  if (elapsed < fillEnd) {
    const fillT = easeOutCubic(elapsed / FILL_DURATION);
    return { fillT, morphT: 0, holdT: 0, isHold: false };
  }
  if (elapsed < morphEnd) {
    const morphT = easeInOutCubic((elapsed - fillEnd) / MORPH_DURATION);
    return { fillT: 1, morphT, holdT: 0, isHold: false };
  }
  if (elapsed < TOTAL_DURATION) {
    const holdT = easeOutCubic((elapsed - morphEnd) / HOLD_DURATION);
    return { fillT: 1, morphT: 1, holdT, isHold: true };
  }
  return { fillT: 1, morphT: 1, holdT: 1, isHold: true };
}

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const spacingRef = useRef(13);
  const brandFontRef = useRef(48);
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
        const grid = buildGrid(w, h);
        dotsRef.current = grid.dots;
        spacingRef.current = grid.spacing;
        brandFontRef.current = grid.brandFontSize;
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
      const spacing = spacingRef.current;
      const dotRadius = getDotRadius(spacing);
      const { fillT, morphT, holdT, isHold } = getPhaseProgress(elapsed);
      const time = elapsed / 1000;

      const waveDampen = isHold ? 0.06 : Math.max(0.12, 1 - morphT * 0.92);

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
            x = x + (dot.brandX - x) * morphT;
            y = y + (dot.brandY + waveOnBrand - y) * morphT;
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

      const neighbors: [number, number][] = [
        [1, 0],
        [0, 1],
        [1, 1],
        [-1, 1],
      ];

      const drawLink = (a: LiveDot, b: LiveDot) => {
        const linkOpacity = Math.min(a.opacity, b.opacity) * 0.5;
        if (linkOpacity < 0.02) return;
        const emphasize = (morphT > 0.2 || isHold) && a.isBrand && b.isBrand;
        const morphBoost = morphT * 0.35 + holdT * 0.1;
        const strength = linkOpacity * (0.65 + morphBoost);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = emphasize
          ? `rgba(0,0,0,${Math.min(strength * 2, 0.85)})`
          : `rgba(0,0,0,${strength})`;
        ctx.lineWidth = emphasize ? 1.15 : 0.6;
        ctx.stroke();
      };

      const useBrandLinks = morphT > 0.35 || isHold;

      if (useBrandLinks) {
        const brandLive = live.filter((p) => p.isBrand);
        const maxLinkDist = spacing * 1.55;
        const maxNeighbors = 4;

        for (let i = 0; i < brandLive.length; i++) {
          const a = brandLive[i];
          const nearby = brandLive
            .map((b, j) => ({
              j,
              dist: Math.hypot(a.x - b.x, a.y - b.y),
            }))
            .filter(({ j, dist }) => j !== i && dist <= maxLinkDist)
            .sort((x, y) => x.dist - y.dist)
            .slice(0, maxNeighbors);

          for (const { j } of nearby) {
            if (i < j) drawLink(a, brandLive[j]);
          }
        }
      } else {
        for (const a of live) {
          for (const [dx, dy] of neighbors) {
            const b = byCell.get(`${a.gx + dx},${a.gy + dy}`);
            if (b) drawLink(a, b);
          }
        }
      }

      for (const p of live) {
        const radius =
          p.isBrand && (morphT > 0.35 || isHold)
            ? dotRadius * (1.25 + holdT * 0.2)
            : dotRadius;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${Math.min(p.opacity, 1)})`;
        ctx.fill();
      }

      if (isHold && morphT >= 1) {
        const textAlpha = Math.min(1, holdT) * 0.1;
        drawBrandMark(ctx, w, h, brandFontRef.current, textAlpha);
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
