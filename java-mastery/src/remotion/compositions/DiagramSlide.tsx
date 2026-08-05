import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DiagramSlideProps extends Record<string, unknown> {
  title?: string;
  subtitle?: string;
}

const NODES = [
  { id: "source", label: "Java Source", sub: "Main.java", icon: "📄", color: "#6366f1", x: 120, y: 320 },
  { id: "compiler", label: "javac Compiler", sub: "Syntax & AST", icon: "⚙️", color: "#ec4899", x: 420, y: 320 },
  { id: "bytecode", label: "Bytecode", sub: "Main.class", icon: "📦", color: "#8b5cf6", x: 720, y: 320 },
  { id: "jvm", label: "JVM Execution", sub: "JIT & Interpreter", icon: "🚀", color: "#10b981", x: 1020, y: 320 },
  { id: "native", label: "Machine Code", sub: "x86 / ARM Binary", icon: "💻", color: "#f59e0b", x: 1320, y: 320 },
];

export const DiagramSlide: React.FC<DiagramSlideProps> = ({
  title = "The Java Compilation & Execution Pipeline",
  subtitle = "How Java source code is transformed into platform-independent bytecode and executed by the JVM",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 14 } });

  // Pulsing signal traveling along the line (0 to 1200px)
  const signalPos = interpolate(frame % 90, [0, 90], [120, 1320]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#05070c",
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
      {/* Background Tech Mesh */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 60%)",
        }}
      />

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "60px",
          transform: `translateY(${(1 - headerSpring) * -30}px)`,
          opacity: headerSpring,
        }}
      >
        <span style={{ color: "#818cf8", fontSize: "13px", fontWeight: 800, letterSpacing: "3px", textTransform: "uppercase" }}>
          COMPILER ARCHITECTURE
        </span>
        <h2 style={{ fontSize: "44px", fontWeight: 900, margin: "8px 0 0 0", color: "#ffffff" }}>
          {title}
        </h2>
        <p style={{ fontSize: "18px", color: "#94a3b8", margin: "8px 0 0 0" }}>{subtitle}</p>
      </div>

      {/* Diagram Canvas Stage */}
      <div style={{ position: "relative", flex: 1, width: "100%" }}>
        {/* SVG Connector Lines */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* Main Connector Line */}
          <line
            x1="120"
            y1="180"
            x2="1320"
            y2="180"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="4"
            strokeDasharray="8 8"
          />

          {/* Animated Data Signal Particle */}
          <circle cx={signalPos} cy="180" r="10" fill="#6366f1" filter="drop-shadow(0 0 12px #6366f1)" />
        </svg>

        {/* Nodes */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10, marginTop: "90px" }}>
          {NODES.map((node, index) => {
            const nodeSpring = spring({
              frame: frame - (15 + index * 12),
              fps,
              config: { damping: 12, stiffness: 90 },
            });

            return (
              <div
                key={node.id}
                style={{
                  width: "220px",
                  backgroundColor: "rgba(15, 23, 42, 0.85)",
                  border: `2px solid ${node.color}40`,
                  borderRadius: "20px",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transform: `scale(${Math.max(0, nodeSpring)}) translateY(${(1 - nodeSpring) * 30}px)`,
                  opacity: nodeSpring,
                  boxShadow: `0 15px 35px ${node.color}20`,
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Icon Badge */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "16px",
                    backgroundColor: `${node.color}20`,
                    border: `1px solid ${node.color}60`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "26px",
                    marginBottom: "16px",
                  }}
                >
                  {node.icon}
                </div>

                <h4 style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff", margin: "0 0 4px 0" }}>
                  {node.label}
                </h4>
                <span style={{ fontSize: "14px", color: "#94a3b8" }}>{node.sub}</span>

                <div
                  style={{
                    marginTop: "16px",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: node.color,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    backgroundColor: `${node.color}15`,
                    padding: "4px 10px",
                    borderRadius: "999px",
                  }}
                >
                  Step 0{index + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
