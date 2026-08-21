import type { Metadata } from 'next';
import { TodayWorkspace } from './TodayWorkspace';

export const metadata: Metadata = {
  title: 'Today',
  description: 'A focused daily learning plan built from your progress, reviews, and current projects.',
};

export default function TodayPage() {
  return <TodayWorkspace />;
}
