'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { executeCode, executionText } from '@/lib/codeRunner';
import {
  Terminal,
  Code2,
  CheckCircle2,
  Circle,
  Lightbulb,
  Trophy,
  Play,
  RotateCcw,
  Brain,
  Check,
  X,
  ListChecks,
  ChevronRight,
  Tag,
  Clock,
  BookOpen,
  Filter,
  SlidersHorizontal,
  GripVertical,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// ── Types ─────────────────────────────────────────────────────────────────────

type Difficulty = 'Easy' | 'Medium' | 'Hard';
type PracticeMode = 'problems' | 'playground' | 'mcq';
type SupportedLanguage = 'javascript' | 'python' | 'java' | 'typescript' | 'cpp';

type McqOption = { id: string; text: string };

interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  tags: string[];
  timeLimit: string;
  description: string;
  starterCode: Record<SupportedLanguage, string>;
  solutionCode: Record<SupportedLanguage, string>;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
}

interface PlaygroundChallenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  description: string;
  starterCode: string;
}

interface McqQuestion {
  id: string;
  question: string;
  difficulty: Difficulty;
  topic: string;
  options: McqOption[];
  correctOptionId: string;
  explanation: string;
}

// ── Language config ────────────────────────────────────────────────────────────

const LANGUAGES: { id: SupportedLanguage; label: string; monacoId: string }[] = [
  { id: 'java',       label: 'Java',       monacoId: 'java' },
  { id: 'python',     label: 'Python',     monacoId: 'python' },
  { id: 'javascript', label: 'JavaScript', monacoId: 'javascript' },
  { id: 'typescript', label: 'TypeScript', monacoId: 'typescript' },
  { id: 'cpp',        label: 'C++',        monacoId: 'cpp' },
];

// ── Problem Data ──────────────────────────────────────────────────────────────

import problemsData from '@/data/problems.json';
import playgroundData from '@/data/playgroundChallenges.json';
import mcqsData from '@/data/mcqs.json';

const problems: Problem[] = problemsData as Problem[];
const playgroundChallenges: PlaygroundChallenge[] = playgroundData as PlaygroundChallenge[];
const mcqQuestions: McqQuestion[] = mcqsData as McqQuestion[];

// ── Helpers ───────────────────────────────────────────────────────────────────

const difficultyColors: Record<Difficulty, string> = {
  Easy:   'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  Medium: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  Hard:   'bg-[#FF5F57]/10 text-[#FF5F57] border-[#FF5F57]/20',
};

const difficultyDot: Record<Difficulty, string> = {
  Easy:   'bg-[var(--success)]',
  Medium: 'bg-[var(--accent-secondary)]',
  Hard:   'bg-[#FF5F57]',
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PracticePage() {
  const [activeMode, setActiveMode] = useState<PracticeMode>('problems');

  // Problems state
  const [selectedProblem, setSelectedProblem] = useState<Problem>(problems[0]);
  const [activeLang, setActiveLang] = useState<SupportedLanguage>('java');
  const [showSolution, setShowSolution] = useState(false);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [problemFilter, setProblemFilter] = useState<'all' | Difficulty>('all');
  const [problemOutput, setProblemOutput] = useState('Click Run to execute.');
  const [problemError, setProblemError] = useState('');
  const [problemRunning, setProblemRunning] = useState(false);

  // Playground state
  const [selectedChallengeId, setSelectedChallengeId] = useState(playgroundChallenges[0].id);
  const selectedChallenge = useMemo(
    () => playgroundChallenges.find((c) => c.id === selectedChallengeId) ?? playgroundChallenges[0],
    [selectedChallengeId],
  );
  const [editorCode, setEditorCode] = useState(playgroundChallenges[0].starterCode);
  const [execOutput, setExecOutput] = useState('Click Run to execute JavaScript.');
  const [execError, setExecError] = useState('');
  const [playgroundRunning, setPlaygroundRunning] = useState(false);

  // MCQ state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});

  // Derived
  const completedCount  = Object.values(completed).filter(Boolean).length;
  const answeredCount   = Object.values(submittedAnswers).filter(Boolean).length;
  const correctCount    = mcqQuestions.filter((q) => submittedAnswers[q.id] && selectedAnswers[q.id] === q.correctOptionId).length;

  const filteredProblems = problems.filter((p) => problemFilter === 'all' || p.difficulty === problemFilter);

  function handleSelectProblem(p: Problem) {
    setSelectedProblem(p);
    setShowSolution(false);
    setEditorCode(p.starterCode[activeLang]);
    setProblemOutput('Click Run to execute.');
    setProblemError('');
  }

  function handleLangChange(lang: SupportedLanguage) {
    setActiveLang(lang);
    setEditorCode(selectedProblem.starterCode[lang]);
    setShowSolution(false);
    setProblemOutput('Click Run to execute.');
    setProblemError('');
  }

  async function handleRunProblem() {
    setProblemRunning(true);
    setProblemOutput('Submitting to Judge0…');
    setProblemError('');
    try {
      const result = await executeCode(editorCode, activeLang);
      setProblemOutput(executionText(result));
      setProblemError(result.status.id === 3 ? '' : result.status.description);
    } catch (error) {
      setProblemOutput('Execution failed');
      setProblemError(error instanceof Error ? error.message : 'The code runner is unavailable.');
    } finally {
      setProblemRunning(false);
    }
  }

  function handleChallengeChange(id: string) {
    const c = playgroundChallenges.find((x) => x.id === id);
    if (!c) return;
    setSelectedChallengeId(id);
    setEditorCode(c.starterCode);
    setExecOutput('Click Run to execute JavaScript.');
    setExecError('');
  }

  async function handleRun() {
    setPlaygroundRunning(true);
    setExecOutput('Submitting to Judge0…');
    setExecError('');
    try {
      const result = await executeCode(editorCode, 'javascript');
      setExecOutput(executionText(result));
      setExecError(result.status.id === 3 ? '' : result.status.description);
    } catch (error) {
      setExecOutput('Execution failed');
      setExecError(error instanceof Error ? error.message : 'The code runner is unavailable.');
    } finally {
      setPlaygroundRunning(false);
    }
  }

  const MODES = [
    { id: 'problems'   as const, label: 'Problems',   icon: Trophy,    stat: `${completedCount}/${problems.length}` },
    { id: 'playground' as const, label: 'Playground',  icon: Code2,     stat: `${playgroundChallenges.length} tasks` },
    { id: 'mcq'        as const, label: 'MCQ Drill',   icon: Brain,     stat: `${correctCount}/${mcqQuestions.length}` },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      <Navbar />

      {/* ── Top mode bar ─────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center gap-1 h-12">
          {MODES.map((m) => {
            const Icon = m.icon;
            const isActive = m.id === activeMode;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`flex items-center gap-2 px-4 h-full border-b-2 text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'border-[var(--accent)] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{m.label}</span>
                <span className={`hidden lg:inline text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-[var(--accent)]/15 text-[var(--accent)]' : 'bg-[var(--surface)] text-[var(--text-disabled)]'}`}>
                  {m.stat}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Mode panels ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {activeMode === 'problems' && (
            <motion.div key="problems" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex flex-1 overflow-hidden">
              <ProblemsPanel
                problems={problems}
                filteredProblems={filteredProblems}
                problemFilter={problemFilter}
                setProblemFilter={setProblemFilter}
                selectedProblem={selectedProblem}
                completed={completed}
                onSelectProblem={handleSelectProblem}
                onToggleCompleted={(id) => setCompleted((p) => ({ ...p, [id]: !p[id] }))}
                activeLang={activeLang}
                onLangChange={handleLangChange}
                showSolution={showSolution}
                onToggleSolution={() => setShowSolution((v) => !v)}
                editorCode={editorCode}
                onEditorChange={(v) => setEditorCode(v ?? '')}
                execOutput={problemOutput}
                execError={problemError}
                isRunning={problemRunning}
                onRun={handleRunProblem}
              />
            </motion.div>
          )}

          {activeMode === 'playground' && (
            <motion.div key="playground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1">
              <PlaygroundPanel
                challenges={playgroundChallenges}
                selectedChallengeId={selectedChallengeId}
                selectedChallenge={selectedChallenge}
                editorCode={editorCode}
                execOutput={execOutput}
                execError={execError}
                isRunning={playgroundRunning}
                onChallengeChange={handleChallengeChange}
                onEditorChange={(v) => setEditorCode(v ?? '')}
                onRun={handleRun}
                onReset={() => { setEditorCode(selectedChallenge.starterCode); setExecOutput('Editor reset.'); setExecError(''); }}
              />
            </motion.div>
          )}

          {activeMode === 'mcq' && (
            <motion.div key="mcq" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="flex-1 overflow-y-auto">
              <McqPanel
                questions={mcqQuestions}
                selectedAnswers={selectedAnswers}
                submittedAnswers={submittedAnswers}
                correctCount={correctCount}
                answeredCount={answeredCount}
                onSelectAnswer={(qId, optId) => { if (!submittedAnswers[qId]) setSelectedAnswers((p) => ({ ...p, [qId]: optId })); }}
                onSubmitAnswer={(qId) => { if (selectedAnswers[qId]) setSubmittedAnswers((p) => ({ ...p, [qId]: true })); }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Problems Panel — LeetCode 3-column layout with resizable desc/editor split ─

function ProblemsPanel({
  problems, filteredProblems, problemFilter, setProblemFilter,
  selectedProblem, completed, onSelectProblem, onToggleCompleted,
  activeLang, onLangChange, showSolution, onToggleSolution,
  editorCode, onEditorChange, execOutput, execError, isRunning, onRun,
}: {
  problems: Problem[];
  filteredProblems: Problem[];
  problemFilter: 'all' | Difficulty;
  setProblemFilter: (f: 'all' | Difficulty) => void;
  selectedProblem: Problem;
  completed: Record<string, boolean>;
  onSelectProblem: (p: Problem) => void;
  onToggleCompleted: (id: string) => void;
  activeLang: SupportedLanguage;
  onLangChange: (l: SupportedLanguage) => void;
  showSolution: boolean;
  onToggleSolution: () => void;
  editorCode: string;
  onEditorChange: (v: string | undefined) => void;
  execOutput: string;
  execError: string;
  isRunning: boolean;
  onRun: () => Promise<void>;
}) {
  const [descWidthPct, setDescWidthPct] = useState(42);
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'solution'>('description');
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = ev.clientX - rect.left;
      const pct = Math.min(Math.max((offsetX / rect.width) * 100, 20), 70);
      setDescWidthPct(pct);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className="flex flex-1 max-w-[1400px] w-full mx-auto overflow-hidden relative" style={{ height: 'calc(100vh - 7.5rem)' }}>

      {/* ── Collapsed Sidebar Toggle Tab ─────────────────────────── */}
      {!isSidebarOpen && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center w-6 h-16 rounded-r-xl border-y border-r border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] shadow-md transition-all cursor-pointer"
            title="Expand Sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Col 1: Problem list ─────────────────────────────────── */}
      {isSidebarOpen && (
        <div className="hidden md:flex flex-col w-[280px] xl:w-[300px] shrink-0 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          {/* Filter bar */}
          <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              <Filter className="w-3.5 h-3.5 text-[var(--text-disabled)] shrink-0" />
              {(['all', 'Easy', 'Medium', 'Hard'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setProblemFilter(f)}
                  className={`text-[11px] px-2 py-0.5 rounded-full border cursor-pointer transition-all shrink-0 ${
                    problemFilter === f
                      ? f === 'all'
                        ? 'bg-[var(--accent)] border-[var(--accent)] text-white'
                        : difficultyColors[f as Difficulty].replace('border-', 'border-').replace('bg-', 'bg-').split(' ')[0] + ' ' + (f === 'Easy' ? 'border-[var(--success)]/40 bg-[var(--success)]/20 text-[var(--success)]' : f === 'Medium' ? 'border-[var(--accent-secondary)]/40 bg-[var(--accent-secondary)]/20 text-[var(--accent-secondary)]' : 'border-[#FF5F57]/40 bg-[#FF5F57]/20 text-[#FF5F57]')
                      : 'border-[var(--border-color)] text-[var(--text-disabled)] hover:text-[var(--text-muted)]'
                  }`}
                >
                  {f === 'all' ? 'All' : f}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded hover:bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors shrink-0"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Problem rows */}
          <div className="flex-1 overflow-y-auto">
            {filteredProblems.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => onSelectProblem(p)}
                className={`w-full text-left px-4 py-3 border-b border-[var(--border-color)] transition-colors cursor-pointer group ${
                  selectedProblem.id === p.id
                    ? 'bg-[var(--surface-elevated)]'
                    : 'hover:bg-[var(--surface)]'
                }`}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs text-[var(--text-disabled)] font-mono w-5 shrink-0">{idx + 1}.</span>
                  <div
                    onClick={(e) => { e.stopPropagation(); onToggleCompleted(p.id); }}
                    className="shrink-0 cursor-pointer"
                  >
                    {completed[p.id]
                      ? <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
                      : <Circle className="w-3.5 h-3.5 text-[var(--text-disabled)]" />
                    }
                  </div>
                  <span className={`flex-1 text-xs font-medium truncate ${selectedProblem.id === p.id ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                    {p.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 pl-7">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${difficultyDot[p.difficulty]}`} />
                  <span className="text-[10px] text-[var(--text-disabled)]">{p.difficulty}</span>
                  <span className="text-[10px] text-[var(--text-disabled)]">· {p.category}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Footer stats */}
          <div className="px-4 py-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs text-[var(--text-disabled)] shrink-0">
            <span>{Object.values(completed).filter(Boolean).length} / {problems.length} solved</span>
            <Trophy className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* ── Col 2 + 3: Resizable desc / editor split ─────────────── */}
      <div ref={containerRef} className="flex flex-1 min-w-0 overflow-hidden">

        {/* Col 2: Problem description / Solution Tabs */}
        <div
          className="flex flex-col border-r border-[var(--border-color)] overflow-hidden shrink-0 bg-[var(--bg)]"
          style={{ width: `${descWidthPct}%` }}
        >
          {/* Tabs header */}
          <div className="flex items-center gap-1 border-b border-[var(--border-color)] bg-[var(--surface)] px-4 py-1.5 shrink-0">
            <button
              onClick={() => setActiveTab('description')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'description'
                  ? 'bg-[var(--surface-elevated)] text-[var(--accent)] border border-[var(--border-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'solution'
                  ? 'bg-[var(--surface-elevated)] text-[var(--success)] border border-[var(--border-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
              }`}
            >
              Solution
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            {activeTab === 'description' ? (
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <h2 className="text-lg font-heading font-bold text-[var(--text-primary)] mb-2">{selectedProblem.title}</h2>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[selectedProblem.difficulty]}`}>
                      {selectedProblem.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <BookOpen className="w-3 h-3" /> {selectedProblem.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Clock className="w-3 h-3" /> {selectedProblem.timeLimit}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                  {selectedProblem.description}
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Examples</p>
                  {selectedProblem.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 text-xs font-mono space-y-1">
                      <div><span className="text-[var(--text-disabled)]">Input: </span><span className="text-[var(--text-secondary)]">{ex.input}</span></div>
                      <div><span className="text-[var(--text-disabled)]">Output: </span><span className="text-[var(--success)]">{ex.output}</span></div>
                      {ex.explanation && <div className="text-[var(--text-disabled)] font-sans">{ex.explanation}</div>}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Constraints</p>
                  <ul className="space-y-1">
                    {selectedProblem.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <span className="text-[var(--text-disabled)] shrink-0">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {selectedProblem.tags.map((t) => (
                    <span key={t} className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-disabled)]">
                      <Tag className="w-2.5 h-2.5" />{t}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Reference Solution ({LANGUAGES.find(l => l.id === activeLang)?.label})</h3>
                  <span className="text-xs text-[var(--text-disabled)] font-medium">Optimal Approach</span>
                </div>
                <div className="rounded-xl border border-[var(--border-color)] overflow-hidden bg-[#1e1e1e]">
                  <CodeBlock language={activeLang === 'cpp' ? 'cpp' : activeLang === 'java' ? 'java' : activeLang === 'python' ? 'python' : 'javascript'}>
                    {selectedProblem.solutionCode[activeLang]}
                  </CodeBlock>
                </div>
                <div className="p-4 rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/5 text-xs text-[var(--text-secondary)] leading-relaxed">
                  <span className="font-semibold text-[var(--success)]">Walkthrough: </span>
                  This solution resolves the problem using the optimal time complexity ({selectedProblem.timeLimit}) and space complexity constraints. Review the syntax and compare it with your implementation.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Drag handle ─────────────────────────────────────────── */}
        <div
          onMouseDown={onMouseDown}
          title="Drag to resize"
          className="w-2 shrink-0 flex items-center justify-center cursor-col-resize group bg-transparent hover:bg-[var(--accent)]/8 transition-colors z-10 border-r border-[var(--border-color)]"
        >
          <GripVertical className="w-3 h-3 text-[var(--text-disabled)] group-hover:text-[var(--accent)] transition-colors" />
        </div>

        {/* Col 3: Editor + output + bottom bar */}
        <div className={`flex flex-col flex-1 min-w-0 overflow-hidden bg-[var(--surface)] ${isDragging ? 'pointer-events-none' : ''}`}>
          {/* Editor toolbar */}
          <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface)] shrink-0">
            {/* Language picker */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-color)] overflow-x-auto scrollbar-none flex-nowrap max-w-full">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => onLangChange(lang.id)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer shrink-0 ${
                    activeLang === lang.id
                      ? 'bg-[var(--accent)] text-white'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            
            <div className="text-xs text-[var(--text-disabled)] font-mono hidden sm:block">Editor</div>
          </div>

          {/* Monaco editor + Slide up Console Drawer */}
          <div className="flex-1 relative overflow-hidden min-h-0 bg-[var(--bg)]">
            <div className="absolute inset-0">
              <MonacoEditor
                height="100%"
                language={LANGUAGES.find((l) => l.id === activeLang)?.monacoId ?? 'javascript'}
                value={editorCode}
                onChange={onEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 12 },
                  wordWrap: 'on',
                }}
              />
            </div>

            {/* Sliding Output Console Drawer */}
            <AnimatePresence>
              {isConsoleOpen && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute bottom-0 left-0 right-0 h-64 border-t border-[var(--border-color)] bg-[var(--surface)] flex flex-col z-20 shadow-2xl"
                >
                  {/* Console Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface-elevated)] shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" /> Output Console
                      </span>
                      <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">Judge0 · RapidAPI</span>
                    </div>
                    <button
                      onClick={() => setIsConsoleOpen(false)}
                      className="p-1 rounded hover:bg-[var(--surface)] text-[var(--text-disabled)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Console Content */}
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-[var(--bg-secondary)]">
                    <div className={`rounded-xl border p-4 ${execError ? 'border-[var(--error)]/30 text-[var(--error)] bg-[var(--error)]/5' : 'border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-secondary)]'}`}>
                      {execOutput}
                      {execError && `\n\nError:\n${execError}`}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom status bar */}
          <div className="h-12 border-t border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between px-4 shrink-0">
            <button
              onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] cursor-pointer transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              Console {isConsoleOpen ? '▼' : '▲'}
            </button>
            <button
              onClick={() => {
                void onRun();
                setIsConsoleOpen(true);
              }}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] cursor-pointer transition-all shadow-md shadow-[var(--accent)]/10 disabled:cursor-wait disabled:opacity-60"
            >
              {isRunning ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Play className="w-3.5 h-3.5" />}
              {isRunning ? 'Running…' : 'Run Code'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Playground Panel ──────────────────────────────────────────────────────────

function PlaygroundPanel({
  challenges, selectedChallengeId, selectedChallenge,
  editorCode, execOutput, execError, isRunning,
  onChallengeChange, onEditorChange, onRun, onReset
}: {
  challenges: PlaygroundChallenge[];
  selectedChallengeId: string;
  selectedChallenge: PlaygroundChallenge;
  editorCode: string;
  execOutput: string;
  execError: string;
  isRunning: boolean;
  onChallengeChange: (id: string) => void;
  onEditorChange: (v: string | undefined) => void;
  onRun: () => Promise<void>;
  onReset: () => void;
}) {
  const [descWidthPct, setDescWidthPct] = useState(42);
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = ev.clientX - rect.left;
      const pct = Math.min(Math.max((offsetX / rect.width) * 100, 20), 70);
      setDescWidthPct(pct);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div className="flex flex-1 max-w-[1400px] w-full mx-auto overflow-hidden relative" style={{ height: 'calc(100vh - 7.5rem)' }}>

      {/* ── Collapsed Sidebar Toggle Tab ─────────────────────────── */}
      {!isSidebarOpen && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center justify-center w-6 h-16 rounded-r-xl border-y border-r border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] shadow-md transition-all cursor-pointer"
            title="Expand Sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── Col 1: Challenge list ─────────────────────────────────── */}
      {isSidebarOpen && (
        <div className="hidden md:flex flex-col w-[280px] xl:w-[300px] shrink-0 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between gap-2 shrink-0">
            <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">JS Challenges</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded hover:bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
              title="Collapse Sidebar"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {challenges.map((c) => (
              <button
                key={c.id}
                onClick={() => onChallengeChange(c.id)}
                className={`w-full text-left p-3 rounded-xl border cursor-pointer transition-all ${
                  c.id === selectedChallengeId
                    ? 'border-[var(--accent)] bg-[var(--surface-elevated)] border-opacity-40'
                    : 'border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)]/30'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-xs font-semibold text-[var(--text-primary)] truncate">{c.title}</span>
                  <span className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] font-medium border ${difficultyColors[c.difficulty]}`}>{c.difficulty}</span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">{c.description}</p>
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-[var(--border-color)] text-[10px] text-[var(--text-disabled)] shrink-0">
            JavaScript only. Runs in browser.
          </div>
        </div>
      )}

      {/* ── Col 2 + 3: Resizable desc / editor split ─────────────── */}
      <div ref={containerRef} className="flex flex-1 min-w-0 overflow-hidden">

        {/* Col 2: Challenge details */}
        <div
          className="flex flex-col border-r border-[var(--border-color)] overflow-hidden shrink-0 bg-[var(--bg)] p-5 space-y-5"
          style={{ width: `${descWidthPct}%` }}
        >
          <div>
            <h2 className="text-lg font-heading font-bold text-[var(--text-primary)] mb-2">{selectedChallenge.title}</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[selectedChallenge.difficulty]}`}>
              {selectedChallenge.difficulty}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Instructions</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{selectedChallenge.description}</p>
          </div>

          <div className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs text-[var(--text-muted)] leading-relaxed">
            <span className="font-semibold text-[var(--text-primary)]">Tip: </span>
            Use <code>console.log()</code> to output your results. When you&apos;re ready, click &quot;Run Code&quot; in the bottom bar to see the results.
          </div>
        </div>

        {/* ── Drag handle ─────────────────────────────────────────── */}
        <div
          onMouseDown={onMouseDown}
          title="Drag to resize"
          className="w-2 shrink-0 flex items-center justify-center cursor-col-resize group bg-transparent hover:bg-[var(--accent)]/8 transition-colors z-10 border-r border-[var(--border-color)]"
        >
          <GripVertical className="w-3 h-3 text-[var(--text-disabled)] group-hover:text-[var(--accent)] transition-colors" />
        </div>

        {/* Col 3: Editor + output + bottom bar */}
        <div className={`flex flex-col flex-1 min-w-0 overflow-hidden bg-[var(--surface)] ${isDragging ? 'pointer-events-none' : ''}`}>
          {/* Editor toolbar */}
          <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface)] shrink-0">
            <div className="text-xs px-2.5 py-1 rounded bg-[var(--accent)]/10 text-[var(--accent)] font-semibold border border-[var(--accent)]/20">
              JavaScript
            </div>
            <div className="text-xs text-[var(--text-disabled)] font-mono">Playground Editor</div>
          </div>

          {/* Monaco editor + Slide up Console Drawer */}
          <div className="flex-1 relative overflow-hidden min-h-0 bg-[var(--bg)]">
            <div className="absolute inset-0">
              <MonacoEditor
                height="100%"
                language="javascript"
                value={editorCode}
                onChange={onEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 12 },
                  wordWrap: 'on',
                }}
              />
            </div>

            {/* Sliding Output Console Drawer */}
            <AnimatePresence>
              {isConsoleOpen && (
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="absolute bottom-0 left-0 right-0 h-64 border-t border-[var(--border-color)] bg-[var(--surface)] flex flex-col z-20 shadow-2xl"
                >
                  {/* Console Header */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface-elevated)] shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" /> Output Console
                      </span>
                      <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">Judge0 · RapidAPI</span>
                    </div>
                    <button
                      onClick={() => setIsConsoleOpen(false)}
                      className="p-1 rounded hover:bg-[var(--surface)] text-[var(--text-disabled)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Console Content */}
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-[var(--bg-secondary)]">
                    <div className={`rounded-xl border p-4 ${execError ? 'border-[var(--error)]/30 text-[var(--error)] bg-[var(--error)]/5' : 'border-[var(--border-color)] text-[var(--text-secondary)] bg-[var(--bg-secondary)]'}`}>
                      {execOutput}
                      {execError && `\n\nError:\n${execError}`}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom status bar */}
          <div className="h-12 border-t border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between px-4 shrink-0">
            <button
              onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] cursor-pointer transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              Console {isConsoleOpen ? '▼' : '▲'}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-muted)] hover:bg-[var(--surface-elevated)] cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
              <button
                onClick={() => {
                  void onRun();
                  setIsConsoleOpen(true);
                }}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] cursor-pointer transition-all shadow-md shadow-[var(--accent)]/10 disabled:cursor-wait disabled:opacity-60"
              >
                {isRunning ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <Play className="w-3.5 h-3.5" />}
                {isRunning ? 'Running…' : 'Run Code'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MCQ Panel ─────────────────────────────────────────────────────────────────

function McqPanel({
  questions, selectedAnswers, submittedAnswers, correctCount, answeredCount, onSelectAnswer, onSubmitAnswer
}: {
  questions: McqQuestion[];
  selectedAnswers: Record<string, string>;
  submittedAnswers: Record<string, boolean>;
  correctCount: number;
  answeredCount: number;
  onSelectAnswer: (qId: string, optId: string) => void;
  onSubmitAnswer: (qId: string) => void;
}) {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const topics = useMemo(() => {
    const map: Record<string, McqQuestion[]> = {};
    questions.forEach((q) => {
      if (!map[q.topic]) map[q.topic] = [];
      map[q.topic].push(q);
    });
    return Object.entries(map).map(([name, list]) => {
      const answered = list.filter((q) => submittedAnswers[q.id]).length;
      const correct = list.filter((q) => submittedAnswers[q.id] && selectedAnswers[q.id] === q.correctOptionId).length;
      return { name, list, answered, correct };
    });
  }, [questions, submittedAnswers, selectedAnswers]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {activeTopic === null ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Brain className="w-5 h-5 text-[var(--accent)]" /> MCQ Topics Dashboard
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-1">Select a topic below to test and drill your conceptual knowledge.</p>
            </div>
            <div className="flex items-center gap-4 shrink-0 text-sm text-[var(--text-muted)] font-medium border-t sm:border-t-0 pt-3 sm:pt-0">
              <span>Completed: <span className="font-bold text-[var(--text-primary)]">{answeredCount}</span>/{questions.length}</span>
              <span>Total Score: <span className="font-bold text-[var(--success)]">{correctCount}</span>/{questions.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topics.map((t) => {
              const pct = t.list.length > 0 ? (t.answered / t.list.length) * 100 : 0;
              return (
                <div key={t.name} className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] flex flex-col justify-between h-48 hover:border-[var(--accent)]/30 transition-all group shadow-sm hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)] font-semibold">{t.list[0].difficulty}</span>
                      <span className="text-[10px] text-[var(--text-disabled)] font-mono">{t.list.length} Questions</span>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent)] transition-colors">{t.name}</h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">Master the core concepts of {t.name} through focused questions.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] text-[var(--text-disabled)] font-mono">
                        <span>Progress</span>
                        <span>{t.answered}/{t.list.length} Answered</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)] transition-all duration-300" style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTopic(t.name)}
                      className="w-full py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--accent)] hover:text-white text-xs font-semibold text-[var(--text-secondary)] transition-all cursor-pointer text-center border border-[var(--border-color)]"
                    >
                      Start Topic Drill
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTopic(null)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer hover:bg-[var(--surface-elevated)] transition-colors"
              >
                ← Back to Topics
              </button>
              <h2 className="text-base font-bold text-[var(--text-primary)]">{activeTopic} Drill</h2>
            </div>
            <div className="text-xs font-mono text-[var(--text-disabled)] bg-[var(--surface)] px-3 py-1.5 rounded-xl border border-[var(--border-color)]">
              {topics.find(t => t.name === activeTopic)?.answered ?? 0} of {topics.find(t => t.name === activeTopic)?.list.length ?? 0} answered
            </div>
          </div>

          <div className="space-y-6">
            {questions.filter((q) => q.topic === activeTopic).map((q, idx) => {
              const sel = selectedAnswers[q.id];
              const submitted = submittedAnswers[q.id];
              const correct = sel === q.correctOptionId;

              return (
                <div key={q.id} className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
                  <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)] bg-[var(--surface-elevated)]">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Question {idx + 1}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${difficultyColors[q.difficulty]}`}>{q.difficulty}</span>
                      {submitted && (
                        <span className={`ml-auto text-xs font-semibold flex items-center gap-1 ${correct ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                          {correct ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          {correct ? 'Correct' : 'Incorrect'}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{q.question}</p>
                  </div>

                  <div className="p-5 space-y-2">
                    {q.options.map((opt) => {
                      const isSelected = sel === opt.id;
                      const showCorrect = submitted && opt.id === q.correctOptionId;
                      const showWrong   = submitted && isSelected && opt.id !== q.correctOptionId;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => onSelectAnswer(q.id, opt.id)}
                          disabled={submitted}
                          className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-colors cursor-pointer disabled:cursor-default ${
                            showCorrect ? 'border-[var(--success)]/40 bg-[var(--success)]/10 font-medium'
                            : showWrong  ? 'border-[var(--error)]/40 bg-[var(--error)]/10'
                            : isSelected ? 'border-[var(--accent)]/40 bg-[var(--accent)]/10'
                            : 'border-[var(--border-color)] bg-[var(--surface-elevated)] hover:border-[var(--accent)]/20'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-[var(--text-secondary)]">{opt.text}</span>
                            {showCorrect && <Check className="w-4 h-4 text-[var(--success)] shrink-0" />}
                            {showWrong   && <X     className="w-4 h-4 text-[var(--error)]   shrink-0" />}
                          </div>
                        </button>
                      );
                    })}

                    <div className="pt-2">
                      {!submitted ? (
                        <button
                          onClick={() => onSubmitAnswer(q.id)}
                          disabled={!sel}
                          className="px-4 py-2 rounded-xl bg-[var(--accent)] text-white text-xs font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-[var(--accent-hover)] transition-colors shadow-sm shadow-[var(--accent)]/10"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <div className="mt-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4 text-xs text-[var(--text-secondary)] leading-relaxed">
                          <span className="font-semibold text-[var(--text-primary)]">Explanation: </span>{q.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
