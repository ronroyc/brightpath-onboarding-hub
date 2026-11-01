export type Department = 'Engineering' | 'Sales' | 'Marketing' | 'Operations'
export type Phase = 'before_day_1' | 'week_1' | 'weeks_2_4'
export type Owner = 'new_hire' | 'manager' | 'it' | 'hr'

export interface TaskTemplate {
  id: string
  title: string
  description: string // what to do
  whyItMatters: string // one sentence
  link?: { label: string; url: string }
  helpContact: { name: string; role: string; email: string }
  phase: Phase
  dueOffsetDays: number // relative to start date; negative = before Day 1
  owner: Owner
  department: Department | 'All' // 'All' = company-wide
}

export interface AssignedTask extends TaskTemplate {
  dueDate: string // ISO date, computed = startDate + dueOffsetDays
  completedAt?: string // ISO date or undefined
}

export interface Employee {
  id: string
  name: string
  role: string // job title
  department: Department
  startDate: string // ISO date
  managerId: string
  welcomed: boolean // manager has sent welcome email
  tasks: AssignedTask[]
}

export interface Manager {
  id: string
  name: string
  role: string
  department: Department
  email: string
}
