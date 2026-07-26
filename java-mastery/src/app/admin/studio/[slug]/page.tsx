'use client';

import { useParams } from 'next/navigation';

export default function NativeTeachingStudioPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="h-screen w-screen bg-[#0B0B0C] overflow-hidden relative">
      <iframe
        src={`/teaching-studio/java-teaching-studio.html?lesson=${slug}`}
        className="absolute inset-0 w-full h-full border-none"
        title="Java Teaching Studio"
        allow="fullscreen"
      />
    </div>
  );
}
