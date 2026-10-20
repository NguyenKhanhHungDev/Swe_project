import { CheckoutDraft } from '@/lib/contracts/checkout-draft';
import { DemoOrderRecord, PaymentMethod, PaymentSimScenario } from './types';
import { simulatePaymentGateway } from './mocks/payments.mock';

// LƯU Ý GHÉP LUỒNG: Dùng cùng key hoặc thay bằng hàm import từ `features/orders/mocks/orders.mock.ts` của Phát
const SHARED_ORDERS_STORAGE_KEY = 'brewlite_demo_orders';
const CART_STORAGE_KEY = 'brewlite_demo_cart';

export function getSharedOrders(): DemoOrderRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(SHARED_ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getSharedOrderById(orderId: string): DemoOrderRecord | null {
  const orders = getSharedOrders();
  return orders.find((o) => o.orderId === orderId) ?? null;
}

function saveSharedOrder(order: DemoOrderRecord): void {
  if (typeof window === 'undefined') return;
  const orders = getSharedOrders();
  const idx = orders.findIndex((o) => o.orderId === order.orderId);
  if (idx >= 0) {
    orders[idx] = order;
  } else {
    orders.unshift(order);
  }
  window.localStorage.setItem(SHARED_ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

/**
 * Xử lý giỏ hàng sau khi PAID:
 * - Nếu nguồn là BUY_NOW: giữ nguyên giỏ hiện có.
 * - Nếu nguồn là CART: chỉ xóa các dòng nằm trong snapshot đã xác nhận, giữ lại món thêm/sửa ngoài snapshot.
 */
export function reconcileCartAfterPaid(
  source: 'BUY_NOW' | 'CART',
  confirmedLineIds: string[],
  onCartCompleteCallback?: (lineIds: string[]) => void
) {
  if (source === 'BUY_NOW') {
    return; // Tuyệt đối giữ nguyên giỏ khi Mua ngay
  }

  if (onCartCompleteCallback) {
    onCartCompleteCallback(confirmedLineIds);
    return;
  }

  // Fallback an toàn nếu chạy độc lập trước khi ghép với CartProvider của Huy
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return;
    const cartItems = JSON.parse(raw);
    if (Array.isArray(cartItems)) {
      const remaining = cartItems.filter(
        (item: { lineId?: string }) => !confirmedLineIds.includes(item.lineId ?? '')
      );
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(remaining));
    }
  } catch {
    // Bỏ qua lỗi đọc storage
  }
}

/**
 * Chỉ tạo đơn khi khách bấm Xác nhận tại Checkout (không tạo khi mới mở trang)
 */
export async function confirmAndPayDraft(params: {
  draft: CheckoutDraft;
  paymentMethod: PaymentMethod;
  scenario: PaymentSimScenario;
  onCartPaid?: (lineIds: string[]) => void;
}): Promise<DemoOrderRecord> {
  const { draft, paymentMethod, scenario, onCartPaid } = params;

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000); // Hạn 15 phút cố định

  const newOrder: DemoOrderRecord = {
    orderId: `ORD-${Date.now().toString().slice(-6)}`,
    source: draft.source,
    status: 'PENDING',
    items: draft.items.map((item) => ({ ...item })),
    subtotal: draft.subtotal,
    discountAmount: draft.discountAmount,
    totalAmount: draft.totalAmount,
    paymentMethod,
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    attemptCount: 1,
  };

  // Lưu đơn trạng thái PENDING trước
  saveSharedOrder(newOrder);

  // Mô phỏng gọi thanh toán
  const result = await simulatePaymentGateway(scenario);

  if (result.outcome === 'SUCCESS') {
    newOrder.status = 'PAID';
    newOrder.lastAttemptOutcome = 'SUCCESS';
    saveSharedOrder(newOrder);

    // Xử lý giỏ nếu thanh toán từ giỏ thành công
    reconcileCartAfterPaid(
      draft.source,
      draft.items.map((i) => i.lineId),
      onCartPaid
    );
  } else if (result.outcome === 'FAILED') {
    newOrder.status = 'PAYMENT_FAILED';
    newOrder.lastAttemptOutcome = 'FAILED';
    saveSharedOrder(newOrder);
    // Thất bại: giữ nguyên giỏ hàng
  } else {
    // TIMEOUT: Giữ nguyên trạng thái PENDING, đánh dấu chưa rõ kết quả
    newOrder.status = 'PENDING';
    newOrder.lastAttemptOutcome = 'TIMEOUT';
    saveSharedOrder(newOrder);
  }

  return newOrder;
}

/**
 * Thử lại (Retry) cho đơn PAYMENT_FAILED:
 * - Dùng cùng orderId, không tạo đơn mới.
 * - KHÔNG gia hạn thêm 15 phút (giữ nguyên expiresAt cũ).
 */
export async function retryOrderPayment(params: {
  orderId: string;
  scenario: PaymentSimScenario;
  onCartPaid?: (lineIds: string[]) => void;
}): Promise<DemoOrderRecord> {
  const { orderId, scenario, onCartPaid } = params;
  const order = getSharedOrderById(orderId);
  if (!order) {
    throw new Error('Không tìm thấy đơn hàng cần thử lại.');
  }

  if (new Date() > new Date(order.expiresAt)) {
    order.status = 'CANCELLED';
    saveSharedOrder(order);
    throw new Error('Đơn hàng đã quá thời hạn thanh toán 15 phút.');
  }

  if (order.status !== 'PAYMENT_FAILED' && order.status !== 'PENDING') {
    throw new Error(`Không thể thử lại cho đơn ở trạng thái ${order.status}.`);
  }

  const result = await simulatePaymentGateway(scenario);
  order.attemptCount += 1;

  if (result.outcome === 'SUCCESS') {
    order.status = 'PAID';
    order.lastAttemptOutcome = 'SUCCESS';
    saveSharedOrder(order);
    reconcileCartAfterPaid(
      order.source,
      order.items.map((i) => i.lineId),
      onCartPaid
    );
  } else if (result.outcome === 'FAILED') {
    order.status = 'PAYMENT_FAILED';
    order.lastAttemptOutcome = 'FAILED';
    saveSharedOrder(order);
  } else {
    order.status = 'PENDING';
    order.lastAttemptOutcome = 'TIMEOUT';
    saveSharedOrder(order);
  }

  return order;
}

/**
 * Kiểm tra lại / Replay kết quả cho lượt bị TIMEOUT (chưa rõ kết quả)
 * - Không tạo lượt thanh toán mới (attemptCount giữ nguyên).
 */
export async function replayTimeoutOrderCheck(params: {
  orderId: string;
  resolvedOutcome: 'PAID' | 'PAYMENT_FAILED';
  onCartPaid?: (lineIds: string[]) => void;
}): Promise<DemoOrderRecord> {
  const { orderId, resolvedOutcome, onCartPaid } = params;
  const order = getSharedOrderById(orderId);
  if (!order) {
    throw new Error('Không tìm thấy đơn hàng.');
  }

  await new Promise((r) => setTimeout(r, 500));

  order.status = resolvedOutcome;
  order.lastAttemptOutcome = resolvedOutcome === 'PAID' ? 'SUCCESS' : 'FAILED';
  saveSharedOrder(order);

  if (resolvedOutcome === 'PAID') {
    reconcileCartAfterPaid(
      order.source,
      order.items.map((i) => i.lineId),
      onCartPaid
    );
  }

  return order;
}