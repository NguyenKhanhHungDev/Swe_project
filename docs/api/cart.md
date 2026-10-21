# BrewLite — Cart và hợp đồng mua ngay

**Bước 13 · Phụ trách: Huy · Ngày: 14/10/2026 · Trạng thái: REVIEW.**

Đây là thiết kế để review, chưa phải Cart đã triển khai trong Next.js. Theo
[Architecture](../ARCHITECTURE.md) và [Detailed ERD](../ERD_DETAILED.md), giỏ lưu
trên trình duyệt, không có bảng CART và không mặc định tạo REST Cart CRUD.
`GET /cart`, `POST /cart/items`, `PATCH /cart/items/:id`, `DELETE /cart/items/:id`
trong bản phân công là ví dụ, không phải endpoint đã chốt.

## 1. Nguồn và ranh giới

| Nguồn | Quy tắc sử dụng |
|---|---|
| [SRS](../SRS.md) UC-06/07; [Business Rules](../BUSINESS_RULES.md) BR-01–07 | Gộp theo cấu hình, qty 1–99, không giữ kho, browser persistence, hủy đơn trước sửa |
| [Quyết định nhóm](../REQUIREMENTS_DECISIONS.md) ngày 13/10 và yêu cầu Huy | Mua ngay chỉ cấu hình đang chọn, không thay đổi giỏ chính |
| [Products API](products.md) | UUID, sizeCode, giá đầy đủ theo size, giá topping theo cặp sản phẩm–topping |
| US-CART-01/02, UC-06/07 và Activity Huy gửi trong trao đổi | Tổng qty cùng sản phẩm, 0–3 phần topping, lưu/restore, lỗi giữ dữ liệu cũ |
| [API conventions](API_CONVENTIONS.md) | JSON, tiền VND an toàn, lỗi, JWT và ranh giới HTTP/service |

Huy sở hữu Cart store; Hưng gọi thao tác thêm/mua ngay từ chi tiết, không làm giỏ
thứ hai. Khoa cung cấp xác thực/tồn; Phát tạo/hủy đơn; Thắng điều phối review và
payment. Các thao tác store là lời gọi TypeScript local, **không có HTTP method,
status hay role guard**. Chưa đăng nhập vẫn dùng giỏ; áp mã và tạo đơn cần JWT.

## 2. Dữ liệu lựa chọn và snapshot

### 2.1. CartItemInput — hợp đồng đề xuất liên module

| Field | Kiểu, required/null | Ràng buộc và mapping |
|---|---|---|
| productId | UUID string, required, không null | PRODUCT.id; không dùng prod_001 hoặc ID số |
| sizeCode | S/M/L, required, không null | PRODUCT_SIZE.size_code, phải có cặp productId–sizeCode |
| qty | integer, required | 1–99 ly mỗi dòng; không ép chuỗi thành số |
| toppings | array, required, không null | [] nếu không topping; ID không trùng |
| toppings[].toppingId | UUID string, required | TOPPING.id, phải thuộc PRODUCT_TOPPING của món |
| toppings[].quantity | integer, required | 1–3 phần mỗi ly; UI bỏ lựa chọn 0 trước khi gửi |

```json
{
  "productId": "32cc8746-fbaf-4dc4-9d58-9caf39df1601",
  "sizeCode": "M",
  "qty": 2,
  "toppings": [{ "toppingId": "60cd6f0c-20e8-4ed5-8d69-e061463fbe02", "quantity": 2 }]
}
```

### 2.2. Snapshot frontend (không phải Prisma entity)

Một dòng gồm CartItemInput và `lineId` UUID sinh ở frontend, `name` string,
`unitPriceVnd`/`lineTotalVnd` integer an toàn. `lineId` chỉ định danh dòng local,
không phải ORDER_ITEM.id. Dữ liệu hiển thị không làm căn cứ tiền backend.

CartSnapshot gồm `items` array, `promotionCode` string hoặc null,
`subtotalVnd`, `discountVnd`, `totalVnd` integer không âm, `totalQty` integer;
`totalQty = sum(qty)`, không phải số dòng. Dữ liệu lỗi có cảnh báo riêng và chặn
xác nhận, không bịa giá 0 như một giá hợp lệ.

Giá một ly = `sizes[sizeCode].priceVnd + sum(topping.priceVnd * quantity)`;
giá size là **giá đầy đủ**, không cộng thêm priceSizeSVnd. Topping lấy giá của
món hiện tại, không dùng giá TOPPING toàn cục. Ví dụ DTO trên theo Products:
35.000 + 2 × 5.000 = 45.000/ly; 2 ly thành 90.000. Phép nhân/tổng cũng phải
thuộc miền số nguyên JSON an toàn; backend dùng BIGINT rồi kiểm tra serialization.

## 3. Hợp đồng thao tác local

Kết quả đề xuất `{data: CartSnapshot}` hoặc envelope `error` theo chuẩn nhóm.
Đây là kết quả local, không tự gán HTTP 200/400 cho store.

| Tên / mục đích | Input | Thành công | Lỗi, tác động |
|---|---|---|---|
| getCart / khôi phục | Không input | Đọc browser storage, validate cấu trúc; đọc lại catalog, báo giá/tình trạng mới | CART_STORAGE_INVALID/CATALOG_UNAVAILABLE: báo rõ; không cho checkout chưa kiểm tra |
| addCartItem / thêm món | CartItemInput | Gộp hoặc thêm dòng; tính tổng, kiểm tra lại mã; lưu, badge tổng ly, toast 3 giây; giữ trang | VALIDATION_ERROR, PRODUCT_UNAVAILABLE, OUT_OF_STOCK: giữ giỏ cũ |
| updateCartItem / sửa qty | lineId UUID local; qty integer 1–99 | Chỉ đổi số ly, tính tổng/mã, lưu | Dòng không có, qty sai, thiếu tồn hoặc ORDER_LOCKED: giữ qty cũ |
| removeCartItem / xóa dòng | lineId UUID local | Xóa đúng dòng, tính tổng/mã, lưu | Dòng không có hoặc ORDER_LOCKED: không thay giỏ |
| clearCart / xóa giỏ | Không input; xác nhận UI | Xóa toàn giỏ và mã, chặn checkout | Giữ lại/Escape không thay dữ liệu; không phải hủy đơn backend |
| createBuyNowDraft / mua ngay | CartItemInput | Draft đúng một cấu hình, giữ qty/size/topping; mở review trực tiếp | Cấu hình sai/thiếu hàng: giữ trang và giỏ chính |

Khóa gộp: productId + sizeCode + danh sách `(toppingId, quantity)` được sắp theo
toppingId. Cùng topping khác thứ tự vẫn gộp; khác số phần thì tách dòng. Qty sau
gộp không vượt 99. Không ngầm đổi size/topping khi sửa qty: xóa rồi chọn lại.

Ví dụ kết quả local (chưa áp voucher):

```json
{
  "data": {
    "items": [{
      "lineId": "754a2172-b57b-46b9-bc35-1094973f1531",
      "productId": "32cc8746-fbaf-4dc4-9d58-9caf39df1601",
      "name": "Cà phê sữa", "sizeCode": "M", "qty": 2,
      "toppings": [{"toppingId":"60cd6f0c-20e8-4ed5-8d69-e061463fbe02","quantity":2}],
      "unitPriceVnd": 45000, "lineTotalVnd": 90000
    }],
    "promotionCode": null, "subtotalVnd": 90000,
    "discountVnd": 0, "totalVnd": 90000, "totalQty": 2
  }
}
```

Ví dụ lỗi local:

```json
{"error":{"code":"VALIDATION_ERROR","message":"Số ly không hợp lệ","details":[{"field":"items[0].qty","code":"OUT_OF_RANGE","message":"Số ly phải là số nguyên từ 1 đến 99"}]}}
```

## 4. Catalog, tồn kho và điểm còn thiếu hợp đồng

Giỏ đọc `GET /products/:id` **đúng ProductDetail của Hưng**: public, không
query/body/JWT; 200 data, 400 VALIDATION_ERROR, 404 RESOURCE_NOT_FOUND,
500 INTERNAL_ERROR. Không thêm HTTP endpoint Cart trong tài liệu này.

ProductDetail hiện chỉ trả isInStock/canPurchase, **không trả số tồn khả dụng**.
Boolean không đủ chứng minh tổng qty cùng productId ≤ tồn. Không bịa `stock:20`
hoặc tự thêm field vào response của Hưng. Để đáp ứng UC-06/07 cần Hưng/Khoa/Thắng
chốt một trong các giao diện đọc số khả dụng hoặc preview kiểm tra qty; chưa có
endpoint nào như vậy được coi đã duyệt. Ghi điểm nối trong [danh mục tài liệu trong README](../../README.md#10-tài-liệu-dự-án).

Quy tắc mong muốn theo UC: cộng tổng số ly cùng productId trên **mọi dòng** trước
thêm/sửa; lỗi không ghi một phần. Tồn đọc được cũng không giữ hàng. Backend luôn
kiểm tra lần cuối và giữ hàng nguyên tử khi tạo đơn. `available = on_hand -
reserved_quantity`, không xem Product.version/stock là cột đã có trên PRODUCT.

## 5. Lưu/restore và vòng đời

- Lưu cấu hình/qty/mã, phiên bản định dạng; không lưu JWT hoặc giá như dữ liệu
  có thẩm quyền. Bắt lỗi storage parse/read/write. Lưu lỗi phải thông báo rằng
  thay đổi trong bộ nhớ có thể mất khi reload.
- Restore validate runtime, đọc lại catalog, đánh dấu món mất/ngừng bán/hết
  hàng và lựa chọn sai; cho xóa/chọn lại. Lỗi tải không đồng nghĩa giỏ rỗng.
- Giá đổi phải được báo, hiển thị tổng mới trước xác nhận. Không âm thầm đổi
  size/topping để làm dữ liệu hợp lệ. Chi tiết kiểm tra tại Products API.
- Đăng nhập/re-auth giữ giỏ và mã nhập/đích quay lại. Logout **được xác nhận**
  xóa giỏ trên thiết bị, không hủy đơn backend.
- Giỏ thay đổi kiểm tra lại mã bằng Promotions; giỏ rỗng bỏ mã và chặn checkout.
  Mã lỗi nghiệp vụ bị bỏ kèm tổng mới/thông báo; lỗi mạng giữ trạng thái chưa
  xác thực, chặn xác nhận với báo giá chưa kiểm tra.
- Đã có đơn chưa trả còn hạn: dùng snapshot và hàng đã giữ của đơn; khóa sửa.
  Hủy UC-13 thành công mới mở sửa. Mất phản hồi hủy không được suy đoán đã hủy.
- PAYMENT_FAILED giữ giỏ/đơn trong hạn, thử lại không thêm món/tạo đơn mới.
  Timeout giữ khóa cũ, kiểm tra lại. Chỉ backend xác nhận PAID mới dọn lượt mua.
- Luồng CART chỉ dọn snapshot của lượt đã trả; không xóa món khách thêm ở lượt
  khác. Cách khóa/version giỏ để ghép sự kiện payment cần Huy/Thắng chốt.

## 6. Mua ngay và dữ liệu bàn giao

BR-06 và yêu cầu trực tiếp Huy: chi tiết → mua ngay → review **chỉ cấu hình đang
chọn** → đăng nhập nếu cần → khách xác nhận tạo đơn → payment. Một sản phẩm có
thể có qty >1 theo lựa chọn; không tự ép về một ly. Không đi qua giỏ, không gộp
với giỏ, không sao chép mã của giỏ chính, không giữ kho trước tạo đơn.

Nguồn CART/BUY_NOW lưu trong state frontend của lượt mua, không tự thêm field
backend hoặc tạo endpoint Orders thứ hai. Rời draft hoặc chọn lại về chi tiết
không thay giỏ chính. Mua ngay PAID dọn draft; thất bại/timeout giữ draft để tra
cứu đơn cũ; cả hai giữ nguyên giỏ chính.

Payload **đề xuất** cho điểm nối Orders/Checkout:

```json
{
  "promotionCode": null,
  "items": [{
    "productId": "32cc8746-fbaf-4dc4-9d58-9caf39df1601", "sizeCode": "M", "qty": 2,
    "toppings": [{"toppingId":"60cd6f0c-20e8-4ed5-8d69-e061463fbe02","quantity":2}]
  }]
}
```

Đây **chưa phải payload có thể gửi nguyên xi theo Orders hiện có**:
[orders.md](orders.md) dùng `quantity` số ly và `toppingIds`, mất số phần topping;
[checkout-payments.md](checkout-payments.md) dùng cartItems/size và ID minh họa
không UUID. Huy/Phát/Thắng phải chốt DTO cùng đợt, không vá riêng client rồi báo
đã tích hợp. Không gửi userId/giá/tổng làm căn cứ nghiệp vụ; chủ đơn từ JWT.

## 7. Checklist review

Gộp không phụ thuộc thứ tự; 1/2 phần tách dòng; qty sai/gộp >99/thiếu tổng tồn
giữ giỏ; restore lỗi/giá đổi có cảnh báo; mã nhập giữ qua auth; xóa hết bỏ mã;
mua ngay không đổi giỏ trước/sau PAID/FAILED; đơn đang giữ chỉ sửa sau hủy xác
nhận; không nhân đôi lượt khi retry. Đây là tiêu chí cho Bước 15–20, chưa là kết
quả chạy. Sequence tương ứng: [thêm món](../diagrams/sequence/cart/01-add-item.puml),
[sửa/xóa](../diagrams/sequence/cart/02-update-remove-item.puml).
