import type { ReactNode } from 'react';

export default function PageHeader({
  title,
  subtitle,
  icon,
  right,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-3">
          {icon && <span className="text-signal-400">{icon}</span>}
          <h1 className="text-3xl font-display font-bold text-rust-300 tracking-wide">{title}</h1>
        </div>
        {subtitle && <p className="text-gray-400 mt-1 max-w-3xl">{subtitle}</p>}
      </div>
      {right && <div className="flex-shrink-0">{right}</div>}
    </div>
  );
}
