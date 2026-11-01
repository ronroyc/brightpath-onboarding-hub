interface Props {
  done: number
  total: number
  label?: string
  size?: 'sm' | 'md'
}

export default function ProgressBar({ done, total, label, size = 'md' }: Props) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100)
  return (
    <div>
      {label !== undefined && (
        <div className="mb-1.5 flex items-baseline justify-between text-sm">
          <span className="font-medium text-slate-700">{label}</span>
          <span className="text-slate-500">{pct}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={`${done} of ${total} tasks complete`}
        className={`w-full overflow-hidden rounded-full bg-slate-200 ${size === 'sm' ? 'h-1.5' : 'h-2.5'}`}
      >
        <div
          className="h-full rounded-full bg-emerald-500 transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
