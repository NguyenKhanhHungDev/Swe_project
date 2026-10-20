# BrewLite — Menu notes

**DRAFT — Pending owner review.** Owner: Huy. Review: Hưng (Products/Options/Pricing), Phát (nghiệp vụ). Chỉ checklist Buổi 1; không có bằng chứng Menu UI chạy.

Nguồn: A1-03/04/05/10; [US-PROD-01–03, US-CART-01/02, US-PROMO-01](../USER_STORIES.md), [Acceptance Criteria](../ACCEPTANCE_CRITERIA.md), [Products API](../api/products.md), [Cart](../api/cart.md), [Promotion/Loyalty](../api/promotions-loyalty.md).

Menu mobile-first: đọc được tên/giá, ảnh có mô tả phù hợp, thao tác chọn món thuận tiện, không tràn ngang trên màn hình nhỏ. Không tự khóa kích thước breakpoint hoặc thêm search/filter/phân trang ngoài AC.

| Hạng mục | Checklist để Huy review và kiểm chứng sau |
|---|---|
| Dữ liệu | Ảnh, tên, giá size S chưa topping, tình trạng còn/hết hàng; map UUID và field theo Products contract |
| Loading | Hiện Đang tải menu; chưa có dữ liệu không giả là danh sách rỗng |
| Empty | Response danh sách rỗng: Chưa có đồ uống |
| Error | Thông báo rõ và Thử lại; không biến lỗi thành empty |
| Hết hàng | Nhãn HẾT HÀNG có chữ/độ tương phản; vẫn xem detail, khóa mua |
| Menu → Detail | Chọn item mở đúng productId; detail loading/error/not-found và đường về Menu |
| Detail | Size S/M/L, topping, số ly; Hưng/Huy chốt thuật ngữ giá đầy đủ/phụ thu PD-10 trước code |
| Cart | Chưa đăng nhập vẫn dùng giỏ; cùng cấu hình gộp qty; badge tổng số ly; thêm giỏ không giữ kho |
| Checkout | Huy sở hữu UI; mua ngay chỉ món hiện tại, giữ giỏ cũ; từ giỏ mua toàn giỏ; xem lại trước tạo đơn |
| Promotion | Mã hợp lệ, lỗi, bỏ mã, giỏ thay đổi kiểm tra lại; giới hạn lượt đang mâu thuẫn, không tự thêm quota |
| Evidence | Sau gate A2: ảnh thật, API response, Playwright E2E và PR theo AC, không dùng trang Hello làm evidence Menu |

Figma: **Pending** link/page/frame/version và xác nhận owner; [UI/UX audit](../UI_UX.md) chưa có URL file BrewLite được xác minh. Không tạo link giả.

- [ ] Huy xác nhận checklist và consumer DTO với Hưng.
- [ ] Huy/Phát/Thắng chốt luồng Checkout và trạng thái; Khoa xác nhận đọc tồn.
- [ ] Sau A2-1/2/3 được nghiệm thu mới dùng checklist để nghiệm thu A2-4.3; chưa tick đạt UI.
