# BrewLite — Use Cases

> **DRAFT — Pending owner review (20/10/2026).** Nguồn thiết kế được giữ để review, chưa nghiệm thu hoặc triển khai. Các đoạn thời hạn 15 phút/expiresAt/hết hạn bên dưới đang xung đột với yêu cầu hiện tại không triển khai timer; không dùng chúng để tạo timer/cron. Chờ Phát/Khoa/Thắng chốt và sửa đồng bộ theo [PD-05](scrum/team-working-agreement.md#pending-decisions). Các khác biệt DTO, giá, quyền và transaction xem cùng bảng Pending Decisions.


**Cập nhật quyết định nhóm ngày 13/10/2026:** Nội dung hiện hành tuân theo đề của thầy và các quyết định đã được nhóm xác nhận. Xem [quyết định yêu cầu](REQUIREMENTS_DECISIONS.md).

**Mốc tài liệu cũ (không dùng làm chuẩn nghiệm thu):** 6. **Ngày cập nhật:** 13/10/2026. **Trạng thái:** Bản đặc tả để review, chưa nghiệm thu.

[SRS](SRS.md) quy định danh mục UC-01–UC-18 với hai tác nhân Khách hàng và Nhân viên quầy. Sơ đồ Use Case hiện có chưa được xác minh đầy đủ các quan hệ UML.

**Quyết định hiện hành:** Hưng đã chốt mua ngay chỉ mua món hiện tại và bản đầu không giới hạn lượt mã. Các đặc tả dưới đây đã điều chỉnh theo quyết định này. UC-14 về lịch sử tích/tiêu điểm vẫn chưa xác minh phạm vi; không coi tiêu điểm là chức năng đã được duyệt.

## Tài khoản, lịch sử đơn và điểm thưởng

### UC-01: Đăng ký

Đăng ký

#### Actor

Khách hàng

#### Description

Use Case bắt đầu khi khách hàng muốn tạo tài khoản mới. Hệ thống cho phép khách hàng nhập email và thông tin cơ bản. Nếu hợp lệ, hệ thống tạo tài khoản với 0 điểm thưởng.

#### Preconditions

1. Khách hàng đã truy cập vào ứng dụng/website BrewLite.

2. Khách hàng chưa đăng nhập vào hệ thống.

#### Normal flow

1. Khách hàng chọn chức năng đăng ký.

2. Hệ thống hiển thị biểu mẫu đăng ký thông tin (Họ tên, Email, Mật khẩu).

3. Khách hàng nhập đầy đủ thông tin đăng ký và xác nhận.

4. Hệ thống kiểm tra tính hợp lệ của dữ liệu và kiểm tra email trùng lặp.

5. Nếu thông tin hợp lệ, hệ thống tạo tài khoản khách hàng với số điểm khởi tạo là 0.

6. Hệ thống thông báo đăng ký thành công và chuyển khách hàng đến trang đăng nhập.

#### Exceptions

- Nếu thông tin nhập không đúng định dạng hoặc thiếu, hệ thống thông báo lỗi và yêu cầu điền lại.

- Nếu email đã tồn tại trên hệ thống, hệ thống thông báo lỗi và gợi ý đăng nhập.

#### Alternative flows

Không có

### UC-02: Đăng nhập

Đăng nhập

#### Actor

Người dùng / Khách hàng

#### Description

Use Case bắt đầu khi người dùng nhập email và mật khẩu để truy cập tài khoản. Hệ thống xác thực và điều hướng người dùng về đúng luồng công việc đang thực hiện (menu hoặc giỏ hàng).

#### Preconditions

1. Khách hàng đã tạo tài khoản thành công trên hệ thống.

2. Khách hàng truy cập chức năng đăng nhập trên hệ thống.

#### Normal flow

1. Người dùng chọn chức năng đăng nhập.

2. Hệ thống hiển thị màn hình đăng nhập.

3. Người dùng nhập email và mật khẩu.

4. Người dùng chọn xác nhận đăng nhập.

5. Hệ thống thực hiện kiểm tra và xác thực thông tin đăng nhập.

6. Nếu thông tin đúng, hệ thống cấp quyền sử dụng các chức năng cần tài khoản.

7. Nếu khách hàng đang trong quá trình đặt hàng, hệ thống giữ nguyên giỏ hàng và quay lại bước đang thực hiện; nếu đăng nhập thông thường, hệ thống chuyển về trang menu.

#### Exceptions

- Nếu tên đăng nhập hoặc mật khẩu không chính xác, hệ thống thông báo lỗi và yêu cầu nhập lại.

- Nếu phiên đăng nhập không hợp lệ hoặc đã hết hạn, hệ thống yêu cầu khách hàng phải đăng nhập lại.

#### Alternative flows

Không có

### UC-03: Đăng xuất

Đăng xuất

#### Actor

Người dùng / Khách hàng

#### Description

Use Case bắt đầu khi khách hàng đã đăng nhập muốn thoát khỏi phiên làm việc. Hệ thống sẽ xóa thông tin phiên và giỏ hàng hiện tại trên thiết bị.

#### Preconditions

1. Người dùng đang ở trạng thái đã đăng nhập vào hệ thống BrewLite.

#### Normal flow

1. Người dùng chọn mục Tài khoản.

2. Người dùng chọn chức năng đăng xuất.

3. Hệ thống hiển thị hộp thoại xác nhận đăng xuất.

4. Người dùng chọn xác nhận đăng xuất.

5. Hệ thống xóa thông tin phiên làm việc và xóa giỏ hàng trên thiết bị.

6. Hệ thống đưa khách hàng về lại trang menu.

7. Hệ thống đảm bảo không tiếp tục hiển thị dữ liệu riêng tư của phiên cũ.

#### Exceptions

Không có

#### Alternative flows

Việc đăng xuất không đồng nghĩa với việc hủy các đơn hàng đã được lưu hoặc đang chờ xử lý của khách hàng.

### UC-12: Xem lịch sử và chi tiết đơn

Xem lịch sử và chi tiết đơn

#### Actor

Khách hàng

#### Description

Use Case bắt đầu khi khách hàng đã đăng nhập mở lịch sử đơn. Hệ thống cho khách xem các đơn của mình và chi tiết món, giá đã chốt, trạng thái cùng các thao tác được phép.

#### Preconditions

1. Khách có phiên đăng nhập hợp lệ.

2. Đơn được yêu cầu xem chi tiết, nếu có, phải thuộc khách đang đăng nhập.

#### Normal flow

1. Khách mở lịch sử đơn.

2. Hệ thống xác thực và lấy danh sách đơn của khách, mới nhất trước.

3. Hệ thống hiển thị mã đơn, thời gian, tổng tiền và trạng thái hiện tại của từng đơn.

4. Khách chọn một đơn để xem chi tiết.

5. Hệ thống kiểm tra lại chủ sở hữu, lấy snapshot các món, size, topping và số phần, số ly, đơn giá, thành tiền, tiền giảm và tổng tiền đã chốt.

6. Hệ thống hiển thị chi tiết và các thao tác phù hợp: đơn PENDING/PAYMENT_FAILED còn hạn có thể tiếp tục thanh toán hoặc hủy.

#### Exceptions

- Phiên không hợp lệ: Yêu cầu đăng nhập lại; không trả dữ liệu riêng tư.

- Đơn không tồn tại hoặc thuộc người khác: Từ chối truy cập, không tiết lộ nội dung đơn; không cho đổi userId trên request.

- Đơn hết hạn hoặc trạng thái vừa đổi: Hiển thị thông tin hiện tại, không cho bắt đầu thanh toán sau expiresAt.

- Tải dữ liệu lỗi: Hiển thị lỗi và cho thử lại.

#### Alternative flows

- Chưa có đơn: Hiển thị trạng thái danh sách rỗng, không coi là lỗi.

- Tiếp tục thanh toán: Chuyển UC-10 với đơn hiện có, sử dụng giá và hàng đã giữ.

- Hủy đơn: Chuyển UC-13, backend kiểm tra lại quyền và trạng thái tại lúc xử lý.

### UC-14: Xem điểm thưởng

> UNVERIFIED: UI lịch sử tích/tiêu điểm dưới đây cần Khoa/Huy xác nhận phạm vi.

Xem điểm thưởng

#### Actor

Khách hàng

#### Description

Use Case bắt đầu khi khách hàng muốn kiểm tra số điểm tích lũy. Dữ liệu điểm do backend cung cấp tự động dựa trên các đơn hàng đã thanh toán thành công.

#### Preconditions

1. Khách hàng đã đăng nhập vào hệ thống BrewLite.

#### Normal flow

1. Khách hàng chọn chức năng Xem điểm thưởng trong mục Tài khoản.

2. Hệ thống gửi yêu cầu lên backend để lấy số điểm thưởng tích lũy của tài khoản.

3. Hệ thống hiển thị số điểm thưởng hiện có cho khách hàng.

4. Khách hàng chọn xem lịch sử tích/tiêu điểm.

5. Hệ thống hiển thị danh sách các giao dịch đã cộng hoặc trừ điểm.

#### Exceptions

Nếu hệ thống gặp lỗi khi tải dữ liệu từ backend, hệ thống phải hiển thị thông báo lỗi rõ ràng. Tuyệt đối không được hiển thị số 0 như một kết quả hợp lệ.

#### Alternative flows

Nếu khách hàng chưa có điểm tích lũy, hệ thống hiển thị số điểm bằng 0 và gợi ý mua hàng để tích điểm.

## Sản phẩm

### UC-04 – Xem menu đồ uống

#### Actor

Khách hàng

#### Description

Use Case bắt đầu khi khách hàng truy cập menu BrewLite

Hệ thống cho phép khách xem danh sách đồ uống, giá và tình trạng còn hàng để chọn món muốn tìm hiểu.

Khách không cần đăng nhập.

#### Preconditions

Khách hàng truy cập được ứng dụng BrewLite.

#### Normal flow

1. Khách hàng mở trang menu đồ uống.

2. Hệ thống tải danh sách đồ uống.

3. Hệ thống hiển thị hình ảnh, tên và giá cơ bản của size S, chưa gồm topping.

4. Hệ thống hiển thị tình trạng còn hàng; món hết hàng được gắn nhãn “HẾT HÀNG” rõ ràng.

5. Khách hàng xem danh sách và chọn một đồ uống.

6. Hệ thống mở trang chi tiết của món đã chọn, chuyển sang UC-05.

#### Exceptions

1. Nếu danh sách rỗng, hệ thống hiển thị “Chưa có đồ uống”.

2. Nếu tải dữ liệu thất bại, hệ thống thông báo lỗi và cho phép khách chọn “Thử lại” để tải lại menu.

#### Alternative flows

1, Nếu khách chọn món hết hàng, hệ thống vẫn mở trang chi tiết nhưng không cho mua món đó.

2. Nếu khách rời trang mà không chọn món, Use Case kết thúc.

### UC-05 – Xem chi tiết và chọn tùy chọn đồ uống

#### Actor

Khách hàng

#### Description

Use Case bắt đầu khi khách hàng xem chi tiết một đồ uống.

Khách có thể chọn size, số phần topping trên mỗi ly và số ly, xem thành tiền rồi chuyển sang chức năng thêm giỏ.

Khách không cần đăng nhập.

#### Preconditions

1. Khách hàng truy cập được BrewLite và yêu cầu xem chi tiết một món có mã sản phẩm.

#### Normal flow

1. Khách hàng chọn đồ uống từ menu hoặc mở đường dẫn chi tiết.

2. Hệ thống tải và hiển thị ảnh, tên, mô tả, tình trạng hàng, size, topping và giá tương ứng.

3. Với món còn hàng, hệ thống mặc định size S, không topping và 1 ly.

4. Khách chọn một size được bán, từ 0–3 phần cho mỗi loại topping trên một ly và từ 1–99 ly.

Số lượng phải là số nguyên và không vượt lượng còn có thể đặt.

5. Hệ thống cập nhật thành tiền: (giá cơ bản + phụ thu size + tổng tiền topping trên một ly) × số ly.

6. Khách chọn “Thêm vào giỏ hàng” hoặc “Thanh toán ngay”.

Nếu thêm giỏ, chuyển sang UC-06; nếu mua ngay, kiểm tra cấu hình và chuyển danh sách chỉ chứa món hiện tại sang bước xem lại trước UC-09.

7. Nếu chọn “Thanh toán ngay”, hệ thống chỉ xem lại cấu hình món hiện tại; không thêm hoặc thay đổi giỏ có sẵn. Thanh toán từ giỏ dùng toàn bộ giỏ.

#### Exceptions

1. Nếu món không tồn tại, hệ thống thông báo và cho quay về menu.

Nếu tải lỗi, hệ thống cho phép thử lại; chưa cho mua trong lúc tải.

2. Nếu size, topping hoặc số lượng không hợp lệ, hệ thống thông báo và yêu cầu khách điều chỉnh.

3. Nếu UC-06 từ chối do vượt tồn kho hoặc số ly sau gộp vượt 99, hệ thống thông báo, giữ nguyên giỏ và cho khách điều chỉnh tại trang chi tiết.

#### Alternative flows

1. Nếu món hết hàng, hệ thống hiện “HẾT HÀNG”, vô hiệu hóa chọn số ly và hai nút mua; khách vẫn xem được thông tin.

2. Nếu khách quay về menu, hệ thống không tự thêm món vào giỏ.

## Giỏ hàng và khuyến mãi

UC theo mẫu của thầy

### UC-06 – Thêm đồ uống vào giỏ

> Đã chốt: mua ngay chỉ mua món hiện tại và giữ nguyên giỏ có sẵn.

#### Actor

Khách hàng.

#### Description

Khách chọn size, topping và số ly để thêm đồ uống vào giỏ.

#### Preconditions

Khách đang xem danh sách hoặc chi tiết món. Món còn hàng.

#### Normal flow

1. Khách chọn size (mặc định S), số phần mỗi loại topping (0–3) và số ly (1–99, mặc định 1).

2. Khách nhấn “Thêm vào giỏ hàng”.

3. Hệ thống kiểm tra lựa chọn và tổng số ly của cùng món trong giỏ so với tồn kho.

4. Nếu trùng món, size và số phần từng loại topping, hệ thống cộng số ly vào dòng cũ; nếu khác thì tạo dòng mới. Thứ tự chọn topping không ảnh hưởng việc so sánh.

5. Hệ thống tính đơn giá = giá gốc + phụ thu size + tiền topping; cập nhật thành tiền, tổng tiền và tổng số ly.

6. Hệ thống lưu giỏ trên trình duyệt và thông báo thành công.

#### Exceptions

1. Món hết hàng: vô hiệu hóa nút thêm; nếu hết hàng khi kiểm tra thì từ chối thêm.

2. Lựa chọn không hợp lệ, số ly một dòng sau khi gộp vượt 99 hoặc tổng số ly cùng món vượt tồn kho: báo lỗi và giữ nguyên giỏ.

#### Alternative flows

1. Thanh toán ngay: Hệ thống kiểm tra lựa chọn và tồn kho cho món khách vừa chọn. Nếu hợp lệ, chuyển đến màn hình xác nhận thanh toán chỉ chứa món này, không thêm vào hoặc thay đổi giỏ hàng hiện có. Chưa tạo đơn hoặc thực hiện thanh toán tại bước chuyển màn hình. Nếu kiểm tra thất bại, thông báo lỗi và giữ khách ở trang hiện tại.

2. Đăng nhập giữ nguyên giỏ; chủ động đăng xuất xóa giỏ theo quy tắc phiên chung.

3. Thêm vào giỏ không giữ hàng; tồn kho và giá được kiểm tra lại khi tạo đơn.

### UC-07 – Xem và điều chỉnh giỏ hàng

#### Actor

Khách hàng.

#### Description

Khách xem, thay đổi số ly hoặc xóa món trong giỏ.

#### Preconditions

Khách có giỏ hàng đã lưu với ít nhất một món.

#### Normal flow

1. Khách mở giỏ; hệ thống hiển thị món, size, topping, số ly, đơn giá và thành tiền.

2. Khách thay đổi số ly hoặc xóa một dòng.

3. Khi đổi số ly, hệ thống kiểm tra số nguyên từ 1–99 và tổng số ly cùng món không vượt tồn kho.

4. Hệ thống cập nhật giỏ, tính lại thành tiền, tổng số ly, tổng tiền và kiểm tra lại mã khuyến mãi theo UC-08.

5. Hệ thống lưu giỏ trên trình duyệt và thông báo kết quả.

#### Exceptions

1. Số ly không hợp lệ hoặc vượt tồn kho: báo lỗi và giữ số ly cũ.

2. Khi khôi phục giỏ, món không còn tồn tại, hết hàng hoặc có dữ liệu/tùy chọn không hợp lệ được đánh dấu để khách xử lý trước khi tạo đơn.

#### Alternative flows

1. Muốn đổi size hoặc topping, khách phải xóa dòng rồi chọn lại món.

2. Giỏ trống: bỏ mã khuyến mãi, hiển thị “Giỏ hàng trống” và không cho tạo đơn hoặc thanh toán.

3. Giá thay đổi: thông báo và hiển thị tổng tiền mới trước khi khách xác nhận.

4. Có đơn chưa thanh toán còn hiệu lực: dùng món, giá và hàng đã giữ của đơn; muốn sửa phải hủy đơn thành công theo UC-13, rồi kiểm tra lại giỏ.

5. Thanh toán thất bại giữ nguyên giỏ; thành công xóa giỏ của lượt mua đó.

### UC-08 – Áp dụng hoặc bỏ mã khuyến mãi

> Đã chốt: bản đầu không giới hạn lượt dùng mã; kiểm tra hiệu lực và điều kiện giá trị đơn.

#### Actor

Khách hàng.

#### Description

Khách áp dụng hoặc bỏ mã khuyến mãi để cập nhật tiền giảm và tổng tiền của giỏ.

#### Preconditions

Khách đã đăng nhập và giỏ có ít nhất một món.

#### Normal flow

1. Khách nhập mã và nhấn “Áp dụng”.

2. Hệ thống bỏ khoảng trắng đầu/cuối, chuyển mã thành chữ in hoa và tự tính tạm tính, gồm tiền topping; không tin số tiền giao diện gửi lên.

3. Hệ thống kiểm tra mã tồn tại, đang bật, đúng thời hạn và danh sách mua đạt giá trị tối thiểu.

4. Tiền giảm = giá trị nhỏ nhất giữa ⌊tạm tính × % giảm / 100⌋, mức giảm tối đa và tạm tính.

5. Nếu tổng tiền sau giảm lớn hơn 0, hệ thống áp dụng mã và hiển thị tiền giảm, tổng tiền phải trả.

#### Exceptions

1. Mã không hợp lệ, bị tắt, ngoài thời hạn hoặc danh sách mua chưa đủ giá trị: thông báo lý do và không áp dụng.

2. Tổng tiền sau giảm bằng 0: từ chối mã và yêu cầu chọn mã khác.

3. Mã mới không hợp lệ: giữ mã cũ nếu mã cũ vẫn hợp lệ.

4. Khi tạo đơn theo UC-09, mã không còn hợp lệ: từ chối tạo đơn để khách sửa hoặc bỏ mã.

#### Alternative flows

1. Bỏ mã: Xóa mã, đưa tiền giảm về 0 và tổng tiền về tạm tính.

2. Thay mã: Mã mới hợp lệ thay mã cũ; mỗi đơn chỉ dùng một mã.

3. Giỏ thay đổi: Kiểm tra và tính lại tiền giảm; nếu không còn đủ điều kiện thì tự bỏ mã và thông báo.

4. Chưa đăng nhập: Yêu cầu đăng nhập, giữ nguyên giỏ và mã vừa nhập.

## Đơn hàng

### UC-09 — Tạo đơn hàng

#### Actor

Khách.

#### Description

Use Case bắt đầu khi khách hàng đã đăng nhập xác nhận tạo đơn từ danh sách mua: một cấu hình món khi mua ngay hoặc toàn bộ giỏ khi thanh toán từ giỏ. Hệ thống kiểm tra lựa chọn, tính lại giá, tạo đơn PENDING và giữ hàng trong 15 phút để khách tiếp tục thanh toán.

#### Preconditions

1. Khách có phiên đăng nhập hợp lệ.

2. Danh sách mua có ít nhất một dòng hợp lệ. Nếu muốn sửa giỏ gắn với đơn chưa thanh toán trước đó, khách đã hủy đơn cũ thành công.

3. Khách đã xem lại các món và lựa chọn; thao tác này chưa thực hiện thanh toán.

#### Normal flow

1. Khách chọn xác nhận tạo đơn từ màn hình xem lại giỏ.

2. Hệ thống nhận dữ liệu món, size, số ly, topping, mã khuyến mãi nếu có và khóa chống lặp; xác định chủ đơn từ phiên đăng nhập.

3. Hệ thống kiểm tra sản phẩm còn được bán, size hợp lệ, topping thuộc món; số ly nguyên 1–99 mỗi dòng, số phần từng topping nguyên 0–3 mỗi ly và không có topping trùng ID. Topping có số phần 0 được bỏ khỏi dữ liệu chuẩn hóa.

4. Hệ thống kiểm tra khuyến mãi và tính lại giá bằng dữ liệu backend. Tổng tiền sau giảm phải lớn hơn 0.

5. Hệ thống cộng số ly theo productId trên mọi dòng/cấu hình và kiểm tra tồn khả dụng.

6. Trong cùng một transaction, hệ thống giữ hàng, tạo đơn PENDING với mã duy nhất và lưu snapshot món, size, topping, giá, số lượng, subtotal, discount, total; ghi createdAt và expiresAt sau 15 phút. Kết quả tạo đơn được gắn với khóa chống lặp.

7. Hệ thống trả mã đơn, chi tiết, tổng tiền đã chốt và thời hạn. Khách xem thông tin để tiếp tục UC-10. Giỏ vẫn được giữ.

#### Exceptions

1. Bước 2 — chưa đăng nhập/phiên hết hạn: Yêu cầu đăng nhập lại, giữ giỏ và quay về bước xem lại sau đăng nhập; chưa tạo đơn hoặc giữ hàng.

2. Bước 3 — giỏ rỗng hoặc dữ liệu không hợp lệ: Thông báo trường hoặc món không hợp lệ; khách sửa dữ liệu rồi xác nhận lại. Không tạo đơn.

3. Bước 4 — mã không hợp lệ hoặc tổng tiền không dương: Thông báo, yêu cầu đổi/bỏ mã rồi xác nhận lại. Không tự áp một tổng tiền không hợp lệ, không tạo đơn hoặc giữ kho.

4. Bước 5–6 — thiếu hàng: Trả OUT_OF_STOCK kèm món liên quan; hoàn tác toàn bộ nếu đã bắt đầu xử lý. Không lưu nửa đơn hoặc chỉ giữ một phần hàng.

5. Bước 6 — xung đột cập nhật tồn: Đọc lại và thử lại có giới hạn. Nếu chưa giải quyết được, báo xung đột để thử lại; không kết luận hết hàng chỉ vì version thay đổi. Phần triển khai tuân thủ optimistic locking.

6. Bước 2 — gửi lặp cùng người dùng, khóa và nội dung: Trả cùng đơn và trạng thái hiện tại, kể cả đơn đã hủy/hết hạn; không tạo mới, giữ thêm hàng hoặc gia hạn. Nếu lần đầu đang xử lý, không khởi chạy một lần tạo độc lập; kết quả xử lý đồng thời chỉ được tạo một đơn.

7. Bước 2 — cùng khóa nhưng nội dung khác: Từ chối với 409 IDEMPOTENCY_CONFLICT. Một lượt đặt mới đã được khách xác nhận phải dùng khóa mới.

8. Bước 7 — giá thay đổi so với màn hình trước: Hiển thị rõ tổng tiền đã chốt mới trước khi khách xác nhận thanh toán. Không tự thu tiền; nếu không tiếp tục, khách có thể hủy bằng UC-13.

9. Bước 6–7 — lỗi lưu hoặc mất kết nối: Lỗi transaction phải hoàn tác. Nếu mất phản hồi chưa rõ kết quả, tra cứu/gửi lại cùng khóa và nội dung, không tự kết luận chưa có đơn hoặc sinh khóa mới để tạo thêm.

#### Alternative flows

1. Không có.

### UC-13 — Hủy đơn chưa thanh toán

#### Actor

Khách.

#### Description

Use Case bắt đầu khi chủ đơn yêu cầu hủy một đơn chưa thanh toán. Hệ thống kiểm tra quyền và trạng thái, chuyển đơn sang CANCELLED và hoàn hàng đã giữ đúng một lần.

#### Preconditions

1. Khách đã đăng nhập và là chủ đơn.

2. Đơn đang ở PENDING hoặc PAYMENT_FAILED; trạng thái phải được kiểm tra lại khi xử lý.

#### Normal flow

1. Khách chọn hủy đơn.

2. Hệ thống xác thực khách, tra cứu đơn và kiểm tra quyền sở hữu.

3. Hệ thống kiểm tra trạng thái hiện tại cùng thông tin giữ/hoàn hàng.

4. Trong cùng transaction, hệ thống chuyển đơn sang CANCELLED và phối hợp hoàn đúng lượng hàng đã giữ, chỉ một lần.

5. Hệ thống trả kết quả hủy và cập nhật trạng thái hiển thị. Khách có thể điều chỉnh giỏ hoặc xác nhận một lượt đặt mới với khóa mới.

#### Exceptions

1. Bước 2 — phiên hết hạn, không tồn tại hoặc không phải chủ đơn: Từ chối, không thay đổi dữ liệu đơn/kho.

2. Bước 3 — đơn đã PAID hoặc đang pha/đã hoàn thành: Từ chối hủy của khách; không hoàn kho. Hủy PAID trước khi pha thuộc quyền STAFF và UC-18.

3. Bước 3–4 — gửi lặp khi cùng đơn đã CANCELLED: Phản hồi trạng thái đã hủy; không thực hiện thêm lần hoàn kho. Không coi đây là một chuyển trạng thái mới từ CANCELLED.

4. Bước 3–4 — thanh toán/hết hạn đang xử lý đồng thời: Tuần tự hóa bằng cơ chế transaction và kiểm tra trạng thái phù hợp. Nếu thanh toán đã thắng và đơn PAID, từ chối hủy chưa thanh toán; nếu đơn đã bị hủy hợp lệ, không cho thanh toán sau đó.

5. Bước 4 — cập nhật thất bại: Hoàn tác toàn bộ; không để CANCELLED nhưng chưa hoàn hàng hoặc hoàn hàng trong khi đơn vẫn còn hiệu lực.

6. Bước 5 — mất phản hồi: Tra cứu lại trạng thái/gửi lại an toàn; không suy đoán hủy thành công và sửa giỏ gắn với đơn trước khi được xác nhận.

#### Alternative flows

1. Không có.

### UC-15 — Tiếp nhận đơn pha chế

#### Actor

Nhân viên quầy (STAFF).

#### Description

Use Case bắt đầu khi nhân viên quầy có quyền STAFF tiếp nhận một đơn đã thanh toán. Hệ thống kiểm tra điều kiện và chuyển đơn từ PAID sang PREPARING để bắt đầu pha chế.

#### Preconditions

1. Nhân viên có phiên đăng nhập hợp lệ và quyền STAFF.

2. Đơn tồn tại, đang ở PAID.

3. Nhân viên xác định đúng đơn cần tiếp nhận.

#### Normal flow

1. Nhân viên xác định đơn và xác nhận tiếp nhận pha chế.

2. Hệ thống xác thực, kiểm tra quyền STAFF và tra cứu đơn.

3. Hệ thống kiểm tra trạng thái hiện tại vẫn là PAID.

4. Hệ thống cập nhật có điều kiện từ PAID sang PREPARING, bảo đảm không ghi đè trạng thái đã thay đổi bởi yêu cầu khác.

5. Hệ thống trả trạng thái mới để người thao tác biết kết quả.

#### Exceptions

1. Bước 2 — phiên không hợp lệ hoặc thiếu quyền: Từ chối; thiếu quyền STAFF trả 403. Không thay đổi đơn.

2. Bước 2 — không tìm thấy đơn: Thông báo không tìm thấy; không cập nhật dữ liệu.

3. Bước 3 — trạng thái không phù hợp: Từ chối với 409 INVALID_TRANSITION; không cho bỏ qua bước hoặc chuyển ngược về PAID.

4. Bước 3–4 — yêu cầu lặp/đồng thời: Kiểm tra lại trạng thái. Chỉ cập nhật một lần; yêu cầu không còn hợp lệ bị từ chối và người thao tác tải lại trạng thái hiện tại.

5. Bước 4–5 — lỗi xử lý hoặc mất phản hồi: Không ghi trạng thái dở dang. Nếu chưa biết kết quả, đọc lại đơn trước khi thao tác tiếp.

#### Alternative flows

1. Không có.

### UC-16 — Xác nhận pha chế hoàn tất

#### Actor

Nhân viên quầy (STAFF).

#### Description

Use Case bắt đầu khi nhân viên quầy có quyền STAFF xác nhận đã pha xong các món của đơn. Hệ thống chuyển đơn từ PREPARING sang READY để chờ giao khách.

#### Preconditions

1. Nhân viên có phiên đăng nhập hợp lệ và quyền STAFF.

2. Đơn tồn tại, đang ở PREPARING.

3. Nhân viên đã kiểm tra các món của đơn pha xong.

#### Normal flow

1. Nhân viên xác định đơn và xác nhận đã pha chế xong.

2. Hệ thống xác thực, kiểm tra quyền STAFF và tra cứu đơn.

3. Hệ thống kiểm tra trạng thái hiện tại vẫn là PREPARING.

4. Hệ thống cập nhật có điều kiện từ PREPARING sang READY, bảo đảm không ghi đè trạng thái đã thay đổi bởi yêu cầu khác.

5. Hệ thống trả trạng thái mới để người thao tác biết kết quả.

#### Exceptions

1. Bước 2 — phiên không hợp lệ hoặc thiếu quyền: Từ chối; thiếu quyền STAFF trả 403. Không thay đổi đơn.

2. Bước 2 — không tìm thấy đơn: Thông báo không tìm thấy; không cập nhật dữ liệu.

3. Bước 3 — trạng thái không phù hợp: Từ chối với 409 INVALID_TRANSITION; không cho bỏ qua bước hoặc chuyển ngược về PREPARING.

4. Bước 3–4 — yêu cầu lặp/đồng thời: Kiểm tra lại trạng thái. Chỉ cập nhật một lần; yêu cầu không còn hợp lệ bị từ chối và người thao tác tải lại trạng thái hiện tại.

5. Bước 4–5 — lỗi xử lý hoặc mất phản hồi: Không ghi trạng thái dở dang. Nếu chưa biết kết quả, đọc lại đơn trước khi thao tác tiếp.

#### Alternative flows

1. Không có.

### UC-17 — Xác nhận giao đồ uống

#### Actor

Nhân viên quầy (STAFF).

#### Description

Use Case bắt đầu khi nhân viên quầy có quyền STAFF xác nhận đã giao đồ uống cho khách. Hệ thống chuyển đơn từ READY sang COMPLETED để kết thúc quá trình thực hiện đơn.

#### Preconditions

1. Nhân viên có phiên đăng nhập hợp lệ và quyền STAFF.

2. Đơn tồn tại, đang ở READY.

3. Đồ uống đã được giao cho khách trước khi xác nhận hoàn tất.

#### Normal flow

1. Nhân viên xác định đơn và xác nhận đã giao đồ uống cho khách.

2. Hệ thống xác thực, kiểm tra quyền STAFF và tra cứu đơn.

3. Hệ thống kiểm tra trạng thái hiện tại vẫn là READY.

4. Hệ thống cập nhật có điều kiện từ READY sang COMPLETED, bảo đảm không ghi đè trạng thái đã thay đổi bởi yêu cầu khác.

5. Hệ thống trả trạng thái mới để người thao tác biết kết quả.

#### Exceptions

1. Bước 2 — phiên không hợp lệ hoặc thiếu quyền: Từ chối; thiếu quyền STAFF trả 403. Không thay đổi đơn.

2. Bước 2 — không tìm thấy đơn: Thông báo không tìm thấy; không cập nhật dữ liệu.

3. Bước 3 — trạng thái không phù hợp: Từ chối với 409 INVALID_TRANSITION; không cho bỏ qua bước hoặc chuyển ngược về READY.

4. Bước 3–4 — yêu cầu lặp/đồng thời: Kiểm tra lại trạng thái. Chỉ cập nhật một lần; yêu cầu không còn hợp lệ bị từ chối và người thao tác tải lại trạng thái hiện tại.

5. Bước 4–5 — lỗi xử lý hoặc mất phản hồi: Không ghi trạng thái dở dang. Nếu chưa biết kết quả, đọc lại đơn trước khi thao tác tiếp.

#### Alternative flows

1. Không có.

### UC-18 — Hủy đơn đã thanh toán trước khi pha

#### Actor

Nhân viên quầy (STAFF).

#### Description

Use Case bắt đầu khi nhân viên quầy có quyền STAFF yêu cầu hủy một đơn đã thanh toán nhưng chưa pha. Hệ thống hoàn tiền giả lập, hoàn kho, đảo điểm đã cộng và chuyển đơn sang CANCELLED một cách nhất quán.

#### Preconditions

1. Nhân viên đã đăng nhập và có quyền STAFF.

2. Đơn tồn tại, đang PAID và chưa được chuyển sang PREPARING.

3. Có thông tin thanh toán thành công, lượng hàng đã giữ và số điểm từng được cộng để đối chiếu hoàn/đảo.

#### Normal flow

1. Nhân viên chọn đơn PAID và yêu cầu hủy trước khi pha.

2. Hệ thống xác thực, kiểm tra quyền STAFF và tra cứu trạng thái mới nhất của đơn.

3. Hệ thống kiểm tra điều kiện hủy, giao dịch thành công, hàng đã giữ, điểm đã cộng và thông tin hoàn/đảo trước đó.

4. Trong cùng transaction, hệ thống ghi nhận hoàn tiền giả lập cho giao dịch thành công, hoàn đúng lượng hàng, đảo đúng số điểm đã cộng và chuyển đơn sang CANCELLED. Mỗi tác động chỉ thực hiện một lần.

5. Hệ thống trả kết quả hủy, cập nhật thông tin đơn và thanh toán để các màn hình xác nhận/lịch sử phản ánh việc hủy và hoàn tiền.

#### Exceptions

1. Bước 2 — chưa xác thực hoặc không có STAFF: Từ chối; khách hàng không được tự hủy đơn PAID bằng thao tác này.

2. Bước 2–3 — không tìm thấy đơn hoặc đơn không PAID: Từ chối; không hỗ trợ hủy PREPARING, READY hoặc COMPLETED. Đơn chưa thanh toán dùng UC-13 theo quyền chủ đơn.

3. Bước 3 — cùng yêu cầu đã hủy hoàn tất: Trả kết quả/trạng thái đã ghi nhận sau kiểm tra quyền; không hoàn tiền, hoàn kho hoặc đảo điểm lần nữa. Không mở lại đơn CANCELLED.

4. Bước 3–4 — tiếp nhận pha chế xảy ra đồng thời: Chỉ một chuyển tiếp từ PAID được chấp nhận. Nếu đã PREPARING, từ chối hủy; nếu hủy đã hoàn tất, không cho tiếp nhận pha.

5. Bước 3 — thiếu hoặc không nhất quán dữ liệu đối chiếu: Dừng xử lý và báo lỗi để kiểm tra; không tự đoán số tiền/số điểm cần hoàn.

6. Bước 4 — lỗi một phần hoàn/đảo: Hoàn tác toàn bộ cập nhật database trong phạm vi thanh toán giả lập; không báo hủy thành công khi mới hoàn tất một phần.

7. Bước 5 — mất kết nối: Đọc lại kết quả; không khởi tạo thêm lần hoàn tiền/hoàn kho/đảo điểm chỉ vì mất phản hồi.

#### Alternative flows

1. Không có.

## Thanh toán

### UC-10 — Thanh toán đơn hàng

#### Actor

Khách hàng (chủ đơn).

#### Description

Chủ đơn đã đăng nhập sử dụng chức năng này để thanh toán đơn hàng còn hạn bằng Ví hoặc Thẻ mô phỏng. Hệ thống lấy số tiền từ đơn đã lưu và cập nhật trạng thái đơn sau khi có kết quả thanh toán.

#### Preconditions

1. Khách hàng đã đăng nhập và là chủ của đơn hàng.

2. Đơn ở trạng thái PENDING hoặc PAYMENT_FAILED và còn trong thời hạn giữ hàng.

#### Normal flow

1. Khách hàng chọn thanh toán cho đơn hàng của mình.

2. Hệ thống hiển thị thông tin đơn đã chốt (mã đơn, các món, tổng tiền) và các phương thức Ví, Thẻ mô phỏng.

3. Khách hàng chọn phương thức thanh toán và xác nhận thanh toán.

4. Hệ thống kiểm tra quyền chủ đơn, trạng thái đơn và thời hạn giữ hàng.

5. Hệ thống lấy số tiền từ đơn đã lưu và thực hiện thanh toán mô phỏng.

6. Hệ thống ghi nhận giao dịch, chuyển đơn sang PAID và cộng điểm thưởng một lần.

7. Sau khi backend xác nhận thành công, thanh toán từ giỏ xóa giỏ của lượt mua; mua ngay kết thúc lượt mua hiện tại và giữ nguyên giỏ có sẵn.

8. Hệ thống chuyển khách hàng đến màn hình xác nhận thanh toán.

#### Exceptions

1. Thanh toán thất bại được xác nhận.

2. Mất kết nối, chưa biết kết quả thanh toán.

3. Đơn đã hết hạn, đã bị hủy hoặc không ở trạng thái được phép thanh toán.

4. Người dùng không phải chủ đơn.

5. Khách hàng bấm nhiều lần hoặc gửi các yêu cầu đồng thời cho cùng một đơn.

#### Alternative flows

1. Hệ thống chuyển đơn sang PAYMENT_FAILED, giữ nguyên giỏ hàng và thông báo thất bại. Khách hàng có thể thử lại nếu đơn còn hạn.

2. Hệ thống kiểm tra lại kết quả giao dịch, không tự coi là thất bại.

3. Hệ thống từ chối thanh toán và thông báo cho khách hàng.

4. Hệ thống từ chối truy cập.

5. Hệ thống chỉ xử lý thanh toán thành công một lần và trả về kết quả hiện tại cho các yêu cầu còn lại.

### UC-11 — Xem xác nhận thanh toán

#### Actor

Khách hàng (chủ đơn).

#### Description

Khách hàng sử dụng chức năng này để xem kết quả thanh toán của đơn hàng, gồm mã đơn, mã giao dịch, số tiền, thời gian và trạng thái hiện tại. Dữ liệu luôn được lấy từ backend.

#### Preconditions

1. Khách hàng đã đăng nhập và là chủ của đơn hàng.

2. Đơn hàng đã được tạo.

#### Normal flow

1. Khách hàng mở màn hình xác nhận thanh toán của đơn hàng.

2. Hệ thống lấy dữ liệu đơn và giao dịch từ backend.

3. Hệ thống hiển thị kết quả thanh toán, mã đơn, mã giao dịch (nếu có), số tiền, thời gian và trạng thái đơn.

4. Nếu thanh toán thành công, hệ thống hiển thị hướng dẫn nhận đồ uống tại quầy.

#### Exceptions

1. Thanh toán thất bại.

2. Chưa rõ kết quả thanh toán.

3. Khách hàng tải lại trang.

4. Đơn đã đổi trạng thái hoặc đã bị hủy/hoàn tiền.

5. Người dùng không phải chủ đơn.

#### Alternative flows

1. Hệ thống hiển thị thông báo thất bại. Nếu đơn còn hạn, khách hàng có thể thử lại thanh toán.

2. Hệ thống hiển thị “Đang kiểm tra kết quả” và kiểm tra lại với backend.

3. Hệ thống lấy lại dữ liệu từ backend và không tự thanh toán lại.

4. Hệ thống hiển thị thông tin hiện tại của đơn.

5. Hệ thống từ chối truy cập.
