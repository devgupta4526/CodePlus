import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CompareSlideProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
  leftTitle?: string;
  leftSubtitle?: string;
  leftItems?: string[];
  rightTitle?: string;
  rightSubtitle?: string;
  rightItems?: string[];
}

export const CompareSlide: React.FC<CompareSlideProps> = ({
  title = "Primitive Types vs Reference Types",
  subtitle = "Understanding memory allocation, passing conventions, and default values in Java",
  leftTitle = "Primitive Types",
  leftSubtitle = "int, double, boolean, char",
  leftItems = [
    "Stores actual value directly in Stack memory",
    "Fixed memory footprint (e.g., int = 32 bits)",
    "Passed by Value (copy of primitive content)",
    "Cannot be null; has default zero values",
  ],
  rightTitle = "Reference Types",
  rightSubtitle = "Objects, Arrays, Strings, Classes",
  rightItems = [
    "Stores memory address (pointer) pointing to Heap",
    "Dynamic size allocated dynamically via 'new'",
    "Passed by Value of Reference (address copy)",
    "Can be null; throws NullPointerException if uninitialized",
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 14 } });
  const leftSpring = spring({ frame: frame - 15, fps, config: { damping: 13, stiffness: 85 } });
  const rightSpring = spring({ frame: frame - 30, fps, config: { damping: 13, stiffness: 85 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#06080e",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        padding: "50px 70px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.15), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "15%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Slide Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          transform: `translateY(${(1 - titleSpring) * -30}px)`,
          opacity: titleSpring,
        }}
      >
        <span
          style={{
            color: "#6366f1",
            fontSize: "13px",
            fontWeight: 800,
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          Architectural Breakdown
        </span>
        <h2 style={{ fontSize: "44px", fontWeight: 900, margin: "8px 0 0 0", color: "#ffffff" }}>
          {title}
        </h2>
        <p style={{ fontSize: "18px", color: "#94a3b8", margin: "8px 0 0 0" }}>{subtitle}</p>
      </div>

      {/* Dual Card Container */}
      <div style={{ display: "flex", gap: "36px", flex: 1, height: "calc(100% - 140px)" }}>
        {/* Left Card: Emerald Accent */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            borderRadius: "24px",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            transform: `scale(${Math.max(0, leftSpring)}) translateX(${(1 - leftSpring) * -40}px)`,
            opacity: leftSpring,
            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ marginBottom: "24px", borderBottom: "1px solid rgba(16, 185, 129, 0.2)", paddingBottom: "16px" }}>
            <span
              style={{
                backgroundColor: "rgba(16, 185, 129, 0.15)",
                color: "#34d399",
                fontSize: "12px",
                fontWeight: 700,
                padding: "6px 12px",
                borderRadius: "6px",
                letterSpacing: "1px",
              }}
            >
              DIRECT VALUES
            </span>
            <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff", margin: "12px 0 4px 0" }}>
              {leftTitle}
            </h3>
            <span style={{ fontSize: "15px", color: "#64748b" }}>{leftSubtitle}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
            {leftItems.map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(16, 185, 129, 0.2)",
                    color: "#34d399",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: "17px", color: "#cbd5e1", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Card: Violet Accent */}
        <div
          style={{
            flex: 1,
            backgroundColor: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            borderRadius: "24px",
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            transform: `scale(${Math.max(0, rightSpring)}) translateX(${(1 - rightSpring) * 40}px)`,
            opacity: rightSpring,
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div style={{ marginBottom: "24px", borderBottom: "1px solid rgba(139, 92, 246, 0.2)", paddingBottom: "16px" }}>
            <span
              style={{
                backgroundColor: "rgba(139, 92, 246, 0.15)",
                color: "#c084fc",
                fontSize: "12px",
                fontWeight: 700,
                padding: "6px 12px",
                borderRadius: "6px",
                letterSpacing: "1px",
              }}
            >
              HEAP POINTERS
            </span>
            <h3 style={{ fontSize: "28px", fontWeight: 800, color: "#ffffff", margin: "12px 0 4px 0" }}>
              {rightTitle}
            </h3>
            <span style={{ fontSize: "15px", color: "#64748b" }}>{rightSubtitle}</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
            {rightItems.map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(139, 92, 246, 0.2)",
                    color: "#c084fc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "14px",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  ➔
                </div>
                <span style={{ fontSize: "17px", color: "#cbd5e1", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
