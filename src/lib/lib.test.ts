import { describe, expect, it } from 'vitest'
import { TEMPLATES } from '../data/templates'
import { buildSeedEmployees } from '../data/seed'
import type { AssignedTask } from '../types'
import { generatePlan } from './plan'
import { summarizeHire, sortByAttention } from './sort'
import { getTaskStatus } from './status'
import { addDays, diffDays, dueLabel, startLabel } from './today'

const TODAY = '2026-11-02'
const task = (dueDate: string, completedAt?: string): AssignedTask => ({
  ...TEMPLATES[0],
  dueDate,
  completedAt,
})

describe('dates', () => {
  it('adds and diffs whole days across month boundaries', () => {
    expect(addDays('2026-11-30', 3)).toBe('2026-12-03')
    expect(diffDays('2026-12-03', '2026-11-30')).toBe(3)
    expect(diffDays('2026-11-01', '2026-11-02')).toBe(-1)
  })
  it('labels due dates and start dates', () => {
    expect(dueLabel(TODAY, TODAY)).toBe('Due today')
    expect(dueLabel(addDays(TODAY, 1), TODAY)).toBe('Due tomorrow')
    expect(dueLabel(addDays(TODAY, -2), TODAY)).toBe('Overdue by 2 days')
    expect(startLabel(addDays(TODAY, 7), TODAY)).toBe('You start in 7 days')
    expect(startLabel(addDays(TODAY, -2), TODAY)).toBe('Day 3 at BrightPath')
  })
})

describe('getTaskStatus', () => {
  it('is completed whenever completedAt is set', () => {
    expect(getTaskStatus(task(addDays(TODAY, -5), TODAY), TODAY)).toBe('completed')
  })
  it('is overdue strictly before today', () => {
    expect(getTaskStatus(task(addDays(TODAY, -1)), TODAY)).toBe('overdue')
  })
  it('is do_now from today through today + 3', () => {
    expect(getTaskStatus(task(TODAY), TODAY)).toBe('do_now')
    expect(getTaskStatus(task(addDays(TODAY, 3)), TODAY)).toBe('do_now')
  })
  it('is upcoming after today + 3', () => {
    expect(getTaskStatus(task(addDays(TODAY, 4)), TODAY)).toBe('upcoming')
  })
})

describe('generatePlan', () => {
  const start = '2026-11-10'
  const eng = generatePlan({ department: 'Engineering', startDate: start })
  const sales = generatePlan({ department: 'Sales', startDate: start })
  const companyCount = TEMPLATES.filter((t) => t.department === 'All').length

  it('merges company-wide templates with the department templates only', () => {
    const engOnly = eng.filter((t) => t.department === 'Engineering').length
    expect(eng).toHaveLength(companyCount + engOnly)
    expect(eng.some((t) => t.department === 'Sales')).toBe(false)
    expect(sales.some((t) => t.id === 'eng-github')).toBe(false)
    expect(sales.some((t) => t.id === 'sales-crm')).toBe(true)
  })
  it('computes due dates from the start date', () => {
    const handbook = eng.find((t) => t.id === 'all-handbook')!
    expect(handbook.dueDate).toBe(addDays(start, handbook.dueOffsetDays))
  })
  it('keeps phases consistent with due offsets', () => {
    for (const t of TEMPLATES) {
      if (t.phase === 'before_day_1') expect(t.dueOffsetDays).toBeLessThan(0)
      if (t.phase === 'week_1') expect(t.dueOffsetDays).toBeLessThanOrEqual(7)
      if (t.phase === 'weeks_2_4') expect(t.dueOffsetDays).toBeGreaterThan(7)
    }
  })
})

describe('seed + attention sort', () => {
  const employees = buildSeedEmployees(TODAY)
  const byName = (n: string) => employees.find((e) => e.name.startsWith(n))!
  const david = employees.filter((e) => e.managerId === 'mgr-david')

  it('seeds the demo states the spec calls for', () => {
    expect(byName('Priya').welcomed).toBe(false)
    expect(summarizeHire(byName('Priya'), TODAY).done).toBe(0)
    expect(summarizeHire(byName('Priya'), TODAY).dueSoon).toBeGreaterThanOrEqual(2)
    expect(summarizeHire(byName('Marcus'), TODAY).overdue).toBeGreaterThanOrEqual(2)
    expect(summarizeHire(byName('Marcus'), TODAY).overdue).toBeLessThanOrEqual(3)
    const ana = summarizeHire(byName('Ana'), TODAY)
    expect(ana.total - ana.done).toBeLessThanOrEqual(2)
    const emily = byName('Emily')
    expect(emily.tasks.filter((t) => t.phase === 'before_day_1').every((t) => t.completedAt)).toBe(true)
  })
  it("puts the most-overdue hire (Marcus) first on David's dashboard", () => {
    expect(sortByAttention(david, TODAY)[0].employee.name).toBe('Marcus Lee')
  })
  it('orders tiers overdue -> due soon -> on track -> complete', () => {
    const tiers = sortByAttention(employees, TODAY).map((s) => s.tier)
    expect([...tiers].sort()).toEqual(tiers)
  })
  it('gives Emily more than 5 urgent tasks so the Focus cap and "+N more" are exercised', () => {
    const s = summarizeHire(byName('Emily'), TODAY)
    expect(s.overdue + s.dueSoon).toBeGreaterThan(5)
  })
})
