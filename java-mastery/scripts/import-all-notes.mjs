/**
 * import-all-notes.mjs
 * Copies all Java & Spring Boot markdown notes from Notes_Final into
 * src/content/lessons/ as MDX files (adds frontmatter if missing).
 *
 * Run from the java-mastery directory:
 *   node scripts/import-all-notes.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LESSONS_DIR = path.join(__dirname, '../src/content/lessons');

// Resolve the Notes_Final folder relative to the repo root
const NOTES_ROOT = path.join(__dirname, '../../../CodePlus/Notes_Final');

// ─── Java mappings ────────────────────────────────────────────────────────────
const JAVA_MAPPINGS = {
  // already existing (will overwrite/refresh from Notes_Final)
  'Java/OOP_Fundamentals_Java.md':                                 'oop-fundamentals',
  'Java/java-overview-study-guide.md':                             'how-java-works',
  'Java/java_variables_study_guide.md':                            'variables-primitive-types',
  'Java/Java_Variables_Part2_Reference_Types.md':                  'reference-types',
  'Java/java_float_double_ieee754_study_guide.md':                  'float-double-ieee754',
  'Java/java_operators_study_guide.md':                             'operators',
  'Java/java-methods-study-guide.md':                              'methods',
  'Java/Java_Constructors.md':                                     'constructors',
  'Java/java_types_of_classes_study_guide.md':                     'types-of-classes',
  'Java/Java_Classes_Part3_POJO_Enum_Final.md':                    'pojo-enum-final',
  'Java/java_interfaces_part1_study_guide.md':                     'interfaces-fundamentals',
  'Java/Java_Interfaces_Java8_Java9_Features.md':                  'interfaces-java8-java9',
  'Java/java-exception-handling-study-guide.md':                   'exception-handling',
  'Java/java-memory-management-study-guide.md':                    'memory-management',
  'Java/java-singleton-immutable-wrapper-study-guide.md':          'singleton-immutable-wrapper',
  'Java/Java_Collection_Framework_Study_Guide.md':                 'collection-framework',
  'Java/java_queue_comparator_comparable.md':                      'queue-comparator-comparable',
  'Java/java-functional-interfaces-lambda-study-guide.md':         'functional-interfaces-lambdas',
  'Java/Java_Generics.md':                                         'generics',
  'Java/Java_Annotations.md':                                      'annotations',
  'Java/java_reflection_study_guide.md':                           'reflection',
  'Java/Java_Control_Flow_Statements.md':                          'control-flow-statements',

  // NEW Java lessons
  'Java/java-set-collections-study-guide.md':                      'set-collections',
  'Java/java_map_hashmap_internals.md':                             'map-hashmap-internals',
  'Java/java_linkedhashmap_treemap.md':                             'linkedhashmap-treemap',
  'Java/Java_Deque_List_Implementations_Study_Guide.md':            'deque-list-implementations',
  'Java/Java_Set_Map_Sorting_Study_Guide.md':                       'set-map-sorting',
  'Java/Java_Streams_Study_Guide.md':                               'streams',
  'Java/Java_Future_Callable_CompletableFuture.md':                 'future-callable-completablefuture',
  'Java/java-multithreading-part1.md':                              'multithreading-part1',
  'Java/java-multithreading-part2-study-guide.md':                  'multithreading-part2',
  'Java/java-multithreading-part3.md':                              'multithreading-part3',
  'Java/java-multithreading-locks-study-guide.md':                  'multithreading-locks',
  'Java/java-multithreading-advanced-locks-study-guide.md':         'multithreading-advanced-locks',
  'Java/Java_Multithreading_Atomic_Volatile_ConcurrentCollections.md': 'atomic-volatile-concurrent',
  'Java/java-executors-and-fork-join-pool.md':                      'executors-fork-join',
  'Java/java_thread_pool_study_guide.md':                           'thread-pool',
  'Java/Java_Multithreading_ExecutorService_ShutdownVsAwaitTermination_ScheduledThreadPoolExecutor.md': 'executor-service-advanced',
  'Java/java-threadlocal-virtual-threads.md':                       'threadlocal-virtual-threads',
  'Java/Java_Lombok_Study_Guide.md':                                'lombok',
  'Java/Java16_Records.md':                                         'java16-records',
  'Java/Java21_Pattern_Matching_Switch_Study_Guide.md':             'java21-pattern-matching-switch',
  'Java/Java21_Sequenced_Collections.md':                           'java21-sequenced-collections',
  'Java/Java_14_Switch_Expressions_Complete_Guide.md':              'java14-switch-expressions',
  'Java/java-pattern-matching-instanceof.md':                       'pattern-matching-instanceof',
  'Java/java-sealed-classes-and-interfaces.md':                     'sealed-classes',
  'Java/java-text-blocks.md':                                       'text-blocks',
};

// ─── Spring Boot mappings ─────────────────────────────────────────────────────
const SPRINGBOOT_MAPPINGS = {
  'springboot/maven_study_guide.md':                                           'sb-maven',
  'springboot/spring-boot-introduction.md':                                    'sb-introduction',
  'springboot/SpringBoot_Setup_LayeredArchitecture_Study_Guide.md':            'sb-setup-layered-architecture',
  'springboot/spring-boot-beans-study-guide.md':                               'sb-beans',
  'springboot/spring-boot-bean-scopes-study-guide.md':                         'sb-bean-scopes',
  'springboot/spring-boot-dependency-injection-study-guide.md':                'sb-dependency-injection',
  'springboot/spring-boot-conditional-on-property-study-guide.md':             'sb-conditional-on-property',
  'springboot/springboot_value_dynamic_bean_study_guide.md':                   'sb-value-dynamic-bean',
  'springboot/springboot_annotations_study_guide.md':                          'sb-annotations',
  'springboot/spring-boot-profile-annotation-study-guide.md':                  'sb-profiles',
  'springboot/spring-boot-http-response-status-codes.md':                      'sb-http-status-codes',
  'springboot/spring-boot-exception-handling-study-guide.md':                  'sb-exception-handling',
  'springboot/spring-boot-hateoas-study-guide.md':                             'sb-hateoas',
  'springboot/spring-boot-custom-interceptors.md':                             'sb-custom-interceptors',
  'springboot/Spring_Filters_vs_Interceptors_Study_Guide.md':                  'sb-filters-vs-interceptors',
  'springboot/spring-boot-async-advanced-study-guide.md':                      'sb-async',
  'springboot/Spring_AOP_Study_Guide.md':                                      'sb-aop',
  'springboot/spring-boot-jpa-part1-jdbc.md':                                  'sb-jpa-jdbc',
  'springboot/JPA-Entity-Mapping-Study-Guide.md':                              'sb-jpa-entity-mapping',
  'springboot/JPA_Part2_Study_Guide.md':                                       'sb-jpa-part2',
  'springboot/JPA_Part3_Mappings_Study_Guide.md':                              'sb-jpa-part3-mappings',
  'springboot/JPA_Part4_NativeQueries_CriteriaAPI.md':                         'sb-jpa-native-queries-criteria',
  'springboot/JPA_Custom_Queries.md':                                           'sb-jpa-custom-queries',
  'springboot/JPA_Specification_API.md':                                        'sb-jpa-specification',
  'springboot/JPA_First_Level_Caching.md':                                      'sb-jpa-l1-cache',
  'springboot/spring-boot-l2-caching-study-guide.md':                          'sb-jpa-l2-cache',
  'springboot/spring-boot-transactional-study-guide.md':                       'sb-transactional',
  'springboot/spring-boot-transaction-management-part2.md':                    'sb-transaction-management-part2',
  'springboot/Spring_Transaction_Isolation_Levels_Study_Guide.md':             'sb-transaction-isolation',
  'springboot/spring-boot-jpa-associations.md':                                'sb-jpa-associations',
  'springboot/spring-boot-security-architecture-study-guide.md':               'sb-security-architecture',
  'springboot/Spring-Security-Basic-Authentication-Study-Guide.md':            'sb-security-basic-auth',
  'springboot/Spring-Security-User-Creation-Study-Guide.md':                   'sb-security-user-creation',
  'springboot/spring-boot-form-login-authentication-study-guide.md':           'sb-form-login',
  'springboot/SpringBoot_Annotation_Authorization_Study_Guide.md':             'sb-annotation-authorization',
  'springboot/JWT_Study_Guide.md':                                              'sb-jwt-fundamentals',
  'springboot/JWT_SpringBoot_StudyGuide.md':                                   'sb-jwt-springboot',
  'springboot/OAuth2.0-Complete-Study-Guide.md':                               'sb-oauth2',
  'springboot/OAuth2_OIDC_SpringBoot_Study_Guide.md':                          'sb-oauth2-oidc-springboot',
  'springboot/Common-Web-Security-Attacks-Study-Guide.md':                     'sb-web-security-attacks',
  'springboot/SpringBoot_Microservices_Communication_StudyGuide.md':           'sb-microservices-communication',
  'springboot/FeignClient_SpringBoot_Study_Guide.md':                          'sb-feign-client',
  'springboot/Spring-RestClient-Complete-Study-Guide.md':                      'sb-rest-client',
  'springboot/SpringBoot_ServiceDiscovery_Eureka_Study_Guide.md':              'sb-eureka-service-discovery',
  'springboot/SpringBoot_LoadBalancer_StudyGuide.md':                          'sb-load-balancer',
  'springboot/API_Gateway_Study_Guide.md':                                     'sb-api-gateway',
  'springboot/spring-cloud-gateway-filters.md':                                'sb-gateway-filters',
  'springboot/centralized_configuration_study_guide.md':                       'sb-centralized-config',
  'springboot/circuit_breaker_study_guide.md':                                 'sb-circuit-breaker',
  'springboot/Bulkhead_FaultTolerant_Microservices_Study_Guide.md':            'sb-bulkhead',
  'springboot/Fault-Tolerant-Microservices-Resilience4j-RateLimiter-Study-Guide.md': 'sb-rate-limiter',
  'springboot/Fault-Tolerant-Microservices-Resilience4j-Retry-Study-Guide.md': 'sb-retry',
};

// ─── Helper ───────────────────────────────────────────────────────────────────
function importFile(relativeSource, slug) {
  const sourcePath = path.join(NOTES_ROOT, relativeSource);
  const targetPath = path.join(LESSONS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`  ⚠️  NOT FOUND: ${relativeSource}`);
    return;
  }

  let content = fs.readFileSync(sourcePath, 'utf-8');

  // Add frontmatter if not already present
  if (!content.startsWith('---')) {
    content = `---\ntitle: ${slug}\n---\n\n${content}`;
  }

  fs.writeFileSync(targetPath, content, 'utf-8');
  console.log(`  ✅  ${relativeSource}  →  ${slug}.mdx`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────
if (!fs.existsSync(LESSONS_DIR)) {
  fs.mkdirSync(LESSONS_DIR, { recursive: true });
}

console.log('\n📚 Importing Java notes…');
for (const [src, slug] of Object.entries(JAVA_MAPPINGS)) {
  importFile(src, slug);
}

console.log('\n🍃 Importing Spring Boot notes…');
for (const [src, slug] of Object.entries(SPRINGBOOT_MAPPINGS)) {
  importFile(src, slug);
}

console.log('\n✨ Done!');
