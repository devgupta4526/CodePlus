



// ═══ STATE ════════════════════════════════════════════════════════════════
let slides=[], cur=0, curStep=0;
let tool='pen', color='#7c8cf8', strokeSize=3;
let zoom=1, drawing=false;
let drawHistory=[], redoStack=[], snap=null;
let lastX=0,lastY=0,startX=0,startY=0;
let activeTab='content', laserTimerId=null;

// ═══ DOM REFS ═════════════════════════════════════════════════════════════
const sc=document.getElementById('slide-canvas');
const dc=document.getElementById('draw-canvas');
const sd=document.getElementById('slide-dom');
const sCtx=sc.getContext('2d');
const dCtx=dc.getContext('2d', { willReadFrequently: true });
const wrap=document.getElementById('canvas-wrap');

// ═══ SLIDE FACTORY ════════════════════════════════════════════════════════
function mkSlide(o){
  return Object.assign({
    layout:'bullets',title:'',subtitle:'',bullets:[],code:'',
    bg:'#0b0d14',accent:'#7c8cf8',anim:'fade-up',
    diagramType:'jvm',
    diagramStyle:'',
    titleStyle:'',
    diagramNodes:[],
    leftLabel:'Before',leftCode:'',rightLabel:'After',rightCode:'',
    quote:'',author:'',
    stats:[],
    callout:'',calloutIcon:'💡',note:'',
    leftBullets:[],rightBullets:[],
    // image-text layout
    imageUrl:'',imagePosition:'right',imageCaption:'',
    // concept-map: nodes + edges (JSON string for simplicity)
    nodes:[],
    // narrative metadata
    role:'',
    // prediction / challenge / quiz / checkpoint
    question:'',answer:'',
    options:[],correctIndex:0,
    // wrong-assumption
    wrongSteps:[],correctSteps:[],
    // analogy
    leftIcon:'❌',rightIcon:'✅',leftDesc:'',rightDesc:'',
    // myth-vs-reality
    myth:'',
    // character
    characters:[],
    // did-you-know
    fact:'',
    // transition / next-topic
    nextTopic:'',
    // bar-chart
    chartData:[],chartUnit:'',
    // spectrum
    spectrumPos:50,spectrumLabel:'',
    _ann:null
  },o);
}

// ═══ DEFAULT DECK ═════════════════════════════════════════════════════════
function buildDefaultSlides(){
  return [
    mkSlide({layout:'title',title:'Java Deep Dive',subtitle:'Week 1 · JVM Internals & Memory Model',accent:'#7c8cf8',anim:'type-in'}),

    mkSlide({layout:'hook',role:'hook',title:'Why does Java run on Windows, Mac and Linux without changing a single line of code?',subtitle:'Let\'s find out…',accent:'#7c8cf8',anim:'fade-up'}),

    mkSlide({layout:'problem',role:'problem',title:'C Program — Same Source, Different Outcomes',subtitle:'Compile once, run... only sometimes',accent:'#f87c7c',anim:'fade-up',
      bullets:['Windows ✔','Mac ✖','Linux ✖'],
      callout:'Imagine rewriting your program for every operating system.'}),

    mkSlide({layout:'prediction',role:'prediction',question:'What do you think happens after you click Run?',answer:'Your code is translated into something every machine understands — bytecode.',accent:'#c792ea',anim:'scale-in'}),

    mkSlide({layout:'wrong-assumption',role:'wrong-assumption',title:'What Most Beginners Assume',subtitle:'...and what actually happens',accent:'#f8d07c',anim:'fade-up',
      wrongSteps:['.java','CPU'],
      correctSteps:['.java','javac','.class','JVM','CPU']}),

    mkSlide({layout:'story',role:'story',title:'A Letter to the World',accent:'#7cf8a0',anim:'fade-up',
      bullets:['You write a letter.','The letter is in English.','Different countries use different translators.','Your letter never changes.','Only the translator changes.'],
      note:'Java Bytecode = Letter · JVM = Translator'}),

    mkSlide({layout:'analogy',role:'analogy',title:'The JVM Is Just a Translator',subtitle:'One bytecode, many machines',accent:'#7cd4f8',anim:'scale-in',
      leftIcon:'🧠',leftLabel:'JVM',leftDesc:'Reads bytecode, runs anywhere',
      rightIcon:'🗣️',rightLabel:'Translator',rightDesc:'Reads one language, speaks many'}),

    mkSlide({layout:'journey',role:'journey',title:'From Keystroke to Output',subtitle:'Follow the file as it transforms',accent:'#7c8cf8',anim:'fade-up',
      bullets:['Programmer','Hello.java','javac','Hello.class','JVM','JIT','Machine Code','CPU','Output']}),

    mkSlide({layout:'mystery',role:'visualization',title:'One Tiny File...',question:'How?',accent:'#c792ea',anim:'scale-in',
      bullets:['Windows','Mac','Linux','Cloud','Servers','Android']}),

    mkSlide({layout:'myth-vs-reality',role:'myth-vs-reality',title:'Busting the Biggest Java Myth',accent:'#7cf8a0',anim:'fade-up',
      myth:'Java is slow.',
      bullets:['Modern JVMs interpret bytecode AND compile hot paths','JIT (Just-In-Time) compiler optimizes code as it runs','HotSpot profiles your program and speeds up frequent paths','Real-world benchmarks rival natively compiled languages']}),

    mkSlide({layout:'character',role:'visualization',title:'Meet the Cast',subtitle:'Every component, a character',accent:'#f87cd4',anim:'fade-up',
      characters:[{icon:'👨‍💻',label:'Programmer'},{icon:'👷',label:'Compiler'},{icon:'📦',label:'Bytecode'},{icon:'🧠',label:'JVM'},{icon:'⚙️',label:'CPU'},{icon:'🖥️',label:'Output'}]}),

    mkSlide({layout:'common-mistake',role:'common-mistake',title:'Common Beginner Mistakes',subtitle:'Learn from these before you make them',accent:'#f87c7c',anim:'fade-up',
      bullets:['Forgot to compile before running','Wrong file name (must match public class name)','Wrong main() signature','Wrong class name when running java command']}),

    mkSlide({layout:'memory-trick',role:'memory-trick',title:'JDK vs JRE vs JVM',accent:'#c792ea',anim:'scale-in',
      bullets:['Developer → JDK','Runtime → JRE','Execution → JVM']}),

    mkSlide({layout:'did-you-know',role:'did-you-know',calloutIcon:'💡',fact:'CAFEBABE is the magic number found at the start of every compiled Java .class file.',accent:'#f8d07c',anim:'scale-in'}),

    mkSlide({layout:'challenge',role:'challenge',question:'Can you explain the JVM in one sentence?',note:'Pause the video. Try it out loud before continuing.',accent:'#7cd4f8',anim:'fade-up'}),

    mkSlide({layout:'quiz',role:'checkpoint',question:'What does the JVM actually execute?',
      options:['Your .java source file directly','Machine code compiled ahead of time','Platform-independent bytecode (.class files)','Python-style interpreted text'],
      correctIndex:2,note:'javac compiles .java into .class bytecode, which the JVM then interprets/JIT-compiles.',accent:'#7c8cf8',anim:'fade-up'}),

    mkSlide({layout:'summary',role:'summary',title:'Today You Learned',accent:'#7cf8a0',anim:'scale-in',
      bullets:['Java','Compiler','Bytecode','JVM','JDK','JRE']}),

    mkSlide({layout:'transition',role:'transition',subtitle:'Now that we know how Java runs...',nextTopic:'Let\'s write our first Java program.',accent:'#7c8cf8',anim:'fade-up',
      bullets:['Hook','Problem','Prediction','Wrong Assumption','Story','Analogy']}),

    mkSlide({layout:'pipeline',role:'visualization',title:'The Java Compilation Pipeline',
      subtitle:'Five transforms from your keystroke to CPU output',
      accent:'#7cd4f8',anim:'scale-in',
      bullets:['Source Code','Compile (javac)','Load (.class)','JIT Compile','Execute (CPU)'],
      callout:'Your .java file is human-readable · .class bytecode is JVM-readable · machine code is CPU-readable',
    }),

    mkSlide({layout:'hero-split',role:'visualization',title:'What You Need to Know',
      subtitle:'Pre-requisites for this course',
      accent:'#f87cd4',anim:'fade-up',
      bullets:['Good understanding of Java basics','Object-Oriented Programming fundamentals','Basic command line / terminal skills','Curiosity to learn how things work inside','A laptop & your favourite IDE'],
      note:'No Spring Boot experience required — we build from scratch together.',
    }),

    mkSlide({layout:'glitch-title',role:'hook',title:'JVM Internals',
      subtitle:'DEEP DIVE · WEEK 2',
      note:'Bytecode, Heap, Stack, ClassLoader — let\'s go under the hood',
      accent:'#7c8cf8',anim:'scale-in',
      bullets:['ClassLoader','JIT Compiler','GC Engine','Thread Scheduler'],
    }),

    mkSlide({layout:'terminal',role:'visualization',title:'Compiling & Running Java',
      subtitle:'Watch the pipeline in action',
      accent:'#7cf8a0',anim:'fade-up',
      terminalTitle:'bash — java-teaching',
      terminalLines:[
        'javac HelloWorld.java',
        '  → Parsing source file...',
        '  → Generating bytecode...',
        '  ✓ HelloWorld.class written (432 bytes)',
        '',
        'java HelloWorld',
        '  [JVM] Loading HelloWorld.class',
        '  [JVM] Verifying bytecode... OK',
        '  [JIT] Profiling hot methods...',
        '  [JIT] Compiling run() → native code',
        '  ✓ Hello, World!',
      ],
      note:'javac compiles to bytecode · JVM loads & interprets · JIT compiles hot paths to native machine code',
    }),

    mkSlide({layout:'orbit-diagram',role:'visualization',title:'JVM',
      subtitle:'Four core components orbiting the execution engine',
      accent:'#7cd4f8',anim:'scale-in',
      bullets:['ClassLoader','Heap Memory','Stack Memory','JIT Compiler','GC Engine','Bytecode Verifier'],
    }),

    mkSlide({layout:'bar-chart',role:'visualization',title:'Where Does the Time Go?',subtitle:'Relative cost of common operations',accent:'#7cf8a0',anim:'fade-up',chartUnit:'ns',
      chartData:[{label:'L1 Cache',value:1,color:'#7cf8a0'},{label:'RAM',value:100,color:'#7cd4f8'},{label:'SSD',value:25000,color:'#f8d07c'},{label:'Network',value:10000000,color:'#f87c7c'}]}),

    mkSlide({layout:'venn',role:'comparison',title:'Checked vs Unchecked Exceptions',accent:'#7cd4f8',anim:'scale-in',
      leftLabel:'Checked',rightLabel:'Unchecked',
      leftBullets:['Must be declared with throws','Caught at compile time'],
      rightBullets:['Extends RuntimeException','Not enforced by compiler'],
      bullets:['Both represent something went wrong','Both can carry a message + cause']}),

    mkSlide({layout:'stack-visual',role:'visualization',title:'The Call Stack',subtitle:'Watch frames get pushed as methods call methods',accent:'#f87cd4',anim:'fade-up',
      bullets:['main()','run()','processIt()','validate()']}),

    mkSlide({layout:'process-loop',role:'visualization',title:'The Event Loop',subtitle:'A cycle that never stops',accent:'#c792ea',anim:'scale-in',
      characters:[{icon:'📥',label:'Receive request'},{icon:'⚙️',label:'Process'},{icon:'📤',label:'Send response'},{icon:'⏳',label:'Wait for next'}]}),

    mkSlide({layout:'spectrum',role:'comparison',title:'Compiled vs Interpreted',subtitle:'Where does Java actually sit?',accent:'#7c8cf8',anim:'fade-up',
      leftLabel:'Fully Interpreted (Python)',rightLabel:'Fully Compiled (C)',spectrumPos:65,spectrumLabel:'Java (JIT-compiled)'}),

    mkSlide({layout:'icon-grid',role:'visualization',title:'Core JVM Memory Areas',accent:'#7cf8a0',anim:'fade-up',
      characters:[{icon:'📦',label:'Heap',desc:'Objects live here'},{icon:'📋',label:'Stack',desc:'Method frames'},{icon:'🗂️',label:'Metaspace',desc:'Class metadata'},{icon:'📍',label:'PC Register',desc:'Current instruction'}]}),

    mkSlide({layout:'image-full',role:'visualization',title:'B-Tree Index Structure',imageCaption:'Each node holds sorted keys + child pointers',accent:'#7cd4f8',anim:'fade-up',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/B-tree.svg/600px-B-tree.svg.png'}),

    mkSlide({layout:'bullets',title:'JVM Architecture',subtitle:'What executes your .class file',accent:'#7cd4f8',anim:'fade-up',
      bullets:['ClassLoader — loads, links & initializes classes at runtime','Runtime Data Areas — heap, stack, metaspace, PC register','Execution Engine — interpreter + JIT compiler (C1/C2)','Garbage Collector — G1, ZGC, Shenandoah']}),

    mkSlide({layout:'diagram',title:'JVM Internals Map',subtitle:'How the pieces connect',accent:'#7c8cf8',anim:'slide-right',diagramType:'jvm'}),

    mkSlide({layout:'split',title:'Stack vs Heap',subtitle:'Where does memory actually live?',accent:'#7cf8a0',anim:'slide-right',
      bullets:['Stack — fast LIFO, thread-local, stores frames + locals','Heap — shared, GC-managed, holds all objects','Metaspace — class metadata, replaced PermGen in Java 8','GC Roots — where the JVM starts its tracing'],
      code:`public class MemDemo {
  static String name = "Java"; // Heap

  public void run() {
    int count = 0;      // Stack: primitive
    var sb = new StringBuilder(); // Heap
    processIt(sb);      // new frame pushed
  }

  private void processIt(StringBuilder s){
    // frame: s ref + local vars
  } // frame popped on return
}`}),

    mkSlide({layout:'compare',title:'N+1 Problem — Fix It',subtitle:'Lazy loading vs eager join fetch',accent:'#f8d07c',anim:'fade-up',
      leftLabel:'❌ N+1 (Bad)',leftCode:`// 1 query for orders +
// 1 query PER order = 101 queries!
orders.forEach(order -> {
  System.out.println(
    order.getCustomer().getName()
  );
});`,
      rightLabel:'✅ JOIN FETCH (Fix)',rightCode:`// Single query with join
@Query("""
  SELECT o FROM Order o
  JOIN FETCH o.customer
  WHERE o.status = :s
""")
List<Order> findByStatus(String s);`}),

    mkSlide({layout:'code',title:'Thread Safety',subtitle:'AtomicInteger vs synchronized — which to use?',accent:'#f87cd4',anim:'fade-up',
      code:`// ❌ Race condition — not thread-safe!
int counter = 0;
counter++; // read-modify-write: 3 ops

// ✅ Option 1: AtomicInteger (lock-free)
AtomicInteger counter = new AtomicInteger();
counter.incrementAndGet(); // single CAS op

// ✅ Option 2: synchronized block
synchronized(this) {
    counter++;
}

// ✅ Option 3: LongAdder (high contention)
LongAdder counter = new LongAdder();
counter.increment();
long total = counter.sum();`}),

    mkSlide({layout:'bullets',title:'Thread Safety Fundamentals',subtitle:'Race conditions, happens-before, memory visibility',accent:'#f87cd4',anim:'scale-in',
      bullets:['Race condition — two threads read+write shared state concurrently','happens-before — JMM guarantee that write A is visible to read B','volatile — forces main-memory read/write, prevents caching','synchronized — acquires intrinsic lock, ensures mutual exclusion','AtomicInteger — CAS-based lock-free counter (best for counters)']}),

    mkSlide({layout:'timeline',title:'Request Lifecycle in Spring Boot',subtitle:'From HTTP packet to JSON response',accent:'#c792ea',anim:'slide-right',
      bullets:['Tomcat receives TCP packet, parses HTTP request','DispatcherServlet matched by servlet mapping','HandlerMapping finds @RequestMapping method','Interceptors run — auth checks, logging, MDC','@Controller method executes with injected deps','HttpMessageConverter serializes return to JSON','Response flushed, connection kept or closed']}),

    mkSlide({layout:'diagram',title:'Spring Security Filter Chain',subtitle:'Every request passes through this pipeline',accent:'#c792ea',anim:'slide-right',diagramType:'security'}),

    mkSlide({layout:'compare',title:'Checked vs Unchecked Exceptions',subtitle:'When to use each — a practical guide',accent:'#f87c7c',anim:'fade-up',
      leftLabel:'Checked Exception',leftCode:`// Must be declared or caught
public byte[] readFile(String path)
    throws IOException {
  return Files.readAllBytes(
    Path.of(path)
  );
}
// Caller forced to handle it`,
      rightLabel:'Unchecked (RuntimeException)',rightCode:`// No declaration needed
public User findById(Long id) {
  return repo.findById(id)
    .orElseThrow(() ->
      new UserNotFoundException(id)
    );
}
// Propagates up call stack`}),

    mkSlide({layout:'quote',title:'',subtitle:'',accent:'#7cf8a0',anim:'scale-in',
      quote:'Make it work, make it right, make it fast — in that order.',
      author:'Kent Beck'}),

    mkSlide({layout:'diagram',title:'Spring Boot Stereotype Annotations',subtitle:'The building blocks of your application context',accent:'#7cd4f8',anim:'scale-in',diagramType:'springboot'}),

    mkSlide({layout:'title',title:'Spring Boot Production Mastery',subtitle:'Week 11–27 · IoC · REST · JPA · Security',accent:'#c792ea',anim:'type-in'}),

    mkSlide({layout:'stats',title:'JVM Performance Numbers',subtitle:'Know your costs before you optimize',accent:'#7cf8a0',anim:'scale-in',
      stats:[
        {value:'~1ns',label:'L1 cache hit',color:'#7cf8a0'},
        {value:'~100ns',label:'Main memory',color:'#7cd4f8'},
        {value:'~250μs',label:'SSD random read',color:'#f8d07c'},
        {value:'~10ms',label:'Network roundtrip',color:'#f87c7c'},
        {value:'~50ms',label:'GC stop-the-world',color:'#f87cd4'},
        {value:'~200ms',label:'DB query (cold)',color:'#c792ea'}
      ]}),

    mkSlide({layout:'callout',title:'Important Gotcha',subtitle:'A common mistake that costs hours',accent:'#f87c7c',anim:'fade-up',
      calloutIcon:'⚠️',
      callout:'Never call getConnection() inside a loop — you will exhaust the connection pool and bring down production under load.',
      note:'Always acquire the connection once before the loop, or better yet use Spring @Transactional and let the proxy manage the connection lifecycle for you.',
      bullets:['Connection pool default size is usually 10 (HikariCP)','Each thread blocks waiting for a connection if pool is exhausted','Use @Transactional to scope the connection to the method']}),

    mkSlide({layout:'two-col',title:'Imperative vs Functional',subtitle:'Java Streams — old style vs new style',accent:'#7cd4f8',anim:'slide-right',
      leftBullets:['Write explicit loops','Manage intermediate state yourself','Easy to understand for beginners','Hard to parallelize safely','More lines of code'],
      rightBullets:['Declare what, not how','No mutable loop variables','Pipeline operations compose cleanly','Parallel streams with .parallel()','Readable, concise one-liners']}),

    mkSlide({layout:'code',title:'Stream API Patterns',subtitle:'Collect, filter, map, reduce — the core four',accent:'#7cd4f8',anim:'fade-up',
      code:`List<String> names = users.stream()
    .filter(u -> u.isActive())       // keep
    .sorted(Comparator.by(User::age))// order
    .map(User::getName)              // transform
    .limit(10)                       // cap
    .collect(Collectors.toList());   // terminal

// Grouping
Map<Role, List<User>> byRole = users.stream()
    .collect(Collectors.groupingBy(User::getRole));

// Sum / average
double avg = orders.stream()
    .mapToDouble(Order::getTotal)
    .average()
    .orElse(0.0);

// Parallel (use carefully!)
long count = bigList.parallelStream()
    .filter(x -> x.isValid()).count();`}),

    mkSlide({layout:'diagram',title:'Garbage Collection Overview',subtitle:'How G1GC finds and reclaims unreachable objects',accent:'#7cf8a0',anim:'slide-right',diagramType:'gc'}),

    mkSlide({layout:'diagram',title:'REST API Request Flow',subtitle:'Controller → Service → Repository → DB',accent:'#f8d07c',anim:'fade-up',diagramType:'rest-api'}),

    mkSlide({layout:'callout',title:'Rule of Thumb',subtitle:'When to use which GC',accent:'#7cf8a0',anim:'scale-in',
      calloutIcon:'🗑️',
      callout:'Use G1GC (default since Java 9) for most applications. Switch to ZGC or Shenandoah only when you need sub-millisecond pause times at the cost of higher CPU.',
      note:'Set -Xmx and -Xms to the same value in production to avoid heap resizing pauses.',
      bullets:['G1GC — balanced, best for heap 4GB–32GB','ZGC — ultra-low latency, Java 15+','Shenandoah — Red Hat, concurrent evacuation','Serial/Parallel — only for batch/CLI tools']}),

    mkSlide({layout:'stats',title:'Spring Boot vs Raw Servlet',subtitle:'Why the framework overhead is worth it',accent:'#7c8cf8',anim:'fade-up',
      stats:[
        {value:'~200ms',label:'App startup (Spring Boot)',color:'#7c8cf8'},
        {value:'~50ms',label:'First request latency',color:'#7cd4f8'},
        {value:'~2KB',label:'Heap per idle connection',color:'#7cf8a0'},
        {value:'10x',label:'Developer productivity gain',color:'#f8d07c'},
        {value:'99%',label:'Feature coverage vs manual',color:'#f87cd4'},
        {value:'0',label:'Boilerplate you write',color:'#c792ea'}
      ]}),

    mkSlide({layout:'quote',title:'',subtitle:'',accent:'#f8d07c',anim:'scale-in',
      quote:'Premature optimization is the root of all evil.',
      author:'Donald Knuth'}),

    mkSlide({layout:'diagram',title:'OOP Pillars',subtitle:'The four fundamentals every Java dev must know',accent:'#7c8cf8',anim:'scale-in',diagramType:'oop'}),

    mkSlide({layout:'diagram',title:'SOLID Principles',subtitle:'Write code that is easy to change',accent:'#7cf8a0',anim:'fade-up',diagramType:'solid'}),

    mkSlide({layout:'diagram',title:'Design Patterns Cheat Sheet',subtitle:'GoF patterns by category',accent:'#f8d07c',anim:'slide-right',diagramType:'design-patterns'}),

    mkSlide({layout:'diagram',title:'Concurrency Toolkit',subtitle:'Which primitive to reach for and when',accent:'#f87cd4',anim:'scale-in',diagramType:'concurrency'}),

    mkSlide({layout:'diagram',title:'ACID & Isolation Levels',subtitle:'What your @Transactional annotation really does',accent:'#7cd4f8',anim:'fade-up',diagramType:'transactions'}),

    mkSlide({layout:'concept-map',title:'Spring IoC Container',subtitle:'How beans are wired together',accent:'#c792ea',anim:'scale-in',
      bullets:['@Component scan','ApplicationContext','BeanDefinition','Dependency Injection','@Autowired','@Bean factory','Proxy wrapping','Lifecycle callbacks']}),

    mkSlide({layout:'image-text',title:'How Indexes Work',subtitle:'B-Tree structure under the hood',accent:'#7cf8a0',anim:'slide-right',
      imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/B-tree.svg/600px-B-tree.svg.png',
      imageCaption:'B-Tree — each node holds sorted keys + child pointers',
      bullets:['Lookup is O(log n) — tree height stays small','Leaf nodes hold actual row pointers (clustered) or PK (secondary)','Index scan vs full table scan — EXPLAIN to verify','Composite index column order matters (leftmost prefix rule)','Covering index: all columns in query are in the index']}),

    mkSlide({layout:'diagram',title:'Microservices Architecture',subtitle:'From monolith to distributed — key patterns',accent:'#7c8cf8',anim:'fade-up',diagramType:'microservices'}),

    mkSlide({layout:'compare',title:'@Transactional Pitfalls',subtitle:'Why it silently does nothing in these cases',accent:'#f87c7c',anim:'fade-up',
      leftLabel:'❌ These BREAK @Transactional',leftCode:`// 1. Self-invocation (proxy bypass)
class OrderService {
  public void process() {
    save(); // NOT transactional!
  }
  @Transactional
  public void save() { ... }
}

// 2. private method
@Transactional
private void doWork() { } // ignored!

// 3. Checked exception — no rollback
@Transactional
public void pay() throws IOException {
  // IOException does NOT rollback
}`,
      rightLabel:'✅ Correct Patterns',rightCode:`// 1. Inject self or restructure
@Autowired OrderService self;
public void process() {
  self.save(); // goes through proxy
}

// 2. Must be public
@Transactional
public void doWork() { } // works

// 3. Explicit rollback rule
@Transactional(
  rollbackFor = IOException.class
)
public void pay() throws IOException {
  // now rolls back
}`}),
  ];
}

// ═══ CANVAS SETUP ═════════════════════════════════════════════════════════
function fitCanvases(){
  const area=document.getElementById('canvas-area');
  const aw=area.clientWidth-40, ah=area.clientHeight-80;
  zoom=Math.min(aw/CW, ah/CH, 1.5);
  resizeMain(zoom);
  renderSlide(false);
}
function resizeMain(z){
  const dw=Math.round(CW*z), dh=Math.round(CH*z);
  wrap.style.width=dw+'px'; wrap.style.height=dh+'px';
  sc.width=CW; sc.height=CH;
  dc.width=CW; dc.height=CH;
  sc.style.width=dw+'px'; sc.style.height=dh+'px';
  dc.style.width=dw+'px'; dc.style.height=dh+'px';
  sd.style.width=dw+'px'; sd.style.height=dh+'px';
}
function applyZoom(z){
  zoom=Math.max(.3,Math.min(z,2));
  resizeMain(zoom);
  renderSlide(false);
}

// ═══ BACKGROUND + ANIMATED BG ENGINE ═════════════════════════════════════
let _animBg = null;     // AnimatedBg instance (editor)
let _particles = null;  // ParticleSystem instance
let _particleCanvas = null;

function drawBg(ctx, s) {
  const acc = s.accent || '#7c8cf8';
  ctx.fillStyle = s.bg || '#0b0d14';
  ctx.fillRect(0, 0, CW, CH);
  // Dot-grid
  for (let x = 0; x <= CW; x += 80) {
    for (let y = 0; y <= CH; y += 80) {
      ctx.beginPath();
      ctx.arc(x, y, 1.1, 0, Math.PI * 2);
      ctx.fillStyle = acc + '18';
      ctx.fill();
    }
  }
  // Animated vertical left bar
  ctx.fillStyle = acc;
  ctx.fillRect(0, 0, 4, CH);
  // Corner radial glows
  const g1 = ctx.createRadialGradient(0, CH, 0, 0, CH, 440);
  g1.addColorStop(0, acc + '1c'); g1.addColorStop(1, 'transparent');
  ctx.fillStyle = g1; ctx.fillRect(0, 0, CW, CH);
  const g2 = ctx.createRadialGradient(CW, 0, 0, CW, 0, 280);
  g2.addColorStop(0, acc + '10'); g2.addColorStop(1, 'transparent');
  ctx.fillStyle = g2; ctx.fillRect(0, 0, CW, CH);
}

function _startAnimBg(s) {
  if (!_animBg && window.MotionEngine) {
    _animBg = new MotionEngine.AnimatedBg(sCtx);
  }
  if (_animBg) {
    _animBg.stop();
    _animBg.start(s);
  }
}

function _startParticles(s) {
  if (!MotionEngine) return;
  // Only run particles on cinematic/narrative layouts
  const PARTICLE_LAYOUTS = ['title','hook','hero-split','transition','mystery','did-you-know','prediction'];
  if (!PARTICLE_LAYOUTS.includes(s.layout)) {
    if (_particles) _particles.stop();
    return;
  }
  if (!_particleCanvas) {
    _particleCanvas = MotionEngine.createParticleCanvas(wrap);
  }
  _particleCanvas.width = CW;
  _particleCanvas.height = CH;
  _particleCanvas.style.width = wrap.style.width;
  _particleCanvas.style.height = wrap.style.height;
  if (!_particles) _particles = new MotionEngine.ParticleSystem(_particleCanvas);
  _particles.stop();
  _particles.start(s.accent || '#7c8cf8', 38);
}

// ═══ RENDER ═══════════════════════════════════════════════════════════════
// Editor uses static drawBg. Present mode uses AnimatedBg (see pRenderSlide).
function renderSlide(animate) {
  try {
    if (!slides.length) return;
    const s = slides[cur];
    sCtx.clearRect(0, 0, CW, CH);
    drawBg(sCtx, s);
    if (s._ann) dCtx.putImageData(s._ann, 0, 0);
    else dCtx.clearRect(0, 0, CW, CH);
    renderDom(s, sd, zoom, animate !== false);
    if (window.MotionEngine) {
      MotionEngine.initSlideMotion(s, sd, s.accent || '#7c8cf8');
    }
    updateUI();
  } catch (err) {
    sCtx.fillStyle = 'red';
    sCtx.fillRect(0, 0, CW, 60);
    sCtx.fillStyle = 'white';
    sCtx.font = '20px monospace';
    sCtx.fillText("ERROR: " + err.message + " " + err.stack, 20, 30);
    console.error(err);
  }
}

// ═══ STEP REVEAL ══════════════════════════════════════════════════════════
function getRevealItems(target){
  target=target||sd;
  return [...target.querySelectorAll('.bullet-item'),...target.querySelectorAll('.code-line')];
}
function revealAll(target){
  getRevealItems(target).forEach(e=>e.classList.add('visible'));
  curStep=getRevealItems(target).length; updateStepCounter();
}
function hideAllSteps(target){
  target=target||sd;
  getRevealItems(target).forEach(e=>e.classList.remove('visible'));
  curStep=0; updateStepCounter();
}
function updateStepCounter(){
  const items=getRevealItems();
  const total=items.length;
  document.getElementById('step-ctr').textContent=total>0?`step ${curStep}/${total}`:'';
  if(pActive) pUpdateNav();
}

// ═══ NAVIGATION ═══════════════════════════════════════════════════════════
function goSlide(n){
  if(n<0||n>=slides.length) return;
  slides[cur]._ann=dCtx.getImageData(0,0,CW,CH);
  drawHistory=[]; redoStack=[];
  cur=n;
  renderSlide(true);
  if(['bullets','code','split','compare','timeline','callout','two-col','image-text','concept-map','problem','prediction','wrong-assumption','story','journey','mystery','myth-vs-reality','common-mistake','quiz','memory-trick','character','summary','bar-chart','venn','stack-visual','process-loop','icon-grid'].includes(slides[cur].layout)){
    setTimeout(()=>hideAllSteps(sd),20);
  }
  updateSidebar();
  if(pActive) pGoSlide(true);
}
function advance(){
  const hidden=getRevealItems().filter(e=>!e.classList.contains('visible'));
  if(hidden.length){
    hidden[0].classList.add('visible'); curStep++; updateStepCounter();
    if(pActive) pSyncVisible(); return;
  }
  if(cur<slides.length-1) goSlide(cur+1);
}
function retreat(){
  const visible=getRevealItems().filter(e=>e.classList.contains('visible'));
  if(visible.length){
    visible[visible.length-1].classList.remove('visible'); curStep--; updateStepCounter();
    if(pActive) pSyncVisible(); return;
  }
  if(cur>0){
    goSlide(cur-1);
    setTimeout(()=>{ revealAll(sd); if(pActive) pSyncVisible(); },80);
  }
}

// ═══ DRAWING ══════════════════════════════════════════════════════════════
function canvasPos(e,canvas,z){
  const r=canvas.getBoundingClientRect();
  const cx=e.touches?e.touches[0].clientX:e.clientX;
  const cy=e.touches?e.touches[0].clientY:e.clientY;
  return {x:(cx-r.left)/z, y:(cy-r.top)/z};
}

// ── main canvas events ──
dc.addEventListener('mousedown',e=>startDraw(e,dCtx,dc,zoom,tool,color,strokeSize));
dc.addEventListener('mousemove',e=>moveDraw(e,dCtx,dc,zoom,tool,color,strokeSize));
dc.addEventListener('mouseup',()=>endDraw(dCtx,tool));
dc.addEventListener('mouseleave',()=>{
  endDraw(dCtx,tool);
  if(tool==='laser'){clearTimeout(laserTimerId);const img=slides[cur]._ann;dCtx.clearRect(0,0,CW,CH);if(img)dCtx.putImageData(img,0,0);}
});
dc.addEventListener('touchstart',e=>{e.preventDefault();startDraw(e,dCtx,dc,zoom,tool,color,strokeSize)},{passive:false});
dc.addEventListener('touchmove',e=>{e.preventDefault();moveDraw(e,dCtx,dc,zoom,tool,color,strokeSize)},{passive:false});
dc.addEventListener('touchend',e=>{e.preventDefault();endDraw(dCtx,tool)},{passive:false});

// shared draw state per context
const ctxState=new WeakMap();
function getCS(ctx){if(!ctxState.has(ctx))ctxState.set(ctx,{drawing:false,snap:null,lx:0,ly:0,sx:0,sy:0});return ctxState.get(ctx);}

function startDraw(e,ctx,canvas,z,t,c,sz){
  if(t==='laser') return;
  if(t==='text'){handleText(e,ctx,canvas,z,c,sz);return;}
  // Always reset ctx state before starting — prevents dirty alpha/composite from previous tool
  ctx.globalAlpha=1;
  ctx.globalCompositeOperation='source-over';
  const cs=getCS(ctx); cs.drawing=true;
  const p=canvasPos(e,canvas,z); cs.lx=p.x;cs.ly=p.y;cs.sx=p.x;cs.sy=p.y;
  cs.snap=ctx.getImageData(0,0,CW,CH);
  ctx.strokeStyle=c; ctx.fillStyle=c;
  ctx.lineWidth=t==='marker'?sz*3.5:t==='eraser'?sz*6:sz;
  ctx.globalAlpha=t==='marker'?.35:1;
  ctx.lineCap='round'; ctx.lineJoin='round';
  ctx.globalCompositeOperation=t==='eraser'?'destination-out':'source-over';
  if(['pen','marker','eraser'].includes(t)){ctx.beginPath();ctx.moveTo(cs.lx,cs.ly);}
}
function moveDraw(e,ctx,canvas,z,t,c,sz){
  const p=canvasPos(e,canvas,z);
  if(t==='laser'){drawLaserDot(p.x,p.y,ctx,slides[cur]._ann);return;}
  const cs=getCS(ctx); if(!cs.drawing) return;
  if(['pen','marker','eraser'].includes(t)){
    ctx.lineTo(p.x,p.y);ctx.stroke();cs.lx=p.x;cs.ly=p.y;
  } else {
    ctx.putImageData(cs.snap,0,0);
    ctx.globalAlpha=1;ctx.strokeStyle=c;ctx.lineWidth=sz;ctx.globalCompositeOperation='source-over';
    if(t==='rect'){ctx.beginPath();ctx.strokeRect(cs.sx,cs.sy,p.x-cs.sx,p.y-cs.sy);}
    else if(t==='circle'){const rx=Math.abs(p.x-cs.sx)/2,ry=Math.abs(p.y-cs.sy)/2;ctx.beginPath();ctx.ellipse(cs.sx+(p.x-cs.sx)/2,cs.sy+(p.y-cs.sy)/2,rx,ry,0,0,Math.PI*2);ctx.stroke();}
    else if(t==='arrow')drawArrowCtx(ctx,cs.sx,cs.sy,p.x,p.y,sz);
  }
}
function endDraw(ctx,t){
  const cs=getCS(ctx); if(!cs.drawing) return;
  cs.drawing=false; ctx.globalAlpha=1; ctx.globalCompositeOperation='source-over';
  const img=ctx.getImageData(0,0,CW,CH);
  if(ctx===dCtx){drawHistory.push(img);redoStack=[];slides[cur]._ann=img;}
  else{pDrawHistory.push(img);pRedoStack=[];}
}
function ctx_resetState(ctx){ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';}
function drawArrowCtx(ctx,x1,y1,x2,y2,sz){
  const a=Math.atan2(y2-y1,x2-x1),hl=Math.max(18,sz*4);
  ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  ctx.beginPath();ctx.moveTo(x2,y2);
  ctx.lineTo(x2-hl*Math.cos(a-.38),y2-hl*Math.sin(a-.38));
  ctx.lineTo(x2-hl*Math.cos(a+.38),y2-hl*Math.sin(a+.38));
  ctx.closePath();ctx.fill();
}
function drawLaserDot(x,y,ctx,ann){
  ctx.clearRect(0,0,CW,CH);
  if(ann) ctx.putImageData(ann,0,0);
  ctx.save();ctx.globalCompositeOperation='source-over';
  const g=ctx.createRadialGradient(x,y,0,x,y,28);
  g.addColorStop(0,'rgba(248,124,124,.9)');g.addColorStop(.4,'rgba(248,124,124,.4)');g.addColorStop(1,'rgba(248,124,124,0)');
  ctx.beginPath();ctx.arc(x,y,28,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
  ctx.beginPath();ctx.arc(x,y,6,0,Math.PI*2);ctx.fillStyle='#f87c7c';ctx.fill();
  ctx.restore();
  clearTimeout(laserTimerId);
  laserTimerId=setTimeout(()=>{ctx.clearRect(0,0,CW,CH);if(ann)ctx.putImageData(ann,0,0);},1500);
}
function handleText(e,ctx,canvas,z,c,sz){
  const p=canvasPos(e,canvas,z);
  const inp=document.createElement('input');
  inp.style.cssText=`position:fixed;left:${e.clientX}px;top:${e.clientY}px;background:rgba(11,13,20,.95);border:1px solid ${c};color:${c};font:${Math.round(sz*5+10)}px 'JetBrains Mono',monospace;outline:none;padding:4px 9px;border-radius:6px;z-index:9999;width:300px`;
  document.body.appendChild(inp); inp.focus();
  const done=()=>{
    const txt=inp.value.trim();
    if(txt){ctx.font=`${sz*5+10}px 'JetBrains Mono',monospace`;ctx.fillStyle=c;ctx.globalAlpha=1;ctx.textAlign='left';ctx.fillText(txt,p.x,p.y);
      const img=ctx.getImageData(0,0,CW,CH);if(ctx===dCtx){drawHistory.push(img);redoStack=[];slides[cur]._ann=img;}else{pDrawHistory.push(img);pRedoStack=[];}}
    if(document.body.contains(inp))document.body.removeChild(inp);
  };
  inp.addEventListener('keydown',ev=>{if(ev.key==='Enter')done();if(ev.key==='Escape'&&document.body.contains(inp))document.body.removeChild(inp);});
  inp.addEventListener('blur',done);
}
function undo(){if(!drawHistory.length)return;redoStack.push(drawHistory.pop());dCtx.clearRect(0,0,CW,CH);if(drawHistory.length){dCtx.putImageData(drawHistory[drawHistory.length-1],0,0);slides[cur]._ann=drawHistory[drawHistory.length-1];}else slides[cur]._ann=null;}
function redo(){if(!redoStack.length)return;const img=redoStack.pop();drawHistory.push(img);dCtx.putImageData(img,0,0);slides[cur]._ann=img;}
function clearAnns(){dCtx.clearRect(0,0,CW,CH);drawHistory=[];redoStack=[];slides[cur]._ann=null;}


// ═══ UI UPDATES ═══════════════════════════════════════════════════════════
function updateUI(){
  const tot=slides.length;
  document.getElementById('slide-ctr').textContent=`${cur+1} / ${tot}`;
  document.getElementById('sb-ctr').textContent=`${cur+1}/${tot}`;
  document.getElementById('prev-btn').disabled=cur===0;
  document.getElementById('next-btn').disabled=cur===slides.length-1;
}
function updateSidebar(){
  const list=document.getElementById('slide-list');
  list.innerHTML='';
  slides.forEach((s,i)=>{
    const d=document.createElement('div');
    d.className='slide-thumb'+(i===cur?' active':'');
    const c=document.createElement('canvas');c.width=320;c.height=180;
    d.appendChild(c);
    const n=document.createElement('span');n.className='thumb-num';n.textContent=i+1;
    d.appendChild(n);
    drawThumb(c.getContext('2d'),s,320,180);
    d.onclick=()=>goSlide(i);
    list.appendChild(d);
  });
  updateUI();
}
function drawThumb(ctx,s,w,h){
  ctx.fillStyle=s.bg||'#0b0d14';ctx.fillRect(0,0,w,h);
  const acc=s.accent||'#7c8cf8';
  ctx.fillStyle=acc;ctx.fillRect(0,0,3,h);
  ctx.fillStyle='#e8eaf6';ctx.font='bold 10px monospace';ctx.textAlign='left';
  ctx.fillText((s.title||'').slice(0,28),8,16);
  ctx.fillStyle=acc;ctx.font='8px monospace';
  ctx.fillText((s.subtitle||'').slice(0,36),8,28);
  const ly=s.layout;
  if(ly==='code'||ly==='split'||ly==='compare'){
    ctx.fillStyle='#0d1117';ctx.beginPath();if(ctx.roundRect)ctx.roundRect(6,35,w-12,h-42,3);else ctx.rect(6,35,w-12,h-42);ctx.fill();
    ctx.font='7px monospace';ctx.fillStyle='#c792ea';
    const code=ly==='compare'?s.leftCode:s.code;
    (code||'').split('\n').slice(0,7).forEach((l,li)=>ctx.fillText(l.slice(0,38),9,46+li*8.5));
  } else if(ly==='bullets'||ly==='timeline'){
    (s.bullets||[]).slice(0,4).forEach((b,bi)=>{
      ctx.fillStyle=acc+'30';if(ctx.roundRect)ctx.roundRect(6,38+bi*20,w-12,16,2);else ctx.rect(6,38+bi*20,w-12,16);ctx.fill();
      ctx.fillStyle='#a0a8d0';ctx.font='7px monospace';ctx.fillText('▸ '+b.slice(0,38),9,49+bi*20);
    });
  } else if(ly==='title'){
    ctx.fillStyle=acc;ctx.font='bold 16px monospace';ctx.textAlign='center';ctx.fillText((s.title||'').slice(0,18),w/2,h/2+4);ctx.textAlign='left';
  } else if(ly==='quote'){
    ctx.fillStyle=acc+'40';ctx.font='bold 40px monospace';ctx.textAlign='center';ctx.fillText('"',w/2,h/2+14);ctx.textAlign='left';
    ctx.fillStyle='#c0c4e0';ctx.font='7px monospace';ctx.textAlign='center';ctx.fillText((s.quote||'').slice(0,40),w/2,h-20);ctx.textAlign='left';
  } else if(ly==='stats'){
    const sts=s.stats||[];const cols=3,rows=2;
    sts.slice(0,6).forEach((st,si)=>{
      const cx=(si%cols)*(w/cols)+4, cy=Math.floor(si/cols)*(h/rows/2)+35;
      ctx.fillStyle=(st.color||acc)+'25';if(ctx.roundRect)ctx.roundRect(cx,cy,(w/cols)-8,(h/rows/2)-4,2);else ctx.rect(cx,cy,(w/cols)-8,(h/rows/2)-4);ctx.fill();
      ctx.fillStyle=st.color||acc;ctx.font='bold 8px monospace';ctx.textAlign='center';ctx.fillText((st.value||'').slice(0,8),cx+(w/cols-8)/2,cy+12);
      ctx.fillStyle='#6070a0';ctx.font='6px monospace';ctx.fillText((st.label||'').slice(0,12),cx+(w/cols-8)/2,cy+22);ctx.textAlign='left';
    });
  } else if(ly==='callout'){
    ctx.fillStyle=acc+'15';if(ctx.roundRect)ctx.roundRect(6,35,w-12,32,3);else ctx.rect(6,35,w-12,32);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 14px monospace';ctx.fillText(s.calloutIcon||'💡',10,58);
    ctx.fillStyle='#c0c4e0';ctx.font='7px monospace';ctx.fillText((s.callout||'').slice(0,40),30,52);
  } else if(ly==='two-col'){
    const lb=s.leftBullets||[],rb=s.rightBullets||[];
    const hw=(w-18)/2;
    lb.slice(0,3).forEach((b,bi)=>{ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(5,38+bi*18,hw,14,2);else ctx.rect(5,38+bi*18,hw,14);ctx.fill();ctx.fillStyle='#808098';ctx.font='6px monospace';ctx.fillText('▸ '+b.slice(0,16),8,48+bi*18);});
    rb.slice(0,3).forEach((b,bi)=>{ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(w/2+4,38+bi*18,hw,14,2);else ctx.rect(w/2+4,38+bi*18,hw,14);ctx.fill();ctx.fillStyle='#808098';ctx.font='6px monospace';ctx.fillText('▸ '+b.slice(0,16),w/2+7,48+bi*18);});
  } else if(ly==='diagram'){
    ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(6,35,w-12,h-42,3);else ctx.rect(6,35,w-12,h-42);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 11px monospace';ctx.textAlign='center';ctx.fillText('['+s.diagramType+']',w/2,(h+35)/2);ctx.textAlign='left';
  } else if(ly==='image-text'){
    ctx.fillStyle=acc+'15';if(ctx.roundRect)ctx.roundRect(w/2+4,35,w/2-10,h-45,3);else ctx.rect(w/2+4,35,w/2-10,h-45);ctx.fill();
    ctx.fillStyle='#3a3d52';ctx.font='14px monospace';ctx.textAlign='center';ctx.fillText('🖼️',w*3/4,h/2+8);ctx.textAlign='left';
    (s.bullets||[]).slice(0,3).forEach((b,bi)=>{ctx.fillStyle=acc+'20';if(ctx.roundRect)ctx.roundRect(5,38+bi*18,w/2-8,14,2);else ctx.rect(5,38+bi*18,w/2-8,14);ctx.fill();ctx.fillStyle='#808098';ctx.font='6px monospace';ctx.fillText('▸ '+b.slice(0,14),8,48+bi*18);});
  } else if(ly==='concept-map'){
    ctx.fillStyle=acc+'25';if(ctx.roundRect)ctx.roundRect(w/2-28,h/2-10,56,20,3);else ctx.rect(w/2-28,h/2-10,56,20);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 7px monospace';ctx.textAlign='center';ctx.fillText((s.title||'').slice(0,10),w/2,h/2+4);ctx.textAlign='left';
    (s.bullets||[]).slice(0,6).forEach((b,bi)=>{
      const ang=(bi/Math.max(s.bullets.length,1))*Math.PI*2-Math.PI/2;
      const nx=w/2+w*.32*Math.cos(ang),ny=h/2+h*.32*Math.sin(ang);
      ctx.fillStyle=acc+'18';if(ctx.roundRect)ctx.roundRect(nx-22,ny-8,44,16,2);else ctx.rect(nx-22,ny-8,44,16);ctx.fill();
      ctx.fillStyle='#7080a0';ctx.font='5px monospace';ctx.textAlign='center';ctx.fillText(b.slice(0,10),nx,ny+4);ctx.textAlign='left';
    });
  } else {
    // generic fallback for narrative templates — badge with role icon + layout name
    const badges={hook:'🤔',problem:'⚠️',prediction:'🔮',story:'📖',analogy:'=',journey:'→',mystery:'❓','wrong-assumption':'❌','myth-vs-reality':'🆚','common-mistake':'✖',challenge:'⏸',quiz:'❓','memory-trick':'🧠','did-you-know':'💡',character:'👤',transition:'↓',summary:'✔','bar-chart':'📊',venn:'◐','stack-visual':'▭','process-loop':'🔁',spectrum:'↔','icon-grid':'▦','image-full':'🖼️',terminal:'⌨',pipeline:'⊙','orbit-diagram':'⊛','glitch-title':'⚡','hero-split':'🚀'};
    ctx.fillStyle=acc+'15';if(ctx.roundRect)ctx.roundRect(6,35,w-12,h-42,3);else ctx.rect(6,35,w-12,h-42);ctx.fill();
    ctx.fillStyle=acc;ctx.font='bold 18px monospace';ctx.textAlign='center';ctx.fillText(badges[ly]||'▣',w/2,h/2);
    ctx.font='bold 8px monospace';ctx.fillText(ly,w/2,h/2+16);ctx.textAlign='left';
  }
}

// ═══ EDITOR ═══════════════════════════════════════════════════════════════
function renderEditor(){
  const s=slides[cur], body=document.getElementById('editor-body');
  body.innerHTML='';
  if(activeTab==='content') renderContentTab(s,body);
  else if(activeTab==='code') renderCodeTab(s,body);
  else if(activeTab==='anim') renderAnimTab(s,body);
  else if(activeTab==='manage') renderManageTab(s,body);
}
function mkRow(label,el2){
  const r=document.createElement('div');r.className='erow';
  const l=document.createElement('span');l.className='elabel';l.textContent=label;
  r.append(l,el2);return r;
}
function mkInput(val,cb){
  const i=document.createElement('input');i.className='einput';i.value=val||'';i.style.height='28px';
  i.oninput=e=>cb(e.target.value);return i;
}
function mkImageRow(s,onChange){
  const wrap=document.createElement('div');wrap.style.cssText='flex:1;display:flex;flex-direction:column;gap:5px';
  const row=document.createElement('div');row.style.cssText='display:flex;gap:5px;align-items:center';
  const urlInp=document.createElement('input');urlInp.className='einput';urlInp.style.height='28px';urlInp.placeholder='https://... or upload below';
  urlInp.value=(s.imageUrl||'').startsWith('data:')?'(uploaded image)':(s.imageUrl||'');
  urlInp.oninput=e=>{s.imageUrl=e.target.value;onChange();};
  const fileInp=document.createElement('input');fileInp.type='file';fileInp.accept='image/*';fileInp.style.display='none';
  const upBtn=document.createElement('button');upBtn.className='tb-btn';upBtn.textContent='📂 Upload';upBtn.style.flexShrink='0';
  upBtn.onclick=()=>fileInp.click();
  fileInp.onchange=e=>{
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{s.imageUrl=ev.target.result;urlInp.value='(uploaded image)';onChange();renderEditor();};
    r.readAsDataURL(f);
  };
  row.append(urlInp,upBtn,fileInp);wrap.appendChild(row);
  if(s.imageUrl){
    const prev=document.createElement('img');prev.src=s.imageUrl;
    prev.style.cssText='max-width:100px;max-height:60px;border-radius:5px;border:1px solid var(--border);object-fit:contain';
    wrap.appendChild(prev);
  }
  return wrap;
}
function renderContentTab(s,body){
  // narrative role (separate from visual layout)
  const roleSel=document.createElement('select');
  roleSel.className='einput';roleSel.style.cssText='height:28px;cursor:pointer';
  ROLES.forEach(r=>{const op=document.createElement('option');op.value=r;op.textContent=r||'(none)';if(s.role===r)op.selected=true;roleSel.appendChild(op);});
  roleSel.onchange=e=>{s.role=e.target.value;};
  body.appendChild(mkRow('Role',roleSel));
  body.appendChild(mkRow('Title',mkInput(s.title,v=>{s.title=v;renderSlide(false);updateSidebar();})));
  body.appendChild(mkRow('Subtitle',mkInput(s.subtitle,v=>{s.subtitle=v;renderSlide(false);updateSidebar();})));
  // layout
  const lw=document.createElement('div');lw.style.cssText='display:flex;gap:4px;flex-wrap:wrap;flex:1';
  LAYOUTS.forEach(l=>{
    const b=document.createElement('button');b.className='lay-btn'+(s.layout===l?' active':'');b.textContent=l;
    b.onclick=()=>{s.layout=l;renderEditor();renderSlide(true);updateSidebar();};
    lw.appendChild(b);
  });
  body.appendChild(mkRow('Layout',lw));
  // accent
  const aw=document.createElement('div');aw.style.cssText='display:flex;gap:5px;flex:1;align-items:center';
  ACCENTS.forEach(c=>{
    const d=document.createElement('div');d.className='swatch'+(s.accent===c?' active':'');d.style.background=c;
    d.onclick=()=>{s.accent=c;renderEditor();renderSlide(false);updateSidebar();};
    aw.appendChild(d);
  });
  body.appendChild(mkRow('Accent',aw));
  if(s.layout==='title'){
    const tsWrap=document.createElement('div');tsWrap.style.cssText='display:flex;gap:4px;flex:1';
    [['','Auto'],['brackets','Brackets'],['orbit','Orbit'],['beams','Beams'],['mesh','Mesh']].forEach(([sv,lbl])=>{
      const b=document.createElement('button');b.className='lay-btn'+((s.titleStyle||'')===sv?' active':'');b.textContent=lbl;
      b.onclick=()=>{s.titleStyle=sv;renderEditor();renderSlide(true);};
      tsWrap.appendChild(b);
    });
    body.appendChild(mkRow('Background',tsWrap));
  }
  if(s.layout==='diagram'){
    const dw=document.createElement('div');dw.style.cssText='display:flex;gap:4px;flex:1;flex-wrap:wrap';
    ['jvm','security','springboot','gc','rest-api','microservices','oop','solid','design-patterns','concurrency','transactions','custom'].forEach(dt=>{
      const b=document.createElement('button');b.className='lay-btn'+(s.diagramType===dt?' active':'');b.textContent=dt;
      b.onclick=()=>{
        if(s.diagramNodes&&s.diagramNodes.length){
          if(!confirm('Load the "'+dt+'" preset? This replaces the boxes below — your current edits will be lost.')) return;
        }
        s.diagramType=dt;
        const seed=seedDiagramNodes(dt);
        s.diagramNodes=JSON.parse(JSON.stringify(seed.nodes));
        s.diagramStyle=seed.style;
        renderEditor();renderSlide(true);
      };dw.appendChild(b);
    });
    body.appendChild(mkRow('Preset',dw));
    const hint=document.createElement('div');hint.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:6px';
    hint.textContent='Every diagram is fully editable — change any label, color or item below. Click a preset above to load fresh starter content.';
    body.appendChild(hint);
    const styleWrap=document.createElement('div');styleWrap.style.cssText='display:flex;gap:4px;flex:1';
    [['grid','Grid'],['chain','Chain'],['columns','Columns'],['layered','Layered']].forEach(([sv,lbl])=>{
      const b=document.createElement('button');b.className='lay-btn'+((s.diagramStyle||'grid')===sv?' active':'');b.textContent=lbl;
      b.onclick=()=>{s.diagramStyle=sv;renderEditor();renderSlide(true);};
      styleWrap.appendChild(b);
    });
    body.appendChild(mkRow('Arrangement',styleWrap));
    const showColumn=(s.diagramStyle||'grid')==='columns';
    const nw=document.createElement('div');nw.style.cssText='flex:1;display:flex;flex-direction:column;gap:8px';
    (s.diagramNodes||[]).forEach((nd,ni)=>{
      const card=document.createElement('div');card.style.cssText='border:1px solid var(--border);border-radius:7px;padding:7px;display:flex;flex-direction:column;gap:5px';
      const hdrRow=document.createElement('div');hdrRow.style.cssText='display:flex;gap:5px;align-items:center';
      const labelInp=document.createElement('input');labelInp.className='bullet-inp';labelInp.placeholder='Box label';labelInp.value=nd.label||'';
      labelInp.oninput=e=>{nd.label=e.target.value;renderSlide(false);};
      const colorWrap=document.createElement('div');colorWrap.style.cssText='display:flex;gap:3px';
      ACCENTS.forEach(c=>{
        const sw=document.createElement('div');sw.className='swatch'+(nd.color===c?' active':'');sw.style.cssText+='width:14px;height:14px;background:'+c;
        sw.onclick=()=>{nd.color=c;renderEditor();renderSlide(false);};
        colorWrap.appendChild(sw);
      });
      const delBtn=document.createElement('button');delBtn.className='bullet-del';delBtn.textContent='×';
      delBtn.onclick=()=>{s.diagramNodes.splice(ni,1);renderEditor();renderSlide(false);};
      hdrRow.append(labelInp,colorWrap);
      if(showColumn){
        const colInp=document.createElement('select');colInp.className='einput';colInp.style.cssText='height:26px;width:54px;padding:0 2px';
        [0,1,2].forEach(cn=>{const op=document.createElement('option');op.value=cn;op.textContent='Col '+(cn+1);if((+nd.column||0)===cn)op.selected=true;colInp.appendChild(op);});
        colInp.onchange=e=>{nd.column=+e.target.value;renderSlide(false);};
        hdrRow.appendChild(colInp);
      }
      hdrRow.appendChild(delBtn);
      card.appendChild(hdrRow);
      const itemsWrap=document.createElement('div');itemsWrap.style.cssText='display:flex;flex-direction:column;gap:2px;margin-left:4px';
      (nd.items||[]).forEach((it,ii)=>{
        const row=document.createElement('div');row.className='bullet-row';
        const inp=document.createElement('input');inp.className='bullet-inp';inp.value=it;
        inp.oninput=e=>{nd.items[ii]=e.target.value;renderSlide(false);};
        const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
        del.onclick=()=>{nd.items.splice(ii,1);renderEditor();renderSlide(false);};
        row.append(inp,del);itemsWrap.appendChild(row);
      });
      const addItemBtn=document.createElement('button');addItemBtn.className='add-bullet-btn';addItemBtn.textContent='+ item';
      addItemBtn.onclick=()=>{nd.items=nd.items||[];nd.items.push('New item');renderEditor();renderSlide(false);};
      itemsWrap.appendChild(addItemBtn);
      card.appendChild(itemsWrap);
      nw.appendChild(card);
    });
    const addBoxBtn=document.createElement('button');addBoxBtn.className='add-bullet-btn';addBoxBtn.textContent='+ Add box';
    addBoxBtn.onclick=()=>{s.diagramNodes=s.diagramNodes||[];s.diagramNodes.push({label:'New Box',color:s.accent,column:0,items:[]});renderEditor();renderSlide(false);};
    nw.appendChild(addBoxBtn);
    body.appendChild(mkRow('Boxes',nw));
  }
  if(['prediction','challenge','mystery','quiz'].includes(s.layout)){
    body.appendChild(mkRow('Question',mkInput(s.question,v=>{s.question=v;renderSlide(false);})));
  }
  if(s.layout==='prediction'){
    body.appendChild(mkRow('Answer',mkInput(s.answer,v=>{s.answer=v;renderSlide(false);})));
  }
  if(s.layout==='challenge'||s.layout==='quiz'){
    const nta=document.createElement('textarea');nta.className='einput';nta.rows=2;nta.style.cssText='width:100%;font-size:11px';
    nta.value=s.note||'';nta.oninput=e=>{s.note=e.target.value;renderSlide(false);};
    body.appendChild(mkRow(s.layout==='quiz'?'Explain':'Hint',nta));
  }
  if(s.layout==='quiz'){
    const ow=document.createElement('div');ow.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.options||[]).forEach((o,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const correctBtn=document.createElement('button');correctBtn.className='lay-btn'+(s.correctIndex===i?' active':'');correctBtn.textContent=String.fromCharCode(65+i);correctBtn.style.flexShrink='0';
      correctBtn.onclick=()=>{s.correctIndex=i;renderEditor();renderSlide(false);};
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=o;
      inp.oninput=e=>{s.options[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.options.splice(i,1);if(s.correctIndex>=s.options.length)s.correctIndex=0;renderEditor();renderSlide(false);};
      row.append(correctBtn,inp,del);ow.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ Add option';
    ab.onclick=()=>{s.options=s.options||[];s.options.push('New option');renderEditor();renderSlide(false);};
    ow.appendChild(ab);
    body.appendChild(mkRow('Options',ow));
  }
  if(s.layout==='wrong-assumption'){
    const mkChain=(label,arr,key)=>{
      const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
      const hl=document.createElement('div');hl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:4px';hl.textContent=label;
      cw.appendChild(hl);
      (arr||[]).forEach((b,i)=>{
        const row=document.createElement('div');row.className='bullet-row';
        const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
        inp.oninput=e=>{s[key][i]=e.target.value;renderSlide(false);};
        const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
        del.onclick=()=>{s[key].splice(i,1);renderEditor();renderSlide(false);};
        row.append(inp,del);cw.appendChild(row);
      });
      const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ step';
      ab.onclick=()=>{s[key]=s[key]||[];s[key].push('New step');renderEditor();renderSlide(false);};
      cw.appendChild(ab);
      return cw;
    };
    body.appendChild(mkRow('Wrong path',mkChain('What students assume',s.wrongSteps,'wrongSteps')));
    body.appendChild(mkRow('Real path',mkChain('What actually happens',s.correctSteps,'correctSteps')));
  }
  if(s.layout==='analogy'){
    body.appendChild(mkRow('Left icon',mkInput(s.leftIcon,v=>{s.leftIcon=v;renderSlide(false);})));
    body.appendChild(mkRow('Left label',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Left desc',mkInput(s.leftDesc,v=>{s.leftDesc=v;renderSlide(false);})));
    body.appendChild(mkRow('Right icon',mkInput(s.rightIcon,v=>{s.rightIcon=v;renderSlide(false);})));
    body.appendChild(mkRow('Right label',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right desc',mkInput(s.rightDesc,v=>{s.rightDesc=v;renderSlide(false);})));
  }
  if(s.layout==='myth-vs-reality'){
    const mta=document.createElement('textarea');mta.className='einput';mta.rows=2;mta.style.cssText='width:100%;font-size:11px';
    mta.value=s.myth||'';mta.oninput=e=>{s.myth=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Myth',mta));
  }
  if(s.layout==='hook'){
    body.appendChild(mkRow('Icon',mkInput(s.calloutIcon,v=>{s.calloutIcon=v;renderSlide(false);})));
  }
  if(s.layout==='did-you-know'){
    body.appendChild(mkRow('Icon',mkInput(s.calloutIcon,v=>{s.calloutIcon=v;renderSlide(false);})));
    const fta=document.createElement('textarea');fta.className='einput';fta.rows=2;fta.style.cssText='width:100%;font-size:11px';
    fta.value=s.fact||'';fta.oninput=e=>{s.fact=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Fact',fta));
  }
  if(s.layout==='story'){
    const nta=document.createElement('textarea');nta.className='einput';nta.rows=2;nta.style.cssText='width:100%;font-size:11px';
    nta.value=s.note||'';nta.oninput=e=>{s.note=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Mapping',nta));
  }
  if(s.layout==='problem'){
    const cta=document.createElement('textarea');cta.className='einput';cta.rows=2;cta.style.cssText='width:100%;font-size:11px';
    cta.value=s.callout||'';cta.oninput=e=>{s.callout=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Imagine...',cta));
  }
  if(s.layout==='transition'){
    body.appendChild(mkRow('Next topic',mkInput(s.nextTopic,v=>{s.nextTopic=v;renderSlide(false);})));
  }
  if(['character','process-loop','icon-grid'].includes(s.layout)){
    const showDesc=s.layout==='icon-grid';
    const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.characters||[]).forEach((ch,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const ic=document.createElement('input');ic.className='bullet-inp';ic.value=ch.icon||'';ic.placeholder='icon';ic.style.width='44px';
      ic.oninput=e=>{ch.icon=e.target.value;renderSlide(false);};
      const lb=document.createElement('input');lb.className='bullet-inp';lb.value=ch.label||'';lb.placeholder='label';
      lb.oninput=e=>{ch.label=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.characters.splice(i,1);renderEditor();renderSlide(false);};
      row.append(ic,lb);
      if(showDesc){
        const ds=document.createElement('input');ds.className='bullet-inp';ds.value=ch.desc||'';ds.placeholder='desc (optional)';
        ds.oninput=e=>{ch.desc=e.target.value;renderSlide(false);};
        row.appendChild(ds);
      }
      row.appendChild(del);cw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ item';
    ab.onclick=()=>{s.characters=s.characters||[];s.characters.push({icon:'⚙️',label:'New'});renderEditor();renderSlide(false);};
    cw.appendChild(ab);
    body.appendChild(mkRow(s.layout==='character'?'Characters':s.layout==='process-loop'?'Loop steps':'Icons',cw));
  }
  if(s.layout==='bar-chart'){
    body.appendChild(mkRow('Unit',mkInput(s.chartUnit,v=>{s.chartUnit=v;renderSlide(false);})));
    const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.chartData||[]).forEach((d,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const lb=document.createElement('input');lb.className='bullet-inp';lb.value=d.label||'';lb.placeholder='label';
      lb.oninput=e=>{d.label=e.target.value;renderSlide(false);};
      const vl=document.createElement('input');vl.className='bullet-inp';vl.type='number';vl.value=d.value||0;vl.style.width='70px';vl.placeholder='value';
      vl.oninput=e=>{d.value=+e.target.value;renderSlide(false);};
      const colorWrap=document.createElement('div');colorWrap.style.cssText='display:flex;gap:3px';
      ACCENTS.forEach(cc=>{
        const sw=document.createElement('div');sw.className='swatch'+(d.color===cc?' active':'');sw.style.cssText+='width:14px;height:14px;background:'+cc;
        sw.onclick=()=>{d.color=cc;renderEditor();renderSlide(false);};
        colorWrap.appendChild(sw);
      });
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.chartData.splice(i,1);renderEditor();renderSlide(false);};
      row.append(lb,vl,colorWrap,del);cw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ bar';
    ab.onclick=()=>{s.chartData=s.chartData||[];s.chartData.push({label:'New',value:50,color:s.accent});renderEditor();renderSlide(false);};
    cw.appendChild(ab);
    body.appendChild(mkRow('Bars',cw));
  }
  if(s.layout==='venn'){
    body.appendChild(mkRow('Circle A',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Circle B',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
    const mkList=(label,arr,key)=>{
      const cw=document.createElement('div');cw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
      const hl=document.createElement('div');hl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:4px';hl.textContent=label;
      cw.appendChild(hl);
      (arr||[]).forEach((b,i)=>{
        const row=document.createElement('div');row.className='bullet-row';
        const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
        inp.oninput=e=>{s[key][i]=e.target.value;renderSlide(false);};
        const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
        del.onclick=()=>{s[key].splice(i,1);renderEditor();renderSlide(false);};
        row.append(inp,del);cw.appendChild(row);
      });
      const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ item';
      ab.onclick=()=>{s[key]=s[key]||[];s[key].push('New');renderEditor();renderSlide(false);};
      cw.appendChild(ab);
      return cw;
    };
    body.appendChild(mkRow('Only A',mkList('Unique to A',s.leftBullets,'leftBullets')));
    body.appendChild(mkRow('Only B',mkList('Unique to B',s.rightBullets,'rightBullets')));
  }
  if(s.layout==='spectrum'){
    body.appendChild(mkRow('Left end',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right end',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Marker text',mkInput(s.spectrumLabel,v=>{s.spectrumLabel=v;renderSlide(false);})));
    const rw=document.createElement('div');rw.style.cssText='display:flex;gap:7px;align-items:center;flex:1';
    const range=document.createElement('input');range.type='range';range.min='0';range.max='100';range.value=s.spectrumPos||50;range.style.cssText='flex:1;accent-color:var(--accent)';
    const val=document.createElement('span');val.style.cssText='font-size:11px;color:var(--text3);min-width:28px';val.textContent=s.spectrumPos||50;
    range.oninput=e=>{s.spectrumPos=+e.target.value;val.textContent=e.target.value;renderSlide(false);};
    rw.append(range,val);
    body.appendChild(mkRow('Position',rw));
  }
  if(s.layout==='quote'){
    body.appendChild(mkRow('Quote',mkInput(s.quote,v=>{s.quote=v;renderSlide(false);})));
    body.appendChild(mkRow('Author',mkInput(s.author,v=>{s.author=v;renderSlide(false);})));
  }
  if(s.layout==='callout'){
    body.appendChild(mkRow('Icon',mkInput(s.calloutIcon,v=>{s.calloutIcon=v;renderSlide(false);})));
    const cta=document.createElement('textarea');cta.className='einput';cta.rows=3;cta.style.cssText='width:100%;font-size:11px';
    cta.value=s.callout||'';cta.oninput=e=>{s.callout=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Callout',cta));
    const nta=document.createElement('textarea');nta.className='einput';nta.rows=2;nta.style.cssText='width:100%;font-size:11px';
    nta.value=s.note||'';nta.oninput=e=>{s.note=e.target.value;renderSlide(false);};
    body.appendChild(mkRow('Note',nta));
  }
  if(s.layout==='stats'){
    const sw=document.createElement('div');sw.style.cssText='flex:1;display:flex;flex-direction:column;gap:4px';
    (s.stats||[]).forEach((st,i)=>{
      const row=document.createElement('div');row.style.cssText='display:flex;gap:4px;align-items:center';
      const vi=document.createElement('input');vi.className='bullet-inp';vi.value=st.value||'';vi.placeholder='value';vi.style.width='80px';
      vi.oninput=e=>{s.stats[i].value=e.target.value;renderSlide(false);};
      const li=document.createElement('input');li.className='bullet-inp';li.value=st.label||'';li.placeholder='label';
      li.oninput=e=>{s.stats[i].label=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.stats.splice(i,1);renderEditor();renderSlide(false);};
      row.append(vi,li,del);sw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ Add stat';
    ab.onclick=()=>{s.stats.push({value:'',label:'',color:s.accent});renderEditor();renderSlide(false);};
    sw.appendChild(ab);
    body.appendChild(mkRow('Stats',sw));
  }
  if(s.layout==='two-col'){
    body.appendChild(mkRow('Left hdr',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right hdr',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
  }
  if(s.layout==='two-col'){
    // left column bullets
    const lw=document.createElement('div');lw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
    const llbl=document.createElement('div');llbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:5px';llbl.textContent='Left column bullets';
    lw.appendChild(llbl);
    (s.leftBullets||[]).forEach((b,i)=>{
      const row=document.createElement('div');row.className='bullet-row';
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
      inp.oninput=e=>{s.leftBullets[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.leftBullets.splice(i,1);renderEditor();renderSlide(false);};
      row.append(inp,del);lw.appendChild(row);
    });
    const lab=document.createElement('button');lab.className='add-bullet-btn';lab.textContent='+ Left';
    lab.onclick=()=>{s.leftBullets.push('New point');renderEditor();renderSlide(false);};
    lw.appendChild(lab);
    const rw=document.createElement('div');rw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px;margin-top:8px';
    const rlbl=document.createElement('div');rlbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:5px';rlbl.textContent='Right column bullets';
    rw.appendChild(rlbl);
    (s.rightBullets||[]).forEach((b,i)=>{
      const row=document.createElement('div');row.className='bullet-row';
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
      inp.oninput=e=>{s.rightBullets[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.rightBullets.splice(i,1);renderEditor();renderSlide(false);};
      row.append(inp,del);rw.appendChild(row);
    });
    const rab=document.createElement('button');rab.className='add-bullet-btn';rab.textContent='+ Right';
    rab.onclick=()=>{s.rightBullets.push('New point');renderEditor();renderSlide(false);};
    rw.appendChild(rab);
    body.append(lw,rw); return;
  }
  if(s.layout==='compare'){
    body.appendChild(mkRow('Left lbl',mkInput(s.leftLabel,v=>{s.leftLabel=v;renderSlide(false);})));
    body.appendChild(mkRow('Right lbl',mkInput(s.rightLabel,v=>{s.rightLabel=v;renderSlide(false);})));
  }
  if(s.layout==='image-text'){
    body.appendChild(mkRow('Image',mkImageRow(s,()=>renderSlide(false))));
    body.appendChild(mkRow('Caption',mkInput(s.imageCaption,v=>{s.imageCaption=v;renderSlide(false);})));
    const posWrap=document.createElement('div');posWrap.style.cssText='display:flex;gap:4px;flex:1';
    ['left','right'].forEach(pos=>{
      const b=document.createElement('button');b.className='lay-btn'+(s.imagePosition===pos?' active':'');b.textContent='Image '+pos;
      b.onclick=()=>{s.imagePosition=pos;renderEditor();renderSlide(false);};
      posWrap.appendChild(b);
    });
    body.appendChild(mkRow('Img side',posWrap));
  }
  if(s.layout==='image-full'){
    body.appendChild(mkRow('Image',mkImageRow(s,()=>renderSlide(false))));
    body.appendChild(mkRow('Caption',mkInput(s.imageCaption,v=>{s.imageCaption=v;renderSlide(false);})));
  }
  if(s.layout==='concept-map'){
    const hint=document.createElement('div');hint.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:6px';
    hint.textContent='Each bullet = a concept node around the center (title).';
    body.appendChild(hint);
  }
  if(['bullets','split','timeline','callout','image-text','concept-map','problem','story','journey','mystery','myth-vs-reality','common-mistake','memory-trick','summary','transition','stack-visual','venn'].includes(s.layout)){
    const bw=document.createElement('div');bw.style.cssText='flex:1;display:flex;flex-direction:column;gap:2px';
    (s.bullets||[]).forEach((b,i)=>{
      const row=document.createElement('div');row.className='bullet-row';
      const inp=document.createElement('input');inp.className='bullet-inp';inp.value=b;
      inp.oninput=e=>{s.bullets[i]=e.target.value;renderSlide(false);};
      const del=document.createElement('button');del.className='bullet-del';del.textContent='×';
      del.onclick=()=>{s.bullets.splice(i,1);renderEditor();renderSlide(false);};
      row.append(inp,del);bw.appendChild(row);
    });
    const ab=document.createElement('button');ab.className='add-bullet-btn';ab.textContent='+ Add point';
    ab.onclick=()=>{s.bullets.push('New point');renderEditor();renderSlide(false);};
    bw.appendChild(ab);
    body.appendChild(mkRow('Points',bw));
  }
}
function renderCodeTab(s,body){
  const lbl=document.createElement('div');lbl.style.cssText='font-size:10.5px;color:var(--text3);margin-bottom:5px';
  if(s.layout==='compare') lbl.textContent='Left code panel';else lbl.textContent='Code (code / split layouts)';
  const ta=document.createElement('textarea');ta.className='einput';ta.rows=5;ta.style.cssText='width:100%;font-size:11px;line-height:1.5';
  ta.value=(s.layout==='compare'?s.leftCode:s.code)||'';
  ta.oninput=e=>{if(s.layout==='compare')s.leftCode=e.target.value;else s.code=e.target.value;renderSlide(false);updateSidebar();};
  body.append(lbl,ta);
  if(s.layout==='compare'){
    const lbl2=document.createElement('div');lbl2.style.cssText='font-size:10.5px;color:var(--text3);margin:7px 0 5px';lbl2.textContent='Right code panel';
    const ta2=document.createElement('textarea');ta2.className='einput';ta2.rows=5;ta2.style.cssText='width:100%;font-size:11px;line-height:1.5';
    ta2.value=s.rightCode||'';
    ta2.oninput=e=>{s.rightCode=e.target.value;renderSlide(false);updateSidebar();};
    body.append(lbl2,ta2);
  }
}
function renderAnimTab(s,body){
  const lbl=document.createElement('div');lbl.style.cssText='font-size:10.5px;color:var(--text3)';lbl.textContent='Slide entrance animation';
  const btns=document.createElement('div');btns.style.cssText='display:flex;gap:5px;flex-wrap:wrap;margin-top:6px';
  ANIMS.forEach(a=>{
    const b=document.createElement('button');b.className='lay-btn'+(s.anim===a?' active':'');b.textContent=a;
    b.onclick=()=>{s.anim=a;renderEditor();renderSlide(true);};btns.appendChild(b);
  });
  const hint=document.createElement('div');hint.style.cssText='font-size:10.5px;color:var(--text3);margin-top:8px';
  hint.textContent='Bullets/code reveal one by one with → or Space during presentation.';
  body.append(lbl,btns,hint);
}
function renderManageTab(s,body){
  const dup=document.createElement('button');dup.className='tb-btn';dup.textContent='⧉ Duplicate slide';
  dup.onclick=()=>{const c2=JSON.parse(JSON.stringify(s));c2._ann=null;slides.splice(cur+1,0,c2);goSlide(cur+1);updateSidebar();renderEditor();};
  const del=document.createElement('button');del.className='tb-btn danger';del.textContent='✕ Delete slide';
  del.onclick=()=>{if(slides.length===1){alert('Cannot delete the last slide.');return;}slides.splice(cur,1);goSlide(Math.max(0,cur-1));updateSidebar();renderEditor();};
  const up=document.createElement('button');up.className='tb-btn';up.textContent='↑ Move up';
  up.onclick=()=>{if(cur>0){const t=[slides[cur],slides[cur-1]];slides[cur]=t[1];slides[cur-1]=t[0];goSlide(cur-1);updateSidebar();}};
  const dn=document.createElement('button');dn.className='tb-btn';dn.textContent='↓ Move down';
  dn.onclick=()=>{if(cur<slides.length-1){const t=[slides[cur],slides[cur+1]];slides[cur]=t[1];slides[cur+1]=t[0];goSlide(cur+1);updateSidebar();}};
  const bgRow=document.createElement('div');bgRow.style.cssText='display:flex;gap:7px;align-items:center;margin-top:4px';
  bgRow.innerHTML='<span style="font-size:10.5px;color:var(--text3)">Bg color</span>';
  const bgInp=document.createElement('input');bgInp.type='color';bgInp.value=s.bg||'#0b0d14';
  bgInp.style.cssText='width:34px;height:24px;border-radius:4px;border:1px solid var(--border);background:transparent;cursor:pointer';
  bgInp.oninput=e=>{s.bg=e.target.value;renderSlide(false);updateSidebar();};
  bgRow.appendChild(bgInp);
  body.append(dup,up,dn,del,bgRow);
}

// ═══ JSON IMPORT / EXPORT ═════════════════════════════════════════════════
function slidesToJson(){
  return slides.map(s=>{
    const o={layout:s.layout,title:s.title||'',subtitle:s.subtitle||'',accent:s.accent||'#7c8cf8',bg:s.bg||'#0b0d14',anim:s.anim||'fade-up'};
    if(s.bullets&&s.bullets.length) o.bullets=[...s.bullets];
    if(s.code) o.code=s.code;
    if(s.diagramType) o.diagramType=s.diagramType;
    if(s.diagramStyle) o.diagramStyle=s.diagramStyle;
    if(s.titleStyle) o.titleStyle=s.titleStyle;
    if(s.diagramNodes&&s.diagramNodes.length) o.diagramNodes=s.diagramNodes;
    if(s.leftLabel) o.leftLabel=s.leftLabel;
    if(s.leftCode) o.leftCode=s.leftCode;
    if(s.rightLabel) o.rightLabel=s.rightLabel;
    if(s.rightCode) o.rightCode=s.rightCode;
    if(s.quote) o.quote=s.quote;
    if(s.author) o.author=s.author;
    if(s.stats&&s.stats.length) o.stats=s.stats;
    if(s.callout) o.callout=s.callout;
    if(s.calloutIcon) o.calloutIcon=s.calloutIcon;
    if(s.note) o.note=s.note;
    if(s.leftBullets&&s.leftBullets.length) o.leftBullets=s.leftBullets;
    if(s.rightBullets&&s.rightBullets.length) o.rightBullets=s.rightBullets;
    if(s.imageUrl) o.imageUrl=s.imageUrl;
    if(s.imagePosition) o.imagePosition=s.imagePosition;
    if(s.imageCaption) o.imageCaption=s.imageCaption;
    if(s.role) o.role=s.role;
    if(s.question) o.question=s.question;
    if(s.answer) o.answer=s.answer;
    if(s.options&&s.options.length){o.options=s.options;o.correctIndex=s.correctIndex||0;}
    if(s.wrongSteps&&s.wrongSteps.length) o.wrongSteps=s.wrongSteps;
    if(s.correctSteps&&s.correctSteps.length) o.correctSteps=s.correctSteps;
    if(s.layout==='analogy'){o.leftIcon=s.leftIcon;o.rightIcon=s.rightIcon;o.leftDesc=s.leftDesc;o.rightDesc=s.rightDesc;}
    if(s.myth) o.myth=s.myth;
    if(s.characters&&s.characters.length) o.characters=s.characters;
    if(s.fact) o.fact=s.fact;
    if(s.nextTopic) o.nextTopic=s.nextTopic;
    if(s.chartData&&s.chartData.length){o.chartData=s.chartData;if(s.chartUnit)o.chartUnit=s.chartUnit;}
    if(s.layout==='spectrum'){o.spectrumPos=s.spectrumPos;if(s.spectrumLabel)o.spectrumLabel=s.spectrumLabel;}
    return o;
  });
}
function parseSlides(raw){
  let parsed;
  try{parsed=JSON.parse(raw);}catch(e){throw new Error('Invalid JSON: '+e.message);}
  if(!Array.isArray(parsed)) throw new Error('Expected a JSON array [ ... ]');
  if(!parsed.length) throw new Error('Array is empty');
  const valid=new Set(LAYOUTS);
  parsed.forEach((s,i)=>{
    if(typeof s!=='object'||!s) throw new Error(`Slide ${i+1} must be an object`);
    if(!s.layout) throw new Error(`Slide ${i+1} missing "layout"`);
    if(!valid.has(s.layout)) throw new Error(`Slide ${i+1}: unknown layout "${s.layout}"`);
  });
  return parsed.map(s=>mkSlide(s));
}
function showJsonErr(msg){const e=document.getElementById('json-error');e.textContent=msg;e.classList.add('show');}
function clearJsonErr(){const e=document.getElementById('json-error');e.textContent='';e.classList.remove('show');}
function openJsonModal(tab){document.getElementById('json-modal').classList.add('open');switchJTab(tab||'import');clearJsonErr();}
function closeJsonModal(){document.getElementById('json-modal').classList.remove('open');}
function switchJTab(name){
  document.querySelectorAll('.jtab').forEach(t=>t.classList.toggle('active',t.dataset.jtab===name));
  document.querySelectorAll('.json-pane').forEach(p=>p.classList.toggle('active',p.id==='jpane-'+name));
  if(name==='export') document.getElementById('json-export-area').value=JSON.stringify(slidesToJson(),null,2);
}
document.querySelectorAll('.jtab').forEach(t=>t.onclick=()=>switchJTab(t.dataset.jtab));
document.getElementById('json-close').onclick=closeJsonModal;
document.getElementById('json-modal').addEventListener('click',e=>{if(e.target===document.getElementById('json-modal'))closeJsonModal();});
document.getElementById('json-import-btn').onclick=()=>openJsonModal('import');
document.getElementById('json-export-btn').onclick=()=>openJsonModal('export');
document.getElementById('json-replace-btn').onclick=()=>{
  clearJsonErr();const raw=document.getElementById('json-textarea').value.trim();
  if(!raw){showJsonErr('Paste JSON first.');return;}
  try{slides=parseSlides(raw);cur=0;renderSlide(true);updateSidebar();renderEditor();closeJsonModal();}
  catch(e){showJsonErr(e.message);}
};
document.getElementById('json-append-btn').onclick=()=>{
  clearJsonErr();const raw=document.getElementById('json-textarea').value.trim();
  if(!raw){showJsonErr('Paste JSON first.');return;}
  try{const ns=parseSlides(raw);const from=slides.length;slides=[...slides,...ns];updateSidebar();renderEditor();closeJsonModal();setTimeout(()=>goSlide(from),50);}
  catch(e){showJsonErr(e.message);}
};
document.getElementById('json-file-btn').onclick=()=>document.getElementById('json-file-input').click();
document.getElementById('json-file-input').onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=ev=>{document.getElementById('json-textarea').value=ev.target.result;clearJsonErr();};
  r.readAsText(f);e.target.value='';
};
document.getElementById('json-clear-ta').onclick=()=>{document.getElementById('json-textarea').value='';clearJsonErr();};
document.getElementById('copy-export-btn').onclick=()=>{
  navigator.clipboard.writeText(document.getElementById('json-export-area').value).then(()=>{
    const b=document.getElementById('copy-export-btn');const o=b.textContent;b.textContent='✓ Copied!';setTimeout(()=>b.textContent=o,1800);
  });
};
document.getElementById('download-json-btn').onclick=()=>{
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([document.getElementById('json-export-area').value],{type:'application/json'}));a.download='slides.json';a.click();
};
document.getElementById('copy-prompt-btn').onclick=()=>{
  navigator.clipboard.writeText(document.getElementById('ai-prompt-text').textContent).then(()=>{
    const b=document.getElementById('copy-prompt-btn');const o=b.textContent;b.textContent='✓ Copied!';setTimeout(()=>b.textContent=o,1800);
  });
};
document.getElementById('copy-prompt-topic-btn').onclick=()=>{
  const topic=prompt('Enter your topic:','');if(!topic)return;
  const filled=document.getElementById('ai-prompt-text').textContent.replace('[REPLACE WITH YOUR TOPIC]',topic);
  navigator.clipboard.writeText(filled).then(()=>{
    const b=document.getElementById('copy-prompt-topic-btn');const o=b.textContent;b.textContent='✓ Copied!';setTimeout(()=>b.textContent=o,1800);
  });
};

// ═══ SHORTCUTS PANEL ══════════════════════════════════════════════════════
(()=>{
  const panel=document.getElementById('shortcuts-panel');
  panel.classList.add('hidden');
  document.getElementById('sc-toggle').onclick=()=>panel.classList.toggle('hidden');
  document.getElementById('sc-close').onclick=()=>panel.classList.add('hidden');
})();

// ═══ TOOL BUTTONS ═════════════════════════════════════════════════════════
document.querySelectorAll('[id^="tool-"]').forEach(b=>b.onclick=()=>setTool(b.id.replace('tool-','')));
let prevTool='pen';
function setTool(t){
  prevTool=tool;
  // Commit any in-progress stroke before switching tools
  const cs=getCS(dCtx);
  if(cs.drawing){
    cs.drawing=false;
    ctx_resetState(dCtx);
    const img=dCtx.getImageData(0,0,CW,CH);
    drawHistory.push(img);redoStack=[];slides[cur]._ann=img;
  }
  tool=t;
  document.querySelectorAll('[id^="tool-"]').forEach(b=>b.classList.remove('active'));
  const b=document.getElementById('tool-'+t);if(b)b.classList.add('active');
  dc.style.cursor=t==='eraser'?'cell':t==='text'?'text':'crosshair';
  const pulse=document.getElementById('mode-pulse'),lbl=document.getElementById('mode-label');
  if(t==='laser'){pulse.className='mode-pulse laser';lbl.textContent='Laser';}
  else if(t==='eraser'){pulse.className='mode-pulse';lbl.textContent='Erasing';}
  else{pulse.className='mode-pulse drawing';lbl.textContent=t.charAt(0).toUpperCase()+t.slice(1);}
  // Only clean up laser dot when switching away from laser
  clearTimeout(laserTimerId);
  if(prevTool==='laser'&&t!=='laser'){
    // Restore annotations over the laser dot — do NOT wipe if no laser was active
    dCtx.clearRect(0,0,CW,CH);
    const img=slides[cur]&&slides[cur]._ann;
    if(img) dCtx.putImageData(img,0,0);
  }
}
document.querySelectorAll('.swatch').forEach(d=>d.onclick=()=>{
  color=d.dataset.color;
  document.querySelectorAll('.swatch').forEach(x=>x.classList.remove('active'));d.classList.add('active');
});
document.getElementById('stroke-range').oninput=e=>{strokeSize=+e.target.value;document.getElementById('stroke-val').textContent=strokeSize;};
document.getElementById('undo-btn').onclick=undo;
document.getElementById('redo-btn').onclick=redo;
document.getElementById('clear-btn').onclick=clearAnns;
document.getElementById('prev-btn').onclick=retreat;
document.getElementById('next-btn').onclick=advance;
document.getElementById('add-slide-btn').onclick=()=>{
  slides.push(mkSlide({layout:'bullets',title:'New Slide',subtitle:'Subtitle',bullets:['First point','Second point'],accent:'#7c8cf8'}));
  goSlide(slides.length-1);updateSidebar();renderEditor();
};
document.querySelectorAll('.etab').forEach(t=>t.onclick=()=>{
  activeTab=t.dataset.tab;
  document.querySelectorAll('.etab').forEach(x=>x.classList.remove('active'));t.classList.add('active');
  renderEditor();
});
document.getElementById('zm-in').onclick=()=>applyZoom(zoom+.1);
document.getElementById('zm-out').onclick=()=>applyZoom(zoom-.1);
document.getElementById('zm-reset').onclick=()=>{zoom=1;applyZoom(1);fitCanvases();};
document.getElementById('fs-btn').onclick=enterPresent;

// ═══ PRESENTATION MODE ════════════════════════════════════════════════════
const pOverlay=document.getElementById('present-overlay');
const pWrap=document.getElementById('present-canvas-wrap');
const pSc=document.getElementById('present-slide-canvas');
const pDc=document.getElementById('present-draw-canvas');
const pDom=document.getElementById('present-dom');
const pSCtx=pSc.getContext('2d');
const pDCtx=pDc.getContext('2d', { willReadFrequently: true });
let pZoom=1, pActive=false, pTool='pen', pColor='#7c8cf8', pStroke=3;
let pDrawHistory=[], pRedoStack=[], pHudTimer=null;

function enterPresent(){
  pActive=true;
  pOverlay.classList.add('active');
  pFitCanvas();
  pRenderSlide(true);
  // sync step visibility
  if(['bullets','code','split','compare','timeline','callout','two-col','image-text','concept-map','problem','prediction','wrong-assumption','story','journey','mystery','myth-vs-reality','common-mistake','quiz','memory-trick','character','summary','bar-chart','venn','stack-visual','process-loop','icon-grid'].includes(slides[cur].layout)){
    setTimeout(()=>{hideAllSteps(sd);pSyncVisible();},20);
  }
  pOverlay.requestFullscreen().catch(()=>{});
  showHud();
}
function exitPresent(){
  pActive=false;
  pOverlay.classList.remove('active');
  if(document.fullscreenElement) document.exitFullscreen().catch(()=>{});
  // Stop present-mode animated bg + particles
  if(window._pAnimBg){ window._pAnimBg.stop(); }
  if(window._pParticles){ window._pParticles.stop(); }
}
function pFitCanvas(){
  const sw=window.screen.width||window.innerWidth, sh=window.screen.height||window.innerHeight;
  pZoom=Math.min(sw/CW, sh/CH);
  const dw=Math.round(CW*pZoom), dh=Math.round(CH*pZoom);
  pWrap.style.width=dw+'px'; pWrap.style.height=dh+'px';
  pSc.width=CW; pSc.height=CH;
  pDc.width=CW; pDc.height=CH;
  pSc.style.width=dw+'px'; pSc.style.height=dh+'px';
  pDc.style.width=dw+'px'; pDc.style.height=dh+'px';
  pDom.style.width=dw+'px'; pDom.style.height=dh+'px';
}
function pRenderSlide(animate){
  if(!slides.length) return;
  const s=slides[cur];
  pSCtx.clearRect(0,0,CW,CH);
  // Use the animated background engine for present mode too
  if(window.MotionEngine){
    if(!window._pAnimBg){
      window._pAnimBg=new MotionEngine.AnimatedBg(pSCtx);
    }
    window._pAnimBg.stop();
    window._pAnimBg.start(s);
    // Particles on cinematic slides
    const CINEMATIC=['title','hook','hero-split','transition','mystery','did-you-know','prediction'];
    if(CINEMATIC.includes(s.layout)){
      let ppc=document.getElementById('present-particle-canvas');
      if(!ppc){
        ppc=document.createElement('canvas');
        ppc.id='present-particle-canvas';
        ppc.style.cssText='position:absolute;top:0;left:0;pointer-events:none;z-index:2;opacity:.75';
        pWrap.appendChild(ppc);
      }
      ppc.width=CW; ppc.height=CH;
      ppc.style.width=pDom.style.width; ppc.style.height=pDom.style.height;
      if(!window._pParticles) window._pParticles=new MotionEngine.ParticleSystem(ppc);
      window._pParticles.stop();
      window._pParticles.start(s.accent||'#7c8cf8',38);
    } else {
      if(window._pParticles) window._pParticles.stop();
    }
  } else {
    drawBg(pSCtx,s);
  }
  pDCtx.clearRect(0,0,CW,CH);
  pDrawHistory=[]; pRedoStack=[];
  renderDom(s,pDom,pZoom,animate);
  if(window.MotionEngine) MotionEngine.initSlideMotion(s,pDom,s.accent||'#7c8cf8');
  pUpdateNav();
}
function pGoSlide(animate){
  pRenderSlide(animate);
  if(['bullets','code','split','compare','timeline','callout','two-col','image-text','concept-map','problem','prediction','wrong-assumption','story','journey','mystery','myth-vs-reality','common-mistake','quiz','memory-trick','character','summary','bar-chart','venn','stack-visual','process-loop','icon-grid'].includes(slides[cur].layout)){
    setTimeout(()=>{ hideAllSteps(pDom); pUpdateNav(); },20);
  }
}
function pSyncVisible(){
  // mirror visibility from main sd to pDom
  const mi=[...sd.querySelectorAll('.bullet-item,.code-line')];
  const pi=[...pDom.querySelectorAll('.bullet-item,.code-line')];
  pi.forEach((e,i)=>{ if(mi[i]&&mi[i].classList.contains('visible')) e.classList.add('visible'); else e.classList.remove('visible'); });
  pUpdateNav();
}
function pUpdateNav(){
  document.getElementById('present-slide-ctr').textContent=`${cur+1} / ${slides.length}`;
  document.getElementById('present-prev').disabled=cur===0;
  document.getElementById('present-next').disabled=cur===slides.length-1;
  const items=getRevealItems();
  document.getElementById('present-step-ctr').textContent=items.length?`step ${curStep}/${items.length}`:'';
}

// HUD auto-hide
function showHud(){
  const h=document.getElementById('present-hud');
  h.classList.remove('hidden');clearTimeout(pHudTimer);
  pHudTimer=setTimeout(()=>h.classList.add('hidden'),2800);
}
pOverlay.addEventListener('mousemove',showHud);
pOverlay.addEventListener('touchstart',showHud,{passive:true});

// present drawing — reuse shared draw functions
let pLaserTimer2=null;
pDc.addEventListener('mousedown',e=>{showHud();startDraw(e,pDCtx,pDc,pZoom,pTool,pColor,pStroke);});
pDc.addEventListener('mousemove',e=>{
  showHud();
  if(pTool==='laser'){const p=canvasPos(e,pDc,pZoom);drawLaserDot(p.x,p.y,pDCtx,null);return;}
  moveDraw(e,pDCtx,pDc,pZoom,pTool,pColor,pStroke);
});
pDc.addEventListener('mouseup',()=>endDraw(pDCtx,pTool));
pDc.addEventListener('mouseleave',()=>{endDraw(pDCtx,pTool);if(pTool==='laser')pDCtx.clearRect(0,0,CW,CH);});
pDc.addEventListener('touchstart',e=>{e.preventDefault();showHud();startDraw(e,pDCtx,pDc,pZoom,pTool,pColor,pStroke);},{passive:false});
pDc.addEventListener('touchmove',e=>{e.preventDefault();showHud();moveDraw(e,pDCtx,pDc,pZoom,pTool,pColor,pStroke);},{passive:false});
pDc.addEventListener('touchend',e=>{e.preventDefault();endDraw(pDCtx,pTool);},{passive:false});

let pPrevTool='pen';
function pSetTool(t){
  pPrevTool=pTool;
  // Commit any in-progress stroke before switching tools (mirrors main setTool fix)
  const cs=getCS(pDCtx);
  if(cs.drawing){
    cs.drawing=false;
    ctx_resetState(pDCtx);
    const img=pDCtx.getImageData(0,0,CW,CH);
    pDrawHistory.push(img);pRedoStack=[];
  }
  pTool=t;
  document.querySelectorAll('.pt-btn[data-ptool]').forEach(b=>b.classList.toggle('active',b.dataset.ptool===t));
  pDc.style.cursor=t==='eraser'?'cell':t==='text'?'text':'crosshair';
  // Only clear the laser dot when switching away from laser — never wipe real annotations
  clearTimeout(pLaserTimer2);
  if(pPrevTool==='laser'&&t!=='laser'){
    pDCtx.clearRect(0,0,CW,CH);
    if(pDrawHistory.length) pDCtx.putImageData(pDrawHistory[pDrawHistory.length-1],0,0);
  }
}
function pUndo(){
  if(!pDrawHistory.length) return;
  pRedoStack.push(pDrawHistory.pop());
  pDCtx.clearRect(0,0,CW,CH);
  if(pDrawHistory.length) pDCtx.putImageData(pDrawHistory[pDrawHistory.length-1],0,0);
}
function pClear(){pDCtx.clearRect(0,0,CW,CH);pDrawHistory=[];pRedoStack=[];}

document.getElementById('present-exit').onclick=exitPresent;
document.getElementById('present-next').onclick=()=>{showHud();advance();};
document.getElementById('present-prev').onclick=()=>{showHud();retreat();};
document.getElementById('pt-undo').onclick=pUndo;
document.getElementById('pt-clear').onclick=pClear;
document.getElementById('p-stroke-range').oninput=e=>pStroke=+e.target.value;

document.querySelectorAll('.pt-btn[data-ptool]').forEach(b=>b.onclick=()=>pSetTool(b.dataset.ptool));
document.querySelectorAll('.pt-swatch').forEach(d=>d.onclick=()=>{
  pColor=d.dataset.pcolor;
  document.querySelectorAll('.pt-swatch').forEach(x=>x.classList.remove('active'));d.classList.add('active');
});

document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement && pActive) exitPresent();
});
window.addEventListener('resize',()=>{
  if(pActive){pFitCanvas();pRenderSlide(false);pSyncVisible();}
});

// ═══ KEYBOARD ═════════════════════════════════════════════════════════════
document.addEventListener('keydown',e=>{
  if(document.getElementById('json-modal').classList.contains('open')) return;
  if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
  if(e.key==='Escape'){if(pActive){exitPresent();return;}}
  if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();advance();}
  else if(e.key==='ArrowLeft'){e.preventDefault();retreat();}
  else if(!e.ctrlKey&&!e.metaKey){
    if(e.key==='p'||e.key==='P'){if(pActive)pSetTool('pen');else setTool('pen');}
    else if(e.key==='m'||e.key==='M'){if(pActive)pSetTool('marker');else setTool('marker');}
    else if(e.key==='a'||e.key==='A'){if(pActive)pSetTool('arrow');else setTool('arrow');}
    else if(e.key==='r'||e.key==='R'){if(pActive)pSetTool('rect');else setTool('rect');}
    else if(e.key==='c'||e.key==='C'){if(pActive)pSetTool('circle');else setTool('circle');}
    else if(e.key==='t'||e.key==='T'){if(pActive)pSetTool('text');else setTool('text');}
    else if(e.key==='e'||e.key==='E'){if(pActive)pSetTool('eraser');else setTool('eraser');}
    else if(e.key==='l'||e.key==='L'){if(pActive)pSetTool('laser');else setTool('laser');}
    else if(e.key==='f'||e.key==='F') enterPresent();
    else if(e.key==='Delete'){if(pActive)pClear();else clearAnns();}
  }
  else if(e.ctrlKey&&e.key==='z'){e.preventDefault();if(pActive)pUndo();else undo();}
  else if(e.ctrlKey&&e.key==='y'){e.preventDefault();redo();}
  else if((e.ctrlKey||e.metaKey)&&e.key==='i'){e.preventDefault();openJsonModal('import');}
  else if((e.ctrlKey||e.metaKey)&&e.key==='e'){e.preventDefault();openJsonModal('export');}
});

// ═══ INIT ═════════════════════════════════════════════════════════════════
slides=buildDefaultSlides();
fitCanvases();
updateSidebar();
renderEditor();
setTool('pen');
window.addEventListener('resize',fitCanvases);
