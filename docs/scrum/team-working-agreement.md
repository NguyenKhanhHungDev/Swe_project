# BrewLite — Team Working Agreement

**DRAFT — Pending owner review.** Chuẩn bị 20/10/2026; chưa có biên bản nhóm phê duyệt.

## Thành viên và vai trò

| Người | Vai trò đề xuất | Trạng thái |
|---|---|---|
| Phát | Product Owner; người merge dự phòng nếu có quyền | PENDING xác nhận và kiểm tra quyền |
| Hưng | Scrum Master; người merge chính | PENDING nhóm thống nhất |
| Khoa, Huy, Thắng | Development Team | PENDING xác nhận |

Hưng và Phát vẫn phát triển các phần việc theo [phân công](../TEAM_ASSIGNMENTS.md).

## Git và review

main là nguồn chuẩn; fetch rồi tạo nhánh mới từ main, bảo toàn thay đổi chưa commit. Mỗi nhiệm vụ có Issue và PR phù hợp; nhánh feat/, fix/, docs/, test/ hoặc chore/. Commit ngắn gọn theo feat, fix, docs, test, chore. PR phải có người khác review, liên kết Issue/AC và minh chứng. Không push trực tiếp main, force-push nhánh chung hoặc merge PR khi kiểm thử bắt buộc thất bại. Không tự merge PR trong phiên Buổi 1.

## Scrum

Phát quản lý Product Backlog A1; [backlog chung](backlog.md) ánh xạ A1/A2. Sprint Planning chọn Sprint Goal, việc, owner và ước lượng thật vào Sprint Backlog. Lịch, thời lượng Sprint và danh sách được chọn hiện PENDING, chưa có Sprint được xác nhận bởi hồ sơ này. Daily Scrum tối đa 15 phút; Huy tổng hợp tiến độ/Burndown từ cập nhật thật của nhóm. Sprint Review xem Increment/AC và phản hồi; Retrospective ghi cải tiến. Theo dõi bằng GitHub Issues/Board với Todo, In Progress, Review, Done. Chưa có quyền Board thì dùng backlog Git; không dựng biên bản họp, Daily hoặc Burndown giả.

A2 nghiệm thu theo gate Task 1 → 2 → 3 → 4 → 5. Được chuẩn bị nháp từ tài liệu đã có nhưng không nghiệm thu nhóm sau trước nhóm trước. CI/CD/production thuộc giai đoạn sau.

## Definition of Done

- Đáp ứng AC của Issue và gate A2; có bằng chứng được chấp nhận.
- Code/build/test đạt trong phạm vi liên quan; API validate đầu vào; UI có loading/error khi phù hợp.
- Có commit/PR, người khác review và liên kết Issue/PR/test.
- Tài liệu/README/truy vết cập nhật khi thay đổi; không lộ secrets.
- Thiết kế/nháp, build scaffold và Issue được tạo không tự đáp ứng DoD nghiệp vụ.

## Quy ước kỹ thuật

Next.js → NestJS REST/JSON → PostgreSQL; frontend không gọi DB. Prisma dự kiến; không tự đổi ORM. Dùng [API conventions](../api/API_CONVENTIONS.md) làm đề xuất chung và [API spec](../api/API_SPEC.md) để rà xung đột, không tự coi mọi điểm đã chốt. ID UUID string, tiền integer VND, qty cho số ly và quantity cho topping là quy ước đang review. Không commit secrets/.env thật. Host production và hạn nộp phải lấy từ quyết định thật; chưa deploy Buổi 1.

## Pending Decisions

Tất cả mục dưới đây PENDING. Bảng này là nơi theo dõi chung; chủ sở hữu ghi xác nhận/nguồn/PR khi chốt, không suy ra đồng ý từ im lặng.

| ID | Nội dung và bằng chứng mâu thuẫn | Người xác nhận | Điều kiện chốt |
|---|---|---|---|
| PD-01 | PO/SM đề xuất | Cả nhóm | Biên bản/xác nhận thật |
| PD-02 | Người merge dự phòng Phát, quyền merge/review | Hưng/Phát | Xác minh quyền GitHub và nhóm đồng ý |
| PD-03 | Giờ, ngày, nơi nộp bài | Nhóm/giảng viên | Thông báo chính thức |
| PD-04 | Hosting, DB, HTTPS, phương án rollback | Thắng/nhóm | Host thực, giới hạn và chi phí được duyệt |
| PD-05 | Yêu cầu hiện tại nói không triển khai timer; BR-16/SRS/AC/ERD/Architecture và Sequence Orders còn giữ 15 phút | Phát/Khoa/Thắng; Hưng điều phối | Xác nhận chính sách không timer, sửa đồng bộ expiresAt/schema/retry/release trước triển khai; không mặc định now+15m hoặc tạo cron |
| PD-06 | Orders spec/Sequence dùng ADMIN, COD và GET /orders; A1 yêu cầu WALLET/CARD, GET /orders/me; kiến trúc CUSTOMER/STAFF | Phát/Thắng/Khoa/Huy | Bỏ mở rộng ngoài đề hoặc có duyệt thật; chốt route, quyền/ownership và thứ tự /me trước /:id |
| PD-07 | Orders quantity/toppingIds khác Cart qty/toppings.quantity; checkout prod_001/size khác UUID/sizeCode; sai bảng PRODUCT.stock_qty so ERD INVENTORY | Phát/Huy/Hưng/Khoa/Thắng | Một DTO/mapping chung có review; không tự đổi contract trong Buổi 1 |
| PD-08 | PaymentStatus PROCESSING/REFUNDED khác ERD payment_result PENDING và REFUND riêng; scope key/fingerprint/TTL chưa chốt | Thắng/Phát/Khoa | Mapping enum, unique scope, replay/in-progress/error policy và transaction boundary |
| PD-09 | Sequence Orders xóa giỏ khi tạo đơn; xóa reservation khi complete/cancel; Orders gọi Payment gây vòng; Payment GET status lại ghi thành công | Phát/Thắng/Khoa/Huy | Giữ giỏ đến PAID (mua ngay giữ giỏ cũ), trạng thái reservation/ledger một lần, GET chỉ đọc và hướng điều phối đúng kiến trúc |
| PD-10 | Giá đầy đủ theo size ở ERD/API nhưng AC/Architecture còn phụ thu; quota Promotion còn mâu thuẫn BR | Hưng/Huy/Phát | Duyệt thuật ngữ giá và giới hạn khuyến mãi; không cộng S vào giá đầy đủ M/L |
| PD-11 | JWT/session/logout, NFR <500 ms và ma trận trình duyệt; link/version Figma | Khoa/Thắng/Huy/Phát | Chính sách và phép đo, URL thiết kế thật |
| PD-12 | PDF A2 chưa tìm thấy; MoSCoW, FR/NFR IDs và phê duyệt requirements chưa đủ evidence | Hưng/cả nhóm | Đối chiếu đề gốc, bổ sung evidence rồi nghiệm thu A2-1 |

## Xác nhận

| Hưng | Khoa | Huy | Phát | Thắng |
|---|---|---|---|---|
| PENDING | PENDING | PENDING | PENDING | PENDING |
