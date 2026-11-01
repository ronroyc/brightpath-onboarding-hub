import type { Owner, Phase } from '../types'

export const PHASE_LABEL: Record<Phase, string> = {
  before_day_1: 'Before Day 1',
  week_1: 'Week 1',
  weeks_2_4: 'Weeks 2–4',
}

export const PHASES: Phase[] = ['before_day_1', 'week_1', 'weeks_2_4']

export const OWNER_LABEL: Record<Owner, string> = {
  new_hire: 'You',
  manager: 'Your manager',
  it: 'IT',
  hr: 'HR',
}
