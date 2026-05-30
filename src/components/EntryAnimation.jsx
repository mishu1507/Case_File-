import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// EntryAnimation — full-screen classified intro sequence
// Props: onComplete — called when animation finishes or skip is clicked

const TYPEWRITER_TEXT = "CASE FILE: ADITI BORKAR — CLEARANCE GRANTED";

export default function EntryAnimation({ onComplete }) {
  const [phase, setPhase] = useState("dark"); // dark → flicker → stamp → type → exit
  const [typedText, setTypedText] = useState("");
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip after 500ms
    const skipTimer = setTimeout(() => setShowSkip(true), 500);

    // Phase sequence
    const t1 = setTimeout(() => setPhase("flicker"), 600);
    const t2 = setTimeout(() => setPhase("stamp"), 1400);
    const t3 = setTimeout(() => setPhase("type"), 2600);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (phase !== "type") return;
    let i = 0;
    setTypedText("");
    const interval = setInterval(() => {
      setTypedText(TYPEWRITER_TEXT.slice(0, i + 1));
      i++;
      if (i >= TYPEWRITER_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("exit"), 1200);
      }
    }, 45);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === "exit") {
      setTimeout(() => onComplete(), 700);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="entry"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Scanlines overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />

          {/* Flickering room light */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(139,100,20,0.15) 0%, transparent 70%)",
              zIndex: 1,
            }}
            animate={phase === "flicker" || phase === "stamp" || phase === "type"
              ? { opacity: [0, 0.8, 0, 1, 0.6, 1] }
              : { opacity: 0 }
            }
            transition={{ duration: 0.8, times: [0, 0.1, 0.12, 0.2, 0.5, 1] }}
          />

          {/* Center content */}
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>
            {/* Classified stamp */}
            <AnimatePresence>
              {(phase === "stamp" || phase === "type") && (
                <motion.div
                  key="stamp"
                  initial={{ scale: 3, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.5 }}
                  style={{
                    display: "inline-block",
                    border: "5px solid #8b0000",
                    borderRadius: 4,
                    padding: "10px 28px",
                    fontFamily: "'Special Elite', cursive",
                    fontSize: "2.5rem",
                    color: "#8b0000",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 32,
                    position: "relative",
                    textShadow: "0 0 20px rgba(139,0,0,0.5)",
                    boxShadow: "0 0 30px rgba(139,0,0,0.3)",
                  }}
                >
                  CLASSIFIED
                </motion.div>
              )}
            </AnimatePresence>

            {/* Typewriter text */}
            <AnimatePresence>
              {phase === "type" && (
                <motion.div
                  key="typewriter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: "'Courier Prime', monospace",
                    fontSize: "0.95rem",
                    color: "#a07d20",
                    letterSpacing: "0.08em",
                    minHeight: 24,
                    marginTop: 8,
                  }}
                >
                  {typedText}
                  <span className="cursor-blink" style={{ color: "#cc2200" }}>█</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Access granted glow */}
            {phase === "type" && typedText.length === TYPEWRITER_TEXT.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: "0.7rem",
                  color: "#4a8b00",
                  letterSpacing: "0.2em",
                  marginTop: 14,
                  textShadow: "0 0 10px rgba(74,139,0,0.6)",
                }}
              >
                ► ACCESS GRANTED — INITIALIZING BOARD...
              </motion.div>
            )}
          </div>

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                onClick={() => {
                  setPhase("exit");
                }}
                style={{
                  position: "absolute",
                  top: 20,
                  right: 24,
                  background: "transparent",
                  border: "1px solid rgba(139,100,20,0.4)",
                  color: "#8B6914",
                  padding: "4px 12px",
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  borderRadius: 2,
                }}
              >
                SKIP ›
              </motion.button>
            )}
          </AnimatePresence>

          {/* Bottom case number */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: 24,
              fontFamily: "'Courier Prime', monospace",
              fontSize: "0.5rem",
              color: "rgba(139,100,20,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            CASE: CYB-2026-BORKAR // CLEARANCE LVL: ALPHA // DO NOT DISTRIBUTE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
