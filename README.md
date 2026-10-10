# BrewLite

BrewLite là đồ án môn Công nghệ Phần mềm của nhóm năm sinh viên. Dự án hướng tới
ứng dụng web đặt đồ uống để khách nhận tại quầy, với thanh toán **mô phỏng**;
không xử lý tiền thật hoặc giao hàng.

README phân biệt những gì có trong mã nguồn trên nhánh hiện tại với thiết kế dự
kiến. Tài liệu thiết kế và phân công không tự chứng minh chức năng đã chạy hoặc
đã được nghiệm thu.

## Trạng thái và phạm vi chức năng

**Đã có trong mã nguồn:** bộ khung Next.js và NestJS, trang “Hello BrewLite!”,
nút gọi backend, API `GET /` trả về `Hello from BrewLite backend!`, cấu hình CORS,
file môi trường mẫu, script chạy chung, cấu hình lint/build, cùng unit test và
E2E test cho API lời chào. `ProductsModule` hiện chỉ là module rỗng.
Docker Compose đã khai báo PostgreSQL 17 với healthcheck và volume lưu dữ liệu.
Các test hiện có chưa kiểm tra nghiệp vụ đặt hàng.

**Theo kế hoạch, chưa được xác minh là đã triển khai:**

- Xem menu, chi tiết đồ uống, chọn size/topping và số lượng.
- Giỏ hàng, đăng ký/đăng nhập, phân quyền khách hàng và nhân viên.
- Tạo, theo dõi, hủy đơn và quản lý tồn kho.
- Khuyến mãi, điểm thưởng và thanh toán giả lập.
- Prisma schema/migration/seed, kết nối backend với PostgreSQL.
- Đóng gói frontend/backend bằng Docker và chạy đủ ba dịch vụ bằng Compose.

Theo [lộ trình 24 bước](docs/PROJECT_ROADMAP.md), tài liệu cho bước 1–6 cần đối
chiếu minh chứng chính thức; bước 7 có khung môi trường; bước 8 có bản thiết kế
để review; bước 9 đang chuẩn bị. Không coi các mốc này là trạng thái nghiệm thu.

## Công nghệ và kiến trúc

| Thành phần | Hiện trạng / định hướng |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 theo `frontend/package.json` |
| Backend | NestJS 11 và TypeScript theo `backend/package.json` |
| Database phát triển | PostgreSQL 17 Alpine trong Docker Compose; backend chưa truy vấn database |
| ORM | Prisma **dự kiến**, chưa có dependency, schema hoặc tích hợp trong backend |
| Công cụ | npm, Git và GitHub; Compose hiện chỉ chạy PostgreSQL |

Thiết kế đích là **modular monolith**: một ứng dụng Next.js gọi REST API/JSON
của một backend NestJS chia module nghiệp vụ. Backend dự kiến dùng Prisma để
truy cập PostgreSQL; frontend không truy cập database trực tiếp. Đây là mô hình
kiến trúc được mô tả trong [ARCHITECTURE.md](docs/ARCHITECTURE.md), chưa phải
cam kết rằng toàn bộ module/API nghiệp vụ đã tồn tại.

## Cấu trúc repository

| Đường dẫn | Vai trò |
| --- | --- |
| `frontend/src/app/` | Trang và giao diện Next.js hiện có |
| `backend/src/` | Ứng dụng NestJS, API lời chào và module Products rỗng |
| `backend/test/` | E2E test cho API lời chào |
| `docs/` | Bối cảnh, kiến trúc, lộ trình, phân công và truy vết yêu cầu |
| `docker-compose.yml` | Dịch vụ `db` PostgreSQL, healthcheck và named volume |
| `package.json` | Script chạy đồng thời và build hai ứng dụng |
| `.env.example` | Mẫu biến môi trường cho Compose |
| `backend/.env.example` | Mẫu biến môi trường cho NestJS |
| `frontend/.env.example` | Mẫu biến môi trường cho Next.js |

Gốc repository, `backend/` và `frontend/` có `package.json` và lockfile riêng;
cần cài dependencies ở cả ba vị trí.

## Quick Start

Cần Git, Node.js, npm, Docker và Docker Compose. Repository chưa khóa phiên bản
Node/npm bằng `engines` hoặc `.nvmrc`. Các lệnh dưới đây dành cho Linux/macOS
hoặc Git Bash trên Windows và chạy từ thư mục gốc dự án.

```bash
git clone https://github.com/NguyenKhanhHungDev/Swe_project.git
cd Swe_project
```

Tạo **đủ ba file** môi trường từ mẫu; lệnh không ghi đè file đã tồn tại:

```bash
[ -f .env ] || cp .env.example .env
[ -f backend/.env ] || cp backend/.env.example backend/.env
[ -f frontend/.env.local ] || cp frontend/.env.example frontend/.env.local
```

Kiểm tra các giá trị trong ba file cho máy của bạn, sau đó cài dependencies:

```bash
npm ci
npm --prefix backend ci
npm --prefix frontend ci
```

Khởi động PostgreSQL trước, rồi chạy frontend và backend bằng npm:

```bash
docker compose config --quiet
docker compose up -d --wait db
docker compose ps
npm run dev
```

Script `npm run dev` dùng `concurrently`: frontend mặc định tại
<http://localhost:3000>, backend tại <http://localhost:3001>. Mở frontend và
bấm **Kiểm tra kết nối backend**; khi thành công, giao diện hiển thị câu trả lời
của `GET /`. Dừng hai ứng dụng bằng `Ctrl+C` trong terminal chạy npm. Backend
hiện không cần truy vấn database để trả API lời chào.

## Biến môi trường và PostgreSQL

| File | Biến trong file mẫu | Cách dùng |
| --- | --- | --- |
| `.env` | `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT` | Compose khởi tạo database và mở cổng trên máy |
| `backend/.env` | `PORT`, `FRONTEND_URL`, `DATABASE_URL` | Cổng NestJS, origin CORS và chuỗi kết nối dự kiến |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | Địa chỉ backend được đưa tới trình duyệt |

Theo file mẫu, Compose chỉ chạy dịch vụ `db`, ánh xạ cổng PostgreSQL trong
container (`5432`) sang `127.0.0.1:5433` trên máy. Backend chạy trên máy nên
`DATABASE_URL` mẫu dùng `localhost:5433`; biến này hiện được chuẩn bị nhưng
**chưa được code sử dụng để kết nối database**. Nếu thay cổng hoặc thông tin
khởi tạo, cập nhật cấu hình tương ứng ở cả `.env` và `backend/.env`.

`postgres_data` là named volume giữ dữ liệu khi container được tạo lại. Đổi tên
database, user hoặc mật khẩu trong `.env` không tự đổi dữ liệu đã khởi tạo trong
volume. Dùng các lệnh sau để xem trạng thái, log và dừng database:

```bash
docker compose ps
docker compose logs --tail=100 db
docker compose stop db
```

Không dùng `docker compose down -v` để dừng thông thường vì tùy chọn `-v` xóa
volume dữ liệu. Không commit các file môi trường riêng. Các giá trị trong
`.env.example` chỉ dành cho phát triển local; thay bằng giá trị phù hợp với máy
của bạn. Biến `NEXT_PUBLIC_` hiển thị ở trình duyệt, không chứa mật khẩu,
`DATABASE_URL` hoặc bí mật khác. Khởi động lại ứng dụng sau khi đổi cấu hình.

## Lint, test và build

Chạy từ thư mục gốc sau khi cài dependencies:

```bash
npm --prefix frontend run lint
npm --prefix backend run lint
npm --prefix backend test -- --runInBand
npm --prefix backend run test:e2e -- --runInBand
npm run build
```

`backend` lint có `--fix` và có thể sửa file; kiểm tra `git diff` sau khi chạy.
Repository chưa có script test frontend. Test backend hiện chỉ kiểm tra API lời
chào; kết quả đạt không đồng nghĩa nghiệp vụ đã được kiểm thử. `npm run build`
build backend trước, sau đó frontend. Dừng server phát triển nếu build gặp lỗi
do tiến trình cùng dùng thư mục đầu ra.

## Xử lý lỗi thường gặp

| Hiện tượng | Kiểm tra |
| --- | --- |
| `concurrently`, `nest` hoặc `next` không tìm thấy | Chạy `npm ci` ở gốc, backend hoặc frontend tương ứng |
| Compose báo thiếu `POSTGRES_*` | Tạo `.env` ở gốc từ `.env.example` và kiểm tra biến cần thiết |
| Cổng `3000`, `3001` hoặc `5433` bị chiếm | Dừng tiến trình cũ; nếu đổi cổng, đồng bộ các file môi trường |
| Frontend báo thiếu `NEXT_PUBLIC_API_URL` | Kiểm tra `frontend/.env.local` và khởi động lại frontend |
| Nút kết nối báo `Failed to fetch` | Kiểm tra backend tại `localhost:3001`, URL API và `FRONTEND_URL` cho CORS |
| Database chưa `healthy` | Xem `docker compose ps` và `docker compose logs --tail=100 db` |
| `npm ci` báo lockfile không khớp | Báo người cập nhật dependency đồng bộ `package.json` và lockfile đúng thư mục |

## Nhóm và tài liệu

| Thành viên | Phạm vi phụ trách theo kế hoạch |
| --- | --- |
| Hưng (leader) | Products, ERD, PrismaService, Docker và tích hợp |
| Khoa | Auth, Users, RBAC và Inventory |
| Huy | Cart, Promotions, Loyalty và tổng hợp kiểm thử |
| Phát | Orders, schema/migration/seed và điều phối Figma |
| Thắng | Checkout, Payments, Deployment Diagram và E2E |

Chi tiết chủ trì, người trực tiếp thực hiện và phối hợp ở từng bước xem
[TEAM_ASSIGNMENTS.md](docs/TEAM_ASSIGNMENTS.md). Bảng trên là **phân công**, không
phải danh sách tính năng đã hoàn thành.

- [PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md): phạm vi và bối cảnh dự án.
- [PROJECT_ROADMAP.md](docs/PROJECT_ROADMAP.md): 24 bước, trạng thái tham khảo và minh chứng cần có.
- [REQUIREMENTS_TRACEABILITY.md](docs/REQUIREMENTS_TRACEABILITY.md): truy vết 10 Task của đề bài.
- [ARCHITECTURE.md](docs/ARCHITECTURE.md): kiến trúc, ranh giới module và nguyên tắc kỹ thuật.
- [TEAM_ASSIGNMENTS.md](docs/TEAM_ASSIGNMENTS.md): phân công nhóm.

SRS, User Stories, Acceptance Criteria và Business Rules cần được bổ sung hoặc
liên kết với nguồn chính thức khi nhóm chốt. Theo dõi tiến độ bằng minh chứng và
quy trình review trong lộ trình; README chỉ mô tả trạng thái có thể đối chiếu từ
repository tại thời điểm cập nhật.
