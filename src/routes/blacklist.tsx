import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTrustArmorStore } from '../lib/store'
import { 
  Database, Plus, ShieldAlert, Search, Trash2, 
  UserPlus, FileWarning, Eye, AlertOctagon, HelpCircle 
} from 'lucide-react'

export const Route = createFileRoute('/blacklist')({
  component: BlacklistPage,
})

function BlacklistPage() {
  const store = useTrustArmorStore()
  
  // Local state for reporting form
  const [phone, setPhone] = useState('')
  const [alias, setAlias] = useState('')
  const [operator, setOperator] = useState<'M-Pesa' | 'MTN' | 'Orange'>('M-Pesa')
  const [fraudType, setFraudType] = useState<'Fake SMS' | 'Instant Reversal' | 'Spoofed Identity'>('Fake SMS')
  const [notes, setNotes] = useState('')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'registry' | 'patterns'>('registry')

  // Report Form Handler
  const handleReport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return
    
    // Add new entry
    store.addBlacklistEntry({
      phone: phone.trim(),
      alias: alias.trim() || 'Anonymous Suspect',
      operator,
      fraudType,
      timesReported: 1,
      lastIncidentDate: new Date().toISOString().slice(0, 10),
      notes: notes.trim() || 'Reported via merchant interface.'
    })
    
    // Reset Form
    setPhone('')
    setAlias('')
    setNotes('')
    alert("New fraudulent contact added successfully to the local scam database!")
  }

  // Filtered Registry list
  const filteredBlacklist = store.blacklist.filter(entry => 
    entry.phone.includes(searchTerm) ||
    entry.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.notes.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="page-wrap px-4 py-8">
      {/* Header section */}
      <section className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <p className="island-kicker mb-1">Threat Intelligence</p>
          <h1 className="display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2">
            <Database className="h-7 w-7 text-[var(--lagoon-deep)]" />
            <span>Blacklist Registry</span>
          </h1>
          <p className="text-sm text-[var(--sea-ink-soft)]">
            Manage your local list of fraudulent sender profiles and analyze telecom spam templates.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 border border-[var(--line)] rounded-xl p-1">
          <button
            type="button"
            onClick={() => setActiveTab('registry')}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition ${
              activeTab === 'registry'
                ? 'bg-[var(--sea-ink)] text-white'
                : 'text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]'
            }`}
          >
            Threat Registry
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('patterns')}
            className={`text-xs font-bold px-4 py-2 rounded-lg transition ${
              activeTab === 'patterns'
                ? 'bg-[var(--sea-ink)] text-white'
                : 'text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]'
            }`}
          >
            Common Scam Patterns
          </button>
        </div>
      </section>

      {activeTab === 'registry' ? (
        <div className="grid gap-8 lg:grid-cols-12">
          {/* List registry Table Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="island-shell rounded-3xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <h2 className="text-base font-bold text-[var(--sea-ink)] flex items-center gap-2 m-0">
                  <ShieldAlert className="h-4.5 w-4.5 text-[var(--lagoon-deep)]" />
                  <span>Flagged Sender Database</span>
                </h2>
                
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--sea-ink-soft)]" />
                  <input
                    type="text"
                    placeholder="Search blacklist registry..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-[var(--line)] text-[var(--sea-ink-soft)]">
                      <th className="pb-3 font-semibold">Address / Phone</th>
                      <th className="pb-3 font-semibold">Identified Alias</th>
                      <th className="pb-3 font-semibold">Carrier</th>
                      <th className="pb-3 font-semibold">Fraud Type</th>
                      <th className="pb-3 font-semibold">Reports</th>
                      <th className="pb-3 font-semibold">Notes</th>
                      <th className="pb-3 font-semibold text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--line)]">
                    {filteredBlacklist.map((entry) => (
                      <tr key={entry.phone} className="hover:bg-slate-50 transition">
                        <td className="py-3 font-mono font-bold text-[var(--sea-ink)]">{entry.phone}</td>
                        <td className="py-3 font-medium text-[var(--sea-ink-soft)]">{entry.alias}</td>
                        <td className="py-3 font-semibold text-[var(--sea-ink)]">{entry.operator}</td>
                        <td className="py-3">
                          <span className={`inline-block rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${
                            entry.fraudType === 'Fake SMS' 
                              ? 'bg-rose-500/10 text-rose-600'
                              : 'bg-amber-500/10 text-amber-700'
                          }`}>
                            {entry.fraudType}
                          </span>
                        </td>
                        <td className="py-3 font-mono text-[var(--sea-ink)]">{entry.timesReported}x</td>
                        <td className="py-3 text-[var(--sea-ink-soft)] max-w-[150px] truncate" title={entry.notes}>
                          {entry.notes}
                        </td>
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              if(confirm(`Remove ${entry.phone} from scam list?`)) {
                                store.removeBlacklistEntry(entry.phone)
                              }
                            }}
                            className="p-1 rounded text-red-400 hover:bg-red-500/10 hover:text-red-600 transition"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredBlacklist.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[var(--sea-ink-soft)] font-medium">
                          No blacklisted phone numbers match search filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Reporting Form Column */}
          <div className="lg:col-span-4">
            <div className="island-shell rounded-3xl p-6">
              <h3 className="text-sm font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2">
                <UserPlus className="h-4.5 w-4.5 text-[var(--lagoon-deep)]" />
                <span>Report Suspicious Contact</span>
              </h3>

              <form onSubmit={handleReport} className="space-y-4 text-xs">
                <div>
                  <label htmlFor="reportPhone" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                    Fraud Phone Number / Sender ID
                  </label>
                  <input
                    type="text"
                    id="reportPhone"
                    required
                    placeholder="e.g. +254 700 111 222"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
                  />
                </div>

                <div>
                  <label htmlFor="reportAlias" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                    Scammer Alias (Optional)
                  </label>
                  <input
                    type="text"
                    id="reportAlias"
                    placeholder="e.g. Accidental Cash Refund scammer"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="reportOperator" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                      Carrier Operator
                    </label>
                    <select
                      id="reportOperator"
                      value={operator}
                      onChange={(e) => setOperator(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="M-Pesa">M-Pesa</option>
                      <option value="MTN">MTN MoMo</option>
                      <option value="Orange">Orange Money</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="reportFraud" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                      Fraud Category
                    </label>
                    <select
                      id="reportFraud"
                      value={fraudType}
                      onChange={(e) => setFraudType(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="Fake SMS">Fake SMS</option>
                      <option value="Instant Reversal">Instant Reversal</option>
                      <option value="Spoofed Identity">Spoofed Identity</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="reportNotes" className="text-xs font-bold text-[var(--sea-ink)] block mb-1">
                    Describe Incident / Threat Notes
                  </label>
                  <textarea
                    id="reportNotes"
                    rows={3}
                    placeholder="Provide details about message text, location, or tactic used..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[var(--lagoon)] hover:bg-[var(--lagoon-deep)] py-3 text-xs font-bold text-white shadow transition"
                >
                  <Plus className="h-4 w-4" />
                  <span>Report scam account</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Patterns Library View */
        <section className="space-y-6 rise-in">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "M-Pesa SMS Spoofing Pattern",
                operator: "Safaricom (Kenya)",
                indicator: "Sent from Personal SIM (+254...)",
                vuln: "Official M-Pesa notifications are sent via alphanumeric headers ('MPESA'), never standard 10-digit mobile numbers. Scammers use bulk SMS senders with lookalike headers (e.g., 'M-PESA' with hyphens or trailing spaces) to bypass cell provider security.",
                regex: "^[A-Z0-9]{10}\\s+Confirmed\\."
              },
              {
                title: "MTN Accidental Reversal Tactic",
                operator: "MTN (Ghana/Nigeria)",
                indicator: "Social Engineering SMS",
                vuln: "Scammers trigger a manual transfer, get goods, and quickly call MTN customer care claiming an 'accidental transfer' to trigger a lock. Alternatively, they send fake reversal SMS notifications that look like carrier texts asking the merchant to refund the amount manually.",
                regex: "accidental | refund | reverse | reversement"
              },
              {
                title: "Orange Money Reference Code Spoofing",
                operator: "Orange (Cameroon/Senegal)",
                indicator: "Alphanumeric String Errors",
                vuln: "Orange Money transaction codes typically start with 'OM' followed by pure numeric digits (e.g. OM2819202). Fake generators create references like 'OM-ALPHA-1829', 'OM_TXN_9982', or completely custom characters which fail standard compiler evaluation regexes.",
                regex: "^OM\\d+$"
              }
            ].map((pattern, idx) => (
              <div key={idx} className="island-shell rounded-3xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileWarning className="h-5 w-5 text-amber-500" />
                    <div>
                      <h3 className="text-sm font-bold text-[var(--sea-ink)] leading-tight m-0">{pattern.title}</h3>
                      <span className="text-[0.65rem] font-bold text-[var(--sea-ink-soft)]">{pattern.operator}</span>
                    </div>
                  </div>
                  
                  <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 rounded-xl px-2.5 py-1 text-[0.65rem] font-bold inline-block mb-3">
                    Flag Indicator: {pattern.indicator}
                  </div>
                  
                  <p className="text-[0.7rem] text-[var(--sea-ink-soft)] leading-relaxed m-0 mb-4">
                    {pattern.vuln}
                  </p>
                </div>

                <div className="bg-slate-100 border border-[var(--line)] rounded-xl p-3 text-[0.65rem] font-mono">
                  <span className="text-[var(--sea-ink-soft)] block font-bold mb-1">Evaluation Regex Target:</span>
                  <code className="text-[var(--lagoon-deep)] font-extrabold">{pattern.regex}</code>
                </div>
              </div>
            ))}
          </div>

          {/* Quick interactive scanner advice card */}
          <div className="island-shell rounded-3xl p-6 bg-slate-50 border-[var(--line)]">
            <h3 className="text-base font-extrabold text-[var(--sea-ink)] mb-2 flex items-center gap-2">
              <AlertOctagon className="h-5 w-5 text-[var(--lagoon-deep)] animate-pulse" />
              <span>How To Check SMS Manually In 3 Steps</span>
            </h3>
            <ol className="m-0 pl-4 text-xs text-[var(--sea-ink-soft)] space-y-2">
              <li>
                <strong>Always check sender header:</strong> Standard mobile money networks use official alphabetic headers (MPESA, MTNMOMO, OrangeMoney) to deliver billing alerts. Reject anything sent from personal phone numbers (+254 7..., +233 2...).
              </li>
              <li>
                <strong>Inspect transaction code structure:</strong> Double-check the confirmation reference ID against past entries. Scammers frequently mistype signature patterns (like lowercase letters or extra characters).
              </li>
              <li>
                <strong>Verify cash balance:</strong> Never release goods until you have dialed your operator's official USSD code or loaded your official agent application to verify ledger settlement.
              </li>
            </ol>
          </div>
        </section>
      )}
    </main>
  )
}
