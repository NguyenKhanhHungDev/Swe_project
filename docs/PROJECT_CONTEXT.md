# BrewLite — Project Context

Cập nhật: 20/10/2026. Phạm vi phiên này: hồ sơ Buổi 1; không triển khai chức năng Buổi 2–10.

## Nguồn yêu cầu

- A1: 10 task của BrewLite-CongNghePhanMem VER 1.0. Đã đọc PDF local trong thư mục môn học, đối chiếu mục 8–12 và xem hình State Machine mục 9.1.
- A2: Requirements → UML → Architecture → Sprint 1 → Sprint 2/Delivery. Chưa tìm thấy PDF thứ hai trong repository và thư mục môn học đã quét; dùng nội dung yêu cầu người dùng ngày 20/10/2026, chờ đối chiếu PDF.
- [Roadmap](PROJECT_ROADMAP.md) là nơi quản lý A1/A2 duy nhất. [Roadmap cũ](archive/roadmap-before-day1.md) chỉ là lịch sử.
- Tài liệu thiết kế tồn tại không đồng nghĩa code, kiểm thử hoặc nghiệm thu đã hoàn thành.

## Phạm vi và công nghệ

Ứng dụng đặt đồ uống nhận tại quầy, chọn size/topping, giỏ, JWT, Orders, mock Ví/Thẻ, tồn kho, khuyến mãi/loyalty. Không giao hàng hoặc xử lý tiền thật. Xem [Scope](PROJECT_SCOPE.md), [SRS](SRS.md), [Stories](USER_STORIES.md), [AC](ACCEPTANCE_CRITERIA.md), [BR](BUSINESS_RULES.md), [Use Cases](USE_CASES.md).

Next.js 16 / React 19 / TypeScript / Tailwind CSS 4 → NestJS 11 REST/JSON → PostgreSQL 17. Prisma dự kiến, chưa tích hợp. Chi tiết [Architecture](ARCHITECTURE.md).

## Hiện trạng đã xác minh tại main 1cc2bb1

| Thành phần | Thực tế |
|---|---|
| apps/web | Trang Hello và nút gọi API lời chào; chưa có Menu/Cart/Checkout nghiệp vụ. |
| apps/api | GET / trả lời chào; ProductsModule rỗng; không có module nghiệp vụ chạy được. |
| Database | Compose chỉ khai báo db, healthcheck và volume; chưa xác minh lại runtime DB trong Buổi 1. |
| Prisma | Chưa có dependency, schema, migration hoặc kết nối DB từ API. |
| Tests | Unit/E2E cho Hello; xem kết quả chạy mới tại [verification](audits/day1-verification-2026-10-20.md). |
| Requirements/design | Scope, SRS, US, AC, BR, Use Cases, hai ERD, API specs và Sequence đã có nội dung; chưa có đủ bằng chứng duyệt. |

## Điều phối và tài liệu

Nhóm: Hưng, Khoa, Huy, Phát, Thắng. Dùng [phân công](TEAM_ASSIGNMENTS.md), [truy vết](REQUIREMENTS_TRACEABILITY.md), [Working Agreement](scrum/team-working-agreement.md), [kiểm kê main](audits/main-inventory-2026-10-20.md) và [bàn giao Buổi 1](scrum/day1-handoff.md).

PO/SM, merge dự phòng, deadline, host và các xung đột contract còn PENDING; xem bảng quyết định trong Working Agreement. Không tự coi vai trò đề xuất đã được nhóm duyệt. Không ghi secrets, dữ liệu họp hoặc kết quả test giả. Hướng dẫn Linux/Windows/macOS ở [README](../README.md); quy tắc Codex ở [AGENTS](../AGENTS.md).
