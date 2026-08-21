'use client';

interface StatsBarProps {
  streak: number;
  totalCompleted: number;
  totalLessons: number;
  xpPoints: number;
  userName?: string;
}

export function StatsBar({ streak, totalCompleted, totalLessons, xpPoints }: StatsBarProps) {
  const stats = [
    ['Current streak', `${streak} ${streak === 1 ? 'day' : 'days'}`],
    ['Lessons finished', `${totalCompleted} / ${totalLessons}`],
    ['Practice points', xpPoints.toLocaleString('en-IN')],
    ['Curriculum progress', `${Math.floor((totalCompleted / Math.max(totalLessons, 1)) * 100)}%`],
  ];

  return (
    <dl className="grid grid-cols-2 border-y border-[var(--border-color)] lg:grid-cols-4">
      {stats.map(([label, value], index) => (
        <div
          key={label}
          className={`py-5 ${index % 2 === 0 ? 'pr-4' : 'border-l border-[var(--border-color)] pl-4'} lg:border-l lg:px-6 lg:first:border-l-0 lg:first:pl-0`}
        >
          <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-disabled)]">{label}</dt>
          <dd className="mt-2 text-xl font-heading font-semibold tracking-tight text-[var(--text-primary)]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
