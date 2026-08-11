'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { executeCode, executionText, type CodeExecutionResult } from '@/lib/codeRunner';
import {
  Play, CheckCircle2, XCircle, Lightbulb, ChevronDown, ChevronUp,
  AlertCircle, Code2, Terminal, Eye, EyeOff,
} from 'lucide-react';

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  starterCode: string;
  solution: string;
  testCases: TestCase[];
  hints: string[];
}

const diffColors = {
  beginner:     { bg: 'rgba(34,197,94,0.1)',  text: '#22C55E', border: 'rgba(34,197,94,0.2)' },
  intermediate: { bg: 'rgba(245,158,11,0.1)', text: '#F59E0B', border: 'rgba(245,158,11,0.2)' },
  advanced:     { bg: 'rgba(239,68,68,0.1)',  text: '#EF4444', border: 'rgba(239,68,68,0.2)' },
};

export function ChallengeCard({
  challenge,
  index,
  onSolved,
  isSolved,
}: {
  challenge: Challenge;
  index: number;
  onSolved: (id: string) => void;
  isSolved: boolean;
}) {
  const [code, setCode] = useState(challenge.starterCode);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<CodeExecutionResult | null>(null);
  const [runError, setRunError] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [revealedHints, setRevealedHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [expanded, setExpanded] = useState(index === 0); // First challenge expanded by default
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);
  const diff = diffColors[challenge.difficulty];

  async function runCode() {
    setRunning(true);
    setResult(null);
    setRunError('');
    setTestsPassed(null);
    try {
      const data = await executeCode(code, 'java', challenge.testCases[0]?.input ?? '');
      setResult(data);

      if (data.status.id === 3 && data.stdout) {
        // Status 3 = Accepted
        const actual = data.stdout.trim();
        const passed = challenge.testCases.every(
          (tc) => actual === tc.expectedOutput.trim()
        );
        setTestsPassed(passed);
        if (passed) onSolved(challenge.id);
      }
    } catch (error) {
      setRunError(error instanceof Error ? error.message : 'Could not reach the code runner.');
    } finally {
      setRunning(false);
    }
  }

  const output = result ? executionText(result) : runError || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`rounded-2xl border overflow-hidden transition-all ${
        isSolved
          ? 'border-[var(--success)]/30 bg-[var(--success)]/3'
          : 'border-[var(--border-color)] bg-[var(--surface)]'
      }`}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer text-left"
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: diff.bg, color: diff.text, border: `1px solid ${diff.border}` }}
        >
          {index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-sm font-bold text-[var(--text-primary)]">{challenge.title}</h4>
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: diff.bg, color: diff.text }}
            >
              {challenge.difficulty}
            </span>
            {isSolved && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--success)] bg-[var(--success)]/10 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="w-3 h-3" />
                Solved
              </span>
            )}
          </div>
        </div>

        {expanded ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-disabled)] shrink-0" />
        )}
      </button>

      {/* Body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[var(--border-color)] p-5 space-y-4">
              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {challenge.description}
              </p>

              {/* Expected output */}
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--code-bg)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border-color)]">
                  <Terminal className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  <span className="text-xs font-semibold text-[var(--text-muted)]">Expected Output</span>
                </div>
                <pre className="px-4 py-3 text-xs text-[var(--success)] font-mono leading-relaxed">
                  {challenge.testCases[0]?.expectedOutput}
                </pre>
              </div>

              {/* Monaco Editor */}
              <div className="rounded-xl border border-[var(--border-color)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface-elevated)]">
                  <Code2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="text-xs font-semibold text-[var(--text-muted)]">Java Editor</span>
                </div>
                <Editor
                  height="280px"
                  language="java"
                  value={code}
                  onChange={(v) => setCode(v ?? '')}
                  theme="vs-dark"
                  options={{
                    fontSize: 13,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    padding: { top: 12, bottom: 12 },
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    fontLigatures: true,
                  }}
                />
              </div>

              {/* Action bar */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={runCode}
                  disabled={running}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] hover:opacity-90 disabled:opacity-60 transition-all cursor-pointer active:scale-95 shadow-lg shadow-[var(--accent)]/20"
                >
                  {running ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  )}
                  {running ? 'Running…' : 'Run Code'}
                </button>

                <button
                  onClick={() => { setShowHints((v) => !v); if (!showHints) setRevealedHints(1); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent-secondary)]/50 hover:text-[var(--accent-secondary)] transition-all cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Hints ({challenge.hints.length})
                </button>

                <button
                  onClick={() => setShowSolution((v) => !v)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-muted)]/50 transition-all cursor-pointer ml-auto"
                >
                  {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>

              {/* Hints */}
              <AnimatePresence>
                {showHints && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2"
                  >
                    {challenge.hints.slice(0, revealedHints).map((hint, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-[var(--accent-secondary)]/8 border border-[var(--accent-secondary)]/15"
                      >
                        <Lightbulb className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--text-secondary)]">{hint}</p>
                      </div>
                    ))}
                    {revealedHints < challenge.hints.length && (
                      <button
                        onClick={() => setRevealedHints((v) => v + 1)}
                        className="text-xs text-[var(--accent-secondary)] hover:underline cursor-pointer"
                      >
                        + Show next hint
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Output */}
              <AnimatePresence>
                {(result || runError) && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-xl border border-[var(--border-color)] overflow-hidden"
                  >
                    {/* Status bar */}
                    <div
                      className={`flex items-center gap-2 px-4 py-2 border-b border-[var(--border-color)] ${
                        testsPassed === true
                          ? 'bg-[var(--success)]/10'
                          : testsPassed === false
                          ? 'bg-[var(--error)]/10'
                          : 'bg-[var(--surface-elevated)]'
                      }`}
                    >
                      {testsPassed === true ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
                      ) : testsPassed === false ? (
                        <XCircle className="w-3.5 h-3.5 text-[var(--error)]" />
                      ) : (
                        <Terminal className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      )}
                      <span
                        className={`text-xs font-semibold ${
                          testsPassed === true
                            ? 'text-[var(--success)]'
                            : testsPassed === false
                            ? 'text-[var(--error)]'
                            : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {testsPassed === true
                          ? '✓ All tests passed!'
                          : testsPassed === false
                          ? '✗ Output mismatch — check your logic'
                          : result?.status.description || 'Execution error'}
                      </span>
                    </div>
                    <pre className="px-4 py-3 text-xs font-mono text-[var(--text-secondary)] bg-[var(--code-bg)] leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                      {output || '(no output)'}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Solution */}
              <AnimatePresence>
                {showSolution && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl border border-[var(--border-color)] overflow-hidden"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface-elevated)]">
                      <AlertCircle className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                      <span className="text-xs font-semibold text-[var(--accent-secondary)]">
                        Reference Solution — Try on your own first!
                      </span>
                    </div>
                    <Editor
                      height="200px"
                      language="java"
                      value={challenge.solution}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        fontSize: 12,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 12, bottom: 12 },
                        fontFamily: '"JetBrains Mono", monospace',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
