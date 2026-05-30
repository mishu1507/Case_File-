import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PushPin from "./PushPin";

// ── Folder colour tokens ────────────────────────────────────────────────────
const FOLDER_BACK  = "#6b4e15";
const FOLDER_COVER = "linear-gradient(140deg, #7d5c1a 0%, #6b4e15 55%, #5c4010 100%)";
const FOLDER_TAB   = "#5a3e0e";
const FOLDER_NOTCH = "#4e3508";

const STATUS_STYLE = {
  ACTIVE:  { border: "#8b0000", text: "#8b0000" },
  CLOSED:  { border: "#3a3a3a", text: "#3a3a3a" },
  CONCEPT: { border: "#2244cc", text: "#2244cc" },
};

// ── Tech tag pill ────────────────────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span style={{
      fontFamily: "'Courier Prime', monospace",
      fontSize: "0.72rem",
      padding: "3px 10px",
      background: "rgba(26,18,8,0.1)",
      border: "1px solid rgba(26,18,8,0.28)",
      borderRadius: 2,
      color: "#1a1208",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      display: "inline-block",
    }}>
      {label}
    </span>
  );
}

// ── Link card ────────────────────────────────────────────────────────────────
function LinkCard({ href, icon, label, url, colour }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div
        style={{
          display: "flex", alignItems: "center", gap: 12,
          background: "rgba(26,18,8,0.07)",
          border: "1px solid rgba(26,18,8,0.22)",
          borderRadius: 4,
          padding: "11px 16px",
          cursor: "pointer",
          transition: "background 0.15s, transform 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(26,18,8,0.15)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(26,18,8,0.07)"; e.currentTarget.style.transform = "none"; }}
      >
        <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{icon}</span>
        <div>
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.52rem", color: "#8b0000", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 3 }}>
            {label}
          </div>
          <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.78rem", color: colour, textDecoration: "underline", wordBreak: "break-all", lineHeight: 1.3 }}>
            {url}
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export default function ManilaFolder({ project, isOpen, onOpen, style = {} }) {
  const toggle = useCallback(() => onOpen(isOpen ? null : project.id), [isOpen, onOpen, project.id]);
  const sc = STATUS_STYLE[project.status] || STATUS_STYLE.CLOSED;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          THE PHYSICAL FOLDER sitting on the cork board
      ═══════════════════════════════════════════════════════ */}
      <motion.div
        id={`folder-${project.id}`}
        className="absolute"
        style={{ ...style, zIndex: isOpen ? 60 : 10, cursor: "pointer" }}
        initial={{ opacity: 0, scale: 0.86 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.32, delay: 0.06 }}
        whileHover={!isOpen ? { y: -8, transition: { duration: 0.16 } } : {}}
        onClick={toggle}
      >
        <div style={{ position: "relative" }}>
          {/* Push pin */}
          <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
            <PushPin color={project.pinColor} />
          </div>

          {/* Tab */}
          <div style={{
            position: "absolute", top: -22, left: 12,
            background: FOLDER_TAB,
            borderRadius: "5px 5px 0 0",
            padding: "4px 16px",
            fontFamily: "'Special Elite', cursive",
            fontSize: "0.8rem",
            letterSpacing: "0.08em",
            color: "rgba(245,235,200,0.85)",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            maxWidth: 160,
            overflow: "hidden",
            textOverflow: "ellipsis",
            boxShadow: "0 -2px 4px rgba(0,0,0,0.4)",
          }}>
            {project.name}
          </div>

          {/* 3-D perspective wrapper */}
          <div style={{ perspective: "1200px", transformStyle: "preserve-3d", width: 240 }}>

            {/* Back panel */}
            <div style={{
              width: 240, minHeight: 290,
              background: FOLDER_BACK,
              borderRadius: "2px 8px 8px 2px",
              boxShadow: "6px 7px 22px rgba(0,0,0,0.7), 2px 2px 6px rgba(0,0,0,0.4)",
              position: "relative",
              transform: `rotate(${project.rotation}deg)`,
            }}>

              {/* Front face info (visible when closed) — project preview */}
              {!isOpen && (
                <div style={{ position: "absolute", inset: 0, padding: "18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", zIndex: 1 }}>
                  {/* Classification badge */}
                  <div style={{
                    alignSelf: "flex-start",
                    fontFamily: "'Special Elite', cursive",
                    fontSize: "0.58rem",
                    color: "rgba(245,235,200,0.82)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(245,235,200,0.45)",
                    padding: "2px 7px",
                    borderRadius: 2,
                  }}>
                    {project.classification}
                  </div>

                  {/* Project name on face */}
                  <div>
                    <div style={{
                      fontFamily: "'Special Elite', cursive",
                      fontSize: "1.2rem",
                      color: "rgba(245,235,200,0.95)",
                      lineHeight: 1.25,
                      marginBottom: 7,
                      textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                    }}>
                      {project.name}
                    </div>
                    {/* First 3 tech tags */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} style={{
                          fontFamily: "'Courier Prime', monospace",
                          fontSize: "0.58rem",
                          color: "rgba(245,235,200,0.82)",
                          background: "rgba(0,0,0,0.25)",
                          border: "1px solid rgba(245,235,200,0.35)",
                          padding: "2px 6px",
                          borderRadius: 2,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.58rem", color: "rgba(245,235,200,0.4)", letterSpacing: "0.1em" }}>
                      {project.caseNo}
                    </div>
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.58rem", color: "rgba(245,235,200,0.38)" }}>
                      ▸ click to open
                    </div>
                  </div>
                </div>
              )}

              {/* Cover flap — flips open */}
              <motion.div
                animate={isOpen ? { rotateY: -162 } : { rotateY: 0 }}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: "absolute", inset: 0,
                  background: FOLDER_COVER,
                  borderRadius: "2px 8px 8px 2px",
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  boxShadow: "inset -4px 0 12px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", background: "repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(0,0,0,0.04) 28px, transparent 29px)" }} />
                <div style={{ position: "absolute", top: 14, right: -2, width: 10, height: 44, background: FOLDER_NOTCH, borderRadius: "0 5px 5px 0", boxShadow: "2px 0 4px rgba(0,0,0,0.4)" }} />
                <div style={{ position: "absolute", top: 0, left: 0, width: 30, height: 30, pointerEvents: "none", background: "radial-gradient(ellipse at 0% 0%, rgba(0,0,0,0.28) 0%, transparent 70%)", borderRadius: "2px 0 0 0" }} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
          FULL CASE-FILE MODAL — slides in from top when open
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dimmer */}
            <motion.div
              key={`bd-${project.id}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => onOpen(null)}
              style={{ position: "fixed", inset: 0, background: "rgba(8,6,4,0.78)", zIndex: 998, cursor: "pointer" }}
            />

            {/* Case-file panel — fixed, starts near top, scrolls internally */}
            <motion.div
              key={`cf-${project.id}`}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.32, ease: [0.2, 0, 0.1, 1] }}
              style={{
                position: "fixed",
                top: "3vh",
                left: "50%",
                transform: "translateX(-50%)",
                width: "min(640px, 94vw)",
                height: "94vh",
                zIndex: 999,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Outer folder wrapper */}
              <div style={{
                background: "linear-gradient(145deg, #7d5c1a 0%, #5c4010 100%)",
                borderRadius: "4px 12px 12px 4px",
                padding: "5px 5px 5px 5px",
                boxShadow: "0 24px 70px rgba(0,0,0,0.9), 0 4px 20px rgba(0,0,0,0.6)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}>
                {/* Folder tab on top */}
                <div style={{
                  position: "absolute", top: -24, left: 18,
                  background: FOLDER_TAB,
                  borderRadius: "5px 5px 0 0",
                  padding: "5px 20px",
                  fontFamily: "'Special Elite', cursive",
                  fontSize: "0.68rem",
                  letterSpacing: "0.1em",
                  color: "rgba(245,235,200,0.85)",
                  textTransform: "uppercase",
                }}>
                  {project.name}
                </div>

                {/* Close button */}
                <button
                  onClick={() => onOpen(null)}
                  style={{
                    position: "absolute", top: 12, right: 14,
                    background: "#8b0000",
                    color: "#f5f0e0",
                    border: "none",
                    borderRadius: 2,
                    padding: "5px 14px",
                    fontFamily: "'Special Elite', cursive",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  ✕ CLOSE
                </button>

                {/* Inner scrollable paper */}
                <div
                  className="paper-texture"
                  style={{
                    flex: 1,
                    borderRadius: "2px 9px 9px 2px",
                    overflowY: "auto",
                    padding: "32px 36px 36px",
                    position: "relative",
                    /* Hide scrollbar but keep scroll */
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {/* Paper lines */}
                  <div style={{ position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "inherit", background: "repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(26,18,8,0.01) 28px, rgba(26,18,8,0.01) 29px)" }} />
                  {/* Red margin rule */}
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: 56, borderLeft: "1.5px solid rgba(139,0,0,0.06)", pointerEvents: "none" }} />

                  {/* ── HEADER ── */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.75rem", color: "#8b0000", letterSpacing: "0.18em", marginBottom: 6 }}>
                        CASE NO. {project.caseNo}
                      </div>
                      <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "2.3rem", color: "#1a1208", fontWeight: 700, lineHeight: 1.1 }}>
                        {project.name}
                      </div>
                      <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.85rem", color: "#8b0000", letterSpacing: "0.12em", marginTop: 4, textTransform: "uppercase" }}>
                        ▸ {project.classification}
                      </div>
                    </div>

                    {/* Status stamp */}
                    <div style={{
                      fontFamily: "'Special Elite', cursive",
                      padding: "6px 16px",
                      border: `3px solid ${sc.border}`,
                      borderRadius: 3,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      transform: "rotate(-8deg)",
                      color: sc.text,
                      opacity: 0.88,
                      flexShrink: 0,
                      marginTop: 10,
                    }}>
                      {project.status}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px dashed rgba(26,18,8,0.22)", margin: "16px 0" }} />

                  {/* ── CASE PROBLEM ── */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.85rem", color: "#8b0000", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                      ▌ CASE PROBLEM
                    </div>
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "1.05rem", color: "#1a1208", lineHeight: 1.72, borderLeft: "3px solid rgba(139,0,0,0.3)", paddingLeft: 14, fontStyle: "italic" }}>
                      {project.problem}
                    </div>
                  </div>

                  {/* ── INVESTIGATION NOTES ── */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.85rem", color: "#8b0000", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
                      ▌ INVESTIGATION NOTES
                    </div>
                    <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "1.05rem", color: "#1a1208", lineHeight: 1.72 }}>
                      {project.description}
                    </div>
                  </div>

                  {/* ── TOOLS / EVIDENCE ── */}
                  <div style={{ marginBottom: 22 }}>
                    <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.85rem", color: "#8b0000", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>
                      ▌ TOOLS / EVIDENCE
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {project.tech.map(t => <Tag key={t} label={t} />)}
                    </div>
                  </div>

                  <div style={{ borderTop: "1px dashed rgba(26,18,8,0.22)", margin: "0 0 20px" }} />

                  {/* ── SOURCE DOCUMENTS (links) ── */}
                  <div>
                    <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.85rem", color: "#8b0000", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
                      ▌ SOURCE DOCUMENTS
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <LinkCard
                        href={project.github}
                        icon="🐙"
                        label="GitHub Repository"
                        url={project.github}
                        colour="#2244cc"
                      />
                      <LinkCard
                        href={project.live}
                        icon="🌐"
                        label="Live Deployment"
                        url={project.live}
                        colour="#226622"
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: "center", marginTop: 28, fontFamily: "'Courier Prime', monospace", fontSize: "0.75rem", color: "rgba(26,18,8,0.4)", cursor: "pointer" }} onClick={() => onOpen(null)}>
                    — click outside or press ✕ to close file —
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
