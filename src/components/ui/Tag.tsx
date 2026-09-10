import type { ReactNode } from 'react';

export default function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${className}`}>
      {children}
    </span>
  );
}

export function Unverified() {
  return (
    <Tag className="text-gray-500 border-gray-600/40 bg-gray-600/10" >
      unverified
    </Tag>
  );
}
