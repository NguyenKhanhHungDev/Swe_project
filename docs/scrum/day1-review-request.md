# BrewLite — Yêu cầu review kết thúc Buổi 1

**READY FOR TEAM REVIEW — NOT YET ACCEPTED.** Soạn ngày 21/10/2026 để Hưng gửi nhóm; chưa gửi tin nhắn hoặc xác nhận thay ai. Mốc kiểm kê: main `8f8ffd5`; hồ sơ final review trên nhánh `docs/day1-final-review` chưa commit. Khi gửi, Hưng gắn đúng commit/PR thật của bộ tài liệu cần review.

Mục tiêu: xác nhận hồ sơ điều phối và người nhận việc Buổi 1. Không yêu cầu làm SRS/Checkout Use Case của Buổi 2, code, migration, Docker hay CI/CD để trả lời review này. Có đủ 26 Issue không đồng nghĩa 26 task đã hoàn thành.

## Phần cần mỗi thành viên kiểm tra

| Người | File cần đọc | Điểm cần xác nhận | Phản hồi cần gửi | Kết quả Hưng cần nhận lại |
| --- | --- | --- | --- | --- |
| Hưng | [Roadmap](../PROJECT_ROADMAP.md), [phân công](../TEAM_ASSIGNMENTS.md), [Working Agreement](team-working-agreement.md), [backlog/26 Issues](backlog.md), [traceability](../REQUIREMENTS_TRACEABILITY.md), [handoff](day1-handoff.md) | Đúng hai Assignment, 10 A1 + 16 A2; owner/module; Git/PR/reviewer/DoD; SM/PO/merge đề xuất; Product Backlog khác Sprint Backlog; các PD có người/mốc xử lý | Nêu hồ sơ đủ/chưa đủ, lỗi link/phân công nếu có; xác nhận hoặc yêu cầu sửa vai trò/rules bằng chính phản hồi của Hưng. Nhờ người khác review thay đổi Hưng là tác giả | Link phản hồi với commit/PR; danh sách sửa hoặc người phối hợp; URL Board/quyền đã kiểm tra; không tự coi PR merged là acceptance |
| Khoa | [Inventory contract](../api/inventory-contract.md), [ERD Product/Order/Inventory](../ERD_DETAILED.md), [PD-05/07/08/09](team-working-agreement.md#pending-decisions), [phân công](../TEAM_ASSIGNMENTS.md) | Nhận trách nhiệm schema/Prisma/Inventory; transaction client chung, reserve/consume/release/return, version/constraints; ERD cũ còn ghi Phát tích hợp Prisma; no-timer khác 15 phút | Chỉ rõ điều đồng ý/không rõ/sai, file/dòng và câu hỏi cho Phát/Thắng. Nhận owner và đề xuất mốc chốt trước implementation; chưa cần thiết kế schema hay viết migration | Review có nguồn của Khoa; danh sách câu hỏi/điểm sửa ERD–Inventory và lịch hẹn chốt với Phát/Thắng; không có xác nhận giả rằng DB đã chạy |
| Huy | [Menu notes](../ui/menu-notes.md), [Cart contract](../api/cart.md), [Products contract](../api/products.md), [A1-03/04/05](backlog.md), [phân công](../TEAM_ASSIGNMENTS.md) | Menu/Detail/Cart/Checkout UI states, qty/topping DTO, giá đầy đủ hay phụ thu, badge/persistence/nguồn mua; ownership UI đúng Architecture; runner/Figma còn chờ | Ghi điểm rõ/chưa rõ, câu hỏi dữ liệu/giá cho Hưng, Orders/Payment cho Phát/Thắng; nhận trách nhiệm phần mình và mốc xử lý trước UI | Review của Huy và bảng câu hỏi/mapping cần chốt, không yêu cầu dựng UI hoặc Playwright ngay Buổi 1 |
| Phát | [State/Checkout checklist](../requirements/order-state-transitions.md), [10 A1 Issues/thứ tự đề xuất](backlog.md), [Orders draft](../api/orders.md), [Inventory](../api/inventory-contract.md), [Payment](../api/payment-contract.md) | Nhận điều phối A1/Orders/State; ưu tiên và dependency Auth–Inventory–Orders–Payment; cạnh state sai/retry/cancel; no-timer không tự thêm EXPIRED; PO/merge dự phòng vẫn đề xuất | Nêu review bảng state/ưu tiên và những câu hỏi cần Khoa/Thắng/Huy; nhận owner/mốc cho PD liên quan; không viết Checkout Use Case mới trong phiên review Buổi 1 | Phản hồi Phát với vấn đề/điểm sửa và người phối hợp; xác nhận vai trò nếu đồng ý hoặc lý do BLOCKED, không đóng Issues |
| Thắng | [Payment contract](../api/payment-contract.md), [Checkout-Payment draft](../api/checkout-payments.md), [State](../requirements/order-state-transitions.md), [Inventory](../api/inventory-contract.md), [PD-04/05/08/09](team-working-agreement.md#pending-decisions) | WALLET/CARD mock, success/failure/chưa rõ outcome; key/fingerprint/replay/retry; amount backend và tác động kho/điểm một lần; yêu cầu health/host/registry/rollback giai đoạn sau | Nêu điểm đồng ý/chưa rõ và câu hỏi cho Phát/Khoa; nhận owner và mốc trước implementation. Chỉ ghi việc cần chuẩn bị cho vận hành, chưa chọn host/deploy hoặc tạo CI/CD | Review Thắng với điểm sửa/đầu vào còn thiếu; kế hoạch chốt Payment cùng owners và nghiên cứu host trước A2-3.2 |

Tất cả năm người cùng phản hồi đề xuất vai trò, ranh giới trách nhiệm và Working Agreement. **Hiện cả năm đều PENDING**; bảng này chỉ là yêu cầu review, không phải biên bản đã họp/đồng ý.

## Mẫu phản hồi

```text
Người phản hồi:
Commit/PR/phiên bản đã đọc:
Kết quả: APPROVED hoặc CHANGES_REQUESTED hoặc BLOCKED
File/mục đã review:
Điểm đồng ý / vấn đề cần sửa / lý do bị chặn:
PD liên quan, người phối hợp và mốc đề xuất:
Link bằng chứng phản hồi:
```

- `APPROVED`: thành viên đồng ý đúng phiên bản đã đọc, có phản hồi thật; không đồng nghĩa task nghiệp vụ Done.
- `CHANGES_REQUESTED`: nêu file/mục, vấn đề và yêu cầu sửa cụ thể.
- `BLOCKED`: nêu thiếu đầu vào/quyền/quyết định nào và người cần phối hợp.

Nếu chưa chốt ngày/giờ, ghi mốc “trước implementation/PR …” và đề nghị nhóm hẹn thời gian; không ghi deadline giả. Không phản hồi chưa được coi là đồng ý.

## Cách Hưng tổng hợp

Gửi nội dung này kèm link/commit thật, nhận phản hồi qua kênh nhóm hoặc PR, rồi ghi link bằng chứng tại [Working Agreement — Xác nhận](team-working-agreement.md#xác-nhận) và cập nhật đúng [Pending Decisions](team-working-agreement.md#pending-decisions). Đây là nguồn xác nhận/quyết định chính, không lập thêm bảng quyết định độc lập.

Nếu có CHANGES_REQUESTED/BLOCKED, sửa trong phạm vi hoặc ghi việc chuyển Buổi 2 kèm owner/mốc được nhóm chấp nhận. Chỉ xem xét đóng Buổi 1 khi đạt đủ [điều kiện bàn giao](day1-handoff.md#8-điều-kiện-chính-thức-kết-thúc-buổi-1); không tự chọn APPROVED thay thành viên, không tạo biên bản hay Sprint giả.
