import fs from 'fs';

const jsxCode = fs.readFileSync('e:/Notes/Java/python/roadmap_60day.jsx', 'utf8');

const phasesMatch = jsxCode.match(/const PHASES = (\[[\s\S]*?\n\];?)/);

if (phasesMatch) {
  const tsContent = `export type Topic = { n: string; subs: string[] };
export type Day = { d: string; title: string; type?: string; topics: Topic[]; prompt?: string; project?: any };
export type PythonPhase = { id: string; icon: string; title: string; days: string; tag: string; color: string; daysList: Day[] };

export const PYTHON_PHASES: PythonPhase[] = ${phasesMatch[1].replace(/\];$/, ']')}
`;
  
  fs.writeFileSync('e:/Notes/Java/java-mastery/src/data/roadmapPython.ts', tsContent);
  console.log('Successfully extracted Python roadmap data!');
} else {
  console.error('Failed to parse python/roadmap_60day.jsx');
}
