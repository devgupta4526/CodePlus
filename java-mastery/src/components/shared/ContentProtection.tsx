'use client';

import React, { useEffect, useState } from 'react';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';

interface ContentProtectionProps {
  children: React.ReactNode;
}

export function ContentProtection({ children }: ContentProtectionProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showBlurShield, setShowBlurShield] = useState(false);

  const showProtectionNotice = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  useEffect(() => {
    const isInput = (target: EventTarget | null) => {
      if (!target) return false;
      const el = target as HTMLElement;
      return (
        el.tagName === 'INPUT' ||
        el.tagName === 'TEXTAREA' ||
        el.isContentEditable ||
        el.closest('input, textarea, [contenteditable="true"]') !== null
      );
    };

    // Prevent Copy/Cut/Paste
    const handleCopy = (e: ClipboardEvent) => {
      if (isInput(e.target)) return;
      e.preventDefault();
      showProtectionNotice('Copying content is disabled to protect platform IP.');
    };

    const handleCut = (e: ClipboardEvent) => {
      if (isInput(e.target)) return;
      e.preventDefault();
      showProtectionNotice('Cutting content is disabled to protect platform IP.');
    };

    const handlePaste = (e: ClipboardEvent) => {
      if (isInput(e.target)) return;
      e.preventDefault();
      showProtectionNotice('Pasting is restricted in content areas.');
    };

    // Prevent Context Menu (Right Click)
    const handleContextMenu = (e: MouseEvent) => {
      if (isInput(e.target)) return;
      e.preventDefault();
      showProtectionNotice('Right-click context menu is disabled.');
    };

    // Keydown protection (Keyboard shortcuts)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();

      // PrintScreen key detection
      if (e.key === 'PrintScreen' || key === 'printscreen') {
        e.preventDefault();
        try {
          navigator.clipboard.writeText('');
        } catch {
          // ignore if clipboard API blocked
        }
        showProtectionNotice('Screenshots are prohibited. Clipboard wiped.');
        return;
      }

      if (isInput(e.target)) return;

      // Copy / Cut / Save / View Source / DevTools shortcuts
      if (
        (isCmdOrCtrl && (key === 'c' || key === 'x' || key === 'u' || key === 's')) ||
        e.key === 'F12' ||
        (isCmdOrCtrl && e.shiftKey && (key === 'i' || key === 'c' || key === 'j'))
      ) {
        e.preventDefault();
        showProtectionNotice('Keyboard shortcut disabled for anti-piracy protection.');
      }
    };

    // Visibility change / Blur detection for screen capture / window switching
    // Disabled for now as per user preference (preserved for future toggle)
    const ENABLE_FOCUS_BLUR_SHIELD = false;

    const handleVisibilityChange = () => {
      if (!ENABLE_FOCUS_BLUR_SHIELD) return;
      if (document.hidden) {
        setShowBlurShield(true);
      } else {
        setShowBlurShield(false);
      }
    };

    const handleBlur = () => {
      if (!ENABLE_FOCUS_BLUR_SHIELD) return;
      setShowBlurShield(true);
    };

    const handleFocus = () => {
      if (!ENABLE_FOCUS_BLUR_SHIELD) return;
      setShowBlurShield(false);
    };


    window.addEventListener('copy', handleCopy);
    window.addEventListener('cut', handleCut);
    window.addEventListener('paste', handlePaste);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('copy', handleCopy);
      window.removeEventListener('cut', handleCut);
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <>
      {children}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--accent)]/30 text-white shadow-2xl backdrop-blur-md animate-fade-in">
          <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/15 flex items-center justify-center border border-[var(--accent)]/30 shrink-0">
            <ShieldAlert className="w-4 h-4 text-[var(--accent)]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--text-primary)]">Protected Content</p>
            <p className="text-[11px] text-[var(--text-muted)]">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Focus Loss / Anti-Screenshot Overlay */}
      {showBlurShield && (
        <div className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center text-center p-6 transition-all duration-300">
          <div className="w-16 h-16 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center mb-4 shadow-lg shadow-[var(--accent)]/10">
            <Lock className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h2 className="text-xl font-bold font-heading text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[var(--warning)]" />
            Content Protection Active
          </h2>
          <p className="text-sm text-[var(--text-muted)] max-w-md">
            Screen is paused while application focus is lost or capture tool is detected. Click inside the window to resume.
          </p>
        </div>
      )}
    </>
  );
}
