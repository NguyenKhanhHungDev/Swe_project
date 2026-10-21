# BrewLite — Project Context

Cập nhật: 21/10/2026. Phạm vi phiên này: hồ sơ Buổi 1; không triển khai chức năng Buổi 2–10.

## Nguồn yêu cầu

- A1: 10 task của BrewLite-CongNghePhanMem VER 1.0. Đã đọc PDF local trong thư mục môn học, đối chiếu mục 8–12 và xem hình State Machine mục 9.1.
- A2: đã đọc `Assignment2-BrewLite-1.pdf` VER 1.0 local, mục 1–9.1; dùng Requirements → UML → Architecture → Sprint 1 → Sprint 2/Delivery làm chuẩn. PR #33 đã đưa bản đối chiếu backlog vào main; PDF không thay việc owner duyệt requirements.
- [Roadmap](PROJECT_ROADMAP.md) là nơi quản lý A1/A2 duy nhất. [Roadmap cũ](archive/roadmap-before-day1.md) chỉ là lịch sử.
- Tài liệu thiết kế tồn tại không đồng nghĩa code, kiểm thử hoặc nghiệm thu đã hoàn thành.

## Phạm vi và công nghệ

Ứng dụng đặt đồ uống nhận tại quầy, chọn size/topping, giỏ, JWT, Orders, mock Ví/Thẻ, tồn kho, khuyến mãi/loyalty. Không giao hàng hoặc xử lý tiền thật. Xem [Scope](PROJECT_SCOPE.md), [SRS](SRS.md), [Stories](USER_STORIES.md), [AC](ACCEPTANCE_CRITERIA.md), [BR](BUSINESS_RULES.md), [Use Cases](USE_CASES.md).

Next.js 16 / React 19 / TypeScript / Tailwind CSS 4 → NestJS 11 REST/JSON → PostgreSQL 17. Prisma dự kiến, chưa tích hợp. Chi tiết [Architecture](ARCHITECTURE.md).

## Hiện trạng main 8f8ffd5 — rà 21/10/2026

| Thành phần | Thực tế |
|---|---|
| apps/web | Trang Hello và nút gọi API lời chào; chưa có Menu/Cart/Checkout nghiệp vụ. |
| apps/api | GET / trả lời chào; ProductsModule rỗng; không có module nghiệp vụ chạy được. |
| Database | Compose chỉ khai báo db, healthcheck và volume; chưa xác minh lại runtime DB trong Buổi 1. |
| Prisma | Chưa có dependency, schema, migration hoặc kết nối DB từ API. |
| Tests | Unit/E2E cho Hello; xem kết quả lịch sử 20/10 tại [verification](audits/day1-verification-2026-10-20.md). |
| Requirements/design | Scope, SRS, US, AC, BR, Use Cases, hai ERD, API specs và Sequence đã có nội dung; chưa có đủ bằng chứng duyệt. |

## Điều phối và tài liệu

Nhóm: Hưng, Khoa, Huy, Phát, Thắng. Dùng [phân công](TEAM_ASSIGNMENTS.md), [truy vết](REQUIREMENTS_TRACEABILITY.md), [Working Agreement](scrum/team-working-agreement.md), [kiểm kê main](audits/main-inventory-2026-10-20.md) và [bàn giao Buổi 1](scrum/day1-handoff.md).

Có đủ 26/26 Issues OPEN/assignee/body khớp hồ sơ Git theo [backlog](scrum/backlog.md); Board chưa kiểm chứng, các review/acceptance còn chờ. PO/SM, merge dự phòng, deadline, host và các xung đột contract còn PENDING; xem bảng quyết định trong Working Agreement. Không tự coi vai trò đề xuất đã được nhóm duyệt. Không ghi secrets, dữ liệu họp hoặc kết quả test giả. Hướng dẫn Linux/Windows/macOS ở [README](../README.md); quy tắc Codex ở [AGENTS](../AGENTS.md).

Trạng thái kết thúc Buổi 1: **READY FOR TEAM REVIEW — NOT YET ACCEPTED**, theo [handoff](scrum/day1-handoff.md). Kiểm tra phiên final review chỉ đọc cấu trúc/nguồn và kiểm tài liệu; không chạy lại build/test ứng dụng hoặc DB/runtime. So sánh main với mốc 1cc2bb1 không thấy thay đổi code/package/Compose (chỉ README ứng dụng), nên không lấy PR tài liệu làm evidence triển khai mới.
