# BrewLite — Promotions & Loyalty API

**Bước 13 · Phụ trách: Huy · Ngày: 14/10/2026 · Trạng thái: REVIEW.**

Tài liệu theo [API conventions](API_CONVENTIONS.md),
[Architecture](../ARCHITECTURE.md), [Detailed ERD](../ERD_DETAILED.md),
[SRS](../SRS.md) UC-08/14/18 và [Business Rules](../BUSINESS_RULES.md) BR-08–12/28/32.
Backend hiện chưa triển khai Promotions/Loyalty/Prisma. Ví dụ là hợp đồng thiết
kế, không phải kết quả API hoặc seed.

**Khác biệt cần review:** Huy xác nhận giữ UC-08 cũ có kiểm tra còn lượt. Main
BR-08/REQUIREMENTS_DECISIONS và ERD chưa có giới hạn lượt. Phần quota dưới đây
là **đề xuất của Huy**, chưa là quyết định nhóm; không tự sửa BR/ERD hoặc thêm
migration. Phần tiêu điểm cũng chưa có tỷ lệ/quy tắc được chốt, không tạo redeem API.

## 1. Hợp đồng chung

| Thuộc tính | Quy định |
|---|---|
| URL | Không /api hoặc /v1; tương đối với backend origin |
| Auth / role | JWT hợp lệ, CUSTOMER; STAFF không tự kế thừa quyền này |
| Ownership | userId lấy từ JWT, không cho client chọn userId |
| Headers | Accept JSON; Authorization Bearer; POST có Content-Type JSON |
| Cache | Đề xuất response Cache-Control: no-store, không coi cache là báo giá hiện tại |
| Thành công | {data: ...}; danh sách data là array, phân trang meta cùng cấp |
| Lỗi | {error:{code,message,details}}; details array field/code/message, không echo input |
| Tiền / ID / thời gian | VND integer an toàn, UUID string, ISO 8601 UTC |
| Validation | Field/query lạ bị 400 VALIDATION_ERROR; GET không body |

Ba endpoint được đề xuất: `POST /promotions/validate`, `GET /loyalty/me` và
`GET /loyalty/me/transactions` (endpoint lịch sử **tùy chọn, chờ duyệt phạm vi**
UC-14 theo REQUIREMENTS_DECISIONS). Không tạo endpoint public cộng/đảo điểm.

## 2. PRO-01 — Kiểm tra/áp mã

### 2.1. Request

**Method/path:** `POST /promotions/validate`. **Nguồn:** UC-08, US-PROMO-01 của
Huy, BR-08–12. **Mục đích:** báo giá giỏ/cấu hình mua, tính tiền chính thức và
kiểm tra mã; không tạo đơn, giữ kho hoặc tiêu thụ lượt. **Người dùng:** Cart
(Huy), Checkout (Thắng), Orders gọi PromotionsService nội bộ.

JWT/role theo mục 1. Không path/query. Không cần Idempotency-Key vì đây là thao
tác đọc/tính, không ghi giao dịch. Body:

| Field | Kiểu và ràng buộc |
|---|---|
| code | string required, không null; trim/uppercase, không rỗng, ≤64 ký tự sau chuẩn hóa theo PROMOTION.code |
| items | array required, ≥1 dòng; CartItemInput trong cart.md |
| items[].productId | UUID required; sản phẩm tồn tại/được bán |
| items[].sizeCode | enum S/M/L required; có size theo món |
| items[].qty | integer required, 1–99 |
| items[].toppings | array required; [] nếu không chọn; không trùng ID |
| toppings[].toppingId / quantity | UUID thuộc món; integer 1–3 trên mỗi ly |

Topping 0 phần ở UI được bỏ trước khi gửi. JSON không nhận giá/subtotal/discount,
userId hoặc số lượt do client tự khai. Catalog theo Products, không dùng giá
base+surcharge của prototype Vite. Kiểm tra tổng qty cùng sản phẩm với tồn khả
dụng qua InventoryService đọc; không giữ hàng ở validate.

```json
{
  "code": " brew10 ",
  "items": [{
    "productId": "32cc8746-fbaf-4dc4-9d58-9caf39df1601", "sizeCode": "M", "qty": 2,
    "toppings": [{"toppingId":"60cd6f0c-20e8-4ed5-8d69-e061463fbe02","quantity":2}]
  }]
}
```

### 2.2. Thành công — 200

Required fields, không null: promotionCode string chuẩn hóa; subtotalVnd,
discountVnd, totalVnd integer an toàn, totalVnd >0. Ví dụ M 35.000 + 2 phần
trân châu × 5.000, 2 ly =90.000; BREW10 giảm 10%, từ 50.000, tối đa 20.000:

```json
{"data":{"promotionCode":"BREW10","subtotalVnd":90000,"discountVnd":9000,"totalVnd":81000}}
```

Mã/date/quota trong ví dụ là fixture đề xuất, không khẳng định có trong DB.
Response không công bố user/quota nội bộ hay raw Prisma entity.

### 2.3. Quy tắc tính, thay và bỏ mã

1. Trim/uppercase; tra PROMOTION, kiểm tra is_active, starts_at ≤ thời gian
   backend < ends_at và minimum_subtotal_vnd. Ngày hiệu lực lấy từ database.
2. Catalog hợp lệ mới tính subtotal từ giá đầy đủ PRODUCT_SIZE và giá
   PRODUCT_TOPPING theo món, gồm số phần mỗi ly.
3. `discountVnd = min(floor(subtotalVnd * percent / 100), maximumDiscountVnd,
   subtotalVnd)`; total=subtotal−discount phải >0. NUMERIC(5,2) xử lý phần trăm
   chính xác (decimal hoặc số nguyên phần trăm ×100), không tính tiền bằng float.
4. Theo **đề xuất Huy**, cần kiểm tra mã còn lượt. Không tự lấy số đơn dùng mã
   làm số lượt: chưa chốt lúc giữ/trừ/hoàn, loại giới hạn và trạng thái được tính.
   Không tuyên bố schema hiện tại đã đủ kiểm tra quota.
5. Một mã/đơn; mã mới hợp lệ thay cũ. Mã mới lỗi thì kiểm tra lại mã cũ, giữ
   nếu còn hợp lệ; nếu mã cũ cũng lỗi thì bỏ giảm và thông báo tổng mới.
6. Bỏ mã là thao tác frontend: promotionCode=null, discount=0, total bằng
   subtotal hiện tại; không cần DELETE endpoint. Giỏ rỗng bỏ mã/chặn checkout.
7. Giỏ thay đổi gọi lại validate. Lỗi mạng/500 không giả báo giá hoặc tự xác
   nhận tổng. Tạo đơn phải kiểm tra lại; mã lỗi không tự tạo đơn giá cao hơn.
8. Orders dùng snapshot giá/giảm đã chốt trong hạn cho đơn đã tạo, không tính
   lại voucher của giỏ mới để tiếp tục trả đơn cũ.

### 2.4. Lỗi và client handling

| HTTP / error.code | details.code hoặc lý do | Cách xử lý |
|---|---|---|
| 400 VALIDATION_ERROR | REQUIRED/INVALID_TYPE/INVALID_UUID/INVALID_ENUM/OUT_OF_RANGE/UNKNOWN_FIELD | Báo field sai, không đổi giỏ |
| 401 UNAUTHORIZED | JWT thiếu/sai/hết hạn | Có WWW-Authenticate: Bearer; giữ giỏ và mã nhập, re-auth |
| 403 FORBIDDEN | Không CUSTOMER | Không áp mã hoặc lộ dữ liệu |
| 409 CONFLICT | CART_EMPTY, PRODUCT_UNAVAILABLE, OUT_OF_STOCK | Yêu cầu sửa giỏ; không giữ kho |
| 409 CONFLICT | PROMOTION_NOT_FOUND/INACTIVE/NOT_STARTED/EXPIRED/MIN_SUBTOTAL | Báo lý do, giữ mã cũ nếu hợp lệ |
| 409 CONFLICT | PROMOTION_EXHAUSTED (đề xuất quota Huy) | Mã hết lượt; đổi/bỏ mã |
| 409 CONFLICT | NON_POSITIVE_TOTAL | Không áp mã làm tổng ≤0 |
| 500 INTERNAL_ERROR | Lỗi dữ liệu/truy vấn/serialization; quota chưa cấu hình nếu triển khai đề xuất | Báo không kiểm tra được; không giả có lượt hoặc discount=0 |

```json
{"error":{"code":"CONFLICT","message":"Giỏ chưa đạt giá trị tối thiểu để áp mã","details":[{"field":"items","code":"PROMOTION_MIN_SUBTOTAL","message":"Giỏ cần đạt tối thiểu 50.000 VND"}]}}
```

### 2.5. Mapping và quyết định quota chưa duyệt

| JSON / phép tính | ERD |
|---|---|
| promotionCode | PROMOTION.code |
| percent / ngưỡng / trần | discount_percent / minimum_subtotal_vnd / maximum_discount_vnd |
| Hiệu lực | starts_at / ends_at / is_active |
| Tiền snapshot đơn | ORDER.subtotal_vnd / discount_amount_vnd / total_amount_vnd và snapshot mã/% |
| Lượt voucher | **Chưa có cột/bảng tương ứng**, cần Hưng/Phát review thiết kế bổ sung |

Huy đề xuất service đọc eligibility quota và gọi lại khi tạo đơn trong **transaction
chung**. Cần chốt giới hạn toàn hệ thống hay mỗi user, điểm giữ/trừ/hoàn lượt,
quy tắc đơn hết hạn/thất bại/hủy PAID, và cơ chế tranh lượt. Không trừ lượt ở API
validate. Chỉ được implement sau khi group rule + ERD + Orders contract đồng bộ;
không tự thêm các field limit/usedCount hoặc endpoint quản trị trong lượt này.

## 3. LOY-01 — Kiểm tra điểm của mình

**Method/path:** `GET /loyalty/me`. **Nguồn:** UC-14, BR-28/32. **Mục đích:** đọc
số dư từ ledger, không tự cộng/tiêu điểm. **Người làm:** Huy; UI theo phân công
Loyalty của Huy và phối hợp tài khoản Khoa.

JWT CUSTOMER theo mục 1; không path/query/body, không Idempotency-Key. Request:

```http
GET /loyalty/me HTTP/1.1
Authorization: Bearer <token>
Accept: application/json
```

200, object required field loyaltyPoints: integer trong miền an toàn, không âm:

```json
{"data":{"loyaltyPoints":8}}
```

Tài khoản mới/ledger rỗng =0. Số dư =SUM(LOYALTY_TRANSACTION.points_delta) của
user từ JWT; USER không có cột loyaltyPoints trong ERD hiện tại. Không bịa thêm
cột/cache số dư. Tổng ledger sai/âm/vượt miền an toàn là lỗi dữ liệu 500, không
clamp về 0. Đọc sau PAID/commit phải thấy kết quả mới; không cập nhật số dư client
như một kết quả chính thức.

| HTTP / error.code | Điều kiện |
|---|---|
| 400 VALIDATION_ERROR | Query không hỗ trợ/body không rỗng |
| 401 UNAUTHORIZED | Thiếu/sai/hết hạn token; WWW-Authenticate Bearer |
| 403 FORBIDDEN | Role không được phép |
| 500 INTERNAL_ERROR | Không đọc được ledger hoặc số dư không hợp lệ |

```json
{"error":{"code":"INTERNAL_ERROR","message":"Không thể tải điểm thưởng lúc này","details":[]}}
```

UI có loading/lỗi/Thử lại; không hiển thị 0 khi chưa tải được. Nếu GET users/me
sau này trả cùng số dư, Huy/Khoa chốt nguồn đọc để tránh hai logic tính khác nhau.

## 4. LOY-02 — Lịch sử điểm (đề xuất chờ duyệt phạm vi)

UC-14 Huy gửi có bước xem lịch sử tích/tiêu; REQUIREMENTS_DECISIONS trong main
chưa xác nhận phạm vi UI lịch sử. Hợp đồng sau chuẩn bị để review, chưa được coi
là endpoint yêu cầu bắt buộc đã chốt. Chỉ EARN/REVERSAL, không suy ra redeem.

**GET /loyalty/me/transactions**, JWT CUSTOMER; không path/body. Query page
integer ≥1 default1, pageSize integer1–100 default20, parse nghiêm ngặt;
query khác/userId bị 400. Không Idempotency-Key. Đọc đúng user JWT, sắp
created_at DESC, id DESC. Phân trang theo đề xuất chuẩn chung: data array + meta.

```http
GET /loyalty/me/transactions?page=1&pageSize=20 HTTP/1.1
Authorization: Bearer <token>
Accept: application/json
```

200:

```json
{
  "data": [{
    "id":"b3527510-9384-45b0-933b-d598743b7911",
    "orderId":"116aa7b2-4a2c-4903-97cb-6a41f1c98b11",
    "type":"EARN","pointsDelta":8,"createdAt":"2026-10-14T03:00:00.000Z"
  }],
  "meta":{"page":1,"pageSize":20,"totalItems":1}
}
```

Fields required: id UUID, orderId UUID **nullable** theo ERD, type EARN/REVERSAL,
pointsDelta integer có dấu, createdAt UTC; meta integer theo query/tổng bản ghi.
data rỗng là200/[]+meta(totalItems=0), không phải lỗi. id/orderId/type/pointsDelta/
createdAt ánh xạ LOYALTY_TRANSACTION; orderId null không tạo quyền mở đơn.
Lỗi: 400 VALIDATION_ERROR (query/body), 401 UNAUTHORIZED, 403 FORBIDDEN,
500 INTERNAL_ERROR.
Các lỗi dùng mẫu chung mục1/3; đọc lỗi không giả danh sách rỗng. Quyền đọc đơn
khi mở link vẫn do Orders kiểm tra.

## 5. Hợp đồng nội bộ cộng/đảo (không HTTP)

Module điều phối truyền transaction client, không gọi HTTP/controller giữa
module, không mở transaction riêng trong Loyalty. Phụ thuộc theo Architecture:
Payments → Orders/Loyalty; OrderCancellation → Orders/Payments/Inventory/Loyalty;
Orders không gọi ngược Payments.

| Method đề xuất | Input | Output và điều kiện |
|---|---|---|
| creditPaidOrder(tx, orderId) | tx của Payments; orderId UUID đã xác thực/quyền/trạng thái bởi điều phối | Đọc user_id và total_amount_vnd đã chốt; trả số cộng và giao dịch đã có/mới |
| reversePaidOrderPoints(tx, orderId) | tx của OrderCancellationService khi STAFF hủy PAID hợp lệ | Đọc EARN gắn đơn; ghi REVERSAL đối dấu đúng số cũ; trả kết quả đã có/mới |

- `earned = floor(total_amount_vnd / 10000)`: 81.000→8, 84.600→8, 108.000→10.
- ERD: chỉ tạo EARN khi earned>0; earned=0 không ghi giao dịch0. Đơn PAID đã
  ghi nhận vẫn không được thanh toán/cộng lại, dù không có ledger0.
- UNIQUE(order_id,type) bảo vệ cộng/đảo một lần. Nhiều đơn cùng user ghi ledger
  độc lập và tổng SUM đúng; không phải read-modify-write vào một USER balance.
- Nếu cùng nghiệp vụ tồn tại, trả giao dịch cũ, không thêm điểm. Xung đột unique
  hoặc serialization được xử lý/retry bởi **điều phối toàn transaction**; không
  catch lỗi SQL rồi tiếp tục dùng transaction PostgreSQL đã bị abort.
- Hủy PAID phải dùng số EARN cũ, không tính lại theo quy tắc/menu mới. Nếu đơn
  đã earning0 thì reverse là no-op0; thiếu EARN với đơn earning>0 là dữ liệu
  bất nhất, rollback toàn luồng; không tự đoán để hoàn một phần.
- PENDING/PAYMENT_FAILED/CANCELLED trước trả không cộng. Reload, retry hoặc
  PAID→PREPARING/READY/COMPLETED không cộng thêm.
- Đơn, attempt/refund, reservation và ledger commit cùng nhau. Lỗi bất kỳ phải
  rollback cả luồng; service nội bộ không tự trả HTTP 200 cho thao tác chưa commit.

## 6. Kiểm tra và sử dụng điểm theo phân công

File phân công yêu cầu “kiểm tra và sử dụng điểm”; SRS/ERD trong main chỉ có đọc,
EARN/REVERSAL. **Chưa có tỷ lệ/giới hạn/thứ tự voucher–điểm**, không có loại
REDEEM. Không tạo `POST /loyalty/redeem` hoặc tự đặt 1 điểm = 1.000 VND. Sơ đồ thứ tư
giữ tên file được giao, thể hiện kiểm tra điểm và ghi rõ tiêu điểm chờ nhóm chốt.

Nếu nhóm duyệt tiêu điểm cần bổ sung UC/BR, transaction giữ/trừ/hoàn điểm,
idempotency/tranh số dư, snapshot và cách xử lý đảo EARN khi điểm đã tiêu. Nếu
không duyệt, Hưng xác nhận đổi đầu ra thứ tư thành UC-14 xem điểm. Không sửa
schema/nguồn chung hoặc giả tuyên bố nhiệm vụ redeem đã triển khai.

## 7. Kiểm tra khi triển khai

Kiểm tra mã trim/uppercase, thời điểm startsAt/endsAt, ngưỡng/trần giảm,
phần trăm có hai chữ số thập phân, total ≤0, field lạ/tiền client, tổng qty
cùng món và quyền. Test quota chỉ chạy khi thiết kế lượt được duyệt: validate
không tiêu lượt, tranh một lượt không tạo hai đơn, hủy/thử lại theo policy đã chốt.
Test ledger: 0 điểm, cộng/đảo đúng một lần, hai đơn cùng user, rollback payment/refund,
không lộ ledger người khác; unit test với mock không thay kiểm thử đồng thời trên database.
Sequence: [voucher](../diagrams/sequence/promotions-loyalty/01-apply-voucher.puml),
[điểm](../diagrams/sequence/promotions-loyalty/02-use-loyalty-points.puml).
