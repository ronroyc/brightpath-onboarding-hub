import { useMemo, useState, type FormEvent } from 'react'
import { generatePlan } from '../lib/plan'
import { addDays } from '../lib/today'
import { useApp } from '../state/context'
import type { Department } from '../types'
import Modal from './Modal'

const DEPARTMENTS: Department[] = ['Engineering', 'Sales', 'Marketing', 'Operations']

const field =
  'w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500'

/** Creates a hire and shows the auto-generated plan size live as the form changes. */
export default function AddHireModal({ onClose }: { onClose: () => void }) {
  const { session, managers, today, addEmployee, notify } = useApp()
  const me = managers.find((m) => m.id === session?.id)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState<Department>(me?.department ?? 'Engineering')
  const [startDate, setStartDate] = useState(addDays(today, 14))
  const [managerId, setManagerId] = useState(
    managers.find((m) => m.department === (me?.department ?? 'Engineering'))?.id ?? managers[0].id,
  )

  const preview = useMemo(
    () => (startDate ? generatePlan({ department, startDate }) : []),
    [department, startDate],
  )
  const companyWide = preview.filter((t) => t.department === 'All').length
  const valid = name.trim() !== '' && role.trim() !== '' && startDate !== ''

  const changeDepartment = (d: Department) => {
    setDepartment(d)
    const owner = managers.find((m) => m.department === d)
    if (owner) setManagerId(owner.id)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!valid) return
    const hire = addEmployee({ name: name.trim(), role: role.trim(), department, startDate, managerId })
    notify(`Plan generated for ${hire.name.split(' ')[0]}: ${hire.tasks.length} tasks`)
    onClose()
  }

  return (
    <Modal title="Add new hire" onClose={onClose}>
      <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 p-5">
          <h2 className="text-lg font-semibold text-slate-900">Add a new hire</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100">
            ✕
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto p-5 text-sm">
          <div>
            <label htmlFor="hire-name" className="mb-1 block text-xs font-medium text-slate-500">Full name</label>
            <input id="hire-name" value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="e.g. Sam Rivera" autoFocus />
          </div>
          <div>
            <label htmlFor="hire-role" className="mb-1 block text-xs font-medium text-slate-500">Job title</label>
            <input id="hire-role" value={role} onChange={(e) => setRole(e.target.value)} className={field} placeholder="e.g. Product Designer" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="hire-dept" className="mb-1 block text-xs font-medium text-slate-500">Department</label>
              <select id="hire-dept" value={department} onChange={(e) => changeDepartment(e.target.value as Department)} className={field}>
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="hire-start" className="mb-1 block text-xs font-medium text-slate-500">Start date</label>
              <input id="hire-start" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={field} />
            </div>
          </div>
          <div>
            <label htmlFor="hire-manager" className="mb-1 block text-xs font-medium text-slate-500">Manager</label>
            <select id="hire-manager" value={managerId} onChange={(e) => setManagerId(e.target.value)} className={field}>
              {managers.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.department})</option>)}
            </select>
            {managerId !== me?.id && (
              <p className="mt-1 text-xs text-slate-500">
                This hire will show up on {managers.find((m) => m.id === managerId)?.name}'s dashboard, not yours.
              </p>
            )}
          </div>

          <div className="rounded-lg border border-brand-100 bg-brand-50 p-3 text-slate-700" aria-live="polite">
            <p className="font-medium text-slate-900">Plan preview</p>
            <p className="mt-1">
              {preview.length} tasks: {companyWide} company-wide + {preview.length - companyWide} for {department}, with
              due dates counted from the start date.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 p-4">
          <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button
            type="submit"
            disabled={!valid}
            className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Generate plan
          </button>
        </div>
      </form>
    </Modal>
  )
}
