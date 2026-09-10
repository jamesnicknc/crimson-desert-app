'use client';

import { CheckCircle2, Circle } from 'lucide-react';

export default function Checkbox({
  checked,
  onChange,
  label,
  size = 'md',
}: {
  checked: boolean;
  onChange: () => void;
  label?: string;
  size?: 'sm' | 'md';
}) {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      className={`flex items-center gap-2 text-sm transition-colors ${checked ? 'text-green-400' : 'text-gray-500 hover:text-gray-300'}`}
      aria-pressed={checked}
    >
      {checked ? <CheckCircle2 className={cls} /> : <Circle className={cls} />}
      {label && <span>{label}</span>}
    </button>
  );
}
