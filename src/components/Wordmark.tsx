export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-semibold text-slate-900 ${className}`}>
      <span
        aria-hidden="true"
        className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white"
      >
        B
      </span>
      BrightPath
    </span>
  )
}
