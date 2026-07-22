'use client';

import {
  Info,
  Lightbulb,
  AlertTriangle,
  AlertCircle,
  ShieldAlert,
  CheckCircle,
  XCircle,
  MessageSquare,
  Star,
} from 'lucide-react';
import { type CalloutType } from '@/types';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ElementType;
    defaultTitle: string;
    borderColor: string;
    bgColor: string;
    iconColor: string;
    titleColor: string;
  }
> = {
  note: {
    icon: Info,
    defaultTitle: 'Note',
    borderColor: 'border-l-[var(--info)]',
    bgColor: 'bg-[#38BDF8]/5',
    iconColor: 'text-[var(--info)]',
    titleColor: 'text-[var(--info)]',
  },
  tip: {
    icon: Lightbulb,
    defaultTitle: 'Tip',
    borderColor: 'border-l-[var(--success)]',
    bgColor: 'bg-[#22C55E]/5',
    iconColor: 'text-[var(--success)]',
    titleColor: 'text-[var(--success)]',
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: 'Warning',
    borderColor: 'border-l-[var(--warning)]',
    bgColor: 'bg-[#FACC15]/5',
    iconColor: 'text-[var(--warning)]',
    titleColor: 'text-[var(--warning)]',
  },
  important: {
    icon: AlertCircle,
    defaultTitle: 'Important',
    borderColor: 'border-l-[var(--accent)]',
    bgColor: 'bg-[#F97316]/5',
    iconColor: 'text-[var(--accent)]',
    titleColor: 'text-[var(--accent)]',
  },
  caution: {
    icon: ShieldAlert,
    defaultTitle: 'Caution',
    borderColor: 'border-l-[var(--error)]',
    bgColor: 'bg-[#EF4444]/5',
    iconColor: 'text-[var(--error)]',
    titleColor: 'text-[var(--error)]',
  },
  success: {
    icon: CheckCircle,
    defaultTitle: 'Success',
    borderColor: 'border-l-[var(--success)]',
    bgColor: 'bg-[#22C55E]/5',
    iconColor: 'text-[var(--success)]',
    titleColor: 'text-[var(--success)]',
  },
  danger: {
    icon: XCircle,
    defaultTitle: 'Danger',
    borderColor: 'border-l-[var(--error)]',
    bgColor: 'bg-[#EF4444]/5',
    iconColor: 'text-[var(--error)]',
    titleColor: 'text-[var(--error)]',
  },
  interview: {
    icon: MessageSquare,
    defaultTitle: 'Interview Question',
    borderColor: 'border-l-[var(--accent-secondary)]',
    bgColor: 'bg-[#F59E0B]/5',
    iconColor: 'text-[var(--accent-secondary)]',
    titleColor: 'text-[var(--accent-secondary)]',
  },
  'best-practice': {
    icon: Star,
    defaultTitle: 'Best Practice',
    borderColor: 'border-l-[var(--highlight)]',
    bgColor: 'bg-[#FACC15]/5',
    iconColor: 'text-[var(--highlight)]',
    titleColor: 'text-[var(--highlight)]',
  },
};

export function Callout({ type, title, children }: CalloutProps) {
  const config = calloutConfig[type] ?? calloutConfig.note;
  const Icon = config.icon;

  return (
    <div
      className={`my-5 rounded-xl border-l-4 ${config.borderColor} ${config.bgColor} border border-[var(--border-color)] overflow-hidden`}
      role="note"
    >
      <div className="px-4 py-3.5">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={`w-4.5 h-4.5 ${config.iconColor} shrink-0`} />
          <span
            className={`text-sm font-semibold font-heading tracking-tight ${config.titleColor}`}
          >
            {title ?? config.defaultTitle}
          </span>
        </div>
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
}
