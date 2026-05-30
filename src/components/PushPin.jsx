// PushPin — reusable decorative push pin component
// Props: color ("red" | "yellow" | "blue"), className

const PIN_STYLES = {
  red: {
    bg: "#cc2200",
    shadow: "0 2px 4px rgba(0,0,0,0.6), 0 0 0 2px rgba(180,40,0,0.4), inset 0 1px 1px rgba(255,120,80,0.5)",
    inner: "rgba(255,120,80,0.4)",
  },
  yellow: {
    bg: "#e8c442",
    shadow: "0 2px 4px rgba(0,0,0,0.6), 0 0 0 2px rgba(200,160,30,0.4), inset 0 1px 1px rgba(255,240,140,0.5)",
    inner: "rgba(255,240,140,0.5)",
  },
  blue: {
    bg: "#2244cc",
    shadow: "0 2px 4px rgba(0,0,0,0.6), 0 0 0 2px rgba(30,60,180,0.4), inset 0 1px 1px rgba(100,160,255,0.5)",
    inner: "rgba(100,160,255,0.4)",
  },
};

export default function PushPin({ color = "red", className = "" }) {
  const style = PIN_STYLES[color] || PIN_STYLES.red;
  return (
    <div
      className={`push-pin ${className}`}
      style={{
        backgroundColor: style.bg,
        boxShadow: style.shadow,
        width: 14,
        height: 14,
        borderRadius: "50%",
        flexShrink: 0,
        position: "relative",
      }}
    >
      {/* Specular highlight */}
      <div
        style={{
          position: "absolute",
          top: 2,
          left: 3,
          width: 5,
          height: 4,
          borderRadius: "50%",
          background: style.inner,
        }}
      />
    </div>
  );
}
