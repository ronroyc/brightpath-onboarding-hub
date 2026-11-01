import type { AssignedTask, Employee, TaskTemplate } from '../types'
import { TEMPLATES } from '../data/templates'
import { addDays } from './today'

/**
 * Auto-generates an onboarding plan: every company-wide template plus the
 * templates for the employee's department, with due dates computed from
 * their start date. This is the "auto-generate plans by role/department"
 * feature Sarah asked for.
 */
export function generatePlan(
  employee: Pick<Employee, 'department' | 'startDate'>,
  templates: TaskTemplate[] = TEMPLATES,
): AssignedTask[] {
  return templates
    .filter((t) => t.department === 'All' || t.department === employee.department)
    .map((t) => ({ ...t, dueDate: addDays(employee.startDate, t.dueOffsetDays) }))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate) || a.title.localeCompare(b.title))
}
