# BrewLite — Phân công nhóm (bản chốt để review)

**Ngày cập nhật:** 10/10/2026
**Nhóm:** Hưng, Khoa, Huy, Phát, Thắng
**Nguồn yêu cầu:** Đề BrewLite môn Công nghệ Phần mềm (10 Task) và quy trình triển khai nội bộ (24 bước).
**Nguyên tắc:** Đủ 10 Task bắt buộc, đủ 24 bước, có Scrum và minh chứng; không coi mức đóng góp của mỗi người bằng nhau chỉ vì số đầu việc giống nhau.

## 1. Phân công chức năng và công việc tích hợp

| Thành viên | Phạm vi code chính | Thiết kế / công việc bổ trợ | Trách nhiệm kiểm chứng |
|---|---|---|---|
| **Hưng — Leader** | Products (menu, chi tiết, size/topping, API); PrismaService và kết nối DB; Docker/Compose | **Toàn bộ Preliminary ERD và Detailed ERD**; điều phối API Specification; chuẩn hóa UI và tích hợp; **tổng hợp báo cáo và tài liệu bàn giao cuối**; chủ trì tổng thể các bước 1–6, 8, 22 và Scrum | Test sản phẩm, định giá lựa chọn; chạy tích hợp hệ thống và kiểm soát PR |
| **Khoa** | Auth, Users, JWT, RBAC **CUSTOMER/STAFF**, **Inventory** | **Use Case**; thiết kế luồng xác thực/phân quyền và tồn kho; Activity/Sequence các nghiệp vụ được giao | Kiểm thử đăng ký/đăng nhập, bảo vệ API, quyền sở hữu và tồn kho đồng thời |
| **Huy** | Cart (state ở client), Promotions, Loyalty | UI giỏ hàng, khuyến mãi, điểm; **User Stories/Acceptance Criteria theo module**; Activity/Sequence nghiệp vụ tương ứng; **tổng hợp kết quả kiểm thử từ các chủ module và Scrum Burndown** | Test giỏ hàng, voucher, cộng/đảo điểm đúng một lần |
| **Phát** | Orders, hủy đơn, lịch sử/chi tiết đơn, Order State Machine; thực hiện và điều phối Prisma schema, migration, seed | Điều phối **Figma/User Flow**, cùng các chủ module hoàn thiện màn hình; **Activity/Sequence nghiệp vụ Orders** | Test tạo/hủy đơn, chuyển trạng thái, thời hạn giữ hàng, chống tạo đơn trùng |
| **Thắng** | Checkout, Payments giả lập, kết quả thanh toán, idempotency và hoàn tiền giả lập | UI checkout/xác nhận; **Deployment Diagram và hướng dẫn triển khai**; phụ trách E2E cùng các chủ module | Test thanh toán thành công/thất bại, chống thanh toán trùng, E2E checkout và luồng liên module |

**Chủ trì và thực hiện:** Hưng chủ trì các bước 1–6, 8, 22, Scrum và bàn giao: điều phối, rà soát và tổng hợp; không tự thực hiện toàn bộ. Các chủ module trực tiếp làm phần được giao và cung cấp tài liệu, test, minh chứng. Khoa thực hiện Use Case; Huy thực hiện User Stories/Acceptance Criteria theo module và Scrum Burndown; Thắng thực hiện Deployment Diagram, hướng dẫn triển khai và E2E.

> **Phân quyền:** Khoa xây dựng cơ chế dùng chung (JWT, guards, roles). Mỗi chủ module vẫn phải thực thi kiểm tra quyền, quyền sở hữu tài nguyên và điều kiện nghiệp vụ ở API của mình. API xem menu có thể công khai. Không thêm vai trò ADMIN khi chưa có yêu cầu được phê duyệt.

## 2. Phân công thiết kế giao diện Figma

- **Phát:** quản lý file Figma, chuẩn hóa design system, luồng tổng thể, rà soát tính nhất quán và tích hợp các màn hình.
- **Hưng:** màn hình menu, chi tiết sản phẩm, chọn size/topping.
- **Khoa:** đăng ký/đăng nhập, thông tin tài khoản.
- **Huy:** giỏ hàng, voucher, điểm thưởng.
- **Thắng:** checkout, kết quả thanh toán và xác nhận đơn.
- **Phát:** lịch sử/chi tiết đơn và các màn hình xử lý đơn thuộc phạm vi đã chốt.

Nếu Figma đã được Phát thực hiện trước, **không làm lại**; người phụ trách module chỉ review, bổ sung và chịu trách nhiệm chuyển thiết kế sang giao diện hoạt động.

## 3. Sơ đồ và tài liệu

| Sản phẩm | Chủ trì | Phối hợp |
|---|---|---|
| Scope (bước 1) | Hưng | Mỗi chủ module cung cấp phạm vi liên quan |
| Requirements / SRS (bước 2) | Hưng | Mỗi chủ module trực tiếp viết yêu cầu và cung cấp nguồn/minh chứng |
| User Stories (bước 3) | Hưng | Huy thực hiện theo module; các chủ module trực tiếp viết và đối chiếu phần mình |
| Acceptance Criteria (bước 4) | Hưng | Huy thực hiện theo module; các chủ module cung cấp tiêu chí và minh chứng tương ứng |
| Business Rules (bước 5) | Hưng | Mỗi chủ module tài liệu hóa quy tắc đã thống nhất; không tự thêm nghiệp vụ |
| Use Case (bước 6) | Hưng | Khoa thực hiện sơ đồ/đặc tả; các chủ module cung cấp luồng và review |
| Project Setup (bước 7) | Hưng | Các thành viên kiểm tra môi trường module mình và cung cấp minh chứng |
| Architecture (bước 8) | Hưng | Các chủ module trực tiếp viết trách nhiệm, tương tác và tham gia review |
| Preliminary ERD (bước 9) | Hưng | Cả nhóm cung cấp thực thể và quy tắc nghiệp vụ |
| Figma + User Flow (bước 10) | Phát | Mỗi thành viên phụ trách màn hình module mình |
| Activity Diagrams (bước 11) | Mỗi chủ module | Hưng đối chiếu luồng tổng thể |
| Detailed ERD (bước 12) | Hưng | Phát kiểm tra khả năng triển khai schema; cả nhóm rà soát |
| API Specification (bước 13) | Hưng điều phối mẫu/hợp đồng chung | Mỗi chủ module định nghĩa API tương ứng |
| Sequence Diagrams (bước 14) | Mỗi chủ module | Các bên liên quan đối chiếu tương tác |
| Frontend (bước 15) | Mỗi chủ module | Hưng chuẩn hóa UI/tích hợp; Phát điều phối Figma, thực hiện UI Orders; Thắng checkout/xác nhận |
| Backend (bước 16) | Mỗi chủ module | Hưng: Products/PrismaService; Khoa: Auth/Users/RBAC/Inventory; Huy: Promotions/Loyalty; Phát: Orders; Thắng: Payments |
| Prisma schema, migration, seed (bước 17) | Phát thực hiện và điều phối tích hợp | Hưng phụ trách PrismaService/kết nối; mỗi người đề xuất model liên quan |
| State Machine (bước 18) | Phát | Thắng, Khoa, Huy về các luồng liên quan |
| Unit test (bước 19) | Từng chủ module | Khoa/Huy/Phát/Thắng/Hưng theo phạm vi |
| Integration & E2E test (bước 20) | Chủ module liên quan cùng thực hiện | Hưng điều phối tích hợp; Thắng phụ trách E2E; Khoa kiểm thử theo phạm vi; Huy tổng hợp kết quả; mỗi chủ module cung cấp test/minh chứng |
| Docker packaging (bước 21) | Hưng | Các thành viên kiểm tra khả năng chạy module |
| Deployment Diagram và hướng dẫn triển khai (bước 22) | Hưng | Thắng trực tiếp thực hiện; Hưng đối chiếu Docker/kiến trúc; các chủ module cung cấp cấu hình và minh chứng |
| Demo (bước 23) | Cả nhóm | Hưng điều phối kịch bản và tích hợp |
| Final Docs (bước 24) | Hưng chủ trì, tổng hợp báo cáo/bàn giao | Mỗi thành viên cung cấp tài liệu, test, minh chứng |

## 4. Ranh giới phối hợp quan trọng

1. **Orders ↔ Inventory:** Phát thống nhất giao diện service với Khoa; cập nhật giữ/hoàn tồn kho phải nhất quán với tạo/hủy đơn.
2. **Orders ↔ Payments:** Phát và Thắng thống nhất trạng thái, thời hạn và khóa chống xử lý trùng; tránh phụ thuộc vòng giữa các module.
3. **Payments ↔ Loyalty:** Thắng và Huy thống nhất cộng/đảo điểm đúng một lần; phối hợp transaction.
4. **Products ↔ Cart:** Hưng và Huy thống nhất định dạng sản phẩm, size, topping, số phần topping và số ly.
5. **ERD ↔ Prisma:** Hưng sở hữu bản thiết kế dữ liệu; Phát phụ trách áp dụng schema/migration/seed; mọi khác biệt phải được review trước migration.
6. **Auth dùng chung:** Khoa định nghĩa phương thức xác thực/phân quyền; mỗi API nghiệp vụ vẫn tự kiểm tra quyền sở hữu tài nguyên.

## 5. Đánh giá cân bằng công việc

Đây là **bản phân công cân bằng theo phạm vi trách nhiệm**, không phải kết quả đo chính xác 20% mỗi người. Việc cân bằng thực tế cần dựa trên GitHub Issues, ước lượng effort, số giờ, độ khó, review và kết quả nghiệm thu. Nếu một người quá tải, nhóm chuyển **việc hỗ trợ** và không đổi chủ sở hữu module khi chưa thống nhất.

## 6. Scrum và chứng cứ báo cáo

- **Hưng chủ trì Scrum:** điều phối hoạt động và rà soát minh chứng; mỗi thành viên trực tiếp cập nhật công việc và cung cấp minh chứng. **Huy phụ trách Scrum Burndown** từ dữ liệu tiến độ/ước lượng của nhóm.
- **Product Owner, Scrum Master, Development Team:** nhóm xác định vai trò cụ thể trong tài liệu Scrum; Leader không tự động đồng nghĩa với mọi vai trò.
- Sprint Planning, Daily Scrum, Sprint Review, Retrospective được ghi nhận xuyên suốt.
- Mỗi công việc có GitHub Issue, assignee, Task thầy giao, bước trong 24 bước, Acceptance Criteria, PR và minh chứng chạy/test.
- **Task 1–10 của thầy** và **24 bước nội bộ** đều phải được truy vết; không có Task nào được bỏ qua. Phân công theo Task giữ theo `docs/REQUIREMENTS_TRACEABILITY.md`: Hưng Task 1–4; Huy Task 5; Phát Task 6 (Khoa phối hợp kho); Khoa Task 7; Thắng Task 8; Task 9 do Phát/Thắng/Hưng phối hợp; Task 10 do Phát/Thắng/Khoa/Huy thực hiện theo module, Hưng tích hợp.
- Chỉ đánh dấu DONE khi có bằng chứng được nhóm chấp nhận. Không biến tài liệu kế hoạch thành tuyên bố đã triển khai.

## 7. Quy tắc cho Codex

Trước khi sửa code hoặc tài liệu, đọc `AGENTS.md`, `docs/PROJECT_CONTEXT.md`, `docs/PROJECT_ROADMAP.md`, file này và `docs/ARCHITECTURE.md`. Nếu phân công cũ trong Architecture mâu thuẫn, ghi rõ xung đột. Chỉ sửa module khác khi chủ module chấp thuận và có Issue/PR liên quan. Không tự động commit, push, reset database hay chạy destructive migration.
