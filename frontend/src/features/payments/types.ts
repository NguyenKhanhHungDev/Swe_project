export type PaymentMethod = 'MOMO_SIM' | 'VNPAY_SIM' | 'CARD_SIM';

export type PaymentSimScenario = 'SUCCESS' | 'FAIL_CONFIRMED' | 'TIMEOUT_UNKNOWN';

export type OrderPaymentStatus = 
  | 'PENDING' 
  | 'PAID' 
  | 'PAYMENT_FAILED' 
  | 'PREPARING' 
  | 'READY' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface DemoOrderRecord {
  orderId: string;
  source: 'BUY_NOW' | 'CART';
  status: OrderPaymentStatus;
  items: {
    lineId: string;
    productId: string;
    productName: string;
    size: 'S' | 'M' | 'L';
    toppings: { toppingId: string; name: string; price: number; quantity: number }[];
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  createdAt: string;
  expiresAt: string; // Cố định +15 phút từ lúc tạo đơn, retry không gia hạn
  lastAttemptOutcome?: 'SUCCESS' | 'FAILED' | 'TIMEOUT';
  attemptCount: number;
}