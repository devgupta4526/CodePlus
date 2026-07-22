'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phase, Section, TAGS } from '@/data/roadmapJava';
import { Code2, CheckCircle2, Circle } from 'lucide-react';

interface JavaVisualPathProps {
  phases: Phase[];
  progress: Record<string, boolean>;
  onSelectSection: (section: Section, phaseColor: string) => void;
  toggleItem: (id: string) => void;
}

export function JavaVisualPath({ phases, progress, onSelectSection, toggleItem }: JavaVisualPathProps) {
  return (
    <div className="relative py-8 px-2 md:px-6">
      <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-amber-500 -translate-x-1/2 rounded-full opacity-20 hidden md:block" />

      <div className="space-y-16 relative z-10">
        {phases.map((phase, pIdx) => {
          let totalSubs = 0;
          let doneSubs = 0;

          phase.sections.forEach((section) => {
            section.vids.forEach((vid, vIdx) => {
              vid.subs.forEach((_, sIdx) => {
                totalSubs++;
                const id = `java-${section.id}-${vIdx}-${sIdx}`;
                if (progress[id]) doneSubs++;
              });
            });
          });

          const pct = totalSubs > 0 ? Math.round((doneSubs / totalSubs) * 100) : 0;

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: pIdx * 0.1 }}
              className="space-y-6"
            >
              {/* Phase Milestone Header */}
              <div className="flex flex-col items-center justify-center text-center">
                <div 
                  className="px-5 py-2.5 rounded-full border border-[var(--border-color)] bg-[var(--surface-elevated)] backdrop-blur-xl shadow-xl flex items-center gap-3 relative group transition-all duration-300 hover:scale-105"
                  style={{ borderColor: `${phase.color}40` }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg"
                    style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                  >
                    {phase.icon}
                  </div>
                  <div className="text-left">
                    <span 
                      className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${phase.color}20`, color: phase.color }}
                    >
                      {pct}% Completed
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
                      {phase.label}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Sections Flow */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {phase.sections.map((section) => {
                  let secTotal = 0;
                  let secDone = 0;

                  section.vids.forEach((vid, vIdx) => {
                    vid.subs.forEach((_, sIdx) => {
                      secTotal++;
                      if (progress[`java-${section.id}-${vIdx}-${sIdx}`]) secDone++;
                    });
                  });

                  const isSecDone = secTotal > 0 && secDone === secTotal;

                  return (
                    <motion.div
                      key={section.id}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={`relative bg-[var(--surface)] border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-lg ${
                        isSecDone 
                          ? 'border-emerald-500/40 bg-emerald-500/5 shadow-emerald-500/5' 
                          : 'border-[var(--border-color)] hover:border-blue-500/50'
                      }`}
                    >
                      <div 
                        className="absolute top-0 left-6 right-6 h-0.5 rounded-t-full"
                        style={{ backgroundColor: phase.color }}
                      />

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
                            {section.vids.length} Lessons
                          </span>
                          <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--background)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                            {secDone}/{secTotal} checked
                          </span>
                        </div>

                        <h4 className="font-heading font-bold text-base text-[var(--text-primary)] mb-2">
                          {section.title}
                        </h4>

                        <div className="space-y-1.5 mb-4">
                          {section.vids.slice(0, 2).map((vid, idx) => (
                            <div key={idx} className="text-xs text-[var(--text-secondary)] flex items-center justify-between bg-[var(--background)] px-2.5 py-1.5 rounded-lg border border-[var(--border-color)]">
                              <span className="truncate max-w-[180px]">{vid.title}</span>
                              <span className="text-[10px] font-mono text-[var(--text-muted)]">{vid.dur}</span>
                            </div>
                          ))}
                          {section.vids.length > 2 && (
                            <span className="text-[10px] text-[var(--text-muted)] italic block pl-1">
                              +{section.vids.length - 2} more lessons inside
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectSection(section, phase.color)}
                        className="w-full py-2 px-3 rounded-xl bg-[var(--surface-elevated)] hover:bg-blue-600 hover:text-white border border-[var(--border-color)] hover:border-transparent text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 flex items-center justify-center gap-1.5 mt-2"
                      >
                        <Code2 className="w-3.5 h-3.5" /> Inspect Section Blueprint
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
