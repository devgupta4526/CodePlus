import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Panel | CodePulse',
  description: 'CodePulse site administration',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
