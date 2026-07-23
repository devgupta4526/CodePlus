'use client';

import { useState } from 'react';
import { JavaRoadmapView } from '@/components/roadmap/JavaRoadmapView';
import { PythonRoadmapView } from '@/components/roadmap/PythonRoadmapView';
import { DsaRoadmapView } from '@/components/roadmap/DsaRoadmapView';

type Track = 'java' | 'python' | 'dsa';

const TRACKS: { id: Track; label: string; icon: string }[] = [
  { id: 'java', label: 'Java', icon: '☕' },
  { id: 'python', label: 'Python', icon: '🐍' },
  { id: 'dsa', label: 'DSA', icon: '🌲' },
];

export default function RoadmapClient() {
  const [track, setTrack] = useState<Track>('java');
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  function toggleItem(id: string) {
    setProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Track tabs */}
      <div className="border-b border-[var(--border-color)] bg-[var(--surface)] sticky top-16 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 py-2">
            {TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTrack(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  track === t.id
                    ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
                }`}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* View */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {track === 'java' && <JavaRoadmapView progress={progress} toggleItem={toggleItem} />}
        {track === 'python' && <PythonRoadmapView progress={progress} toggleItem={toggleItem} />}
        {track === 'dsa' && <DsaRoadmapView progress={progress} toggleItem={toggleItem} />}
      </div>
    </div>
  );
}
