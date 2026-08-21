'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleDot,
  FolderKanban,
  Gauge,
  RotateCcw,
  Target,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { ALL_LESSONS, getLessonBySlug } from '@/data/course';
import { GUIDED_PROJECTS } from '@/data/guidedProjects';
import { useLearningState } from '@/hooks/useLearningState';

const budgets = [20, 40, 60] as const;
const SESSION_STARTED_AT = Date.now();

export function TodayWorkspace() {
  const [budget, setBudget] = useState<(typeof budgets)[number]>(40);
  const { state, setLessonMastery } = useLearningState();

  const masteryRecords = useMemo(() => Object.values(state.mastery), [state.mastery]);
  const dueReviews = useMemo(
    () => masteryRecords
      .filter((record) => new Date(record.nextReviewAt).getTime() <= SESSION_STARTED_AT)
      .sort((a, b) => a.nextReviewAt.localeCompare(b.nextReviewAt))
      .slice(0, budget === 20 ? 1 : budget === 40 ? 2 : 3),
    [budget, masteryRecords],
  );

  const nextLesson = useMemo(() => {
    const learning = masteryRecords.find((record) => record.status === 'learning');
    if (learning) return getLessonBySlug(learning.slug);
    const mastered = new Set(masteryRecords.filter((record) => record.status === 'mastered').map((record) => record.slug));
    return ALL_LESSONS.find((lesson) => !mastered.has(lesson.slug));
  }, [masteryRecords]);

  const activeProject = useMemo(() => {
    const started = Object.values(state.projects).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
    return started ? GUIDED_PROJECTS.find((project) => project.id === started.projectId) : undefined;
  }, [state.projects]);

  const activeProjectProgress = activeProject ? state.projects[activeProject.id] : undefined;
  const completedToday = dueReviews.length === 0 && masteryRecords.length > 0;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <header className="grid lg:grid-cols-[1fr_auto] gap-8 items-end border-b border-[var(--border-color)] pb-10">
          <div>
            <p className="section-kicker">Daily workspace</p>
            <h1 className="mt-4 text-4xl sm:text-6xl font-heading font-bold tracking-[-0.045em]">Do the next useful thing.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--text-muted)]">
              A focused plan assembled from what you are learning, what needs revision, and the project currently in motion.
            </p>
          </div>
          <div className="flex items-center gap-1 border border-[var(--border-color)] p-1" aria-label="Study time budget">
            {budgets.map((minutes) => (
              <button
                key={minutes}
                onClick={() => setBudget(minutes)}
                className={`min-w-16 px-3 py-2 text-xs font-mono transition-colors ${budget === minutes ? 'bg-[var(--text-primary)] text-[var(--bg)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                aria-pressed={budget === minutes}
              >
                {minutes} min
              </button>
            ))}
          </div>
        </header>

        <section className="grid lg:grid-cols-[1fr_340px] gap-8 mt-10">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-mono uppercase tracking-[0.14em] text-[var(--text-muted)]">Your plan</h2>
              <span className="text-xs text-[var(--text-disabled)]">Approximately {budget} minutes</span>
            </div>

            <div className="border-t border-[var(--text-primary)]">
              {nextLesson && (
                <article className="grid sm:grid-cols-[56px_1fr_auto] gap-5 py-7 border-b border-[var(--border-color)]">
                  <div className="flex sm:block items-center gap-3">
                    <span className="font-mono text-xs text-[var(--text-disabled)]">01</span>
                    <BookOpen className="sm:mt-5 h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--accent)]">Continue learning · {Math.min(nextLesson.estimatedMinutes, budget)} min</p>
                    <h3 className="mt-2 text-xl font-heading font-semibold">{nextLesson.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{nextLesson.description}</p>
                    <p className="mt-3 text-xs text-[var(--text-disabled)]">{nextLesson.chapterTitle} · {nextLesson.difficulty}</p>
                  </div>
                  <Link href={`/lesson/${nextLesson.slug}`} className="self-center inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]">
                    Open <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              )}

              {dueReviews.map((record, index) => {
                const lesson = getLessonBySlug(record.slug);
                if (!lesson) return null;
                return (
                  <article key={record.slug} className="grid sm:grid-cols-[56px_1fr_auto] gap-5 py-7 border-b border-[var(--border-color)]">
                    <div className="flex sm:block items-center gap-3">
                      <span className="font-mono text-xs text-[var(--text-disabled)]">{String(index + 2).padStart(2, '0')}</span>
                      <RotateCcw className="sm:mt-5 h-5 w-5 text-[var(--text-muted)]" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Review · 8 min</p>
                      <h3 className="mt-2 text-lg font-heading font-semibold">{lesson.title}</h3>
                      <p className="mt-2 text-sm text-[var(--text-muted)]">Recall the idea before reopening the lesson. Then rate how confidently you explained it.</p>
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-xs text-[var(--text-disabled)]">Confidence</span>
                        {([1, 2, 3] as const).map((confidence) => (
                          <button key={confidence} onClick={() => setLessonMastery(record.slug, confidence === 3 ? 'mastered' : 'review', confidence)} className="h-8 min-w-9 border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)]">
                            {confidence}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Link href={`/lesson/${lesson.slug}`} className="self-center inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      Review <ArrowRight className="h-4 w-4" />
                    </Link>
                  </article>
                );
              })}

              <article className="grid sm:grid-cols-[56px_1fr_auto] gap-5 py-7 border-b border-[var(--border-color)]">
                <div className="flex sm:block items-center gap-3">
                  <span className="font-mono text-xs text-[var(--text-disabled)]">{String(dueReviews.length + 2).padStart(2, '0')}</span>
                  <Target className="sm:mt-5 h-5 w-5 text-[var(--text-muted)]" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">Apply · 12 min</p>
                  <h3 className="mt-2 text-lg font-heading font-semibold">One focused practice problem</h3>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">Finish with retrieval and application rather than another passive reading block.</p>
                </div>
                <Link href="/practice" className="self-center inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                  Practice <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </div>

            {completedToday && (
              <div className="mt-6 flex items-center gap-3 border border-[var(--success)]/30 bg-[var(--success)]/5 px-4 py-3 text-sm text-[var(--success)]">
                <Check className="h-4 w-4" /> Nothing is overdue. Continue with the next lesson when you are ready.
              </div>
            )}
          </div>

          <aside className="space-y-5">
            <div className="border border-[var(--border-color)] bg-[var(--surface)] p-6">
              <div className="flex items-center justify-between">
                <span className="section-kicker">Mastery</span>
                <Gauge className="h-5 w-5 text-[var(--text-disabled)]" />
              </div>
              <dl className="mt-6 divide-y divide-[var(--border-color)]">
                {[
                  ['Learning', masteryRecords.filter((item) => item.status === 'learning').length],
                  ['In review', masteryRecords.filter((item) => item.status === 'review').length],
                  ['Mastered', masteryRecords.filter((item) => item.status === 'mastered').length],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-3 text-sm"><dt className="text-[var(--text-muted)]">{label}</dt><dd className="font-mono text-[var(--text-primary)]">{value}</dd></div>
                ))}
              </dl>
            </div>

            <div className="border border-[var(--border-color)] p-6">
              <div className="flex items-center gap-2 text-sm font-semibold"><FolderKanban className="h-4 w-4 text-[var(--accent)]" /> Current project</div>
              {activeProject ? (
                <>
                  <h3 className="mt-5 text-lg font-heading font-semibold">{activeProject.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">{activeProjectProgress?.completedMilestones.length ?? 0} of {activeProject.milestones.length} milestones complete</p>
                  <div className="mt-4 h-1 bg-[var(--surface-elevated)]"><div className="h-full bg-[var(--accent)]" style={{ width: `${((activeProjectProgress?.completedMilestones.length ?? 0) / activeProject.milestones.length) * 100}%` }} /></div>
                  <Link href={`/projects#${activeProject.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:text-[var(--accent)]">Continue project <ArrowRight className="h-4 w-4" /></Link>
                </>
              ) : (
                <>
                  <p className="mt-4 text-sm leading-6 text-[var(--text-muted)]">Use a guided build to connect several lessons into one working system.</p>
                  <Link href="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">Choose a project <ArrowRight className="h-4 w-4" /></Link>
                </>
              )}
            </div>

            <div className="flex items-start gap-3 px-1 text-xs leading-5 text-[var(--text-disabled)]">
              <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Review timing adapts to your confidence. Low-confidence topics return sooner; mastered topics are checked again after three weeks.
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
