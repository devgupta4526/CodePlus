'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  DSA_PHASES, 
  DSA_MASTERCLASSES, 
  DsaTopic, 
  DsaPhase 
} from '@/data/roadmapDsa';
import { DsaVisualPath } from './DsaVisualPath';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ExternalLink, 
  Code2, 
  Copy, 
  Check, 
  BookOpen, 
  Zap, 
  Layers, 
  Compass, 
  X,
  Clock,
  HardDrive
} from 'lucide-react';

interface DsaRoadmapViewProps {
  progress: Record<string, boolean>;
  toggleItem: (id: string) => void;
}

export function DsaRoadmapView({ progress, toggleItem }: DsaRoadmapViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'path'>('list');
  const [activeModalTopic, setActiveModalTopic] = useState<DsaTopic | null>(null);

  // Compute stats
  const { totalItems, completedItems, percent } = useMemo(() => {
    let total = 0;
    let completed = 0;

    DSA_PHASES.forEach((phase) => {
      phase.topics.forEach((topic) => {
        topic.subItems.forEach((_, sIdx) => {
          total++;
          const id = `dsa-${topic.id}-${sIdx}`;
          if (progress[id]) completed++;
        });
      });
    });

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalItems: total, completedItems: completed, percent: pct };
  }, [progress]);

  // Filtered phases and topics
  const filteredPhases = useMemo(() => {
    return DSA_PHASES.map((phase) => {
      const filteredTopics = phase.topics.filter((topic) => {
        const matchesSearch = 
          topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          topic.keyConcepts.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
          topic.problems.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesDifficulty = 
          selectedDifficulty === 'all' || 
          topic.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

        return matchesSearch && matchesDifficulty;
      });

      return {
        ...phase,
        topics: filteredTopics,
      };
    }).filter(phase => phase.topics.length > 0);
  }, [searchQuery, selectedDifficulty]);

  return (
    <div className="space-y-10">
      {/* Overall Stats Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950/40 via-[var(--surface-elevated)] to-blue-950/40 border border-emerald-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" /> Comprehensive DSA Mastery Path
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[var(--text-primary)] tracking-tight">
              Data Structures & Algorithms Masterclass
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Step-by-step ladder from core data structures to advanced competitive programming paradigms, interactive dry runs, and LeetCode blueprint patterns.
            </p>
          </div>

          {/* Progress Card */}
          <div className="w-full md:w-72 bg-[var(--surface)] border border-[var(--border-color)] p-5 rounded-2xl space-y-3 shadow-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">DSA Progress</span>
              <span className="text-lg font-mono font-bold text-emerald-400">{percent}%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-3 bg-[var(--background)] rounded-full overflow-hidden border border-[var(--border-color)]">
              <motion.div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between text-xs text-[var(--text-secondary)]">
              <span>{completedItems} of {totalItems} concepts checked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Masterclasses Spotlight */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-heading font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> Interactive Masterclass Modules
          </h3>
          <span className="text-xs text-[var(--text-muted)]">3 Deep Dive Visual Modules</span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {DSA_MASTERCLASSES.map((mc) => (
            <Link
              key={mc.id}
              href={mc.url}
              className="group relative bg-[var(--surface)] border border-[var(--border-color)] hover:border-emerald-500/50 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between"
            >
              <div 
                className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl transition-opacity group-hover:opacity-100 opacity-70"
                style={{ backgroundColor: mc.color }}
              />
              <div>
                <div className="flex items-center justify-between mb-3 pl-2">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold shadow-md"
                    style={{ backgroundColor: `${mc.color}20`, color: mc.color }}
                  >
                    {mc.icon}
                  </div>
                  <span 
                    className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border"
                    style={{ backgroundColor: `${mc.color}15`, borderColor: `${mc.color}30`, color: mc.color }}
                  >
                    {mc.tag}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors pl-2 mb-2">
                  {mc.title}
                </h4>
                <p className="text-xs text-[var(--text-secondary)] pl-2 leading-relaxed mb-4">
                  {mc.desc}
                </p>
              </div>

              <div className="pl-2 pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
                <span className="text-[11px] font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Launch Masterclass <ExternalLink className="w-3 h-3" />
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {mc.topicsCount} Interactive Topics
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Filter, Search & View Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border-color)] shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search topic, algorithm, or LeetCode problem..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500/60 transition-colors"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Difficulty Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'beginner', 'intermediate', 'advanced', 'hardcore'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider capitalize transition-all duration-200 ${
                selectedDifficulty === diff
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-[var(--background)] p-1 rounded-xl border border-[var(--border-color)] flex-shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-[var(--surface-elevated)] text-emerald-400 shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Accordion
          </button>
          <button
            onClick={() => setViewMode('path')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'path'
                ? 'bg-[var(--surface-elevated)] text-emerald-400 shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Visual Path
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'path' ? (
        <DsaVisualPath
          phases={filteredPhases}
          progress={progress}
          onSelectTopic={(topic) => setActiveModalTopic(topic)}
          toggleItem={toggleItem}
        />
      ) : (
        <div className="space-y-8">
          {filteredPhases.map((phase) => (
            <DsaPhaseAccordion
              key={phase.id}
              phase={phase}
              progress={progress}
              toggleItem={toggleItem}
              onOpenModal={(topic) => setActiveModalTopic(topic)}
            />
          ))}

          {filteredPhases.length === 0 && (
            <div className="text-center py-16 bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl space-y-3">
              <Search className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
              <h4 className="text-lg font-bold text-[var(--text-primary)]">No matching DSA topics found</h4>
              <p className="text-xs text-[var(--text-muted)]">Try adjusting your search query or difficulty filters.</p>
            </div>
          )}
        </div>
      )}

      {/* Topic Blueprint Drawer Modal */}
      <AnimatePresence>
        {activeModalTopic && (
          <TopicBlueprintModal
            topic={activeModalTopic}
            onClose={() => setActiveModalTopic(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function DsaPhaseAccordion({ 
  phase, 
  progress, 
  toggleItem, 
  onOpenModal 
}: { 
  phase: DsaPhase; 
  progress: Record<string, boolean>; 
  toggleItem: (id: string) => void;
  onOpenModal: (topic: DsaTopic) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Compute phase completion
  let phaseTotal = 0;
  let phaseDone = 0;
  phase.topics.forEach((t) => {
    t.subItems.forEach((_, sIdx) => {
      phaseTotal++;
      if (progress[`dsa-${t.id}-${sIdx}`]) phaseDone++;
    });
  });
  const phasePct = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl overflow-hidden relative shadow-lg">
      <div 
        className="absolute top-0 left-0 w-2 h-full"
        style={{ backgroundColor: phase.color }}
      />

      {/* Phase Header Bar */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-6 md:p-8 flex items-center justify-between cursor-pointer hover:bg-[var(--surface-elevated)]/50 transition-colors pl-8"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-md"
            style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
          >
            {phase.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)]">
                {phase.title}
              </h3>
              <span 
                className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border"
                style={{ backgroundColor: `${phase.color}15`, borderColor: `${phase.color}30`, color: phase.color }}
              >
                {phase.badge}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] hidden md:block max-w-2xl">
              {phase.summary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-mono font-bold text-emerald-400">{phasePct}%</span>
            <span className="text-[11px] text-[var(--text-muted)]">{phaseDone}/{phaseTotal} checked</span>
          </div>
          <ChevronDown className={`w-6 h-6 text-[var(--text-muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

      {/* Accordion Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-[var(--border-color)]"
          >
            <div className="p-6 md:p-8 pt-6 space-y-6">
              {phase.topics.map((topic) => (
                <DsaTopicCard
                  key={topic.id}
                  topic={topic}
                  color={phase.color}
                  progress={progress}
                  toggleItem={toggleItem}
                  onOpenModal={() => onOpenModal(topic)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DsaTopicCard({ 
  topic, 
  color, 
  progress, 
  toggleItem,
  onOpenModal
}: { 
  topic: DsaTopic; 
  color: string; 
  progress: Record<string, boolean>; 
  toggleItem: (id: string) => void;
  onOpenModal: () => void;
}) {
  return (
    <div className="bg-[var(--background)] border border-[var(--border-color)] rounded-2xl p-5 hover:border-[var(--accent)]/40 transition-all duration-200 space-y-4">
      {/* Top Meta Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${
            topic.difficulty === 'Beginner' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
            topic.difficulty === 'Intermediate' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' :
            topic.difficulty === 'Advanced' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' :
            'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-extrabold'
          }`}>
            {topic.difficulty}
          </span>
          <h4 className="font-heading font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
            {topic.title}
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" /> Inspect Code Blueprint
          </button>

          {topic.masterclassUrl && (
            <Link
              href={topic.masterclassUrl}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 text-xs font-semibold border border-purple-500/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" /> Masterclass <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
        {topic.desc}
      </p>

      {/* Complexity & Concepts Badges */}
      <div className="flex flex-wrap gap-2 text-xs font-mono text-[var(--text-muted)]">
        <span className="bg-[var(--surface)] px-2.5 py-1 rounded-lg border border-[var(--border-color)] flex items-center gap-1 text-[11px]">
          <Clock className="w-3 h-3 text-emerald-400" /> {topic.timeComplexity}
        </span>
        <span className="bg-[var(--surface)] px-2.5 py-1 rounded-lg border border-[var(--border-color)] flex items-center gap-1 text-[11px]">
          <HardDrive className="w-3 h-3 text-blue-400" /> {topic.spaceComplexity}
        </span>
      </div>

      {/* Checkable Sub-Items List */}
      <div className="space-y-2 pt-2">
        {topic.subItems.map((sub, sIdx) => {
          const itemId = `dsa-${topic.id}-${sIdx}`;
          const isDone = progress[itemId] || false;

          return (
            <div 
              key={sIdx}
              onClick={() => toggleItem(itemId)}
              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[var(--surface)] transition-colors cursor-pointer group"
            >
              <button className="mt-0.5 text-[var(--text-muted)] group-hover:text-emerald-400 transition-colors">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </button>
              <span className={`text-xs leading-relaxed transition-all ${isDone ? 'line-through opacity-50 text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'}`}>
                {sub}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TopicBlueprintModal({ 
  topic, 
  onClose 
}: { 
  topic: DsaTopic; 
  onClose: () => void; 
}) {
  const [activeLang, setActiveLang] = useState<'java' | 'python'>('java');
  const [copied, setCopied] = useState(false);

  const currentCode = activeLang === 'java' ? topic.javaCode : topic.pythonCode;

  const copyCode = () => {
    if (currentCode) {
      navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--surface-elevated)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                topic.difficulty === 'Beginner' ? 'bg-emerald-500/15 text-emerald-400' :
                topic.difficulty === 'Intermediate' ? 'bg-blue-500/15 text-blue-400' :
                topic.difficulty === 'Advanced' ? 'bg-purple-500/15 text-purple-400' : 'bg-amber-500/15 text-amber-400'
              }`}>
                {topic.difficulty}
              </span>
              <h3 className="font-heading font-bold text-xl text-[var(--text-primary)]">
                {topic.title}
              </h3>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">{topic.desc}</p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Complexity Summary */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Time Complexity</span>
              <p className="text-sm font-mono font-bold text-emerald-400">{topic.timeComplexity}</p>
            </div>
            <div className="bg-[var(--background)] p-4 rounded-2xl border border-[var(--border-color)] space-y-1">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Space Complexity</span>
              <p className="text-sm font-mono font-bold text-blue-400">{topic.spaceComplexity}</p>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Key Core Concepts</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {topic.keyConcepts.map((concept, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[var(--text-secondary)] bg-[var(--background)] px-3 py-2 rounded-xl border border-[var(--border-color)]">
                  <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{concept}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Code Blueprint Implementation */}
          {currentCode && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-[var(--background)] p-1 rounded-xl border border-[var(--border-color)]">
                  <button
                    onClick={() => setActiveLang('java')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeLang === 'java' ? 'bg-amber-500/20 text-amber-300' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    ☕ Java Blueprint
                  </button>
                  <button
                    onClick={() => setActiveLang('python')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      activeLang === 'python' ? 'bg-blue-500/20 text-blue-300' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    🐍 Python Blueprint
                  </button>
                </div>

                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-emerald-400 bg-[var(--background)] px-3 py-1.5 rounded-xl border border-[var(--border-color)] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
              </div>

              <pre className="bg-[#0b0c10] border border-[var(--border-color)] rounded-2xl p-4 overflow-x-auto text-xs font-mono text-emerald-300/90 leading-relaxed">
                <code>{currentCode}</code>
              </pre>
            </div>
          )}

          {/* LeetCode Problem Ladder */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Essential LeetCode Problem Ladder
            </h4>
            <div className="space-y-2">
              {topic.problems.map((prob, idx) => (
                <a
                  key={idx}
                  href={prob.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)] hover:bg-[var(--surface-elevated)] border border-[var(--border-color)] hover:border-emerald-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[var(--surface)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-emerald-400 transition-colors">
                      {prob.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      prob.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-400' :
                      prob.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-400' : 'bg-red-500/15 text-red-400'
                    }`}>
                      {prob.difficulty}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-emerald-400 transition-colors" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
