import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PushPin from "./PushPin";

export default function DigitalLock() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("LOCKED"); // LOCKED, GRANTED, DENIED
  const [attempts, setAttempts] = useState(0);

  const correctCodes = ["1507", "2026"];

  const handleKeyPress = (num) => {
    if (status === "GRANTED") return;
    if (code.length < 4) {
      setCode((prev) => prev + num);
      setStatus("LOCKED");
    }
  };

  const handleClear = () => {
    if (status === "GRANTED") return;
    setCode("");
    setStatus("LOCKED");
  };

  const handleEnter = () => {
    if (status === "GRANTED") return;
    if (correctCodes.includes(code)) {
      setStatus("GRANTED");
      setAttempts(0);
    } else {
      setStatus("DENIED");
      setAttempts((a) => a + 1);
      setTimeout(() => {
        setCode("");
        setStatus("LOCKED");
      }, 1000);
    }
  };

  return (
    <motion.div
      id="digital-lock"
      className="absolute"
      style={{
        top: 1260,
        left: 1320,
        zIndex: 15,
        width: 256,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.5 }}
      whileHover={{ y: -2 }}
    >
      {/* Pinned mounting */}
      <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
        <PushPin color="blue" />
      </div>

      {/* Cybernetic Secure Keypad Panel */}
      <div style={{
        background: "linear-gradient(135deg, #1b1613 0%, #0d0a08 100%)",
        border: "2px solid #5a4830",
        borderRadius: 6,
        padding: "12px 10px 8px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        
        {/* Label strip */}
        <div style={{
          fontFamily: "'Special Elite', cursive",
          fontSize: "0.52rem",
          color: "rgba(245,235,200,0.45)",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}>
          ▌ SECURITY KEYPAD ▐
        </div>

        {/* LCD Screen Display */}
        <div style={{
          width: "100%",
          background: "#080b06",
          border: "1px solid #2f3d24",
          borderRadius: 4,
          padding: "6px 8px",
          marginBottom: 10,
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.9)",
          fontFamily: "'Courier Prime', monospace",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* LED Glow overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: status === "GRANTED" 
              ? "radial-gradient(circle, rgba(0,255,0,0.08) 0%, transparent 100%)"
              : status === "DENIED"
                ? "radial-gradient(circle, rgba(255,0,0,0.08) 0%, transparent 100%)"
                : "radial-gradient(circle, rgba(0,180,255,0.04) 0%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* Screen content */}
          <div style={{
            fontSize: "0.58rem",
            color: status === "GRANTED" ? "#44ff44" : status === "DENIED" ? "#ff4444" : "#44ccff",
            letterSpacing: "0.08em",
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: 2,
          }}>
            {status === "GRANTED" ? "● ACCESS GRANTED" : status === "DENIED" ? "▲ ACCESS DENIED" : "● SECURE LOCK"}
          </div>

          <div style={{
            fontSize: "1.05rem",
            color: status === "GRANTED" ? "#44ff44" : status === "DENIED" ? "#ff4444" : "#f5f0e0",
            letterSpacing: "0.15em",
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "monospace",
          }}>
            {status === "GRANTED" ? "OPEN" : code.padEnd(4, "-")}
          </div>

          <div style={{
            fontSize: "0.45rem",
            color: "rgba(245,235,200,0.35)",
            letterSpacing: "0.05em",
            marginTop: 2,
          }}>
            {status === "GRANTED" 
              ? "DECRYPT: CASE CYB-2026 ACTIVE" 
              : `ENTER 4-DIGIT CASE KEY [${attempts} ERR]`}
          </div>
        </div>

        {/* Buttons Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 5,
          width: "100%",
          marginBottom: 6,
        }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <motion.button
              key={num}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleKeyPress(num)}
              style={{
                background: "linear-gradient(180deg, #2b231d 0%, #1e1814 100%)",
                border: "1px solid #4a3c2a",
                borderRadius: 3,
                color: "#e8d4a0",
                fontFamily: "'Special Elite', cursive",
                fontSize: "0.78rem",
                padding: "6px 0",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
                outline: "none",
              }}
            >
              {num}
            </motion.button>
          ))}
          
          {/* Clear button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleClear}
            style={{
              background: "linear-gradient(180deg, #441a1a 0%, #2f1212 100%)",
              border: "1px solid #6b2222",
              borderRadius: 3,
              color: "#ff8888",
              fontFamily: "'Courier Prime', monospace",
              fontSize: "0.55rem",
              fontWeight: 700,
              padding: "6px 0",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              outline: "none",
            }}
          >
            CLR
          </motion.button>

          {/* 0 button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => handleKeyPress(0)}
            style={{
              background: "linear-gradient(180deg, #2b231d 0%, #1e1814 100%)",
              border: "1px solid #4a3c2a",
              borderRadius: 3,
              color: "#e8d4a0",
              fontFamily: "'Special Elite', cursive",
              fontSize: "0.78rem",
              padding: "6px 0",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              outline: "none",
            }}
          >
            0
          </motion.button>

          {/* Enter button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleEnter}
            style={{
              background: "linear-gradient(180deg, #1b3d1b 0%, #112711 100%)",
              border: "1px solid #2b5c2b",
              borderRadius: 3,
              color: "#88ff88",
              fontFamily: "'Courier Prime', monospace",
              fontSize: "0.55rem",
              fontWeight: 700,
              padding: "6px 0",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              outline: "none",
            }}
          >
            ENT
          </motion.button>
        </div>

        {/* Decrypted Payload Easter Egg Container */}
        <AnimatePresence>
          {status === "GRANTED" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                width: "100%",
                background: "rgba(68,255,68,0.06)",
                border: "1px dashed #2b5c2b",
                borderRadius: 3,
                padding: 6,
                marginTop: 6,
                fontFamily: "'Courier Prime', monospace",
                fontSize: "0.5rem",
                color: "#88ff88",
                lineHeight: 1.3,
                textAlign: "left",
              }}
            >
              🔓 **INTELLIGENCE LOG UNLOCKED**<br />
              ▸ SUBJECT ADITI BORKAR STATUS: ACTIVE<br />
              ▸ CLASSIFIED: Thinks in systems architecture.<br />
              ▸ VERDICT: Excellent systems capability. Key found.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
