'use client';

import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  onClose,
  children,
  wide = false,
}: {
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6" onClick={onClose}>
      <div
        className={`bg-arc-card border border-arc-border rounded-xl w-full ${wide ? 'max-w-5xl' : 'max-w-3xl'} max-h-[92vh] flex flex-col shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-arc-secondary transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
