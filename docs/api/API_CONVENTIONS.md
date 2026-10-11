# BrewLite — Quy chuẩn API chung

**Bước 13 · Phụ trách: Hưng · Ngày: 11/10/2026 · Trạng thái: REVIEW.**

Đây là hợp đồng đề xuất cho API nghiệp vụ, chưa phải hành vi backend đã chạy
hoặc quyết định đã được cả nhóm duyệt. Nền tảng là [Architecture](../ARCHITECTURE.md)
mục 5–6, [SRS](../SRS.md), [Business Rules](../BUSINESS_RULES.md) và
[Detailed ERD](../ERD_DETAILED.md). Các điểm chưa thống nhất được quản lý tại
[API Specification](API_SPEC.md). API Hello hiện trả chuỗi, không thuộc hợp đồng này.

## 1. URL, HTTP và phiên bản

- Đường dẫn dùng danh từ tiếng Anh số nhiều, chữ thường; nhiều từ dùng kebab-case.
  Tham số đường dẫn viết `:id` trong tài liệu, truyền ID thực khi gọi.
- Hai route Products là `/products` và `/products/:id`, tương đối với backend origin.
  Local mặc định là `http://localhost:3001`; không ghi cứng origin trong frontend.
- `backend/src/main.ts` chưa có global prefix hoặc versioning; Architecture chưa
  chốt `/api` hay `/v1`. Bản này giữ đường dẫn không prefix, không tự thêm `/api/v1`.
  Nếu nhóm đổi prefix/version, phải cập nhật đồng bộ spec, client và test trước triển khai.
- Không thêm endpoint chỉ vì tồn tại bảng database. Thao tác nghiệp vụ đặc biệt do
  chủ module đề xuất URL, nguồn UC/BR và quyền; không suy ra CRUD quản trị.

| Method | Quy ước |
|---|---|
| GET | Đọc dữ liệu, không request body, không tạo đơn/giữ kho/thanh toán. |
| POST | Tạo tài nguyên hoặc thực hiện thao tác nghiệp vụ được đặc tả; không mặc định chống lặp. |
| PATCH | Cập nhật một phần; field vắng mặt giữ nguyên, `null` chỉ hợp lệ nếu contract cho phép. Không cho sửa trạng thái tùy ý. |
| DELETE | Xóa tài nguyên khi được yêu cầu và cho phép; không suy ra xóa vật lý/cascade. |

Không mặc định POST/PATCH/DELETE tồn tại cho Products. Thay đổi phá vỡ tương thích
(đổi tên/kiểu field, nghĩa trạng thái, envelope, URL) cần review với mọi consumer.

## 2. Headers

| Header | Request / response | Quy tắc |
|---|---|---|
| `Accept: application/json` | Request | Client nên gửi cho API nghiệp vụ. |
| `Content-Type: application/json` | Request có JSON body; response có JSON | GET không cần Content-Type ở request vì không có body. |
| `Authorization: Bearer <token>` | Request cần đăng nhập | JWT theo Architecture; không đưa token vào URL. |
| `Idempotency-Key` | Request tạo đơn/thanh toán | Theo mục 7; không bắt buộc cho GET. |
| `Cache-Control: no-store` | Response Products, đề xuất | Giảm dùng lại giá/tồn đã cũ; không bảo đảm tồn tại thời điểm tạo đơn. |

Header name không phân biệt hoa/thường. Response 204 không có body JSON.
CORS chỉ cho origin được cấu hình; khi triển khai cần kiểm tra preflight cho
Authorization, Content-Type và Idempotency-Key. Đây là đầu việc tích hợp sau,
không phải cấu hình mới được thêm ở Bước 13.

## 3. JSON và kiểu dữ liệu

| Loại | Quy ước |
|---|---|
| Tên field | camelCase tiếng Anh; DB snake_case được ánh xạ qua DTO. |
| ID | JSON string UUID với dạng `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`; không ép sang số hoặc mặc định UUID v4 vì ERD chưa khóa version. Output chuẩn chữ thường. |
| Tiền | JSON number nguyên VND; tên field có hậu tố `Vnd` trong các DTO mới ở đây. Không chuỗi có dấu phân cách, số thập phân hay số đã định dạng tiền. |
| Boolean | `true`/`false`, không dùng chuỗi hoặc 0/1. |
| Thời gian | ISO 8601 UTC, ví dụ `2026-10-11T03:00:00.000Z`; frontend hiển thị múi giờ Việt Nam. |
| Enum | Mã tiếng Anh phân biệt hoa/thường: role `CUSTOMER`, `STAFF`; size `S`, `M`, `L`. |
| Số ly / topping | Giữ tên Architecture: `qty` cho số ly; `quantity` cho số phần mỗi topping trên một ly. Không đảo nghĩa hai tên. |
| Mảng | Không có phần tử trả `[]`, không trả `null`. |
| Required | Field luôn phải có; nullable phải được ghi riêng. |
| Nullable | `null` nghĩa đã biết là không có giá trị, không đồng nghĩa 0, chuỗi rỗng hoặc lỗi tải. |
| Optional | Field được phép vắng mặt theo từng contract; không tự bổ sung field optional ở client. |

Các tên DTO mới như `priceSizeSVnd`, `isInStock`, `canPurchase` là **đề xuất hợp đồng**,
không phải cột database đã tồn tại. Mapping cụ thể nằm trong [Products](products.md).
Không thêm `productSizeId`, `productToppingId`: Detailed ERD dùng khóa ghép.

### Serialization tiền từ PostgreSQL BIGINT

Miền JSON number an toàn được đề xuất là số nguyên trong
`0..9007199254740991` (`Number.MAX_SAFE_INTEGER`) cho giá/số tiền không âm.
Đây là giới hạn trao đổi kỹ thuật, không phải giới hạn giá nghiệp vụ mới của SRS.

Khi tích hợp Prisma, giữ giá ở kiểu `bigint` trong phép tính backend; kiểm tra miền
trước khi chuyển sang `number` tại DTO. Không JSON-serialize trực tiếp BigInt,
không chuyển `Number(value)` trước khi kiểm tra và không vá global BigInt serializer.
Tổng sau phép cộng/nhân cũng phải được kiểm tra, không chỉ giá từng món.
Giá trị request vượt miền hoặc không nguyên: 400 `VALIDATION_ERROR` nếu endpoint
cho phép nhận trường tiền; dữ liệu backend vượt miền: 500 `INTERNAL_ERROR`, ghi log
nội bộ, không làm tròn, không đổi riêng một response sang string.

Nếu nhóm cần trao đổi toàn miền BIGINT, phải duyệt thay đổi contract tiền thành
string trên toàn bộ consumer; bản này giữ JSON integer theo Architecture.
Giá trị không âm không đồng nghĩa mọi số nguyên trong hệ thống đều không âm:
ledger điểm có số âm khi đảo điểm; chủ module phải đặc tả riêng.

## 4. Response thành công

Envelope có đúng `data` ở cấp ngoài cho endpoint không phân trang. Chi tiết dùng
object; danh sách dùng array trực tiếp, không trộn `items` và `results` theo từng module.

```json
{
  "data": []
}
```

Danh sách rỗng vẫn là HTTP 200. Products chưa có yêu cầu phân trang/search/filter,
không tự thêm query hoặc metadata. Nếu module khác cần phân trang, đề xuất chung
là `data` vẫn là array, thêm `meta` cùng cấp; phải chốt field, default và giới hạn
trong contract module trước khi sử dụng, không tự coi đã có chuẩn phân trang hoàn chỉnh.

Không thêm `success`, `statusCode`, `message` vào mọi response thành công.
Status HTTP biểu thị xử lý request, không thay thế trạng thái nghiệp vụ bên trong data;
HTTP 200 không đủ để kết luận thanh toán thành công.

## 5. Lỗi và HTTP status

Lỗi có đúng envelope `error`; `code`, `message`, `details` luôn có.
`code` ổn định, UPPER_SNAKE_CASE; client rẽ nhánh bằng code thay vì so sánh câu message.
Message tiếng Việt dễ hiểu. `details` luôn là array; mỗi phần tử validation có
`field` (đường dẫn như `path.id`), `code` và `message` là string.
Không echo giá trị input, token hoặc dữ liệu nhạy cảm vào lỗi.

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      {
        "field": "path.id",
        "code": "INVALID_UUID",
        "message": "id phải là UUID hợp lệ"
      }
    ]
  }
}
```

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Không thể xử lý yêu cầu lúc này",
    "details": []
  }
}
```

| HTTP | Code chung | Khi dùng |
|---|---|---|
| 200 | — | Đọc thành công hoặc thao tác trả kết quả theo contract. |
| 201 | — | Tạo mới thành công; không áp dụng cho GET. |
| 204 | — | Thành công không body khi endpoint quy định; không kèm `{data: null}`. |
| 400 | `VALIDATION_ERROR` | Sai kiểu/UUID/enum, thiếu field bắt buộc, query không hỗ trợ, JSON không hợp lệ. |
| 401 | `UNAUTHORIZED` | Thiếu JWT, token sai/hết hạn ở route cần đăng nhập; response có `WWW-Authenticate: Bearer`. |
| 403 | `FORBIDDEN` | Đã xác thực nhưng thiếu quyền; quyền sở hữu do contract module quy định, không lộ dữ liệu người khác. |
| 404 | `RESOURCE_NOT_FOUND` | Không có tài nguyên được yêu cầu. |
| 409 | `CONFLICT` | Xung đột trạng thái/ràng buộc hoặc cùng khóa chống lặp khác nội dung. |
| 500 | `INTERNAL_ERROR` | Lỗi không dự kiến, lỗi dữ liệu backend hoặc truy vấn; không trả stack trace/SQL. |

Code chi tiết validation đề xuất: `REQUIRED`, `INVALID_TYPE`, `INVALID_UUID`,
`INVALID_ENUM`, `OUT_OF_RANGE`, `UNKNOWN_FIELD`, `UNSUPPORTED_QUERY`,
`BODY_NOT_ALLOWED`. Endpoint công bố tập lỗi thực sự áp dụng, không sao chép mọi
HTTP status chung. Mã nghiệp vụ bổ sung phải có UC/BR, chủ module và cách xử lý
client được review; chưa tạo bộ mã lỗi tồn kho/thanh toán thay người phụ trách.

## 6. Authentication, authorization và validation

- Products là public theo SRS mục 2: không yêu cầu JWT/role; anonymous, CUSTOMER
  và STAFF đọc cùng dữ liệu công khai. Đề xuất bỏ qua Authorization trên hai GET
  public, không dùng token gửi kèm để thay đổi kết quả hoặc quyền.
- Route bảo vệ dùng JWT guard, role guard và kiểm tra ownership ở service.
  Danh tính lấy từ JWT đã xác thực, không lấy userId do client tự khai.
- CUSTOMER và STAFF không mặc định kế thừa quyền của nhau; từng endpoint khai báo
  quyền cụ thể. Không thêm ADMIN hoặc CRUD quản trị chưa có trong SRS.
- DTO kiểm tra ở runtime. Đề xuất từ chối field/query lạ bằng 400 thay vì âm thầm
  bỏ qua; không ép chuỗi tùy ý sang số hoặc boolean. Query chỉ parse theo contract.
- Hai GET Products không nhận body; body không rỗng bị 400 `BODY_NOT_ALLOWED`.
  Query bất kỳ bị 400 `UNSUPPORTED_QUERY` vì chưa đặc tả query.
- Serializer chỉ trả field được công bố, không trả raw Prisma entity, mật khẩu/hash,
  JWT ngoài phản hồi auth được đặc tả, SQL, connection string hoặc fingerprint nội bộ.
- Thiếu token và sai quyền là hai lỗi khác nhau. CORS hoặc ẩn nút không thay validation
  và authorization. Không đưa thông tin người dùng vào response Products public.

Các lựa chọn mới về validation, public token và DTO ở đây cần nhóm review;
chưa có guard, filter, interceptor hoặc validation nghiệp vụ được triển khai.

## 7. Idempotency-Key cho tạo đơn và thanh toán

Idempotency giúp gửi lại cùng ý định khi mất kết nối mà không nhân đôi tác dụng.
Theo Architecture mục 5.1, BR-20/24–27 và ERD mục 3.6/3.9:

| Thuộc tính | Quy ước đề xuất cần Phát và Thắng review |
|---|---|
| Header | `Idempotency-Key`, bắt buộc ở thao tác tạo đơn và thanh toán do chủ module đặc tả. |
| Giá trị | Một chuỗi opaque ASCII dài 1–128 ký tự, regex `^[A-Za-z0-9_-]{1,128}$`; không khoảng trắng/dấu phẩy; phân biệt hoa/thường, không trim hoặc đổi case. |
| Sinh khóa | Client sinh ngẫu nhiên cho mỗi ý định mới; khuyến nghị UUID, không chứa thông tin cá nhân. Ví dụ `762fbf48-cd3f-4b6b-b8eb-d493f35e6701`. |
| Sai header | Thiếu, rỗng, lặp nhiều giá trị hoặc sai định dạng: 400 `VALIDATION_ERROR`, field `headers.idempotencyKey`. |
| Retry | Cùng ý định/chưa rõ kết quả: giữ nguyên khóa và nội dung; không sinh khóa mới chỉ vì timeout. |
| Khác nội dung | Cùng khóa nhưng khác nội dung chuẩn hóa: 409 `CONFLICT`; không tạo hiệu ứng mới. |
| Phạm vi ERD | Tạo đơn unique theo `(user_id, create_idempotency_key)`; thanh toán unique toàn bảng `idempotency_key`. Đây vẫn là điểm ERD cần chủ module xác nhận. |
| Bảo mật | Luôn kiểm tra xác thực/ownership trước khi trả kết quả cũ; biết khóa không cấp quyền đọc giao dịch. |

Phát/Thắng phải bổ sung fingerprint chuẩn hóa, xử lý request đồng thời/đang chạy,
response và HTTP status khi replay, vòng đời khóa và xử lý lỗi trong tài liệu riêng.
Không tự ấn định TTL khóa bằng thời hạn đơn 15 phút. BR-25 yêu cầu khóa mới cho
lần thử thanh toán mới sau thất bại đã xác nhận; BR-27 vẫn cấm hai lần thành công
cho một đơn kể cả khác khóa. GET Products không lưu hoặc tạo khóa chống lặp.

## 8. Phối hợp và mẫu tài liệu module

Module sở hữu dữ liệu cung cấp service qua NestJS export/import; không gọi HTTP
nội bộ hoặc controller của nhau. Giữ hướng phụ thuộc Architecture mục 5.6.
Nếu cùng một thao tác cần transaction, dùng transaction client do service điều phối
truyền, không mở transaction độc lập rồi coi là nguyên tử.

Mỗi endpoint cần: API ID/tên; mục đích/UC; method/URL; authentication/authorization;
path/query; headers; body hoặc “không có”; response schema và ví dụ; lỗi/status;
BR; validation; mapping ERD; trường hợp biên và ghi chú triển khai.
GET dùng ví dụ HTTP request, không thêm JSON body để đủ mẫu.

Chủ module ghi rõ field gốc, field suy ra, nullability, giá trị enum, quyết định chưa
chốt và tiêu chí kiểm thử. Tên JSON không nhất thiết giống tên DB: ví dụ `qty`
ánh xạ số ly, còn `quantity` ánh xạ `servings_per_drink`; các consumer phải thống nhất
trước khi Phát/Thắng chốt DTO. Thêm link vào [API_SPEC](API_SPEC.md) chỉ khi file
thực sự tồn tại. Có tài liệu chưa đồng nghĩa đã triển khai hoặc nghiệm thu.
