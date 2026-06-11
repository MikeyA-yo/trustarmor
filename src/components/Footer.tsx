export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]">
      <div className="page-wrap flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="m-0 text-sm font-semibold text-[var(--sea-ink)]">
            &copy; {year} TrustArmor AI. All rights reserved.
          </p>
          <p className="m-0 mt-1 text-xs text-[var(--sea-ink-soft)]">
            Autonomous fraud verification engine protecting micro-merchants against fake SMS payment scams.
          </p>
        </div>
        <p className="island-kicker m-0">Secure Shield • Active Heuristics</p>
      </div>
    </footer>
  )
}

