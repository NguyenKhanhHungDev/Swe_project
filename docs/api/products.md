# BrewLite — Products API

**Bước 13 · Phụ trách: Hưng · Ngày: 11/10/2026 · Trạng thái: REVIEW.**

Đặc tả menu và chi tiết sản phẩm, dùng [quy chuẩn API chung](API_CONVENTIONS.md).
Đây là thiết kế để review; `apps/api/src/products/products.module.ts` hiện rỗng,
chưa có controller/service/DTO Products hoặc Prisma tích hợp. JSON dưới đây là
dữ liệu minh họa, không phải kết quả gọi API hay dữ liệu seed đã được kiểm chứng.

## 1. Phạm vi và nguồn

| API ID | Method / endpoint | Mục đích | Nguồn |
|---|---|---|---|
| PRD-01 | `GET /products` | Menu, giá size S và trạng thái mua | SRS UC-04 |
| PRD-02 | `GET /products/:id` | Chi tiết, size và topping theo món | SRS UC-05 |

[SRS](../SRS.md) mục 2 cho phép khách chưa đăng nhập đọc cả hai API.
[Business Rules](../BUSINESS_RULES.md) BR-03/05/15 quy định số lượng, giá backend
và tồn dùng chung các size. [Detailed ERD](../ERD_DETAILED.md) mục 3.2–3.4 là cơ sở
trường dữ liệu. [Architecture](../ARCHITECTURE.md) mục 4–6 quy định ranh giới module.

Không có CATEGORY trong ERD; không thêm Categories CRUD, Product CRUD, API quản trị,
endpoint thêm giỏ hoặc endpoint định giá riêng khi chưa có nguồn yêu cầu.
Chọn tùy chọn là state giao diện; Cart do Huy sở hữu, Orders do Phát tính lại giá
và kiểm tra tồn khi tạo đơn. API đọc không giữ hàng.

**Quyết định người dùng xác nhận ngày 11/10/2026 trong phiên làm việc:** sản phẩm
có `PRODUCT.is_available = false` vẫn xuất hiện trong menu và xem chi tiết được,
nhưng khóa mua. Quyết định này bổ sung khoảng trống SRS về món ngừng bán;
không thay đổi quy tắc món hết hàng vẫn xem được. Cần đưa vào lần review yêu cầu
tiếp theo; lượt này không sửa SRS/ERD.

## 2. Quy tắc đọc dữ liệu và mapping

Các tên JSON ở đây là **DTO đề xuất**, không phải tên cột mới. Field của mỗi DTO
đều required; chỉ field ghi nullable được trả `null`. Không trả `undefined`.

### 2.1. ProductSummary — một phần tử menu

| Field JSON | Kiểu / null | Mapping và ý nghĩa |
|---|---|---|
| `id` | UUID string, không null | `PRODUCT.id`. |
| `name` | string, không null | `PRODUCT.name`, VARCHAR(160). |
| `imageUrl` | string hoặc null | `PRODUCT.image_url`; null thì UI dùng ảnh thay thế. |
| `priceSizeSVnd` | integer VND hoặc null | `PRODUCT_SIZE.price_vnd` tại `(product_id, 'S')`; không dùng giá thấp nhất hoặc giá cộng phụ thu. Null chỉ khi món ngừng bán không có size S. |
| `isAvailable` | boolean, không null | `PRODUCT.is_available`: cờ cho phép kinh doanh, không phải tồn kho. |
| `isInStock` | boolean, không null | Suy ra từ `INVENTORY.on_hand - INVENTORY.reserved_quantity > 0`. |
| `canPurchase` | boolean, không null | Suy ra: `isAvailable && isInStock && có size S hợp lệ`. |

### 2.2. ProductDetail — data của PRD-02

Có toàn bộ field của ProductSummary và các field sau:

| Field JSON | Kiểu / null | Mapping và ý nghĩa |
|---|---|---|
| `description` | string hoặc null | `PRODUCT.description`. |
| `sizes` | array SizeOption, không null | Các dòng `PRODUCT_SIZE` đúng product_id; thứ tự S, M, L, chỉ gồm dòng tồn tại. Không tự sinh size/giá. |
| `toppings` | array ToppingOption, không null | `PRODUCT_TOPPING` của món join `TOPPING`; không trả topping chưa liên kết. |

| SizeOption | Kiểu / null | Mapping |
|---|---|---|
| `sizeCode` | enum S/M/L, không null | `PRODUCT_SIZE.size_code`. Cặp `(id sản phẩm, sizeCode)` là khóa; không có size UUID riêng. |
| `priceVnd` | integer VND, không null | `PRODUCT_SIZE.price_vnd`: giá đầy đủ một ly chưa topping. |

| ToppingOption | Kiểu / null | Mapping |
|---|---|---|
| `id` | UUID string, không null | `TOPPING.id`, cũng là `PRODUCT_TOPPING.topping_id`; không phải ID quan hệ. |
| `name` | string, không null | `TOPPING.name`, VARCHAR(120). |
| `priceVnd` | integer VND, không null | `PRODUCT_TOPPING.price_vnd`: giá một phần cho sản phẩm hiện tại; TOPPING không có cột giá. |
| `isAvailable` | boolean, không null | Suy ra `TOPPING.is_available && PRODUCT_TOPPING.is_available`. |
| `canSelect` | boolean, không null | Suy ra `topping.isAvailable && product.canPurchase`. |

`isAvailable` của sản phẩm là cờ gốc; của topping là kết hợp hai cờ theo mapping.
Đề xuất trả cả topping liên kết bị vô hiệu hóa với `isAvailable = false`,
`canSelect = false` để UI khóa lựa chọn; cần nhóm review chính sách hiển thị này.
Không suy ra tồn topping từ Inventory vì ERD không quản lý tồn theo topping.
PRODUCT_SIZE không có cờ khả dụng hoặc kho riêng; size hợp lệ khi có dòng liên kết.

### 2.3. Bảng quyết định khả dụng

Áp dụng khi dữ liệu và giá hợp lệ:

| PRODUCT.is_available | Tồn khả dụng | Size S | Kết quả cả hai API |
|---|---|---|---|
| true | > 0 | Có | Hiển thị, `isInStock=true`, `canPurchase=true`. |
| true | 0 | Có | Vẫn hiển thị, `isInStock=false`, `canPurchase=false`; UI đánh dấu hết hàng. |
| false | > 0 | Có hoặc không | Vẫn hiển thị, `isInStock=true`, `canPurchase=false`; UI khóa mua vì ngừng bán. |
| false | 0 | Có hoặc không | Vẫn hiển thị, `isInStock=false`, `canPurchase=false`. |
| true | Bất kỳ | Không | Dữ liệu vi phạm ERD “mỗi sản phẩm bán được cần S”; đề xuất 500 INTERNAL_ERROR, không bịa giá. |

Đề xuất xử lý lỗi dữ liệu trong tập dữ liệu endpoint đọc: thiếu INVENTORY, tồn âm/
lượng giữ vượt tồn, liên kết hỏng, enum sai hoặc giá không nguyên/âm/vượt miền JSON
an toàn trả 500 INTERNAL_ERROR. PRD-01 kiểm tra giá S và kho; PRD-02 kiểm tra thêm
mọi size/topping được trả, không yêu cầu PRD-01 tải topping chỉ để kiểm tra.
PRD-01 lỗi toàn request nếu có dòng vi phạm, không trả menu một phần mà giấu lỗi.
Món ngừng bán có thể có `sizes: []`, `priceSizeSVnd: null`; không hiển thị giá 0 thay
cho giá thiếu. Cần review chính sách lỗi này trước triển khai.

Không trả onHand, reservedQuantity hoặc version trong API public. Products phối hợp
Khoa qua service Inventory để đọc trạng thái tồn theo lô; không tự sửa kho hoặc
đưa logic giữ/hoàn kho vào Products. `canPurchase` chỉ là trạng thái tại lúc đọc,
không cam kết giữ hàng cho lần mua sau.

## 3. PRD-01 — Xem menu đồ uống

### 3.1. Request

| Thuộc tính | Đặc tả |
|---|---|
| Mục đích | Cung cấp ảnh, tên, giá size S và trạng thái cho menu, gồm cả món hết hàng/ngừng bán. |
| Method / endpoint | `GET /products` |
| Authentication | Public, không cần Authorization. |
| Authorization | Không yêu cầu role/ownership; dữ liệu giống nhau cho anonymous, CUSTOMER, STAFF. |
| Path parameters | Không có. |
| Query parameters | Không có; query không được đặc tả bị 400 UNSUPPORTED_QUERY. Chưa thêm lọc, tìm kiếm, phân trang. |
| Request headers | Nên gửi `Accept: application/json`; không cần Content-Type, JWT hoặc Idempotency-Key. |
| Request body | Không có; body không rỗng bị 400 BODY_NOT_ALLOWED. |
| Response headers | `Content-Type: application/json`; đề xuất `Cache-Control: no-store`. |

Ví dụ HTTP request (không có JSON request body):

```http
GET /products HTTP/1.1
Host: localhost:3001
Accept: application/json
```

### 3.2. Thành công — HTTP 200

`data` là array ProductSummary theo mục 2.1. Đề xuất thứ tự `PRODUCT.name ASC`,
rồi `PRODUCT.id ASC` để ổn định khi trùng tên; so sánh tên theo collation database.
Không tự thêm cột sortOrder. Không lọc theo tồn hoặc cờ is_available.

```json
{
  "data": [
    {
      "id": "32cc8746-fbaf-4dc4-9d58-9caf39df1601",
      "name": "Cà phê sữa",
      "imageUrl": null,
      "priceSizeSVnd": 30000,
      "isAvailable": true,
      "isInStock": true,
      "canPurchase": true
    },
    {
      "id": "32cc8746-fbaf-4dc4-9d58-9caf39df1602",
      "name": "Trà đào",
      "imageUrl": null,
      "priceSizeSVnd": 35000,
      "isAvailable": true,
      "isInStock": false,
      "canPurchase": false
    },
    {
      "id": "32cc8746-fbaf-4dc4-9d58-9caf39df1603",
      "name": "Trà vải",
      "imageUrl": null,
      "priceSizeSVnd": 35000,
      "isAvailable": false,
      "isInStock": true,
      "canPurchase": false
    }
  ]
}
```

Không có sản phẩm: HTTP 200, không phải 404:

```json
{
  "data": []
}
```

### 3.3. Lỗi, validation và HTTP status

| HTTP | error.code | Trường hợp |
|---|---|---|
| 200 | — | Menu hợp lệ, kể cả rỗng hoặc mọi món đều khóa mua. |
| 400 | VALIDATION_ERROR | Query không hỗ trợ hoặc body không rỗng. |
| 500 | INTERNAL_ERROR | Truy vấn thất bại hoặc dữ liệu không hợp lệ theo mục 2.3. |

Ví dụ client gửi `GET /products?page=1`:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu không hợp lệ",
    "details": [
      {
        "field": "query.page",
        "code": "UNSUPPORTED_QUERY",
        "message": "Endpoint không hỗ trợ query parameter này"
      }
    ]
  }
}
```

Lỗi 500 dùng mẫu INTERNAL_ERROR ở mục 4.3. Không trả `data: []` khi truy vấn lỗi
vì frontend sẽ hiểu nhầm thành menu rỗng. Không có lỗi 401/403 chỉ vì chưa đăng nhập.

### 3.4. BR, dữ liệu và triển khai

- SRS UC-04: giá S, ảnh/tên, hết hàng vẫn hiển thị; loading là state frontend,
  menu rỗng từ 200/[], lỗi tải từ error hoặc network failure.
- BR-05: giá lấy từ backend; BR-15: tồn theo sản phẩm dùng chung size;
  BR-04: đọc menu hoặc thêm giỏ không giữ kho.
- Bảng dùng: PRODUCT, PRODUCT_SIZE (S), INVENTORY qua module sở hữu tồn.
  Không cần tải tất cả topping cho menu.
- Truy vấn theo lô và chỉ chọn field cần dùng; tránh truy vấn riêng từng món.
  Không inner join làm biến mất món hết hàng hoặc che dữ liệu thiếu.
- Controller → ProductsService → PrismaService và phối hợp InventoryService theo
  Architecture; đây là phương án triển khai, chưa có method service được chốt.

## 4. PRD-02 — Xem chi tiết và tùy chọn đồ uống

### 4.1. Request

| Thuộc tính | Đặc tả |
|---|---|
| Mục đích | Trả chi tiết, các size có thật và topping theo món để chọn cấu hình hiển thị giá. |
| Method / endpoint | `GET /products/:id` |
| Authentication | Public, không cần Authorization. |
| Authorization | Không yêu cầu role/ownership; khách chưa đăng nhập được xem món khóa mua. |
| Path parameter `id` | Required string UUID; kiểm tra cú pháp trước khi truy vấn, không giới hạn riêng version 4. UUID hợp lệ nhưng không tồn tại trả 404. |
| Query parameters | Không có; không nhận size, qty, quantity hoặc topping trong query để tính giá. |
| Request headers | Nên gửi `Accept: application/json`; không cần JWT, Content-Type hoặc Idempotency-Key. |
| Request body | Không có; body không rỗng bị 400 BODY_NOT_ALLOWED. |
| Response headers | `Content-Type: application/json`; đề xuất `Cache-Control: no-store`. |

```http
GET /products/32cc8746-fbaf-4dc4-9d58-9caf39df1601 HTTP/1.1
Host: localhost:3001
Accept: application/json
```

### 4.2. Thành công — HTTP 200

`data` là ProductDetail theo mục 2.2. Topping đề xuất xếp theo `TOPPING.name ASC`,
rồi `TOPPING.id ASC`; size xếp S → M → L. Không có topping trả `[]`.

```json
{
  "data": {
    "id": "32cc8746-fbaf-4dc4-9d58-9caf39df1601",
    "name": "Cà phê sữa",
    "imageUrl": null,
    "priceSizeSVnd": 30000,
    "isAvailable": true,
    "isInStock": true,
    "canPurchase": true,
    "description": "Cà phê pha cùng sữa đặc",
    "sizes": [
      { "sizeCode": "S", "priceVnd": 30000 },
      { "sizeCode": "M", "priceVnd": 35000 },
      { "sizeCode": "L", "priceVnd": 40000 }
    ],
    "toppings": [
      {
        "id": "60cd6f0c-20e8-4ed5-8d69-e061463fbe01",
        "name": "Kem sữa",
        "priceVnd": 7000,
        "isAvailable": false,
        "canSelect": false
      },
      {
        "id": "60cd6f0c-20e8-4ed5-8d69-e061463fbe02",
        "name": "Trân châu",
        "priceVnd": 5000,
        "isAvailable": true,
        "canSelect": true
      }
    ]
  }
}
```

Nếu hết hàng/ngừng bán: vẫn 200 với schema trên, `canPurchase=false`, mọi
`toppings[].canSelect=false`; size và giá vẫn là dữ liệu thật. Nếu ngừng bán và
không có S, `priceSizeSVnd=null`; không tự chọn M làm mặc định thay S.

### 4.3. Lỗi, validation và HTTP status

| HTTP | error.code | Trường hợp |
|---|---|---|
| 200 | — | Tìm thấy món và dữ liệu hợp lệ, kể cả món hết hàng/ngừng bán. |
| 400 | VALIDATION_ERROR | id sai UUID, query không hỗ trợ hoặc body không rỗng. |
| 404 | RESOURCE_NOT_FOUND | UUID hợp lệ nhưng không có PRODUCT tương ứng. |
| 500 | INTERNAL_ERROR | Truy vấn lỗi hoặc dữ liệu vi phạm mục 2.3. |

`GET /products/not-a-uuid` → 400:

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

UUID không tồn tại → 404:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Không tìm thấy sản phẩm",
    "details": []
  }
}
```

Lỗi backend hoặc dữ liệu bất hợp lệ ở cả hai GET → 500:

```json
{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Không thể xử lý yêu cầu lúc này",
    "details": []
  }
}
```

Không đưa tên bảng, SQL, stack trace hoặc dữ liệu nội bộ vào lỗi public. Query/body
sai dùng cùng envelope và code chi tiết ở API_CONVENTIONS mục 5–6. Khi có nhiều
lỗi validation, đề xuất trả tất cả lỗi phát hiện được, không cam kết thứ tự details.

### 4.4. BR, dữ liệu và trường hợp biên

- UC-05: mặc định S, không topping, 1 ly; chỉ áp dụng lựa chọn mua khi canPurchase.
  M/L không bắt buộc tồn tại nếu ERD không có dòng; không bổ sung giá bằng 0.
- BR-03: `qty` là số nguyên 1–99; `quantity` mỗi loại topping là số nguyên 0–3,
  không phải tối đa 3 loại topping hoặc tổng 3 phần cho cả ly. GET không nhận các
  field này; Cart/Orders chịu validation khi người dùng gửi lựa chọn.
- BR-05 và ERD 3.2/3.3: giá một ly hiển thị = giá đầy đủ size đã chọn + tổng
  `(giá một phần topping theo món × quantity)`; thành tiền dòng = giá một ly × qty.
  Ví dụ M 35.000 + 2 phần Trân châu × 5.000 = 45.000/ly; 2 ly = 90.000 VND.
  Không cộng thêm giá S vào giá M. Frontend chỉ tính để hiển thị; Orders tính lại
  từ backend, không tin số tiền client gửi (UC-09).
- Chọn 0 phần nghĩa không dùng topping; ERD chỉ lưu dòng topping đã chọn 1–3 phần.
  Không coi GET là request giỏ hoặc tạo snapshot đơn.
- Không có PRODUCT_TOPPING → `toppings: []`. Có liên kết nhưng một trong hai cờ
  TOPPING/PRODUCT_TOPPING false → topping bị khóa theo chính sách đề xuất mục 2.
- Bảng dùng: PRODUCT, PRODUCT_SIZE, PRODUCT_TOPPING join TOPPING, INVENTORY qua
  service sở hữu tồn. Không có giá chung trên TOPPING hay tồn riêng từng size.
- Giá/cờ/tồn có thể đổi sau GET; client tải lại khi cần, Cart kiểm tra lựa chọn,
  Orders xác minh lại nguyên tử khi tạo đơn. Không xem canPurchase là quyền mua
  được bảo lưu hoặc là bằng chứng đủ tồn cho qty > 1.

## 5. Truy vết, phụ thuộc và review

| Yêu cầu | API / dữ liệu | Kết quả đặc tả |
|---|---|---|
| SRS UC-04 | PRD-01; PRODUCT, PRODUCT_SIZE S, INVENTORY | Tên/ảnh/giá S; hết hàng vẫn hiển thị; rỗng/lỗi phân biệt. |
| SRS UC-05 | PRD-02; PRODUCT, PRODUCT_SIZE, PRODUCT_TOPPING, TOPPING | Mô tả, giá đầy đủ, tùy chọn, mặc định và khóa mua. |
| BR-03 | PRD-02, consumer Cart/Orders | 1–99 ly, 0–3 phần từng loại; không thêm body GET. |
| BR-04/15 | Hai GET + Inventory | Tồn dùng chung size, chỉ đọc, không giữ kho. |
| BR-05; UC-09 | Giá ở hai GET + Orders khi tạo đơn | Backend là nguồn giá, không tin tổng frontend. |
| ERD 3.2/3.3 | DTO SizeOption/ToppingOption | Khóa ghép; không có sizeId/ID quan hệ hoặc CATEGORY. |

Phụ thuộc còn thiếu: [User Stories](../USER_STORIES.md) và
[Acceptance Criteria](../ACCEPTANCE_CRITERIA.md) mới là khung;
[Use Cases](../USE_CASES.md) mới có danh mục. Chưa gán mã US/AC giả hoặc xác nhận
nghiệm thu. ERD vẫn là bản review; quyết định DTO/khả dụng ở đây cần Huy, Khoa,
Phát đối chiếu trước khi chốt consumer và schema.

Checklist tự review tài liệu:

- [x] Chỉ đặc tả hai GET có nguồn UC-04/05, không lấn sang Cart/Orders/Payments.
- [x] Có request, response, status, auth, validation, BR, mapping và trường hợp biên.
- [x] Tách giá đầy đủ size, giá topping theo món và tồn theo sản phẩm.
- [x] Phân biệt cờ kinh doanh, còn tồn, được mua và topping được chọn.
- [x] UUID, integer VND, null/array/required nhất quán với DTO đã mô tả.
- [ ] Nhóm duyệt DTO, chính sách topping vô hiệu hóa, lỗi dữ liệu và thứ tự danh sách.
- [ ] Hưng/Khoa chốt giao diện service đọc tồn theo lô và cách đọc nhất quán.
- [ ] Huy/Phát duyệt mapping lựa chọn giỏ → tạo đơn; bổ sung US/AC có nguồn.
- [ ] Có triển khai và minh chứng contract/integration test — ngoài phạm vi Bước 13.

Các ca kiểm thử cần bàn giao khi triển khai: menu rỗng, món hết hàng/ngừng bán,
thiếu S, thiếu kho, topping ngoài liên kết, từng cờ topping false, M/L không có,
UUID sai/không tồn tại, query/body lạ, tiền vượt miền an toàn, giá S ở menu khớp
chi tiết khi cùng dữ liệu, lỗi DB không giả thành rỗng và tồn thay đổi sau GET.
Đây là danh sách ca dự kiến, chưa phải kết quả test đã chạy.
