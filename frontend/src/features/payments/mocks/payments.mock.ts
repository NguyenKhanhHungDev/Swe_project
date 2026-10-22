import { CheckoutDraft } from '@/lib/contracts/checkout-draft';
import { PaymentSimScenario } from '../types';

export const MOCK_BUY_NOW_DRAFT: CheckoutDraft = {
  draftId: 'draft-buy-now-01',
  source: 'BUY_NOW',
  items: [
    {
      lineId: 'line-bn-1',
      productId: 'prod-01',
      productName: 'Trà Sữa Ô Long Nướng',
      size: 'L',
      basePrice: 45000,
      toppings: [
        { toppingId: 'top-01', name: 'Trân châu trắng', price: 10000, quantity: 1 },
      ],
      quantity: 2,
      unitPrice: 55000,
      lineTotal: 110000,
    },
  ],
  subtotal: 110000,
  promoCode: null,
  discountAmount: 0,
  totalAmount: 110000,
  createdAt: new Date().toISOString(),
};

export const MOCK_CART_DRAFT: CheckoutDraft = {
  draftId: 'draft-cart-01',
  source: 'CART',
  cartSnapshotVersion: 'snap-v1',
  items: [
    {
      lineId: 'cart-line-1',
      productId: 'prod-02',
      productName: 'Cà Phê Muối Huế',
      size: 'M',
      basePrice: 39000,
      toppings: [],
      quantity: 1,
      unitPrice: 39000,
      lineTotal: 39000,
    },
    {
      lineId: 'cart-line-2',
      productId: 'prod-03',
      productName: 'Hồng Trà Kem Cheese',
      size: 'L',
      basePrice: 49000,
      toppings: [
        { toppingId: 'top-02', name: 'Kem Cheese', price: 12000, quantity: 2 },
      ],
      quantity: 1,
      unitPrice: 73000,
      lineTotal: 73000,
    },
  ],
  subtotal: 112000,
  promoCode: 'BREWLITE20',
  discountAmount: 20000,
  totalAmount: 92000,
  createdAt: new Date().toISOString(),
};

export async function simulatePaymentGateway(
  scenario: PaymentSimScenario,
  delayMs = 800
): Promise<{ outcome: 'SUCCESS' | 'FAILED' | 'TIMEOUT'; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));

  if (scenario === 'SUCCESS') {
    return { outcome: 'SUCCESS', message: 'Thanh toán thành công.' };
  }
  if (scenario === 'FAIL_CONFIRMED') {
    return {
      outcome: 'FAILED',
      message: 'Giao dịch bị từ chối bởi cổng thanh toán (Số dư không đủ hoặc hủy bỏ).',
    };
  }
  return {
    outcome: 'TIMEOUT',
    message: 'Mất kết nối tới cổng thanh toán. Chưa rõ kết quả giao dịch.',
  };
}