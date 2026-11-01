import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import SkipLink from '../components/SkipLink'
import Wordmark from '../components/Wordmark'
import { startLabel } from '../lib/today'
import { useApp } from '../state/context'

interface CardProps {
  name: string
  role: string
  detail: string
  onClick: () => void
}

function PersonCard({ name, role, detail, onClick }: CardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-brand-500 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <Avatar name={name} size="lg" />
      <span className="min-w-0">
        <span className="block font-semibold text-slate-900">{name}</span>
        <span className="block truncate text-sm text-slate-600">{role}</span>
        <span className="block truncate text-xs text-slate-500">{detail}</span>
      </span>
    </button>
  )
}

export default function SignIn() {
  const { employees, managers, today, signIn, resetDemo } = useApp()
  const [resetDone, setResetDone] = useState(false)
  const navigate = useNavigate()

  const go = (kind: 'hire' | 'manager', id: string) => {
    signIn(kind, id)
    navigate(kind === 'hire' ? '/hire' : '/manager')
  }

  return (
    <main id="main" tabIndex={-1} className="mx-auto flex min-h-screen max-w-3xl flex-col px-4 py-10 outline-none sm:py-16">
      <SkipLink />
      <div className="mb-10 text-center">
        <Wordmark className="text-lg" />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Onboarding Hub</h1>
        <p className="mt-2 text-slate-600">Sign in as a demo user to explore.</p>
      </div>

      <section aria-labelledby="hires" className="mb-8">
        <h2 id="hires" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          New hires
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {employees.map((e) => (
            <PersonCard
              key={e.id}
              name={e.name}
              role={e.role}
              detail={`${e.department} · ${startLabel(e.startDate, today)}`}
              onClick={() => go('hire', e.id)}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="managers" className="mb-10">
        <h2 id="managers" className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Managers
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {managers
            .filter((m) => m.id === 'mgr-david')
            .map((m) => (
              <PersonCard
                key={m.id}
                name={m.name}
                role={m.role}
                detail={m.department}
                onClick={() => go('manager', m.id)}
              />
            ))}
        </div>
      </section>

      <div className="mt-auto space-y-2 text-center text-xs text-slate-500">
        <p>Prototype — production would use company SSO.</p>
        <button
          onClick={() => {
            resetDemo()
            setResetDone(true)
          }}
          className="font-medium text-brand-600 hover:underline"
        >
          {resetDone ? 'Demo data reset ✓' : 'Reset demo data'}
        </button>
      </div>
    </main>
  )
}
