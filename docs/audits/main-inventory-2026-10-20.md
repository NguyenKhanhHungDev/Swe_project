# BrewLite — Kiểm kê main ngày 20/10/2026

Nguồn: origin/main sau fetch, commit 1cc2bb1 (merge PR #17), working tree ban đầu sạch; nhánh cũ docs/team-working-agreement có cùng nội dung main. Tạo docs/day1-assignment-alignment từ origin/main, không ghi đè thay đổi người dùng. Bảng ghi nhận **main trước thay đổi Buổi 1**, không biến các file mới trên nhánh thành sản phẩm đã có ở main.

Đã đối chiếu nội dung requirements, thiết kế, API, mã nguồn/scaffold, package/scripts và cấu hình. A1 PDF local VER 1.0 đã đọc mục 8–12, xem hình trang in 7; A2 PDF chưa tìm thấy trong repo/thư mục môn học, dùng nội dung người dùng cung cấp ngày 20/10. Không truy cập file cá nhân ngoài phạm vi dự án.

Trạng thái: GIỮ = dùng tiếp; SỬA = có nhưng thiếu/mâu thuẫn; THIẾU = chưa có sản phẩm bắt buộc; CHỜ XÁC MINH = chưa đủ bằng chứng. Không phải trạng thái nghiệm thu.

| Hạng mục | File hiện có | Trạng thái | Việc tiếp theo | Người phụ trách |
|---|---|---|---|---|
| Hướng dẫn chạy | README.md, apps/api/README.md, apps/web/README.md | SỬA | Giữ Linux/Windows/macOS; sửa links monorepo và trục quản lý | Hưng |
| Quy tắc agent | AGENTS.md, apps/web/AGENTS.md, apps/web/CLAUDE.md | SỬA | AGENTS gốc thêm A1/A2; giữ hướng dẫn Next.js do package quản lý | Hưng |
| Scope | docs/PROJECT_SCOPE.md | GIỮ | Có mục tiêu/actors/in-out; review các tham chiếu bộ xử lý hết hạn PD-05 | Hưng/Phát |
| SRS | docs/SRS.md | SỬA | UC-01–18 và NFR đã có; thiếu MoSCoW/FR-NFR IDs rõ và acceptance; timer cũ mâu thuẫn | Hưng/cả nhóm |
| Stories | docs/USER_STORIES.md | GIỮ | Có stories Products/Auth/Cart/Orders/Stock/Payment; không coi file là AC đã đạt | Các owner |
| AC | docs/ACCEPTANCE_CRITERIA.md | SỬA | Có loading/empty/error và test cases; chốt timer, giá, Product.version so ERD Inventory.version | Hưng/Huy/Khoa/Phát |
| Business Rules | docs/BUSINESS_RULES.md | SỬA | BR-16/17/18/25 đang ràng buộc thời hạn; giữ nguồn, gắn PD-05, owner sửa sau chốt | Phát/Khoa/Thắng |
| Use Cases | docs/USE_CASES.md | SỬA | UC chi tiết đã có; Checkout tổng thể cần chốt, timer/permission/retry phải đồng bộ | Phát |
| ERD sơ bộ | docs/ERD_PRELIMINARY.md | SỬA | Có quan hệ; khác Detailed về giá/ID khóa ghép, dùng làm nguồn sơ bộ, không là schema | Khoa/Hưng |
| ERD chi tiết | docs/ERD_DETAILED.md | SỬA | Có Product/Size/Order/Inventory/reservation/payment/refund/ledger và constraints; review expires_at, version, scope key | Khoa/Phát/Thắng/Hưng |
| Architecture | docs/ARCHITECTURE.md | SỬA | Giữ modular monolith/REST/transaction; sửa phân công, roadmap và no-timer; chưa có ADR riêng | Hưng |
| Context | docs/PROJECT_CONTEXT.md | SỬA | Bỏ thông tin sai Scope/SRS/US chưa tồn tại; chỉ rõ scaffold | Hưng |
| Roadmap | docs/PROJECT_ROADMAP.md | SỬA | Thay lộ trình cũ bằng A1/A2 và gate tuần tự, lưu lịch sử | Hưng |
| Phân công | docs/TEAM_ASSIGNMENTS.md | SỬA | Chuyển Prisma cho Khoa, Menu/Checkout UI và E2E cho Huy, Docker/CI/CD cho Thắng theo yêu cầu mới | Hưng/cả nhóm |
| Traceability | docs/REQUIREMENTS_TRACEABILITY.md | SỬA | A1/A2 → design/code/test/evidence; bỏ 24 bước khỏi chuẩn hiện hành | Hưng |
| Quyết định/review | docs/REQUIREMENTS_DECISIONS.md, docs/REQUIREMENTS_REVIEW.md | SỬA | Giữ lịch sử 13/10, chỉ rõ yêu cầu mới và Pending Decisions | Hưng/owners |
| UI/Figma | docs/UI_UX.md | CHỜ XÁC MINH | Chưa có URL/version Figma BrewLite đã xác minh; không bịa evidence | Huy/Phát |
| Activity | docs/ACTIVITY_DIAGRAMS.md | CHỜ XÁC MINH | Có kiểm kê Drive; thiếu source Activity Checkout local Git để nghiệm thu | Huy |
| Class Diagram | Chưa có source local | THIẾU | Khoa chuẩn bị sau gate Requirements; ERD không thay Class | Khoa |
| Deployment Diagram/ADR | Chưa có sản phẩm riêng local | THIẾU | Chuẩn bị ở A2 Task 3 sau UML được nghiệm thu | Thắng/Hưng |
| API conventions | docs/api/API_CONVENTIONS.md | GIỮ | Có UUID, data/error, VND, headers; còn đề xuất chưa owner duyệt | Hưng/cả nhóm |
| API index | docs/api/API_SPEC.md | SỬA | Bỏ thông tin module khác chưa có; thêm link draft mới và xung đột hiện hành | Hưng |
| Products API | docs/api/products.md | GIỮ | Có GET list/detail và DTO/giá; chưa có controller/service/test Products | Hưng/Huy |
| Cart/Promotion/Loyalty | docs/api/cart.md, docs/api/promotions-loyalty.md | GIỮ | Giỏ browser, giá và replay/ledger có mô tả; quota/DTO/tồn phải owner review | Huy/Hưng/Phát |
| Orders API | docs/api/orders.md | SỬA | JSON fence thiếu; ADMIN/COD/route lịch sử/DTO sai khác; không tự duyệt contract | Phát |
| Checkout/Payment spec | docs/api/checkout-payments.md | SỬA | Nguồn ngắn chưa đủ contract, JSON fence thiếu; prod_001/size/Cart DB khác chuẩn | Thắng/Huy |
| Inventory contract | Chưa có file riêng trên main | THIẾU | Chuẩn bị reserve/release/transaction/concurrency draft | Khoa/Phát |
| Payment contract đầy đủ | Chưa có file riêng trên main | THIẾU | Chuẩn bị mock success/failure/key/retry/side effect draft | Thắng/Phát/Khoa |
| Sequence Products/Cart/Promo | docs/diagrams/sequence/products, cart, promotions-loyalty | GIỮ | Source có thật, Cart/Promo có SVG; chưa kiểm chứng render/owner approval toàn bộ | Hưng/Huy |
| Sequence Orders/Payment | docs/diagrams/sequence/orders, checkout-payments | SỬA | Timer, ADMIN, PRODUCT.stock_qty, clear giỏ sớm, GET ghi payment, key race; giữ nguồn có cảnh báo draft | Phát/Thắng/Khoa/Huy |
| Web source | apps/web/src/app/page.tsx, layout.tsx, globals.css | GIỮ | Hello và nút kết nối; Menu/Cart/Checkout nghiệp vụ chưa có | Huy/Hưng |
| API source | apps/api/src/app.*, main.ts, products/products.module.ts | GIỮ | GET /, Config/CORS và ProductsModule rỗng; chưa có Prisma/business modules | Owners theo phân công |
| Test scaffold | apps/api/src/app.controller.spec.ts, apps/api/test/app.e2e-spec.ts | GIỮ | Mỗi loại 1 Hello test; bổ sung nghiệp vụ theo AC ở giai đoạn sau | Các owner |
| Compose/env/Git ignore | docker-compose.yml, .env.example, apps/*/.env.example, .gitignore | GIỮ | Chỉ db/PostgreSQL17, healthcheck, volume; chưa phải Compose 3 dịch vụ; không đọc secrets | Thắng |
| Dependencies/scripts | package.json và lockfile gốc/apps, scripts/*.mjs | GIỮ | Có build/test/lint và check-huy-docs; không đổi dependencies; runtime audit không chứng minh UC | Hưng/owners |
| CI/CD | Chưa có .github/workflows | THIẾU | Làm ở A2-4.4/5.3 sau gate, không làm trong Buổi 1 | Thắng |
| Scrum/Issues/Board | Chưa có docs/scrum trên main; API public chỉ trả 16 PR, không Issue thường | THIẾU | Working Agreement, backlog/26 issue drafts; gh chưa đăng nhập, role/Sprint/Board chưa xác nhận | Phát/Hưng/Huy |
| Audit lịch sử | docs/audits/drive-sync-steps-01-12.md, huy-compliance-2026-10-14.md và evidence JSON | GIỮ | Bảo toàn nội dung/lịch sử; không sửa tự động theo roadmap mới | Hưng/Huy |

Các sửa đổi của nhánh và điều kiện kết thúc xem [bàn giao Buổi 1](../scrum/day1-handoff.md); xung đột theo [Pending Decisions](../scrum/team-working-agreement.md#pending-decisions).
