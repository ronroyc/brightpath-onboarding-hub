import { OWNER_LABEL, PHASE_LABEL } from '../lib/labels'
import { getTaskStatus } from '../lib/status'
import { dueLabel, formatDate } from '../lib/today'
import { useApp } from '../state/context'
import Modal from './Modal'
import StatusBadge from './StatusBadge'

interface Props {
  employeeId: string
  taskId: string
  onClose: () => void
  /** New hires can complete their own tasks; managers get a read-only view. */
  canToggle?: boolean
}

export default function TaskDetailModal({ employeeId, taskId, onClose, canToggle = true }: Props) {
  const { employees, today, toggleTask, notify } = useApp()
  const task = employees.find((e) => e.id === employeeId)?.tasks.find((t) => t.id === taskId)
  if (!task) return null

  const status = getTaskStatus(task, today)
  const done = status === 'completed'

  const toggle = () => {
    toggleTask(employeeId, taskId)
    notify(done ? `Marked incomplete: ${task.title}` : `Completed: ${task.title}`)
    onClose()
  }

  return (
    <Modal title={task.title} onClose={onClose}>
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 p-5">
        <div>
          <StatusBadge
            status={status}
            label={status === 'overdue' ? dueLabel(task.dueDate, today) : undefined}
          />
          <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-900">{task.title}</h2>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="-mr-1 -mt-1 rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
        >
          ✕
        </button>
      </div>

      <div className="space-y-5 overflow-y-auto p-5 text-sm">
        <dl className="grid grid-cols-3 gap-3 rounded-lg bg-slate-50 p-3">
          <div>
            <dt className="text-xs text-slate-500">Due</dt>
            <dd className="font-medium text-slate-800">{formatDate(task.dueDate)}</dd>
            {!done && <dd className="text-xs text-slate-500">{dueLabel(task.dueDate, today)}</dd>}
          </div>
          <div>
            <dt className="text-xs text-slate-500">Phase</dt>
            <dd className="font-medium text-slate-800">{PHASE_LABEL[task.phase]}</dd>
          </div>
          <div>
            <dt className="text-xs text-slate-500">Owner</dt>
            <dd className="font-medium text-slate-800">{OWNER_LABEL[task.owner]}</dd>
          </div>
        </dl>

        <section>
          <h3 className="mb-1 font-semibold text-slate-900">What to do</h3>
          <p className="leading-relaxed text-slate-700">{task.description}</p>
        </section>

        <section>
          <h3 className="mb-1 font-semibold text-slate-900">Why this matters</h3>
          <p className="leading-relaxed text-slate-700">{task.whyItMatters}</p>
        </section>

        {task.link && (
          <a
            href={task.link.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-brand-600 hover:underline"
          >
            {task.link.label} <span aria-hidden="true">↗</span>
          </a>
        )}

        <section className="rounded-lg border border-slate-200 p-3">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Need help?
          </h3>
          <p className="font-medium text-slate-900">{task.helpContact.name}</p>
          <p className="text-slate-600">{task.helpContact.role}</p>
          <a
            href={`mailto:${task.helpContact.email}?subject=${encodeURIComponent(`Question: ${task.title}`)}`}
            className="text-brand-600 hover:underline"
          >
            {task.helpContact.email}
          </a>
        </section>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
        <button
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
        >
          Close
        </button>
        {canToggle && (
          <button
            onClick={toggle}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              done
                ? 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'bg-brand-500 text-white hover:bg-brand-600'
            }`}
          >
            {done ? 'Mark incomplete' : 'Mark complete'}
          </button>
        )}
      </div>
    </Modal>
  )
}
