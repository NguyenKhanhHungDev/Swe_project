
# BrewLite - Project Roadmap

## 1. Mục tiêu

Tài liệu quản lý quy trình phát triển đồ án BrewLite
theo 24 bước Software Engineering.

Mỗi bước phải có:
- Mục tiêu
- Công việc thực hiện
- Sản phẩm bàn giao
- Tiêu chí hoàn thành
- Minh chứng thực tế

Không đánh dấu hoàn thành chỉ vì đã có tên file
hoặc đã được AI đề xuất.

## 2. Quy ước trạng thái

- DONE: Đã hoàn thành và có minh chứng.
- IN_PROGRESS: Đang thực hiện.
- REVIEW: Đã chuẩn bị, cần kiểm tra và phê duyệt.
- TODO: Chưa thực hiện hoặc chưa xác minh.
- BLOCKED: Không thể tiếp tục do phụ thuộc.

Trạng thái phải được cập nhật theo thực tế.

## 3. Danh sách 24 bước

Phân công theo `docs/TEAM_ASSIGNMENTS.md`, cập nhật ngày 10/10/2026.
Hưng chủ trì tổng thể các bước 1–6, 8, 22, Scrum và bàn giao: điều phối,
review và tổng hợp; các chủ module trực tiếp thực hiện và cung cấp minh chứng.
Bảng phân công không xác nhận tiến độ hoặc thay đổi trạng thái nghiệm thu.

### Giai đoạn 1: Phân tích yêu cầu

| Bước | Công việc | Sản phẩm | Phân công |
|---|---|---|---|
| 1 | Project Scope | Tài liệu phạm vi dự án | Hưng chủ trì; các chủ module cung cấp phạm vi |
| 2 | Requirements / SRS | Tài liệu yêu cầu hệ thống | Hưng chủ trì; các chủ module viết yêu cầu và cung cấp nguồn/minh chứng |
| 3 | User Stories | Danh sách User Stories | Hưng chủ trì; Huy thực hiện User Stories theo module; mỗi chủ module viết/review phần mình |
| 4 | Acceptance Criteria | Tiêu chí nghiệm thu | Hưng chủ trì; Huy thực hiện Acceptance Criteria theo module; mỗi chủ module cung cấp tiêu chí/minh chứng |
| 5 | Business Rules | Quy tắc nghiệp vụ | Hưng chủ trì; các chủ module tài liệu hóa quy tắc đã thống nhất |
| 6 | Use Case | Sơ đồ và đặc tả Use Case | Hưng chủ trì; Khoa thực hiện Use Case; các chủ module cung cấp luồng/review |

### Giai đoạn 2: Chuẩn bị và thiết kế

| Bước | Công việc | Sản phẩm | Phân công |
|---|---|---|---|
| 7 | Project Setup | Git, Next.js, NestJS, Docker | Hưng thực hiện; các thành viên kiểm tra môi trường và cung cấp minh chứng |
| 8 | Architecture | Sơ đồ và tài liệu kiến trúc | Hưng chủ trì; các chủ module viết trách nhiệm/tương tác và review |
| 9 | Preliminary ERD | Sơ đồ thực thể và quan hệ sơ bộ | Hưng thực hiện; cả nhóm cung cấp thực thể/quy tắc |
| 10 | Figma / User Flow | Thiết kế UI và luồng giao diện | Phát điều phối Figma; mỗi chủ module hoàn thiện màn hình mình |
| 11 | Activity Diagram | Sơ đồ luồng hoạt động | Mỗi chủ module thực hiện; Phát phụ trách Orders; Hưng đối chiếu tổng thể |
| 12 | Detailed ERD | ERD chi tiết, ràng buộc dữ liệu | Hưng thực hiện; Phát kiểm tra triển khai schema; cả nhóm review |
| 13 | API Specification | Hợp đồng REST API | Hưng điều phối; mỗi chủ module đặc tả API của mình |
| 14 | Sequence Diagram | Sơ đồ tương tác theo thời gian | Mỗi chủ module thực hiện; Phát phụ trách Orders; các bên liên quan review |

### Giai đoạn 3: Lập trình

| Bước | Công việc | Sản phẩm | Phân công |
|---|---|---|---|
| 15 | Frontend | Giao diện Next.js | Hưng: Products/UI chung; Khoa: Auth/Users; Huy: Cart/Promotions/Loyalty; Phát: Orders; Thắng: Checkout/Payments |
| 16 | Backend | API NestJS | Hưng: Products/PrismaService; Khoa: Auth/Users/RBAC/Inventory; Huy: Promotions/Loyalty; Phát: Orders; Thắng: Payments/Idempotency |
| 17 | Database | Prisma schema, migration, seed | Phát thực hiện và tích hợp schema/migration/seed; Hưng ERD/PrismaService; chủ module đề xuất model |
| 18 | State Machine | Quy tắc chuyển trạng thái và nghiệp vụ đồng thời | Phát phụ trách State Machine; Thắng idempotency, Khoa tồn kho đồng thời, Huy promotions/loyalty; Hưng tích hợp |

### Giai đoạn 4: Kiểm thử

| Bước | Công việc | Sản phẩm | Phân công |
|---|---|---|---|
| 19 | Unit Testing | Unit tests và kết quả | Mỗi chủ module viết/chạy test; Khoa kiểm thử Auth/Users/RBAC/Inventory; Huy tổng hợp kết quả |
| 20 | Integration / E2E Testing | Kịch bản và kết quả kiểm thử | Hưng điều phối tích hợp; Thắng phụ trách E2E; chủ module trực tiếp kiểm thử; Huy tổng hợp kết quả |

### Giai đoạn 5: Triển khai và bàn giao

| Bước | Công việc | Sản phẩm | Phân công |
|---|---|---|---|
| 21 | Docker Packaging | Compose chạy đủ 3 dịch vụ | Hưng thực hiện; các chủ module kiểm tra và cung cấp minh chứng |
| 22 | Deployment | Sơ đồ và hướng dẫn triển khai | Hưng chủ trì; Thắng thực hiện Deployment Diagram và hướng dẫn triển khai; chủ module cung cấp cấu hình/minh chứng |
| 23 | Demo | Kịch bản demo hoàn chỉnh | Hưng điều phối kịch bản/tích hợp; cả nhóm demo; Thắng phụ trách E2E |
| 24 | Final Documentation | Bộ tài liệu bàn giao | Hưng chủ trì, tổng hợp báo cáo/bàn giao; mỗi người cung cấp tài liệu/test/minh chứng |

### Phân công Scrum và truy vết 10 Task

- Hưng chủ trì Scrum; Huy phụ trách Scrum Burndown; mỗi thành viên cập nhật công việc và cung cấp minh chứng. Vai trò Product Owner/Scrum Master cụ thể được nhóm xác định trong tài liệu Scrum.
- Giữ đủ Task 1–10 theo `docs/REQUIREMENTS_TRACEABILITY.md`: Hưng Task 1–4; Huy Task 5; Phát Task 6 (Khoa phối hợp kho); Khoa Task 7; Thắng Task 8; Phát/Thắng/Hưng phối hợp Task 9; Phát/Thắng/Khoa/Huy thực hiện Task 10 theo module, Hưng tích hợp.
- Mỗi chủ module liên kết công việc, Acceptance Criteria, test và minh chứng với Task của thầy và bước nội bộ; Hưng rà soát tổng thể và tổng hợp báo cáo.

## 4. Trạng thái tham khảo

Theo trao đổi trước đây và tài liệu kiến trúc
cập nhật 05/10/2026:

- Bước 1-6: Đã được nhóm chuẩn bị trước đó;
  cần đối chiếu minh chứng chính thức.
- Bước 7: Có khung dự án và cấu hình môi trường.
- Bước 8: Có docs/ARCHITECTURE.md;
  tài liệu được ghi là bản thiết kế để review.
- Bước 9: Đang chuẩn bị thiết kế ERD.
- Bước 10: Đã có công việc thiết kế Figma;
  chưa xác minh đầy đủ trong repository.
- Bước 11-24: Chưa xác minh tình trạng mới nhất.

Không sử dụng mục này như bằng chứng nghiệm thu.
Khi có kết quả review, cập nhật từng bước.

## 5. Quy trình hoàn thành từng bước

1. Đọc yêu cầu liên quan.
2. Xác định sản phẩm cần bàn giao.
3. Phân công người thực hiện.
4. Thiết kế hoặc triển khai.
5. Tự kiểm tra kết quả.
6. Review cùng các thành viên liên quan.
7. Sửa các vấn đề được phát hiện.
8. Lưu tài liệu và minh chứng.
9. Tạo commit và Pull Request phù hợp.
10. Chỉ đánh dấu DONE sau khi được chấp nhận.

## 6. Nguyên tắc theo dõi

- Phân biệt tài liệu đã viết và đã được duyệt.
- Phân biệt code tồn tại và chức năng chạy đúng.
- Phân biệt kiểm thử bộ khung và kiểm thử nghiệp vụ.
- Ghi lại các thay đổi quan trọng.
- Không đánh giá tiến độ bằng suy đoán.
- Những công việc có thể chạy song song không
  bắt buộc phải chờ bước trước hoàn thành 100%.

## 7. Hướng dẫn Codex

Khi người dùng hỏi về tiến độ:

1. Đọc PROJECT_CONTEXT.md.
2. Đọc PROJECT_ROADMAP.md.
3. Đọc tài liệu liên quan trong repository.
4. Đối chiếu code và minh chứng.
5. Báo cáo bước đã xác minh hoàn thành.
6. Chỉ ra công việc còn thiếu.
7. Đề xuất công việc tiếp theo.
8. Giải thích rõ ràng bằng tiếng Việt.

Không tự thay đổi trạng thái nếu thiếu bằng chứng.

## 8. Tài liệu tham chiếu

- README.md
- docs/ARCHITECTURE.md
- docs/TEAM_ASSIGNMENTS.md
- docs/REQUIREMENTS_TRACEABILITY.md
- docs/PROJECT_CONTEXT.md
- AGENTS.md

Các tài liệu yêu cầu chính thức của nhóm cần được
bổ sung hoặc liên kết khi được đưa vào repository.
