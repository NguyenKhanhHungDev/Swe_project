# BrewLite — Software Requirements Specification

**Cập nhật quyết định nhóm ngày 13/10/2026:** Nội dung hiện hành tuân theo đề của thầy và các quyết định đã được nhóm xác nhận. Xem [quyết định yêu cầu](REQUIREMENTS_DECISIONS.md).

**Trạng thái:** Đã trích lọc từ tài liệu người dùng cung cấp; cần nhóm review, chưa xác nhận nghiệm thu.

**Nguồn:** `SRS.md` được cung cấp ngày 11/10/2026; yêu cầu phi chức năng bổ sung từ mục 2 của `Báo cáo.docx`. Nội dung UC-01–UC-18 được giữ nguyên về nghĩa.

## 1. Mục đích và phạm vi

BrewLite là ứng dụng giúp khách hàng chọn đồ uống, đặt hàng và thanh toán không tiền mặt để nhận tại quầy. Thanh toán được mô phỏng, không sử dụng tiền thật.

Hệ thống bao gồm: tài khoản, menu và tùy chọn đồ uống, giỏ hàng, khuyến mãi, tạo đơn, thanh toán, xác nhận, lịch sử đơn, điểm thưởng và xử lý trạng thái đơn tại quầy. Hệ thống phải ngăn thanh toán trùng và không nhận đơn vượt tồn kho khi nhiều khách đặt cùng lúc.

Ngoài phạm vi: giao hàng, thanh toán thật, OTP, xác thực hai lớp, quên mật khẩu, đổi điểm lấy quà, hạng thành viên và hệ thống quản trị cửa hàng đầy đủ. Giao diện nhân viên đầy đủ là phần mở rộng; các thao tác nhân viên trong tài liệu vẫn phải thực hiện được bằng API có kiểm tra quyền.

## 2. Tác nhân

| Tác nhân | Vai trò |
| ----- | ----- |
| Khách hàng | Xem và chọn đồ uống, quản lý giỏ, sử dụng tài khoản, đặt hàng, thanh toán, xem đơn và điểm. |
| Nhân viên quầy | Tiếp nhận đơn đã thanh toán, cập nhật quá trình pha chế, xác nhận giao đồ và hủy đơn đã trả tiền trước khi pha. |

Khách chưa đăng nhập vẫn được xem menu, xem chi tiết, chọn tùy chọn và sử dụng giỏ. Khách phải đăng nhập để áp mã khuyến mãi, tạo đơn, thanh toán, xem đơn và điểm. Khách chỉ được truy cập đơn và dữ liệu của mình.

Trong phạm vi này, dịch vụ thanh toán mock nằm bên trong backend, nên không coi là tác nhân bên ngoài. Database, bộ xử lý hết hạn và cơ chế kiểm tra tồn kho cũng là thành phần bên trong hệ thống.

## 3. Yêu cầu chức năng

Các mã UC dưới đây dùng làm danh mục chức năng để vẽ và đặc tả Use Case ở bước tiếp theo.

### 3.1. Tài khoản

**UC-01 — Đăng ký tài khoản**  
Khách nhập họ tên, email, mật khẩu và xác nhận mật khẩu. Hệ thống kiểm tra dữ liệu và email trùng. Nếu hợp lệ, hệ thống tạo tài khoản khách hàng với 0 điểm và chuyển đến đăng nhập. Nếu không hợp lệ, hệ thống thông báo lỗi để khách sửa. Khách không được tự đăng ký quyền nhân viên.

**UC-02 — Đăng nhập**  
Khách nhập email và mật khẩu. Nếu đúng, hệ thống xác thực khách và cho phép sử dụng các chức năng cần tài khoản. Nếu khách đang đặt hàng thì giữ giỏ và quay lại bước đang thực hiện; đăng nhập thông thường thì về menu. Nếu sai, hệ thống thông báo lỗi. Phiên không hợp lệ hoặc hết hạn yêu cầu đăng nhập lại.

**UC-03 — Đăng xuất**  
Khách đã đăng nhập chọn đăng xuất. Hệ thống xóa thông tin phiên và giỏ trên thiết bị, đưa khách về menu và không tiếp tục hiển thị dữ liệu riêng tư của phiên cũ. Đăng xuất không đồng nghĩa hủy đơn đã lưu.

### 3.2. Sản phẩm

**UC-04 — Xem menu đồ uống**  
Khách xem danh sách đồ uống gồm hình ảnh, tên, giá size S và tình trạng còn hàng. Món hết hàng được đánh dấu rõ. Khách có thể chọn một món để mở chi tiết. Hệ thống có thông báo khi đang tải, danh sách rỗng hoặc tải thất bại.

**UC-05 — Xem chi tiết và chọn tùy chọn đồ uống**  
Khách xem ảnh, tên, mô tả, giá, các size S/M/L và topping của món; dữ liệu demo Task 4 phải cho phép kiểm tra đủ ba size. Khách chọn một size, số phần từng topping và số ly. Hệ thống cập nhật giá một ly và thành tiền. Mặc định là size S, không topping và 1 ly. Món hết hàng vẫn xem được nhưng không được mua.

### 3.3. Giỏ hàng và khuyến mãi

**UC-06 — Thêm đồ uống vào giỏ**  
Khách chọn “Thêm vào giỏ hàng”. Hệ thống kiểm tra lựa chọn, số lượng và tồn khả dụng rồi thêm vào giỏ. Cùng món, size và cấu hình topping thì cộng số ly; khác cấu hình thì tạo dòng riêng. Thêm thành công cập nhật tổng tiền và biểu tượng số ly trong giỏ. Không đủ hàng hoặc lựa chọn sai thì thông báo, không thêm.

Nút “Thanh toán ngay” kiểm tra và chuyển cấu hình món hiện tại sang màn hình xem lại chỉ chứa món này, không thêm hoặc thay đổi giỏ hiện có. Chưa tạo đơn hoặc thu tiền trước khi khách xác nhận. Nếu lựa chọn không hợp lệ, khách vẫn ở màn hình hiện tại. Nút “Thanh toán” trong giỏ dùng toàn bộ các dòng của giỏ.

**UC-07 — Xem và điều chỉnh giỏ hàng**  
Khách xem món, size, số phần topping, số ly, đơn giá và thành tiền. Khách được sửa số ly hoặc xóa dòng; hệ thống tính lại tổng và khuyến mãi. Muốn đổi size/topping, khách xóa dòng rồi chọn lại món. Giỏ trống không được tạo đơn. Giỏ được lưu trên trình duyệt để tải lại vẫn còn.

Nếu đã tạo đơn chưa thanh toán, khách phải hủy đơn cũ thành công trước khi sửa món. Khi tiếp tục thanh toán đơn còn hạn, dùng các món, giá và hàng đã giữ của đơn; không báo thiếu hàng chỉ vì tồn khả dụng đã giảm bởi chính đơn này.

**UC-08 — Áp dụng hoặc bỏ mã khuyến mãi**  
Khách đã đăng nhập nhập mã cho giỏ có món. Hệ thống kiểm tra mã tồn tại, đang hoạt động, thời hạn và tổng tiền tối thiểu; sau đó tính và hiển thị tiền giảm. Mỗi đơn tối đa một mã. Khách có thể bỏ mã. Mã không hợp lệ được báo rõ; nếu thay bằng mã mới không hợp lệ thì giữ mã cũ khi mã cũ vẫn hợp lệ. Giỏ thay đổi phải kiểm tra lại mã.

### 3.4. Đặt hàng và thanh toán

**UC-09 — Tạo đơn hàng**  
Khách đã đăng nhập xem lại danh sách mua và xác nhận tạo đơn. Danh sách này là món hiện tại với size/topping/số ly đã chọn khi dùng “Thanh toán ngay”, hoặc toàn bộ giỏ khi thanh toán từ giỏ. Hệ thống kiểm tra món, size, topping, số ly, khuyến mãi và tồn kho; tính lại tiền từ dữ liệu backend. Nếu hợp lệ, hệ thống tạo một đơn PENDING, sinh mã đơn, giữ hàng 15 phút và trả tổng tiền đã chốt. Nếu có lỗi, hệ thống không tạo đơn hoặc giữ một phần hàng mà thông báo để khách sửa.

Giá và cấu hình món được lưu cùng đơn để lịch sử không thay đổi khi menu thay đổi. Nếu tổng tiền khác màn hình trước đó, khách phải được thấy tổng mới trước khi xác nhận thanh toán. Gửi lặp cùng yêu cầu tạo đơn không được sinh thêm đơn hoặc giữ kho thêm.

**UC-10 — Thanh toán đơn hàng**  
Chủ đơn đã đăng nhập chọn Ví hoặc Thẻ mô phỏng và xác nhận thanh toán đơn còn hạn. Hệ thống lấy số tiền từ đơn đã lưu. Thành công chuyển đơn thành PAID, lưu giao dịch và cộng điểm một lần. Thanh toán từ giỏ chỉ xóa giỏ của lượt mua sau xác nhận backend; mua ngay kết thúc lượt mua món hiện tại và giữ nguyên giỏ có sẵn. Thất bại được xác nhận chuyển đơn thành PAYMENT_FAILED và giữ giỏ.

Khách có thể thử lại đơn thất bại nếu còn hạn. Mất kết nối chưa biết kết quả thì kiểm tra lại, không tự coi là thất bại. Hệ thống không xử lý thanh toán thành công hai lần cho cùng đơn, kể cả khi khách bấm nhiều lần hoặc gửi các yêu cầu đồng thời.

**UC-11 — Xem xác nhận thanh toán**  
Khách xem kết quả, mã đơn, mã giao dịch nếu có, số tiền, thời gian và trạng thái. Thành công có hướng dẫn nhận tại quầy; thất bại có thể thử lại khi còn hạn. Chưa rõ kết quả thì hiển thị “Đang kiểm tra kết quả”. Tải lại trang lấy dữ liệu từ backend, không tự thanh toán lại. Nếu đơn đã đổi trạng thái hoặc được hủy/hoàn tiền, màn hình phản ánh thông tin hiện tại.

**UC-12 — Xem lịch sử và chi tiết đơn**  
Khách đã đăng nhập xem các đơn của mình, mới nhất trước. Mỗi đơn có mã, thời gian, tổng tiền và trạng thái. Chi tiết có món, size, topping và số phần, số ly, đơn giá, thành tiền, tiền giảm và tổng tiền đã chốt. Đơn chưa trả còn hạn có thể tiếp tục thanh toán hoặc hủy. Khách không được xem đơn của tài khoản khác.

**UC-13 — Hủy đơn chưa thanh toán**  
Chủ đơn chọn hủy đơn PENDING hoặc PAYMENT_FAILED. Hệ thống kiểm tra quyền và trạng thái hiện tại. Hủy hợp lệ chuyển đơn thành CANCELLED và hoàn hàng đã giữ đúng một lần. Nếu đơn đã thanh toán hoặc không còn ở trạng thái được phép, yêu cầu hủy của khách bị từ chối.

**UC-14 — Xem điểm thưởng**  
Khách đã đăng nhập xem số điểm tích lũy của mình do backend cung cấp. Đơn PAID được cộng điểm tự động theo quy tắc tại mục 4. Hệ thống không cho khách tự sửa số điểm. Lỗi tải phải được thông báo, không hiển thị 0 như một kết quả hợp lệ.

### 3.5. Xử lý đơn tại quầy

**UC-15 — Tiếp nhận đơn pha chế**  
Nhân viên có quyền STAFF chọn đơn PAID và xác nhận tiếp nhận. Hệ thống chuyển đơn sang PREPARING. Đơn ở trạng thái khác không được tiếp nhận bằng thao tác này.

**UC-16 — Xác nhận pha chế hoàn tất**  
Nhân viên xác nhận đơn PREPARING đã pha xong. Hệ thống chuyển đơn sang READY để khách nhận tại quầy.

**UC-17 — Xác nhận giao đồ uống**  
Nhân viên giao đồ tại quầy và xác nhận đơn READY đã được nhận. Hệ thống chuyển đơn sang COMPLETED.

**UC-18 — Hủy đơn đã thanh toán trước khi pha**  
Nhân viên có quyền STAFF được hủy đơn PAID chưa chuyển sang pha chế. Hệ thống hoàn tiền mô phỏng, hoàn kho, đảo đúng số điểm từng cộng và chuyển đơn thành CANCELLED một cách nhất quán. Các thao tác hoàn/đảo chỉ được thực hiện một lần. Không hỗ trợ hủy PREPARING, READY hoặc COMPLETED.

## 4. Quy tắc nghiệp vụ

Quy tắc chi tiết được tách sang [BUSINESS_RULES.md](BUSINESS_RULES.md), trích từ mục 5 của báo cáo. Mục này bổ sung để khắc phục tham chiếu đến mục 4 trong UC-14 của SRS nguồn.

- Điểm thưởng: `floor(total / 10000)`, với `total` là tiền thực trả sau giảm giá; cộng đúng một lần khi đơn chuyển PAID.
- Hủy đơn PAID hợp lệ phải đảo đúng số điểm đã cộng.
- Giới hạn số lượng, tính giảm giá, tồn kho, thời hạn, chống lặp và chuyển trạng thái xem các nhóm quy tắc trong tài liệu liên kết.

## 5. Yêu cầu phi chức năng

| Mã | Yêu cầu từ báo cáo mục 2 | Điều cần cụ thể hóa |
| --- | --- | --- |
| NFR-01 | Thời gian phản hồi API dưới 500 ms với dữ liệu mẫu. | Chốt API áp dụng, lượng dữ liệu, tải đồng thời, cấu hình máy, cách đo và chỉ số đánh giá. Chưa có kết quả đo kèm theo. |
| NFR-02 | Mật khẩu băm bằng bcrypt, xác thực qua JWT, kiểm tra dữ liệu đầu vào. | Hợp đồng API và thiết kế auth cần chốt lưu token, thời hạn phiên và hành vi đăng xuất; tham khảo Architecture mục 8.5. |
| NFR-03 | Chạy mượt mà trên các trình duyệt web phổ biến. | Chốt trình duyệt/phiên bản, kích thước màn hình và tiêu chí kiểm tra. |

## 6. Tài liệu liên quan và phần đang hoàn thiện

- [Project Scope](PROJECT_SCOPE.md): phạm vi và đầu ra bàn giao.
- [User Stories](USER_STORIES.md) và [Acceptance Criteria](ACCEPTANCE_CRITERIA.md): 15 story và các tiêu chí tương ứng; cần review, chưa nghiệm thu.
- [Use Cases](USE_CASES.md): đặc tả 18 use case và thông tin sơ đồ hiện có; những đoạn mâu thuẫn được đánh dấu, chưa xác nhận tính đầy đủ hoặc duyệt UML.
- [Các điểm cần rà soát](REQUIREMENTS_REVIEW.md): thiếu sót và câu hỏi cần chốt.
