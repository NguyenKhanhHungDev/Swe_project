# API Specification — Inventory Management Module

## 1. Quy tắc phân quyền Tồn kho (RBAC)
- **Quyền hạn:** Chỉ các tài khoản mang vai trò `ADMIN` hoặc `STAFF` mới được phép thao tác xem và cập nhật kho nguyên liệu.
- **Kiểm soát truy cập:** Khách hàng (`CUSTOMER`) khi cố gắng gọi vào các endpoint này sẽ bị từ chối truy cập và nhận mã lỗi `403 Forbidden`.

---

## 2. Danh sách Endpoints

### 2.1. `GET /inventory` — Xem danh sách tồn kho
- **Mô tả:** Lấy danh sách tồn kho nguyên liệu/sản phẩm, hỗ trợ phân trang và tìm kiếm theo tên.
- **Headers:** `Authorization: Bearer <accessToken>` (Yêu cầu role: `ADMIN`, `STAFF`)
- **Query Parameters:** 
  - `page` (number, optional): Số trang (mặc định: 1)
  - `limit` (number, optional): Số lượng item mỗi trang (mặc định: 10)
  - `search` (string, optional): Từ khóa tìm kiếm theo tên nguyên liệu
- **Responses:**
  - `200 OK`: Trả về danh sách tồn kho thành công.
  - `401 Unauthorized`: Chưa đăng nhập hoặc token không hợp lệ.
  - `403 Forbidden`: Không đủ quyền hạn truy cập (Tài khoản có role `CUSTOMER`).

---

### 2.2. `PATCH /inventory/:id` — Cập nhật số lượng tồn kho
- **Mô tả:** Điều chỉnh số lượng tồn kho của một nguyên liệu cụ thể (hỗ trợ tăng, giảm hoặc gán giá trị mới).
- **Headers:** `Authorization: Bearer <accessToken>` (Yêu cầu role: `ADMIN`, `STAFF`)
- **Path Parameters:** `id` (UUID của mặt hàng trong kho)
- **Request Body (JSON):**
```json
{
  "quantity": 45.0,
  "action": "SET",
  "note": "Kiểm kê kho định kỳ tháng 10"
}