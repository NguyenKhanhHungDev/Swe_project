# BrewLite frontend

Ứng dụng Next.js 16, React 19, TypeScript và Tailwind CSS 4 của đồ án BrewLite.
Hiện mã nguồn có trang “Hello BrewLite!” và nút gọi API lời chào từ backend;
các màn hình nghiệp vụ trong [kiến trúc](../docs/ARCHITECTURE.md) là kế hoạch,
chưa được xác nhận đã triển khai.

Để chạy **toàn bộ dự án**, gồm PostgreSQL trong Docker Compose và hai ứng dụng
chạy bằng npm, xem [hướng dẫn theo hệ điều hành ở README gốc](../README.md).
Từ thư mục `frontend/`, có thể chạy riêng giao diện sau khi cài dependencies:

```bash
npm ci
[ -f .env.local ] || cp .env.example .env.local
npm run dev -- --port 3000
```

`NEXT_PUBLIC_API_URL` trong `.env.local` phải trỏ tới backend đang chạy; mẫu
sử dụng `http://localhost:3001`. Backend cho phép origin frontend qua cấu hình
`FRONTEND_URL`. Biến có tiền tố `NEXT_PUBLIC_` hiển thị trong trình duyệt, không
được chứa mật khẩu hoặc chuỗi kết nối database.

```bash
npm run lint
npm run build
```

Hiện `frontend/package.json` chưa có script test. Phân công giao diện theo module
xem [TEAM_ASSIGNMENTS.md](../docs/TEAM_ASSIGNMENTS.md), tiến độ xem
[PROJECT_ROADMAP.md](../docs/PROJECT_ROADMAP.md). Trước khi sửa mã Next.js,
đọc [AGENTS.md](AGENTS.md) của thư mục này.
