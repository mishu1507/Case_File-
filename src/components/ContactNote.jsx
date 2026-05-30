import { motion } from "framer-motion";
import PushPin from "./PushPin";

// ContactNote — torn paper contact note bottom left
export default function ContactNote({ noteRef }) {
  return (
    <motion.div
      ref={noteRef}
      id="contact-note"
      className="absolute"
      style={{ top: 1280, right: 162, zIndex: 10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      whileHover={{ y: -5, rotate: -1, transition: { duration: 0.2 } }}
    >
      {/* Push pin */}
      <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
        <PushPin color="red" />
      </div>

      {/* Torn paper body */}
      <div
        className="torn-top"
        style={{
          width: 250, // Increased width from 190 to 250 for optimal spacing
          background: "#fef9e7",
          transform: "rotate(-1.5deg)",
          boxShadow: "3px 4px 12px rgba(0,0,0,0.5), 1px 1px 4px rgba(0,0,0,0.3)",
          padding: "18px 16px 16px",
          position: "relative",
        }}
      >
        {/* Lined paper (highly faded for readability) */}
        <div
          style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "repeating-linear-gradient(0deg, transparent, transparent 22px, rgba(26,18,8,0.01) 22px, rgba(26,18,8,0.01) 23px)",
          }}
        />
        {/* Red margin line */}
        <div
          style={{
            position: "absolute", top: 0, bottom: 0, left: 24,
            borderLeft: "1px solid rgba(139,0,0,0.06)",
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div
          style={{
            fontFamily: "'Special Elite', cursive",
            fontSize: "0.7rem",
            color: "#8b0000",
            letterSpacing: "0.15em",
            marginBottom: 8,
          }}
        >
          CONTACT / REACH OUT
        </div>

        {/* Main message */}
        <div
          style={{
            fontFamily: "'Permanent Marker', cursive",
            fontSize: "1.3rem",
            color: "#1a1208",
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          Leave a<br />message.
        </div>

        {/* Separator */}
        <div style={{ borderBottom: "1px dashed rgba(26,18,8,0.2)", marginBottom: 10 }} />

        {/* GitHub */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
          <span style={{ fontSize: "0.9rem" }}>🐙</span>
          <a
            href="https://github.com/mishu1507"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "0.78rem",
              color: "#2244cc",
              textDecoration: "underline",
            }}
          >
            github.com/mishu1507
          </a>
        </div>

        {/* Credly */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
          <span style={{ fontSize: "0.9rem" }}>🏅</span>
          <a
            href="https://www.credly.com/users/aditi-borkar.0783ec0b/badges"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "0.75rem",
              color: "#2244cc",
              textDecoration: "underline",
              wordBreak: "break-all",
            }}
          >
            credly.com/aditi-borkar
          </a>
        </div>

        {/* Email */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: "0.9rem" }}>✉️</span>
          <span
            style={{
              fontFamily: "'Courier Prime', monospace",
              fontSize: "0.78rem",
              color: "#1a1208",
            }}
          >
            aditi.borkar1507@gmail.com
          </span>
        </div>

        {/* Tape effect top */}
        <div
          style={{
            position: "absolute",
            top: -8,
            right: 20,
            width: 40,
            height: 16,
            background: "rgba(232,196,66,0.35)",
            transform: "rotate(3deg)",
            borderRadius: 1,
          }}
        />
      </div>
    </motion.div>
  );
}
