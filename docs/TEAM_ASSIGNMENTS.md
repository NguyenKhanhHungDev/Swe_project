# BrewLite — Phân công hiện hành

Phân công theo yêu cầu Hưng ngày 20/10/2026; rà hồ sơ Buổi 1 ngày 21/10/2026, không đổi owner. Phân công dưới đây là cơ sở chuẩn bị Buổi 1; chưa thay thế xác nhận nhận bàn giao của từng người. Vai trò Scrum: PENDING.

| Chủ sở hữu chính | Phạm vi | Phối hợp/review | Đầu ra bàn giao | Điều kiện hoàn thành | Phụ thuộc |
|---|---|---|---|---|---|
| Hưng | Tài liệu, monorepo, API conventions, kiến trúc, Products/Options/Pricing, traceability, tích hợp, PR, bàn giao | Các chủ module | Scope/SRS, API Products, ADR dự kiến, ma trận truy vết, PR tích hợp | AC đúng, tài liệu/code/test phù hợp, review và minh chứng | Requirements được duyệt; Inventory/Auth của Khoa; contracts liên module |
| Khoa | Prisma/schema/migration, Auth/JWT, Inventory/concurrency, Class Diagram, DB tests | Phát (Orders), Thắng (Payment), Hưng (ERD/API) | Schema/migration/seed và PrismaService dự kiến, Auth, hợp đồng kho, Class, DB/concurrency tests | Review schema/constraints, auth và chống oversell có test thật; không migration phá hủy | ERD/requirements duyệt, contract Orders–Inventory |
| Huy | Menu UI, Cart, Checkout UI, Promotion/Loyalty, Activity Checkout, Playwright E2E, Daily/Burndown | Hưng (Products), Phát (Use Case/Orders), Thắng (Payment) | UI mobile-first, state giỏ, promo/loyalty, Activity, E2E và bản ghi Scrum thật | Loading/empty/error và AC được kiểm chứng; Burndown dùng số liệu thật | Products/Orders/Payments/Auth contracts; link Figma còn Pending |
| Phát | PO đề xuất; Checkout Use Case/Sequence, Orders/History/State Machine, quản lý A1 Issues, nghiệp vụ/demo | Khoa (kho), Thắng (payment), Huy (UI), Hưng (tích hợp) | Use Case, Sequence, API Orders/history, State Machine, backlog A1, demo | Chặn chuyển sai, quyền sở hữu, rollback/idempotency có test và review | Inventory transaction interface, JWT, Payment contract; A2 gate |
| Thắng | Payment mock/idempotency, Docker, CI/CD, hosting, Deployment Diagram, health/NFR, rollback | Phát/Khoa/Huy; Hưng review kiến trúc | Payment contract/module, deployment design, Compose 3 dịch vụ, CI/CD và runbook ở giai đoạn tương ứng | Chống tác động trùng có test, triển khai có bằng chứng/HTTPS/rollback; không dùng URL giả | Order/payment enums và transaction; chọn host/deadline thật; A2 gate |

## Ranh giới phối hợp

- Hưng sở hữu Products API/pricing; Huy sở hữu Menu, Cart và Checkout UI. Hai người review dữ liệu/giá cùng nhau.
- Khoa sở hữu Prisma/schema/migration/PrismaService và Inventory. Hưng review ERD/kiến trúc; Phát cung cấp quy tắc Orders, không tự tích hợp schema thay Khoa.
- Phát sở hữu Orders/History/State Machine và điều phối A1-10; Thắng sở hữu Payment backend, Huy UI/loyalty, Khoa concurrency, Hưng tích hợp.
- Phát quản lý backlog A1; owner triển khai từng task được ghi ở [Roadmap](PROJECT_ROADMAP.md) và [Backlog](scrum/backlog.md).
- Chủ module viết test phần mình; Huy phụ trách Playwright E2E, Thắng CI/CD/hosting. Hưng không nhận thay các phần việc này.
- Figma chưa có link đã xác minh; giữ thiết kế đã có, từng owner review màn hình mình. Không tự tuyên bố thiết kế hoàn thành.

## Buổi 1: hồ sơ chờ review

| Người | Hồ sơ kiểm tra/chốt | Xác nhận |
|---|---|---|
| Hưng | Roadmap, phân công, conventions, traceability, đối chiếu hai đề và PR tài liệu | Đã có hồ sơ; PENDING phản hồi/review khác tác giả |
| Khoa | [Inventory contract](api/inventory-contract.md), Detailed ERD Product/Order/Inventory | PENDING |
| Huy | [Menu notes](ui/menu-notes.md), US/AC Menu/Cart/Promotion | PENDING |
| Phát | [Order transitions và Checkout checklist](requirements/order-state-transitions.md), A1 backlog | PENDING |
| Thắng | [Payment contract](api/payment-contract.md), deployment checklist | PENDING |

Definition of Done và các vai trò đề xuất ở [Working Agreement](scrum/team-working-agreement.md). Không suy đoán phần trăm đóng góp; không xác nhận thay thành viên. Nhánh từ main, review PR, không tự merge. Mọi thay đổi contract/schema cần chủ liên quan review trước triển khai.

## Ranh giới kết thúc Buổi 1

- Hưng: đã chuẩn bị kiểm kê main/GitHub, bộ 26 backlog theo hai đề, Working Agreement/PD, handoff và [review request](scrum/day1-review-request.md). “Đã chuẩn bị” không thay chữ ký/acceptance của Hưng hoặc người khác.
- Khoa: review Inventory/ERD/transaction interface; Huy: review Menu/Cart/Products DTO/giá; Phát: review A1 priorities/Orders/state/dependencies; Thắng: review Payment/key/retry và yêu cầu vận hành sau này. Tất cả **PENDING xác nhận**, không bắt triển khai module để đóng Buổi 1.
- Mỗi owner phản hồi APPROVED, CHANGES_REQUESTED hoặc BLOCKED kèm file/điểm cần sửa, người phối hợp và bằng chứng. Hưng thu nhận và cập nhật quyết định, không trả lời thay thành viên.
- Prisma/schema/DB/Inventory do Khoa; Products/pricing Hưng; Orders Phát; Payment Thắng; UI/Promo/Loyalty/E2E theo phân công và Architecture hiện hành. ERD cũ còn dòng giao Phát tích hợp Prisma cần Khoa/Phát/Hưng review, không dùng nó để tự đổi phân công.
- Task A2-1 của Buổi 2, UML, code, database, Docker/CI/CD và production không thuộc kết quả thực hiện Buổi 1. Mọi mốc thực hiện mới chỉ là kế hoạch cho tới khi có Planning và owner nhận việc.
