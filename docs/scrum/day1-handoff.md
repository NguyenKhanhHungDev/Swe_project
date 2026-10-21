# BrewLite — Bàn giao Buổi 1

**READY FOR TEAM REVIEW — NOT YET ACCEPTED.** Rà ngày 21/10/2026 tại `origin/main@8f8ffd5`. Đã chuẩn bị hồ sơ phần điều phối của Hưng; chưa có đủ xác nhận thành viên để công nhận Buổi 1 hoàn thành. Không nghiệm thu A2 Task 1–5 hoặc đóng Issue trong phiên này.

## 1. Mục tiêu Buổi 1

Kiểm kê repository và công việc A1/A2, chuẩn bị phân công/rules/backlog/contracts nháp và hồ sơ để năm thành viên review. Chỉ dùng hai Assignment gốc, không dùng roadmap 24 bước cũ. Không triển khai A2 Task 1 của Buổi 2, UML mới, code, DB, Docker hay CI/CD.

Đã trích đọc lại A1 `BrewLite-CongNghePhanMem.pdf` VER 1.0 (mục 3–12) và A2 `Assignment2-BrewLite-1.pdf` VER 1.0 (mục 1–9.1) local. PDF A2 có SHA-256 `ed2b85d0e8fb546dae088bc844bb8efeb7361629da48aac809b2840cc07d3938`; không còn thiếu đề A2. Đọc đề khác với phê duyệt requirements; phần còn lại PD-12 vẫn chờ Buổi 2.

## 2. Danh sách sản phẩm đã có

| Hạng mục | Trạng thái kiểm kê | Bằng chứng và giới hạn |
| --- | --- | --- |
| Monorepo apps/web, apps/api, docs, README/ignore/env mẫu | ĐÃ XÁC MINH | Cấu trúc phù hợp nền tảng A1-01/A2-4.1; main mới vẫn Hello, ProductsModule rỗng, Compose chỉ db, Prisma chưa tích hợp. Cấu trúc chưa đủ bộ sản phẩm cuối A2 mục 9 |
| Roadmap/phân công/backlog/truy vết | ĐÃ XÁC MINH về hồ sơ; CHỜ XÁC NHẬN nội dung | [Roadmap](../PROJECT_ROADMAP.md), [Team](../TEAM_ASSIGNMENTS.md), [backlog](backlog.md), [trace](../REQUIREMENTS_TRACEABILITY.md); đã đối chiếu hai đề, chưa xác nhận roles/acceptance |
| 26 hồ sơ backlog và 26 GitHub Issues | ĐÃ XÁC MINH | Đủ 10 A1 + 16 A2, không thiếu/trùng, OPEN, có assignee/body khớp Git. Từng file có owner/đầu ra/path/AC/dependencies; xem bảng URL thật trong backlog |
| Working Agreement | ĐÃ XÁC MINH có nội dung; CHỜ XÁC NHẬN nhóm | Đủ Git/PR/reviewer/Scrum/DoD; [PD-01–12](team-working-agreement.md#pending-decisions) có owner/mức ảnh hưởng/mốc xử lý, vai trò vẫn đề xuất |
| Inventory/Menu/Orders/Payment review pack | ĐÃ XÁC MINH có nháp; CHỜ XÁC NHẬN owner | [Inventory](../api/inventory-contract.md), [Menu](../ui/menu-notes.md), [Cart](../api/cart.md), [Orders](../api/orders.md), [transitions](../requirements/order-state-transitions.md), [Payment](../api/payment-contract.md). Không phải contract được duyệt |
| Yêu cầu review và handoff hiện hành | ĐÃ XÁC MINH đã soạn; CHỜ XÁC NHẬN nhận bàn giao | [Review request](day1-review-request.md) có việc/phản hồi cho cả năm người; agent chưa gửi tin nhắn hoặc ký thay ai |
| Phản hồi/biên bản chấp thuận và Board evidence | CHƯA HOÀN THÀNH phần bằng chứng Buổi 1 | Chưa có phản hồi lưu trong hồ sơ; Board chưa kiểm chứng bằng công cụ hiện có. Cần Hưng thu phản hồi và kiểm tra URL/quyền/status, không suy ra Board chưa tồn tại |

Các đích `docs/requirements/context-and-scope.md`, `docs/traceability-matrix.md`, `docs/deployment.md`, Class/Deployment source/render, code/tests/CI-CD là đầu ra theo giai đoạn A2, đã được lập kế hoạch trong 26 Issues. Chưa có chúng không buộc làm A2 Task 1–5 để đóng Buổi 1; vẫn phải tạo/kiểm chứng đúng gate sau này. Không di chuyển tài liệu hoặc dựng sản phẩm trước.

## 3. Bằng chứng kiểm tra repository và GitHub

### Repository

- Khi nhận việc: nhánh `docs/align-backlog-assignment2-original`, HEAD `b17b15d`, working tree sạch; không có thay đổi chưa commit cần giữ. Sau `git fetch origin`, main là `8f8ffd5b0dbaff6e6569980c78019d968d4a5d71`, chứa PR #33.
- Nhánh `docs/day1-final-review` chưa tồn tại; đã tạo từ origin/main này. Không reset/clean, không ghi đè code, không commit/push.
- Đọc source/package và cây Git: Next.js/NestJS có scaffold Hello; module Products rỗng; chưa có Prisma/business modules/CI-CD trên main. So với mốc `1cc2bb1`, dưới apps và cấu hình package/Compose chỉ đổi README ứng dụng, không có code mới. Không kết luận về feature branch chưa merge.
- [Kiểm chứng lịch sử 20/10](../audits/day1-verification-2026-10-20.md) ghi build hai app, unit Hello 1 test, E2E Hello 1 test, web lint đạt tại mốc cũ. **Không chạy lại ứng dụng trong final review Markdown**; log đó không chứng minh nghiệp vụ, DB/concurrency, NFR, CI hoặc production.

### GitHub — snapshot chỉ đọc 21/10/2026

- Connector đọc được repository public. REST Issues `state=all&per_page=100&page=1` trả 47 mục (<100): 26 Issue thường + 21 PR; loại PR khỏi số lượng backlog. Search Issues trả cùng bộ 26 mã, không thiếu/trùng; 26/26 OPEN, assignee đúng mapping owner trong body/local và 26/26 body khớp Git. Tất cả có 0 comment trong snapshot; không dùng assignee làm sự đồng ý nhận việc.
- Assignee quan sát: Hưng `NguyenKhanhHungDev` (8), Khoa `dangkhoa510038-source` (2), Huy `khanhhuy11022006-stack` (5), Phát `YESNTED` (6), Thắng `huuthang060306-droid` (5). URL từng Issue được giữ một bảng tại [backlog](backlog.md).

| PR đã đọc metadata | Trạng thái | Merge commit | Ý nghĩa |
| --- | --- | --- | --- |
| [#17](https://github.com/NguyenKhanhHungDev/Swe_project/pull/17) | MERGED 20/10 | `1cc2bb1` | Monorepo |
| [#18](https://github.com/NguyenKhanhHungDev/Swe_project/pull/18) | MERGED 20/10 | `7206fa7` | Hồ sơ Buổi 1 ban đầu |
| [#20](https://github.com/NguyenKhanhHungDev/Swe_project/pull/20) | MERGED 20/10 | `970a247` | README |
| [#32](https://github.com/NguyenKhanhHungDev/Swe_project/pull/32) | MERGED 21/10 | `77e1730` | Viết lại 26 backlog |
| [#33](https://github.com/NguyenKhanhHungDev/Swe_project/pull/33) | MERGED 21/10 | `8f8ffd5` | Đối chiếu đề A2 gốc, 27 file Markdown |

API review submissions của #18/#32/#33 trả `reviews: []`. Đây là thiếu bằng chứng review submission ở ba PR đã kiểm, không kết luận nhóm chưa từng trao đổi ở kênh khác. Hưng cần nhận phản hồi có nguồn thật; PR merged không thay acceptance.

Connector hiện không có Projects API; `gh auth status` exit 1 vì CLI chưa login. Chưa kiểm chứng Board/items/status/quyền giảng viên. Connector repository báo quyền admin của kết nối, **không suy ra quyền Projects/quyền của Phát hoặc nhóm đã chấp thuận merge roles**. Không thay Board/Issues/PR, không chạy lệnh create/push trong [hồ sơ GitHub](github-handoff.md).

## 4. Công việc chuẩn bị của Hưng

- Đã kiểm kê main, hai PDF, cấu trúc/26 hồ sơ và GitHub Issues/assignee/PR thật; giữ phân biệt thiết kế, triển khai và nghiệm thu.
- Đồng bộ mốc GitHub/PDF trong tài liệu quản lý; giữ lịch sử cũ có nhãn, không nhận tạo Issue/merge PR trong phiên này.
- Chuẩn bị Working Agreement/PD owner/mốc, review request cho năm người, phân công và điều kiện đóng Buổi 1. Đã sửa một liên kết Cart → README, không đổi hợp đồng nghiệp vụ.
- Phần soạn thảo/kiểm chứng hồ sơ đã sẵn sàng để Hưng review; còn cần Hưng gửi nhóm, thu bằng chứng, xử lý phản hồi và người khác review PR final trước khi được phép commit/push/merge. Không tự ký tên Hưng.

## 5. Công việc chờ review của thành viên

| Người | Hồ sơ và điểm phản hồi | Hiện trạng |
| --- | --- | --- |
| Hưng | Roadmap/phân công/rules/Git/backlog/trace/PD và Board evidence; xin người khác review phần Hưng là tác giả | CHỜ XÁC NHẬN |
| Khoa | Inventory/ERD/transaction/version/reserve-consume-release, trách nhiệm Prisma và phối hợp Phát/Thắng | CHỜ XÁC NHẬN |
| Huy | Menu/Detail/Cart/Checkout UI states, Products DTO/giá, nguồn mua và phối hợp Hưng | CHỜ XÁC NHẬN |
| Phát | A1 priorities/Orders/state/retry/cancel, dependency Auth–kho–payment, vai trò PO đề xuất | CHỜ XÁC NHẬN |
| Thắng | Payment mock/key/retry/success-fail/chưa rõ outcome, transaction và yêu cầu vận hành giai đoạn sau | CHỜ XÁC NHẬN |

Dùng [review request](day1-review-request.md); mỗi người tự trả APPROVED / CHANGES_REQUESTED / BLOCKED kèm phiên bản/file/điểm sửa/người phối hợp/link bằng chứng. Lưu xác nhận chính tại [Working Agreement](team-working-agreement.md#xác-nhận), không có APPROVED được tự điền.

## 6. Các quyết định còn Pending

Nguồn duy nhất: [PD-01–12](team-working-agreement.md#pending-decisions), không chép thành bảng quyết định thứ hai.

- Buổi 1: PD-01/02 (vai trò/rules/owner/reviewer/quyền) phải có phản hồi/decision thật hoặc quyết định trì hoãn được nhóm chấp nhận với người/mốc rõ.
- Trước implementation: PD-05–11 cần owner nhận xử lý và mốc chặn tương ứng. Không tự sửa nghiệp vụ trong final review; ngày/giờ cụ thể còn chờ nhóm/Planning.
- Giai đoạn sau: PD-04 host chốt trước nghiệm thu A2-3.2, CD/production Task 5; PD-03 hạn/nơi nộp cần thông báo giảng viên. PD-12 đã có PDF, còn FR/NFR/MoSCoW/requirements acceptance của Buổi 2.

## 7. Vấn đề có thể ảnh hưởng Buổi 2

1. **Timer:** yêu cầu hiện hành không triển khai timer nhưng BR/SRS/AC/ERD/Architecture/Sequence còn 15 phút/expiresAt; Phát/Khoa/Thắng phải xác nhận phương án giữ/hoàn/retry/cancel và sửa hồ sơ đồng bộ trước code. Không cron/auto-cancel hay đặt thời hạn thay thế.
2. **Cross-module:** DTO qty/quantity, role/routes, payment enum/key/transaction và ledger còn lệch; owners phối hợp theo PD-06–10. ERD cũ giao Phát tích hợp Prisma khác Khoa trong phân công hiện hành: cần review, không tự đổi owner.
3. **Quản lý:** roles/rules/merge backup chưa xác nhận, Board chưa kiểm chứng, ba PR thiếu review submission evidence. Có Issue OPEN không đồng nghĩa Sprint đã được chốt.
4. **Sản phẩm A2:** FR/NFR/MoSCoW/Checkout Use Case tổng thể/diagram riêng và phương án đường dẫn còn cần review/triển khai đúng Task 1. Buổi 1 chỉ ghi việc chờ, không làm trước để tuyên bố nghiệm thu.

## 8. Điều kiện chính thức kết thúc Buổi 1

Các checkbox để nhóm nghiệm thu, **chưa đánh dấu thay nhóm**:

- [ ] Năm người phản hồi đúng phiên bản, người khác review phần tác giả; CHANGES_REQUESTED/BLOCKED được xử lý hoặc chuyển việc có owner/mốc được nhóm chấp nhận.
- [ ] Working Agreement/roles/rules/owner được xác nhận, hoặc có quyết định trì hoãn thật; quyền merge dự phòng và Board/quyền/status đã kiểm chứng hoặc giới hạn/cách xử lý được ghi có nguồn.
- [ ] Giữ đủ 26 Issue không thiếu/trùng và liên kết thật; Product Backlog/Sprint Backlog tách biệt, chưa Planning thì không tự ghi Sprint đã chốt.
- [ ] PD trọng yếu có owner nhận việc, mốc xử lý trước implementation và bằng chứng review; no-timer không bị mặc định thành 15 phút.
- [ ] Kiểm tra tài liệu/diff đạt, commit/PR final được Hưng cho phép và một người khác review; chỉ người có quyền merge theo quyết định nhóm. Hồ sơ nhận bàn giao có link/phiên bản thật.

Chưa đủ các bằng chứng trên: giữ **READY FOR TEAM REVIEW — NOT YET ACCEPTED**. Hoàn tất Buổi 1 không tự nghiệm thu A2 Task 1–5 hoặc đóng task nghiệp vụ.

## 9. Việc tiếp theo sau khi nhóm nghiệm thu

Hưng gửi/thu review theo mẫu, tổng hợp vào Working Agreement, xử lý chỗ cần sửa và chuẩn bị commit/PR khi được phép. Sau nhóm chấp thuận Buổi 1, Buổi 2 mới review/hoàn thiện A2-1.1/1.2/1.3 và PD-05–10 theo trách nhiệm đã có. Requirements Task 1 có tạo phẩm/lịch sử/acceptance trước UML Task 2, rồi Architecture Task 3, Sprint 1 Task 4, Sprint 2/Delivery Task 5. Không triển khai code bù cho requirements chưa chốt.

### Kết quả kiểm tra phiên final review

| Lệnh/kiểm tra đã chạy | Kết quả thực tế |
| --- | --- |
| `node scripts/check-day1-docs.mjs` | PASS exit 0: 73 Markdown, 597 link/anchor nội bộ, 24 ví dụ JSON, đủ 26 hồ sơ; không lỗi hiện hành/lịch sử |
| `node scripts/check-huy-docs.mjs` | PASS exit 0: 10 JSON, 39 link nội bộ, 18 bảng; dữ liệu ví dụ UUID/DTO/giá hợp lệ |
| `python3 /tmp/check_brewlite_day1_final.py` (kiểm kê tạm ngoài repository) | PASS: 26 mã/local-online/assignee/body khớp snapshot, đủ 12 PD, 9 mục handoff, 5 yêu cầu review; 26 file Issue và bảng owner module giữ nguyên, đúng 11 file Markdown thay đổi/tạo |
| `git diff --check` | PASS exit 0, không lỗi whitespace |

Lần chạy đầu script tài liệu FAIL vì link Cart trỏ heading README đã bị đổi từ trước. Đã sửa duy nhất nhãn/anchor liên kết ở `docs/api/cart.md`, không thay nội dung contract; lần chạy cuối PASS như bảng. Không sửa dependencies để vượt kiểm tra.

Đã kiểm `git diff --stat`, đọc diff các tài liệu thay đổi và file review request mới. Không đổi apps/source/schema/migration/package/Compose/workflows, không sửa 26 body Issue trong Git hoặc online. Chưa commit/push/merge; HEAD vẫn `8f8ffd5`. Build/test ứng dụng và dependency warnings lịch sử giữ ở audit 20/10; không chạy lại hoặc báo thành kết quả mới. Không xác minh được Projects và chưa nhận review team, nên không ghi PASS cho hai việc này.
