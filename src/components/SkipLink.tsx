/** First tab stop on every page: jumps keyboard users past the navigation. */
export default function SkipLink() {
  return (
    <a
      href="#main"
      onClick={(e) => {
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}
      className="sr-only rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
    >
      Skip to main content
    </a>
  )
}
