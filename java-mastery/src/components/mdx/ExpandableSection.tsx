'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
}

export function ExpandableSection({
  title,
  children,
  defaultOpen = false,
  icon,
}: ExpandableSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="my-4 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[var(--surface-elevated)] transition-colors cursor-pointer"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="w-4 h-4 text-[var(--accent)] shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span className="text-sm font-semibold text-[var(--text-primary)] font-heading">
          {title}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 text-sm text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] [&>p]:mb-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
