# BrewLite — Orders API Specification

**DRAFT — Pending owner review.** Owner: Phát. Nguồn cũ 14/10; rà Buổi 1 ngày 20/10/2026.

Tài liệu đặc tả API phân hệ Đơn hàng (Orders), tuân thủ [Quy chuẩn API chung](API_CONVENTIONS.md), [Business Rules](../BUSINESS_RULES.md) (BR-02, BR-04, BR-07, BR-11, BR-12, BR-13, BR-14, BR-18, BR-20, BR-28 đến BR-34), [Detailed ERD](../ERD_DETAILED.md) (mục 3.5, 3.6, 3.7) và [Architecture](../ARCHITECTURE.md).

## Điểm phải chốt trước triển khai

Bảng và JSON bên dưới được giữ từ bản owner cũ, chưa phải contract được duyệt. A1 bắt buộc GET /orders/me, chỉ mock WALLET/CARD; ADMIN/COD không có căn cứ phạm vi. Không dùng GET /orders thay lịch sử của đề nếu chưa sửa có review. quantity/toppingIds đang khác qty/toppings.quantity của Cart; thiếu số phần topping. Header chống lặp và fingerprint phải chốt với Khoa/Thắng. Nội dung JSON bị thiếu dấu đóng fence đã được sửa, chưa đổi DTO thay owner.

Không mặc định timer 15 phút. Xem [State/Checkout checklist](../requirements/order-state-transitions.md), [Inventory contract](inventory-contract.md), [Payment contract](payment-contract.md) và [PD-05–09](../scrum/team-working-agreement.md#pending-decisions). Chưa có API Orders triển khai.

---

## 1. Phạm vi và Nguyên tắc tích hợp

| API ID | Method & Path | Tên / Mục đích | Vai trò truy cập |
|---|---|---|---|
| ORD-01 | `POST /orders` | Tạo đơn hàng mới từ giỏ hàng hoặc mua ngay | Khách hàng đăng nhập (`CUSTOMER`) |
| ORD-02 | `GET /orders` | Lấy danh sách lịch sử đơn hàng | `CUSTOMER` (chỉ xem đơn của mình), `STAFF`, `ADMIN` |
| ORD-03 | `GET /orders/:id` | Xem chi tiết thông tin một đơn hàng | `CUSTOMER` (chủ sở hữu đơn), `STAFF`, `ADMIN` |
| ORD-04 | `PATCH /orders/:id/status` | Cập nhật tiến trình đơn theo State Machine | `STAFF`, `ADMIN`, Internal System Service |
| ORD-05 | `POST /orders/:id/cancel` | Hủy đơn hàng và kích hoạt hoàn tài nguyên | `CUSTOMER` (khi PENDING/PAYMENT_FAILED), `STAFF` (khi PAID) |

### Nguyên tắc liên module
- **Điểm tạo đơn duy nhất:** Đơn hàng chỉ được tạo tại `POST /orders`. Dù thanh toán COD hay chuyển khoản/ví điện tử (Payment Attempt của Thắng), đơn hàng đều bắt đầu ở trạng thái `PENDING`.
- **Giữ tồn kho và Concurrency (Khoa ↔ Phát):** Khi gọi `POST /orders`, hệ thống thực hiện kiểm tra tồn khả dụng và tạo bản ghi `INVENTORY_RESERVATION` cùng với tạo `ORDER` trong cùng một Database Transaction với kiểm soát version (`optimistic locking`).
- **Idempotency Key (Thắng ↔ Phát):** Header `Idempotency-Key` (hoặc `create_idempotency_key`) được gắn với `user_id` và mã băm `request_fingerprint` (SHA-256). Gửi lại request trùng khóa và nội dung sẽ trả về đúng đơn hàng đã tạo trước đó mà không trừ kho lần hai (BR-20).

---

## 2. Chi tiết Endpoints

### 2.1. ORD-01: Tạo đơn hàng (`POST /orders`)

- **URL:** `/orders`
- **Method:** `POST`
- **Auth:** Bearer Token (Bắt buộc đăng nhập - BR-13)
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
  - `Idempotency-Key: <UUID>`

#### Request Body:
```json
{
  "promotionCode": "DISCOUNT10",
  "items": [
    {
      "productId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      "sizeCode": "M",
      "quantity": 2,
      "toppingIds": [
        "c81d4e2e-bcf2-11e6-869b-7df92533d2db"
      ]
    }
  ]
}

```
