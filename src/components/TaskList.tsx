import { useState } from 'react'
import { PHASES, PHASE_LABEL } from '../lib/labels'
import { getTaskStatus } from '../lib/status'
import type { Employee } from '../types'
import TaskDetailModal from './TaskDetailModal'
import TaskRow from './TaskRow'

type Filter = 'all' | 'todo' | 'done'
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'todo', label: 'To do' },
  { id: 'done', label: 'Completed' },
]

interface Props {
  employee: Employee
  today: string
  /** Allow ticking tasks off (new hire) or read-only (manager). */
  canToggle: boolean
  onToggle?: (taskId: string) => void
}

/** Tasks grouped by phase with per-phase progress and a status filter. */
export default function TaskList({ employee, today, canToggle, onToggle }: Props) {
  const [filter, setFilter] = useState<Filter>('all')
  const [openTask, setOpenTask] = useState<string | null>(null)

  const visible = (done: boolean) => filter === 'all' || (filter === 'done') === done

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset ${
              filter === f.id
                ? 'bg-brand-500 text-white ring-brand-500'
                : 'bg-white text-slate-600 ring-slate-300 hover:bg-slate-50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {PHASES.map((phase) => {
        const all = employee.tasks.filter((t) => t.phase === phase)
        if (all.length === 0) return null
        const done = all.filter((t) => t.completedAt).length
        const rows = all.filter((t) => visible(Boolean(t.completedAt)))
        return (
          <section key={phase} className="mb-8" aria-labelledby={`phase-${phase}`}>
            <h2 id={`phase-${phase}`} className="mb-3 flex items-baseline gap-2 text-lg font-semibold text-slate-900">
              {PHASE_LABEL[phase]}
              <span className="text-sm font-normal text-slate-500">
                {done}/{all.length} done
              </span>
            </h2>
            {rows.length === 0 ? (
              <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                Nothing here with this filter.
              </p>
            ) : (
              <ul className="space-y-2">
                {rows.map((t) => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    status={getTaskStatus(t, today)}
                    today={today}
                    onOpen={() => setOpenTask(t.id)}
                    onToggle={canToggle && onToggle ? () => onToggle(t.id) : undefined}
                  />
                ))}
              </ul>
            )}
          </section>
        )
      })}

      {openTask && (
        <TaskDetailModal
          employeeId={employee.id}
          taskId={openTask}
          canToggle={canToggle}
          onClose={() => setOpenTask(null)}
        />
      )}
    </div>
  )
}
