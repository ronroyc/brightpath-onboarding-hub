import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { buildSeedEmployees, MANAGERS, SEED_VERSION } from '../data/seed'
import { generatePlan } from '../lib/plan'
import { loadJSON, removeKey, saveJSON } from '../lib/storage'
import { today as getToday } from '../lib/today'
import type { Employee } from '../types'
import { AppContext, type AppApi, type NewHireInput, type Session, type Toast } from './context'

const STORAGE_KEY = 'brightpath-onboarding-hub'

interface Persisted {
  version: number
  seededOn: string
  employees: Employee[]
  session: Session
}

/**
 * Dates in the seed are relative to "today", so saved data from a previous
 * day (or an older seed version) is discarded and re-seeded.
 */
function loadInitial(today: string): { employees: Employee[]; session: Session } {
  const saved = loadJSON<Persisted>(STORAGE_KEY)
  if (saved && saved.version === SEED_VERSION && saved.seededOn === today && Array.isArray(saved.employees)) {
    return { employees: saved.employees, session: saved.session ?? null }
  }
  return { employees: buildSeedEmployees(today), session: null }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [today] = useState(getToday)
  const [initial] = useState(() => loadInitial(today))
  const [employees, setEmployees] = useState<Employee[]>(initial.employees)
  const [session, setSession] = useState<Session>(initial.session)
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastId = useRef(0)

  useEffect(() => {
    const data: Persisted = { version: SEED_VERSION, seededOn: today, employees, session }
    saveJSON(STORAGE_KEY, data)
  }, [today, employees, session])

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const notify = useCallback(
    (message: string) => {
      const id = ++toastId.current
      setToasts((t) => [...t, { id, message }])
      window.setTimeout(() => dismissToast(id), 4000)
    },
    [dismissToast],
  )

  const addEmployee = useCallback((input: NewHireInput): Employee => {
    const hire: Employee = {
      id: `emp-${Date.now().toString(36)}`,
      ...input,
      welcomed: false,
      tasks: generatePlan(input),
    }
    setEmployees((all) => [...all, hire])
    return hire
  }, [])

  const api = useMemo<AppApi>(
    () => ({
      today,
      employees,
      managers: MANAGERS,
      session,
      toasts,
      signIn: (kind, id) => setSession({ kind, id }),
      signOut: () => setSession(null),
      toggleTask: (employeeId, taskId) =>
        setEmployees((all) =>
          all.map((e) =>
            e.id !== employeeId
              ? e
              : {
                  ...e,
                  tasks: e.tasks.map((t) =>
                    t.id !== taskId ? t : { ...t, completedAt: t.completedAt ? undefined : today },
                  ),
                },
          ),
        ),
      markWelcomed: (employeeId) =>
        setEmployees((all) => all.map((e) => (e.id === employeeId ? { ...e, welcomed: true } : e))),
      addEmployee,
      notify,
      dismissToast,
      resetDemo: () => {
        removeKey(STORAGE_KEY)
        setEmployees(buildSeedEmployees(today))
        setSession(null)
      },
    }),
    [today, employees, session, toasts, addEmployee, notify, dismissToast],
  )

  return <AppContext.Provider value={api}>{children}</AppContext.Provider>
}
