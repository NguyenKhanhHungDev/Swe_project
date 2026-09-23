
# BrewLite

Đồ án môn Công nghệ Phần mềm: ứng dụng đặt cà phê và thanh toán không tiền mặt.

## 1. Công nghệ

- Frontend: Next.js 16, React, TypeScript, Tailwind CSS.
- Backend: NestJS 11, TypeScript.
- Công cụ quản lý thư viện: npm.
- Quản lý mã nguồn: Git và GitHub.
- Môi trường khuyến nghị: Node.js 24 LTS.

## 2. Chức năng hiện tại

- Frontend hiển thị trang Hello BrewLite.
- Backend cung cấp GET /, trả về Hello World!
- Frontend có nút kiểm tra kết nối đến backend.
- Có cấu hình môi trường mẫu cho cả hai ứng dụng.

## 3. Cấu trúc dự án

| Đường dẫn | Nội dung |
| --- | --- |
| frontend/ | Mã nguồn giao diện Next.js |
| backend/ | Mã nguồn API NestJS |
| frontend/.env.example | Cấu hình mẫu frontend |
| backend/.env.example | Cấu hình mẫu backend |
| .gitignore | Quy tắc bỏ qua file khi dùng Git |
| README.md | Hướng dẫn cài đặt và chạy dự án |

## 4. Chuẩn bị

Cài Node.js, npm và Git. Kiểm tra trong terminal:

```bash
node -v
npm -v
git --version
```

## 5. Cài đặt lần đầu

Các lệnh dưới đây dành cho Linux/macOS.

Clone repository và mở thư mục dự án:

```bash
git clone https://github.com/NguyenKhanhHungDev/Swe_project.git
cd Swe_project
```

Cài thư viện backend và tạo cấu hình riêng:

```bash
cd backend
npm ci
cp -n .env.example .env
cd ..
```

Cài thư viện frontend và tạo cấu hình riêng:

```bash
cd frontend
npm ci
cp -n .env.example .env.local
cd ..
```

Lệnh cp -n giữ lại cấu hình riêng nếu file đích đã tồn tại.
Trên Windows Command Prompt, dùng copy thay cp -n và chỉ sao chép khi chưa có file đích.

## 6. Biến môi trường

File backend/.env:

```dotenv
PORT=3001
FRONTEND_URL=http://localhost:3000
```

File frontend/.env.local:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Sau khi thay đổi cấu hình, khởi động lại server tương ứng.

Các biến NEXT_PUBLIC_* có thể được đọc ở trình duyệt,
vì vậy không dùng chúng để chứa mật khẩu hoặc khóa bí mật.

## 7. Chạy dự án

Mở hai terminal riêng, mỗi terminal bắt đầu ở thư mục gốc dự án.

Terminal 1 — backend:

```bash
cd backend
npm run start:dev
```

Terminal 2 — frontend:

```bash
cd frontend
npm run dev -- --port 3000
```

Địa chỉ:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

Nhấn Ctrl+C trong từng terminal để dừng ứng dụng.

## 8. Kiểm tra hoạt động

1. Mở http://localhost:3001 — thấy Hello World!
2. Mở http://localhost:3000 — thấy trang Hello BrewLite!
3. Bấm "Kiểm tra kết nối backend".
4. Kết quả mong đợi: Backend phản hồi: Hello World!

## 9. Kiểm tra build

Dừng server phát triển trước khi build.

Từ thư mục gốc, kiểm tra backend:

```bash
cd backend
npm run build
cd ..
```

Kiểm tra frontend:

```bash
cd frontend
npm run build
cd ..
```

Nếu lệnh build báo lỗi, xử lý lỗi trước khi bàn giao.

## 10. Quy ước Git

Đưa lên Git:

- Mã nguồn frontend và backend.
- package.json và package-lock.json của từng ứng dụng.
- Các file .env.example.
- README.md và các file cấu hình dự án.

Bỏ qua:

- node_modules/
- .next/
- dist/
- backend/.env
- frontend/.env.local

Khi thêm thư viện, commit cả thay đổi package.json
và package-lock.json. Các thành viên khác dùng npm ci
để cài theo lockfile.

## 11. Lỗi thường gặp

| Lỗi | Cách kiểm tra |
| --- | --- |
| Không tìm thấy npm hoặc node | Kiểm tra cài đặt Node.js và mở lại terminal |
| Không tìm thấy package.json | Chạy lệnh npm trong frontend hoặc backend |
| Cổng đang được sử dụng | Dừng server cũ trước khi chạy lại |
| Failed to fetch | Kiểm tra backend đang chạy, URL API và cấu hình CORS |
| Thiếu NEXT_PUBLIC_API_URL | Kiểm tra frontend/.env.local rồi khởi động lại frontend |