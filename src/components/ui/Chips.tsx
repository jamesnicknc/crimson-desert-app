'use client';

export interface ChipOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

export default function Chips<T extends string>({
  options,
  value,
  onChange,
  allLabel = 'All',
  size = 'sm',
}: {
  options: ChipOption<T>[];
  value: T | 'all';
  onChange: (v: T | 'all') => void;
  allLabel?: string | null;
  size?: 'sm' | 'xs';
}) {
  const pad = size === 'xs' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-xs';
  const render = (v: T | 'all', label: string, count?: number) => {
    const active = value === v;
    return (
      <button
        key={v}
        onClick={() => onChange(v)}
        className={`${pad} rounded-full border font-display font-semibold transition-colors whitespace-nowrap ${
          active
            ? 'bg-rust-500 text-black border-rust-400'
            : 'bg-arc-card text-gray-300 border-arc-border hover:border-rust-400/60 hover:text-rust-300'
        }`}
      >
        {label}
        {count !== undefined && <span className={`ml-1 ${active ? 'text-black/60' : 'text-gray-500'}`}>{count}</span>}
      </button>
    );
  };
  return (
    <div className="flex flex-wrap gap-2">
      {allLabel !== null && render('all', allLabel)}
      {options.map((o) => render(o.value, o.label, o.count))}
    </div>
  );
}
