import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useTrustArmorStore } from '../lib/store'
import { 
  History, Search, Filter, AlertOctagon, CheckCircle2, 
  Trash2, X, Info, Download, AlertTriangle 
} from 'lucide-react'

export const Route = createFileRoute('/transactions')({
  component: TransactionsPage,
})

function TransactionsPage() {
  const store = useTrustArmorStore()
  
  // Search, filter, active transaction details state
  const [searchTerm, setSearchTerm] = useState('')
  const [filterVerdict, setFilterVerdict] = useState<'all' | 'safe' | 'danger'>('all')
  const [filterOperator, setFilterOperator] = useState<string>('all')
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null)

  // Filter transactions list
  const filteredTx = store.transactions.filter(tx => {
    const matchesSearch = 
      tx.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.senderPhone.includes(searchTerm) ||
      tx.senderName.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesVerdict = 
      filterVerdict === 'all' ? true : tx.verdict === filterVerdict;
      
    const matchesOperator = 
      filterOperator === 'all' ? true : tx.operator === filterOperator;
      
    return matchesSearch && matchesVerdict && matchesOperator;
  })

  const selectedTx = store.transactions.find(tx => tx.id === selectedTxId)

  // CSV Exporter Simulation
  const handleExportCSV = () => {
    if (store.transactions.length === 0) return
    const headers = ["ID", "Operator", "TxID", "Amount", "Currency", "SenderPhone", "SenderName", "Verdict", "RiskScore", "Timestamp"]
    const rows = store.transactions.map(t => [
      t.id,
      t.operator,
      t.txId,
      t.amount,
      t.currency,
      t.senderPhone,
      t.senderName,
      t.verdict,
      t.riskScore,
      t.timestamp
    ])
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `trustarmor_logs_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="page-wrap px-4 py-8">
      {/* Page Header */}
      <section className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
        <div>
          <p className="island-kicker mb-1">Database Archives</p>
          <h1 className="display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2">
            <History className="h-7 w-7 text-[var(--lagoon-deep)]" />
            <span>Verification Logs</span>
          </h1>
          <p className="text-sm text-[var(--sea-ink-soft)]">
            Explore and review all transactions evaluated by the TrustArmor heuristics engine.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={store.transactions.length === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-[var(--sea-ink)] hover:bg-slate-200 transition disabled:opacity-40"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if(confirm("Are you sure you want to wipe all transaction logs?")) {
                store.clearTransactions()
                setSelectedTxId(null)
              }
            }}
            disabled={store.transactions.length === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-500/20 transition disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Logs</span>
          </button>
        </div>
      </section>

      {/* Interactive Logs Workspace */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Logs Table Area */}
        <div className={selectedTx ? "lg:col-span-8" : "lg:col-span-12"}>
          <div className="island-shell rounded-3xl p-6">
            
            {/* Search and Filters row */}
            <div className="flex flex-col md:flex-row gap-3 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[var(--sea-ink-soft)]" />
                <input
                  type="text"
                  placeholder="Search TxID, phone, sender..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
                />
              </div>

              {/* Filter Verdict */}
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5">
                <Filter className="h-4 w-4 text-[var(--sea-ink-soft)]" />
                <select
                  value={filterVerdict}
                  onChange={(e) => setFilterVerdict(e.target.value as any)}
                  className="bg-transparent border-0 text-xs font-bold text-[var(--sea-ink)] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Verdicts</option>
                  <option value="safe">Safe Only</option>
                  <option value="danger">Danger Only</option>
                </select>
              </div>

              {/* Filter Operator */}
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5">
                <Filter className="h-4 w-4 text-[var(--sea-ink-soft)]" />
                <select
                  value={filterOperator}
                  onChange={(e) => setFilterOperator(e.target.value)}
                  className="bg-transparent border-0 text-xs font-bold text-[var(--sea-ink)] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Operators</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="MTN MoMo">MTN MoMo</option>
                  <option value="Orange Money">Orange Money</option>
                </select>
              </div>
            </div>

            {/* Logs Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[var(--line)] text-[var(--sea-ink-soft)]">
                    <th className="pb-3 font-semibold">Date & Time</th>
                    <th className="pb-3 font-semibold">Operator</th>
                    <th className="pb-3 font-semibold">TxID Reference</th>
                    <th className="pb-3 font-semibold">Sender Name</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Risk Score</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--line)]">
                  {filteredTx.map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTxId(tx.id)}
                      className={`hover:bg-slate-50 transition cursor-pointer ${
                        selectedTxId === tx.id ? 'bg-slate-100 border-l-2 border-l-[var(--lagoon)]' : ''
                      }`}
                    >
                      <td className="py-3 font-mono text-[var(--sea-ink-soft)]">
                        {new Date(tx.timestamp).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3 font-semibold text-[var(--sea-ink)]">{tx.operator}</td>
                      <td className="py-3 font-mono text-[var(--sea-ink-soft)] font-bold">{tx.txId}</td>
                      <td className="py-3 font-medium text-[var(--sea-ink)]">{tx.senderName}</td>
                      <td className="py-3 font-bold text-[var(--sea-ink)]">
                        {tx.currency} {tx.amount.toLocaleString()}
                      </td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 font-bold ${
                          tx.verdict === 'safe' ? 'text-emerald-600' : 'text-red-500'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            tx.verdict === 'safe' ? 'bg-emerald-500' : 'bg-red-500'
                          }`} />
                          {tx.riskScore}%
                        </span>
                      </td>
                      <td className="py-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            if(confirm(`Delete transaction log ${tx.txId}?`)) {
                              store.deleteTransaction(tx.id)
                              if (selectedTxId === tx.id) setSelectedTxId(null)
                            }
                          }}
                          className="p-1 rounded text-red-400 hover:bg-red-500/10 hover:text-red-600 transition"
                          title="Delete entry"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTx.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-[var(--sea-ink-soft)] font-semibold">
                        No transactions match the current search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

        {/* Selected Transaction Details Panel */}
        {selectedTx && (
          <div className="lg:col-span-4 rise-in">
            <div className={`island-shell rounded-3xl p-5 border relative ${
              selectedTx.verdict === 'safe' 
                ? 'border-emerald-300 bg-emerald-50/20'
                : 'border-rose-300 bg-rose-50/20'
            }`}>
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedTxId(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-[var(--sea-ink-soft)] hover:bg-[var(--line)] hover:text-[var(--sea-ink)] transition"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Info className="h-4 w-4 text-[var(--lagoon-deep)]" />
                <h3 className="text-sm font-extrabold text-[var(--sea-ink)]">
                  Analysis Dossier
                </h3>
              </div>

              {/* Verdict Banner */}
              <div className={`rounded-2xl p-4 text-center border mb-5 ${
                selectedTx.verdict === 'safe'
                  ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-700'
                  : 'bg-red-500/10 border-red-500/30 text-red-600'
              }`}>
                <span className="text-[0.6rem] font-black uppercase tracking-wider block">Heuristics Rating</span>
                <span className="text-xl font-black">{selectedTx.verdict === 'safe' ? 'SAFE' : 'FRAUD FLAG'}</span>
                <div className="text-xs mt-1 font-semibold">Risk assessment score: {selectedTx.riskScore}/100</div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Meta details */}
                <div>
                  <span className="text-[var(--sea-ink-soft)] block font-semibold">Timestamp</span>
                  <span className="text-[var(--sea-ink)] font-medium">
                    {new Date(selectedTx.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block font-semibold">Reference code</span>
                    <span className="font-mono font-bold text-[var(--sea-ink)]">{selectedTx.txId}</span>
                  </div>
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block font-semibold">Settled amount</span>
                    <span className="font-bold text-[var(--sea-ink)]">
                      {selectedTx.currency} {selectedTx.amount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block font-semibold">Sender contact</span>
                    <span className="font-mono font-bold text-[var(--sea-ink)]">{selectedTx.senderPhone}</span>
                  </div>
                  <div>
                    <span className="text-[var(--sea-ink-soft)] block font-semibold">Verified identity</span>
                    <span className="font-bold text-[var(--sea-ink)] truncate block">{selectedTx.senderName}</span>
                  </div>
                </div>

                {/* Heuristic checks */}
                <div>
                  <span className="text-[var(--sea-ink-soft)] block font-semibold mb-1.5">Rules Engine Checks:</span>
                  <ul className="m-0 pl-0 list-none space-y-1">
                    {selectedTx.findings.map((finding, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[0.68rem] leading-relaxed text-[var(--sea-ink-soft)]">
                        <span className={selectedTx.verdict === 'safe' ? 'text-emerald-500' : 'text-red-500'}>•</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Raw Message SMS Payload */}
                <div>
                  <span className="text-[var(--sea-ink-soft)] block font-semibold mb-1">Raw SMS Payload:</span>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-[0.68rem] text-[var(--sea-ink)] leading-relaxed select-all">
                    {selectedTx.rawText}
                  </div>
                </div>

                {/* Scam warning banner */}
                {selectedTx.verdict === 'danger' && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 flex gap-2 text-red-700">
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold m-0 leading-tight">Fraud Tactic Spotted</h4>
                      <p className="m-0 mt-0.5 text-[0.65rem] leading-relaxed">
                        {selectedTx.reversalRisk 
                          ? "This sender is attempting accidental-reversal social engineering. Do not reverse payment or return cash."
                          : "This text pattern fails standard carrier validation. It is a simulated bulk fake SMS."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Blacklist Register Prompt */}
                {selectedTx.verdict === 'danger' && (
                  <button
                    type="button"
                    onClick={() => {
                      store.addBlacklistEntry({
                        phone: selectedTx.senderPhone,
                        alias: selectedTx.senderName === 'Unknown Sender' ? `Spammer ${selectedTx.txId}` : selectedTx.senderName,
                        operator: selectedTx.operator === 'M-Pesa' ? 'M-Pesa' : selectedTx.operator === 'MTN MoMo' ? 'MTN' : 'Orange',
                        fraudType: selectedTx.reversalRisk ? 'Instant Reversal' : 'Fake SMS',
                        timesReported: 1,
                        lastIncidentDate: new Date().toISOString().slice(0,10),
                        notes: `Automatically reported via Transaction Logs scanner.`
                      })
                      alert(`Successfully reported sender ${selectedTx.senderPhone} to the Blacklist Registry!`)
                    }}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 py-2.5 text-xs font-bold text-red-600 hover:bg-red-500/20 transition"
                  >
                    <AlertOctagon className="h-4 w-4" />
                    <span>Report Number to Blacklist</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
