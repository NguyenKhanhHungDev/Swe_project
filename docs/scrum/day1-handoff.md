# BrewLite — Bàn giao Buổi 1

**DRAFT — Pending owner review.** Chuẩn bị 20/10/2026. Chưa đủ điều kiện tuyên bố hoàn tất Buổi 1 hoặc nghiệm thu A2 Task 1–5.

| Nội dung | Kết quả có bằng chứng | Còn chờ |
|---|---|---|
| main | Fetch origin/main tại 1cc2bb1, PR #17 đã merge monorepo; Hello web/API, ProductsModule rỗng, Compose db | Nghiệp vụ/Prisma chưa triển khai; không coi scaffold là MVP |
| Kiểm kê | [Bảng kiểm kê main](../audits/main-inventory-2026-10-20.md) phân loại nội dung thực tế | Owner xác nhận các phát hiện |
| Giữ tài liệu | US, Products/Cart/Promo contracts, sơ đồ, constraints ERD và audit lịch sử | Review design khác với nghiệm thu |
| Sửa tài liệu | README/AGENTS/Context/Roadmap/phân công/truy vết/Architecture; links apps, API index; cảnh báo xung đột ở sources | Các contract/BR/schema mâu thuẫn chưa được tự chốt |
| Working Agreement | [Roles/Git/Scrum/DoD/Pending Decisions](team-working-agreement.md) | 5 người chưa xác nhận |
| Contracts/checklists | Inventory, Payment, Menu notes, transitions/Checkout checklist | Khoa/Huy/Phát/Thắng review bản DRAFT |
| Backlog | [26 issue drafts](backlog.md), đủ 10 A1 + 16 A2; owner, AC, dependencies, DoD | Tạo Issue thật, xác minh account và Board sau đăng nhập |
| Kiểm chứng | [Lệnh/kết quả](../audits/day1-verification-2026-10-20.md) | Không thay evidence nghiệp vụ/NFR/deploy |
| GitHub | Kiểm tra public API: 0 Issue thường trong snapshot, 16 PR; gh chưa đăng nhập; push dry-run exit 128 vì thiếu Git HTTPS credentials | 0 Issue mới, chưa có URL PR mới; [lệnh bàn giao](github-handoff.md) và [PR body](day1-pr-body.md) |

Danh sách file tạo/sửa: [manifest thay đổi](../audits/day1-changed-files.md). Dependency warnings được ghi riêng trong biên bản kiểm chứng, chưa sửa dependencies.

## Việc tiếp theo từng người

| Người | Hồ sơ/việc nhận | Điều kiện bàn giao |
|---|---|---|
| Hưng | Review chuẩn hóa, traceability, tích hợp PR; đối chiếu PDF A2 khi có | Người khác review PR, link evidence thật |
| Khoa | [Inventory contract](../api/inventory-contract.md), Product/Order/Inventory ERD, schema/Auth/Class kế hoạch | Chốt transaction/version/release với Phát, ký review; chưa chạy migration Buổi 1 |
| Huy | [Menu notes](../ui/menu-notes.md), Cart/Promotion AC, Checkout UI/Activity/E2E và Daily/Burndown | Review DTO/giá/UI states; dùng dữ liệu Scrum thật |
| Phát | [State/Checkout checklist](../requirements/order-state-transitions.md), A1 Issues và Orders/History | Chốt Checkout Use Case với owners, điều phối A1-10, không thêm timer |
| Thắng | [Payment contract và deployment checklist](../api/payment-contract.md), idempotency, Docker/CI/CD kế hoạch | Chốt key/enum/transaction với Phát/Khoa, xác minh host/HTTPS/rollback sau gate |

## Còn thiếu cho A1/A2

A1: scaffold đã có nhưng chưa owner acceptance; Task 2–10 thiếu code/test nghiệp vụ (ProductsModule rỗng). A2 Task 1 còn requirements review, FR/NFR/MoSCoW rõ, Checkout Use Case tổng thể và PD; Task 2 thiếu Class/Activity local và Sequence cần sửa; Task 3 thiếu ADR riêng/Deployment Diagram; Task 4 thiếu Menu/CI và xác nhận rules; Task 5 thiếu complete MVP, integration/NFR, CD, production/handover. Xem [Roadmap](../PROJECT_ROADMAP.md) để tránh lặp chi tiết.

## Quyết định và xác nhận

Dùng một bảng [Pending Decisions PD-01–12](team-working-agreement.md#pending-decisions): PO/SM/merge dự phòng, deadline/nơi nộp, host; no-timer so với nguồn 15 phút; roles/route/DTO/giá/payment enum/key/transaction/ledger; JWT/NFR/Figma; đề A2. Không tự xác nhận thay owner hoặc đưa Issue nháp vào Done.

## Điều kiện chính thức kết thúc Buổi 1

- [ ] Các owner review/xác nhận hồ sơ được giao; cả nhóm xác nhận Working Agreement/roles hoặc ghi quyết định trì hoãn có nguồn thật.
- [ ] PD trọng yếu có người nhận và hướng xử lý được nhóm chấp nhận; no-timer được sửa đồng bộ trước implementation.
- [ ] 26 mã backlog đã đối chiếu/tạo Issue thật không trùng; Board hoặc hạn chế quyền được ghi rõ; account chỉ gán khi xác minh.
- [ ] Required checks đạt, PR được mở và người khác review; chỉ người có quyền merge theo quyết định nhóm, không tự merge trong phiên này.
- [ ] Có link/commit evidence và xác nhận nhận bàn giao, không suy ra nghiệm thu A2 từ việc kết thúc Buổi 1.

**Việc đầu tiên Buổi 2:** Phát cùng Hưng/Khoa/Huy/Thắng review A2-1.1/1.2/1.3, chốt Checkout Use Case và các xung đột PD-05–10; chỉ nghiệm thu UML sau Task 1 có xác nhận. Không bắt đầu implementation bù cho requirements chưa chốt.
