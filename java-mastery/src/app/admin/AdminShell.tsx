'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Briefcase,
  Code2, Brain, Trophy, Settings, LogOut, Lock,
  Eye, EyeOff, ChevronRight, Plus, Pencil, Trash2,
  Save, X, Check, AlertTriangle, Menu,
  BarChart3, Layers, ChevronDown,
  ChevronUp, Globe, Flame, Terminal, FileCode,
  Upload, Sparkles, Tv
} from 'lucide-react';

import {
  checkAdminSession, adminLogin, adminLogout, type AdminLesson,
  type AdminChapter, type AdminJob, type AdminProblem, type AdminMcq,
  type AdminContest, type SiteSettings
} from '@/lib/adminStore';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// ── Types ─────────────────────────────────────────────────────────────────────

type Section =
  | 'dashboard' | 'lessons' | 'chapters' | 'jobs'
  | 'problems' | 'mcq' | 'contests' | 'settings';

// ── Shared UI atoms ───────────────────────────────────────────────────────────

function Badge({ children, color = 'default' }: { children: React.ReactNode; color?: 'default' | 'green' | 'amber' | 'red' | 'blue' }) {
  const cls = {
    default: 'bg-[var(--surface-elevated)] text-[var(--text-muted)] border-[var(--border-color)]',
    green:   'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
    amber:   'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
    red:     'bg-[#FF5F57]/10 text-[#FF5F57] border-[#FF5F57]/20',
    blue:    'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
  }[color];
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${cls}`}>
      {children}
    </span>
  );
}

function Btn({
  children, onClick, variant = 'primary', size = 'md', disabled = false, type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  const base = 'inline-flex items-center gap-1.5 font-medium rounded-xl cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed';
  const sz = size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm';
  const v = {
    primary:   'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]',
    secondary: 'bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--surface)]',
    danger:    'bg-[#FF5F57]/10 text-[#FF5F57] border border-[#FF5F57]/20 hover:bg-[#FF5F57]/20',
    ghost:     'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]',
  }[variant];
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sz} ${v}`}>
      {children}
    </button>
  );
}

function Input({ label, value, onChange, placeholder, type = 'text', multiline = false, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; multiline?: boolean; rows?: number;
}) {
  const cls = 'w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors';
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{label}</span>
      {multiline
        ? <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={`${cls} resize-y`} />
        : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      }
    </label>
  );
}

function Select({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-color)] sticky top-0 bg-[var(--bg)] z-10">
          <h3 className="text-base font-heading font-semibold text-[var(--text-primary)]">{title}</h3>
          <button onClick={onClose} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </motion.div>
    </div>
  );
}

function Toast({ message, ok }: { message: string; ok: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-6 z-[100] flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium ${
        ok
          ? 'bg-[var(--success)]/10 border-[var(--success)]/30 text-[var(--success)]'
          : 'bg-[#FF5F57]/10 border-[#FF5F57]/30 text-[#FF5F57]'
      }`}
    >
      {ok ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
      {message}
    </motion.div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm rounded-2xl border border-[var(--border-color)] bg-[var(--bg)] p-6 shadow-2xl"
      >
        <div className="flex items-start gap-3 mb-5">
          <AlertTriangle className="w-5 h-5 text-[#FF5F57] shrink-0 mt-0.5" />
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{message}</p>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Btn variant="secondary" size="sm" onClick={onCancel}>Cancel</Btn>
          <Btn variant="danger" size="sm" onClick={onConfirm}>Delete</Btn>
        </div>
      </motion.div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(password)) {
      onLogin();
    } else {
      setError('Incorrect password.');
      setPassword('');
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[var(--accent)]/20">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">Admin Panel</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">CodePulse — Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter admin password"
                autoFocus
                className="w-full px-3 py-2 pr-10 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)] hover:text-[var(--text-muted)] cursor-pointer"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-xs text-[#FF5F57] mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
          <p className="text-[10px] text-[var(--text-disabled)] text-center">
            Default: <code className="font-mono">codepulse2025</code>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

const NAV: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'lessons',   label: 'Lessons',    icon: BookOpen },
  { id: 'chapters',  label: 'Chapters',   icon: Layers },
  { id: 'jobs',      label: 'Jobs',       icon: Briefcase },
  { id: 'problems',  label: 'Problems',   icon: Code2 },
  { id: 'mcq',       label: 'MCQ',        icon: Brain },
  { id: 'contests',  label: 'Contests',   icon: Trophy },
  { id: 'settings',  label: 'Settings',   icon: Settings },
];

function Sidebar({ active, onSelect, onLogout, collapsed, onToggle }: {
  active: Section; onSelect: (s: Section) => void;
  onLogout: () => void; collapsed: boolean; onToggle: () => void;
}) {
  return (
    <aside className={`flex flex-col bg-[var(--bg-secondary)] border-r border-[var(--border-color)] transition-all duration-300 shrink-0 ${collapsed ? 'w-14' : 'w-56'}`}>
      {/* Header */}
      <div className={`flex items-center border-b border-[var(--border-color)] h-14 ${collapsed ? 'justify-center px-2' : 'px-4 gap-2'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center shrink-0">
              <Code2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-heading font-bold text-[var(--text-primary)] truncate">Admin</span>
          </div>
        )}
        <button onClick={onToggle} className="cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1 rounded-lg hover:bg-[var(--surface)]">
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              title={collapsed ? label : undefined}
              className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-[var(--border-color)]">
        <button
          onClick={onLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-sm text-[var(--text-muted)] hover:text-[#FF5F57] hover:bg-[#FF5F57]/5 transition-all cursor-pointer ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

function DashboardSection({ lessons, jobs, problems, mcqs, contests, settings }: {
  lessons: AdminLesson[]; jobs: AdminJob[]; problems: AdminProblem[];
  mcqs: AdminMcq[]; contests: AdminContest[]; settings: SiteSettings | null;
}) {
  const stats = [
    { icon: BookOpen,  label: 'Lessons',          value: lessons.length,  color: 'text-[var(--accent)]' },
    { icon: Briefcase, label: 'Job Postings',      value: jobs.length,     color: 'text-[var(--success)]' },
    { icon: Code2,     label: 'Practice Problems', value: problems.length, color: 'text-[var(--accent-secondary)]' },
    { icon: Brain,     label: 'MCQ Questions',     value: mcqs.length,      color: 'text-[#FF5F57]' },
    { icon: Trophy,    label: 'Contests',          value: contests.length, color: 'text-[#FACC15]' },
    { icon: Globe,     label: 'Platform Name',     value: settings?.platformName || 'CodePulse', color: 'text-[var(--text-muted)]' },
  ];

  const diffBreakdown = {
    Easy:   lessons.filter((l) => l.difficulty === 'beginner').length,
    Intermediate: lessons.filter((l) => l.difficulty === 'intermediate').length,
    Advanced: lessons.filter((l) => l.difficulty === 'advanced').length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-1">Dashboard</h2>
        <p className="text-sm text-[var(--text-muted)]">Overview of all content on the platform.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--surface-elevated)] flex items-center justify-center shrink-0">
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-heading font-bold text-[var(--text-primary)] truncate">{s.value}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson difficulty breakdown */}
      <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Lesson Difficulty Breakdown</span>
        </div>
        <div className="space-y-3">
          {Object.entries(diffBreakdown).map(([label, count]) => {
            const total = lessons.length || 1;
            const pct = Math.round((count / total) * 100);
            const color = label === 'Easy' ? 'var(--success)' : label === 'Intermediate' ? 'var(--accent-secondary)' : 'var(--accent)';
            return (
              <div key={label}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">{label}</span>
                  <span className="text-[var(--text-muted)]">{count} ({pct}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `var(--${color.replace('var(--', '').replace(')', '')})` , backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className="p-5 rounded-2xl border border-[var(--accent)]/15 bg-[var(--accent)]/5">
        <p className="text-sm font-semibold text-[var(--accent)] mb-3">Workspace Version Control Info</p>
        <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
          <li className="flex items-start gap-2"><ChevronRight className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />All changes are saved directly to repository database source files under <code className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded">src/data/</code> and <code className="font-mono bg-[var(--surface)] px-1.5 py-0.5 rounded">src/content/</code>.</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />Edits will trigger Next.js hot module reloading (HMR) and show up in Git immediately.</li>
          <li className="flex items-start gap-2"><ChevronRight className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />To undo your edits, discard the file modifications in your terminal using git.</li>
        </ul>
      </div>
    </div>
  );
}

// Helper to parse YAML-like metadata from MDX frontmatter
function parseMdxFile(raw: string) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---/;
  const match = raw.match(frontmatterRegex);
  let meta: Partial<AdminLesson> = {};
  let content = raw;
  if (match) {
    content = raw.replace(frontmatterRegex, '').trim();
    const yamlStr = match[1];
    const lines = yamlStr.split('\n');
    lines.forEach((line) => {
      const colIdx = line.indexOf(':');
      if (colIdx >= 0) {
        const key = line.substring(0, colIdx).trim();
        const value = line.substring(colIdx + 1).trim();
        if (value.startsWith('[') && value.endsWith(']')) {
          const arr = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
          (meta as any)[key] = arr;
        } else {
          const cleanVal = value.replace(/^['"]|['"]$/g, '');
          if (key === 'chapter' || key === 'lesson' || key === 'estimatedMinutes') {
            (meta as any)[key] = parseInt(cleanVal) || 0;
          } else {
            (meta as any)[key] = cleanVal;
          }
        }
      }
    });
  }
  return { meta, content };
}


// ── LessonRow — single reusable row used in both flat and grouped views ────────

function LessonRow({
  l, expanded, toggleExpand, diffColor, openEdit, setConfirmDelete,
}: {
  l: AdminLesson;
  expanded: Set<string>;
  toggleExpand: (slug: string) => void;
  diffColor: (d: string) => 'green' | 'amber' | 'red';
  openEdit: (l: AdminLesson) => void;
  setConfirmDelete: (slug: string) => void;
}) {
  const isExpanded = expanded.has(l.slug);
  return (
    <div key={l.slug}>
      <div className="grid grid-cols-[1fr_120px_80px_80px_100px] gap-4 px-4 py-3 items-center hover:bg-[var(--surface)] transition-colors">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <button onClick={() => toggleExpand(l.slug)} className="cursor-pointer text-[var(--text-disabled)] hover:text-[var(--accent)] transition-colors shrink-0">
              {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <span className="text-sm font-medium text-[var(--text-primary)] truncate">{l.title}</span>
            {l._custom && <Badge color="blue">custom</Badge>}
          </div>
          <span className="text-[10px] text-[var(--text-disabled)] font-mono ml-5">{l.slug}</span>
        </div>
        <span className="text-xs text-[var(--text-muted)] truncate">{l.chapterTitle}</span>
        <Badge color={diffColor(l.difficulty)}>{l.difficulty}</Badge>
        <span className="text-xs text-[var(--text-muted)]">{l.estimatedMinutes}m</span>
        <div className="flex items-center gap-1">
          <a
            href={`/admin/editor/${l.slug}`}
            title="Edit lesson content (inline editor)"
            className="p-1.5 rounded-lg hover:bg-[var(--success)]/10 cursor-pointer text-[var(--text-muted)] hover:text-[var(--success)] transition-colors"
          >
            <FileCode className="w-3.5 h-3.5" />
          </a>
          <a
            href={`/admin/studio/${l.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Teach Lesson (Slides & Whiteboard)"
            className="p-1.5 rounded-lg hover:bg-[var(--accent)]/10 cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            <Tv className="w-3.5 h-3.5" />
          </a>
          <button onClick={() => openEdit(l)} title="Edit metadata" className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setConfirmDelete(l.slug)} className="p-1.5 rounded-lg hover:bg-[#FF5F57]/10 cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 py-3 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[var(--text-disabled)] font-semibold uppercase tracking-wider">Description</span>
            <p className="text-[var(--text-secondary)] mt-0.5 leading-relaxed">{l.description}</p>
          </div>
          <div>
            <span className="text-[var(--text-disabled)] font-semibold uppercase tracking-wider">Tags</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {l.tags.map((t) => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
          <div>
            <span className="text-[var(--text-disabled)] font-semibold uppercase tracking-wider">Objectives ({l.objectives.length})</span>
            <ul className="mt-0.5 space-y-0.5 text-[var(--text-secondary)]">
              {l.objectives.slice(0, 3).map((o, i) => <li key={i}>• {o}</li>)}
              {l.objectives.length > 3 && <li className="text-[var(--text-disabled)]">+{l.objectives.length - 3} more</li>}
            </ul>
          </div>
          <div>
            <span className="text-[var(--text-disabled)] font-semibold uppercase tracking-wider">Prerequisites</span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {l.prerequisites.length === 0
                ? <span className="text-[var(--text-disabled)]">None</span>
                : l.prerequisites.map((p) => <Badge key={p}>{p}</Badge>)
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// ── Lessons Manager ───────────────────────────────────────────────────────────

type CourseTab = 'all' | 'java' | 'springboot' | 'coa' | 'python';
const COURSE_TABS: { id: CourseTab; label: string }[] = [
  { id: 'all',        label: 'All' },
  { id: 'java',       label: 'Java' },
  { id: 'springboot', label: 'Spring Boot' },
  { id: 'coa',        label: 'COA' },
  { id: 'python',     label: 'Python' },
];

function LessonsSection({ lessons, onSaveLesson, onDeleteLesson, showToast }: {
  lessons: AdminLesson[]; onSaveLesson: (l: AdminLesson, content: string) => Promise<boolean>;
  onDeleteLesson: (slug: string) => Promise<boolean>; showToast: (msg: string, ok?: boolean) => void;
}) {
  const [search, setSearch] = useState('');
  const [courseTab, setCourseTab] = useState<CourseTab>('all');
  const [editing, setEditing] = useState<AdminLesson | null>(null);
  const [lessonMdxContent, setLessonMdxContent] = useState('');
  const [modalTab, setModalTab] = useState<'meta' | 'content'>('meta');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [collapsedChapters, setCollapsedChapters] = useState<Set<string>>(new Set());
  const [uploadingVideo, setUploadingVideo] = useState(false);

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setEditing({ ...editing, videoUrl: data.url });
        showToast('Video uploaded successfully!');
      } else {
        showToast(data.error || 'Video upload failed', false);
      }
    } catch {
      showToast('Failed to upload video', false);
    } finally {
      setUploadingVideo(false);
    }
  };


  // Fetch lesson MDX when editing opens
  useEffect(() => {
    if (editing && editing.slug && !isNew) {
      fetch(`/api/admin?slug=${editing.slug}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setLessonMdxContent(data.content || '');
          }
        });
    } else {
      setLessonMdxContent('');
    }
    setModalTab('meta');
  }, [editing, isNew]);

  // Apply course tab filter first, then search
  const afterCourseFilter = courseTab === 'all'
    ? lessons
    : lessons.filter((l) => l.course === courseTab);

  const filtered = afterCourseFilter.filter(
    (l) =>
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.slug.toLowerCase().includes(search.toLowerCase()) ||
      l.chapterTitle?.toLowerCase().includes(search.toLowerCase()),
  );

  // Group by chapter when there is no active search
  const isSearching = search.trim().length > 0;

  type ChapterGroup = { chapterTitle: string; chapterNum: number; lessons: AdminLesson[] };

  const chapterGroups: ChapterGroup[] = [];
  if (!isSearching) {
    const groupMap = new Map<string, ChapterGroup>();
    for (const l of filtered) {
      const key = `${l.chapter}:${l.chapterTitle || 'Uncategorised'}`;
      if (!groupMap.has(key)) {
        groupMap.set(key, { chapterTitle: l.chapterTitle || 'Uncategorised', chapterNum: l.chapter, lessons: [] });
      }
      groupMap.get(key)!.lessons.push(l);
    }
    chapterGroups.push(...Array.from(groupMap.values()).sort((a, b) => a.chapterNum - b.chapterNum));
  }

  function toggleChapter(key: string) {
    setCollapsedChapters((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  function openNew() {
    setIsNew(true);
    setEditing({
      course: 'java', title: '', slug: '', chapter: 1, chapterTitle: '', lesson: 1,
      description: '', difficulty: 'beginner', estimatedMinutes: 30,
      prerequisites: [], objectives: [], tags: [], _custom: true,
    });
    setLessonMdxContent('');
  }

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const { meta, content } = parseMdxFile(text);

      const slug = meta.slug || file.name.replace(/\.mdx?$/, '').toLowerCase().replace(/\s+/g, '-');
      const title = meta.title || file.name.replace(/\.mdx?$/, '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

      setIsNew(true);
      setEditing({
        course: meta.course || 'java',
        title,
        slug,
        chapter: meta.chapter || 1,
        chapterTitle: meta.chapterTitle || '',
        lesson: meta.lesson || 1,
        description: meta.description || '',
        difficulty: meta.difficulty || 'beginner',
        estimatedMinutes: meta.estimatedMinutes || 30,
        prerequisites: meta.prerequisites || [],
        objectives: meta.objectives || [],
        tags: meta.tags || [],
        _custom: true
      });
      setLessonMdxContent(content);
      showToast('Imported from markdown file successfully! Please review metadata and save.');
    };
    reader.readAsText(file);
  };

  function openEdit(l: AdminLesson) { setIsNew(false); setEditing({ ...l }); }

  async function handleSave() {
    if (!editing) return;
    if (!editing.title.trim() || !editing.slug.trim()) {
      showToast('Title and slug are required.', false); return;
    }
    const ok = await onSaveLesson(editing, lessonMdxContent);
    if (ok) {
      setEditing(null);
      showToast(isNew ? 'Lesson created & written to filesystem.' : 'Lesson updated.');
    }
  }

  async function handleDelete(slug: string) {
    const ok = await onDeleteLesson(slug);
    if (ok) {
      setConfirmDelete(null);
    }
  }

  function toggleExpand(slug: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  const diffColor = (d: string) =>
    d === 'beginner' ? 'green' : d === 'intermediate' ? 'amber' : 'red' as 'green' | 'amber' | 'red';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-heading font-bold text-[var(--text-primary)]">Lessons</h2>
          <p className="text-sm text-[var(--text-muted)]">{lessons.length} total lessons across all courses</p>
        </div>
        <div className="flex gap-2">
          <label className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-all cursor-pointer shadow-sm">
            <Upload className="w-4 h-4 text-[var(--accent)]" /> Import MD/MDX
            <input
              type="file"
              accept=".md,.mdx"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>
          <Btn onClick={openNew}><Plus className="w-4 h-4" /> New Lesson</Btn>
        </div>
      </div>

      {/* Course filter tabs */}
      <div className="flex gap-1 flex-wrap">
        {COURSE_TABS.map((tab) => {
          const count = tab.id === 'all' ? lessons.length : lessons.filter((l) => l.course === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => { setCourseTab(tab.id); setCollapsedChapters(new Set()); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                courseTab === tab.id
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/30'
                  : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent)]/20 hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label} <span className="opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <input
        type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, slug, or chapter..."
        className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
      />

      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[1fr_120px_80px_80px_100px] gap-4 px-4 py-2 bg-[var(--surface-elevated)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-disabled)] border-b border-[var(--border-color)]">
          <span>Title / Slug</span>
          <span>Chapter</span>
          <span>Difficulty</span>
          <span>Min</span>
          <span>Actions</span>
        </div>

        {/* Lesson rows — flat when searching, grouped by chapter otherwise */}
        <div className="divide-y divide-[var(--border-color)]">
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[var(--text-disabled)]">No lessons match your search.</div>
          )}

          {isSearching ? (
            /* ── Flat view when searching ── */
            filtered.map((l) => <LessonRow key={l.slug} l={l} expanded={expanded} toggleExpand={toggleExpand} diffColor={diffColor} openEdit={openEdit} setConfirmDelete={setConfirmDelete} />)
          ) : (
            /* ── Grouped by chapter ── */
            chapterGroups.map((group) => {
              const groupKey = `${group.chapterNum}:${group.chapterTitle}`;
              const isCollapsed = collapsedChapters.has(groupKey);
              return (
                <div key={groupKey}>
                  {/* Chapter header row */}
                  <button
                    onClick={() => toggleChapter(groupKey)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 bg-[var(--surface-elevated)] hover:bg-[var(--surface)] transition-colors cursor-pointer text-left border-b border-[var(--border-color)]"
                  >
                    {isCollapsed ? <ChevronRight className="w-3.5 h-3.5 text-[var(--text-disabled)] shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 text-[var(--text-disabled)] shrink-0" />}
                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                      Ch {group.chapterNum} — {group.chapterTitle}
                    </span>
                    <span className="ml-auto text-[10px] text-[var(--text-disabled)]">{group.lessons.length} lesson{group.lessons.length !== 1 ? 's' : ''}</span>
                  </button>
                  {/* Lesson rows for this chapter */}
                  {!isCollapsed && group.lessons.map((l) => (
                    <LessonRow key={l.slug} l={l} expanded={expanded} toggleExpand={toggleExpand} diffColor={diffColor} openEdit={openEdit} setConfirmDelete={setConfirmDelete} />
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'New Lesson' : `Edit: ${editing.title}`} onClose={() => setEditing(null)}>
            <div className="space-y-4">
              {/* Tab Selector */}
              <div className="flex border-b border-[var(--border-color)] pb-1 mb-4 gap-4">
                <button
                  onClick={() => setModalTab('meta')}
                  className={`pb-2 text-sm font-semibold transition-colors cursor-pointer border-b-2 px-1 ${modalTab === 'meta' ? 'border-[var(--accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                  Metadata Properties
                </button>
                <button
                  onClick={() => setModalTab('content')}
                  className={`pb-2 text-sm font-semibold transition-colors cursor-pointer border-b-2 px-1 flex items-center gap-1.5 ${modalTab === 'content' ? 'border-[var(--accent)] text-[var(--text-primary)]' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'}`}
                >
                  <FileCode className="w-4 h-4 text-[var(--accent)]" /> Lesson Markdown Body
                </button>
              </div>

              {modalTab === 'meta' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Title *" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="e.g. OOP Fundamentals" />
                    <Input label="Slug *" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: v.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. oop-fundamentals" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Select label="Course" value={editing.course} onChange={(v) => setEditing({ ...editing, course: v as AdminLesson['course'] })} options={['java', 'coa', 'python', 'springboot']} />
                    <Select label="Difficulty" value={editing.difficulty} onChange={(v) => setEditing({ ...editing, difficulty: v as AdminLesson['difficulty'] })} options={['beginner', 'intermediate', 'advanced']} />
                    <Input label="Est. Minutes" value={String(editing.estimatedMinutes)} onChange={(v) => setEditing({ ...editing, estimatedMinutes: parseInt(v) || 0 })} type="number" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Chapter #" value={String(editing.chapter)} onChange={(v) => setEditing({ ...editing, chapter: parseInt(v) || 1 })} type="number" />
                    <Input label="Chapter Title" value={editing.chapterTitle} onChange={(v) => setEditing({ ...editing, chapterTitle: v })} placeholder="e.g. Java Foundations" />
                  </div>
                  <Input label="Lesson #" value={String(editing.lesson)} onChange={(v) => setEditing({ ...editing, lesson: parseInt(v) || 1 })} type="number" />
                  <Input label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} placeholder="Short description for this lesson" multiline rows={2} />
                  <Input
                    label="Tags (comma-separated)"
                    value={editing.tags.join(', ')}
                    onChange={(v) => setEditing({ ...editing, tags: v.split(',').map((s) => s.trim()).filter(Boolean) })}
                    placeholder="oop, classes, inheritance"
                  />
                  <Input
                    label="Prerequisites (comma-separated slugs)"
                    value={editing.prerequisites.join(', ')}
                    onChange={(v) => setEditing({ ...editing, prerequisites: v.split(',').map((s) => s.trim()).filter(Boolean) })}
                    placeholder="how-java-works, variables-primitive-types"
                  />
                  <Input
                    label="Learning Objectives (one per line)"
                    value={editing.objectives.join('\n')}
                    onChange={(v) => setEditing({ ...editing, objectives: v.split('\n').map((s) => s.trim()).filter(Boolean) })}
                    multiline rows={4}
                    placeholder="Understand what OOP is..."
                  />
                  <div className="space-y-1.5">
                    <Input label="Video URL (YouTube link or uploaded path)" value={editing.videoUrl ?? ''} onChange={(v) => setEditing({ ...editing, videoUrl: v || undefined })} placeholder="https://youtube.com/watch?v=... or /uploads/videos/xxx.mp4" />
                    <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                      <span>Paste YouTube URL or upload custom video file (.mp4, .webm):</span>
                      <label className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-primary)] hover:bg-[var(--surface)] transition-all cursor-pointer shadow-sm">
                        <Upload className="w-3.5 h-3.5 text-[var(--accent)]" />
                        {uploadingVideo ? 'Uploading Video...' : 'Upload Video File'}
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/ogg,video/quicktime"
                          onChange={handleVideoFileUpload}
                          disabled={uploadingVideo}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>Draft your lesson contents in full Markdown / MDX syntax.</span>
                    <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Monaco Editor</span>
                  </div>
                  <div className="h-[400px] border border-[var(--border-color)] rounded-xl overflow-hidden bg-[#1e1e1e]">
                    <MonacoEditor
                      height="100%"
                      language="markdown"
                      value={lessonMdxContent}
                      onChange={(v) => setLessonMdxContent(v || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        automaticLayout: true,
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        padding: { top: 10 }
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-[var(--border-color)]">
                <Btn variant="secondary" onClick={() => setEditing(null)}>Cancel</Btn>
                <Btn onClick={handleSave}><Save className="w-3.5 h-3.5" /> Save Lesson</Btn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <ConfirmDialog
            message={`Delete lesson "${lessons.find((l) => l.slug === confirmDelete)?.title}"? This will delete the MDX file and metadata.`}
            onConfirm={() => handleDelete(confirmDelete)}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Chapters Manager ──────────────────────────────────────────────────────────

function ChaptersSection({ chapters, onSaveChapters, showToast }: {
  chapters: AdminChapter[]; onSaveChapters: (ch: AdminChapter[]) => Promise<boolean>;
  showToast: (msg: string, ok?: boolean) => void;
}) {
  const [editing, setEditing] = useState<AdminChapter | null>(null);
  const [isNew, setIsNew] = useState(false);

  function openNew() {
    const maxNum = Math.max(0, ...chapters.map((c) => c.number));
    setIsNew(true);
    setEditing({ number: maxNum + 1, title: '', description: '', course: 'java' });
  }

  async function handleSave() {
    if (!editing || !editing.title.trim()) { showToast('Title is required.', false); return; }
    const updated = isNew
      ? [...chapters, editing]
      : chapters.map((c) => c.number === editing.number ? editing : c);
    const sorted = [...updated].sort((a, b) => a.number - b.number);
    const ok = await onSaveChapters(sorted);
    if (ok) {
      setEditing(null);
      showToast(isNew ? 'Chapter created.' : 'Chapter updated.');
    }
  }

  async function handleDelete(num: number) {
    const updated = chapters.filter((c) => c.number !== num);
    const ok = await onSaveChapters(updated);
    if (ok) {
      showToast('Chapter deleted.');
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-bold text-[var(--text-primary)]">Chapters</h2>
          <p className="text-sm text-[var(--text-muted)]">{chapters.length} chapters defined</p>
        </div>
        <Btn onClick={openNew}><Plus className="w-4 h-4" /> New Chapter</Btn>
      </div>

      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_2fr_80px] gap-4 px-4 py-2 bg-[var(--surface-elevated)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-disabled)] border-b border-[var(--border-color)]">
          <span>#</span><span>Title</span><span>Description</span><span>Actions</span>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {chapters.map((ch) => (
            <div key={ch.number} className="grid grid-cols-[60px_1fr_2fr_80px] gap-4 px-4 py-3 items-center hover:bg-[var(--surface)] transition-colors">
              <span className="text-sm font-mono font-bold text-[var(--accent)]">CH {ch.number}</span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{ch.title}</span>
              <span className="text-xs text-[var(--text-muted)] truncate">{ch.description}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => { setIsNew(false); setEditing({ ...ch }); }} className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(ch.number)} className="p-1.5 rounded-lg hover:bg-[#FF5F57]/10 cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'New Chapter' : `Edit: CH ${editing.number}`} onClose={() => setEditing(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Chapter #" value={String(editing.number)} onChange={(v) => setEditing({ ...editing, number: parseInt(v) || 1 })} type="number" />
                <Select label="Course" value={editing.course ?? 'java'} onChange={(v) => setEditing({ ...editing, course: v })} options={['java', 'coa', 'python', 'springboot']} />
              </div>
              <Input label="Title *" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="e.g. Java Foundations" />
              <Input label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} placeholder="What this chapter covers..." multiline rows={2} />
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                <Btn variant="secondary" onClick={() => setEditing(null)}>Cancel</Btn>
                <Btn onClick={handleSave}><Save className="w-3.5 h-3.5" /> Save</Btn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Jobs Manager ──────────────────────────────────────────────────────────────

function JobsSection({ jobs, onSaveJobs, showToast }: {
  jobs: AdminJob[]; onSaveJobs: (j: AdminJob[]) => Promise<boolean>;
  showToast: (msg: string, ok?: boolean) => void;
}) {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<AdminJob | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.role.toLowerCase().includes(search.toLowerCase()),
  );

  const BLANK_JOB: AdminJob = {
    id: Date.now().toString(), title: '', company: '', companySize: '', location: '',
    workMode: 'Remote', role: 'Java Backend', type: 'Full-time', experienceLevel: 'Mid (3–5 yrs)',
    salary: '', postedAt: new Date().toISOString().slice(0, 10), applicationDeadline: '',
    url: '', description: '', responsibilities: [], requirements: [],
    niceToHave: [], techStack: [], _custom: true,
  };

  function openNew() { setIsNew(true); setEditing({ ...BLANK_JOB, id: Date.now().toString() }); }
  function openEdit(j: AdminJob) { setIsNew(false); setEditing({ ...j }); }

  async function handleSave() {
    if (!editing) return;
    if (!editing.title.trim() || !editing.company.trim()) { showToast('Title and company are required.', false); return; }
    const updated = isNew
      ? [...jobs, editing]
      : jobs.map((j) => j.id === editing.id ? editing : j);
    const ok = await onSaveJobs(updated);
    if (ok) {
      setEditing(null);
      showToast(isNew ? 'Job created.' : 'Job updated.');
    }
  }

  async function handleDelete(id: string) {
    const updated = jobs.filter((j) => j.id !== id);
    const ok = await onSaveJobs(updated);
    if (ok) {
      setConfirmDelete(null);
      showToast('Job deleted.');
    }
  }

  const expColor = (e: string) => e.includes('Entry') ? 'green' : e.includes('Junior') ? 'blue' : e.includes('Mid') ? 'amber' : 'red' as 'green'|'blue'|'amber'|'red';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-heading font-bold text-[var(--text-primary)]">Job Postings</h2>
          <p className="text-sm text-[var(--text-muted)]">{jobs.length} postings</p>
        </div>
        <Btn onClick={openNew}><Plus className="w-4 h-4" /> New Job</Btn>
      </div>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title, company, or role..."
        className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
      />

      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_120px_100px_80px] gap-4 px-4 py-2 bg-[var(--surface-elevated)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-disabled)] border-b border-[var(--border-color)]">
          <span>Title / Company</span><span>Role</span><span>Level</span><span>Mode</span><span>Actions</span>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {filtered.length === 0 && <div className="px-4 py-8 text-center text-sm text-[var(--text-disabled)]">No jobs match your search.</div>}
          {filtered.map((j) => (
            <div key={j.id} className="grid grid-cols-[1fr_120px_120px_100px_80px] gap-4 px-4 py-3 items-center hover:bg-[var(--surface)] transition-colors">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)] truncate">{j.title}</span>
                  {j.featured && <Badge color="amber">featured</Badge>}
                  {j._custom && <Badge color="blue">custom</Badge>}
                </div>
                <span className="text-[10px] text-[var(--text-disabled)]">{j.company} · {j.location}</span>
              </div>
              <span className="text-xs text-[var(--text-muted)] truncate">{j.role}</span>
              <Badge color={expColor(j.experienceLevel)}>{j.experienceLevel.split(' ')[0]}</Badge>
              <Badge>{j.workMode}</Badge>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(j)} className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setConfirmDelete(j.id)} className="p-1.5 rounded-lg hover:bg-[#FF5F57]/10 cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'New Job Posting' : `Edit: ${editing.title}`} onClose={() => setEditing(null)}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Job Title *" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="e.g. Senior Java Engineer" />
                <Input label="Company *" value={editing.company} onChange={(v) => setEditing({ ...editing, company: v })} placeholder="e.g. Google" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} placeholder="e.g. San Francisco, CA" />
                <Input label="Salary" value={editing.salary} onChange={(v) => setEditing({ ...editing, salary: v })} placeholder="e.g. $150k–$200k" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Select label="Work Mode" value={editing.workMode} onChange={(v) => setEditing({ ...editing, workMode: v as AdminJob['workMode'] })} options={['Remote', 'Hybrid', 'On-site']} />
                <Select label="Job Type" value={editing.type} onChange={(v) => setEditing({ ...editing, type: v as AdminJob['type'] })} options={['Full-time', 'Part-time', 'Contract', 'Internship']} />
                <Select label="Experience" value={editing.experienceLevel} onChange={(v) => setEditing({ ...editing, experienceLevel: v as AdminJob['experienceLevel'] })} options={['Entry (0–1 yr)', 'Junior (1–3 yrs)', 'Mid (3–5 yrs)', 'Senior (5+ yrs)']} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Posted At (YYYY-MM-DD)" value={editing.postedAt} onChange={(v) => setEditing({ ...editing, postedAt: v })} />
                <Input label="Application Deadline" value={editing.applicationDeadline} onChange={(v) => setEditing({ ...editing, applicationDeadline: v })} />
              </div>
              <Input label="Application URL" value={editing.url} onChange={(v) => setEditing({ ...editing, url: v })} placeholder="https://company.com/careers" />
              <Input label="Company Size" value={editing.companySize} onChange={(v) => setEditing({ ...editing, companySize: v })} placeholder="e.g. 5000+ employees" />
              <Input label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} multiline rows={3} />
              <Input label="Responsibilities (one per line)" value={editing.responsibilities.join('\n')} onChange={(v) => setEditing({ ...editing, responsibilities: v.split('\n').map((s) => s.trim()).filter(Boolean) })} multiline rows={4} />
              <Input label="Requirements (one per line)" value={editing.requirements.join('\n')} onChange={(v) => setEditing({ ...editing, requirements: v.split('\n').map((s) => s.trim()).filter(Boolean) })} multiline rows={4} />
              <Input label="Nice to Have (one per line)" value={editing.niceToHave.join('\n')} onChange={(v) => setEditing({ ...editing, niceToHave: v.split('\n').map((s) => s.trim()).filter(Boolean) })} multiline rows={2} />
              <Input label="Tech Stack (comma-separated)" value={editing.techStack.join(', ')} onChange={(v) => setEditing({ ...editing, techStack: v.split(',').map((s) => s.trim()).filter(Boolean) })} placeholder="Java 21, Spring Boot, Kafka" />
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer select-none">
                  <input type="checkbox" checked={!!editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
                  Featured listing
                </label>
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                <Btn variant="secondary" onClick={() => setEditing(null)}>Cancel</Btn>
                <Btn onClick={handleSave}><Save className="w-3.5 h-3.5" /> Save Job</Btn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <ConfirmDialog
            message={`Delete job "${jobs.find((j) => j.id === confirmDelete)?.title}"?`}
            onConfirm={() => handleDelete(confirmDelete)}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Practice Problems Manager ─────────────────────────────────────────────────

function ProblemsSection({ problems, onSaveProblems, showToast }: {
  problems: AdminProblem[]; onSaveProblems: (p: AdminProblem[]) => Promise<boolean>;
  showToast: (msg: string, ok?: boolean) => void;
}) {
  const [editing, setEditing] = useState<AdminProblem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = problems.filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()),
  );

  function openNew() {
    setIsNew(true);
    setEditing({
      id: Date.now().toString(), title: '', difficulty: 'Easy', category: '',
      tags: [], timeLimit: 'O(n)', description: '',
      starterCode: { java: '// Write your solution', javascript: '// Write your solution', python: '# Write your solution', typescript: '// Write your solution', cpp: '// Write your solution' },
      solutionCode: { java: '// Solution', javascript: '// Solution', python: '# Solution', typescript: '// Solution', cpp: '// Solution' },
      examples: [{ input: '', output: '' }],
      constraints: [],
      _custom: true,
    });
  }

  async function handleSave() {
    if (!editing) return;
    if (!editing.title.trim() || !editing.id.trim()) { showToast('Title and ID are required.', false); return; }
    const updated = isNew
      ? [...problems, editing]
      : problems.map((p) => p.id === editing.id ? editing : p);
    const ok = await onSaveProblems(updated);
    if (ok) {
      setEditing(null);
      showToast(isNew ? 'Problem created.' : 'Problem updated.');
    }
  }

  async function handleDelete(id: string) {
    const updated = problems.filter((p) => p.id !== id);
    const ok = await onSaveProblems(updated);
    if (ok) {
      setConfirmDelete(null);
      showToast('Problem deleted.');
    }
  }

  const diffColor = (d: string) => d === 'Easy' ? 'green' : d === 'Medium' ? 'amber' : 'red' as 'green'|'amber'|'red';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-heading font-bold text-[var(--text-primary)]">Practice Problems</h2>
          <p className="text-sm text-[var(--text-muted)]">{problems.length} problems in the practice arena</p>
        </div>
        <Btn onClick={openNew}><Plus className="w-4 h-4" /> New Problem</Btn>
      </div>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title or category..."
        className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/50 transition-colors"
      />

      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden">
        <div className="grid grid-cols-[1fr_120px_100px_80px_80px] gap-4 px-4 py-2 bg-[var(--surface-elevated)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-disabled)] border-b border-[var(--border-color)]">
          <span>Title / ID</span><span>Category</span><span>Difficulty</span><span>Examples</span><span>Actions</span>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {filtered.length === 0 && <div className="px-4 py-8 text-center text-sm text-[var(--text-disabled)]">No problems found.</div>}
          {filtered.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_120px_100px_80px_80px] gap-4 px-4 py-3 items-center hover:bg-[var(--surface)] transition-colors">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)] truncate">{p.title}</span>
                  {p._custom && <Badge color="blue">custom</Badge>}
                </div>
                <span className="text-[10px] text-[var(--text-disabled)] font-mono">{p.id}</span>
              </div>
              <span className="text-xs text-[var(--text-muted)]">{p.category}</span>
              <Badge color={diffColor(p.difficulty)}>{p.difficulty}</Badge>
              <span className="text-xs text-[var(--text-muted)]">{p.examples?.length || 0}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => { setIsNew(false); setEditing({ ...p }); }} className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setConfirmDelete(p.id)} className="p-1.5 rounded-lg hover:bg-[#FF5F57]/10 cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'New Problem' : `Edit: ${editing.title}`} onClose={() => setEditing(null)}>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Title *" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="e.g. Two Sum" />
                <Input label="ID *" value={editing.id} onChange={(v) => setEditing({ ...editing, id: v.toLowerCase().replace(/\s+/g, '-') })} placeholder="e.g. two-sum" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Select label="Difficulty" value={editing.difficulty} onChange={(v) => setEditing({ ...editing, difficulty: v as AdminProblem['difficulty'] })} options={['Easy', 'Medium', 'Hard']} />
                <Input label="Category" value={editing.category} onChange={(v) => setEditing({ ...editing, category: v })} placeholder="e.g. Arrays" />
                <Input label="Time Limit" value={editing.timeLimit} onChange={(v) => setEditing({ ...editing, timeLimit: v })} placeholder="e.g. O(n)" />
              </div>
              <Input label="Tags (comma-separated)" value={editing.tags.join(', ')} onChange={(v) => setEditing({ ...editing, tags: v.split(',').map((s) => s.trim()).filter(Boolean) })} placeholder="arrays, hash-map, searching" />
              <Input label="Description (Markdown)" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} multiline rows={4} placeholder="Problem statement in Markdown..." />
              <Input label="Constraints (one per line)" value={editing.constraints.join('\n')} onChange={(v) => setEditing({ ...editing, constraints: v.split('\n').map((s) => s.trim()).filter(Boolean) })} multiline rows={3} placeholder="1 ≤ n ≤ 10⁴" />
              <div>
                <span className="block text-xs font-semibold text-[var(--text-secondary)] mb-2">Examples</span>
                {editing.examples.map((ex, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2 mb-2 items-start">
                    <Input label={`Input ${i + 1}`} value={ex.input} onChange={(v) => { const exs = [...editing.examples]; exs[i] = { ...exs[i], input: v }; setEditing({ ...editing, examples: exs }); }} placeholder='nums = [2,7,11,15]' />
                    <Input label="Output" value={ex.output} onChange={(v) => { const exs = [...editing.examples]; exs[i] = { ...exs[i], output: v }; setEditing({ ...editing, examples: exs }); }} placeholder='[0, 1]' />
                    <button onClick={() => setEditing({ ...editing, examples: editing.examples.filter((_, j) => j !== i) })} className="mt-5 p-1.5 rounded-lg text-[var(--text-disabled)] hover:text-[#FF5F57] cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
                <Btn variant="ghost" size="sm" onClick={() => setEditing({ ...editing, examples: [...editing.examples, { input: '', output: '' }] })}><Plus className="w-3.5 h-3.5" /> Add Example</Btn>
              </div>
              <div className="space-y-2">
                <span className="block text-xs font-semibold text-[var(--text-secondary)]">Starter Code (Java)</span>
                <textarea value={editing.starterCode.java ?? ''} onChange={(e) => setEditing({ ...editing, starterCode: { ...editing.starterCode, java: e.target.value } })} rows={4} className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 resize-y" />
              </div>
              <div className="space-y-2">
                <span className="block text-xs font-semibold text-[var(--text-secondary)]">Solution Code (Java)</span>
                <textarea value={editing.solutionCode.java ?? ''} onChange={(e) => setEditing({ ...editing, solutionCode: { ...editing.solutionCode, java: e.target.value } })} rows={4} className="w-full px-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-xs font-mono text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50 resize-y" />
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                <Btn variant="secondary" onClick={() => setEditing(null)}>Cancel</Btn>
                <Btn onClick={handleSave}><Save className="w-3.5 h-3.5" /> Save Problem</Btn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <ConfirmDialog
            message={`Delete problem "${problems.find((p) => p.id === confirmDelete)?.title}"?`}
            onConfirm={() => handleDelete(confirmDelete)}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── MCQ Manager ───────────────────────────────────────────────────────────────

function McqSection({ mcqs, onSaveMcqs, showToast }: {
  mcqs: AdminMcq[]; onSaveMcqs: (m: AdminMcq[]) => Promise<boolean>;
  showToast: (msg: string, ok?: boolean) => void;
}) {
  const [editing, setEditing] = useState<AdminMcq | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function openNew() {
    setIsNew(true);
    setEditing({
      id: Date.now().toString(), question: '', difficulty: 'Easy', topic: '',
      options: [
        { id: 'a', text: '' }, { id: 'b', text: '' },
        { id: 'c', text: '' }, { id: 'd', text: '' },
      ],
      correctOptionId: 'a',
      explanation: '',
    });
  }

  async function handleSave() {
    if (!editing) return;
    if (!editing.question.trim()) { showToast('Question text is required.', false); return; }
    const updated = isNew
      ? [...mcqs, editing]
      : mcqs.map((q) => q.id === editing.id ? editing : q);
    const ok = await onSaveMcqs(updated);
    if (ok) {
      setEditing(null);
      showToast(isNew ? 'Question created.' : 'Question updated.');
    }
  }

  async function handleDelete(id: string) {
    const updated = mcqs.filter((q) => q.id !== id);
    const ok = await onSaveMcqs(updated);
    if (ok) {
      setConfirmDelete(null);
      showToast('Question deleted.');
    }
  }

  const diffColor = (d: string) => d === 'Easy' ? 'green' : d === 'Medium' ? 'amber' : 'red' as 'green'|'amber'|'red';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-heading font-bold text-[var(--text-primary)]">MCQ Questions</h2>
          <p className="text-sm text-[var(--text-muted)]">{mcqs.length} questions in the drill bank</p>
        </div>
        <Btn onClick={openNew}><Plus className="w-4 h-4" /> New Question</Btn>
      </div>

      <div className="space-y-3">
        {mcqs.map((q, idx) => (
          <div key={q.id} className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[var(--accent)]">Q{idx + 1}</span>
                  <Badge color={diffColor(q.difficulty)}>{q.difficulty}</Badge>
                  <Badge>{q.topic}</Badge>
                </div>
                <p className="text-sm text-[var(--text-primary)] mb-2">{q.question}</p>
                <div className="grid grid-cols-2 gap-1">
                  {q.options.map((opt) => (
                    <div key={opt.id} className={`text-xs px-2 py-1 rounded-lg border ${opt.id === q.correctOptionId ? 'border-[var(--success)]/30 bg-[var(--success)]/8 text-[var(--success)]' : 'border-[var(--border-color)] text-[var(--text-muted)]'}`}>
                      <span className="font-bold">{opt.id.toUpperCase()}.</span> {opt.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => { setIsNew(false); setEditing({ ...q }); }} className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setConfirmDelete(q.id)} className="p-1.5 rounded-lg hover:bg-[#FF5F57]/10 cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'New MCQ Question' : 'Edit Question'} onClose={() => setEditing(null)}>
            <div className="space-y-4">
              <Input label="Question *" value={editing.question} onChange={(v) => setEditing({ ...editing, question: v })} multiline rows={2} placeholder="What is the primary role of the JVM?" />
              <div className="grid grid-cols-2 gap-4">
                <Select label="Difficulty" value={editing.difficulty} onChange={(v) => setEditing({ ...editing, difficulty: v as AdminMcq['difficulty'] })} options={['Easy', 'Medium', 'Hard']} />
                <Input label="Topic" value={editing.topic} onChange={(v) => setEditing({ ...editing, topic: v })} placeholder="e.g. Java Basics" />
              </div>
              <div>
                <span className="block text-xs font-semibold text-[var(--text-secondary)] mb-2">Answer Options</span>
                <div className="space-y-2">
                  {editing.options.map((opt, i) => (
                    <div key={opt.id} className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[var(--text-disabled)] w-4">{opt.id.toUpperCase()}.</span>
                      <input
                        type="text" value={opt.text}
                        onChange={(e) => {
                          const opts = [...editing.options];
                          opts[i] = { ...opts[i], text: e.target.value };
                          setEditing({ ...editing, options: opts });
                        }}
                        placeholder={`Option ${opt.id.toUpperCase()}`}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]/50"
                      />
                      <input
                        type="radio" name="correct" checked={editing.correctOptionId === opt.id}
                        onChange={() => setEditing({ ...editing, correctOptionId: opt.id })}
                        className="cursor-pointer"
                        title="Mark as correct"
                      />
                      <span className="text-[10px] text-[var(--text-disabled)]">Correct</span>
                    </div>
                  ))}
                </div>
              </div>
              <Input label="Explanation" value={editing.explanation} onChange={(v) => setEditing({ ...editing, explanation: v })} multiline rows={3} placeholder="Explain why the correct answer is correct..." />
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                <Btn variant="secondary" onClick={() => setEditing(null)}>Cancel</Btn>
                <Btn onClick={handleSave}><Save className="w-3.5 h-3.5" /> Save Question</Btn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <ConfirmDialog
            message="Delete this MCQ question?"
            onConfirm={() => handleDelete(confirmDelete)}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Contests Manager ──────────────────────────────────────────────────────────

function ContestsSection({ contests, onSaveContests, showToast }: {
  contests: AdminContest[]; onSaveContests: (c: AdminContest[]) => Promise<boolean>;
  showToast: (msg: string, ok?: boolean) => void;
}) {
  const [editing, setEditing] = useState<AdminContest | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function openNew() {
    setIsNew(true);
    setEditing({
      id: Date.now().toString(), title: '', type: 'Weekly', difficulty: 'Mixed',
      status: 'practice', duration: '90 min', problems: 4,
      topics: [], description: '', locked: false,
    });
  }

  async function handleSave() {
    if (!editing) return;
    if (!editing.title.trim()) { showToast('Title is required.', false); return; }
    const updated = isNew
      ? [...contests, editing]
      : contests.map((c) => c.id === editing.id ? editing : c);
    const ok = await onSaveContests(updated);
    if (ok) {
      setEditing(null);
      showToast(isNew ? 'Contest created.' : 'Contest updated.');
    }
  }

  async function handleDelete(id: string) {
    const updated = contests.filter((c) => c.id !== id);
    const ok = await onSaveContests(updated);
    if (ok) {
      setConfirmDelete(null);
      showToast('Contest deleted.');
    }
  }

  const statusColor = (s: string) => s === 'live' ? 'red' : s === 'upcoming' ? 'amber' : s === 'practice' ? 'green' : 'default' as 'red'|'amber'|'green'|'default';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-heading font-bold text-[var(--text-primary)]">Contests</h2>
          <p className="text-sm text-[var(--text-muted)]">{contests.length} contests & OA simulations</p>
        </div>
        <Btn onClick={openNew}><Plus className="w-4 h-4" /> New Contest</Btn>
      </div>

      <div className="rounded-2xl border border-[var(--border-color)] overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_100px_80px_80px] gap-4 px-4 py-2 bg-[var(--surface-elevated)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-disabled)] border-b border-[var(--border-color)]">
          <span>Title</span><span>Type</span><span>Status</span><span>Duration</span><span>Actions</span>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {contests.map((c) => (
            <div key={c.id} className="grid grid-cols-[1fr_100px_100px_80px_80px] gap-4 px-4 py-3 items-center hover:bg-[var(--surface)] transition-colors">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)] truncate">{c.title}</span>
                  {c.company && <Badge color="blue">{c.company}</Badge>}
                </div>
                <span className="text-[10px] text-[var(--text-disabled)]">{c.problems} problems · {c.difficulty}</span>
              </div>
              <Badge>{c.type}</Badge>
              <Badge color={statusColor(c.status)}>{c.status}</Badge>
              <span className="text-xs text-[var(--text-muted)]">{c.duration}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => { setIsNew(false); setEditing({ ...c }); }} className="p-1.5 rounded-lg hover:bg-[var(--surface-elevated)] cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setConfirmDelete(c.id)} className="p-1.5 rounded-lg hover:bg-[#FF5F57]/10 cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'New Contest' : `Edit: ${editing.title}`} onClose={() => setEditing(null)}>
            <div className="space-y-4">
              <Input label="Title *" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} placeholder="e.g. Weekly Challenge #3" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Company (optional)" value={editing.company ?? ''} onChange={(v) => setEditing({ ...editing, company: v || undefined })} placeholder="e.g. Amazon" />
                <Select label="Type" value={editing.type} onChange={(v) => setEditing({ ...editing, type: v as AdminContest['type'] })} options={['OA', 'Contest', 'Mock Test', 'Weekly']} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Select label="Difficulty" value={editing.difficulty} onChange={(v) => setEditing({ ...editing, difficulty: v as AdminContest['difficulty'] })} options={['Easy', 'Medium', 'Hard', 'Mixed']} />
                <Select label="Status" value={editing.status} onChange={(v) => setEditing({ ...editing, status: v as AdminContest['status'] })} options={['live', 'upcoming', 'completed', 'practice']} />
                <Input label="Duration" value={editing.duration} onChange={(v) => setEditing({ ...editing, duration: v })} placeholder="e.g. 90 min" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="# Problems" value={String(editing.problems)} onChange={(v) => setEditing({ ...editing, problems: parseInt(v) || 1 })} type="number" />
                <Input label="Participants (optional)" value={String(editing.participants ?? '')} onChange={(v) => setEditing({ ...editing, participants: parseInt(v) || undefined })} type="number" />
              </div>
              <Input label="Starts At (upcoming only)" value={editing.startsAt ?? ''} onChange={(v) => setEditing({ ...editing, startsAt: v || undefined })} placeholder="e.g. Sat, 7:00 PM IST" />
              <Input label="Topics (comma-separated)" value={editing.topics.join(', ')} onChange={(v) => setEditing({ ...editing, topics: v.split(',').map((s) => s.trim()).filter(Boolean) })} placeholder="Arrays, Trees, BFS" />
              <Input label="Description" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} multiline rows={3} />
              <label className="flex items-center gap-2 text-sm text-[var(--text-secondary)] cursor-pointer select-none">
                <input type="checkbox" checked={editing.locked} onChange={(e) => setEditing({ ...editing, locked: e.target.checked })} className="rounded" />
                Lock (show locked state to users)
              </label>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--border-color)]">
                <Btn variant="secondary" onClick={() => setEditing(null)}>Cancel</Btn>
                <Btn onClick={handleSave}><Save className="w-3.5 h-3.5" /> Save Contest</Btn>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {confirmDelete && (
          <ConfirmDialog
            message={`Delete contest "${contests.find((c) => c.id === confirmDelete)?.title}"?`}
            onConfirm={() => handleDelete(confirmDelete)}
            onCancel={() => setConfirmDelete(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Site Settings ─────────────────────────────────────────────────────────────

function SettingsSection({ settings, onSaveSettings, showToast }: {
  settings: SiteSettings | null; onSaveSettings: (s: SiteSettings) => Promise<boolean>;
  showToast: (msg: string, ok?: boolean) => void;
}) {
  const [localSettings, setLocalSettings] = useState<SiteSettings | null>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  if (!localSettings) return <div className="text-sm text-[var(--text-muted)] animate-pulse">Loading settings...</div>;

  function update(partial: Partial<SiteSettings>) {
    setLocalSettings((prev) => prev ? { ...prev, ...partial } : null);
    setDirty(true);
  }

  async function handleSave() {
    if (!localSettings) return;
    const ok = await onSaveSettings(localSettings);
    if (ok) {
      setDirty(false);
      showToast('Settings saved successfully.');
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-heading font-bold text-[var(--text-primary)]">Site Settings</h2>
          <p className="text-sm text-[var(--text-muted)]">Platform-wide copy and configuration</p>
        </div>
        {dirty && <Btn onClick={handleSave}><Save className="w-4 h-4" /> Save Changes</Btn>}
      </div>

      {/* Brand */}
      <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Globe className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Brand</span>
        </div>
        <Input label="Platform Name" value={localSettings.platformName} onChange={(v) => update({ platformName: v })} placeholder="CodePulse" />
        <Input label="Footer Text" value={localSettings.footerText} onChange={(v) => update({ footerText: v })} placeholder="Built for developers..." />
      </div>

      {/* Hero */}
      <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Hero Section</span>
        </div>
        <Input label="Tagline Badge" value={localSettings.heroTagline} onChange={(v) => update({ heroTagline: v })} placeholder="Free · No Login · 6 Learning Paths" />
        <Input label="Hero Title (use \\n for line break)" value={localSettings.heroTitle} onChange={(v) => update({ heroTitle: v })} multiline rows={2} placeholder="Learn to code.\nLand the job." />
        <Input label="Hero Subtitle" value={localSettings.heroSubtitle} onChange={(v) => update({ heroSubtitle: v })} multiline rows={2} placeholder="CodePulse is an interactive..." />
      </div>

      {/* Stats */}
      <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Homepage Stats</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Lessons stat" value={localSettings.statsLessons} onChange={(v) => update({ statsLessons: v })} placeholder="100+" />
          <Input label="Courses stat" value={localSettings.statsCourses} onChange={(v) => update({ statsCourses: v })} placeholder="6" />
          <Input label="Content Hours stat" value={localSettings.statsHours} onChange={(v) => update({ statsHours: v })} placeholder="80+" />
          <Input label="Topics Covered stat" value={localSettings.statsTopics} onChange={(v) => update({ statsTopics: v })} placeholder="200+" />
        </div>
      </div>

      {/* Security */}
      <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Lock className="w-4 h-4 text-[var(--accent)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">Admin Security</span>
        </div>
        <p className="text-xs text-[var(--text-muted)]">
          Changing the password here updates the session check. You will need to re-login after saving.
        </p>
        <Input label="New Admin Password" value={localSettings.adminPassword ?? ''} onChange={(v) => update({ adminPassword: v || undefined })} type="password" placeholder="Leave blank to keep current" />
      </div>

      {dirty && (
        <div className="flex items-center justify-end">
          <Btn onClick={handleSave}><Save className="w-4 h-4" /> Save All Settings</Btn>
        </div>
      )}
    </div>
  );
}

// ── Main Shell ────────────────────────────────────────────────────────────────

export function AdminShell() {
  const [authed, setAuthed] = useState(false);
  const [section, setSection] = useState<Section>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // File database states
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState<AdminLesson[]>([]);
  const [chapters, setChapters] = useState<AdminChapter[]>([]);
  const [jobs, setJobs] = useState<AdminJob[]>([]);
  const [problems, setProblems] = useState<AdminProblem[]>([]);
  const [mcqs, setMcqs] = useState<AdminMcq[]>([]);
  const [contests, setContests] = useState<AdminContest[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  // Refresh data from API
  const refreshDb = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin?action=all');
      const data = await res.json();
      if (data.success) {
        setLessons(data.lessons || []);
        setChapters(data.chapters || []);
        setJobs(data.jobs || []);
        setProblems(data.problems || []);
        setMcqs(data.mcqs || []);
        setContests(data.contests || []);
        setSettings(data.settings || null);
      }
    } catch (err) {
      console.error('Failed to sync settings from filesystem api', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const isAuthed = checkAdminSession();
    setAuthed(isAuthed);
    if (isAuthed) {
      refreshDb();
    }
  }, [authed, refreshDb]);

  const showToast = useCallback((msg: string, ok = true) => {
    setToast({ msg, ok });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  function handleLogout() {
    adminLogout();
    setAuthed(false);
  }

  // Action Save/Delete triggers
  const handleSaveLesson = async (lesson: AdminLesson, content: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_lesson', lesson, content }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        return true;
      } else {
        showToast(data.error || 'Failed to save lesson', false);
        return false;
      }
    } catch (err) {
      showToast('Network error saving lesson', false);
      return false;
    }
  };

  const handleDeleteLesson = async (slug: string) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_lesson', slug }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        showToast('Lesson deleted.');
        return true;
      } else {
        showToast(data.error || 'Failed to delete lesson', false);
        return false;
      }
    } catch (err) {
      showToast('Network error deleting lesson', false);
      return false;
    }
  };

  const handleSaveChapters = async (updatedChapters: AdminChapter[]) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_chapters', chapters: updatedChapters }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        return true;
      }
    } catch (err) {
      showToast('Error saving chapters', false);
    }
    return false;
  };

  const handleSaveJobs = async (updatedJobs: AdminJob[]) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_jobs', jobs: updatedJobs }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        return true;
      }
    } catch (err) {
      showToast('Error saving jobs', false);
    }
    return false;
  };

  const handleSaveProblems = async (updatedProblems: AdminProblem[]) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_problems', problems: updatedProblems }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        return true;
      }
    } catch (err) {
      showToast('Error saving problems', false);
    }
    return false;
  };

  const handleSaveMcqs = async (updatedMcqs: AdminMcq[]) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_mcqs', mcqs: updatedMcqs }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        return true;
      }
    } catch (err) {
      showToast('Error saving MCQs', false);
    }
    return false;
  };

  const handleSaveContests = async (updatedContests: AdminContest[]) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_contests', contests: updatedContests }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        return true;
      }
    } catch (err) {
      showToast('Error saving contests', false);
    }
    return false;
  };

  const handleSaveSettings = async (updatedSettings: SiteSettings) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_settings', settings: updatedSettings }),
      });
      const data = await res.json();
      if (data.success) {
        await refreshDb();
        return true;
      }
    } catch (err) {
      showToast('Error saving settings', false);
    }
    return false;
  };

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Terminal className="w-10 h-10 text-[var(--accent)] animate-spin mx-auto" />
          <p className="text-sm font-semibold text-[var(--text-secondary)]">Syncing local repository database...</p>
        </div>
      </div>
    );
  }

  const sectionMap: Record<Section, React.ReactNode> = {
    dashboard: <DashboardSection lessons={lessons} jobs={jobs} problems={problems} mcqs={mcqs} contests={contests} settings={settings} />,
    lessons:   <LessonsSection lessons={lessons} onSaveLesson={handleSaveLesson} onDeleteLesson={handleDeleteLesson} showToast={showToast} />,
    chapters:  <ChaptersSection chapters={chapters} onSaveChapters={handleSaveChapters} showToast={showToast} />,
    jobs:      <JobsSection jobs={jobs} onSaveJobs={handleSaveJobs} showToast={showToast} />,
    problems:  <ProblemsSection problems={problems} onSaveProblems={handleSaveProblems} showToast={showToast} />,
    mcq:       <McqSection mcqs={mcqs} onSaveMcqs={handleSaveMcqs} showToast={showToast} />,
    contests:  <ContestsSection contests={contests} onSaveContests={handleSaveContests} showToast={showToast} />,
    settings:  <SettingsSection settings={settings} onSaveSettings={handleSaveSettings} showToast={showToast} />,
  };

  return (
    <div className="min-h-screen flex bg-[var(--bg)]">
      <Sidebar
        active={section}
        onSelect={setSection}
        onLogout={handleLogout}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />

      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-10 h-14 flex items-center px-6 border-b border-[var(--border-color)] bg-[var(--bg)]/80 backdrop-blur-xl gap-3">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text-primary)]">
              {NAV.find((n) => n.id === section)?.label}
            </span>
          </div>
          <div className="flex-1" />
          <span className="text-xs text-[var(--text-disabled)] hidden sm:block">
            All changes save directly to repository files
          </span>
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            <Eye className="w-3.5 h-3.5" /> View Site
          </a>
        </div>

        {/* Content */}
        <div className="p-6 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {sectionMap[section]}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast message={toast.msg} ok={toast.ok} />}
      </AnimatePresence>
    </div>
  );
}
