import { motion } from "framer-motion";
import PushPin from "./PushPin";
import { skills } from "../data/skills";

// EvidenceBoard — 2×2 grid of index cards on the right side of the board.
// Each card is fully visible with slight rotation for the physical look.
// Cards do NOT overlap — they sit in a clean 2-column grid with breathing room.

const CARD_W   = 185;   // card width
const CARD_GAP = 24;    // gap between columns and rows (extra so rotations don't clip)
const COLS     = 2;

export default function EvidenceBoard() {
  return (
    <div
      id="evidence-board"
      style={{
        position: "absolute",
        top: 80,
        right: 60,
        zIndex: 10,
        width: COLS * CARD_W + (COLS - 1) * CARD_GAP,
      }}
    >
      {/* 2-column grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${COLS}, ${CARD_W}px)`,
        gap: `${CARD_GAP}px`,
      }}>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.id}
            id={`skill-${skill.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
            whileHover={{ y: -6, scale: 1.03, zIndex: 50, transition: { duration: 0.18 } }}
            style={{ position: "relative" }}
          >
            {/* Push pin — centred at top */}
            <div style={{
              position: "absolute",
              top: -7,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 20,
            }}>
              <PushPin color={skill.pinColor} />
            </div>

            {/* Index card */}
            <div style={{
              width: CARD_W,
              background: "#fef9e7",
              border: "1px solid rgba(26,18,8,0.14)",
              borderRadius: 2,
              padding: "16px 13px 14px",
              transform: `rotate(${skill.rotation}deg)`,
              boxShadow: "3px 4px 14px rgba(0,0,0,0.45), 1px 1px 4px rgba(0,0,0,0.2)",
              position: "relative",
            }}>

              {/* Lined paper texture (highly faded for readability) */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none", borderRadius: 2,
                background: "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(26,18,8,0.01) 19px, rgba(26,18,8,0.01) 20px)",
              }} />

              {/* Red margin line */}
              <div style={{
                position: "absolute", top: 0, bottom: 0, left: 24,
                borderLeft: "1px solid rgba(139,0,0,0.06)",
                pointerEvents: "none",
              }} />

              {/* Category heading */}
              <div style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: "0.85rem",
                color: "#8b0000",
                letterSpacing: "0.14em",
                marginBottom: 9,
                paddingLeft: 6,
                textTransform: "uppercase",
              }}>
                ▌ {skill.category}
              </div>

              {/* Items */}
              <ul style={{ paddingLeft: 6, margin: 0 }}>
                {skill.items.map((item) => (
                  <li key={item} style={{
                    fontFamily: "'Permanent Marker', cursive",
                    fontSize: "0.9rem",
                    color: "#1a1208",
                    marginBottom: 4,
                    paddingLeft: 6,
                    lineHeight: 1.35,
                    listStyle: "none",
                  }}>
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
