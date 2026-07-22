import fs from 'fs';
import path from 'path';

const sourceDir = 'e:/Notes/Java';
const targetDir = 'e:/Notes/Java/java-mastery/src/content/lessons';

const mapping = {
  '1.OOP_Fundamentals_Java.md': 'oop-fundamentals',
  '2.HOW_JAVA_WORKS.md': 'how-java-works',
  'java_variables_study_guide.md': 'variables-primitive-types',
  'Java_Variables_Part2_Reference_Types.md': 'reference-types',
  'java_float_double_ieee754_study_guide.md': 'float-double-ieee754',
  'java_operators_study_guide.md': 'operators',
  'java-methods-study-guide.md': 'methods',
  'Java_Constructors.md': 'constructors',
  'java_types_of_classes_study_guide.md': 'types-of-classes',
  'Java_Classes_Part3_POJO_Enum_Final.md': 'pojo-enum-final',
  'java_interfaces_part1_study_guide.md': 'interfaces-fundamentals',
  'Java_Interfaces_Java8_Java9_Features.md': 'interfaces-java8-java9',
  'java-exception-handling-study-guide.md': 'exception-handling',
  'java-memory-management-study-guide.md': 'memory-management',
  'java-singleton-immutable-wrapper-study-guide.md': 'singleton-immutable-wrapper',
  'java-functional-interfaces-lambda-study-guide.md': 'functional-interfaces-lambdas',
  'Java_Generics.md': 'generics',
  'Java_Annotations.md': 'annotations',
  'java_reflection_study_guide.md': 'reflection',
  'Java_Control_Flow_Statements.md': 'control-flow-statements',
  'Java_Collection_Framework_Study_Guide.md': 'collection-framework',
  'java_queue_comparator_comparable.md': 'queue-comparator-comparable',
};

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

for (const [filename, slug] of Object.entries(mapping)) {
  const sourcePath = path.join(sourceDir, filename);
  const targetPath = path.join(targetDir, `${slug}.mdx`);
  
  if (fs.existsSync(sourcePath)) {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const frontmatter = `---\ntitle: ${slug}\n---\n\n`;
    fs.writeFileSync(targetPath, frontmatter + content);
    console.log(`Copied ${filename} to ${slug}.mdx`);
  } else {
    console.error(`File not found: ${sourcePath}`);
  }
}
