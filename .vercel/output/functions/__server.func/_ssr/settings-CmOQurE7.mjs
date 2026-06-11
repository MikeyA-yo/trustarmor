import { r as __toESM } from "../_runtime.mjs";
import { d as require_react, f as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useTrustArmorStore } from "./store-DxtQWIiW.mjs";
import { E as Key, d as Terminal, g as ShieldCheck, k as Globe, l as ToggleRight, r as Volume2, u as ToggleLeft, v as Settings, x as RefreshCw } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CmOQurE7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function testAudioNotify(isSafe) {
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
			osc.stop(ctx.currentTime + .4);
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
			osc.stop(ctx.currentTime + .3);
		}
	} catch (e) {}
}
function SettingsPage() {
	const store = useTrustArmorStore();
	const { blacklistLookup, regexValidation, velocityAlert, highValueThreshold, highValueLimit, velocityLimitPerHour } = store.rules;
	const [apiKey, setApiKey] = (0, import_react.useState)("ta_live_8f3d82a17cb6e95c1a409b8281");
	const [webhookUrl, setWebhookUrl] = (0, import_react.useState)("https://api.my-retail-pos.com/v1/payment-callback");
	const [webhookStatus, setWebhookStatus] = (0, import_react.useState)(null);
	const [isGeneratingKey, setIsGeneratingKey] = (0, import_react.useState)(false);
	const [profName, setProfName] = (0, import_react.useState)(store.activeProfile.name);
	const [bizName, setBizName] = (0, import_react.useState)(store.activeProfile.businessName);
	const [phoneNum, setPhoneNum] = (0, import_react.useState)(store.activeProfile.phone);
	const handleRegenKey = () => {
		setIsGeneratingKey(true);
		setTimeout(() => {
			setApiKey(`ta_live_${Array.from({ length: 26 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`);
			setIsGeneratingKey(false);
		}, 500);
	};
	const handleTestWebhook = () => {
		setWebhookStatus("sending");
		setTimeout(() => {
			setWebhookStatus("success");
			setTimeout(() => setWebhookStatus(null), 3e3);
		}, 800);
	};
	const handleSaveProfile = (e) => {
		e.preventDefault();
		store.setActiveProfile({
			...store.activeProfile,
			name: profName,
			businessName: bizName,
			phone: phoneNum
		});
		alert("Merchant business profile updated successfully!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "page-wrap px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "island-kicker mb-1",
					children: "Configuration Panel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "display-title text-3xl font-extrabold text-[var(--sea-ink)] flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, {
						className: "h-7 w-7 text-[var(--lagoon-deep)] animate-spin",
						style: { animationDuration: "8s" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "System Settings" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-[var(--sea-ink-soft)]",
					children: "Adjust heuristics rules tolerances, profile details, and external API POS webhooks."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Heuristic Risk Rules" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs font-semibold text-[var(--sea-ink)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-[var(--line)] pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold block mb-0.5",
									children: "Blacklist Phone Check"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink-soft)] font-medium text-[0.7rem]",
									children: "Cross-references sender phone address against global threat directory."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => store.updateRules({ blacklistLookup: !blacklistLookup }),
									className: "focus:outline-none",
									children: blacklistLookup ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-[var(--line)] pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold block mb-0.5",
									children: "Cryptographic Regex Parsing"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink-soft)] font-medium text-[0.7rem]",
									children: "Evaluates character sequences and check-digits for operator verification."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => store.updateRules({ regexValidation: !regexValidation }),
									className: "focus:outline-none",
									children: regexValidation ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-[var(--line)] pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold block mb-0.5",
									children: "Velocity Safeguard"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink-soft)] font-medium text-[0.7rem]",
									children: "Detects transaction flooding from single senders to counter automated spam."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => store.updateRules({ velocityAlert: !velocityAlert }),
									className: "focus:outline-none",
									children: velocityAlert ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" })
								})]
							}),
							velocityAlert && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pl-6 flex items-center justify-between bg-slate-100 rounded-xl p-2 border border-slate-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.7rem] font-medium text-[var(--sea-ink-soft)]",
									children: "Trigger alert if queries exceed:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: velocityLimitPerHour,
										onChange: (e) => store.updateRules({ velocityLimitPerHour: Math.max(1, parseInt(e.target.value) || 3) }),
										className: "w-12 rounded border border-[var(--line)] bg-white px-2 py-1 text-center font-bold font-mono focus:outline-none"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.65rem] text-[var(--sea-ink-soft)]",
										children: "queries/hour"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between border-b border-[var(--line)] pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold block mb-0.5",
									children: "High-Value Inspection Threshold"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[var(--sea-ink-soft)] font-medium text-[0.7rem]",
									children: "Flag transactions with high amounts for merchant visual verification review."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => store.updateRules({ highValueThreshold: !highValueThreshold }),
									className: "focus:outline-none",
									children: highValueThreshold ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-7 w-7 text-[var(--lagoon-deep)] cursor-pointer" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-7 w-7 text-[var(--sea-ink-soft)] cursor-pointer" })
								})]
							}),
							highValueThreshold && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pl-6 flex items-center justify-between bg-slate-100 rounded-xl p-2 border border-slate-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[0.7rem] font-medium text-[var(--sea-ink-soft)]",
									children: "Highlight payments exceeding:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: store.activeProfile.currency }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: highValueLimit,
										onChange: (e) => store.updateRules({ highValueLimit: Math.max(10, parseInt(e.target.value) || 1e3) }),
										className: "w-20 rounded border border-[var(--line)] bg-white px-2 py-1 text-center font-bold font-mono focus:outline-none"
									})]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-base font-bold text-[var(--sea-ink)] mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Audio Alarm Test Center" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[var(--sea-ink-soft)] mb-4",
							children: "Test the synthesized client alarm beeps played when transaction evaluations finish scanning."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => testAudioNotify(true),
								className: "flex items-center justify-center gap-1.5 rounded-xl border border-emerald-300 bg-emerald-500/10 py-3 font-bold text-emerald-700 hover:bg-emerald-500/20 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Play Safe Verdict Chime" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => testAudioNotify(false),
								className: "flex items-center justify-center gap-1.5 rounded-xl border border-rose-300 bg-rose-500/10 py-3 font-bold text-rose-700 hover:bg-rose-500/20 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Play Threat Alarm Siren" })
							})]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-5 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Merchant Profile" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSaveProfile,
						className: "space-y-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "profName",
								className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
								children: "Store Owner Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								id: "profName",
								required: true,
								value: profName,
								onChange: (e) => setProfName(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "bizName",
								className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
								children: "Registered Shop Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								id: "bizName",
								required: true,
								value: bizName,
								onChange: (e) => setBizName(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-semibold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "phoneNum",
								className: "text-xs font-bold text-[var(--sea-ink)] block mb-1",
								children: "Active SIM Terminal Contact"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								id: "phoneNum",
								required: true,
								value: phoneNum,
								onChange: (e) => setPhoneNum(e.target.value),
								className: "w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-bold text-[var(--sea-ink)] focus:bg-white focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "w-full flex items-center justify-center gap-1.5 rounded-xl bg-[var(--sea-ink)] py-3 font-bold text-white shadow hover:bg-slate-800 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Profile Changes" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "island-shell rounded-3xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-base font-bold text-[var(--sea-ink)] mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "h-5 w-5 text-[var(--lagoon-deep)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Developer API Hooks" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-xs font-semibold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[var(--sea-ink-soft)] block font-bold mb-1",
								children: "Secret Authentication Token:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 font-mono text-[0.65rem] text-[var(--sea-ink)] flex items-center justify-between select-all leading-none",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: apiKey })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleRegenKey,
									disabled: isGeneratingKey,
									className: "p-2 bg-slate-100 border border-slate-200 hover:bg-slate-200 rounded-xl text-[var(--sea-ink)] transition",
									title: "Regenerate token",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4.5 w-4.5 ${isGeneratingKey ? "animate-spin" : ""}` })
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "webhook",
								className: "text-[var(--sea-ink-soft)] block font-bold mb-1",
								children: "Payment Reversal Webhook URL:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								id: "webhook",
								value: webhookUrl,
								onChange: (e) => setWebhookUrl(e.target.value),
								className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-mono text-[0.65rem] text-[var(--sea-ink)] focus:bg-white focus:outline-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleTestWebhook,
								disabled: webhookStatus === "sending",
								className: `w-full flex items-center justify-center gap-1.5 rounded-xl border py-2.5 transition ${webhookStatus === "success" ? "border-emerald-300 bg-emerald-500/10 text-emerald-700" : "border-slate-200 bg-slate-100 text-[var(--sea-ink)] hover:bg-slate-200"}`,
								children: webhookStatus === "sending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-4 w-4 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Firing callback payload..." })] }) : webhookStatus === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Test Webhook Dispatched (HTTP 200 OK)" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fire Simulated Webhook Event" })] })
							})
						]
					})]
				})]
			})]
		})]
	});
}
//#endregion
export { SettingsPage as component };
