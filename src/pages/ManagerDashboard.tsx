import { useState } from 'react'
import { Link } from 'react-router-dom'
import AddHireModal from '../components/AddHireModal'
import Avatar from '../components/Avatar'
import EmailPreviewModal, { type EmailKind } from '../components/EmailPreviewModal'
import ProgressBar from '../components/ProgressBar'
import { sortByAttention, type HireSummary } from '../lib/sort'
import { formatDate, startLabel } from '../lib/today'
import { useApp } from '../state/context'
import type { Employee } from '../types'

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className={`text-3xl font-semibold ${tone}`}>{value}</p>
      <p className="mt-1 text-sm text-slate-600">{label}</p>
    </div>
  )
}

function HireRow({ s, today, onRemind }: { s: HireSummary; today: string; onRemind: () => void }) {
  const e = s.employee
  const needsNudge = s.overdue + s.dueSoon > 0
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        <Link
          to={`/manager/hires/${e.id}`}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <Avatar name={e.name} />
          <span className="min-w-0">
            <span className="block font-semibold text-slate-900">{e.name}</span>
            <span className="block truncate text-sm text-slate-600">
              {e.role} · starts {formatDate(e.startDate)}
            </span>
            <span className="block text-xs text-slate-500">{startLabel(e.startDate, today)}</span>
          </span>
        </Link>
        {needsNudge && (
          <button
            onClick={onRemind}
            className="shrink-0 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Remind
          </button>
        )}
      </div>
      <div className="mt-3">
        <ProgressBar done={s.done} total={s.total} size="sm" />
        <p className="mt-2 flex flex-wrap gap-x-3 text-xs text-slate-600">
          <span className={s.overdue > 0 ? 'font-medium text-rose-700' : ''}>! {s.overdue} overdue</span>
          <span className={s.dueSoon > 0 ? 'font-medium text-rose-700' : ''}>● {s.dueSoon} due soon</span>
          <span className="text-emerald-700">✓ {s.done} done</span>
          <span className="text-slate-500">
            ({s.done}/{s.total})
          </span>
        </p>
      </div>
    </li>
  )
}

export default function ManagerDashboard() {
  const { session, managers, employees, today } = useApp()
  const [adding, setAdding] = useState(false)
  const [email, setEmail] = useState<{ kind: EmailKind; employee: Employee } | null>(null)
  const me = managers.find((m) => m.id === session?.id)
  if (!me) return null

  const hires = employees.filter((e) => e.managerId === me.id)
  const summaries = sortByAttention(hires, today)
  const toWelcome = hires.filter((e) => !e.welcomed)
  const overdueTasks = summaries.reduce((n, s) => n + s.overdue, 0)
  const onTrack = summaries.filter((s) => s.overdue === 0).length

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {me.department} · {hires.length} new {hires.length === 1 ? 'hire' : 'hires'}
        </h1>
        <button
          onClick={() => setAdding(true)}
          className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          + Add new hire
        </button>
      </div>

      {toWelcome.map((e) => (
        <div
          key={e.id}
          className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-brand-100 bg-brand-50 p-4"
        >
          <p className="text-sm text-slate-800">
            <span aria-hidden="true">🆕 </span>
            <span className="font-semibold">{e.name}</span> joins {e.department} on {formatDate(e.startDate)}. Their
            onboarding plan is ready.
          </p>
          <button
            onClick={() => setEmail({ kind: 'welcome', employee: e })}
            className="rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            Review &amp; send welcome
          </button>
        </div>
      ))}

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="Hires onboarding" value={hires.length} tone="text-slate-900" />
        <Stat label="Overdue tasks" value={overdueTasks} tone={overdueTasks > 0 ? 'text-rose-600' : 'text-slate-900'} />
        <Stat label="On track" value={onTrack} tone="text-emerald-600" />
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-slate-900">Needs attention first</h2>
      {summaries.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-slate-500">
          No new hires in {me.department} yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {summaries.map((s) => (
            <HireRow
              key={s.employee.id}
              s={s}
              today={today}
              onRemind={() => setEmail({ kind: 'reminder', employee: s.employee })}
            />
          ))}
        </ul>
      )}

      {adding && <AddHireModal onClose={() => setAdding(false)} />}
      {email && <EmailPreviewModal kind={email.kind} employee={email.employee} onClose={() => setEmail(null)} />}
    </div>
  )
}
