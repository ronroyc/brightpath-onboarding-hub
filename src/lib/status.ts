import type { AssignedTask } from '../types'
import { addDays } from './today'

export type TaskStatus = 'completed' | 'overdue' | 'do_now' | 'upcoming'

/** A task turns red this many days before it is due. */
export const URGENT_WINDOW_DAYS = 3

/**
 * Single source of truth for task colour/status.
 *   completed -> green
 *   overdue   -> red (past due)
 *   do_now    -> red (due within the urgent window)
 *   upcoming  -> yellow
 * Red is purely due-date based, never phase based.
 */
export function getTaskStatus(task: AssignedTask, today: string): TaskStatus {
  if (task.completedAt) return 'completed'
  if (task.dueDate < today) return 'overdue'
  if (task.dueDate <= addDays(today, URGENT_WINDOW_DAYS)) return 'do_now'
  return 'upcoming'
}

/** Red = needs attention now (overdue is a sub-state of red). */
export const isUrgent = (status: TaskStatus) => status === 'overdue' || status === 'do_now'

export const STATUS_META: Record<
  TaskStatus,
  { label: string; icon: string; badge: string; dot: string }
> = {
  completed: {
    label: 'Completed',
    icon: '✓',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    dot: 'bg-emerald-500',
  },
  overdue: {
    label: 'Overdue',
    icon: '!',
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    dot: 'bg-rose-500',
  },
  do_now: {
    label: 'Do now',
    icon: '●',
    badge: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    dot: 'bg-rose-500',
  },
  upcoming: {
    label: 'Upcoming',
    icon: '◷',
    badge: 'bg-amber-50 text-amber-800 ring-amber-600/20',
    dot: 'bg-amber-400',
  },
}
