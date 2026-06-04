import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import ManilaFolder from "./ManilaFolder";
import EvidenceBoard from "./EvidenceBoard";
import CertificationsStack from "./CertificationsStack";
import ContactNote from "./ContactNote";
import DossierCard from "./DossierCard";
import FlipClock from "./FlipClock";
import RedStrings from "./RedStrings";
import ForensicProps from "./ForensicProps";
import CognitivePillars from "./CognitivePillars";
import { projects, FOLDER_POSITIONS } from "../data/projects";
import BloodSplatter from "./BloodSplatter";

// ── Layout constants ──────────────────────────────────────────────────────────
// Folders are 215px wide. We use 265px column pitch (215 + 50px gap)
// and 300px row pitch to give folders room to breathe + rotate without clipping.
// The board is wider than the viewport so it scrolls naturally.

const COL_W   = 265;   // column pitch
const ROW_H   = 300;   // row pitch
const COL_OFF = 60;    // left margin for folder grid
const ROW_OFF = 660;   // top of first folder row (shifted to 660)

// Build folder grid positions: 4 columns × as many rows as needed
function folderPos(i) {
  const col = i % 4;
  const row = Math.floor(i / 4);
  return {
    top:  ROW_OFF + row * ROW_H,
    left: COL_OFF + col * COL_W,
  };
}

export default function CorkBoard() {
  const [openFolder, setOpenFolder] = useState(null);
  const [redrawStrings, setRedrawStrings] = useState(0);

  // Re-draw red strings after folder animation settles
  useEffect(() => {
    const t = setTimeout(() => setRedrawStrings((n) => n + 1), 720);
    return () => clearTimeout(t);
  }, [openFolder]);

  const handleFolderOpen = useCallback((id) => setOpenFolder(id), []);

  // How tall does the board need to be?
  const rows   = Math.ceil(projects.length / 3);
  const boardH = Math.max(1650, ROW_OFF + rows * ROW_H + 280);

  return (
    <div
      className="cork-board-scroll"
      style={{ width: "100vw", height: "100vh", overflowX: "auto", overflowY: "auto" }}
    >
      {/* ── Main cork board canvas ── */}
      <div
        className="cork-texture"
        style={{ minWidth: 1300, minHeight: boardH, width: "100%", position: "relative" }}
      >

        {/* Vignette overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1,
          background: "radial-gradient(ellipse at 50% 45%, transparent 38%, rgba(0,0,0,0.5) 100%)",
        }} />

        {/* Blood splatter layer — sits above cork, below all cards */}
        <BloodSplatter boardHeight={boardH} />

        {/* Board header label */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.45 }}
          style={{ position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)", zIndex: 20, textAlign: "center", whiteSpace: "nowrap" }}
        >
          <div style={{
            fontFamily: "'Special Elite', cursive",
            fontSize: "0.52rem",
            color: "rgba(26,18,8,0.42)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
          }}>
            ▌ ACTIVE INVESTIGATION ▐ CASE: CYB-2026-BORKAR ▌
          </div>
        </motion.div>

        {/* Red strings layer */}
        <div style={{ position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none" }}>
          <RedStrings key={redrawStrings} />
        </div>

        {/* ── Profile Card — top left ── */}
        <ProfileCard />

        {/* ── Dossier Card — top centre-right ── */}
        <DossierCard />

        {/* ── Retro Flip clock — center-stage timeline focal point ── */}
        <FlipClock />

        {/* ── EVIDENCE FILES section label ── */}
        <div style={{
          position: "absolute",
          top: ROW_OFF - 42,
          left: COL_OFF,
          fontFamily: "'Special Elite', cursive",
          fontSize: "0.75rem",
          color: "rgba(245,235,200,0.35)",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          zIndex: 8,
        }}>
          — EVIDENCE FILES —
        </div>

        {/* ── Project folders grid ── */}
        {projects.map((project, i) => {
          // Use explicit position from data if provided, otherwise auto-grid
          const pos = (FOLDER_POSITIONS && FOLDER_POSITIONS[i]) || folderPos(i);
          return (
            <ManilaFolder
              key={project.id}
              project={project}
              isOpen={openFolder === project.id}
              onOpen={handleFolderOpen}
              style={pos}
            />
          );
        })}

        {/* ── Skills / Evidence Board — far right column ── */}
        <EvidenceBoard />

        {/* ── Contact Note — bottom left ── */}
        <ContactNote />

        {/* ── Certifications Stack — bottom right ── */}
        <CertificationsStack />

        {/* ── Cognitive Psychology Pillars card ── */}
        <CognitivePillars />

        {/* ── Steaming Coffee Mug & Rotating Rubik's Cube props ── */}
        <ForensicProps />

        {/* ── Masking tape strips holding the cards (rendered ON TOP for high-fidelity realism) ── */}
        {[
          // Suspect Profile top-left corner
          { top: 72, left: 28, rotate: -30, w: 55, h: 16 },
          // Suspect Profile bottom-right corner
          { top: 436, left: 212, rotate: 35, w: 55, h: 16 },
          // Case Dossier top-left corner
          { top: 72, left: 238, rotate: -30, w: 55, h: 16 },
          // Case Dossier top-right corner
          { top: 70, left: 406, rotate: 25, w: 55, h: 16 },
        ].map((t, i) => (
          <div key={i} style={{
            position: "absolute",
            top: t.top, left: t.left,
            width: t.w, height: t.h,
            background: "rgba(242,226,186, 0.32)", // highly realistic translucent masking tape color
            backdropFilter: "blur(0.5px)",
            transform: `rotate(${t.rotate}deg)`,
            borderRadius: 1,
            zIndex: 25, // sits on top of cards to look pinned/taped
            pointerEvents: "none",
            boxShadow: "1px 1px 3px rgba(0,0,0,0.12)",
            borderLeft: "1.5px dashed rgba(0,0,0,0.08)",
            borderRight: "1.5px dashed rgba(0,0,0,0.08)", // torn tape edge look
          }} />
        ))}

        {/* ── Section labels (top strip) — Perfectly centered above their respective cards ── */}
        {[
          { label: "SUSPECT PROFILE",  top: 50, left: 40, width: 200 },
          { label: "CASE DOSSIER",     top: 50, left: 250, width: 180 },
          { label: "CASE TIMESTAMP",   top: 50, left: "50%", transform: "translateX(-50%)", width: 320 },
          { label: "SKILLS / ARSENAL", top: 50, right: 60, width: 394 },
        ].map(({ label, top, left, right, transform, width }) => (
          <div key={label} style={{
            position: "absolute",
            top, left, right, transform, width,
            textAlign: "center",
            fontFamily: "'Special Elite', cursive",
            fontSize: "0.75rem",
            color: "rgba(245,235,200,0.35)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            zIndex: 8,
          }}>
            — {label} —
          </div>
        ))}
      </div>
    </div>
  );
}
