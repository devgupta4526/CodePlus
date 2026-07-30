'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { type ImageNote } from '@/types';

interface FullSizeSlideshowModalProps {
  notes: ImageNote[];
  initialIndex?: number;
  onClose: () => void;
}

export function FullSizeSlideshowModal({ notes, initialIndex = 0, onClose }: FullSizeSlideshowModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!notes || notes.length === 0) return null;

  const currentNote = notes[currentIndex] || notes[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % notes.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + notes.length) % notes.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200 select-none">
      {/* Floating Close Button Top Right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-[var(--accent)] text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-xl"
        title="Close Slideshow (Esc)"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Arrow Left */}
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

      {/* Navigation Arrow Right */}
      <button
        onClick={handleNext}
        className="absolute right-4 z-20 p-3.5 rounded-full bg-black/60 hover:bg-[var(--accent)] text-white backdrop-blur-md transition-all cursor-pointer hover:scale-110 shadow-xl"
        title="Next Image (Right Arrow)"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
