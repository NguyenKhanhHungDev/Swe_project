# BrewLite — Kiểm chứng Buổi 1 ngày 20/10/2026

Base: origin/main 1cc2bb1; nhánh docs/day1-assignment-alignment. Node v26.11.1; dùng dependencies local sẵn có, không thay package/lockfile. Không khởi động/sửa database, không chạy migration/deploy, không đọc/in giá trị .env. Next build tự đọc .env.local theo cơ chế ứng dụng; log không in giá trị biến.

| Lệnh | Kết quả thực chạy |
|---|---|
| npm run build | PASS exit 0: Nest build và Next 16.3.6 production build, TypeScript/static pages đạt |
| npm --prefix apps/api test -- --runInBand | PASS exit 0: 1 suite, 1 Hello unit test |
| npm --prefix apps/api run test:e2e -- --runInBand | PASS exit 0: 1 suite, 1 Hello API E2E test |
| npm --prefix apps/web run lint | PASS exit 0 |
| node scripts/check-huy-docs.mjs | PASS exit 0: 10 JSON, 52 link nội bộ, 17 bảng |
| git diff --check | PASS exit 0 |
| node scripts/check-day1-docs.mjs | PASS exit 0: 72 Markdown, 513 local links/anchors, 24 JSON, 26 hồ sơ backlog; không lỗi |

Lần check-huy-docs giữa quá trình soạn thảo thất bại do link day1-handoff.md trỏ file chưa tạo; đã tạo file, cần kết quả chạy cuối phía trên. Không che giấu lần lỗi; đây là lỗi tài liệu giữa quá trình, không thay đổi code/dependencies để vượt test.

Scaffold tests không kiểm chứng AC nghiệp vụ, State Machine, idempotency, chống oversell hoặc API <500ms. Chưa chạy test nghiệp vụ/Playwright, render lại mọi PlantUML, Windows runtime, Docker health mới, CI/CD hoặc production. PDF A1 được trích văn bản và xem ảnh State Machine; PDF A2 chưa tìm thấy. Không chạy npm audit fix hoặc audit fix --force, không đổi dependencies ở Buổi 1.

## Git và phạm vi diff

- gh auth status: chưa đăng nhập.
- GIT_TERMINAL_PROMPT=0 git push --dry-run origin HEAD:refs/heads/docs/day1-assignment-alignment: exit 128, thiếu Username/credentials cho HTTPS. Không push thật hoặc tạo PR được; lệnh bàn giao đã chuẩn bị.
- Diff không thay business code, schema, package/lockfile, Compose, secrets hoặc audit lịch sử. Thêm script kiểm tra tài liệu chỉ dùng built-in Node/Git, không thêm dependency.

## Dependency warnings thực ghi nhận

Đã chạy npm audit --json riêng ở gốc, apps/api, apps/web; cả ba exit 1 do registry báo vulnerabilities, không phải build/test thất bại. Các số sau là số package theo npm audit trong từng cây dependency, không cộng thành số lỗ hổng duy nhất.

| Thư mục/lệnh tương đương từ gốc | Kết quả registry |
|---|---|
| npm audit --json | 2 critical (concurrently, shell-quote) |
| npm --prefix apps/api audit --json | 23 package: 20 moderate, 2 high, 1 critical; gồm platform-express/multer/handlebars và chuỗi Jest |
| npm --prefix apps/web audit --json | 8 high; gồm next, sharp và chuỗi ESLint |

Đề xuất PR bảo mật riêng: kiểm tra advisory/đường phụ thuộc và tương thích phiên bản, cập nhật có chủ đích, chạy lại checks rồi review. Không áp dụng tự động gợi ý fixAvailable vì có đề xuất major/downgrade. Các cảnh báo không được che thành PASS; PR Buổi 1 chỉ thay tài liệu và script kiểm tra tài liệu.
