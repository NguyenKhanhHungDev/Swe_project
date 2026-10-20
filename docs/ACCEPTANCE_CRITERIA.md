# BrewLite — Acceptance Criteria

> **DRAFT — Pending owner review (20/10/2026).** Nguồn thiết kế được giữ để review, chưa nghiệm thu hoặc triển khai. Các đoạn thời hạn 15 phút/expiresAt/hết hạn bên dưới đang xung đột với yêu cầu hiện tại không triển khai timer; không dùng chúng để tạo timer/cron. Chờ Phát/Khoa/Thắng chốt và sửa đồng bộ theo [PD-05](scrum/team-working-agreement.md#pending-decisions). Các khác biệt DTO, giá, quyền và transaction xem cùng bảng Pending Decisions.


**Cập nhật quyết định nhóm ngày 13/10/2026:** Nội dung hiện hành tuân theo đề của thầy và các quyết định đã được nhóm xác nhận. Xem [quyết định yêu cầu](REQUIREMENTS_DECISIONS.md).

**Ngày cập nhật:** 13/10/2026. **Trạng thái:** Bản review; chưa nghiệm thu.

Phân công thực hiện được quy định tại [TEAM_ASSIGNMENTS.md](TEAM_ASSIGNMENTS.md).

Các tiêu chí dưới đây mô tả điều kiện nghiệm thu, không phải kết quả kiểm thử. Các chi tiết endpoint và mã lỗi cần được đối chiếu với API Specification khi hoàn thiện hợp đồng.

## US-PROD-01  Xem menu đồ uống

- Khách hàng xem menu mà không cần đăng nhập.
- Mỗi đồ uống hiển thị ảnh, tên và giá cơ bản của size S, chưa bao gồm topping. Trong phạm vi bản này, mọi sản phẩm đều có size S; nếu mở rộng sản phẩm không có S thì phải thống nhất lại giá hiển thị và size mặc định.
- Chọn một đồ uống thì hệ thống mở đúng màn hình chi tiết của đồ uống đó.
- Đồ uống có số lượng còn có thể đặt bằng 0 được gắn nhãn “HẾT HÀNG” nổi bật trên ảnh, có độ tương phản và chữ dễ đọc; trạng thái không chỉ thể hiện bằng màu.
- Đồ uống hết hàng vẫn cho phép xem chi tiết nhưng không cho mua.
- Trong lúc tải dữ liệu, hiển thị “Đang tải menu…”. Danh sách rỗng hiển thị “Chưa có đồ uống”.
- Nếu tải thất bại, hiển thị thông báo dễ hiểu và nút “Thử lại”; không hiển thị trạng thái lỗi như một menu rỗng.

## US-PROD-02 - Xem chi tiết đồ uống

- Khách hàng xem chi tiết mà không cần đăng nhập.
- Màn hình hiển thị đúng ảnh, tên, mô tả và giá cơ bản của món được chọn.
- Các size và topping hợp lệ được hiển thị kèm phụ thu size và giá mỗi phần topping.
- Có phần chọn số ly, hiển thị giá một ly và thành tiền theo lựa chọn hiện tại.
- Phía dưới có hai nút “Thêm vào giỏ hàng” và “Thanh toán ngay”, kèm chú thích “Thanh toán ngay chỉ mua món đang chọn; thanh toán trong giỏ mua toàn bộ giỏ”.
- Khi hết hàng, hiển thị “HẾT HÀNG – Món hiện chưa thể đặt” gần tên/giá; vô hiệu hóa chọn số ly và cả hai nút mua.
- Chọn “Về menu” thì quay lại danh sách đồ uống.
- Đang tải thì hiển thị trạng thái tải và chưa cho mua. Món không tồn tại thì thông báo “Không tìm thấy sản phẩm” và có đường về menu.
- Tải thất bại thì thông báo lỗi và cho phép thử lại.

## US-PROD-03 - Chọn size, topping và số lượng đồ uống

- Mặc định chọn size S, không topping và 1 ly. Cho chọn một trong S/M/L; dữ liệu demo Task 4 phải kiểm tra được đủ ba size.
- Mỗi topping hợp lệ có thể chọn số nguyên 0–3 phần trên một ly; 0 nghĩa là không chọn. Có thể chọn nhiều loại topping.
- Số ly là số nguyên 1–99 mỗi dòng, không vượt lượng còn có thể đặt. Số âm, thập phân, trống hoặc vượt giới hạn bị từ chối và hiển thị hướng dẫn.
- Cùng size và số phần từng loại topping áp dụng cho mọi ly trong lần thêm. Muốn cấu hình khác, khách thêm riêng.
- Giá một ly = giá cơ bản + phụ thu size + tổng (giá mỗi phần topping × số phần trên một ly). Thành tiền = giá một ly × số ly; cập nhật ngay khi đổi lựa chọn.
- Ví dụ: Cappuccino 35.000đ + size M 5.000đ + 2 phần kem × 7.000đ = 54.000đ/ly; 2 ly có thành tiền 108.000đ.
- “Thêm vào giỏ hàng” chuyển đúng món, size, loại/số phần topping và số ly vào giỏ; thành công mới báo đã thêm và cập nhật số lượng/tổng tiền.
- Cùng món, size, tập topping và số phần mỗi loại thì cộng số ly; khác cấu hình thì tách dòng. Thứ tự chọn topping không làm thay đổi cấu hình.
- Kiểm tra tổng số ly cùng sản phẩm trên mọi dòng cộng lần thêm mới không vượt tồn; số ly của dòng sau gộp không vượt 99. Nếu vượt, báo rõ và không thêm.
- “Thanh toán ngay” kiểm tra lựa chọn rồi mở màn hình xem lại chỉ chứa cấu hình món hiện tại; không thêm hoặc thay đổi giỏ có sẵn, chưa tạo đơn/thu tiền trước khi xác nhận. Nếu kiểm tra thất bại, không chuyển bước.
- Chưa đăng nhập thì yêu cầu đăng nhập trước khi tạo đơn; giữ giỏ và quay lại bước xem lại/thanh toán sau đăng nhập.
- Thêm giỏ không giữ kho. Khi tạo đơn, backend kiểm tra lại giá, lựa chọn và tồn; thiếu hàng thì thông báo để khách sửa giỏ.

## US-AUTH-01: Đăng ký tài khoản

- Nhập họ tên, email, mật khẩu và xác nhận mật khẩu; các trường đều bắt buộc.
- Họ tên sau bỏ khoảng trắng đầu/cuối không rỗng và tối đa 100 ký tự. Email đúng định dạng, tối đa 254 ký tự; bỏ khoảng trắng đầu/cuối và chuẩn hóa chữ thường trước khi kiểm tra duy nhất.
- Mật khẩu có 8–64 ký tự, có chữ hoa, chữ thường, chữ số và ký tự đặc biệt; nếu dùng bcrypt không vượt 72 byte UTF-8. Không tự cắt hoặc trim mật khẩu.
- Xác nhận mật khẩu phải trùng; dữ liệu sai hiển thị lỗi tại trường liên quan và chưa tạo tài khoản.
- Email đã có thì báo “Email đã được sử dụng”; không tạo tài khoản trùng kể cả các yêu cầu đến đồng thời.
- Đăng ký hợp lệ thì lưu mật khẩu đã băm, tạo CUSTOMER với 0 điểm. Không cho khách chọn STAFF hoặc gửi giá trị điểm ban đầu.
- Thành công thì báo “Đăng ký thành công” và chuyển sang đăng nhập; không tự đăng nhập trong bản này.
- Đang gửi thì khóa nút gửi. Khi lỗi kết nối, báo lỗi, cho thử lại và giữ thông tin không nhạy cảm; không thông báo thành công khi chưa được backend xác nhận.
- Không trả mật khẩu gốc hoặc passwordHash trong phản hồi API.

## US-AUTH-02 : Đăng nhập tài khoản

- Đăng nhập bằng email và mật khẩu; dữ liệu thiếu/sai định dạng được báo trước khi gửi.
- Tài khoản không tồn tại hoặc mật khẩu sai đều báo “Email hoặc mật khẩu không đúng”.
- Thông tin đúng thì backend cấp JWT có thời hạn; frontend sử dụng JWT để gọi chức năng cần đăng nhập. Các module dùng chung cơ chế xác thực.
- Nếu đăng nhập từ đặt hàng/thanh toán, giữ nguyên giỏ và quay lại màn hình xem lại/thanh toán. Đăng nhập thông thường thì về menu.
- Token thiếu, không hợp lệ hoặc hết hạn thì API từ chối truy cập; giao diện yêu cầu đăng nhập lại, giữ giỏ và đích quay lại hợp lệ trong ứng dụng.
- Bản này giữ token trong bộ nhớ. Tải lại trang có thể yêu cầu đăng nhập lại; sau đó quay về trang hợp lệ đã định, kể cả trang kết quả đơn của chính khách.
- Chủ động đăng xuất thì xóa token, thông tin phiên và giỏ trên thiết bị; trở về menu. Các trang riêng tư không hiển thị dữ liệu phiên cũ.
- Đang gửi thì khóa nút. Lỗi kết nối hiển thị thông báo và cho thử lại; không giả định đã đăng nhập.

## US-HISTORY-01 : Xem lịch sử và chi tiết đơn hàng

- Phải đăng nhập; chỉ truy cập các đơn thuộc tài khoản mình. Thay mã đơn trên URL không cho xem đơn người khác.
- Lịch sử xếp mới nhất trước; mỗi đơn có mã, ngày giờ, tổng tiền và trạng thái.
- Hiển thị đúng các trạng thái: PENDING (Chờ thanh toán), PAYMENT_FAILED (Thanh toán thất bại), PAID (Đã thanh toán), PREPARING (Đang pha chế), READY (Sẵn sàng nhận), COMPLETED (Hoàn tất), CANCELLED (Đã hủy).
- Chi tiết có tên món, size, số ly, loại và số phần topping trên một ly, đơn giá, thành tiền từng dòng, tạm tính, tiền giảm và tổng phải trả.
- Tên và giá là dữ liệu được chốt khi tạo đơn; thay đổi menu về sau không làm đổi đơn cũ.
- Nhận tại quầy; không có trạng thái “Đang giao” và không bắt buộc địa chỉ giao hàng.
- Chưa có đơn thì báo “Bạn chưa có đơn hàng”. Đang tải và lỗi tải có trạng thái rõ ràng, cho phép thử lại.
- Không tìm thấy đơn được phép truy cập thì báo không tìm thấy; không tiết lộ thông tin đơn khác.
- Đơn còn hạn ở PENDING/PAYMENT_FAILED có thể dẫn đến tiếp tục thanh toán hoặc hủy. Các trạng thái khác chỉ cho thao tác đúng quyền và bảng chuyển trạng thái.

## US-LOYALTY-01 : Xem điểm thưởng (Tích điểm)

- Chỉ người đã đăng nhập xem được điểm của mình; tài khoản mới có 0 điểm.
- Khi đơn chuyển PAID thành công, cộng floor(total / 10000) điểm, với total là tiền thực trả sau giảm giá.
- Ví dụ total 84.600đ được 8 điểm; total 108.000đ được 10 điểm. Phần tiền dưới 10.000đ không làm tròn lên.
- PENDING, PAYMENT_FAILED, CANCELLED trước thanh toán không được cộng điểm.
- Gửi lặp thanh toán, tải lại trang hoặc chuyển PAID sang PREPARING/READY/COMPLETED không cộng thêm.
- Nhân viên hủy đơn PAID hợp lệ thì đảo đúng số điểm đã cộng cho đơn, chỉ một lần; không tính lại theo quy tắc mới hoặc giá menu hiện tại.
- Lưu lịch sử cộng/đảo gắn orderId; cập nhật số dư an toàn khi nhiều đơn của một người thanh toán cùng lúc.
- Khách không có quyền tự gửi số điểm để cộng. Điểm hiển thị được lấy từ backend; lỗi tải phải được thông báo, không hiển thị 0 như kết quả giả.
- Thanh toán, trạng thái và điểm được cập nhật nhất quán; khi đọc lại sau thành công, số dư phản ánh giao dịch đã hoàn tất.

## US-CART-01 - Thêm món vào giỏ hàng

- Có thể dùng giỏ khi chưa đăng nhập. Món hết hàng hiển thị rõ và nút thêm bị vô hiệu hóa.
- Nhận productId, một size hợp lệ, danh sách topping kèm số phần trên mỗi ly và số ly. Số phần mỗi loại là số nguyên 0–3; 0 là không chọn; số ly là số nguyên 1–99.
- Cùng món, size, tập loại topping và số phần từng loại thì gộp số ly vào dòng cũ; khác bất kỳ lựa chọn nào thì tách dòng. Thứ tự topping không tạo cấu hình mới.
- Số ly của dòng sau gộp không vượt 99. Tổng số ly cùng productId ở tất cả dòng cộng số thêm mới không vượt tồn tại thời điểm kiểm tra; nếu vượt thì báo rõ và không thay đổi giỏ.
- Giá một ly = giá cơ bản + phụ thu size + tổng (giá mỗi phần topping × số phần). Thành tiền dòng = giá một ly × số ly.
- Thêm thành công thì báo đã thêm, cập nhật thành tiền và badge là tổng số ly, không phải số dòng. Giỏ được lưu trên trình duyệt để tải lại vẫn còn.
- “Thanh toán ngay” từ chi tiết không gọi thao tác thêm giỏ; chỉ mua món hiện tại. Nút “Thanh toán” trong giỏ dùng toàn bộ giỏ; cả hai luồng chưa tự tạo đơn/thanh toán trước xác nhận.
- Thêm giỏ không giữ hàng; tồn và giá được kiểm tra lại ở backend khi tạo đơn. Không thông báo đã giữ hàng chỉ vì có món trong giỏ.
- Khi đăng nhập trong luồng mua, giữ giỏ; khi chủ động đăng xuất, xóa giỏ theo quy tắc phiên chung.

## US-CART-02 – Sửa/xóa món trong giỏ hàng

- Mỗi dòng hiển thị tên món, size, loại/số phần topping trên một ly, số ly, đơn giá và thành tiền.
- Cho tăng/giảm/nhập số ly nguyên 1–99. Giá trị sai bị từ chối, báo lỗi và giữ giá trị hợp lệ trước đó; dùng nút Xóa để bỏ dòng.
- Thay đổi số ly phải kiểm tra tổng số ly cùng sản phẩm trên mọi dòng; thiếu tồn thì thông báo và không áp dụng thay đổi.
- Sửa hợp lệ hoặc xóa dòng thì cập nhật thành tiền, tổng số ly và tính lại điều kiện/tiền giảm của mã đang áp dụng.
- Xóa hết thì hiển thị “Giỏ hàng trống”, xóa áp dụng mã trên giỏ và không cho tạo đơn/thanh toán.
- Tải lại giỏ đã lưu thì kiểm tra lại cấu trúc, giá và tình trạng món. Món hết hàng/không còn tồn tại hoặc tùy chọn không hợp lệ được đánh dấu và yêu cầu sửa trước khi tạo đơn.
- Giá thay đổi phải được thông báo và hiển thị tổng mới trước khi khách xác nhận tạo đơn/thanh toán.
- Bản này sửa cấu hình bằng cách xóa dòng và chọn lại từ chi tiết; không ngầm đổi size/topping khi chỉ sửa số ly.
- Giỏ đã tạo đơn chưa trả tiền được giữ nguyên để thử lại. Muốn sửa món, phải hủy đơn cũ thành công rồi tạo đơn mới với dữ liệu mới.
- Thanh toán thất bại giữ giỏ; thanh toán PAID được xác nhận thì xóa giỏ của lượt mua đó, không lặp thao tác thêm món khi quay lại trang.
- Khi giỏ đã liên kết với đơn chưa thanh toán còn hạn, màn hình tiếp tục thanh toán sử dụng các món, giá và lượng hàng đã giữ của đơn do backend cung cấp. Không dùng tồn khả dụng mới để kết luận đơn này thiếu hàng. Nếu khách muốn sửa món, phải hủy đơn cũ thành công rồi mới kiểm tra lại giỏ và tạo đơn mới.

## US-PROMO-01  – Áp dụng mã khuyến mãi

- Giỏ có ít nhất một món thì hiển thị ô mã và nút Áp dụng. Bản này kiểm tra mã qua API cần đăng nhập; nếu chưa đăng nhập thì yêu cầu đăng nhập và giữ giỏ cùng mã đang nhập.
- Mã được bỏ khoảng trắng đầu/cuối và chuẩn hóa chữ hoa. Backend kiểm tra mã tồn tại, đang bật, trong thời hạn và đạt tổng tiền tối thiểu.
- Backend tính tổng từ sản phẩm và lựa chọn hợp lệ, gồm số phần topping; không tin subtotal/discount do frontend tự gửi.
- Mỗi đơn tối đa một mã. Nhập mã mới hợp lệ thì thay mã cũ; mã mới không hợp lệ thì báo lỗi và giữ mã cũ nếu mã cũ vẫn hợp lệ.
- Bản đầu giảm theo phần trăm, có ngưỡng đơn và mức giảm tối đa; chưa có giới hạn lượt toàn hệ thống hoặc lượt mỗi tài khoản.
- Tiền giảm = min(floor(subtotal × phần trăm / 100), mức giảm tối đa, subtotal); total = subtotal − discount; tiền là số nguyên VND.
- Ví dụ BREW10 giảm 10%, đơn từ 50.000đ, tối đa 20.000đ: subtotal 94.000đ thì discount 9.400đ, total 84.600đ. Ngày hiệu lực được cấu hình cụ thể trong dữ liệu.
- Mã sai/hết hạn/chưa đủ điều kiện được báo rõ. Bỏ mã thì tổng về subtotal của giỏ hiện tại, không phải giá ở thời điểm cũ.
- Giỏ thay đổi thì kiểm tra lại mã và tính lại. Nếu mã không còn hợp lệ, bỏ mức giảm và thông báo rõ tổng mới; không âm thầm thay tổng.
- Khi tạo đơn, kiểm tra lại mã. Mã không hợp lệ thì từ chối tạo đơn để khách sửa/bỏ mã; không tự tạo đơn giá cao hơn. Đơn đã tạo giữ giảm giá snapshot trong hạn thanh toán.
- Tổng tiền sau giảm giá phải lớn hơn 0. Nếu mã làm tổng tiền bằng 0, hệ thống không áp dụng mã đó, thông báo rõ và yêu cầu khách đổi hoặc bỏ mã. Khi tạo đơn, backend kiểm tra lại điều kiện này; nếu không đáp ứng thì không tạo đơn và không giữ kho.

## US-ORDER-01 – Tạo đơn hàng từ giỏ hàng

- Chỉ cho xác nhận tạo đơn khi giỏ có ít nhất một dòng hợp lệ; backend cũng chặn giỏ rỗng.
- Phải có JWT hợp lệ. Nếu chuyển đăng nhập thì giữ giỏ và quay lại bước xem lại/thanh toán; backend lấy chủ đơn từ JWT.
- Kiểm tra sản phẩm tồn tại/được bán, size hợp lệ, topping thuộc sản phẩm, số phần topping nguyên 0–3 trên mỗi ly, số ly nguyên 1–99 mỗi dòng; không chấp nhận topping trùng ID gây tính sai.
- Cộng số ly theo productId trên mọi cấu hình để kiểm tra tồn. Tính lại giá từ database và khuyến mãi hợp lệ; không tin giá/tổng tiền client.
- Lưu snapshot tên món, size, loại/số phần topping, giá từng phần, đơn giá, số ly, lineTotal, subtotal, discount và total để lịch sử không đổi theo menu.
- Tạo đơn và giữ kho trong một transaction: tất cả thành công hoặc hoàn tác toàn bộ. Một món thiếu thì báo rõ món đó, không tạo nửa đơn.
- Thành công lưu PENDING, sinh mã đơn duy nhất, createdAt và expiresAt sau 15 phút; trả chi tiết và tổng tiền đã chốt. Nếu tổng khác màn hình trước đó, hiển thị tổng mới trước khi xác nhận thanh toán.
- POST /orders nhận Idempotency-Key: cùng người dùng, khóa và nội dung thì trả lại cùng đơn; cùng khóa khác nội dung thì 409 IDEMPOTENCY_CONFLICT. Gửi đồng thời cũng chỉ tạo một đơn và giữ kho một lần.
- Danh sách mua đã chốt được giữ sau tạo đơn để thử lại. Muốn sửa danh sách của đơn chưa trả, hủy đơn cũ trước; lần tạo mới dùng khóa mới. Luồng mua ngay không thêm danh sách này vào giỏ có sẵn.
- Có kiểm thử dữ liệu sai, thiếu quyền, tính tiền, thiếu hàng và gửi lặp tạo đơn.
- Tổng tiền sau giảm giá phải lớn hơn 0. Nếu mã làm tổng tiền bằng 0, hệ thống không áp dụng mã đó, thông báo rõ và yêu cầu khách đổi hoặc bỏ mã. Khi tạo đơn, backend kiểm tra lại điều kiện này; nếu không đáp ứng thì không tạo đơn và không giữ kho.
- Gửi lại yêu cầu tạo đơn bằng khóa và nội dung cũ trả về cùng đơn cùng trạng thái hiện tại, kể cả đơn đã hết hạn hoặc bị hủy; không tạo lại đơn, giữ kho lại hoặc gia hạn. Khách muốn đặt lại phải xác nhận một lượt tạo đơn mới với khóa mới.

## US-ORDER-02 – Vận hành máy trạng thái đơn hàng (Order State Machine)

- Chỉ cho các chuyển tiếp trong bảng dưới; COMPLETED và CANCELLED là trạng thái kết thúc.
- Chủ đơn chỉ hủy PENDING/PAYMENT_FAILED của mình. STAFF được chuyển trạng thái pha chế và hủy PAID trước khi pha; không cho khách tự đánh dấu PAID.
- Chuyển sai trả HTTP 409 INVALID_TRANSITION; thiếu quyền STAFF trả 403. Giao diện chỉ hiện thao tác đúng quyền/trạng thái nhưng backend vẫn kiểm tra.
- Hủy PAID phải hoàn tiền giả lập, hoàn kho và đảo điểm đúng một lần; các cập nhật nhất quán với trạng thái CANCELLED. Không hỗ trợ hủy PREPARING/READY/COMPLETED trong bản này.
- Có test chặn PENDING → READY/COMPLETED và mọi chuyển tiếp từ trạng thái kết thúc.
- Bảng chuyển trạng thái: xem [Business Rules](BUSINESS_RULES.md#bảng-chuyển-trạng-thái), khớp các chuyển tiếp trong bảng nguồn US-ORDER-02.

## US-STOCK-01  – Kiểm soát tồn kho và ngăn chặn bán vượt mức khi đặt đồng thời

- Tồn được quản lý theo sản phẩm; mọi size dùng chung. Chưa trừ riêng tồn nguyên liệu/topping. stock là số lượng còn có thể đặt.
- Khi tạo đơn thành công, trừ stock để giữ hàng 15 phút. Thêm vào giỏ không giữ kho; thanh toán thành công không trừ lần hai.
- Kiểm tra và trừ mọi sản phẩm của đơn trong một transaction; dùng optimistic locking qua Product.version và điều kiện đủ stock, tăng version khi cập nhật.
- Xung đột version thì rollback toàn transaction; có thể đọc và thử lại có giới hạn. Còn đủ hàng không bị kết luận nhầm là hết hàng chỉ vì xung đột version; nếu chưa xử lý được trả 409 để khách thử lại.
- Nếu tồn thực tế không đủ, trả OUT_OF_STOCK kèm món liên quan; stock không âm. Nhiều cấu hình cùng productId được cộng tổng trước khi giữ.
- PENDING/PAYMENT_FAILED quá 15 phút chuyển CANCELLED và hoàn đúng số đã giữ một lần. Thử lại không kéo dài hạn. Có tác vụ xử lý hết hạn; API thanh toán cũng kiểm tra hạn.
- Thanh toán thất bại vẫn giữ trong thời gian còn lại; hủy hợp lệ hoàn một lần. Hủy PAID theo US-ORDER-02 cũng hoàn một lần, thanh toán thành công không bị tác vụ hết hạn hủy.
- Thanh toán/hủy/hết hạn đồng thời phải được tuần tự hóa bằng transaction và kiểm tra trạng thái/khóa phù hợp: không vừa xác nhận PAID vừa hoàn kho do hết hạn.
- Ví dụ stock=1, hai khách đồng thời đặt một ly: tối đa một đơn được tạo và giữ hàng; đơn còn lại bị từ chối vì thiếu tồn; stock cuối là 0.
- Có integration test đồng thời trên database cho tranh hàng, rollback đơn nhiều món, hủy/hết hạn lặp và cạnh tranh thanh toán với hết hạn. Unit test mô phỏng đơn thuần không thay thế bằng chứng concurrency.
- Đơn hết hạn khi thời gian backend lớn hơn hoặc bằng expiresAt. Nếu đơn vẫn ở PENDING hoặc PAYMENT_FAILED, không cho bắt đầu lần thanh toán mới, kể cả tác vụ tự động hủy đơn chưa chạy. Việc hủy và hoàn kho chỉ thực hiện một lần

## US-PAY-01: Thanh toán đơn hàng

- Khi đơn hàng có tổng tiền hợp lệ (> 0), tôi thấy màn hình thanh toán hiển thị đúng tổng tiền và phương thức thanh toán.
- Chỉ thanh toán khi đã đăng nhập, là chủ đơn và đơn ở PENDING hoặc PAYMENT_FAILED còn hạn; backend kiểm tra quyền, trạng thái và expiresAt.
- Hiển thị mã đơn, các khoản tiền và phương thức WALLET/CARD. Số tiền lấy từ total đã lưu ở backend, không nhận số tiền client làm căn cứ. Trong phạm vi hiện tại total phải lớn hơn 0; đơn miễn phí cần đặc tả riêng nếu mở rộng.
- Cổng thanh toán là mock, có thể mô phỏng thành công/thất bại, không thu tiền thật và không yêu cầu thông tin thẻ thật.
- Bấm thanh toán thì khóa nút trong lúc xử lý. Backend dùng Idempotency-Key lưu kết quả để chống lặp; khóa nút không thay thế cơ chế backend.
- Thành công thì lưu payment SUCCEEDED, chuyển đơn PAID và cộng điểm đúng một lần; các cập nhật nhất quán. Chỉ khi backend xác nhận mới hiển thị thành công. Thanh toán từ giỏ xóa giỏ của lượt mua; mua ngay giữ nguyên giỏ có sẵn.
- Thất bại được xác nhận thì lưu payment FAILED, chuyển đơn PAYMENT_FAILED, báo lý do và giữ giỏ; không cộng điểm và không trừ kho thêm.
- Thử lại sau thất bại dùng cùng orderId, khóa thanh toán mới, chuyển PAYMENT_FAILED → PENDING khi bắt đầu lần mới; không gia hạn giữ hàng. Hết hạn thì từ chối và xử lý hủy/hoàn kho theo Phát.
- Cùng người dùng, khóa và nội dung thì trả kết quả đã lưu, không tạo payment/đơn mới hoặc cộng điểm thêm. Cùng khóa khác nội dung trả 409 IDEMPOTENCY_CONFLICT; đang xử lý trả REQUEST_IN_PROGRESS.
- Mất mạng chưa biết kết quả thì giữ khóa cũ và nội dung cũ để truy vấn/gửi lại; không tự ghi PAYMENT_FAILED hoặc tạo lần thanh toán mới chỉ vì timeout.
- Đơn chỉ được thanh toán thành công một lần kể cả hai khóa khác nhau đến đồng thời. Khóa mới với đơn đã trả bị từ chối; replay khóa thành công cũ vẫn trả kết quả cũ.
- Đơn bị hủy/hết hạn/không thuộc khách bị từ chối. Đơn PAID bị STAFF hủy hợp lệ được hoàn giả lập một lần, phối hợp Phát/Khoa hoàn kho và đảo điểm.
- Có test gửi hai request cùng khóa, cùng khóa khác body, hai khóa cùng đơn, lỗi rồi thử lại và mất kết nối/gửi lại; không chỉ kiểm thử nút trên giao diện.
- Sau khi xác thực người dùng và quyền truy cập đơn, nếu yêu cầu có cùng Idempotency-Key và nội dung với lần đã xử lý, hệ thống trả lại kết quả đã lưu, kể cả đơn đã chuyển sang PAID hoặc trạng thái sau đó. Không phát sinh thanh toán, trừ kho hoặc cộng điểm mới. Điều kiện bắt đầu thanh toán chỉ áp dụng cho lần thanh toán mới.

## US-PAY-02 : Xem xác nhận thanh toán

- Thành công hiển thị mã đơn, mã giao dịch, số tiền, thời gian, trạng thái và hướng dẫn nhận tại quầy; có nút Xem đơn và Về menu.
- Thất bại hiển thị thông báo dễ hiểu, mã đơn, trạng thái PAYMENT_FAILED và nút Thử lại nếu còn hạn; có đường Quay lại giỏ.
- Quay lại giỏ không tự tạo/hủy đơn. Nếu muốn sửa món, khách phải xác nhận hủy đơn chưa trả trước; chỉ sau hủy thành công mới sửa và tạo đơn mới.
- Chưa có kết quả chắc chắn thì hiển thị “Đang kiểm tra kết quả”, chưa báo thành công hoặc thất bại; đọc trạng thái từ backend và cho kiểm tra lại khi lỗi mạng.
- Tải lại trang phải lấy kết quả từ backend theo mã đơn; không tự gửi thanh toán mới. Nếu phiên không còn thì đăng nhập lại và quay đúng trang kết quả.
- Chỉ chủ đơn xem được kết quả của mình. Đơn không tồn tại hoặc không được phép truy cập thì báo không tìm thấy, không lộ thông tin người khác.
- Nếu đơn đã sang PREPARING/READY/COMPLETED, vẫn thể hiện thanh toán đã thành công và trạng thái xử lý hiện tại; nếu đã hủy/hoàn thì hiển thị trạng thái mới, không giữ thông báo thành công cũ gây hiểu nhầm.
- Tải lại hoặc quay lui không thêm lại món vào giỏ, cộng điểm hay trừ tiền lần nữa. Có trạng thái tải và lỗi kết nối kèm Thử lại tải dữ liệu.
