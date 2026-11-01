import type { Employee, Manager } from '../types'
import { generatePlan } from '../lib/plan'
import { addDays } from '../lib/today'

export const SEED_VERSION = 1

export const MANAGERS: Manager[] = [
  { id: 'mgr-david', name: 'David Kim', role: 'Engineering Manager', department: 'Engineering', email: 'david.kim@brightpath.example' },
  { id: 'mgr-rachel', name: 'Rachel Nguyen', role: 'Sales Manager', department: 'Sales', email: 'rachel.nguyen@brightpath.example' },
  { id: 'mgr-lena', name: 'Lena Ortiz', role: 'Marketing Manager', department: 'Marketing', email: 'lena.ortiz@brightpath.example' },
  { id: 'mgr-omar', name: 'Omar Haddad', role: 'Operations Manager', department: 'Operations', email: 'omar.haddad@brightpath.example' },
]

export const employeeEmail = (name: string) =>
  `${name.toLowerCase().replace(/[^a-z\s]/g, '').trim().replace(/\s+/g, '.')}@brightpath.example`

interface HireSeed {
  id: string
  name: string
  role: string
  department: Employee['department']
  managerId: string
  startOffset: number // days from today
  welcomed: boolean
  /** Task ids (or phase names) to mark complete. */
  done: (taskId: string, phase: string) => boolean
}

const beforeDay1 = (_: string, phase: string) => phase === 'before_day_1'

const HIRES: HireSeed[] = [
  {
    id: 'emp-priya', name: 'Priya Shah', role: 'Software Engineer I', department: 'Engineering',
    managerId: 'mgr-david', startOffset: 7, welcomed: false, done: () => false,
  },
  {
    id: 'emp-emily', name: 'Emily Chen', role: 'Frontend Engineer', department: 'Engineering',
    managerId: 'mgr-david', startOffset: -2, welcomed: true,
    done: (id, phase) => beforeDay1(id, phase) || id === 'all-orientation',
  },
  {
    id: 'emp-marcus', name: 'Marcus Lee', role: 'Data Engineer', department: 'Engineering',
    managerId: 'mgr-david', startOffset: -10, welcomed: true,
    done: (id, phase) =>
      beforeDay1(id, phase) ||
      ['all-orientation', 'all-buddy', 'all-manager-1on1', 'eng-github'].includes(id),
  },
  {
    id: 'emp-ana', name: 'Ana Torres', role: 'QA Engineer', department: 'Engineering',
    managerId: 'mgr-david', startOffset: -25, welcomed: true,
    done: (id) => id !== 'all-30-day-survey',
  },
  {
    id: 'emp-jordan', name: 'Jordan Patel', role: 'Account Executive', department: 'Sales',
    managerId: 'mgr-rachel', startOffset: 3, welcomed: true,
    done: (id) => ['all-offer-forms', 'all-id-photo'].includes(id),
  },
]

/** Builds the demo dataset relative to `today`, so it always looks right. */
export function buildSeedEmployees(today: string): Employee[] {
  return HIRES.map((h) => {
    const startDate = addDays(today, h.startOffset)
    const tasks = generatePlan({ department: h.department, startDate }).map((t) =>
      h.done(t.id, t.phase) ? { ...t, completedAt: t.dueDate } : t,
    )
    return {
      id: h.id,
      name: h.name,
      role: h.role,
      department: h.department,
      startDate,
      managerId: h.managerId,
      welcomed: h.welcomed,
      tasks,
    }
  })
}
