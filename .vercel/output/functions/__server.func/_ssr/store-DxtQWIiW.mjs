import { r as __toESM } from "../_runtime.mjs";
import { d as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DxtQWIiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var DEFAULT_RULES = {
	blacklistLookup: true,
	regexValidation: true,
	velocityAlert: true,
	highValueThreshold: true,
	highValueLimit: 5e4,
	velocityLimitPerHour: 3
};
var DEFAULT_PROFILES = [
	{
		name: "Chinedu Okafor",
		businessName: "Chinedu Electronics Lagos",
		country: "Nigeria",
		operator: "OPay",
		currency: "₦",
		phone: "+234 803 111 2222"
	},
	{
		name: "Chioma Eze",
		businessName: "Eze Provision Stores Abuja",
		country: "Nigeria",
		operator: "PalmPay",
		currency: "₦",
		phone: "+234 812 333 4444"
	},
	{
		name: "Musa Bello",
		businessName: "Bello Food Mart Kano",
		country: "Nigeria",
		operator: "MTN MoMo",
		currency: "₦",
		phone: "+234 905 666 7777"
	}
];
var INITIAL_BLACKLIST = [
	{
		phone: "+2348099998888",
		alias: "Lekki Reversal Syndicate",
		operator: "OPay",
		fraudType: "Instant Reversal",
		timesReported: 6,
		lastIncidentDate: "2026-06-09",
		notes: "Sends genuine OPay transfers, claims accidental send, triggers instant reversal callback via bank support."
	},
	{
		phone: "+2348122223333",
		alias: "Fake SMS Runner Ikeja",
		operator: "OPay",
		fraudType: "Fake SMS",
		timesReported: 4,
		lastIncidentDate: "2026-06-10",
		notes: "Sends custom bulk SMS texts pretending to be OPay receipts with invalid alphanumeric references."
	},
	{
		phone: "+2349055556666",
		alias: "PalmPay Coupon Spammer",
		operator: "PalmPay",
		fraudType: "Spoofed Identity",
		timesReported: 3,
		lastIncidentDate: "2026-06-05",
		notes: "Generates fake coupon payout texts asking agents to cash out discount codes."
	}
];
var INITIAL_TRANSACTIONS = [
	{
		id: "txn-1",
		txId: "260610789234",
		senderPhone: "+2348023456789",
		senderName: "Bisi Adebayo",
		amount: 15e3,
		currency: "₦",
		operator: "OPay",
		timestamp: "2026-06-10T14:34:00+01:00",
		rawText: "Transaction Receipt: You have received ₦15,000.00 from BISI ADEBAYO. Ref: 260610789234. Date: 10/06/2026 14:34. Balance: ₦45,200.00. OPay - We enable you.",
		verdict: "safe",
		riskScore: 6,
		findings: [
			"OPay reference syntax is valid",
			"Structure checks established",
			"Sender profile verified clean"
		],
		reversalRisk: false
	},
	{
		id: "txn-2",
		txId: "OP_FAKE_99823",
		senderPhone: "+2348122223333",
		senderName: "Fake SMS Runner Ikeja",
		amount: 5e4,
		currency: "₦",
		operator: "OPay",
		timestamp: "2026-06-10T15:20:00+01:00",
		rawText: "Transaction Receipt: You have received ₦50,000.00 from MUSA BELLO. Ref: OP_FAKE_99823. Date: 10/06/2026 15:20. Balance: ₦80,000.00.",
		verdict: "danger",
		riskScore: 98,
		findings: [
			"Sender phone number matched blacklist: 'Fake SMS Runner Ikeja'",
			"Alphanumeric reference 'OP_FAKE_99823' does not match OPay numerical format rule",
			"Carrier SMS bypass: Sent from personal phone instead of OPay registry"
		],
		reversalRisk: false
	},
	{
		id: "txn-3",
		txId: "PP2606103849",
		senderPhone: "+2348035557777",
		senderName: "Chioma Eze",
		amount: 8500,
		currency: "₦",
		operator: "PalmPay",
		timestamp: "2026-06-10T16:15:00+01:00",
		rawText: "PalmPay: You have received ₦8,500.00 from CHIOMA EZE. Ref: PP2606103849. Time: 10/06/2026 16:15. Bal: ₦12,300.00. PalmPay - Finance at your fingertips.",
		verdict: "safe",
		riskScore: 10,
		findings: ["PalmPay reference syntax check passed", "Sender not blacklisted"],
		reversalRisk: false
	},
	{
		id: "txn-4",
		txId: "REVERSED_ALERT_₦",
		senderPhone: "+2348099998888",
		senderName: "Lekki Reversal Syndicate",
		amount: 25e3,
		currency: "₦",
		operator: "OPay",
		timestamp: "2026-06-10T17:10:00+01:00",
		rawText: "SMS from +234 809 999 8888: 'Hello, please reverse the ₦25,000.00 I accidentally sent to your OPay wallet just now. Here is the ref: 260610789234.'",
		verdict: "danger",
		riskScore: 95,
		findings: [
			"Sender number matched blacklist: 'Lekki Reversal Syndicate'",
			"Detected accidental refund keyword signatures",
			"Tactic matches known bank reversal social engineering script"
		],
		reversalRisk: true
	}
];
var SMS_TEMPLATES = [
	{
		name: "OPay Clear Pass",
		operator: "OPay",
		label: "🟢 OPay Valid Payment",
		description: "Standard successful transaction message with verified numeric Ref.",
		simulatedSender: "OPay",
		text: "Transaction Receipt: You have received ₦18,500.00 from TOLU ADEWALE. Ref: 260611893041. Date: 11/06/2026 08:30. Balance: ₦63,700.00. OPay - We enable you."
	},
	{
		name: "OPay Blacklisted Sender",
		operator: "OPay",
		label: "🔴 OPay Blacklisted Account",
		description: "Transaction alert originating from a flagged scammer phone address.",
		simulatedSender: "+2348122223333",
		text: "Transaction Receipt: You have received ₦35,000.00 from SUSPECTED ACCOUNT. Ref: 260611893922. Date: 11/06/2026 08:35. Balance: ₦98,700.00."
	},
	{
		name: "OPay Invalid Ref ID",
		operator: "OPay",
		label: "🔴 OPay Spoofed Ref Code",
		description: "Fake SMS with a non-numeric/alphanumeric OPay reference syntax error.",
		simulatedSender: "OPay",
		text: "Transaction Receipt: You have received ₦60,000.00 from ALHAJI SHEHU. Ref: OP_REF_INVALID_102. Date: 11/06/2026 08:42. Balance: ₦123,700.00."
	},
	{
		name: "OPay Reversal Attempt",
		operator: "OPay",
		label: "🔴 OPay Reversal Claim",
		description: "Text message urging immediate cash refund for an accidental transfer.",
		simulatedSender: "+2348099998888",
		text: "SMS from +234 809 999 8888: 'Good morning, my child accidentally sent ₦18,500.00 to your OPay merchant account. Please help me transfer it back to my phone. Ref is 260611893041. God bless you.'"
	},
	{
		name: "PalmPay Valid Payment",
		operator: "PalmPay",
		label: "🟢 PalmPay Valid Payment",
		description: "Standard PalmPay notification message.",
		simulatedSender: "PalmPay",
		text: "PalmPay: You have received ₦12,000.00 from IFEANYI OKAFOR. Ref: PP2606119042. Time: 11/06/2026 08:45. Bal: ₦24,300.00. PalmPay - Finance at your fingertips."
	},
	{
		name: "PalmPay Fake ID Format",
		operator: "PalmPay",
		label: "🔴 PalmPay Spoofed ID Format",
		description: "Spoofed PalmPay SMS displaying an invalid transaction code syntax.",
		simulatedSender: "PalmPay",
		text: "PalmPay: You have received ₦90,000.00 from TEMI TOPE. Ref: PP_FAKE_ID_1002. Time: 11/06/2026 08:48. Bal: ₦114,300.00."
	},
	{
		name: "MTN MoMo Nigeria Valid",
		operator: "MTN MoMo",
		label: "🟢 MTN MoMo Valid Payment",
		description: "Standard MTN MoMo Nigeria transaction receipt.",
		simulatedSender: "MTNMoMo",
		text: "MoMo Confirmed: ₦7,500.00 has been received from 2348035559999. TxID: 902839442. Bal: ₦16,200.00."
	}
];
function evaluateSMS(rawText, simulatedSender, profile, rules, blacklist, recentTransactions) {
	const findings = [];
	let verdict = "safe";
	let riskScore = 0;
	let reversalRisk = false;
	const textLower = rawText.toLowerCase();
	const normalizePhone = (p) => p.replace(/[\s\-\+\(\)]/g, "").trim();
	const normalizedSender = normalizePhone(simulatedSender);
	if (rules.blacklistLookup) {
		const blacklisted = blacklist.find((entry) => normalizePhone(entry.phone) === normalizedSender);
		if (blacklisted) {
			verdict = "danger";
			riskScore = Math.max(riskScore, 98);
			findings.push(`Sender address '${simulatedSender}' matches blacklist registry: '${blacklisted.alias}' (${blacklisted.fraudType})`);
		}
	}
	let parsedAmount = 0;
	let parsedTxId = "UNKNOWN";
	let parsedSenderName = "Unknown Sender";
	const currency = profile.currency;
	if (profile.operator === "OPay") {
		const txMatch = rawText.match(/(?:Ref|Ref\s*:)\s*([A-Za-z0-9_]+)/i);
		if (txMatch) parsedTxId = txMatch[1];
		const amountMatch = rawText.match(/(?:₦|NGN|N)\s*([\d,]+\.?\d*)/i);
		if (amountMatch) parsedAmount = parseFloat(amountMatch[1].replace(/,/g, ""));
		const senderMatch = rawText.match(/from\s+([A-Za-z\s]+?)(?:\.|\bRef)/i);
		if (senderMatch) parsedSenderName = senderMatch[1].trim();
		else parsedSenderName = simulatedSender === "OPay" ? "OPay Network" : simulatedSender;
		if (rules.regexValidation && simulatedSender !== "OPay" && !rawText.includes("accident") && !rawText.includes("reverse")) {
			findings.push("Security Alert: OPay receipt text was sent from personal number instead of official 'OPay' registry");
			riskScore = Math.max(riskScore, 80);
			verdict = "danger";
		}
		if (rules.regexValidation && parsedTxId !== "UNKNOWN") {
			if (!/^\d+$/.test(parsedTxId)) {
				findings.push(`Invalid Reference Format '${parsedTxId}': OPay settlement references must contain numeric digits only`);
				riskScore = Math.max(riskScore, 85);
				verdict = "danger";
			}
		}
	} else if (profile.operator === "PalmPay") {
		const txMatch = rawText.match(/(?:Ref|Ref\s*:)\s*([A-Za-z0-9_]+)/i);
		if (txMatch) parsedTxId = txMatch[1];
		const amountMatch = rawText.match(/(?:₦|NGN|N)\s*([\d,]+\.?\d*)/i);
		if (amountMatch) parsedAmount = parseFloat(amountMatch[1].replace(/,/g, ""));
		const senderMatch = rawText.match(/from\s+([A-Za-z\s]+?)(?:\.|\bRef)/i);
		if (senderMatch) parsedSenderName = senderMatch[1].trim();
		else parsedSenderName = simulatedSender === "PalmPay" ? "PalmPay Network" : simulatedSender;
		if (rules.regexValidation && parsedTxId !== "UNKNOWN") {
			if (!/^PP\d+$/.test(parsedTxId)) {
				findings.push(`Invalid Reference Format '${parsedTxId}': PalmPay transaction references must follow the pattern 'PP' + digits`);
				riskScore = Math.max(riskScore, 85);
				verdict = "danger";
			}
		}
	} else {
		const txMatch = rawText.match(/(?:TxID|TxID\s*:)\s*([A-Za-z0-9_]+)/i);
		if (txMatch) parsedTxId = txMatch[1];
		const amountMatch = rawText.match(/(?:₦|NGN|N)\s*([\d,]+\.?\d*)/i);
		if (amountMatch) parsedAmount = parseFloat(amountMatch[1].replace(/,/g, ""));
		const senderMatch = rawText.match(/received\s+from\s+([A-Za-z0-9\s]+?)(?:\.|\bTxID)/i);
		if (senderMatch) parsedSenderName = senderMatch[1].trim();
		else parsedSenderName = simulatedSender === "MTNMoMo" ? "MTN Network" : simulatedSender;
	}
	if (textLower.includes("accident") || textLower.includes("reverse") || textLower.includes("please help me transfer") || textLower.includes("send back") || textLower.includes("reversement")) {
		reversalRisk = true;
		findings.push("Danger: Message contains social engineering triggers requesting immediate manual money return / reversal");
		riskScore = Math.max(riskScore, 92);
		verdict = "danger";
	}
	if (rules.velocityAlert && normalizedSender) {
		const senderTxCount = recentTransactions.filter((t) => normalizePhone(t.senderPhone) === normalizedSender).length;
		if (senderTxCount >= rules.velocityLimitPerHour) {
			findings.push(`Velocity Trigger: Phone ${simulatedSender} has queried the scanner ${senderTxCount} times (over velocity threshold)`);
			riskScore = Math.max(riskScore, 75);
			verdict = "danger";
		}
	}
	if (rules.highValueThreshold && parsedAmount > rules.highValueLimit) {
		findings.push(`Security Alert: Transaction amount (₦${parsedAmount.toLocaleString()}) exceeds high-value verification limit (₦${rules.highValueLimit.toLocaleString()})`);
		riskScore = Math.max(riskScore, 20);
	}
	if (verdict === "safe") {
		riskScore = Math.max(riskScore, findings.length > 0 ? 12 : 3);
		findings.push("All security signature and heuristic checks passed successfully.");
	}
	return {
		txId: parsedTxId,
		senderPhone: simulatedSender,
		senderName: parsedSenderName,
		amount: parsedAmount,
		currency,
		operator: profile.operator,
		rawText,
		verdict,
		riskScore,
		findings,
		reversalRisk
	};
}
var isClient = typeof window !== "undefined";
var transactionsCache = [];
var blacklistCache = [];
var rulesCache = DEFAULT_RULES;
var activeProfileCache = DEFAULT_PROFILES[0];
if (isClient) try {
	const tx = localStorage.getItem("ta_transactions");
	let loadedTx = tx ? JSON.parse(tx) : INITIAL_TRANSACTIONS;
	loadedTx = loadedTx.map((t) => {
		let raw = t.rawText || "";
		raw = raw.replace(/Ksh|GHS|FCFA/gi, "₦");
		return {
			...t,
			currency: "₦",
			rawText: raw
		};
	});
	transactionsCache = loadedTx;
	localStorage.setItem("ta_transactions", JSON.stringify(loadedTx));
	const bl = localStorage.getItem("ta_blacklist");
	blacklistCache = bl ? JSON.parse(bl) : INITIAL_BLACKLIST;
	if (!bl) localStorage.setItem("ta_blacklist", JSON.stringify(INITIAL_BLACKLIST));
	const rl = localStorage.getItem("ta_rules");
	rulesCache = rl ? JSON.parse(rl) : DEFAULT_RULES;
	if (!rl) localStorage.setItem("ta_rules", JSON.stringify(DEFAULT_RULES));
	const pr = localStorage.getItem("ta_profile");
	activeProfileCache = pr ? JSON.parse(pr) : DEFAULT_PROFILES[0];
	if (!pr) localStorage.setItem("ta_profile", JSON.stringify(DEFAULT_PROFILES[0]));
} catch (e) {
	console.error("Local storage initialization error", e);
	transactionsCache = INITIAL_TRANSACTIONS;
	blacklistCache = INITIAL_BLACKLIST;
	rulesCache = DEFAULT_RULES;
	activeProfileCache = DEFAULT_PROFILES[0];
}
else {
	transactionsCache = INITIAL_TRANSACTIONS;
	blacklistCache = INITIAL_BLACKLIST;
	rulesCache = DEFAULT_RULES;
	activeProfileCache = DEFAULT_PROFILES[0];
}
var subscribers = /* @__PURE__ */ new Set();
function notifySubscribers() {
	subscribers.forEach((sub) => sub());
}
function useTrustArmorStore() {
	const [, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const forceUpdate = () => setTick((t) => t + 1);
		subscribers.add(forceUpdate);
		return () => {
			subscribers.delete(forceUpdate);
		};
	}, []);
	return {
		transactions: transactionsCache,
		blacklist: blacklistCache,
		rules: rulesCache,
		activeProfile: activeProfileCache,
		profiles: DEFAULT_PROFILES,
		addTransaction: (tx) => {
			const newTx = {
				...tx,
				id: `txn-${Date.now()}`,
				timestamp: (/* @__PURE__ */ new Date()).toISOString()
			};
			transactionsCache = [newTx, ...transactionsCache];
			if (isClient) localStorage.setItem("ta_transactions", JSON.stringify(transactionsCache));
			notifySubscribers();
			return newTx;
		},
		deleteTransaction: (id) => {
			transactionsCache = transactionsCache.filter((t) => t.id !== id);
			if (isClient) localStorage.setItem("ta_transactions", JSON.stringify(transactionsCache));
			notifySubscribers();
		},
		clearTransactions: () => {
			transactionsCache = [];
			if (isClient) localStorage.setItem("ta_transactions", JSON.stringify([]));
			notifySubscribers();
		},
		addBlacklistEntry: (entry) => {
			if (blacklistCache.some((e) => e.phone.replace(/[\s\-\+\(\)]/g, "") === entry.phone.replace(/[\s\-\+\(\)]/g, ""))) return;
			blacklistCache = [entry, ...blacklistCache];
			if (isClient) localStorage.setItem("ta_blacklist", JSON.stringify(blacklistCache));
			notifySubscribers();
		},
		removeBlacklistEntry: (phone) => {
			blacklistCache = blacklistCache.filter((e) => e.phone !== phone);
			if (isClient) localStorage.setItem("ta_blacklist", JSON.stringify(blacklistCache));
			notifySubscribers();
		},
		updateRules: (rules) => {
			rulesCache = {
				...rulesCache,
				...rules
			};
			if (isClient) localStorage.setItem("ta_rules", JSON.stringify(rulesCache));
			notifySubscribers();
		},
		setActiveProfile: (profile) => {
			activeProfileCache = profile;
			if (isClient) localStorage.setItem("ta_profile", JSON.stringify(activeProfileCache));
			notifySubscribers();
		}
	};
}
//#endregion
export { evaluateSMS as n, useTrustArmorStore as r, SMS_TEMPLATES as t };
