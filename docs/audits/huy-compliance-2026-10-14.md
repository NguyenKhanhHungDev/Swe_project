# Kiểm tra toàn bộ phần Huy — 14/10/2026

## 1. Kết luận

**Chưa hoàn thành toàn bộ phần Huy, chưa đủ điều kiện nghiệm thu các chức năng.**

Repo đang kiểm tra là `Swe_project` lấy từ main commit `66fb1be`, branch local
`Huy` (đổi tên từ `huy/api-sequence-cart-promotions-loyalty`). Có hai đặc tả và bốn sequence của
Huy để REVIEW. Code thực tế vẫn là scaffold Next.js/NestJS với API Hello;
chưa có Cart frontend, Promotions/Loyalty backend, Auth, Products/Orders/Payments
hoặc Prisma tích hợp để chạy các luồng Huy.

Build/lint và test Hello đạt chỉ chứng minh bộ khung hoạt động. Không có cơ sở
để báo giỏ/voucher/điểm hoặc transaction/concurrency đã đạt. Bản Vite trước đó
là demo khác, không được dùng làm chứng cứ repo Next.js/NestJS đã có chức năng.

## 2. Phạm vi nguồn đã đối chiếu

| Dữ liệu Huy đã gửi | Nội dung được kiểm tra |
|---|---|
| File phân công Bước 13/14 và phân công trong main | Hai API spec, bốn sequence; Cart/Promotions/Loyalty; quyền sở hữu module |
| US-CART-01/02, US-PROMO-01 và Acceptance Criteria | Cấu hình, gộp, số phần/số ly, tồn, giá, lưu/restore, mã và dữ liệu khi lỗi |
| UC-06/07/08 của Huy, UC-14 của Khoa | Thêm/sửa/xóa, mua ngay riêng món, áp/bỏ mã, xem/lịch sử điểm |
| User story/UC của Hưng | Menu/chi tiết/S-M-L, topping thuộc món, hết hàng vẫn xem, không cho mua |
| User story/UC của Khoa | JWT, role, giữ giỏ qua đăng nhập, logout xác nhận xóa giỏ, dữ liệu của mình |
| User story/UC của Phát | Tạo đơn/snapshot/15 phút, khóa sửa, hủy xác nhận, giữ/hoàn tồn đúng một lần |
| User story/UC của Thắng | Payment mock, PAID/FAILED/timeout, retry/replay, dọn đúng lượt mua |
| Bốn file bước xử lý | Đầu vào, tác động ghi, dữ liệu phải giữ khi lỗi, điểm nối giữa các thành viên |
| Activity 14 ảnh / 11 sơ đồ | Ảnh 2–3, 5–6, 13–14 là cặp nối; đối chiếu thời điểm tạo đơn, mua ngay, hết hạn và kho |
| ERD sơ bộ hai ảnh và Detailed ERD trong main | Mapping UUID/size/giá, ledger điểm, promotion, reservation, unique và transaction |
| Quy tắc dữ liệu/code và AGENTS | Giữ cấu trúc, không sửa phần người khác/schema, phân biệt thiết kế và code, kiểm tra Git |
| Yêu cầu trực tiếp mới nhất của Huy | Mua ngay chỉ cấu hình hiện tại; giữ yêu cầu lượt voucher như đề xuất cần duyệt; làm local chưa upload |

Các nguồn khác nhau không được coi đồng thời là một contract đã chốt. Những
mâu thuẫn bên dưới được ghi lại, không tự đổi nguồn của nhóm.

## 3. Test/lint/build đã chạy

| Kiểm tra | Kết quả thực tế | Chứng minh được gì |
|---|---|---|
| Cài backend/frontend bằng npm ci theo lockfile | Đạt, không đổi manifest/lockfile | Có dependency để chạy kiểm tra |
| `npm.cmd --prefix backend test -- --runInBand` | 1 suite, 1 test đạt | Unit test lời chào, không test Cart/Promotions/Loyalty |
| `npm.cmd --prefix backend run test:e2e -- --runInBand` | 1 suite, 1 test đạt | GET / trả lời chào; không E2E mua hàng |
| Backend ESLint `node node_modules/eslint/bin/eslint.js src test` | Đạt, không --fix | Lint scaffold, không tự sửa code nhóm |
| `npm.cmd --prefix backend run build` | Đạt | NestJS scaffold biên dịch |
| `npm.cmd --prefix frontend run lint` | Đạt | Lint trang Hello |
| `npm.cmd --prefix frontend run build` | Đạt sau khi được phép truy cập mạng | Build và TypeScript qua; route chỉ / và /_not-found |
| `node scripts/check-huy-docs.mjs` | 10 JSON, 29 link, 12 bảng đạt tại thời điểm chạy | Cấu trúc tài liệu/UUID/DTO/tiền minh họa, không test API |
| `node scripts/huy-diagrams.mjs --jar ../tools/plantuml/plantuml.jar` | 4 puml kiểm tra và xuất SVG đạt | PlantUML hợp lệ, có activation bar; không chứng minh đủ nghiệp vụ tiêu điểm |
| `node scripts/audit-huy-runtime.mjs` | Exit 1: 8 route nghiệp vụ trả 404 | Xác nhận thiếu triển khai; đây là audit chưa đạt, không phải test pass |
| `git diff --check` và kiểm tra đường dẫn nguồn | Đạt trước khi viết báo cáo, kiểm tra lại khi bàn giao | Không thay code/cấu hình/module thành viên khác |

Frontend build ban đầu không tải được Geist/Geist Mono trong sandbox. Chạy lại
cùng lệnh với quyền mạng đã đạt: đây là hạn chế môi trường lần chạy đầu, không
phải lỗi nghiệp vụ Huy. Có warning workspace root/multiple lockfiles do clone
lồng trong workspace, chưa sửa cấu hình chung. Không có bằng chứng lỗi biên
dịch còn tồn tại trong các lần build cuối.

## 4. Audit route runtime

Script khởi tạo NestJS AppModule đã build, gọi HTTP qua Supertest, đóng app sau
kiểm tra; không tạo dữ liệu DB hoặc thanh toán. Kết quả máy đọc được ở
[huy-runtime-results.json](huy-runtime-results.json).

| Route | HTTP | Nhận xét |
|---|---|---|
| GET / | 200 | Lời chào có thật |
| GET /products | 404 | ProductsModule rỗng, chưa có catalog |
| GET /products/:id (UUID hợp lệ) | 404 | Chưa có API chi tiết |
| POST /promotions/validate | 404 | Chưa có PromotionsController/service |
| GET /loyalty/me | 404 | Chưa có đọc số dư |
| GET /loyalty/me/transactions | 404 | Endpoint lịch sử chưa có, phạm vi còn review |
| POST /orders | 404 | Chưa tạo đơn cho giỏ hoặc BUY_NOW |
| POST /payments | 404 | Chưa có payment mock runtime |
| POST /auth/login | 404 | Chưa có JWT login runtime |

Không đánh dấu REST Cart CRUD thiếu: theo kiến trúc Cart là state client,
không bắt buộc có /cart ở backend. Thiếu quan trọng là **Cart store/UI trong
frontend**. Không có JWT để thử ca customer/staff/ownership thật; các route
404 cũng chưa có guard/DTO để trả 401/403/400 đúng contract.

## 5. Đối chiếu tiêu chí phần Huy

“Đã mô tả” chỉ nói thiết kế; tất cả mục runtime dưới đây chưa đạt trong repo
hiện tại. Không tạo test giả bằng cách kiểm tra chuỗi trong tài liệu rồi gọi
đó là acceptance test nghiệp vụ.

| ID | Tiêu chí và nguồn | Tài liệu phần Huy | Code/test runtime |
|---|---|---|---|
| C01 | Add từ chi tiết, dấu + chỉ mở cấu hình (US/UC/PROD) | Có contract điểm nối | Chưa UI/catalog/store |
| C02 | Mặc định S, không topping, 1 ly; S/M/L theo món | Có trong nguồn/DTO | Chưa UI để kiểm chứng |
| C03 | qty integer 1–99, topping mỗi loại 0–3 phần/ly | Có; 0 bỏ khỏi request, quantity lưu 1–3 | Chưa runtime validation |
| C04 | Gộp theo món+size+topping/số phần, không phụ thuộc thứ tự | Có | Chưa store và test gộp |
| C05 | Khác số phần hoặc size tách dòng; gộp không vượt 99 | Có | Chưa code/test |
| C06 | Tổng qty cùng sản phẩm trên mọi cấu hình ≤ tồn | Có yêu cầu, nêu thiếu contract đọc tồn | Products chỉ thiết kế boolean; API/store chưa có |
| C07 | Món hết/ngừng bán vẫn xem, khóa mua; lỗi không đổi giỏ | Có consumer policy | Chưa code và ca lỗi |
| C08 | Tính đơn giá/thành tiền/tổng/badge tổng ly | Có theo giá đầy đủ size | Chưa UI/store/test giá |
| C09 | Add báo 3 giây, giữ trang, không giữ kho | Có | Chưa chức năng |
| C10 | Lưu browser; reload validate cấu trúc/catalog/tùy chọn/giá | Có | Chưa persistence/restore |
| C11 | Giá đổi báo tổng mới; lỗi tải không giả giỏ rỗng/giá 0 | Có | Chưa UI/API |
| C12 | Sửa bằng nhập/nút; sai giữ qty cũ, xóa riêng, đổi cấu hình chọn lại | Có | Chưa UI/store |
| C13 | Xóa hết bỏ mã, giỏ trống, chặn tạo/thanh toán | Có | Chưa runtime |
| C14 | Xóa toàn giỏ có xác nhận; Giữ lại/Escape không xóa | Có contract clearCart; chi tiết không vẽ hết trong sequence ngắn | Chưa modal; không phải API hủy đơn |
| C15 | Mua ngay chỉ cấu hình hiện tại, không vào giỏ/chỉnh giỏ chính | Có, khớp BR-06 mới và yêu cầu Huy | Chưa trang chi tiết/draft/checkout |
| C16 | BUY_NOW giữ qty/size/topping, chỉ review; chưa tạo đơn/thu tiền | Có | Chưa UI/Orders |
| C17 | BUY_NOW giữ giỏ cả PAID/FAILED; chỉ dọn draft | Có | Chưa backend/sự kiện để kiểm chứng |
| C18 | Login/re-auth giữ giỏ, mã nhập và đích; logout xác nhận xóa local | Có hợp đồng Auth | Auth/Cart chưa có |
| C19 | Đơn chưa trả: snapshot giá/hàng đã giữ; hủy xác nhận trước sửa | Có | Orders/Inventory/Cart chưa có |
| C20 | FAILED/timeout giữ lượt mua; PAID chắc chắn mới dọn đúng snapshot | Có | Chưa payment/order/runtime |
| P01 | Apply mã cần JWT và giỏ có món; trim/uppercase | Có | /promotions/validate 404 |
| P02 | Mã tồn tại/bật/thời hạn/ngưỡng; tiền backend không tin client | Có | Chưa service/Prisma/DTO |
| P03 | Giảm %, floor, ngưỡng/trần; total >0; tiền integer an toàn | Có, fixture 90.000→9.000→81.000 | Chưa money/decimal runtime test |
| P04 | Một mã; mã mới lỗi giữ mã cũ còn hợp lệ; bỏ dùng subtotal hiện tại | Có | Chưa state/API |
| P05 | Giỏ đổi kiểm tra lại mã, tự bỏ khi mất điều kiện và thông báo | Có | Chưa function/test |
| P06 | Tạo đơn kiểm tra lại mã, không âm thầm tạo đơn giá cao hơn | Có điểm nối Orders | Chưa implement/tx test |
| P07 | UC Huy yêu cầu còn lượt voucher | Đề xuất REVIEW, khác BR-08/ERD; chưa chốt quota policy | Chưa schema/service/transaction, chưa đáp ứng |
| L01 | Chỉ xem số dư mình từ JWT; tài khoản mới 0, lỗi không giả 0 | Có | /loyalty/me 404 |
| L02 | floor(total/10000) khi PAID đúng một lần; không cộng FAILED | Có contract nội bộ/ledger | Chưa Loyalty/Payments/Prisma |
| L03 | Hủy PAID đảo đúng EARN cũ một lần trong tx chung | Có | Chưa ledger/refund/reservation runtime |
| L04 | Đồng thời/replay không nhân đôi điểm; rollback toàn luồng | Có phương án theo unique(order_id,type) | Chưa test DB/concurrency |
| L05 | Xem lịch sử giao dịch của mình | Có API optional REVIEW, main chưa chốt phạm vi | Chưa UI/API |
| L06 | “Sử dụng điểm” trong phân công | Chỉ ghi chưa có BR/REDEEM, chưa mô tả một luồng tiêu điểm hoàn chỉnh | Chưa đạt, thiếu quy tắc nghiệp vụ |

## 6. Kiểm tra phân công và tài liệu

| Đầu ra | Kết quả |
|---|---|
| Hai đặc tả đúng tên | Đủ cart.md và promotions-loyalty.md, ở mức REVIEW |
| Method/auth/input/output/lỗi/mapping/nguồn | Có cho các HTTP endpoint đề xuất; Cart local ghi rõ không gán HTTP giả |
| Bốn file sequence đúng đường dẫn | Có, rút gọn và có activation bar, render được |
| Sequence 1–3 đúng luồng chính/nhánh lỗi | Có thiết kế; chưa có xác nhận consumer/triển khai |
| Sequence 4 “kiểm tra và sử dụng điểm” | Mới kiểm tra điểm; tiêu điểm chưa thể thiết kế đầy đủ vì thiếu quy tắc |
| Đối chiếu Detailed ERD/API chung | UUID, sizeCode, giá Vnd, ledger phù hợp; quota và một số DTO còn xung đột |
| Nhóm thống nhất liên module | Chưa; checkbox review để trống, không tự đánh DONE |
| Frontend/Backend Huy (Bước 15/16) | Chưa triển khai trong repo |
| Unit/integration/E2E nghiệp vụ Huy (Bước 19/20) | Chưa có; hai test hiện có chỉ Hello |
| Scrum Burndown/tổng hợp test toàn nhóm | Chưa có dữ liệu sprint/ước lượng/minh chứng nhóm để nghiệm thu; báo cáo này chỉ tổng hợp lượt audit hiện tại |
| Git branch/commit/PR | Có nhánh local; chưa commit/push/PR theo yêu cầu Huy |

Như vậy **đủ số lượng file cho Bước 13/14, nhưng chưa thể báo phân công đã
nghiệm thu hoàn toàn**. Nếu “hoàn thành” bao gồm chức năng và kiểm thử nghiệp
vụ thì hiện chưa đạt. Nhánh này mới là phần thiết kế của Huy.

## 7. Mâu thuẫn/chỗ cần chốt trước triển khai

1. **Quota voucher:** Huy giữ UC cũ có lượt; main BR-08/quyết định nhóm và
   PROMOTION chưa có lượt. Cần loại giới hạn, thời điểm giữ/trừ/hoàn, tranh lượt
   và ERD được review. Không tự thêm quota/migration hoặc giả có 100 lượt.
2. **Tiêu điểm:** chưa có tỷ lệ, giới hạn, thứ tự voucher/điểm hoặc REDEEM.
   Không tự dùng số điểm làm tiền giảm. Nhóm bổ sung rules hoặc xác nhận đổi
   tên sơ đồ thứ tư thành kiểm tra điểm.
3. **DTO Orders:** hiện quantity số ly/toppingIds, không có số phần. Cart
   đề xuất qty/toppings[{toppingId,quantity}] theo Architecture. Phát/Huy/Thắng
   phải đồng bộ; không gửi nguyên payload mới rồi coi lỗi bên Orders đã được sửa.
4. **DTO Checkout:** cartItems/size/ID prod_001 và “giỏ DB Huy” khác UUID/
   sizeCode/browser Cart trong ERD. Đây là lỗi điểm nối, chưa sửa tài liệu Thắng.
5. **Tồn frontend:** ProductDetail không trả số khả dụng. Boolean canPurchase
   không đủ chứng minh tổng qty ≤ tồn. Chốt API/service preview với Hưng/Khoa/Thắng.
6. **Nghiệp vụ ngoài phạm vi:** Orders spec nhắc ADMIN/COD, khác CUSTOMER/STAFF
   và WALLET/CARD mock; cần Phát/Thắng review, không thêm vào phần Huy.
7. **Nguồn cũ:** Activity mua ngay toàn giỏ/EXPIRED/kho nguyên liệu không đồng
   thời phù hợp BR mới. Giữ mua ngay riêng món, CANCELLED khi hết hạn, kho theo
   sản phẩm; không sửa sơ đồ hoặc phân công người khác trong audit.
8. **Bản API Orders/Checkout hiện có:** fenced JSON cuối file chưa đóng và
   endpoint spec mới có một phần; không coi cả hai bộ contract đã hoàn thiện
   chỉ từ tên file. Không sửa hoặc nghiệm thu thay chủ module.

## 8. Thứ tự hoàn thiện tiếp theo

1. Nhóm chốt hai quy tắc quota/tiêu điểm và DTO/tồn; hoàn tất review Bước 13/14.
2. Huy triển khai Cart store/UI và mua ngay trong features của Next.js;
   Hưng/Thắng nối thao tác qua contract, không chép App.tsx prototype vào repo.
3. Huy triển khai Promotions/Loyalty sau khi có Auth, PrismaService và schema
   đã được Hưng/Phát duyệt; chưa sửa các phần này thay thành viên khác.
4. Ghép Orders/Inventory/Payments, chỉ dọn giỏ khi có PAID thật.
5. Viết/chạy unit test nghiệp vụ, integration/concurrency DB và E2E thực tế
   cho các dòng C/P/L ở mục5. Khi đó mới có thể đánh giá từng mục PASS/FAIL.

Không thay đổi code, schema hay rules của nhóm trong lượt audit; không commit
hoặc upload. Các dependency/output build được cài/sinh tại máy, không nộp làm
code chức năng. Báo cáo này là minh chứng kiểm tra và danh sách thiếu, không là
tuyên bố tất cả UC đã đạt.
