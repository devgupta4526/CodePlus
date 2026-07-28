'use client';

/**
 * ImageCarousel.tsx
 * Renders a group of consecutive markdown image lines as a carousel.
 * Used by SlideRenderer when a slide contains multiple consecutive images.
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : images.length - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((c) => (c < images.length - 1 ? c + 1 : 0));
  }, [images.length]);

  // Keyboard: left/right when lightbox is open (don't interfere with slide nav)
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') setLightbox(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const img = images[current];

  return (
    <>
      <div
        className="carousel-wrapper"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        aria-label="Image carousel"
        role="region"
      >
        {/* Main image */}
        <div
          className="carousel-image-area"
          onClick={() => setLightbox(true)}
          title="Click to view full size"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            className="carousel-image"
          />
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="carousel-btn carousel-btn-left"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="carousel-btn carousel-btn-right"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dot pagination */}
        {images.length > 1 && (
          <div className="carousel-dots" role="tablist" aria-label="Carousel pagination">
            {images.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Image ${i + 1} of ${images.length}`}
                onClick={() => setCurrent(i)}
                className={`carousel-dot ${i === current ? 'carousel-dot-active' : ''}`}
              />
            ))}
          </div>
        )}

        {/* Counter badge */}
        {images.length > 1 && (
          <div className="carousel-counter" aria-live="polite">
            {current + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="carousel-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Full size image"
          onClick={() => setLightbox(false)}
        >
          <button
            className="carousel-lightbox-close"
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt}
            className="carousel-lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
