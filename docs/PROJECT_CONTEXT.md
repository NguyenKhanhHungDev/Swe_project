
# BrewLite - Project Context

## 1. Project overview

BrewLite là đồ án Công nghệ phần mềm được phát triển
bởi nhóm 5 sinh viên.

Mục tiêu là xây dựng ứng dụng web đặt đồ uống với
giao diện khách hàng và các API xử lý nghiệp vụ.

## 2. Technology stack

- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS 4
- Backend: NestJS 11, TypeScript
- Database: PostgreSQL 17
- ORM: Prisma (planned, not yet integrated)
- Development: Docker Compose hiện chỉ cấu hình PostgreSQL; frontend/backend chạy bằng npm
- Version control: Git and GitHub

## 3. Business scope

Các chức năng được mô tả trong tài liệu kiến trúc:

- Xem menu và chi tiết sản phẩm.
- Chọn size, topping và số lượng.
- Quản lý giỏ hàng.
- Đăng ký và đăng nhập.
- Tạo và theo dõi đơn hàng.
- Thanh toán giả lập.
- Quản lý tồn kho.
- Khuyến mãi.
- Điểm thưởng.
- Các thao tác xử lý đơn được phân quyền cho STAFF.

Không triển khai thanh toán thật hoặc giao hàng.

## 4. Architecture

Kiến trúc: Modular Monolith.

Data flow:

Next.js Frontend
    |
    | REST API / JSON
    v
NestJS Backend
    |
    | Prisma (planned)
    v
PostgreSQL

Frontend không truy cập trực tiếp database.

Backend chịu trách nhiệm xác thực, phân quyền,
kiểm tra dữ liệu và tính toán nghiệp vụ chính thức.

Tham khảo: [ARCHITECTURE.md](ARCHITECTURE.md).

## 5. Current implementation status

Đối chiếu mã nguồn và cấu hình trong repository:

- Frontend có trang Hello và nút gọi API lời chào của backend.
- Backend có `GET /` trả lời chào; `ProductsModule` hiện là module rỗng.
- Docker Compose chỉ khai báo PostgreSQL 17 với healthcheck và volume;
  frontend/backend chạy bằng npm, chưa được đóng gói vào Compose.
- Prisma chưa có dependency, schema hoặc tích hợp truy vấn database.
- Unit test và E2E test hiện có chỉ kiểm tra API lời chào;
  các chức năng nghiệp vụ chưa được xác minh là đã triển khai đầy đủ.

Đây là kết quả đối chiếu file, không phải kết quả chạy/test mới nhất
hoặc xác nhận nghiệm thu. Trạng thái từng bước tham khảo tại
[PROJECT_ROADMAP.md](PROJECT_ROADMAP.md); không suy ra DONE từ việc có file.

Codex phải kiểm tra repository trước khi
đưa ra kết luận về tiến độ thực tế.

## 6. Team collaboration

Nhóm gồm 5 thành viên:

- Hưng
- Khoa
- Huy
- Phát
- Thắng

Phân công chính thức tham khảo tại [TEAM_ASSIGNMENTS.md](TEAM_ASSIGNMENTS.md);
trách nhiệm module và quyết định kỹ thuật tại [ARCHITECTURE.md](ARCHITECTURE.md).

Mọi thay đổi phân công cần được nhóm xác nhận.

## 7. Important engineering rules

- Đọc yêu cầu trước khi code.
- Tuân thủ AGENTS.md.
- Không tự ý thay đổi API Contract.
- Không thay đổi schema khi chưa thống nhất.
- Không push trực tiếp lên main.
- Không đưa secrets vào repository.
- Không coi thiết kế dự kiến là code đã hoàn thành.
- Kiểm thử các nghiệp vụ quan trọng.

## 8. Documentation sources

- [README.md](../README.md): Giới thiệu, cài đặt, chạy và sử dụng dự án.
- [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md): 24 bước, sản phẩm và trạng thái tham khảo.
- [TEAM_ASSIGNMENTS.md](TEAM_ASSIGNMENTS.md): Chủ trì, người trực tiếp làm và phối hợp.
- [REQUIREMENTS_TRACEABILITY.md](REQUIREMENTS_TRACEABILITY.md): Liên kết 10 Task với các bước và minh chứng cần có.
- [ARCHITECTURE.md](ARCHITECTURE.md): Kiến trúc và trách nhiệm module.
- [AGENTS.md](../AGENTS.md): Quy tắc làm việc với Codex.
- [frontend/AGENTS.md](../frontend/AGENTS.md): Hướng dẫn Next.js.

Các tài liệu gốc Project Scope, SRS, User Stories, Acceptance Criteria,
Business Rules, Use Case Diagram và Use Case Description chưa có trong
repository; cần bổ sung hoặc liên kết nguồn chính thức khi nhóm cung cấp.

Không tự tạo quy tắc nghiệp vụ thay thế
tài liệu đã được nhóm phê duyệt.

## 9. Codex instructions

Khi được yêu cầu làm việc với BrewLite:

1. Đọc AGENTS.md.
2. Đọc PROJECT_CONTEXT.md.
3. Đọc tài liệu liên quan.
4. Kiểm tra code thực tế.
5. Giải thích bằng tiếng Việt.
6. Đề xuất giải pháp trước khi sửa.
7. Chỉ chỉnh sửa khi được yêu cầu.
8. Kiểm tra và báo cáo kết quả.

Luôn phân biệt:
- Đã xác minh.
- Theo tài liệu thiết kế.
- Chưa triển khai.
- Chưa kiểm chứng.
