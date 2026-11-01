// All dates in the app are date-only ISO strings (YYYY-MM-DD) in local time,
// which avoids timezone drift when computing "days until due".

const pad = (n: number) => String(n).padStart(2, '0')

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function today(): string {
  return toISODate(new Date())
}

function parts(iso: string): [number, number, number] {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  return [y, m, d]
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = parts(iso)
  return toISODate(new Date(y, m - 1, d + days))
}

/** Whole days from b to a (a - b). Positive when a is later than b. */
export function diffDays(a: string, b: string): number {
  const [ay, am, ad] = parts(a)
  const [by, bm, bd] = parts(b)
  return Math.round((Date.UTC(ay, am - 1, ad) - Date.UTC(by, bm - 1, bd)) / 86_400_000)
}

export function formatDate(iso: string, withWeekday = true): string {
  const [y, m, d] = parts(iso)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: withWeekday ? 'short' : undefined,
    month: 'short',
    day: 'numeric',
  })
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

export function dueLabel(due: string, now: string): string {
  const delta = diffDays(due, now)
  if (delta < 0) return `Overdue by ${plural(-delta, 'day')}`
  if (delta === 0) return 'Due today'
  if (delta === 1) return 'Due tomorrow'
  return `Due in ${plural(delta, 'day')}`
}

/** "Day 3 at BrightPath" / "You start in 7 days" / "You start tomorrow". */
export function startLabel(startDate: string, now: string): string {
  const delta = diffDays(startDate, now)
  if (delta > 1) return `You start in ${delta} days`
  if (delta === 1) return 'You start tomorrow'
  if (delta === 0) return 'Day 1 at BrightPath'
  return `Day ${1 - delta} at BrightPath`
}
