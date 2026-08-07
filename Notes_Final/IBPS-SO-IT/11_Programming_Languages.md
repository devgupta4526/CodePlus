# 11. Programming Languages & OOP Concepts

---

An application domain is typically a class of problem such as financial, medical or aerospace; however, the broade r
the reuse the better.

Data modelling
Analysis modelling sometimes begins with the identification of all data objects that are to be processed in the system
and the relationships between these objects.  Data modelling is used for large database and infor mation systems
applications.

Object oriented analysis
The object-oriented (OO) approach to analysis represents the latest “paradigm shift” in analysis methodology and is
epitomized by the Java language at the implementation stage. Some of the claims whic h have made this approach
popular are as follows:

- Customers can understand OO models with no programming knowledge thus facilitating the all -important early
phases of communication.

- OO languages promote code reuse and thus programmer productivity

- The OO design and analysis methods are accommodating to change

The OO approach is based on modelling of the problem domain using classes and objects.
Class: defines the data and procedural abstractions for the information content and behaviour of some system entity.
Method: representation of one of the behaviours of a class.
Object: instance of a specific class. Objects can inherit the attributes and operations defined for a class. Classes are
sometimes illustrated as “cookie cutters” and the associated objects as “cookies”.

The goal of object -oriented analysis is the design of all  classes and associated methods that are appropriate for the
system being developed.  The unified modelling language (UML) has been developed for the modelling and
development of object-oriented (OO) systems.  UML has become an industry standard for OO deve lopment.

Scenario-based modelling
End-user involvement in a software project is critical to its success.  Scenario -based modelling provides mechanisms
for capturing information on how end-users desire to interact with the system.  UML provides support for  the
development of interaction scenarios that begin with the writing of use -cases that describe a use of the system by a
specific end -user.  The dynamics of these use -cases can be repr esented in UML activity diagrams similar to flow
charts.  More complex interactions can be captured in UML swimlane diagrams that can model concurrent activities.

Flow oriented modelling
Although not part of UML, the input-process-output data flow diagrams (DFD) continue to be a very popular analysis
modelling tool and can b e used to augment UML diagrams.  Data flow in the system can be modelled in a
hierarchical fashion with DFDs with higher level context diagrams being refined with greater detailed DFDs at lower
levels.

Dynamic modelling
After static data and attribute re lationships have been established, it is useful to create behavioural models to
represent the systems response to external events.  Use -cases can be used to identify events and UML sequ ence
diagrams can be used to model how events trigger transitions from one object to another.

## 5. Unified Modelling Language (UML)

UML, as the name implies, is a modelling language. It may be used to visualize, specify, construct, and document the
artefacts of a software system. It provides a set of notations (e.g. rectangles,  lines, ellipses, etc.) to create a visual
model of the system. Like any other language, UML has its own syntax (symbols and sentence formation rules) and
semantics (meanings of symbols and sentences).
Also, we should clearly understand that UML is not a system design or development methodology, but can be used to
document object-oriented and analysis results obtained using some methodology.

UML diagrams
UML can be used to construct ni ne different types of diagrams to capture five different views of a sys tem. Just as a
building can be modelled from several views (or perspectives) such as ventilation perspective, electrical perspective,

lighting perspective, heating perspective, etc.; th e different UML diagrams provide different perspectives of the
software system to be developed and facilitate a comprehensive understanding of the system. Such models can be
refined to get the actual implementation of the system.
The UML diagrams can capture the following five views of a system:

- User’s view

- **Structural view** — Behavioural view

- **Implementation view** — Environmental view

User’s view: This view defines the functionalities (facilities) made available by the system to its users. The users’ view
captures the external users’ view of the system in terms of the functionalities offered by the system. The users’ view is
a black-box view of the  system where the internal structure, the dynamic behaviour of different system components,
the implementation etc. are not visible.

Structural view:  The structural view defines the kinds of objects (classes) important to the understanding of the
working of a system and to its implementation. It also captures the relationships among the classes (objects). The
structural model is also called the static model, since the structure of a system does not change with time.

Behavioural view:  The behavioural view  captures how objects interact with each other to realize the system
behaviour. The system behaviour captures the time-dependent (dynamic) behaviour of the system.

Implementation view: This view captures the important components of the system and their dependencies.

Environmental view: This view models how the different components are implemented on different pieces o f
hardware.

Use Case Model
The purpose of a use case is to define a piece of coherent behaviour without revealing the internal structure of  the
system. The use cases do not mention any specific algorithm to be used or the internal data representation, int ernal
structure of the software, etc. A use case typically represents a sequence of interactions between the user and the
system.

Representation

Use cases can be represented by drawing a use case diagram and writing an accompanying text elaborating the
drawing. In the use case diagram, each use case is represented by an ellipse with the name of the use case written
inside the ellipse. All th e ellipses (i.e. use cases) of a system are enclosed within a rectangle which represents the
system boundary. The na me of the system being modelled (such as Library Information System) appears inside the
rectangle. The different users of the system are rep resented by using the stick person icon. Each stick person icon is

normally referred to as an actor. An actor is a r ole played by a user with respect to the system use. It is possible that
the same user may play the role of multiple actors. Each actor can participate in one or more use cases. The line
connecting the actor and the use case is called the communication relationship. It indicates that the actor makes use of
the functionality provided by the use case. Both the human users and the external systems can be represented by stick
person icons.

An example of UML use case diagram for Point of Sale (POS) Terminal or Checkout.
A retail POS system typically includes a computer, monitor, keyboard, barcode scanners, weight scale, receipt
printer, credit card processing system, etc. and POS terminal software.

Checkout use case involves Customer, Clerk and Credit Paymen t Service actors and includes scanning items,
calculating total and taxes, payment use cases.

## 6. User Interface Design

A common failure of software projects is to spend too little time communicating with the user.  It is easy for software
experts to fall  into the subconscious trap of “knowing what is good for the user”.  What may seem to be “clearly
good for the user” is all too frequently not the case from the perspective of the user herself.  The use of user scenarios
and very early and iterative protot ype screen designs can help to assure that the user is being understood.  It has
been said that you should plan on building one to throw away.  Three good guidelines are the following:

- **Put the user in control** — Reduce the user’s memory load

- Make the interface consistent

Types of user interfaces
User interfaces can be classified into the following three categories:

- **Command language based interfaces** — Menu-based interfaces

- Direct manipulation interfaces

Command Language-based Interface: A command language-based interface – as the name itself suggests, is based on
designing a command language which the user can use  to issue the commands. The user is expected to frame the
appropriate commands in the language and type them in appropriately whenever required.  A command
language-based interface can be made concise requiring minimal typing by the user. Command language -based
interfaces allow fast interaction with the computer and simplify the input of complex commands.

Menu-based Interface: An important advantage of a menu-based interface over a command language-based interface
is that a menu -based interface does not re quire the users to remember the exact syntax of the commands. A
menu-based interface is based on recognition of the command names, rather than r ecollection. Further, in a
menu-based interface the typing effort is minimal as most interactions are carried out through menu selections using a
pointing device.

Direct Manipulation Interfaces: Direct manipulation interfaces present the interface to the  user in the form of visual
models (i.e. icons or objects). For this reason, direct manipulation interfaces are sometimes called as iconic interface. In
this type of interface, the user issues commands by performing actions on the visual representations of the objects, e.g.
pull an icon representing a file into an icon representing a trash box, for deleting the file . However, direct
manipulation interfaces can be considered slow for experienced users. Also, it is difficult to give complex commands
using a direct manipulation interface.

## 7. Software Testing
After the software system is coded into a deliverable product, t esting strategies are used t o validate system
requirements. Testing strategies are designed to detect errors in the system.

There are many types of testing like:

- **Unit Testing** — Integration Testing

- **Functional Testing** — System Testing

- **Stress Testing** — Performance Testing

- **Usability Testing** — Acceptance Testing

- **Regression Testing** — Beta Testing
Debugging is the process of finding the source of the errors for correction. Exhaustive testing is impractical. Therefore,
no matter how much testing is done, it is never known with certainty if all bugs have been detected.  Since testing is
a process of detecting the presence of errors, the absence of all errors cannot be guaranteed by the testing process.  A
high percentage of project resources are expended on the t esting phase. Testing usually proceeds in two phases, first
at the component level sometimes called unit testing.  Unit testing is followed by integration  testing in which
increasingly larger groups of components are tested culminating in the total system.   Unit testing is usually done by
the developer and integration testing by an independent test group.  Testing strategies for conventionally designed
software differ somewhat from those for object-oriented systems.

Conventional software:  unit testing foc uses on execution paths through component program logic with the goal of
maximizing error detection by path coverage; whereas integration testing usually involves input and output values.

Object-oriented software:  unit testing is done with classes, whose  definition involves not only internal program
logic but also attributes and operations as well as communication and collaboration.  Operations must be te sted in
the context of a class. Two approaches to integration testing of object-oriented systems are common, thread-based and
use-based testing.  The thread -based approach tests the set of classes that respond to a given system input or event.
Use-based testing begins with by testing classes that are relatively independent of all others and continues in s tages
with each stage defined by the addition of a layer of dependent classes until the entire system is encompassed.
After unit and integration testing,  the entire system is tested in accordance with customer requirements.  This final
testing phase is usually called validation testing and includes alpha and beta tests.  Alpha tests are performed at the
developer site and beta tests occur later at end user  sites.  Final release of the software is scheduled after the beta
tests are complete.

### 7.1 Clean room testing

Clean room testing was pioneered by IBM. This type of testing relies heavily on walk throughs, inspection, and formal
verification. The programmers are not allowed to test any of their code by executing the code other than doing some
syntax testing using a compiler. The software development philosophy is based on avoiding software defects by using
a rigorous inspection process. The objective of t his software is zero -defect software. The name ‘clean room’ was
derived from the analogy with  semi-conductor fabrication units. In these units (clean rooms), defects are avoided by
manufacturing in ultra -clean atmosphere. In this kind of development, inspe ctions to check the consistency of the
components with their specifications has replaced unit-testing.
This technique reportedly produces documentation and code that is more reliable and maintainable than other
development methods relying heavily on code execution-based testing.

The clean room approach to software development is based on five characteristics:

- Formal specification: The software to be developed is formally specified. A state -transition model which shows
system responses to stimuli is used to express the specification.

- Incremental development:  The software is partitioned into incr ements which are developed and validated
separately using the clean room process. These increments are specified, with customer input, at an early stage in
the process.

- Structured programming:  Only a limited number of control and data abstraction construct s are used. The
program development process is process of stepwise refinement of the specification.

- Static verification: The developed software is statically verified  using rigorous software inspections. There is no
unit or module testing process for code components.

- Statistical testing of the system:  The integrated software increment is tested statistically to determine its
reliability. These statistical tests are ba sed on the operational profile which is developed in parallel with the
system specification.

The main problem with this approach is that testing effort is increased as walk throughs, inspection, and verification
are time consuming.

### 7.2 Unit Testing
Unit testing is undertaken after a module has been coded and successfully reviewed. Unit testin g (or module testing)
is the testing of different units (or modules) of a system in isolation. In order to test a single module, a complete
environment is needed to provide all that is necessary for execution of the module. That is, besides the module unde r
test itself, the following steps are needed in order to be able to test the module:

- The procedures belonging to other modules that the module under test calls.

- Nonlocal data structures that the module accesses.

- A procedure to call the functions of the module under test with appropriate parameters.

Modules required to provide the necessary environment (which either call or are called by the module under test) is
usually not available until they too have been unit tested, stubs and drivers are designed to provide the complete
environment for a module.
A stub procedure is a dummy procedure that has the same I/O parameters as the given procedure but has a highly
simplified behaviour. A driver module contains the nonlocal data structures accessed by the modul e under test, and
would also have the code to call the different functions of the module with appropriate parameter values.

### 7.3 Black-Box Testing
This testing methodology looks at what are the available inputs for an application and what the expected outp uts are
that should result from each input. It is not concerned with the inner workings of the application, the process that the
application undertakes to achieve a p articular output or any other internal aspect of the application that may be
involved in t he transformation of an input into an output. Most black -box testing tools employ either coordinate
based interaction with the applications graphical user interface (GUI) or image recognition. Black box testing tends to
find different kinds of errors than white box testing - Missing functions, Usability problems, Performance problems,
Concurrency and timing errors, Initialization and termination errors etc. Unlike white  box testing, black box testing
tends to be applied later in the development process.

### 7.4 White-box Testing
This testing methodology looks under the covers and into the subsystem of an application. Whereas black-box testing
concerns itself exclusively with the inputs and outputs of an application, white-box testing enables you to see what is
happening inside the application. White -box testing provides a degree of sophistication that is not available with
black-box testing as the tester is able to refer to and interact with the objects that comprise an application rather than
only having access to the user interface. An example of a white-box system would be in-circuit testing where someone
is looking at the interconnections between each component and verify ing that each internal connection is working
properly. Another example from a different field might be an auto-mechanic who looks at the inner-workings of a car
to ensure that all of the individual parts are working correctly to ensure the car drives properly.

The main difference between black-box and white-box testing is the areas on which t hey choose to focus. In simplest
terms, black-box testing is focused on results. If an action is taken and it produces the desired result then the process
that was actually used to achieve that outcome is irrelevant. White -box testing, on the other hand, i s concerned with
the details. It focuses on the internal workings of a system and only when all avenues have been tested and the sum of
an application’s parts can be shown to be contributing to the whole is testing complete.

### 7.5 Integration testing

The primary objective of integration testing is to test the module interfaces, i.e. there are no errors in the parameter
passing, when one module invokes another module. Du ring integration testing, different modules of a system are
integrated in a planned manne r using an integration plan. The integration plan specifies the steps and the order in
which modules are combined to realize the full system.

After each integration s tep, the partially integrated system is tested. An important factor that guides the integ ration
plan is the module dependency graph. The structure chart (or module dependency graph) denotes the order in which
different modules call each other. By examining the structure chart the integration plan can be developed.

Integration test approaches There are four types of integration testing approaches. Any one (or a mixture) of the
following approaches can be used to develop the integration test plan. Those approaches are the following:

- **Big bang approach** — Top-down approach

- **Bottom-up approach** — Mixed-approach

### 7.6 System testing

System tests are designed to validate a fully developed system to assure that it meets its requirements. There are
essentially three main kinds of system testing:

- Alpha Testing: refers to the system testing carried out by the test team within the developing organization.

- Beta testing: is the system testing performed by a select group of friendly customers.

- Acceptance Testing: is the system testing performed by the customer to determine whether he should accept the
delivery of the system.

## 8. Debugging
Once errors are identified in a program code, it is necessary to first identify the precise program statements
responsible for the errors and then to fix them. Identifying errors in a program code and then fix them up are known
as debugging.

1. Brute Force Method: This is the most common method of debugging but is the least efficient method. In this
approach, the program is loaded with print statements to print the intermediate values with the hope that some of
the printed values will help to identify the st atement in error. This approach becomes more systematic with the
use of a symbolic debugger (also called a source code debugger), because values of  different variables can be
easily checked and break points and watch points can be easily set to test the values of variables effortlessly.

2. Backtracking: This is also a fairly common approach. In this approach, beginning from the statement at which an
error symptom has been observed, the source code is traced backwards until the error is discovered.
Unfortunately, as the number of source lines to be traced back increases, the number of potential backward paths
increases and may become unmanageably large thus limiting the use of this approach.

3. Cause Elimination Method: In this approach, a list of causes which c ould possibly have contributed to the error
symptom is developed and tests are conducted to eliminate each. A related technique of identification of the error
from the error symptom is the software fault tree analysis.

4. Program Slicing: This technique is similar to back tracking. Here the search space is reduced by defining slices. A
slice of a program for a particular variable at a particular statem ent is the set of source lines preceding this
statement that can influence the value of that variable

## 9. Error Seeding

In error-seeding technique, a predefined number of artificially generated errors is "sown" in the program code. After
that, test runs are used to detect errors and to examine the ratio between actual and artificial errors based on the total
number of detected errors. The testers do not know the artificially generated errors.

Error seeding, as the name implies, seeds the code with some know n errors. In other words, some artificial errors are
introduced into the program artificially. The number of these seeded errors detected in the course of the standard
testing procedure is determined.

These values in conjunction with the number of unseeded errors detected can be used to predict:

- The number of errors remaining in the product.

- The effectiveness of the testing strategy.

Let N be the total number of defects in the system and let n of these defects be found by testing.
Let S be the total number of seeded defects, and let s of these defects be found during testing.
n/N = s/S
or
N = S × n/s
Defects still remaining after testing = N–n = n×(S – s)/s

Error seeding works satisfactorily only if the kind of seeded errors matches closely wi th the kind of defects that
actually exist. However, it is difficult to predict the types of errors that exist in a software. To some extent, the
different categories of errors that remain can be estimated to a first approximation by analysing historical d ata of
similar projects. Due to the shortcoming that the types of seeded errors should match closely with  the types of errors
actually existing in the code, error seeding is useful only to a moderate extent.

Mutation Testing
A mutation is a small change i n a program. Such small changes are intended to model low level defects that arise in
the process of coding systems. Ideally mutations should model low-level defect creation.

Mutation testing is a structural testing method aimed at assessing/improving the  adequacy of test suites, and
estimating the number of faults present in systems under test.

The process, given program P and test suite T, is as follows:

- We systematically apply mutations to the program P to obtain a sequence P1, P2,... Pn of mutants of P. Each
mutant is derived by applying a single mutation operation to P.

- We run the test suite T on each of the mutants, T is said to kill mutant Pj if it detects an error.

- If we kill k out of n mutants the adequacy of T is measured by the quotient k/n. T i s mutation adequate if k =
n.
One of the benefits of the approach is that it can be almost completely automated.

## 10. Software Project Management

In many ways managing a software project is like managing any other engineering project.  However, it is also tru e
that software project management is more difficult. Perhaps the most important reason is the product is intangible.
Monitoring the completio n status of an entity that one cannot see or feel is a formidable challenge.  Also standard
processes and designs do not exist in the software field in the same way that they are found in handbooks of other
engineering disciplines.  People are the crucial element in project management and can be organized in teams that
vary in their level of autonomy from traditional hierarchical structures to the “self-organizing” teams of the new agile
paradigm.

People Capability Maturity Model (P-CMM)
P-CMM is a framework for continuously improving the management and development of the human assets of an
organisation.  It provide s guidance in the following:

- Characterizing the maturity of workforce practices

- **Setting priorities for immediate action** — Integrating workforce development with process improvement

- Becoming an employer of choice

P-CMM can be used alone or in conjunction with the SEI software process improvement programs.

Project Estimation
Early in a project the software development group and management mus t establish estimates for resources required,
work to be done and time to delivery.  Project planning is crucial to suc cess.  Technical people frequently do not
take planning activities as seriously as they should and project cost; quality and time to delivery are often affected as a
result. Cost estimating techniques are available based on metrics accumulated from past si milar project experiences.
The usual approach is to use several methods and compare values. If these values vary widely, then this varian ce is
taken as an indication of the need for more information. COnstructive COst MOdel (COCOMO) II is a popular
estimation model for conventional software. The parameters in this model have been derived from data from over
4,000 software projects. Estimation methods have also been developed for object-oriented and agile development.
An important management observation is that software development time is not solely a function of the number of
people on the project. One should not succumb quickly to the temptation to add more people to a late project. Adding
more people could actually make it later.

## 11. COCOMO
Constructive Cost Estimation Model was proposed by Boehm [1981]. According to Boehm, software cost estimation
should be done through three stages: Basic COCOMO, Intermediate COCOMO, and Complete COCOMO.

The basic COCOMO model gives an approximate estimate of the proje ct parameters. The basic COCOMO estimation
model is given by the following expressions:

- KLOC is the estimated size of the software product expressed in Kilo Lines of Code,

- a1, a2, b1, b2 are constants for each category of software products,

- Tdev is the estimated time to develop the software, expressed in months,

- Effort is the total effort required to develop the software product, expressed in person months (PMs).

The effort estimation is expressed in units of person -months (PM). It is the area under the person -month plot. It
should be carefully noted that an effort of 100 PM does not imply that 100 persons should work  for 1 month nor does
it imply that 1 person should be employed for 100 months, but it denotes the area under the person-month curve.

## 12. Risk Management

Anticipating and having a plan for potential project problems will help avoid “crisis management” when problems do
occur.  The Spiral Process Model discussed earlier provides a framework for dealing with this issue. An investment
of project management time in risk identification and monitoring can help keep potential problems to a minimum.
Some examples of project risks are: changing requirements, low estimates of components reuse, high technical staff
turnover and change in delivery deadline.

Risk assessment
The objective of risk assessment is to rank the risks in terms of their damage causing potential. For risk assessment,
first each risk should be rated in two ways:

- The likelihood of a risk coming true (denoted as r).

- The consequence of the problems associated with that risk (denoted as s).

Based on these two factors, the priority of each risk can be computed:

p = r * s
Where, p is the priority with which the risk must be handled, r is the probability of the risk becoming true, and s is the
severity of damage caused due to the risk becoming true. If all identified risks are prioritized, then the most likely and
damaging risks can be handled first and more comprehensive risk abatement procedures can be designed for these
risks.

Risk containment
After all the identified risks of a project are assessed, plans must be made to contain the most damaging and the most
likely risks. Different risks require different containment procedures. In fact, most risks require ingenuity on the pa rt
of the project manager in tackling the risk.

Risk containment Strategies
1. Avoid the risk: This may take several forms such as discussing with the customer to change the requirements
to reduce the scope of the work, giving incentives to the engineers to avoid the risk of manpower turnover,
etc.
2. Transfer the risk : This strategy involves getting the risky component developed by a third party, buying
insurance cover, etc.
3. Risk reduction: This involves planning ways to contain the damage due to a risk. For example, if there is risk
that some key personnel might leave, new recruitment may be planned.

Risk leverage
To choose between the different strategies of handling a risk, the project manager must consider the cost of handling
the risk and the corresponding reduction of risk. For this the risk leverage of the different risks can be computed.

Risk leverage is the difference in risk exposure divided by the cost of reducing the risk. More formally,
risk leverage = (risk exposure before reduction – risk exposure after reduction) / (cost of reduction)

## 13. ISO 9000 Certification vs. SEI/CMM

ISO 9000 is a set of standards for quality assurance systems. The standards were developed by the International
Organization for Standardization (ISO). First published in 1987, t he standards were revised in 1994. They provide a
foundation for organizations to develop or improve their quality assurance systems. ISO 9000 d escribes the elements
of a quality assurance system in general terms. These elements include the organizational structure, procedures,
processes, and resources needed to implement quality planning, quality control, quality assurance, and quality
improvement. However, ISO 9000 does not describe how an organization should implement these quality system
elements. Consequently, the challenge lies in designing and implementing a quality assurance system that meets the
standard and fits the company’s products, services, and culture.

SEI CMM: Key process areas (KPA) of a software organization
Except for SEI CMM level 1, ea ch maturity level is characterized by several Key Process Areas (KPAs) that includes
the areas an organization should focus to improve its softw are process to the next level. The focus of each level and
the corresponding key process areas

CMM Level Focus Key Process Ares
## 1. Initial  Competent people
2. Repeatable Project management Software project planning Software configuration
management
3. Defined  Definition of processes  Process definition training program peer reviews
4. Managed  Product and process quality  Quantitative process metrics Software quality
management
5. Optimizing  Continuous process improvement  Defect prevention process change management
technology change management

Difference between of ISO 9000 certification and the SEI CMM
For quality appraisal of a software development organization, the characteristics of IS O 9000 certification and the SEI
CMM differ in some respects. The differences are as follows:

- ISO 9000 is awarded by an international standards body. Therefore, ISO 9000 certification can be quoted by an
organization in official documents, communication wi th external parties, and the tender quotations.
However, SEI CMM assessment is purely for internal use.

- SEI CMM was developed specifically for software industry and therefore addre sses many issues which are
specific to software industry alone.

- SEI CMM goes  beyond quality assurance and prepares an organization to ultimately achieve Total Quality
Management (TQM). In fact, ISO 9001 aims at level 3 of SEI CMM model.

- SEI CMM model provi des a list of key process areas (KPAs) on which an organization at any maturity level
needs to concentrate to take it from one maturity level to the next. Thus, it provides a way for achieving
gradual quality improvement.

## 14. Software Security

Everyone is aware that security is one of the most important issues in the computer field today. What is not apparent
to everyone is that the security challenges today are frequently software problems. The weak points are the
applications at the ends of the communicati ons link and therefore represent the points of greatest vulner ability to
attack.
Three trends are often cited as introducing security risks into systems and contributing to the magnitude of the
security problem today.
1. The increasing complexity of systems make them more difficult to understand and hence more difficult to secure.
2. Increasing access to applications through various computer network technologies adds considerably to the
security risks.
3. Software is being increasingly designed to be extensible with  the incremental addition of functionality making it
impossible to anticipate the kind of mobile code (updates) that may be downloaded.

Can Security be Defined?
A good question is “Can we ever declare a software application secure?”. Unfortunately securi ty, like many other
engineering goals, is a relative quantity and 100 percent security is unachievable. A better question is to be more
specific and ask, “Secure against what and from whom?”.  Some consider security to be a subset of reliability.

### 14.1 Approaches to the Security Problem

Penetrate and Patch:  Often software is developed in an “Internet time” highly compressed schedule in order to be
first to market. This approach considers security as an add -on feature after delivery. When vulnerabilities ar e found,
frequently as a result of an attack, patches are developed and issued to the user community. There are many problems
with this “penetrate-and-patch” approach to security. Here are a few:

- “Developers can only patch problems which they know about. A ttackers may find problems that they never
report to developers.

- Patches are rushed out as a result of market pressures on vendors, and often introduce new problems of their own
to a system.

- Patches often only fix the symptom of a problem, and do nothing to address the underlying cause.

- Patches often go unapplied, because system administrators tend to be overworked and often do not wish to make
changes to a system that “works [7]”. It should also be noted that system administrators are often not security
experts.

### 14.2 Build Security into the Software Development Life Cycle

The recommended approach is to incorporate software security as an engineering goal throughout the software
engineering life cycle. Since many of the issues of software security are issues of risk management, the spiral model of
software development is often mentioned as appropriate, with the repetitive spiral refining and converging security
considerations toward the final goal.  Some activities that should be added to each life cycle st age are listed below.

- Requirements: Add security specifications.

- Design: Develop threat models by viewing the system form an adversary’s perspective and apply security
design principles, e.g. “Design with the Enemy in Mind”

- Implementation: Add secure coding standards and language subsets

- Testing: Add Security test plans and use random input testing (e.g. Fuzz Testing) or vulnerability analysis
using penetration testing.

Principles for Software Security
It has been said that 90% of security problems can be avoided if the following principles are followed:
## 1. Secure the weakest link: security is a chain
2. Practice defence in depth: manage risk with diverse defensive strategies
## 3. Fail securely: Failures are unavoidable and should be planned for
4. Follow the princi ple of least privilege: minimum access required to perform an operation and only for the
minimum time necessary
5. Compartmentalize: minimize the amount of potential damage by organizing the system into the smallest number
of units as possible.
## 6. Keep it simple
## 7. Promote privacy
## 8. Remember that hiding secrets is inherently difficult
9. Be reluctant to trust: Servers should be designed to distrust clients and conversely.
10. Use your community resources: Use security libraries and cryptographic algorithms that have been wi dely used
and evaluated

### 14.3 Some Important Specific Software Security Issues
Language Selection: Many factors influence the choice of a programming language to use for implementation. It is
common for efficiency considerations to dominate the language se lection process. One of the factors  should be
security considerations. For example, choosing the C programming language for efficiency should take into account
the inherent security risks associated with a language that has no bounds checks on array and po inter references. The
programmer must build these checks into the program code. C program efficiencies and low -level data manipulation
capabilities come at the high risk of security vulnerabilities and very special diligence is required. Using a language
like Java can greatly reduce these risks, since it performs bounds checking.  However, the system requirements must
tolerate a lower level of run-time performance for this to be a viable option.

Buffer Overflows: Buffer overflows as a security vulnerabilit y have been discussed for 40 years and yet this type of
software problem continues to be one of the most frequently reported instances of system attacks. A buffer overflow is
a condition caused by a write operation into a fixed-sized buffer in which the size of the data is larger than the size of
the buffer. Most buffer overflows are the result of the properties of the C language mentioned in the last section above.
This is the case with C++ as well.




---

## Interactive Practice Quiz Deck

Test your mastery with our complete interactive multiple-choice assessment deck. Select an answer to evaluate your reasoning and reveal detailed explanatory feedback!

```quiz
[
  {
    "question": "Q1. Which of the following term describes testing?",
    "options": [
      "Finding broken code",
      "Evaluating deliverable to find errors",
      "A stage of all projects",
      "None of the mentioned",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "2.  (d)"
  },
  {
    "question": "Q2. Lower and upper limits are present in which chart?",
    "options": [
      "Run chart",
      "Bar chart",
      "Control chart",
      "None of the mentioned",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q3. What are the various Testing Levels?",
    "options": [
      "Unit Testing",
      "System Testing",
      "Integration Testing",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "4.  (d)"
  },
  {
    "question": "Q4. The testing in which code is checked",
    "options": [
      "Black box testing",
      "White box testing",
      "Red box testing",
      "Green box testing",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q5. Acceptance testing is also known as",
    "options": [
      "Grey box testing",
      "White box testing",
      "Alpha Testing",
      "Beta testing",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "Both %d and %i can be used as a format identifier for int data type."
  },
  {
    "question": "Q6. Beta testing is done at",
    "options": [
      "User’s end",
      "Developer’s end",
      "User’s & Developer’s end",
      "None of the mentioned",
      "Tester’s end"
    ],
    "correctIndex": 2,
    "explanation": "The size of the data types depend on the system."
  },
  {
    "question": "Q7. Which of the following testing types i s not a part of system testing?",
    "options": [
      "Recovery testing",
      "Stress testing",
      "System testing",
      "Random testing",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "8.  (d); There are no void objects."
  },
  {
    "question": "Q8. What is testing process’ first goal?",
    "options": [
      "Bug prevention",
      "Testing",
      "Execution",
      "Analyses",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q9. Software mistakes during coding are known as",
    "options": [
      "errors",
      "failures",
      "bugs",
      "defects",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "10.  (c)"
  },
  {
    "question": "Q10. Effective testing will reduce _______ cost.",
    "options": [
      "maintenance",
      "design",
      "coding",
      "documentation",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q11. Which model in system modelling depicts the static nature of the system ?",
    "options": [
      "Behavioral Model",
      "Context Model",
      "Data Model",
      "Structural Model",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "12.  (d)"
  },
  {
    "question": "Q12. The UML supports event -based modeling using ______ diagrams.",
    "options": [
      "Deployment",
      "Collaboration",
      "State chart",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q13. Selection of a model is based on",
    "options": [
      "Requirements",
      "Development team & Users",
      "Project type and associated risk",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "14.  (c)"
  },
  {
    "question": "Q14. The spiral model was originally proposed by",
    "options": [
      "IBM",
      "Barry Boehm",
      "Pressman",
      "Royce",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q15. ________ allows us to infer that different members of classes have some common characteristics.",
    "options": [
      "Realization",
      "Aggregation",
      "Generalization",
      "dependency",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "16.  (b)"
  },
  {
    "question": "Q16. Which of the following diagram is not supported by UML considering Data-driven modeling?",
    "options": [
      "Activity",
      "Data Flow Diagram (DFD)",
      "State Chart",
      "Component",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q17. Which model in system modelling depicts the dynamic behaviour of the system?",
    "options": [
      "Context Model",
      "Behavioral Model",
      "Data Model",
      "Object Model",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "18.  (d)"
  },
  {
    "question": "Q18. Unit testing is done by..",
    "options": [
      "Users",
      "Developers",
      "Customers",
      "None of the mentioned",
      "Tester"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q19. Efficiency in a software product does not include ___",
    "options": [
      "responsiveness",
      "licensing",
      "memory utilization",
      "processing time",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "20.  (b)"
  },
  {
    "question": "Q20. Which of these does not account for software failure?",
    "options": [
      "Increasing Demand",
      "Low expectation",
      "Increasing Supply",
      "Less reliable and expensive",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q21. What is Cyclomatic complexity?",
    "options": [
      "Black box testing",
      "White box testing",
      "Yellow box testing",
      "Green box testing",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "22.  (b)"
  },
  {
    "question": "Q22. Maintenance testing is performed using which methodology?",
    "options": [
      "Retesting",
      "Sanity testing",
      "Breadth test and depth test",
      "Confirmation testing",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q23. Which of the following is non-functional testing?",
    "options": [
      "Black box testing",
      "Performance testing",
      "Unit testing",
      "None of the mentioned",
      "White box testing"
    ],
    "correctIndex": 2,
    "explanation": "24.  (b)"
  },
  {
    "question": "Q24. SPICE stands for",
    "options": [
      "Software Process Improvement and Compatibility Determination",
      "Software Process Improvement and Control Determination",
      "Software Process Improvement and Capability dEtermination",
      "None of the mentioned",
      "Simulation Process Impliment and Capability Determination"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q25. Which of the following is not used in measuring the size of the software?",
    "options": [
      "KLOC",
      "Function Points",
      "Size of module",
      "None of the mentioned",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 2,
    "explanation": "26.  (d)"
  },
  {
    "question": "Q26. Which testing integrates the set of classes required to respond to one input or event for the system?",
    "options": [
      "cluster testing",
      "thread-based testing",
      "use-based testing",
      "Both",
      "and",
      "",
      "None of these"
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q27. Which of the following is a part of testing OO code?",
    "options": [
      "Validation tests",
      "Integration tests",
      "Class tests",
      "System tests",
      "All of the mentioned"
    ],
    "correctIndex": 2,
    "explanation": "28.  (d)"
  },
  {
    "question": "Q28. In which of the following test ing strategies, a smallest testable unit is the encapsulated class or object?",
    "options": [
      "Unit testing",
      "Integration testing",
      "System testing",
      "Machine testing",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q29. Test should be conducted for every possible",
    "options": [
      "data",
      "case",
      "variable",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "30.  (c)"
  },
  {
    "question": "Q30. Which of the following is not a part of bug report?",
    "options": [
      "Test case",
      "Output",
      "Software Version",
      "LOC",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q31. Boundary value analysis belongs to?",
    "options": [
      "White Box Testing",
      "Black Box Testing",
      "White Box & Black Box Testing",
      "Silver box testing",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "32.  (c)"
  },
  {
    "question": "Q32. Which of the following life cycle model can be chosen if the development team has less experience on similar projects?",
    "options": [
      "Spiral",
      "Waterfall",
      "RAD",
      "Iterative Enhancement Model",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q33. The spiral model has two dimensions namely _______  and ____________",
    "options": [
      "diagonal, angular",
      "radial, perpendicular",
      "radial, angular",
      "diagonal, perpendicular",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "Procedural languages sequentially execute a set of imperative statements to achieve the desired effect."
  },
  {
    "question": "Q34. Which of the following is/are White box technique?",
    "options": [
      "Statement Testing",
      "Decision Testing",
      "Condition Coverage",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "35.  (d)"
  },
  {
    "question": "Q35. Testing done without planning and Documentation is called",
    "options": [
      "Unit testing",
      "Regression testing",
      "Adhoc testing",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q36. Behavioral testing is",
    "options": [
      "White box testing",
      "Black box testing",
      "Grey box testing",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "37.  (d)"
  },
  {
    "question": "Q37. The construction of object -oriented s oftware begins with the creation of",
    "options": [
      "design model",
      "analysis model",
      "code levels",
      "both design and analysis model",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q38. ____ methods can be used to drive validations tests",
    "options": [
      "Yellow-box testing",
      "Black-box testing",
      "White-box testing",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 4,
    "explanation": "39.  (c)"
  },
  {
    "question": "Q39. Name an evaluation technique to assess the quality of test cases.",
    "options": [
      "Mutation analysis",
      "Validation",
      "Verification",
      "Performance analysis",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q40. Which of the following is a common pointwer problem?",
    "options": [
      "Data sharing errors",
      "Accessing data elements of the wrong type",
      "Attempting to use memory areas after freeing them",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "41.  (b)"
  },
  {
    "question": "Q41. Which perspective in system modelling shows the system or data architecture?",
    "options": [
      "Structural perspective",
      "Behavioral perspective",
      "External perspective",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q42. Which level of Entity Relationship Diagram (ERD) models all entities and relationships?",
    "options": [
      "Level 1",
      "Level 2",
      "Level 3",
      "Level 4",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "43.  (d); class A has been declared final hence it cannot be inherited by any other class. Hence class B does not have member i, giving compilation error."
  },
  {
    "question": "Q43. Which of the following statement is incorrect regarding the Class-responsibility-collaborator (CRC) modeling?",
    "options": [
      "All use -case scenarios (and corresponding use-case diagrams) are organized into categ ories in CRC modelling",
      "The review leader reads the use-case deliberately",
      "Only developers in the review (of the CRC model) are given a subset of the CRC model index cards",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q44. Which two models doesn’t al low defining requirements early in the cycle?",
    "options": [
      "Waterfall & RAD",
      "Prototyping & Spiral",
      "Prototyping & RAD",
      "Waterfall & Spiral",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "45.  (d)"
  },
  {
    "question": "Q45. Which two of the following models will not be able to give the desired outcome if user’s participation is not involved?",
    "options": [
      "Waterfall & Spiral",
      "RAD & Spiral",
      "RAD & Waterfall",
      "RAD & Prototyping",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q46. Choose the correct option from given below:",
    "options": [
      "Prototyping Model facilitates re -usability of components",
      "RAD Model Model facilitates re -usability of components",
      "B oth RAD & Prototyping Model facilitates re-usability of components",
      "None of these",
      "All",
      ",",
      "and",
      ""
    ],
    "correctIndex": 6,
    "explanation": "In Java, arrays  are objects, they have members like length. The length member is final and cannot be changed. All objects are allocated on heap in Java, so arrays are also allocated on heap."
  },
  {
    "question": "Q47. What is the major advantage of using Incremental Model?",
    "options": [
      "Customer can respond to each increment",
      "Easier to test and debug",
      "It is used when there is a need to get a product to the market early",
      "Easier to test and debug & It is used when there is a need to get a product to the market early",
      "None of these"
    ],
    "correctIndex": 4,
    "explanation": "48.  (a)"
  },
  {
    "question": "Q48. Identify the disadvantage of Spiral Model.",
    "options": [
      "Doesn’t work well for smaller projects",
      "High amount of risk analysis",
      "Strong approval and documentation control",
      "Additional Functionality can be added at a later date",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q49. White Box techniques are also classified as",
    "options": [
      "Design based testing",
      "Structural testing",
      "Error guessing technique",
      "None of the mentioned",
      "Solution testing"
    ],
    "correctIndex": 0,
    "explanation": "In C, function parameters are always passed by value. Pass -by-reference is simulated in C b y explicitly passing pointer values."
  },
  {
    "question": "Q50. The object of ___________within an OO system is to design tests that have a high  likelihood of uncovering plausible bugs.",
    "options": [
      "Fault-based testing",
      "Integration testing",
      "Use-based testing",
      "Scenario-based testing",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "51.  (b); Since the size of the structure depends on its fields, it has a variable size."
  },
  {
    "question": "Q51. _____________ categorizes class operations based on the generic function that each performs",
    "options": [
      "Category-based partitioning",
      "Attribute-based partitioning",
      "State-based partitioning",
      "None of the mentioned",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q52. What refers to the externally observable structure of an OO program?",
    "options": [
      "Deep structure",
      "Surface structure",
      "Core structure",
      "All of the above",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "While the structure is declared, it will not be initialized, So it will not allocate any memory."
  },
  {
    "question": "Q53. Cyclomatic Complexity method comes under which testing method.",
    "options": [
      "Yellow box",
      "White box",
      "Gray box",
      "Black box",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "54.  (c)"
  },
  {
    "question": "Q54. Which of the following is the way of ensuring that the tests are actually testing code?",
    "options": [
      "Control structure testing",
      "Complex path testing",
      "Code coverage",
      "Quality assurance of software",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q55. The Unified Modeling Language (UML) has become an effective standard for sof tware modelling. How many different notations does it have?",
    "options": [
      "Three",
      "Four",
      "Six",
      "Nine",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "56.  (b)"
  },
  {
    "question": "Q56. ______ & ________ diagrams of UML represent Interaction modeling.",
    "options": [
      "Use Case, Sequence",
      "Class, Object",
      "Activity, State Chart",
      "All of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q57. If you were a lead developer of a sof tware company and you are asked to submit a project/product within a stipulated time -frame with no cost barriers, which model would you select?",
    "options": [
      "Waterfall",
      "Spiral",
      "RAD",
      "Incremental",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "58.  (a)"
  },
  {
    "question": "Q58. A company is developing an advance ve rsion of their current software available in the market, what model approach would they prefer ?",
    "options": [
      "RAD",
      "Iterative Enhancement",
      "Both RAD & Iterative Enhancement",
      "Spiral",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q59. The Incremental Model is a result of combination of elements of which two models?",
    "options": [
      "Build & FIX Model & Waterfall Model",
      "Linear Model & RAD Model",
      "Linear Model & Prototyping Model",
      "Waterfall Model & RAD Model",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "60.  (a)  12 Practice Sets Professional Knowledge Practice Set: 01  1. Which SQL command is used to delete complete table from the database? (a) Delete   (b) Truncate  (c) Drop (d) Remove  (e) Select 2.  Bit stuffing technique used in which method? (a) Checking error (b) flow control (c) framing (d) Route finding (e) Update Anomaly 3. The phase of the SDLC in which an information system is systematically repaired and improved is referred to as________ (a) Analysis  (b) Implementation (c) Maintenance (d) Testing (e) Coding 4. What is loopback address? (a) 127.0.0.1  (b) 255.0.0.0 (c) 255.255.0.0 (d) 127.0.0.0  (e) 111.0.0.128 5. Congestion Control is done by which layer? (a) Data link Layer (b) Network Layer (c) Transport Layer (d) Application Layer (e) Presentation Layer 6. Which of the following is a form of virus explicitly designed to hide itself fro m detection by antivirus software. (a)Stealth Virus (b)Macro Virus (c)Polymorphic Virus (d) Parasitic Virus (e)Both (c) and (d) 7. Which of the following variable is used to hold the address of another object? (a) Integer  (b) Pointer (c) Constant (d) Memory Variable   (e) Interrupt 8. Alpha testing is done on which side of software development? (a) Customer side (b) Developer side (c) Both Customer side and developer side (d) Server side  (e) None of these 9. What is Dirty Bit in operating system? (a) Page with corrupted data (b) Wrong page in the memory (c) Page that is modified after being loaded in to cache memory (d) Page that is less frequently accessed (e) Page contain high memory location 10. Which cloud computing service is provided b y Microsoft? (a)Azure   (b)Elastic  (c)Smart (d)Grid   (e)Coral 11. Shell is the exclusive feature of: (a) UNIX   (b) DOS  (c) VMWare (d) Application software  (e) Utility Software 12. Which of the following is a keyword used for a storage class in C programming? (a) printf    (b) external  (c) auto (d) scanf    (e) readf 13. Ethernet uses a _____________ physical address that is imprinted on the network interface card. (a) 64 bit   (b) 68 byte (c) 6 bit (d) 6 byte   (e) 32 bit 14. Which of the following is the time interval between the submission and completion of job? (a) Waiting time  (b) Turnaround time (c) Throughput  (d) Response time (e) Output time 15. Which of the following is used to convert infix notation to postfix notation in data structure? (a) Branch  (b) Queue   (c) Tree (d) Stack   (e) List 16. Which of the memories has the shortest access time? (a) Cache memory  (b) Magnetic bubble memory (c) Magnetic core memory (d) RAM    (e) Optical 17. Foreign key can take which type of value? (a) Same value as the primary key it refers (b) Any New value (c) NULL value (d) Value which is different from primary key (e) All the values of a relation 18. What is the process of defining a method in terms of itself, that is a method that calls itself? (a) Polymorphism (b) Abstraction (c) Encapsulation (d) Recursion (e) Inheritance 19. Which of the following testing method is used to test the software without knowing the internal structure of code or program? (a)White box Testing (b)Alpha testing (c)Black box Testing (d)Grey box testing (e)Beta testing 20. What is the file extension of compiled java program? (a) (.class)   (b) (.java)  (c) (.css) (d) (.html)  (e) (.xml) 21.  Which of the following is an authorization command in SQL? (a) Access   (b) Allow  (c) Grant (d)Revoke  (e) Permission 22. What is the use of HTTP protocol? (a) Information access (b) Telnet   (c) E- mail (d) FTP   (e) Routing 23.  Which tool is use for structured designing? (a) Program flowchart (b) Structure chart (c) Data-flow diagram (d) Module (e) Design Manual 24. Which of the following is true for  CIDR (Classless Inter Domain Routing) ?"
  },
  {
    "question": "Q60. If you were to create client/server applications, which model would you go for?",
    "options": [
      "WINWIN Spiral Model",
      "Spiral Model",
      "Concurrent Model",
      "Incremental Model",
      "None of these  SOLUTIONS"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q1. Which of the following is true about NULL pointer?",
    "options": [
      "A pointer which points nothing.",
      "A pointer which points a single value",
      "Both",
      "and",
      "",
      "A pointer which points a double value",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "2.  (d)"
  },
  {
    "question": "Q2. Which of the following is not a valid variab le name declaration?",
    "options": [
      "int __a3;",
      "int __3a;",
      "int __A3;",
      "None of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q3. All keywords in C are in",
    "options": [
      "Lower Case letters",
      "Upper Case letters",
      "Camel Case letters",
      "None of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "4.  (d)"
  },
  {
    "question": "Q4. Which of the following is not a valid C variable name?",
    "options": [
      "int number;",
      "float rate;",
      "int variable_count;",
      "int $main;",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q5. The format identifier ‘%i’ is also used for _____ data type?",
    "options": [
      "char",
      "int",
      "float",
      "double",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "Both %d and %i can be used as a format identifier for int data type."
  },
  {
    "question": "Q6. What is the size of an int data type?",
    "options": [
      "4 Bytes",
      "8 Bytes",
      "Depends on the system/compiler",
      "Cannot be determined",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "The size of the data types depend on the system."
  },
  {
    "question": "Q7. Which of the following will not return a value?",
    "options": [
      "null",
      "void",
      "empty",
      "free",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "8.  (d); There are no void objects."
  },
  {
    "question": "Q8. What does the following statement mean? void a;",
    "options": [
      "variable a is of type void",
      "a is an object of type void",
      "declares a variable with value a",
      "flags an error",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q9. The name of the variable used in one function cannot be used in another function",
    "options": [
      "True",
      "False",
      "Either",
      "or",
      "",
      "None of these",
      "It will show compile time error"
    ],
    "correctIndex": 4,
    "explanation": "10.  (c)"
  },
  {
    "question": "Q10. Which is correct with respect to size of the data types?",
    "options": [
      "char > int > float",
      "int > char > float",
      "char < int < double",
      "double > char > int",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q11. Which of the se values can a Boolean variable contain?",
    "options": [
      "True & False",
      "0 & 1",
      "Any integer value",
      "Only True",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "12.  (d)"
  },
  {
    "question": "Q12. What is the process of defining a method in terms of itself, that is a method that calls itself?",
    "options": [
      "Polymorphism",
      "Abstraction",
      "Encapsulation",
      "Recursion",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q13. Which of these keywords is used to make a class?",
    "options": [
      "class",
      "struct",
      "int",
      "constructor",
      "abstract"
    ],
    "correctIndex": 0,
    "explanation": "14.  (c)"
  },
  {
    "question": "Q14. Which of these operators is used to allocate memory for an object?",
    "options": [
      "malloc",
      "alloc",
      "new",
      "give",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q15. Which keyword can be used for coming out of recursion?",
    "options": [
      "break",
      "return",
      "exit",
      "Both break and return",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "16.  (b)"
  },
  {
    "question": "Q16. int[ ] ={5,6,7,8,9} What is the value of a[3]?",
    "options": [
      "9",
      "8",
      "7",
      "6",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q17. Array is a..",
    "options": [
      "Both",
      "and",
      "",
      "Pointer data type",
      "Heterogeneous data type",
      "Homogeneous data type",
      "None of these"
    ],
    "correctIndex": 5,
    "explanation": "18.  (d)"
  },
  {
    "question": "Q18. Which symbol is used as a statement terminator in C?",
    "options": [
      "!",
      "~",
      "#",
      ";",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q19. If the size of the array is less than the number of initializes then, ……….",
    "options": [
      "extra values are being ignored",
      "generates an error message",
      "size of array is increased",
      "size is neglected when values are given",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "20.  (b)"
  },
  {
    "question": "Q20. A compiler …………….",
    "options": [
      "Is a single computer program",
      "Translates a high level language into machine language",
      "Is a part of software and hardware",
      "Editor",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q21. Which of the following is not a type of constructor?",
    "options": [
      "Copy constructor",
      "Friend constructor",
      "Default constructor",
      "Parameterized constructor",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "22.  (b)"
  },
  {
    "question": "Q22. Which one is a valid declaration of a boolean?",
    "options": [
      "boolean b1 = 1;",
      "boolean b2 = ‘false’;",
      "boolean b3 = 0;",
      "boolean b4 = ‘true’",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q23. Input/output function prototypes and macros are defined in which header file?",
    "options": [
      "conio.h",
      "stdlib.h",
      "stdio.h",
      "dos.h",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "24.  (b)"
  },
  {
    "question": "Q24. What does the following declaration mean? int(*ptr)[10].",
    "options": [
      "ptr is array of pointers to 10 integers.",
      "ptr is a pointer to an array of 10 integers",
      "ptr is an array of 10 integers",
      "ptr is an pointer to array",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q25. The constructor and the destructor  of a class are automatically invoked when memory is allocated and deallocated to an ….",
    "options": [
      "Data type",
      "Copy constructor",
      "Object",
      "None of the above",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 2,
    "explanation": "26.  (d)"
  },
  {
    "question": "Q26. A destructor is used to destroy the objects that have been created by a ………………..",
    "options": [
      "object",
      "class",
      "function",
      "constructor",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q27. When the base class is publicly inherited, public members of the base class become …………. of the derived class.",
    "options": [
      "private members",
      "protected members",
      "Public members",
      "Not inherited",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "28.  (d)"
  },
  {
    "question": "Q28. Which of these keyword must be used to inherit a class?",
    "options": [
      "super",
      "this",
      "extent",
      "extends",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q29. Which of these keywords is used to refer to member of base class from a sub class?",
    "options": [
      "upper",
      "super",
      "this",
      "None of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 6,
    "explanation": "30.  (c)"
  },
  {
    "question": "Q30. Which of these is supported by method overriding in Java?",
    "options": [
      "Abstraction",
      "Encapsulation",
      "Polymorphism",
      "None of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q31. Which of these keyw ords ca n be used to prevent Method overriding?",
    "options": [
      "static",
      "constant",
      "protected",
      "final",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "32.  (c)"
  },
  {
    "question": "Q32. What is cfront in C++ ?",
    "options": [
      "is the front end of a C compiler",
      "is the pre-processor of a C compiler",
      "is a tool that translates a  C++ co de to its equivalent C code",
      "none of the above",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q33. Which of the following are procedural languages?",
    "options": [
      "Pascal",
      "Smalltalk",
      "C",
      "Both",
      "and",
      "",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "Procedural languages sequentially execute a set of imperative statements to achieve the desired effect."
  },
  {
    "question": "Q34. Which of the following concepts means wrapping up of data and functions together?",
    "options": [
      "Abstraction",
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "None of these"
    ],
    "correctIndex": 1,
    "explanation": "35.  (d)"
  },
  {
    "question": "Q35. Which of the following mechanisms is/are provided by Object Oriented Language to implement Object Oriented Model?",
    "options": [
      "Encapsulation",
      "Inheritance",
      "Polymorphism",
      "All of the above",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q36. We can convert numeric string to primitive number using …………………….",
    "options": [
      "parsing methods",
      "wrapper classes",
      "constructor methods",
      "abstract classes",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "37.  (d)"
  },
  {
    "question": "Q37. A package is a collection of",
    "options": [
      "Classes",
      "interfaces",
      "editing tools",
      "classes and interfaces",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q38. Which of the following is true about multithreading in Java?",
    "options": [
      "Multithreading in java is a process of executing multiple threads simultaneously.",
      "Thread is basically a lightweight sub -process, a smallest unit of processing.",
      "Java Multithreading is mostly used in games, animation etc.",
      "None of these",
      "All",
      ",",
      ", and",
      ""
    ],
    "correctIndex": 4,
    "explanation": "39.  (c)"
  },
  {
    "question": "Q39. Which of the following is not an Advantage of Garbage Collection in java?",
    "options": [
      "It makes java memory efficient because garbage collector removes the unreferenced objects from heap memory.",
      "It is automatically done by the garbage collector (a part of JVM) so we don't need to make e xtra efforts.",
      "Both",
      "and",
      "",
      "None of these",
      "Either",
      "or",
      ""
    ],
    "correctIndex": 7,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q40. Which of the following keywords are used to control access to a class member?",
    "options": [
      "default",
      "break",
      "protected",
      "goto",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "41.  (b)"
  },
  {
    "question": "Q41. What will be output of the following C program? #include int xyz=10; int main() { int xyz=20; printf (“%d”, xyz); return 0; }",
    "options": [
      "10",
      "20",
      "30",
      "compilation error",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q42. If a=8 and b=15 then the statement x=(a>b) ? a:b;",
    "options": [
      "assigns a value 8 to x",
      "gives an error message",
      "assigns a value 15 to x",
      "assigns a value 7 to x",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "43.  (d); class A has been declared final hence it cannot be inherited by any other class. Hence class B does not have member i, giving compilation error."
  },
  {
    "question": "Q43. What is the output of this program? final class A { int i; } class B extends A { int j; System.out.println (j + \" \" + i); } class inheritance { public static void main(String args[]) { B obj = new B(); obj.display(); } }",
    "options": [
      "2 2",
      "3 3",
      "Runtime Error",
      "Compilation Error",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q44. What is the output of this program? class Alligator { public static void main(String[] args) { int []x[] = {{1,2}, {3,4,5}, {6,7,8,9}}; int [][]y = x; System.out.println (y[2][1]); } }",
    "options": [
      "2",
      "3",
      "7",
      "Compilation Error",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "45.  (d)"
  },
  {
    "question": "Q45. The output of the code below is #include <stdio.h> void main() { int x = 0; if (x == 0) printf(\"hi\"); else printf(\"how are u\"); printf(\"hello\"); }",
    "options": [
      "hi",
      "how are you",
      "hello",
      "hihello",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q46. Which of the following is FALSE about arrays on Java?",
    "options": [
      "A java array is always an object",
      "Length of array can be changed after creation of array",
      "Arrays in Java are always allocated on heap",
      "None of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 1,
    "explanation": "In Java, arrays  are objects, they have members like length. The length member is final and cannot be changed. All objects are allocated on heap in Java, so arrays are also allocated on heap."
  },
  {
    "question": "Q47. What is the use of final keyword in Java?",
    "options": [
      "When a class is made final, a subclass of it cannot be created.",
      "When a method is final, it cannot be overridden.",
      "When a variable is final, it can be assign ed value only once.",
      "None of these",
      "All",
      ",",
      ", and",
      ""
    ],
    "correctIndex": 4,
    "explanation": "48.  (a)"
  },
  {
    "question": "Q48. What will be the output of following Java program? class Main { public static void main(String args[]){  final int i; i = 20; System.out.println(i); } }",
    "options": [
      "20",
      "Compiler time error",
      "0",
      "None of these",
      "Run time error"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q49. In C, parameters are always",
    "options": [
      "Passed by value",
      "Passed by reference",
      "Non -pointer variables are passed by value and pointers are passed by reference",
      "Passed by value result",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "In C, function parameters are always passed by value. Pass -by-reference is simulated in C b y explicitly passing pointer values."
  },
  {
    "question": "Q50. Which of the following is true about FILE *fp ?",
    "options": [
      "FILE is a keyword in C for representing files and fp is a variable of FILE type.",
      "FILE is a structure and fp is a pointer to the structure of FILE type",
      "FILE is a stream",
      "FILE is a buffered stream",
      "File Handling"
    ],
    "correctIndex": 1,
    "explanation": "51.  (b); Since the size of the structure depends on its fields, it has a variable size."
  },
  {
    "question": "Q51. Which of the data types have size that is variable?",
    "options": [
      "int",
      "struct",
      "float",
      "double",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q52. What will happen when the structure is declared?",
    "options": [
      "it will not allocate any memory",
      "it will allocate the memory",
      "it will be declared and initialized",
      "none of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "While the structure is declared, it will not be initialized, So it will not allocate any memory."
  },
  {
    "question": "Q53. The data elements in structure are also known as what?",
    "options": [
      "objects",
      "members",
      "data",
      "None of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 1,
    "explanation": "54.  (c)"
  },
  {
    "question": "Q54. Which of these keywords is used to define packages in Java?",
    "options": [
      "pkg",
      "Pkg",
      "package",
      "Package",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q55. Which of the following is correct way of importing an entire package ‘pkg’?",
    "options": [
      "import pkg.",
      "Import pkg.",
      "import pkg.*",
      "Import pkg.*",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "56.  (b)"
  },
  {
    "question": "Q56. Which of the following is correct way of implementing an interface salary by class manager?",
    "options": [
      "class manager extends salary {}",
      "class manager implements salary {}",
      "class manager imports salary {}",
      "None of these",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q57. In which stage the following code #include<stdio.h>   gets replaced by the contents of the file stdio.h",
    "options": [
      "During Preprocessing",
      "During Execution",
      "During linking",
      "During Editing",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "58.  (a)"
  },
  {
    "question": "Q58. An array elements are a lways stored in ________ memory locations.",
    "options": [
      "Sequential",
      "Random",
      "Sequential and Random",
      "None of the above",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q59. What is function?",
    "options": [
      "Function is a block of statements that perform some specific task.",
      "Function is the fun damental modular unit. A function is usually designed to perform a specific task.",
      "Function is a block of code that performs a specific task. It has a name and it is reusable.",
      "All",
      ",",
      ", and",
      "",
      "None of the above"
    ],
    "correctIndex": 3,
    "explanation": "60.  (a)  12 Practice Sets Professional Knowledge Practice Set: 01  1. Which SQL command is used to delete complete table from the database? (a) Delete   (b) Truncate  (c) Drop (d) Remove  (e) Select 2.  Bit stuffing technique used in which method? (a) Checking error (b) flow control (c) framing (d) Route finding (e) Update Anomaly 3. The phase of the SDLC in which an information system is systematically repaired and improved is referred to as________ (a) Analysis  (b) Implementation (c) Maintenance (d) Testing (e) Coding 4. What is loopback address? (a) 127.0.0.1  (b) 255.0.0.0 (c) 255.255.0.0 (d) 127.0.0.0  (e) 111.0.0.128 5. Congestion Control is done by which layer? (a) Data link Layer (b) Network Layer (c) Transport Layer (d) Application Layer (e) Presentation Layer 6. Which of the following is a form of virus explicitly designed to hide itself fro m detection by antivirus software. (a)Stealth Virus (b)Macro Virus (c)Polymorphic Virus (d) Parasitic Virus (e)Both (c) and (d) 7. Which of the following variable is used to hold the address of another object? (a) Integer  (b) Pointer (c) Constant (d) Memory Variable   (e) Interrupt 8. Alpha testing is done on which side of software development? (a) Customer side (b) Developer side (c) Both Customer side and developer side (d) Server side  (e) None of these 9. What is Dirty Bit in operating system? (a) Page with corrupted data (b) Wrong page in the memory (c) Page that is modified after being loaded in to cache memory (d) Page that is less frequently accessed (e) Page contain high memory location 10. Which cloud computing service is provided b y Microsoft? (a)Azure   (b)Elastic  (c)Smart (d)Grid   (e)Coral 11. Shell is the exclusive feature of: (a) UNIX   (b) DOS  (c) VMWare (d) Application software  (e) Utility Software 12. Which of the following is a keyword used for a storage class in C programming? (a) printf    (b) external  (c) auto (d) scanf    (e) readf 13. Ethernet uses a _____________ physical address that is imprinted on the network interface card. (a) 64 bit   (b) 68 byte (c) 6 bit (d) 6 byte   (e) 32 bit 14. Which of the following is the time interval between the submission and completion of job? (a) Waiting time  (b) Turnaround time (c) Throughput  (d) Response time (e) Output time 15. Which of the following is used to convert infix notation to postfix notation in data structure? (a) Branch  (b) Queue   (c) Tree (d) Stack   (e) List 16. Which of the memories has the shortest access time? (a) Cache memory  (b) Magnetic bubble memory (c) Magnetic core memory (d) RAM    (e) Optical 17. Foreign key can take which type of value? (a) Same value as the primary key it refers (b) Any New value (c) NULL value (d) Value which is different from primary key (e) All the values of a relation 18. What is the process of defining a method in terms of itself, that is a method that calls itself? (a) Polymorphism (b) Abstraction (c) Encapsulation (d) Recursion (e) Inheritance 19. Which of the following testing method is used to test the software without knowing the internal structure of code or program? (a)White box Testing (b)Alpha testing (c)Black box Testing (d)Grey box testing (e)Beta testing 20. What is the file extension of compiled java program? (a) (.class)   (b) (.java)  (c) (.css) (d) (.html)  (e) (.xml) 21.  Which of the following is an authorization command in SQL? (a) Access   (b) Allow  (c) Grant (d)Revoke  (e) Permission 22. What is the use of HTTP protocol? (a) Information access (b) Telnet   (c) E- mail (d) FTP   (e) Routing 23.  Which tool is use for structured designing? (a) Program flowchart (b) Structure chart (c) Data-flow diagram (d) Module (e) Design Manual 24. Which of the following is true for  CIDR (Classless Inter Domain Routing) ?"
  },
  {
    "question": "Q60. Which of the following c orrectly accesses the seventh element stored in arr, an array with 100 elements?",
    "options": [
      "arr[6]",
      "arr[7]",
      "arr [5]",
      "arr [8]",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  }
]
```

---

