# BrewLite — Hệ thống đặt đồ uống và thanh toán mô phỏng

> **Môn học:** Công nghệ phần mềm (Software Engineering) — Học kỳ I, năm học 2026–2027  
> **Trường:** Đại học Sài Gòn (SGU) — Khoa Công nghệ Thông tin  
> **Nhóm thực hiện:** 5 sinh viên  
> **Trạng thái:** Đang phát triển — bản mô tả đối chiếu với nhánh `main` ngày 20/10/2026

## 1. Tổng quan dự án

### 1.1. Tầm nhìn sản phẩm (Product Vision)

**BrewLite** hướng đến việc giúp khách hàng chọn đồ uống, đặt đơn và thanh toán không dùng tiền mặt theo hình thức mô phỏng, từ đó giảm thời gian xếp hàng và thuận tiện hơn khi nhận đồ tại quầy.

Dự án được xây dựng phục vụ **hai Assignment môn Công nghệ phần mềm**, kết hợp phân tích yêu cầu, mô hình hóa UML, thiết kế kiến trúc, phát triển ứng dụng và thực hành Agile Scrum.

### 1.2. Luồng nghiệp vụ mục tiêu

`Xem menu` → `Chọn size/topping` → `Giỏ hàng` → `Đăng nhập JWT` → `Đặt đơn` → `Thanh toán Ví/Thẻ mô phỏng` → `Theo dõi và nhận đồ tại quầy`

> **Phạm vi:** Thanh toán chỉ là **giả lập**; hệ thống không thu hoặc chuyển tiền thật, không cung cấp dịch vụ giao hàng. Chức năng quản lý cửa hàng đầy đủ nằm ngoài phạm vi MVP.

## 2. Phạm vi chức năng và tiến độ

Các nhóm chức năng cần triển khai:

| Nhóm | Chức năng mục tiêu |
| --- | --- |
| Menu & sản phẩm | Danh sách đồ uống, chi tiết sản phẩm, size và topping |
| Giỏ hàng | Thêm món, chỉnh số lượng, xóa món, tính tổng tiền |
| Tài khoản | Đăng ký, đăng nhập, đăng xuất và xác thực JWT |
| Đơn hàng | Tạo đơn, xem lịch sử/chi tiết, hủy theo quyền và trạng thái |
| Thanh toán | Ví/Thẻ mô phỏng, xử lý lặp yêu cầu và xác nhận kết quả |
| Khuyến mãi & điểm thưởng | Áp dụng mã giảm giá, tích lũy và xem điểm |
| Nghiệp vụ tại quầy | Cập nhật trạng thái đơn qua API có phân quyền |
| Tồn kho | Kiểm tra, giữ/hoàn tồn kho và hạn chế đặt vượt số lượng |

**Hiện trạng mã nguồn trên `main` (20/10/2026):**

| Thành phần | Đã có | Chưa hoàn thành |
| --- | --- | --- |
| Frontend | Trang `Hello BrewLite!` và nút thử kết nối API | Menu, giỏ hàng, checkout và các màn hình nghiệp vụ |
| Backend | API `GET /` trả lời chào; khung `ProductsModule` | API sản phẩm, xác thực, đơn hàng, thanh toán và các module nghiệp vụ |
| Database | Cấu hình PostgreSQL 17 trong Docker Compose | Prisma schema/migration và kết nối ứng dụng với database |
| Kiểm thử | Unit/E2E test cho API lời chào | Kiểm thử nghiệp vụ, tích hợp và end-to-end thực tế |
| Tài liệu | Có bản nháp Scope, SRS, ERD, API và UML | Review, thống nhất hợp đồng và nghiệm thu theo Assignment |

Bảng này mô tả **code đang có**, không phải toàn bộ tài liệu đã soạn. Theo dõi tiến độ và minh chứng mới nhất tại [Project Roadmap](docs/PROJECT_ROADMAP.md).

## 3. Kiến trúc và công nghệ

| Thành phần | Công nghệ | Trạng thái |
| --- | --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4 | Đã khởi tạo |
| Backend | NestJS 11, TypeScript, REST API/JSON | Đã khởi tạo |
| Database | PostgreSQL 17 | Đã cấu hình Docker Compose |
| ORM | Prisma | Dự kiến, chưa tích hợp |
| Xác thực | JWT | Dự kiến triển khai |
| Thanh toán | Mock Payment Service (Ví/Thẻ) | Dự kiến triển khai |
| DevOps | Docker Compose; GitHub Actions và triển khai cloud | Compose mới có PostgreSQL; CI/CD và production chưa hoàn thành |
| Cộng tác | Git, GitHub Issues, Pull Requests và tài liệu Scrum | Đang tổ chức theo kế hoạch nhóm |

**Kiến trúc định hướng:**

```text
Người dùng
   |
   v
Next.js (apps/web)
   |
   | HTTP/JSON
   v
NestJS REST API (apps/api)
   |
   | Prisma (dự kiến)
   v
PostgreSQL
```

Backend được thiết kế theo kiểu **modular monolith**: chia module theo nghiệp vụ trong một ứng dụng NestJS. Frontend không truy cập database trực tiếp. Sơ đồ trên là **kiến trúc mục tiêu**, không có nghĩa kết nối Prisma/PostgreSQL đã chạy.

Xem thêm [Architecture](docs/ARCHITECTURE.md).

## 4. Thành viên và tổ chức Agile Scrum

| Thành viên | Phạm vi phụ trách chính |
| --- | --- |
| **Hưng** — điều phối nhóm | Kiến trúc, tài liệu, Products/Options/Pricing, traceability, tích hợp và review |
| **Khoa** | Prisma/schema/migration, Auth/JWT, Inventory, Class Diagram và database tests |
| **Huy** | Menu/Cart/Checkout UI, Promotion/Loyalty, Activity Diagram, E2E và báo cáo Scrum |
| **Phát** | Checkout Use Case/Sequence, Orders/History, State Machine, quản lý backlog A1 và demo |
| **Thắng** | Payment mock/idempotency, Docker, CI/CD, triển khai, Deployment Diagram và NFR |

Đây là **phân công theo kế hoạch**, không phải phần việc đã nghiệm thu. Vai trò **Product Owner** và **Scrum Master** đang chờ cả nhóm xác nhận trong [Working Agreement](docs/scrum/team-working-agreement.md); không tự gán vai trò chính thức.

Nhóm dùng Issue, Sprint Backlog, Pull Request, review và bằng chứng kiểm thử để theo dõi công việc. Quy tắc hoàn thành (Definition of Done) và người phụ trách chi tiết được quản lý ở [Team Assignments](docs/TEAM_ASSIGNMENTS.md).

## 5. Kế hoạch theo hai Assignment

### 5.1. Assignment 1 — Xây dựng ứng dụng BrewLite (10 task)

| Nhóm việc dự kiến | Nội dung |
| --- | --- |
| Nền tảng & menu — Task 1–4 | Khởi tạo, API sản phẩm, giao diện menu và tùy chọn size/topping |
| Đặt hàng — Task 5–7 | Giỏ hàng, API tạo đơn và đăng ký/đăng nhập JWT |
| Thanh toán & hoàn thiện — Task 8–10 | Ví/Thẻ giả lập, xác nhận/lịch sử đơn, State Machine và nghiệp vụ nâng cao |

Cách nhóm các task ở trên **chỉ để định hướng lập Sprint**, không xác nhận nhóm đã chốt ba Sprint hoặc hoàn thành các task.

### 5.2. Assignment 2 — Requirements to Deployment

| Giai đoạn | Nội dung bàn giao mục tiêu |
| --- | --- |
| **Task 1 — Requirements** | Context, Stakeholders, Scope, SRS, FR/NFR, ưu tiên yêu cầu, Acceptance Criteria và Checkout Use Case |
| **Task 2 — UML** | Checkout Activity, Sequence và Domain Class Diagram |
| **Task 3 — Architecture** | Kiến trúc hệ thống, ADR và Deployment Diagram |
| **Task 4 — Sprint 1** | Repository/working rules, quản lý tài liệu, Menu MVP và CI |
| **Task 5 — Sprint 2 & Delivery** | MVP end-to-end, kiểm thử tích hợp/E2E, CD, triển khai và bàn giao |

**Nguyên tắc nghiệm thu:** Task 1 → Task 2 → Task 3 → Task 4 → Task 5. Tài liệu hoặc code được chuẩn bị trước không đồng nghĩa đã vượt qua bước nghiệm thu tương ứng. Trạng thái của từng task được cập nhật tại [Project Roadmap](docs/PROJECT_ROADMAP.md) và [Scrum Backlog](docs/scrum/backlog.md).

## 6. Cấu trúc repository

```text
Swe_project/
├── apps/
│   ├── web/                   # Next.js frontend
│   └── api/                   # NestJS backend
├── docs/                      # Yêu cầu, UML, kiến trúc, API, Scrum, phân công
├── scripts/                   # Các script hỗ trợ và kiểm tra tài liệu
├── .env.example               # Biến môi trường PostgreSQL mẫu
├── docker-compose.yml         # Hiện tại: PostgreSQL service db
├── package.json               # Script dev và build chung
├── start.sh                   # Script chạy frontend/backend trên Bash
└── README.md
```

Frontend, backend và thư mục gốc hiện có `package.json`/`package-lock.json` riêng. Cấu trúc này là **cấu trúc đang có**; những thư mục dự kiến như CI/CD workflow hoặc hệ thống test tích hợp không được liệt kê như đã tồn tại.

## 7. Cài đặt và chạy dự án

### 7.1. Yêu cầu môi trường

- Git; Node.js **24 LTS** và npm (khuyến nghị).
- Docker Engine/Desktop và Docker Compose; Docker daemon phải hoạt động.
- Các cổng mặc định: frontend `3000`, backend `3001`, PostgreSQL trên host `5433`.

### 7.2. Clone và cấu hình

```bash
git clone https://github.com/NguyenKhanhHungDev/Swe_project.git
cd Swe_project
```

**Linux/macOS (Bash/zsh)** — thực hiện khi các file môi trường chưa có:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

**Windows (PowerShell)** — thực hiện khi các file môi trường chưa có:

```powershell
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env.local
```

Các lệnh sao chép trên có thể ghi đè cấu hình hiện có; **không chạy lại khi đã tùy chỉnh `.env`**. Không commit mật khẩu hoặc file `.env` thật lên Git.

### 7.3. Cài đặt và khởi chạy

Chạy từ thư mục gốc:

```bash
npm ci
npm --prefix apps/api ci
npm --prefix apps/web ci
```

**Terminal 1 — PostgreSQL:**

```bash
docker compose up -d --wait db
```

**Terminal 2 — Frontend và backend:**

```bash
npm run dev
```

Trên PowerShell, dùng `npm.cmd` thay `npm` nếu bị chặn bởi Execution Policy.

| Dịch vụ | Địa chỉ local |
| --- | --- |
| Frontend | http://localhost:3000 |
| Backend API hiện có | http://localhost:3001/ |
| PostgreSQL | `localhost:5433` |

Mở frontend, chọn **Kiểm tra kết nối backend**. Backend hiện trả lời qua API lời chào; kết quả này **không kiểm tra kết nối database**.

Để dừng ứng dụng, nhấn `Ctrl+C` ở Terminal 2; sau đó chạy `docker compose stop db` tại gốc repo để dừng PostgreSQL nhưng giữ dữ liệu.

## 8. Kiểm thử và tiêu chí hoàn thành

Các lệnh hiện có (chạy sau khi cài dependencies):

```bash
npm --prefix apps/web run lint
npm --prefix apps/api test -- --runInBand
npm --prefix apps/api run test:e2e -- --runInBand
npm run build
```

Các bài test backend hiện tại chỉ kiểm tra chức năng cơ bản của scaffold. Khi hoàn thiện từng module, nhóm cần bổ sung kiểm thử phù hợp với Acceptance Criteria, kiểm thử tích hợp và end-to-end có bằng chứng.

Một task chỉ được xem là hoàn thành sau khi có **code/tài liệu tương ứng, kiểm thử phù hợp, review và minh chứng nghiệm thu** — không chỉ vì đã tạo file hoặc mở Pull Request.

## 9. Triển khai và bàn giao

| Hạng mục | Trạng thái ngày 20/10/2026 |
| --- | --- |
| Repository | [GitHub — Swe_project](https://github.com/NguyenKhanhHungDev/Swe_project) |
| Product Backlog | [Backlog trong repository](docs/scrum/backlog.md); Issue Board thật cần xác minh/cập nhật |
| Frontend production HTTPS | Chưa có URL đã xác minh |
| Backend production / Health endpoint | Chưa có URL/health endpoint đã xác minh |
| CI/CD | Chưa có pipeline triển khai hoàn chỉnh |
| Video demo và release bàn giao | Chưa có liên kết đã xác minh |

Khi hoàn thành các giai đoạn triển khai, nhóm cập nhật **đường dẫn thật**, kết quả CI/CD, hướng dẫn vận hành và demo tại đây. Không sử dụng tên miền `example.com` làm liên kết nghiệm thu.

## 10. Tài liệu dự án

| Tài liệu | Nội dung |
| --- | --- |
| [Project Context](docs/PROJECT_CONTEXT.md) | Bối cảnh, phạm vi và hiện trạng |
| [Project Scope](docs/PROJECT_SCOPE.md) | Phạm vi chức năng và giới hạn |
| [SRS](docs/SRS.md) | Đặc tả yêu cầu phần mềm |
| [User Stories](docs/USER_STORIES.md) · [Acceptance Criteria](docs/ACCEPTANCE_CRITERIA.md) | Câu chuyện người dùng và điều kiện nghiệm thu |
| [Business Rules](docs/BUSINESS_RULES.md) · [Use Cases](docs/USE_CASES.md) | Quy tắc và ca sử dụng |
| [Architecture](docs/ARCHITECTURE.md) | Thiết kế kiến trúc |
| [Project Roadmap](docs/PROJECT_ROADMAP.md) | Kế hoạch và trạng thái A1/A2 |
| [Requirements Traceability](docs/REQUIREMENTS_TRACEABILITY.md) | Liên kết Requirements → Design → Code → Test |
| [Team Assignments](docs/TEAM_ASSIGNMENTS.md) | Phân công và phối hợp |
| [Scrum Backlog](docs/scrum/backlog.md) · [Working Agreement](docs/scrum/team-working-agreement.md) | Quản lý công việc và quy tắc cộng tác |

---

**BrewLite — Đồ án Công nghệ phần mềm, Đại học Sài Gòn · Năm học 2026–2027**
