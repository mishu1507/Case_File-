import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PushPin from "./PushPin";

export default function CognitivePillars() {
  const [tab, setTab] = useState("philosophy"); // philosophy, pillars, training

  const pillars = [
    {
      title: "Investigation-First Thinking",
      desc: "Before code, I parse root causes, map attack surfaces, and investigate problems like a forensic investigator.",
      practice: "In ForensicLens V2, designed log ingestion by automating manual SoC timeline workflows.",
    },
    {
      title: "Systems Over Silos",
      desc: "Understanding technology as interconnected systems (filesystem, scheduler, process manager) working as one.",
      practice: "MERNVerseOS simulates this relationship visually as a cohesive operational ecosystem.",
    },
    {
      title: "Defense-in-Depth Mindset",
      desc: "Security isn't a post-build layer - it is designed into trust boundaries and data flow from day one.",
      practice: "Quick Heal training maps incident response and threat mitigation directly into architecture.",
    },
    {
      title: "Build to Understand",
      desc: "Creating simulation environments is the best way to make abstract concepts tangible and interactive.",
      practice: "BrainSparkz uses gamification to train cognitive skills through active system interactions.",
    },
  ];

  const trainingPills = [
    "Incident Response",
    "Digital Forensics",
    "Network Defense",
    "VAPT",
    "SIEM Monitoring",
    "Cloud Security",
  ];

  return (
    <motion.div
      id="cognitive-pillars"
      className="absolute"
      style={{
        top: 960,
        right: 97,
        zIndex: 15,
        width: 320,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.45 }}
      whileHover={{ y: -4 }}
    >
      {/* Push Pin */}
      <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
        <PushPin color="red" />
      </div>

      {/* Case Journal Folder Cover */}
      <div style={{
        background: "linear-gradient(140deg, #7d5c1a 0%, #5c4010 100%)",
        borderRadius: "4px 8px 8px 4px",
        padding: "18px 4px 4px 4px", // space for tabs
        boxShadow: "6px 8px 24px rgba(0,0,0,0.7), 2px 2px 6px rgba(0,0,0,0.3)",
        transform: "rotate(-0.8deg)",
        position: "relative",
      }}>
        
        {/* Clickable Paper Index Tabs */}
        <div style={{
          position: "absolute",
          top: -15,
          left: 10,
          display: "flex",
          gap: 3,
          zIndex: 10,
        }}>
          {[
            { id: "philosophy", label: "Philosophy" },
            { id: "pillars", label: "4 Pillars" },
            { id: "training", label: "Academy" },
          ].map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  background: isActive ? "#ede8d8" : "#4e3508",
                  color: isActive ? "#1a1208" : "rgba(245,235,200,0.6)",
                  border: "1px solid rgba(26,18,8,0.18)",
                  borderBottom: "none",
                  borderRadius: "3px 3px 0 0",
                  padding: "3px 8px",
                  fontFamily: "'Special Elite', cursive",
                  fontSize: "0.58rem",
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 -2px 3px rgba(0,0,0,0.15)" : "none",
                  outline: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
              >
                {t.label.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Paper Inside */}
        <div className="paper-texture" style={{
          borderRadius: "2px 6px 6px 2px",
          padding: "12px 14px",
          minHeight: 236,
          maxHeight: 236,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflowY: "auto",
        }}>
          {/* Lined paper effect */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
            background: "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(26,18,8,0.01) 20px, rgba(26,18,8,0.01) 21px)",
          }} />
          
          {/* Left margin rule */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 20,
            borderLeft: "1px solid rgba(139,0,0,0.06)",
            pointerEvents: "none",
          }} />

          {/* TAB 1: Philosophy */}
          {tab === "philosophy" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ flexGrow: 1 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.85rem", color: "#1a1208", fontWeight: 700 }}>
                  LEARNING PHILOSOPHY
                </span>
                <span className="stamp stamp-red" style={{ fontSize: "0.45rem", transform: "rotate(4deg)", padding: "1px 4px", border: "1.5px solid #8b0000" }}>
                  METHODOLOGY
                </span>
              </div>

              <div style={{
                fontFamily: "'Courier Prime', monospace",
                fontSize: "0.65rem",
                color: "#1a1208",
                lineHeight: 1.35,
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}>
                <p>
                  I believe cybersecurity is fundamentally about understanding{" "}
                  <strong style={{ color: "#8b0000" }}>how systems work</strong>,
                  not just how they break.
                </p>
                <p>
                  Combining investigation rigor with creative engineering allows me to translate complex operational systems into interactive, visual experiences.
                </p>
                <p style={{ fontStyle: "italic", borderLeft: "2px solid rgba(139,0,0,0.3)", paddingLeft: 6, color: "#555" }}>
                  "How does this system actually work?"
                </p>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Pillars */}
          {tab === "pillars" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ flexGrow: 1 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.85rem", color: "#1a1208", fontWeight: 700 }}>
                  THINKING PILLARS
                </span>
                <span className="stamp stamp-red" style={{ fontSize: "0.45rem", transform: "rotate(-2deg)", padding: "1px 4px", border: "1.5px solid #8b0000" }}>
                  FORENSIC COGNITION
                </span>
              </div>

              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                maxHeight: 175,
                overflowY: "auto",
                paddingRight: 2,
              }}>
                {pillars.map((p, idx) => (
                  <div key={idx} style={{ borderLeft: "2px solid #8b0000", paddingLeft: 6, marginBottom: 2 }}>
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.62rem", fontWeight: 700, color: "#8b0000", textTransform: "uppercase" }}>
                      ▸ {p.title}
                    </div>
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.55rem", color: "#1a1208", lineHeight: 1.25 }}>
                      {p.desc}
                    </div>
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.48rem", color: "#5a4830", marginTop: 1, fontStyle: "italic" }}>
                      In Practice: {p.practice}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: Training */}
          {tab === "training" && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ flexGrow: 1 }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.85rem", color: "#1a1208", fontWeight: 700 }}>
                  QUICK HEAL ACADEMY
                </span>
                <span className="stamp stamp-red" style={{ fontSize: "0.45rem", transform: "rotate(3deg)", padding: "1px 4px", border: "1.5px solid #8b0000" }}>
                  VERIFIED TRNG
                </span>
              </div>

              <div style={{ fontFamily: "'Courier Prime', monospace", color: "#1a1208" }}>
                <div style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                  Parul University Embedded Cybersecurity Program
                </div>
                <div style={{ fontSize: "0.52rem", color: "#8b0000", marginBottom: 8 }}>
                  METHODOLOGY // SIEM, FORENSICS & VAPT
                </div>

                {/* Stamped Evidence Tag Pills */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 4,
                  marginTop: 6,
                }}>
                  {trainingPills.map((pill) => (
                    <span
                      key={pill}
                      style={{
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: "0.5rem",
                        fontWeight: 700,
                        backgroundColor: "#1b5d1b", // realistic green stamp pill background
                        color: "#ffffff",
                        border: "1px solid #083008",
                        borderRadius: 2,
                        padding: "1px 5px",
                        letterSpacing: "0.02em",
                        boxShadow: "1px 1px 2px rgba(0,0,0,0.15)",
                      }}
                    >
                      {pill.toUpperCase()}
                    </span>
                  ))}
                  <span
                    style={{
                      fontFamily: "'Courier Prime', monospace",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      backgroundColor: "#8b0000",
                      color: "#ffffff",
                      border: "1px solid #3a0000",
                      borderRadius: 2,
                      padding: "1px 5px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    VERIFIED SYSTEM
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Footer Journal Tag */}
          <div style={{
            borderTop: "1px dashed rgba(26,18,8,0.18)",
            paddingTop: 4,
            marginTop: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.45rem",
            fontFamily: "'Special Elite', cursive",
            color: "rgba(26,18,8,0.4)",
          }}>
            <span>SYSTEM LOG v1.5 // PU-QHA-2026</span>
            <span style={{ fontWeight: 700, color: "#8b0000" }}>ACTIVE CASE FILE</span>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
