# BrewLite — Order transitions và Checkout checklist

> **DRAFT — Pending owner and cross-module review.** Owner: Phát. Reviewer đề nghị: Khoa (Inventory/DB/Auth), Thắng (Payment), Huy (Checkout/cart/loyalty), Hưng (traceability/requirements). Đây là bản chuẩn bị review, chưa phải nghiệm thu.

**Nguồn đối chiếu:** PDF `BrewLite-CongNghePhanMem(1).pdf`, Mục 9.1 (đã trực tiếp kiểm tra sơ đồ ở **trang in 7 / trang thứ 8 của PDF**); [Business Rules](../BUSINESS_RULES.md#trạng-thái-và-hủy-đơn), [Acceptance Criteria — US-ORDER-02](../ACCEPTANCE_CRITERIA.md), [Use Cases UC-13/15/18](../USE_CASES.md), [Pending Decisions PD-05–09](../scrum/team-working-agreement.md#pending-decisions), và các Issue A1-06/A1-08/A1-10. Sơ đồ Assignment 1 đã được đối chiếu trực tiếp. Các quy tắc actor, quyền, kho, hoàn tiền và điểm trong bảng bên dưới là hợp đồng/đề xuất nghiệp vụ của dự án; không phải tất cả đều được quy định trong hình State Machine của Assignment 1.

## 1. Phạm vi trạng thái

`OrderStatus`: `PENDING`, `PAYMENT_FAILED`, `PAID`, `PREPARING`, `READY`, `COMPLETED`, `CANCELLED`.

- Không tự thêm `EXPIRED` hoặc trạng thái mới.
- `PaymentStatus` là enum riêng; mapping giữa `OrderStatus` và `PaymentStatus` vẫn chờ PD-08.
- `COMPLETED` và `CANCELLED` là trạng thái kết thúc. Mọi chuyển tiếp không được cho phép bên dưới đều phải bị từ chối.
- Không thêm timeout/cron/auto-cancel cho đến khi nhóm chốt PD-05 và sửa đồng bộ các tài liệu xung đột.

### 1.1 Đối chiếu trực tiếp với Assignment 1, Mục 9.1

Sơ đồ trong PDF khớp với các trạng thái và cạnh dưới đây:

- Luồng chính: `PENDING → PAID → PREPARING → READY → COMPLETED`. Các nhãn trên sơ đồ lần lượt là thanh toán OK, barista nhận, pha xong và giao khách.
- Nhánh thanh toán: `PENDING → PAYMENT_FAILED` khi thanh toán lỗi; `PAYMENT_FAILED → PENDING` khi thử lại.
- Nhánh hủy: `PENDING → CANCELLED`, `PAYMENT_FAILED → CANCELLED` và `PAID → CANCELLED`.
- `COMPLETED` và `CANCELLED` là trạng thái kết thúc. Sơ đồ không vẽ cạnh đi ra từ hai trạng thái này; mọi chuyển tiếp không được nêu phải bị chặn.

**Phạm vi sơ đồ:** Assignment 1 xác định các trạng thái, đường chuyển và các nhãn sự kiện trên; hình không quy định chi tiết actor/role nào được hủy đơn, tác động tồn kho/hoàn tiền/điểm thưởng, timeout giữ hàng hay mã HTTP. Các chi tiết đó phải dựa vào hợp đồng nghiệp vụ khác và được nhóm thống nhất, không gán ngược chúng cho PDF.

## 2. Chuyển tiếp được phép

| Từ | Sang | Điều kiện / quyền | Tác động cần bảo đảm |
|---|---|---|---|
| Khởi tạo | `PENDING` | `POST /orders` hợp lệ; khách đã xác thực; giỏ và lựa chọn hợp lệ | Tạo order, snapshot giá và giữ tồn trong **cùng transaction**; tất cả thành công hoặc rollback toàn bộ. Cùng Idempotency-Key và body không tạo order/giữ hàng lần hai. |
| `PENDING` | `PAID` | Backend xác nhận mock payment thành công | Ghi nhận kết quả payment và cộng điểm đúng một lần. Kho đã được giữ khi tạo đơn; **không trừ/giữ kho lần nữa** khi thanh toán thành công. |
| `PENDING` | `PAYMENT_FAILED` | Payment thất bại đã được xác nhận | Ghi nhận lần payment thất bại; không cộng điểm, không tạo order mới và không giữ kho lần nữa. Timeout/mất phản hồi chưa rõ kết quả **không** đủ căn cứ để chuyển sang trạng thái này. |
| `PAYMENT_FAILED` | `PENDING` | Khách bắt đầu lần retry hợp lệ cho cùng order | Dùng key mới cho lần thử mới; không tạo order mới hoặc reserve thêm. Điều kiện hiệu lực/giữ hàng còn phụ thuộc PD-05 và PD-08/09 chưa chốt. |
| `PENDING` | `CANCELLED` | Chủ đơn (`CUSTOMER`) hủy đơn chưa thanh toán | Kiểm tra quyền và trạng thái tại thời điểm xử lý; cập nhật trạng thái và release reservation đúng một lần trong transaction. |
| `PAYMENT_FAILED` | `CANCELLED` | Chủ đơn (`CUSTOMER`) hủy đơn chưa thanh toán | Như trên; yêu cầu lặp chỉ trả trạng thái/kết quả đã ghi, không release lần hai. |
| `PAID` | `PREPARING` | Nhân viên có quyền `STAFF` tiếp nhận pha chế | Cập nhật có điều kiện từ trạng thái mới nhất; không ghi đè thay đổi do request cạnh tranh. |
| `PAID` | `CANCELLED` | Sơ đồ Assignment 1 có cạnh hủy từ `PAID`; actor/quyền cụ thể cần theo Business Rules và chốt PD-06 (không được suy ra chỉ từ hình). | Nếu được phép hủy: ghi refund mô phỏng, hoàn kho theo Inventory contract, đảo đúng số điểm đã cộng và chuyển trạng thái một cách nhất quán; từng tác động chỉ xảy ra một lần. |
| `PREPARING` | `READY` | `STAFF` xác nhận pha xong | Cập nhật trạng thái có điều kiện. |
| `READY` | `COMPLETED` | `STAFF` xác nhận giao đơn tại quầy | Cập nhật trạng thái có điều kiện; `COMPLETED` là trạng thái kết thúc. |

## 3. Chuyển tiếp bị cấm và xử lý request lặp

- Chặn `PENDING → READY/COMPLETED`, `PAID → PENDING/PAYMENT_FAILED`, `PREPARING/READY/COMPLETED → CANCELLED`, mọi chuyển tiếp đi ra từ `COMPLETED` hoặc `CANCELLED`, và mọi cạnh khác không có trong bảng mục 2.
- Hủy đơn và xác nhận thanh toán có thể đến đồng thời. Backend phải kiểm tra trạng thái mới nhất trong transaction/conditional update để **chỉ một nhánh thắng**. Không được vừa ghi `PAID` vừa xử lý hủy/hoàn kho cho cùng order.
- Với cùng Idempotency-Key và cùng nội dung, sau khi xác thực người dùng và quyền xem order, trả lại kết quả đã lưu; không tạo payment/order, không tác động kho/điểm lần nữa. Cùng key nhưng nội dung khác phải bị từ chối theo contract idempotency.
- Mất mạng khi chưa rõ payment outcome: kiểm tra trạng thái hoặc gửi lại cùng key/nội dung cũ. Không tự kết luận thất bại và không tự tạo key mới cho cùng một lần thử chưa rõ kết quả.
- Đề xuất theo Acceptance Criteria hiện có: chuyển trạng thái không hợp lệ trả `HTTP 409 INVALID_TRANSITION`. Một số Sequence cũ mô tả `400`/mã khác; cần cập nhật nguồn cũ theo một contract được Phát và nhóm duyệt trước khi triển khai. Lỗi quyền vẫn phải bị từ chối trước khi có tác động dữ liệu.

## 4. Các quyết định còn chờ — không tự suy đoán

| Mã / nội dung | Điểm cần chốt | Người cần phối hợp |
|---|---|---|
| **PD-05 — Timer/giữ hàng** | `Business Rules` BR-16/18 và Acceptance Criteria cũ ghi giữ hàng 15 phút, `expiresAt` và hoàn hàng khi hết hạn; quyết định hiện hành trong working agreement nói không triển khai timer. Cần quyết định giữ hay bỏ thời hạn và chính sách retry/cancel/release tương ứng. Trước khi chốt: không thêm `EXPIRED`, `expiresAt` mặc định hoặc cron/auto-cancel. | Phát, Khoa, Thắng; Hưng điều phối |
| **PD-06 — Quyền/route** | Đồng nhất `CUSTOMER`/`STAFF` với tài liệu cũ có `ADMIN`; chốt `GET /orders/me`, ownership và thứ tự route `/me` trước `/:id`. | Phát, Thắng, Khoa, Huy |
| **PD-07 — DTO và tồn kho** | Chốt mapping `qty` và `toppings.quantity`, ID/size, cùng transaction; xác định rõ thời điểm reservation được consume, release hoặc return. | Phát, Huy, Khoa, Hưng |
| **PD-08 — Payment enum/idempotency** | Chốt `PaymentStatus`, mapping, key scope/fingerprint, trạng thái đang xử lý, retry và trường hợp kết quả chưa rõ. Không tự đặt TTL. | Thắng, Phát, Khoa |
| **PD-09 — Tác động liên module** | Chốt transaction/ownership giữa Orders–Inventory–Payments–Loyalty; GET chỉ đọc; giỏ chỉ xóa sau PAID; refund/release/đảo điểm chống lặp. | Phát, Thắng, Khoa, Huy |
| **Mã lỗi transition** | Chọn một contract giữa `409 INVALID_TRANSITION` trong AC và mã cũ ở Sequence; cập nhật tất cả tài liệu liên quan. | Phát, Hưng; reviewer các module |

### Quy tắc vận hành trong thời gian chờ chốt

1. Sơ đồ State Machine đã được kiểm tra trực tiếp với PDF Assignment 1, Mục 9.1 (trang in 7). Không mở rộng tập trạng thái/cạnh so với đề nếu chưa được nhóm thống nhất và có căn cứ yêu cầu.
2. Không tự tạo migration, cron hoặc code nghiệp vụ trong Buổi 1; chỉ ghi nhận điểm cần thống nhất.
3. Không đóng A1 Issues vì đã review hồ sơ Buổi 1. Issue chỉ được nghiệm thu khi có AC/test evidence, PR và owner review thật theo DoD.

## 5. Checkout Use Case — chuẩn bị Buổi 2 (A2-1.3)

- [ ] Phát chọn/cross-reference UC-09 tạo đơn, UC-10 thanh toán và UC-11 xác nhận thành Use Case Checkout có ranh giới rõ; không sửa/xóa UC của thành viên khác.
- [ ] Chốt actor/trigger, tiền điều kiện JWT/giỏ hợp lệ, hậu điều kiện success/failure/rollback.
- [ ] Main flow: Menu/Detail → giỏ hoặc mua ngay → xem lại → đăng nhập nếu cần → xác nhận → `POST /orders` tạo `PENDING` → chọn Ví/Thẻ → payment → xác nhận/nhận tại quầy.
- [ ] Alternative flows: mua ngay giữ giỏ có sẵn; thiếu tồn; giá/mã thay đổi; giỏ rỗng; DTO/token/ownership không hợp lệ; failure/retry/mất phản hồi/replay/cancel.
- [ ] Ánh xạ giá do backend tính và snapshot, transaction reserve, idempotency và tác động đúng một lần vào AC/BR.
- [ ] Khoa/Huy/Thắng review phần giao diện liên quan và PD-05–09; ghi quyết định thực tế, không coi đề xuất là quyết định đã duyệt.
- [ ] A2 Task 1 được duyệt trước khi nghiệm thu Activity/Sequence/Class của Task 2; các Sequence cũ chỉ là bản nháp tham khảo cho tới khi đồng bộ.
