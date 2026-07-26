'use client';

import { useState, useEffect } from 'react';
import { useUserSession } from '@/hooks/useUserSession';

interface WatermarkOverlayProps {
  customText?: string;
}

// Perimeter-only positions around edges so middle content is NEVER obscured
const PERIMETER_POSITIONS = [
  { top: '5%', left: '5%', right: 'auto', bottom: 'auto' },
  { top: '5%', right: '5%', left: 'auto', bottom: 'auto' },
  { bottom: '12%', right: '5%', top: 'auto', left: 'auto' },
  { bottom: '12%', left: '5%', top: 'auto', right: 'auto' },
];

export function WatermarkOverlay({ customText }: WatermarkOverlayProps) {
  const session = useUserSession();
  const [posIdx, setPosIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Gently rotate perimeter position every 8 seconds
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setPosIdx((prev) => (prev + 1) % PERIMETER_POSITIONS.length);
        setVisible(true);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const currentPos = PERIMETER_POSITIONS[posIdx];
  const displayText = customText || `${session.userId} · ${session.userTag}`;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none">
      {/* Subtle, non-intrusive perimeter watermark badge */}
      <div
        className="absolute transition-all duration-1000 ease-in-out"
        style={{
          top: currentPos.top,
          left: currentPos.left,
          right: currentPos.right,
          bottom: currentPos.bottom,
          opacity: visible ? 0.35 : 0.05,
        }}
      >
        <div className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/10 text-white/70 shadow-sm flex items-center gap-1.5 font-mono text-[10px] tracking-tight">
          <span className="w-1 h-1 rounded-full bg-amber-400/80" />
          <span className="text-white/50 uppercase text-[9px] font-medium">ID:</span>
          <span>{displayText}</span>
        </div>
      </div>
    </div>
  );
}
