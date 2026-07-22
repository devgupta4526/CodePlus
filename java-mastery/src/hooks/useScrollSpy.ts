'use client';

import { useState, useEffect, useRef } from 'react';
import { type Heading } from '@/types';

/** Hook to track which heading is currently in view */
export function useScrollSpy(headings: Heading[]) {
  const [activeId, setActiveId] = useState<string>('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      // Find the topmost visible heading
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        // Get the one closest to the top of the viewport
        const sorted = visibleEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        setActiveId(sorted[0].target.id);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0,
    });

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.current?.observe(element);
      }
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [headings]);

  return activeId;
}
