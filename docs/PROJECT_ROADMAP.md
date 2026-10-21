# BrewLite — Theo dõi A1/A2

Cập nhật 21/10/2026. Đây là roadmap quản lý hiện hành duy nhất; [bản cũ](archive/roadmap-before-day1.md) chỉ lưu lịch sử.

Đã đọc A1 VER 1.0 mục 3–12 và A2 VER 1.0 mục 1–9.1 local. Chỉ hai Assignment là chuẩn; bộ backlog đã được đối chiếu, không đồng nghĩa sản phẩm/requirements đã nghiệm thu. Không dùng số file/scaffold để suy ra nghiệm thu. Trạng thái TODO, REVIEW, BLOCKED, DONE chỉ có ý nghĩa khi kèm evidence; chưa task nào được xác nhận DONE trong audit này.

## A1 — 10 task

| Task | Chủ sở hữu chính | Trạng thái thực tế | Đầu vào quan trọng |
|---|---|---|---|
| [A1-01 Khởi tạo dự án](backlog/A1-01.md) | Hưng | REVIEW scaffold; chưa nghiệm thu | Không |
| [A1-02 API danh sách sản phẩm](backlog/A1-02.md) | Hưng | TODO implementation; có spec draft | A1-01; A2-1 → A2-2 → A2-3 |
| [A1-03 Trang Menu](backlog/A1-03.md) | Huy | TODO implementation | A1-02; A2-3; DTO Products duyệt |
| [A1-04 Chi tiết sản phẩm, size S/M/L và topping](backlog/A1-04.md) | Hưng phối hợp Huy | TODO implementation | A1-02; A1-03; PD-10 |
| [A1-05 Giỏ hàng](backlog/A1-05.md) | Huy | TODO implementation; có contract draft | A1-03; A1-04; DTO Cart duyệt |
| [A1-06 API tạo đơn](backlog/A1-06.md) | Phát | TODO; phụ thuộc Inventory/Auth/contracts | A1-05; A1-07; Inventory của Khoa; PD-05/07/09 |
| [A1-07 Đăng ký, đăng nhập JWT](backlog/A1-07.md) | Khoa | TODO implementation | A1-01; schema; PD-11; A2-3 |
| [A1-08 Thanh toán Ví/Thẻ mô phỏng](backlog/A1-08.md) | Thắng | TODO implementation; draft pending review | A1-06; A1-07; PD-05/08/09 |
| [A1-09 Xác nhận, lịch sử đơn và bàn giao](backlog/A1-09.md) | Phát | TODO implementation | A1-08; A2-5 gates |
| [A1-10 State Machine, idempotency, concurrency, promotion và loyalty](backlog/A1-10.md) | Phát | TODO; Phát là đầu mối điều phối | A1-06; A1-08; contracts/schema được review |

Phát quản lý backlog A1 và điều phối A1-10: Khoa concurrency; Thắng payment/idempotency; Huy promo/loyalty; Hưng tích hợp.

## A2 — nghiệm thu tuần tự

| Task con | Owner | Trạng thái/đầu ra còn thiếu | Phụ thuộc nghiệm thu |
|---|---|---|---|
| [A2-1.1 Context, Stakeholders & Scope](backlog/A2-1.1.md) | Hưng | REVIEW draft | Không |
| [A2-1.2 SRS, FR/NFR, MoSCoW & AC](backlog/A2-1.2.md) | Hưng | REVIEW tài liệu; thiếu MoSCoW/phê duyệt | A2-1.1; owner duyệt FR/NFR/MoSCoW/AC |
| [A2-1.3 Checkout Use Case](backlog/A2-1.3.md) | Phát | REVIEW nguồn UC; Checkout tổng thể chưa chốt | A2-1.1; A2-1.2 |
| [A2-2.1 Checkout Activity](backlog/A2-2.1.md) | Huy | BLOCKED gate Task 1; thiếu source Activity local | A2 Task 1 được nghiệm thu |
| [A2-2.2 Checkout Sequence](backlog/A2-2.2.md) | Phát | BLOCKED gate Task 1; có Sequence draft mâu thuẫn | A2 Task 1 được nghiệm thu; A2-2.1 |
| [A2-2.3 Domain Class Diagram](backlog/A2-2.3.md) | Khoa | BLOCKED gate Task 1; chưa có Class Diagram | A2 Task 1 được nghiệm thu |
| [A2-3.1 Architecture & ADR](backlog/A2-3.1.md) | Hưng | BLOCKED gate Task 2; Architecture draft, thiếu ADR riêng | A2 Task 2 được nghiệm thu |
| [A2-3.2 Deployment Diagram](backlog/A2-3.2.md) | Thắng | BLOCKED gate Task 2; chưa có Deployment Diagram | A2 Task 2 được nghiệm thu; A2-3.1 |
| [A2-4.1 Repository & Working Rules](backlog/A2-4.1.md) | Hưng | BLOCKED nghiệm thu gate Task 3; có scaffold/hồ sơ Buổi 1 | A2 Task 3 được nghiệm thu |
| [A2-4.2 Documentation Management](backlog/A2-4.2.md) | Hưng | BLOCKED nghiệm thu gate Task 3; traceability đang review | A2 Task 3 được nghiệm thu; A2-4.1 |
| [A2-4.3 Menu MVP](backlog/A2-4.3.md) | Huy | BLOCKED gate Task 3; chưa có Menu nghiệp vụ | A2 Task 3 được nghiệm thu; A1-02/03 và API detail A1-04; A2-4.1 |
| [A2-4.4 Continuous Integration](backlog/A2-4.4.md) | Thắng | BLOCKED gate Task 3; chưa có CI workflow | A2 Task 3 được nghiệm thu; A2-4.1 |
| [A2-5.1 Complete MVP](backlog/A2-5.1.md) | Phát | BLOCKED gate Task 4; chưa có nghiệp vụ | A2 Task 4 được nghiệm thu; A1-04–10 |
| [A2-5.2 Integration & Testing](backlog/A2-5.2.md) | Huy | BLOCKED gate Task 4; Hello tests chưa đủ | A2 Task 4 được nghiệm thu; A2-5.1 |
| [A2-5.3 Continuous Delivery](backlog/A2-5.3.md) | Thắng | BLOCKED gate Task 4/host; chưa có CD | A2 Task 4 được nghiệm thu; A2-5.1; A2-5.2; PD-04 |
| [A2-5.4 Production & Handover](backlog/A2-5.4.md) | Thắng | BLOCKED gate Task 4/host; chưa có production | A2 Task 4 được nghiệm thu; A2-5.3; PD-03/04 |

Gate: Task 1 Requirements → Task 2 UML → Task 3 Architecture → Task 4 Sprint 1 → Task 5 Sprint 2/Delivery. Có sẵn Architecture/Sequence/scaffold chỉ được tái sử dụng làm nháp; không vượt gate nghiệm thu. Hosting được chọn trước nghiệm thu Deployment A2-3.2; triển khai CI ở A2-4.4 và CD/production ở A2-5, không thực hiện Buổi 1.

## Buổi 1 và kế tiếp

Buổi 1: kiểm kê main, chuẩn hóa tài liệu, phân công/Working Agreement, chuẩn bị contract/checklist và backlog. Tại main 8f8ffd5, đủ 26/26 Issue thật OPEN/assignee/body khớp Git; PR #18/#32/#33 đã merge. Đây là ĐÃ XÁC MINH về hồ sơ, không phải Done nghiệp vụ. Vai trò/rules/owner review và Board còn CHỜ XÁC NHẬN; hồ sơ READY FOR TEAM REVIEW — NOT YET ACCEPTED. Kiểm kê main chưa có Menu/Prisma/Orders/Payment hoặc CI/CD nghiệp vụ; không suy trạng thái branch feature chưa merge. [Bàn giao](scrum/day1-handoff.md) ghi điều kiện kết thúc và Pending owner review. Buổi 2 bắt đầu review/chốt A2-1.1/1.2/1.3, giải quyết xung đột trước UML.

[Backlog và thứ tự ưu tiên](scrum/backlog.md) · [Truy vết Requirements → Design → Code → Test](REQUIREMENTS_TRACEABILITY.md) · [Phân công](TEAM_ASSIGNMENTS.md).

## Điều kiện đóng Buổi 1

Hưng đã chuẩn bị hồ sơ kiểm kê/đối chiếu hai đề, backlog, PD owner/mốc và [yêu cầu review](scrum/day1-review-request.md). Chưa đủ điều kiện nghiệm thu Buổi 1 cho tới khi năm người phản hồi, rules/roles và cách xử lý các điểm chặn được chấp thuận, bằng chứng review/check/Board hoặc giới hạn quyền được ghi theo [handoff](scrum/day1-handoff.md). Các file requirements bắt buộc mới và UML/CI/CD còn thiếu là công việc A2 theo giai đoạn, không phải implementation cần làm bù trong Buổi 1.
