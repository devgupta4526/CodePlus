'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import {
  jobPostings,
  JOB_ROLES,
  JOB_TYPES,
  EXP_LEVELS,
  WORK_MODES,
  ROLE_CATEGORIES,
  JOB_TYPE_META,
  type JobPosting,
  type JobRole,
  type JobType,
  type ExpLevel,
  type WorkMode,
} from '@/data/jobs';
import { Navbar } from '@/components/layout/Navbar';
import {
  Briefcase,
  MapPin,
  Building2,
  Clock,
  DollarSign,
  CalendarClock,
  ExternalLink,
  Sparkles,
  Filter,
  X,
  ChevronRight,
  CheckCircle2,
  CircleDot,
  Users,
  SlidersHorizontal,
  ArrowUpDown,
  AlertTriangle,
  Wifi,
  MonitorDot,
  Building,
  Search,
  LayoutGrid,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type SortKey = 'newest' | 'deadline' | 'featured';

interface Filters {
  roles: JobRole[];
  types: JobType[];
  expLevels: ExpLevel[];
  workModes: WorkMode[];
  sort: SortKey;
  search: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  if (diff < 7) return `${diff}d ago`;
  if (diff < 30) return `${Math.floor(diff / 7)}w ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function daysUntil(iso: string): number {
  const d = new Date(iso);
  const now = new Date();
  return Math.ceil((d.getTime() - now.getTime()) / 86_400_000);
}

function deadlineLabel(iso: string): { text: string; urgent: boolean } {
  const days = daysUntil(iso);
  if (days < 0) return { text: 'Closed', urgent: true };
  if (days === 0) return { text: 'Closes today', urgent: true };
  if (days <= 3) return { text: `${days}d left — Apply now`, urgent: true };
  if (days <= 7) return { text: `${days}d left — Early window`, urgent: false };
  return {
    text: new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    urgent: false,
  };
}

const TYPE_COLORS: Record<JobType, string> = {
  'Full-time': 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
  'Part-time': 'bg-[var(--info)]/10 text-[var(--info)] border-[var(--info)]/20',
  Contract: 'bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20',
  Internship: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
};

const WORK_MODE_ICON: Record<WorkMode, React.ElementType> = {
  Remote: Wifi,
  Hybrid: MonitorDot,
  'On-site': Building,
};

const WORK_MODE_COLOR: Record<WorkMode, string> = {
  Remote: 'text-[var(--success)]',
  Hybrid: 'text-[var(--info)]',
  'On-site': 'text-[var(--text-muted)]',
};

// Category → CSS colour tokens (bg / text / border)
const CATEGORY_PALETTE: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  orange: {
    bg: 'bg-orange-500/10',
    text: 'text-orange-500',
    border: 'border-orange-500/20',
    dot: 'bg-orange-500',
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/20',
    dot: 'bg-blue-500',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/20',
    dot: 'bg-cyan-500',
  },
  violet: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-400',
    border: 'border-violet-500/20',
    dot: 'bg-violet-500',
  },
  sky: {
    bg: 'bg-sky-500/10',
    text: 'text-sky-400',
    border: 'border-sky-500/20',
    dot: 'bg-sky-500',
  },
  green: {
    bg: 'bg-[var(--success)]/10',
    text: 'text-[var(--success)]',
    border: 'border-[var(--success)]/20',
    dot: 'bg-[var(--success)]',
  },
  red: {
    bg: 'bg-[var(--error)]/10',
    text: 'text-[var(--error)]',
    border: 'border-[var(--error)]/20',
    dot: 'bg-[var(--error)]',
  },
  pink: {
    bg: 'bg-pink-500/10',
    text: 'text-pink-400',
    border: 'border-pink-500/20',
    dot: 'bg-pink-500',
  },
};

// ── Main Component ─────────────────────────────────────────────────────────────

export function JobsClient() {
  const listRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<Filters>({
    roles: [],
    types: [],
    expLevels: [],
    workModes: [],
    sort: 'newest',
    search: '',
  });
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(jobPostings[0]);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Toggle helpers ───────────────────────────────────────────────────────

  function toggle<T>(arr: T[], val: T): T[] {
    return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
  }

  const toggleRole = useCallback((r: JobRole) =>
    setFilters((f) => ({ ...f, roles: toggle(f.roles, r) })), []);
  const toggleType = useCallback((t: JobType) =>
    setFilters((f) => ({ ...f, types: toggle(f.types, t) })), []);
  const toggleExp = useCallback((e: ExpLevel) =>
    setFilters((f) => ({ ...f, expLevels: toggle(f.expLevels, e) })), []);
  const toggleMode = useCallback((m: WorkMode) =>
    setFilters((f) => ({ ...f, workModes: toggle(f.workModes, m) })), []);

  const hasActiveFilter =
    filters.roles.length > 0 ||
    filters.types.length > 0 ||
    filters.expLevels.length > 0 ||
    filters.workModes.length > 0 ||
    filters.search.trim().length > 0;

  function clearFilters() {
    setFilters({ roles: [], types: [], expLevels: [], workModes: [], sort: filters.sort, search: '' });
  }

  /** Apply a category filter (roles) and scroll down to the job list */
  function applyCategory(roles: JobRole[]) {
    setFilters((f) => ({ ...f, roles, types: [], expLevels: [], workModes: [], search: '' }));
    setSelectedJob(null);
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  /** Apply a job-type filter and scroll down to the job list */
  function applyType(type: JobType) {
    setFilters((f) => ({ ...f, types: [type], roles: [], expLevels: [], workModes: [], search: '' }));
    setSelectedJob(null);
    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  }

  // ── Filter + Sort ────────────────────────────────────────────────────────

  const filteredJobs = useMemo(() => {
    let jobs = jobPostings.filter((j) => {
      if (filters.roles.length > 0 && !filters.roles.includes(j.role)) return false;
      if (filters.types.length > 0 && !filters.types.includes(j.type)) return false;
      if (filters.expLevels.length > 0 && !filters.expLevels.includes(j.experienceLevel)) return false;
      if (filters.workModes.length > 0 && !filters.workModes.includes(j.workMode)) return false;
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        return (
          j.title.toLowerCase().includes(q) ||
          j.company.toLowerCase().includes(q) ||
          j.techStack.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });

    if (filters.sort === 'newest') {
      jobs = [...jobs].sort((a, b) => b.postedAt.localeCompare(a.postedAt));
    } else if (filters.sort === 'deadline') {
      jobs = [...jobs].sort((a, b) => a.applicationDeadline.localeCompare(b.applicationDeadline));
    } else if (filters.sort === 'featured') {
      jobs = [...jobs].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return jobs;
  }, [filters]);

  // Keep selected job in sync when filters narrow list
  const activeJob =
    selectedJob && filteredJobs.find((j) => j.id === selectedJob.id)
      ? selectedJob
      : filteredJobs[0] ?? null;

  function selectJob(job: JobPosting) {
    setSelectedJob(job);
    setMobileDetailOpen(true);
  }

  // ── Sidebar (shared between desktop + mobile drawer) ─────────────────────

  const FilterSidebar = () => (
    <aside className="w-full space-y-6">
      {/* Search */}
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-disabled)]" />
          <input
            type="text"
            placeholder="Search title, company, tech…"
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none focus:border-[var(--accent)]/50"
          />
          {filters.search && (
            <button
              onClick={() => setFilters((f) => ({ ...f, search: '' }))}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              <X className="w-3 h-3 text-[var(--text-muted)]" />
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <FilterSection label="Sort by">
        {(['newest', 'deadline', 'featured'] as SortKey[]).map((s) => (
          <RadioPill
            key={s}
            label={s === 'newest' ? 'Newest first' : s === 'deadline' ? 'Closing soonest' : 'Featured first'}
            active={filters.sort === s}
            onClick={() => setFilters((f) => ({ ...f, sort: s }))}
          />
        ))}
      </FilterSection>

      {/* Role */}
      <FilterSection
        label="Role"
        count={filters.roles.length}
        onClear={() => setFilters((f) => ({ ...f, roles: [] }))}
      >
        {JOB_ROLES.map((r) => (
          <CheckPill
            key={r}
            label={r}
            active={filters.roles.includes(r)}
            count={jobPostings.filter((j) => j.role === r).length}
            onClick={() => toggleRole(r)}
          />
        ))}
      </FilterSection>

      {/* Experience */}
      <FilterSection
        label="Experience"
        count={filters.expLevels.length}
        onClear={() => setFilters((f) => ({ ...f, expLevels: [] }))}
      >
        {EXP_LEVELS.map((e) => (
          <CheckPill
            key={e}
            label={e}
            active={filters.expLevels.includes(e)}
            count={jobPostings.filter((j) => j.experienceLevel === e).length}
            onClick={() => toggleExp(e)}
          />
        ))}
      </FilterSection>

      {/* Work Mode */}
      <FilterSection
        label="Work Mode"
        count={filters.workModes.length}
        onClear={() => setFilters((f) => ({ ...f, workModes: [] }))}
      >
        {WORK_MODES.map((m) => {
          const Icon = WORK_MODE_ICON[m];
          return (
            <CheckPill
              key={m}
              label={m}
              active={filters.workModes.includes(m)}
              count={jobPostings.filter((j) => j.workMode === m).length}
              icon={<Icon className={`w-3 h-3 ${WORK_MODE_COLOR[m]}`} />}
              onClick={() => toggleMode(m)}
            />
          );
        })}
      </FilterSection>

      {/* Job Type */}
      <FilterSection
        label="Job Type"
        count={filters.types.length}
        onClear={() => setFilters((f) => ({ ...f, types: [] }))}
      >
        {JOB_TYPES.map((t) => (
          <CheckPill
            key={t}
            label={t}
            active={filters.types.includes(t)}
            count={jobPostings.filter((j) => j.type === t).length}
            onClick={() => toggleType(t)}
          />
        ))}
      </FilterSection>

      {/* Clear all */}
      {hasActiveFilter && (
        <button
          onClick={clearFilters}
          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)]/30 hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          <X className="w-3 h-3" />
          Clear all filters
        </button>
      )}
    </aside>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Navbar />

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--accent)]" />
                </div>
                <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                  Job Board
                </span>
              </div>
              <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                Find your next engineering role
              </h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                {jobPostings.length} open positions across Java, Python, React, DevOps & more · Updated daily
              </p>
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="sm:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] text-sm text-[var(--text-muted)] cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilter && (
                <span className="w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center font-bold">
                  {filters.roles.length + filters.types.length + filters.expLevels.length + filters.workModes.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Browse by Category & Type ─────────────────────────────────────── */}
      <div className="border-b border-[var(--border-color)] bg-[var(--surface)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 space-y-8">

          {/* Browse by Category */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <LayoutGrid className="w-4 h-4 text-[var(--text-muted)]" />
              <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Browse by Category
              </h2>
              {filters.roles.length > 0 && (
                <button
                  onClick={() => setFilters((f) => ({ ...f, roles: [] }))}
                  className="ml-auto flex items-center gap-1 text-xs text-[var(--accent)] hover:underline cursor-pointer"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {ROLE_CATEGORIES.map((cat) => {
                const palette = CATEGORY_PALETTE[cat.color] ?? CATEGORY_PALETTE['orange'];
                const count = jobPostings.filter((j) => cat.roles.includes(j.role)).length;
                const isActive = cat.roles.some((r) => filters.roles.includes(r));

                return (
                  <button
                    key={cat.label}
                    onClick={() => applyCategory(cat.roles)}
                    title={cat.description}
                    className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer ${
                      isActive
                        ? `${palette.bg} ${palette.border} border`
                        : 'border-[var(--border-color)] bg-[var(--surface-elevated)] hover:border-[var(--border-color)] hover:bg-[var(--bg)]'
                    }`}
                  >
                    <span className="text-2xl leading-none">{cat.icon}</span>
                    <span className={`text-[11px] font-semibold leading-tight ${isActive ? palette.text : 'text-[var(--text-secondary)]'}`}>
                      {cat.label}
                    </span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
                      isActive ? `${palette.bg} ${palette.text}` : 'bg-[var(--surface)] text-[var(--text-disabled)]'
                    }`}>
                      {count}
                    </span>
                    {isActive && (
                      <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${palette.dot}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Browse by Type */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-[var(--text-muted)]" />
              <h2 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                Browse by Type
              </h2>
              {filters.types.length > 0 && (
                <button
                  onClick={() => setFilters((f) => ({ ...f, types: [] }))}
                  className="ml-auto flex items-center gap-1 text-xs text-[var(--accent)] hover:underline cursor-pointer"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {JOB_TYPE_META.map((tm) => {
                const count = jobPostings.filter((j) => j.type === tm.type).length;
                const isActive = filters.types.includes(tm.type);
                const colorClass = TYPE_COLORS[tm.type];

                return (
                  <button
                    key={tm.type}
                    onClick={() => applyType(tm.type)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-150 cursor-pointer text-left ${
                      isActive
                        ? `${colorClass} border`
                        : 'border-[var(--border-color)] bg-[var(--surface-elevated)] hover:bg-[var(--bg)] hover:border-[var(--border-color)]'
                    }`}
                  >
                    <span className="text-xl shrink-0">{tm.icon}</span>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold ${isActive ? '' : 'text-[var(--text-primary)]'}`}>
                        {tm.type}
                      </p>
                      <p className={`text-[10px] truncate mt-0.5 ${isActive ? 'opacity-70' : 'text-[var(--text-disabled)]'}`}>
                        {tm.description}
                      </p>
                    </div>
                    <span className={`ml-auto shrink-0 text-[11px] font-bold ${isActive ? '' : 'text-[var(--text-disabled)]'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* ── Mobile filter drawer overlay ─────────────────────────────────── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-[var(--bg)] rounded-t-2xl border-t border-[var(--border-color)] p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="font-heading font-semibold text-[var(--text-primary)]">Filters</span>
              <button onClick={() => setSidebarOpen(false)} className="cursor-pointer">
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      {/* ── Active filter summary bar ─────────────────────────────────────── */}
      {hasActiveFilter && (
        <div className="border-b border-[var(--border-color)] bg-[var(--bg)]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[var(--text-muted)] shrink-0">Active filters:</span>
            {filters.roles.map((r) => (
              <span
                key={r}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
              >
                {r}
                <button onClick={() => toggleRole(r)} className="cursor-pointer ml-0.5">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {filters.types.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[var(--info)]/10 text-[var(--info)] border border-[var(--info)]/20"
              >
                {t}
                <button onClick={() => toggleType(t)} className="cursor-pointer ml-0.5">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {filters.expLevels.map((e) => (
              <span
                key={e}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border-color)]"
              >
                {e}
                <button onClick={() => toggleExp(e)} className="cursor-pointer ml-0.5">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {filters.workModes.map((m) => (
              <span
                key={m}
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border-color)]"
              >
                {m}
                <button onClick={() => toggleMode(m)} className="cursor-pointer ml-0.5">
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="ml-auto text-xs text-[var(--text-disabled)] hover:text-[var(--error)] transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* ── 3-col layout ─────────────────────────────────────────────────── */}
      <div ref={listRef} className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 scroll-mt-4">
        <div className="flex gap-6 items-start">

          {/* ── Left sidebar: filters (desktop only) ─────────────────────── */}
          <div className="hidden sm:block w-56 shrink-0 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider">
                <Filter className="w-3 h-3" />
                Filters
              </div>
            </div>
            <FilterSidebar />
          </div>

          {/* ── Centre: job list ──────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-4 px-0.5">
              <p className="text-sm text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-secondary)]">{filteredJobs.length}</span>{' '}
                {filteredJobs.length === 1 ? 'position' : 'positions'}
                {hasActiveFilter && (
                  <span className="text-[var(--text-disabled)]"> · filtered</span>
                )}
              </p>
              <div className="hidden sm:flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <ArrowUpDown className="w-3 h-3" />
                <span>
                  {filters.sort === 'newest' ? 'Newest' : filters.sort === 'deadline' ? 'Closing soon' : 'Featured'}
                </span>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="py-20 text-center">
                <Briefcase className="w-10 h-10 text-[var(--text-disabled)] mx-auto mb-3" />
                <p className="text-[var(--text-muted)] text-sm mb-3">No positions match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[var(--accent)] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredJobs.map((job) => {
                  const dl = deadlineLabel(job.applicationDeadline);
                  const isActive = activeJob?.id === job.id;
                  const WorkIcon = WORK_MODE_ICON[job.workMode];

                  return (
                    <button
                      key={job.id}
                      onClick={() => selectJob(job)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'border-[var(--accent)]/40 bg-[var(--surface-elevated)]'
                          : 'border-[var(--border-color)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] hover:border-[var(--border-secondary)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          {/* Company + featured */}
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs text-[var(--text-muted)] truncate">{job.company}</span>
                            {job.featured && (
                              <span className="shrink-0 flex items-center gap-0.5 text-[10px] font-semibold text-[var(--accent)] uppercase">
                                <Sparkles className="w-2.5 h-2.5" />
                                Featured
                              </span>
                            )}
                          </div>
                          {/* Title */}
                          <p className={`text-sm font-semibold leading-snug mb-2 ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                            {job.title}
                          </p>
                          {/* Badges row */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${TYPE_COLORS[job.type]}`}>
                              {job.type}
                            </span>
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
                              <WorkIcon className={`w-3 h-3 ${WORK_MODE_COLOR[job.workMode]}`} />
                              {job.workMode}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
                              {job.experienceLevel}
                            </span>
                          </div>
                        </div>

                        {/* Right meta */}
                        <div className="shrink-0 flex flex-col items-end gap-1.5 text-right">
                          <span className="text-xs text-[var(--text-disabled)]">{formatDate(job.postedAt)}</span>
                          <span className={`flex items-center gap-1 text-[11px] font-medium ${dl.urgent ? 'text-[var(--error)]' : 'text-[var(--text-disabled)]'}`}>
                            {dl.urgent && <AlertTriangle className="w-2.5 h-2.5" />}
                            {dl.text}
                          </span>
                          <span className="text-xs font-semibold text-[var(--text-secondary)]">{job.salary}</span>
                        </div>
                      </div>

                      {/* Tech stack chips */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {job.techStack.slice(0, 5).map((t) => (
                          <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--surface-elevated)] text-[var(--text-disabled)]">
                            {t}
                          </span>
                        ))}
                        {job.techStack.length > 5 && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] text-[var(--text-disabled)]">
                            +{job.techStack.length - 5}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Right panel: job detail (desktop) ────────────────────────── */}
          {activeJob && (
            <div className="hidden lg:block w-[480px] xl:w-[520px] shrink-0 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
              <JobDetail job={activeJob} />
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile detail bottom sheet ────────────────────────────────────── */}
      {mobileDetailOpen && activeJob && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileDetailOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto bg-[var(--bg)] rounded-t-2xl border-t border-[var(--border-color)]">
            <div className="sticky top-0 bg-[var(--bg)] border-b border-[var(--border-color)] px-5 py-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-[var(--text-primary)] truncate pr-4">{activeJob.title}</span>
              <button onClick={() => setMobileDetailOpen(false)} className="shrink-0 cursor-pointer">
                <X className="w-5 h-5 text-[var(--text-muted)]" />
              </button>
            </div>
            <div className="p-5">
              <JobDetail job={activeJob} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Job Detail Panel ──────────────────────────────────────────────────────────

function JobDetail({ job }: { job: JobPosting }) {
  const dl = deadlineLabel(job.applicationDeadline);
  const WorkIcon = WORK_MODE_ICON[job.workMode];

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[var(--border-color)]">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-[var(--text-muted)]">{job.company}</p>
              {job.featured && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[10px] font-semibold text-[var(--accent)] uppercase">
                  <Sparkles className="w-2.5 h-2.5" />
                  Featured
                </span>
              )}
            </div>
            <h2 className="text-lg font-heading font-bold text-[var(--text-primary)] leading-tight">
              {job.title}
            </h2>
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-4">
          <MetaChip icon={<MapPin className="w-3 h-3" />} label={job.location} />
          <MetaChip icon={<WorkIcon className={`w-3 h-3 ${WORK_MODE_COLOR[job.workMode]}`} />} label={job.workMode} />
          <MetaChip icon={<DollarSign className="w-3 h-3 text-[var(--success)]" />} label={job.salary} />
          <MetaChip icon={<Users className="w-3 h-3" />} label={job.companySize} />
          <MetaChip icon={<Clock className="w-3 h-3" />} label={`Posted ${formatDate(job.postedAt)}`} />
          <MetaChip
            icon={<CalendarClock className={`w-3 h-3 ${dl.urgent ? 'text-[var(--error)]' : ''}`} />}
            label={`Deadline: ${dl.text}`}
            urgent={dl.urgent}
          />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${TYPE_COLORS[job.type]}`}>
            {job.type}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
            {job.role}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]">
            {job.experienceLevel}
          </span>
        </div>

        {/* Deadline banner */}
        {dl.urgent && (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--error)]/8 border border-[var(--error)]/20 text-xs text-[var(--error)]">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">{dl.text} — don&apos;t miss this window!</span>
          </div>
        )}
        {!dl.urgent && daysUntil(job.applicationDeadline) <= 7 && (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--warning)]/8 border border-[var(--warning)]/20 text-xs text-[var(--warning)]">
            <CalendarClock className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium">Early apply window — {daysUntil(job.applicationDeadline)} days left</span>
          </div>
        )}

        {/* Apply CTA */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-white text-sm font-semibold shadow-lg shadow-[var(--accent)]/20 hover:shadow-[var(--accent)]/35 hover:scale-[1.01] transition-all duration-200"
        >
          Apply Now
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        {/* Description */}
        <div>
          <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            About the Role
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{job.description}</p>
        </div>

        {/* Tech stack */}
        <div>
          <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {job.techStack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg text-xs border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[var(--accent)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <DetailList
          title="Responsibilities"
          items={job.responsibilities}
          icon={<ChevronRight className="w-3 h-3 text-[var(--accent)] shrink-0 mt-0.5" />}
        />

        {/* Requirements */}
        <DetailList
          title="Requirements"
          items={job.requirements}
          icon={<CheckCircle2 className="w-3 h-3 text-[var(--success)] shrink-0 mt-0.5" />}
        />

        {/* Nice to have */}
        <DetailList
          title="Nice to Have"
          items={job.niceToHave}
          icon={<CircleDot className="w-3 h-3 text-[var(--text-disabled)] shrink-0 mt-0.5" />}
          muted
        />
      </div>

      {/* Footer CTA */}
      <div className="px-6 pb-6">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--accent)]/30 text-sm text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-colors"
        >
          View full posting at {job.company}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MetaChip({ icon, label, urgent }: { icon: React.ReactNode; label: string; urgent?: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
        urgent
          ? 'border-[var(--error)]/20 bg-[var(--error)]/5 text-[var(--error)]'
          : 'border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-muted)]'
      }`}
    >
      {icon}
      <span className="truncate">{label}</span>
    </div>
  );
}

function DetailList({
  title,
  items,
  icon,
  muted,
}: {
  title: string;
  items: string[];
  icon: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            {icon}
            <span className={`text-sm leading-relaxed ${muted ? 'text-[var(--text-disabled)]' : 'text-[var(--text-muted)]'}`}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface FilterSectionProps {
  label: string;
  children: React.ReactNode;
  count?: number;
  onClear?: () => void;
}

function FilterSection({ label, children, count, onClear }: FilterSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-semibold text-[var(--text-disabled)] uppercase tracking-wider">
          {label}
        </p>
        {count !== undefined && count > 0 && onClear && (
          <button
            onClick={onClear}
            className="text-[10px] text-[var(--accent)] hover:underline cursor-pointer"
          >
            clear
          </button>
        )}
      </div>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

interface CheckPillProps {
  label: string;
  active: boolean;
  count: number;
  onClick: () => void;
  icon?: React.ReactNode;
}

function CheckPill({ label, active, count, onClick, icon }: CheckPillProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all duration-100 cursor-pointer ${
        active
          ? 'border-[var(--accent)]/40 bg-[var(--accent)]/8 text-[var(--text-primary)]'
          : 'border-transparent bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:border-[var(--border-color)] hover:text-[var(--text-secondary)]'
      }`}
    >
      <span className="flex items-center gap-1.5">
        {active ? (
          <CheckCircle2 className="w-3 h-3 text-[var(--accent)]" />
        ) : (
          <span className={`w-3 h-3 rounded-full border ${active ? 'border-[var(--accent)]' : 'border-[var(--border-color)]'}`} />
        )}
        {icon}
        {label}
      </span>
      <span className={`text-[10px] ${active ? 'text-[var(--accent)]' : 'text-[var(--text-disabled)]'}`}>
        {count}
      </span>
    </button>
  );
}

function RadioPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs border transition-all duration-100 cursor-pointer ${
        active
          ? 'border-[var(--accent)]/40 bg-[var(--accent)]/8 text-[var(--text-primary)]'
          : 'border-transparent bg-[var(--surface-elevated)] text-[var(--text-muted)] hover:border-[var(--border-color)]'
      }`}
    >
      <span className={`w-2.5 h-2.5 rounded-full border-2 ${active ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--border-color)]'}`} />
      {label}
    </button>
  );
}
