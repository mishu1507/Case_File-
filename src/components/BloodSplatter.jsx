// BloodSplatter — Procedural SVG blood effects for the forensic board
// All positions/sizes seeded so layout is deterministic (no hydration jitter)

import { useMemo } from "react";

// ── Seeded LCG random (deterministic) ───────────────────────────────────────
function makePRNG(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

// ── One irregular blob splatter using SVG path ───────────────────────────────
function SplatBlob({ cx, cy, r, rand, opacity = 0.82, dark = false }) {
  const color = dark ? "#3a0000" : "#8b0000";
  const points = 12;
  const path = useMemo(() => {
    let d = "";
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const radius = r * (0.55 + rand() * 0.85);
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return d + " Z";
  }, [cx, cy, r, rand]);

  return <path d={path} fill={color} opacity={opacity} />;
}

// ── Small satellite drops around a splatter ──────────────────────────────────
function SatelliteDrops({ cx, cy, r, rand, count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const angle = rand() * Math.PI * 2;
        const dist = r * (1.2 + rand() * 2.2);
        const dx = cx + Math.cos(angle) * dist;
        const dy = cy + Math.sin(angle) * dist;
        const dr = r * (0.04 + rand() * 0.14);
        // elongate in the direction of travel
        const rx = dr;
        const ry = dr * (1 + rand() * 1.5);
        const rot = (angle * 180) / Math.PI;
        return (
          <ellipse
            key={i}
            cx={dx} cy={dy}
            rx={rx} ry={ry}
            fill="#8b0000"
            opacity={0.6 + rand() * 0.35}
            transform={`rotate(${rot} ${dx} ${dy})`}
          />
        );
      })}
    </>
  );
}

// ── Drip trail hanging down from a point ────────────────────────────────────
function Drip({ x, y, length, width, rand }) {
  // bulge at bottom
  const bulgeR = width * (1.4 + rand() * 1.2);
  const wobble = (rand() - 0.5) * 6;
  return (
    <g className="blood-drip">
      {/* shaft */}
      <rect
        x={x - width / 2 + wobble}
        y={y}
        width={width}
        height={length}
        rx={width / 2}
        fill="#6b0000"
        opacity={0.75}
      />
      {/* bulging droplet at tip */}
      <ellipse
        cx={x + wobble}
        cy={y + length + bulgeR * 0.7}
        rx={bulgeR}
        ry={bulgeR * 1.15}
        fill="#8b0000"
        opacity={0.88}
      />
    </g>
  );
}

// ── Main blood smear streak ──────────────────────────────────────────────────
function BloodSmear({ x1, y1, x2, y2, width, rand }) {
  const mx = (x1 + x2) / 2 + (rand() - 0.5) * 80;
  const my = (y1 + y2) / 2 + (rand() - 0.5) * 40;
  return (
    <path
      d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
      stroke="#6b0000"
      strokeWidth={width}
      strokeLinecap="round"
      fill="none"
      opacity={0.28 + rand() * 0.25}
      strokeDasharray={`${8 + rand() * 30} ${4 + rand() * 20}`}
    />
  );
}

// ── Fingerprint smudge (arc of dots) ────────────────────────────────────────
function FingerprintSmudge({ cx, cy, rand }) {
  const lines = 6;
  const baseR = 12 + rand() * 14;
  const rot = rand() * 360;
  return (
    <g transform={`rotate(${rot} ${cx} ${cy})`} opacity={0.22 + rand() * 0.18}>
      {Array.from({ length: lines }).map((_, i) => {
        const r = baseR + i * 4;
        const startA = -0.6 + rand() * 0.3;
        const endA = 0.6 - rand() * 0.3;
        const x1 = cx + Math.cos(startA) * r;
        const y1 = cy + Math.sin(startA) * r;
        const x2 = cx + Math.cos(endA) * r;
        const y2 = cy + Math.sin(endA) * r;
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
            stroke="#5a0000"
            strokeWidth={1.5 + rand() * 1.5}
            fill="none"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

// ── Master component ─────────────────────────────────────────────────────────
export default function BloodSplatter({ boardHeight = 2200 }) {
  const rand = useMemo(() => makePRNG(0xdeadbeef), []);

  // Generate splatter configs (seeded, so always same layout)
  const splatters = useMemo(() => {
    const r = makePRNG(0xbeefdead);
    return Array.from({ length: 14 }).map((_, i) => ({
      cx: 60 + r() * 1150,
      cy: 80 + r() * (boardHeight - 200),
      radius: 8 + r() * 32,
      drops: Math.floor(5 + r() * 14),
      opacity: 0.45 + r() * 0.45,
      dark: r() > 0.6,
      seed: i * 777,
    }));
  }, [boardHeight]);

  const drips = useMemo(() => {
    const r = makePRNG(0xcafebabe);
    return Array.from({ length: 10 }).map(() => ({
      x: 40 + r() * 1180,
      y: 30 + r() * 200,
      length: 18 + r() * 65,
      width: 3 + r() * 7,
    }));
  }, []);

  const smears = useMemo(() => {
    const r = makePRNG(0xfeedface);
    return Array.from({ length: 5 }).map(() => ({
      x1: r() * 400,
      y1: 120 + r() * (boardHeight - 400),
      x2: 200 + r() * 900,
      y2: 120 + r() * (boardHeight - 400),
      width: 4 + r() * 14,
    }));
  }, [boardHeight]);

  const fingerprints = useMemo(() => {
    const r = makePRNG(0xabcdef12);
    return Array.from({ length: 6 }).map(() => ({
      cx: 60 + r() * 1150,
      cy: 100 + r() * (boardHeight - 300),
    }));
  }, [boardHeight]);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: boardHeight,
        pointerEvents: "none",
        zIndex: 3,
        overflow: "visible",
      }}
    >
      <defs>
        {/* Slightly blurred so it looks wet/organic */}
        <filter id="blood-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="blood-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Smears ── */}
      <g filter="url(#blood-blur)">
        {smears.map((s, i) => (
          <BloodSmear key={i} {...s} rand={makePRNG(s.x1 * 13 + i * 99)} />
        ))}
      </g>

      {/* ── Splatters ── */}
      {splatters.map((sp, i) => {
        const r = makePRNG(sp.seed);
        return (
          <g key={i} filter="url(#blood-blur)">
            <SplatBlob
              cx={sp.cx} cy={sp.cy}
              r={sp.radius}
              rand={makePRNG(sp.seed + 1)}
              opacity={sp.opacity}
              dark={sp.dark}
            />
            <SatelliteDrops
              cx={sp.cx} cy={sp.cy}
              r={sp.radius}
              rand={makePRNG(sp.seed + 2)}
              count={sp.drops}
            />
          </g>
        );
      })}

      {/* ── Fingerprint smudges ── */}
      {fingerprints.map((fp, i) => (
        <FingerprintSmudge key={i} {...fp} rand={makePRNG(i * 333 + 7)} />
      ))}

      {/* ── Drips (rendered last so they're on top) ── */}
      <g filter="url(#blood-glow)">
        {drips.map((d, i) => (
          <Drip key={i} {...d} rand={makePRNG(i * 191 + 3)} />
        ))}
      </g>
    </svg>
  );
}
