import { useState } from 'react'
import { buildReminderEmail, buildWelcomeEmail } from '../lib/email'
import { useApp } from '../state/context'
import type { Employee } from '../types'
import Modal from './Modal'

export type EmailKind = 'welcome' | 'reminder'

interface Props {
  kind: EmailKind
  employee: Employee
  onClose: () => void
}

/**
 * Shared preview for the Welcome and Reminder emails. Nothing is really sent:
 * "Send" shows a toast and (for welcome) marks the hire as welcomed.
 */
export default function EmailPreviewModal({ kind, employee, onClose }: Props) {
  const { managers, today, markWelcomed, notify } = useApp()
  const manager = managers.find((m) => m.id === employee.managerId) ?? managers[0]
  const [draft] = useState(() => {
    const hubUrl = window.location.origin
    return kind === 'welcome'
      ? buildWelcomeEmail(employee, manager, hubUrl)
      : buildReminderEmail(employee, manager, today, hubUrl)
  })
  const [subject, setSubject] = useState(draft.subject)
  const [body, setBody] = useState(draft.body)
  const first = employee.name.split(' ')[0]

  const send = () => {
    if (kind === 'welcome') markWelcomed(employee.id)
    notify(kind === 'welcome' ? `Welcome email sent to ${first}` : `Reminder sent to ${first}`)
    onClose()
  }

  return (
    <Modal title={kind === 'welcome' ? 'Welcome email preview' : 'Reminder email preview'} onClose={onClose} wide>
      <div className="flex items-center justify-between border-b border-slate-100 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          {kind === 'welcome' ? 'Review welcome email' : 'Review reminder'}
        </h2>
        <button onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100">
          ✕
        </button>
      </div>

      <div className="space-y-4 overflow-y-auto p-5 text-sm">
        <div>
          <label className="mb-1 block text-xs font-medium text-slate-500">To</label>
          <p className="rounded-lg bg-slate-50 px-3 py-2 text-slate-700">{draft.to}</p>
        </div>
        <div>
          <label htmlFor="email-subject" className="mb-1 block text-xs font-medium text-slate-500">
            Subject
          </label>
          <input
            id="email-subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <div>
          <label htmlFor="email-body" className="mb-1 block text-xs font-medium text-slate-500">
            Message (editable)
          </label>
          <textarea
            id="email-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={14}
            className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 font-mono text-[13px] leading-relaxed text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>
        <p className="text-xs text-slate-500">Prototype: no real email is sent.</p>
      </div>

      <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
        <button onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Cancel
        </button>
        <button onClick={send} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600">
          {kind === 'welcome' ? 'Send welcome' : 'Send reminder'}
        </button>
      </div>
    </Modal>
  )
}
