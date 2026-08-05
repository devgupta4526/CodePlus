import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CodeSlideProps extends Record<string, unknown> {
  title?: string;
  codeSnippet?: string;
  activeLine?: number;
  stackFrame?: { name: string; vars: string[] };
  heapObjects?: { id: string; type: string; fields: string[] }[];
}

const DEFAULT_CODE = `public class Student {
    private String name;
    private int id;

    public Student(String name, int id) {
        this.name = name;
        this.id = id;
    }

    public static void main(String[] args) {
        Student s1 = new Student("Alice", 101);
        System.out.println(s1.name);
    }
}`;

export const CodeSlide: React.FC<CodeSlideProps> = ({
  title = "Object Instantiation & Memory Layout",
  codeSnippet = DEFAULT_CODE,
  activeLine = 11,
  stackFrame = { name: "main()", vars: ["s1 = 0x4A2B"] },
  heapObjects = [
    { id: "0x4A2B", type: "Student Object", fields: ['name: "Alice"', "id: 101"] },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Character typing animation calculation
  const totalChars = codeSnippet.length;
  const charsTyped = Math.floor(
    interpolate(frame, [10, 70], [0, totalChars], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const displayedCode = codeSnippet.slice(0, charsTyped);
  const codeLines = displayedCode.split("\n");

  // Memory card spring entrances
  const stackSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const heapSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const headerSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#080a11",
        color: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        padding: "48px 64px",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Subtle Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at top left, rgba(99, 102, 241, 0.15), transparent 60%)",
        }}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
          transform: `translateY(${(1 - headerSpring) * -20}px)`,
          opacity: headerSpring,
        }}
      >
        <div>
          <span style={{ color: "#6366f1", fontSize: "14px", fontWeight: 700, letterSpacing: "1px" }}>
            LIVE MEMORY ENGINE
          </span>
          <h2 style={{ fontSize: "36px", fontWeight: 800, margin: "4px 0 0 0", color: "#ffffff" }}>
            {title}
          </h2>
        </div>
        <div
          style={{
            backgroundColor: "rgba(99, 102, 241, 0.12)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#a5b4fc",
            fontWeight: 600,
          }}
        >
          Line Highlight: #{activeLine}
        </div>
      </div>

      {/* Main Content Split: Code Left, Memory Right */}
      <div style={{ display: "flex", gap: "32px", flex: 1, height: "calc(100% - 100px)" }}>
        {/* Code Editor Window */}
        <div
          style={{
            flex: 1.2,
            backgroundColor: "#0d1117",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Editor Header Bar */}
          <div
            style={{
              height: "42px",
              backgroundColor: "#161b22",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              gap: "8px",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }} />
            <span style={{ marginLeft: "12px", fontSize: "13px", color: "#8b949e", fontFamily: "monospace" }}>
              Student.java
            </span>
          </div>

          {/* Code Container */}
          <div
            style={{
              padding: "24px",
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: "18px",
              lineHeight: 1.6,
              overflowY: "auto",
              flex: 1,
            }}
          >
            {codeLines.map((lineText, idx) => {
              const lineNum = idx + 1;
              const isActive = lineNum === activeLine;
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    backgroundColor: isActive ? "rgba(99, 102, 241, 0.2)" : "transparent",
                    borderLeft: isActive ? "4px solid #6366f1" : "4px solid transparent",
                    paddingLeft: "12px",
                    borderRadius: "4px",
                    transition: "all 0.2s ease",
                  }}
                >
                  <span style={{ width: "32px", color: "#484f58", userSelect: "none" }}>{lineNum}</span>
                  <span style={{ color: isActive ? "#ffffff" : "#c9d1d9" }}>{lineText || " "}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Memory Visualizer Panel */}
        <div style={{ flex: 0.8, display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Call Stack Card */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              borderRadius: "16px",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              transform: `scale(${Math.max(0, stackSpring)})`,
              opacity: stackSpring,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#60a5fa", letterSpacing: "1px" }}>
                CALL STACK (LIFO)
              </span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>Execution Frame</span>
            </div>
            <div
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.15)",
                border: "1px dashed rgba(59, 130, 246, 0.4)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div style={{ fontWeight: 700, color: "#93c5fd", fontSize: "16px", marginBottom: "8px" }}>
                {stackFrame.name}
              </div>
              {stackFrame.vars.map((v, i) => (
                <div key={i} style={{ fontFamily: "monospace", fontSize: "14px", color: "#e2e8f0" }}>
                  • {v}
                </div>
              ))}
            </div>
          </div>

          {/* Heap Memory Card */}
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(15, 23, 42, 0.7)",
              borderRadius: "16px",
              border: "1px solid rgba(168, 85, 247, 0.3)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              transform: `scale(${Math.max(0, heapSpring)})`,
              opacity: heapSpring,
              boxShadow: "0 10px 30px rgba(168, 85, 247, 0.1)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontSize: "14px", fontWeight: 700, color: "#c084fc", letterSpacing: "1px" }}>
                HEAP MEMORY (OBJECTS)
              </span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>Dynamic Allocations</span>
            </div>
            {heapObjects.map((obj, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(168, 85, 247, 0.15)",
                  border: "1px solid rgba(168, 85, 247, 0.4)",
                  borderRadius: "10px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontWeight: 700, color: "#e9d5ff", fontSize: "15px" }}>{obj.type}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "13px", color: "#c084fc" }}>{obj.id}</span>
                </div>
                {obj.fields.map((f, fi) => (
                  <div key={fi} style={{ fontFamily: "monospace", fontSize: "13px", color: "#cbd5e1" }}>
                    └ {f}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
