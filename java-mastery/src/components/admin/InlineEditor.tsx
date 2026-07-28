'use client';

/**
 * InlineEditor — Admin-only lesson content editor
 *
 * Rendered exclusively at /admin/editor/[slug] — never on the public site.
 * Displays the full lesson reading layout and overlays section-level editing:
 *
 *   • Sticky admin toolbar (view toggle + save button)
 *   • "Rendered view"   — lesson rendered normally; right-gutter + bottom strip
 *                         list every section as clickable edit buttons
 *   • "Section list"    — flat card list, each card can be double-clicked or
 *                         pencil-clicked; "Add section" bars between every card;
 *                         move up/down arrows; delete button
 *   • Slide-in panel    — per-section Monaco markdown editor; Apply / Discard
 *   • Save lesson       — calls POST /api/admin action=save_content_only
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  Pencil, Trash2, Save, X, Plus, GripVertical,
  Check, AlertTriangle, ChevronDown, ChevronUp, Loader2,
  LayoutList, Eye,
} from 'lucide-react';

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

// ─── types ────────────────────────────────────────────────────────────────────

interface Section {
  id: number;
  text: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Split raw MDX body (no frontmatter) into heading-delimited blocks. */
function splitIntoSections(raw: string): Section[] {
  const lines = raw.split('\n');
  const sections: Section[] = [];
  let current: string[] = [];
  let id = 0;

  const flush = () => {
    const text = current.join('\n').trimEnd();
    if (text) sections.push({ id: id++, text });
    current = [];
  };

  for (const line of lines) {
    if (/^#{1,6}\s/.test(line) && current.length > 0) flush();
    current.push(line);
  }
  flush();
  return sections;
}

function sectionsToRaw(sections: Section[]): string {
  return sections.map((s) => s.text).join('\n\n');
}

function sectionTitle(text: string): string {
  const first = text.split('\n').find((l) => /^#{1,6}\s/.test(l));
  if (first) return first.replace(/^#+\s/, '').slice(0, 80);
  return text.replace(/\n/g, ' ').slice(0, 60) || 'Untitled';
}

// ─── sub-components ──────────────────────────────────────────────────────────

function Toast({ message, ok }: { message: string; ok: boolean }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[200] flex items-center gap-2 px-4 py-3 rounded-xl border shadow-xl text-sm font-medium ${
        ok
          ? 'bg-[var(--success)]/10 border-[var(--success)]/30 text-[var(--success)]'
          : 'bg-[#FF5F57]/10 border-[#FF5F57]/30 text-[#FF5F57]'
      }`}
    >
      {ok ? <Check className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
      {message}
    </div>
  );
}

function AddSectionBar({ onAdd }: { onAdd: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative h-7 flex items-center justify-center my-0.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 h-px transition-colors duration-150 ${hovered ? 'bg-[var(--accent)]/50' : 'bg-transparent'}`} />
      <button
        onClick={onAdd}
        className={`relative z-10 flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-semibold transition-all duration-150 cursor-pointer ${
          hovered
            ? 'opacity-100 scale-100 bg-[var(--accent)] text-white shadow-md'
            : 'opacity-0 scale-90 bg-[var(--surface-elevated)] text-[var(--text-disabled)] border border-[var(--border-color)]'
        }`}
      >
        <Plus className="w-3 h-3" /> Add section here
      </button>
    </div>
  );
}

// ─── MDX renderer (lazy) ─────────────────────────────────────────────────────
// We dynamically import the project's own MDXRenderer so the admin editor
// can show a live "rendered" preview without duplicating render logic.
const MDXRenderer = dynamic(
  () => import('@/components/mdx/MDXRenderer').then((m) => m.MDXRenderer),
  { ssr: false, loading: () => <div className="h-20 animate-pulse rounded-xl bg-[var(--surface)]" /> }
);

// ─── main component ───────────────────────────────────────────────────────────

interface InlineEditorProps {
  slug: string;
  lessonTitle: string;
}

export function InlineEditor({ slug, lessonTitle }: InlineEditorProps) {
  // ── state ──────────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [rawContent, setRawContent] = useState('');          // full body (no frontmatter)
  const [sections, setSections] = useState<Section[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [panelText, setPanelText] = useState('');
  const [saving, setSaving] = useState(false);
  const [viewMode, setViewMode] = useState<'rendered' | 'sections'>('sections');
  const [collapsed, setCollapsed] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((msg: string, ok = true) => {
    setToast({ msg, ok });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  // ── fetch lesson content on mount ─────────────────────────────────────────
  useEffect(() => {
    fetch(`/api/admin?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.success) throw new Error(data.error || 'Failed to load');
        // Strip frontmatter block (--- ... ---) before splitting
        const body = (data.content as string).replace(/^---[\s\S]*?---\n?/, '').trimStart();
        setRawContent(body);
        setSections(splitIntoSections(body));
      })
      .catch((e) => setFetchError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  // ── section operations ────────────────────────────────────────────────────
  const openSection = (s: Section) => {
    setActiveId(s.id);
    setPanelText(s.text);
  };

  const closePanel = () => { setActiveId(null); setPanelText(''); };

  const applyEdit = () => {
    setSections((prev) => prev.map((s) => (s.id === activeId ? { ...s, text: panelText } : s)));
    closePanel();
  };

  const deleteSection = (id: number) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (activeId === id) closePanel();
  };

  const addSectionAfter = (afterIndex: number) => {
    const ns: Section = { id: Date.now(), text: '## New Section\n\nWrite your content here.' };
    setSections((prev) => {
      const next = [...prev];
      next.splice(afterIndex + 1, 0, ns);
      return next;
    });
    setActiveId(ns.id);
    setPanelText(ns.text);
  };

  const moveSection = (from: number, to: number) => {
    setSections((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const toggleCollapse = (id: number) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── save ──────────────────────────────────────────────────────────────────
  const saveToServer = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_content_only', slug, content: sectionsToRaw(sections) }),
      });
      const data = await res.json();
      if (data.success) {
        setRawContent(sectionsToRaw(sections));
        showToast('Lesson saved to disk!', true);
      } else {
        showToast(data.error || 'Save failed', false);
      }
    } catch {
      showToast('Network error — could not save', false);
    } finally {
      setSaving(false);
    }
  };

  // Derived live preview content from current sections
  const previewContent = sectionsToRaw(sections);
  const activeSection = sections.find((s) => s.id === activeId) ?? null;

  // ── loading / error states ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32 gap-3 text-[var(--text-muted)]">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading lesson content…</span>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-6 rounded-2xl border border-[#FF5F57]/30 bg-[#FF5F57]/5 text-[#FF5F57] text-sm">
        <AlertTriangle className="w-4 h-4 inline mr-2" />
        {fetchError}
      </div>
    );
  }

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="relative">

      {/* ── Sticky Toolbar ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 flex items-center gap-2 px-4 py-2.5 mb-6 rounded-2xl border border-[var(--accent)]/25 bg-[var(--bg)]/95 backdrop-blur-md shadow-lg">
        {/* label */}
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] text-[11px] font-bold tracking-wide uppercase border border-[var(--accent)]/20">
          <Pencil className="w-3 h-3" /> Editing: {lessonTitle}
        </span>

        <div className="flex-1" />

        {/* view toggle */}
        <div className="flex items-center gap-0.5 p-0.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)]">
          <button
            onClick={() => setViewMode('sections')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'sections' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" /> Section list
          </button>
          <button
            onClick={() => setViewMode('rendered')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'rendered' ? 'bg-[var(--accent)] text-white shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        </div>

        {/* view on site */}
        <a
          href={`/lesson/${slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] bg-[var(--surface-elevated)] border border-[var(--border-color)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)] transition-all"
        >
          <Eye className="w-3.5 h-3.5" /> View on site
        </a>

        {/* save */}
        <button
          onClick={saveToServer}
          disabled={saving}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[var(--success)] text-white text-xs font-bold shadow-md hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          {saving ? 'Saving…' : 'Save lesson'}
        </button>
      </div>

      {/* ── PREVIEW MODE ────────────────────────────────────────────────────── */}
      {viewMode === 'rendered' && (
        <div className="relative">
          {/* live rendered output */}
          <MDXRenderer content={previewContent} />

          {/* Right-gutter section jump list (xl screens) */}
          <div className="hidden xl:flex absolute right-[-220px] top-0 w-52 flex-col gap-0.5">
            <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase tracking-widest mb-2 px-1">
              Jump to section
            </p>
            {sections.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => openSection(s)}
                className="group w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-elevated)] border border-transparent hover:border-[var(--accent)]/20 transition-all cursor-pointer leading-snug"
              >
                <span className="font-mono text-[9px] text-[var(--text-disabled)] mr-1">#{idx + 1}</span>
                {sectionTitle(s.text).slice(0, 34)}
                <Pencil className="w-2.5 h-2.5 inline ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
            <button
              onClick={() => addSectionAfter(sections.length - 1)}
              className="mt-1 w-full flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] text-[var(--text-disabled)] hover:text-[var(--accent)] hover:bg-[var(--surface-elevated)] border border-dashed border-[var(--border-color)] hover:border-[var(--accent)]/30 transition-all cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add section
            </button>
          </div>

          {/* Section jump strip for smaller screens */}
          <div className="xl:hidden mt-8 p-3 rounded-2xl border border-[var(--accent)]/20 bg-[var(--surface)]">
            <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase tracking-widest mb-2">
              Edit sections
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sections.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => openSection(s)}
                  className="px-2.5 py-1 rounded-lg text-[11px] text-[var(--text-muted)] hover:text-[var(--accent)] bg-[var(--surface-elevated)] hover:bg-[var(--surface)] border border-[var(--border-color)] hover:border-[var(--accent)]/20 transition-all cursor-pointer"
                >
                  #{idx + 1} {sectionTitle(s.text).slice(0, 22)}
                </button>
              ))}
              <button
                onClick={() => addSectionAfter(sections.length - 1)}
                className="px-2.5 py-1 rounded-lg text-[11px] text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 hover:bg-[var(--accent)]/20 transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SECTION LIST MODE ───────────────────────────────────────────────── */}
      {viewMode === 'sections' && (
        <div className="space-y-1.5">
          {sections.map((s, idx) => {
            const isCollapsed = collapsed.has(s.id);
            return (
              <div key={s.id}>
                <div
                  className="group rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] hover:border-[var(--accent)]/30 transition-all"
                  onDoubleClick={() => openSection(s)}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-2 px-4 py-3">
                    <GripVertical className="w-4 h-4 text-[var(--text-disabled)] shrink-0 cursor-grab" />

                    <span className="font-mono text-[10px] text-[var(--text-disabled)] bg-[var(--surface-elevated)] px-1.5 py-0.5 rounded shrink-0">
                      §{idx + 1}
                    </span>

                    <span className="flex-1 text-sm font-medium text-[var(--text-primary)] truncate">
                      {sectionTitle(s.text)}
                    </span>

                    <span className="hidden sm:block text-[10px] text-[var(--text-disabled)] shrink-0 mr-1">
                      {s.text.split(/\s+/).filter(Boolean).length} words
                    </span>

                    {/* action buttons — always visible on hover, accessible */}
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {idx > 0 && (
                        <button onClick={() => moveSection(idx, idx - 1)} title="Move up"
                          className="p-1.5 rounded-lg cursor-pointer text-[var(--text-disabled)] hover:text-[var(--accent)] hover:bg-[var(--surface-elevated)] transition-colors">
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {idx < sections.length - 1 && (
                        <button onClick={() => moveSection(idx, idx + 1)} title="Move down"
                          className="p-1.5 rounded-lg cursor-pointer text-[var(--text-disabled)] hover:text-[var(--accent)] hover:bg-[var(--surface-elevated)] transition-colors">
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button onClick={() => openSection(s)} title="Edit"
                        className="p-1.5 rounded-lg cursor-pointer text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--surface-elevated)] transition-colors">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => deleteSection(s.id)} title="Delete section"
                        className="p-1.5 rounded-lg cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] hover:bg-[#FF5F57]/10 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => toggleCollapse(s.id)} title={isCollapsed ? 'Expand' : 'Collapse'}
                        className="p-1.5 rounded-lg cursor-pointer text-[var(--text-disabled)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors">
                        {isCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Collapsible raw preview */}
                  {!isCollapsed && (
                    <div className="px-4 pb-3 border-t border-[var(--border-color)]">
                      <pre className="mt-2 text-[11px] text-[var(--text-muted)] font-mono whitespace-pre-wrap line-clamp-5 leading-relaxed select-text">
                        {s.text.length > 320 ? s.text.slice(0, 320) + '…' : s.text}
                      </pre>
                      <p className="mt-1 text-[10px] text-[var(--text-disabled)]">
                        Double-click card · or click <Pencil className="w-2.5 h-2.5 inline" /> to open editor
                      </p>
                    </div>
                  )}
                </div>

                {/* Add-section bar between cards */}
                <AddSectionBar onAdd={() => addSectionAfter(idx)} />
              </div>
            );
          })}

          {/* Add at end */}
          <button
            onClick={() => addSectionAfter(sections.length - 1)}
            className="w-full py-3 rounded-2xl border border-dashed border-[var(--accent)]/30 text-sm text-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add new section at end
          </button>
        </div>
      )}

      {/* ── Edit Panel (slide-in from right) ────────────────────────────────── */}
      {activeSection && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/40 backdrop-blur-sm cursor-pointer" onClick={closePanel} />

          {/* Panel */}
          <div className="w-full sm:w-[620px] lg:w-[740px] h-full bg-[var(--bg)] border-l border-[var(--border-color)] flex flex-col shadow-2xl">

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-color)] bg-[var(--surface)] shrink-0">
              <Pencil className="w-4 h-4 text-[var(--accent)] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">Editing section</p>
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                  {sectionTitle(activeSection.text)}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => deleteSection(activeSection.id)}
                  title="Delete this section"
                  className="p-1.5 rounded-lg cursor-pointer text-[var(--text-muted)] hover:text-[#FF5F57] hover:bg-[#FF5F57]/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={closePanel}
                  className="p-1.5 rounded-lg cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Monaco editor */}
            <div className="flex-1 min-h-0">
              <MonacoEditor
                height="100%"
                language="markdown"
                value={panelText}
                onChange={(v) => setPanelText(v || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineHeight: 22,
                  automaticLayout: true,
                  wordWrap: 'on',
                  scrollBeyondLastLine: false,
                  padding: { top: 16, bottom: 16 },
                  lineNumbers: 'off',
                  renderLineHighlight: 'none',
                  folding: false,
                  glyphMargin: false,
                  contextmenu: false,
                }}
              />
            </div>

            {/* Footer */}
            <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-t border-[var(--border-color)] bg-[var(--surface)]">
              <p className="text-[11px] text-[var(--text-disabled)]">
                Click <strong>Apply</strong> to stage, then <strong>Save lesson</strong> in the toolbar to write to disk.
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={closePanel}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-muted)] bg-[var(--surface-elevated)] border border-[var(--border-color)] hover:bg-[var(--surface)] transition-all cursor-pointer"
                >
                  Discard
                </button>
                <button
                  onClick={applyEdit}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-all cursor-pointer shadow-md"
                >
                  <Check className="w-3.5 h-3.5" /> Apply changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.msg} ok={toast.ok} />}
    </div>
  );
}
