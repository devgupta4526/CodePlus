import { useState, useMemo, useEffect } from "react";

const TAGS = {
  PROD: { label: "PROD", bg: "#FAECE7", color: "#993C1D" },
  INT:  { label: "INT",  bg: "#EEEDFE", color: "#3C3489" },
  NEW:  { label: "NEW",  bg: "#EAF3DE", color: "#27500A" },
  PROJ: { label: "PROJ", bg: "#FAEEDA", color: "#633806" },
};

function Tag({ type }) {
  const t = TAGS[type];
  if (!t) return null;
  return (
    <span style={{
      fontSize: 9, padding: "1px 5px", borderRadius: 3,
      background: t.bg, color: t.color, fontWeight: 500,
      marginLeft: 4, verticalAlign: "middle", display: "inline-block"
    }}>{t.label}</span>
  );
}

function parseSub(raw) {
  const parts = raw.split(/(\[PROD\]|\[INT\]|\[NEW\]|\[PROJ\])/g);
  return parts.map((p, i) => {
    if (["[PROD]","[INT]","[NEW]","[PROJ]"].includes(p)) return <Tag key={i} type={p.slice(1,-1)} />;
    return <span key={i}>{p}</span>;
  });
}

const ALL_PHASES = [
  {
    id: "p1", label: "Java Core", color: "#185FA5", icon: "☕",
    sections: [
      {
        id: "s1_1", title: "OOP & Java Fundamentals",
        vids: [
          { title: "OOP — 4 Pillars in Depth", dur: "97m", subs: [
            "Encapsulation: private fields, public API, why it matters in microservices [INT]",
            "Abstraction: abstract classes vs interfaces — decision matrix [INT]",
            "Inheritance: IS-A relationship, code reuse vs composition debate [INT]",
            "Polymorphism: compile-time (overloading) vs runtime (overriding) [INT]",
            "Why Java is not 100% OOP — int, static methods, primitives",
            "SOLID principles mapped to each OOP pillar [PROD]",
            "Production example: payment processor designed with all 4 pillars [PROJ]",
          ]},
          { title: "How Java Works: JVM, JRE, JDK", dur: "36m", subs: [
            "JDK = JRE + compiler tools; JRE = JVM + class libraries [INT]",
            "Compilation pipeline: .java → javac → .class (bytecode) [INT]",
            "JVM internals: classloader subsystem — bootstrap, ext, app loaders [INT]",
            "Execution engine: interpreter → JIT compiler (C1/C2 tiers)",
            "Write once run anywhere: platform independence explained",
            "JVM languages: Kotlin, Scala, Groovy all run same JVM",
            "Quiz: why only 1 public class per .java file? [INT]",
          ]},
          { title: "Variables & Primitive Data Types", dur: "70m", subs: [
            "8 primitive types: byte, short, int, long, float, double, char, boolean",
            "Default values for instance vs local variables [INT]",
            "Integer overflow: int max + 1 = int min — production bug demo [PROD]",
            "IEEE 754 floating point: sign bit, exponent, mantissa explained [INT]",
            "Why 0.1 + 0.2 ≠ 0.3 — BigDecimal as the fix [PROD]",
            "Type widening vs narrowing, explicit casting rules",
            "Literals: hex (0x), binary (0b), underscore separators (1_000_000)",
            "String is not primitive — String pool, interning [INT]",
            "Reference types: object reference vs object on heap",
          ]},
          { title: "Java Methods Deep Dive", dur: "61m", subs: [
            "Method signature: name + parameter types (return type excluded) [INT]",
            "Pass-by-value in Java — even objects (reference is copied) [INT]",
            "Overloading: resolution at compile time, widening vs autoboxing priority",
            "Varargs: String... args, ambiguity issues with overloading",
            "Static vs instance methods — memory implications",
            "Covariant return types in method overriding [INT]",
            "Method references: static, instance, constructor — all 4 forms [INT]",
            "Recursion: call stack, tail recursion, StackOverflowError risk",
          ]},
          { title: "Constructors Deep Dive", dur: "35m", subs: [
            "Constructor vs method: no return type, same name as class",
            "Default constructor: when compiler generates it and when not [INT]",
            "Constructor chaining: this() must be first statement [INT]",
            "super() call: explicit vs implicit in subclass constructors",
            "Copy constructor pattern in Java",
            "Factory method pattern vs constructor — when to prefer each",
            "Initialization order: static blocks → instance blocks → constructor [INT]",
          ]},
        ]
      },
      {
        id: "s1_2", title: "Memory Management & JVM Internals",
        vids: [
          { title: "Java Memory Management & GC Deep Dive", dur: "49m", subs: [
            "JVM memory areas: heap, stack, metaspace, code cache, direct memory [INT]",
            "Heap regions: Young Gen (Eden, S0, S1) → Old Gen → Metaspace",
            "GC algorithms: Serial, Parallel, CMS, G1, ZGC, Shenandoah [INT]",
            "Minor GC vs Major GC vs Full GC — when each triggers [INT]",
            "Mark-sweep-compact cycle step by step",
            "Stop-the-world pauses — why ZGC was created [PROD]",
            "Tuning flags: -Xmx, -Xms, -XX:NewRatio, -XX:+UseG1GC [PROD]",
            "Reading GC logs: identify memory leaks [PROD]",
            "WeakReference, SoftReference, PhantomReference use cases",
          ]},
          { title: "Stack & Heap Frame-by-Frame", dur: "30m", subs: [
            "Stack frame: local variable array, operand stack, frame data",
            "Method call = push frame; return = pop frame",
            "Object creation: new → heap allocation → reference on stack",
            "String pool: intern(), == vs equals() trap [INT]",
            "Integer cache: -128 to 127 cached — == comparison trap [INT]",
            "Escape analysis: JVM stack allocation optimization",
            "Memory leak demo: static collections holding references [PROD]",
          ]},
        ]
      },
      {
        id: "s1_3", title: "Java Classes In Depth",
        vids: [
          { title: "Classes Part 1: Nested, Abstract, Concrete", dur: "50m", subs: [
            "Concrete class: full implementation, can be instantiated",
            "Abstract class: partial implementation, template method pattern [INT]",
            "Static nested class: no reference to outer instance [INT]",
            "Inner class (non-static): holds outer reference — memory leak risk [PROD]",
            "Local class: defined inside method, captures effectively final locals",
            "Anonymous class: single-use implementation, replaced by lambdas",
            "Object class methods: equals, hashCode, toString, clone, finalize [INT]",
            "equals() and hashCode() contract — must override together [INT]",
          ]},
          { title: "Generic Classes & Type Erasure", dur: "52m", subs: [
            "Generics syntax: <T>, <T extends Comparable<T>>, <? super T>",
            "Type erasure: generics exist only at compile time [INT]",
            "Why you cannot do new T() — type erasure reason",
            "Bounded wildcards: PECS — Producer Extends, Consumer Super [INT]",
            "Generic methods: <T> T method(T param)",
            "Raw types: what breaks when using List instead of List<String>",
            "Reifiable vs non-reifiable types — heap pollution",
          ]},
          { title: "Singleton & Immutable Class", dur: "28m", subs: [
            "Singleton patterns: eager, lazy, synchronized, double-checked locking [INT]",
            "Bill Pugh singleton: static inner class — best approach [INT]",
            "Enum singleton: serialization-safe, reflection-safe [INT]",
            "Breaking singleton: reflection, serialization — prevention strategies",
            "Immutable class: final class, final fields, no setters, deep copy [INT]",
            "Why String is immutable — security, thread safety, String pool [INT]",
          ]},
          { title: "Enum, Record, POJO, Final Classes", dur: "43m", subs: [
            "Enum internals: extends Enum, values() and valueOf() generated [INT]",
            "Enum with fields, methods, abstract methods per constant",
            "EnumSet and EnumMap — performance advantages over HashMap [INT]",
            "Enum as singleton — thread-safe and serialization-safe [INT]",
            "Record class (Java 16): immutable data carrier, auto-generates everything [NEW]",
            "Record limitations: cannot extend, all fields final",
            "Final class: cannot be subclassed — String, Integer, BigDecimal [INT]",
          ]},
        ]
      },
      {
        id: "s1_4", title: "Interfaces & Functional Programming",
        vids: [
          { title: "Interface Deep Dive Part 1 & 2", dur: "73m", subs: [
            "Interface: public abstract methods, public static final fields [INT]",
            "Why interface fields are implicitly static final [INT]",
            "Interface vs abstract class — decision matrix [INT]",
            "Default methods (Java 8): backward compatibility [INT]",
            "Diamond problem with default methods — resolution rules [INT]",
            "Static methods in interfaces: utility, not inherited",
            "Private methods (Java 9): code reuse inside interface [NEW]",
            "Interface segregation principle (ISP) in SOLID [PROD]",
            "Marker interfaces: Serializable, Cloneable — vs @interface alternative",
          ]},
          { title: "Functional Interface & Lambda Expressions", dur: "32m", subs: [
            "@FunctionalInterface: exactly 1 abstract method [INT]",
            "Built-in: Function<T,R>, Predicate<T>, Consumer<T>, Supplier<T>, BiFunction",
            "Lambda syntax: (params) -> expression vs block form",
            "Effectively final: why captured variables must not change [INT]",
            "Method reference types: Class::static, obj::instance, Class::new [INT]",
            "Composing functions: andThen(), compose(), and(), or(), negate()",
            "Functional programming style: no shared state, pure functions [PROD]",
          ]},
        ]
      },
      {
        id: "s1_5", title: "Java Modern Features (8–21)",
        vids: [
          { title: "Sealed Classes, Pattern Matching & Switch Expressions", dur: "60m", subs: [
            "Sealed class: permits keyword, restricts subclassing [NEW]",
            "Pattern matching for instanceof — no explicit cast needed [NEW]",
            "Pattern matching for switch — exhaustive matching [NEW]",
            "Guarded patterns: case String s when s.length() > 5 [NEW]",
            "Switch expression (Java 14): yields value, no fall-through [NEW]",
            "Arrow case syntax: case X -> expression [NEW]",
            "How sealed classes + pattern matching replace visitor pattern [INT]",
          ]},
          { title: "Records, Text Blocks, SequencedCollection, Virtual Threads", dur: "78m", subs: [
            "Text blocks (Java 15): indentation trimming, no escape hell [NEW]",
            "Text blocks for SQL, JSON, HTML in code [PROD]",
            "Record class: compact constructors, customizing accessors [NEW]",
            "SequencedCollection, SequencedSet, SequencedMap (Java 21) [NEW]",
            "Virtual Threads (Java 21 / Project Loom) [NEW]",
            "Thread.ofVirtual(), Executors.newVirtualThreadPerTaskExecutor() [NEW]",
            "Virtual threads + Spring Boot 3.2: auto virtual thread executor [PROD]",
            "Structured concurrency: StructuredTaskScope [NEW]",
          ]},
          { title: "Optional (Java 8–11 Complete)", dur: "74m", subs: [
            "Optional: container for nullable values — avoid NPE [INT]",
            "Creating: Optional.of(), ofNullable(), empty()",
            "Consuming: get(), orElse(), orElseGet(), orElseThrow() [INT]",
            "Transforming: map(), flatMap(), filter()",
            "ifPresentOrElse() (Java 9), or() (Java 9), stream() (Java 9)",
            "Anti-patterns: Optional as parameter, Optional in collections [PROD]",
            "Optional in Spring: repository methods returning Optional [PROD]",
          ]},
          { title: "Java File I/O & NIO2", dur: "65m", subs: [
            "InputStream/OutputStream (bytes), Reader/Writer (chars)",
            "BufferedReader, BufferedWriter — performance wrappers",
            "File class vs Path/Paths (NIO2) — prefer NIO2 [INT]",
            "Files utility: readAllLines, write, copy, move, delete",
            "Try-with-resources for auto-closing streams [PROD]",
            "Serialization: ObjectOutputStream, transient keyword [INT]",
            "Channel and Buffer: ByteBuffer, FileChannel for performance I/O",
          ]},
        ]
      },
      {
        id: "s1_6", title: "Reflection & Annotations",
        vids: [
          { title: "Java Reflection In Depth", dur: "38m", subs: [
            "Class object: Class.forName(), .class, obj.getClass() [INT]",
            "getDeclaredFields(), getDeclaredMethods(), getConstructors()",
            "setAccessible(true): access private members — Spring uses this [INT]",
            "Dynamic instantiation: Constructor.newInstance()",
            "Performance cost of reflection — and when it doesn't matter",
            "How Spring IoC uses reflection under the hood [PROD]",
            "How Jackson ObjectMapper uses reflection for JSON mapping",
          ]},
          { title: "Annotations Deep Dive", dur: "71m", subs: [
            "Built-in: @Override, @Deprecated, @SuppressWarnings, @SafeVarargs",
            "Meta-annotations: @Retention (SOURCE/CLASS/RUNTIME), @Target, @Documented, @Inherited [INT]",
            "Creating custom annotation: @interface syntax",
            "Retention.RUNTIME: readable via reflection — Spring uses this [PROD]",
            "Repeatable annotations: @Repeatable with container annotation",
            "Annotation processors (APT): compile-time code generation — Lombok uses this",
            "Reading annotations at runtime: method.getAnnotation(MyAnnotation.class)",
            "Spring annotation processing: BeanDefinition registration flow [PROD]",
          ]},
        ]
      },
      {
        id: "s1_7", title: "Exception Handling",
        vids: [
          { title: "Exception Handling Complete", dur: "75m", subs: [
            "Throwable hierarchy: Error vs Exception [INT]",
            "Checked vs unchecked exceptions — compile-time enforcement [INT]",
            "try-catch-finally execution order — finally always runs [INT]",
            "Multi-catch: catch (IOException | SQLException e)",
            "Try-with-resources: AutoCloseable, suppressed exceptions [INT]",
            "Exception chaining: initCause(), getCause()",
            "Custom exception: RuntimeException vs Exception — when to use [PROD]",
            "throw vs throws: throwing vs declaring [INT]",
            "Overriding methods: cannot throw new/broader checked exceptions [INT]",
            "Exception best practices: specific catch, don't swallow, log properly [PROD]",
          ]},
        ]
      },
      {
        id: "s1_8", title: "Collections Framework",
        vids: [
          { title: "Collections Overview & List Implementations", dur: "41m", subs: [
            "Hierarchy: Iterable → Collection → List/Set/Queue/Deque [INT]",
            "ArrayList: dynamic array, O(1) get, O(n) insert/delete [INT]",
            "ArrayList resizing: initial capacity 10, grows to 1.5x [INT]",
            "LinkedList: doubly linked, O(1) add/remove ends, O(n) get [INT]",
            "ArrayList vs LinkedList: cache locality, iteration speed [INT]",
            "List.of() vs Collections.unmodifiableList() — immutability semantics [INT]",
            "CopyOnWriteArrayList: thread-safe, snapshot iterator [PROD]",
          ]},
          { title: "HashMap Internals & ConcurrentHashMap", dur: "58m", subs: [
            "HashMap: array of buckets, key.hashCode() → index [INT]",
            "Hash collision: chaining (LinkedList) → treeify at 8 nodes (Java 8) [INT]",
            "Load factor 0.75 and capacity: when resize triggers [INT]",
            "hashCode() and equals() contract for custom keys [INT]",
            "HashMap is not thread-safe: ConcurrentModificationException demo [INT]",
            "ConcurrentHashMap: CAS-based in Java 8 [PROD]",
            "ConcurrentHashMap vs Hashtable vs synchronizedMap [INT]",
            "compute(), merge(), getOrDefault() — production patterns [PROD]",
          ]},
          { title: "LinkedHashMap, TreeMap, Set, Comparator", dur: "98m", subs: [
            "LinkedHashMap: insertion-order or access-order (LRU!) [INT]",
            "LRU cache with LinkedHashMap: removeEldestEntry() [PROJ]",
            "TreeMap: Red-Black tree, sorted by key, O(log n) all ops [INT]",
            "NavigableMap: floorKey, ceilingKey, headMap, tailMap",
            "HashSet: backed by HashMap, O(1) contains [INT]",
            "LinkedHashSet: insertion-order; TreeSet: sorted, O(log n)",
            "EnumSet: bit vector — extremely fast [INT]",
            "Comparable: natural ordering, compareTo() contract [INT]",
            "Comparator: comparing(), thenComparing(), reversed(), nullsFirst() [INT]",
            "PriorityQueue: min-heap by default, O(log n) insert/remove [INT]",
            "Top-K elements pattern using PriorityQueue [PROD]",
          ]},
          { title: "Deque, Stack, BlockingQueue", dur: "72m", subs: [
            "Deque: double-ended queue — addFirst, addLast, pollFirst, pollLast [INT]",
            "ArrayDeque vs LinkedList as Deque — ArrayDeque preferred [INT]",
            "Stack with ArrayDeque: push=addFirst, pop=removeFirst",
            "Why Stack class is deprecated [INT]",
            "Monotonic stack pattern: next greater element problems",
            "BlockingQueue: ArrayBlockingQueue, LinkedBlockingQueue [PROD]",
            "SynchronousQueue: handoff channel, used in CachedThreadPool [INT]",
          ]},
          { title: "Stream API Complete Guide", dur: "75m", subs: [
            "Stream pipeline: source → intermediate ops → terminal op [INT]",
            "Lazy evaluation: intermediate ops don't run until terminal [INT]",
            "filter(), map(), flatMap(), distinct(), sorted(), peek(), limit(), skip()",
            "Terminal: collect(), forEach(), reduce(), count(), findFirst(), anyMatch()",
            "Collectors: toList(), toSet(), toMap(), groupingBy(), partitioningBy() [INT]",
            "Collectors.joining(), counting(), summingInt(), averagingDouble()",
            "Stream.of(), Arrays.stream(), IntStream.range()",
            "ParallelStream: ForkJoinPool.commonPool(), when it hurts [INT]",
            "Stream is not reusable — IllegalStateException demo [INT]",
            "Infinite streams: Stream.iterate(), Stream.generate()",
          ]},
        ]
      },
      {
        id: "s1_9", title: "Multithreading & Concurrency",
        vids: [
          { title: "Concurrency Fundamentals & Thread Lifecycle", dur: "116m", subs: [
            "Process vs Thread: separate memory vs shared heap [INT]",
            "Thread creation: extends Thread vs Runnable vs Callable [INT]",
            "Race condition: shared mutable state without synchronization [INT]",
            "Happens-before relationship: Java Memory Model [INT]",
            "volatile: ensures visibility but NOT atomicity [INT]",
            "Thread states: NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED [INT]",
            "sleep() vs wait(): sleep keeps lock, wait releases lock [INT]",
            "join(): wait for thread; interrupt(): sets interrupt flag [INT]",
            "wait(), notify(), notifyAll() — must be inside synchronized [INT]",
            "Daemon threads: JVM exits when only daemons remain [INT]",
          ]},
          { title: "Locks, Synchronization & Lock-Free", dur: "89m", subs: [
            "synchronized method vs block — prefer block [INT]",
            "ReentrantLock: tryLock(), lockInterruptibly(), fairness [INT]",
            "ReentrantLock vs synchronized: condition variables [INT]",
            "ReadWriteLock: multiple readers OR one writer [PROD]",
            "Deadlock: conditions, detection, prevention strategies [INT]",
            "CAS: Compare-And-Swap — hardware atomic instruction [INT]",
            "AtomicInteger, AtomicLong: getAndIncrement(), compareAndSet() [INT]",
            "ABA problem: AtomicStampedReference as fix [INT]",
            "LongAdder vs AtomicLong — stripe-based high-contention counter [PROD]",
          ]},
          { title: "Thread Pools & CompletableFuture", dur: "143m", subs: [
            "ExecutorService: submit(), execute(), shutdown(), awaitTermination() [INT]",
            "ThreadPoolExecutor: corePoolSize, maxPoolSize, keepAlive, queue, rejectionPolicy [INT]",
            "Queue types: ArrayBlockingQueue, LinkedBlockingQueue, SynchronousQueue [INT]",
            "Rejection policies: Abort, CallerRuns, DiscardOldest, Discard [INT]",
            "Pool sizing: CPU-bound = N+1, IO-bound = N × (W/C) [PROD]",
            "FixedThreadPool, CachedThreadPool, SingleThreadExecutor [INT]",
            "ForkJoinPool: work-stealing, RecursiveTask, RecursiveAction",
            "ScheduledExecutorService: scheduleAtFixedRate vs scheduleWithFixedDelay [PROD]",
            "Virtual Threads (Java 21): Thread.ofVirtual() [NEW]",
            "ThreadLocal: per-thread storage, memory leak risk in pools [PROD]",
            "CompletableFuture vs Future: non-blocking, chainable [INT]",
            "thenApply, thenCompose, thenCombine, allOf, exceptionally [INT]",
          ]},
        ]
      },
      {
        id: "s1_10", title: "Project Lombok & Modern Tooling",
        vids: [
          { title: "Project Lombok Top 10 Features", dur: "28m", subs: [
            "@Getter, @Setter: generated at compile time via APT",
            "@ToString: include/exclude fields, callSuper",
            "@EqualsAndHashCode: correct contract, callSuper pitfall [INT]",
            "@RequiredArgsConstructor, @AllArgsConstructor, @NoArgsConstructor",
            "@Builder: builder pattern, toBuilder(), @Builder.Default [PROD]",
            "@Data = @Getter + @Setter + @ToString + @EqualsAndHashCode + @RequiredArgsConstructor",
            "@Slf4j: injects log field — log.info(), log.error() [PROD]",
            "Lombok pitfalls: @Data with JPA entities — avoid! [PROD]",
            "Lombok vs Records — when to use which [INT]",
          ]},
        ]
      },
    ]
  },
  {
    id: "p2", label: "JDBC & Hibernate", color: "#185FA5", icon: "🗄️",
    sections: [
      {
        id: "s2_1", title: "JDBC Complete",
        vids: [
          { title: "JDBC Architecture & Steps", dur: "18m", subs: [
            "JDBC: Java API to interact with relational databases [INT]",
            "Driver types: Type 4 thin driver (PostgreSQL JDBC) preferred [INT]",
            "JDBC 6 steps: Load driver → Connect → Statement → Execute → Process → Close [INT]",
            "Connection URL format: jdbc:postgresql://host:5432/dbname [PROD]",
            "Why raw JDBC is painful — and what Spring JDBC / JPA solve",
          ]},
          { title: "Statement, ResultSet & CRUD", dur: "25m", subs: [
            "Statement: executeQuery() → ResultSet, executeUpdate() → row count [INT]",
            "ResultSet cursor: next(), getString(), getInt(), getTimestamp()",
            "Insert, update, delete with executeUpdate()",
            "Fetching all records: while(rs.next()) loop pattern",
            "Closing resources: try-with-resources is mandatory [PROD]",
          ]},
          { title: "PreparedStatement & Security", dur: "10m", subs: [
            "Statement vs PreparedStatement: runtime compile vs precompile [INT]",
            "SQL injection via Statement — live demo [INT]",
            "PreparedStatement prevents SQL injection: setString(), setInt() [INT]",
            "PreparedStatement performance: DB caches execution plan [PROD]",
            "Batch inserts: addBatch(), executeBatch() [PROD]",
            "CallableStatement: for stored procedures, registerOutParameter()",
          ]},
        ]
      },
      {
        id: "s2_2", title: "Hibernate ORM",
        vids: [
          { title: "Hibernate Setup & Core CRUD", dur: "29m", subs: [
            "ORM: maps Java class ↔ DB table, field ↔ column, object ↔ row [INT]",
            "SessionFactory, Session, Transaction — Hibernate core objects",
            "hbm2ddl.auto: create, update, validate, none — never update in prod [INT]",
            "show_sql and format_sql for debugging [PROD]",
            "Session.save() vs persist() — return type difference [INT]",
            "Session.get() vs Session.load() — immediate vs proxy [INT]",
            "Session.update() vs merge() — attached vs detached entity [INT]",
          ]},
          { title: "Mapping Relationships & Fetch Types", dur: "22m", subs: [
            "@Embeddable and @Embedded: value objects with no ID [INT]",
            "@OneToOne, @OneToMany, @ManyToOne, @ManyToMany [INT]",
            "CascadeType: ALL, PERSIST, MERGE, REMOVE [INT]",
            "Fetch: EAGER loads immediately, LAZY loads on access [INT]",
            "Default fetch: @OneToMany = LAZY, @ManyToOne = EAGER [INT]",
            "N+1 problem in Hibernate — how it manifests [INT]",
          ]},
          { title: "HQL & Caching", dur: "25m", subs: [
            "HQL: works on entity names not table names [INT]",
            "Named parameters: FROM Student s WHERE s.name = :name [INT]",
            "Projection: SELECT s.name, s.marks FROM Student s",
            "Named queries: @NamedQuery on entity class [PROD]",
            "HQL vs Criteria API vs Native SQL — when to use which [INT]",
            "L1 cache: Session-scoped, always on — same ID = 1 query [INT]",
            "L2 cache: SessionFactory-scoped, Ehcache setup [PROD]",
            "@Cache(usage = CacheConcurrencyStrategy.READ_WRITE) [PROD]",
            "Query cache: caches result sets, invalidated on entity change [PROD]",
          ]},
        ]
      },
    ]
  },
  {
    id: "p3", label: "Spring Boot", color: "#3B6D11", icon: "🌱",
    sections: [
      {
        id: "s3_1", title: "Spring Core & IoC",
        vids: [
          { title: "Why Spring, IoC, DI & Auto-Configuration", dur: "46m", subs: [
            "Problems without Spring: tight coupling, manual wiring, boilerplate [INT]",
            "IoC principle: framework calls your code, not the other way [INT]",
            "DI types: constructor, setter, field injection [INT]",
            "@SpringBootApplication = @Configuration + @EnableAutoConfiguration + @ComponentScan [INT]",
            "Auto-config: conditional beans from autoconfigure.imports [INT]",
            "Starters: spring-boot-starter-web includes Tomcat, Jackson, Spring MVC [PROD]",
          ]},
          { title: "Maven Lifecycle & Spring Boot Project Setup", dur: "73m", subs: [
            "Maven phases: validate → compile → test → package → verify → install → deploy [INT]",
            "pom.xml: groupId, artifactId, version, parent, dependencies",
            "spring-boot-starter-parent: BOM for version management [PROD]",
            "Dependency scopes: compile, provided, runtime, test [INT]",
            "mvn dependency:tree — spot conflicts [PROD]",
            "Effective POM: mvn help:effective-pom",
            "Maven wrapper: ./mvnw — reproducible builds [PROD]",
            "Multi-module Maven: parent POM, child modules [PROD]",
            "Layered architecture: Controller → Service → Repository [INT]",
          ]},
          { title: "Bean Lifecycle & Scopes", dur: "74m", subs: [
            "Bean lifecycle: instantiate → DI → @PostConstruct → ready → @PreDestroy [INT]",
            "BeanPostProcessor: intercept before/after initialization",
            "Singleton (default): one instance per ApplicationContext [INT]",
            "Prototype: new instance every injection — not managed after creation [INT]",
            "Request, Session, Application scopes [PROD]",
            "Scoped proxy for singleton→prototype injection: ScopedProxyMode [INT]",
            "@Lazy: delay bean creation until first use [PROD]",
          ]},
          { title: "Dependency Injection, @Autowired, @Primary, @Qualifier", dur: "39m", subs: [
            "Constructor injection: preferred — immutable, testable [INT]",
            "Field injection: @Autowired on field — avoid in production [INT]",
            "@Autowired resolution: by type → by name [INT]",
            "@Primary: default bean when multiple candidates [INT]",
            "@Qualifier(\"name\"): explicit bean selection [INT]",
            "Circular dependency: constructor → error, field → silent but bad [INT]",
            "Resolving circular deps: @Lazy on one side, or redesign [PROD]",
          ]},
          { title: "Configuration, Profiles & Conditional Beans", dur: "90m", subs: [
            "@Value(\"${key}\"): inject single property [INT]",
            "@Value with default: @Value(\"${key:default}\")",
            "@ConfigurationProperties: bind entire prefix to POJO [PROD]",
            "Validation: @Validated + @NotNull on config properties [PROD]",
            "application.yml vs application.properties — YAML hierarchy",
            "Property override order: CLI > env var > application-{profile}.yml > application.yml [INT]",
            "@Profile(\"dev\"): bean active only in named profile [PROD]",
            "spring.profiles.active — activation [PROD]",
            "Profile-specific files: application-dev.yml, application-prod.yml [PROD]",
            "@ConditionalOnProperty: activate bean on property value [PROD]",
            "@ConditionalOnMissingBean: default bean pattern [PROD]",
            "Auto-config report: --debug flag [PROD]",
          ]},
        ]
      },
      {
        id: "s3_2", title: "Spring AOP",
        vids: [
          { title: "Spring AOP Complete", dur: "69m", subs: [
            "Cross-cutting concerns: logging, security, transactions, auditing [INT]",
            "AOP concepts: Aspect, Advice, JoinPoint, Pointcut, Weaving [INT]",
            "Spring AOP: proxy-based — JDK proxy (interface) or CGLIB (class) [INT]",
            "@Before, @After, @AfterReturning, @AfterThrowing, @Around [INT]",
            "@Around: must call ProceedingJoinPoint.proceed() [INT]",
            "Pointcut expressions: execution(), @annotation(), bean() [INT]",
            "Self-invocation: AOP doesn't intercept same-class calls [INT]",
            "Performance monitoring aspect: log slow methods > 500ms [PROJ]",
            "Audit logging aspect with custom @AuditLog annotation [PROJ]",
          ]},
        ]
      },
      {
        id: "s3_3", title: "REST API Design & Exception Handling",
        vids: [
          { title: "REST Concepts & Controller Design", dur: "50m", subs: [
            "REST constraints: stateless, client-server, uniform interface [INT]",
            "Resource naming: nouns not verbs — /products not /getProducts [INT]",
            "HTTP methods: GET=Read, POST=Create, PUT=Update, DELETE=Delete, PATCH=Partial [INT]",
            "Idempotency: GET/PUT/DELETE are idempotent, POST is not [INT]",
            "Versioning strategies: URI (/v1/), header, query param [PROD]",
            "@RestController, @RequestMapping, @PathVariable, @RequestParam, @RequestBody [INT]",
            "Content negotiation: Accept header → JSON or XML [PROD]",
            "Multipart file upload: @RequestParam MultipartFile [PROD]",
          ]},
          { title: "ResponseEntity & Global Exception Handling", dur: "99m", subs: [
            "ResponseEntity<T>: control status, headers, body [INT]",
            "HTTP status codes: 200, 201, 204, 400, 401, 403, 404, 409, 422, 500 [INT]",
            "When 400 vs 422: validation failure [INT]",
            "When 401 vs 403: authentication vs authorization [INT]",
            "ProblemDetail (RFC 7807): standard error response (Spring 6) [NEW]",
            "@ControllerAdvice: global exception handler [INT]",
            "@ExceptionHandler(SpecificException.class): map to response",
            "Exception hierarchy: ApiException → ResourceNotFoundException → ConflictException [PROD]",
            "Bean Validation: @Valid, @NotNull, @NotBlank, @Size, @Pattern [PROD]",
            "MethodArgumentNotValidException: extract field errors [PROD]",
            "Custom error DTO: timestamp, status, message, errors, path [PROD]",
          ]},
          { title: "Filters vs Interceptors", dur: "54m", subs: [
            "Servlet Filter: runs before DispatcherServlet [INT]",
            "Filter use cases: CORS, compression, auth token extraction [PROD]",
            "HandlerInterceptor: preHandle, postHandle, afterCompletion [INT]",
            "Interceptor vs Filter: interceptor knows Spring context [INT]",
            "OncePerRequestFilter: runs once per request [PROD]",
            "MDC: add request ID to all log lines [PROD]",
            "Request logging filter: log method, URI, duration, status [PROJ]",
          ]},
        ]
      },
      {
        id: "s3_4", title: "Transactions Deep Dive",
        vids: [
          { title: "@Transactional Complete Guide", dur: "102m", subs: [
            "ACID: Atomicity, Consistency, Isolation, Durability [INT]",
            "@Transactional: Spring proxy manages begin/commit/rollback [INT]",
            "Proxy requirement: only works on public methods called from outside [INT]",
            "Self-invocation bypasses @Transactional — same proxy problem [INT]",
            "rollbackFor: only RuntimeException by default [INT]",
            "readOnly=true: optimization for SELECT queries [PROD]",
            "Propagation.REQUIRED: join existing or create new (default) [INT]",
            "Propagation.REQUIRES_NEW: always new, suspend outer [INT]",
            "Propagation.NESTED: savepoint-based nested transaction [INT]",
            "Isolation.READ_UNCOMMITTED, READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE [INT]",
            "Dirty read, non-repeatable read, phantom read — definitions [INT]",
            "Programmatic transactions: TransactionTemplate [PROD]",
            "Distributed transactions: Saga pattern over 2PC [PROD]",
          ]},
        ]
      },
      {
        id: "s3_5", title: "Spring Data JPA",
        vids: [
          { title: "JPA Setup, Entity Basics & Flyway", dur: "109m", subs: [
            "ORM → JPA spec → Hibernate implementation [INT]",
            "@Entity, @Table, @Id, @GeneratedValue(strategy=...) [INT]",
            "GenerationType: AUTO, IDENTITY, SEQUENCE, TABLE [INT]",
            "Entity states: transient, persistent, detached, removed [INT]",
            "Spring Data JPA: JpaRepository → CrudRepository [INT]",
            "Flyway: versioned migration scripts, V1__init.sql [PROD]",
            "HikariCP: maximumPoolSize, connectionTimeout config [PROD]",
          ]},
          { title: "JPA L1 & L2 Caching", dur: "65m", subs: [
            "L1 cache: EntityManager/Session scope — always on [INT]",
            "L1 demo: same session, same ID → only 1 SQL query [INT]",
            "clear() and detach() to remove from L1 cache",
            "L2 cache: SessionFactory scope — shared across sessions [INT]",
            "@Cache(usage=CacheConcurrencyStrategy.READ_WRITE) [PROD]",
            "Ehcache: cache regions, TTL, max entries [PROD]",
            "Query cache: needs entity cache too [PROD]",
            "Spring Cache: @Cacheable, @CacheEvict, @CachePut [PROD]",
            "Redis as L2 cache: RedisCacheManager [PROJ]",
          ]},
          { title: "Entity Relationships & N+1 Problem", dur: "125m", subs: [
            "@OneToOne uni/bidirectional, mappedBy on non-owning side [INT]",
            "@OneToMany / @ManyToOne: FK on Many side [INT]",
            "@ManyToMany: join table, @JoinTable [INT]",
            "CascadeType: ALL, PERSIST, MERGE, REMOVE, REFRESH [INT]",
            "orphanRemoval=true: delete child removed from collection [INT]",
            "EAGER vs LAZY — defaults per relationship type [INT]",
            "N+1 problem: LAZY @OneToMany → 1+N queries [INT]",
            "Fix N+1: JOIN FETCH, @EntityGraph, @BatchSize [PROD]",
            "DTO projections: interface-based, class-based [PROD]",
            "@MappedSuperclass: common audit fields in base class [PROD]",
            "@EntityListeners: auto-fill createdAt/updatedAt [PROD]",
          ]},
          { title: "JPQL, Criteria, Specification & Pagination", dur: "103m", subs: [
            "Derived queries: findByEmailAndStatus(), findByAgeGreaterThan() [INT]",
            "JPQL: SELECT e FROM Employee e WHERE e.dept.name = :deptName [INT]",
            "JPQL JOIN FETCH to solve N+1 in query [INT]",
            "@Query annotation: JPQL or native SQL [INT]",
            "@Modifying + @Transactional: for UPDATE/DELETE queries [PROD]",
            "Pagination: Pageable, Page<T>, Slice<T> — difference [PROD]",
            "Sort: Sort.by(\"field\").descending(), combined with PageRequest [PROD]",
            "Criteria API: type-safe programmatic query building [PROD]",
            "Specification API: composable WHERE clauses for dynamic search [PROD]",
            "NamedEntityGraph: define graph on entity for fine-grained fetch [PROD]",
          ]},
        ]
      },
      {
        id: "s3_6", title: "Spring Security",
        vids: [
          { title: "Security Architecture & Attack Demos", dur: "43m", subs: [
            "CSRF: forged state-changing request — token + SameSite defense [INT]",
            "XSS: inject script into page — output encoding defense [INT]",
            "SQL injection: parameterized queries (JPA protects automatically) [INT]",
            "CORS: browser policy, preflight OPTIONS request [INT]",
            "Spring Security filter chain: SecurityFilterChain bean [INT]",
            "SecurityContextHolder: ThreadLocal storage of Authentication [INT]",
          ]},
          { title: "User Auth: UserDetailsService, BCrypt", dur: "47m", subs: [
            "UserDetails: username, password, authorities, account flags [INT]",
            "UserDetailsService: loadUserByUsername() — DB lookup [INT]",
            "BCrypt: adaptive hash, cost factor, never store plain text [INT]",
            "DaoAuthenticationProvider: ties UserDetailsService + PasswordEncoder [INT]",
            "SecurityFilterChain: HttpSecurity bean configuration [PROD]",
            "permitAll() vs authenticated() vs hasRole() vs hasAuthority()",
          ]},
          { title: "JWT Authentication Implementation", dur: "123m", subs: [
            "JWT structure: header.payload.signature (Base64URL) [INT]",
            "Claims: iss, sub, aud, exp, iat — standard vs custom [INT]",
            "HS256 (symmetric) vs RS256 (asymmetric) [INT]",
            "Access token vs refresh token: short-lived vs long-lived [PROD]",
            "JwtAuthFilter: OncePerRequestFilter, extract Bearer token [PROD]",
            "Validating JWT: signature, expiry, claims [PROD]",
            "Setting authentication in SecurityContext [PROD]",
            "Token storage: httpOnly cookie vs localStorage — tradeoffs [INT]",
            "Token refresh endpoint pattern [PROD]",
            "Token blacklisting: store JTI in Redis [PROD]",
            "Stateless JWT vs stateful sessions — scalability [INT]",
          ]},
          { title: "OAuth2 & Method Security", dur: "116m", subs: [
            "OAuth2 roles: Resource Owner, Client, Authorization Server, Resource Server [INT]",
            "Authorization Code flow: most secure, for web apps [INT]",
            "PKCE: for SPAs and mobile [INT]",
            "Client Credentials: machine-to-machine in microservices [PROD]",
            "Spring OAuth2 client config: client-id, client-secret, scope, redirect-uri",
            "OAuth2UserService: load user from OAuth2 provider [PROD]",
            "Google + GitHub login implementation [PROJ]",
            "@EnableMethodSecurity (replaces @EnableGlobalMethodSecurity) [PROD]",
            "@PreAuthorize, @PostAuthorize, @PreFilter, @PostFilter [INT]",
            "SpEL in security: #username == authentication.name [INT]",
            "Custom PermissionEvaluator: hasPermission() [PROD]",
          ]},
        ]
      },
      {
        id: "s3_7", title: "Async, Scheduling & Monitoring",
        vids: [
          { title: "@Async, @Scheduled & Virtual Thread Executor", dur: "70m", subs: [
            "@EnableAsync on @Configuration class [INT]",
            "@Async on method: separate thread from pool [INT]",
            "Return types: void, Future<T>, CompletableFuture<T> [INT]",
            "Custom ThreadPoolTaskExecutor config [PROD]",
            "AsyncUncaughtExceptionHandler for @Async void methods [PROD]",
            "Self-invocation trap: @Async on same class doesn't work [INT]",
            "@Scheduled: cron, fixedRate, fixedDelay expressions [PROD]",
            "ShedLock: cluster-safe scheduling — only one node runs [PROD]",
          ]},
          { title: "Actuator, Micrometer & Prometheus", dur: "71m", subs: [
            "/actuator/health: UP/DOWN, custom health indicators [PROD]",
            "/actuator/metrics: JVM, CPU, HTTP request metrics [PROD]",
            "/actuator/info: git commit, build info [PROD]",
            "Securing actuator: expose only health, restrict others [PROD]",
            "Micrometer: Counter, Gauge, Timer, DistributionSummary [PROD]",
            "Prometheus scraping: /actuator/prometheus endpoint [PROD]",
            "Grafana dashboard: JVM dashboard + custom business panels [PROJ]",
            "Custom business metrics: orders/min, revenue counter [PROJ]",
          ]},
        ]
      },
      {
        id: "s3_8", title: "Web Layer: Servlets, MVC & Thymeleaf",
        vids: [
          { title: "Servlet Fundamentals & Session Management", dur: "46m", subs: [
            "HTTP request-response cycle [INT]",
            "Servlet lifecycle: init() → service() → destroy() [INT]",
            "doGet() vs doPost() routing [INT]",
            "HttpSession: setAttribute(), getAttribute(), invalidate()",
            "Cookie: HttpOnly, Secure, SameSite attributes [INT]",
            "Session fixation attack and prevention [PROD]",
            "WAR vs embedded Tomcat JAR in Spring Boot [INT]",
          ]},
          { title: "Spring MVC & DispatcherServlet", dur: "63m", subs: [
            "MVC pattern: Model, View, Controller — separation of concerns [INT]",
            "DispatcherServlet flow: Request → HandlerMapping → Controller → ViewResolver [INT]",
            "InternalResourceViewResolver: prefix/suffix for JSP [INT]",
            "@RequestMapping, @GetMapping, @PostMapping [INT]",
            "@ModelAttribute: bind form data to POJO [INT]",
            "Model and ModelAndView: pass data to view [INT]",
            "Thymeleaf: th:text, th:each, th:if, th:href, th:action [PROD]",
            "Content negotiation with HttpMessageConverter: JSON/XML [INT]",
          ]},
        ]
      },
      {
        id: "s3_9", title: "Spring Boot Testing",
        vids: [
          { title: "Testing Strategy & Test Slices", dur: "50m", subs: [
            "Test pyramid: unit → integration → E2E [PROD]",
            "@SpringBootTest: loads full context — slow, use sparingly [INT]",
            "@WebMvcTest: only web layer, mock service beans [INT]",
            "@DataJpaTest: only JPA layer, in-memory H2 [INT]",
            "@MockBean: Spring-managed mock — replaces bean in context [INT]",
            "Mockito: @Mock, @InjectMocks, when().thenReturn(), verify() [PROD]",
            "MockMvc: test controllers without starting server [PROD]",
            "Testcontainers: real PostgreSQL in Docker for integration tests [PROD]",
            "AssertJ: fluent assertions [PROD]",
          ]},
        ]
      },
    ]
  },
  {
    id: "p4", label: "Microservices", color: "#534AB7", icon: "🔗",
    sections: [
      {
        id: "s4_1", title: "Inter-Service Communication",
        vids: [
          { title: "RestTemplate → RestClient → FeignClient", dur: "173m", subs: [
            "RestTemplate: getForObject(), getForEntity(), exchange() [INT]",
            "ClientHttpRequestInterceptor: add auth header, logging [PROD]",
            "Timeout config: connectTimeout, readTimeout [PROD]",
            "Why RestTemplate is in maintenance mode [INT]",
            "RestClient (Spring 6.1): fluent API replacement [NEW]",
            ".get().uri().retrieve().body(Type.class) [NEW]",
            "FeignClient: @FeignClient(name, url) — interface-based [INT]",
            "Feign maps Spring MVC annotations: @GetMapping, @PostMapping [INT]",
            "FeignClient ErrorDecoder: map HTTP errors to exceptions [PROD]",
            "Feign + Resilience4j: fallback method [PROD]",
            "Feign request interceptor: inject Auth header automatically [PROD]",
          ]},
        ]
      },
      {
        id: "s4_2", title: "Service Discovery & Load Balancing",
        vids: [
          { title: "Eureka & Spring Cloud LoadBalancer", dur: "85m", subs: [
            "Why service discovery: dynamic IPs in cloud environments [INT]",
            "Eureka Server: @EnableEurekaServer setup [INT]",
            "Eureka Client: @EnableDiscoveryClient, heartbeat every 30s [INT]",
            "Self-preservation mode: keeps registrations on heartbeat drop [INT]",
            "Client-side vs server-side discovery [INT]",
            "Spring Cloud LoadBalancer: replaces Ribbon (deprecated) [INT]",
            "@LoadBalanced on RestClient: resolves service name [INT]",
            "Round Robin (default) and Random algorithms [INT]",
            "Health-check integration: skip unhealthy instances [PROD]",
          ]},
        ]
      },
      {
        id: "s4_3", title: "Resilience Patterns",
        vids: [
          { title: "Circuit Breaker, Retry, Rate Limiter, Bulkhead", dur: "164m", subs: [
            "Circuit breaker states: CLOSED, OPEN, HALF_OPEN [INT]",
            "Count-based and time-based sliding window [INT]",
            "failureRateThreshold, waitDurationInOpenState [PROD]",
            "@CircuitBreaker(name, fallbackMethod) [PROD]",
            "Actuator: /actuator/circuitbreakers endpoint [PROD]",
            "Retry: maxAttempts, waitDuration, retryExceptions [INT]",
            "Exponential backoff with jitter — avoid thundering herd [PROD]",
            "Idempotency requirement for safe retrying [INT]",
            "Rate Limiter: limitForPeriod, limitRefreshPeriod [PROD]",
            "Token bucket vs sliding window algorithms [INT]",
            "ThreadPoolBulkhead: dedicated pool per downstream [PROD]",
            "SemaphoreBulkhead: limit concurrent calls [PROD]",
            "Combining patterns: @CircuitBreaker + @Retry order matters [PROD]",
          ]},
        ]
      },
      {
        id: "s4_4", title: "API Gateway & Observability",
        vids: [
          { title: "Spring Cloud Gateway", dur: "68m", subs: [
            "Gateway responsibilities: routing, auth, rate limiting, SSL [INT]",
            "Spring Cloud Gateway: reactive, non-blocking [INT]",
            "Route definition: id, uri, predicates, filters [PROD]",
            "Predicates: Path, Method, Header, Query, Weight [PROD]",
            "GatewayFilter: AddRequestHeader, RewritePath, RequestRateLimiter [PROD]",
            "JWT validation at gateway before routing [PROJ]",
            "Redis-based rate limiting at gateway [PROD]",
            "Circuit breaker at gateway with fallback URI [PROD]",
            "CORS config at gateway level [PROD]",
          ]},
          { title: "Distributed Tracing & Central Config", dur: "81m", subs: [
            "Distributed tracing: trace ID spans across services [INT]",
            "Micrometer Tracing (replaces Spring Cloud Sleuth) [NEW]",
            "TraceId, SpanId added to logs via MDC [PROD]",
            "Zipkin: trace visualization, server setup [PROD]",
            "B3 propagation: X-B3-TraceId, X-B3-SpanId headers [PROD]",
            "Config Server: serve properties from Git [INT]",
            "Config client: spring.cloud.config.uri [INT]",
            "@RefreshScope: beans that reload on /actuator/refresh [PROD]",
            "Spring Cloud Bus: broadcast refresh via Kafka/RabbitMQ [PROD]",
            "Encrypting sensitive config values: {cipher} prefix [PROD]",
          ]},
        ]
      },
    ]
  },
  {
    id: "p5", label: "Spring AI + Cloud", color: "#0F6E56", icon: "🤖",
    sections: [
      {
        id: "s5_1", title: "Spring AI Core",
        vids: [
          { title: "ChatClient, Embeddings & RAG", dur: "180m", subs: [
            "Spring AI abstraction: swap AI providers without code change [INT]",
            "ChatClient: fluent API, ChatModel vs ChatClient [INT]",
            "ChatResponse: usage tokens, finish reason metadata [PROD]",
            "System, User, Assistant message roles [INT]",
            "ChatOptions: temperature, maxTokens, topP [PROD]",
            "PromptTemplate: variable substitution in prompts [PROD]",
            "Few-shot prompting: examples in system prompt [PROD]",
            "Spring AI Memory Advisor: conversation history management [PROD]",
            "Ollama: run models locally — no API key, offline-capable [PROD]",
            "Embeddings: semantic vector representation of text [INT]",
            "Cosine similarity: angle between vectors [INT]",
            "PGVector: PostgreSQL with pgvector — HNSW indexing [PROD]",
            "Redis Vector Store: RedisVectorStore config [PROD]",
            "TokenTextSplitter: chunk large documents [PROD]",
            "RAG pipeline: chunk → embed → store → retrieve → augment → generate [INT]",
            "QuestionAnswerAdvisor: Spring AI built-in RAG [PROD]",
            "Hybrid search: semantic + keyword (BM25) [PROD]",
          ]},
          { title: "Multimodal: Images, Audio & Structured Output", dur: "60m", subs: [
            "ImageModel: generate images from text prompts [PROD]",
            "Vision: describe image — pass URL or base64 to ChatModel",
            "AudioTranscriptionModel: speech-to-text (Whisper) [PROD]",
            "SpeechModel: text-to-speech, voice and speed options [PROD]",
            "BeanOutputConverter: structured Java object from model [PROD]",
            "ListOutputConverter, MapOutputConverter [PROD]",
          ]},
        ]
      },
      {
        id: "s5_2", title: "Docker & Kubernetes",
        vids: [
          { title: "Docker Complete", dur: "120m", subs: [
            "Containerization vs virtualization: kernel sharing [INT]",
            "Image vs container: class vs instance analogy [INT]",
            "Dockerfile: FROM, RUN, COPY, ENV, EXPOSE, CMD, ENTRYPOINT [INT]",
            "Layer caching: order instructions for cache hits [PROD]",
            "Multi-stage build: build + runtime stage — reduce image size [PROD]",
            "Spring Boot layered JAR: layers index for Docker caching [PROD]",
            "Volumes: named vs bind mounts — data persistence [INT]",
            "Networks: bridge, host, none — container-to-container [INT]",
            "docker-compose: services, depends_on, healthcheck [PROD]",
            "Non-root user in container: security best practice [PROD]",
            ".dockerignore: exclude target/, .git from context [PROD]",
          ]},
          { title: "Kubernetes for Spring Boot Devs", dur: "95m", subs: [
            "K8s architecture: control plane + nodes [INT]",
            "Pod, Deployment, Service (ClusterIP, NodePort, LoadBalancer) [INT]",
            "ConfigMap and Secret: externalize config [PROD]",
            "Ingress: HTTP routing, TLS termination [PROD]",
            "HPA: scale on CPU/memory/custom metrics [PROD]",
            "Resource requests and limits [PROD]",
            "Liveness vs readiness probe [PROD]",
            "Spring Boot /health as readiness + liveness probe [PROD]",
            "Rolling update: maxSurge, maxUnavailable — zero downtime [PROD]",
            "kubectl: apply, get, describe, logs, exec, port-forward [PROD]",
          ]},
        ]
      },
      {
        id: "s5_3", title: "AWS & CI/CD",
        vids: [
          { title: "AWS for Java Developers", dur: "80m", subs: [
            "IAM: users, roles, policies — least privilege [PROD]",
            "VPC: subnets, security groups, NACLs [PROD]",
            "RDS: managed PostgreSQL, Multi-AZ, read replicas [PROD]",
            "ElastiCache: managed Redis — session store, cache [PROD]",
            "S3: object storage, presigned URLs for direct upload [PROD]",
            "ECS: run Docker containers, task definitions, services [PROD]",
            "ECR: private Docker registry — push from CI pipeline [PROD]",
            "ALB: path-based and host-based routing [PROD]",
            "CloudWatch: logs, metrics, alarms, log insights [PROD]",
          ]},
          { title: "GitHub Actions CI/CD Pipeline", dur: "50m", subs: [
            "GitHub Actions YAML: trigger, jobs, steps [PROD]",
            "Build job: checkout, setup-java, mvn verify [PROD]",
            "Docker build and push to ECR: configure-aws-credentials action [PROD]",
            "Deploy to ECS: update service with new task definition [PROD]",
            "Secrets: AWS credentials, Docker Hub token in GitHub Secrets [PROD]",
            "Environment protection rules: approval for prod deploy [PROD]",
            "Cache Maven .m2: based on pom.xml hash [PROD]",
            "Status badges in README [PROD]",
          ]},
        ]
      },
    ]
  },
  {
    id: "p6", label: "Git & Maven", color: "#BA7517", icon: "📂",
    sections: [
      {
        id: "s6_1", title: "Git Version Control Complete",
        vids: [
          { title: "Git Fundamentals, Commits & History", dur: "60m", subs: [
            "VCS types: local, centralized (SVN), distributed (Git) [INT]",
            "Git areas: working directory → staging → local repo → remote [INT]",
            "git init: creates .git directory (HEAD, config, objects, refs) [INT]",
            "git add, git commit -m, git commit --amend [INT]",
            "git log: --oneline, --graph, --author, --since [PROD]",
            "git diff: working vs staged; --staged: staged vs last commit [INT]",
            "Conventional Commits: feat:, fix:, chore:, docs: [PROD]",
            ".gitignore: patterns for IDE files, target/, .env [PROD]",
          ]},
          { title: "Branching, Merging & Rebasing", dur: "55m", subs: [
            "Branch: lightweight pointer to commit — instant creation [INT]",
            "git switch -c: create and switch (modern syntax) [INT]",
            "Branching strategies: GitFlow, GitHub Flow, trunk-based [PROD]",
            "Fast-forward merge: no divergence, move pointer forward [INT]",
            "3-way merge: creates merge commit when branches diverged [INT]",
            "git rebase: replay commits for linear history [INT]",
            "Merge vs Rebase: preserve vs rewrite history [INT]",
            "Interactive rebase: git rebase -i HEAD~3 — squash, reorder [PROD]",
            "Merge conflict: <<<< ==== >>>> markers, how to resolve [INT]",
          ]},
          { title: "Remote Repos, Tags, Stash & Time Travel", dur: "63m", subs: [
            "git push -u origin main: push and set upstream tracking [INT]",
            "git pull = git fetch + git merge [INT]",
            "git fetch: download without merging — safer [PROD]",
            "git tag: lightweight vs annotated — for releases (v1.0.0) [PROD]",
            "Semantic versioning: MAJOR.MINOR.PATCH [PROD]",
            "Pull Request: propose changes, code review, CI checks [INT]",
            "Protected branches: require PR, CI pass, approvals [PROD]",
            "git stash / stash pop vs apply [INT]",
            "git reset --soft/--mixed/--hard HEAD~1 [INT]",
            "git revert: create undo commit — safe for shared branches [INT]",
            "git cherry-pick: apply specific commit [PROD]",
            "git reflog: recover lost commits — the safety net [PROD]",
            "git bisect: binary search for bug-introducing commit [PROD]",
          ]},
        ]
      },
      {
        id: "s6_2", title: "Maven Complete",
        vids: [
          { title: "Maven Lifecycle, POM & Dependency Management", dur: "54m", subs: [
            "Maven coordinates: groupId, artifactId, version (GAV) [INT]",
            "Lifecycle phases: validate → compile → test → package → verify → install → deploy [INT]",
            "mvn clean package: removes target/, compiles, tests, JARs [PROD]",
            "mvn install: copies to local .m2 repository [INT]",
            "Skip tests: -DskipTests vs -Dmaven.test.skip=true [PROD]",
            "Dependency scopes: compile, provided, runtime, test [INT]",
            "Transitive dependencies: mvn dependency:tree [INT]",
            "Dependency conflicts: nearest-definition wins, <exclusions> [PROD]",
            "BOM: import scope pom — manages versions centrally [PROD]",
            "Effective POM: mvn help:effective-pom [INT]",
            "Plugins: maven-compiler-plugin, maven-surefire-plugin [PROD]",
            "Maven wrapper: ./mvnw — add to source control [PROD]",
            "Multi-module project: parent POM + <modules> list [PROD]",
          ]},
        ]
      },
    ]
  },
  {
    id: "p7", label: "DSA in Java", color: "#993C1D", icon: "📊",
    sections: [
      {
        id: "s7_1", title: "Complexity & Array Patterns",
        vids: [
          { title: "Big O, Arrays & Binary Search", dur: "75m", subs: [
            "Time complexity: O(1), O(log n), O(n), O(n log n), O(n²) [INT]",
            "Amortized analysis: ArrayList add() is O(1) amortized [INT]",
            "Best / average / worst case — sort examples [INT]",
            "Two-pointer pattern: sorted array sum, remove duplicates [INT]",
            "Sliding window: fixed size, variable size [INT]",
            "Prefix sum: range sum queries in O(1) [INT]",
            "Kadane's algorithm: maximum subarray O(n) [INT]",
            "Dutch National Flag: sort 0s, 1s, 2s in one pass [INT]",
            "Binary search: on sorted array and on answer space [INT]",
            "Rotated sorted array: find pivot, then binary search [INT]",
          ]},
        ]
      },
      {
        id: "s7_2", title: "Sorting Algorithms",
        vids: [
          { title: "All Sorting Algorithms with Analysis", dur: "80m", subs: [
            "Bubble sort: O(n²), stable, early exit for sorted input [INT]",
            "Selection sort: O(n²), n swaps only, not stable [INT]",
            "Insertion sort: O(n²) worst, O(n) best (nearly sorted) [INT]",
            "Merge sort: O(n log n), O(n) space, stable — preferred for linked list [INT]",
            "Quick sort: O(n log n) avg, O(n²) worst, O(log n) space [INT]",
            "Quick sort pivot: first, last, random, median-of-3 strategies [INT]",
            "Counting sort: O(n+k), integers in range only [INT]",
            "Arrays.sort(): Dual-Pivot Quicksort for primitives, TimSort for objects [INT]",
            "When to use which sort — interview decision framework [INT]",
          ]},
        ]
      },
      {
        id: "s7_3", title: "Linked List, Stack, Queue",
        vids: [
          { title: "Linked List Patterns", dur: "45m", subs: [
            "Singly vs doubly linked list — Java implementation from scratch [INT]",
            "Floyd's cycle detection: fast/slow pointer [INT]",
            "Reverse linked list: iterative and recursive [INT]",
            "Merge two sorted linked lists [INT]",
            "Find middle node: fast/slow pointer [INT]",
            "Nth node from end: two-pointer gap technique [INT]",
            "Deep copy with random pointer: HashMap approach [INT]",
          ]},
          { title: "Stack & Queue Patterns", dur: "45m", subs: [
            "Stack: LIFO — Java ArrayDeque implementation [INT]",
            "Valid parentheses, min stack patterns [INT]",
            "Monotonic stack: next greater element, stock span [INT]",
            "Sliding window maximum: monotonic deque [INT]",
            "LRU cache: LinkedHashMap or HashMap + DoublyLinkedList [INT]",
            "Circular queue: array-based with front/rear/size [INT]",
          ]},
        ]
      },
      {
        id: "s7_4", title: "Trees & Graphs",
        vids: [
          { title: "Binary Trees, BST & Heaps", dur: "90m", subs: [
            "Binary tree: node, left, right — Java implementation [INT]",
            "Traversals: inorder (LNR), preorder (NLR), postorder (LRN) [INT]",
            "BFS: level order traversal using Queue [INT]",
            "Height, diameter, balance check [INT]",
            "Lowest common ancestor (LCA) [INT]",
            "BST: insert, search, delete — O(log n) average [INT]",
            "BST validation: min/max bound approach [INT]",
            "Convert sorted array to BST: mid as root, recurse [INT]",
            "Heap: complete binary tree, min/max heap [INT]",
            "PriorityQueue: O(log n) insert/remove, top-K pattern [INT]",
          ]},
          { title: "Graphs & Union-Find", dur: "90m", subs: [
            "Graph representations: adjacency matrix vs list [INT]",
            "BFS: shortest path in unweighted, level-order [INT]",
            "DFS: connected components, cycle detection [INT]",
            "Topological sort: Kahn's (BFS) and DFS approach [INT]",
            "Dijkstra: shortest path in weighted — PriorityQueue [INT]",
            "Union-Find: path compression + rank — O(α(n)) per op [INT]",
            "Number of islands, word ladder, course schedule — classic [INT]",
          ]},
        ]
      },
      {
        id: "s7_5", title: "Dynamic Programming",
        vids: [
          { title: "DP Patterns Complete", dur: "50m", subs: [
            "DP prerequisites: optimal substructure, overlapping subproblems [INT]",
            "Memoization (top-down) vs tabulation (bottom-up) [INT]",
            "1D DP: fibonacci, climbing stairs, house robber, coin change [INT]",
            "2D DP: grid paths, minimum path sum, edit distance [INT]",
            "0/1 Knapsack: include/exclude decision [INT]",
            "Unbounded knapsack: coin change II, rod cutting [INT]",
            "LCS and LIS patterns [INT]",
            "Space optimization: rolling array technique [PROD]",
          ]},
        ]
      },
    ]
  },
];

function Tag2({ type }) {
  const t = TAGS[type];
  if (!t) return null;
  return (
    <span style={{
      fontSize: 9, padding: "1px 5px", borderRadius: 3,
      background: t.bg, color: t.color, fontWeight: 600,
      marginLeft: 4, verticalAlign: "middle", display: "inline-block", lineHeight: "14px"
    }}>{t.label}</span>
  );
}

function SubItem({ text, phaseId, secId, vidIdx, subIdx, checked, onToggle }) {
  const id = `${phaseId}_${secId}_v${vidIdx}_s${subIdx}`;
  const parts = text.split(/(\[PROD\]|\[INT\]|\[NEW\]|\[PROJ\])/g);
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 3 }}>
      <input type="checkbox" id={id} checked={checked} onChange={onToggle}
        style={{ width: 13, height: 13, minWidth: 13, marginTop: 2, cursor: "pointer", accentColor: "#378ADD" }} />
      <label htmlFor={id} style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.45, cursor: "pointer" }}>
        {parts.map((p, i) => {
          if (["[PROD]","[INT]","[NEW]","[PROJ]"].includes(p)) return <Tag2 key={i} type={p.slice(1,-1)} />;
          return <span key={i}>{p}</span>;
        })}
      </label>
    </div>
  );
}

export default function App() {
  const [activePhase, setActivePhase] = useState("p1");
  const [openSections, setOpenSections] = useState({});
  const [checked, setChecked] = useState({});
  const [search, setSearch] = useState("");

  const totalSubs = useMemo(() => ALL_PHASES.reduce((a, ph) =>
    a + ph.sections.reduce((b, s) => b + s.vids.reduce((c, v) => c + v.subs.length, 0), 0), 0), []);
  const totalVids = useMemo(() => ALL_PHASES.reduce((a, ph) =>
    a + ph.sections.reduce((b, s) => b + s.vids.length, 0), 0), []);
  const doneCount = Object.values(checked).filter(Boolean).length;
  const pct = totalSubs ? Math.round(doneCount / totalSubs * 100) : 0;

  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const toggleVid = (phaseId, secId, vidIdx, subs) => {
    const allKeys = subs.map((_, si) => `${phaseId}_${secId}_v${vidIdx}_s${si}`);
    const allChecked = allKeys.every(k => checked[k]);
    setChecked(prev => {
      const next = { ...prev };
      allKeys.forEach(k => next[k] = !allChecked);
      return next;
    });
  };

  const toggleSec = (id) => setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));

  const phaseProgress = (ph) => {
    let total = 0, done = 0;
    ph.sections.forEach(s => s.vids.forEach((v, vi) => v.subs.forEach((_, si) => {
      total++;
      if (checked[`${ph.id}_${s.id}_v${vi}_s${si}`]) done++;
    })));
    return total ? Math.round(done / total * 100) : 0;
  };

  const secProgress = (ph, sec) => {
    let total = 0, done = 0;
    sec.vids.forEach((v, vi) => v.subs.forEach((_, si) => {
      total++;
      if (checked[`${ph.id}_${sec.id}_v${vi}_s${si}`]) done++;
    }));
    return total ? Math.round(done / total * 100) : 0;
  };

  const q = search.toLowerCase().trim();
  const filteredPhase = q ? null : activePhase;

  const matchesSearch = (text) => !q || text.toLowerCase().includes(q);

  const visiblePhases = q ? ALL_PHASES : ALL_PHASES.filter(ph => ph.id === activePhase);

  return (
    <div style={{ padding: "1rem 0", fontFamily: "var(--font-sans)", maxWidth: 900 }}>
      {/* Stats */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1rem" }}>
        {[
          { val: totalSubs, lbl: "Total subtopics" },
          { val: doneCount, lbl: "Completed" },
          { val: pct + "%", lbl: "Progress" },
          { val: totalVids, lbl: "Videos" },
        ].map(s => (
          <div key={s.lbl} style={{ background: "var(--surface-1)", borderRadius: "var(--radius)", padding: ".625rem .875rem", flex: 1, minWidth: 90 }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "var(--text-primary)" }}>{s.val}</div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 1 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ background: "var(--bg-success)", border: "0.5px solid var(--border-success)", borderRadius: "var(--radius)", padding: ".5rem .875rem", fontSize: 12, marginBottom: "1rem", lineHeight: 1.6 }}>
        <strong style={{ color: "var(--text-success)" }}>Legend:</strong>
        {" "}{Object.entries(TAGS).map(([k, t]) => (
          <span key={k} style={{ display: "inline-block", marginRight: 10 }}>
            <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 3, background: t.bg, color: t.color, fontWeight: 600 }}>{t.label}</span>
            {" "}<span style={{ color: "var(--text-secondary)", fontSize: 11 }}>
              {k === "PROD" ? "production pattern" : k === "INT" ? "interview must-know" : k === "NEW" ? "Java 17–21 feature" : "used in project"}
            </span>
          </span>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "1rem" }}>
        <i className="ti ti-search" aria-hidden="true" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "var(--text-muted)" }} />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search any topic — JWT, N+1, Circuit Breaker, HashMap..." 
          style={{ width: "100%", padding: "8px 12px 8px 32px", border: "0.5px solid var(--border-strong)", borderRadius: "var(--radius)", fontSize: 13, background: "var(--surface-2)", color: "var(--text-primary)", outline: "none" }} />
        {q && <button onClick={() => setSearch("")} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", border: "none", background: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 16 }}>✕</button>}
      </div>

      {/* Phase Tabs */}
      {!q && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: "1rem" }}>
          {ALL_PHASES.map(ph => {
            const p = phaseProgress(ph);
            return (
              <button key={ph.id} onClick={() => setActivePhase(ph.id)}
                style={{
                  padding: "5px 12px", border: `0.5px solid ${activePhase === ph.id ? ph.color : "var(--border-strong)"}`,
                  borderRadius: "var(--radius)", fontSize: 12, cursor: "pointer",
                  background: activePhase === ph.id ? ph.color + "18" : "var(--surface-2)",
                  color: activePhase === ph.id ? ph.color : "var(--text-secondary)",
                  fontWeight: activePhase === ph.id ? 500 : 400,
                  display: "flex", alignItems: "center", gap: 5
                }}>
                <span>{ph.icon} {ph.label}</span>
                <span style={{ fontSize: 10, opacity: 0.8 }}>{p}%</span>
              </button>
            );
          })}
        </div>
      )}
      {q && <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: "0.75rem" }}>Showing results across all phases for "{q}"</div>}

      {/* Content */}
      {visiblePhases.map(ph => (
        <div key={ph.id}>
          {q && <div style={{ fontSize: 12, fontWeight: 500, color: ph.color, marginBottom: ".5rem", marginTop: ".75rem", textTransform: "uppercase", letterSpacing: ".05em" }}>{ph.icon} {ph.label}</div>}
          {ph.sections.map(sec => {
            const secVids = sec.vids.map((v, vi) => ({
              ...v,
              matchingSubs: v.subs.map((s, si) => ({ s, si, match: !q || matchesSearch(v.title + " " + s) })),
            })).filter(v => !q || v.matchingSubs.some(ms => ms.match) || matchesSearch(v.title));
            if (secVids.length === 0) return null;
            const secKey = `${ph.id}_${sec.id}`;
            const isOpen = openSections[secKey] !== false && (q ? true : openSections[secKey]);
            const sp = secProgress(ph, sec);

            return (
              <div key={sec.id} style={{ background: "var(--surface-2)", border: "0.5px solid var(--border)", borderRadius: 12, marginBottom: ".625rem", overflow: "hidden" }}>
                <div onClick={() => toggleSec(secKey)}
                  style={{ padding: ".75rem 1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, userSelect: "none" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface-1)"}
                  onMouseLeave={e => e.currentTarget.style.background = ""}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", flex: 1 }}>{sec.title}</span>
                  <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 20, background: ph.color + "18", color: ph.color, fontWeight: 500, whiteSpace: "nowrap" }}>
                    {sec.vids.length} videos
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
                    <div style={{ width: 56, height: 4, background: "var(--surface-1)", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ height: 4, width: sp + "%", background: ph.color, borderRadius: 10, transition: "width .3s" }} />
                    </div>
                    <span style={{ fontSize: 11, color: "var(--text-muted)", minWidth: 26 }}>{sp}%</span>
                  </div>
                  <i className={`ti ti-chevron-${isOpen ? "up" : "down"}`} aria-hidden="true" style={{ fontSize: 13, color: "var(--text-muted)" }} />
                </div>

                {isOpen && (
                  <div style={{ borderTop: "0.5px solid var(--border)", padding: ".75rem 1rem" }}>
                    {secVids.map((vid, vi) => {
                      const origVi = sec.vids.indexOf(sec.vids.find(v => v.title === vid.title));
                      const vidKey = `${ph.id}_${sec.id}_v${origVi}`;
                      const allSubsDone = vid.subs.every((_, si) => checked[`${ph.id}_${sec.id}_v${origVi}_s${si}`]);
                      const someDone = vid.subs.some((_, si) => checked[`${ph.id}_${sec.id}_v${origVi}_s${si}`]);

                      return (
                        <div key={vi} style={{ marginBottom: ".875rem", paddingBottom: ".875rem", borderBottom: vi < secVids.length - 1 ? "0.5px solid var(--border)" : "none" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: ".375rem" }}>
                            <input type="checkbox" checked={allSubsDone} ref={el => { if (el) el.indeterminate = someDone && !allSubsDone; }}
                              onChange={() => toggleVid(ph.id, sec.id, origVi, vid.subs)}
                              style={{ width: 15, height: 15, minWidth: 15, marginTop: 2, cursor: "pointer", accentColor: ph.color }} />
                            <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)", flex: 1, lineHeight: 1.4, cursor: "pointer" }}
                              onClick={() => toggleVid(ph.id, sec.id, origVi, vid.subs)}>
                              📹 {vid.title}
                            </label>
                            <span style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap", paddingTop: 1 }}>{vid.dur}</span>
                          </div>
                          <div style={{ paddingLeft: 23 }}>
                            {vid.matchingSubs.map(({ s, si, match }) => match && (
                              <SubItem key={si} text={s} phaseId={ph.id} secId={sec.id} vidIdx={origVi} subIdx={si}
                                checked={!!checked[`${ph.id}_${sec.id}_v${origVi}_s${si}`]}
                                onToggle={() => toggle(`${ph.id}_${sec.id}_v${origVi}_s${si}`)} />
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
