'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Play,
  Pause,
  X,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { type ImageNote } from '@/types';

interface ImageNotesSliderProps {
  notes: ImageNote[];
  onSelectNote?: (note: ImageNote) => void;
}

export function ImageNotesSlider({ notes, onSelectNote }: ImageNotesSliderProps) {
  const [isOpen, setIsOpen] = useState(true); // Open by default
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  if (!notes || notes.length === 0) {
    return null;
  }

  const currentNote = notes[currentIndex] || notes[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % notes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + notes.length) % notes.length);
  };

  // Autoplay loop
  useEffect(() => {
    if (!isAutoplay || !isOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [isAutoplay, isOpen, currentIndex]);

  // Keyboard navigation for fullscreen modal
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, currentIndex]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (isOpen && thumbnailContainerRef.current) {
      const activeThumb = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex, isOpen]);

  const selectSlide = (index: number) => {
    setCurrentIndex(index);
    if (onSelectNote) {
      onSelectNote(notes[index]);
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] shadow-md overflow-hidden transition-all">
      {/* Collapsible Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-5 py-3.5 bg-[var(--surface-elevated)] hover:bg-[var(--surface)] transition-colors cursor-pointer select-none flex-wrap gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[var(--text-primary)] font-heading">
                All Visual Image Notes
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
                {notes.length} Slides
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              {isOpen ? `Slide ${currentIndex + 1} of ${notes.length} — ${currentNote.title}` : 'Click to toggle full slide gallery deck'}
            </p>
          </div>
        </div>

        {/* Action Controls & Toggle Button */}
        <div className="flex items-center gap-2">
          {isOpen && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAutoplay(!isAutoplay);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                  isAutoplay
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)]'
                }`}
                title={isAutoplay ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAutoplay ? 'Pause' : 'Autoplay'}</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-pointer"
                title="Expand to Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Fullscreen</span>
              </button>
            </>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-xs"
          >
            <span>{isOpen ? 'Collapse Deck' : 'View Visual Deck'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slider Content (Rendered when isOpen is true) */}
      {isOpen && (
        <div className="border-t border-[var(--border-color)] animate-in fade-in duration-200">
          {/* Main Slide Viewer */}
          <div className="relative bg-[var(--bg-secondary)] flex items-center justify-center min-h-[320px] max-h-[520px] p-4 group select-none overflow-hidden">
            {/* Navigation Arrow Left */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-[var(--accent)] hover:scale-105 transition-all shadow-lg cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slide Image Content */}
            <div
              onClick={() => setIsFullscreen(true)}
              className="w-full h-full flex items-center justify-center max-h-[460px] cursor-pointer"
            >
              <img
                key={currentNote.url}
                src={currentNote.url}
                alt={currentNote.title}
                className="max-h-[440px] max-w-full rounded-xl object-contain shadow-md transition-all duration-300 hover:scale-101"
              />
            </div>

            {/* Navigation Arrow Right */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center hover:bg-[var(--accent)] hover:scale-105 transition-all shadow-lg cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Overlay Caption */}
            <div className="absolute bottom-3 left-4 right-4 bg-black/75 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center justify-between text-xs opacity-95 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2 truncate">
                <ImageIcon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                <span className="font-semibold truncate">{currentNote.title}</span>
              </div>
              <span className="text-[11px] text-white/80 shrink-0 ml-3 font-mono">
                {currentIndex + 1} / {notes.length}
              </span>
            </div>
          </div>

          {/* Horizontal Thumbnail Strip */}
          <div className="p-3 bg-[var(--surface)] border-t border-[var(--border-color)]">
            <div
              ref={thumbnailContainerRef}
              className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-[var(--border-color)]"
            >
              {notes.map((note, idx) => (
                <button
                  key={note.id}
                  onClick={() => selectSlide(idx)}
                  className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer group ${
                    currentIndex === idx
                      ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/30 scale-105'
                      : 'border-[var(--border-color)] opacity-70 hover:opacity-100 hover:border-[var(--text-muted)]'
                  }`}
                >
                  <img
                    src={note.url}
                    alt={note.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] font-bold px-1 text-center truncate">
                    #{idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pure Fullscreen Lightbox (Zero Header Bar, Zero Thumbnail Bar) */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 select-none">
          {/* Subtle Floating Close Button Top Right */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[var(--accent)] text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-xl"
            title="Close Fullscreen (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-20 p-3.5 rounded-full bg-black/60 hover:bg-[var(--accent)] text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-xl"
            title="Previous Image (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Pure Full Resolution Image */}
          <img
            key={currentNote.url}
            src={currentNote.url}
            alt={currentNote.title}
            className="max-h-[96vh] max-w-[96vw] object-contain rounded-lg shadow-2xl transition-all duration-300"
          />

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 z-20 p-3.5 rounded-full bg-black/60 hover:bg-[var(--accent)] text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-xl"
            title="Next Image (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
