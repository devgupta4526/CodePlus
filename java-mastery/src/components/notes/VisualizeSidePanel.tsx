'use client';

import React, { useState } from 'react';
import { X, Maximize2, ChevronLeft, ChevronRight, Eye, Film, Image as ImageIcon } from 'lucide-react';
import { type ImageNote } from '@/types';

interface VisualizeSidePanelProps {
  sectionTitle: string;
  notes: ImageNote[];
  onClose: () => void;
}

export function VisualizeSidePanel({ sectionTitle, notes, onClose }: VisualizeSidePanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!notes || notes.length === 0) return null;

  const currentNote = notes[activeIndex] || notes[0];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % notes.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + notes.length) % notes.length);
  };

  return (
    <>
      {/* Side Panel Container (Desktop sticky side pane / Mobile drawer) */}
      <div className="w-full lg:w-[420px] shrink-0 border-l border-[var(--border-color)] bg-[var(--surface)] flex flex-col h-[calc(100vh-4rem)] sticky top-16 shadow-xl transition-all z-20 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-color)] bg-[var(--surface-elevated)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/15 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Eye className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                Section Visualizer
              </span>
              <h4 className="text-xs font-bold text-[var(--text-primary)] truncate">
                {sectionTitle}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsFullscreen(true)}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface)] transition-all cursor-pointer"
              title="Fullscreen view"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-all cursor-pointer"
              title="Close visualizer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Media Container */}
        <div className="flex-1 flex flex-col p-4 overflow-y-auto bg-[var(--bg-secondary)] gap-4">
          <div className="relative w-full aspect-auto min-h-[260px] max-h-[480px] bg-black/40 rounded-xl overflow-hidden border border-[var(--border-color)] flex items-center justify-center group shadow-md">
            {notes.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[var(--accent)] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {currentNote.type === 'video' ? (
              <video
                key={currentNote.url}
                src={currentNote.url}
                controls
                autoPlay
                className="w-full h-full max-h-[440px] object-contain rounded-lg"
              />
            ) : (
              <img
                key={currentNote.url}
                src={currentNote.url}
                alt={currentNote.title}
                className="w-full h-full max-h-[440px] object-contain rounded-lg"
              />
            )}

            {notes.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[var(--accent)] transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Caption & Image Switcher */}
          <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold truncate">
                {currentNote.type === 'video' ? <Film className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                <span className="truncate">{currentNote.title}</span>
              </div>
              {notes.length > 1 && (
                <span className="text-[10px] text-[var(--text-muted)] font-mono shrink-0">
                  {activeIndex + 1} / {notes.length}
                </span>
              )}
            </div>

            {notes.length > 1 && (
              <div className="flex gap-2 pt-1 overflow-x-auto">
                {notes.map((n, idx) => (
                  <button
                    key={n.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-12 h-9 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeIndex === idx
                        ? 'border-[var(--accent)] scale-105'
                        : 'border-[var(--border-color)] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={n.url} alt={n.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6">
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[var(--accent)]" />
              <h4 className="text-base font-bold font-heading">{currentNote.title}</h4>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center my-4 relative">
            {currentNote.type === 'video' ? (
              <video src={currentNote.url} controls autoPlay className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl" />
            ) : (
              <img src={currentNote.url} alt={currentNote.title} className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
