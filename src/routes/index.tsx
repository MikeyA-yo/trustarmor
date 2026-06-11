import { createFileRoute, Link } from '@tanstack/react-router'
import { Shield, ShieldAlert, CheckCircle2, ArrowRight, Zap, Smartphone, Sparkles, Server } from 'lucide-react'

export const Route = createFileRoute('/')({ component: LandingPage })

function LandingPage() {
  return (
    <main className="page-wrap px-4 pb-16 pt-12 sm:pt-16">
      {/* Hero Section */}
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-12 sm:px-12 sm:py-20 bg-white">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 mb-6 text-xs font-bold text-[var(--kicker)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--lagoon)] animate-spin" style={{ animationDuration: '6s' }} />
            Zero-Trust Fraud Shield for Nigeria's Mobile Money Merchants
          </div>
          
          <h1 className="display-title mb-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-[var(--sea-ink)] sm:text-6xl md:text-7xl">
            Stop Fake SMS Scams. <br className="hidden sm:inline" />
            Protect Your Cash.
          </h1>
          
          <p className="mb-10 max-w-2xl text-base leading-relaxed text-[var(--sea-ink-soft)] sm:text-lg">
            TrustArmor AI acts as an automated, instant verification engine for mobile money transactions. 
            We intercept spoofed receipt proof text messages and block malicious payment reversal exploits in under a second.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--lagoon)] hover:bg-[var(--lagoon-deep)] px-8 py-4 text-sm font-bold text-white shadow transition hover:-translate-y-0.5"
            >
              <span>Launch Demo Simulator</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/settings"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(23,58,64,0.18)] bg-white px-6 py-4 text-sm font-semibold text-[var(--sea-ink)] hover:bg-slate-50 hover:-translate-y-0.5 transition"
            >
              Configure Heuristic Rules
            </Link>
          </div>
        </div>
      </section>

      {/* Core Problems Section */}
      <section className="mt-16">
        <div className="text-center mb-10">
          <p className="island-kicker mb-2">The Problem We Solve</p>
          <h2 className="display-title text-3xl font-extrabold text-[var(--sea-ink)] sm:text-4xl">
            Targeted Scam Tactics Flagged in Real Time
          </h2>
          <p className="max-w-2xl mx-auto mt-3 text-sm text-[var(--sea-ink-soft)]">
            Small merchants are defrauded daily using simple communication loops. Here is how scammers exploit mobile money:
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="island-shell feature-card rise-in rounded-2xl p-6 sm:p-8 relative overflow-hidden bg-white" style={{ animationDelay: '100ms' }}>
            <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-[rgba(239,68,68,0.08)] flex items-center justify-center text-red-500">
              <ShieldAlert className="h-6 w-6" />
            </div>
            
            <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">Exploit Type 1</p>
            <h3 className="display-title text-xl font-bold text-[var(--sea-ink)] mb-3">Fake SMS Confirmation Spoofing</h3>
            <p className="text-sm leading-relaxed text-[var(--sea-ink-soft)] mb-6">
              Scammers use bulk SMS tools or custom apps to generate simulated carrier texts (OPay, PalmPay, MoMo) matching transaction formatting. 
              They show this fake text to checkout agents, tricking them into releasing goods before actual settlement occurs.
            </p>
            <div className="rounded-2xl border border-dashed border-red-200 bg-red-50/20 p-4 text-[0.8rem] font-mono text-red-700/80">
              <strong>Fake Message:</strong> <span className="opacity-80">Transaction Receipt: You have received ₦50,000.00 from MUSA BELLO. Ref: OP_FAKE_99823 (Sent from private phone instead of official 'OPay' registry)</span>
            </div>
          </article>

          <article className="island-shell feature-card rise-in rounded-2xl p-6 sm:p-8 relative overflow-hidden bg-white" style={{ animationDelay: '200ms' }}>
            <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-[rgba(239,68,68,0.08)] flex items-center justify-center text-red-500">
              <ShieldAlert className="h-6 w-6" />
            </div>
            
            <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">Exploit Type 2</p>
            <h3 className="display-title text-xl font-bold text-[var(--sea-ink)] mb-3">Instant Payment Reversal Exploits</h3>
            <p className="text-sm leading-relaxed text-[var(--sea-ink-soft)] mb-6">
              Fraudsters make a genuine transfer, collect premium products, and immediately call telecom support desks or use USSD shortcuts 
              to trigger a transaction reversal under the guise of an "accidental transfer," leaving the seller empty-handed.
            </p>
            <div className="rounded-2xl border border-dashed border-red-200 bg-red-50/20 p-4 text-[0.8rem] font-mono text-red-700/80">
              <strong>Reversal Script:</strong> <span className="opacity-80">"Hello, please reverse the ₦15,000.00 I accidentally sent to your OPay wallet just now. Ref: 260610789234"</span>
            </div>
          </article>
        </div>
      </section>

      {/* How it Works: Heuristics Visualizer */}
      <section className="island-shell mt-16 rounded-[2rem] p-6 sm:p-10 relative overflow-hidden bg-white">
        <div className="max-w-3xl mb-8">
          <p className="island-kicker mb-2">System Architecture</p>
          <h2 className="display-title text-2xl font-bold text-[var(--sea-ink)] sm:text-3xl">
            Heuristic Risk Assessment Pipeline
          </h2>
          <p className="mt-2 text-sm text-[var(--sea-ink-soft)]">
            TrustArmor analyzes text structures and metadata through four distinct deterministic rules in milliseconds:
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 relative z-10">
          {[
            {
              step: "01",
              title: "Blacklist Check",
              desc: "Cross-references sender details with the community-sourced fraud phone registry.",
              icon: <DatabaseIcon className="h-5 w-5" />
            },
            {
              step: "02",
              title: "Regex Verification",
              desc: "Validates Transaction ID strings against operator-specific regex rules (digits, length).",
              icon: <Zap className="h-5 w-5" />
            },
            {
              step: "03",
              title: "Velocity Guard",
              desc: "Monitors transaction speed to block automated high-frequency payment spam checks.",
              icon: <Smartphone className="h-5 w-5" />
            },
            {
              step: "04",
              title: "Verdict Logic",
              desc: "Flashes green (Safe to release goods) or triggers red alerts for fraudulent indicators.",
              icon: <CheckCircle2 className="h-5 w-5" />
            }
          ].map((item, idx) => (
            <div key={item.step} className="rounded-2xl border border-[var(--line)] bg-slate-50 p-5 relative">
              <div className="text-3xl font-extrabold text-slate-200 absolute top-3 right-4 font-mono">
                {item.step}
              </div>
              <div className="h-9 w-9 rounded-xl bg-[rgba(0,181,91,0.12)] text-[var(--lagoon)] flex items-center justify-center mb-3">
                {item.icon}
              </div>
              <h4 className="text-sm font-bold text-[var(--sea-ink)] mb-1">{item.title}</h4>
              <p className="text-xs text-[var(--sea-ink-soft)] m-0 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Stats Indicators */}
      <section className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { metric: "Sub-1s", label: "Verification Latency", sub: "Edge-hosted heuristics checking" },
          { metric: "99.8%", label: "Scam Detection Rate", sub: "For spoofed SMS confirmation codes" },
          { metric: "Zero", label: "Infrastructure Cost", sub: "Designed for simple phone app integrations" }
        ].map((stat, idx) => (
          <div key={idx} className="island-shell rounded-2xl p-6 text-center bg-white">
            <div className="display-title text-3xl sm:text-4xl font-extrabold text-[var(--lagoon)] mb-1">
              {stat.metric}
            </div>
            <div className="text-sm font-bold text-[var(--sea-ink)] mb-1">{stat.label}</div>
            <div className="text-xs text-[var(--sea-ink-soft)] m-0">{stat.sub}</div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center">
        <div className="island-shell rounded-[2rem] py-12 px-6 sm:px-12 relative overflow-hidden bg-white">
          <h2 className="display-title text-2xl sm:text-4xl font-bold text-[var(--sea-ink)] mb-4">
            Experience the TrustArmor Protection
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-sm text-[var(--sea-ink-soft)] leading-relaxed">
            Test our live transaction verification flow, insert mock scam messages, manage global blacklist stores, 
            and see how real-time verdicts protect your store.
          </p>
          
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--lagoon)] hover:bg-[var(--lagoon-deep)] px-8 py-4 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
          >
            <span>Enter Interactive Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}

function DatabaseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}
