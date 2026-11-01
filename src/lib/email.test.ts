import { describe, expect, it } from 'vitest'
import { buildSeedEmployees, MANAGERS } from '../data/seed'
import { buildReminderEmail, buildWelcomeEmail } from './email'

const TODAY = '2026-11-02'
const employees = buildSeedEmployees(TODAY)
const david = MANAGERS[0]
const find = (n: string) => employees.find((e) => e.name.startsWith(n))!

describe('emails', () => {
  it('addresses the hire as first.last@brightpath.example', () => {
    expect(buildWelcomeEmail(find('Priya'), david, 'https://hub').to).toBe('priya.shah@brightpath.example')
  })
  it("welcome email lists Priya's before-Day-1 tasks and the hub link", () => {
    const e = buildWelcomeEmail(find('Priya'), david, 'https://hub')
    expect(e.body).toContain('Sign your offer')
    expect(e.body).toContain('https://hub')
    expect(e.body).toContain('David Kim')
  })
  it("reminder lists Marcus's overdue tasks", () => {
    const e = buildReminderEmail(find('Marcus'), david, TODAY, 'https://hub')
    expect(e.body).toContain('Complete security & privacy training')
    expect(e.body).toContain('overdue by')
  })
})
