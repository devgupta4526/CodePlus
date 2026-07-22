'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PYTHON_PHASES, PythonPhase, Day } from '@/data/roadmapPython';
import { PythonVisualPath } from './PythonVisualPath';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  Code2, 
  Layers, 
  Compass, 
  X,
  BookOpen,
  Terminal,
  Check
} from 'lucide-react';

interface PythonRoadmapViewProps {
  progress: Record<string, boolean>;
  toggleItem: (id: string) => void;
}

export function PythonRoadmapView({ progress, toggleItem }: PythonRoadmapViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'path'>('list');
  const [activeModalDay, setActiveModalDay] = useState<{ day: Day; color: string } | null>(null);

  // Compute stats
  const { totalItems, completedItems, percent } = useMemo(() => {
    let total = 0;
    let completed = 0;

    PYTHON_PHASES.forEach((phase) => {
      phase.daysList.forEach((day) => {
        day.topics.forEach((topic, tIdx) => {
          topic.subs.forEach((_, sIdx) => {
            total++;
            const id = `python-d${day.d}-${tIdx}-${sIdx}`;
            if (progress[id]) completed++;
          });
        });
      });
    });

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { totalItems: total, completedItems: completed, percent: pct };
  }, [progress]);

  // Filtered phases
  const filteredPhases = useMemo(() => {
    return PYTHON_PHASES.map((phase) => {
      const filteredDays = phase.daysList.map((day) => {
        const filteredTopics = day.topics.map((topic) => {
          const filteredSubs = topic.subs.filter((sub) => {
            const matchesSearch = 
              sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
              topic.n.toLowerCase().includes(searchQuery.toLowerCase()) ||
              day.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (day.project && day.project.name.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag = 
              selectedTag === 'all' || 
              (selectedTag === 'capstone' && day.type === 'capstone') ||
              phase.tag.toLowerCase() === selectedTag.toLowerCase();

            return matchesSearch && matchesTag;
          });

          return { ...topic, subs: filteredSubs };
        }).filter(t => t.subs.length > 0);

        return { ...day, topics: filteredTopics };
      }).filter(d => d.topics.length > 0);

      return { ...phase, daysList: filteredDays };
    }).filter(phase => phase.daysList.length > 0);
  }, [searchQuery, selectedTag]);

  return (
    <div className="space-y-10">
      {/* Overall Stats Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-950/40 via-[var(--surface-elevated)] to-blue-950/40 border border-cyan-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5" /> Full Stack Python & Django Architecture
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[var(--text-primary)] tracking-tight">
              Python & Django Masterclass Path
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Step-by-step 37-day roadmap from Python core, Django, DRF, FastAPI, GraphQL, Celery, Kafka, Redis, and AI/LLM Engineering.
            </p>
          </div>

          {/* Progress Card */}
          <div className="w-full md:w-72 bg-[var(--surface)] border border-[var(--border-color)] p-5 rounded-2xl space-y-3 shadow-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Python Progress</span>
              <span className="text-lg font-mono font-bold text-cyan-400">{percent}%</span>
            </div>
            <div className="w-full h-3 bg-[var(--background)] rounded-full overflow-hidden border border-[var(--border-color)]">
              <motion.div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
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

      {/* Filter, Search & View Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border-color)] shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search Python concept, Django feature, or library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-cyan-500/60 transition-colors"
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

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'backend', 'databases', 'ai/ml', 'capstone'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedTag(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider capitalize transition-all duration-200 ${
                selectedTag === cat
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/20'
                  : 'bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-[var(--background)] p-1 rounded-xl border border-[var(--border-color)] flex-shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-[var(--surface-elevated)] text-cyan-400 shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Accordion
          </button>
          <button
            onClick={() => setViewMode('path')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'path'
                ? 'bg-[var(--surface-elevated)] text-cyan-400 shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Visual Path
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'path' ? (
        <PythonVisualPath
          phases={filteredPhases}
          progress={progress}
          onSelectDay={(day, color) => setActiveModalDay({ day, color })}
          toggleItem={toggleItem}
        />
      ) : (
        <div className="space-y-8">
          {filteredPhases.map((phase) => (
            <PythonPhaseAccordion
              key={phase.id}
              phase={phase}
              progress={progress}
              toggleItem={toggleItem}
              onSelectDay={(day) => setActiveModalDay({ day, color: phase.color })}
            />
          ))}

          {filteredPhases.length === 0 && (
            <div className="text-center py-16 bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl space-y-3">
              <Search className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
              <h4 className="text-lg font-bold text-[var(--text-primary)]">No matching Python concepts found</h4>
              <p className="text-xs text-[var(--text-muted)]">Try adjusting your search query or category filter.</p>
            </div>
          )}
        </div>
      )}

      {/* Day Blueprint Drawer Modal */}
      <AnimatePresence>
        {activeModalDay && (
          <PythonDayModal
            day={activeModalDay.day}
            color={activeModalDay.color}
            progress={progress}
            toggleItem={toggleItem}
            onClose={() => setActiveModalDay(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PythonPhaseAccordion({ 
  phase, 
  progress, 
  toggleItem,
  onSelectDay
}: { 
  phase: PythonPhase; 
  progress: Record<string, boolean>; 
  toggleItem: (id: string) => void;
  onSelectDay: (day: Day) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  let phaseTotal = 0;
  let phaseDone = 0;
  phase.daysList.forEach((day) => {
    day.topics.forEach((topic, tIdx) => {
      topic.subs.forEach((_, sIdx) => {
        phaseTotal++;
        if (progress[`python-d${day.d}-${tIdx}-${sIdx}`]) phaseDone++;
      });
    });
  });
  const phasePct = phaseTotal > 0 ? Math.round((phaseDone / phaseTotal) * 100) : 0;

  return (
    <div className="bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl overflow-hidden relative shadow-lg">
      <div 
        className="absolute top-0 left-0 w-2 h-full"
        style={{ backgroundColor: phase.color }}
      />

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
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)]">
                {phase.title}
              </h3>
              <span 
                className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border"
                style={{ backgroundColor: `${phase.color}15`, borderColor: `${phase.color}30`, color: phase.color }}
              >
                {phase.tag}
              </span>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-mono">{phase.days}</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-mono font-bold text-cyan-400">{phasePct}%</span>
            <span className="text-[11px] text-[var(--text-muted)]">{phaseDone}/{phaseTotal} checked</span>
          </div>
          <ChevronDown className={`w-6 h-6 text-[var(--text-muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </div>
      </div>

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
              {phase.daysList.map((day) => {
                const isCapstone = day.type === 'capstone';

                return (
                  <div key={day.d} className={`border rounded-2xl p-5 space-y-4 ${isCapstone ? 'border-amber-500/40 bg-amber-500/5' : 'border-[var(--border-color)] bg-[var(--background)]'}`}>
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${isCapstone ? 'bg-amber-500 text-black font-extrabold' : 'bg-[var(--surface-elevated)] text-[var(--text-secondary)]'}`}>
                          D{day.d}
                        </div>
                        <h4 className="font-heading font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
                          {day.title}
                          {isCapstone && <Sparkles className="w-4 h-4 text-amber-400" />}
                        </h4>
                      </div>

                      <button
                        onClick={() => onSelectDay(day)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs font-semibold border border-cyan-500/30 transition-colors"
                      >
                        <Code2 className="w-3.5 h-3.5" /> Inspect Blueprint
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      {day.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="bg-[var(--surface)] border border-[var(--border-color)] rounded-xl p-4 space-y-3">
                          <h5 className="font-semibold text-sm text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">{topic.n}</h5>

                          <ul className="space-y-2">
                            {topic.subs.map((sub, subIdx) => {
                              const itemId = `python-d${day.d}-${tIdx}-${subIdx}`;
                              const isDone = progress[itemId] || false;

                              return (
                                <li key={subIdx} className="flex items-start text-xs leading-relaxed text-[var(--text-secondary)]">
                                  <button
                                    onClick={() => toggleItem(itemId)}
                                    className="mr-2.5 mt-0.5 text-[var(--text-muted)] hover:text-cyan-400 transition-colors flex-shrink-0"
                                  >
                                    {isDone ? (
                                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                                    ) : (
                                      <Circle className="w-3.5 h-3.5" />
                                    )}
                                  </button>
                                  <span className={isDone ? 'line-through opacity-50' : ''}>
                                    {sub}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {day.project && (
                      <div className="bg-[var(--surface-elevated)] border border-[var(--border-color)] p-4 rounded-xl space-y-2">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-cyan-400" />
                          <h5 className="font-bold text-sm text-[var(--text-primary)]">Project: {day.project.name}</h5>
                        </div>
                        <p className="text-xs text-[var(--text-secondary)]">{day.project.desc}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {day.project.stack.map((tech: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-[var(--background)] border border-[var(--border-color)] text-[var(--text-primary)]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PythonDayModal({ 
  day, 
  color, 
  progress, 
  toggleItem, 
  onClose 
}: { 
  day: Day; 
  color: string; 
  progress: Record<string, boolean>; 
  toggleItem: (id: string) => void; 
  onClose: () => void; 
}) {
  const isCapstone = day.type === 'capstone';

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
        <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--surface-elevated)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${isCapstone ? 'bg-amber-500/20 text-amber-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                Day {day.d} {isCapstone && '• Capstone Module'}
              </span>
            </div>
            <h3 className="font-heading font-bold text-xl text-[var(--text-primary)]">
              {day.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[var(--background)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            {day.topics.map((topic, tIdx) => (
              <div key={tIdx} className="bg-[var(--background)] p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
                <h4 className="font-bold text-base text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">{topic.n}</h4>

                <div className="space-y-2">
                  {topic.subs.map((sub, sIdx) => {
                    const itemId = `python-d${day.d}-${tIdx}-${sIdx}`;
                    const isDone = progress[itemId] || false;

                    return (
                      <div 
                        key={sIdx}
                        onClick={() => toggleItem(itemId)}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--surface)] transition-colors cursor-pointer"
                      >
                        <button className="mt-0.5 text-[var(--text-muted)] hover:text-cyan-400">
                          {isDone ? <CheckCircle2 className="w-4 h-4 text-cyan-400" /> : <Circle className="w-4 h-4" />}
                        </button>
                        <span className={`text-xs leading-relaxed ${isDone ? 'line-through opacity-50' : 'text-[var(--text-secondary)]'}`}>
                          {sub}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {day.project && (
            <div className="bg-[var(--background)] p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-base text-[var(--text-primary)]">Hands-on Project: {day.project.name}</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{day.project.desc}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {day.project.stack.map((tech: string, i: number) => (
                  <span key={i} className="px-2.5 py-1 text-xs font-mono font-medium rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
