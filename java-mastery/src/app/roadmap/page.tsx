import { Metadata } from 'next';
import RoadmapClient from './RoadmapClient';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Learning Roadmaps | CodePulse',
  description: 'Structured roadmaps for Java, Spring Boot, Python, and Django.',
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <RoadmapClient />
    </div>
  );
}
