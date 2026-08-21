export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  deliverable: string;
  lessonSlugs: string[];
}

export interface GuidedProject {
  id: string;
  title: string;
  summary: string;
  outcome: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  estimatedHours: number;
  track: 'Java' | 'Spring Boot' | 'Systems';
  skills: string[];
  milestones: ProjectMilestone[];
}

export const GUIDED_PROJECTS: GuidedProject[] = [
  {
    id: 'expense-ledger',
    title: 'Command-line expense ledger',
    summary: 'Design a dependable Java application that imports transactions, validates input, and produces monthly reports.',
    outcome: 'A tested CLI program with clean domain models, file persistence, and useful error messages.',
    level: 'Foundation',
    estimatedHours: 8,
    track: 'Java',
    skills: ['OOP', 'Collections', 'File I/O', 'Testing'],
    milestones: [
      { id: 'model', title: 'Model the domain', description: 'Define transactions, categories, money values, and the rules that keep them valid.', deliverable: 'Domain classes plus a short design note explaining your choices.', lessonSlugs: ['oop-fundamentals', 'constructors', 'pojo-enum-final'] },
      { id: 'storage', title: 'Build the storage layer', description: 'Load and save records in a simple text format without coupling persistence to business rules.', deliverable: 'Repository interface, file implementation, and sample data.', lessonSlugs: ['exception-handling', 'collection-framework'] },
      { id: 'reports', title: 'Create useful reports', description: 'Group transactions by month and category, then calculate totals with streams.', deliverable: 'Monthly summary and category breakdown commands.', lessonSlugs: ['streams', 'map-hashmap-internals'] },
      { id: 'quality', title: 'Harden the program', description: 'Handle malformed files and invalid arguments, then document important edge cases.', deliverable: 'Validation suite, error catalogue, and a polished README.', lessonSlugs: ['exception-handling', 'singleton-immutable-wrapper'] },
    ],
  },
  {
    id: 'concurrent-indexer',
    title: 'Concurrent document indexer',
    summary: 'Build a multithreaded search index and learn where concurrency improves throughput—and where it introduces risk.',
    outcome: 'A benchmarked document indexer with bounded concurrency, cancellation, and thread-safe metrics.',
    level: 'Intermediate',
    estimatedHours: 12,
    track: 'Java',
    skills: ['Concurrency', 'Executors', 'Thread safety', 'Benchmarking'],
    milestones: [
      { id: 'baseline', title: 'Establish a sequential baseline', description: 'Walk a directory, tokenize documents, and build an inverted index on one thread.', deliverable: 'Working sequential indexer with timing output.', lessonSlugs: ['collection-framework', 'map-hashmap-internals'] },
      { id: 'workers', title: 'Introduce bounded workers', description: 'Divide document parsing across an executor without creating unbounded tasks.', deliverable: 'Executor-based pipeline with configurable worker count.', lessonSlugs: ['executors-fork-join', 'executor-service-advanced'] },
      { id: 'safety', title: 'Protect shared state', description: 'Choose appropriate concurrent structures and make the aggregation stage deterministic.', deliverable: 'Thread-safe index and an explanation of the chosen synchronization strategy.', lessonSlugs: ['atomic-volatile-concurrent', 'multithreading-locks'] },
      { id: 'measure', title: 'Measure and explain', description: 'Compare throughput at different worker counts and identify the bottleneck.', deliverable: 'Benchmark table and a one-page performance analysis.', lessonSlugs: ['future-callable-completablefuture', 'thread-pool'] },
    ],
  },
  {
    id: 'production-api',
    title: 'Production-ready task API',
    summary: 'Create a Spring Boot API with a clean service boundary, persistence, validation, authentication, and operational safeguards.',
    outcome: 'A documented REST API with database migrations, secure endpoints, tests, and production configuration.',
    level: 'Intermediate',
    estimatedHours: 18,
    track: 'Spring Boot',
    skills: ['REST', 'JPA', 'Security', 'Resilience'],
    milestones: [
      { id: 'contract', title: 'Design the API contract', description: 'Define resources, status codes, validation rules, and error responses before implementation.', deliverable: 'OpenAPI-style endpoint specification and data model.', lessonSlugs: ['sb-http-status-codes', 'sb-setup-layered-architecture'] },
      { id: 'persistence', title: 'Implement persistence', description: 'Map entities deliberately and keep database concerns behind a repository boundary.', deliverable: 'JPA entities, repositories, migrations, and integration tests.', lessonSlugs: ['sb-jpa-entity-mapping', 'sb-jpa-associations', 'sb-transactional'] },
      { id: 'security', title: 'Secure the service', description: 'Add authentication and authorization with explicit access rules.', deliverable: 'JWT authentication, role checks, and negative authorization tests.', lessonSlugs: ['sb-security-architecture', 'sb-jwt-springboot', 'sb-annotation-authorization'] },
      { id: 'operations', title: 'Prepare for production', description: 'Add consistent errors, rate protection, profiles, and observable health behavior.', deliverable: 'Production profile, exception policy, and resilience checklist.', lessonSlugs: ['sb-exception-handling', 'sb-rate-limiter', 'sb-profiles'] },
    ],
  },
  {
    id: 'url-shortener',
    title: 'Scalable URL shortener',
    summary: 'Work from requirements to architecture, then implement the critical path of a service designed for high read traffic.',
    outcome: 'A system design document plus a functional service prototype with caching and collision handling.',
    level: 'Advanced',
    estimatedHours: 20,
    track: 'Systems',
    skills: ['System design', 'Caching', 'Databases', 'Reliability'],
    milestones: [
      { id: 'requirements', title: 'Quantify the requirements', description: 'Estimate traffic, storage, latency targets, and acceptable consistency trade-offs.', deliverable: 'Capacity estimates and explicit design constraints.', lessonSlugs: ['cache-memory-organization'] },
      { id: 'architecture', title: 'Design the critical path', description: 'Choose identifier generation, database shape, cache behavior, and API boundaries.', deliverable: 'Architecture diagram and decision record.', lessonSlugs: ['sb-api-gateway', 'sb-load-balancer'] },
      { id: 'prototype', title: 'Build the service prototype', description: 'Implement creation and redirect flows with collision detection and expiration.', deliverable: 'Runnable service with tests for the core workflows.', lessonSlugs: ['sb-jpa-custom-queries', 'sb-rest-client'] },
      { id: 'failure', title: 'Design for failure', description: 'Model cache misses, database degradation, hot keys, and abusive clients.', deliverable: 'Failure-mode table and resilience improvements.', lessonSlugs: ['sb-circuit-breaker', 'sb-bulkhead', 'sb-rate-limiter'] },
    ],
  },
];
