import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../state/context'
import Avatar from './Avatar'
import ToastHost from './ToastHost'
import Wordmark from './Wordmark'

const link = ({ isActive }: { isActive: boolean }) =>
  `rounded-md px-3 py-1.5 text-sm font-medium ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
  }`

/** Signed-in shell: top nav + page outlet. Redirects to sign-in if the role does not match. */
export default function Layout({ kind }: { kind: 'hire' | 'manager' }) {
  const { session, employees, managers, signOut } = useApp()
  if (!session || session.kind !== kind) return <Navigate to="/" replace />

  const me =
    kind === 'hire'
      ? employees.find((e) => e.id === session.id)
      : managers.find((m) => m.id === session.id)
  if (!me) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3">
          <Wordmark />
          <nav className="flex gap-1" aria-label="Main">
            {kind === 'hire' ? (
              <>
                <NavLink to="/hire" end className={link}>
                  Focus
                </NavLink>
                <NavLink to="/hire/tasks" className={link}>
                  All Tasks
                </NavLink>
              </>
            ) : (
              <NavLink to="/manager" className={link}>
                Dashboard
              </NavLink>
            )}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm text-slate-600 sm:flex">
              <Avatar name={me.name} size="sm" />
              {me.name}
            </span>
            <button
              onClick={signOut}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <Outlet />
      </main>
      <ToastHost />
    </div>
  )
}
