'use client';

import { useMemo, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { CodeBlock } from '@/components/mdx/CodeBlock';
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

const problems: Problem[] = [
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'Easy',
    category: 'Loops',
    tags: ['loops', 'conditionals', 'math'],
    timeLimit: '< 1ms',
    description: `Print numbers from **1 to 100**:
- For multiples of **3**, print \`"Fizz"\`
- For multiples of **5**, print \`"Buzz"\`
- For multiples of **both 3 and 5**, print \`"FizzBuzz"\`
- Otherwise print the number itself`,
    examples: [
      { input: 'n = 15', output: '1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz', explanation: 'Standard FizzBuzz sequence' },
    ],
    constraints: ['1 ≤ n ≤ 100'],
    starterCode: {
      java: `public class FizzBuzz {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}`,
      python: `def fizzbuzz(n: int) -> None:\n    # Your code here\n    pass\n\nfizzbuzz(100)`,
      javascript: `function fizzBuzz(n) {\n  // Your code here\n}\n\nfizzBuzz(100);`,
      typescript: `function fizzBuzz(n: number): void {\n  // Your code here\n}\n\nfizzBuzz(100);`,
      cpp: `#include <iostream>\nusing namespace std;\n\nvoid fizzBuzz(int n) {\n    // Your code here\n}\n\nint main() {\n    fizzBuzz(100);\n    return 0;\n}`,
    },
    solutionCode: {
      java: `public class FizzBuzz {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 100; i++) {\n            if (i % 15 == 0) System.out.println("FizzBuzz");\n            else if (i % 3 == 0) System.out.println("Fizz");\n            else if (i % 5 == 0) System.out.println("Buzz");\n            else System.out.println(i);\n        }\n    }\n}`,
      python: `def fizzbuzz(n: int) -> None:\n    for i in range(1, n + 1):\n        if i % 15 == 0: print("FizzBuzz")\n        elif i % 3 == 0: print("Fizz")\n        elif i % 5 == 0: print("Buzz")\n        else: print(i)\n\nfizzbuzz(100)`,
      javascript: `function fizzBuzz(n) {\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) console.log("FizzBuzz");\n    else if (i % 3 === 0) console.log("Fizz");\n    else if (i % 5 === 0) console.log("Buzz");\n    else console.log(i);\n  }\n}\n\nfizzBuzz(100);`,
      typescript: `function fizzBuzz(n: number): void {\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) console.log("FizzBuzz");\n    else if (i % 3 === 0) console.log("Fizz");\n    else if (i % 5 === 0) console.log("Buzz");\n    else console.log(i);\n  }\n}\n\nfizzBuzz(100);`,
      cpp: `#include <iostream>\nusing namespace std;\n\nvoid fizzBuzz(int n) {\n    for (int i = 1; i <= n; i++) {\n        if (i % 15 == 0) cout << "FizzBuzz" << endl;\n        else if (i % 3 == 0) cout << "Fizz" << endl;\n        else if (i % 5 == 0) cout << "Buzz" << endl;\n        else cout << i << endl;\n    }\n}\n\nint main() {\n    fizzBuzz(100);\n    return 0;\n}`,
    },
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    category: 'Strings',
    tags: ['strings', 'two-pointer'],
    timeLimit: 'O(n)',
    description: `Given a string \`s\`, return the string reversed.

**Challenge**: Implement it without using the built-in reverse method.`,
    examples: [
      { input: 's = "hello"', output: '"olleh"' },
      { input: 's = "Java"',  output: '"avaJ"' },
    ],
    constraints: ['1 ≤ s.length ≤ 10⁵', 's consists of printable ASCII characters'],
    starterCode: {
      java: `public class Solution {\n    public String reverse(String s) {\n        // Your code here\n        return "";\n    }\n}`,
      python: `def reverse_string(s: str) -> str:\n    # Your code here\n    return ""\n\nprint(reverse_string("hello"))`,
      javascript: `function reverseString(s) {\n  // Your code here\n  return "";\n}\n\nconsole.log(reverseString("hello"));`,
      typescript: `function reverseString(s: string): string {\n  // Your code here\n  return "";\n}\n\nconsole.log(reverseString("hello"));`,
      cpp: `#include <string>\nusing namespace std;\n\nstring reverseStr(string s) {\n    // Your code here\n    return "";\n}\n\nint main() {\n    // Test here\n    return 0;\n}`,
    },
    solutionCode: {
      java: `public class Solution {\n    public String reverse(String s) {\n        char[] arr = s.toCharArray();\n        int l = 0, r = arr.length - 1;\n        while (l < r) {\n            char t = arr[l]; arr[l++] = arr[r]; arr[r--] = t;\n        }\n        return new String(arr);\n    }\n}`,
      python: `def reverse_string(s: str) -> str:\n    return s[::-1]\n\nprint(reverse_string("hello"))`,
      javascript: `function reverseString(s) {\n  return s.split("").reverse().join("");\n}\n\nconsole.log(reverseString("hello"));`,
      typescript: `function reverseString(s: string): string {\n  return s.split("").reverse().join("");\n}\n\nconsole.log(reverseString("hello"));`,
      cpp: `#include <string>\n#include <algorithm>\nusing namespace std;\n\nstring reverseStr(string s) {\n    reverse(s.begin(), s.end());\n    return s;\n}`,
    },
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Medium',
    category: 'Arrays',
    tags: ['arrays', 'hash-map', 'searching'],
    timeLimit: 'O(n)',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return **indices** of the two numbers that add up to \`target\`.

You may assume exactly one solution exists and you may not use the same element twice.`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
      { input: 'nums = [3,2,4], target = 6',     output: '[1,2]' },
    ],
    constraints: ['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', 'Exactly one valid answer exists'],
    starterCode: {
      java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}`,
      python: `from typing import List\n\ndef two_sum(nums: List[int], target: int) -> List[int]:\n    # Your code here\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))`,
      javascript: `function twoSum(nums, target) {\n  // Your code here\n  return [];\n}\n\nconsole.log(twoSum([2,7,11,15], 9));`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n  // Your code here\n  return [];\n}\n\nconsole.log(twoSum([2,7,11,15], 9));`,
      cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n    return {};\n}`,
    },
    solutionCode: {
      java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer,Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[]{map.get(comp), i};\n            map.put(nums[i], i);\n        }\n        throw new IllegalArgumentException();\n    }\n}`,
      python: `from typing import List\n\ndef two_sum(nums: List[int], target: int) -> List[int]:\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []\n\nprint(two_sum([2, 7, 11, 15], 9))`,
      javascript: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n}\n\nconsole.log(twoSum([2,7,11,15], 9));`,
      typescript: `function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number,number>();\n  for (let i = 0; i < nums.length; i++) {\n    const comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp)!, i];\n    map.set(nums[i], i);\n  }\n  return [];\n}\n\nconsole.log(twoSum([2,7,11,15], 9));`,
      cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int,int> m;\n    for (int i = 0; i < nums.size(); i++) {\n        int comp = target - nums[i];\n        if (m.count(comp)) return {m[comp], i};\n        m[nums[i]] = i;\n    }\n    return {};\n}`,
    },
  },
];

const playgroundChallenges: PlaygroundChallenge[] = [
  {
    id: 'sum-array',
    title: 'Array Sum',
    difficulty: 'Easy',
    description: 'Complete the function so it returns the sum of all numbers in the array.',
    starterCode: `function solve(numbers) {\n  return 0;\n}\n\nconsole.log(solve([1, 2, 3, 4])); // 10`,
  },
  {
    id: 'count-vowels',
    title: 'Count Vowels',
    difficulty: 'Easy',
    description: 'Return the number of vowels (a, e, i, o, u) in the given string.',
    starterCode: `function solve(text) {\n  return 0;\n}\n\nconsole.log(solve("CodePulse")); // 4`,
  },
  {
    id: 'max-number',
    title: 'Find Maximum',
    difficulty: 'Medium',
    description: 'Return the largest number from the provided array without using Math.max.',
    starterCode: `function solve(numbers) {\n  return 0;\n}\n\nconsole.log(solve([12, 4, 27, 9])); // 27`,
  },
];

const mcqQuestions: McqQuestion[] = [
  {
    id: 'java-jvm',
    question: 'What is the primary role of the JVM in Java?',
    difficulty: 'Easy',
    topic: 'Java Basics',
    options: [
      { id: 'a', text: 'To compile Java source code into bytecode' },
      { id: 'b', text: 'To execute Java bytecode on different platforms' },
      { id: 'c', text: 'To replace the Java compiler completely' },
      { id: 'd', text: 'To store Java source files in memory' },
    ],
    correctOptionId: 'b',
    explanation: "The JVM runs compiled Java bytecode, which is what enables Java's platform independence.",
  },
  {
    id: 'oop-encapsulation',
    question: 'Which OOP principle is focused on hiding internal implementation details?',
    difficulty: 'Easy',
    topic: 'OOP',
    options: [
      { id: 'a', text: 'Inheritance' },
      { id: 'b', text: 'Polymorphism' },
      { id: 'c', text: 'Encapsulation' },
      { id: 'd', text: 'Abstraction leak' },
    ],
    correctOptionId: 'c',
    explanation: 'Encapsulation bundles data and behavior together while controlling direct access to internal state.',
  },
  {
    id: 'collections-map',
    question: 'Which Java collection is best suited for storing key-value pairs?',
    difficulty: 'Medium',
    topic: 'Collections',
    options: [
      { id: 'a', text: 'List' },
      { id: 'b', text: 'Set' },
      { id: 'c', text: 'Queue' },
      { id: 'd', text: 'Map' },
    ],
    correctOptionId: 'd',
    explanation: 'A Map stores entries as key-value pairs and supports lookup by key.',
  },
  {
    id: 'exceptions-finally',
    question: 'Why is a finally block commonly used?',
    difficulty: 'Medium',
    topic: 'Exceptions',
    options: [
      { id: 'a', text: 'To declare checked exceptions' },
      { id: 'b', text: 'To ensure cleanup code runs whether or not an exception occurs' },
      { id: 'c', text: 'To stop exceptions from being thrown' },
      { id: 'd', text: 'To define custom exception classes' },
    ],
    correctOptionId: 'b',
    explanation: 'finally is typically used for cleanup, such as closing files or releasing resources.',
  },
];

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

function runJavaScript(code: string) {
  const logs: string[] = [];
  const logger = (...args: unknown[]) =>
    logs.push(args.map((a) => (typeof a === 'string' ? a : JSON.stringify(a))).join(' '));
  try {
    const executor = new Function('console', `'use strict';\n${code}`);
    executor({ log: logger, error: logger, warn: logger, info: logger });
    return {
      output: logs.length > 0 ? logs.join('\n') : 'Code executed — no console output.',
      error: '',
    };
  } catch (err) {
    return { output: logs.join('\n'), error: err instanceof Error ? err.message : 'Execution failed.' };
  }
}

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

  // Playground state
  const [selectedChallengeId, setSelectedChallengeId] = useState(playgroundChallenges[0].id);
  const selectedChallenge = useMemo(
    () => playgroundChallenges.find((c) => c.id === selectedChallengeId) ?? playgroundChallenges[0],
    [selectedChallengeId],
  );
  const [editorCode, setEditorCode] = useState(playgroundChallenges[0].starterCode);
  const [execOutput, setExecOutput] = useState('Click Run to execute JavaScript.');
  const [execError, setExecError] = useState('');

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

  function handleRunProblem() {
    if (activeLang === 'javascript') {
      const result = runJavaScript(editorCode);
      setProblemOutput(result.output || 'No output.');
      setProblemError(result.error);
    } else {
      setProblemOutput(`Execution for ${LANGUAGES.find(l => l.id === activeLang)?.label} is not supported in this browser environment.`);
      setProblemError('');
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

  function handleRun() {
    const result = runJavaScript(editorCode);
    setExecOutput(result.output || 'No output.');
    setExecError(result.error);
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
  editorCode, onEditorChange, execOutput, execError, onRun,
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
  onRun: () => void;
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
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" /> Output Console
                    </span>
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
                onRun();
                setIsConsoleOpen(true);
              }}
              className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] cursor-pointer transition-all shadow-md shadow-[var(--accent)]/10"
            >
              <Play className="w-3.5 h-3.5" /> Run Code
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
  editorCode, execOutput, execError,
  onChallengeChange, onEditorChange, onRun, onReset
}: {
  challenges: PlaygroundChallenge[];
  selectedChallengeId: string;
  selectedChallenge: PlaygroundChallenge;
  editorCode: string;
  execOutput: string;
  execError: string;
  onChallengeChange: (id: string) => void;
  onEditorChange: (v: string | undefined) => void;
  onRun: () => void;
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
            Use `console.log()` to output your results. When you're ready, click "Run Code" in the bottom bar to see the results.
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
                    <span className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-[var(--accent-secondary)]" /> Output Console
                    </span>
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
                  onRun();
                  setIsConsoleOpen(true);
                }}
                className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] cursor-pointer transition-all shadow-md shadow-[var(--accent)]/10"
              >
                <Play className="w-3.5 h-3.5" /> Run Code
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
