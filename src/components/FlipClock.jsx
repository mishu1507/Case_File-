import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PushPin from "./PushPin";

// ── FlipDigit Sub-component ──────────────────────────────────────────────────
// Manages the split-flap 3D card flipping transition in React.
function FlipDigit({ value }) {
  const [current, setCurrent] = useState(value);
  const [previous, setPrevious] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== current) {
      setPrevious(current);
      setCurrent(value);
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [value, current]);

  return (
    <div className="flip-unit">
      {/* Top half of card (displays new/current digit) */}
      <div className="flip-card-half flip-card-top">
        <span>{current}</span>
      </div>
      
      {/* Bottom half of card (displays old/previous digit) */}
      <div className="flip-card-half flip-card-bottom">
        <span>{previous}</span>
      </div>

      {/* The rotating panel / flap */}
      {isFlipping && (
        <div className="flip-panel flip-anim">
          {/* Front of the flap (displays old digit on top) */}
          <div className="flip-panel-face flip-panel-front">
            <span>{previous}</span>
          </div>
          {/* Back of the flap (displays new digit on bottom) */}
          <div className="flip-panel-face flip-panel-back">
            <span>{current}</span>
          </div>
        </div>
      )}
      
      {/* Horizontal divider card seam line */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: 0,
        width: "100%",
        height: 1.5,
        background: "rgba(0,0,0,0.85)",
        zIndex: 20,
      }} />
    </div>
  );
}

// ── Main FlipClock Component ─────────────────────────────────────────────────
export default function FlipClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hrs = String(time.getHours()).padStart(2, "0");
  const mins = String(time.getMinutes()).padStart(2, "0");
  const secs = String(time.getSeconds()).padStart(2, "0");

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  const formattedTimezone = "TIMEZONE: GMT+5:30 // SECURE LINK";

  return (
    <motion.div
      id="flip-clock"
      className="absolute"
      style={{
        top: 90,
        left: "50%",
        zIndex: 20,
        transformOrigin: "top center",
      }}
      initial={{ opacity: 0, scale: 0.54, x: "-50%" }}
      animate={{ opacity: 1, scale: 0.58, x: "-50%" }}
      transition={{ delay: 0.35, duration: 0.5 }}
      whileHover={{ scale: 0.61, y: -3, x: "-50%", transition: { duration: 0.2 } }}
    >
      {/* Push pin mounting */}
      <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
        <PushPin color="red" />
      </div>

      {/* Retro Split-Flap Clock Case */}
      <div style={{
        width: 320,
        background: "linear-gradient(135deg, #1f1a14 0%, #0e0a05 100%)",
        border: "3px solid #3d2a06",
        borderRadius: 8,
        padding: "16px 14px 12px",
        boxShadow: "0 15px 45px rgba(0,0,0,0.9), inset 0 2px 3px rgba(255,200,100,0.06), inset 0 -2px 3px rgba(0,0,0,0.8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}>

        {/* Outer warm neon glow behind the clock */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: 8,
          boxShadow: "0 0 30px rgba(120,70,10,0.22)",
          pointerEvents: "none",
        }} />

        {/* Vintage Label on top */}
        <div style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: "0.58rem",
          color: "#8b0000",
          letterSpacing: "0.25em",
          marginBottom: 10,
          border: "1px solid rgba(139,0,0,0.3)",
          padding: "2px 10px",
          borderRadius: 2,
          background: "rgba(139,0,0,0.06)",
        }}>
          ▌ CASE TIMESTAMP ▐
        </div>

        {/* Flip Digits Row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "#080604",
          padding: "10px 12px",
          borderRadius: 6,
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.9)",
          border: "1px solid rgba(255,200,100,0.05)",
          marginBottom: 12,
        }}>
          {/* Hours */}
          <FlipDigit value={hrs[0]} />
          <FlipDigit value={hrs[1]} />

          {/* Colon */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "0 4px",
            animation: "blink 1s step-end infinite",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f4eee1", opacity: 0.8 }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f4eee1", opacity: 0.8 }} />
          </div>

          {/* Minutes */}
          <FlipDigit value={mins[0]} />
          <FlipDigit value={mins[1]} />

          {/* Colon */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: "0 4px",
            animation: "blink 1s step-end infinite",
          }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b0000", opacity: 0.6 }} />
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b0000", opacity: 0.6 }} />
          </div>

          {/* Seconds (Smaller, dynamic) */}
          <div style={{ display: "flex", gap: 3, transform: "scale(0.85)", transformOrigin: "center center" }}>
            <FlipDigit value={secs[0]} />
            <FlipDigit value={secs[1]} />
          </div>
        </div>

        {/* Paper date strip under clock face */}
        <div style={{
          width: "100%",
          background: "#ede8d8",
          borderRadius: 2,
          padding: "6px 10px",
          boxShadow: "2px 2px 6px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)",
          transform: "rotate(-0.5deg)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(26,18,8,0.18)",
        }}>
          {/* Red stamp marker */}
          <div style={{
            position: "absolute", top: 2, left: 6,
            width: 3, height: 3, borderRadius: "50%", background: "#8b0000"
          }} />
          <div style={{
            position: "absolute", top: 2, right: 6,
            width: 3, height: 3, borderRadius: "50%", background: "#8b0000"
          }} />

          {/* Date Label */}
          <div style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "0.62rem",
            color: "#1a1208",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textAlign: "center",
            lineHeight: 1.3,
          }}>
            {formattedDate}
          </div>
          <div style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "0.48rem",
            color: "#8b0000",
            letterSpacing: "0.02em",
            textAlign: "center",
            marginTop: 2,
          }}>
            {formattedTimezone}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
