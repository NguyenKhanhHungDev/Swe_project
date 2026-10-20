export type PurchaseSource = 'BUY_NOW' | 'CART';

export interface DraftToppingSelection {
  toppingId: string;
  name: string;
  price: number;
  quantity: number; // 0 - 3
}

export interface DraftItemSelection {
  lineId: string; // Dùng để đối chiếu xóa/giữ giỏ hàng sau khi PAID
  productId: string;
  productName: string;
  size: 'S' | 'M' | 'L';
  basePrice: number;
  toppings: DraftToppingSelection[];
  quantity: number; // 1 - 99
  unitPrice: number;
  lineTotal: number;
}

export interface CheckoutDraft {
  draftId: string;
  source: PurchaseSource;
  items: DraftItemSelection[];
  subtotal: number;
  promoCode?: string | null;
  discountAmount: number;
  totalAmount: number;
  createdAt: string; // ISO string
  cartSnapshotVersion?: string; // Dành cho luồng từ giỏ (CART)
}