import { STATUS_META, type TaskStatus } from '../lib/status'

/** Colour is always paired with an icon and a text label (accessibility). */
export default function StatusBadge({ status, label }: { status: TaskStatus; label?: string }) {
  const meta = STATUS_META[status]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${meta.badge}`}
    >
      <span aria-hidden="true">{meta.icon}</span>
      {label ?? meta.label}
    </span>
  )
}
