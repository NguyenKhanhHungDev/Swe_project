# Bàn giao Module Checkout & Payments (Thắng)

## 1. Hợp đồng dữ liệu (`frontend/src/lib/contracts/checkout-draft.ts`)
- `CheckoutDraft` phân biệt rõ `source: 'BUY_NOW' | 'CART'`.
- **Hưng (Products):** Khi khách bấm "Mua ngay", gọi `setBuyNowDraft(draft)` từ `useCheckout()` rồi điều hướng `router.push('/checkout')`. Giỏ hàng của Huy được giữ nguyên.
- **Huy (Cart):** Khi khách bấm "Thanh toán" từ giỏ, tạo snapshot toàn bộ giỏ hàng, gọi `setCartSnapshotDraft(draft)` rồi chuyển sang `/checkout`.

## 2. Phối hợp xử lý Giỏ hàng sau khi `PAID` (với Huy)
- Hàm `reconcileCartAfterPaid(source, confirmedLineIds, onCartPaid)` trong `checkout-actions.ts`:
  - Nếu `source === 'BUY_NOW'`: Không can thiệp vào giỏ hàng.
  - Nếu `source === 'CART'` và kết quả `PAID`: Chỉ xóa các dòng có `lineId` nằm trong `confirmedLineIds` của snapshot đã xác nhận; giữ nguyên các món được thêm/sửa ngoài lượt mua.

## 3. Phối hợp Store Đơn hàng dùng chung (với Phát)
- Không tạo danh sách lịch sử đơn riêng lẻ.
- Đơn tạo từ `confirmAndPayDraft()` lưu chung qua key `brewlite_demo_orders` (hoặc import trực tiếp hàm create/read/update từ `features/orders/mocks/orders.mock.ts` của Phát khi ghép).
- Trang `/checkout/result/[orderId]` liên kết trực tiếp sang `/orders/[orderId]` và `/orders` bằng cùng `orderId`.

## 4. Cơ chế Retry vs Timeout Replay
- **Thất bại xác nhận (`PAYMENT_FAILED`):** Gọi `retryOrderPayment()` tạo lượt thanh toán mới (`attemptCount + 1`) trên cùng `orderId`, **không** gia hạn thêm 15 phút (`expiresAt` giữ nguyên).
- **Chưa rõ kết quả (`TIMEOUT`):** Đơn giữ trạng thái `PENDING` kèm cờ `lastAttemptOutcome = 'TIMEOUT'`. Dùng `replayTimeoutOrderCheck()` để đồng bộ lại kết quả lượt cũ mà không tạo giao dịch thu tiền mới.