'use client';

import { useState } from 'react';
import { Check, Copy, ChevronDown, ChevronUp, FileCode } from 'lucide-react';
import { Highlight, themes } from 'prism-react-renderer';
import Prism from 'prismjs';
import 'prismjs/components/prism-java';

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  output?: string;
  highlightLines?: number[];
  showLineNumbers?: boolean;
}

export function CodeBlock({
  children,
  language = 'java',
  filename,
  output,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const codeString = children.trimEnd();
  const lines = codeString.split('\n');
  const isLong = lines.length > 20;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 rounded-2xl border border-[var(--code-border)] bg-[var(--code-bg)] overflow-hidden group">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--code-border)] bg-[var(--code-bg)]">
        <div className="flex items-center gap-2">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          {filename && (
            <div className="flex items-center gap-1.5 ml-3 text-xs text-[var(--text-muted)]">
              <FileCode className="w-3.5 h-3.5" />
              <span>{filename}</span>
            </div>
          )}
          {!filename && language && (
            <span className="ml-3 text-xs text-[var(--text-disabled)] uppercase tracking-wider">
              {language}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {isLong && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1.5 rounded-md hover:bg-white/5 text-[var(--text-disabled)] hover:text-[var(--text-muted)] transition-colors cursor-pointer"
              aria-label={collapsed ? 'Expand code' : 'Collapse code'}
            >
              {collapsed ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-white/5 text-[var(--text-disabled)] hover:text-[var(--text-muted)] transition-colors cursor-pointer"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-[var(--success)]" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      {!collapsed && (
        <div className="overflow-x-auto">
          <Highlight
            prism={Prism}
            theme={themes.vsDark}
            code={codeString}
            language={language as any}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className="p-4 text-[13px] leading-relaxed bg-[var(--code-bg)]" style={{ ...style, backgroundColor: 'transparent' }}>
                <code className="font-mono">
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i, className: "flex hover:bg-white/5 transition-colors" })}>
                      {showLineNumbers && (
                        <span className="inline-block w-8 shrink-0 text-right mr-4 text-[var(--text-disabled)] select-none text-[11px] leading-relaxed">
                          {i + 1}
                        </span>
                      )}
                      <span className="flex-1">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </div>
      )}

      {collapsed && (
        <div className="px-4 py-3 text-xs text-[var(--text-disabled)] italic">
          {lines.length} lines collapsed — click expand to view
        </div>
      )}

      {/* Output */}
      {output && !collapsed && (
        <div className="border-t border-[var(--code-border)]">
          <div className="px-4 py-2 flex items-center gap-2 text-xs text-[var(--text-muted)] bg-[var(--code-bg)]">
            <span className="text-[var(--success)]">▶</span>
            <span className="uppercase tracking-wider text-[var(--text-disabled)]">Output</span>
          </div>
          <pre className="px-4 py-3 text-sm font-mono text-[var(--success)] bg-[#0A0E0A] leading-relaxed overflow-x-auto">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
