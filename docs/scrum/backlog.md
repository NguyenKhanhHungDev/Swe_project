# BrewLite — Product Backlog A1/A2

**DRAFT — Pending owner review.** Có đúng 10 nháp A1 và 16 nháp task con A2; chưa có Issue mới được tạo. Owner triển khai nằm trong từng hồ sơ, không suy ra assignee GitHub. Phát quản lý A1; Hưng điều phối truy vết, cả nhóm chốt Sprint Backlog qua Planning thật.

Kiểm tra GitHub public API ngày 20/10/2026: 16 mục trả về, đều là PR; không có Issue thường/A1/A2 trong snapshot. Không có trang tiếp theo. Không dùng snapshot này thay lần kiểm tra ngay trước tạo Issue. gh auth status chưa đăng nhập; không có Board được tạo/xác minh quyền.

## Thứ tự đề xuất, chưa là Sprint đã chốt

| Ưu tiên/phụ thuộc | Hồ sơ |
|---|---|
| Requirements trước | [A2-1.1](../backlog/A2-1.1.md), [A2-1.2](../backlog/A2-1.2.md), [A2-1.3](../backlog/A2-1.3.md) |
| UML sau nghiệm thu A2-1 | [A2-2.1](../backlog/A2-2.1.md), [A2-2.2](../backlog/A2-2.2.md), [A2-2.3](../backlog/A2-2.3.md) |
| Architecture sau nghiệm thu A2-2 | [A2-3.1](../backlog/A2-3.1.md), [A2-3.2](../backlog/A2-3.2.md) |
| Sprint 1 sau nghiệm thu A2-3 | [A2-4.1](../backlog/A2-4.1.md), [A2-4.2](../backlog/A2-4.2.md), [A2-4.3](../backlog/A2-4.3.md), [A2-4.4](../backlog/A2-4.4.md) |
| Sprint 2/Delivery sau nghiệm thu A2-4 | [A2-5.1](../backlog/A2-5.1.md), [A2-5.2](../backlog/A2-5.2.md), [A2-5.3](../backlog/A2-5.3.md), [A2-5.4](../backlog/A2-5.4.md) |
| A1 nền tảng/API/Menu/options | [A1-01](../backlog/A1-01.md), [A1-02](../backlog/A1-02.md), [A1-03](../backlog/A1-03.md), [A1-04](../backlog/A1-04.md) |
| A1 giỏ/Auth trước tạo đơn | [A1-05](../backlog/A1-05.md), [A1-07](../backlog/A1-07.md), [A1-06](../backlog/A1-06.md) |
| A1 thanh toán, bàn giao, nghiệp vụ nâng cao | [A1-08](../backlog/A1-08.md), [A1-09](../backlog/A1-09.md), [A1-10](../backlog/A1-10.md) |

Các thiết kế A1-10 được tính từ đầu, nhưng không chạy implementation vượt phạm vi Buổi 1. A1-06 phụ thuộc Inventory Khoa; A1-09 phối hợp Huy/Thắng; A1-10 do Phát điều phối và phân phần theo owner.

## Sprint Backlog và Board

Sprint Goal, ngày bắt đầu/kết thúc, ước lượng, danh sách được nhóm chọn: **PENDING Sprint Planning**. Mỗi task được chọn cần owner, AC, dependencies và evidence trên Issue/PR; Huy lấy dữ liệu thật để cập nhật Daily/Burndown. Không tạo số liệu hoặc lịch họp giả.

Board mục tiêu: Todo → In Progress → Review → Done. Chưa tạo vì CLI chưa xác thực/quyền Project chưa kiểm chứng; dùng file này tạm theo dõi. Sau đăng nhập, kiểm tra quyền Project và cấu hình bốn cột; nếu không có quyền tiếp tục bảng Git, không báo đã có Board.

[Lệnh bàn giao GitHub và quy tắc chống tạo trùng](github-handoff.md).
