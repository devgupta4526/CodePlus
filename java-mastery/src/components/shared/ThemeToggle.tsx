'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="w-9 h-9 rounded-[10px] border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <Monitor className="w-4 h-4 text-[var(--text-muted)]" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  return (
    <button
      onClick={cycleTheme}
      className="w-9 h-9 rounded-[10px] border border-[var(--border-color)] bg-[var(--surface)] 
                 hover:bg-[var(--surface-elevated)] hover:border-[var(--accent)] 
                 flex items-center justify-center transition-all duration-200 cursor-pointer"
      aria-label={`Current theme: ${theme}. Click to cycle.`}
      title={`Theme: ${theme}`}
    >
      {theme === 'dark' && <Moon className="w-4 h-4 text-[var(--accent-secondary)]" />}
      {theme === 'light' && <Sun className="w-4 h-4 text-[var(--accent)]" />}
      {theme === 'system' && <Monitor className="w-4 h-4 text-[var(--text-muted)]" />}
    </button>
  );
}
