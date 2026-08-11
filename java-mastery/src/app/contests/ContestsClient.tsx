'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { executeCode, executionText, type CodeLanguage } from '@/lib/codeRunner';
import {
  Trophy,
  Clock,
  Users,
  Target,
  Zap,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Play,
  Lock,
  Star,
  Calendar,
  Timer,
  BarChart3,
  Brain,
  Code2,
  CheckCircle2,
  ArrowRight,
  Flame,
  X,
  PanelLeftOpen,
  PanelLeftClose,
  GripVertical,
  Terminal,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type ContestStatus = 'live' | 'upcoming' | 'completed' | 'practice';
type ContestDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

interface Contest {
  id: string;
  title: string;
  company?: string;
  type: 'OA' | 'Contest' | 'Mock Test' | 'Weekly';
  difficulty: ContestDifficulty;
  status: ContestStatus;
  duration: string;
  problems: number;
  participants?: number;
  startsAt?: string;
  topics: string[];
  description: string;
  locked: boolean;
}
interface ContestProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  starterCode: Record<string, string>;
  solutionCode: Record<string, string>;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
}

// Monaco dynamic loader
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const CONTEST_LANGUAGES = [
  { id: 'java', label: 'Java', monacoId: 'java' },
  { id: 'python', label: 'Python', monacoId: 'python' },
  { id: 'javascript', label: 'JavaScript', monacoId: 'javascript' },
];

const CONTEST_PROBLEMS: Record<string, ContestProblem[]> = {
  'weekly-1': [
    {
      id: 'two-sum',
      title: 'Two Sum',
      difficulty: 'Easy',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
      starterCode: {
        java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your Java code here\n        return new int[]{};\n    }\n}`,
        javascript: `function twoSum(nums, target) {\n    // Write your JavaScript code here\n    return [];\n}`,
        python: `from typing import List\n\ndef two_sum(nums: List[int], target: int) -> List[int]:\n    # Write your Python code here\n    return []`
      },
      solutionCode: {
        java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`,
        javascript: `function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}`,
        python: `from typing import List\n\ndef two_sum(nums: List[int], target: int) -> List[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []`
      },
      examples: [
        { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
      ],
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.']
    },
    {
      id: 'reverse-string',
      title: 'Reverse a String',
      difficulty: 'Easy',
      description: 'Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.',
      starterCode: {
        java: `class Solution {\n    public void reverseString(char[] s) {\n        // Write your Java code here\n    }\n}`,
        javascript: `function reverseString(s) {\n    // Write your JavaScript code here\n}`,
        python: `from typing import List\n\ndef reverse_string(s: List[str]) -> None:\n    # Write your Python code here\n    pass`
      },
      solutionCode: {
        java: `class Solution {\n    public void reverseString(char[] s) {\n        int left = 0, right = s.length - 1;\n        while (left < right) {\n            char temp = s[left];\n            s[left++] = s[right];\n            s[right--] = temp;\n        }\n    }\n}`,
        javascript: `function reverseString(s) {\n    let left = 0, right = s.length - 1;\n    while (left < right) {\n        const temp = s[left];\n        s[left++] = s[right];\n        s[right--] = temp;\n    }\n}`,
        python: `from typing import List\n\ndef reverse_string(s: List[str]) -> None:\n    left, right = 0, len(s) - 1\n    while left < right:\n        s[left], s[right] = s[right], s[left]\n        left += 1\n        right -= 1`
      },
      examples: [
        { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]' }
      ],
      constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character.']
    }
  ],
  'amazon-oa-1': [
    {
      id: 'merge-intervals',
      title: 'Merge Intervals',
      difficulty: 'Medium',
      description: 'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
      starterCode: {
        java: `import java.util.*;\n\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        // Write your Java code here\n        return new int[][]{};\n    }\n}`,
        javascript: `function merge(intervals) {\n    // Write your JavaScript code here\n    return [];\n}`,
        python: `from typing import List\n\ndef merge(intervals: List[List[int]]) -> List[List[int]]:\n    # Write your Python code here\n    return []`
      },
      solutionCode: {
        java: `import java.util.*;\n\nclass Solution {\n    public int[][] merge(int[][] intervals) {\n        if (intervals.length <= 1) return intervals;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> result = new ArrayList<>();\n        int[] currentInterval = intervals[0];\n        result.add(currentInterval);\n        for (int[] interval : intervals) {\n            int current_end = currentInterval[1];\n            int next_begin = interval[0];\n            int next_end = interval[1];\n            if (current_end >= next_begin) {\n                currentInterval[1] = Math.max(current_end, next_end);\n            } else {\n                currentInterval = interval;\n                result.add(currentInterval);\n            }\n        }\n        return result.toArray(new int[result.size()][]);\n    }\n}`,
        javascript: `function merge(intervals) {\n    if (intervals.length <= 1) return intervals;\n    intervals.sort((a, b) => a[0] - b[0]);\n    const result = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n        const current = result[result.length - 1];\n        const next = intervals[i];\n        if (current[1] >= next[0]) {\n            current[1] = Math.max(current[1], next[1]);\n        } else {\n            result.push(next);\n        }\n    }\n    return result;\n}`,
        python: `from typing import List\n\ndef merge(intervals: List[List[int]]) -> List[List[int]]:\n    if len(intervals) <= 1: return intervals\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for current in intervals[1:]:\n        prev_end = merged[-1][1]\n        curr_start = current[0]\n        curr_end = current[1]\n        if prev_end >= curr_start:\n            merged[-1][1] = max(prev_end, curr_end)\n        else:\n            merged.append(current)\n    return merged`
      },
      examples: [
        { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' }
      ],
      constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4']
    }
  ]
};

function getContestProblems(contestId: string): ContestProblem[] {
  return CONTEST_PROBLEMS[contestId] || [
    {
      id: 'default-1',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
      starterCode: {
        java: `class Solution {\n    public boolean isValid(String s) {\n        // Write your Java code here\n        return false;\n    }\n}`,
        javascript: `function isValid(s) {\n    // Write your JavaScript code here\n    return false;\n}`,
        python: `def is_valid(s: str) -> bool:\n    # Write your Python code here\n    return False`
      },
      solutionCode: {
        java: `import java.util.*;\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == \'(\') stack.push(\')\');\n            else if (c == \'{\') stack.push(\'}\');\n            else if (c == \'[\') stack.push(\']\');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`,
        javascript: `function isValid(s) {\n    const stack = [];\n    const mapping = { ")": "(", "}": "{", "]": "[" };\n    for (let char of s) {\n        if (char === "(" || char === "{" || char === "[") {\n            stack.push(char);\n        } else {\n            if (stack.pop() !== mapping[char]) return false;\n        }\n    }\n    return stack.length === 0;\n}`,
        python: `def is_valid(s: str) -> bool:\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in ["(", "{", "["]:\n            stack.append(char)\n        else:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n    return len(stack) == 0`
      },
      examples: [
        { input: 's = "()"', output: 'true' },
        { input: 's = "()[]{}"', output: 'true' }
      ],
      constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\'.']
    }
  ];
}

// ── Data ──────────────────────────────────────────────────────────────────────

import contestsData from '@/data/contests.json';

const CONTESTS: Contest[] = contestsData as Contest[];

// ── Company badge helpers ──────────────────────────────────────────────────────

const COMPANY_COLORS: Record<string, string> = {
  Amazon:    'bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/25',
  Google:    'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/25',
  Microsoft: 'bg-[#00A4EF]/10 text-[#00A4EF] border-[#00A4EF]/25',
};

const DIFFICULTY_COLORS: Record<ContestDifficulty, string> = {
  Easy:   'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  Medium: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  Hard:   'bg-[#FF5F57]/10 text-[#FF5F57] border-[#FF5F57]/20',
  Mixed:  'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
};

const STATUS_LABEL: Record<ContestStatus, { label: string; cls: string }> = {
  live:      { label: 'LIVE',      cls: 'bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/20 animate-pulse' },
  upcoming:  { label: 'UPCOMING',  cls: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20' },
  completed: { label: 'ENDED',     cls: 'bg-[var(--surface-elevated)] text-[var(--text-disabled)] border-[var(--border-color)]' },
  practice:  { label: 'PRACTICE',  cls: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20' },
};

const TYPE_ICON: Record<Contest['type'], React.ElementType> = {
  'OA':         Target,
  'Contest':    Trophy,
  'Mock Test':  Brain,
  'Weekly':     Calendar,
};

// ── OA Tips data ──────────────────────────────────────────────────────────────

const OA_TIPS = [
  { icon: Timer,      tip: 'Read all problems first — start with the one you can solve fastest.' },
  { icon: Code2,      tip: 'Write edge-case tests before submitting: empty input, single element, large values.' },
  { icon: BarChart3,  tip: 'Aim for O(n log n) or better — brute force O(n²) often TLEs on large inputs.' },
  { icon: CheckCircle2, tip: 'Partial credit matters in some OA formats — submit working brute force before optimising.' },
  { icon: Flame,      tip: 'Practice 2–3 contests a week to build speed and pattern recognition.' },
];

// ── Component ─────────────────────────────────────────────────────────────────

type FilterTab = 'all' | ContestStatus | Contest['type'];

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: 'all',        label: 'All' },
  { key: 'practice',  label: 'Practice' },
  { key: 'upcoming',  label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'OA',        label: 'OA Sim' },
  { key: 'Weekly',    label: 'Weekly' },
  { key: 'Mock Test', label: 'Mock Tests' },
];

export function ContestsClient() {
  const [filter, setFilter] = useState<FilterTab>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  // Contest Mode States
  const [activeContest, setActiveContest] = useState<Contest | null>(null);
  const [activeProblems, setActiveProblems] = useState<ContestProblem[]>([]);
  const [activeProblemIdx, setActiveProblemIdx] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [contestCompleted, setContestCompleted] = useState<boolean>(false);
  const [activeLang, setActiveLang] = useState<string>('java');
  const [editorCodes, setEditorCodes] = useState<Record<string, Record<string, string>>>({}); // problemId -> lang -> code
  const [submittedProblems, setSubmittedProblems] = useState<Record<string, boolean>>({}); // problemId -> boolean
  const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);
  const [execOutput, setExecOutput] = useState<string>('Click Run to execute.');
  const [execError, setExecError] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);

  // Resizable split state
  const [descWidthPct, setDescWidthPct] = useState(42);
  const [isDragging, setIsDragging] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  // Timer useEffect
  useEffect(() => {
    if (!activeContest || contestCompleted) return;
    const interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setContestCompleted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeContest, contestCompleted]);

  const handleStartContest = (contest: Contest) => {
    const problemsList = getContestProblems(contest.id);
    setActiveContest(contest);
    setActiveProblems(problemsList);
    setActiveProblemIdx(0);
    const mins = parseInt(contest.duration) || 60;
    setTimeRemaining(mins * 60);
    setContestCompleted(false);
    setActiveLang('java');

    const codes: Record<string, Record<string, string>> = {};
    problemsList.forEach((p) => {
      codes[p.id] = { ...p.starterCode };
    });
    setEditorCodes(codes);
    setSubmittedProblems({});
    setIsConsoleOpen(false);
    setExecOutput('Click Run to execute.');
    setExecError('');
  };

  const handleRunCode = async () => {
    const currentProblem = activeProblems[activeProblemIdx];
    const code = editorCodes[currentProblem.id]?.[activeLang] || '';
    setIsRunning(true);
    setIsConsoleOpen(true);
    setExecOutput('Submitting to Judge0…');
    setExecError('');
    try {
      const result = await executeCode(code, activeLang as CodeLanguage);
      setExecOutput(executionText(result));
      setExecError(result.status.id === 3 ? '' : result.status.description);
      return result.status.id === 3;
    } catch (error) {
      setExecOutput('Execution failed');
      setExecError(error instanceof Error ? error.message : 'The code runner is unavailable.');
      return false;
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    const currentProblem = activeProblems[activeProblemIdx];
    const accepted = await handleRunCode();
    if (accepted) {
      setSubmittedProblems((prev) => ({ ...prev, [currentProblem.id]: true }));
      setExecOutput((output) => `${output}\n\nSubmission executed successfully. Hidden test-case judging is not available yet.`);
    }
  };

  const handleFinishContest = () => {
    setContestCompleted(true);
  };

  const handleBackToDashboard = () => {
    setActiveContest(null);
    setContestCompleted(false);
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return [
      h.toString().padStart(2, '0'),
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0'),
    ].join(':');
  };

  const filtered = CONTESTS.filter((c) => {
    if (filter === 'all') return true;
    return c.status === filter || c.type === filter;
  });

  // ── Render 1: Contest Active Giving Window ───────────────────
  if (activeContest && !contestCompleted) {
    const currentProblem = activeProblems[activeProblemIdx];

    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col overflow-hidden">
        {/* Contest Header */}
        <header className="h-14 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-3">
            <span className="text-sm font-heading font-bold text-[var(--text-primary)]">
              {activeContest.title}
            </span>
            <span className="hidden sm:inline text-xs text-[var(--text-disabled)]">·Timed OA Arena</span>
          </div>

          <div className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border-color)] px-4 py-1.5 rounded-full shadow-sm">
            <Timer className="w-4 h-4 text-[var(--accent)] animate-pulse" />
            <span className="text-sm font-mono font-bold text-[var(--text-primary)]">
              {formatTime(timeRemaining)}
            </span>
          </div>

          <button
            onClick={handleFinishContest}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 text-xs font-bold transition-all cursor-pointer shadow-md shadow-red-500/5"
          >
            Finish Contest
          </button>
        </header>

        {/* Resizable workspace */}
        <div className="flex-1 flex overflow-hidden relative">

          {/* Collapsed Sidebar Toggle Tab */}
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

          {/* Left panel: Questions Switcher list */}
          {isSidebarOpen && (
            <div className="w-[260px] shrink-0 border-r border-[var(--border-color)] bg-[var(--bg-secondary)] flex flex-col overflow-hidden">
              <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center justify-between shrink-0">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Contest Problems</span>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-1 rounded hover:bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
                  title="Collapse Sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {activeProblems.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProblemIdx(idx)}
                    className={`w-full text-left p-3 rounded-xl border cursor-pointer transition-all ${
                      idx === activeProblemIdx
                        ? 'border-[var(--accent)] bg-[var(--surface-elevated)] border-opacity-40'
                        : 'border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)]/20'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs text-[var(--text-disabled)] font-mono">Q{idx + 1}.</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)] truncate flex-1">{p.title}</span>
                      {submittedProblems[p.id] && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] shrink-0" />
                      )}
                    </div>
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[8px] font-bold ${DIFFICULTY_COLORS[p.difficulty]}`}>
                      {p.difficulty}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main split workarea */}
          <div ref={containerRef} className="flex-1 flex overflow-hidden min-w-0">

            {/* Left side: Problem Description */}
            <div
              className="flex flex-col border-r border-[var(--border-color)] overflow-hidden shrink-0 bg-[var(--bg)] p-5 space-y-5"
              style={{ width: `${descWidthPct}%` }}
            >
              <div>
                <span className="text-[10px] text-[var(--accent)] uppercase font-bold tracking-wider">Question {activeProblemIdx + 1}</span>
                <h2 className="text-lg font-heading font-bold text-[var(--text-primary)] mt-1 mb-2">{currentProblem.title}</h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${DIFFICULTY_COLORS[currentProblem.difficulty]}`}>
                  {currentProblem.difficulty}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-5 pr-1">
                {/* Description */}
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                  {currentProblem.description}
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Examples</p>
                  {currentProblem.examples.map((ex, i) => (
                    <div key={i} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-3 text-xs font-mono space-y-1">
                      <div><span className="text-[var(--text-disabled)]">Input: </span><span className="text-[var(--text-secondary)]">{ex.input}</span></div>
                      <div><span className="text-[var(--text-disabled)]">Output: </span><span className="text-[var(--success)]">{ex.output}</span></div>
                      {ex.explanation && <div className="text-[var(--text-disabled)] font-sans">{ex.explanation}</div>}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2 pb-6">
                  <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Constraints</p>
                  <ul className="space-y-1">
                    {currentProblem.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <span className="text-[var(--text-disabled)] shrink-0">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Drag Handle */}
            <div
              onMouseDown={onMouseDown}
              title="Drag to resize"
              className="w-2 shrink-0 flex items-center justify-center cursor-col-resize group bg-transparent hover:bg-[var(--accent)]/8 transition-colors z-10 border-r border-[var(--border-color)]"
            >
              <GripVertical className="w-3 h-3 text-[var(--text-disabled)] group-hover:text-[var(--accent)] transition-colors" />
            </div>

            {/* Right side: Editor + status bar + sliding console drawer */}
            <div className={`flex flex-col flex-1 min-w-0 overflow-hidden bg-[var(--surface)] ${isDragging ? 'pointer-events-none' : ''}`}>
              {/* Editor Header */}
              <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface)] shrink-0">
                {/* Language Picker */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-color)]">
                  {CONTEST_LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => setActiveLang(lang.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
                        activeLang === lang.id
                          ? 'bg-[var(--accent)] text-white'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-[var(--text-disabled)] font-mono">Editor</div>
              </div>

              {/* Monaco Editor Container */}
              <div className="flex-1 relative overflow-hidden min-h-0 bg-[var(--bg)]">
                <div className="absolute inset-0">
                  <MonacoEditor
                    height="100%"
                    language={CONTEST_LANGUAGES.find((l) => l.id === activeLang)?.monacoId ?? 'javascript'}
                    value={editorCodes[currentProblem.id]?.[activeLang] || ''}
                    onChange={(v) => {
                      setEditorCodes((prev) => ({
                        ...prev,
                        [currentProblem.id]: {
                          ...(prev[currentProblem.id] || {}),
                          [activeLang]: v || '',
                        },
                      }));
                    }}
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

                {/* Sliding Console Drawer */}
                <AnimatePresence>
                  {isConsoleOpen && (
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      className="absolute bottom-0 left-0 right-0 h-60 border-t border-[var(--border-color)] bg-[var(--surface)] flex flex-col z-20 shadow-2xl"
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

              {/* Bottom toolbar */}
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
                    onClick={() => void handleRunCode()}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:bg-[var(--surface-elevated)] cursor-pointer transition-colors disabled:cursor-wait disabled:opacity-60"
                  >
                    {isRunning ? <span className="h-3 w-3 animate-spin rounded-full border-2 border-current/30 border-t-current" /> : <Play className="w-3 h-3" />}
                    {isRunning ? 'Running…' : 'Run Code'}
                  </button>
                  <button
                    onClick={() => void handleSubmitCode()}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg bg-[var(--accent)] text-white text-xs font-semibold hover:bg-[var(--accent-hover)] cursor-pointer transition-all shadow-md shadow-[var(--accent)]/10 disabled:cursor-wait disabled:opacity-60"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ── Render 2: Contest Completed Summary Screen ──────────────
  if (activeContest && contestCompleted) {
    const solvedCount = Object.values(submittedProblems).filter(Boolean).length;
    const allSolved = solvedCount === activeProblems.length;

    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-12 flex-1 flex flex-col justify-center space-y-8 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] shadow-2xl relative overflow-hidden"
          >
            {/* Top accent badge */}
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-4 border border-[var(--accent)]/20 animate-bounce">
              <Trophy className="w-8 h-8 text-[var(--accent)]" />
            </div>

            <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
              {allSolved ? 'Outstanding Performance!' : 'Contest Finished!'}
            </h1>
            <p className="text-xs text-[var(--text-muted)] mt-1.5">
              You completed the {activeContest.title} simulation. Review your performance stats below.
            </p>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Solved', value: `${solvedCount} / ${activeProblems.length}`, color: 'text-[var(--accent)]' },
                { label: 'Time Limit', value: activeContest.duration, color: 'text-[var(--text-secondary)]' },
                { label: 'Accuracy', value: solvedCount > 0 ? '100%' : '0%', color: 'text-[var(--success)]' },
                { label: 'XP Points', value: `+${solvedCount * 50} XP`, color: 'text-[var(--accent-secondary)]' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-sm">
                  <p className={`text-base font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] text-[var(--text-disabled)] uppercase font-semibold tracking-wider mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Performance analysis */}
            <div className="mt-6 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-left space-y-1 text-xs">
              <p className="font-semibold text-[var(--text-primary)]">Estimated standing rank: <span className="text-[var(--accent)] font-bold">#42 / {activeContest.participants?.toLocaleString() || '1,200'}</span></p>
              <p className="text-[var(--text-muted)]">Your attempt places you in the top 5% of placement candidates. Great speed on array-based tasks!</p>
            </div>
          </motion.div>

          {/* List of problems with submission statuses */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider px-1">Problem Submission Breakdown</h2>
            <div className="space-y-3">
              {activeProblems.map((p, idx) => {
                const wasSolved = submittedProblems[p.id];
                return (
                  <div key={p.id} className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--text-disabled)] font-mono">Q{idx + 1}</span>
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{p.title}</h3>
                        <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded-full font-bold border mt-1 ${DIFFICULTY_COLORS[p.difficulty]}`}>
                          {p.difficulty}
                        </span>
                      </div>
                    </div>
                    <div>
                      {wasSolved ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--success)] px-3 py-1.5 rounded-xl border border-[var(--success)]/20 bg-[var(--success)]/5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-disabled)] px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)]">
                          Unattempted
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="text-center pt-4">
            <button
              onClick={handleBackToDashboard}
              className="px-6 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold transition-all shadow-md shadow-[var(--accent)]/10 cursor-pointer"
            >
              Return to Contests Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render 3: Main Dashboard List ────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center animate-pulse">
                <Trophy className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                  Contests & OA Prep
                </h1>
                <p className="text-sm text-[var(--text-muted)]">
                  Timed practice, OA simulations, and mock tests for placements
                </p>
              </div>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {[
              { icon: Trophy,  label: 'Contests',     value: CONTESTS.length },
              { icon: Play,    label: 'Practice Now',  value: CONTESTS.filter(c => c.status === 'practice').length },
              { icon: Target,  label: 'OA Sims',       value: CONTESTS.filter(c => c.type === 'OA').length },
              { icon: Users,   label: 'Total Attempts', value: '12k+' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] shadow-sm">
                <s.icon className="w-4 h-4 text-[var(--accent)] shrink-0 animate-pulse" />
                <div>
                  <p className="text-lg font-heading font-bold text-[var(--text-primary)] leading-none">{s.value}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Filter tabs ─────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-medium border transition-all cursor-pointer ${
                filter === tab.key
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/25'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border-color)] hover:border-[var(--accent)]/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Contest cards ────────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((contest, idx) => {
              const TypeIcon = TYPE_ICON[contest.type];
              const statusMeta = STATUS_LABEL[contest.status];
              const isExpanded = expanded === contest.id;

              return (
                <motion.div
                  key={contest.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: idx * 0.04 }}
                  className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden shadow-sm hover:shadow-md hover:border-[var(--accent)]/15 transition-all"
                >
                  {/* Card header */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center shrink-0">
                          <TypeIcon className="w-4 h-4 text-[var(--accent)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-tight truncate">{contest.title}</h3>
                          {contest.company && (
                            <span className={`inline-block mt-0.5 text-[9px] font-medium px-1.5 py-0.5 rounded-full border ${COMPANY_COLORS[contest.company] ?? 'bg-[var(--surface-elevated)] text-[var(--text-muted)] border-[var(--border-color)]'}`}>
                              {contest.company}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className={`shrink-0 text-[9px] font-bold px-2 py-1 rounded-full border tracking-wide ${statusMeta.cls}`}>
                        {statusMeta.label}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">{contest.description}</p>

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-disabled)]">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{contest.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{contest.problems} problems</span>
                      {contest.participants && (
                        <span className="flex items-center gap-1"><Users className="w-3 h-3" />{contest.participants.toLocaleString()} attempts</span>
                      )}
                      {contest.startsAt && (
                        <span className="flex items-center gap-1 text-[var(--accent-secondary)]"><Calendar className="w-3 h-3" />{contest.startsAt}</span>
                      )}
                      <span className={`px-1.5 py-0.5 rounded-full border text-[10px] font-semibold ${DIFFICULTY_COLORS[contest.difficulty]}`}>
                        {contest.difficulty}
                      </span>
                    </div>

                    {/* Topics (collapsible) */}
                    <div className="mt-3">
                      <button
                        onClick={() => setExpanded(isExpanded ? null : contest.id)}
                        className="flex items-center gap-1.5 text-[10px] text-[var(--text-disabled)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                      >
                        <ChevronRight className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        {isExpanded ? 'Hide topics' : 'Show topics'}
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {contest.topics.map((t) => (
                                <span key={t} className="px-2 py-0.5 text-[9px] rounded-full border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)] font-medium">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* CTA footer */}
                  <div className="border-t border-[var(--border-color)] px-5 py-3 flex items-center justify-between bg-[var(--surface-elevated)]/5">
                    <span className="text-[9px] text-[var(--text-disabled)] uppercase tracking-wider font-semibold">{contest.type}</span>
                    {contest.locked ? (
                      <span className="flex items-center gap-1.5 text-xs text-[var(--text-disabled)] px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)]">
                        <Lock className="w-3.5 h-3.5" /> Locked
                      </span>
                    ) : contest.status === 'upcoming' ? (
                      <button
                        onClick={() => alert(`Mock Reminder: You have set a reminder for ${contest.title}!`)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-xl transition-all bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        Set Reminder
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStartContest(contest)}
                        className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-xl transition-all bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] cursor-pointer shadow-sm shadow-[var(--accent)]/10"
                      >
                        <Play className="w-3 h-3" />
                        Start Simulation
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--surface)]">
            <Trophy className="w-10 h-10 text-[var(--text-disabled)] mx-auto mb-3" />
            <p className="text-[var(--text-muted)] text-sm">No contests match this filter.</p>
          </div>
        )}

        {/* ── OA Tips ──────────────────────────────────────────────────────── */}
        <section className="pt-6">
          <div className="flex items-center gap-2 mb-5">
            <Star className="w-4 h-4 text-[var(--accent)]" />
            <h2 className="text-base font-heading font-bold text-[var(--text-primary)]">OA Strategy Tips</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {OA_TIPS.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex gap-3 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] shadow-sm"
              >
                <tip.icon className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5 animate-pulse" />
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{tip.tip}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Practice CTA ─────────────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">Sharpen your skills in the Practice Arena</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">Solve LeetCode-style problems, run MCQ drills, and use the live playground.</p>
          </div>
          <Link
            href="/practice"
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm"
          >
            Open Practice <ArrowRight className="w-4 h-4 animate-bounce" />
          </Link>
        </div>

      </div>
    </div>
  );
}
