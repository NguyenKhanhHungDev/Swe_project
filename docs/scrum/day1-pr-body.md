## Phạm vi

Tài liệu main vẫn quản lý theo roadmap cũ, phân công khác yêu cầu Buổi 1 và một số links bị hỏng sau chuyển monorepo. PR chuẩn hóa theo A1 (10 task)/A2 (16 task con, nghiệm thu tuần tự), phân biệt design/scaffold với code/test nghiệp vụ; không thêm implementation hoặc dependencies.

- Kiểm kê main tại 1cc2bb1 (PR #17) trong docs/audits/main-inventory-2026-10-20.md.
- Chuẩn hóa README/AGENTS/Context/Roadmap/Team/Traceability/Architecture/API index; lưu roadmap cũ ở docs/archive, giữ audits/diagram sources.
- Thêm Working Agreement, 26 issue drafts/backlog, Inventory/Payment drafts, Menu notes, State/Checkout checklist và bàn giao Buổi 1.
- Sửa links README con và JSON fences; ghi rõ xung đột timer, role, route, DTO, enum, transaction trong Pending Decisions, không tự chốt thay owners.

## Kiểm chứng

- npm run build: PASS (API và web).
- npm --prefix apps/api test -- --runInBand: PASS, 1 test.
- npm --prefix apps/api run test:e2e -- --runInBand: PASS, 1 test.
- npm --prefix apps/web run lint: PASS.
- node scripts/check-huy-docs.mjs: PASS, 10 JSON/52 links/17 bảng.
- node scripts/check-day1-docs.mjs và git diff --check: PASS; script kiểm tra link/anchor/JSON và đủ 26 hồ sơ.
- npm audit chỉ đọc: root 2 critical; API 20 moderate/2 high/1 critical; web 8 high. Exit 1, ghi riêng để xử lý bằng PR bảo mật, không đổi dependencies.

Hello tests chỉ kiểm chứng scaffold. Chưa test nghiệp vụ, DB concurrency, CI/CD, Windows runtime hoặc production; không deploy/migrate trong PR này.

## Issues và Pending

A1-01–A1-10, A2-1.1–A2-5.4 mới là hồ sơ Git; 0 Issue mới được tạo do gh chưa đăng nhập; push preflight cũng thất bại exit 128 do thiếu Git HTTPS credentials, chưa có link để điền. Không dùng Closes hoặc đánh dấu task nghiệp vụ Done. Lệnh bàn giao ở docs/scrum/github-handoff.md.

Khoa review Inventory/ERD; Huy Menu/Cart/Checkout/Promotion; Phát Use Case/Orders/State/backlog; Thắng Payment/deployment. Tất cả draft chờ owner review. PO/SM, merge dự phòng, hạn nộp, host và PD-05–12 chưa xác nhận. A1 đã đối chiếu PDF local; A2 chờ PDF gốc. Chưa đủ điều kiện kết thúc Buổi 1; không tự merge.
