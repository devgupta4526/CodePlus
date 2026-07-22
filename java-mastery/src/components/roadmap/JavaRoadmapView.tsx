'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ALL_PHASES, TAGS, Phase, Section } from '@/data/roadmapJava';
import { JavaVisualPath } from './JavaVisualPath';
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
  Coffee,
  Check
} from 'lucide-react';

interface JavaRoadmapViewProps {
  progress: Record<string, boolean>;
  toggleItem: (id: string) => void;
}

export function JavaRoadmapView({ progress, toggleItem }: JavaRoadmapViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'path'>('list');
  const [activeModalSection, setActiveModalSection] = useState<{ section: Section; color: string } | null>(null);

  // Compute stats
  const { totalItems, completedItems, percent } = useMemo(() => {
    let total = 0;
    let completed = 0;

    ALL_PHASES.forEach((phase) => {
      phase.sections.forEach((section) => {
        section.vids.forEach((vid, vIdx) => {
          vid.subs.forEach((_, sIdx) => {
            total++;
            const id = `java-${section.id}-${vIdx}-${sIdx}`;
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
    return ALL_PHASES.map((phase) => {
      const filteredSections = phase.sections.map((section) => {
        const filteredVids = section.vids.map((vid) => {
          const filteredSubs = vid.subs.filter((sub) => {
            const matchesSearch = 
              sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
              vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              section.title.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = 
              selectedTag === 'all' || 
              sub.includes(`[${selectedTag.toUpperCase()}]`);

            return matchesSearch && matchesTag;
          });

          return { ...vid, subs: filteredSubs };
        }).filter(vid => vid.subs.length > 0);

        return { ...section, vids: filteredVids };
      }).filter(sec => sec.vids.length > 0);

      return { ...phase, sections: filteredSections };
    }).filter(phase => phase.sections.length > 0);
  }, [searchQuery, selectedTag]);

  return (
    <div className="space-y-10">
      {/* Overall Stats Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-950/40 via-[var(--surface-elevated)] to-indigo-950/40 border border-blue-500/20 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Coffee className="w-3.5 h-3.5" /> Enterprise Java & Spring Architecture
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-[var(--text-primary)] tracking-tight">
              Java & Spring Boot Architect Path
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Complete curriculum covering OOP fundamentals, JVM memory internals, Spring Boot IoC, Data JPA, Security, Microservices, and Cloud Native deployment.
            </p>
          </div>

          {/* Progress Card */}
          <div className="w-full md:w-72 bg-[var(--surface)] border border-[var(--border-color)] p-5 rounded-2xl space-y-3 shadow-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Java Progress</span>
              <span className="text-lg font-mono font-bold text-blue-400">{percent}%</span>
            </div>
            <div className="w-full h-3 bg-[var(--background)] rounded-full overflow-hidden border border-[var(--border-color)]">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
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
            placeholder="Search Java topic, Spring annotation, or feature..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500/60 transition-colors"
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

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['all', 'int', 'prod', 'new', 'proj'].map((tagKey) => (
            <button
              key={tagKey}
              onClick={() => setSelectedTag(tagKey)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedTag === tagKey
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border-color)]'
              }`}
            >
              {tagKey === 'all' ? 'All Tags' : TAGS[tagKey.toUpperCase()]?.label || tagKey}
            </button>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-[var(--background)] p-1 rounded-xl border border-[var(--border-color)] flex-shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'list'
                ? 'bg-[var(--surface-elevated)] text-blue-400 shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Accordion
          </button>
          <button
            onClick={() => setViewMode('path')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              viewMode === 'path'
                ? 'bg-[var(--surface-elevated)] text-blue-400 shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Visual Path
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'path' ? (
        <JavaVisualPath
          phases={filteredPhases}
          progress={progress}
          onSelectSection={(section, color) => setActiveModalSection({ section, color })}
          toggleItem={toggleItem}
        />
      ) : (
        <div className="space-y-8">
          {filteredPhases.map((phase) => (
            <JavaPhaseAccordion
              key={phase.id}
              phase={phase}
              progress={progress}
              toggleItem={toggleItem}
              onSelectSection={(section) => setActiveModalSection({ section, color: phase.color })}
            />
          ))}

          {filteredPhases.length === 0 && (
            <div className="text-center py-16 bg-[var(--surface)] border border-[var(--border-color)] rounded-3xl space-y-3">
              <Search className="w-10 h-10 text-[var(--text-muted)] mx-auto" />
              <h4 className="text-lg font-bold text-[var(--text-primary)]">No matching Java concepts found</h4>
              <p className="text-xs text-[var(--text-muted)]">Try adjusting your search query or tag filter.</p>
            </div>
          )}
        </div>
      )}

      {/* Section Blueprint Drawer Modal */}
      <AnimatePresence>
        {activeModalSection && (
          <JavaSectionModal
            section={activeModalSection.section}
            color={activeModalSection.color}
            progress={progress}
            toggleItem={toggleItem}
            onClose={() => setActiveModalSection(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function JavaPhaseAccordion({ 
  phase, 
  progress, 
  toggleItem,
  onSelectSection
}: { 
  phase: Phase; 
  progress: Record<string, boolean>; 
  toggleItem: (id: string) => void;
  onSelectSection: (section: Section) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  let phaseTotal = 0;
  let phaseDone = 0;
  phase.sections.forEach((sec) => {
    sec.vids.forEach((vid, vIdx) => {
      vid.subs.forEach((_, sIdx) => {
        phaseTotal++;
        if (progress[`java-${sec.id}-${vIdx}-${sIdx}`]) phaseDone++;
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
            <h3 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)]">
              {phase.label}
            </h3>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              {phase.sections.length} Module Sections
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-mono font-bold text-blue-400">{phasePct}%</span>
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
              {phase.sections.map((section, sIdx) => (
                <div key={section.id} className="border border-[var(--border-color)] rounded-2xl p-5 bg-[var(--background)] space-y-4">
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-color)]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center text-xs font-bold text-[var(--text-secondary)]">
                        {sIdx + 1}
                      </div>
                      <h4 className="font-heading font-bold text-lg text-[var(--text-primary)]">
                        {section.title}
                      </h4>
                    </div>

                    <button
                      onClick={() => onSelectSection(section)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/30 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5" /> Inspect Blueprint
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {section.vids.map((vid, vIdx) => (
                      <div key={vIdx} className="bg-[var(--surface)] border border-[var(--border-color)] rounded-xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-sm text-[var(--text-primary)]">{vid.title}</h5>
                          <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--background)] px-2 py-0.5 rounded">
                            {vid.dur}
                          </span>
                        </div>

                        <ul className="space-y-2">
                          {vid.subs.map((sub, subIdx) => {
                            let cleanSub = sub;
                            let tagBadge = null;

                            const tagMatch = sub.match(/\[(INT|PROD|NEW|PROJ)\]/);
                            if (tagMatch) {
                              const tagKey = tagMatch[1];
                              const tag = TAGS[tagKey];
                              cleanSub = sub.replace(`[${tagKey}]`, '').trim();

                              if (tag) {
                                tagBadge = (
                                  <span 
                                    className="ml-2 px-2 py-0.5 text-[9px] font-extrabold rounded uppercase tracking-wider"
                                    style={{ backgroundColor: tag.bg, color: tag.color }}
                                  >
                                    {tag.label}
                                  </span>
                                );
                              }
                            }

                            const itemId = `java-${section.id}-${vIdx}-${subIdx}`;
                            const isDone = progress[itemId] || false;

                            return (
                              <li key={subIdx} className="flex items-start text-xs leading-relaxed text-[var(--text-secondary)]">
                                <button
                                  onClick={() => toggleItem(itemId)}
                                  className="mr-2.5 mt-0.5 text-[var(--text-muted)] hover:text-blue-400 transition-colors flex-shrink-0"
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                  ) : (
                                    <Circle className="w-3.5 h-3.5" />
                                  )}
                                </button>
                                <span className={isDone ? 'line-through opacity-50' : ''}>
                                  {cleanSub}
                                  {tagBadge}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function JavaSectionModal({ 
  section, 
  color, 
  progress, 
  toggleItem, 
  onClose 
}: { 
  section: Section; 
  color: string; 
  progress: Record<string, boolean>; 
  toggleItem: (id: string) => void; 
  onClose: () => void; 
}) {
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
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
              Java Module Blueprint
            </span>
            <h3 className="font-heading font-bold text-xl text-[var(--text-primary)] mt-1">
              {section.title}
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
            {section.vids.map((vid, vIdx) => (
              <div key={vIdx} className="bg-[var(--background)] p-5 rounded-2xl border border-[var(--border-color)] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base text-[var(--text-primary)]">{vid.title}</h4>
                  <span className="text-xs font-mono text-[var(--text-muted)] bg-[var(--surface)] px-2.5 py-1 rounded-md border border-[var(--border-color)]">
                    ⏱️ {vid.dur}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-[var(--border-color)]">
                  {vid.subs.map((sub, sIdx) => {
                    const itemId = `java-${section.id}-${vIdx}-${sIdx}`;
                    const isDone = progress[itemId] || false;

                    return (
                      <div 
                        key={sIdx}
                        onClick={() => toggleItem(itemId)}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-[var(--surface)] transition-colors cursor-pointer"
                      >
                        <button className="mt-0.5 text-[var(--text-muted)] hover:text-blue-400">
                          {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Circle className="w-4 h-4" />}
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

          <div className="pt-4 border-t border-[var(--border-color)] flex justify-end">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
            >
              <BookOpen className="w-4 h-4" /> Go to Course Lessons
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
