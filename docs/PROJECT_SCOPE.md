# BrewLite — Project Scope

> **DRAFT — Pending owner review (20/10/2026).** Nguồn thiết kế được giữ để review, chưa nghiệm thu hoặc triển khai. Các đoạn thời hạn 15 phút/expiresAt/hết hạn bên dưới đang xung đột với yêu cầu hiện tại không triển khai timer; không dùng chúng để tạo timer/cron. Chờ Phát/Khoa/Thắng chốt và sửa đồng bộ theo [PD-05](scrum/team-working-agreement.md#pending-decisions). Các khác biệt DTO, giá, quyền và transaction xem cùng bảng Pending Decisions.


**Trạng thái:** Đã trích lọc từ tài liệu người dùng cung cấp; cần nhóm review, chưa xác nhận nghiệm thu.

**Nguồn:** `Báo cáo.docx` mục 1 và `SRS.md` mục 1–2 do người dùng cung cấp ngày 11/10/2026.

## 1. Mô tả và mục tiêu

BrewLite là ứng dụng đặt đồ uống và thanh toán mô phỏng để nhận tại quầy. Mục tiêu là giúp khách chọn món, đặt hàng và thanh toán trước khi nhận đồ, giảm thời gian xếp hàng. Frontend sử dụng Next.js, backend NestJS và database PostgreSQL.

## 2. Trong phạm vi

- Xem menu, chi tiết đồ uống, chọn size và topping.
- Quản lý giỏ hàng: thêm món, sửa số ly, xóa món và tính tổng tiền.
- Đăng ký, đăng nhập và đăng xuất tài khoản.
- Áp dụng/bỏ mã khuyến mãi.
- Tạo đơn, thanh toán Ví/Thẻ mô phỏng và xem kết quả xác nhận.
- Xem trạng thái, lịch sử, chi tiết đơn và điểm thưởng của mình.
- Hủy đơn theo quyền và trạng thái được phép.
- Xử lý trạng thái tại quầy qua API có kiểm tra quyền STAFF.
- Chống tạo đơn/thanh toán trùng, kiểm soát tồn kho đồng thời, giữ/hoàn hàng, cộng/đảo điểm và hoàn tiền mô phỏng theo quy tắc.

## 3. Tác nhân và quyền truy cập

- Khách hàng: xem và chọn món, quản lý giỏ, tài khoản, đơn và điểm.
- Nhân viên quầy: tiếp nhận pha chế, xác nhận pha xong/giao đồ và hủy đơn PAID trước khi pha.
- Khách chưa đăng nhập được xem menu/chi tiết, chọn tùy chọn và sử dụng giỏ. Áp mã, tạo đơn, thanh toán, xem đơn và điểm yêu cầu đăng nhập; khách chỉ truy cập dữ liệu của mình.
- Thanh toán mock, database, bộ xử lý hết hạn và kiểm soát tồn kho là thành phần nội bộ.

## 4. Ngoài phạm vi

Giao hàng, thanh toán thật, OTP, xác thực hai lớp, quên mật khẩu, đổi điểm lấy quà, hạng thành viên và hệ thống quản trị cửa hàng đầy đủ. Giao diện nhân viên đầy đủ là phần mở rộng; API xử lý nghiệp vụ nhân viên vẫn thuộc phạm vi.

## 5. Sản phẩm bàn giao dự kiến

Mã nguồn, database và dữ liệu mẫu, Docker Compose, hướng dẫn chạy, kết quả kiểm thử, tài liệu quy trình Scrum và demo luồng mua hàng. Danh sách này là phạm vi bàn giao, không xác nhận các sản phẩm đã hoàn thành.

## 6. Liên kết

[SRS](SRS.md) · [Business Rules](BUSINESS_RULES.md) · [Architecture](ARCHITECTURE.md) · [Truy vết yêu cầu](REQUIREMENTS_TRACEABILITY.md).
