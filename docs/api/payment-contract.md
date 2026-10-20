# BrewLite — Payment contract

**DRAFT — Pending owner review.** Owner: Thắng. Review: Phát (Orders), Khoa (DB/Auth/Inventory), Huy (Checkout UI/Loyalty), Hưng (API). Không triển khai/deploy trong Buổi 1.

Nguồn: A1-08/10, [UC-10/11](../USE_CASES.md), [BR-21–28](../BUSINESS_RULES.md), [API conventions](API_CONVENTIONS.md), [ERD 3.9/5/6](../ERD_DETAILED.md). Xem [Pending Decisions PD-05–11](../scrum/team-working-agreement.md#pending-decisions).

## Ranh giới và kết quả

POST /payments là endpoint bắt buộc A1. Mock WALLET/CARD; không COD/thu tiền thật/thông tin thẻ thật. Backend xác thực JWT, quyền chủ đơn, trạng thái và lấy amount từ đơn đã lưu; DTO request/response hoàn chỉnh chờ owner chốt. Checkout UI do Huy, backend Payment do Thắng; Phát sở hữu Orders. GET đọc trạng thái chỉ đọc, không xử lý thành công như Sequence cũ.

| Tình huống | Kết quả nghiệp vụ cần bảo đảm |
|---|---|
| Thành công | Payment SUCCEEDED và Order PAID; consume kho/loyalty đúng một lần cùng transaction theo mô hình được duyệt |
| Thất bại đã xác nhận | Payment FAILED, Order PAYMENT_FAILED; giữ giỏ, không cộng điểm/trừ thêm kho |
| Chưa biết kết quả/mất phản hồi | UI đang kiểm tra; tra cứu/gửi lại khóa cũ, không tự báo thất bại |
| Sai quyền/trạng thái/đã CANCELLED | Từ chối; không tác động payment/order/kho/điểm |

Enum PROCESSING/PENDING và REFUNDED/REFUND là xung đột mapping PD-08, chưa khóa API enum thay chủ sở hữu.

## Idempotency và retry

Idempotency-Key gắn danh tính, thao tác và fingerprint request. Cùng key/body trả kết quả đã lưu sau kiểm tra quyền; khác body từ chối theo conventions. Hai request đồng thời cùng key không tạo hai payment; khác key cùng order cũng không được ghi hai lần SUCCEEDED. Unique constraint và kiểm tra trạng thái trong transaction phải hỗ trợ nhau; không chỉ dựa vào khóa nút UI hoặc find rồi insert không chống race.

Thất bại đã xác nhận: thử lại cùng order bằng key mới khi trạng thái cho phép; PAYMENT_FAILED → PENDING theo State Machine. Mất mạng chưa rõ kết quả: dùng key/body cũ. Scope unique, fingerprint canonicalization, TTL, HTTP replay, REQUEST_IN_PROGRESS và cách mô phỏng success/failure cần Thắng/Phát/Khoa duyệt; không tự đặt số TTL hoặc timer 15 phút.

Payment không tạo đơn mới: POST /orders là điểm tạo đơn. Thành công chỉ xóa giỏ của lượt mua từ giỏ; mua ngay giữ giỏ có sẵn. Hủy PAID hợp lệ phối hợp Phát/Khoa/Huy để refund mock, hoàn kho, đảo điểm đúng một lần, không tạo phụ thuộc vòng.

## Review và kiểm thử giai đoạn sau

- [ ] Thắng/Phát chốt state/enum và transaction boundary với Khoa; giải quyết no-timer PD-05.
- [ ] Chốt DTO UUID/qty, không tin amount client, endpoint status chỉ đọc và ownership.
- [ ] Test success/failure, lặp key, key khác body, cùng order khác key đồng thời, retry sau fail, timeout/replay, cancel race, ledger đúng một lần.
- [ ] Cung cấp commit/test log/PR thật; chưa có Payment runtime hoặc deployment evidence.

## Điều kiện triển khai để Thắng chốt ở A2-3.2/5.3/5.4

| Điều kiện | Hồ sơ/bằng chứng cần có | Hiện trạng |
|---|---|---|
| Hosting và deadline | Host/account/giới hạn, ngày giờ nộp chính thức | PENDING; chưa có URL deploy |
| HTTPS và origins | TLS, domain, CORS và public API URL đúng môi trường | PENDING |
| Secrets | Secret store/env, JWT/DB credentials ngoài Git; không đưa giá trị thật vào Issue/log | PENDING |
| Database private | DB chỉ backend truy cập, migration có review, backup/restore và volume | PENDING |
| Health/NFR | Health endpoint thực, readiness DB, phép đo API <500ms với dataset/tải công bố | PENDING; GET / Hello chưa là health DB |
| CI/CD | Build/test bắt buộc trước deploy; môi trường đích và quyền được duyệt | PENDING; không làm trước A2 gate |
| Dự phòng/rollback | Bản phát hành tốt gần nhất, rollback app tương thích DB, backup và demo local khi host lỗi | PENDING; không tuyên bố đã diễn tập |
