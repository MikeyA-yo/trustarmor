import { r as __toESM } from "../_runtime.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useTrustArmorStore } from "./store-DxtQWIiW.mjs";
import { A as Funnel, D as Info, M as Download, O as History, b as Search, c as Trash2, n as X, o as TriangleAlert, w as OctagonAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transactions-DSJsyfME.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TransactionsPage() {
	const store = useTrustArmorStore();
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [filterVerdict, setFilterVerdict] = (0, import_react.useState)("all");
	const [filterOperator, setFilterOperator] = (0, import_react.useState)("all");
	const [selectedTxId, setSelectedTxId] = (0, import_react.useState)(null);
	const filteredTx = store.transactions.filter((tx) => {
		const matchesSearch = tx.txId.toLowerCase().includes(searchTerm.toLowerCase()) || tx.senderPhone.includes(searchTerm) || tx.senderName.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesVerdict = filterVerdict === "all" ? true : tx.verdict === filterVerdict;
		const matchesOperator = filterOperator === "all" ? true : tx.operator === filterOperator;
		return matchesSearch && matchesVerdict && matchesOperator;
	});
	const selectedTx = store.transactions.find((tx) => tx.id === selectedTxId);
	const handleExportCSV = () => {
		if (store.transactions.length === 0) return;
		const headers = [
			"ID",
			"Operator",
			"TxID",
			"Amount",
			"Currency",
			"SenderPhone",
			"SenderName",
			"Verdict",
			"RiskScore",
			"Timestamp"
		];
		const rows = store.transactions.map((t) => [
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
		]);
		const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `trustarmor_logs_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-wrap px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col sm:flex-row items-start justify-between gap-4 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "island-kicker mb-1",
					children: "Database Archives"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "h-7 w-7 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verification Logs" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--sea-ink-soft)]",
					children: "Explore and review all transactions evaluated by the TrustArmor heuristics engine."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: handleExportCSV,
					disabled: store.transactions.length === 0,
					className: "inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs font-bold text-[var(--sea-ink)] hover:bg-slate-200 transition disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Export CSV" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						if (confirm("Are you sure you want to wipe all transaction logs?")) {
							store.clearTransactions();
							setSelectedTxId(null);
						}
					},
					disabled: store.transactions.length === 0,
					className: "inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-500/20 transition disabled:opacity-40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Clear Logs" })]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: selectedTx ? "lg:col-span-8" : "lg:col-span-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col md:flex-row gap-3 mb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-[var(--sea-ink-soft)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Search TxID, phone, sender...",
									value: searchTerm,
									onChange: (e) => setSearchTerm(e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4 text-[var(--sea-ink-soft)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: filterVerdict,
									onChange: (e) => setFilterVerdict(e.target.value),
									className: "bg-transparent border-0 text-xs font-bold text-[var(--sea-ink)] focus:outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "All Verdicts"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "safe",
											children: "Safe Only"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "danger",
											children: "Danger Only"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4 text-[var(--sea-ink-soft)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: filterOperator,
									onChange: (e) => setFilterOperator(e.target.value),
									className: "bg-transparent border-0 text-xs font-bold text-[var(--sea-ink)] focus:outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "All Operators"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "M-Pesa",
											children: "M-Pesa"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "MTN MoMo",
											children: "MTN MoMo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Orange Money",
											children: "Orange Money"
										})
									]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left border-collapse text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-[var(--line)] text-[var(--sea-ink-soft)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Date & Time"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Operator"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "TxID Reference"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Sender Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Amount"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Risk Score"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold text-right",
										children: "Action"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
								className: "divide-y divide-[var(--line)]",
								children: [filteredTx.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									onClick: () => setSelectedTxId(tx.id),
									className: `hover:bg-slate-50 transition cursor-pointer ${selectedTxId === tx.id ? "bg-slate-100 border-l-2 border-l-[var(--lagoon)]" : ""}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-mono text-[var(--sea-ink-soft)]",
											children: new Date(tx.timestamp).toLocaleString([], {
												month: "short",
												day: "numeric",
												hour: "2-digit",
												minute: "2-digit"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-semibold text-[var(--sea-ink)]",
											children: tx.operator
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-mono text-[var(--sea-ink-soft)] font-bold",
											children: tx.txId
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-medium text-[var(--sea-ink)]",
											children: tx.senderName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 font-bold text-[var(--sea-ink)]",
											children: [
												tx.currency,
												" ",
												tx.amount.toLocaleString()
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `inline-flex items-center gap-1 font-bold ${tx.verdict === "safe" ? "text-emerald-600" : "text-red-500"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${tx.verdict === "safe" ? "bg-emerald-500" : "bg-red-500"}` }),
													tx.riskScore,
													"%"
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-right",
											onClick: (e) => e.stopPropagation(),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													if (confirm(`Delete transaction log ${tx.txId}?`)) {
														store.deleteTransaction(tx.id);
														if (selectedTxId === tx.id) setSelectedTxId(null);
													}
												},
												className: "p-1 rounded text-red-400 hover:bg-red-500/10 hover:text-red-600 transition",
												title: "Delete entry",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
											})
										})
									]
								}, tx.id)), filteredTx.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 7,
									className: "py-10 text-center text-[var(--sea-ink-soft)] font-semibold",
									children: "No transactions match the current search or filters."
								}) })]
							})]
						})
					})]
				})
			}), selectedTx && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-4 rise-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `island-shell rounded-3xl p-5 border relative ${selectedTx.verdict === "safe" ? "border-emerald-300 bg-emerald-50/20" : "border-rose-300 bg-rose-50/20"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSelectedTxId(null),
							className: "absolute top-4 right-4 p-1 rounded-full text-[var(--sea-ink-soft)] hover:bg-[var(--line)] hover:text-[var(--sea-ink)] transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "h-4 w-4 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-extrabold text-[var(--sea-ink)]",
								children: "Analysis Dossier"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-2xl p-4 text-center border mb-5 ${selectedTx.verdict === "safe" ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-700" : "bg-red-500/10 border-red-500/30 text-red-600"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.6rem] font-black uppercase tracking-wider block",
									children: "Heuristics Rating"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-black",
									children: selectedTx.verdict === "safe" ? "SAFE" : "FRAUD FLAG"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs mt-1 font-semibold",
									children: [
										"Risk assessment score: ",
										selectedTx.riskScore,
										"/100"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink-soft)] block font-semibold",
									children: "Timestamp"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink)] font-medium",
									children: new Date(selectedTx.timestamp).toLocaleString()
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[var(--sea-ink-soft)] block font-semibold",
											children: "Reference code"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-[var(--sea-ink)]",
											children: selectedTx.txId
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[var(--sea-ink-soft)] block font-semibold",
											children: "Settled amount"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-bold text-[var(--sea-ink)]",
											children: [
												selectedTx.currency,
												" ",
												selectedTx.amount.toLocaleString()
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[var(--sea-ink-soft)] block font-semibold",
											children: "Sender contact"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono font-bold text-[var(--sea-ink)]",
											children: selectedTx.senderPhone
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[var(--sea-ink-soft)] block font-semibold",
											children: "Verified identity"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-[var(--sea-ink)] truncate block",
											children: selectedTx.senderName
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink-soft)] block font-semibold mb-1.5",
									children: "Rules Engine Checks:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "m-0 pl-0 list-none space-y-1",
									children: selectedTx.findings.map((finding, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-1.5 text-[0.68rem] leading-relaxed text-[var(--sea-ink-soft)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: selectedTx.verdict === "safe" ? "text-emerald-500" : "text-red-500",
											children: "•"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: finding })]
									}, idx))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink-soft)] block font-semibold mb-1",
									children: "Raw SMS Payload:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-[0.68rem] text-[var(--sea-ink)] leading-relaxed select-all",
									children: selectedTx.rawText
								})] }),
								selectedTx.verdict === "danger" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-red-200 bg-red-50 p-3 flex gap-2 text-red-700",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-5 w-5 text-red-500 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold m-0 leading-tight",
										children: "Fraud Tactic Spotted"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "m-0 mt-0.5 text-[0.65rem] leading-relaxed",
										children: selectedTx.reversalRisk ? "This sender is attempting accidental-reversal social engineering. Do not reverse payment or return cash." : "This text pattern fails standard carrier validation. It is a simulated bulk fake SMS."
									})] })]
								}),
								selectedTx.verdict === "danger" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										store.addBlacklistEntry({
											phone: selectedTx.senderPhone,
											alias: selectedTx.senderName === "Unknown Sender" ? `Spammer ${selectedTx.txId}` : selectedTx.senderName,
											operator: selectedTx.operator === "M-Pesa" ? "M-Pesa" : selectedTx.operator === "MTN MoMo" ? "MTN" : "Orange",
											fraudType: selectedTx.reversalRisk ? "Instant Reversal" : "Fake SMS",
											timesReported: 1,
											lastIncidentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
											notes: `Automatically reported via Transaction Logs scanner.`
										});
										alert(`Successfully reported sender ${selectedTx.senderPhone} to the Blacklist Registry!`);
									},
									className: "w-full flex items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 py-2.5 text-xs font-bold text-red-600 hover:bg-red-500/20 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Report Number to Blacklist" })]
								})
							]
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { TransactionsPage as component };
