import { motion } from "framer-motion";
import PushPin from "./PushPin";

// ── Steaming Coffee Mug Prop ──────────────────────────────────────────────────
function CoffeeMug() {
  // 3 steam trails with staggered delays
  const steamTrails = [0, 1, 2];

  return (
    <div style={{ position: "relative", width: 80, height: 90 }}>
      {/* Steam rising effect using Framer Motion loop */}
      <div style={{
        position: "absolute",
        top: -30,
        left: 20,
        width: 30,
        height: 35,
        display: "flex",
        justifyContent: "space-between",
        pointerEvents: "none",
        zIndex: 5,
      }}>
        {steamTrails.map((i) => (
          <motion.div
            key={i}
            initial={{ y: 5, opacity: 0, scale: 0.8 }}
            animate={{
              y: [-12, -45],
              opacity: [0, 0.7, 0.4, 0],
              scale: [0.8, 1.2, 1.5, 1.1],
              skewX: [0, i % 2 === 0 ? 12 : -12, 0],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.7,
            }}
            style={{
              width: 3,
              height: 25,
              background: "linear-gradient(to top, rgba(245,235,200,0.5), rgba(245,235,200,0.05))",
              borderRadius: "50%",
              filter: "blur(1.5px)",
            }}
          />
        ))}
      </div>

      {/* Mug Body container */}
      <motion.div
        whileHover={{ y: -3, rotate: 1 }}
        style={{
          width: 54,
          height: 48,
          background: "linear-gradient(135deg, #7c2d12 0%, #451a03 100%)", // warm coffee-red brown
          border: "2px solid #290f02",
          borderRadius: "0 0 16px 16px",
          position: "absolute",
          bottom: 12,
          left: 10,
          boxShadow: "3px 4px 10px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.08)",
          zIndex: 8,
        }}
      >
        {/* Mug Handle */}
        <div style={{
          position: "absolute",
          top: 8,
          left: -14,
          width: 16,
          height: 24,
          border: "2px solid #290f02",
          borderRadius: "10px 0 0 10px",
          background: "#5a200c",
          zIndex: -1,
        }} />

        {/* Mug Rim / Lip */}
        <div style={{
          position: "absolute",
          top: -3,
          left: -2,
          width: 54,
          height: 6,
          background: "#5a200c",
          border: "2px solid #290f02",
          borderRadius: "50%",
        }} />

        {/* Coffee level inside */}
        <div style={{
          position: "absolute",
          top: -1,
          left: 2,
          width: 46,
          height: 3,
          background: "#1c0d02",
          borderRadius: "50%",
        }} />

        {/* SECURE/SOC Stamped label */}
        <div style={{
          fontFamily: "'Courier Prime', monospace",
          fontSize: "0.45rem",
          fontWeight: 700,
          color: "#e8c442",
          letterSpacing: "0.08em",
          textAlign: "center",
          marginTop: 18,
          opacity: 0.7,
        }}>
          DECRYPT
        </div>
      </motion.div>

      {/* Coaster under mug */}
      <div style={{
        position: "absolute",
        bottom: 8,
        left: 2,
        width: 70,
        height: 6,
        background: "#4a3b2c",
        borderRadius: "50%",
        border: "1px solid #32251a",
        boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
        zIndex: 2,
      }} />
    </div>
  );
}

// ── Main ForensicProps Wrapper Component ─────────────────────────────────────
export default function ForensicProps() {
  return (
    <>
      {/* Steaming Coffee Mug - resting next to the clock */}
      <div className="absolute" style={{ top: 140, left: "calc(50% + 97px)", zIndex: 15 }}>
        <CoffeeMug />
      </div>
    </>
  );
}
