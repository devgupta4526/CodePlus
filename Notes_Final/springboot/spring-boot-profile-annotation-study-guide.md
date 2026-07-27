# 📌 Spring Boot Profiling & `@Profile` Annotation — Complete Study Guide

> [!NOTE]
> **Prerequisite:** This topic directly builds on **`@ConditionalOnProperty`** (covered previously) — the two are frequently compared and confused with one another. It also assumes familiarity with **Beans**, the **Bean Lifecycle**, and **Dependency Injection** (`@Value`). Review those first if needed.

---

## Table of Contents

1. [Quick Recap — `@ConditionalOnProperty`](#-quick-recap--conditionalonproperty)
2. [The Problem — Different Configuration Per Environment](#-the-problem--different-configuration-per-environment)
3. [What Is Profiling in Spring Boot?](#-what-is-profiling-in-spring-boot)
4. [Setting the Active Profile](#-setting-the-active-profile)
5. [Setting the Profile Dynamically at Runtime](#-setting-the-profile-dynamically-at-runtime)
6. [The `@Profile` Annotation](#-the-profile-annotation)
7. [Multiple Active Profiles at Once](#-multiple-active-profiles-at-once)
8. [Revisiting the Shared-Codebase Question — Profile vs. `@ConditionalOnProperty`](#-revisiting-the-shared-codebase-question--profile-vs-conditionalonproperty)
9. [Practice Questions](#-practice-questions)
10. [Summary](#-summary)

---

# 📌 Quick Recap — `@ConditionalOnProperty`

## Overview

Before diving into profiling, it's worth briefly recalling `@ConditionalOnProperty`, since this lecture directly builds on and contrasts with it.

## Definition

> `@ConditionalOnProperty` says that a bean is created **conditionally** — meaning a bean may or may not get created, based on a specific property key/value match in `application.properties`. If the configured value matches the expected value, the bean gets created; otherwise, it does not.

## Related Concepts

- The earlier lecture posed a question: *"If you have two applications sharing one common codebase, how do you ensure a bean is created for only one application and not the other?"*
- The expected answer was `@ConditionalOnProperty`. However, many engineers also suggested achieving the same result using **`@Profile`**.
- This lecture explores that alternative in depth — and ultimately explains why, despite being technically *possible*, using `@Profile` for this purpose is **not the technically correct approach**, because `@Profile` is intended specifically for **environment separation**, not general-purpose conditional bean creation.

---

# 📌 The Problem — Different Configuration Per Environment

## Overview

To understand *why* Spring Profiles exist, it helps to first understand the underlying real-world problem: the same application code often needs to run against **different configuration values** depending on which environment it's deployed in.

## Definition

> An **environment** (in this context) refers to a distinct deployment context in which the same application code runs — commonly **Local/Development (Dev)**, **QA/Staging**, and **Live/Production (Prod)** — each of which typically requires different configuration values for the exact same underlying settings.

## Why This Concept Exists

The same piece of code — say, a database connection class — needs **different configuration values** depending on where it's running:

- **Local/Dev machine:** might use empty or dummy credentials (`dev username` / `dev password`), since it's just for local development.
- **QA/Staging environment:** might use dummy but distinct credentials (`QA username` / `QA password`) for testing purposes.
- **Production/Live environment:** requires real, valid credentials (`prod username` / `prod password`) to connect to the actual live database.

## Real-World Analogy

Think of a single stage play script (the application code) being performed in three different theaters (Dev, QA, Prod) — each theater has a different lighting rig, sound system, and seating capacity (the configuration). The script (the code) doesn't change, but each performance venue needs its own technical setup instructions.

## Internal Working — Beyond Just Username/Password

> [!NOTE]
> Username and password are just **one example**. Many other configuration values commonly differ across environments, including:
> - **URL and port number** — e.g., connecting to a dependent application might use port `45613` in Dev/QA but a different port (`65121`) in Prod.
> - **Connection timeout values** — e.g., `1000ms` in Dev, `500ms` in QA, `50ms` in Prod — reflecting the fact that production machines typically have significantly more computing/network resources than development or QA machines.
> - **Request timeout values**
> - **Throttle values**
> - **Retry values** — e.g., you might want more retries configured in Dev than in QA, and more in QA than in Prod.

## Key Observations

- All of these environment-specific values traditionally would need to live in `application.properties` — but a **single** `application.properties` file cannot hold three (or more) separate, conflicting sets of values for the same keys simultaneously.
- This is precisely the problem that **Spring Profiles** are designed to solve.

## Related Concepts

- `application.properties` / `application.yml`
- Environment-based deployment pipelines (Dev → QA/Staging → Production)

---

# 📌 What Is Profiling in Spring Boot?

## Overview

**Profiling** in Spring Boot is the mechanism that allows you to maintain **multiple, environment-specific configuration files**, and select which one is active at any given time.

## Definition

> A **Profile** in Spring Boot is, conceptually, **equivalent to an environment**. Each profile corresponds to its own dedicated properties file, following the naming convention:
>
> ```
> application-<profile-name>.properties
> ```

## Internal Working

Instead of a single `application.properties` file trying to hold every environment's configuration at once, Spring Boot allows you to define:

```
application.properties           <-- the DEFAULT configuration
application-dev.properties       <-- Dev profile
application-qa.properties        <-- QA profile
application-prod.properties      <-- Prod profile
```

Each of these files can contain the **same configuration keys**, but with **different values** appropriate to that specific environment.

## Syntax — Example Configuration Files

**`application.properties` (the default):**

```properties
username=default_username
password=default_password
```

**`application-dev.properties`:**

```properties
username=dev_username
password=dev_password
```

**`application-qa.properties`:**

```properties
username=qa_username
password=qa_password
```

**`application-prod.properties`:**

```properties
username=prod_username
password=prod_password
```

## Code Examples

**A simple bean consuming these configuration values:**

```java
@Component
public class DBConfig {

    @Value("${username}")
    private String username;

    @Value("${password}")
    private String password;

    @PostConstruct
    public void init() {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);
    }
}
```

## Syntax Breakdown

| Element | Meaning |
|---|---|
| `@Component` | Registers `DBConfig` as a Spring-managed bean |
| `@Value("${username}")` | Injects the value of the `username` key from the active properties configuration into this field |
| `@Value("${password}")` | Injects the value of the `password` key |
| `@PostConstruct` | Runs after the bean is fully constructed and its `@Value` fields populated — used here simply to print the resolved values |

## Step-by-Step Execution — No Profile Set

1. Application starts. Spring Boot finds `DBConfig`, a `@Component` (default Singleton, eagerly initialized).
2. IOC constructs the bean, then attempts to resolve its `@Value`-annotated fields.
3. Spring Boot looks to see: *has any specific profile been set as active?*
4. In this scenario, **no profile has been set yet** — only multiple properties files have been created, but none has been designated "active."
5. Since no profile is active, Spring Boot falls back to the **default** `application.properties` file.
6. It finds `username` and `password` there, and fills in the default values.

**Output:**

```
Username: default_username
Password: default_password
```

## Key Observations

- If you never explicitly set an active profile, Spring Boot always falls back to the plain `application.properties` file as the default configuration source.
- Creating multiple `application-<profile>.properties` files by itself does **nothing** until you actually tell Spring Boot which one to activate.

---

# 📌 Setting the Active Profile

## Overview

To actually make Spring Boot pick up a specific environment's configuration, you need to explicitly set which profile is **active**.

## Syntax — Setting the Default Active Profile in `application.properties`

```properties
spring.profiles.active=qa
```

## Syntax Breakdown

| Element | Meaning |
|---|---|
| `spring.profiles.active` | The configuration key that tells Spring Boot which profile(s) should be considered active |
| `qa` | The name of the profile to activate — this must exactly match the suffix used in `application-qa.properties` |

> [!NOTE]
> You can name profiles anything meaningful — `dev`, `local`, `development`, `qa`, `stage`, `prod`, etc. Whatever name you choose here **must exactly match** the corresponding suffix in the `application-<name>.properties` filename.

## Internal Working — Parent/Child Configuration Merging

> [!IMPORTANT]
> Once a specific profile is active, Spring Boot treats `application.properties` as a kind of **"parent"** configuration, and `application-<profile>.properties` as a **"child"** configuration:
> - If a configuration key exists in **both** the parent (`application.properties`) and the child (`application-<profile>.properties`), the **child's value takes priority**.
> - If a key exists **only** in the parent (not in the child), the parent's value is used, since there's nothing to override it with.
> - If a key exists **only** in the child (not in the parent), the child's value is used.

## Code Examples & Step-by-Step Execution — QA Profile Active

**`application.properties`:**

```properties
username=default_username
password=default_password
spring.profiles.active=qa
```

**`application-qa.properties`:**

```properties
username=qa_username
password=qa_password
```

**Step-by-Step Execution**

1. Application starts. Spring Boot reads `application.properties` and sees `spring.profiles.active=qa`.
2. It confirms: *"a profile has been explicitly requested — `qa`."*
3. You'll typically see a log message confirming the active profile has been set to `qa`.
4. Spring Boot now looks for a matching file: `application-qa.properties` — found.
5. When resolving `DBConfig`'s `@Value` fields, Spring Boot checks both the default (`application.properties`, the "parent") and `application-qa.properties` (the "child").
6. Since `username` and `password` exist in **both** files, the **child (`application-qa.properties`)** values take priority.

**Output:**

```
Username: qa_username
Password: qa_password
```

## Key Observations

- `spring.profiles.active` is the master switch controlling which environment-specific configuration file Spring Boot merges on top of the default `application.properties`.
- Child (profile-specific) values always win over parent (default) values for any key present in both.

---

# 📌 Setting the Profile Dynamically at Runtime

## Overview

Hardcoding `spring.profiles.active` directly inside `application.properties` works, but it means you'd have to manually edit and redeploy that file every time you switch environments (e.g., from Dev to Production) — which isn't practical. Instead, Spring Boot supports setting the active profile **dynamically, at application startup**, without touching the properties file.

## Why This Concept Exists

In real deployments, you don't want to hardcode `dev` as the default and then have to remember to change it to `prod` (and redeploy) every time you push to production. Instead, you want to **specify the environment at the moment you start the application** — the same codebase and same default configuration file can then be launched differently depending on where/how it's started.

## Method 1 — Command-Line System Property

### Internal Working

Running a Spring Boot application via a tool like IntelliJ's "Run" button is, under the hood, simply executing a Maven command:

```bash
mvn spring-boot:run
```

To dynamically set the active profile at this point, you pass a system property (`-D` flag) at startup:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

### Syntax Breakdown

| Element | Meaning |
|---|---|
| `mvn spring-boot:run` | The underlying Maven command that actually starts the Spring Boot application |
| `-D` | Sets a system property / environment variable for this run |
| `spring-boot.run.profiles=prod` | Tells the Spring Boot Maven plugin to set `spring.profiles.active` to `prod` for this run |

### Key Observations

> [!IMPORTANT]
> If you provide `-Dspring-boot.run.profiles=prod` at startup, this **takes priority** over whatever `spring.profiles.active` value is hardcoded inside `application.properties`. If you don't provide this flag, Spring Boot simply falls back to whatever default is configured in `application.properties`.

## Method 2 — Maven Profiles in `pom.xml`

### Internal Working

Alternatively, you can define multiple named profiles directly inside your project's `pom.xml` file, each mapping to a different Spring profile:

```xml
<profiles>
    <profile>
        <id>local</id>
        <properties>
            <spring-boot.run.profiles>dev</spring-boot.run.profiles>
        </properties>
    </profile>
    <profile>
        <id>production</id>
        <properties>
            <spring-boot.run.profiles>prod</spring-boot.run.profiles>
        </properties>
    </profile>
    <profile>
        <id>stage</id>
        <properties>
            <spring-boot.run.profiles>qa</spring-boot.run.profiles>
        </properties>
    </profile>
</profiles>
```

### Syntax Breakdown

| Element | Meaning |
|---|---|
| `<profile><id>local</id>...</profile>` | Defines a Maven profile named `local`, which — when selected — sets the Spring profile to `dev` |
| `<id>production</id>` | A Maven profile named `production`, mapping to the Spring profile `prod` |
| `<id>stage</id>` | A Maven profile named `stage`, mapping to the Spring profile `qa` |
| `<spring-boot.run.profiles>` | The actual Spring profile value that gets applied when this Maven profile is selected |

### Selecting a Maven Profile at Startup

```bash
mvn spring-boot:run -P production
```

### Syntax Breakdown

| Element | Meaning |
|---|---|
| `-P` | Tells Maven to activate a specific `<profile>` block from `pom.xml`, selected by its `<id>` |
| `production` | The `<id>` of the Maven profile block to activate — which, per the `pom.xml` example above, sets `spring-boot.run.profiles=prod` |

### Key Observations

- Both methods (raw `-D` flag vs. `-P` with `pom.xml`-defined profiles) achieve **exactly the same underlying result** — setting `spring.profiles.active` at startup.
- The `pom.xml`-based approach (Method 2) is generally **preferred in live/production applications**, because the startup command becomes much clearer and more self-documenting — e.g., `-P production` makes the intent obvious, compared to remembering the raw property syntax each time.

## Comparison Table — Both Methods

| Aspect | Raw `-D` Flag | Maven `pom.xml` Profiles + `-P` |
|---|---|---|
| Setup required | None — just pass the flag directly at the command line | Requires pre-defining named `<profile>` blocks in `pom.xml` |
| Startup command | `mvn spring-boot:run -Dspring-boot.run.profiles=prod` | `mvn spring-boot:run -P production` |
| Readability/clarity | Less self-documenting — must remember exact property syntax each time | More self-documenting — clear, meaningful profile names (`production`, `stage`, `local`) |
| Common preference in production | Less preferred | ✅ More commonly preferred |

## Interview Notes

- **Q: What is the priority order between a profile set in `application.properties` and one set dynamically at startup?** → The dynamically-set profile (via `-D` flag or `-P` with `pom.xml`) always takes priority over the hardcoded default in `application.properties`.
- **Q: Why is the `pom.xml`-based approach generally preferred in live applications?** → Because the startup command is clearer and more explicit about which environment is being targeted, reducing the chance of accidentally running against the wrong environment.

---

# 📌 The `@Profile` Annotation

## Overview

Now that **profiling** itself is understood, we can properly cover the **`@Profile`** annotation — which uses this same profiling mechanism to control **bean creation**.

## Definition

> The **`@Profile`** annotation tells Spring Boot to **create a given bean only when a specific profile is currently active**. If the active profile doesn't match what's specified in `@Profile`, that bean is **not created**.

## Syntax

```java
@Component
@Profile("prod")
public class MySQLConnection {
    public MySQLConnection() {
        System.out.println("MySQL connection bean created");
    }
}
```

```java
@Component
@Profile("dev")
public class NoSQLConnection {
    public NoSQLConnection() {
        System.out.println("NoSQL connection bean created");
    }
}
```

## Syntax Breakdown

| Element | Meaning |
|---|---|
| `@Profile("prod")` | This bean will only be created when the currently active profile is exactly `"prod"` |
| `@Profile("dev")` | This bean will only be created when the currently active profile is exactly `"dev"` |

## Internal Working — Profile Matching

> [!NOTE]
> Internally, this is essentially a **string equality comparison** between the currently active profile and the value(s) specified in `@Profile(...)` — conceptually similar to `activeProfile.equals("prod")`.

## Code Examples & Step-by-Step Execution

**Setup:**

```properties
# application.properties
username=default_username
password=default_password
spring.profiles.active=qa
```

**Scenario A — Active Profile Is `qa`:**

**Step-by-Step Execution**

1. Application starts → Spring Boot sets the active profile to `qa` (from `spring.profiles.active=qa`).
2. IOC finds `MySQLConnection` — Singleton, eligible for eager initialization — but it carries `@Profile("prod")`.
3. Spring Boot compares the active profile (`"qa"`) against the required profile (`"prod"`) → **they do not match**.
4. Since the profiles don't match, the `MySQLConnection` bean is **not created** — its constructor never runs.
5. IOC finds `NoSQLConnection` — carries `@Profile("dev")`.
6. Spring Boot compares the active profile (`"qa"`) against the required profile (`"dev"`) → **they do not match**.
7. The `NoSQLConnection` bean is also **not created**.

**Output:**

```
(neither "MySQL connection bean created" nor "NoSQL connection bean created" is printed)
```

**Scenario B — Active Profile Is Dynamically Set to `prod`:**

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=prod
```

**Step-by-Step Execution**

1. Application starts → the active profile is dynamically set to `prod` (overriding the `qa` default hardcoded in `application.properties`).
2. IOC finds `MySQLConnection`, requiring `@Profile("prod")`. Active profile is `"prod"` → **they match**.
3. The `MySQLConnection` bean **is created** → `"MySQL connection bean created"` prints.
4. Because the profile is now `prod`, Spring Boot also resolves configuration values from `application-prod.properties` (the profile-specific "child" file) — so any `@Value`-injected fields on this bean would resolve to the **prod**-specific values.
5. IOC finds `NoSQLConnection`, requiring `@Profile("dev")`. Active profile is `"prod"` → **they do not match**.
6. The `NoSQLConnection` bean is **not created**.

**Output:**

```
MySQL connection bean created
```

## Key Observations

- `@Profile(...)` performs a **direct match** between the bean's required profile and the currently active profile — if they don't match, the bean is simply skipped, exactly like a failed `@ConditionalOnProperty` condition.
- Whichever mechanism sets the active profile (hardcoded default in `application.properties`, or dynamically via `-D`/`-P` at startup) directly determines which `@Profile`-annotated beans get created.

## Related Concepts

- `@ConditionalOnProperty` — a more general-purpose conditional bean creation mechanism, not tied specifically to the concept of "environment."
- `@Value` and profile-specific properties file resolution (parent/child merging, as covered earlier).

---

# 📌 Multiple Active Profiles at Once

## Overview

Spring Boot also supports specifying **more than one active profile simultaneously**, using a comma-separated list.

## Definition

> You can set `spring.profiles.active` to a **comma-separated list** of profile names — this activates **all** of the listed profiles for the purposes of `@Profile`-based bean matching, but only **one** properties file is actually used for `@Value` resolution: **the last one listed in the comma-separated sequence**.

## Syntax

```properties
spring.profiles.active=prod,qa
```

## Syntax Breakdown

| Element | Meaning |
|---|---|
| `prod,qa` | Both the `"prod"` and `"qa"` profiles are considered **active** simultaneously |

> [!WARNING]
> It doesn't make logical sense to genuinely "work in" two full environments (like Prod and QA) at the exact same time in terms of actual configuration values — but this comma-separated syntax is still useful specifically for controlling `@Profile`-annotated **bean creation**, where you might legitimately want beans tagged for multiple different profiles to all be created together.

## Code Examples & Step-by-Step Execution

**Setup:**

```properties
spring.profiles.active=prod,qa
```

```java
@Component
@Profile("prod")
public class MySQLConnection {
    public MySQLConnection() {
        System.out.println("MySQL connection bean created");
    }
}
```

```java
@Component
@Profile("qa")
public class NoSQLConnection {
    public NoSQLConnection() {
        System.out.println("NoSQL connection bean created");
    }
}
```

**Step-by-Step Execution**

1. Application starts. Spring Boot registers **both** `"prod"` and `"qa"` as active profiles.
2. IOC finds `MySQLConnection`, requiring `@Profile("prod")`. Since `"prod"` is one of the active profiles → **matches** → bean **is created**.
3. IOC finds `NoSQLConnection`, requiring `@Profile("qa")`. Since `"qa"` is also one of the active profiles → **matches** → bean **is created**.
4. **Both** beans get created.
5. However, for resolving any `@Value`-injected configuration on **either** bean, Spring Boot only uses **one** profile-specific properties file — specifically **`application-qa.properties`**, since `qa` is the **last** entry in the comma-separated list.
6. This means both `MySQLConnection` and `NoSQLConnection`, if they had `@Value`-injected fields like `username`/`password`, would both receive the **QA-specific** values — even though `MySQLConnection` was created because of the `prod` profile match.

## Key Observations

- **Bean creation matching** via `@Profile` considers **all** profiles listed in `spring.profiles.active` — any bean whose required profile appears **anywhere** in that comma-separated list gets created.
- **Configuration value resolution** (via `@Value` and profile-specific properties files), however, only uses **one** file — the **last** profile listed in the comma-separated sequence.

## Common Mistakes

> [!WARNING]
> It's easy to assume that setting multiple active profiles means each bean's configuration will be resolved from *its own* matching profile file. In reality, **only the last-listed profile's properties file** is used for configuration resolution — even if a bean was created because it matched an *earlier*-listed profile in the comma-separated list.

---

# 📌 Revisiting the Shared-Codebase Question — Profile vs. `@ConditionalOnProperty`

## Overview

Returning to the original question posed at the start of this lecture (and inherited from the previous `@ConditionalOnProperty` lecture): *"You have two applications sharing one common codebase — how do you ensure a bean is created only for one application and not the other?"*

## Demonstrating That `@Profile` *Can* Technically Achieve This

**Shared codebase, containing a bean tagged with a custom "profile":**

```java
@Component
@Profile("app1")
public class SharedBean {
    // ...
}
```

**Application 1's `application.properties`:**

```properties
spring.profiles.active=app1
```

**Application 2's `application.properties`:**

```properties
spring.profiles.active=app2
```

### Step-by-Step Execution

1. When **Application 1** starts, its active profile is set to `"app1"`.
2. Spring Boot finds `SharedBean`, requiring `@Profile("app1")` → **matches** (since Application 1's active profile is `"app1"`) → bean **is created**.
3. When **Application 2** starts, its active profile is set to `"app2"`.
4. Spring Boot finds the same `SharedBean` class, still requiring `@Profile("app1")` → **does not match** `"app2"` → bean is **not created** for Application 2.

> [!NOTE]
> This demonstrates that, yes, **it is technically achievable** — using `@Profile` with custom, application-specific names (like `"app1"`/`"app2"`) does successfully control conditional bean creation across two applications sharing a common codebase.

## Why This Is *Not* the Technically Correct Approach

> [!IMPORTANT]
> Even though it **works**, using `@Profile` in this way is considered technically **incorrect**, because:
>
> - `"app1"` and `"app2"` are **not environments** — they're arbitrary application identifiers, not concepts like Dev/QA/Prod.
> - The naming convention `application-app1.properties` would be **confusing** to anyone reading the codebase, because `@Profile` and the `application-<profile>.properties` naming convention are **universally understood by developers as representing deployment environments** (Dev, QA, Prod, etc.) — not arbitrary "which application am I" identifiers.
> - Using `@Profile` this way creates **confusion** about the actual purpose of profiling in the codebase, since anyone reasonably familiar with Spring conventions would expect `@Profile`-tagged values to correspond to environments, not to "which of several sibling applications is running this shared code."

## Best Practices

> [!TIP]
> **Use `@ConditionalOnProperty` — not `@Profile` — for the shared-codebase, application-specific bean creation use case.** `@Profile` should be reserved specifically for genuine **environment separation** (Dev vs. QA vs. Production), which is its intended, unambiguous purpose. Repurposing it for arbitrary conditional logic (like distinguishing between sibling applications sharing a codebase) works mechanically but muddies the conventional meaning of profiles for anyone else reading or reviewing the code.

## Interview Notes

- **Q: Can `@Profile` be used to conditionally create beans for reasons unrelated to environment (e.g., distinguishing between two applications sharing a codebase)?** → Yes, technically it works — Spring performs a simple string match between the active profile(s) and the value specified in `@Profile`, regardless of what the string actually represents conceptually.
- **Q: Is this considered good practice?** → No — it's explicitly called out as something a careful code reviewer would likely reject, because `@Profile` is conventionally understood to represent deployment environments, and repurposing it otherwise creates confusion. `@ConditionalOnProperty` is the technically correct tool for this use case.
- **Q: What is the core conceptual difference between `@Profile` and `@ConditionalOnProperty`?** → `@Profile` is specifically intended for environment separation (Dev/QA/Prod); `@ConditionalOnProperty` is a general-purpose mechanism for conditionally creating any bean based on any arbitrary property key/value match, unrelated to the concept of "environment."

## Related Concepts

- `@ConditionalOnProperty` (the technically correct tool for non-environment-based conditional bean creation)
- Code review / software design conventions and the importance of naming/annotations conveying accurate intent

---

# 📌 Practice Questions

### Easy

1. What does a Spring "profile" conceptually correspond to?
2. What is the naming convention for a profile-specific properties file, e.g., for a profile named `stage`?
3. What configuration key is used to set the active profile inside `application.properties`?

### Medium

4. If a key exists in both `application.properties` and `application-qa.properties`, and the `qa` profile is active, which value wins, and why?
5. Explain the two different methods for setting the active profile dynamically at application startup (without hardcoding it into `application.properties`).
6. If `spring.profiles.active=dev,prod` is set, and a bean is annotated `@Profile("dev")`, will that bean be created? What about its `@Value`-injected configuration — which properties file will be used?

### Hard

7. Explain, step by step, why using `@Profile("app1")` and `@Profile("app2")` to control bean creation across two applications sharing a common codebase is technically possible but considered an incorrect (non-idiomatic) use of the annotation.
8. A team sets `spring.profiles.active=prod` via the `-D` flag at startup, even though `application.properties` hardcodes `spring.profiles.active=dev`. Explain which value takes effect, and why.
9. Compare `@ConditionalOnProperty` and `@Profile` in terms of their intended purpose, and explain why the former is the more appropriate choice for the "shared codebase across two applications" scenario, even though the latter can technically achieve the same outcome.

---

# 📌 Summary

- **Profiling** exists because the same application code often needs **different configuration values** depending on the environment it's deployed in (Dev, QA, Production) — e.g., different database credentials, URLs/ports, timeouts, retry counts, etc.
- A Spring **profile** is conceptually equivalent to an **environment**, backed by a dedicated properties file: `application-<profile-name>.properties`.
- If **no profile is explicitly set active**, Spring Boot falls back to the plain, default `application.properties` file.
- The active profile is set via the `spring.profiles.active` key — either hardcoded in `application.properties`, or set **dynamically at startup** via:
  - A raw command-line flag: `mvn spring-boot:run -Dspring-boot.run.profiles=prod`
  - Named Maven profiles defined in `pom.xml`, selected via `-P <profile-id>` (generally preferred in production for clarity).
- When a profile is active, Spring Boot treats `application.properties` as a **parent** and `application-<profile>.properties` as a **child** — child values take priority over parent values for any key present in both.
- **`@Profile("<name>")`** tells Spring Boot to create a given bean **only when** the specified profile is currently active — performing what is essentially a string match between the active profile(s) and the annotation's value.
- **Multiple profiles can be active simultaneously** via a comma-separated list (`spring.profiles.active=prod,qa`) — this affects **which `@Profile`-tagged beans get created** (any bean matching *any* listed profile is created), but **configuration value resolution** (`@Value`) only uses the **last**-listed profile's properties file.
- Although `@Profile` **can** technically be repurposed to control bean creation for reasons unrelated to environment (e.g., distinguishing between two sibling applications sharing a common codebase), this is considered **technically incorrect usage** — `@Profile` is conventionally understood to represent deployment environments, and repurposing it otherwise creates confusion for anyone reading the code.
- **`@ConditionalOnProperty` remains the technically correct tool** for general-purpose, non-environment-based conditional bean creation — such as the shared-codebase, two-applications scenario — while `@Profile` should be reserved specifically for genuine environment separation.
