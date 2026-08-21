'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, CheckCircle2, Circle, Clock3, FolderKanban, Layers3 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { GUIDED_PROJECTS } from '@/data/guidedProjects';
import { useLearningState } from '@/hooks/useLearningState';

type TrackFilter = 'All' | 'Java' | 'Spring Boot' | 'Systems';

export function ProjectsWorkspace() {
  const [track, setTrack] = useState<TrackFilter>('All');
  const { state, toggleProjectMilestone } = useLearningState();
  const projects = track === 'All' ? GUIDED_PROJECTS : GUIDED_PROJECTS.filter((project) => project.track === track);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main>
        <header className="border-b border-[var(--border-color)]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 grid lg:grid-cols-[1fr_360px] gap-10 items-end">
            <div>
              <p className="section-kicker">Guided builds</p>
              <h1 className="mt-4 max-w-4xl text-4xl sm:text-6xl font-heading font-bold tracking-[-0.045em]">Turn a sequence of lessons into a working system.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-muted)]">Each project starts with decisions and requirements, then moves through implementation, testing, and explanation. The deliverable matters more than checking a box.</p>
            </div>
            <div className="border-t-2 border-[var(--text-primary)] pt-5 text-sm leading-6 text-[var(--text-muted)]">
              <p className="text-[var(--text-primary)] font-semibold">How guided projects work</p>
              <p className="mt-2">Complete milestones in order, use the linked lessons when you hit a gap, and keep the required deliverable for your portfolio.</p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
          <div className="flex flex-wrap items-center gap-2 mb-10" aria-label="Filter projects by track">
            {(['All', 'Java', 'Spring Boot', 'Systems'] as TrackFilter[]).map((item) => (
              <button key={item} onClick={() => setTrack(item)} className={`px-4 py-2 border text-xs font-mono transition-colors ${track === item ? 'border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg)]' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`} aria-pressed={track === item}>{item}</button>
            ))}
          </div>

          <div className="space-y-12">
            {projects.map((project, projectIndex) => {
              const progress = state.projects[project.id];
              const completed = new Set(progress?.completedMilestones ?? []);
              const percentage = Math.round((completed.size / project.milestones.length) * 100);
              return (
                <section key={project.id} id={project.id} className="scroll-mt-24 grid lg:grid-cols-[320px_1fr] border-t border-[var(--text-primary)]">
                  <div className="py-7 lg:pr-10 lg:border-r border-[var(--border-color)]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[var(--text-disabled)]">{String(projectIndex + 1).padStart(2, '0')} / {project.track}</span>
                      <FolderKanban className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <h2 className="mt-5 text-2xl font-heading font-bold">{project.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">{project.summary}</p>
                    <dl className="mt-6 space-y-3 text-xs">
                      <div className="flex items-center justify-between"><dt className="text-[var(--text-disabled)]">Level</dt><dd>{project.level}</dd></div>
                      <div className="flex items-center justify-between"><dt className="text-[var(--text-disabled)]">Time</dt><dd className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {project.estimatedHours} hours</dd></div>
                      <div className="flex items-center justify-between"><dt className="text-[var(--text-disabled)]">Progress</dt><dd className="font-mono">{percentage}%</dd></div>
                    </dl>
                    <div className="mt-4 h-1 bg-[var(--surface-elevated)]"><div className="h-full bg-[var(--accent)] transition-[width]" style={{ width: `${percentage}%` }} /></div>
                    <div className="mt-5 flex flex-wrap gap-2">{project.skills.map((skill) => <span key={skill} className="border border-[var(--border-color)] px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--text-muted)]">{skill}</span>)}</div>
                    <div className="mt-6 border-l-2 border-[var(--accent)] pl-4"><p className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent)]">Final outcome</p><p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">{project.outcome}</p></div>
                  </div>

                  <div className="lg:pl-10 py-7">
                    <div className="flex items-center justify-between mb-5"><h3 className="text-xs font-mono uppercase tracking-[0.14em] text-[var(--text-muted)]">Milestones</h3><span className="text-xs text-[var(--text-disabled)]">{completed.size} / {project.milestones.length}</span></div>
                    <div className="border-t border-[var(--border-color)]">
                      {project.milestones.map((milestone, milestoneIndex) => {
                        const isComplete = completed.has(milestone.id);
                        return (
                          <article key={milestone.id} className="grid sm:grid-cols-[36px_1fr] gap-4 py-6 border-b border-[var(--border-color)]">
                            <button onClick={() => toggleProjectMilestone(project.id, milestone.id)} className="mt-0.5 h-7 w-7 flex items-center justify-center text-[var(--text-disabled)] hover:text-[var(--accent)]" aria-label={`${isComplete ? 'Reopen' : 'Complete'} ${milestone.title}`}>
                              {isComplete ? <CheckCircle2 className="h-5 w-5 text-[var(--success)]" /> : <Circle className="h-5 w-5" />}
                            </button>
                            <div>
                              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1"><span className="font-mono text-[10px] text-[var(--text-disabled)]">{String(milestoneIndex + 1).padStart(2, '0')}</span><h4 className={`text-base font-heading font-semibold ${isComplete ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>{milestone.title}</h4></div>
                              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{milestone.description}</p>
                              <div className="mt-4 bg-[var(--surface)] border border-[var(--border-color)] p-3 flex items-start gap-3 text-xs leading-5 text-[var(--text-secondary)]"><Layers3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" /><span><strong className="text-[var(--text-primary)]">Deliverable:</strong> {milestone.deliverable}</span></div>
                              <div className="mt-4 flex flex-wrap items-center gap-3"><span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-disabled)]">Relevant lessons</span>{milestone.lessonSlugs.map((slug) => <Link key={slug} href={`/lesson/${slug}`} className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)]">{slug.replaceAll('-', ' ')} <ArrowRight className="h-3 w-3" /></Link>)}</div>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                    {percentage === 100 && <div className="mt-5 flex items-center gap-3 border border-[var(--success)]/30 bg-[var(--success)]/5 px-4 py-3 text-sm text-[var(--success)]"><Check className="h-4 w-4" /> Project milestones complete. Finish the deliverables and write the project retrospective.</div>}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
