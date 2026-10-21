# BrewLite — Team Working Agreement

**DRAFT — Pending owner review.** Rà lại 21/10/2026; chưa có biên bản/xác nhận của cả năm thành viên. Hồ sơ đã sẵn sàng gửi review, chưa là quy tắc được nhóm phê duyệt.

## Thành viên và vai trò

| Người | Vai trò đề xuất | Trạng thái |
|---|---|---|
| Phát | Product Owner; người merge dự phòng nếu có quyền | PENDING xác nhận và kiểm tra quyền |
| Hưng | Scrum Master; người merge chính | PENDING nhóm thống nhất |
| Khoa, Huy, Thắng | Development Team | PENDING xác nhận |

Development Team gồm các thành viên tham gia triển khai: **Hưng, Khoa, Huy, Phát, Thắng** theo [phân công](../TEAM_ASSIGNMENTS.md). Hưng/Phát vẫn viết phần mình dù được đề xuất SM/PO; vai trò đề xuất chưa được xác nhận, không lấy quyền GitHub làm bằng chứng nhóm đồng ý.

## Git và review

main là nguồn chuẩn; fetch rồi tạo nhánh mới từ main, bảo toàn thay đổi chưa commit. Mỗi nhiệm vụ có Issue và PR phù hợp; nhánh feat/, fix/, docs/, test/ hoặc chore/. Commit ngắn gọn theo feat, fix, docs, test, chore. PR phải có người khác review, liên kết Issue/AC và minh chứng. Không push trực tiếp main, force-push nhánh chung hoặc merge PR khi kiểm thử bắt buộc thất bại. Không tự merge PR trong phiên Buổi 1.

## Scrum

Phát quản lý Product Backlog A1; [backlog chung](backlog.md) ánh xạ A1/A2. Sprint Planning chọn Sprint Goal, việc, owner và ước lượng thật vào Sprint Backlog. Lịch, thời lượng Sprint và danh sách được chọn hiện PENDING, chưa có Sprint được xác nhận bởi hồ sơ này. Daily Scrum tối đa 15 phút; Huy tổng hợp tiến độ/Burndown từ cập nhật thật của nhóm. Sprint Review xem Increment/AC và phản hồi; Retrospective ghi cải tiến. Theo dõi bằng GitHub Issues/Board với Todo, In Progress, Review, Done. Chưa xác minh được Board/quyền thì dùng backlog Git tạm và ghi giới hạn; Board vẫn là đầu ra bắt buộc khi nghiệm thu A2-4.1; không dựng biên bản họp, Daily hoặc Burndown giả.

A2 nghiệm thu theo gate Task 1 → 2 → 3 → 4 → 5. Được chuẩn bị nháp từ tài liệu đã có nhưng không nghiệm thu nhóm sau trước nhóm trước. CI/CD/production thuộc giai đoạn sau.

## Definition of Done

- Đáp ứng AC của Issue và gate A2; có bằng chứng được chấp nhận.
- Code/build/test đạt trong phạm vi liên quan; API validate đầu vào; UI có loading/error khi phù hợp.
- Có commit/PR, ít nhất một thành viên khác tác giả review và liên kết Issue/PR/test; merge không tự chứng minh đã có review submission hoặc acceptance.
- Tài liệu/README/truy vết cập nhật khi thay đổi; không lộ secrets.
- Thiết kế/nháp, build scaffold và Issue được tạo không tự đáp ứng DoD nghiệp vụ.

## Quy ước kỹ thuật

Next.js → NestJS REST/JSON → PostgreSQL; frontend không gọi DB. Prisma dự kiến; không tự đổi ORM. Dùng [API conventions](../api/API_CONVENTIONS.md) làm đề xuất chung và [API spec](../api/API_SPEC.md) để rà xung đột, không tự coi mọi điểm đã chốt. ID UUID string, tiền integer VND, qty cho số ly và quantity cho topping là quy ước đang review. Không commit secrets/.env thật. Host production và hạn nộp phải lấy từ quyết định thật; chưa deploy Buổi 1.

## Pending Decisions

Bảng này là nguồn theo dõi quyết định duy nhất. **Mốc xử lý là điều kiện chặn theo task, không phải deadline ngày/giờ nhóm đã duyệt**; Hưng đề nghị cả nhóm xác nhận owner và mốc cụ thể trong phản hồi/Planning. Buổi 1 chỉ thu nhận người chịu trách nhiệm và hướng xử lý; nội dung requirements/UML/API được chốt ở phiên đúng phạm vi.

- Buổi 1 cần chốt: vai trò, quy tắc làm việc, owner và cách review (PD-01/02 cùng phân công).
- Trước implementation: PD-05–11 phải có owner và mốc xử lý; không lấy đề xuất làm contract đã duyệt.
- Giai đoạn sau: PD-03 lịch nộp cần nguồn chính thức; PD-04 chốt provider trước A2-3.2 rồi CD/production tại Task 5. PD-12 đã có PDF nhưng còn requirements Buổi 2.

| Mã | Vấn đề | Người chịu trách nhiệm | Mức ảnh hưởng | Trạng thái | Bước xử lý tiếp theo |
| --- | --- | --- | --- | --- | --- |
| PD-01 | Buổi 1 — cao: PO Phát/SM Hưng, cả năm người thuộc Development Team là đề xuất. | Cả nhóm; Hưng thu phản hồi | Điều kiện kết thúc Buổi 1 | PENDING — CHỜ XÁC NHẬN | Mỗi người phản hồi vai trò/rules; lưu bằng chứng thật trước đóng Buổi 1. |
| PD-02 | Buổi 1 — cao: quy trình branch/PR, người merge chính/dự phòng và owner. Repository connector cho quyền admin, chưa chứng minh quyền của Phát hoặc Projects. | Hưng/Phát; cả nhóm duyệt rules | Điều kiện kết thúc Buổi 1 | PENDING — CHỜ XÁC NHẬN | Xác minh quyền từng người và Board thủ công; chốt một người khác review; phản hồi hoặc quyết định trì hoãn có owner/mốc rõ trước đóng Buổi 1. |
| PD-03 | Điều phối — ngày/giờ/nơi nộp chính thức chưa có nguồn. A2 cho phép video hoặc demo trực tiếp. | Hưng/cả nhóm hỏi giảng viên | Kế hoạch nộp bài; chưa chặn soạn hồ sơ Buổi 1 | PENDING — CHỜ XÁC NHẬN | Nhận thông báo chính thức, lập mốc công việc ở Planning; không bịa deadline/nơi nộp. |
| PD-04 | Giai đoạn sau — host/DB/registry/HTTPS/backup/rollback. A2-3.2 cần sơ đồ phản ánh provider nhóm chọn. | Thắng/cả nhóm; Khoa DB, Hưng kiến trúc | Trước nghiệm thu A2 Task 3; triển khai tại Task 5 | PENDING — CHỜ XÁC NHẬN | Thắng chuẩn bị lựa chọn/giới hạn/chi phí để nhóm duyệt trước A2-3.2; không deploy hoặc chọn thay nhóm trong Buổi 1. |
| PD-05 | Trước code — cao: yêu cầu hiện hành không triển khai timer; BR-16/SRS/AC/ERD/Architecture/Sequence cũ còn 15 phút/expiresAt. | Phát/Khoa/Thắng; Hưng điều phối | Chặn implementation Orders/Inventory/Payments | PENDING — CHỜ XÁC NHẬN | Buổi 1 yêu cầu owner nhận xử lý; ở Buổi 2 xác nhận giữ/hoàn hàng/retry/cancel khi bỏ timer và danh sách sửa đồng bộ trước code. Không cron/auto-cancel, không tự đặt thời hạn mới. |
| PD-06 | Trước code — cao: Orders/Sequence cũ ADMIN/COD/GET /orders khác A1 WALLET-CARD/GET /orders/me và kiến trúc CUSTOMER-STAFF. | Phát/Thắng/Khoa/Huy | Trước PR API Orders/Auth/Payment/History | PENDING — CHỜ XÁC NHẬN | Owner đề xuất route/quyền/ownership, /me trước /:id; chỉ giữ mở rộng khi có duyệt; không chốt contract trong Buổi 1. |
| PD-07 | Trước code — cao: quantity/toppingIds khác qty/toppings.quantity; prod_001/size khác UUID/sizeCode; PRODUCT.stock_qty khác INVENTORY. ERD cũ còn ghi Phát tích hợp Prisma, phân công hiện hành là Khoa. | Phát/Huy/Hưng/Khoa/Thắng | Trước PR schema/DTO/Orders/Cart | PENDING — CHỜ XÁC NHẬN | Nhận mapping DTO/FK/transaction từ owner, giữ Khoa chủ schema và review chỗ ERD lỗi thời; sửa đồng bộ hồ sơ ở phiên sau, không migration Buổi 1. |
| PD-08 | Trước code — cao: Payment enum PROCESSING/REFUNDED so ERD PENDING/REFUND; scope key/fingerprint/TTL và replay/in-progress chưa chốt. | Thắng/Phát/Khoa | Trước PR Payments/idempotency và migration constraints | PENDING — CHỜ XÁC NHẬN | Chốt bảng enum/unique/key/retry/transaction bằng review owner trước code; không tự đặt TTL. |
| PD-09 | Trước code — cao: Sequence cũ xóa giỏ PENDING/xóa reservation, Orders↔Payment có nguy cơ vòng, GET status lại ghi thành công. | Phát/Thắng/Khoa/Huy | Trước PR tích hợp Orders–Inventory–Payment–Loyalty | PENDING — CHỜ XÁC NHẬN | Owner xác nhận hướng điều phối/transaction/ledger đúng một lần, GET chỉ đọc, giữ giỏ tới PAID và mua ngay giữ giỏ; đưa nhánh race vào kế hoạch test sau. |
| PD-10 | Trước code — cao: giá đầy đủ size so phụ thu; quota Promotion còn khác BR. | Hưng/Huy/Phát | Trước PR pricing/Products detail/Cart/Promotion | PENDING — CHỜ XÁC NHẬN | Đối chiếu nguồn quyết định hiện có, owner duyệt thuật ngữ/công thức/quota và file cần sửa; không tự cộng giá S vào M/L hoặc thêm quota. |
| PD-11 | Trước code/kiểm thử — JWT/session/logout, NFR <500ms, browser matrix; link/version Figma. | Khoa/Thắng/Huy/Phát | JWT trước Auth/UI; Figma trước UI; NFR/browser trước kiểm thử tương ứng | PENDING — CHỜ XÁC NHẬN | Owner đề xuất cơ chế/URL/method đo; Hưng đề nghị mốc theo Planning, không tạo token policy hoặc metrics giả. |
| PD-12 | Nguồn đã xác minh: đã đọc A2 VER 1.0 local, backlog đối chiếu ở PR #33. FR/NFR/MoSCoW/AC/phê duyệt requirements vẫn thiếu evidence. | Hưng/cả nhóm | Phần requirements ở Buổi 2; trước nghiệm thu A2 Task 1 | PENDING — ĐÃ XÁC MINH PDF, CHỜ XÁC NHẬN requirements | Giữ kết quả nguồn; Buổi 2 triển khai review A2-1.1/1.2/1.3 theo thứ tự, không đóng PD-12 chỉ vì PDF/Issue đã có. |

Cách phản hồi và hồ sơ từng người: [Yêu cầu review Buổi 1](day1-review-request.md). Phản hồi có thể APPROVED / CHANGES_REQUESTED / BLOCKED nhưng phải do thành viên đưa ra và kèm link/commit; hiện chưa ghi nhận APPROVED cho bất kỳ ai.

## Xác nhận

| Hưng | Khoa | Huy | Phát | Thắng |
|---|---|---|---|---|
| PENDING | PENDING | PENDING | PENDING | PENDING |
