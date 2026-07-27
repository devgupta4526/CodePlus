import { useState, useEffect } from "react";

const PHASES = [
  {
    id: "p1", icon: "🐍", title: "Phase 1 — Python Foundation", days: "Days 1–6", tag: "Backend", color: "#2a78d6",
    daysList: [
      {
        d: "1", title: "Python Basics", topics: [
          { n: "Variables & data types", subs: ["int/float/str/bool/None", "type conversion: int()/str()/float()", "id() and is vs ==", "constants convention"] },
          { n: "Control flow", subs: ["if/elif/else + nested conditions", "for: range()/enumerate()/zip()", "while + break/continue/else", "ternary expressions", "match/case (Python 3.10+)"] },
          { n: "Functions & scope", subs: ["def/return/default args/*args/**kwargs", "LEGB scope rule", "lambda functions", "closures"] },
          { n: "Comprehensions", subs: ["list comp vs for loop", "dict comp + filtering", "set comp for deduplication", "nested comprehensions"] },
          { n: "String formatting", subs: ["f-strings + format specifiers", "format() method", "Template strings", "strip/split/join/replace/find"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Python Basics: Zero to Confident" covering: Variables & data types (int/float/str/bool/NoneType, type conversion, id(), is vs ==), Control flow (if/elif/else, for with range/enumerate/zip, while/break/continue, ternary, match/case 3.10+), Functions & scope (def, return, *args/**kwargs, LEGB rule, lambda, closures), Comprehensions (list/dict/set/nested), String formatting (f-strings, format(), Template strings, all string methods). Python code for every concept, "common mistakes" callout box per section. Professional DOCX with TOC, headings, code blocks in Courier New.`,
        project: { type: "mini", name: "CLI Grade Calculator", desc: "Takes name + subject scores via input(), calculates average, assigns A/B/C/D/F, prints formatted report card.", stack: ["Python", "argparse", "f-strings"], prompt: `Create a DOCX mini project guide: "CLI Student Grade Calculator in Python". Full spec: takes student name and subject scores via input(), calculates weighted average, assigns grade A-F, prints formatted ASCII report card table. Complete code + step-by-step build guide.` }
      },
      {
        d: "2", title: "OOP in Python", topics: [
          { n: "Classes & objects", subs: ["__init__ and self", "instance vs class vs static attributes", "@classmethod and @staticmethod", "__repr__ vs __str__"] },
          { n: "Inheritance & polymorphism", subs: ["single and multiple inheritance", "MRO (Method Resolution Order)", "super() usage", "method overriding", "duck typing"] },
          { n: "Dunder methods", subs: ["__len__/__getitem__/__setitem__", "__eq__/__lt__/__gt__ for comparison", "__enter__/__exit__ for context managers", "__call__ and __slots__"] },
          { n: "Dataclasses", subs: ["@dataclass decorator", "field() with validators", "frozen=True for immutability", "nested dataclasses"] },
          { n: "Abstract Base Classes", subs: ["abc module and ABC", "@abstractmethod", "Protocol (structural subtyping, 3.8+)"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "OOP in Python: Complete Guide" covering: Classes (__init__, self, instance/class/static attrs, @classmethod/@staticmethod, __repr__ vs __str__), Inheritance (single/multiple, MRO, super(), overriding, duck typing), Dunder methods (__len__/__getitem__/__eq__/__enter__/__exit__/__call__/__slots__), Dataclasses (@dataclass, field(), frozen=True, nested), ABCs (abc module, @abstractmethod, Protocol). Include UML diagram in text, full code for every concept.`,
        project: { type: "mini", name: "Library Management System", desc: "Book/Member/Library OOP classes. Add/remove/search books, issue/return, overdue fine calculation.", stack: ["Python", "OOP", "dataclasses"], prompt: `Create a DOCX mini project guide: "OOP Library Management System in Python". Book/Member/Library dataclasses, add/remove/search books, issue/return operations, overdue fine calculation, CLI menu. Complete code + class diagram in text.` }
      },
      {
        d: "3", title: "Advanced Python", topics: [
          { n: "Generators & iterators", subs: ["__iter__ and __next__ protocol", "yield keyword and generator functions", "generator expressions", "yield from for delegation", "lazy CSV reader example"] },
          { n: "Decorators", subs: ["@functools.wraps", "decorator factory pattern", "class-based decorators", "@timer/@retry/@cache real examples"] },
          { n: "Context managers", subs: ["class-based __enter__/__exit__", "@contextmanager from contextlib", "file locking / timer examples"] },
          { n: "Type hints & mypy", subs: ["Optional/Union/Literal/TypeVar", "Generic classes", "running mypy and fixing errors"] },
          { n: "asyncio basics", subs: ["event loop and coroutines", "async/await syntax", "asyncio.gather() concurrency", "aiohttp async HTTP example"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Advanced Python: Generators, Decorators & Async" covering: Generators (__iter__/__next__, yield, generator expressions, yield from, lazy file reader), Decorators (@functools.wraps, factory pattern, class-based, stacking, @timer/@retry/@cache), Context managers (class-based, @contextmanager, timer/lock examples), Type hints (Optional/Union/Literal/TypeVar, Generics, mypy), asyncio (event loop, async/await, gather(), aiohttp). Include performance comparison tables.`,
        project: { type: "mini", name: "Async CLI Web Scraper", desc: "Fetch titles from 10 URLs concurrently with aiohttp+asyncio, @retry decorator with exponential backoff, generator streams results to CSV.", stack: ["Python", "asyncio", "aiohttp", "decorators"], prompt: `Create a DOCX mini project guide: "Async CLI Web Scraper". Fetches page titles from 10 URLs concurrently with aiohttp+asyncio.gather(), @retry decorator with exponential backoff, generator streams results, output to CSV. Complete code.` }
      },
      {
        d: "4", title: "Python Ecosystem", topics: [
          { n: "pip & virtual environments", subs: ["venv create/activate/deactivate (Win+Linux)", "pip install/freeze/requirements.txt", "pip-tools for deterministic deps"] },
          { n: "Poetry & Pipenv", subs: ["pyproject.toml and poetry commands", "dependency groups (dev/test)", "when to use Poetry vs venv+pip"] },
          { n: "Testing with pytest", subs: ["fixtures (function/class/module/session scope)", "parametrize for data-driven tests", "mocking with unittest.mock + pytest-mock", "coverage with pytest-cov"] },
          { n: "Logging", subs: ["logging levels/handlers/formatters", "structured JSON logging", "rotating file handler", "loguru as modern alternative"] },
          { n: "argparse & CLI tools", subs: ["ArgumentParser: positional/optional/flags", "subcommands with subparsers", "click as alternative"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Python Ecosystem: Tools, Testing & CLI" covering: pip & venv (Win+Linux, requirements.txt, pip-tools), Poetry (pyproject.toml, dependency groups), pytest (all fixture scopes, parametrize, mocking, pytest-cov, 10 example test cases), Logging (levels/handlers, JSON logging, loguru), argparse + click (ArgumentParser, subcommands, complete CLI app).`,
        project: { type: "mini", name: "CLI File Organizer", desc: "Scans directory, organizes files into subfolders by extension, --dry-run flag, rotating log file, 90%+ pytest coverage.", stack: ["Python", "argparse", "pytest", "logging"], prompt: `Create a DOCX mini project guide: "CLI File Organizer in Python". argparse CLI: --src-dir and --dry-run flags, scans files, organizes into Images/Docs/Videos/Archives/Other, rotating log file, undo support. Complete code + 90%+ pytest test suite.` }
      },
      {
        d: "5–6", title: "CAPSTONE: Personal Finance Tracker CLI", type: "capstone", topics: [
          { n: "Architecture & models", subs: ["Transaction/Category/Budget as dataclasses", "SQLiteRepository with context manager", "5 argparse CLI commands", "rich terminal tables + progress bars"] },
          { n: "Advanced patterns", subs: ["@validate_amount + @log_operation decorators", "generator for large history processing", "custom exceptions + validation", "rotating log file"] },
          { n: "Testing", subs: ["20 pytest test cases with fixtures", "mocking datetime", "integration tests", "coverage report"] },
        ],
        prompt: `Create a comprehensive DOCX project guide titled "Python Capstone: Personal Finance Tracker CLI". Full OOP CLI: Transaction/Category/Budget dataclasses, SQLiteRepository with context manager, argparse commands (add income/expense, list with filters, set-budget, monthly report, CSV export), @validate_amount + @log_operation decorators, generator for large history, rich terminal output, complete code for every file, 20 pytest test cases with fixtures. ~50-page DOCX.`,
        project: { type: "capstone", name: "Personal Finance Tracker CLI", desc: "SQLite + argparse + rich + decorators + generators + 20 pytest tests. Full CLI finance manager.", stack: ["Python", "SQLite", "argparse", "pytest", "rich", "dataclasses"], prompt: `Create a DOCX capstone guide: "Personal Finance Tracker CLI". All code: models.py, db.py, cli.py, reports.py, tests/. Complete implementation, test suite, and extension ideas (matplotlib graphs, CSV import).` }
      },
    ]
  },
  {
    id: "p2", icon: "🎸", title: "Phase 2 — Django & DRF", days: "Days 7–13", tag: "Backend", color: "#1baf7a",
    daysList: [
      {
        d: "7", title: "Django Fundamentals", topics: [
          { n: "MTV architecture", subs: ["Model-Template-View vs MVC", "project vs app distinction", "settings.py: INSTALLED_APPS/DATABASES/MIDDLEWARE", "manage.py commands"] },
          { n: "URL routing & views", subs: ["path()/re_path()/include()", "URL namespacing with app_name", "FBV request object anatomy", "CBV: TemplateView/ListView/DetailView/CreateView", "LoginRequiredMixin/PermissionRequiredMixin"] },
          { n: "Templates & context", subs: ["variables/tags/filters", "{% extends %}/{% block %}/{% include %}", "custom template tags", "context processors"] },
          { n: "Forms & validation", subs: ["Form vs ModelForm", "clean_fieldname() and clean()", "CSRF protection"] },
          { n: "Admin panel", subs: ["list_display/list_filter/search_fields", "custom admin actions", "TabularInline/StackedInline"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Django Fundamentals: MTV to Admin Panel" covering: MTV architecture (vs MVC, settings.py deep dive, manage.py), URL routing (path/re_path/include, namespacing, FBV, CBV: all generic views, Mixins), Templates (language, inheritance, custom tags, context processors), Forms (Form vs ModelForm, validation, CSRF), Admin (ModelAdmin, custom actions, Inline models). Build a blog app throughout.`,
        project: { type: "mini", name: "Django Blog App", desc: "Post/Category/Tag models, FBV+CBV views, search, tag filtering, admin with inline tags, URL namespacing.", stack: ["Django", "PostgreSQL", "Admin"], prompt: `Create a DOCX mini project guide: "Django Blog App". Post/Category/Tag models with migrations, list/detail/create views, search, tag filtering, admin with TagInline, URL namespacing. Complete code.` }
      },
      {
        d: "8", title: "Django ORM", topics: [
          { n: "Models & migrations", subs: ["all field types and Meta class", "migration internals: makemigrations/migrate/showmigrations", "RunPython data migrations"] },
          { n: "QuerySets & lookups", subs: ["filter/exclude/get + field lookups (__icontains/__gte/__in)", "Q objects for OR/AND/NOT", "values()/values_list()/only()/defer()"] },
          { n: "Annotations & aggregations", subs: ["aggregate() vs annotate()", "Count/Sum/Avg + Case/When", "F expressions and Subquery/OuterRef"] },
          { n: "select_related & prefetch_related", subs: ["N+1 problem detection with debug-toolbar", "select_related for FK (SQL JOIN)", "prefetch_related for M2M/reverse FK", "assertNumQueries in tests"] },
          { n: "Custom managers", subs: ["Manager vs QuerySet methods", "chaining custom managers", "soft delete manager pattern"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Django ORM Mastery" covering: Models & migrations (all field types, Meta class, RunPython), QuerySets (all lookups, Q objects, values/only/defer), Annotations & aggregations (Count/Sum/Avg, Case/When, F expressions, Subquery), N+1 problem (debug-toolbar, select_related vs prefetch_related, assertNumQueries), Custom managers (soft delete). Include SQL EXPLAIN descriptions.`,
        project: { type: "mini", name: "E-commerce ORM Challenge", desc: "Product/Category/Review. 15 ORM queries: top-rated per category, avg price, low stock, annotate with review_count+avg_rating, all optimized.", stack: ["Django", "PostgreSQL", "ORM"], prompt: `Create a DOCX mini project guide: "Django ORM E-commerce Challenge". 15 ORM queries on Product/Category/Review: top-rated per category, avg price by brand, low stock, annotate with review_count + avg_rating, optimized with select_related/prefetch_related, verified with assertNumQueries.` }
      },
      {
        d: "9", title: "Django REST Framework", topics: [
          { n: "Serializers", subs: ["Serializer vs ModelSerializer", "field-level and object-level validation", "nested serializers (read vs write)", "SerializerMethodField"] },
          { n: "APIView vs ViewSets", subs: ["APIView manual method handling", "GenericAPIView + mixins", "ModelViewSet full CRUD", "@action decorator for custom endpoints"] },
          { n: "Authentication & permissions", subs: ["JWT with djangorestframework-simplejwt", "access + refresh tokens", "IsAuthenticated/IsAdminUser/custom permission_classes"] },
          { n: "Throttling & pagination", subs: ["AnonRateThrottle/UserRateThrottle/ScopedRateThrottle", "custom Redis throttle", "PageNumber/LimitOffset/CursorPagination"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Django REST Framework: Complete API Guide" covering: Serializers (Serializer vs ModelSerializer, validation, nested read+write, SerializerMethodField), Views (APIView, GenericAPIView+mixins, ModelViewSet, @action), Authentication (JWT with simplejwt, custom auth, permission_classes), Throttling (all throttle classes, custom Redis backend), Pagination (all 3 types). Full code for Task Management API.`,
        project: { type: "mini", name: "Task Management REST API", desc: "JWT auth, User/Project/Task, nested serializers, cursor pagination, role-based permissions, custom throttling, APITestCase suite.", stack: ["Django", "DRF", "JWT", "PostgreSQL"], prompt: `Create a DOCX mini project guide: "Task Management REST API with DRF". JWT auth, User/Project/Task models, nested serializers, cursor pagination, owner vs member permissions, ScopedRateThrottle, 20 APITestCase tests.` }
      },
      {
        d: "10", title: "Django Advanced", topics: [
          { n: "Signals", subs: ["pre/post_save, pre/post_delete, m2m_changed", "@receiver decorator vs connect()", "infinite loop prevention (update_fields guard)"] },
          { n: "Middleware", subs: ["middleware order and onion model", "class-based middleware", "RequestLoggingMiddleware/CorrelationIDMiddleware"] },
          { n: "Custom management commands", subs: ["BaseCommand/handle()/add_arguments()", "tqdm progress bars", "expire_old_listings example"] },
          { n: "Celery integration", subs: ["CELERY_BROKER_URL/RESULT_BACKEND setup", "@shared_task decorator", "Flower monitoring", "Celery Beat crontab", "autoretry_for + exponential backoff"] },
          { n: "Django Channels (WebSockets)", subs: ["ASGI vs WSGI", "channel layers with Redis", "WebSocketConsumer: connect/disconnect/receive", "Groups and broadcasting"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Django Advanced: Signals, Middleware, Celery & Channels" covering: Signals (all types, @receiver, infinite loop prevention), Middleware (onion model, class-based, RequestLoggingMiddleware/CorrelationIDMiddleware), Management commands (BaseCommand, tqdm), Celery+Django (setup, @shared_task, Flower, Beat, autoretry_for), Django Channels WebSockets (ASGI, channel layers, WebSocketConsumer, Groups).`,
        project: { type: "mini", name: "Real-time Notifications", desc: "Signal on task assignment → Celery email + Notification model → Channels WebSocket broadcast. Beat sends daily summary.", stack: ["Django", "Celery", "Redis", "Channels"], prompt: `Create a DOCX mini project guide: "Django Real-time Notifications". post_save signal → Celery task (email + Notification) → Channels WebSocketConsumer broadcasts. Celery Beat daily summary at 9AM. Complete signals.py, tasks.py, consumers.py, routing.py.` }
      },
      {
        d: "11–13", title: "CAPSTONE: Job Board Platform", type: "capstone", topics: [
          { n: "Models & auth", subs: ["Custom AbstractUser", "Company/JobListing/Application/Notification models", "JWT auth integration"] },
          { n: "API endpoints", subs: ["Jobs CRUD (employer) + PostgreSQL FTS search", "Applications: apply/list/status update", "cursor pagination + rate limiting (5 apps/hr)"] },
          { n: "Async & background", subs: ["Celery: confirmation email + daily digest", "Channels: real-time status updates", "Beat: expire_old_listings command"] },
          { n: "Infrastructure", subs: ["Docker Compose: django/postgres/redis/celery/beat", "40 test cases"] },
        ],
        prompt: `Create a comprehensive DOCX project guide titled "Django Capstone: Job Board Platform". Custom AbstractUser, Company/JobListing/Application/Notification models, JWT auth, DRF endpoints (jobs CRUD + FTS search, cursor pagination, applications, notifications), Signals for notification on status change, Celery (email, daily digest, Beat job), Channels real-time, rate limiting 5 apps/hour, Docker Compose, 40 test cases. Complete code every file. ~80-page DOCX.`,
        project: { type: "capstone", name: "Job Board Platform", desc: "Full Django: JWT auth, job CRUD with FTS, applications, Channels notifications, Celery tasks, Docker Compose.", stack: ["Django", "DRF", "Celery", "Channels", "Redis", "PostgreSQL", "Docker"], prompt: `Create a DOCX capstone guide: "Django Job Board". All code: models, serializers, views, urls, signals, tasks, consumers. Docker Compose config. 40 tests. Architecture diagram in text.` }
      },
    ]
  },
  {
    id: "p3", icon: "⚡", title: "Phase 3 — FastAPI", days: "Days 14–17", tag: "Backend", color: "#1baf7a",
    daysList: [
      {
        d: "14", title: "FastAPI Basics", topics: [
          { n: "Path operations & routing", subs: ["@app.get/post/put/delete/patch decorators", "path params + type validation", "query params (optional/required/aliases)", "APIRouter for modular routing"] },
          { n: "Pydantic models", subs: ["BaseModel + Field() (min_length/max_length/ge/le/regex)", "@field_validator (Pydantic v2)", "model inheritance", "from_attributes (orm_mode)", "nested models"] },
          { n: "Dependency injection", subs: ["Depends() + sub-dependencies", "class-based dependencies", "DB session yield pattern", "current user dep with JWT", "Lifespan events"] },
          { n: "Background tasks", subs: ["BackgroundTasks.add_task()", "async vs sync background tasks", "when to use Celery instead"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "FastAPI Basics: Modern Python APIs" covering: Path operations (all HTTP methods, path/query params, APIRouter, OpenAPI), Pydantic v2 (BaseModel, Field validators, @field_validator, model inheritance, from_attributes, nested models), Dependency injection (Depends(), sub-deps, class-based, DB session yield, JWT current user, Lifespan), Background tasks (BackgroundTasks, async vs sync, vs Celery). Build URL shortener throughout.`,
        project: { type: "mini", name: "URL Shortener API", desc: "POST /shorten returns short_code, GET /{code} redirects, GET /stats/{code} click count. SQLAlchemy async + background task logs clicks.", stack: ["FastAPI", "SQLAlchemy async", "Pydantic"], prompt: `Create a DOCX mini project guide: "FastAPI URL Shortener". POST /shorten (Pydantic URL validation), GET /{short_code} (302 redirect), GET /stats/{short_code} (click count). SQLAlchemy async, background task logs each click. Complete code + httpx tests.` }
      },
      {
        d: "15", title: "Async FastAPI", topics: [
          { n: "async/await patterns", subs: ["event loop mechanics", "async def vs def in FastAPI", "blocking vs non-blocking operations", "run_in_executor for sync code"] },
          { n: "asyncio deep dive", subs: ["asyncio.gather() for concurrency", "asyncio.wait_for() timeout", "asyncio.Queue producer-consumer"] },
          { n: "Async SQLAlchemy", subs: ["create_async_engine and AsyncSession", "async_sessionmaker", "async repository pattern", "Alembic with async engine"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Async FastAPI: Concurrency & High-Throughput APIs" covering: async/await (event loop, async def vs def, blocking vs non-blocking, run_in_executor), asyncio (gather(), wait_for(), Queue, debug mode), Lifespan events (startup/shutdown, state injection), Async SQLAlchemy (create_async_engine, AsyncSession, async repository, Alembic). Include locust benchmarking.`,
        project: { type: "mini", name: "Async News Aggregator", desc: "Fetch from 5 APIs concurrently, Redis cache (5min TTL), async PostgreSQL. Target 500 req/sec.", stack: ["FastAPI", "asyncio", "aiohttp", "aioredis"], prompt: `Create a DOCX mini project guide: "Async News Aggregator API". Fetch 5 news APIs with aiohttp+asyncio.gather(), Redis 5-min TTL cache, PostgreSQL async storage. GET /news?category=tech with cursor pagination. Locust benchmark script targeting 500 req/sec.` }
      },
      {
        d: "16", title: "FastAPI Production", topics: [
          { n: "OAuth2 & JWT", subs: ["OAuth2PasswordBearer + OAuth2PasswordRequestForm", "JWT creation with python-jose", "refresh token rotation", "RBAC with scopes"] },
          { n: "WebSockets", subs: ["@app.websocket decorator", "ConnectionManager for multiple clients", "broadcasting to rooms", "auth in WebSocket connections"] },
          { n: "Middleware & CORS", subs: ["CORSMiddleware/GZipMiddleware", "custom: request timing/correlation ID", "TrustedHostMiddleware"] },
          { n: "Testing", subs: ["TestClient sync vs AsyncClient (httpx)", "overriding dependencies in tests", "DB fixtures with SQLAlchemy", "Factory Boy for test data"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "FastAPI Production: Auth, WebSockets & Testing" covering: OAuth2 & JWT (OAuth2PasswordBearer, python-jose, refresh rotation, RBAC, API key), WebSockets (ConnectionManager, broadcasting, auth), File uploads (UploadFile, S3 with boto3, validation), Middleware (CORS, GZip, custom), Testing (TestClient vs AsyncClient, dep overrides, SQLAlchemy fixtures, WebSocket tests, Factory Boy).`,
        project: { type: "capstone", name: "Real-Time Chat API", desc: "FastAPI + WebSockets + Redis pub/sub + JWT. Per-room broadcasting, typing indicators, presence. Docker Compose + 50 tests.", stack: ["FastAPI", "WebSocket", "Redis", "Celery", "JWT", "Docker"], prompt: `Create a DOCX capstone guide: "FastAPI Real-Time Chat API". User/Room/Message/DM/Attachment models, JWT auth with Redis blacklist, WebSocket ConnectionManager with Redis pub/sub, Celery tasks, Docker Compose, 50 tests. Full code.` }
      },
    ]
  },
  {
    id: "p4", icon: "🔷", title: "Phase 4 — GraphQL & Graphene", days: "Days 18–20", tag: "Backend", color: "#4a3aa7",
    daysList: [
      {
        d: "18", title: "GraphQL Fundamentals", topics: [
          { n: "Schema Definition Language", subs: ["scalar/Object/Non-null/list types", "Input types vs output types", "Enum/Union/Interface types", "Query/Mutation/Subscription roots", "@deprecated/@skip/@include directives"] },
          { n: "Queries, mutations, subscriptions", subs: ["query syntax and nested fields", "variables: $varName: Type", "named + inline fragments", "introspection (__schema/__type)"] },
          { n: "Resolvers", subs: ["signature: (root, args, context, info)", "default resolvers", "resolver chain data flow", "context: DB session + current user"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "GraphQL Fundamentals: Schema to Subscriptions" covering: SDL (all type kinds, Non-null, Input vs output, Enum, Union, Interface, directives), Queries/mutations/subscriptions (syntax, variables, fragments, introspection), Resolvers (signature, default resolvers, resolver chain, context), custom scalars (DateTime/JSON/UUID), query complexity/depth limiting. Build Recipe Platform schema throughout.`,
        project: { type: "mini", name: "Recipe Platform GraphQL Schema", desc: "User/Recipe/Ingredient/Review/Category SDL. 10 queries, 8 mutations, 2 subscriptions with variables and fragments.", stack: ["GraphQL", "SDL"], prompt: `Create a DOCX mini project guide: "Recipe Platform GraphQL Schema". Full SDL for User/Recipe/Ingredient/Review/Category. 10 queries (with variables+fragments), 8 mutations, 2 subscriptions, query complexity limit config.` }
      },
      {
        d: "19", title: "Graphene Python", topics: [
          { n: "Graphene schema", subs: ["graphene.ObjectType/Schema/List/NonNull", "resolve_fieldname methods", "Interface/Union/custom scalars"] },
          { n: "Graphene-Django", subs: ["DjangoObjectType: model binding/fields/exclude", "DjangoListField and DjangoFilterConnectionField"] },
          { n: "DataLoader for N+1", subs: ["N+1 problem with query count", "promise library in Python", "DataLoader batch_load_fn pattern", "per-request DataLoader instances"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Graphene Python: GraphQL with Django" covering: Graphene schema (ObjectType, all field types, resolve methods, Interface, Union, custom scalars), Queries & mutations (Query class, Mutation with Arguments, Input types, error handling), Graphene-Django (DjangoObjectType, DjangoFilterConnectionField), DataLoader for N+1, Testing with graphene.test.Client.`,
        project: { type: "mini", name: "Blog API → GraphQL", desc: "Convert Django Blog to Graphene-Django, JWT in context, DataLoader for author/category, subscription for comments, 20 tests.", stack: ["Django", "Graphene", "DataLoader"], prompt: `Create a DOCX mini project guide: "Convert Django Blog to GraphQL". DjangoObjectType for Post/Category/Tag/Author, CRUD as queries+mutations, JWT auth in context, DataLoader for N+1, subscription for new comments, 20 test cases.` }
      },
      {
        d: "20", title: "GraphQL Advanced", topics: [
          { n: "Auth & pagination", subs: ["JWT in Authorization header + context middleware", "field-level permissions", "Relay Connection: edges/node/cursor/pageInfo", "cursor-based pagination with DjangoFilterConnectionField"] },
          { n: "Security", subs: ["query depth limiting", "query complexity scoring", "introspection disabled in production", "rate limiting on GraphQL endpoint", "SQL injection via inputs"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "GraphQL Advanced: Auth, Pagination & Security" covering: Authentication (JWT in header, context middleware, permission decorators, field-level permissions), Pagination (offset pros/cons, cursor-based, Relay Connection: edges/node/cursor/pageInfo, efficient total_count), Subscriptions (Channels WebSocket transport), Error handling (GraphQL error format, partial success, custom error classes), Security (depth limiting, complexity scoring, introspection disable, rate limiting, persisted queries).`,
        project: { type: "mini", name: "Job Board — GraphQL Layer", desc: "Add GraphQL to Job Board: DjangoObjectType, Relay pagination, DataLoader for company, subscription for status, complexity limit 100.", stack: ["Graphene-Django", "Relay", "DataLoader", "Channels"], prompt: `Create a DOCX mini project guide: "Add GraphQL to Django Job Board". DjangoObjectType for all models, Relay cursor pagination, DataLoader for company, subscription for application status, query complexity limit 100, introspection disabled in prod.` }
      },
    ]
  },
  {
    id: "p5", icon: "📨", title: "Phase 5 — Celery & Kafka", days: "Days 21–25", tag: "Backend", color: "#e34948",
    daysList: [
      {
        d: "21", title: "Celery Basics", topics: [
          { n: "Task definition & calling", subs: ["@app.task vs @shared_task", "delay() vs apply_async() (countdown/eta/expires)", "task states: PENDING→STARTED→SUCCESS/FAILURE"] },
          { n: "Brokers & result backends", subs: ["Redis broker: config + pooling", "CELERY_BROKER_URL and CELERY_RESULT_BACKEND", "AsyncResult: state/result/get()/ready()", "result_expires setting"] },
          { n: "Celery Beat (periodic tasks)", subs: ["crontab() syntax examples", "django-celery-beat DB scheduler", "PeriodicTask model: enable/disable via admin"] },
          { n: "Monitoring", subs: ["Flower real-time UI", "task events and task_id tracking", "Prometheus metrics for Celery"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Celery: Background Jobs & Task Queues" covering: Task definition (@app.task vs @shared_task, delay() vs apply_async() with all options, states), Brokers (Redis, BROKER_URL formats, pooling), Result backends (AsyncResult, all states, result_expires), Periodic tasks (crontab(), django-celery-beat, PeriodicTask model), Monitoring (Flower, task events, Prometheus). Full Django+Celery+Redis+Beat setup code.`,
        project: { type: "mini", name: "Async Report Generator", desc: "POST /generate-report → Celery task → WebSocket notifies when done → GET /download/{task_id}. Beat auto-deletes reports >7 days.", stack: ["FastAPI", "Celery", "Redis", "WebSocket", "Beat"], prompt: `Create a DOCX mini project guide: "Async Report Generator with Celery". POST /generate-report → Celery task (10s) → WebSocket streams PENDING/STARTED/SUCCESS → GET /download/{task_id}. Celery Beat auto-deletes reports >7 days. Full code + Docker Compose.` }
      },
      {
        d: "22", title: "Celery Advanced", topics: [
          { n: "Canvas: chains, groups, chords", subs: ["chain() sequential pipeline", "group() parallel execution", "chord() parallel→single callback", "Signature objects with s()/si()"] },
          { n: "Priority queues & DLQ", subs: ["multiple queues (default/high/low)", "routing tasks to specific queues", "worker -Q flag", "dead letter queues for failed tasks"] },
          { n: "Error handling & retries", subs: ["autoretry_for: auto-retry on exception types", "max_retries + retry_backoff (exponential)", "on_failure/on_retry/on_success callbacks", "idempotency: safely retried task design"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Celery Advanced: Canvas, Error Handling & Priority Queues" covering: Canvas (chain()/group()/chord(), combinations, Signature objects, s()/si(), starmap/chunks for bulk 10k records), Priority queues (multiple queues, task routing, worker -Q, DLQ), Error handling (autoretry_for, retry_backoff, callbacks, idempotency design). Real ETL pipeline example.`,
        project: { type: "mini", name: "ETL Pipeline with Canvas", desc: "Beat triggers at 2AM → group(5 parallel fetch) → chord collects → transform → chain(store+email). Retry + idempotency keys.", stack: ["Celery", "Canvas", "Beat", "Redis"], prompt: `Create a DOCX mini project guide: "ETL Pipeline with Celery Canvas". Beat at 2AM → group(5 parallel fetch_from_source) → chord aggregates → transform → chain(store_to_db, send_summary_email). Retry with exponential backoff, Redis idempotency keys.` }
      },
      {
        d: "23", title: "Kafka Fundamentals", topics: [
          { n: "Core concepts", subs: ["topics/partitions/offsets architecture", "retention (time-based vs size-based)", "log compaction", "replication: leader/followers/ISR", "KRaft mode (no ZooKeeper, Kafka 3.3+)"] },
          { n: "Producers", subs: ["acks=0/1/all acknowledgments", "batching: batch.size + linger.ms", "idempotent producer", "partitioner strategies"] },
          { n: "Consumers & consumer groups", subs: ["poll loop + offset commit strategies", "consumer group partition assignment", "#consumers ≤ #partitions rule", "rebalancing: eager vs cooperative-sticky", "consumer lag monitoring"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Apache Kafka: Event-Driven Architecture" covering: Core concepts (events vs messages, topics/partitions/offsets, retention, log compaction, replication/ISR, KRaft mode), Producers (acks levels, batching, idempotent, compression, partitioners), Consumers & groups (poll loop, offset commit strategies, partition assignment, rebalancing cooperative-sticky, lag monitoring). Python confluent-kafka examples throughout.`,
        project: { type: "mini", name: "Order Processing System", desc: "FastAPI → Kafka producer → 3 consumer instances → PostgreSQL + notifications topic → email consumer. Measure lag with kafka-consumer-groups.sh.", stack: ["FastAPI", "Kafka", "confluent-kafka", "PostgreSQL"], prompt: `Create a DOCX mini project guide: "Kafka Order Processing System". FastAPI POST /order → producer → orders topic (3 partitions) → 3 consumer group instances → PostgreSQL + notifications topic → email consumer. Measure lag with kafka-consumer-groups.sh.` }
      },
      {
        d: "24", title: "Kafka with Python", topics: [
          { n: "confluent-kafka & kafka-python", subs: ["Producer/Consumer/AdminClient", "AIOKafka for async consumers", "delivery reports and callbacks"] },
          { n: "Error handling & DLQ", subs: ["retry topic pattern (topic→retry→dlt)", "Dead Letter Topic with error envelope", "DLT alerting strategy"] },
          { n: "Schema Registry & Avro", subs: ["Avro schema definition", "compatibility modes: BACKWARD/FORWARD/FULL", "confluent-kafka + fastavro integration", "schema evolution: adding optional fields"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Kafka with Python: Production Patterns" covering: confluent-kafka vs kafka-python (AIOKafka for async), Producer patterns (sync/async, delivery reports, JSON/Avro serialization, transactional producer), Consumer commit strategies (auto.offset.reset, sync/async commit, manual assignment), Error handling & DLQ (retry topic pattern: topic→retry→dlt, error envelope, DLT alerting), Schema Registry & Avro (schema definition, compatibility modes, fastavro, schema evolution).`,
        project: { type: "mini", name: "Order System + Schema Registry", desc: "Add Avro schemas, retry-topic pattern (3 attempts exponential backoff), DLT with Slack webhook alert consumer.", stack: ["Kafka", "Schema Registry", "Avro", "confluent-kafka"], prompt: `Create a DOCX mini project guide: "Schema Registry + DLQ for Order System". OrderEvent Avro schema in Schema Registry, retry pattern: failed→orders.retry (3 attempts, exponential backoff)→orders.dlt, DLT consumer posts Slack webhook alert. Full code.` }
      },
      {
        d: "25", title: "Kafka Advanced", topics: [
          { n: "Exactly-once semantics", subs: ["at-most-once/at-least-once/exactly-once", "idempotent producers", "transactions: atomic read-process-write", "EOS Python transactional API"] },
          { n: "Security & monitoring", subs: ["SSL encryption + SASL (PLAIN/SCRAM-SHA-256)", "ACLs with kafka-acls.sh", "Prometheus JMX exporter", "Grafana key metrics: consumer lag/under-replicated/latency"] },
          { n: "Kafka Connect", subs: ["JDBC source connector (PostgreSQL→Kafka)", "JDBC sink + S3 sink connectors", "connector JSON configuration", "REST API for connector management"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Kafka Advanced: EOS, Security & Monitoring" covering: Kafka Streams vs Flink (concepts, windowing, state stores), Exactly-once semantics (at-most/at-least/exactly-once, idempotent producers, transactions, Python EOS API), SASL/SSL security (SSL certs, SASL mechanisms, ACLs, Python SSL config), Monitoring (JMX metrics, Prometheus, Grafana dashboard, alert rules), Kafka Connect (JDBC source/sink, S3 sink, REST API). Full configs.`,
        project: { type: "capstone", name: "Production Kafka System", desc: "SSL+SASL-PLAIN auth, EOS for payments, Kafka Connect JDBC sink, Grafana lag alert, DLT → PagerDuty webhook.", stack: ["Kafka", "SSL", "SASL", "Kafka Connect", "Prometheus", "Grafana"], prompt: `Create a DOCX project guide: "Production-Harden Kafka Order System". SSL+SASL-PLAIN config, EOS transactions on payments, Kafka Connect JDBC sink to warehouse, Grafana consumer lag dashboard, AlertManager rule lag>10000 → PagerDuty. Full configs.` }
      },
    ]
  },
  {
    id: "p6", icon: "🔴", title: "Phase 6 — Redis & PostgreSQL", days: "Days 26–30", tag: "Databases", color: "#e34948",
    daysList: [
      {
        d: "26", title: "Redis Basics & Patterns", topics: [
          { n: "Data structures", subs: ["String: SET/GET/INCR/SETEX", "Hash: HSET/HGET/HGETALL for objects", "List: LPUSH/RPUSH/BLPOP for queues", "Set: SADD/SINTER/SUNION/SDIFF", "Sorted Set: ZADD/ZRANGEBYSCORE for leaderboards", "HyperLogLog and Bitmaps"] },
          { n: "Caching strategies", subs: ["cache-aside (lazy) with TTL", "write-through: cache + DB simultaneously", "write-behind (async DB writes)", "cache stampede prevention: mutex lock + probabilistic expiry"] },
          { n: "Distributed locking", subs: ["Redlock algorithm", "Python redlock-py implementation", "SET NX PX pattern", "fencing tokens for safety"] },
          { n: "Pub/Sub & Redis GEO", subs: ["PUBLISH/SUBSCRIBE/PSUBSCRIBE", "aioredis async pub/sub", "GEOADD/GEOSEARCH for nearby locations"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Redis: Data Structures, Caching & Distributed Patterns" covering: All data structures (String/Hash/List/Set/Sorted Set/HyperLogLog/Bitmaps, full command reference), TTL & eviction (LRU/LFU policies), Transactions (MULTI/EXEC, WATCH CAS, Pipeline, Lua atomic ops), Caching strategies (all 4 types, stampede prevention), Distributed locking (Redlock, SET NX PX, fencing tokens), Pub/Sub (aioredis async), Redis GEO (GEOADD/GEOSEARCH). Full Python code.`,
        project: { type: "mini", name: "Ride-Hailing Backend Service", desc: "Drivers POST location (GEOADD), riders GEOSEARCH nearest, Redlock prevents double-booking, Pub/Sub notifies on accept, session in Hash.", stack: ["FastAPI", "Redis", "GEO", "Pub/Sub", "Redlock"], prompt: `Create a DOCX mini project guide: "Ride-Hailing Service with Redis". POST /driver/location (GEOADD), POST /rider/find-drivers (GEOSEARCH), POST /rider/book (Redlock), Pub/Sub for driver-accepted notification, ride session in Redis Hash with TTL. Full FastAPI+aioredis code.` }
      },
      {
        d: "27", title: "Redis Advanced", topics: [
          { n: "Redis Cluster & Sentinel", subs: ["hash slots (16384) and slot assignment", "CLUSTER INFO/NODES commands", "RedisCluster client in redis-py", "Sentinel quorum and automatic failover"] },
          { n: "Redis Streams", subs: ["XADD/XREAD/XREADGROUP/XACK", "consumer groups in Streams (vs Pub/Sub)", "Pending Entry List (PEL) for at-least-once", "XAUTOCLAIM for stale messages"] },
          { n: "Lua scripting", subs: ["EVAL and EVALSHA", "why Lua scripts are atomic", "SCRIPT LOAD for caching", "atomic rate limiter in Lua"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Redis Advanced: Cluster, Sentinel, Streams & Scripting" covering: Redis Cluster (hash slots, node roles, CLUSTER INFO/NODES, RedisCluster client, resharding), Sentinel & HA (quorum, config, automatic failover, vs Cluster), Redis Streams (XADD/XREADGROUP/XACK, consumer groups, PEL, XAUTOCLAIM), Lua scripting (EVAL/EVALSHA, atomicity, SCRIPT LOAD, Lua rate limiter, atomic stock deductor), aioredis + fakeredis for testing.`,
        project: { type: "mini", name: "Order System + Redis Streams", desc: "XADD order-events → XREADGROUP inventory processes → XAUTOCLAIM stale after 30s. Lua atomic rate limiter on checkout.", stack: ["Redis Streams", "Lua", "aioredis", "FastAPI"], prompt: `Create a DOCX mini project guide: "Redis Streams Event Bus for Orders". Order service XADD → inventory XREADGROUP/XACK → XAUTOCLAIM after 30s. Lua atomic rate limiter on /checkout (100/min/user). Full code.` }
      },
      {
        d: "28", title: "PostgreSQL Mastery", topics: [
          { n: "Advanced SQL", subs: ["window functions: ROW_NUMBER/RANK/LAG/LEAD/FIRST_VALUE", "PARTITION BY and OVER clause", "recursive CTEs for tree/hierarchy queries", "LATERAL joins", "GROUPING SETS/ROLLUP/CUBE"] },
          { n: "PostgreSQL internals", subs: ["MVCC: concurrent transaction handling", "VACUUM/autovacuum for bloat", "WAL for crash recovery", "EXPLAIN ANALYZE: reading execution plans", "pg_stat_statements for slow queries"] },
          { n: "Index types & optimization", subs: ["B-tree/Hash/GIN/GiST/BRIN index types", "partial and composite indexes", "index-only scans", "pg_stat_statements for slow query detection"] },
          { n: "Partitioning & pgvector", subs: ["range/list/hash partitioning", "partition pruning in query plans", "pgvector: vector type + HNSW/IVFFlat indexes", "hybrid search: cosine + ts_vector FTS"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "PostgreSQL Mastery: Internals, Optimization & pgvector" covering: Advanced SQL (all window functions, recursive CTEs, LATERAL, GROUPING SETS/ROLLUP/CUBE), Internals (MVCC, VACUUM, HOT updates, WAL, EXPLAIN ANALYZE), Query optimization (all index types, partial/composite, index-only scans, pg_stat_statements), Transactions (isolation levels, advisory locks, deadlock prevention, SKIP LOCKED queue), Partitioning (range/list/hash, pruning), pgvector (HNSW vs IVFFlat, hybrid search). Full SQL + SQLAlchemy code.`,
        project: { type: "mini", name: "Semantic Document Search", desc: "500 docs embedded with text-embedding-3-small, pgvector HNSW. Hybrid search (cosine + ts_rank), <100ms for 10k docs.", stack: ["PostgreSQL", "pgvector", "HNSW", "FastAPI", "OpenAI"], prompt: `Create a DOCX mini project guide: "Semantic Document Search with pgvector". 500 documents → text-embedding-3-small → pgvector HNSW index. Hybrid search: cosine (<=> operator) + PostgreSQL FTS ts_rank, filtered by category, cursor paginated. Benchmark: p50/p95/p99 latency.` }
      },
      {
        d: "29–30", title: "CAPSTONE: High-Performance Analytics API", type: "capstone", topics: [
          { n: "Schema design", subs: ["orders (range-partitioned by month)", "products (pgvector semantic search column)", "events (BRIN index on timestamp)", "materialized_reports table"] },
          { n: "Endpoints with targets", subs: ["GET /dashboard → Redis cache <50ms, fallback <500ms", "GET /products/search → hybrid pgvector <100ms/50k", "GET /orders/analytics → window functions <2s/1yr", "POST /orders → Redlock 1000 req/sec"] },
          { n: "Infrastructure", subs: ["Docker Compose: FastAPI/PostgreSQL/Redis Cluster/Celery", "Redis key schema documentation", "locust load test scripts", "EXPLAIN ANALYZE for all critical queries"] },
        ],
        prompt: `Create a comprehensive DOCX project guide titled "Data Layer Capstone: High-Performance Analytics API". Schema (orders range-partitioned/month, products+pgvector, events+BRIN, materialized_reports), 5 FastAPI endpoints with performance targets (dashboard <50ms Redis/<500ms miss, product search <100ms/50k, analytics <2s/1yr, 1000 req/sec orders with Redlock, async Celery reports). Docker Compose, Redis key schema docs, locust scripts, EXPLAIN ANALYZE analysis. Full code. ~60-page DOCX.`,
        project: { type: "capstone", name: "E-commerce Analytics API", desc: "Partitioned PostgreSQL + pgvector + Redis Cluster + Redlock + SKIP LOCKED + Celery reports. Performance benchmarked.", stack: ["PostgreSQL", "pgvector", "Redis Cluster", "Celery", "FastAPI", "Docker", "locust"], prompt: `Create a DOCX capstone guide: "High-Performance E-commerce Analytics API". Complete code: partitioned schema, all endpoints, Redis caching layer with key schema docs, locust benchmark scripts, EXPLAIN ANALYZE for critical queries, Docker Compose.` }
      },
    ]
  },
  {
    id: "p7", icon: "🤖", title: "Phase 7 — AI/LLM Engineering", days: "Days 31–37", tag: "AI/ML", color: "#4a3aa7",
    daysList: [
      {
        d: "31", title: "LLM Basics", topics: [
          { n: "Tokens, temperature & sampling", subs: ["BPE tokenization and tiktoken", "token counting + cost calculation", "temperature math and effect on output", "top-p (nucleus) vs top-k sampling", "parameter recommendations by task type"] },
          { n: "Prompt engineering", subs: ["zero-shot/one-shot/few-shot with examples", "chain-of-thought (CoT) prompting", "role prompting and persona assignment", "output format control: JSON/markdown", "10 production prompt templates"] },
          { n: "System prompts & few-shot", subs: ["system prompt anatomy", "OpenAI vs Anthropic vs Gemini differences", "dynamic few-shot example selection", "5 production system prompt templates"] },
          { n: "Function calling / tool use", subs: ["tool definition as JSON schema", "full ReAct agent loop from scratch", "parallel tool calls", "error handling: returning errors to model"] },
          { n: "OpenAI & Anthropic APIs", subs: ["all parameters: model/temperature/max_tokens/stream", "streaming responses and chunk handling", "vision API: base64 + URL images", "embeddings API", "prompt caching (Anthropic)/Batch API (OpenAI)", "side-by-side comparison table"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "LLM Engineering Fundamentals" with 5 chapters: Ch1: Tokens/Temperature/Sampling (BPE, tiktoken, cost calc, temperature/top-p/top-k math, parameter table by task), Ch2: Prompt Engineering (zero/one/few-shot, CoT, role prompting, output format, 10 production templates with Python), Ch3: System Prompts & Few-Shot (anatomy, cross-provider differences, dynamic few-shot, anti-patterns, 5 production system prompts), Ch4: Function Calling (tool JSON schema, ReAct loop from scratch, parallel tools, 3-tool Python agent), Ch5: OpenAI & Anthropic APIs (all params, streaming, vision, embeddings, prompt caching, Batch API, comparison table). 60-80 page DOCX.`,
        project: { type: "mini", name: "Multi-Tool ReAct AI Agent", desc: "ReAct agent: weather (Open-Meteo), calculator, DuckDuckGo search. Parallel tool calls, error handling, multi-turn with 5-turn memory. Works with OpenAI + Anthropic.", stack: ["LangChain", "OpenAI", "Anthropic", "Python"], prompt: `Create a DOCX mini project guide: "ReAct Multi-Tool AI Agent". Build from scratch: weather tool (Open-Meteo API), calculator (safe eval), DuckDuckGo search. Full ReAct loop: thought→action→observation. Parallel tool calls, tool error handling, 5-turn memory. Works with both OpenAI and Anthropic APIs.` }
      },
      {
        d: "32", title: "LangChain", topics: [
          { n: "LCEL (LangChain Expression Language)", subs: ["pipe operator (|) for composing chains", "RunnableSequence/Parallel/Passthrough", "invoke/stream/batch/ainvoke interface", "fallbacks + retries in LCEL", "LangSmith tracing setup"] },
          { n: "Memory types", subs: ["ConversationBufferMemory: full history", "ConversationBufferWindowMemory: last K turns", "ConversationSummaryMemory: summarize old turns", "ConversationSummaryBufferMemory: hybrid"] },
          { n: "Document loaders & splitters", subs: ["PyPDFLoader/Docx2txt/CSV/WebBaseLoader", "RecursiveCharacterTextSplitter (recommended default)", "TokenTextSplitter and MarkdownHeaderTextSplitter", "chunk size vs overlap tradeoffs"] },
          { n: "Output parsers", subs: ["StrOutputParser", "JsonOutputParser with Pydantic schema", "RetryOutputParser for malformed output"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "LangChain: Chains, Memory, Loaders & LCEL" covering: LCEL (pipe operator, Runnable interface: invoke/stream/batch/ainvoke, RunnableParallel/Passthrough, fallbacks, LangSmith), Memory types (Buffer/Window/Summary/SummaryBuffer, custom memory class), Document loaders (PyPDF/Docx2txt/CSV/Web/Directory, custom BaseLoader), Text splitters (Recursive/Token/MarkdownHeader, chunk size tradeoffs), Output parsers (Str/Json/Pydantic/Retry/custom). Build document chat assistant throughout.`,
        project: { type: "mini", name: "Document Chat Assistant", desc: "PDF → RecursiveCharacterTextSplitter → OpenAI embeddings → pgvector → ConversationSummaryBufferMemory → LCEL chain → FastAPI streaming.", stack: ["LangChain", "LCEL", "pgvector", "FastAPI", "OpenAI"], prompt: `Create a DOCX mini project guide: "Document Chat with LangChain LCEL". PDF → RecursiveCharacterTextSplitter → OpenAI embeddings → pgvector → LCEL: retriever | prompt | llm | StrOutputParser → FastAPI streaming endpoint. ConversationSummaryBufferMemory for multi-turn.` }
      },
      {
        d: "33", title: "RAG Pipelines", topics: [
          { n: "Chunking & embedding strategies", subs: ["fixed-size vs semantic vs recursive chunking", "document-specific: markdown headers/HTML/code", "OpenAI text-embedding-3-small/large dimensions+cost", "BGE-M3 and E5-large open source alternatives", "batching embeddings efficiently"] },
          { n: "Hybrid search (BM25 + semantic)", subs: ["BM25 keyword search (TF-IDF)", "Reciprocal Rank Fusion (RRF) for score merging", "weighted hybrid: α×semantic + (1-α)×BM25", "PostgreSQL ts_vector + pgvector combined"] },
          { n: "Re-ranking & evaluation", subs: ["cross-encoder rerankers: Cohere Rerank/BGE-Reranker", "two-stage: retrieve 50 → rerank → top 5", "RAGAS metrics: faithfulness/answer relevancy/context precision/recall", "LLM-as-judge for answer quality"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "RAG Pipelines: Naive to Production-Grade" covering: Chunking strategies (fixed-size/semantic/recursive/doc-specific, quality metrics), Embedding models (OpenAI text-embedding-3-small/large, BGE-M3, E5-large, Matryoshka, batching, cost), Vector stores comparison (pgvector/Pinecone/Chroma/Weaviate: cost/scale/filtering table), Hybrid search (BM25, RRF, weighted hybrid, PostgreSQL ts_vector+pgvector), Re-ranking (cross-encoder vs bi-encoder, two-stage pipeline), RAGAS evaluation (all 4 metrics, eval dataset, LLM-as-judge). Full Python code.`,
        project: { type: "mini", name: "Legal Document Q&A (RAG)", desc: "100 PDFs → recursive chunking → BGE-M3 → pgvector HNSW → hybrid + BGE-Reranker → GPT-4o. RAGAS eval >0.85 faithfulness.", stack: ["LangChain", "pgvector", "BGE-M3", "BGE-Reranker", "RAGAS", "FastAPI"], prompt: `Create a DOCX mini project guide: "Legal Document Q&A with Production RAG". 100 PDFs → MarkdownHeaderTextSplitter → BGE-M3 → pgvector HNSW → BM25+semantic hybrid with RRF → BGE-Reranker → GPT-4o with citations → RAGAS eval suite. Must achieve >0.85 faithfulness.` }
      },
      {
        d: "34", title: "LangGraph & Agents", topics: [
          { n: "Graph architecture", subs: ["StateGraph vs MessageGraph", "TypedDict for state definition", "node functions: (state) → state update", "conditional edges with routing functions", "END node and termination"] },
          { n: "State & checkpointing", subs: ["Annotated state with reducers (add_messages)", "MemorySaver/SqliteSaver/PostgresSaver checkpointers", "thread IDs for conversation isolation", "time-travel: replaying from checkpoint"] },
          { n: "Multi-agent patterns", subs: ["ToolNode + @tool decorator + tools_condition", "supervisor agent pattern routes to subagents", "hierarchical agent networks", "interrupt_before/after for human-in-the-loop"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "LangGraph & AI Agents: Stateful Multi-Step Systems" covering: Graph nodes & edges (StateGraph vs MessageGraph, TypedDict state, node functions, conditional edges, END node, compiling, visualizing), State management (Annotated with reducers, all checkpointer types, thread IDs, time-travel/replay), Tool use (ToolNode, @tool, tools_condition, parallel tools), Multi-agent coordination (supervisor pattern, hierarchical networks, agent handoff, research+writer+critic), Human-in-the-loop (interrupt_before/after, resuming with Command). Full LangGraph code.`,
        project: { type: "mini", name: "LangGraph Research Assistant", desc: "Supervisor routes to: web_search_agent / code_exec_agent / rag_agent → writer synthesizes → human_review → stream answer. PostgreSQL checkpointer.", stack: ["LangGraph", "LangChain", "Tavily", "pgvector", "FastAPI", "PostgreSQL"], prompt: `Create a DOCX mini project guide: "LangGraph Multi-Agent Research Assistant". StateGraph: query → supervisor_node (routes to web_search/code_exec/rag agents) → writer_agent → human_review interrupt → stream final answer. PostgresSaver for multi-session memory. FastAPI streaming endpoint.` }
      },
      {
        d: "35–37", title: "CAPSTONE: DocuMind AI Platform", type: "capstone", topics: [
          { n: "Sprint 1: Core RAG backend", subs: ["FastAPI async + lifespan (DB pool/Redis/ML models)", "PDF/DOCX/TXT upload → Celery → chunking → embeddings → pgvector", "hybrid search + BGE reranker + GPT-4o streaming", "Redis idempotency keys for uploads"] },
          { n: "Sprint 2: LangGraph agent", subs: ["Multi-document reasoning StateGraph (5 nodes)", "query_analyzer→retriever→reranker→synthesizer→citation_formatter", "conditional routing: single vs multi-doc vs no-context", "PostgreSQL checkpointer + Kafka ingest events"] },
          { n: "Sprint 3: Production", subs: ["RAGAS eval pipeline in CI", "Kubernetes: HPA on FastAPI pods", "Prometheus: query latency/retrieval precision/token cost", "React frontend: drag-drop/streaming chat/citation highlighting"] },
        ],
        prompt: `Create a comprehensive DOCX project guide titled "AI/LLM Capstone: DocuMind — Intelligent Document Intelligence Platform". Sprint 1: FastAPI async backend (lifespan, document ingestion: PDF→Celery→chunking→BGE-M3→pgvector, RAG query: hybrid+BGE reranker→GPT-4o→streaming, Redis idempotency, PostgreSQL schema). Sprint 2: LangGraph multi-document agent (5 nodes, conditional routing, PostgreSQL checkpointer, Kafka ingest events). Sprint 3: RAGAS eval in CI, Kubernetes HPA, Prometheus custom metrics, Grafana, React frontend (drag-drop/streaming/citation highlighting/infinite scroll). Complete code all sprints. ~100-page DOCX.`,
        project: { type: "capstone", name: "DocuMind AI Platform", desc: "RAG: FastAPI + LangGraph + pgvector + Kafka + Redis + K8s + React. RAGAS eval in CI. Full HLD/LLD.", stack: ["FastAPI", "LangGraph", "pgvector", "Kafka", "Redis", "Kubernetes", "React", "RAGAS"], prompt: `Create a DOCX capstone guide: "DocuMind AI Platform". Complete 3-sprint project: all FastAPI code, LangGraph agent, Celery tasks, Kafka consumer, K8s manifests, RAGAS eval script, React components. HLD + API docs for 20+ endpoints.` }
      },
    ]
  },
  {
    id: "p8", icon: "⚛️", title: "Phase 8 — React, Next.js & TypeScript", days: "Days 38–44", tag: "Frontend", color: "#1baf7a",
    daysList: [
      {
        d: "38", title: "React Fundamentals", topics: [
          { n: "JSX & components", subs: ["JSX transpilation to React.createElement", "functional components + props destructuring", "children prop and composition pattern", "controlled vs uncontrolled components", "key prop and reconciliation"] },
          { n: "Props, state & useEffect", subs: ["useState: initial value/updater/batching (React 18)", "lifting state up and prop drilling problem", "immutable state updates (spread/Array methods)", "useEffect dependencies, cleanup, common mistakes (stale closure/infinite loop)", "useLayoutEffect vs useEffect"] },
          { n: "Suspense & error boundaries", subs: ["&& vs ternary vs early return patterns", "React.lazy + Suspense for code splitting", "Error boundary class component", "react-error-boundary library"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "React.js Fundamentals: Components to Hooks" covering: JSX & components (transpilation, props, children, controlled vs uncontrolled, key prop, Fragment), Props & state (useState batching React 18, lifting state, immutable updates, derived state anti-pattern), useEffect (all dependency patterns, cleanup, infinite loop/stale closure mistakes, useLayoutEffect, Strict Mode double-invoke), Conditional rendering (&&/ternary/early return), Suspense + lazy loading, Error boundaries. Full TSX code + common interview questions.`,
        project: { type: "mini", name: "React Kanban Board", desc: "Drag-drop between TODO/IN_PROGRESS/DONE, add/delete/edit tasks, custom useDragDrop hook, filter by priority. useState + useReducer.", stack: ["React", "TypeScript", "custom hooks"], prompt: `Create a DOCX mini project guide: "React Kanban Board (No Libraries)". Drag-drop between 3 columns, add/edit/delete tasks with modal, filter by priority, custom useDragDrop hook, useReducer for task state. TypeScript throughout. Full code.` }
      },
      {
        d: "39", title: "React Advanced + State Management", topics: [
          { n: "10 production custom hooks", subs: ["useLocalStorage, useFetch, useDebounce", "useThrottle, useIntersectionObserver, useMediaQuery", "usePrevious, useClickOutside, useKeyPress, useWebSocket"] },
          { n: "Context API & useReducer", subs: ["createContext/useContext/Provider", "re-render performance + context splitting pattern", "useReducer: (state, action) → newState", "combining useReducer + Context (Redux-lite)"] },
          { n: "Redux Toolkit (RTK) & RTK Query", subs: ["createSlice: reducers/actions/initialState", "configureStore + useSelector/useDispatch", "RTK Query: createApi, query + mutation endpoints", "optimistic updates + invalidatesTags"] },
          { n: "TanStack Query, TypeScript & Zod", subs: ["useQuery (queryKey/queryFn/staleTime)", "useMutation + invalidateQueries", "useInfiniteQuery for infinite scroll", "Zod + React Hook Form integration"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "React Advanced: Custom Hooks, Context & State Management" covering: 10 production custom hooks (useLocalStorage/useFetch/useDebounce/useThrottle/useIntersectionObserver/useMediaQuery/usePrevious/useClickOutside/useKeyPress/useWebSocket, full code each), Context & useReducer (re-render perf, context splitting, action types, Redux-lite pattern), Redux Toolkit (createSlice, RTK Query: createApi/optimistic updates/invalidatesTags), TanStack Query (useQuery/useMutation/useInfiniteQuery), TypeScript React (typing, generics, utility types), Zod + React Hook Form.`,
        project: { type: "mini", name: "React Admin Dashboard", desc: "RTK Query for users/products/orders, Redux slice for UI state, TanStack Query for analytics, useDebounce search, Zod on add-product form.", stack: ["React", "Redux Toolkit", "RTK Query", "TanStack Query", "TypeScript", "Zod"], prompt: `Create a DOCX mini project guide: "React Admin Dashboard". RTK Query fetching users/products/orders (msw mock), Redux slice for UI state (filters/sort/selected rows), TanStack Query for analytics chart, custom useDebounce (300ms), Zod+React Hook Form on add-product modal. TypeScript throughout.` }
      },
      {
        d: "40", title: "Next.js 14", topics: [
          { n: "App Router architecture", subs: ["page.tsx/layout.tsx/loading.tsx/error.tsx/not-found.tsx", "route groups: (group) folders", "dynamic routes: [id]/[...slug]/[[...slug]]", "parallel routes: @modal", "intercepting routes for modals"] },
          { n: "Server vs Client components", subs: ["Server Components: default, no hooks, async fetch()", "Client Components: 'use client' directive, interactive", "composition: Server wraps Client"] },
          { n: "Server Actions & data fetching", subs: ["'use server' directive in functions", "form actions + useFormState + useFormStatus", "revalidatePath() and revalidateTag()", "useOptimistic for optimistic UI", "fetch() caching: force-cache/no-store", "ISR: revalidate: 60", "Suspense streaming boundaries"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Next.js 14: App Router, Server Components & Server Actions" covering: App Router (all special files, route groups, dynamic routes, parallel @modal routes, intercepting routes), Server vs Client components (rendering model, composition pattern, async data fetching), Data fetching (fetch() cache options, ISR revalidate, dynamic rendering triggers, Promise.all parallel, Suspense streaming), Server Actions ('use server', form actions, useFormState/useFormStatus, revalidatePath/revalidateTag, useOptimistic), API routes & middleware (route.ts, NextRequest/NextResponse, matcher, Edge vs Node runtime), Image & font optimization. Full TypeScript code.`,
        project: { type: "mini", name: "Job Board Frontend (Next.js 14)", desc: "Server Components for listings (ISR 60s), Client for search/filter, Server Action for applying, Suspense, parallel route for job modal.", stack: ["Next.js 14", "TypeScript", "App Router", "Server Actions", "TanStack Query"], prompt: `Create a DOCX mini project guide: "Next.js 14 Job Board Frontend". Server Components for job listing (ISR revalidate:60), Client Component for search+useDebounce, Server Action for job application (revalidatePath), Suspense boundary, parallel route for @modal job detail, next/image for company logos.` }
      },
      {
        d: "41–44", title: "CAPSTONE: DocuMind Frontend", type: "capstone", topics: [
          { n: "Pages & routing", subs: ["/ landing (hero/features/pricing)", "/dashboard (doc list/upload/recent)", "/documents/[id] (viewer + chat)", "/settings (profile/API keys/usage)"] },
          { n: "Core features", subs: ["drag-drop upload with TanStack Query progress mutation", "streaming chat with EventSource ReadableStream", "citation highlighting: click → scroll to PDF source chunk", "infinite scroll with useInfiniteQuery"] },
          { n: "State, validation & patterns", subs: ["Zustand: active document/chat history/UI state", "Zod schemas for all forms", "React Hook Form + Zod on upload settings", "optimistic UI on message send (useOptimistic)", "Server Actions for deletion + revalidatePath"] },
        ],
        prompt: `Create a comprehensive DOCX project guide titled "Frontend Capstone: DocuMind AI React + Next.js Frontend". Pages (landing/dashboard/documents/[id]/settings), drag-drop upload with TanStack Query progress, streaming chat via EventSource ReadableStream, citation highlighting (click → scroll to source), infinite scroll with useInfiniteQuery, Zustand store (active doc/chat history/sidebar), Zod+React Hook Form on all forms, optimistic UI with useOptimistic, Next.js Server Components + Server Actions, dark/light mode with next-themes, Tailwind+shadcn/ui, Vercel deployment. Full TypeScript code. ~60-page DOCX.`,
        project: { type: "capstone", name: "DocuMind AI Frontend", desc: "Next.js 14: streaming chat, drag-drop upload, citation highlighting, infinite scroll, Zustand, Zod forms, Server Actions, dark mode.", stack: ["Next.js 14", "TypeScript", "Zustand", "TanStack Query", "Zod", "shadcn/ui", "Tailwind"], prompt: `Create a DOCX capstone guide: "DocuMind AI Frontend". Complete Next.js 14 project: all pages/components, Zustand store, TanStack Query hooks, streaming chat (EventSource), citation highlighting, Zod schemas, shadcn/ui. Folder structure + Vercel deployment.` }
      },
    ]
  },
  {
    id: "p9", icon: "🐳", title: "Phase 9 — Docker, Kubernetes & AWS", days: "Days 45–52", tag: "DevOps", color: "#2a78d6",
    daysList: [
      {
        d: "45", title: "Docker", topics: [
          { n: "Dockerfile & multi-stage builds", subs: ["FROM/RUN/COPY/ADD/WORKDIR/ENV/ARG/EXPOSE/CMD/ENTRYPOINT", "COPY vs ADD, CMD vs ENTRYPOINT (exec vs shell form)", ".dockerignore and layer caching (requirements.txt first)", "multi-stage: FROM...AS builder + COPY --from=builder", "800MB→50MB with distroless/Alpine base images"] },
          { n: "Docker Compose", subs: ["services/networks/volumes configuration", "depends_on with condition: service_healthy + healthcheck", "env_file and named vs bind mount vs tmpfs volumes", "profiles for optional services", "docker-compose.override.yml for dev overrides"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Docker: Containers from Dev to Production" covering: Dockerfile (all instructions, COPY vs ADD, CMD vs ENTRYPOINT exec/shell form, .dockerignore, layer caching ordering), Multi-stage builds (builder pattern, 800MB→50MB, Python wheels, distroless/Alpine), Docker Compose (all config, depends_on with healthcheck, env_file, all volume types, profiles, override files), Networking & volumes (all network types, DNS, named volumes). Build Django+Celery+Postgres+Redis stack. Image <150MB.`,
        project: { type: "mini", name: "Dockerized FastAPI Stack", desc: "Multi-stage Dockerfile (builder+Alpine), Compose: FastAPI+PostgreSQL+Redis+Celery+Beat+Flower+Nginx. Healthchecks on all. Image <150MB.", stack: ["Docker", "Docker Compose", "nginx", "Alpine"], prompt: `Create a DOCX mini project guide: "Dockerize FastAPI Chat Application". Multi-stage Dockerfile (builder for pip wheels + final Alpine). Docker Compose with healthchecks: FastAPI, PostgreSQL, Redis, Celery worker, Beat, Flower, Nginx. Final image <150MB. nginx.conf for WebSocket proxying.` }
      },
      {
        d: "46", title: "Kubernetes Fundamentals", topics: [
          { n: "Core workload objects", subs: ["Pod: spec/containers/resources/liveness+readiness probes", "Deployment: replicas/RollingUpdate/revisionHistoryLimit", "DaemonSet: one pod per node", "StatefulSet: ordered deployment/stable network identity"] },
          { n: "Services, ConfigMaps & Secrets", subs: ["ClusterIP/NodePort/LoadBalancer/ExternalName", "DNS: service.namespace.svc.cluster.local", "ConfigMap: env/envFrom/volume mounting", "Secret types: Opaque/TLS", "Sealed Secrets + External Secrets Operator"] },
          { n: "kubectl essentials", subs: ["CRUD: apply/get/describe/delete/edit", "Debugging: logs/exec/port-forward/cp", "Rolling updates: set image/rollout status/history/undo", "JSONPath queries in get output"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Kubernetes: Container Orchestration from Zero" covering: Core objects (Pod with resources/liveness/readiness probes, Deployment with RollingUpdate, DaemonSet, StatefulSet), Services (ClusterIP/NodePort/LoadBalancer, DNS format), ConfigMaps & Secrets (all mounting methods, Sealed Secrets, External Secrets Operator), Namespaces (ResourceQuota, LimitRange, network policies), kubectl (all CRUD, debugging: logs/exec/port-forward, rollout history/undo, JSONPath, explain). Full YAML manifests.`,
        project: { type: "mini", name: "FastAPI on Kubernetes", desc: "Deployment (3 replicas, rolling update, resource limits), Service, ConfigMap, Secret, liveness/readiness probes, rollback demo.", stack: ["Kubernetes", "kubectl", "YAML"], prompt: `Create a DOCX mini project guide: "Deploy FastAPI URL Shortener to Kubernetes". Deployment (3 replicas, RollingUpdate, resource limits 200m CPU/256Mi), ClusterIP Service, ConfigMap, Secret for DB credentials, liveness probe /health, readiness probe /ready, rollback demonstration with rollout undo. Full YAML.` }
      },
      {
        d: "47", title: "Kubernetes Advanced", topics: [
          { n: "Ingress, HPA & KEDA", subs: ["Nginx Ingress + Cert-Manager automatic TLS", "HPA: CPU/memory targets", "custom metrics HPA (requests per second)", "KEDA: event-driven scaling (Kafka lag/queue depth)", "PodDisruptionBudget for availability"] },
          { n: "Helm charts", subs: ["Chart.yaml/values.yaml/templates/ structure", "{{ .Values.image.tag }} template syntax", "_helpers.tpl for reusable templates", "helm install/upgrade/rollback/lint/template", "pre-install migration job hooks"] },
          { n: "RBAC & PersistentVolumes", subs: ["ServiceAccount/Role/ClusterRole/RoleBinding", "kubectl auth can-i auditing", "PV/PVC with dynamic StorageClass", "StatefulSet volumeClaimTemplates"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Kubernetes Advanced: Ingress, HPA, Helm & RBAC" covering: Ingress (Nginx Controller annotations, Cert-Manager TLS, path vs host routing), Persistent Volumes (PV/PVC, StorageClass, access modes, StatefulSet volumeClaimTemplates, resizing), HPA & KEDA (CPU/memory HPA, custom metrics, KEDA with Kafka lag, PodDisruptionBudget), Helm (Chart.yaml, values.yaml, template syntax, helpers, install/upgrade/rollback/lint, pre-install migration hooks), RBAC (all objects, least privilege, auth can-i audit, Pod securityContext). Full YAML + Helm chart.`,
        project: { type: "mini", name: "DocuMind K8s Production Setup", desc: "Helm chart for all services, Nginx Ingress + TLS, HPA on FastAPI (70% CPU), KEDA on Celery (Kafka lag), PVC for PostgreSQL, RBAC.", stack: ["Kubernetes", "Helm", "Ingress", "KEDA", "cert-manager", "RBAC"], prompt: `Create a DOCX mini project guide: "Production Kubernetes for DocuMind". Helm chart: Deployment/Service/ConfigMap/Secret/HPA templates. Nginx Ingress with cert-manager TLS. FastAPI HPA (targetCPU: 70%, min:2/max:10). KEDA ScaledObject for Celery (Kafka lag threshold: 100). PostgreSQL StatefulSet PVC (50Gi). RBAC for service accounts.` }
      },
      {
        d: "48–49", title: "AWS Deep Dive", topics: [
          { n: "Core services", subs: ["EC2: instance types/AMIs/user data/instance profiles", "VPC: subnets (public/private)/route tables/IGW/NAT", "S3: bucket policies/presigned URLs/lifecycle/versioning", "RDS: Multi-AZ/read replicas/parameter groups", "IAM: users/groups/roles/policies/STS assume role"] },
          { n: "Serverless", subs: ["Lambda: handler/event/context, layers, cold start optimization", "triggers: API GW/S3/SQS/EventBridge/Cognito", "concurrency: reserved and provisioned", "API Gateway: REST vs HTTP API vs WebSocket API"] },
          { n: "SQS, SNS & data services", subs: ["SQS standard vs FIFO, visibility timeout, DLQ", "SNS fan-out: SNS → multiple SQS queues", "MSK (Managed Kafka) + ElastiCache (Redis Cluster)", "DynamoDB: partition key design/GSI/LSI/Streams"] },
          { n: "Cognito & Step Functions", subs: ["User Pools: JWT tokens + triggers", "Cognito + API Gateway authorizer", "WAF: rate limiting + OWASP rules", "Step Functions: states/error handling/Express vs Standard"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "AWS for Backend Engineers: Core to Serverless" covering: Core services (EC2/VPC/SGs/S3/RDS Multi-AZ/IAM with boto3 code), Serverless (Lambda: all trigger types/concurrency/cold start, API Gateway REST vs HTTP vs WebSocket, Lambda+RDS Proxy), SQS & SNS (standard vs FIFO/DLQ/fan-out, SQS+Lambda batch), Data services (MSK, ElastiCache Redis Cluster, DynamoDB patterns, Athena), Cognito (User Pools+JWT, WAF), EventBridge and Step Functions. Full boto3 Python code.`,
        project: { type: "mini", name: "Serverless Thumbnail Generator", desc: "S3 upload → Lambda (Pillow) → thumbnail to S3 → SNS → SQS audit → Lambda writes to DynamoDB. API Gateway for manual re-processing.", stack: ["AWS Lambda", "S3", "SNS", "SQS", "DynamoDB", "API Gateway", "boto3"], prompt: `Create a DOCX mini project guide: "Serverless Thumbnail Generator". S3 upload → Lambda (Python+Pillow, resize 200x200) → thumbnails/ prefix → SNS → SQS audit queue → second Lambda writes to DynamoDB. API Gateway POST /reprocess/{key}. Full code + SAM template.` }
      },
      {
        d: "50–52", title: "CAPSTONE: CI/CD + Full Observability", type: "capstone", topics: [
          { n: "GitHub Actions pipeline", subs: ["lint (ruff+mypy) → test (pytest+coverage) → build Docker → push ECR → deploy EKS", "matrix strategy: Python 3.11+3.12", "secrets management + Slack notification on failure", "pip cache between runs"] },
          { n: "Observability: Prometheus + Grafana", subs: ["FastAPI /metrics with prometheus-client", "custom metrics: query_latency_histogram/websocket_gauge/docs_processed_counter", "5 Grafana dashboards (API/Celery/Kafka/PostgreSQL/Redis)", "AlertManager: PagerDuty + Slack routing + alert rules"] },
          { n: "Distributed tracing & logging", subs: ["OpenTelemetry Python SDK auto-instrumentation (FastAPI/SQLAlchemy/Redis/Celery)", "Jaeger as tracing backend", "trace context propagation via Kafka headers", "python-json-logger + correlation ID middleware", "Fluentd → Elasticsearch → Kibana (EFK)"] },
          { n: "Nginx production config", subs: ["SSL termination + Let's Encrypt", "rate limiting: 100 req/min per IP", "Gzip compression + WebSocket upgrade headers", "security headers: HSTS/CSP/X-Frame-Options"] },
        ],
        prompt: `Create a comprehensive DOCX project guide titled "DevOps Capstone: CI/CD + Full Observability for DocuMind". GitHub Actions (lint:ruff+mypy → test:pytest+coverage → build+push ECR → deploy EKS, matrix Python 3.11+3.12, secrets, Slack notification, pip cache), Prometheus (FastAPI /metrics, custom metrics: query_latency_histogram/websocket_gauge/docs_processed_counter, 5 Grafana dashboards, AlertManager PagerDuty+Slack, alert rules: p99>2s/error>1%/lag>10k), OpenTelemetry (auto-instrumentation for FastAPI/SQLAlchemy/Redis/Celery, Jaeger, trace context in Kafka headers), Structured logging (python-json-logger, correlation ID, EFK), Nginx production (SSL/rate limiting/gzip/WebSocket/security headers). All YAML workflows + nginx.conf + runbook. ~80-page DOCX.`,
        project: { type: "capstone", name: "Full CI/CD + Observability", desc: "GitHub Actions for DocuMind, Prometheus+Grafana+AlertManager, OpenTelemetry+Jaeger, EFK logging, production Nginx. Full runbook.", stack: ["GitHub Actions", "Prometheus", "Grafana", "OpenTelemetry", "Jaeger", "EFK", "Nginx", "ECR", "EKS"], prompt: `Create a DOCX capstone guide: "Production CI/CD + Observability". All GitHub Actions YAML, prometheus-client custom metrics code, Grafana dashboard descriptions, AlertManager YAML, OpenTelemetry setup, nginx.conf. Runbook: debugging p99 latency spike.` }
      },
    ]
  },
  {
    id: "p10", icon: "🏗️", title: "Phase 10 — System Design, Go & DSA", days: "Days 53–60", tag: "Architecture", color: "#4a3aa7",
    daysList: [
      {
        d: "53–54", title: "System Design Fundamentals", topics: [
          { n: "Scalability & CAP theorem", subs: ["vertical vs horizontal scaling limits", "load balancing: Round Robin/LeastConn/Consistent Hashing", "CDN + cache invalidation strategies", "CAP theorem: CP (PostgreSQL) vs AP (Cassandra) systems", "eventual consistency + conflict resolution"] },
          { n: "Distributed patterns", subs: ["Saga pattern: choreography vs orchestration", "Outbox pattern for reliable event publishing", "CQRS: separate read/write models", "Event sourcing: event log as source of truth", "2PC and why it's avoided"] },
          { n: "Rate limiting algorithms", subs: ["token bucket: burst handling", "leaky bucket: smooth output", "fixed window: boundary problem", "sliding window log: accurate", "sliding window counter: efficient", "Redis distributed rate limiting"] },
          { n: "5 system design problems solved", subs: ["URL shortener (base62, DB sharding)", "Chat system (WebSocket, message storage, presence)", "Notification service (fan-out, APNs/FCM)", "Rate limiter (Redis sliding window counter)", "Job queue system (Kafka + workers + retry)"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "System Design: Fundamentals to Distributed Patterns" covering: Scalability (vertical vs horizontal, stateless vs stateful, all load balancing algorithms, CDN, PgBouncer), CAP theorem (CP vs AP examples, eventual consistency, linearizability vs serializability), Distributed patterns (Saga: choreography vs orchestration, Outbox pattern, CQRS, Event sourcing, 2PC pitfalls), Rate limiting algorithms (all 5 + Redis distributed implementation), 5 fully solved problems with architecture diagrams in text: URL Shortener/Chat System/Notification Service/Rate Limiter/Job Queue.`,
        project: { type: "mini", name: "System Design Portfolio Doc", desc: "5 complete designs: HLD + component breakdown + data model + scaling strategy + failure modes for each.", stack: ["Architecture", "System Design"], prompt: `Create a DOCX portfolio: "System Design: 5 Complete Designs". For URL Shortener/Chat System/Notification Service/Rate Limiter/Job Queue: HLD with components, data model, API design, scaling strategy, top 3 failure modes + mitigations. Portfolio-ready.` }
      },
      {
        d: "55–56", title: "Microservices & Advanced Architecture", topics: [
          { n: "Service decomposition & communication", subs: ["DDD: bounded contexts/aggregates/entities", "strangler fig pattern for monolith migration", "database-per-service + data consistency challenges", "REST vs gRPC (protobuf, all streaming types) vs GraphQL", "async via Kafka + service discovery"] },
          { n: "Service mesh & event sourcing", subs: ["Istio: Envoy sidecar, mTLS between services", "traffic management: canary/circuit breaker/retries", "event store design + projections (read models)", "snapshots for long event histories"] },
          { n: "5 advanced system designs", subs: ["Instagram: media upload/feed generation/follow graph", "Uber: real-time location/matching/surge pricing", "YouTube: upload pipeline/transcoding/streaming", "Distributed Cache (Redis-like from scratch)", "Search autocomplete (trie/prefix tree at scale)"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Microservices Architecture: Patterns & Production" covering: Service decomposition (DDD bounded contexts, strangler fig, shared DB anti-pattern, database-per-service), Service communication (REST vs gRPC: all streaming types vs GraphQL, async Kafka, request-reply, service discovery), Service mesh Istio (Envoy sidecar, mTLS, traffic management), Event sourcing & CQRS (event store, projections, snapshots, replay), 5 advanced system designs: Instagram/Uber/YouTube/Distributed Cache/Autocomplete with architecture diagrams in text.`,
        project: { type: "mini", name: "Advanced System Designs Doc", desc: "Instagram, Uber, YouTube, Distributed Cache, Autocomplete — HLD + data models + algorithms + scaling + failure modes.", stack: ["Architecture", "Distributed Systems"], prompt: `Create a DOCX: "Advanced System Design: 5 Deep Dives". For Instagram/Uber/YouTube/Distributed Cache/Autocomplete: full HLD, data model, critical algorithms (consistent hashing/geohash/fanout/trie), scaling to 100M users, top 3 failure modes. Portfolio-ready.` }
      },
      {
        d: "57", title: "Go (Golang)", topics: [
          { n: "Go basics", subs: ["types/structs/interfaces/embedding", "goroutines + channels (unbuffered/buffered/select/done pattern)", "defer/panic/recover", "error handling: errors.Is/As/wrapping", "packages + modules: go.mod/go.sum"] },
          { n: "Go for backend", subs: ["net/http standard library handlers", "gin framework: routing/middleware/binding/validation", "database/sql + sqlx for PostgreSQL", "gRPC: .proto file, service definition, unary + streaming", "testing: TestXxx, table-driven tests, t.Parallel(), benchmarks"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "Go for Backend Engineers: Zero to Production" covering: Go basics (all types, structs, interfaces, embedding, goroutines+channels: unbuffered/buffered/select/done, defer/panic/recover, error handling: errors.Is/As/wrapping, go.mod), Go for backend (net/http, gin: routing/middleware/binding, database/sql+sqlx for PostgreSQL, gRPC: .proto/service def/unary+streaming/protoc codegen, testing: table-driven, t.Parallel(), benchmarks). Full Go code throughout.`,
        project: { type: "mini", name: "Go gRPC Microservice", desc: "Proto file for UserService, Go impl with sqlx+PostgreSQL, gin HTTP gateway calling gRPC, multi-stage Dockerfile, 15 table-driven tests.", stack: ["Go", "gRPC", "gin", "PostgreSQL", "Docker"], prompt: `Create a DOCX mini project guide: "Go gRPC User Service". .proto definition (GetUser/CreateUser/ListUsers), Go server with sqlx+PostgreSQL, gin HTTP gateway → gRPC, multi-stage Dockerfile (builder→scratch), 15 table-driven tests. Full Go code.` }
      },
      {
        d: "58", title: "DSA Mastery", topics: [
          { n: "Arrays, strings & trees (15 patterns)", subs: ["two pointers (fast+slow / left+right)", "sliding window (fixed/variable size)", "prefix sum and Kadane's algorithm", "binary search: all variants (first/last/answer space)", "BFS/DFS for trees and graphs", "topological sort (Kahn's / DFS)", "Union-Find (DSU) with path compression"] },
          { n: "DP patterns (10 patterns)", subs: ["0/1 knapsack and unbounded knapsack", "LCS and LIS (O(n log n) with binary search)", "interval DP and matrix chain", "bitmask DP for subset problems", "digit DP for counting in ranges", "state machine DP (buy/sell stocks)", "tree DP and partition DP"] },
          { n: "Advanced DSA", subs: ["Segment tree: range queries + point updates", "BIT (Fenwick tree): prefix sum + point updates", "monotonic stack and deque problems", "Trie: insert/search/startsWith", "30-day LeetCode plan: Week1-4 progression"] },
        ],
        prompt: `Create a comprehensive DOCX study guide titled "DSA for Backend Interviews: Patterns to Advanced" covering: Arrays & Strings (15 patterns: two pointers/sliding window/prefix sum/Kadane/binary search variants — each: concept + Python template + 3 LeetCode problems solved), Trees & Graphs (BFS/DFS/topological sort/Union-Find/Dijkstra/Bellman-Ford/MST/tree DP/LCA/trie), Dynamic Programming (10 patterns: 0-1 knapsack through tree DP — recursion→memoization→tabulation progression), Advanced DSA (Segment tree/BIT/monotonic stack/Trie), 30-day LeetCode plan. Format as professional DOCX.`,
        project: { type: "mini", name: "DSA Patterns Cheatsheet", desc: "30 patterns: recognition keywords, Python template, T/S complexity, 3 LeetCode problems per pattern. Quick-reference DOCX.", stack: ["Python", "Algorithms", "Data Structures"], prompt: `Create a DOCX cheatsheet: "30 Algorithm Patterns Reference". For each pattern: name, 3 recognition keywords, Python template (5-10 lines), T/S complexity, 3 LeetCode problem numbers+names. 2 patterns per page. Quick-reference format.` }
      },
      {
        d: "59–60", title: "GRAND CAPSTONE: TradeFlow Fintech Platform", type: "capstone", topics: [
          { n: "6 microservices", subs: ["user-service: Django+DRF+JWT+Cognito", "market-data-service: FastAPI+WebSocket+Kafka producer for price ticks", "trade-service: FastAPI+Kafka+Redlock+idempotent execution", "portfolio-service: FastAPI+CQRS+TimescaleDB", "notification-service: FastAPI+WebSocket+Celery", "api-gateway: Nginx+FastAPI proxy"] },
          { n: "Data flows", subs: ["Market data: external API→WebSocket→Kafka(price-ticks)→portfolio P&L→WebSocket client", "Trade execution: client→gateway→trade-service→Redlock→validate→Kafka(trade-events)→portfolio→notification", "Outbox pattern for reliable DB→Kafka publishing"] },
          { n: "LangGraph AI trading assistant", subs: ["User asks 'Should I buy AAPL?'", "StateGraph: query→retriever(market data+news)→analysis_agent→risk_agent→human_approval→execute_trade"] },
          { n: "Infrastructure & performance", subs: ["EKS cluster: 6 services with KEDA (Kafka-lag scaling)", "MSK + ElastiCache Redis Cluster + RDS PostgreSQL+TimescaleDB", "GitHub Actions per-service CI/CD", "Full Prometheus+Grafana+Jaeger observability", "Target: 10,000 trades/minute with locust benchmark"] },
        ],
        prompt: `Create a comprehensive DOCX project guide titled "Grand Capstone: TradeFlow — Fintech Microservices Platform". 6 microservices (user/market-data/trade/portfolio/notification + api-gateway) with complete code. Full data flows (market data: external→Kafka(price-ticks)→portfolio P&L→WebSocket; trade execution: client→Redlock→validate→Kafka(trade-events)→portfolio→notification; Outbox pattern). LangGraph AI trading assistant (query→retriever→analysis_agent→risk_agent→human_approval→execute). EKS (KEDA Kafka-lag scaling), MSK, ElastiCache, RDS+TimescaleDB. Per-service CI/CD. Full observability. Locust: 10k trades/min. Interview talking points for every architecture decision. ~120-page DOCX.`,
        project: { type: "capstone", name: "TradeFlow Fintech Platform", desc: "6 microservices: real-time trading, market data, portfolio CQRS, LangGraph AI assistant. EKS+MSK+TimescaleDB. 10k trades/min target.", stack: ["FastAPI", "Django", "Kafka", "Redis", "PostgreSQL", "TimescaleDB", "LangGraph", "EKS", "KEDA", "GitHub Actions"], prompt: `Create a DOCX grand capstone guide: "TradeFlow Fintech Platform". Complete code for all 6 microservices, LangGraph trading assistant, Kafka topic design, K8s manifests + Helm charts, AWS architecture diagram in text, locust benchmark, interview talking points for every architecture decision.` }
      },
    ]
  },
];

const TAGS = ["All", "Backend", "Databases", "AI/ML", "Frontend", "DevOps", "Architecture"];

const STORAGE_KEY = "rm60_v3";
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
}
function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

export default function App() {
  const [tag, setTag] = useState("All");
  const [search, setSearch] = useState("");
  const [openPhases, setOpenPhases] = useState({});
  const [openDays, setOpenDays] = useState({});
  const [checked, setChecked] = useState({});

  useEffect(() => {
    const s = loadState();
    setChecked(s.checked || {});
    setOpenPhases(s.openPhases || {});
    setOpenDays(s.openDays || {});
  }, []);

  function persist(next) {
    saveState({ checked: next.checked ?? checked, openPhases: next.openPhases ?? openPhases, openDays: next.openDays ?? openDays });
  }

  function togglePhase(id) {
    const next = { ...openPhases, [id]: !openPhases[id] };
    setOpenPhases(next);
    persist({ openPhases: next });
  }
  function toggleDay(id) {
    const next = { ...openDays, [id]: !openDays[id] };
    setOpenDays(next);
    persist({ openDays: next });
  }
  function toggleSub(key) {
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    persist({ checked: next });
  }
  function toggleTopic(pid, d, tn, subs) {
    const allDone = subs.every(s => checked[`${pid}|${d}|${tn}|${s}`]);
    const next = { ...checked };
    subs.forEach(s => { next[`${pid}|${d}|${tn}|${s}`] = !allDone; });
    setChecked(next);
    persist({ checked: next });
  }

  function countAll() {
    let t = 0, d = 0;
    PHASES.forEach(p => p.daysList.forEach(day => day.topics.forEach(tp => {
      tp.subs.forEach(s => { t++; if (checked[`${p.id}|${day.d}|${tp.n}|${s}`]) d++; });
    })));
    return { t, d };
  }
  function phaseProg(p) {
    let t = 0, d = 0;
    p.daysList.forEach(day => day.topics.forEach(tp => {
      tp.subs.forEach(s => { t++; if (checked[`${p.id}|${day.d}|${tp.n}|${s}`]) d++; });
    }));
    return { t, d };
  }

  const { t: total, d: done } = countAll();
  const pct = total ? Math.round(done / total * 100) : 0;

  const q = search.toLowerCase();
  const filtered = PHASES.filter(p => tag === "All" || p.tag === tag);

  function copyPrompt(text, e) {
    e.stopPropagation();
    navigator.clipboard.writeText(text).catch(() => {});
    const btn = e.currentTarget;
    btn.textContent = "Copied!";
    setTimeout(() => btn.textContent = "Copy", 1500);
  }

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", padding: "16px", maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>60-Day Full-Stack Roadmap</h1>
      <p style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>Day-wise plan · Copy-paste DOCX prompts · Mini & capstone projects · Click subtopics to track progress</p>

      {/* Search */}
      <input
        type="text" placeholder="Search days, topics, projects..."
        value={search} onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, marginBottom: 12, outline: "none" }}
      />

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {TAGS.map(t => (
          <button key={t} onClick={() => setTag(t)}
            style={{ fontSize: 12, padding: "4px 12px", borderRadius: 16, border: "1px solid", cursor: "pointer", borderColor: tag === t ? "#4f46e5" : "#ddd", background: tag === t ? "#ede9fe" : "transparent", color: tag === t ? "#4f46e5" : "#666", fontWeight: tag === t ? 600 : 400 }}>
            {t}
          </button>
        ))}
      </div>

      {/* Global progress */}
      <div style={{ background: "#f8f8f8", border: "1px solid #eee", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, color: "#888", whiteSpace: "nowrap" }}>Overall progress</span>
        <div style={{ flex: 1, height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "#4f46e5", borderRadius: 3, transition: "width .4s" }} />
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#4f46e5", whiteSpace: "nowrap" }}>{done}/{total} subtopics</span>
      </div>

      {/* Phases */}
      {filtered.map(phase => {
        const { t: pt, d: pd } = phaseProg(phase);
        const ppct = pt ? Math.round(pd / pt * 100) : 0;
        const isOpen = openPhases[phase.id];

        const matchingDays = phase.daysList.filter(day =>
          !q || day.title.toLowerCase().includes(q) ||
          day.topics.some(tp => tp.n.toLowerCase().includes(q) || tp.subs.some(s => s.toLowerCase().includes(q)))
        );
        if (q && matchingDays.length === 0) return null;

        return (
          <div key={phase.id} style={{ marginBottom: 12, border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
            {/* Phase header */}
            <div onClick={() => togglePhase(phase.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", background: "#f9fafb", userSelect: "none" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: phase.color + "22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{phase.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#111" }}>{phase.title}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{phase.days} · {phase.tag}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <div>
                  <div style={{ width: 60, height: 4, background: "#e5e7eb", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${ppct}%`, height: "100%", background: phase.color, borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: 10, color: "#aaa", textAlign: "right", marginTop: 2 }}>{pd}/{pt}</div>
                </div>
                <span style={{ fontSize: 18, color: "#aaa", transition: "transform .2s", display: "inline-block", transform: isOpen ? "rotate(180deg)" : "none" }}>›</span>
              </div>
            </div>

            {/* Days */}
            {isOpen && (
              <div style={{ borderTop: "1px solid #e5e7eb" }}>
                {phase.daysList.map(day => {
                  const dk = `${phase.id}|${day.d}`;
                  const isDayOpen = openDays[dk];
                  const isCapstone = day.type === "capstone";

                  const qMatch = !q || day.title.toLowerCase().includes(q) ||
                    day.topics.some(tp => tp.n.toLowerCase().includes(q) || tp.subs.some(s => s.toLowerCase().includes(q)));
                  if (!qMatch) return null;

                  return (
                    <div key={dk} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      {/* Day header */}
                      <div onClick={() => toggleDay(dk)}
                        style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", cursor: "pointer", background: isDayOpen ? "#fafafa" : "#fff", userSelect: "none" }}>
                        <span style={{ fontSize: 11, color: "#aaa", width: 38, flexShrink: 0 }}>Day {day.d}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "#222", flex: 1 }}>{day.title}</span>
                        {isCapstone && (
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 8, background: "#fef3c7", color: "#92400e", fontWeight: 600, marginRight: 4 }}>🏆 Capstone</span>
                        )}
                        {day.project && !isCapstone && (
                          <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 8, background: "#ede9fe", color: "#4f46e5", fontWeight: 600, marginRight: 4 }}>⚙️ Project</span>
                        )}
                        <span style={{ fontSize: 16, color: "#bbb", transition: "transform .2s", display: "inline-block", transform: isDayOpen ? "rotate(90deg)" : "none" }}>›</span>
                      </div>

                      {/* Day body */}
                      {isDayOpen && (
                        <div style={{ padding: "0 16px 14px" }}>
                          {/* Topics */}
                          {day.topics.map(tp => {
                            const allDone = tp.subs.every(s => checked[`${phase.id}|${day.d}|${tp.n}|${s}`]);
                            return (
                              <div key={tp.n} style={{ borderBottom: "1px solid #f3f4f6", paddingBottom: 8, marginBottom: 8 }}>
                                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginTop: 8 }}>
                                  <div onClick={() => toggleTopic(phase.id, day.d, tp.n, tp.subs)}
                                    style={{ width: 17, height: 17, borderRadius: 4, border: `2px solid ${allDone ? "#4f46e5" : "#d1d5db"}`, flexShrink: 0, marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", background: allDone ? "#4f46e5" : "white" }}>
                                    {allDone && <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>✓</span>}
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, fontWeight: 600, color: "#222", marginBottom: 4 }}>{tp.n}</div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 0" }}>
                                      {tp.subs.map(s => {
                                        const key = `${phase.id}|${day.d}|${tp.n}|${s}`;
                                        const isDone = checked[key];
                                        return (
                                          <div key={s} onClick={() => toggleSub(key)}
                                            style={{ display: "flex", alignItems: "center", gap: 5, padding: "2px 8px 2px 0", cursor: "pointer", width: "100%" }}>
                                            <div style={{ width: 13, height: 13, borderRadius: 3, border: `1.5px solid ${isDone ? "#10b981" : "#d1d5db"}`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: isDone ? "#10b981" : "white" }}>
                                              {isDone && <span style={{ color: "white", fontSize: 9, fontWeight: 700 }}>✓</span>}
                                            </div>
                                            <span style={{ fontSize: 12, color: isDone ? "#6b7280" : "#444", textDecoration: isDone ? "line-through" : "none" }}>{s}</span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}

                          {/* Prompt box */}
                          {day.prompt && (
                            <div style={{ marginTop: 10, background: "#f0f4ff", border: "1px solid #c7d2fe", borderLeft: "3px solid #4f46e5", borderRadius: 7, padding: "10px 12px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                <span style={{ fontSize: 11, fontWeight: 600, color: "#4f46e5" }}>📄 Copy-paste DOCX study guide prompt</span>
                                <button onClick={e => copyPrompt(day.prompt, e)}
                                  style={{ fontSize: 11, padding: "2px 8px", borderRadius: 5, border: "1px solid #4f46e5", color: "#4f46e5", background: "white", cursor: "pointer" }}>
                                  Copy
                                </button>
                              </div>
                              <div style={{ fontSize: 11, color: "#555", fontFamily: "monospace", lineHeight: 1.6 }}>
                                {day.prompt.substring(0, 320)}…
                              </div>
                            </div>
                          )}

                          {/* Project card */}
                          {day.project && (
                            <div style={{ marginTop: 10, background: day.project.type === "capstone" ? "#fffbeb" : "#f5f3ff", border: `1px solid ${day.project.type === "capstone" ? "#fcd34d" : "#c4b5fd"}`, borderRadius: 8, padding: "10px 12px" }}>
                              <div style={{ fontSize: 11, fontWeight: 600, color: day.project.type === "capstone" ? "#92400e" : "#4f46e5", marginBottom: 4 }}>
                                {day.project.type === "capstone" ? "🏆 Capstone Project" : "⚙️ Mini Project"}
                              </div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 3 }}>{day.project.name}</div>
                              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5, marginBottom: 6 }}>{day.project.desc}</div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                                {day.project.stack.map(s => (
                                  <span key={s} style={{ fontSize: 10, padding: "1px 7px", borderRadius: 8, background: "#e5e7eb", color: "#555" }}>{s}</span>
                                ))}
                              </div>
                              <button onClick={e => copyPrompt(day.project.prompt, e)}
                                style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: `1px solid ${day.project.type === "capstone" ? "#f59e0b" : "#7c3aed"}`, color: day.project.type === "capstone" ? "#92400e" : "#4f46e5", background: "white", cursor: "pointer" }}>
                                📋 Copy project guide prompt
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
