import { useState, useEffect } from 'react'
import type {
  Transaction,
  BlacklistEntry,
  VerificationRules,
  MerchantProfile
} from './mockData'
import {
  INITIAL_TRANSACTIONS,
  INITIAL_BLACKLIST,
  DEFAULT_RULES,
  DEFAULT_PROFILES
} from './mockData'

const isClient = typeof window !== 'undefined'

let transactionsCache: Transaction[] = []
let blacklistCache: BlacklistEntry[] = []
let rulesCache: VerificationRules = DEFAULT_RULES
let activeProfileCache: MerchantProfile = DEFAULT_PROFILES[0]

if (isClient) {
  try {
    const tx = localStorage.getItem('ta_transactions')
    let loadedTx = tx ? JSON.parse(tx) : INITIAL_TRANSACTIONS
    // Migration: Force all transaction currencies and raw SMS references to Naira
    loadedTx = loadedTx.map((t: any) => {
      let raw = t.rawText || ''
      raw = raw.replace(/Ksh|GHS|FCFA/gi, '₦')
      return {
        ...t,
        currency: '₦',
        rawText: raw
      }
    })
    transactionsCache = loadedTx
    localStorage.setItem('ta_transactions', JSON.stringify(loadedTx))

    const bl = localStorage.getItem('ta_blacklist')
    blacklistCache = bl ? JSON.parse(bl) : INITIAL_BLACKLIST
    if (!bl) localStorage.setItem('ta_blacklist', JSON.stringify(INITIAL_BLACKLIST))

    const rl = localStorage.getItem('ta_rules')
    rulesCache = rl ? JSON.parse(rl) : DEFAULT_RULES
    if (!rl) localStorage.setItem('ta_rules', JSON.stringify(DEFAULT_RULES))

    const pr = localStorage.getItem('ta_profile')
    activeProfileCache = pr ? JSON.parse(pr) : DEFAULT_PROFILES[0]
    if (!pr) localStorage.setItem('ta_profile', JSON.stringify(DEFAULT_PROFILES[0]))
  } catch (e) {
    console.error("Local storage initialization error", e)
    transactionsCache = INITIAL_TRANSACTIONS
    blacklistCache = INITIAL_BLACKLIST
    rulesCache = DEFAULT_RULES
    activeProfileCache = DEFAULT_PROFILES[0]
  }
} else {
  transactionsCache = INITIAL_TRANSACTIONS
  blacklistCache = INITIAL_BLACKLIST
  rulesCache = DEFAULT_RULES
  activeProfileCache = DEFAULT_PROFILES[0]
}

const subscribers = new Set<() => void>()

function notifySubscribers() {
  subscribers.forEach(sub => sub())
}

export function useTrustArmorStore() {
  const [, setTick] = useState(0)

  useEffect(() => {
    const forceUpdate = () => setTick(t => t + 1)
    subscribers.add(forceUpdate)
    return () => {
      subscribers.delete(forceUpdate)
    }
  }, [])

  return {
    transactions: transactionsCache,
    blacklist: blacklistCache,
    rules: rulesCache,
    activeProfile: activeProfileCache,
    profiles: DEFAULT_PROFILES,

    addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp'>) => {
      const newTx: Transaction = {
        ...tx,
        id: `txn-${Date.now()}`,
        timestamp: new Date().toISOString()
      }
      transactionsCache = [newTx, ...transactionsCache]
      if (isClient) {
        localStorage.setItem('ta_transactions', JSON.stringify(transactionsCache))
      }
      notifySubscribers()
      return newTx
    },

    deleteTransaction: (id: string) => {
      transactionsCache = transactionsCache.filter(t => t.id !== id)
      if (isClient) {
        localStorage.setItem('ta_transactions', JSON.stringify(transactionsCache))
      }
      notifySubscribers()
    },

    clearTransactions: () => {
      transactionsCache = []
      if (isClient) {
        localStorage.setItem('ta_transactions', JSON.stringify([]))
      }
      notifySubscribers()
    },

    addBlacklistEntry: (entry: BlacklistEntry) => {
      // Check if entry already exists
      if (blacklistCache.some(e => e.phone.replace(/[\s\-\+\(\)]/g, '') === entry.phone.replace(/[\s\-\+\(\)]/g, ''))) {
        return; // Avoid duplicates
      }
      blacklistCache = [entry, ...blacklistCache]
      if (isClient) {
        localStorage.setItem('ta_blacklist', JSON.stringify(blacklistCache))
      }
      notifySubscribers()
    },

    removeBlacklistEntry: (phone: string) => {
      blacklistCache = blacklistCache.filter(e => e.phone !== phone)
      if (isClient) {
        localStorage.setItem('ta_blacklist', JSON.stringify(blacklistCache))
      }
      notifySubscribers()
    },

    updateRules: (rules: Partial<VerificationRules>) => {
      rulesCache = { ...rulesCache, ...rules }
      if (isClient) {
        localStorage.setItem('ta_rules', JSON.stringify(rulesCache))
      }
      notifySubscribers()
    },

    setActiveProfile: (profile: MerchantProfile) => {
      activeProfileCache = profile
      if (isClient) {
        localStorage.setItem('ta_profile', JSON.stringify(activeProfileCache))
      }
      notifySubscribers()
    }
  }
}
