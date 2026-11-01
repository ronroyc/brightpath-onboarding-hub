import { STATUS_META, type TaskStatus } from '../lib/status'
import { dueLabel } from '../lib/today'
import type { AssignedTask } from '../types'
import StatusBadge from './StatusBadge'

const BORDER: Record<TaskStatus, string> = {
  completed: 'border-l-emerald-400',
  overdue: 'border-l-rose-400',
  do_now: 'border-l-rose-400',
  upcoming: 'border-l-amber-300',
}

interface Props {
  task: AssignedTask
  status: TaskStatus
  today: string
  onOpen: () => void
  /** Omit for read-only rows (manager view). */
  onToggle?: () => void
}

export default function TaskRow({ task, status, today, onOpen, onToggle }: Props) {
  const done = status === 'completed'
  return (
    <li
      className={`flex items-center gap-3 rounded-xl border border-l-4 border-slate-200 bg-white p-3 shadow-sm ${BORDER[status]}`}
    >
      {onToggle ? (
        <input
          type="checkbox"
          checked={done}
          onChange={onToggle}
          aria-label={done ? `Mark "${task.title}" incomplete` : `Mark "${task.title}" complete`}
          className="h-5 w-5 shrink-0 cursor-pointer accent-emerald-600"
        />
      ) : (
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${STATUS_META[status].badge}`}
        >
          {STATUS_META[status].icon}
        </span>
      )}
      <button onClick={onOpen} className="min-w-0 flex-1 text-left focus:outline-none focus-visible:underline">
        <span className={`block truncate font-medium ${done ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
          {task.title}
        </span>
        <span className="block text-xs text-slate-500">
          {done ? 'Completed' : dueLabel(task.dueDate, today)}
        </span>
      </button>
      <StatusBadge status={status} />
    </li>
  )
}
