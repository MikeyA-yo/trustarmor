import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useTrustArmorStore } from '../lib/store'
import type { SMSTemplate } from '../lib/mockData'
import { evaluateSMS, SMS_TEMPLATES } from '../lib/mockData'
import { 
  Shield, CheckCircle2, AlertOctagon, HelpCircle, 
  Play, Sparkles, User, RefreshCw, Send, Volume2 
} from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardPage,
})

// Web Audio API Synthesizer for alerts (keeps prototype zero-dependency)
function playVerdictSound(isSafe: boolean) {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    
    if (isSafe) {
      // Pleasant double chime (success)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime) // D5
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      
      osc.start(ctx.currentTime)
      
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.1) // A5
      gain2.gain.setValueAtTime(0, ctx.currentTime + 0.1)
      gain2.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.15)
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
      
      osc2.start(ctx.currentTime + 0.1)
      osc.stop(ctx.currentTime + 0.5)
      osc2.stop(ctx.currentTime + 0.5)
    } else {
      // Warning Alarm double buzzer (danger)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(150, ctx.currentTime)
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25)
      
      osc.start(ctx.currentTime)
      
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.type = 'sawtooth'
      osc2.frequency.setValueAtTime(150, ctx.currentTime + 0.15)
      gain2.gain.setValueAtTime(0, ctx.currentTime + 0.15)
      gain2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.2)
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4)
      
      osc2.start(ctx.currentTime + 0.15)
      osc.stop(ctx.currentTime + 0.5)
      osc2.stop(ctx.currentTime + 0.5)
    }
  } catch (e) {
    console.error("Audio Context playback failed", e)
  }
}

function DashboardPage() {
  const store = useTrustArmorStore()
  
  const [activeProfileIdx, setActiveProfileIdx] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [smsText, setSmsText] = useState('')
  const [senderPhone, setSenderPhone] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [scanSteps, setScanSteps] = useState<string[]>([])
  const [scanProgress, setScanProgress] = useState(0)
  const [verdictResult, setVerdictResult] = useState<any>(null)
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null)

  // Update store active profile when dropdown changes
  useEffect(() => {
    store.setActiveProfile(store.profiles[activeProfileIdx])
  }, [activeProfileIdx])

  // Set template details on click
  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName)
    const template = SMS_TEMPLATES.find(t => t.name === templateName)
    if (template) {
      setSmsText(template.text)
      setSenderPhone(template.simulatedSender)
      setVerdictResult(null)
      setScanSteps([])
      setScanProgress(0)
    }
  }

  // Trigger evaluation
  const handleVerify = () => {
    if (!smsText.trim()) return
    
    setIsLoading(true)
    setVerdictResult(null)
    setScanSteps(["Initializing verification pipeline..."])
    setScanProgress(10)
    
    // Simulate pipeline analysis steps
    setTimeout(() => {
      setScanSteps(prev => [...prev, "Extracting payload text structures..."])
      setScanProgress(40)
    }, 250);

    setTimeout(() => {
      setScanSteps(prev => [...prev, "Evaluating heuristics and parsing properties..."])
      setScanProgress(70)
    }, 500);

    setTimeout(() => {
      setScanSteps(prev => [...prev, "Cross-checking local scam registry databases..."])
      setScanProgress(90)
    }, 750);

    setTimeout(() => {
      const evaluation = evaluateSMS(
        smsText,
        senderPhone || "MPESA",
        store.activeProfile,
        store.rules,
        store.blacklist,
        store.transactions
      )
      
      // Add the evaluated txn to the logs
      const savedTx = store.addTransaction(evaluation)
      
      setScanSteps(prev => [...prev, "Analysis complete. Computing final verdict."])
      setScanProgress(100)
      setIsLoading(false)
      setVerdictResult(savedTx)
      
      // Play Synthesizer alert sound
      playVerdictSound(savedTx.verdict === 'safe')
    }, 1000);
  }

  // Quick select dynamic presets filtered by operator
  const filteredTemplates = SMS_TEMPLATES.filter(
    t => t.operator === store.activeProfile.operator
  )

  return (
    <main className="page-wrap px-4 py-8">
      {/* Overview/Header */}
      <section className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <p className="island-kicker mb-1">Operational Workspace</p>
          <h1 className="display-title text-3xl font-extrabold text-[var(--sea-ink)]">
            Shield Verification Console
          </h1>
          <p className="text-sm text-[var(--sea-ink-soft)]">
            Test transaction signatures and run heuristic assessments against mock SMS codes.
          </p>
        </div>

        {/* Profile Selector */}
        <div className="island-shell flex items-center gap-3 rounded-2xl px-4 py-2 bg-slate-50">
          <User className="h-5 w-5 text-[var(--lagoon-deep)]" />
          <div className="flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)]">
              Active Terminal
            </span>
            <select
              value={activeProfileIdx}
              onChange={(e) => {
                setActiveProfileIdx(parseInt(e.target.value))
                setVerdictResult(null)
                setSmsText('')
                setSenderPhone('')
                setSelectedTemplate('')
              }}
              className="bg-transparent border-0 text-sm font-bold text-[var(--sea-ink)] focus:outline-none p-0 cursor-pointer"
            >
              {store.profiles.map((p, idx) => (
                <option key={p.name} value={idx}>
                  {p.businessName} ({p.operator})
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Main Form & Display */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Input Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="island-shell rounded-3xl p-6 relative overflow-hidden">
            <h2 className="text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2">
              <Send className="h-4.5 w-4.5 text-[var(--lagoon-deep)]" />
              <span>Incoming Transaction Details</span>
            </h2>

            {/* Template Selection chips */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-[var(--sea-ink-soft)] block mb-2">
                Click a Preset Scenario Template:
              </span>
              <div className="flex flex-wrap gap-2">
                {filteredTemplates.map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => handleTemplateSelect(t.name)}
                    className={`text-xs px-3 py-1.5 rounded-full font-bold border transition hover:-translate-y-0.5 ${
                      selectedTemplate === t.name
                        ? 'bg-[var(--sea-ink)] border-[var(--sea-ink)] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Simulated Sender Phone */}
              <div>
                <label htmlFor="sender" className="text-xs font-bold text-[var(--sea-ink)] block mb-1.5">
                  Simulated Sender Address (Phone number or shortcode)
                </label>
                <input
                  type="text"
                  id="sender"
                  placeholder="e.g. MPESA, MTNMOMO, +254 712 345 678"
                  value={senderPhone}
                  onChange={(e) => {
                    setSenderPhone(e.target.value)
                    setSelectedTemplate('')
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
                />
              </div>

              {/* SMS Text Area */}
              <div>
                <label htmlFor="smsText" className="text-xs font-bold text-[var(--sea-ink)] block mb-1.5">
                  Raw Transaction SMS String
                </label>
                <textarea
                  id="smsText"
                  rows={4}
                  placeholder="Paste transaction payload text here..."
                  value={smsText}
                  onChange={(e) => {
                    setSmsText(e.target.value)
                    setSelectedTemplate('')
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-mono text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)] placeholder:font-sans placeholder:text-[var(--sea-ink-soft)]/60"
                />
              </div>

              {/* Verify Action Button */}
              <button
                type="button"
                onClick={handleVerify}
                disabled={isLoading || !smsText.trim()}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--lagoon)] py-3.5 text-sm font-bold text-white shadow hover:bg-[var(--lagoon-deep)] transition hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:pointer-events-none"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Analyzing Security Vectors...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    <span>Verify Transaction Payload</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Scanners Loading Output */}
          {isLoading && (
            <div className="island-shell rounded-2xl p-5 border-l-4 border-l-[var(--lagoon)] rise-in">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--lagoon-deep)]">
                  Live Engine Logs
                </span>
                <span className="text-xs font-mono font-bold text-[var(--sea-ink-soft)]">
                  {scanProgress}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-[var(--line)] h-1.5 rounded-full overflow-hidden mb-3">
                <div 
                  className="bg-[var(--lagoon)] h-full transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <ul className="m-0 space-y-1 pl-0 list-none text-xs font-mono text-[var(--sea-ink-soft)]">
                {scanSteps.map((step, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-[var(--lagoon-deep)] font-extrabold">▶</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Verdict Results Output Column */}
        <div className="lg:col-span-5">
          {!verdictResult && !isLoading && (
            <div className="island-shell rounded-3xl p-8 border-2 border-dashed border-[var(--line)] bg-transparent/20 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <HelpCircle className="h-12 w-12 text-[var(--sea-ink-soft)]/40 mb-3 animate-pulse" />
              <h3 className="text-sm font-bold text-[var(--sea-ink)] mb-1">
                Awaiting Payment Scan
              </h3>
              <p className="max-w-[240px] text-xs text-[var(--sea-ink-soft)] leading-relaxed">
                Choose a preset SMS template or enter raw text, then press verify to inspect risks.
              </p>
            </div>
          )}

          {verdictResult && !isLoading && (
            <div className={`island-shell rounded-3xl p-6 rise-in transition-all border shadow ${
              verdictResult.verdict === 'safe' 
                ? 'bg-emerald-50/40 border-emerald-300'
                : 'bg-rose-50/40 border-rose-300 animate-[shake_0.4s_ease-in-out]'
            }`}>
              {/* Verdict Header Badge */}
              <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  {verdictResult.verdict === 'safe' ? (
                    <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                  ) : (
                    <AlertOctagon className="h-8 w-8 text-red-500 animate-[bounce_1s_infinite]" />
                  )}
                  <div>
                    <span className={`text-[0.69rem] font-black uppercase tracking-wider block ${
                      verdictResult.verdict === 'safe' ? 'text-emerald-600' : 'text-red-500'
                    }`}>
                      Heuristic Output
                    </span>
                    <h3 className={`text-lg font-black leading-tight ${
                      verdictResult.verdict === 'safe' ? 'text-emerald-700' : 'text-red-600'
                    }`}>
                      {verdictResult.verdict === 'safe' ? 'VERIFIED SECURE' : 'SCAM DANGER FLAG'}
                    </h3>
                  </div>
                </div>

                <div className={`text-center rounded-xl p-2 min-w-[70px] ${
                  verdictResult.verdict === 'safe' ? 'bg-emerald-500/20 text-emerald-700' : 'bg-red-500/20 text-red-600'
                }`}>
                  <div className="text-lg font-extrabold leading-none">{verdictResult.riskScore}</div>
                  <div className="text-[0.55rem] font-bold uppercase tracking-wider">Risk Score</div>
                </div>
              </div>

              {/* Parsed Attributes */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 mb-4">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--sea-ink-soft)] block mb-1">
                  Extracted Payload Properties
                </span>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block">Ref Transaction ID</span>
                    <span className="font-mono font-bold text-[var(--sea-ink)]">{verdictResult.txId}</span>
                  </div>
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block">Settled Amount</span>
                    <span className="font-bold text-[var(--sea-ink)] text-sm">
                      {verdictResult.currency} {verdictResult.amount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block">Sender Phone</span>
                    <span className="font-mono font-bold text-[var(--sea-ink)]">{verdictResult.senderPhone}</span>
                  </div>
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block">Sender Alias</span>
                    <span className="font-bold text-[var(--sea-ink)] truncate block max-w-[130px]" title={verdictResult.senderName}>
                      {verdictResult.senderName}
                    </span>
                  </div>
                </div>
              </div>

              {/* Heuristics Logs findings */}
              <div className="mb-4">
                <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--sea-ink-soft)] block mb-2">
                  Safety Rules Checked
                </span>
                <ul className="m-0 pl-0 list-none space-y-1.5">
                  {verdictResult.findings.map((finding: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-[0.7rem] leading-relaxed">
                      {verdictResult.verdict === 'safe' ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <AlertOctagon className="h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={verdictResult.verdict === 'safe' ? 'text-[var(--sea-ink-soft)]' : 'text-red-700/90 font-medium'}>
                        {finding}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Recommendation */}
              <div className={`rounded-xl p-3 border text-center text-xs font-bold ${
                verdictResult.verdict === 'safe'
                  ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-700'
                  : 'bg-red-500/10 border-red-500/30 text-red-600 animate-pulse'
              }`}>
                {verdictResult.verdict === 'safe' ? (
                  <span>✅ RECOMMENDED ACTION: Safe to release goods / complete sale.</span>
                ) : (
                  <span>⚠️ DO NOT RELEASE GOODS. Hold trade. Flag sender as scammer.</span>
                )}
              </div>
            </div>
          )}

          {/* Quick Stats Summary */}
          <div className="island-shell rounded-2xl p-5 mt-6">
            <h4 className="text-xs font-black uppercase tracking-widest text-[var(--sea-ink-soft)] mb-3">
              Quick Registry Analytics
            </h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <span className="text-[0.65rem] font-bold uppercase text-[var(--sea-ink-soft)] block">Verified Safe</span>
                <span className="text-base font-extrabold text-emerald-600">
                  {store.transactions.filter(t => t.verdict === 'safe').length} logs
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <span className="text-[0.65rem] font-bold uppercase text-[var(--sea-ink-soft)] block">Scams Intercepted</span>
                <span className="text-base font-extrabold text-red-500">
                  {store.transactions.filter(t => t.verdict === 'danger').length} logs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Recent Activity Feed */}
      <section className="island-shell rounded-3xl p-6 mt-8">
        <h3 className="text-base font-bold text-[var(--sea-ink)] mb-4">
          Console Verifications History
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--sea-ink-soft)]">
                <th className="pb-3 font-semibold">Timestamp</th>
                <th className="pb-3 font-semibold">Operator</th>
                <th className="pb-3 font-semibold">Ref Transaction ID</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold">Sender Phone</th>
                <th className="pb-3 font-semibold text-right">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)]">
              {store.transactions.slice(0, 3).map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 font-mono font-medium text-[var(--sea-ink-soft)]">
                    {new Date(tx.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="py-3 font-semibold text-[var(--sea-ink)]">{tx.operator}</td>
                  <td className="py-3 font-mono text-[var(--sea-ink-soft)] font-bold">{tx.txId}</td>
                  <td className="py-3 font-bold text-[var(--sea-ink)]">
                    {tx.currency} {tx.amount.toLocaleString()}
                  </td>
                  <td className="py-3 font-mono text-[var(--sea-ink-soft)]">{tx.senderPhone}</td>
                  <td className="py-3 text-right">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${
                      tx.verdict === 'safe'
                        ? 'bg-emerald-500/15 text-emerald-700'
                        : 'bg-red-500/15 text-red-600'
                    }`}>
                      {tx.verdict === 'safe' ? 'Safe' : 'Danger'}
                    </span>
                  </td>
                </tr>
              ))}
              {store.transactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-[var(--sea-ink-soft)] font-medium">
                    No transactions verified yet in this session.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
