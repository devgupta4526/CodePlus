// ============================================================================
// CodePulse — Course Data Structure
// Flexible: add/remove lessons and chapters by editing this file
// ============================================================================

import { type LessonMeta, type Chapter } from '@/types';

// ---------------------------------------------------------------------------
// All lessons — ordered by chapter and lesson number
// To add a new lesson: add an entry here and create the corresponding .mdx file
// To remove a lesson: delete the entry here and remove the .mdx file
// ---------------------------------------------------------------------------
export const ALL_LESSONS: LessonMeta[] = [
  // ── Chapter 1: Java Foundations ──────────────────────────────────────
  {
    course: 'java',
    title: 'OOP Fundamentals',
    slug: 'oop-fundamentals',
    chapter: 1,
    chapterTitle: 'Java Foundations',
    lesson: 1,
    description: 'Objects, Classes, Four Pillars of OOP, Relationships, Interview Prep',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    prerequisites: [],
    objectives: [
      'Understand what OOP is and why it exists',
      'Differentiate between Procedural and OOP paradigms',
      'Master the four pillars: Abstraction, Encapsulation, Inheritance, Polymorphism',
      'Understand OOP relationships: IS-A, HAS-A, Aggregation, Composition',
    ],
    tags: ['oop', 'classes', 'objects', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction'],
  },
  {
    course: 'java',
    title: 'How Java Works',
    slug: 'how-java-works',
    chapter: 1,
    chapterTitle: 'Java Foundations',
    lesson: 2,
    description: 'JVM, JRE, JDK, WORA principle, Compilation to Execution flow',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    prerequisites: [],
    objectives: [
      'Understand what Java is and its key characteristics',
      'Explain WORA (Write Once, Run Anywhere)',
      'Differentiate between JVM, JRE, and JDK',
      'Trace the complete flow from source code to execution',
    ],
    tags: ['jvm', 'jre', 'jdk', 'wora', 'bytecode', 'compilation'],
  },
  {
    course: 'java',
    title: 'Variables & Primitive Types',
    slug: 'variables-primitive-types',
    chapter: 1,
    chapterTitle: 'Java Foundations',
    lesson: 3,
    description: 'Primitive data types, type system, naming conventions, two\'s complement',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    prerequisites: ['how-java-works'],
    objectives: [
      'Understand Java\'s static and strong type system',
      'Master all 8 primitive data types with ranges and defaults',
      'Apply variable naming conventions',
      'Understand two\'s complement representation',
    ],
    tags: ['variables', 'primitives', 'int', 'double', 'boolean', 'char', 'types'],
  },

  // ── Chapter 2: Core Language ─────────────────────────────────────────
  {
    course: 'java',
    title: 'Reference Types & Strings',
    slug: 'reference-types',
    chapter: 2,
    chapterTitle: 'Core Language',
    lesson: 4,
    description: 'Reference types, String, Arrays, Stack vs Heap, pass-by-value',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    prerequisites: ['variables-primitive-types'],
    objectives: [
      'Differentiate primitive types from reference types',
      'Understand how references work in memory',
      'Master String handling and immutability',
      'Understand pass-by-value semantics in Java',
    ],
    tags: ['reference-types', 'strings', 'arrays', 'memory', 'stack', 'heap'],
  },
  {
    course: 'java',
    title: 'Float, Double & IEEE 754',
    slug: 'float-double-ieee754',
    chapter: 2,
    chapterTitle: 'Core Language',
    lesson: 5,
    description: 'Floating-point representation, IEEE 754 standard, precision pitfalls',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    prerequisites: ['variables-primitive-types'],
    objectives: [
      'Understand IEEE 754 floating-point representation',
      'Recognize precision issues with float and double',
      'Know when to use BigDecimal for exact calculations',
    ],
    tags: ['float', 'double', 'ieee754', 'precision', 'bigdecimal'],
  },
  {
    course: 'java',
    title: 'Control Flow Statements',
    slug: 'control-flow-statements',
    chapter: 2,
    chapterTitle: 'Core Language',
    lesson: 6,
    description: 'If-else, switch cases, for loops, while loops, and jumping statements',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    prerequisites: ['variables-primitive-types'],
    objectives: [
      'Master decision making with if-else and switch',
      'Understand loop structures: for, while, do-while',
      'Use break and continue effectively',
    ],
    tags: ['control-flow', 'if-else', 'switch', 'loops', 'for', 'while'],
  },
  {
    course: 'java',
    title: 'Operators',
    slug: 'operators',
    chapter: 2,
    chapterTitle: 'Core Language',
    lesson: 7,
    description: 'All Java operators: arithmetic, logical, bitwise, assignment, ternary',
    difficulty: 'beginner',
    estimatedMinutes: 35,
    prerequisites: ['variables-primitive-types'],
    objectives: [
      'Master all categories of Java operators',
      'Understand operator precedence and associativity',
      'Apply bitwise operators for low-level operations',
    ],
    tags: ['operators', 'arithmetic', 'logical', 'bitwise', 'ternary'],
  },
  {
    course: 'java',
    title: 'Methods',
    slug: 'methods',
    chapter: 2,
    chapterTitle: 'Core Language',
    lesson: 8,
    description: 'Method declaration, access specifiers, overloading, varargs, static methods',
    difficulty: 'beginner',
    estimatedMinutes: 40,
    prerequisites: ['variables-primitive-types'],
    objectives: [
      'Understand complete method anatomy and declaration',
      'Master all four access specifiers',
      'Implement method overloading and understand static binding',
      'Use variable arguments (varargs)',
    ],
    tags: ['methods', 'access-modifiers', 'overloading', 'static', 'varargs'],
  },
  {
    course: 'java',
    title: 'Constructors',
    slug: 'constructors',
    chapter: 2,
    chapterTitle: 'Core Language',
    lesson: 9,
    description: 'Constructor types, this keyword, constructor chaining, copy constructors',
    difficulty: 'beginner',
    estimatedMinutes: 30,
    prerequisites: ['methods'],
    objectives: [
      'Understand why constructors exist and how they differ from methods',
      'Master constructor overloading and chaining',
      'Use the this keyword effectively',
      'Implement copy constructors',
    ],
    tags: ['constructors', 'this', 'chaining', 'initialization'],
  },

  // ── Chapter 3: Object-Oriented Design ────────────────────────────────
  {
    course: 'java',
    title: 'Types of Classes',
    slug: 'types-of-classes',
    chapter: 3,
    chapterTitle: 'Object-Oriented Design',
    lesson: 10,
    description: 'Inner classes, anonymous classes, abstract classes, static nested classes',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    prerequisites: ['constructors'],
    objectives: [
      'Differentiate between all types of classes in Java',
      'Implement inner, static nested, local, and anonymous classes',
      'Understand when to use abstract classes',
    ],
    tags: ['inner-class', 'anonymous-class', 'abstract-class', 'static-class', 'nested-class'],
  },
  {
    course: 'java',
    title: 'POJO, Enum, Final & Records',
    slug: 'pojo-enum-final',
    chapter: 3,
    chapterTitle: 'Object-Oriented Design',
    lesson: 11,
    description: 'POJO pattern, enumerations, final keyword, Java Records',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    prerequisites: ['types-of-classes'],
    objectives: [
      'Build proper POJOs following Java conventions',
      'Master enum with methods, constructors, and fields',
      'Apply the final keyword to variables, methods, and classes',
    ],
    tags: ['pojo', 'enum', 'final', 'records', 'immutability'],
  },
  {
    course: 'java',
    title: 'Interfaces — Fundamentals',
    slug: 'interfaces-fundamentals',
    chapter: 3,
    chapterTitle: 'Object-Oriented Design',
    lesson: 12,
    description: 'Interface basics, multiple inheritance, abstract vs interface',
    difficulty: 'intermediate',
    estimatedMinutes: 35,
    prerequisites: ['types-of-classes'],
    objectives: [
      'Understand what interfaces are and why they exist',
      'Implement interfaces and achieve multiple inheritance',
      'Differentiate between abstract classes and interfaces',
    ],
    tags: ['interfaces', 'abstraction', 'multiple-inheritance', 'contract'],
  },
  {
    course: 'java',
    title: 'Interfaces — Java 8/9 Features',
    slug: 'interfaces-java8-java9',
    chapter: 3,
    chapterTitle: 'Object-Oriented Design',
    lesson: 13,
    description: 'Default methods, static methods, private methods in interfaces',
    difficulty: 'intermediate',
    estimatedMinutes: 25,
    prerequisites: ['interfaces-fundamentals'],
    objectives: [
      'Use default methods to add backward-compatible features',
      'Implement static and private methods in interfaces',
      'Resolve diamond problem with default methods',
    ],
    tags: ['interfaces', 'default-methods', 'static-methods', 'java8', 'java9'],
  },
  {
    course: 'java',
    title: 'Exception Handling',
    slug: 'exception-handling',
    chapter: 3,
    chapterTitle: 'Object-Oriented Design',
    lesson: 14,
    description: 'try-catch-finally, checked vs unchecked, custom exceptions, throw vs throws',
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    prerequisites: ['methods'],
    objectives: [
      'Understand the exception hierarchy in Java',
      'Differentiate between checked and unchecked exceptions',
      'Master try-catch-finally, throw, and throws',
      'Create and use custom exceptions',
    ],
    tags: ['exceptions', 'try-catch', 'throw', 'throws', 'custom-exceptions', 'error-handling'],
  },

  // ── Chapter 4: JVM Internals & Patterns ──────────────────────────────
  {
    course: 'java',
    title: 'Memory Management',
    slug: 'memory-management',
    chapter: 4,
    chapterTitle: 'JVM Internals & Patterns',
    lesson: 15,
    description: 'Stack, Heap, Method Area, Garbage Collection, JVM memory model',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    prerequisites: ['how-java-works', 'reference-types'],
    objectives: [
      'Map the complete JVM memory model',
      'Understand Stack vs Heap allocation',
      'Master garbage collection algorithms and triggers',
      'Diagnose memory leaks and optimize memory usage',
    ],
    tags: ['memory', 'stack', 'heap', 'gc', 'garbage-collection', 'jvm'],
  },
  {
    course: 'java',
    title: 'Singleton, Immutable & Wrapper',
    slug: 'singleton-immutable-wrapper',
    chapter: 4,
    chapterTitle: 'JVM Internals & Patterns',
    lesson: 16,
    description: 'Singleton pattern, immutable classes, wrapper classes, autoboxing',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    prerequisites: ['types-of-classes', 'constructors'],
    objectives: [
      'Implement thread-safe Singleton patterns',
      'Design immutable classes following best practices',
      'Master wrapper classes and autoboxing/unboxing',
    ],
    tags: ['singleton', 'immutable', 'wrapper', 'autoboxing', 'design-patterns'],
  },
  {
    course: 'java',
    title: 'Collection Framework',
    slug: 'collection-framework',
    chapter: 4,
    chapterTitle: 'JVM Internals & Patterns',
    lesson: 17,
    description: 'Lists, Sets, Maps, internals of HashMap, and collection hierarchies',
    difficulty: 'advanced',
    estimatedMinutes: 60,
    prerequisites: ['types-of-classes'],
    objectives: [
      'Master List, Set, and Map hierarchies',
      'Understand how HashMap works internally (hashing, collision, treeifying)',
      'Choose the right collection for the right problem',
    ],
    tags: ['collections', 'list', 'set', 'map', 'hashmap', 'data-structures'],
  },
  {
    course: 'java',
    title: 'Queue & Comparators',
    slug: 'queue-comparator-comparable',
    chapter: 4,
    chapterTitle: 'JVM Internals & Patterns',
    lesson: 18,
    description: 'PriorityQueues, Deques, Comparable vs Comparator interfaces',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    prerequisites: ['collection-framework'],
    objectives: [
      'Understand Queues and Deques',
      'Implement custom sorting with Comparable',
      'Write flexible sorting logic using Comparator and Lambdas',
    ],
    tags: ['queue', 'deque', 'priority-queue', 'comparable', 'comparator', 'sorting'],
  },

  // ── Chapter 5: Modern Java ───────────────────────────────────────────
  {
    course: 'java',
    title: 'Functional Interfaces & Lambdas',
    slug: 'functional-interfaces-lambdas',
    chapter: 5,
    chapterTitle: 'Modern Java',
    lesson: 19,
    description: 'Functional interfaces, lambda expressions, method references, streams',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    prerequisites: ['interfaces-fundamentals'],
    objectives: [
      'Understand functional interfaces and @FunctionalInterface',
      'Write concise code with lambda expressions',
      'Use built-in functional interfaces: Predicate, Function, Consumer, Supplier',
      'Apply method references for cleaner code',
    ],
    tags: ['lambda', 'functional-interface', 'streams', 'predicate', 'consumer', 'supplier'],
  },
  {
    course: 'java',
    title: 'Generics',
    slug: 'generics',
    chapter: 5,
    chapterTitle: 'Modern Java',
    lesson: 20,
    description: 'Generic classes, methods, bounded generics, wildcards, type erasure',
    difficulty: 'advanced',
    estimatedMinutes: 40,
    prerequisites: ['interfaces-fundamentals'],
    objectives: [
      'Design type-safe generic classes and methods',
      'Apply bounded generics with extends and super',
      'Master wildcards: upper bound, lower bound, unbounded',
      'Understand type erasure and its implications',
    ],
    tags: ['generics', 'wildcards', 'type-erasure', 'bounded-types', 'type-safety'],
  },
  {
    course: 'java',
    title: 'Annotations',
    slug: 'annotations',
    chapter: 5,
    chapterTitle: 'Modern Java',
    lesson: 21,
    description: 'Built-in annotations, custom annotations, meta-annotations, retention policies',
    difficulty: 'advanced',
    estimatedMinutes: 30,
    prerequisites: ['methods'],
    objectives: [
      'Understand what annotations are and why they exist',
      'Use built-in annotations: @Override, @Deprecated, @SuppressWarnings',
      'Create custom annotations with elements and defaults',
      'Apply meta-annotations: @Retention, @Target, @Inherited',
    ],
    tags: ['annotations', 'override', 'deprecated', 'custom-annotations', 'meta-annotations'],
  },
  {
    course: 'java',
    title: 'Reflection',
    slug: 'reflection',
    chapter: 5,
    chapterTitle: 'Modern Java',
    lesson: 22,
    description: 'Reflection API, inspecting classes at runtime, dynamic method invocation',
    difficulty: 'advanced',
    estimatedMinutes: 35,
    prerequisites: ['annotations'],
    objectives: [
      'Understand what reflection is and when to use it',
      'Inspect class metadata, fields, methods, and constructors at runtime',
      'Invoke methods and access fields dynamically',
      'Understand the performance implications of reflection',
    ],
    tags: ['reflection', 'runtime', 'class-object', 'dynamic-invocation', 'introspection'],
  },
];

// ---------------------------------------------------------------------------
// Chapter definitions
// To add a new chapter: add an entry here and assign lessons with that chapter number
// ---------------------------------------------------------------------------
export const CHAPTERS: Omit<Chapter, 'lessons'>[] = [
  {
    number: 1,
    title: 'Java Foundations',
    description: 'Start from scratch — understand OOP, how Java works under the hood, and master variables & types.',
  },
  {
    number: 2,
    title: 'Core Language',
    description: 'Build fluency with reference types, operators, methods, and constructors.',
  },
  {
    number: 3,
    title: 'Object-Oriented Design',
    description: 'Design robust systems with classes, interfaces, and exception handling.',
  },
  {
    number: 4,
    title: 'JVM Internals & Patterns',
    description: 'Go deep into memory management, garbage collection, and design patterns.',
  },
  {
    number: 5,
    title: 'Modern Java',
    description: 'Master lambdas, generics, annotations, and reflection for production-grade code.',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get chapters with their lessons populated */
export function getChaptersWithLessons(course: string = 'java'): Chapter[] {
  return CHAPTERS.map((ch) => ({
    ...ch,
    lessons: ALL_LESSONS.filter((l) => (l.course === course || (!l.course && course === 'java')) && l.chapter === ch.number).sort(
      (a, b) => a.lesson - b.lesson
    ),
  })).filter(ch => ch.lessons.length > 0);
}

/** Get a lesson by slug */
export function getLessonBySlug(slug: string): LessonMeta | undefined {
  return ALL_LESSONS.find((l) => l.slug === slug);
}

/** Get previous and next lessons for navigation */
export function getAdjacentLessons(slug: string): {
  prev: LessonMeta | null;
  next: LessonMeta | null;
} {
  const lesson = getLessonBySlug(slug);
  const course = lesson?.course || 'java';
  const sorted = [...ALL_LESSONS].filter(l => l.course === course || (!l.course && course === 'java')).sort(
    (a, b) => a.chapter * 100 + a.lesson - (b.chapter * 100 + b.lesson)
  );
  const index = sorted.findIndex((l) => l.slug === slug);
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

/** Course statistics */
export function getCourseStats(course: string = 'java') {
  const lessons = ALL_LESSONS.filter((l) => l.course === course || (!l.course && course === 'java'));
  const totalDuration = lessons.reduce((sum, l) => sum + l.estimatedMinutes, 0);
  const chapterCount = new Set(lessons.map(l => l.chapter)).size;
  return {
    totalLessons: lessons.length,
    totalChapters: chapterCount,
    totalDurationMinutes: totalDuration,
    totalDurationHours: Math.round(totalDuration / 60),
  };
}
