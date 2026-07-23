import type { Metadata } from 'next';
import { ContestsClient } from './ContestsClient';

export const metadata: Metadata = {
  title: 'Contests & OA Prep | CodePulse',
  description: 'Practice Online Assessments, timed contests, and company-specific test formats. Prepare for FAANG, product companies, and campus placements.',
};

export default function ContestsPage() {
  return <ContestsClient />;
}
