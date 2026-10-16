# API Specification — Auth, Users & RBAC Module

## 1. Tổng quan xác thực & phân quyền
- **Cơ chế xác thực:** Sử dụng JWT (JSON Web Token) bao gồm:
  - **Access Token:** Thời hạn ngắn, truyền qua Header theo định dạng `Authorization: Bearer <token>`.
  - **Refresh Token:** Dùng để cấp lại Access Token khi hết hạn.
- **Phân quyền (RBAC):** Hệ thống định nghĩa 3 vai trò chính: `CUSTOMER`, `STAFF`, `ADMIN`. Việc phân quyền được kiểm tra tự động thông qua NestJS Guards (`JwtAuthGuard`, `RolesGuard`).

---

## 2. Danh sách Endpoints

### 2.1. `POST /auth/register` — Đăng ký tài khoản
- **Mô tả:** Cho phép khách hàng mới đăng ký tài khoản (mặc định vai trò là `CUSTOMER`).
- **Validation Rules:**
  - `email`: Bắt buộc, đúng định dạng email, độc lập (không trùng lặp).
  - `password`: Bắt buộc, tối thiểu 8 ký tự, bao gồm cả chữ và số.
  - `fullName`: Bắt buộc, từ 2 đến 100 ký tự.
- **Request Body (JSON):**
```json
{
  "email": "khachhang@example.com",
  "password": "Password123",
  "fullName": "Nguyễn Văn A",
  "phone": "0901234567"
}

### 2.2. `POST /auth/login` — Đăng nhập hệ thống
- **Mô tả:** Xác thực thông tin tài khoản của người dùng và cấp phát cặp token (`Access Token` & `Refresh Token`).
- **Validation Rules:**
  - `email`: Bắt buộc, phải đúng định dạng email đã đăng ký.
  - `password`: Bắt buộc, đúng mật khẩu của tài khoản.
- **Request Body (JSON):**
```json
{
  "email": "khachhang@example.com",
  "password": "Password123"
}
**Responses:

200 OK: Đăng nhập thành công, trả về tokens và thông tin cơ bản của user.

401 Unauthorized: Sai thông tin đăng nhập (sai email hoặc mật khẩu không khớp).

400 Bad Request: Thiếu dữ liệu hoặc sai định dạng trường gửi lên.

### 2.3. `GET /users/me` — Xem thông tin cá nhân
- **Mô tả:** Trả về thông tin chi tiết của người dùng hiện đang đăng nhập dựa trên JWT token được cung cấp trong Header.
- **Headers:** 
  - `Authorization: Bearer <accessToken>` (Bắt buộc)
- **Responses:**
  - `200 OK`: Trả về thông tin hồ sơ cá nhân thành công (không bao gồm mật khẩu).
  - `401 Unauthorized`: Chưa đăng nhập hoặc token không hợp lệ / đã hết hạn.

---

### 2.4. `PATCH /users/me` — Cập nhật hồ sơ cá nhân
- **Mô tả:** Cho phép người dùng chỉnh sửa thông tin cá nhân của chính mình (như họ tên, số điện thoại).
- **Headers:** 
  - `Authorization: Bearer <accessToken>` (Bắt buộc)
- **Request Body (JSON):**
```json
{
  "fullName": "Nguyễn Văn A Updated",
  "phone": "0909999999"
}
***Validation Rules:

fullName: Từ 2 đến 100 ký tự (nếu có cập nhật).

phone: Đúng định dạng số điện thoại Việt Nam (nếu có cập nhật).

***Responses:

200 OK: Cập nhật thông tin thành công, trả về dữ liệu mới.

400 Bad Request: Dữ liệu gửi lên không đúng định dạng.

401 Unauthorized: Chưa đăng nhập hoặc token hết hạn.