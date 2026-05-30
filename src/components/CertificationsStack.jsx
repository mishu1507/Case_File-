import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PushPin from "./PushPin";
import { certifications, categoryColors, categoryLabels, issuerOrder } from "../data/certifications";

// Group certs by issuer
function groupByIssuer(certs) {
  const groups = {};
  certs.forEach((cert) => {
    if (!groups[cert.issuer]) groups[cert.issuer] = [];
    groups[cert.issuer].push(cert);
  });
  // Sort issuers by preferred order
  const sorted = {};
  issuerOrder.forEach((issuer) => {
    if (groups[issuer]) sorted[issuer] = groups[issuer];
  });
  // Add any remaining
  Object.keys(groups).forEach((issuer) => {
    if (!sorted[issuer]) sorted[issuer] = groups[issuer];
  });
  return sorted;
}

export default function CertificationsStack({ stackRef }) {
  const [fanned, setFanned] = useState(false);
  const grouped = groupByIssuer(certifications);
  const issuers = Object.keys(grouped);

  return (
    <div
      ref={stackRef}
      id="certifications-stack"
      style={{ position: "absolute", top: 700, right: 167, zIndex: 20 }}
    >
      {/* Collapsed stack */}
      <AnimatePresence>
        {!fanned && (
          <motion.div
            key="stack"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ position: "relative", width: 180, height: 200 }}
            onClick={() => setFanned(true)}
          >
            {/* Stack layers */}
            {[4, 3, 2, 1, 0].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: i * 3,
                  left: i * 2,
                  width: 180,
                  background: i === 0 ? "#f5f0e0" : `rgba(245,240,224,${1 - i * 0.12})`,
                  border: "1px solid rgba(26,18,8,0.15)",
                  borderRadius: 3,
                  height: 200,
                  boxShadow: i === 0 ? "3px 4px 12px rgba(0,0,0,0.45)" : "none",
                  transform: `rotate(${(i - 2) * 1.5}deg)`,
                }}
              />
            ))}

            {/* Push pin on top */}
            <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", zIndex: 30 }}>
              <PushPin color="yellow" />
            </div>

            {/* Top document content */}
            <div
              className="paper-texture"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 3,
                padding: "16px 14px",
                zIndex: 10,
              }}
            >
              <div
                className="stamp stamp-red"
                style={{ fontSize: "0.55rem", display: "block", textAlign: "center", marginBottom: 8 }}
              >
                CERTIFICATIONS
              </div>
              <div style={{ fontFamily: "'Special Elite', cursive", fontSize: "0.55rem", color: "#1a1208", textAlign: "center", marginBottom: 6 }}>
                VERIFIED CREDENTIALS
              </div>
              <div style={{ fontFamily: "'Permanent Marker', cursive", fontSize: "2rem", color: "#8b0000", textAlign: "center", lineHeight: 1 }}>
                {certifications.length}
              </div>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.5rem", color: "#5a4830", textAlign: "center", marginTop: 2 }}>
                TOTAL CERTIFIED
              </div>
              <div style={{ marginTop: 12, fontFamily: "'Courier Prime', monospace", fontSize: "0.48rem", color: "#8b0000", textAlign: "center" }}>
                [ click to expand ]
              </div>
              <div style={{ marginTop: 8 }}>
                {["Google Cloud", "IBM SkillsBuild", "Cisco", "AWS", "Quick Heal"].map((iss) => (
                  <div key={iss} style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.48rem", color: "#5a4830", marginBottom: 2, paddingLeft: 4 }}>
                    ▸ {iss}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fanned out view */}
      <AnimatePresence>
        {fanned && (
          <motion.div
            key="fanned"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(15,13,11,0.92)",
              backdropFilter: "blur(4px)",
              overflowY: "auto",
              padding: "40px 30px",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setFanned(false)}
              style={{
                position: "fixed",
                top: 20,
                right: 24,
                background: "#8b0000",
                color: "#f5f0e0",
                border: "none",
                borderRadius: 2,
                padding: "6px 16px",
                fontFamily: "'Special Elite', cursive",
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                cursor: "pointer",
                zIndex: 210,
              }}
            >
              ✕ CLOSE FILE
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <div
                className="stamp stamp-red"
                style={{ fontSize: "1.2rem", display: "inline-block", marginBottom: 8 }}
              >
                CERTIFIED CREDENTIALS
              </div>
              <div style={{ fontFamily: "'Courier Prime', monospace", fontSize: "0.7rem", color: "#8B6914", marginTop: 4 }}>
                {certifications.length} verified certifications across cybersecurity, cloud, AI & development
              </div>
              <a
                href="https://www.credly.com/users/aditi-borkar.0783ec0b/badges"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontFamily: "'Courier Prime', monospace",
                  fontSize: "0.6rem",
                  color: "#e8c442",
                  textDecoration: "underline",
                }}
              >
                🏅 View all badges on Credly →
              </a>
            </div>

            {/* Grouped by issuer */}
            {issuers.map((issuer, gi) => (
              <motion.div
                key={issuer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: gi * 0.05, duration: 0.3 }}
                style={{ marginBottom: 28 }}
              >
                <div
                  style={{
                    fontFamily: "'Special Elite', cursive",
                    fontSize: "0.75rem",
                    color: "#e8c442",
                    letterSpacing: "0.15em",
                    borderBottom: "1px solid rgba(232,196,66,0.3)",
                    paddingBottom: 6,
                    marginBottom: 12,
                    textTransform: "uppercase",
                  }}
                >
                  ▌ {issuer}
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 10,
                  }}
                >
                  {grouped[issuer].map((cert, ci) => (
                    <motion.a
                      key={cert.id}
                      href={cert.file || cert.credly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card"
                      initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                      animate={{ opacity: 1, scale: 1, rotate: (ci % 3 - 1) * 1.2 }}
                      transition={{ delay: gi * 0.04 + ci * 0.03, duration: 0.3 }}
                      whileHover={{ scale: 1.04, rotate: 0, zIndex: 30, transition: { duration: 0.15 } }}
                      style={{ cursor: "pointer", display: "block", textDecoration: "none" }}
                    >
                      {/* Category color dot */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
                        <div
                          style={{
                            width: 8, height: 8, borderRadius: "50%",
                            background: categoryColors[cert.category] || "#cc2200",
                            flexShrink: 0, marginTop: 2,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: "'Special Elite', cursive",
                              fontSize: "0.45rem",
                              color: categoryColors[cert.category] || "#cc2200",
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                            }}
                          >
                            {categoryLabels[cert.category] || cert.category}
                          </div>
                          <div
                            style={{
                              fontFamily: "'Courier Prime', monospace",
                              fontSize: "0.6rem",
                              fontWeight: 700,
                              color: "#1a1208",
                              lineHeight: 1.3,
                              marginTop: 1,
                            }}
                          >
                            {cert.title}
                          </div>
                        </div>
                      </div>
                      {cert.date && (
                        <div
                          style={{
                            fontFamily: "'Courier Prime', monospace",
                            fontSize: "0.48rem",
                            color: "#7a6040",
                            marginTop: 4,
                          }}
                        >
                          📅 {cert.date}
                        </div>
                      )}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Credly footer link */}
            <div style={{ textAlign: "center", marginTop: 20, paddingBottom: 20 }}>
              <a
                href="https://www.credly.com/users/aditi-borkar.0783ec0b/badges"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: "0.75rem",
                  color: "#e8c442",
                  border: "1px solid #e8c442",
                  padding: "8px 20px",
                  borderRadius: 2,
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                }}
              >
                🏅 VIEW ALL BADGES ON CREDLY
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
