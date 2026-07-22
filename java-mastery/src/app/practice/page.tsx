'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { CodeBlock } from '@/components/mdx/CodeBlock';
import { Terminal, Code2, ChevronDown, CheckCircle2, Circle, Lightbulb, Trophy } from 'lucide-react';

type Difficulty = 'Easy' | 'Medium' | 'Hard';

interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: string;
  description: string;
  starterCode: string;
  solutionCode: string;
}

const problems: Problem[] = [
  {
    id: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'Easy',
    category: 'Loops & Conditionals',
    description: 'Write a program that prints the numbers from 1 to 100. But for multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".',
    starterCode: `public class FizzBuzz {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    solutionCode: `public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 100; i++) {
            if (i % 15 == 0) {
                System.out.println("FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println("Fizz");
            } else if (i % 5 == 0) {
                System.out.println("Buzz");
            } else {
                System.out.println(i);
            }
        }
    }
}`
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'Write a method that takes a String and returns it reversed. Do not use the built-in StringBuilder reverse() method if you want an extra challenge!',
    starterCode: `public class StringReverser {
    public static String reverse(String input) {
        // Your code here
        return "";
    }
}`,
    solutionCode: `public class StringReverser {
    public static String reverse(String input) {
        char[] characters = input.toCharArray();
        int left = 0;
        int right = characters.length - 1;
        
        while (left < right) {
            char temp = characters[left];
            characters[left] = characters[right];
            characters[right] = temp;
            left++;
            right--;
        }
        
        return new String(characters);
    }
}`
  },
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Medium',
    category: 'Arrays & HashMaps',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    starterCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    solutionCode: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            
            map.put(nums[i], i);
        }
        
        throw new IllegalArgumentException("No two sum solution");
    }
}`
  }
];

const difficultyColors = {
  Easy: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  Medium: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
  Hard: 'bg-[#FF5F57]/10 text-[#FF5F57] border-[#FF5F57]/20',
};

export default function PracticePage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleProblem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleSolution = (id: string) => {
    setShowSolution(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompleted = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center">
              <Terminal className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold text-[var(--text-primary)]">
                Practice Ground
              </h1>
              <p className="text-[var(--text-muted)] mt-1">
                Test your Java skills with these interactive coding challenges.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-6 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-[var(--highlight)]" />
              <div>
                <p className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">Completed</p>
                <p className="text-lg font-bold text-[var(--text-primary)]">{completedCount} / {problems.length}</p>
              </div>
            </div>
            <div className="flex-1 h-2 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-secondary)]"
                initial={{ width: 0 }}
                animate={{ width: `${(completedCount / problems.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4">
          {problems.map((problem) => {
            const isExpanded = expandedId === problem.id;
            const isCompleted = completed[problem.id];
            const isSolutionVisible = showSolution[problem.id];

            return (
              <div 
                key={problem.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded 
                    ? 'border-[var(--accent)]/30 bg-[var(--surface)] shadow-lg shadow-[var(--accent)]/5' 
                    : 'border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)]/20 hover:bg-[var(--surface-elevated)]'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleProblem(problem.id)}
                  className="w-full flex items-center gap-4 p-5 cursor-pointer text-left"
                >
                  <div 
                    onClick={(e) => toggleCompleted(problem.id, e)}
                    className="shrink-0 p-1 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
                    ) : (
                      <Circle className="w-6 h-6 text-[var(--text-disabled)]" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className={`font-heading font-semibold text-lg truncate ${isCompleted ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                        {problem.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColors[problem.difficulty]}`}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)]">
                      {problem.category}
                    </p>
                  </div>

                  <ChevronDown className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-2 border-t border-[var(--border-color)]">
                        <div className="prose prose-invert max-w-none text-sm text-[var(--text-secondary)] mb-6 mt-4 leading-relaxed">
                          {problem.description}
                        </div>

                        {!isSolutionVisible ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                              <Code2 className="w-4 h-4 text-[var(--accent)]" />
                              Starter Code
                            </div>
                            <CodeBlock language="java" filename="Main.java">
                              {problem.starterCode}
                            </CodeBlock>
                            
                            <button
                              onClick={() => toggleSolution(problem.id)}
                              className="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-medium hover:bg-[var(--accent)]/10 transition-colors cursor-pointer"
                            >
                              <Lightbulb className="w-4 h-4" />
                              Show Solution
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 text-sm font-medium text-[var(--success)]">
                              <CheckCircle2 className="w-4 h-4" />
                              Solution
                            </div>
                            <CodeBlock language="java" filename="Solution.java">
                              {problem.solutionCode}
                            </CodeBlock>
                            
                            <button
                              onClick={() => toggleSolution(problem.id)}
                              className="mt-6 flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] text-sm font-medium hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
                            >
                              Hide Solution
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
