# BrewLite — Quyết định yêu cầu bước 1–12

**Ngày:** 13/10/2026. **Nguồn xác nhận:** Hưng xác nhận trong phiên làm việc: mua ngay chỉ mua món hiện tại; thanh toán trong giỏ mua toàn bộ giỏ; đồng ý các đề xuất còn lại của lần review đề. Đây là xác nhận quyết định tài liệu, không phải nghiệm thu chức năng.

## Thứ tự căn cứ

1. Đề `BrewLite-CongNghePhanMem.pdf` VER 1.0 của thầy: 10 Task, Scrum và Definition of Done.
2. Quyết định nhóm đã được xác nhận để cụ thể hóa đề, không thay hoặc giảm yêu cầu bắt buộc.
3. Tài liệu Drive/repository: đối chiếu với hai nguồn trên; ngày sửa file không tự quyết định ưu tiên.

PDF đã đọc từ file người dùng cung cấp và [bản đề trên Drive](https://drive.google.com/file/d/13IZRr_uYsv4FTWTJdQ7KHQNGBuvc5_dK/view). 24 bước là quy trình nội bộ, không thay 10 Task. Mục 12 của đề là mục văn bản, không phải bước 12 của nhóm.

## Các quyết định đã chốt

| Nội dung | Quy tắc hiện hành | Căn cứ |
| --- | --- | --- |
| Mua ngay | Chỉ mua cấu hình sản phẩm hiện tại với size/topping/số ly đã chọn; không thêm, gộp hoặc thay đổi giỏ hiện có. | Xác nhận trực tiếp của Hưng. |
| Thanh toán từ giỏ | Dùng toàn bộ các dòng trong giỏ. | Xác nhận trực tiếp của Hưng; luồng chính mục 5 của đề. |
| Xác nhận và dữ liệu | Cả hai luồng xem lại danh sách mua trước xác nhận tạo đơn; backend kiểm tra giá, lựa chọn, tồn và tổng tiền. Mua ngay không tự tạo đơn/thu tiền chỉ vì mở màn hình. | Quyết định nhóm, UC-06 bảng Huy và quy trình PENDING → thanh toán của đề. |
| Sau thanh toán | Mua ngay giữ nguyên giỏ có sẵn cả khi thành công/thất bại; thanh toán từ giỏ chỉ xóa giỏ của lượt mua sau xác nhận PAID. Thử lại dùng đơn/danh sách đã chốt. | Cụ thể hóa hai luồng đã được Hưng xác nhận; tránh xóa món không thuộc đơn. |
| Giới hạn | Giữ hàng 15 phút; 1–99 ly mỗi dòng; 0–3 phần mỗi topping trên một ly. | Quy tắc nhóm trong nguồn Drive, Hưng đồng ý giữ; đề không quy định các con số này. |
| Khuyến mãi | Giảm phần trăm, có ngưỡng đơn và mức giảm tối đa; chưa giới hạn lượt toàn hệ thống/tài khoản. | US-PROMO-01 và đề xuất được Hưng đồng ý. |
| Điểm | Cộng `floor(total / 10000)` khi PAID, total sau giảm; đảo đúng số đã cộng khi hủy PAID hợp lệ, mỗi lần một lần. | Quy tắc nhóm được giữ; đề bắt buộc cộng điểm sau PAID, không quy định công thức. |
| Trạng thái | Theo sơ đồ mục 9.1 của đề; không thêm OrderStatus EXPIRED. Đơn chưa trả hết hạn chuyển CANCELLED theo quy tắc nhóm. | Đề và quy tắc nhóm. |
| Size | Màn hình và dữ liệu demo cho phép chọn đủ S/M/L và kiểm chứng giá theo tùy chọn. | Task 4 của đề. |
| Phân công | Giữ bản [TEAM_ASSIGNMENTS.md](TEAM_ASSIGNMENTS.md) ngày 11/10: Khoa Inventory, Phát Orders/UI lịch sử, Huy Loyalty/Promotions. | Đề xuất được Hưng đồng ý; khác biệt Drive không tự thay chủ module. |

Backend phải giữ đủ bốn yêu cầu Task 10: state machine, idempotency, transaction + optimistic locking, khuyến mãi/điểm. Giao diện nhân viên đầy đủ là mở rộng; backend vẫn phải hỗ trợ chuyển trạng thái bắt buộc. Compose đủ ba dịch vụ là yêu cầu cuối của Task 9; bước setup hiện chỉ DB không phải bằng chứng hoàn thành Task 9.

## Những phần chưa thể kết luận

- Link/version Figma, phê duyệt UML/ERD và minh chứng Activity còn thiếu; không tự chọn bản hình ERD chưa được review.
- Cách lưu/thời hạn/thu hồi JWT và phép đo API dưới 500 ms cần đề xuất kỹ thuật của chủ module và review nhóm.
- UI lịch sử điểm/tiêu điểm chưa có xác nhận phạm vi riêng; không thêm đổi điểm lấy quà.
- [Ánh xạ ERD với đề](ERD_DETAILED.md#8-ánh-xạ-thực-thể-tối-thiểu-của-đề) là giải thích thiết kế hiện tại, chưa chứng minh thầy chấp nhận việc tách bảng hoặc đã triển khai.

Lịch sử audit Drive được giữ tại [báo cáo](audits/drive-sync-steps-01-12.md); phần quyết định mới ở đây thay thế các điểm đã chốt, 13 Google Docs và 6 file nguồn Drive đã được sửa và đọc lại theo yêu cầu tiếp theo của Hưng. Bản Word và ảnh sơ đồ chưa đồng bộ; xem mục cập nhật trực tiếp Drive trong báo cáo.
