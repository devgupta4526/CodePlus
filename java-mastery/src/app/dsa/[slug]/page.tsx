import { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { ArrowLeft, ExternalLink, Sparkles, Monitor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DSA Interactive Masterclass | CodePulse',
  description: 'Interactive deep dives into Data Structures and Algorithms with visual dry runs and code templates.',
};

const MASTERCLASS_TITLES: Record<string, string> = {
  'bitmask_dp_patterns_deep_dive': 'Bitmask DP Patterns Deep Dive',
  'cp_9patterns_java_masterclass': 'CP 9 Patterns Java Masterclass',
  'dp_trees_problem_ladder': 'DP on Trees & Re-rooting Pattern',
};

export default async function DsaMasterclassPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const title = MASTERCLASS_TITLES[slug] || 'DSA Masterclass Visualizer';
  const iframeSrc = `/dsa/${slug}.html`;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0C] text-white">
      <Navbar />
      
      {/* Masterclass Toolbar Header */}
      <div className="sticky top-16 z-40 border-b border-[var(--border-color)] bg-[#111214]/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-emerald-500/40 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Roadmaps
            </Link>

            <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-sm sm:text-base font-heading font-bold text-white tracking-tight truncate max-w-md">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={iframeSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 text-xs font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Fullscreen View
            </a>
          </div>
        </div>
      </div>

      {/* Main Interactive Viewer Shell */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 flex flex-col">
        <div className="flex-1 w-full min-h-[80vh] rounded-2xl border border-[var(--border-color)] bg-[#18191B] overflow-hidden shadow-2xl relative">
          <iframe 
            src={iframeSrc}
            className="w-full h-full min-h-[80vh] border-none bg-transparent"
            title={title}
          />
        </div>
      </main>
    </div>
  );
}
