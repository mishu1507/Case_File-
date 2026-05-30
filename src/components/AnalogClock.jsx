import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PushPin from "./PushPin";

// AnalogClock — A vintage, highly detailed detective wall clock that keeps real system time.
// Fully interactive, matches the cinematic noir look, and acts as a focal alibi/time element.

export default function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = time.getHours();
  const mins = time.getMinutes();
  const secs = time.getSeconds();

  // Rotations for the hands in degrees
  const hrDegrees = ((hrs % 12) * 30) + (mins * 0.5);
  const minDegrees = (mins * 6) + (secs * 0.1);
  const secDegrees = secs * 6;

  // Render Roman Numerals around the clock
  const ROMANS = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

  return (
    <motion.div
      id="retro-clock"
      className="absolute"
      style={{
        top: 90,
        left: 60,
        zIndex: 15,
      }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.5 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Decorative mounting pin */}
      <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
        <PushPin color="red" />
      </div>

      {/* Clock Outer Body / Wood Case */}
      <div style={{
        width: 190,
        height: 190,
        borderRadius: "50%",
        background: "radial-gradient(circle, #251609 0%, #130a03 100%)",
        border: "8px solid #2e1d0f",
        boxShadow: "6px 10px 24px rgba(0,0,0,0.85), inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.6)",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        
        {/* Inner brass rim */}
        <div style={{
          width: 170,
          height: 170,
          borderRadius: "50%",
          border: "2px solid #5a421a",
          boxShadow: "inset 0 0 10px rgba(0,0,0,0.8)",
          background: "#ede3cd", // Aged parchment yellow
          backgroundImage: "radial-gradient(circle, #fcf6e8 0%, #ede3cd 100%)",
          position: "relative",
          overflow: "hidden",
        }}>

          {/* Aged paper noise overlay */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.99' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E\")"
          }} />

          {/* Subtly printed department labels */}
          <div style={{
            position: "absolute", top: 46, left: 0, right: 0,
            textAlign: "center", fontFamily: "'Special Elite', cursive",
            fontSize: "0.48rem", color: "rgba(139,0,0,0.38)",
            letterSpacing: "0.15em", textTransform: "uppercase"
          }}>
            EVIDENCE DIV.
          </div>
          <div style={{
            position: "absolute", bottom: 46, left: 0, right: 0,
            textAlign: "center", fontFamily: "'Courier Prime', monospace",
            fontSize: "0.42rem", color: "rgba(26,18,8,0.35)",
            letterSpacing: "0.08em"
          }}>
            CASE NO. 2026-B
          </div>

          {/* Minute ticks / railroad track */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <circle cx="85" cy="85" r="76" fill="none" stroke="rgba(26,18,8,0.18)" strokeWidth="1" strokeDasharray="1,3.9" />
            <circle cx="85" cy="85" r="79" fill="none" stroke="rgba(26,18,8,0.1)" strokeWidth="0.5" />
          </svg>

          {/* Roman Numerals */}
          {ROMANS.map((num, idx) => {
            const angle = (idx * 30 * Math.PI) / 180;
            const radius = 60; // distance from center
            const x = 85 + radius * Math.sin(angle);
            const y = 85 - radius * Math.cos(angle);
            return (
              <div
                key={num}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                  fontFamily: "'Courier Prime', monospace",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                  color: "#2a1e12",
                  opacity: 0.85,
                }}
              >
                {num}
              </div>
            );
          })}

          {/* ── HOUR HAND ── */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 6,
            height: 42,
            background: "#1a1208",
            borderRadius: "4px 4px 0 0",
            transformOrigin: "bottom center",
            transform: `translate(-50%, -100%) rotate(${hrDegrees}deg)`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }} />

          {/* ── MINUTE HAND ── */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 4,
            height: 60,
            background: "#1a1208",
            borderRadius: "3px 3px 0 0",
            transformOrigin: "bottom center",
            transform: `translate(-50%, -100%) rotate(${minDegrees}deg)`,
            boxShadow: "0 1.5px 4px rgba(0,0,0,0.3)",
          }} />

          {/* ── SECOND HAND (Ticks realistically) ── */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 1.5,
            height: 68,
            background: "#8b0000",
            transformOrigin: "bottom center",
            transform: `translate(-50%, -100%) rotate(${secDegrees}deg)`,
            transition: "transform 0.15s cubic-bezier(0.8, 0, 0.2, 1.4)",
          }} />

          {/* Center Brass Cap */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "radial-gradient(circle, #d4a743 0%, #7d5c1a 100%)",
            border: "1px solid #3d2a06",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
          }} />

          {/* Glass reflection overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 40%, transparent 40.5%, transparent 100%)",
            pointerEvents: "none",
            borderRadius: "50%",
            zIndex: 15,
          }} />
        </div>
      </div>
    </motion.div>
  );
}
