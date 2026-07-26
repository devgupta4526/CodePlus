// ═══ STATE ════════════════════════════════════════════════════════════════
let slides = [], cur = 0, curStep = 0;
let tool = 'pen', color = '#7c8cf8', strokeSize = 3;
let zoom = 1, drawing = false;
let drawHistory = [], redoStack = [], snap = null;
let lastX = 0, lastY = 0, startX = 0, startY = 0;
let activeTab = 'content', laserTimerId = null, pActive = false;

// ═══ DOM REFS ═════════════════════════════════════════════════════════════
const sc = document.getElementById('slide-canvas');
const dc = document.getElementById('draw-canvas');
const sd = document.getElementById('slide-dom');
const sCtx = sc.getContext('2d');
const dCtx = dc.getContext('2d', { willReadFrequently: true });
const wrap = document.getElementById('canvas-wrap');

// ═══ SLIDE FACTORY ════════════════════════════════════════════════════════
function mkSlide(o) {
  return Object.assign({
    layout: 'bullets', title: '', subtitle: '', bullets: [], code: '',
    bg: '#0b0d14', accent: '#7c8cf8', anim: 'fade-up',
    diagramType: 'jvm',
    diagramStyle: '',
    titleStyle: '',
    diagramNodes: [],
    leftLabel: 'Before', leftCode: '', rightLabel: 'After', rightCode: '',
    quote: '', author: '',
    stats: [],
    callout: '', calloutIcon: '💡', note: '',
    leftBullets: [], rightBullets: [],
    imageUrl: '', imagePosition: 'right', imageCaption: '',
    nodes: [],
    role: '',
    question: '', answer: '',
    options: [], correctIndex: 0,
    wrongSteps: [], correctSteps: [],
    leftIcon: '❌', rightIcon: '✅', leftDesc: '', rightDesc: '',
    myth: '',
    characters: [],
    fact: '',
    nextTopic: '',
    chartData: [], chartUnit: '',
    spectrumPos: 50, spectrumLabel: '',
    customHtml: '', customCss: '',
    _ann: null
  }, o);
}

// ═══ DEFAULT DECK ═════════════════════════════════════════════════════════
function buildDefaultSlides() {
  return [
    mkSlide({ layout: 'title', title: 'Java Deep Dive', subtitle: 'Week 1 · JVM Internals & Memory Model', accent: '#7c8cf8', anim: 'type-in' }),
    mkSlide({ layout: 'hook', role: 'hook', title: 'Why does Java run on Windows, Mac and Linux without changing a single line of code?', subtitle: 'Let\'s find out…', accent: '#7c8cf8', anim: 'fade-up' }),
    mkSlide({ layout: 'problem', role: 'problem', title: 'C Program — Same Source, Different Outcomes', subtitle: 'Compile once, run... only sometimes', accent: '#f87c7c', anim: 'fade-up', bullets: ['Windows ✔', 'Mac ✖', 'Linux ✖'], callout: 'Imagine rewriting your program for every operating system.' }),
    mkSlide({ layout: 'prediction', role: 'prediction', question: 'What do you think happens after you click Run?', answer: 'Your code is translated into something every machine understands — bytecode.', accent: '#c792ea', anim: 'scale-in' }),
    mkSlide({ layout: 'wrong-assumption', role: 'wrong-assumption', title: 'What Most Beginners Assume', subtitle: '...and what actually happens', accent: '#f8d07c', anim: 'fade-up', wrongSteps: ['.java', 'CPU'], correctSteps: ['.java', 'javac', '.class', 'JVM', 'CPU'] }),
    mkSlide({ layout: 'story', role: 'story', title: 'A Letter to the World', accent: '#7cf8a0', anim: 'fade-up', bullets: ['You write a letter.', 'The letter is in English.', 'Different countries use different translators.', 'Your letter never changes.', 'Only the translator changes.'], note: 'Java Bytecode = Letter · JVM = Translator' }),
    mkSlide({ layout: 'analogy', role: 'analogy', title: 'The JVM Is Just a Translator', subtitle: 'One bytecode, many machines', accent: '#7cd4f8', anim: 'scale-in', leftIcon: '🧠', leftLabel: 'JVM', leftDesc: 'Reads bytecode, runs anywhere', rightIcon: '🗣️', rightLabel: 'Translator', rightDesc: 'Reads one language, speaks many' }),
    mkSlide({ layout: 'journey', role: 'journey', title: 'From Keystroke to Output', subtitle: 'Follow the file as it transforms', accent: '#7c8cf8', anim: 'fade-up', bullets: ['Programmer', 'Hello.java', 'javac', 'Hello.class', 'JVM', 'JIT', 'Machine Code', 'CPU', 'Output'] }),
    mkSlide({ layout: 'mystery', role: 'visualization', title: 'One Tiny File...', question: 'How?', accent: '#c792ea', anim: 'scale-in', bullets: ['Windows', 'Mac', 'Linux', 'Cloud', 'Servers', 'Android'] }),
    mkSlide({ layout: 'myth-vs-reality', role: 'myth-vs-reality', title: 'Busting the Biggest Java Myth', accent: '#7cf8a0', anim: 'fade-up', myth: 'Java is slow.', bullets: ['Modern JVMs interpret bytecode AND compile hot paths', 'JIT (Just-In-Time) compiler optimizes code as it runs', 'HotSpot profiles your program and speeds up frequent paths', 'Real-world benchmarks rival natively compiled languages'] }),
    mkSlide({ layout: 'character', role: 'visualization', title: 'Meet the Cast', subtitle: 'Every component, a character', accent: '#f87cd4', anim: 'fade-up', characters: [{ icon: '👨‍💻', label: 'Programmer' }, { icon: '👷', label: 'Compiler' }, { icon: '📦', label: 'Bytecode' }, { icon: '🧠', label: 'JVM' }, { icon: '⚙️', label: 'CPU' }, { icon: '🖥️', label: 'Output' }] }),
    mkSlide({ layout: 'common-mistake', role: 'common-mistake', title: 'Common Beginner Mistakes', subtitle: 'Learn from these before you make them', accent: '#f87c7c', anim: 'fade-up', bullets: ['Forgot to compile before running', 'Wrong file name (must match public class name)', 'Wrong main() signature', 'Wrong class name when running java command'] }),
    mkSlide({ layout: 'memory-trick', role: 'memory-trick', title: 'JDK vs JRE vs JVM', accent: '#c792ea', anim: 'scale-in', bullets: ['Developer → JDK', 'Runtime → JRE', 'Execution → JVM'] }),
    mkSlide({ layout: 'did-you-know', role: 'did-you-know', calloutIcon: '💡', fact: 'CAFEBABE is the magic number found at the start of every compiled Java .class file.', accent: '#f8d07c', anim: 'scale-in' }),
    mkSlide({ layout: 'challenge', role: 'challenge', question: 'Can you explain the JVM in one sentence?', note: 'Pause the video. Try it out loud before continuing.', accent: '#7cd4f8', anim: 'fade-up' }),
    mkSlide({ layout: 'quiz', role: 'checkpoint', question: 'What does the JVM actually execute?', options: ['Your .java source file directly', 'Machine code compiled ahead of time', 'Platform-independent bytecode (.class files)', 'Python-style interpreted text'], correctIndex: 2, note: 'javac compiles .java into .class bytecode, which the JVM then interprets/JIT-compiles.', accent: '#7c8cf8', anim: 'fade-up' }),
    mkSlide({ layout: 'summary', role: 'summary', title: 'Today You Learned', accent: '#7cf8a0', anim: 'scale-in', bullets: ['Java', 'Compiler', 'Bytecode', 'JVM', 'JDK', 'JRE'] }),
    mkSlide({ layout: 'transition', role: 'transition', subtitle: 'Now that we know how Java runs...', nextTopic: 'Let\'s write our first Java program.', accent: '#7c8cf8', anim: 'fade-up', bullets: ['Hook', 'Problem', 'Prediction', 'Wrong Assumption', 'Story', 'Analogy'] }),
    mkSlide({ layout: 'pipeline', role: 'visualization', title: 'The Java Compilation Pipeline', subtitle: 'Five transforms from your keystroke to CPU output', accent: '#7cd4f8', anim: 'scale-in', bullets: ['Source Code', 'Compile (javac)', 'Load (.class)', 'JIT Compile', 'Execute (CPU)'], callout: 'Your .java file is human-readable · .class bytecode is JVM-readable · machine code is CPU-readable' }),

    mkSlide({ layout: 'hero-split', role: 'hook', title: 'Meet the Explorer', subtitle: 'CSS Animated SVG Character', accent: '#7c8cf8', anim: 'fade-up', bgType: 'space', bullets: ['Smooth CSS keyframe animations', 'Independent body part movements', 'Responsive to accent colors', 'Fully scalable vector graphics'], note: 'Watch the astronaut float, blink, and swing arms!' }),

    mkSlide({ layout: 'glitch-title', role: 'hook', title: 'JVM Internals', subtitle: 'DEEP DIVE · WEEK 2', note: 'Bytecode, Heap, Stack, ClassLoader — let\'s go under the hood', accent: '#7c8cf8', anim: 'scale-in', bgType: 'blob', bullets: ['ClassLoader', 'JIT Compiler', 'GC Engine', 'Thread Scheduler'] }),

    mkSlide({ layout: 'terminal', role: 'visualization', title: 'Compiling & Running Java', subtitle: 'Watch the pipeline in action', accent: '#7cf8a0', anim: 'fade-up', terminalTitle: 'bash — java-teaching', terminalLines: ['javac HelloWorld.java', '  → Parsing source file...', '  → Generating bytecode...', '  ✓ HelloWorld.class written (432 bytes)', '', 'java HelloWorld', '  [JVM] Loading HelloWorld.class', '  [JVM] Verifying bytecode... OK', '  [JIT] Profiling hot methods...', '  [JIT] Compiling run() → native code', '  ✓ Hello, World!'], note: 'javac compiles to bytecode · JVM loads & interprets · JIT compiles hot paths to native machine code' }),

    mkSlide({ layout: 'orbit-diagram', role: 'visualization', title: 'JVM', subtitle: 'Four core components orbiting the execution engine', accent: '#7cd4f8', anim: 'scale-in', bullets: ['ClassLoader', 'Heap Memory', 'Stack Memory', 'JIT Compiler', 'GC Engine', 'Bytecode Verifier'] }),

    mkSlide({ layout: 'bar-chart', role: 'visualization', title: 'Where Does the Time Go?', subtitle: 'Relative cost of common operations', accent: '#7cf8a0', anim: 'fade-up', chartUnit: 'ns', chartData: [{ label: 'L1 Cache', value: 1, color: '#7cf8a0' }, { label: 'RAM', value: 100, color: '#7cd4f8' }, { label: 'SSD', value: 25000, color: '#f8d07c' }, { label: 'Network', value: 10000000, color: '#f87c7c' }] }),

    mkSlide({ layout: 'venn', role: 'comparison', title: 'Checked vs Unchecked Exceptions', accent: '#7cd4f8', anim: 'scale-in', leftLabel: 'Checked', rightLabel: 'Unchecked', leftBullets: ['Must be declared with throws', 'Caught at compile time'], rightBullets: ['Extends RuntimeException', 'Not enforced by compiler'], bullets: ['Both represent something went wrong', 'Both can carry a message + cause'] }),

    mkSlide({ layout: 'stack-visual', role: 'visualization', title: 'The Call Stack', subtitle: 'Watch frames get pushed as methods call methods', accent: '#f87cd4', anim: 'fade-up', bullets: ['main()', 'run()', 'processIt()', 'validate()'] }),

    mkSlide({ layout: 'process-loop', role: 'visualization', title: 'The Event Loop', subtitle: 'A cycle that never stops', accent: '#c792ea', anim: 'scale-in', characters: [{ icon: '📥', label: 'Receive request' }, { icon: '⚙️', label: 'Process' }, { icon: '📤', label: 'Send response' }, { icon: '⏳', label: 'Wait for next' }] }),

    mkSlide({ layout: 'spectrum', role: 'comparison', title: 'Compiled vs Interpreted', subtitle: 'Where does Java actually sit?', accent: '#7c8cf8', anim: 'fade-up', leftLabel: 'Fully Interpreted (Python)', rightLabel: 'Fully Compiled (C)', spectrumPos: 65, spectrumLabel: 'Java (JIT-compiled)' }),

    mkSlide({ layout: 'icon-grid', role: 'visualization', title: 'Core JVM Memory Areas', accent: '#7cf8a0', anim: 'fade-up', characters: [{ icon: '📦', label: 'Heap', desc: 'Objects live here' }, { icon: '📋', label: 'Stack', desc: 'Method frames' }, { icon: '🗂️', label: 'Metaspace', desc: 'Class metadata' }, { icon: '📍', label: 'PC Register', desc: 'Current instruction' }] }),

    mkSlide({ layout: 'image-full', role: 'visualization', title: 'B-Tree Index Structure', imageCaption: 'Each node holds sorted keys + child pointers', accent: '#7cd4f8', anim: 'fade-up', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/B-tree.svg/600px-B-tree.svg.png' }),

    mkSlide({ layout: 'bullets', title: 'JVM Architecture', subtitle: 'What executes your .class file', accent: '#7cd4f8', anim: 'fade-up', bullets: ['ClassLoader — loads, links & initializes classes at runtime', 'Runtime Data Areas — heap, stack, metaspace, PC register', 'Execution Engine — interpreter + JIT compiler (C1/C2)', 'Garbage Collector — G1, ZGC, Shenandoah'] }),

    mkSlide({ layout: 'diagram', title: 'JVM Internals Map', subtitle: 'How the pieces connect', accent: '#7c8cf8', anim: 'slide-right', diagramType: 'jvm' }),

    mkSlide({ layout: 'split', title: 'Stack vs Heap', subtitle: 'Where does memory actually live?', accent: '#7cf8a0', anim: 'slide-right', bullets: ['Stack — fast LIFO, thread-local, stores frames + locals', 'Heap — shared, GC-managed, holds all objects', 'Metaspace — class metadata, replaced PermGen in Java 8', 'GC Roots — where the JVM starts its tracing'], code: `public class MemDemo {\n  static String name = "Java"; // Heap\n\n  public void run() {\n    int count = 0;      // Stack: primitive\n    var sb = new StringBuilder(); // Heap\n    processIt(sb);      // new frame pushed\n  }\n\n  private void processIt(StringBuilder s){\n    // frame: s ref + local vars\n  } // frame popped on return\n}` }),

    mkSlide({ layout: 'compare', title: 'N+1 Problem — Fix It', subtitle: 'Lazy loading vs eager join fetch', accent: '#f8d07c', anim: 'fade-up', leftLabel: '❌ N+1 (Bad)', leftCode: `// 1 query for orders +\n// 1 query PER order = 101 queries!\norders.forEach(order -> {\n  System.out.println(\n    order.getCustomer().getName()\n  );\n});`, rightLabel: '✅ JOIN FETCH (Fix)', rightCode: `// Single query with join\n@Query(\"\"\"\n  SELECT o FROM Order o\n  JOIN FETCH o.customer\n  WHERE o.status = :s\n\"\"\")\nList<Order> findByStatus(String s);` }),

    mkSlide({ layout: 'code', title: 'Thread Safety', subtitle: 'AtomicInteger vs synchronized — which to use?', accent: '#f87cd4', anim: 'fade-up', code: `// ❌ Race condition — not thread-safe!\nint counter = 0;\ncounter++; // read-modify-write: 3 ops\n\n// ✅ Option 1: AtomicInteger (lock-free)\nAtomicInteger counter = new AtomicInteger();\ncounter.incrementAndGet(); // single CAS op\n\n// ✅ Option 2: synchronized block\nsynchronized(this) {\n    counter++;\n}\n\n// ✅ Option 3: LongAdder (high contention)\nLongAdder counter = new LongAdder();\ncounter.increment();\nlong total = counter.sum();` }),

    mkSlide({ layout: 'bullets', title: 'Thread Safety Fundamentals', subtitle: 'Race conditions, happens-before, memory visibility', accent: '#f87cd4', anim: 'scale-in', bullets: ['Race condition — two threads read+write shared state concurrently', 'happens-before — JMM guarantee that write A is visible to read B', 'volatile — forces main-memory read/write, prevents caching', 'synchronized — acquires intrinsic lock, ensures mutual exclusion', 'AtomicInteger — CAS-based lock-free counter (best for counters)'] }),

    mkSlide({ layout: 'timeline', title: 'Request Lifecycle in Spring Boot', subtitle: 'From HTTP packet to JSON response', accent: '#c792ea', anim: 'slide-right', bullets: ['Tomcat receives TCP packet, parses HTTP request', 'DispatcherServlet matched by servlet mapping', 'HandlerMapping finds @RequestMapping method', 'Interceptors run — auth checks, logging, MDC', '@Controller method executes with injected deps', 'HttpMessageConverter serializes return to JSON', 'Response flushed, connection kept or closed'] }),

    mkSlide({ layout: 'diagram', title: 'Spring Security Filter Chain', subtitle: 'Every request passes through this pipeline', accent: '#c792ea', anim: 'slide-right', diagramType: 'security' }),

    mkSlide({ layout: 'terminal', title: 'Docker for Java Devs', subtitle: 'Containerizing a Spring Boot app', accent: '#7c8cf8', anim: 'slide-right', code: `FROM eclipse-temurin:21-jre-alpine\nWORKDIR /app\nCOPY target/myapp.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]` }),

    mkSlide({ layout: 'split', title: 'L1, L2 & Query Cache', subtitle: 'Hibernate caching explained', accent: '#7cf8a0', anim: 'fade-up', bullets: ['L1 Cache (Session level) — enabled by default, tied to the transaction', 'L2 Cache (SessionFactory level) — shared across sessions, requires Ehcache/Redis', 'Query Cache — caches query results (IDs), usually paired with L2 cache'], code: `@Entity\n@Cacheable\n@org.hibernate.annotations.Cache(\n  usage = CacheConcurrencyStrategy.READ_WRITE\n)\npublic class Product {\n  @Id\n  private Long id;\n  private String name;\n}` }),

    mkSlide({ layout: 'bento-grid', role: 'visualization', title: 'Why Use a Bento Grid?', subtitle: 'Apple-style dashboard layouts', accent: '#7cd4f8', anim: 'scale-in', bullets: ['Highlights core features in varying sizes', 'Responsive and highly modular design', 'Focuses the eye on the largest blocks', 'Breaks monotony of standard lists'] }),

    mkSlide({ layout: 'glass-fan', role: 'visualization', title: 'The Glass Fan Layout', subtitle: 'Step through to fan the cards out', accent: '#c792ea', anim: 'fade-up', bullets: ['Card 1: Stacks perfectly on load', 'Card 2: Fans out beautifully on step', 'Card 3: Completes the premium spread'] }),

    mkSlide({ layout: '3d-carousel', role: 'visualization', title: '3D Carousel Depth', subtitle: 'Step through to pull cards forward', accent: '#f87c7c', anim: 'scale-in', bullets: ['Option A: Pushed back in Z-space initially', 'Option B: Comes into focus next', 'Option C: Flies in to complete the carousel'] }),

    mkSlide({ layout: 'cinematic-parallax', role: 'visualization', title: 'Java Microservices', subtitle: 'Scaling up', accent: '#f87cd4', anim: 'fade-up', bgType: 'space', bullets: ['Isolate failure domains', 'Scale independent services', 'Use lightweight gRPC'] })
  ];
}
