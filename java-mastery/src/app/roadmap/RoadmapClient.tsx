'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BookOpen, Coffee, Terminal, Brain } from 'lucide-react';
import Link from 'next/link';
import { useRoadmapProgress } from '@/hooks/useRoadmapProgress';
import { DsaRoadmapView } from '@/components/roadmap/DsaRoadmapView';
import { JavaRoadmapView } from '@/components/roadmap/JavaRoadmapView';
import { PythonRoadmapView } from '@/components/roadmap/PythonRoadmapView';

export default function RoadmapClient() {
  const [activeTab, setActiveTab] = useState<'java' | 'python' | 'dsa'>('java');
  const { progress, toggleItem } = useRoadmapProgress();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface-elevated)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Interactive Architect Learning Paths
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--text-primary)] mb-3 tracking-tight">
            Developer Roadmaps
          </h1>
          <p className="text-base text-[var(--text-secondary)] max-w-2xl">
            Complete curriculum based on your base study files for Java & Spring Boot, Python 60-Day Full Stack, and DSA Masterclasses.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--surface)] hover:border-emerald-500/50 transition-all font-medium text-sm flex-shrink-0 shadow-sm"
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Course Lessons & Notes
        </Link>
      </div>

      {/* Tabs mapped 1:1 to base files */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-[var(--surface-elevated)] p-1.5 rounded-full border border-[var(--border-color)] shadow-inner flex-wrap justify-center gap-1">
          <button
            onClick={() => setActiveTab('java')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'java'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            <Coffee className="w-4 h-4" /> Java & Spring Boot Checklist
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'python'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25 scale-[1.02]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            <Terminal className="w-4 h-4" /> Python 60-Day Roadmap
          </button>
          <button
            onClick={() => setActiveTab('dsa')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'dsa'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 scale-[1.02]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
            }`}
          >
            <Brain className="w-4 h-4" /> DSA Masterclasses & Ladders
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'java' && <JavaRoadmapView progress={progress} toggleItem={toggleItem} />}
          {activeTab === 'python' && <PythonRoadmapView progress={progress} toggleItem={toggleItem} />}
          {activeTab === 'dsa' && <DsaRoadmapView progress={progress} toggleItem={toggleItem} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
