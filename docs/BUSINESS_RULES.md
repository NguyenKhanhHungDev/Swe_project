# BrewLite — Business Rules

**Cập nhật quyết định nhóm ngày 13/10/2026:** Nội dung hiện hành tuân theo đề của thầy và các quyết định đã được nhóm xác nhận. Xem [quyết định yêu cầu](REQUIREMENTS_DECISIONS.md).

**Trạng thái:** Đã trích lọc từ tài liệu người dùng cung cấp; cần nhóm review, chưa xác nhận nghiệm thu.

**Nguồn:** `Báo cáo.docx`, mục 5 và ảnh bảng chuyển trạng thái ngay sau mục này. Các mã BR dưới đây được gán khi tách file để dễ tham chiếu; không kế thừa mã “BR-20” trên ảnh nguồn.

## Sản phẩm và giỏ hàng

- **BR-01:** Một dòng giỏ được xác định bởi sản phẩm, size, loại và số phần từng topping; thứ tự topping không ảnh hưởng.

- **BR-02:** Cùng cấu hình thì cộng số ly; khác cấu hình thì tạo dòng riêng.

- **BR-03:** Số ly mỗi dòng là số nguyên từ 1–99; mỗi loại topping có từ 0–3 phần trên một ly.

- **BR-04:** Thêm vào giỏ không giữ kho. Tổng số ly cùng sản phẩm trên mọi dòng phải được kiểm tra khi tạo đơn.

- **BR-05:** Backend tính lại giá và tổng tiền; không tin số tiền frontend gửi.

- **BR-06:** “Thanh toán ngay” chỉ mua cấu hình món hiện tại (size, topping, số ly đã chọn), không thêm hoặc thay đổi giỏ hiện có. Thanh toán từ giỏ mua toàn bộ giỏ. Cả hai luồng phải xem lại và xác nhận trước khi tạo đơn/thanh toán; mua ngay thành công hoặc thất bại không xóa giỏ có sẵn.

- **BR-07:** Khi đã tạo đơn chưa thanh toán, muốn sửa món phải hủy đơn cũ thành công trước.

## Khuyến mãi

- **BR-08:** Mỗi đơn được áp dụng tối đa một mã hợp lệ: đang hoạt động, trong thời hạn và đáp ứng tổng tiền tối thiểu. Bản đầu không giới hạn lượt dùng toàn hệ thống hoặc theo tài khoản.

- **BR-09:** Tiền giảm được tính theo phần trăm, làm tròn xuống đến đồng và không vượt mức giảm tối đa.

- **BR-10:** Tổng tiền sau giảm phải lớn hơn 0; mã làm tổng bằng 0 bị từ chối.

- **BR-11:** Khi giỏ thay đổi hoặc tạo đơn, backend kiểm tra lại mã. Không tự bỏ mã rồi tạo đơn với giá cao hơn.

- **BR-12:** Đơn đã tạo giữ nguyên giá và giảm giá đã chốt trong thời hạn thanh toán.

## Đơn và tồn kho

- **BR-13:** Chỉ khách đã đăng nhập mới được tạo đơn; đơn mới có trạng thái PENDING.

- **BR-14:** Tạo đơn và trừ tồn khả dụng để giữ hàng được thực hiện trong cùng transaction, sử dụng version để kiểm soát đồng thời.

- **BR-15:** Tồn kho quản lý theo sản phẩm, dùng chung cho mọi size; không được âm.

- **BR-16:** Đơn chưa thanh toán có hạn 15 phút. Thử lại thanh toán không kéo dài thời hạn.

- **BR-17:** Thanh toán thất bại vẫn giữ đơn, giỏ và hàng đã giữ trong thời gian còn lại.

- **BR-18:** Đơn chưa thanh toán bị hủy hoặc hết hạn được chuyển CANCELLED và hoàn kho đúng một lần.

- **BR-19:** Thanh toán thành công không trừ kho lần nữa.

- **BR-20:** Gửi lại yêu cầu tạo đơn với cùng khóa và nội dung trả về cùng đơn, không tạo hoặc giữ kho thêm.

## Thanh toán và điểm

- **BR-21:** Khách chỉ được xem và thanh toán đơn của mình; số tiền thanh toán lấy từ backend.

- **BR-22:** Thanh toán sử dụng Ví/Thẻ mô phỏng, không thu tiền thật.

- **BR-23:** Thành công chuyển đơn thành PAID; thất bại được xác nhận chuyển thành PAYMENT_FAILED.

- **BR-24:** Gửi lại cùng yêu cầu với cùng Idempotency-Key trả lại kết quả đã lưu; cùng khóa khác nội dung bị từ chối.

- **BR-25:** Thử lại sau thất bại đã được xác nhận dùng cùng đơn còn hạn và khóa mới.

- **BR-26:** Mất kết nối chưa biết kết quả thì kiểm tra hoặc gửi lại bằng khóa cũ, không tự kết luận thanh toán thất bại.

- **BR-27:** Một đơn chỉ được thanh toán thành công một lần, kể cả các yêu cầu dùng khóa khác nhau.

- **BR-28:** Cộng floor(total / 10000) điểm khi đơn chuyển thành PAID, đúng một lần; total là tiền thực trả sau giảm giá.

## Trạng thái và hủy đơn

- **BR-29:** Luồng thành công: PENDING → PAID → PREPARING → READY → COMPLETED.

- **BR-30:** Thanh toán thất bại: PENDING → PAYMENT_FAILED; bắt đầu thử lại hợp lệ: PAYMENT_FAILED → PENDING.

- **BR-31:** Chủ đơn được hủy đơn ở PENDING hoặc PAYMENT_FAILED.

- **BR-32:** Nhân viên được hủy đơn PAID trước khi pha; hệ thống hoàn tiền mô phỏng, hoàn kho và đảo đúng số điểm đã cộng, mỗi thao tác đúng một lần.

- **BR-33:** Không hỗ trợ hủy đơn ở PREPARING, READY hoặc COMPLETED.

- **BR-34:** COMPLETED và CANCELLED là trạng thái kết thúc; các chuyển tiếp không được quy định đều bị từ chối.

## Bảng chuyển trạng thái

Chép lại nội dung ảnh trong báo cáo thành bảng có thể tìm kiếm và chỉnh sửa. Bảng này mô tả trạng thái đơn hàng.

| Từ | Sang | Điều kiện |
| --- | --- | --- |
| PENDING | PAID | Backend xác nhận thanh toán thành công. |
| PENDING | PAYMENT_FAILED | Thanh toán thất bại được xác nhận. |
| PENDING | CANCELLED | Chủ đơn hủy hoặc hệ thống xử lý hết hạn. |
| PAYMENT_FAILED | PENDING | Bắt đầu lần thử thanh toán mới khi còn hạn. |
| PAYMENT_FAILED | CANCELLED | Chủ đơn hủy hoặc hệ thống xử lý hết hạn. |
| PAID | PREPARING | Nhân viên nhận pha chế. |
| PAID | CANCELLED | Nhân viên hợp lệ; kèm hoàn tiền, hoàn kho và đảo điểm. |
| PREPARING | READY | Nhân viên xác nhận pha xong. |
| READY | COMPLETED | Nhân viên xác nhận đã giao đồ tại quầy. |

## Phạm vi của bản trích lọc

Nội dung quy tắc được giữ theo báo cáo, gồm các giới hạn 1–99 ly, 0–3 phần topping, giữ hàng 15 phút và công thức điểm. Đây là dữ liệu thiết kế, chưa phải kết quả kiểm thử. Những quyết định chưa được nguồn nêu rõ được ghi tại [REQUIREMENTS_REVIEW.md](REQUIREMENTS_REVIEW.md).
