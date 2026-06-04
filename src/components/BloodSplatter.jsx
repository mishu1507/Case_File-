// BloodSplatter — Forensic blood effects (splatters + fingerprints only, no drips)

import { useMemo } from "react";

function prng(seed) {
  let s = (seed ^ 0xdeadbeef) >>> 0;
  return () => {
    s = Math.imul(s ^ (s >>> 15), s | 1);
    s ^= s + Math.imul(s ^ (s >>> 7), s | 61);
    return ((s ^ (s >>> 14)) >>> 0) / 0xffffffff;
  };
}

// ── Irregular blob splatter ───────────────────────────────────────────────────
function Splat({ cx, cy, r, rand, opacity }) {
  const pts = 14;
  const d = useMemo(() => {
    let path = "";
    for (let i = 0; i < pts; i++) {
      const a      = (i / pts) * Math.PI * 2;
      const jitter = 0.45 + rand() * 0.9;
      const px     = cx + Math.cos(a) * r * jitter;
      const py     = cy + Math.sin(a) * r * jitter;
      path += i === 0 ? `M${px},${py}` : `L${px},${py}`;
    }
    return path + "Z";
  }, [cx, cy, r]);
  return <path d={d} fill="#7a0000" opacity={opacity} />;
}

// ── Satellite micro-drops around a splatter ───────────────────────────────────
function Satellites({ cx, cy, r, rand, n }) {
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const angle = rand() * Math.PI * 2;
        const dist  = r * (1.4 + rand() * 2.4);
        const dx    = cx + Math.cos(angle) * dist;
        const dy    = cy + Math.sin(angle) * dist;
        const dr    = r * (0.05 + rand() * 0.16);
        const rot   = (angle * 180) / Math.PI + 90;
        return (
          <ellipse
            key={i}
            cx={dx} cy={dy}
            rx={dr * 0.65}
            ry={dr * (1.4 + rand() * 0.8)}
            fill="#8b0000"
            opacity={0.5 + rand() * 0.42}
            transform={`rotate(${rot},${dx},${dy})`}
          />
        );
      })}
    </>
  );
}

// ── Fingerprint smudge ────────────────────────────────────────────────────────
function Fingerprint({ cx, cy, rand }) {
  const rot   = rand() * 360;
  const baseR = 10 + rand() * 16;
  return (
    <g transform={`rotate(${rot},${cx},${cy})`} opacity={0.13 + rand() * 0.11}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const ri = baseR + i * 4.5;
        const a0 = -0.55 + rand() * 0.25;
        const a1 =  0.55 - rand() * 0.25;
        const x0 = cx + Math.cos(a0) * ri;
        const y0 = cy + Math.sin(a0) * ri;
        const x1 = cx + Math.cos(a1) * ri;
        const y1 = cy + Math.sin(a1) * ri;
        return (
          <path
            key={i}
            d={`M${x0},${y0} A${ri},${ri} 0 0 1 ${x1},${y1}`}
            stroke="#4a0000"
            strokeWidth={1.2 + rand() * 1.4}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

// ── Master component ──────────────────────────────────────────────────────────
export default function BloodSplatter({ boardWidth = 1300, boardHeight = 2200 }) {

  const splatters = useMemo(() => {
    const r = prng(0xbeefdead);
    return Array.from({ length: 13 }).map((_, i) => ({
      cx:      50  + r() * (boardWidth  - 100),
      cy:     160  + r() * (boardHeight - 280),
      radius:   6  + r() * 26,
      n:    Math.floor(5 + r() * 15),
      opacity:  0.35 + r() * 0.42,
      seed:   i * 997,
    }));
  }, [boardWidth, boardHeight]);

  const prints = useMemo(() => {
    const r = prng(0xf00dcafe);
    return Array.from({ length: 7 }).map((_, i) => ({
      cx:   50 + r() * (boardWidth  - 100),
      cy:   80 + r() * (boardHeight - 180),
      seed: i * 1301,
    }));
  }, [boardWidth, boardHeight]);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%",
        height: boardHeight,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "visible",
      }}
    >
      <defs>
        <filter id="blood-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Splatters + satellites */}
      <g filter="url(#blood-blur)">
        {splatters.map((s, i) => (
          <g key={i}>
            <Splat
              cx={s.cx} cy={s.cy} r={s.radius}
              rand={prng(s.seed + 1)} opacity={s.opacity}
            />
            <Satellites
              cx={s.cx} cy={s.cy} r={s.radius}
              rand={prng(s.seed + 2)} n={s.n}
            />
          </g>
        ))}
      </g>

      {/* Fingerprint smudges */}
      {prints.map((p, i) => (
        <Fingerprint key={i} cx={p.cx} cy={p.cy} rand={prng(p.seed)} />
      ))}
    </svg>
  );
}
