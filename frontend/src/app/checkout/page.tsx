import React from 'react';
import { CheckoutProvider } from '@/features/payments/CheckoutProvider';
import { CheckoutPage } from '@/features/payments/components/CheckoutPage';

export default function CheckoutRoutePage() {
  return (
    <CheckoutProvider>
      <CheckoutPage />
    </CheckoutProvider>
  );
}