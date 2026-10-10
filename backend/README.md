# BrewLite backend

API NestJS 11 và TypeScript của đồ án BrewLite. Trên nhánh hiện tại, backend có
`GET /` trả về `Hello from BrewLite backend!`; `ProductsModule` mới là module
rỗng. Các API nghiệp vụ trong [kiến trúc](../docs/ARCHITECTURE.md) là thiết kế,
chưa được xác nhận đã triển khai. Prisma và kết nối PostgreSQL vẫn là kế hoạch.

Để chuẩn bị cả ba file môi trường, chạy PostgreSQL bằng Docker Compose và khởi
động hai ứng dụng, xem [hướng dẫn theo hệ điều hành ở README gốc](../README.md).
Từ thư mục `backend/`, có thể chạy riêng API:

```bash
npm ci
[ -f .env ] || cp .env.example .env
npm run start:dev
```

File `.env` mẫu đặt `PORT`, `FRONTEND_URL` cho CORS và `DATABASE_URL` dự kiến.
Backend hiện chưa dùng `DATABASE_URL` để truy vấn database. Không commit file
`.env` hoặc đưa thông tin bí mật vào tài liệu.

Các lệnh kiểm tra hiện có:

```bash
npm run test -- --runInBand
npm run test:e2e -- --runInBand
npm run build
```

Unit test và E2E test hiện có chỉ kiểm tra API lời chào, không chứng minh nghiệp
vụ đặt hàng. Script `npm run lint` có `--fix` và có thể sửa file, nên kiểm tra
diff sau khi chạy. Phân công backend xem
[TEAM_ASSIGNMENTS.md](../docs/TEAM_ASSIGNMENTS.md), tiến độ và minh chứng xem
[PROJECT_ROADMAP.md](../docs/PROJECT_ROADMAP.md).
