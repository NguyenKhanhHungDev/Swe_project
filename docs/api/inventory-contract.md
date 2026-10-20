# BrewLite — Inventory contract

**DRAFT — Pending owner review.** Owner: Khoa. Phối hợp: Phát (Orders), Thắng (Payments), Hưng (Products/ERD). Buổi 1 chỉ chuẩn bị hợp đồng, không triển khai Prisma/InventoryService.

Nguồn: A1-06/10, [BR-14/15/18/19](../BUSINESS_RULES.md), [ERD mục 3.4, 3.6–3.8, 5–6](../ERD_DETAILED.md), [Architecture mục 5](../ARCHITECTURE.md). Mâu thuẫn xem [PD-05/07/08/09](../scrum/team-working-agreement.md#pending-decisions).

## Dữ liệu và invariant đề xuất từ ERD

INVENTORY theo product_id, mọi size dùng chung; available = on_hand − reserved_quantity. Tổng hợp qty của cùng sản phẩm qua mọi dòng/size trước reserve. Giữ on_hand >= reserved_quantity >= 0; version không âm. Không giữ hàng khi thêm giỏ. PRODUCT/PRODUCT_SIZE cung cấp catalog/giá, ORDER lưu snapshot; không dùng PRODUCT.stock_qty trong Sequence cũ làm schema đã duyệt.

## Interface nội bộ cần Khoa và Phát chốt

| Thao tác logic (chưa khóa tên/signature) | Input | Kết quả/điều kiện |
|---|---|---|
| reserve | transaction client, orderId, tổng qty theo productId | HELD cho mỗi order/product; tăng reserved_quantity và version với điều kiện đủ khả dụng/version đúng |
| release | cùng transaction, orderId, lý do hủy hợp lệ | HELD → RELEASED, giảm reserved_quantity đúng một lần; replay không hoàn thêm |
| consume | cùng transaction, orderId khi PAID | Đề xuất ERD: HELD → CONSUMED, giảm on_hand và reserved_quantity cùng lượng, không giảm available lần hai |
| return sau hủy PAID | cùng transaction, orderId và điều kiện State Machine | CONSUMED → RETURNED, hoàn on_hand đúng một lần, cùng refund/đảo điểm |
| đọc khả dụng theo lô | productIds | Dữ liệu phục vụ Menu/Products; không bảo đảm còn hàng tại thời điểm đặt |

Không tạo HTTP Inventory API nếu chưa có yêu cầu; các tên trên là thao tác logic để chủ module chốt.

## Transaction và lỗi

Orders mở transaction dùng chung với Inventory để tạo ORDER/dòng/snapshot/reservation và reserve. Thất bại bất kỳ món nào rollback toàn bộ. Unique(order_id, product_id) và key tạo đơn không đủ thay optimistic locking. Cập nhật có điều kiện theo version và đủ tồn, tăng version; version conflict đọc lại/thử có giới hạn theo chính sách cần chốt, không gán nhầm hết hàng. Thiếu tồn thật trả lỗi OUT_OF_STOCK theo UC/AC; HTTP/mã conflict cuối cùng cần review. Không tự mở transaction riêng trong service tham gia.

Payment thành công, consume, PAID và loyalty phải nguyên tử theo ERD. Hủy hợp lệ, release/return, refund và reversal cũng chống tác động trùng. Không xóa reservation để mất dấu xử lý. Cạnh tranh payment/cancel phải chỉ một nhánh thắng.

## Chống oversell và evidence cần bàn giao sau

- stock=1, hai yêu cầu đồng thời: tổng qty được nhận <=1, chỉ một reservation hợp lệ, không âm.
- Nhiều size của một product phải cộng tổng; đơn nhiều món thiếu một món rollback hết.
- Retry/replay reserve/release/consume không tác động lần hai; race payment/cancel không vừa PAID vừa release.
- DB integration test thật, seed có kiểm soát, commit/log; mock unit test không chứng minh cạnh tranh DB.

## Khoa xác nhận

- [ ] Chọn mô hình on_hand/reserved, thời điểm consume và return như ERD hay cập nhật có review.
- [ ] Chốt transaction client/signature, FK/orderId và thứ tự ghi ORDER/reservation.
- [ ] Chốt optimistic locking, retry bound, lỗi thiếu tồn và unique constraints.
- [ ] Cùng Phát/Thắng giải quyết PD-05: không mặc định timer 15 phút; chính sách giữ/hoàn khi bỏ timer cần xác nhận.
- [ ] Review Product/Order/Inventory ERD và cập nhật mapping trước Prisma/migration ở giai đoạn sau.
