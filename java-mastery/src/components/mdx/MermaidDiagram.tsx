'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import('mermaid')).default;

        mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          themeVariables:
            resolvedTheme === 'dark'
              ? {
                  primaryColor: '#232428',
                  primaryTextColor: '#F5F5F4',
                  primaryBorderColor: '#2F3136',
                  lineColor: '#8C8C85',
                  secondaryColor: '#18191B',
                  tertiaryColor: '#111214',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                }
              : {
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                },
          securityLevel: 'loose',
          fontFamily: 'Inter, system-ui, sans-serif',
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
        if (!cancelled) {
          setSvg(renderedSvg);
          setError('');
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to render diagram');
        }
      }
    }

    renderChart();
    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme]);

  if (error) {
    return (
      <div className="my-5 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] overflow-hidden shadow-sm">
        <div className="px-4 py-2 border-b border-[var(--border-color)] bg-[var(--surface-elevated)] text-[10px] text-[var(--text-muted)] flex items-center justify-between">
          <span className="font-mono">diagram-spec.mermaid</span>
          <span className="text-[var(--text-muted)] font-semibold uppercase tracking-wider bg-[var(--border-color)] px-1.5 py-0.5 rounded text-[8px]">Source Code View</span>
        </div>
        <pre className="p-4 text-xs text-[var(--text-secondary)] font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed bg-[var(--surface)]">
          {chart}
        </pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="my-5 flex items-center justify-center py-12 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
        <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-5 overflow-x-auto rounded-xl border border-[var(--border-color)] bg-[var(--surface)] p-4"
    >
      <div
        className="flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
