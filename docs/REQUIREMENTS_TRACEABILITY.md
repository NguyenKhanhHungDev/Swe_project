# BrewLite — Truy vết 10 Task của giảng viên với 24 bước triển khai

**Nguồn chính:** Đề `BrewLite-CongNghePhanMem.pdf`, mục Product Backlog 10 Task.
**Quy tắc:** 10 Task là **yêu cầu chấm điểm**, 24 bước là **quy trình thực hiện nội bộ**. Hai hệ thống không thay thế nhau.

| Task | Yêu cầu tối thiểu từ đề | Chủ trì | Các bước liên quan | Minh chứng cần có |
|---|---|---|---|---|
| 1 | Next.js + NestJS, chạy Hello, README, Git, env example | Hưng | 7, 8, 21 | Repo, lệnh chạy, ảnh Hello, README |
| 2 | `GET /products` trả menu JSON gồm id, tên, giá, ảnh | Hưng | 13, 16, 17, 19–20 | API response, test, PR |
| 3 | Trang Menu Next.js gọi API, có loading và empty state | Hưng | 10, 15, 20 | UI, bằng chứng gọi API, test |
| 4 | Chi tiết sản phẩm chọn size S/M/L, topping, tính giá | Hưng | 9–15, 19–20 | UI, cách tính và test các trường hợp |
| 5 | Giỏ hàng thêm/sửa/xóa, tổng tiền, badge, state | Huy | 10–15, 19–20 | Cart state, UI, test |
| 6 | `POST /orders` validate, lưu `PENDING`, trả mã đơn | Phát (Khoa phối hợp kho) | 9, 12–14, 16–20 | API, kiểm tra DB, test |
| 7 | Register/login, bcrypt, JWT, guard bảo vệ đặt đơn | Khoa | 13–16, 19–20 | API, thử token/guard, test |
| 8 | Mock payment Ví/Thẻ; thành công `PAID`, lỗi `PAYMENT_FAILED` | Thắng | 12–14, 16–20 | API, trạng thái DB và test |
| 9 | Xác nhận, `GET /orders/me`, Compose đủ 3 dịch vụ, README, demo E2E | Phát (history), Thắng (confirmation), Hưng (Docker/demo) | 15–17, 20–24 | UI/API, docker compose, demo, README |
| 10 | State Machine; idempotency; kiểm soát tồn kho đồng thời; promotions/loyalty | Phát, Thắng, Khoa, Huy theo module; Hưng tích hợp | 9, 12–20 | Sơ đồ máy trạng thái, concurrency/idempotency tests, luồng E2E |

## 24 bước vẫn phải có đủ

1. Scope
2. SRS / Requirements
3. User Stories
4. Acceptance Criteria
5. Business Rules
6. Use Case
7. Project Setup
8. Architecture
9. Preliminary ERD
10. Figma / User Flow
11. Activity Diagram
12. Detailed ERD
13. API Specification
14. Sequence Diagram
15. Frontend
16. Backend
17. Database
18. State Machine / nghiệp vụ nâng cao
19. Unit Testing
20. Integration / E2E Testing
21. Docker Packaging
22. Deployment Diagram
23. Demo
24. Final Documentation

## Scrum xuyên suốt

- Lưu Product Backlog, Sprint Backlog, Increment.
- Ghi Sprint Planning, Daily Scrum, Sprint Review, Retrospective.
- Có minh chứng Definition of Done và bàn giao.
- Gợi ý phân sprint theo đề: Sprint 1 (Task 1–4), Sprint 2 (Task 5–7), Sprint 3 (Task 8–10). Đây là gợi ý, không bắt buộc nhóm phải hoàn thành tuần tự từng Task mới bắt đầu Task khác.

## Theo dõi trạng thái

Thêm Issue/PR/test link và trạng thái `TODO / IN_PROGRESS / REVIEW / DONE` cho từng Task khi triển khai. **Không tự đánh dấu DONE từ bảng kế hoạch này.**

## Những yêu cầu ngoài 10 Task

Mọi mở rộng như ADMIN, dashboard quản trị, giao hàng hoặc thanh toán thật phải được phân loại là **ngoài phạm vi** trừ khi được thầy/nhóm duyệt. Quyền STAFF và các quy tắc bổ sung theo Architecture cần được ghi là quyết định thiết kế của nhóm, không tự coi là yêu cầu nguyên văn của đề.
