import { type ImageNote } from '@/types';

/**
 * Strictly match image notes to a specific heading section (No random fallbacks)
 */
export function findMatchingNotesForHeading(
  headingId: string,
  headingText: string,
  allNotes: ImageNote[]
): ImageNote[] {
  if (!allNotes || allNotes.length === 0) return [];

  const cleanHeading = headingText.toLowerCase();

  // Extract leading section number from heading (e.g. "1. What is OOP?" -> 1, "3. Objects and Classes" -> 3)
  const numMatch = headingText.match(/^(\d+)\.\s+/);
  const mainSectionNum = numMatch ? parseInt(numMatch[1], 10) : null;

  // ── Specific Keyword Dictionary for Strict Section Mapping ───────────────────

  // Procedural vs OOP section
  if (cleanHeading.includes('procedural vs') || cleanHeading.includes('what is procedural')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('procedur') ||
      n.title.toLowerCase().includes('procedural')
    );
  }

  // Abstraction
  if (cleanHeading.includes('abstraction')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('abstraction') ||
      n.title.toLowerCase().includes('abstraction')
    );
  }

  // Encapsulation
  if (cleanHeading.includes('encapsulation')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('encapsulation') ||
      n.filename.toLowerCase().includes('access_modifiers') ||
      n.title.toLowerCase().includes('encapsulation')
    );
  }

  // Inheritance
  if (cleanHeading.includes('inheritance')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('inheritance') ||
      n.filename.toLowerCase().includes('diamond_problem') ||
      n.title.toLowerCase().includes('inheritance')
    );
  }

  // Polymorphism
  if (cleanHeading.includes('polymorphism') || cleanHeading.includes('overloading') || cleanHeading.includes('overriding')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('polymorphism') ||
      n.filename.toLowerCase().includes('overloading') ||
      n.filename.toLowerCase().includes('overriding') ||
      n.filename.toLowerCase().includes('dispatch') ||
      n.title.toLowerCase().includes('polymorphism')
    );
  }

  // IS-A / HAS-A / Relationships
  if (cleanHeading.includes('relationship') || cleanHeading.includes('is-a') || cleanHeading.includes('has-a') || cleanHeading.includes('aggregation')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('is-a') ||
      n.filename.toLowerCase().includes('has-a') ||
      n.filename.toLowerCase().includes('aggregation') ||
      n.filename.toLowerCase().includes('relatio') ||
      n.title.toLowerCase().includes('relationship')
    );
  }

  // JVM / JRE / JDK
  if (cleanHeading.includes('jvm') || cleanHeading.includes('virtual machine')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('jvm') || n.title.toLowerCase().includes('jvm'));
  }
  if (cleanHeading.includes('jre') || cleanHeading.includes('runtime environment')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('jre') || n.title.toLowerCase().includes('jre'));
  }
  if (cleanHeading.includes('jdk') || cleanHeading.includes('development kit')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('jdk') || n.title.toLowerCase().includes('jdk'));
  }

  // WORA
  if (cleanHeading.includes('wora')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('wora') || n.title.toLowerCase().includes('wora'));
  }

  // Java Editions
  if (cleanHeading.includes('editions') || cleanHeading.includes('jse') || cleanHeading.includes('jee')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('editi') || n.filename.toLowerCase().includes('jse'));
  }

  // Main Method
  if (cleanHeading.includes('main method')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('main_method') || n.title.toLowerCase().includes('main method'));
  }

  // Class Structure
  if (cleanHeading.includes('class structure') || cleanHeading.includes('file naming') || cleanHeading.includes('first java program')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('class_struc') ||
      n.filename.toLowerCase().includes('file_naming') ||
      n.filename.toLowerCase().includes('first_java')
    );
  }

  // Platform Dependence
  if (cleanHeading.includes('platform dependence') || cleanHeading.includes('platform independence')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('platform'));
  }

  // Interview Questions
  if (cleanHeading.includes('interview')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('interview') || n.title.toLowerCase().includes('interview'));
  }

  // Master Summary / Revision Summary
  if (cleanHeading.includes('summary') || cleanHeading.includes('revision')) {
    return allNotes.filter(n => n.filename.toLowerCase().includes('master') || n.filename.toLowerCase().includes('summary') || n.title.toLowerCase().includes('summary'));
  }

  // Objects and Classes main section
  if (cleanHeading.includes('objects and classes') || cleanHeading.includes('what is an object') || cleanHeading.includes('what is a class')) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('what_is_an_objec') ||
      n.filename.toLowerCase().includes('what_is_a_class') ||
      n.filename.toLowerCase().includes('class_vs_object')
    );
  }

  // Section 1: What is OOP? / What is Java?
  if (mainSectionNum === 1) {
    return allNotes.filter(n =>
      n.order === 1 ||
      n.filename.toLowerCase().includes('core_definit') ||
      n.filename.toLowerCase().includes('mind_ma') ||
      n.filename.toLowerCase().includes('java_definit')
    );
  }

  // Section 2: WORA / Procedural
  if (mainSectionNum === 2) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('procedur') ||
      n.filename.toLowerCase().includes('wora')
    );
  }

  // Section 3: Three Components / Objects and Classes
  if (mainSectionNum === 3) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('three_components') ||
      n.filename.toLowerCase().includes('objec') ||
      n.filename.toLowerCase().includes('class')
    );
  }

  // Section 4: Four Pillars / Java Editions
  if (mainSectionNum === 4) {
    return allNotes.filter(n =>
      n.filename.toLowerCase().includes('four_pillars') ||
      n.filename.toLowerCase().includes('editi')
    );
  }

  // Strict fallback check: only match if filename explicitly contains section number or exact title match
  if (mainSectionNum !== null) {
    const strictNumMatches = allNotes.filter(n => n.order === mainSectionNum || n.sectionNumber === mainSectionNum);
    if (strictNumMatches.length > 0) {
      return strictNumMatches;
    }
  }

  // Strict: if no match found, return empty array (NO Visualize button rendered for irrelevant sub-headings!)
  return [];
}
