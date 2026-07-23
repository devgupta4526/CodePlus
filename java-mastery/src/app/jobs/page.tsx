import type { Metadata } from 'next';
import { JobsClient } from './JobsClient';

export const metadata: Metadata = {
  title: 'Job Board',
  description: 'Browse open engineering positions across Java, Python, React, DevOps, ML and more. Filter by category, type, experience level, and work mode.',
};

export default function JobsPage() {
  return <JobsClient />;
}
