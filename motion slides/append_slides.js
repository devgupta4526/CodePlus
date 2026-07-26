const fs = require('fs');
const extraSlides = `
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
      code:\`public class MemDemo {
  static String name = "Java"; // Heap

  public void run() {
    int count = 0;      // Stack: primitive
    var sb = new StringBuilder(); // Heap
    processIt(sb);      // new frame pushed
  }

  private void processIt(StringBuilder s){
    // frame: s ref + local vars
  } // frame popped on return
}\`}),

    mkSlide({layout:'compare',title:'N+1 Problem — Fix It',subtitle:'Lazy loading vs eager join fetch',accent:'#f8d07c',anim:'fade-up',
      leftLabel:'❌ N+1 (Bad)',leftCode:\`// 1 query for orders +
// 1 query PER order = 101 queries!
orders.forEach(order -> {
  System.out.println(
    order.getCustomer().getName()
  );
});\`,
      rightLabel:'✅ JOIN FETCH (Fix)',rightCode:\`// Single query with join
@Query("""
  SELECT o FROM Order o
  JOIN FETCH o.customer
  WHERE o.status = :s
""")
List<Order> findByStatus(String s);\`}),

    mkSlide({layout:'code',title:'Thread Safety',subtitle:'AtomicInteger vs synchronized — which to use?',accent:'#f87cd4',anim:'fade-up',
      code:\`// ❌ Race condition — not thread-safe!
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
long total = counter.sum();\`}),

    mkSlide({layout:'bullets',title:'Thread Safety Fundamentals',subtitle:'Race conditions, happens-before, memory visibility',accent:'#f87cd4',anim:'scale-in',
      bullets:['Race condition — two threads read+write shared state concurrently','happens-before — JMM guarantee that write A is visible to read B','volatile — forces main-memory read/write, prevents caching','synchronized — acquires intrinsic lock, ensures mutual exclusion','AtomicInteger — CAS-based lock-free counter (best for counters)']}),

    mkSlide({layout:'timeline',title:'Request Lifecycle in Spring Boot',subtitle:'From HTTP packet to JSON response',accent:'#c792ea',anim:'slide-right',
      bullets:['Tomcat receives TCP packet, parses HTTP request','DispatcherServlet matched by servlet mapping','HandlerMapping finds @RequestMapping method','Interceptors run — auth checks, logging, MDC','@Controller method executes with injected deps','HttpMessageConverter serializes return to JSON','Response flushed, connection kept or closed']}),

    mkSlide({layout:'diagram',title:'Spring Security Filter Chain',subtitle:'Every request passes through this pipeline',accent:'#c792ea',anim:'slide-right',diagramType:'security'}),

    mkSlide({layout:'terminal',title:'Docker for Java Devs',subtitle:'Containerizing a Spring Boot app',accent:'#7c8cf8',anim:'slide-right',
      code:\`FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/myapp.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]\`}),

    mkSlide({layout:'split',title:'L1, L2 & Query Cache',subtitle:'Hibernate caching explained',accent:'#7cf8a0',anim:'fade-up',
      bullets:['L1 Cache (Session level) — enabled by default, tied to the transaction','L2 Cache (SessionFactory level) — shared across sessions, requires Ehcache/Redis','Query Cache — caches query results (IDs), usually paired with L2 cache'],
      code:\`@Entity
@Cacheable
@org.hibernate.annotations.Cache(
  usage = CacheConcurrencyStrategy.READ_WRITE
)
public class Product {
  @Id
  private Long id;
  private String name;
}\`}),

    mkSlide({layout:'bento-grid',role:'visualization',title:'Why Use a Bento Grid?',subtitle:'Apple-style dashboard layouts',accent:'#7cd4f8',anim:'scale-in',
      bullets:['Highlights core features in varying sizes','Responsive and highly modular design','Focuses the eye on the largest blocks','Breaks monotony of standard lists']}),

    mkSlide({layout:'glass-fan',role:'visualization',title:'The Glass Fan Layout',subtitle:'Step through to fan the cards out',accent:'#c792ea',anim:'fade-up',
      bullets:['Card 1: Stacks perfectly on load','Card 2: Fans out beautifully on step','Card 3: Completes the premium spread']}),

    mkSlide({layout:'3d-carousel',role:'visualization',title:'3D Carousel Depth',subtitle:'Step through to pull cards forward',accent:'#f87c7c',anim:'scale-in',
      bullets:['Option A: Pushed back in Z-space initially','Option B: Comes into focus next','Option C: Flies in to complete the carousel']})
  ];
}
`;

let content = fs.readFileSync('e:/Development/motion slides/js/state.js', 'utf8');
content = content.replace(/\s*];\s*}\s*$/, '') + '\n' + extraSlides;
fs.writeFileSync('e:/Development/motion slides/js/state.js', content);
console.log('Appended extra slides.');
