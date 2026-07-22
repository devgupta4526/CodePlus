'use client';

import { useState, useEffect, useCallback } from 'react';

export function useRoadmapProgress(key = 'codepulse-roadmap-progress') {
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {}
  }, [key]);

  const toggleItem = useCallback((id: string) => {
    setProgress((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch(e) {}
      return next;
    });
  }, [key]);

  return { progress, toggleItem };
}
