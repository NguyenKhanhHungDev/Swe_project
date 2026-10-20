# BrewLite — API Specification tổng hợp

**DRAFT — Pending owner review.** Điều phối: Hưng. Rà Buổi 1: 20/10/2026.

Tài liệu là mục lục hợp đồng và bảng phối hợp toàn hệ thống. Hiện có Products, Cart, Promotions/Loyalty, Orders và bản Checkout/Payments chưa hoàn chỉnh. Buổi 1 bổ sung nháp Inventory/Payment; Auth/Users spec riêng còn thiếu. Tất cả là thiết kế chờ review, không phải API đã triển khai.

## 1. Kiến trúc và hiện trạng đã kiểm tra

Theo [Architecture](../ARCHITECTURE.md) mục 2–5: Next.js gọi REST API/JSON của
NestJS modular monolith; backend dự kiến truy cập PostgreSQL qua PrismaService.
Controller nhận DTO, service xử lý nghiệp vụ, guard bảo vệ route cần đăng nhập.
Các module gọi service qua dependency injection, không gọi HTTP nội bộ hoặc
controller của nhau. Frontend không truy cập database.

Đã kiểm tra `apps/api/src/main.ts`, `app.module.ts`, `products/products.module.ts`,
`apps/api/package.json`, `apps/web/package.json` và `apps/web/src/app/page.tsx`:

- ProductsModule rỗng, chưa có API Products, DTO/service nghiệp vụ hoặc Prisma dependency.
- Frontend là trang Hello gọi API lời chào; chưa có menu/chi tiết nghiệp vụ.
- Backend chưa cấu hình global prefix/version. Đường dẫn Products trong bản này
  là `/products` và `/products/:id`, không tự thêm `/api/v1`.
- Test scripts backend có Jest unit/E2E; lint có `--fix`. Những test Hello không
  xác minh được hợp đồng Products. Không chạy lint có sửa code cho thay đổi tài liệu.

Hợp đồng nghiệp vụ dùng envelope `data` hoặc `error`, JWT Bearer cho route cần
xác thực, integer VND, UUID string và ISO 8601 UTC. Chi tiết ở
[API_CONVENTIONS.md](API_CONVENTIONS.md); không đổi API Hello trong lượt này.

## 2. Danh mục module và người phụ trách

Phân công theo [TEAM_ASSIGNMENTS](../TEAM_ASSIGNMENTS.md) và Architecture mục 4.
Chỉ liên kết tài liệu đã tồn tại; tên file dự kiến dưới đây là văn bản, không tạo
link hỏng hoặc file giả cho phần các thành viên khác.

| Module / phần việc | Chủ trì | Tài liệu hiện có | Trạng thái / nơi bổ sung dự kiến |
|---|---|---|---|
| Quy chuẩn dùng chung | Hưng; cả nhóm review | [API Conventions](API_CONVENTIONS.md) | Bản đề xuất để review; chưa triển khai common filter/guard/serializer. |
| Products | Hưng | [Products API](products.md) | Hai GET đã đặc tả để review; chưa triển khai/nghiệm thu. |
| Auth | Khoa | Chưa có đặc tả riêng | Khoa bổ sung `auth.md`. |
| Users, RBAC | Khoa | Chưa có đặc tả riêng | Khoa bổ sung `users.md`; RBAC có thể ghi cùng Auth, không suy ra endpoint RBAC. |
| Inventory | Khoa | [Inventory draft](inventory-contract.md) | DRAFT — Pending owner review; service nội bộ, chưa tạo endpoint. |
| Cart | Huy | [Cart](cart.md) | REVIEW: contract state/mua ngay; giỏ browser, còn điểm nối đọc số tồn và DTO Orders cần chốt. |
| Promotions | Huy | [Promotions & Loyalty](promotions-loyalty.md) | REVIEW: validate mã và báo giá; kiểm tra lượt là đề xuất Huy khác BR-08, cần nhóm duyệt ERD. |
| Loyalty | Huy | [Promotions & Loyalty](promotions-loyalty.md) | REVIEW: đọc/cộng/đảo điểm; lịch sử là đề xuất tùy chọn, tiêu điểm chưa có quy tắc. |
| Orders | Phát | [Orders](orders.md) | DRAFT; route, role, DTO và Sequence còn xung đột PD-05–09. |
| Order cancellation đã trả tiền | Phát; Thắng/Khoa/Huy phối hợp | Chưa có đặc tả riêng | Phát xác định mục tương ứng trong `orders.md` hoặc tài liệu riêng theo Architecture 5.5; chưa chốt URL. |
| Checkout UI / Payments backend | Huy / Thắng | [Nguồn cũ](checkout-payments.md), [Payment draft](payment-contract.md) | DRAFT — Pending owner review; DTO/enum/idempotency chưa chốt. |

PrismaService do Khoa chủ trì, common do các owner phối hợp review; đây là thành phần kỹ thuật dùng chung, không tự tạo API public.
Khi chủ module bổ sung file thật, cập nhật link, endpoint, phiên bản, nguồn UC/BR và
trạng thái review trong bảng này. Không gán trạng thái đã làm từ tên module scaffold.

## 3. Endpoint đã đặc tả

| API ID | Method | Endpoint | Quyền | HTTP đã đặc tả | Tài liệu |
|---|---|---|---|---|---|
| PRD-01 | GET | `/products` | Public | 200, 400, 500 | [Products mục 3](products.md#3-prd-01--xem-menu-đồ-uống) |
| PRD-02 | GET | `/products/:id` | Public | 200, 400, 404, 500 | [Products mục 4](products.md#4-prd-02--xem-chi-tiết-và-tùy-chọn-đồ-uống) |
| PRO-01 | POST | `/promotions/validate` | CUSTOMER | 200, 400, 401, 403, 409, 500 | [Promotions & Loyalty](promotions-loyalty.md), mục 2; quota chờ duyệt |
| LOY-01 | GET | `/loyalty/me` | CUSTOMER, dữ liệu của mình | 200, 400, 401, 403, 500 | [Promotions & Loyalty](promotions-loyalty.md), mục 3 |
| LOY-02 | GET | `/loyalty/me/transactions` | CUSTOMER, dữ liệu của mình | 200, 400, 401, 403, 500 | [Promotions & Loyalty](promotions-loyalty.md), mục 4; tùy chọn chờ duyệt phạm vi |

Các endpoint bắt buộc A1 như POST /orders, POST /payments, GET /orders/me được truy vết trong backlog; bảng trên chỉ là phần API đã đặc tả chi tiết ở vòng review cũ. Orders/Payment hiện có nháp chưa hoàn chỉnh, không suy ra endpoint đã triển khai.
Món hết hàng/ngừng bán trả 200 ở chi tiết và khóa mua, không giả thành 404.

## 4. Căn cứ, khác biệt và quyết định

Bảng D-01–D-11 dưới đây giữ lịch sử phát hiện trong vòng spec trước. Các khẳng định README/Scope/ERD chưa có ở D-11 đã lỗi thời: các file đều tồn tại và được kiểm kê Buổi 1. Quyết định hiện hành còn chờ ở [Pending Decisions](../scrum/team-working-agreement.md#pending-decisions); không coi bảng lịch sử là phê duyệt.

| ID | Nguồn / phát hiện | Cách xử lý ở Bước 13 | Người cần xác nhận |
|---|---|---|---|
| D-01 | Architecture 6.2 dùng “phụ thu size”; Detailed ERD 3.2/6.1 dùng giá đầy đủ; Preliminary ERD mục 4 và REQUIREMENTS_REVIEW vẫn nêu câu hỏi giá. | Theo yêu cầu trực tiếp Bước 13 và Detailed ERD: PRODUCT_SIZE.price_vnd là giá đầy đủ; không cộng giá S vào M/L. Ghi khác biệt, không sửa nguồn. | Hưng/Huy/Phát review và đồng bộ thuật ngữ trong lượt được giao sau. |
| D-02 | Preliminary ERD có PRODUCT_SIZE.id, PRODUCT_TOPPING.id và decimal price; Detailed ERD dùng khóa ghép và BIGINT price_vnd. | Dùng bản Detailed cho mapping API; không xuất sizeId hay ID quan hệ giả. Đây là mức chi tiết đã thay đổi, không dùng đồng thời cả hai cấu trúc. | Hưng/Phát trước Prisma; Huy/Thắng với consumer. |
| D-03 | SRS UC-04/05 nói món hết hàng vẫn xem được; chưa nói PRODUCT.is_available=false. | Người dùng xác nhận ngày 11/10/2026: vẫn hiển thị và xem chi tiết, khóa mua. Đã phản ánh trong Products; chưa sửa SRS. | Đã có quyết định trong phiên; nhóm ghi nhận ở vòng review yêu cầu. |
| D-04 | Topping có hai cờ khả dụng; SRS chưa nói ẩn hay hiện tùy chọn bị vô hiệu hóa. | Đề xuất giữ topping liên kết trong response, isAvailable là AND hai cờ, canSelect còn phụ thuộc canPurchase; chưa coi chính sách hiển thị đã duyệt. | Hưng/Huy. |
| D-05 | Architecture 6.1: PaymentStatus PROCESSING/SUCCEEDED/FAILED/REFUNDED; Detailed ERD 3.9/3.11: payment_result PENDING/SUCCEEDED/FAILED và bảng REFUND riêng. | Chưa thể dùng enum DB làm API PaymentStatus. Cần đặc tả mapping trạng thái API với attempt/refund, không tự thay một enum bằng enum kia trong chuẩn chung. | Thắng/Phát, Hưng review. |
| D-06 | Architecture 6.1 dùng qty cho số ly, quantity cho topping; ERD dùng ORDER_ITEM.quantity và servings_per_drink. | Giữ tên JSON theo Architecture, phân biệt mapping API/DB. Không coi tên DTO bằng tên DB tự động. | Hưng/Huy/Phát/Thắng chốt DTO lựa chọn và snapshot. |
| D-07 | Main chưa có prefix/version; Architecture giao chốt đường dẫn cho bước 13. | Giữ không prefix; DTO mới, thứ tự danh sách, không phân trang, query/body lạ trả 400 và public route bỏ qua token là đề xuất kỹ thuật rõ ràng. | Cả nhóm review trước triển khai common/client. |
| D-08 | BIGINT database rộng hơn miền integer an toàn của JSON number trong JavaScript. | Kiểm tra miền trước serialization, giữ JSON integer theo Architecture; không âm thầm stringify BigInt hoặc làm tròn. | Hưng/Phát/Thắng/Huy review serializer và tổng tiền. |
| D-09 | ERD yêu cầu S cho món bán được, kho 1:1; chưa có chính sách API cho dữ liệu hỏng. | Đề xuất 500 nếu món đang bán thiếu S, bất kỳ món nào thiếu kho hoặc dữ liệu đọc được sai; ngừng bán thiếu S trả null giá S, khóa mua. Không lọc âm thầm. | Hưng/Khoa/Phát review dữ liệu seed và lỗi. |
| D-10 | ERD 6.5 chưa chốt scope khóa/fingerprint; BR-20/24–27 yêu cầu chống lặp. | Chuẩn header 1–128 ký tự đã đề xuất; chưa quyết định TTL, fingerprint, replay status hoặc request đang chạy thay chủ module. | Phát/Thắng, Khoa review ownership. |
| D-11 | USER_STORIES/ACCEPTANCE_CRITERIA là khung; USE_CASES có danh mục; Roadmap mục 4 còn nói ERD sơ bộ đang chuẩn bị, bước 11–24 chưa xác minh. README còn ghi SRS/BR cần bổ sung dù file đã tồn tại. | Dùng nội dung thực tế để đặc tả, nêu thiếu minh chứng duyệt; không cập nhật tiến độ hay bịa mã US/AC. Figma/Activity chưa được xác minh bằng artefact trong lượt này. | Chủ phần thiết kế bổ sung và review; Hưng tổng hợp sau. |

Nguồn bổ sung: [Preliminary ERD](../ERD_PRELIMINARY.md),
[Detailed ERD](../ERD_DETAILED.md), [Requirements Review](../REQUIREMENTS_REVIEW.md),
[Project Context](../PROJECT_CONTEXT.md), [Roadmap](../PROJECT_ROADMAP.md),
[README](../../README.md). Chưa có bằng chứng mọi tài liệu nguồn đã được nhóm duyệt.

## 5. Bảng kiểm tra tính nhất quán liên module

“Đã mô tả” nghĩa có nội dung trong bộ tài liệu này, không nghĩa consumer đã đồng ý
hoặc integration test đã đạt. Các ô xác nhận để trống cho vòng review thật.

| Điểm giao | Điều cần đối chiếu | Trạng thái tài liệu | Chủ review | Nhóm xác nhận |
|---|---|---|---|---|
| Products → Cart | product UUID, sizeCode, topping UUID; qty/quantity; 0–3 phần; không có sizeId | Có Cart contract để review; Products chưa trả số tồn để kiểm tra tổng qty | Hưng/Huy | [ ] |
| Products → Inventory | isInStock từ on_hand-reserved_quantity; canPurchase còn xét cờ bán; đọc theo lô | Đề xuất có trong Products, thiếu giao diện service Inventory | Hưng/Khoa | [ ] |
| Products/Cart → Orders | Giá đầy đủ size, giá topping theo món; backend kiểm tra lại, snapshot đơn | Cart đề xuất qty + toppings có quantity; Orders hiện dùng quantity/toppingIds, cần đồng bộ | Hưng/Huy/Phát | [ ] |
| Promotions → Orders | Mã hợp lệ, tính lại/giữ snapshot, không tự bỏ mã khi lỗi | Có Promotions contract để review; quota Huy khác BR-08/ERD hiện hành, chưa coi đã duyệt | Huy/Phát | [ ] |
| Orders → Inventory | Kiểm tra tổng ly sản phẩm qua các size, giữ kho và tạo đơn cùng transaction | Architecture/ERD có thiết kế; thiếu hợp đồng service | Phát/Khoa | [ ] |
| Orders → Payments | Tiền từ đơn, thời hạn, ownership, idempotency và mapping PaymentStatus | D-05/D-10 chưa chốt | Phát/Thắng/Khoa | [ ] |
| Payments → Loyalty | Cộng/đảo điểm một lần, dùng chung transaction | Có contract nội bộ Loyalty theo ledger/BR-28/32; cần các bên review, chưa có backend | Thắng/Huy/Phát | [ ] |
| Hủy PAID | OrderCancellationService điều phối hoàn tiền/kho/điểm, không phụ thuộc vòng | Chưa có API cancellation, không tự tạo URL | Phát/Thắng/Khoa/Huy | [ ] |
| Auth → mọi API bảo vệ | JWT, CUSTOMER/STAFF, 401/403 và ownership | Chuẩn chung đã mô tả; lưu token/thời hạn/đăng xuất chưa chốt | Khoa và chủ module | [ ] |
| Mọi API → frontend | data/error, null/array, integer VND, serializer BIGINT, UTC, HTTP status | Có quy chuẩn đề xuất; chưa có test consumer | Cả nhóm | [ ] |

## 6. Checklist tự kiểm tra và bàn giao

- [x] Đối chiếu SRS UC-04/05, BR-03/04/05/15 và Detailed ERD 3.2–3.4.
- [x] Chỉ hai endpoint Products; GET không body; không Categories/Product CRUD.
- [x] Có quy chuẩn URL, status, JSON, lỗi, auth, validation và header idempotency.
- [x] Phân biệt field database, DTO đề xuất và field suy ra; nêu khác biệt tài liệu nguồn.
- [x] Chỉ thêm ba file API, giữ nội dung các file nguồn và công việc đang có.
- [ ] Nhóm duyệt các quyết định D-01–D-10 còn mở và bổ sung US/AC.
- [ ] Chủ module cung cấp đặc tả còn thiếu và ghi nhận review liên module.
- [ ] Có minh chứng chạy API/contract tests — chưa triển khai trong Bước 13.

Kiểm tra tài liệu khi bàn giao: parse toàn bộ fenced JSON; xác minh Markdown link
và anchor tới file thực; đối chiếu schema ví dụ với bảng field; kiểm tra git diff
và checksum công việc có trước. Kết quả thực chạy được báo trong bàn giao phiên,
không coi checklist nội dung là acceptance test của ứng dụng.

Kết quả tự kiểm tra ngày 11/10/2026: 10 mẫu JSON parse được; 28 link/anchor nội bộ
hợp lệ; 20 bảng có số cột nhất quán. Ví dụ Products đã kiểm tra UUID, bộ field DTO,
giá nguyên an toàn, giá S khớp giữa menu/chi tiết và công thức tính tiền minh họa.
Kiểm tra whitespace cho cả ba file mới đạt; diff và checksum xác nhận giữ nguyên
công việc có trước. Chưa chạy API, unit/integration/E2E hoặc đo NFR-01 vì chưa
triển khai nghiệp vụ trong phạm vi này.

## 7. Mức sẵn sàng review UML theo A2

Phần Products đủ nội dung để **review đầu vào** Sequence Diagram cho menu/chi tiết:
request, nhánh rỗng/UUID sai/không tìm thấy/lỗi dữ liệu, giá và khả dụng đã được mô tả.
Trước khi chốt sơ đồ, duyệt DTO, chính sách dữ liệu hỏng/topping vô hiệu hóa và giao
diện đọc tồn với Khoa. Quyết định món ngừng bán đã được người dùng xác nhận.

Sequence đã có trong repository nhưng còn xung đột, xem [kiểm kê sơ đồ](../diagrams/README.md). Chưa đủ điều kiện nghiệm thu A2 Task 2 trước Task 1; cần chốt requirements, mapping payment, idempotency và các điểm giao. Buổi 1 không triển khai nghiệp vụ/Prisma/CI/CD.
