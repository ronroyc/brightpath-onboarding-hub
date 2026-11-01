import { useApp } from '../state/context'

export default function ToastHost() {
  const { toasts, dismissToast } = useApp()
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white shadow-lg"
        >
          <span aria-hidden="true">✓</span>
          {t.message}
          <button
            onClick={() => dismissToast(t.id)}
            className="ml-1 text-slate-400 hover:text-white"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
