import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import StatusBadge from '../components/StatusBadge'
import TaskDetailModal from '../components/TaskDetailModal'
import { OWNER_LABEL } from '../lib/labels'
import { getTaskStatus, isUrgent } from '../lib/status'
import { dueLabel, formatDate, startLabel } from '../lib/today'
import { useApp } from '../state/context'

const MAX_FOCUS = 5

export default function Focus() {
  const { session, employees, today } = useApp()
  const [openTask, setOpenTask] = useState<string | null>(null)
  const me = employees.find((e) => e.id === session?.id)
  if (!me) return null

  const done = me.tasks.filter((t) => t.completedAt).length
  const urgent = me.tasks
    .filter((t) => isUrgent(getTaskStatus(t, today)))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  const shown = urgent.slice(0, MAX_FOCUS)
  const extra = urgent.length - shown.length
  const next = me.tasks
    .filter((t) => !t.completedAt && !isUrgent(getTaskStatus(t, today)))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))[0]

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Welcome, {me.name.split(' ')[0]} 👋
      </h1>
      <p className="mt-1 text-slate-600">{startLabel(me.startDate, today)}</p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <ProgressBar done={done} total={me.tasks.length} label={`${done} of ${me.tasks.length} tasks complete`} />
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-slate-900">Focus on these first</h2>

      {shown.length === 0 ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-lg font-semibold text-emerald-900">You're all caught up 🎉</p>
          {next ? (
            <p className="mt-2 text-sm text-emerald-800">
              Next up: <span className="font-medium">{next.title}</span> — {formatDate(next.dueDate)}
            </p>
          ) : (
            <p className="mt-2 text-sm text-emerald-800">You've finished your whole onboarding plan.</p>
          )}
        </div>
      ) : (
        <ul className="space-y-3">
          {shown.map((t) => {
            const status = getTaskStatus(t, today)
            return (
              <li key={t.id}>
                <button
                  onClick={() => setOpenTask(t.id)}
                  className="w-full rounded-xl border border-slate-200 border-l-4 border-l-rose-400 bg-white p-4 text-left shadow-sm transition hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={status} label={dueLabel(t.dueDate, today)} />
                  </div>
                  <p className="mt-2 font-medium text-slate-900">{t.title}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Owner: {OWNER_LABEL[t.owner]} · Help: {t.helpContact.name}
                  </p>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {extra > 0 && (
        <Link
          to="/hire/tasks"
          className="mt-4 inline-block text-sm font-medium text-brand-600 hover:underline"
        >
          +{extra} more urgent {extra === 1 ? 'task' : 'tasks'} →
        </Link>
      )}

      {openTask && <TaskDetailModal employeeId={me.id} taskId={openTask} onClose={() => setOpenTask(null)} />}
    </div>
  )
}
