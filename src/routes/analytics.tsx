import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTrustArmorStore } from '../lib/store'
import { 
  BarChart3, PiggyBank, ShieldCheck, ShieldX, 
  HelpCircle, Percent, ArrowUpRight, TrendingUp 
} from 'lucide-react'

export const Route = createFileRoute('/analytics')({
  component: AnalyticsPage,
})

function AnalyticsPage() {
  const store = useTrustArmorStore()
  
  // Local state for ROI Calculator
  const [dailyTxCount, setDailyTxCount] = useState(15)
  const [avgTxSize, setAvgTxSize] = useState(15000) // Default in Naira ₦
  const [estimatedScamRate, setEstimatedScamRate] = useState(2) // 2% scam attempts

  // Calculate stats from transactions store
  const totalQueries = store.transactions.length
  const safeCount = store.transactions.filter(t => t.verdict === 'safe').length
  const dangerCount = store.transactions.filter(t => t.verdict === 'danger').length
  
  const currencySymbol = store.activeProfile.currency

  // Total funds checked
  const totalVolume = store.transactions.reduce((acc, curr) => acc + curr.amount, 0)
  
  // Total fraud funds intercepted and saved
  const fraudIntercepted = store.transactions
    .filter(t => t.verdict === 'danger')
    .reduce((acc, curr) => acc + curr.amount, 0)

  // Scam vectors classification
  const blacklistHits = store.transactions.filter(t => 
    t.findings.some(f => f.toLowerCase().includes('blacklist'))
  ).length

  const regexMismatches = store.transactions.filter(t => 
    t.findings.some(f => f.toLowerCase().includes('regex') || f.toLowerCase().includes('signature') || f.toLowerCase().includes('syntax'))
  ).length

  const reversalTactics = store.transactions.filter(t => t.reversalRisk).length

  // Simulated Scam attempts by Hour (Mock Distribution for Chart)
  // Hour of day (0-23) -> percentage of scams
  const hourlyData = [
    { hour: "00:00", rate: 65 },
    { hour: "04:00", rate: 20 },
    { hour: "08:00", rate: 15 },
    { hour: "12:00", rate: 30 },
    { hour: "16:00", rate: 45 },
    { hour: "20:00", rate: 85 }
  ]

  // ROI Math
  const monthlyTotalVal = dailyTxCount * avgTxSize * 30
  const monthlyScamAttemptLoss = monthlyTotalVal * (estimatedScamRate / 100)
  const annualSavings = monthlyScamAttemptLoss * 12

  return (
    <main className="page-wrap px-4 py-8">
      {/* Page Header */}
      <section className="mb-8">
        <p className="island-kicker mb-1">Business Intelligence</p>
        <h1 className="display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2">
          <BarChart3 className="h-7 w-7 text-[var(--lagoon-deep)]" />
          <span>Security Insights & Analytics</span>
        </h1>
        <p className="text-sm text-[var(--sea-ink-soft)]">
          Real-time metrics, fraud vectors intercepted, and merchant operational savings summaries.
        </p>
      </section>

      {/* Metric Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {[
          {
            title: "Total Checks Run",
            value: totalQueries,
            sub: "SMS payloads scanned",
            icon: <ShieldCheck className="h-5 w-5 text-[var(--lagoon-deep)]" />,
            color: "text-[var(--sea-ink)]"
          },
          {
            title: "Verified Secure",
            value: safeCount,
            sub: `${totalQueries ? Math.round((safeCount / totalQueries) * 100) : 0}% success rate`,
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
            color: "text-emerald-600"
          },
          {
            title: "Scams Intercepted",
            value: dangerCount,
            sub: `${totalQueries ? Math.round((dangerCount / totalQueries) * 100) : 0}% flag rate`,
            icon: <ShieldX className="h-5 w-5 text-red-500" />,
            color: "text-red-500"
          },
          {
            title: "Merchant Funds Saved",
            value: `${currencySymbol} ${fraudIntercepted.toLocaleString()}`,
            sub: "Total scam value blocked",
            icon: <PiggyBank className="h-5 w-5 text-amber-500" />,
            color: "text-amber-600"
          }
        ].map((card, idx) => (
          <div key={idx} className="island-shell rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
              {card.icon}
            </div>
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] block mb-1">
              {card.title}
            </span>
            <div className={`text-2xl font-extrabold ${card.color} mb-1`}>
              {card.value}
            </div>
            <span className="text-xs text-[var(--sea-ink-soft)] font-medium">
              {card.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Main Analytics charts & details */}
      <div className="grid gap-8 lg:grid-cols-12 mb-8">
        {/* Left Column: Fraud Vectors & Temporal Activity */}
        <div className="lg:col-span-7 space-y-6">
          {/* SVG Bar Chart: Fraud Frequency by Hour */}
          <div className="island-shell rounded-3xl p-6">
            <h2 className="text-base font-bold text-[var(--sea-ink)] mb-2 flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-[var(--lagoon-deep)]" />
              <span>Scam Frequency by Time of Day</span>
            </h2>
            <p className="text-xs text-[var(--sea-ink-soft)] mb-6">
              Empirical data suggests fraud attempts peak during late hours when merchants are fatigue-vulnerable.
            </p>

            {/* Custom SVG Bar Graph */}
            <div className="relative pt-4 px-2">
              <div className="flex justify-between items-end h-40 gap-4">
                {hourlyData.map((d) => (
                  <div key={d.hour} className="flex-1 flex flex-col items-center gap-2 group">
                    {/* Tooltip */}
                    <span className="opacity-0 group-hover:opacity-100 transition duration-200 bg-[var(--sea-ink)] text-white text-[0.6rem] px-2 py-0.5 rounded absolute -translate-y-10 font-bold font-mono">
                      Risk: {d.rate}%
                    </span>
                    
                    {/* Bar container */}
                    <div className="w-full bg-[var(--line)] rounded-t-lg h-32 flex items-end overflow-hidden">
                      <div 
                        className={`w-full rounded-t-lg transition-all duration-700 ${
                          d.rate > 60 
                            ? 'bg-red-500' 
                            : d.rate > 30 
                              ? 'bg-amber-500' 
                              : 'bg-[var(--lagoon)]'
                        }`}
                        style={{ height: `${d.rate}%` }}
                      />
                    </div>

                    <span className="text-[0.65rem] font-bold font-mono text-[var(--sea-ink-soft)]">
                      {d.hour}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Threat Vectors Breakdown */}
          <div className="island-shell rounded-3xl p-6">
            <h3 className="text-base font-bold text-[var(--sea-ink)] mb-4">
              Fraud Heuristics Incident Breakdown
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "Blacklist Hits", count: blacklistHits, pct: totalQueries ? Math.round((blacklistHits / totalQueries) * 100) : 0, desc: "Senders pre-registered in community threat list database." },
                { label: "Regex Format Violations", count: regexMismatches, pct: totalQueries ? Math.round((regexMismatches / totalQueries) * 100) : 0, desc: "Transaction confirmation SMS codes failing carrier syntactic formatting structure checks." },
                { label: "Reversal Phishing Scripts", count: reversalTactics, pct: totalQueries ? Math.round((reversalTactics / totalQueries) * 100) : 0, desc: "Accidental-transfer payment reversal social engineering scripts." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold text-[var(--sea-ink)]">
                    <span>{item.label} ({item.count} incidents)</span>
                    <span className="font-mono text-[var(--lagoon-deep)]">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-[var(--line)] h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[var(--lagoon)] h-full transition-all duration-500" 
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="text-[0.68rem] text-[var(--sea-ink-soft)] block leading-relaxed">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: ROI Savings Calculator */}
        <div className="lg:col-span-5">
          <div className="island-shell rounded-3xl p-6 bg-slate-50 border-[var(--line)] h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <PiggyBank className="h-6 w-6 text-[var(--lagoon-deep)]" />
                <h2 className="text-base font-bold text-[var(--sea-ink)] m-0">
                  Value Safeguard Calculator
                </h2>
              </div>
              <p className="text-xs text-[var(--sea-ink-soft)] leading-relaxed mb-6">
                Slide controls to adjust your average business parameters. Discover how much cash TrustArmor retains on your behalf.
              </p>

              {/* Sliders */}
              <div className="space-y-5">
                {/* Daily Tx count */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[var(--sea-ink)]">
                    <label htmlFor="dailyTx">Daily Customers Scanned</label>
                    <span className="font-mono text-[var(--lagoon-deep)]">{dailyTxCount} trades</span>
                  </div>
                  <input
                    type="range"
                    id="dailyTx"
                    min="5"
                    max="100"
                    step="5"
                    value={dailyTxCount}
                    onChange={(e) => setDailyTxCount(parseInt(e.target.value))}
                    className="w-full accent-[var(--lagoon)] bg-[var(--line)] rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                </div>

                {/* Avg Tx Size */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[var(--sea-ink)]">
                    <label htmlFor="avgTx">Avg Transaction Value</label>
                    <span className="font-mono text-[var(--lagoon-deep)]">{currencySymbol} {avgTxSize.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    id="avgTx"
                    min="500"
                    max="20000"
                    step="500"
                    value={avgTxSize}
                    onChange={(e) => setAvgTxSize(parseInt(e.target.value))}
                    className="w-full accent-[var(--lagoon)] bg-[var(--line)] rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                </div>

                {/* Scam Attack Rate */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-[var(--sea-ink)]">
                    <label htmlFor="scamRate">Scam Prevalence Rate</label>
                    <span className="font-mono text-[var(--lagoon-deep)]">{estimatedScamRate}% of trades</span>
                  </div>
                  <input
                    type="range"
                    id="scamRate"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={estimatedScamRate}
                    onChange={(e) => setEstimatedScamRate(parseFloat(e.target.value))}
                    className="w-full accent-[var(--lagoon)] bg-[var(--line)] rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Calculations Output */}
            <div className="mt-8 border-t border-[var(--line)] pt-5 text-xs space-y-4">
              <div className="flex justify-between text-[var(--sea-ink-soft)] font-medium">
                <span>Estimated Monthly Scam Loss:</span>
                <span className="font-mono font-bold text-[var(--sea-ink)]">{currencySymbol} {Math.round(monthlyScamAttemptLoss).toLocaleString()}</span>
              </div>
              
              <div className="bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20 text-center">
                <span className="text-[0.6rem] font-black uppercase tracking-wider text-emerald-700 block">
                  Projected Annual Protection ROI
                </span>
                <div className="text-3xl font-black text-emerald-600 font-mono my-1 flex items-center justify-center gap-1">
                  <span>{currencySymbol}</span>
                  <span>{Math.round(annualSavings).toLocaleString()}</span>
                </div>
                <p className="m-0 text-[0.62rem] text-emerald-800/80 leading-normal font-medium">
                  Estimated scam amounts intercepted and kept safe within your business treasury.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
