import type { Metadata } from 'next';
import { AnalyticsClient } from './AnalyticsClient';

export const metadata: Metadata = {
  title: 'Analytics | CodePulse',
  description: 'Track your learning streak, daily planner, activity heatmap, and overall course progress across all CodePulse learning paths.',
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
