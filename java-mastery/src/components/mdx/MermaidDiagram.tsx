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
      <div className="my-5 p-4 rounded-xl border border-[var(--error)]/30 bg-[var(--error)]/5 text-sm text-[var(--error)]">
        <p className="font-medium mb-1">Diagram render error</p>
        <pre className="text-xs text-[var(--text-muted)] whitespace-pre-wrap">{error}</pre>
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
