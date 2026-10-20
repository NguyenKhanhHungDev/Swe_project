# API Specification — Module Checkout & Payments

**DRAFT — Pending owner review.** Bản nguồn chưa đầy đủ; xem [Payment contract](payment-contract.md) để review Buổi 1 và [PD-07–09](../scrum/team-working-agreement.md#pending-decisions). Checkout UI do Huy; backend Payment do Thắng. prod_001/size trong ví dụ dưới không khớp UUID/sizeCode của conventions, giỏ ở browser chứ chưa có Cart DB. Không dùng ví dụ này như DTO đã duyệt.

**Người làm:** Thắng
**Người sử dụng:** Hưng (Frontend), Phát (Orders), Huy (Cart/Loyalty)
**Mục đích:** Xử lý xác nhận giỏ hàng, khởi tạo thanh toán giả lập (Mock Payment) và chống xử lý trùng lặp giao dịch.

---

## 1. Xem trước giỏ hàng & tính tiền (Checkout Preview)
**Người làm và người sử dụng:** Thắng làm, Frontend (Hưng) sử dụng
**Method và đường dẫn:** `POST /checkout/preview`
**Header cần có:** `Authorization: Bearer <token>`
**Body hoặc query:** (Gửi snapshot giỏ hàng hiện tại hoặc lấy từ DB của Huy)
```json
{
  "cartItems": [
    { "productId": "prod_001", "size": "M", "qty": 2, "toppings": [] }
  ],
  "promotionCode": "GIAM20K"
}
```
