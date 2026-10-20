# BrewLite — Order transitions và Checkout checklist

**DRAFT — Pending owner review.** Owner: Phát. Review: Khoa (Inventory/DB/Auth), Thắng (Payment), Huy (Checkout/loyalty), Hưng (truy vết).

Nguồn trực tiếp: Assignment 1 VER 1.0 mục 9.1 (đã xem hình PDF trang in 7), mục 8/9/12; [BR-29–34](../BUSINESS_RULES.md), [Use Cases UC-09/10/11/13/15–18](../USE_CASES.md). Đây là bảng văn bản để review, không tạo sơ đồ UML mới trước gate A2.

## Trạng thái và chuyển tiếp

OrderStatus: PENDING, PAYMENT_FAILED, PAID, PREPARING, READY, COMPLETED, CANCELLED. Không thêm EXPIRED. PaymentStatus là enum riêng, mapping còn PD-08.

| Từ | Sang | Sự kiện/điều kiện theo nguồn |
|---|---|---|
| Khởi tạo | PENDING | POST /orders hợp lệ, tạo đơn và reserve nguyên tử |
| PENDING | PAID | Backend xác nhận mock thành công; ghi payment/kho/điểm một lần |
| PENDING | PAYMENT_FAILED | Mock thất bại đã xác nhận |
| PAYMENT_FAILED | PENDING | Bắt đầu retry hợp lệ sau lần fail; key mới, cùng đơn |
| PENDING | CANCELLED | Chủ đơn hủy theo BR-31/UC-13 |
| PAYMENT_FAILED | CANCELLED | Chủ đơn hủy theo BR-31/UC-13 |
| PAID | PREPARING | STAFF nhận pha theo BR-29/UC-15 |
| PAID | CANCELLED | STAFF hủy trước pha; refund mock/hoàn kho/đảo điểm một lần theo BR-32/UC-18 |
| PREPARING | READY | STAFF xác nhận pha xong |
| READY | COMPLETED | STAFF xác nhận giao tại quầy |

Chặn mọi chuyển tiếp ngoài bảng: PENDING → READY/COMPLETED, PAID → PENDING/PAYMENT_FAILED, PREPARING/READY/COMPLETED → CANCELLED và mọi chuyển từ COMPLETED/CANCELLED. Replay hợp lệ trả kết quả cũ là đọc kết quả, không phải chuyển mới. HTTP 409 INVALID_TRANSITION theo AC, Sequence cũ dùng 400/mã khác cần Phát chốt; thiếu quyền vẫn phải từ chối trước tác động.

## Retry/cancel và điểm chưa rõ

Mất mạng chưa biết payment outcome: kiểm tra/gửi lại key cũ, không tự ghi PAYMENT_FAILED. Lỗi đã xác nhận: retry cùng order bằng key mới, không tạo đơn/giữ kho lần nữa. Cancel cạnh tranh Payment phải chỉ một nhánh thắng; refund/release/loyalty reversal không lặp.

**PD-05:** Yêu cầu Buổi 1 hiện tại nói không triển khai timer, trong khi BR/SRS/AC/ERD/Sequence cũ dùng 15 phút. Không mặc định expires_at = now + 15m, không tạo cron/auto-cancel. Phát/Khoa/Thắng phải xác nhận chính sách giữ hàng, điều kiện retry/cancel khi bỏ timer và sửa đồng bộ hồ sơ trước code. Bảng trên không thêm sự kiện timeout. Không tự đặt thời hạn thay thế.

Các điểm cần chốt khác: CUSTOMER/STAFF so với ADMIN cũ; GET /orders/me; DTO qty/toppings; reserve/consume/release; enum payment; key scope/fingerprint; Checkout preview có cần endpoint riêng. Xem [PD-06–10](../scrum/team-working-agreement.md#pending-decisions).

## Checkout Use Case — chuẩn bị Buổi 2 (A2-1.3)

- [ ] Phát chọn/cross-reference UC-09 tạo đơn, UC-10 thanh toán và UC-11 xác nhận thành Use Case Checkout có ranh giới rõ; không sửa/xóa UC của thành viên.
- [ ] Chốt actor/trigger, tiền điều kiện JWT/giỏ hợp lệ, hậu điều kiện success/failure/rollback.
- [ ] Main flow: Menu/Detail → giỏ hoặc mua ngay → xem lại → đăng nhập nếu cần → xác nhận → POST /orders PENDING → chọn Ví/Thẻ → payment → xác nhận/nhận tại quầy.
- [ ] Alternative: mua ngay giữ giỏ; thiếu tồn, giá/mã thay đổi, giỏ rỗng; invalid DTO/token/ownership; failure/retry/timeout/replay/cancel.
- [ ] Giá do backend tính và snapshot, transaction reserve, key và tác động đúng một lần được ánh xạ AC/BR.
- [ ] Khoa/Huy/Thắng review giao diện phối hợp và PD-05–10; lưu quyết định thật.
- [ ] A2 Task 1 được duyệt trước khi nghiệm thu Activity/Sequence/Class của Task 2; các Sequence cũ chỉ là draft tham khảo.

Evidence cần sau: unit/integration chặn chuyển sai, lặp Idempotency-Key chỉ một đơn, concurrency không oversell (A1-10). Chưa có test nghiệp vụ này tại main đã kiểm kê.
