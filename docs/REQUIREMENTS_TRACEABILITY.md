# BrewLite — Requirements → Design → Code → Test

Cập nhật 20/10/2026. A1 theo PDF local mục 8–12 đã đọc; A2 theo yêu cầu người dùng, chờ PDF gốc. Mã US là mã hiện có trong [User Stories](USER_STORIES.md); [AC](ACCEPTANCE_CRITERIA.md) dùng cùng section US, chưa tự tạo mã AC mới.

Bảng nêu source/design/code/test cụ thể để tìm evidence; dấu TODO nghĩa chưa có, không phải file giả. Link Issue/PR mới: PENDING, xem [backlog](scrum/backlog.md).

| Requirement | Design/AC | Code hiện có hoặc cần làm | Test/evidence và nghiệm thu |
|---|---|---|---|
| A1-01 | README, Architecture; A2-4.1 | apps/web/src/app/page.tsx; apps/api/src/app.controller.ts; Compose db | apps/api/src/app.controller.spec.ts; apps/api/test/app.e2e-spec.ts; PR #17; chưa owner acceptance |
| A1-02 / US-PROD-01 | [Products](api/products.md), AC US-PROD-01 | ProductsModule rỗng; controller/service TODO | Products contract/API tests TODO |
| A1-03 / US-PROD-01 | [Menu notes](ui/menu-notes.md), AC cùng US | Menu UI TODO | Loading/empty/error/API integration E2E TODO |
| A1-04 / US-PROD-02/03 | Products, AC cùng US, [ERD](ERD_DETAILED.md) | Options/Pricing API và detail UI TODO | Size S/M/L, topping, giá/hết hàng tests TODO |
| A1-05 / US-CART-01/02 | [Cart](api/cart.md), AC cùng US | Cart browser state/UI TODO | Thêm/sửa/xóa/gộp/badge/persistence tests TODO |
| A1-06 / US-ORDER-01 | [Orders draft](api/orders.md), UC-09, Inventory contract | Orders/transaction/reserve TODO | Validate/rollback/replay/DB tests TODO |
| A1-07 / US-AUTH-01/02 | SRS UC-01/02/03, AC; Auth spec thiếu | Auth/JWT/Prisma TODO | Bcrypt/guards/ownership/session tests TODO |
| A1-08 / US-PAY-01 | [Payment draft](api/payment-contract.md), UC-10/11, AC | Mock WALLET/CARD TODO | Success/fail/key/retry tests TODO |
| A1-09 / US-HISTORY-01, US-PAY-02 | UC-11/12, AC; A2-5.4 | History GET /orders/me, confirmation và Compose 3 services TODO | Demo/history ownership/deploy tests TODO |
| A1-10 / US-ORDER-02, US-STOCK-01, US-PROMO-01, US-LOYALTY-01 | [Transitions](requirements/order-state-transitions.md), [Inventory](api/inventory-contract.md), [Promotion/Loyalty](api/promotions-loyalty.md) | State Machine/key/concurrency/promo/loyalty TODO | Bắt buộc test chuyển sai, lặp key chỉ một đơn, concurrent không oversell; tất cả TODO |

## A2 và evidence theo gate

| Requirement | Design/sản phẩm | Code/test hoặc evidence cần có | Trạng thái nghiệm thu |
|---|---|---|---|
| [A2-1.1](backlog/A2-1.1.md) | docs/PROJECT_CONTEXT.md; docs/PROJECT_SCOPE.md | Bối cảnh, stakeholders, trong/ngoài phạm vi nhất quán hai assignment và có xác nhận review; không suy ra đã duyệt từ file. | Chưa nghiệm thu; REVIEW draft |
| [A2-1.2](backlog/A2-1.2.md) | docs/SRS.md; docs/USER_STORIES.md; docs/ACCEPTANCE_CRITERIA.md; docs/BUSINESS_RULES.md | FR/NFR truy vết rõ, MoSCoW có nguồn/nhóm duyệt, AC kiểm chứng được; xử lý xung đột timer và các PD liên quan. | Chưa nghiệm thu; REVIEW tài liệu; thiếu MoSCoW/phê duyệt |
| [A2-1.3](backlog/A2-1.3.md) | docs/USE_CASES.md; docs/requirements/order-state-transitions.md | Actor, tiền/hậu điều kiện, happy/alternative/error flows Checkout và trace US/AC đầy đủ; owner review, không đặt timer ngoài đề. | Chưa nghiệm thu; REVIEW nguồn UC; Checkout tổng thể chưa chốt |
| [A2-2.1](backlog/A2-2.1.md) | Activity Checkout source trong docs/diagrams; trace AC | Luồng chính/nhánh lỗi khớp Use Case Checkout đã duyệt; source và bản render được Git quản lý, review thật. | Chưa nghiệm thu; BLOCKED gate Task 1; thiếu source Activity local |
| [A2-2.2](backlog/A2-2.2.md) | docs/diagrams/sequence; docs/diagrams/README.md | Next.js/NestJS/services/DB và nhánh failure/retry/idempotency/transaction nhất quán; xử lý PD-05–09; review/render nguồn. | Chưa nghiệm thu; BLOCKED gate Task 1; có Sequence draft mâu thuẫn |
| [A2-2.3](backlog/A2-2.3.md) | Domain Class source/render trong docs/diagrams; ERD đối chiếu | Lớp, thuộc tính, quan hệ/multiplicity và trách nhiệm domain khớp requirements; ERD không thay Class Diagram; có review. | Chưa nghiệm thu; BLOCKED gate Task 1; chưa có Class Diagram |
| [A2-3.1](backlog/A2-3.1.md) | docs/ARCHITECTURE.md; ADR trong docs; truy vết | Kiến trúc Next → Nest → PostgreSQL, ranh giới module/transaction; ADR ghi context, quyết định, hệ quả có review. | Chưa nghiệm thu; BLOCKED gate Task 2; Architecture draft, thiếu ADR riêng |
| [A2-3.2](backlog/A2-3.2.md) | Deployment source/render trong docs/diagrams; deployment checklist | Topology web/api/DB, network/HTTPS/secrets/health/rollback rõ; không giả URL triển khai; review design. | Chưa nghiệm thu; BLOCKED gate Task 2; chưa có Deployment Diagram |
| [A2-4.1](backlog/A2-4.1.md) | apps/web; apps/api; docs; README.md; .gitignore; .env.example; Working Agreement | Monorepo, setup, branch/Issue/PR/review và DoD rõ; vai trò/rules được nhóm chốt; chưa nghiệm thu sớm chỉ vì scaffold đã có. | Chưa nghiệm thu; BLOCKED nghiệm thu gate Task 3; có scaffold/hồ sơ Buổi 1 |
| [A2-4.2](backlog/A2-4.2.md) | docs/REQUIREMENTS_TRACEABILITY.md; Git docs/diagrams; Issues/PR links | Requirements → Design → Code → Test có ID, owner/evidence thật; Markdown/source diagram quản lý Git, links đúng, lịch sử được giữ. | Chưa nghiệm thu; BLOCKED nghiệm thu gate Task 3; traceability đang review |
| [A2-4.3](backlog/A2-4.3.md) | Products API; Menu UI; docs/ui/menu-notes.md; tests | Menu tích hợp API thật, loading/empty/error, mobile-first theo AC; test/PR và review thật. | Chưa nghiệm thu; BLOCKED gate Task 3; chưa có Menu nghiệp vụ |
| [A2-4.4](backlog/A2-4.4.md) | GitHub Actions CI config; run links của commit | Cài lockfile, lint/build/test cần thiết chạy trong CI; chứng minh trên commit/PR; không báo local checks là CI. | Chưa nghiệm thu; BLOCKED gate Task 3; chưa có CI workflow |
| [A2-5.1](backlog/A2-5.1.md) | MVP code; hợp đồng; demo path; README | Luồng menu → tùy chọn → giỏ → JWT → đơn → payment → xác nhận/history; State Machine/idempotency/concurrency/promo/loyalty theo AC. | Chưa nghiệm thu; BLOCKED gate Task 4; chưa có nghiệp vụ |
| [A2-5.2](backlog/A2-5.2.md) | Unit/integration/DB/concurrency/Playwright E2E; evidence report | Test tích hợp success/failure và ba tiêu chí A1-10; regression, NFR và ma trận trình duyệt có phương pháp/kết quả thật; không bịa metrics. | Chưa nghiệm thu; BLOCKED gate Task 4; Hello tests chưa đủ |
| [A2-5.3](backlog/A2-5.3.md) | CD workflow; release/deploy runbook; secret/environment config | Deploy chỉ sau required checks; host/secret/quyền được duyệt; artifacts/version/rollback có evidence; không deploy ở Buổi 1. | Chưa nghiệm thu; BLOCKED gate Task 4/host; chưa có CD |
| [A2-5.4](backlog/A2-5.4.md) | Deployment URL thật; HTTPS/private DB; health; README/demo; handover/rollback | Môi trường thật hoạt động, kiểm thử hậu deploy và rollback có evidence; bàn giao tài khoản an toàn, tài liệu, demo và Review/Retro thật. | Chưa nghiệm thu; BLOCKED gate Task 4/host; chưa có production |

Các đường dẫn chưa tồn tại trong cột sản phẩm là kế hoạch. ERD không thay Class Diagram; Sequence cũ không chứng minh UML đã được duyệt; Hello tests không chứng minh Menu/Orders/Payment chạy. Chưa có production URL, CI/CD run hoặc phê duyệt A2 gate. Owner/reviewer/dependencies/DoD chi tiết ở mỗi hồ sơ backlog, không duy trì roadmap cạnh tranh.
