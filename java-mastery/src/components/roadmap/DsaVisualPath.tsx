'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DsaPhase, DsaTopic } from '@/data/roadmapDsa';
import { CheckCircle2, Circle, Sparkles, ExternalLink, Code2 } from 'lucide-react';

interface DsaVisualPathProps {
  phases: DsaPhase[];
  progress: Record<string, boolean>;
  onSelectTopic: (topic: DsaTopic) => void;
  toggleItem: (id: string) => void;
}

export function DsaVisualPath({ phases, progress, onSelectTopic, toggleItem }: DsaVisualPathProps) {
  return (
    <div className="relative py-8 px-2 md:px-6">
      {/* Central Connector Line */}
      <div className="absolute left-1/2 top-12 bottom-12 w-1 bg-gradient-to-b from-emerald-500 via-blue-500 to-amber-500 -translate-x-1/2 rounded-full opacity-20 hidden md:block" />

      <div className="space-y-16 relative z-10">
        {phases.map((phase, pIdx) => {
          // Calculate phase progress
          let totalSubItems = 0;
          let completedSubItems = 0;
          phase.topics.forEach((topic) => {
            topic.subItems.forEach((_, sIdx) => {
              totalSubItems++;
              const id = `dsa-${topic.id}-${sIdx}`;
              if (progress[id]) completedSubItems++;
            });
          });

          const phasePct = totalSubItems > 0 ? Math.round((completedSubItems / totalSubItems) * 100) : 0;
          const isLeft = pIdx % 2 === 0;

          return (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: pIdx * 0.1 }}
              className="space-y-6"
            >
              {/* Phase Milestone Banner */}
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
                      {phase.badge} • {phasePct}% Done
                    </span>
                    <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
                      {phase.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Topics Grid Flow */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {phase.topics.map((topic) => {
                  let topicDoneCount = 0;
                  topic.subItems.forEach((_, sIdx) => {
                    if (progress[`dsa-${topic.id}-${sIdx}`]) topicDoneCount++;
                  });

                  const isTopicFullyDone = topic.subItems.length > 0 && topicDoneCount === topic.subItems.length;

                  return (
                    <motion.div
                      key={topic.id}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className={`relative bg-[var(--surface)] border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-lg ${
                        isTopicFullyDone 
                          ? 'border-emerald-500/40 bg-emerald-500/5 shadow-emerald-500/5' 
                          : 'border-[var(--border-color)] hover:border-[var(--accent)]/50'
                      }`}
                    >
                      {/* Topic Card Top Accent */}
                      <div 
                        className="absolute top-0 left-6 right-6 h-0.5 rounded-t-full"
                        style={{ backgroundColor: phase.color }}
                      />

                      <div>
                        {/* Header Badge Row */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                            topic.difficulty === 'Beginner' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' :
                            topic.difficulty === 'Intermediate' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' :
                            topic.difficulty === 'Advanced' ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30' :
                            'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-extrabold'
                          }`}>
                            {topic.difficulty}
                          </span>

                          <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--background)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                            {topicDoneCount}/{topic.subItems.length} checked
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-heading font-bold text-base text-[var(--text-primary)] mb-1.5 flex items-center gap-2">
                          {topic.title}
                          {topic.masterclassUrl && (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 font-sans font-medium">
                              <Sparkles className="w-3 h-3" /> Masterclass
                            </span>
                          )}
                        </h4>

                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-4">
                          {topic.desc}
                        </p>

                        {/* Time & Space Complexity preview */}
                        <div className="flex flex-wrap gap-1.5 mb-4 text-[11px] font-mono text-[var(--text-muted)]">
                          <span className="bg-[var(--surface-elevated)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                            ⏱️ {topic.timeComplexity}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-color)]">
                        <button
                          onClick={() => onSelectTopic(topic)}
                          className="flex-1 py-2 px-3 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--accent)] hover:text-white border border-[var(--border-color)] hover:border-transparent text-xs font-semibold text-[var(--text-primary)] transition-all duration-200 flex items-center justify-center gap-1.5"
                        >
                          <Code2 className="w-3.5 h-3.5" />
                          View Blueprint
                        </button>
                      </div>
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
