import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface TitleSlideProps extends Record<string, unknown> {
  title: string;
  subtitle: string;
  badge?: string;
  lessonNum?: string;
  author?: string;
}

export const TitleSlide: React.FC<TitleSlideProps> = ({
  title = "Object-Oriented Programming",
  subtitle = "Mastering Classes, Objects, Inheritance & Polymorphism in Java",
  badge = "JAVA MASTERY STUDIO",
  lessonNum = "LESSON 01",
  author = "Java Mastery Deck",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const badgeSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const subtitleSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const footerSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Background glow oscillation
  const pulseOpacity = interpolate(
    Math.sin(frame / 20),
    [-1, 1],
    [0.25, 0.55]
  );

  const gridMove = (frame * 1.5) % 40;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#07090e",
        color: "#ffffff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "60px 80px",
        boxSizing: "border-box",
      }}
    >
      {/* Animated Grid Background */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: `translateY(${gridMove}px)`,
          opacity: 0.7,
        }}
      />

      {/* Radial Glow Center */}
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, rgba(139, 92, 246, 0.15) 40%, transparent 70%)",
          opacity: pulseOpacity,
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Outer Neon Border Box */}
      <div
        style={{
          position: "absolute",
          inset: "40px",
          border: "1px solid rgba(99, 102, 241, 0.25)",
          borderRadius: "24px",
          boxShadow: "inset 0 0 40px rgba(99, 102, 241, 0.05)",
          pointerEvents: "none",
        }}
      />

      {/* Hero Badge & Lesson Pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "28px",
          transform: `scale(${Math.max(0, badgeSpring)}) translateY(${(1 - badgeSpring) * -30}px)`,
          opacity: badgeSpring,
        }}
      >
        <span
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "2px",
            padding: "8px 18px",
            borderRadius: "999px",
            boxShadow: "0 4px 20px rgba(99, 102, 241, 0.4)",
          }}
        >
          {badge}
        </span>
        <span
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#cbd5e1",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "1.5px",
            padding: "8px 18px",
            borderRadius: "999px",
            backdropFilter: "blur(10px)",
          }}
        >
          {lessonNum}
        </span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontSize: "76px",
          fontWeight: 900,
          textAlign: "center",
          margin: 0,
          lineHeight: 1.1,
          maxWidth: "1100px",
          background: "linear-gradient(135deg, #ffffff 30%, #a5b4fc 70%, #818cf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `scale(${Math.max(0, titleSpring)}) translateY(${(1 - titleSpring) * 40}px)`,
          opacity: titleSpring,
          filter: `blur(${(1 - titleSpring) * 10}px)`,
          letterSpacing: "-1.5px",
        }}
      >
        {title}
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: "26px",
          color: "#94a3b8",
          textAlign: "center",
          maxWidth: "900px",
          marginTop: "24px",
          marginBottom: "40px",
          lineHeight: 1.5,
          fontWeight: 400,
          transform: `translateY(${(1 - subtitleSpring) * 30}px)`,
          opacity: subtitleSpring,
        }}
      >
        {subtitle}
      </p>

      {/* Bottom Footer Info */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "15px",
          color: "#64748b",
          transform: `translateY(${(1 - footerSpring) * 20}px)`,
          opacity: footerSpring,
        }}
      >
        <span>{author}</span>
        <span style={{ color: "#334155" }}>•</span>
        <span style={{ color: "#818cf8", fontWeight: 600 }}>Interactive Motion Deck</span>
      </div>
    </div>
  );
};
