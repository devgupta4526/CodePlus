'use client';

import { useState } from 'react';
import { Play, ExternalLink, Video } from 'lucide-react';
import { WatermarkOverlay } from './WatermarkOverlay';

interface VideoLessonProps {
  videoUrl: string;
  title?: string;
}

/** Converts a YouTube watch URL or short URL to the embed URL, preserving relative video paths. */
function toEmbedUrl(url: string): string | null {
  if (!url) return null;
  if (url.startsWith('/')) return url;
  try {
    const u = new URL(url);

    // youtube.com/watch?v=ID
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}?rel=0`;
    }

    // youtu.be/ID
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}?rel=0`;
    }

    // youtube.com/embed/ID — already an embed link
    if (u.hostname.includes('youtube.com') && u.pathname.startsWith('/embed/')) {
      return url;
    }

    // For other URLs (direct video files, uploaded paths) return as-is
    return url;
  } catch {
    return url;
  }
}

function isYoutube(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

/**
 * VideoLesson — renders a YouTube embed (via iframe) or a native <video> element
 * with dynamic anti-piracy User ID watermark overlay.
 */
export function VideoLesson({ videoUrl, title }: VideoLessonProps) {
  const [loaded, setLoaded] = useState(false);
  const embedUrl = toEmbedUrl(videoUrl);
  const youtube = isYoutube(videoUrl);

  if (!embedUrl) {
    return (
      <div className="my-6 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] text-sm text-[var(--text-muted)] flex items-center gap-2">
        <Video className="w-4 h-4 shrink-0" />
        <span>Video not available.</span>
      </div>
    );
  }

  return (
    <div className="my-6">
      {title && (
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-disabled)] mb-2">
          <Video className="w-3.5 h-3.5" />
          {title}
        </p>
      )}

      <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] bg-black" style={{ aspectRatio: '16/9' }}>
        {!loaded ? (
          /* Placeholder / load gate */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 cursor-pointer group bg-[var(--bg-secondary)]"
            onClick={() => setLoaded(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setLoaded(true)}
            aria-label="Load video"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/15 flex items-center justify-center group-hover:bg-[var(--accent)]/25 transition-colors border border-[var(--accent)]/30">
              <Play className="w-7 h-7 text-[var(--accent)] ml-1" />
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Click to load protected video stream
            </p>
            {youtube ? (
              <p className="text-[10px] text-[var(--text-disabled)]">
                Loads from YouTube — protected with user watermark
              </p>
            ) : (
              <p className="text-[10px] text-[var(--accent)]">
                Direct Upload Stream — anti-piracy enabled
              </p>
            )}
          </div>
        ) : (
          <>
            {youtube ? (
              <iframe
                src={embedUrl}
                title={title ?? 'Lesson video'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            ) : (
              /* Native video for direct MP4 / WebM uploaded URLs */
              <video
                src={embedUrl}
                controls
                autoPlay
                controlsList="nodownload"
                className="absolute inset-0 w-full h-full"
              />
            )}
            {/* Dynamic Anti-Piracy User ID Watermark Overlay */}
            <WatermarkOverlay />
          </>
        )}
      </div>

      {/* External link for accessibility */}
      <div className="flex justify-end mt-1.5">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-[var(--text-disabled)] hover:text-[var(--accent)] transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Open in new tab
        </a>
      </div>
    </div>
  );
}
