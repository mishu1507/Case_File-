import { motion } from "framer-motion";
import PushPin from "./PushPin";

// ── Social link button (compact version for smaller profile card) ─────────────────
function SocialLink({ href, icon, label, colour = "#2244cc" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ scale: 1.04, x: 2 }}
        transition={{ duration: 0.12 }}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "4px 8px",
          borderBottom: "1px solid rgba(26,18,8,0.1)",
          cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>{icon}</span>
        <div>
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.58rem", color: "#8b0000", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 0 }}>
            {label}
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.65rem", color: colour, textDecoration: "underline", wordBreak: "break-all" }}>
            {href}
          </div>
        </div>
      </motion.div>
    </a>
  );
}

// ── ProfileCard ─────────────────────────────────────────────────────────────
export default function ProfileCard({ cardRef }) {
  return (
    <motion.div
      ref={cardRef}
      id="profile-card"
      className="absolute"
      style={{ top: 80, left: 40, zIndex: 10 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
    >
      {/* Push pin */}
      <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
        <PushPin color="red" />
      </div>

      {/* ID Card */}
      <div style={{
        width: 200,
        background: "linear-gradient(160deg, #1a1208 0%, #0f0b06 100%)",
        borderRadius: 6,
        border: "2px solid #3d2a06",
        boxShadow: "6px 8px 28px rgba(0,0,0,0.85), 0 0 0 1px rgba(80,50,10,0.3), inset 0 1px 0 rgba(255,200,80,0.06)",
        overflow: "hidden",
        transform: "rotate(-1.5deg)",
      }}>
        {/* Red header bar */}
        <div style={{
          background: "linear-gradient(90deg, #6b0000 0%, #8b0000 50%, #6b0000 100%)",
          padding: "6px 10px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.6rem", color: "rgba(255,220,180,0.9)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            CASE FILE / DOSSIER
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.55rem", color: "rgba(255,200,150,0.6)", letterSpacing: "0.08em" }}>
            ID #2026-AB
          </div>
        </div>

        {/* Photo + name row */}
        <div style={{ display: "flex", gap: 10, padding: "10px 10px 8px" }}>
          {/* Photo placeholder */}
          <div style={{
            width: 44, height: 44, flexShrink: 0,
            background: "linear-gradient(135deg, #2a1c04 0%, #1a1208 100%)",
            border: "2px solid #3d2a06",
            borderRadius: 3,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(200,160,80,0.4)",
            fontSize: "1.2rem",
          }}>
            🔍
          </div>
          <div>
            <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "1.05rem", color: "#e8d4a0", fontWeight: 700, lineHeight: 1.15, marginBottom: 2 }}>
              ADITI<br />BORKAR
            </div>
            <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.6rem", color: "#8b0000", letterSpacing: "0.08em" }}>
              ALIAS: mishu1507
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #3d2a06, transparent)", margin: "0 10px" }} />

        {/* Fields */}
        <div style={{ padding: "8px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            { label: "CLASSIFICATION", value: "Cybersecurity Systems Engineer" },
            { label: "STATUS", value: "● Active Threat Researcher" },
            { label: "CLEARANCE", value: "TOP SECRET" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.58rem", color: "#8b0000", letterSpacing: "0.12em", marginBottom: 1 }}>
                {label}
              </div>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.78rem", color: "#c8a060", lineHeight: 1.25 }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #3d2a06, transparent)", margin: "0 10px" }} />

        {/* Social links */}
        <div style={{ padding: "6px 2px 8px" }}>
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.58rem", color: "rgba(200,160,80,0.4)", letterSpacing: "0.15em", textAlign: "center", marginBottom: 4, textTransform: "uppercase" }}>
            — CONTACT CHANNELS —
          </div>
          <SocialLink
            href="https://github.com/mishu1507"
            icon="🐙"
            label="GitHub"
            colour="#6e9fff"
          />
          <SocialLink
            href="https://www.credly.com/users/aditi-borkar.0783ec0b/badges"
            icon="🏅"
            label="Credly Badges"
            colour="#f0a500"
          />
          <SocialLink
            href="https://linkedin.com/in/aditi-borkar"
            icon="💼"
            label="LinkedIn"
            colour="#5a9fd4"
          />
        </div>

        {/* Barcode bottom */}
        <div style={{
          padding: "6px 10px",
          background: "rgba(0,0,0,0.3)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{ display: "flex", gap: 1 }}>
            {Array.from({ length: 22 }).map((_, i) => (
              <div key={i} style={{ width: i % 3 === 0 ? 2 : 1, height: 12, background: `rgba(200,160,80,${0.25 + (i % 5) * 0.08})` }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.35rem", color: "rgba(200,160,80,0.3)", letterSpacing: "0.05em" }}>
            CYB-2026-BORKAR
          </div>
        </div>
      </div>
    </motion.div>
  );
}
