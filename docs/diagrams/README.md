# BrewLite — Sơ đồ hiện có và điểm cần owner review

**DRAFT — Pending owner review.** Rà 20/10/2026. Nguồn Sequence Products, Cart, Promotions/Loyalty, Orders, Checkout/Payments đã có; một số Cart/Promotion có SVG. Chưa render/kiểm chứng lại tất cả ảnh trong Buổi 1. Giữ sơ đồ của thành viên, không coi tên Bước trong tiêu đề cũ là roadmap hiện hành.

| Nguồn | Kết quả nội dung và việc tiếp theo | Owner/review |
|---|---|---|
| sequence/products | Tham khảo API Products; review giá/DTO/Inventory interface | Hưng/Huy/Khoa |
| sequence/cart; sequence/promotions-loyalty | Tham khảo browser cart và promo/loyalty; review quota/giá và DTO Orders | Huy/Phát/Hưng |
| sequence/orders/01-create-order.puml | Timer now+15m trái yêu cầu hiện tại; PRODUCT.stock_qty khác INVENTORY; clear giỏ ngay khi PENDING sai luồng; nhánh lỗi/replay chưa dừng rõ, reservation trước ORDER cần review FK | Phát/Khoa/Huy |
| sequence/orders/02-view-orders.puml | GET /orders và ADMIN khác A1 GET /orders/me/CUSTOMER/STAFF; pagination envelope chưa chốt | Phát/Khoa/Huy |
| sequence/orders/03-update-order-status.puml | ADMIN, HTTP/mã chuyển sai và xóa reservation khi COMPLETED cần review theo ledger/AC | Phát/Khoa |
| sequence/orders/04-cancel-order.puml | Orders gọi Payment khác hướng điều phối; DELETE reservation/REFUND mapping khác ERD, HTTP/mã lỗi chưa khớp | Phát/Thắng/Khoa/Huy |
| sequence/checkout-payments/01-checkout.puml | CartService phía server chưa có căn cứ giỏ browser; preview/DTO/price cần thống nhất | Thắng/Huy/Phát |
| sequence/checkout-payments/02-initiate-payment.puml | amount client/paymentUrl và PROCESSING mapping chưa chốt; cần ownership/transaction | Thắng/Phát/Khoa |
| sequence/checkout-payments/03-payment-result.puml | GET status đang ghi SUCCEEDED, thiếu nhánh failure và atomicity; không dùng làm contract GET triển khai | Thắng/Phát/Huy |
| sequence/checkout-payments/04-idempotency.puml | findUnique rồi dùng record chưa đủ chống race/key khác body; scope key/fingerprint/TTL cần chốt | Thắng/Khoa/Phát |

Các file Orders/Payment đã gắn cảnh báo ngay trong nguồn .puml. Nội dung kỹ thuật cũ giữ để owner sửa ở đúng giai đoạn; không sinh sơ đồ UML mới trong Buổi 1. [PD-05–10](../scrum/team-working-agreement.md#pending-decisions) theo dõi quyết định; [Checkout checklist](../requirements/order-state-transitions.md) là đầu vào Buổi 2. A2 Task 2 chỉ nghiệm thu sau Task 1. Class và Deployment Diagram còn thiếu; Activity chỉ có kiểm kê nguồn Drive, chưa có source local để nghiệm thu.
