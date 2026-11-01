import { Link } from 'react-router-dom'
import SkipLink from '../components/SkipLink'
import Wordmark from '../components/Wordmark'
import { useApp } from '../state/context'

export default function NotFound() {
  const { session } = useApp()
  // Send signed-in users back to their own home, everyone else to sign-in.
  const home = session ? (session.kind === 'hire' ? '/hire' : '/manager') : '/'

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 text-center outline-none"
    >
      <SkipLink />
      <Wordmark className="text-lg" />
      <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">We can't find that page</h1>
      <p className="mt-2 text-slate-600">The link may be old, or the page may have moved.</p>
      <Link
        to={home}
        className="mt-6 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
      >
        {session ? 'Back to my home' : 'Go to sign in'}
      </Link>
    </main>
  )
}
