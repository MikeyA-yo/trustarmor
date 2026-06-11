# Product Requirement Document (PRD): TrustArmor AI

## 1. Document Control & Metadata
* **Project Name:** TrustArmor AI
* **Version:** 1.0 (Hackathon Prototype MVP)
* **Date:** June 8, 2026
* **Status:** Draft / Prototype Phase
* **Target Audience:** Hackathon Judges, Frontend Engineers, Backend Engineers

---

## 2. Executive Summary & Problem Statement
Small and informal merchants across Africa rely heavily on mobile money (e.g., M-Pesa, MTN MoMo, Orange Money) to conduct daily business. However, these merchants are frequently targeted by localized financial fraud tactics that exploit communication delays or human trust:
1. **Fake SMS Proofs:** Scammers generate spoofed SMS text messages matching the formatting of official telecom confirmation messages, tricking merchants into believing funds have settled.
2. **Instant Reversal Exploits:** Scammers send genuine payments, collect high-value goods, and immediately call telecom support lines to trigger an unauthorized transaction reversal under the guise of an "accidental transfer."

**TrustArmor AI** acts as an automated, independent verification and risk-analysis engine. It reads transaction payloads, runs a fast heuristic/behavioral risk assessment, and outputs an unambiguous merchant verdict (**"Safe"** or **"Danger"**). This mitigates the risk of financial loss for micro-SMEs without requiring large-scale enterprise infrastructure.

---

## 3. Product Scope & Core Features (MVP)

### 3.1. Transaction Input Interface
* **Functional Requirement:** A single, lightweight dashboard page where a merchant can input or paste raw confirmation text/transaction credentials.
* **MVP Scope:** A clear text field and a standardized form (Sender Number, Transaction ID, Amount) simulating an automated background listener.

### 3.2. Real-Time Risk Analysis Engine
* **Functional Requirement:** A backend routing framework capable of assessing the incoming payload against deterministic fraud heuristics.
* **MVP Logic Rules:**
  * **Blacklist Check:** Cross-references the sender's phone number with a local repository of known fraudulent accounts.
  * **Structural Validation:** Validates transaction ID integrity against known telecom cryptographic regex patterns.
  * **Behavioral Context:** Flags transactions that combine high-value transfers from a first-time consumer profile.

### 3.3. Merchant Verdict UI
* **Functional Requirement:** High-visibility color-coded flash messaging to provide an instantaneous visual feedback loop for non-technical users.
* **MVP Scope:** * 🟢 **GREEN ("Verified Secure"):** Payload passes validation rules.
  * 🔴 **RED ("High Risk Scam Alert"):** Payload trips validation thresholds, complete with the corresponding error message (e.g., *"Warning: Invalid Transaction ID Signature"*).

---

## 4. Technical Architecture & Tech Stack

The architecture is built for rapid development, type safety, and minimal cold-start latencies to maximize hackathon delivery speeds.

### 4.1. Frontend Stack
* **Framework:** React (Vite-powered for fast builds)
* **Routing & State Management:** **TanStack Router (React Router)**
  * *Reasoning:* Provides fully type-safe routing, built-in search parameter validation, and robust asynchronous data loading to handle pending verification transitions smoothly.
* **Styling:** Tailwind CSS (For instant, lightweight layout design and clean, large-font typography).

### 4.2. Backend Stack
* **Framework:** **Hono**
  * *Reasoning:* An ultra-fast, lightweight web framework designed for Edge environments (Cloudflare Workers, Bun, or Node.js). It features native TypeScript support and zero dependencies, ensuring sub-millisecond response times for real-time fraud lookups.
* **Runtime:** Node.js / Bun (Local development)
* **Database (Mock):** In-memory local JSON array representing blacklist stores and historical transactions.

---

## 5. User & System Flow

```
[Merchant UI: Input Data] ──(TanStack Router Fetch)──> [Hono Backend API Route]
                                                               │
                                                               ▼
                                                    [Evaluate Risk Rules]
                                                    - Regex matching
                                                    - Blacklist JSON lookup
                                                               │
                                                               ▼
[Merchant UI: Flash Green/Red] <──(JSON Response)─────── [Compute Verdict]
```

---

## 6. Verification Demo Script for Judges

1. **Test Case A (The Clean Pass):** Input a valid transaction code. The TanStack route handles the submission state gracefully, displaying a loading spinner followed by a bright green visual confirming block settlement.
2. **Test Case B (The Fraud Trigger):** Input a blacklisted phone number. The Hono backend instantly handles the post request, flags the threat vector, and returns a semantic error code triggering a red warning dashboard.