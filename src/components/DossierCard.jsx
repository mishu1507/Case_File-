import { motion } from "framer-motion";
import PushPin from "./PushPin";

export default function DossierCard({ cardRef }) {
  return (
    <motion.div
      ref={cardRef}
      id="dossier-card"
      className="absolute"
      style={{ top: 80, left: 250, zIndex: 10 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      {/* Push pin */}
      <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
        <PushPin color="yellow" />
      </div>

      {/* Dark manila outer folder */}
      <div style={{
        width: 180,
        background: "linear-gradient(140deg, #7d5c1a 0%, #5c4010 100%)",
        borderRadius: "4px 8px 8px 4px",
        padding: 4,
        boxShadow: "6px 8px 26px rgba(0,0,0,0.8), 2px 2px 8px rgba(0,0,0,0.4)",
        transform: "rotate(1.2deg)",
        position: "relative",
      }}>
        {/* Folder tab */}
        <div style={{
          position: "absolute", top: -18, right: 12,
          background: "#4e3508",
          borderRadius: "4px 4px 0 0",
          padding: "2px 10px",
          fontFamily: "'Special Elite', cursive",
          fontSize: "0.65rem", letterSpacing: "0.08em",
          color: "rgba(245,235,200,0.8)",
          textTransform: "uppercase",
          boxShadow: "0 -1px 3px rgba(0,0,0,0.5)",
        }}>
          DOSSIER
        </div>

        {/* Paper inside */}
        <div className="paper-texture" style={{
          borderRadius: "2px 6px 6px 2px",
          padding: "10px 10px",
          minHeight: 160,
          position: "relative",
        }}>
          {/* Paper lines (highly faded for legibility) */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit",
            background: "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(26,18,8,0.01) 22px, rgba(26,18,8,0.01) 23px)",
          }} />
          {/* Left margin rule */}
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 20,
            borderLeft: "1px solid rgba(139,0,0,0.06)",
            pointerEvents: "none",
          }} />

          {/* Stamp */}
          <div style={{ textAlign: "center", marginBottom: 4 }}>
            <div className="stamp stamp-red" style={{ fontSize: "0.62rem", display: "inline-block" }}>
              SUBJECT PROFILE
            </div>
          </div>

          {/* Name */}
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "1.12rem", color: "#1a1208", fontWeight: 700, marginBottom: 1, lineHeight: 1.1 }}>
            ADITI BORKAR
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.58rem", color: "#8b0000", letterSpacing: "0.06em", marginBottom: 5, lineHeight: 1.25 }}>
            CYBERSECURITY SYSTEMS ENGINEER &amp; STUDENT
          </div>

          {/* Bio */}
          <div style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "0.68rem",
            color: "#1a1208",
            lineHeight: 1.25,
            borderLeft: "2px solid rgba(139,0,0,0.3)",
            paddingLeft: 6,
            marginBottom: 6,
          }}>
            Cybersecurity builder focused on forensics, threat intelligence, and autonomous AI systems. Thinks in systems.
          </div>

          {/* Case notes */}
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.65rem", color: "#8b0000", letterSpacing: "0.1em", marginBottom: 3 }}>
            CASE NOTES
          </div>
          {[
            "Hackathon builder — SunHacks 2026",
            "40+ verified certifications",
            "Open-source contributor",
          ].map((note) => (
            <div key={note} style={{
              fontFamily: "'Permanent Marker', cursive",
              fontSize: "0.68rem",
              color: "#1a1208",
              marginBottom: 1,
              paddingLeft: 2,
              lineHeight: 1.2,
            }}>
              ✓ {note}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
