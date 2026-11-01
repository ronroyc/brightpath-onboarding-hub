import { createContext, useContext } from 'react'
import type { Department, Employee, Manager } from '../types'

export interface Toast {
  id: number
  message: string
}

export interface NewHireInput {
  name: string
  role: string
  department: Department
  startDate: string
  managerId: string
}

export type Session = { kind: 'hire' | 'manager'; id: string } | null

export interface AppApi {
  /** ISO date the app considers "today" (fixed at load). */
  today: string
  employees: Employee[]
  managers: Manager[]
  session: Session
  toasts: Toast[]
  signIn: (kind: 'hire' | 'manager', id: string) => void
  signOut: () => void
  toggleTask: (employeeId: string, taskId: string) => void
  markWelcomed: (employeeId: string) => void
  addEmployee: (input: NewHireInput) => Employee
  notify: (message: string) => void
  dismissToast: (id: number) => void
  resetDemo: () => void
}

export const AppContext = createContext<AppApi | null>(null)

export function useApp(): AppApi {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}
