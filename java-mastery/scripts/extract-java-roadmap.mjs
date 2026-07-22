import fs from 'fs';

const jsxCode = fs.readFileSync('e:/Notes/Java/JavaSpringChecklist.jsx', 'utf8');

const tagsMatch = jsxCode.match(/const TAGS = (\{[\s\S]*?\n\};)/);
const phasesMatch = jsxCode.match(/const ALL_PHASES = (\[[\s\S]*?\n\];)/);

if (tagsMatch && phasesMatch) {
  const tsContent = `export type Tag = { label: string; bg: string; color: string };
export type VideoSub = string;
export type Video = { title: string; dur: string; subs: VideoSub[] };
export type Section = { id: string; title: string; vids: Video[] };
export type Phase = { id: string; label: string; icon: string; color: string; sections: Section[] };

export const TAGS: Record<string, Tag> = ${tagsMatch[1]}

export const ALL_PHASES: Phase[] = ${phasesMatch[1]}
`;
  
  fs.writeFileSync('e:/Notes/Java/java-mastery/src/data/roadmapJava.ts', tsContent);
  console.log('Successfully extracted Java roadmap data!');
} else {
  console.error('Failed to parse JavaSpringChecklist.jsx');
}
