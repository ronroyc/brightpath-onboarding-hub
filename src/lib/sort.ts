import type { Employee } from '../types'
import { getTaskStatus, isUrgent } from './status'
import { diffDays } from './today'

export interface HireSummary {
  employee: Employee
  total: number
  done: number
  overdue: number
  dueSoon: number
  /** Days the most-overdue task is late (0 if none). */
  maxOverdueDays: number
  /** 0 overdue, 1 due soon, 2 on track, 3 complete. */
  tier: 0 | 1 | 2 | 3
}

export function summarizeHire(employee: Employee, today: string): HireSummary {
  let done = 0
  let overdue = 0
  let dueSoon = 0
  let maxOverdueDays = 0
  for (const task of employee.tasks) {
    const status = getTaskStatus(task, today)
    if (status === 'completed') done++
    else if (status === 'overdue') {
      overdue++
      maxOverdueDays = Math.max(maxOverdueDays, diffDays(today, task.dueDate))
    } else if (isUrgent(status)) dueSoon++
  }
  const total = employee.tasks.length
  const tier = overdue > 0 ? 0 : dueSoon > 0 ? 1 : done === total && total > 0 ? 3 : 2
  return { employee, total, done, overdue, dueSoon, maxOverdueDays, tier }
}

/** "Needs attention" order: overdue (most overdue first) -> due soon -> on track -> complete. */
export function sortByAttention(employees: Employee[], today: string): HireSummary[] {
  return employees
    .map((e) => summarizeHire(e, today))
    .sort(
      (a, b) =>
        a.tier - b.tier ||
        b.maxOverdueDays - a.maxOverdueDays ||
        b.overdue - a.overdue ||
        a.employee.startDate.localeCompare(b.employee.startDate),
    )
}
