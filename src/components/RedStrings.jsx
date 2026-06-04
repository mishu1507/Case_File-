import { useEffect, useRef, useState, useCallback } from "react";

// RedStrings — SVG layer for connecting elements with red thread curves
// Uses quadratic bezier curves between pinned elements

const CONNECTIONS = [
  { from: "profile-card", to: "flip-clock", label: "SUBJECT TIMELINE" },
  { from: "dossier-card", to: "flip-clock", label: "CASE ALIBI" },
  { from: "flip-clock", to: "folder-forensic-lens", label: "TIMELINE RECONSTRUCTION" },
  { from: "flip-clock", to: "skill-cybersecurity", label: "INCIDENT TIME" },
  { from: "folder-quarantine", to: "skill-cybersecurity", label: "SANDBOX VERDICT" },
  { from: "folder-authenti-hire", to: "skill-languages", label: "SCAM CLASSIFIER" },
  { from: "folder-mernverse-os", to: "skill-frameworks", label: "SIMULATION" },
  { from: "folder-prompt-shield", to: "skill-cybersecurity", label: "AI SHIELD" },
  { from: "folder-threat-scope", to: "skill-concepts", label: "ATTACK PATH" },
  { from: "folder-brainsparkz", to: "skill-languages", label: "GAMIFIED" },
  { from: "certifications-stack", to: "evidence-board", label: "VERIFIED" },
  { from: "contact-note", to: "profile-card", label: "LINK" },
];

function getCenter(el) {
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  const scrollEl = document.querySelector(".cork-board-scroll");
  const scrollTop = scrollEl ? scrollEl.scrollTop : 0;
  const scrollLeft = scrollEl ? scrollEl.scrollLeft : 0;
  return {
    x: rect.left + rect.width / 2 + scrollLeft,
    y: rect.top + rect.height / 2 + scrollTop,
  };
}

function quadBezier(x1, y1, x2, y2) {
  // Control point is offset perpendicular to midpoint for a realistic string sag
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  // Sag direction: push control point downward (simulate gravity on thread)
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const sag = Math.min(len * 0.22, 80);
  const cx = mx - (dy / len) * sag * 0.3;
  const cy = my + Math.abs(dx / len) * sag;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export default function RedStrings() {
  const [paths, setPaths] = useState([]);
  const rafRef = useRef();

  const recalculate = useCallback(() => {
    const newPaths = [];
    CONNECTIONS.forEach(({ from, to, label }) => {
      const fromEl = document.getElementById(from);
      const toEl = document.getElementById(to);
      const a = getCenter(fromEl);
      const b = getCenter(toEl);
      if (a && b) {
        newPaths.push({ d: quadBezier(a.x, a.y, b.x, b.y), label, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 + 20 });
      }
    });
    setPaths(newPaths);
  }, []);

  useEffect(() => {
    // Delay to let DOM layout settle
    const timeout = setTimeout(() => {
      recalculate();
    }, 600);

    const handleResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(recalculate);
    };

    window.addEventListener("resize", handleResize);
    const scrollEl = document.querySelector(".cork-board-scroll");
    if (scrollEl) scrollEl.addEventListener("scroll", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      if (scrollEl) scrollEl.removeEventListener("scroll", handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [recalculate]);

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
        overflow: "visible",
      }}
    >
      <defs>
        <filter id="string-glow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {paths.map(({ d, label, mx, my }, i) => (
        <g key={i}>
          {/* Main string (dulled for clean visuals as requested) */}
          <path
            d={d}
            stroke="#cc2200"
            strokeWidth="1.5"
            fill="none"
            opacity="0.32"
            filter="url(#string-glow)"
            strokeLinecap="round"
          />
          {/* Subtle thread texture — secondary thinner line */}
          <path
            d={d}
            stroke="#ff4422"
            strokeWidth="0.5"
            fill="none"
            opacity="0.12"
            strokeLinecap="round"
          />
          {/* Small label at midpoint */}
          {label && (
            <text
              x={mx}
              y={my}
              textAnchor="middle"
              style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: "8px",
                fill: "rgba(204,34,0,0.32)",
                letterSpacing: "0.12em",
              }}
            >
              {label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
