// Mock databases and dynamic threat evaluation engine for TrustArmor AI (Nigeria / Naira focus)

export interface Transaction {
  id: string;
  txId: string;
  senderPhone: string;
  senderName: string;
  amount: number;
  currency: string;
  operator: 'OPay' | 'PalmPay' | 'MTN MoMo';
  timestamp: string;
  rawText: string;
  verdict: 'safe' | 'danger';
  riskScore: number;
  findings: string[];
  templateName?: string;
  reversalRisk: boolean;
}

export interface BlacklistEntry {
  phone: string;
  alias: string;
  operator: 'OPay' | 'PalmPay' | 'MTN';
  fraudType: 'Fake SMS' | 'Instant Reversal' | 'Spoofed Identity';
  timesReported: number;
  lastIncidentDate: string;
  notes: string;
}

export interface VerificationRules {
  blacklistLookup: boolean;
  regexValidation: boolean;
  velocityAlert: boolean;
  highValueThreshold: boolean;
  highValueLimit: number;
  velocityLimitPerHour: number;
}

export interface MerchantProfile {
  name: string;
  businessName: string;
  country: string;
  operator: 'OPay' | 'PalmPay' | 'MTN MoMo';
  currency: string;
  phone: string;
}

// Default settings
export const DEFAULT_RULES: VerificationRules = {
  blacklistLookup: true,
  regexValidation: true,
  velocityAlert: true,
  highValueThreshold: true,
  highValueLimit: 50000, // Trigger high value review if above ₦50,000
  velocityLimitPerHour: 3, // Flag if sender makes more than 3 transactions in an hour
};

export const DEFAULT_PROFILES: MerchantProfile[] = [
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

// Initial Blacklist
export const INITIAL_BLACKLIST: BlacklistEntry[] = [
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

// Initial Transactions (Logs)
export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-1",
    txId: "260610789234",
    senderPhone: "+2348023456789",
    senderName: "Bisi Adebayo",
    amount: 15000,
    currency: "₦",
    operator: "OPay",
    timestamp: "2026-06-10T14:34:00+01:00",
    rawText: "Transaction Receipt: You have received ₦15,000.00 from BISI ADEBAYO. Ref: 260610789234. Date: 10/06/2026 14:34. Balance: ₦45,200.00. OPay - We enable you.",
    verdict: "safe",
    riskScore: 6,
    findings: ["OPay reference syntax is valid", "Structure checks established", "Sender profile verified clean"],
    reversalRisk: false
  },
  {
    id: "txn-2",
    txId: "OP_FAKE_99823",
    senderPhone: "+2348122223333",
    senderName: "Fake SMS Runner Ikeja",
    amount: 50000,
    currency: "₦",
    operator: "OPay",
    timestamp: "2026-06-10T15:20:00+01:00",
    rawText: "Transaction Receipt: You have received ₦50,000.00 from MUSA BELLO. Ref: OP_FAKE_99823. Date: 10/06/2026 15:20. Balance: ₦80,000.00.",
    verdict: "danger",
    riskScore: 98,
    findings: ["Sender phone number matched blacklist: 'Fake SMS Runner Ikeja'", "Alphanumeric reference 'OP_FAKE_99823' does not match OPay numerical format rule", "Carrier SMS bypass: Sent from personal phone instead of OPay registry"],
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
    amount: 25000,
    currency: "₦",
    operator: "OPay",
    timestamp: "2026-06-10T17:10:00+01:00",
    rawText: "SMS from +234 809 999 8888: 'Hello, please reverse the ₦25,000.00 I accidentally sent to your OPay wallet just now. Here is the ref: 260610789234.'",
    verdict: "danger",
    riskScore: 95,
    findings: ["Sender number matched blacklist: 'Lekki Reversal Syndicate'", "Detected accidental refund keyword signatures", "Tactic matches known bank reversal social engineering script"],
    reversalRisk: true
  }
];

// Presets templates for Dashboard demoing
export interface SMSTemplate {
  name: string;
  operator: 'OPay' | 'PalmPay' | 'MTN MoMo';
  text: string;
  label: string;
  description: string;
  simulatedSender: string;
}

export const SMS_TEMPLATES: SMSTemplate[] = [
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

// Heuristics engine logic
export function evaluateSMS(
  rawText: string,
  simulatedSender: string,
  profile: MerchantProfile,
  rules: VerificationRules,
  blacklist: BlacklistEntry[],
  recentTransactions: Transaction[]
): Omit<Transaction, 'id' | 'timestamp'> {
  const findings: string[] = [];
  let verdict: 'safe' | 'danger' = 'safe';
  let riskScore = 0;
  let reversalRisk = false;

  const textLower = rawText.toLowerCase();

  const normalizePhone = (p: string) => p.replace(/[\s\-\+\(\)]/g, '').trim();
  const normalizedSender = normalizePhone(simulatedSender);

  // 1. Blacklist Check
  if (rules.blacklistLookup) {
    const blacklisted = blacklist.find(entry => normalizePhone(entry.phone) === normalizedSender);
    if (blacklisted) {
      verdict = 'danger';
      riskScore = Math.max(riskScore, 98);
      findings.push(`Sender address '${simulatedSender}' matches blacklist registry: '${blacklisted.alias}' (${blacklisted.fraudType})`);
    }
  }

  // 2. Parse details based on Operator
  let parsedAmount = 0;
  let parsedTxId = 'UNKNOWN';
  let parsedSenderName = 'Unknown Sender';
  const currency = profile.currency;

  if (profile.operator === 'OPay') {
    // OPay Parser
    // Ref: 260611893041 (numeric code, usually 12 digits starting with YYMMDD)
    const txMatch = rawText.match(/(?:Ref|Ref\s*:)\s*([A-Za-z0-9_]+)/i);
    if (txMatch) {
      parsedTxId = txMatch[1];
    }

    // Amount: ₦15,000.00
    const amountMatch = rawText.match(/(?:₦|NGN|N)\s*([\d,]+\.?\d*)/i);
    if (amountMatch) {
      parsedAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
    }

    // Sender Name: from NAME.
    const senderMatch = rawText.match(/from\s+([A-Za-z\s]+?)(?:\.|\bRef)/i);
    if (senderMatch) {
      parsedSenderName = senderMatch[1].trim();
    } else {
      parsedSenderName = simulatedSender === 'OPay' ? 'OPay Network' : simulatedSender;
    }

    // Rule: OPay texts must come from sender 'OPay'
    if (rules.regexValidation && simulatedSender !== 'OPay' && !rawText.includes('accident') && !rawText.includes('reverse')) {
      findings.push("Security Alert: OPay receipt text was sent from personal number instead of official 'OPay' registry");
      riskScore = Math.max(riskScore, 80);
      verdict = 'danger';
    }

    // Rule: OPay ref must be pure numeric
    if (rules.regexValidation && parsedTxId !== 'UNKNOWN') {
      const isNumeric = /^\d+$/.test(parsedTxId);
      if (!isNumeric) {
        findings.push(`Invalid Reference Format '${parsedTxId}': OPay settlement references must contain numeric digits only`);
        riskScore = Math.max(riskScore, 85);
        verdict = 'danger';
      }
    }
  } else if (profile.operator === 'PalmPay') {
    // PalmPay Parser
    // Ref: PP2606119042
    const txMatch = rawText.match(/(?:Ref|Ref\s*:)\s*([A-Za-z0-9_]+)/i);
    if (txMatch) {
      parsedTxId = txMatch[1];
    }

    const amountMatch = rawText.match(/(?:₦|NGN|N)\s*([\d,]+\.?\d*)/i);
    if (amountMatch) {
      parsedAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
    }

    const senderMatch = rawText.match(/from\s+([A-Za-z\s]+?)(?:\.|\bRef)/i);
    if (senderMatch) {
      parsedSenderName = senderMatch[1].trim();
    } else {
      parsedSenderName = simulatedSender === 'PalmPay' ? 'PalmPay Network' : simulatedSender;
    }

    // Rule: PalmPay ref must follow PP + digits
    if (rules.regexValidation && parsedTxId !== 'UNKNOWN') {
      const isPalmFormat = /^PP\d+$/.test(parsedTxId);
      if (!isPalmFormat) {
        findings.push(`Invalid Reference Format '${parsedTxId}': PalmPay transaction references must follow the pattern 'PP' + digits`);
        riskScore = Math.max(riskScore, 85);
        verdict = 'danger';
      }
    }
  } else {
    // MTN MoMo
    // TxID: 902839442
    const txMatch = rawText.match(/(?:TxID|TxID\s*:)\s*([A-Za-z0-9_]+)/i);
    if (txMatch) {
      parsedTxId = txMatch[1];
    }

    const amountMatch = rawText.match(/(?:₦|NGN|N)\s*([\d,]+\.?\d*)/i);
    if (amountMatch) {
      parsedAmount = parseFloat(amountMatch[1].replace(/,/g, ''));
    }

    const senderMatch = rawText.match(/received\s+from\s+([A-Za-z0-9\s]+?)(?:\.|\bTxID)/i);
    if (senderMatch) {
      parsedSenderName = senderMatch[1].trim();
    } else {
      parsedSenderName = simulatedSender === 'MTNMoMo' ? 'MTN Network' : simulatedSender;
    }
  }

  // 3. Reversal check
  if (textLower.includes('accident') || textLower.includes('reverse') || textLower.includes('please help me transfer') || textLower.includes('send back') || textLower.includes('reversement')) {
    reversalRisk = true;
    findings.push("Danger: Message contains social engineering triggers requesting immediate manual money return / reversal");
    riskScore = Math.max(riskScore, 92);
    verdict = 'danger';
  }

  // 4. Velocity check
  if (rules.velocityAlert && normalizedSender) {
    const senderTxCount = recentTransactions.filter(t => normalizePhone(t.senderPhone) === normalizedSender).length;
    if (senderTxCount >= rules.velocityLimitPerHour) {
      findings.push(`Velocity Trigger: Phone ${simulatedSender} has queried the scanner ${senderTxCount} times (over velocity threshold)`);
      riskScore = Math.max(riskScore, 75);
      verdict = 'danger';
    }
  }

  // 5. High value check
  if (rules.highValueThreshold && parsedAmount > rules.highValueLimit) {
    findings.push(`Security Alert: Transaction amount (₦${parsedAmount.toLocaleString()}) exceeds high-value verification limit (₦${rules.highValueLimit.toLocaleString()})`);
    riskScore = Math.max(riskScore, 20);
  }

  // Final check
  if (verdict === 'safe') {
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
