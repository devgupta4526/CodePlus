'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface QuizCardProps {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function QuizCard({
  question,
  options,
  correctIndex,
  explanation,
}: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  const isCorrect = selected === correctIndex;

  return (
    <div className="my-6 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2 bg-[var(--surface-elevated)]">
        <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
          Knowledge Check
        </span>
      </div>

      {/* Question */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-[var(--text-primary)] leading-relaxed">
          {question}
        </p>
      </div>

      {/* Options */}
      <div className="px-4 pb-3 space-y-2">
        {options.map((option, index) => {
          let optionStyle = 'border-[var(--border-color)] hover:border-[var(--accent)]/50 hover:bg-[var(--surface-elevated)]';
          if (revealed) {
            if (index === correctIndex) {
              optionStyle = 'border-[var(--success)] bg-[var(--success)]/5';
            } else if (index === selected) {
              optionStyle = 'border-[var(--error)] bg-[var(--error)]/5';
            } else {
              optionStyle = 'border-[var(--border-color)] opacity-50';
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              disabled={revealed}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[10px] border text-left text-sm transition-all cursor-pointer disabled:cursor-default ${optionStyle}`}
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono shrink-0 text-[var(--text-muted)]">
                {String.fromCharCode(65 + index)}
              </span>
              <span className={`flex-1 ${revealed && index === correctIndex ? 'text-[var(--success)] font-medium' : revealed && index === selected ? 'text-[var(--error)]' : 'text-[var(--text-secondary)]'}`}>
                {option}
              </span>
              {revealed && index === correctIndex && (
                <CheckCircle className="w-4 h-4 text-[var(--success)] shrink-0" />
              )}
              {revealed && index === selected && index !== correctIndex && (
                <XCircle className="w-4 h-4 text-[var(--error)] shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mb-4"
        >
          <div
            className={`p-3.5 rounded-[10px] text-sm leading-relaxed ${
              isCorrect
                ? 'bg-[var(--success)]/5 border border-[var(--success)]/20 text-[var(--text-secondary)]'
                : 'bg-[var(--error)]/5 border border-[var(--error)]/20 text-[var(--text-secondary)]'
            }`}
          >
            <p className={`font-semibold mb-1 ${isCorrect ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </p>
            <p>{explanation}</p>
          </div>
          <button
            onClick={reset}
            className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Try again
          </button>
        </motion.div>
      )}
    </div>
  );
}
