'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PythonPhase, Day } from '@/data/roadmapPython';
import { Code2, Sparkles } from 'lucide-react';

interface PythonVisualPathProps {
  phases: PythonPhase[];
  progress: Record<string, boolean>;
  onSelectDay: (day: Day, phaseColor: string) => void;
  toggleItem: (id: string) => void;
}

export function PythonVisualPath({ phases, progress, onSelectDay }: PythonVisualPathProps) {
  return (
    <div className="relative py-8 px-2 md:px-6">
      <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-cyan-500 via-emerald-500 to-amber-500 -translate-x-1/2 rounded-full opacity-20 hidden md:block" />

      <div className="space-y-16 relative z-10">
        {phases.map((phase, pIdx) => {
          let totalSubs = 0;
          let doneSubs = 0;

          phase.daysList.forEach((day) => {
            day.topics.forEach((topic, tIdx) => {
              topic.subs.forEach((_, sIdx) => {
                totalSubs++;
                const id = `python-d${day.d}-${tIdx}-${sIdx}`;
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
              {/* Milestone Header */}
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
                      {phase.days} • {pct}% Done
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
                      {phase.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Days List Flow Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {phase.daysList.map((day) => {
                  let dayTotal = 0;
                  let dayDone = 0;

                  day.topics.forEach((topic, tIdx) => {
                    topic.subs.forEach((_, sIdx) => {
                      dayTotal++;
                      if (progress[`python-d${day.d}-${tIdx}-${sIdx}`]) dayDone++;
                    });
                  });

                  const isCapstone = day.type === 'capstone';

                  return (
                    <motion.div
                      key={day.d}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={`relative bg-[var(--surface)] border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-lg ${
                        isCapstone 
                          ? 'border-amber-500/50 bg-amber-500/5 shadow-amber-500/10' 
                          : 'border-[var(--border-color)] hover:border-cyan-500/50'
                      }`}
                    >
                      <div 
                        className="absolute top-0 left-6 right-6 h-0.5 rounded-t-full"
                        style={{ backgroundColor: phase.color }}
                      />

                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                            isCapstone ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          }`}>
                            Day {day.d} {isCapstone && '• Capstone'}
                          </span>
                          <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--background)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                            {dayDone}/{dayTotal} checked
                          </span>
                        </div>

                        <h4 className="font-heading font-bold text-base text-[var(--text-primary)] mb-2 flex items-center gap-1.5">
                          {day.title}
                          {isCapstone && <Sparkles className="w-4 h-4 text-amber-400" />}
                        </h4>

                        <div className="space-y-1.5 mb-4">
                          {day.topics.map((t, idx) => (
                            <div key={idx} className="text-xs text-[var(--text-secondary)] bg-[var(--background)] px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] truncate">
                              • {t.n}
                            </div>
                          ))}
                        </div>

                        {day.project && (
                          <div className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--background)] p-2 rounded-lg border border-[var(--border-color)] mb-3">
                            <span className="text-amber-400 font-bold">Project:</span> {day.project.name}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => onSelectDay(day, phase.color)}
                        className="w-full py-2 px-3 rounded-xl bg-[var(--surface-elevated)] hover:bg-cyan-600 hover:text-white border border-[var(--border-color)] hover:border-transparent text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 flex items-center justify-center gap-1.5 mt-2"
                      >
                        <Code2 className="w-3.5 h-3.5" /> Inspect Day Blueprint
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
