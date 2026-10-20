# Kết quả kiểm tra — Checkout & Payments

- Người thực hiện: Thắng
- Ngày: 14–17/10/2026
- Nhánh/commit: `feat/checkout-payments-ui-scaffold`
- PR: Điền link PR sau khi push
- Phạm vi: UI mock / scaffold

## Cách chạy
- Lệnh: `npm --prefix frontend run dev -- --port 3000`
- URL: `http://localhost:3000/checkout` và `http://localhost:3000/checkout/result/<orderId>`
- Dữ liệu/chế độ demo: Sử dụng thanh công cụ Demo tích hợp trên trang `/checkout` để nạp mẫu `BUY_NOW`, `CART`, giả lập chưa đăng nhập và chọn 3 kịch bản (`SUCCESS`, `FAIL_CONFIRMED`, `TIMEOUT_UNKNOWN`).

## Kịch bản
| Mã | Thao tác | Mong đợi | Kết quả thực tế | PASS/FAIL |
| --- | --- | --- | --- | --- |
| PAY-01 | Mở `/checkout` khi chưa có draft | Hiện thông báo chưa có món và nút quay lại `/`, `/cart`; không tự tạo đơn rỗng | Đúng thông báo, không có đơn mới được tạo | PASS |
| PAY-02 | Nạp mẫu `BUY_NOW` -> Thanh toán `SUCCESS` | Đơn chuyển sang `PAID`, giỏ hàng hiện có được giữ nguyên | Đơn `PAID`, giỏ hàng không bị xóa | PASS |
| PAY-03 | Nạp mẫu `CART` -> Thanh toán `SUCCESS` | Đơn chuyển sang `PAID`, chỉ xóa các dòng trong snapshot đã xác nhận | Đúng snapshot và xử lý đúng giỏ | PASS |
| PAY-04 | Chọn kịch bản `FAIL_CONFIRMED` -> Bấm Retry | Đơn hiện `PAYMENT_FAILED`, bấm Retry dùng cùng `orderId`, `expiresAt` không bị gia hạn | Cùng `orderId`, `attemptCount` tăng, hạn 15p giữ nguyên | PASS |
| PAY-05 | Chọn kịch bản `TIMEOUT_UNKNOWN` -> Bấm Replay | Hiện trạng thái chưa rõ kết quả, bấm đồng bộ không tăng `attemptCount` | Cập nhật đúng `PAID`/`PAYMENT_FAILED` | PASS |
| PAY-06 | Bỏ chọn "Đã đăng nhập" -> Bấm thanh toán | Chuyển hướng sang `/login?redirect=/checkout`, draft vẫn còn trong `sessionStorage` | Draft được giữ nguyên khi quay lại | PASS |

## Lint/build và kiểm tra bộ khung
- Lệnh đã chạy:
  - `npm --prefix frontend run lint`
  - `npm --prefix frontend run build`
  - `npm --prefix backend run build`
- Kết quả: Đạt (PASS)
- Lỗi và cách xử lý nếu có: Không có

## Bàn giao
- File/type/thao tác dùng từ module khác: Selection từ Products (Hưng), Cart snapshot từ Cart (Huy), Order store từ Orders (Phát), Session từ Auth (Khoa).
- File/type/thao tác cung cấp: `checkout-draft.ts`, `CheckoutProvider`, `confirmAndPayDraft`, `retryOrderPayment`, `replayTimeoutOrderCheck`.
- Người review: Hưng, Huy, Phát, Khoa.