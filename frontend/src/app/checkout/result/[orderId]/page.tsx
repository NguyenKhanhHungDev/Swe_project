import React from 'react';
import { CheckoutProvider } from '@/features/payments/CheckoutProvider';
import { PaymentResultPage } from '@/features/payments/components/PaymentResultPage';

interface PageProps {
  params: Promise<{ orderId: string }>;
}

export default async function CheckoutResultRoutePage({ params }: PageProps) {
  const { orderId } = await params;

  return (
    <CheckoutProvider>
      <PaymentResultPage orderId={orderId} />
    </CheckoutProvider>
  );
}