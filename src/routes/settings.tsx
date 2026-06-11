import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTrustArmorStore } from '../lib/store'
import { 
  Settings, ShieldCheck, ToggleLeft, ToggleRight, 
  Terminal, Key, RefreshCw, Volume2, Globe, Sparkles 
} from 'lucide-react'

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
})

// Audio synthesis test notifier
function testAudioNotify(isSafe: boolean) {
  if (typeof window === 'undefined') return
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (!AudioContextClass) return
    const ctx = new AudioContextClass()
    
    if (isSafe) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(587.33, ctx.currentTime)
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.4)
    } else {
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
      osc.stop(ctx.currentTime + 0.3)
    }
  } catch(e) {}
}

function SettingsPage() {
  const store = useTrustArmorStore()
  
  // Rule triggers
  const { blacklistLookup, regexValidation, velocityAlert, highValueThreshold, highValueLimit, velocityLimitPerHour } = store.rules
  
  // API Keys state
  const [apiKey, setApiKey] = useState('ta_live_8f3d82a17cb6e95c1a409b8281')
  const [webhookUrl, setWebhookUrl] = useState('https://api.my-retail-pos.com/v1/payment-callback')
  const [webhookStatus, setWebhookStatus] = useState<string | null>(null)
  const [isGeneratingKey, setIsGeneratingKey] = useState(false)

  // Profile local states
  const [profName, setProfName] = useState(store.activeProfile.name)
  const [bizName, setBizName] = useState(store.activeProfile.businessName)
  const [phoneNum, setPhoneNum] = useState(store.activeProfile.phone)

  // Generate API keys
  const handleRegenKey = () => {
    setIsGeneratingKey(true)
    setTimeout(() => {
      const randomHex = Array.from({length: 26}, () => Math.floor(Math.random()*16).toString(16)).join('')
      setApiKey(`ta_live_${randomHex}`)
      setIsGeneratingKey(false)
    }, 500)
  }

  // Trigger test webhook
  const handleTestWebhook = () => {
    setWebhookStatus("sending")
    setTimeout(() => {
      setWebhookStatus("success")
      setTimeout(() => setWebhookStatus(null), 3000)
    }, 800)
  }

  // Save profile helper
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    store.setActiveProfile({
      ...store.activeProfile,
      name: profName,
      businessName: bizName,
      phone: phoneNum
    })
    alert("Merchant business profile updated successfully!")
  }

  return (
    <main className="page-wrap px-4 py-8">
      {/* Header */}
      <section className="mb-8">
        <p className="island-kicker mb-1">Configuration Panel</p>
        <h1 className="display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2">
          <Settings className="h-7 w-7 text-[var(--lagoon-deep)] animate-spin" style={{ animationDuration: '8s' }} />
          <span>System Settings</span>
        </h1>
        <p className="text-sm text-[var(--sea-ink-soft)]">
          Adjust heuristics rules tolerances, profile details, and external API POS webhooks.
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Rules & Sounds */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Heuristics toggles */}
          <div className="island-shell rounded-3xl p-6">
            <h2 className="text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[var(--lagoon-deep)]" />
              <span>Heuristic Risk Rules</span>
            </h2>

            <div className="space-y-4 text-xs font-semibold text-[var(--sea-ink)]">
              {/* Blacklist toggle */}
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div>
                  <span className="text-sm font-bold block mb-0.5">Blacklist Phone Check</span>
                  <span className="text-[var(--sea-ink-soft)] font-medium text-[0.7rem]">
                    Cross-references sender phone address against global threat directory.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => store.updateRules({ blacklistLookup: !blacklistLookup })}
                  className="focus:outline-none"
                >
                  {blacklistLookup ? (
                    <ToggleRight className="h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" />
                  )}
                </button>
              </div>

              {/* Regex Validation toggle */}
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div>
                  <span className="text-sm font-bold block mb-0.5">Cryptographic Regex Parsing</span>
                  <span className="text-[var(--sea-ink-soft)] font-medium text-[0.7rem]">
                    Evaluates character sequences and check-digits for operator verification.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => store.updateRules({ regexValidation: !regexValidation })}
                  className="focus:outline-none"
                >
                  {regexValidation ? (
                    <ToggleRight className="h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" />
                  )}
                </button>
              </div>

              {/* Velocity Check toggle */}
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div>
                  <span className="text-sm font-bold block mb-0.5">Velocity Safeguard</span>
                  <span className="text-[var(--sea-ink-soft)] font-medium text-[0.7rem]">
                    Detects transaction flooding from single senders to counter automated spam.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => store.updateRules({ velocityAlert: !velocityAlert })}
                  className="focus:outline-none"
                >
                  {velocityAlert ? (
                    <ToggleRight className="h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" />
                  )}
                </button>
              </div>

              {/* Velocity input */}
              {velocityAlert && (
                <div className="pl-6 flex items-center justify-between bg-slate-100 rounded-xl p-2 border border-slate-200">
                  <span className="text-[0.7rem] font-medium text-[var(--sea-ink-soft)]">
                    Trigger alert if queries exceed:
                  </span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={velocityLimitPerHour}
                      onChange={(e) => store.updateRules({ velocityLimitPerHour: Math.max(1, parseInt(e.target.value) || 3) })}
                      className="w-12 rounded border border-[var(--line)] bg-white px-2 py-1 text-center font-bold font-mono focus:outline-none"
                    />
                    <span className="text-[0.65rem] text-[var(--sea-ink-soft)]">queries/hour</span>
                  </div>
                </div>
              )}

              {/* High Value Alert toggle */}
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                <div>
                  <span className="text-sm font-bold block mb-0.5">High-Value Inspection Threshold</span>
                  <span className="text-[var(--sea-ink-soft)] font-medium text-[0.7rem]">
                    Flag transactions with high amounts for merchant visual verification review.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => store.updateRules({ highValueThreshold: !highValueThreshold })}
                  className="focus:outline-none"
                >
                  {highValueThreshold ? (
                    <ToggleRight className="h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" />
                  )}
                </button>
              </div>

              {/* High value input */}
              {highValueThreshold && (
                <div className="pl-6 flex items-center justify-between bg-slate-100 rounded-xl p-2 border border-slate-200">
                  <span className="text-[0.7rem] font-medium text-[var(--sea-ink-soft)]">
                    Highlight payments exceeding:
                  </span>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span>{store.activeProfile.currency}</span>
                    <input
                      type="number"
                      value={highValueLimit}
                      onChange={(e) => store.updateRules({ highValueLimit: Math.max(10, parseInt(e.target.value) || 1000) })}
                      className="w-20 rounded border border-[var(--line)] bg-white px-2 py-1 text-center font-bold font-mono focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sound Tester */}
          <div className="island-shell rounded-3xl p-6">
            <h3 className="text-base font-bold text-[var(--sea-ink)] mb-3 flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-[var(--lagoon-deep)]" />
              <span>Audio Alarm Test Center</span>
            </h3>
            <p className="text-xs text-[var(--sea-ink-soft)] mb-4">
              Test the synthesized client alarm beeps played when transaction evaluations finish scanning.
            </p>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                type="button"
                onClick={() => testAudioNotify(true)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-500/10 py-3 font-bold text-emerald-700 hover:bg-emerald-500/20 transition"
              >
                <span>Play Safe Verdict Chime</span>
              </button>
              
              <button
                type="button"
                onClick={() => testAudioNotify(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-rose-500/10 py-3 font-bold text-rose-700 hover:bg-rose-500/20 transition"
              >
                <span>Play Threat Alarm Siren</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Profile & Developers */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Active Profile form */}
          <div className="island-shell rounded-3xl p-6">
            <h3 className="text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-[var(--lagoon-deep)]" />
              <span>Merchant Profile</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label htmlFor="profName" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                  Store Owner Name
                </label>
                <input
                  type="text"
                  id="profName"
                  required
                  value={profName}
                  onChange={(e) => setProfName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="bizName" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                  Registered Shop Name
                </label>
                <input
                  type="text"
                  id="bizName"
                  required
                  value={bizName}
                  onChange={(e) => setBizName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="phoneNum" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                  Active SIM Terminal Contact
                </label>
                <input
                  type="text"
                  id="phoneNum"
                  required
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[var(--sea-ink)] py-3 font-bold text-white shadow hover:bg-slate-800 transition"
              >
                <span>Save Profile Changes</span>
              </button>
            </form>
          </div>

          {/* Dev API Portal */}
          <div className="island-shell rounded-3xl p-6">
            <h3 className="text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2">
              <Terminal className="h-5 w-5 text-[var(--lagoon-deep)]" />
              <span>Developer API Hooks</span>
            </h3>
            
            <div className="space-y-4 text-xs font-semibold">
              {/* API Token display */}
              <div>
                <span className="text-[var(--sea-ink-soft)] block font-bold mb-1">
                  Secret Authentication Token:
                </span>
                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 font-mono text-[0.65rem] text-[var(--sea-ink)] flex items-center justify-between select-all leading-none">
                    <span>{apiKey}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRegenKey}
                    disabled={isGeneratingKey}
                    className="p-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-xl text-[var(--sea-ink)] transition"
                    title="Regenerate token"
                  >
                    <RefreshCw className={`h-4.5 w-4.5 ${isGeneratingKey ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Webhook setup */}
              <div>
                <label htmlFor="webhook" className="text-[var(--sea-ink-soft)] block font-bold mb-1">
                  Payment Reversal Webhook URL:
                </label>
                <input
                  type="text"
                  id="webhook"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-[0.65rem] text-[var(--sea-ink)] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Trigger Webhook simulation */}
              <button
                type="button"
                onClick={handleTestWebhook}
                disabled={webhookStatus === 'sending'}
                className={`w-full flex items-center justify-center gap-1.5 rounded-xl border py-2.5 transition ${
                  webhookStatus === 'success'
                    ? 'border-emerald-300 bg-emerald-500/10 text-emerald-700'
                    : 'border-slate-200 bg-slate-100 text-[var(--sea-ink)] hover:bg-slate-200'
                }`}
              >
                {webhookStatus === 'sending' ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Firing callback payload...</span>
                  </>
                ) : webhookStatus === 'success' ? (
                  <>
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span>Test Webhook Dispatched (HTTP 200 OK)</span>
                  </>
                ) : (
                  <>
                    <Key className="h-4 w-4" />
                    <span>Fire Simulated Webhook Event</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
