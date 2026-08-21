import type { Metadata } from 'next';
import { ProjectsWorkspace } from './ProjectsWorkspace';

export const metadata: Metadata = {
  title: 'Guided Projects',
  description: 'Build complete systems through structured milestones linked to the concepts you need.',
};

export default function ProjectsPage() {
  return <ProjectsWorkspace />;
}
