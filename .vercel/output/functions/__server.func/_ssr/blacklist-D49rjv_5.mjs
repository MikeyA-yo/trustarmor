import { r as __toESM } from "../_runtime.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useTrustArmorStore } from "./store-DxtQWIiW.mjs";
import { N as Database, S as Plus, _ as ShieldAlert, a as UserPlus, b as Search, c as Trash2, j as FileExclamationPoint, w as OctagonAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blacklist-D49rjv_5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BlacklistPage() {
	const store = useTrustArmorStore();
	const [phone, setPhone] = (0, import_react.useState)("");
	const [alias, setAlias] = (0, import_react.useState)("");
	const [operator, setOperator] = (0, import_react.useState)("M-Pesa");
	const [fraudType, setFraudType] = (0, import_react.useState)("Fake SMS");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("registry");
	const handleReport = (e) => {
		e.preventDefault();
		if (!phone.trim()) return;
		store.addBlacklistEntry({
			phone: phone.trim(),
			alias: alias.trim() || "Anonymous Suspect",
			operator,
			fraudType,
			timesReported: 1,
			lastIncidentDate: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
			notes: notes.trim() || "Reported via merchant interface."
		});
		setPhone("");
		setAlias("");
		setNotes("");
		alert("New fraudulent contact added successfully to the local scam database!");
	};
	const filteredBlacklist = store.blacklist.filter((entry) => entry.phone.includes(searchTerm) || entry.alias.toLowerCase().includes(searchTerm.toLowerCase()) || entry.notes.toLowerCase().includes(searchTerm.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-wrap px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col md:flex-row items-start justify-between gap-4 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "island-kicker mb-1",
					children: "Threat Intelligence"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-7 w-7 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Blacklist Registry" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--sea-ink-soft)]",
					children: "Manage your local list of fraudulent sender profiles and analyze telecom spam templates."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex bg-slate-100 border border-[var(--line)] rounded-xl p-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActiveTab("registry"),
					className: `text-xs font-bold px-4 py-2 rounded-lg transition ${activeTab === "registry" ? "bg-[var(--sea-ink)] text-white" : "text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]"}`,
					children: "Threat Registry"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setActiveTab("patterns"),
					className: `text-xs font-bold px-4 py-2 rounded-lg transition ${activeTab === "patterns" ? "bg-[var(--sea-ink)] text-white" : "text-[var(--sea-ink-soft)] hover:text-[var(--sea-ink)]"}`,
					children: "Common Scam Patterns"
				})]
			})]
		}), activeTab === "registry" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-8 space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-base font-bold text-[var(--sea-ink)] flex items-center gap-2 m-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4.5 w-4.5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Flagged Sender Database" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full sm:w-64",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--sea-ink-soft)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search blacklist registry...",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left border-collapse text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-[var(--line)] text-[var(--sea-ink-soft)]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Address / Phone"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Identified Alias"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Carrier"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Fraud Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Reports"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold",
										children: "Notes"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-3 font-semibold text-right",
										children: "Delete"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
								className: "divide-y divide-[var(--line)]",
								children: [filteredBlacklist.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-slate-50 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-mono font-bold text-[var(--sea-ink)]",
											children: entry.phone
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-medium text-[var(--sea-ink-soft)]",
											children: entry.alias
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-semibold text-[var(--sea-ink)]",
											children: entry.operator
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-block rounded-full px-2 py-0.5 text-[0.6rem] font-bold ${entry.fraudType === "Fake SMS" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-700"}`,
												children: entry.fraudType
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 font-mono text-[var(--sea-ink)]",
											children: [entry.timesReported, "x"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-[var(--sea-ink-soft)] max-w-[150px] truncate",
											title: entry.notes,
											children: entry.notes
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => {
													if (confirm(`Remove ${entry.phone} from scam list?`)) store.removeBlacklistEntry(entry.phone);
												},
												className: "p-1 rounded text-red-400 hover:bg-red-500/10 hover:text-red-600 transition",
												title: "Delete",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
											})
										})
									]
								}, entry.phone)), filteredBlacklist.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 7,
									className: "py-8 text-center text-[var(--sea-ink-soft)] font-medium",
									children: "No blacklisted phone numbers match search filters."
								}) })]
							})]
						})
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4.5 w-4.5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Report Suspicious Contact" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleReport,
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "reportPhone",
								className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
								children: "Fraud Phone Number / Sender ID"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								id: "reportPhone",
								required: true,
								placeholder: "e.g. +254 700 111 222",
								value: phone,
								onChange: (e) => setPhone(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "reportAlias",
								className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
								children: "Scammer Alias (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								id: "reportAlias",
								placeholder: "e.g. Accidental Cash Refund scammer",
								value: alias,
								onChange: (e) => setAlias(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "reportOperator",
									className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
									children: "Carrier Operator"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "reportOperator",
									value: operator,
									onChange: (e) => setOperator(e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "M-Pesa",
											children: "M-Pesa"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "MTN",
											children: "MTN MoMo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Orange",
											children: "Orange Money"
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "reportFraud",
									className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
									children: "Fraud Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "reportFraud",
									value: fraudType,
									onChange: (e) => setFraudType(e.target.value),
									className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Fake SMS",
											children: "Fake SMS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Instant Reversal",
											children: "Instant Reversal"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Spoofed Identity",
											children: "Spoofed Identity"
										})
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "reportNotes",
								className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
								children: "Describe Incident / Threat Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "reportNotes",
								rows: 3,
								placeholder: "Provide details about message text, location, or tactic used...",
								value: notes,
								onChange: (e) => setNotes(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								className: "w-full flex items-center justify-center gap-1.5 rounded-xl bg-[var(--lagoon)] hover:bg-[var(--lagoon-deep)] py-3 text-xs font-bold text-white shadow transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Report scam account" })]
							})
						]
					})]
				})
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "space-y-6 rise-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-3",
				children: [
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
				].map((pattern, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileExclamationPoint, { className: "h-5 w-5 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-bold text-[var(--sea-ink)] leading-tight m-0",
								children: pattern.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.65rem] font-bold text-[var(--sea-ink-soft)]",
								children: pattern.operator
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-amber-500/10 border border-amber-500/20 text-amber-800 rounded-xl px-2.5 py-1 text-[0.65rem] font-bold inline-block mb-3",
							children: ["Flag Indicator: ", pattern.indicator]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.7rem] text-[var(--sea-ink-soft)] leading-relaxed m-0 mb-4",
							children: pattern.vuln
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-slate-100 border border-[var(--line)] rounded-xl p-3 text-[0.65rem] font-mono",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[var(--sea-ink-soft)] block font-bold mb-1",
							children: "Evaluation Regex Target:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "text-[var(--lagoon-deep)] font-extrabold",
							children: pattern.regex
						})]
					})]
				}, idx))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "island-shell rounded-3xl p-6 bg-slate-50 border-[var(--line)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-base font-extrabold text-[var(--sea-ink)] mb-2 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { className: "h-5 w-5 text-[var(--lagoon-deep)] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "How To Check SMS Manually In 3 Steps" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "m-0 pl-4 text-xs text-[var(--sea-ink-soft)] space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Always check sender header:" }), " Standard mobile money networks use official alphabetic headers (MPESA, MTNMOMO, OrangeMoney) to deliver billing alerts. Reject anything sent from personal phone numbers (+254 7..., +233 2...)."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Inspect transaction code structure:" }), " Double-check the confirmation reference ID against past entries. Scammers frequently mistype signature patterns (like lowercase letters or extra characters)."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Verify cash balance:" }), " Never release goods until you have dialed your operator's official USSD code or loaded your official agent application to verify ledger settlement."] })
					]
				})]
			})]
		})]
	});
}
//#endregion
export { BlacklistPage as component };
