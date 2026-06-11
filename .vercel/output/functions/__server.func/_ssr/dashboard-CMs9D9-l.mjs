import { r as __toESM } from "../_runtime.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as evaluateSMS, r as useTrustArmorStore, t as SMS_TEMPLATES } from "./store-DxtQWIiW.mjs";
import { F as CircleCheck, P as CircleQuestionMark, i as User, m as Shield, w as OctagonAlert, x as RefreshCw, y as Send } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CMs9D9-l.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function playVerdictSound(isSafe) {
	if (typeof window === "undefined") return;
	try {
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		if (!AudioContextClass) return;
		const ctx = new AudioContextClass();
		if (isSafe) {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.type = "sine";
			osc.frequency.setValueAtTime(587.33, ctx.currentTime);
			gain.gain.setValueAtTime(0, ctx.currentTime);
			gain.gain.linearRampToValueAtTime(.2, ctx.currentTime + .05);
			gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .3);
			osc.start(ctx.currentTime);
			const osc2 = ctx.createOscillator();
			const gain2 = ctx.createGain();
			osc2.connect(gain2);
			gain2.connect(ctx.destination);
			osc2.type = "sine";
			osc2.frequency.setValueAtTime(880, ctx.currentTime + .1);
			gain2.gain.setValueAtTime(0, ctx.currentTime + .1);
			gain2.gain.linearRampToValueAtTime(.2, ctx.currentTime + .15);
			gain2.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .4);
			osc2.start(ctx.currentTime + .1);
			osc.stop(ctx.currentTime + .5);
			osc2.stop(ctx.currentTime + .5);
		} else {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(150, ctx.currentTime);
			gain.gain.setValueAtTime(0, ctx.currentTime);
			gain.gain.linearRampToValueAtTime(.3, ctx.currentTime + .05);
			gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .25);
			osc.start(ctx.currentTime);
			const osc2 = ctx.createOscillator();
			const gain2 = ctx.createGain();
			osc2.connect(gain2);
			gain2.connect(ctx.destination);
			osc2.type = "sawtooth";
			osc2.frequency.setValueAtTime(150, ctx.currentTime + .15);
			gain2.gain.setValueAtTime(0, ctx.currentTime + .15);
			gain2.gain.linearRampToValueAtTime(.3, ctx.currentTime + .2);
			gain2.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .4);
			osc2.start(ctx.currentTime + .15);
			osc.stop(ctx.currentTime + .5);
			osc2.stop(ctx.currentTime + .5);
		}
	} catch (e) {
		console.error("Audio Context playback failed", e);
	}
}
function DashboardPage() {
	const store = useTrustArmorStore();
	const [activeProfileIdx, setActiveProfileIdx] = (0, import_react.useState)(0);
	const [selectedTemplate, setSelectedTemplate] = (0, import_react.useState)("");
	const [smsText, setSmsText] = (0, import_react.useState)("");
	const [senderPhone, setSenderPhone] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [scanSteps, setScanSteps] = (0, import_react.useState)([]);
	const [scanProgress, setScanProgress] = (0, import_react.useState)(0);
	const [verdictResult, setVerdictResult] = (0, import_react.useState)(null);
	const [selectedLogId, setSelectedLogId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		store.setActiveProfile(store.profiles[activeProfileIdx]);
	}, [activeProfileIdx]);
	const handleTemplateSelect = (templateName) => {
		setSelectedTemplate(templateName);
		const template = SMS_TEMPLATES.find((t) => t.name === templateName);
		if (template) {
			setSmsText(template.text);
			setSenderPhone(template.simulatedSender);
			setVerdictResult(null);
			setScanSteps([]);
			setScanProgress(0);
		}
	};
	const handleVerify = () => {
		if (!smsText.trim()) return;
		setIsLoading(true);
		setVerdictResult(null);
		setScanSteps(["Initializing verification pipeline..."]);
		setScanProgress(10);
		setTimeout(() => {
			setScanSteps((prev) => [...prev, "Extracting payload text structures..."]);
			setScanProgress(40);
		}, 250);
		setTimeout(() => {
			setScanSteps((prev) => [...prev, "Evaluating heuristics and parsing properties..."]);
			setScanProgress(70);
		}, 500);
		setTimeout(() => {
			setScanSteps((prev) => [...prev, "Cross-checking local scam registry databases..."]);
			setScanProgress(90);
		}, 750);
		setTimeout(() => {
			const evaluation = evaluateSMS(smsText, senderPhone || "MPESA", store.activeProfile, store.rules, store.blacklist, store.transactions);
			const savedTx = store.addTransaction(evaluation);
			setScanSteps((prev) => [...prev, "Analysis complete. Computing final verdict."]);
			setScanProgress(100);
			setIsLoading(false);
			setVerdictResult(savedTx);
			playVerdictSound(savedTx.verdict === "safe");
		}, 1e3);
	};
	const filteredTemplates = SMS_TEMPLATES.filter((t) => t.operator === store.activeProfile.operator);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-wrap px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col md:flex-row items-start justify-between gap-4 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "island-kicker mb-1",
						children: "Operational Workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "display-title text-3xl font-extrabold text-[var(--sea-ink)]",
						children: "Shield Verification Console"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-[var(--sea-ink-soft)]",
						children: "Test transaction signatures and run heuristic assessments against mock SMS codes."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell flex items-center gap-3 rounded-2xl px-4 py-2 bg-slate-50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[0.65rem] font-bold uppercase tracking-wider text-[var(--sea-ink-soft)]",
							children: "Active Terminal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: activeProfileIdx,
							onChange: (e) => {
								setActiveProfileIdx(parseInt(e.target.value));
								setVerdictResult(null);
								setSmsText("");
								setSenderPhone("");
								setSelectedTemplate("");
							},
							className: "bg-transparent border-0 text-sm font-bold text-[var(--sea-ink)] focus:outline-none p-0 cursor-pointer",
							children: store.profiles.map((p, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: idx,
								children: [
									p.businessName,
									" (",
									p.operator,
									")"
								]
							}, p.name))
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-7 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "island-shell rounded-3xl p-6 relative overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4.5 w-4.5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Incoming Transaction Details" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-[var(--sea-ink-soft)] block mb-2",
									children: "Click a Preset Scenario Template:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: filteredTemplates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleTemplateSelect(t.name),
										className: `text-xs px-3 py-1.5 rounded-full font-bold border transition hover:-translate-y-0.5 ${selectedTemplate === t.name ? "bg-[var(--sea-ink)] border-[var(--sea-ink)] text-white shadow-sm" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`,
										children: t.label
									}, t.name))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "sender",
										className: "text-xs font-bold text-[var(--sea-ink)] block mb-1.5",
										children: "Simulated Sender Address (Phone number or shortcode)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										id: "sender",
										placeholder: "e.g. MPESA, MTNMOMO, +254 712 345 678",
										value: senderPhone,
										onChange: (e) => {
											setSenderPhone(e.target.value);
											setSelectedTemplate("");
										},
										className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)]"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "smsText",
										className: "text-xs font-bold text-[var(--sea-ink)] block mb-1.5",
										children: "Raw Transaction SMS String"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										id: "smsText",
										rows: 4,
										placeholder: "Paste transaction payload text here...",
										value: smsText,
										onChange: (e) => {
											setSmsText(e.target.value);
											setSelectedTemplate("");
										},
										className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-mono text-[var(--sea-ink)] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[var(--lagoon)] placeholder:font-sans placeholder:text-[var(--sea-ink-soft)]/60"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: handleVerify,
										disabled: isLoading || !smsText.trim(),
										className: "w-full flex items-center justify-center gap-2 rounded-xl bg-[var(--lagoon)] py-3.5 text-sm font-bold text-white shadow hover:bg-[var(--lagoon-deep)] transition hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:pointer-events-none",
										children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Analyzing Security Vectors..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verify Transaction Payload" })] })
									})
								]
							})
						]
					}), isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "island-shell rounded-2xl p-5 border-l-4 border-l-[var(--lagoon)] rise-in",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-extrabold uppercase tracking-widest text-[var(--lagoon-deep)]",
									children: "Live Engine Logs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-mono font-bold text-[var(--sea-ink-soft)]",
									children: [scanProgress, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-[var(--line)] h-1.5 rounded-full overflow-hidden mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-[var(--lagoon)] h-full transition-all duration-300",
									style: { width: `${scanProgress}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "m-0 space-y-1 pl-0 list-none text-xs font-mono text-[var(--sea-ink-soft)]",
								children: scanSteps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[var(--lagoon-deep)] font-extrabold",
										children: "▶"
									}), step]
								}, idx))
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-5",
					children: [
						!verdictResult && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "island-shell rounded-3xl p-8 border-2 border-dashed border-[var(--line)] bg-transparent/20 flex flex-col items-center justify-center text-center h-full min-h-[300px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-12 w-12 text-[var(--sea-ink-soft)]/40 mb-3 animate-pulse" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-bold text-[var(--sea-ink)] mb-1",
									children: "Awaiting Payment Scan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "max-w-[240px] text-xs text-[var(--sea-ink-soft)] leading-relaxed",
									children: "Choose a preset SMS template or enter raw text, then press verify to inspect risks."
								})
							]
						}),
						verdictResult && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `island-shell rounded-3xl p-6 rise-in transition-all border shadow ${verdictResult.verdict === "safe" ? "bg-emerald-50/40 border-emerald-300" : "bg-rose-50/40 border-rose-300 animate-[shake_0.4s_ease-in-out]"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 border-b border-[var(--line)] pb-4 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [verdictResult.verdict === "safe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-emerald-500" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { className: "h-8 w-8 text-red-500 animate-[bounce_1s_infinite]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[0.69rem] font-black uppercase tracking-wider block ${verdictResult.verdict === "safe" ? "text-emerald-600" : "text-red-500"}`,
											children: "Heuristic Output"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: `text-lg font-black leading-tight ${verdictResult.verdict === "safe" ? "text-emerald-700" : "text-red-600"}`,
											children: verdictResult.verdict === "safe" ? "VERIFIED SECURE" : "SCAM DANGER FLAG"
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `text-center rounded-xl p-2 min-w-[70px] ${verdictResult.verdict === "safe" ? "bg-emerald-500/20 text-emerald-700" : "bg-red-500/20 text-red-600"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-lg font-extrabold leading-none",
											children: verdictResult.riskScore
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[0.55rem] font-bold uppercase tracking-wider",
											children: "Risk Score"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] font-bold uppercase tracking-widest text-[var(--sea-ink-soft)] block mb-1",
										children: "Extracted Payload Properties"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-y-2 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[var(--sea-ink-soft)] block",
												children: "Ref Transaction ID"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-bold text-[var(--sea-ink)]",
												children: verdictResult.txId
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[var(--sea-ink-soft)] block",
												children: "Settled Amount"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold text-[var(--sea-ink)] text-sm",
												children: [
													verdictResult.currency,
													" ",
													verdictResult.amount.toLocaleString()
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[var(--sea-ink-soft)] block",
												children: "Sender Phone"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono font-bold text-[var(--sea-ink)]",
												children: verdictResult.senderPhone
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[var(--sea-ink-soft)] block",
												children: "Sender Alias"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold text-[var(--sea-ink)] truncate block max-w-[130px]",
												title: verdictResult.senderName,
												children: verdictResult.senderName
											})] })
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] font-bold uppercase tracking-widest text-[var(--sea-ink-soft)] block mb-2",
										children: "Safety Rules Checked"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "m-0 pl-0 list-none space-y-1.5",
										children: verdictResult.findings.map((finding, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2 text-[0.7rem] leading-relaxed",
											children: [verdictResult.verdict === "safe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { className: "h-3.5 w-3.5 text-red-500 mt-0.5 flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: verdictResult.verdict === "safe" ? "text-[var(--sea-ink-soft)]" : "text-red-700/90 font-medium",
												children: finding
											})]
										}, idx))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `rounded-xl p-3 border text-center text-xs font-bold ${verdictResult.verdict === "safe" ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-700" : "bg-red-500/10 border-red-500/30 text-red-600 animate-pulse"}`,
									children: verdictResult.verdict === "safe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✅ RECOMMENDED ACTION: Safe to release goods / complete sale." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚠️ DO NOT RELEASE GOODS. Hold trade. Flag sender as scammer." })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "island-shell rounded-2xl p-5 mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-black uppercase tracking-widest text-[var(--sea-ink-soft)] mb-3",
								children: "Quick Registry Analytics"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-50 border border-slate-200 rounded-xl p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] font-bold uppercase text-[var(--sea-ink-soft)] block",
										children: "Verified Safe"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-base font-extrabold text-emerald-600",
										children: [store.transactions.filter((t) => t.verdict === "safe").length, " logs"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-50 border border-slate-200 rounded-xl p-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] font-bold uppercase text-[var(--sea-ink-soft)] block",
										children: "Scams Intercepted"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-base font-extrabold text-red-500",
										children: [store.transactions.filter((t) => t.verdict === "danger").length, " logs"]
									})]
								})]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "island-shell rounded-3xl p-6 mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-base font-bold text-[var(--sea-ink)] mb-4",
					children: "Console Verifications History"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-[var(--line)] text-[var(--sea-ink-soft)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold",
									children: "Timestamp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold",
									children: "Operator"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold",
									children: "Ref Transaction ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold",
									children: "Amount"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold",
									children: "Sender Phone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 font-semibold text-right",
									children: "Verdict"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-[var(--line)]",
							children: [store.transactions.slice(0, 3).map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-slate-50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 font-mono font-medium text-[var(--sea-ink-soft)]",
										children: new Date(tx.timestamp).toLocaleTimeString([], {
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
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-3 font-bold text-[var(--sea-ink)]",
										children: [
											tx.currency,
											" ",
											tx.amount.toLocaleString()
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 font-mono text-[var(--sea-ink-soft)]",
										children: tx.senderPhone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-3 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold ${tx.verdict === "safe" ? "bg-emerald-500/15 text-emerald-700" : "bg-red-500/15 text-red-600"}`,
											children: tx.verdict === "safe" ? "Safe" : "Danger"
										})
									})
								]
							}, tx.id)), store.transactions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "py-4 text-center text-[var(--sea-ink-soft)] font-medium",
								children: "No transactions verified yet in this session."
							}) })]
						})]
					})
				})]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
