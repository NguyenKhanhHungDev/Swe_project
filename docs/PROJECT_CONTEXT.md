
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
- Development: Docker Compose
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

Reference: docs/ARCHITECTURE.md

## 5. Current implementation status

Theo tài liệu kiến trúc cập nhật 05/10/2026:

- Đã chuẩn bị khung frontend/backend.
- Đã có cấu hình PostgreSQL bằng Docker.
- Đã thiết lập tài liệu kiến trúc.
- Prisma chưa được tích hợp.
- Các chức năng nghiệp vụ chưa được xác minh
  là đã triển khai đầy đủ.

Đây là trạng thái theo tài liệu, không phải
kết quả kiểm thử mới nhất.

Codex phải kiểm tra repository trước khi
đưa ra kết luận về tiến độ thực tế.

## 6. Team collaboration

Nhóm gồm 5 thành viên:

- Hưng
- Khoa
- Huy
- Phát
- Thắng

Phân công kỹ thuật tham khảo tại:
docs/ARCHITECTURE.md

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

- README.md: Cài đặt và vận hành dự án.
- docs/ARCHITECTURE.md: Kiến trúc và trách nhiệm.
- AGENTS.md: Quy tắc làm việc với Codex.
- frontend/AGENTS.md: Hướng dẫn Next.js.

Các tài liệu SRS, User Stories, Acceptance
Criteria và Business Rules cần được bổ sung
hoặc liên kết khi có nguồn chính thức.

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
