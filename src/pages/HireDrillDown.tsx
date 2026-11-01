import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import EmailPreviewModal, { type EmailKind } from '../components/EmailPreviewModal'
import ProgressBar from '../components/ProgressBar'
import TaskList from '../components/TaskList'
import { summarizeHire } from '../lib/sort'
import { formatDate, startLabel } from '../lib/today'
import { useApp } from '../state/context'

export default function HireDrillDown() {
  const { id } = useParams()
  const { session, employees, today } = useApp()
  const [email, setEmail] = useState<EmailKind | null>(null)

  const hire = employees.find((e) => e.id === id)
  if (!hire || hire.managerId !== session?.id) return <Navigate to="/manager" replace />

  const s = summarizeHire(hire, today)
  const needsNudge = s.overdue + s.dueSoon > 0

  return (
    <div>
      <Link to="/manager" className="text-sm font-medium text-brand-600 hover:underline">
        ← Back to dashboard
      </Link>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar name={hire.name} size="lg" />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{hire.name}</h1>
              <p className="text-slate-600">
                {hire.role} · {hire.department}
              </p>
              <p className="text-sm text-slate-500">
                Starts {formatDate(hire.startDate)} · {startLabel(hire.startDate, today)}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {!hire.welcomed && (
              <button
                onClick={() => setEmail('welcome')}
                className="rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-600"
              >
                Send welcome
              </button>
            )}
            {needsNudge && (
              <button
                onClick={() => setEmail('reminder')}
                className="rounded-lg border border-slate-300 px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Send reminder
              </button>
            )}
          </div>
        </div>
        <div className="mt-5">
          <ProgressBar done={s.done} total={s.total} label={`${s.done} of ${s.total} tasks complete`} />
          <p className="mt-2 flex flex-wrap gap-x-4 text-sm text-slate-600">
            <span className={s.overdue > 0 ? 'font-medium text-rose-700' : ''}>! {s.overdue} overdue</span>
            <span className={s.dueSoon > 0 ? 'font-medium text-rose-700' : ''}>● {s.dueSoon} due soon</span>
            <span className="text-emerald-700">✓ {s.done} done</span>
          </p>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-lg font-semibold text-slate-900">Onboarding plan</h2>
      <TaskList employee={hire} today={today} canToggle={false} />

      {email && <EmailPreviewModal kind={email} employee={hire} onClose={() => setEmail(null)} />}
    </div>
  )
}
