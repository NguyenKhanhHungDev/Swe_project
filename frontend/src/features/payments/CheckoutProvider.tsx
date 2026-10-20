'use client';

import React, { createContext, useContext, useState, useSyncExternalStore } from 'react';
import { CheckoutDraft } from '@/lib/contracts/checkout-draft';
import { MOCK_BUY_NOW_DRAFT, MOCK_CART_DRAFT } from './mocks/payments.mock';

interface CheckoutContextValue {
  draft: CheckoutDraft | null;
  isHydrated: boolean;
  setBuyNowDraft: (draft: CheckoutDraft) => void;
  setCartSnapshotDraft: (draft: CheckoutDraft) => void;
  clearDraft: () => void;
  loadDemoMockDraft: (type: 'BUY_NOW' | 'CART') => void;
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);

const DRAFT_STORAGE_KEY = 'brewlite_checkout_draft_v1';

const emptySubscribe = () => () => {};

function readInitialDraft(): CheckoutDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const saved = window.sessionStorage.getItem(DRAFT_STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CheckoutDraft) : null;
  } catch {
    return null;
  }
}

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  // Kiểm tra đã mount trên trình duyệt chuẩn React 19 (không dùng useEffect + setState)
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [draft, setDraft] = useState<CheckoutDraft | null>(() => readInitialDraft());

  const persistDraft = (nextDraft: CheckoutDraft | null) => {
    setDraft(nextDraft);
    if (typeof window === 'undefined') return;
    try {
      if (nextDraft) {
        window.sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(nextDraft));
      } else {
        window.sessionStorage.removeItem(DRAFT_STORAGE_KEY);
      }
    } catch {
      // Ignore storage error
    }
  };

  const setBuyNowDraft = (nextDraft: CheckoutDraft) => {
    persistDraft({ ...nextDraft, source: 'BUY_NOW' });
  };

  const setCartSnapshotDraft = (nextDraft: CheckoutDraft) => {
    persistDraft({ ...nextDraft, source: 'CART' });
  };

  const clearDraft = () => {
    persistDraft(null);
  };

  const loadDemoMockDraft = (type: 'BUY_NOW' | 'CART') => {
    if (type === 'BUY_NOW') {
      persistDraft({ ...MOCK_BUY_NOW_DRAFT, createdAt: new Date().toISOString() });
    } else {
      persistDraft({ ...MOCK_CART_DRAFT, createdAt: new Date().toISOString() });
    }
  };

  return (
    <CheckoutContext.Provider
      value={{
        draft: isHydrated ? draft : null,
        isHydrated,
        setBuyNowDraft,
        setCartSnapshotDraft,
        clearDraft,
        loadDemoMockDraft,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout phải được dùng bên trong CheckoutProvider');
  }
  return context;
}