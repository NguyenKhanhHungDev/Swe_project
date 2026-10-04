# BrewLite

Đồ án môn Công nghệ Phần mềm của nhóm 5 thành viên.

BrewLite là ứng dụng đặt đồ uống và thanh toán không tiền mặt,
phục vụ khách nhận đồ tại quầy. Thanh toán được mô phỏng,
không sử dụng tiền thật.

## 1. Công nghệ

- Frontend: Next.js, React, TypeScript, Tailwind CSS.
- Backend: NestJS, TypeScript.
- Database theo thiết kế: PostgreSQL, chưa tích hợp trong bộ khung hiện tại.
- Quản lý thư viện: npm.
- Quản lý mã nguồn: Git và GitHub.

Môi trường phát triển thống nhất: Node.js 24.x và npm 11.x.

## 2. Trạng thái hiện tại

Đã có:

- Bộ khung frontend và backend.
- Trang Hello BrewLite.
- API `GET /`, trả về `Hello from BrewLite backend!`.
- Nút kiểm tra kết nối từ frontend đến backend.
- Cấu hình CORS và file môi trường mẫu.
- Lệnh chạy đồng thời frontend và backend.
- Unit test và E2E test cơ bản cho API lời chào.
- Cấu hình lint và build cho hai ứng dụng.

Chưa triển khai:

- Kết nối PostgreSQL và schema dữ liệu.
- Menu, chi tiết đồ uống và tùy chọn.
- Giỏ hàng và khuyến mãi.
- Tài khoản và xác thực.
- Đơn hàng, tồn kho và trạng thái đơn.
- Thanh toán mô phỏng, lịch sử đơn và điểm thưởng.
- Docker và triển khai hệ thống.

Các bài test hiện tại chỉ kiểm tra bộ khung, chưa kiểm tra nghiệp vụ.

## 3. Cấu trúc dự án

| Đường dẫn | Nội dung |
| --- | --- |
| `frontend/` | Ứng dụng Next.js |
| `backend/` | API NestJS |
| `frontend/.env.example` | Cấu hình mẫu frontend |
| `backend/.env.example` | Cấu hình mẫu backend |
| `package.json` | Lệnh chạy và build toàn bộ dự án |
| `package-lock.json` | Khóa phiên bản thư viện tại thư mục gốc |
| `.gitignore` | Quy tắc bỏ qua file khi dùng Git |
| `README.md` | Hướng dẫn cài đặt, chạy và kiểm tra |

Mỗi ứng dụng có `package.json` và `package-lock.json` riêng.
Thư viện tại gốc phục vụ việc chạy chung hai ứng dụng.

## 4. Chuẩn bị môi trường

Cài Node.js, npm và Git, sau đó kiểm tra:

```bash
node --version
npm --version
git --version
```

Các lệnh shell dưới đây dùng cho Linux/macOS hoặc Git Bash trên Windows.

## 5. Cài đặt lần đầu

Clone repository:

```bash
git clone https://github.com/NguyenKhanhHungDev/Swe_project.git
cd Swe_project
```

Cài thư viện tại gốc và trong hai ứng dụng:

```bash
npm ci
npm --prefix backend ci
npm --prefix frontend ci
```

Tạo cấu hình riêng nếu chưa có:

```bash
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env.local ]; then
  cp frontend/.env.example frontend/.env.local
fi
```

Các lệnh này không ghi đè file cấu hình đã tồn tại.

## 6. Biến môi trường

File `backend/.env`:

```dotenv
PORT=3001
FRONTEND_URL=http://localhost:3000
```

File `frontend/.env.local`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Ý nghĩa:

| Biến | Công dụng |
| --- | --- |
| `PORT` | Cổng chạy backend |
| `FRONTEND_URL` | Origin frontend được phép gọi API qua CORS |
| `NEXT_PUBLIC_API_URL` | Địa chỉ backend mà trình duyệt gọi |

Khởi động lại ứng dụng sau khi thay đổi cấu hình.

Không commit `.env` hoặc `.env.local`.
Chỉ commit `.env.example` với giá trị mẫu không chứa bí mật.

Biến có tiền tố `NEXT_PUBLIC_` được đưa ra phía trình duyệt,
không dùng để chứa mật khẩu hoặc khóa bí mật.

## 7. Chạy dự án

Từ thư mục gốc:

```bash
npm run dev
```

Lệnh này dùng `concurrently` để chạy:

- Backend: http://localhost:3001
- Frontend: http://localhost:3000

Nhấn `Ctrl+C` tại terminal đang chạy để dừng.

Không chạy thêm một bản ứng dụng trên cùng cổng.

Nếu cần chạy riêng để kiểm tra lỗi, mở hai terminal tại thư mục gốc.

Terminal backend:

```bash
npm --prefix backend run start:dev
```

Terminal frontend:

```bash
npm --prefix frontend run dev -- --port 3000
```

Nếu dùng VS Code, có thể chọn cấu hình
“Chạy toàn bộ BrewLite” trong Run and Debug sau khi hoàn tất cài đặt.

## 8. Kiểm tra kết nối

1. Mở http://localhost:3001.
2. Kiểm tra nội dung `Hello from BrewLite backend!`.
3. Mở http://localhost:3000.
4. Bấm “Kiểm tra kết nối backend”.
5. Kiểm tra thông báo:

```text
Backend phản hồi: Hello from BrewLite backend!
```

## 9. Lint, test và build

Chạy các lệnh sau từ thư mục gốc.

Lint backend:

```bash
npm --prefix backend run lint
```

Script này có `--fix`, có thể tự chỉnh định dạng mã nguồn.
Kiểm tra thay đổi bằng `git diff` trước khi commit.

Lint frontend:

```bash
npm --prefix frontend run lint
```

Unit test backend:

```bash
npm --prefix backend test -- --runInBand
```

E2E test backend:

```bash
npm --prefix backend run test:e2e -- --runInBand
```

Build toàn bộ dự án:

```bash
npm run build
```

Dừng server phát triển trước khi build.
Lệnh build chạy backend trước, sau đó frontend.

Trước khi đề nghị merge, cần bảo đảm lint, test và build đều đạt.

## 10. Quy ước làm việc nhóm

- Tạo nhánh riêng từ `main` đã cập nhật để thực hiện công việc.
- Không đưa thay đổi chưa kiểm tra trực tiếp lên `main`.
- Tạo Pull Request để nhóm xem xét trước khi merge.
- Commit rõ nội dung và giới hạn trong công việc đang thực hiện.
- Khi thay đổi thư viện, commit cả `package.json` và
  `package-lock.json` ở đúng thư mục.
- Sau khi lấy thay đổi có cập nhật thư viện, chạy `npm ci`
  trong thư mục tương ứng.
- Không commit `node_modules`, kết quả build, file môi trường riêng
  hoặc thông tin bí mật.

## 11. Lỗi thường gặp

| Hiện tượng | Cách xử lý |
| --- | --- |
| `concurrently: not found` | Chạy `npm ci` tại thư mục gốc |
| `nest: not found` | Chạy `npm --prefix backend ci` |
| `next: not found` | Chạy `npm --prefix frontend ci` |
| Không tìm thấy `package.json` | Kiểm tra vị trí hiện tại bằng `pwd` |
| Không tìm thấy file mẫu backend | Kiểm tra `backend/.env.example` |
| Thiếu `NEXT_PUBLIC_API_URL` | Kiểm tra `frontend/.env.local`, rồi khởi động lại frontend |
| `Failed to fetch` | Kiểm tra backend, địa chỉ API và cấu hình CORS |
| Cổng đang được sử dụng | Dừng tiến trình ứng dụng cũ trước khi chạy lại |
| Test sai chuỗi phản hồi | Đối chiếu kết quả API với giá trị mong đợi trong test |
| `npm ci` báo manifest và lockfile không khớp | Người thay đổi thư viện cập nhật lockfile bằng `npm install` tại đúng thư mục và commit cả hai file |