import { employeeEmail } from '../data/seed'
import type { Employee, Manager } from '../types'
import { getTaskStatus, isUrgent } from './status'
import { dueLabel, formatDate } from './today'

export interface Email {
  to: string
  subject: string
  body: string
}

const firstName = (name: string) => name.split(' ')[0]

function bullets(lines: string[]): string {
  return lines.length > 0 ? lines.map((l) => `  • ${l}`).join('\n') : '  • Nothing urgent right now.'
}

/** Welcome email: start date, what to do before Day 1, hub link and a personal-note line. */
export function buildWelcomeEmail(employee: Employee, manager: Manager, hubUrl: string): Email {
  const first = firstName(employee.name)
  const beforeDay1 = employee.tasks.filter((t) => t.phase === 'before_day_1' && !t.completedAt)
  return {
    to: employeeEmail(employee.name),
    subject: `Welcome to BrightPath, ${first}!`,
    body: [
      `Hi ${first},`,
      '',
      `We're excited you're joining BrightPath as ${employee.role} in ${employee.department} on ${formatDate(employee.startDate)}.`,
      '',
      `Your personalised onboarding plan is ready in the Onboarding Hub:`,
      hubUrl,
      '',
      'Before your first day, please:',
      bullets(beforeDay1.map((t) => `${t.title} (by ${formatDate(t.dueDate, false)})`)),
      '',
      'P.S. [Add a personal note here, e.g. what you will work on together in week one.]',
      '',
      'Looking forward to working with you,',
      manager.name,
      manager.role,
    ].join('\n'),
  }
}

/** Friendly reminder listing the hire's current red (overdue / due soon) tasks. */
export function buildReminderEmail(employee: Employee, manager: Manager, today: string, hubUrl: string): Email {
  const first = firstName(employee.name)
  const urgent = employee.tasks
    .filter((t) => isUrgent(getTaskStatus(t, today)))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
  return {
    to: employeeEmail(employee.name),
    subject: `A quick nudge on your onboarding tasks`,
    body: [
      `Hi ${first},`,
      '',
      'Just a friendly reminder about a few onboarding tasks that need your attention:',
      bullets(urgent.map((t) => `${t.title}: ${dueLabel(t.dueDate, today).toLowerCase()} (${formatDate(t.dueDate, false)})`)),
      '',
      'You can tick them off here:',
      hubUrl,
      '',
      'If anything is blocking you, just reply and I will help.',
      '',
      'Thanks,',
      manager.name,
    ].join('\n'),
  }
}
