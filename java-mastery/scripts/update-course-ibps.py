import json
import os

course_file = r"e:\Notes\Java\java-mastery\src\data\course.json"

with open(course_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Filter out any existing ibps-so-it entries if running multiple times
data["chapters"] = [c for c in data.get("chapters", []) if c.get("course") != "ibps-so-it"]
data["lessons"] = [l for l in data.get("lessons", []) if l.get("course") != "ibps-so-it"]

ibps_curriculum = [
    (1, "Software & Hardware Foundations", "ibps-it-software-hardware", 60,
     "Von Neumann Architecture, CPU Units, Register Set, Memory Hierarchy, Ports, and Computer Typology.",
     ["Understand basic computer block diagram and Von Neumann Architecture", "Analyze CPU components: ALU, CU, and registers", "Compare RAM, ROM, Cache, and CPU Register speeds in memory hierarchy"],
     ["ibps", "hardware", "software", "cpu", "memory", "architecture"]),

    (2, "Database Management System (DBMS)", "ibps-it-dbms", 120,
     "Three-Schema Architecture, E-R Modeling, RDBMS Concepts, Normalization (1NF to BCNF), SQL, ACID, and Deadlock Handling.",
     ["Master ANSI/SPARC Three-Schema DBMS Architecture", "Design ER models with entity relationships and weak entities", "Apply Normalization rules up to BCNF and write SQL queries", "Understand transaction control, ACID properties, and deadlock resolution"],
     ["dbms", "sql", "normalization", "er-model", "acid", "transactions"]),

    (3, "Data Warehousing & Data Mining", "ibps-it-data-warehousing-mining", 60,
     "OLAP vs OLTP architectures, ETL Data Pipeline, Schema Design, and Predictive Data Mining Algorithms.",
     ["Differentiate between operational OLTP systems and OLAP analytical databases", "Map out the extraction, transformation, and loading (ETL) data pipeline", "Understand clustering, classification, and association rules in data mining"],
     ["data-warehouse", "olap", "oltp", "data-mining", "etl"]),

    (4, "Operating System (OS)", "ibps-it-operating-system", 110,
     "5-State Process Transition Diagram, CPU Scheduling Algorithms, Memory Management, Virtual Memory & Paging, File Systems, and UNIX.",
     ["Examine the 5-state process lifecycle and interrupt transitions", "Calculate waiting and turnaround times for FCFS, SJF, and Round Robin scheduling", "Understand paging, segmentation, and virtual memory address translation", "Learn Unix foundational filesystem hierarchies and shell concepts"],
     ["os", "operating-system", "scheduling", "paging", "memory-management", "unix"]),

    (5, "Computer Networking & Internet Protocols", "ibps-it-networking", 100,
     "OSI 7-Layer vs TCP/IP Models, Switching techniques, Routing Protocols, IP Addressing, TCP Handshake, and Network Devices.",
     ["Compare the layers and encapsulation of OSI 7-Layer and TCP/IP models", "Analyze TCP 3-way handshake and reliable connection-oriented communication", "Understand network devices: Hubs, Switches, Routers, and Gateways", "Study foundational internet protocols: DNS, HTTP/S, SMTP, and DHCP"],
     ["networking", "osi", "tcp-ip", "protocols", "routing", "switches"]),

    (6, "Information Security & Cyber Threats", "ibps-it-information-security", 90,
     "Malware Taxonomy, Botnets, Authentication, Symmetric vs Asymmetric Cryptography, Firewalls, DMZ Architecture, and IDS.",
     ["Classify cyber malware: Viruses, Worms, Trojans, Ransomware, and Rootkits", "Compare symmetric (AES, DES) and asymmetric (RSA, ECC) cryptography", "Analyze Defense-in-Depth network architectures with dual firewalls and DMZ", "Understand Intrusion Detection Systems (IDS) and proxy operation"],
     ["security", "cryptography", "firewall", "malware", "ids", "encryption"]),

    (7, "Web Technology & Markup Languages", "ibps-it-web-technology", 75,
     "HTML Standard Syntax, XML Structural Rules, Client-Server Communication, Proxy servers, and Common Gateway Interface (CGI).",
     ["Understand standard HTML document formatting and DOM semantics", "Contrast HTML display logic with XML rigid structured data rules", "Trace Web Server to Application script communication via CGI architecture"],
     ["web-technology", "html", "xml", "cgi", "client-server"]),

    (8, "Computer Organization & Microprocessor", "ibps-it-computer-org-microprocessor", 120,
     "Number Systems & Conversions, Instruction Pipelining, 8085/8086 Bus Organization, Boolean Algebra, Logic Gates, Flip-Flops, and Counters.",
     ["Convert binary, octal, decimal, and hexadecimal number representations", "Analyze instruction pipelining stages and throughput efficiency", "Map 8085/8086 microprocessor pins, data bus, and address bus architecture", "Solve boolean expressions and construct truth tables for Logic Gates and Flip-Flops"],
     ["coa", "microprocessor", "logic-gates", "pipelining", "8085", "boolean-algebra"]),

    (9, "Data Structures & Algorithms", "ibps-it-data-structure", 95,
     "Asymptotic Complexity Classes, Array, Stack, Queue, Binary Search Trees, Graph Representations, Sorting algorithms, and Hashing.",
     ["Evaluate algorithmic time complexity using Big-O asymptotic notation", "Analyze LIFO Stack and FIFO Queue pointer representations and operations", "Perform Inorder, Preorder, and Postorder tree traversals on Binary Search Trees", "Compare sorting efficiencies of Merge Sort, Quick Sort, Bubble Sort, and Hashing"],
     ["data-structures", "algorithms", "bst", "stack", "queue", "sorting", "big-o"]),

    (10, "Software Engineering & Project Management", "ibps-it-software-engineering", 80,
     "SDLC Models (Waterfall, Spiral, Agile), Clean Room SE, UML Modeling, Testing Methodologies, COCOMO model, and SEI-CMM Levels.",
     ["Compare sequential Waterfall vs iterative Agile SDLC processes", "Understand Software Capability Maturity Model (SEI-CMM) maturity levels", "Apply verification and validation testing strategies (Black-box vs White-box)", "Estimate software cost and engineering effort using COCOMO models"],
     ["software-engineering", "sdlc", "cmm", "testing", "agile", "cocomo"]),

    (11, "Programming Languages & OOP Concepts", "ibps-it-programming-languages", 100,
     "Language Paradigms, C Language syntax & constructs, Four Pillars of OOP, Java Basics, and JVM Runtime Execution Architecture.",
     ["Master C programming syntax, pointer fundamentals, and functional decomposition", "Apply the four OOP pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism", "Examine Java bytecode compilation and JVM Runtime Data Area memory structures"],
     ["programming", "c", "oop", "java", "jvm", "encapsulation"]),

    (12, "Professional Knowledge Practice Sets", "ibps-it-practice-sets", 180,
     "10 Full-length simulation Practice Sets with comprehensive solutions covering all competitive banking IT Officer exam syllabus topics.",
     ["Execute full-length practice evaluations under timed examination constraints", "Reinforce conceptual mastery across DBMS, Networking, OS, and Security", "Diagnose performance gaps using detailed accompanying logic and solutions"],
     ["practice-sets", "mock-exam", "questions", "solutions", "ibps-so-it"]),

    (13, "Advanced Topics & Technical Annexure", "ibps-it-advanced-topics-annexure", 60,
     "Phases of a Compiler, Interpreters, Loaders, Linkers, Oracle Grid Architecture, PL/SQL Triggers, and Big Data Five V's Analytics.",
     ["Trace program execution through the 6 core compiler translation phases", "Distinguish role of loaders, linkers, compilers, and dynamic interpreters", "Understand Oracle Grid database concepts and PL/SQL programmatic database triggers", "Explore Big Data analytical dimensions across the foundational Five V's"],
     ["compiler", "loader", "oracle", "plsql", "big-data", "annexure"])
]

for ch_num, ch_title, slug, minutes, desc, objs, tags in ibps_curriculum:
    data["chapters"].append({
        "course": "ibps-so-it",
        "number": ch_num,
        "title": ch_title,
        "description": desc
    })
    data["lessons"].append({
        "course": "ibps-so-it",
        "title": ch_title,
        "slug": slug,
        "chapter": ch_num,
        "chapterTitle": ch_title,
        "lesson": 1,
        "description": desc,
        "difficulty": "intermediate",
        "estimatedMinutes": minutes,
        "prerequisites": [],
        "objectives": objs,
        "tags": tags
    })

with open(course_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully added 13 chapters and 13 lessons for 'ibps-so-it' to {course_file}")
