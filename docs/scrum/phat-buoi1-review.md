# Phát — Báo cáo kiểm tra phần được giao ở Buổi 1

**Mốc kiểm tra:** 21/10/2026. **Trạng thái:** `READY FOR TEAM REVIEW — NOT YET ACCEPTED`.

Phạm vi lấy từ tài liệu “BrewLite — Hướng dẫn công việc Buổi 1” được cung cấp trong cuộc trò chuyện, kết hợp với [Product Backlog trên GitHub](https://github.com/NguyenKhanhHungDev/Swe_project/blob/main/docs/scrum/backlog.md) và phân công Phát: kiểm tra 10 Issues A1, rà `docs/requirements/order-state-transitions.md`, đối chiếu nguồn yêu cầu/Acceptance Criteria, lập danh sách điểm cần chốt với Khoa/Thắng/Huy/Hưng. Đây là kiểm tra tài liệu, không phải xác nhận chức năng đã chạy.

## 1. Kết quả kiểm tra 10 Issues A1

Backlog trên `main` ghi nhận **10 Issues A1/10 mã khác nhau**, tổng cộng 26 Issues A1/A2 không thiếu/trùng theo snapshot ngày 21/10/2026; toàn bộ 26 đang `OPEN`, có assignee và body khớp hồ sơ ở mốc kiểm tra. Việc gán assignee chỉ là cấu hình GitHub, không thay thế xác nhận nhận việc hoặc review của owner.

| Mã A1 | Issue | Owner theo phân công | Assignee quan sát trên GitHub | Kiểm tra tài liệu |
|---|---:|---|---|---|
| A1-01 — Khởi tạo dự án | [#22](https://github.com/NguyenKhanhHungDev/Swe_project/issues/22) | Hưng | `NguyenKhanhHungDev` | Có Issue; đang OPEN; chưa được nghiệm thu |
| A1-02 — API danh sách sản phẩm | [#23](https://github.com/NguyenKhanhHungDev/Swe_project/issues/23) | Hưng | `NguyenKhanhHungDev` | Có Issue; đang OPEN; chưa được nghiệm thu |
| A1-03 — Menu UI | [#24](https://github.com/NguyenKhanhHungDev/Swe_project/issues/24) | Huy | `khanhhuy11022006-stack` | Có Issue; đang OPEN; chưa được nghiệm thu |
| A1-04 — Chi tiết đồ uống/size/topping | [#25](https://github.com/NguyenKhanhHungDev/Swe_project/issues/25) | Hưng | `NguyenKhanhHungDev` | Có owner, mục tiêu, việc cần làm, sản phẩm và Acceptance Criteria; vẫn DRAFT |
| A1-05 — Giỏ hàng | [#26](https://github.com/NguyenKhanhHungDev/Swe_project/issues/26) | Huy | `khanhhuy11022006-stack` | Có owner, mục tiêu, việc cần làm, sản phẩm và Acceptance Criteria; vẫn DRAFT |
| A1-06 — API tạo đơn hàng | [#27](https://github.com/NguyenKhanhHungDev/Swe_project/issues/27) | Phát | `YESNTED` | Có việc cần làm, đầu ra, AC và lệnh kiểm thử dự kiến; kiểm thử chưa được chứng minh đã chạy |
| A1-07 — Đăng ký/đăng nhập JWT | [#28](https://github.com/NguyenKhanhHungDev/Swe_project/issues/28) | Khoa | `dangkhoa510038-source` | Có Issue; đang OPEN; chưa được nghiệm thu |
| A1-08 — Payment WALLET/CARD mô phỏng | [#29](https://github.com/NguyenKhanhHungDev/Swe_project/issues/29) | Thắng | `huuthang060306-droid` | Có việc cần làm và cần chốt key/transaction; vẫn DRAFT |
| A1-09 — Xác nhận/lịch sử đơn/bàn giao | [#30](https://github.com/NguyenKhanhHungDev/Swe_project/issues/30) | Phát | `YESNTED` | Có AC cho ownership, history, UI và Compose; test evidence còn là đầu việc |
| A1-10 — State Machine/idempotency/concurrency/promo/loyalty | [#31](https://github.com/NguyenKhanhHungDev/Swe_project/issues/31) | Phát | `YESNTED` | Có AC transition, idempotency, DB concurrency, promo/loyalty; test evidence còn là đầu việc |

**Kết luận về Issue:** không thấy Issue A1 bị thiếu hoặc trùng trong snapshot backlog. Tuy nhiên, các mô tả đều không phải bằng chứng hoàn thành chức năng; backlog ghi Issue comments bằng 0 tại snapshot, còn các Issue được xem trực tiếp có trạng thái `DRAFT — Pending owner review`. Không tự chuyển Issue sang Done/đóng Issue ở Buổi 1. Nếu owner chưa review nội dung, cần yêu cầu owner đọc, sửa hoặc xác nhận trong PR/Issue.

## 2. Rà bảng chuyển trạng thái Order

Bảng trong `order-state-transitions.md` biểu diễn luồng cơ bản sau, tương ứng với các quy tắc BR-29–34 trong bản Business Rules hiện có:

`Khởi tạo → PENDING → PAID → PREPARING → READY → COMPLETED`

Nhánh phụ: `PENDING → PAYMENT_FAILED → PENDING` cho lần retry hợp lệ; `PENDING/PAYMENT_FAILED → CANCELLED` do chủ đơn; `PAID → CANCELLED` do STAFF trước khi pha. `COMPLETED` và `CANCELLED` là trạng thái kết thúc. Không thêm trạng thái `EXPIRED`.

Các chỉnh sửa/điểm làm rõ trong bản đề xuất của Phát:

1. Phân biệt **payment thất bại đã xác nhận** với **mất phản hồi chưa rõ kết quả**; trường hợp chưa rõ kết quả phải kiểm tra/gửi lại cùng key, không tự chuyển `PAYMENT_FAILED`.
2. Retry giữ cùng order, dùng key mới cho lần thử mới và không tạo order/reservation khác. Điều kiện expiry/giữ hàng vẫn chờ PD-05.
3. Hủy phải kiểm quyền và trạng thái mới nhất; thao tác release/refund/đảo điểm không được chạy hai lần.
4. Cạnh tranh thanh toán–hủy chỉ được có một nhánh thắng bằng transaction/conditional update.
5. Thanh toán thành công cộng điểm đúng một lần; không giữ/trừ tồn kho lần nữa, vì giữ kho thuộc transaction tạo đơn.
6. AC hiện tại ghi `409 INVALID_TRANSITION`, trong khi Sequence cũ có mã `400`/mã khác. Cần đồng bộ contract trước khi code.

### Đối chiếu trực tiếp với Assignment 1

Đã nhận và trực tiếp kiểm tra PDF `BrewLite-CongNghePhanMem(1).pdf`, Mục 9.1, sơ đồ ở **trang in 7 (trang thứ 8 của PDF)**. Sơ đồ quy định:

- Luồng chính: `PENDING → PAID → PREPARING → READY → COMPLETED`.
- Thanh toán lỗi và thử lại: `PENDING → PAYMENT_FAILED → PENDING`.
- Hủy đơn: `PENDING → CANCELLED`, `PAYMENT_FAILED → CANCELLED`, `PAID → CANCELLED`.
- `COMPLETED` và `CANCELLED` là trạng thái kết thúc; các chuyển tiếp không được vẽ phải bị chặn.

Bản đề xuất `order-state-transitions.md` khớp với các trạng thái và cạnh trong sơ đồ. PDF không tự quy định chi tiết quyền hủy, timeout giữ hàng, xử lý tồn kho/refund/loyalty hay mã HTTP; các phần này được tách thành điểm cần đối chiếu với Business Rules, API contract và các quyết định chờ của nhóm.

## 3. Các điểm cần Phát điều phối cùng nhóm

| Mã/đối tác | Cần chốt | Điều kiện đóng điểm |
|---|---|---|
| **PD-05 — Khoa + Thắng** | Chính sách giữ hàng/timeout đang mâu thuẫn: working agreement yêu cầu không triển khai timer, còn Business Rules/Acceptance Criteria cũ ghi 15 phút và `expiresAt`. | Nhóm xác nhận giữ hay bỏ thời hạn, xử lý retry/cancel và reserve/release; thống nhất các tài liệu liên quan trước khi code. |
| **PD-06 — Khoa + Thắng + Huy** | Vai trò `CUSTOMER`/`STAFF` so với `ADMIN` cũ; `GET /orders/me`, ownership và route order. | Có một contract được owner duyệt; Sequence/API/AC dùng cùng tên role và endpoint. |
| **PD-07 — Khoa + Huy + Hưng** | DTO `qty`/`toppings.quantity`, ID/size, transaction và lifecycle reserve/consume/release/return. | Khoa duyệt schema/Inventory contract; Phát mapping đúng contract, không tự thay schema hay migration trong Buổi 1. |
| **PD-08 — Thắng + Khoa** | `PaymentStatus`, key scope/fingerprint, replay, đang xử lý và retry. | Payment contract được Thắng và reviewer duyệt; cùng key/body replay, cùng key khác body bị từ chối, request khác key cho cùng order không thanh toán thành công hai lần. |
| **PD-09 — Thắng + Khoa + Huy** | Transaction/race giữa payment, cancel, inventory, cart và loyalty. | Quy tắc “một nhánh thắng, mỗi tác động một lần” được ghi vào contract và có kế hoạch test DB thật ở giai đoạn triển khai. |
| **Hưng** | Chốt cách biểu diễn lỗi transition và đồng bộ AC/Sequence; duyệt backlog/truy vết. | Một mã lỗi và quy tắc authorization thống nhất; PR được người khác review. |
| **Phát — vai trò PO** | Working Agreement đang ghi Product Owner là vai trò đề xuất, **pending Phát xác nhận**. | Phát tự phản hồi nhận/không nhận vai trò; không thể ghi nhận thay Phát. |

## 4. Việc được hoàn thành / chưa hoàn thành ở Buổi 1

- [x] Kiểm tra snapshot backlog: A1-01…A1-10 có đủ mã và Issue; assignee được ghi nhận; Issue vẫn OPEN.
- [x] Rà state transition cùng Business Rules, Acceptance Criteria, Use Cases và Pending Decisions trong repository.
- [x] Ghi rõ các cạnh chuyển hợp lệ, replay/retry, race payment-vs-cancel và các điểm cần phối hợp liên module trong bản đề xuất `docs/requirements/order-state-transitions.md`.
- [x] Trực tiếp đối chiếu sơ đồ trang in 7 (trang thứ 8 trong PDF) của Assignment 1; các trạng thái/cạnh và trạng thái kết thúc khớp với bảng đề xuất.
- [ ] Nhóm chốt PD-05–09 và mã lỗi transition; các hợp đồng liên quan cập nhật đồng bộ.
- [ ] Phát phản hồi có/không nhận vai trò Product Owner trong nhóm chat.
- [ ] Owner từng Issue review thật, đưa bằng chứng PR/test theo DoD khi task được triển khai. Không coi issue creation hoặc tài liệu draft là nghiệm thu.

## 5. Mẫu phản hồi gửi Hưng

Sửa dòng xác nhận vai trò theo lựa chọn thật của Phát trước khi gửi:

> Phát — BUỔI 1 — ĐÃ KIỂM TRA / CẦN CHỐT  
> Đã kiểm tra: [A1 Issues](https://github.com/NguyenKhanhHungDev/Swe_project/issues), [Order state transitions](https://github.com/NguyenKhanhHungDev/Swe_project/blob/main/docs/requirements/order-state-transitions.md), [Backlog](https://github.com/NguyenKhanhHungDev/Swe_project/blob/main/docs/scrum/backlog.md).  
> Kết quả: Snapshot hiện có đủ 10/10 Issue A1, đang OPEN; các Issue chưa được nghiệm thu. Đã trực tiếp đối chiếu State Machine với Assignment 1, Mục 9.1; các trạng thái/cạnh khớp, còn quy tắc quyền và tác động liên module cần review riêng.  
> Điểm cần chốt: PD-05 timeout/giữ hàng; PD-06 role/route; PD-07 inventory/DTO; PD-08/09 payment key và transaction; mã lỗi `409 INVALID_TRANSITION` so với Sequence cũ.  
> Vai trò Product Owner: [ĐỒNG Ý NHẬN / KHÔNG NHẬN — chọn đúng quyết định của Phát].
