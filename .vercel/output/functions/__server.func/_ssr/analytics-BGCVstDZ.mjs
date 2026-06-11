import { r as __toESM } from "../_runtime.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useTrustArmorStore } from "./store-DxtQWIiW.mjs";
import { C as PiggyBank, I as ChartColumn, g as ShieldCheck, h as ShieldX, s as TrendingUp } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BGCVstDZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPage() {
	const store = useTrustArmorStore();
	const [dailyTxCount, setDailyTxCount] = (0, import_react.useState)(15);
	const [avgTxSize, setAvgTxSize] = (0, import_react.useState)(15e3);
	const [estimatedScamRate, setEstimatedScamRate] = (0, import_react.useState)(2);
	const totalQueries = store.transactions.length;
	const safeCount = store.transactions.filter((t) => t.verdict === "safe").length;
	const dangerCount = store.transactions.filter((t) => t.verdict === "danger").length;
	const currencySymbol = store.activeProfile.currency;
	store.transactions.reduce((acc, curr) => acc + curr.amount, 0);
	const fraudIntercepted = store.transactions.filter((t) => t.verdict === "danger").reduce((acc, curr) => acc + curr.amount, 0);
	const blacklistHits = store.transactions.filter((t) => t.findings.some((f) => f.toLowerCase().includes("blacklist"))).length;
	const regexMismatches = store.transactions.filter((t) => t.findings.some((f) => f.toLowerCase().includes("regex") || f.toLowerCase().includes("signature") || f.toLowerCase().includes("syntax"))).length;
	const reversalTactics = store.transactions.filter((t) => t.reversalRisk).length;
	const hourlyData = [
		{
			hour: "00:00",
			rate: 65
		},
		{
			hour: "04:00",
			rate: 20
		},
		{
			hour: "08:00",
			rate: 15
		},
		{
			hour: "12:00",
			rate: 30
		},
		{
			hour: "16:00",
			rate: 45
		},
		{
			hour: "20:00",
			rate: 85
		}
	];
	const monthlyScamAttemptLoss = dailyTxCount * avgTxSize * 30 * (estimatedScamRate / 100);
	const annualSavings = monthlyScamAttemptLoss * 12;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-wrap px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "island-kicker mb-1",
						children: "Business Intelligence"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-7 w-7 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Security Insights & Analytics" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--sea-ink-soft)]",
						children: "Real-time metrics, fraud vectors intercepted, and merchant operational savings summaries."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8",
				children: [
					{
						title: "Total Checks Run",
						value: totalQueries,
						sub: "SMS payloads scanned",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }),
						color: "text-[var(--sea-ink)]"
					},
					{
						title: "Verified Secure",
						value: safeCount,
						sub: `${totalQueries ? Math.round(safeCount / totalQueries * 100) : 0}% success rate`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCircle2$1, { className: "h-5 w-5 text-emerald-500" }),
						color: "text-emerald-600"
					},
					{
						title: "Scams Intercepted",
						value: dangerCount,
						sub: `${totalQueries ? Math.round(dangerCount / totalQueries * 100) : 0}% flag rate`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldX, { className: "h-5 w-5 text-red-500" }),
						color: "text-red-500"
					},
					{
						title: "Merchant Funds Saved",
						value: `${currencySymbol} ${fraudIntercepted.toLocaleString()}`,
						sub: "Total scam value blocked",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "h-5 w-5 text-amber-500" }),
						color: "text-amber-600"
					}
				].map((card, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-2xl p-5 relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute top-4 right-4 h-8 w-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center",
							children: card.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.65rem] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)] block mb-1",
							children: card.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `text-2xl font-extrabold ${card.color} mb-1`,
							children: card.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-[var(--sea-ink-soft)] font-medium",
							children: card.sub
						})
					]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-12 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "island-shell rounded-3xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-base font-bold text-[var(--sea-ink)] mb-2 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4.5 w-4.5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scam Frequency by Time of Day" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--sea-ink-soft)] mb-6",
								children: "Empirical data suggests fraud attempts peak during late hours when merchants are fatigue-vulnerable."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative pt-4 px-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-between items-end h-40 gap-4",
									children: hourlyData.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 flex flex-col items-center gap-2 group",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "opacity-0 group-hover:opacity-100 transition duration-200 bg-[var(--sea-ink)] text-white text-[0.6rem] px-2 py-0.5 rounded absolute -translate-y-10 font-bold font-mono",
												children: [
													"Risk: ",
													d.rate,
													"%"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-full bg-[var(--line)] rounded-t-lg h-32 flex items-end overflow-hidden",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `w-full rounded-t-lg transition-all duration-700 ${d.rate > 60 ? "bg-red-500" : d.rate > 30 ? "bg-amber-500" : "bg-[var(--lagoon)]"}`,
													style: { height: `${d.rate}%` }
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[0.65rem] font-bold font-mono text-[var(--sea-ink-soft)]",
												children: d.hour
											})
										]
									}, d.hour))
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "island-shell rounded-3xl p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-bold text-[var(--sea-ink)] mb-4",
							children: "Fraud Heuristics Incident Breakdown"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								{
									label: "Blacklist Hits",
									count: blacklistHits,
									pct: totalQueries ? Math.round(blacklistHits / totalQueries * 100) : 0,
									desc: "Senders pre-registered in community threat list database."
								},
								{
									label: "Regex Format Violations",
									count: regexMismatches,
									pct: totalQueries ? Math.round(regexMismatches / totalQueries * 100) : 0,
									desc: "Transaction confirmation SMS codes failing carrier syntactic formatting structure checks."
								},
								{
									label: "Reversal Phishing Scripts",
									count: reversalTactics,
									pct: totalQueries ? Math.round(reversalTactics / totalQueries * 100) : 0,
									desc: "Accidental-transfer payment reversal social engineering scripts."
								}
							].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-bold text-[var(--sea-ink)]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											item.label,
											" (",
											item.count,
											" incidents)"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-[var(--lagoon-deep)]",
											children: [item.pct, "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full bg-[var(--line)] h-2 rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-[var(--lagoon)] h-full transition-all duration-500",
											style: { width: `${item.pct}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.68rem] text-[var(--sea-ink-soft)] block leading-relaxed",
										children: item.desc
									})
								]
							}, idx))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "island-shell rounded-3xl p-6 bg-slate-50 border-[var(--line)] h-full flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "h-6 w-6 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-bold text-[var(--sea-ink)] m-0",
									children: "Value Safeguard Calculator"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-[var(--sea-ink-soft)] leading-relaxed mb-6",
								children: "Slide controls to adjust your average business parameters. Discover how much cash TrustArmor retains on your behalf."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-bold text-[var(--sea-ink)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "dailyTx",
												children: "Daily Customers Scanned"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[var(--lagoon-deep)]",
												children: [dailyTxCount, " trades"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											id: "dailyTx",
											min: "5",
											max: "100",
											step: "5",
											value: dailyTxCount,
											onChange: (e) => setDailyTxCount(parseInt(e.target.value)),
											className: "w-full accent-[var(--lagoon)] bg-[var(--line)] rounded-lg appearance-none h-1.5 cursor-pointer"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-bold text-[var(--sea-ink)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "avgTx",
												children: "Avg Transaction Value"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[var(--lagoon-deep)]",
												children: [
													currencySymbol,
													" ",
													avgTxSize.toLocaleString()
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											id: "avgTx",
											min: "500",
											max: "20000",
											step: "500",
											value: avgTxSize,
											onChange: (e) => setAvgTxSize(parseInt(e.target.value)),
											className: "w-full accent-[var(--lagoon)] bg-[var(--line)] rounded-lg appearance-none h-1.5 cursor-pointer"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs font-bold text-[var(--sea-ink)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "scamRate",
												children: "Scam Prevalence Rate"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-mono text-[var(--lagoon-deep)]",
												children: [estimatedScamRate, "% of trades"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											id: "scamRate",
											min: "0.5",
											max: "10",
											step: "0.5",
											value: estimatedScamRate,
											onChange: (e) => setEstimatedScamRate(parseFloat(e.target.value)),
											className: "w-full accent-[var(--lagoon)] bg-[var(--line)] rounded-lg appearance-none h-1.5 cursor-pointer"
										})]
									})
								]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 border-t border-[var(--line)] pt-5 text-xs space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-[var(--sea-ink-soft)] font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Estimated Monthly Scam Loss:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono font-bold text-[var(--sea-ink)]",
									children: [
										currencySymbol,
										" ",
										Math.round(monthlyScamAttemptLoss).toLocaleString()
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-emerald-500/10 rounded-2xl p-4 border border-emerald-500/20 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.6rem] font-black uppercase tracking-wider text-emerald-700 block",
										children: "Projected Annual Protection ROI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-3xl font-black text-emerald-600 font-mono my-1 flex items-center justify-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: currencySymbol }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: Math.round(annualSavings).toLocaleString() })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "m-0 text-[0.62rem] text-emerald-800/80 leading-normal font-medium",
										children: "Estimated scam amounts intercepted and kept safe within your business treasury."
									})
								]
							})]
						})]
					})
				})]
			})
		]
	});
}
function CheckCircle2$1(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: "12",
			cy: "12",
			r: "10"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 12 2 2 4-4" })]
	});
}
//#endregion
export { AnalyticsPage as component };
