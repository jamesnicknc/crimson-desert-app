export default function ProgressBar({
  value,
  max,
  color = 'bg-rust-400',
  label,
  compact = false,
}: {
  value: number;
  max: number;
  color?: string;
  label?: string;
  compact?: boolean;
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div>
      {(label || !compact) && (
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-400">{label}</span>
          <span className="text-gray-300 font-mono">
            {value}/{max} <span className="text-gray-500">({pct}%)</span>
          </span>
        </div>
      )}
      <div className={`w-full bg-arc-bg rounded-full overflow-hidden ${compact ? 'h-1.5' : 'h-2'}`}>
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
