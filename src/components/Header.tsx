import { Link } from '@tanstack/react-router'
import { Shield, LayoutDashboard, History, Database, BarChart3, Settings } from 'lucide-react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2 transition hover:-translate-y-0.5"
          >
            <Shield className="h-4.5 w-4.5 text-[var(--lagoon-deep)] animate-pulse" />
            <span className="font-extrabold tracking-tight text-[var(--lagoon)]">
              TrustArmor AI
            </span>
            <span className="hidden sm:inline-block rounded-full bg-[rgba(79,184,178,0.15)] px-2 py-0.5 text-[0.65rem] font-bold text-[var(--lagoon-deep)]">
              PROTOTYPE
            </span>
          </Link>
        </h2>

        <div className="order-3 flex w-full flex-wrap items-center gap-x-1 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0 sm:gap-x-2">
          <Link
            to="/"
            className="nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm"
            activeProps={{ className: 'nav-link is-active' }}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/transactions"
            className="nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm"
            activeProps={{ className: 'nav-link is-active' }}
          >
            <History className="h-3.5 w-3.5" />
            <span>Logs</span>
          </Link>
          <Link
            to="/blacklist"
            className="nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm"
            activeProps={{ className: 'nav-link is-active' }}
          >
            <Database className="h-3.5 w-3.5" />
            <span>Blacklist</span>
          </Link>
          <Link
            to="/analytics"
            className="nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm"
            activeProps={{ className: 'nav-link is-active' }}
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Analytics</span>
          </Link>
          <Link
            to="/settings"
            className="nav-link inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm"
            activeProps={{ className: 'nav-link is-active' }}
          >
            <Settings className="h-3.5 w-3.5" />
            <span>Settings</span>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Flat brand identity */}
          <span className="h-2 w-2 rounded-full bg-[var(--lagoon)]" />
        </div>
      </nav>
    </header>
  )
}

