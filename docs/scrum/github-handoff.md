# BrewLite — Bàn giao thao tác GitHub

**Hiện hành 21/10/2026 — chỉ kiểm tra/chuẩn bị review.** Đã có 26/26 Issue A1/A2, 26/26 OPEN/assignee/body khớp Git; xem [bảng URL thật](backlog.md). PR #17/#18/#20/#32/#33 đã merge. Không chạy lại danh sách tạo Issue/label ở phần lịch sử, không tự push/merge hoặc đổi Board trong phiên này.

GitHub connector đọc được repository và Issues/PR; `gh auth status` tại máy hiện vẫn chưa đăng nhập. Hai cơ chế truy cập khác nhau: CLI chưa login không có nghĩa chưa đọc được GitHub hoặc chưa tạo Issues. Connector không có Projects API; Board/quyền/status chưa kiểm chứng, cần Hưng kiểm tra thủ công và cung cấp evidence. Không suy Board chưa tồn tại hay quyền Project từ quyền admin repository.

## Việc Hưng thực hiện sau khi đọc hồ sơ

1. Gửi [review request](day1-review-request.md) cho cả năm người và thu phản hồi có link/commit; agent chỉ soạn nội dung, chưa gửi tin nhắn.
2. Kiểm tra Board hiện hữu: URL, 26 Issue items, bốn cột Status, quyền từng người/giảng viên. Đừng tạo Board thứ hai khi chưa kiểm tra Board cũ; chưa đủ quyền thì ghi người hỗ trợ và mốc xác nhận.
3. Chốt Working Agreement/roles/merge backup và PD owner/mốc theo phản hồi; chưa chốt Sprint Backlog trước Planning thật.
4. Sau khi được yêu cầu và các kiểm tra/nhóm review đạt, Hưng mới commit/push nhánh `docs/day1-final-review`, kiểm PR cùng head trước khi tạo PR. Chưa có PR final-review trong hồ sơ này; không tự bịa URL hoặc dùng Closes cho task nghiệp vụ.
5. Kiểm đúng diff/commit/checks và review bởi người khác trước khi người có quyền merge. Không lấy merge PR cũ làm acceptance của task mới.

## Lịch sử thao tác 20/10/2026 — không thực hiện lại

Snapshot cũ: 0 Issue thường/16 PR, CLI chưa login và push dry-run exit 128 do thiếu HTTPS credentials. Các trạng thái “chưa tạo/chưa push/chờ đối chiếu” trong bản lệnh bên dưới chỉ đúng tại mốc 20/10, đã được thay bằng dữ liệu hiện hành ở trên.

<details>
<summary>Lệnh chuẩn bị cũ — lưu tham khảo, không chạy lại để tạo trùng 26 Issues</summary>

## Tạo backlog sau đăng nhập

Chạy từ gốc repository. Đăng nhập rồi kiểm tra lại cả open/closed Issues để tránh tạo trùng, vì trạng thái có thể thay đổi sau snapshot. Nếu mã đã tồn tại, liên kết/cập nhật Issue đó, **bỏ qua lệnh tạo tương ứng**. Khi lệnh bị lỗi/timeout, đọc lại Issues trước retry. Chỉ dùng --assignee sau khi thành viên xác nhận đúng account.

```bash
gh auth login
gh auth status
gh api --paginate 'repos/NguyenKhanhHungDev/Swe_project/issues?state=all&per_page=100' --jq '.[] | select(.pull_request == null) | [.number,.title,.state] | @tsv'
gh label list --repo NguyenKhanhHungDev/Swe_project
```

Chỉ tạo label thiếu, giữ label đã có (không --force):

```bash
gh label create 'A1' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
gh label create 'A2' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
gh label create 'documentation' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
gh label create 'backend' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
gh label create 'frontend' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
gh label create 'devops' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
gh label create 'testing' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
gh label create 'blocked' --repo NguyenKhanhHungDev/Swe_project --color '64748b'
```

Các lệnh sau là danh sách bàn giao, không phải script để chạy mù; áp dụng kiểm tra mã trùng phía trên trước từng lệnh. Body trong Git là nháp Buổi 1; sau khi tạo, sửa dòng Issue chưa được tạo trong body trên GitHub, ghi URL thật vào backlog/truy vết, giữ acceptance PENDING.

```bash
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-01 Khởi tạo dự án' --body-file docs/backlog/A1-01.md --label 'A1,documentation'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-02 API danh sách sản phẩm' --body-file docs/backlog/A1-02.md --label 'A1,backend'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-03 Trang Menu' --body-file docs/backlog/A1-03.md --label 'A1,frontend'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-04 Chi tiết sản phẩm, size S/M/L và topping' --body-file docs/backlog/A1-04.md --label 'A1,backend,frontend'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-05 Giỏ hàng' --body-file docs/backlog/A1-05.md --label 'A1,frontend'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-06 API tạo đơn' --body-file docs/backlog/A1-06.md --label 'A1,backend'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-07 Đăng ký, đăng nhập JWT' --body-file docs/backlog/A1-07.md --label 'A1,backend'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-08 Thanh toán Ví/Thẻ mô phỏng' --body-file docs/backlog/A1-08.md --label 'A1,backend'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-09 Xác nhận, lịch sử đơn và bàn giao' --body-file docs/backlog/A1-09.md --label 'A1,frontend,devops'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A1-10 State Machine, idempotency, concurrency, promotion và loyalty' --body-file docs/backlog/A1-10.md --label 'A1,backend,testing'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-1.1 Context, Stakeholders & Scope' --body-file docs/backlog/A2-1.1.md --label 'A2,documentation'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-1.2 SRS, FR/NFR, MoSCoW & AC' --body-file docs/backlog/A2-1.2.md --label 'A2,documentation'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-1.3 Checkout Use Case' --body-file docs/backlog/A2-1.3.md --label 'A2,documentation'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-2.1 Checkout Activity' --body-file docs/backlog/A2-2.1.md --label 'A2,documentation,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-2.2 Checkout Sequence' --body-file docs/backlog/A2-2.2.md --label 'A2,documentation,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-2.3 Domain Class Diagram' --body-file docs/backlog/A2-2.3.md --label 'A2,documentation,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-3.1 Architecture & ADR' --body-file docs/backlog/A2-3.1.md --label 'A2,documentation,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-3.2 Deployment Diagram' --body-file docs/backlog/A2-3.2.md --label 'A2,devops,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-4.1 Repository & Working Rules' --body-file docs/backlog/A2-4.1.md --label 'A2,documentation,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-4.2 Documentation Management' --body-file docs/backlog/A2-4.2.md --label 'A2,documentation,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-4.3 Menu MVP' --body-file docs/backlog/A2-4.3.md --label 'A2,frontend,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-4.4 Continuous Integration' --body-file docs/backlog/A2-4.4.md --label 'A2,devops,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-5.1 Complete MVP' --body-file docs/backlog/A2-5.1.md --label 'A2,backend,frontend,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-5.2 Integration & Testing' --body-file docs/backlog/A2-5.2.md --label 'A2,testing,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-5.3 Continuous Delivery' --body-file docs/backlog/A2-5.3.md --label 'A2,devops,blocked'
gh issue create --repo NguyenKhanhHungDev/Swe_project --title 'A2-5.4 Production & Handover' --body-file docs/backlog/A2-5.4.md --label 'A2,devops,blocked'
```

## Board và Sprint

Kiểm tra quyền Projects sau đăng nhập; nếu có, tạo Board BrewLite với trường Status Todo, In Progress, Review, Done và đưa Issues vào theo [backlog](backlog.md). Chưa xác minh scope/quyền nên chưa tạo Board; không dùng quyền repository để suy ra quyền Project. Sprint Goal/ngày/estimate chỉ cập nhật sau Planning thật.

## Push/PR tài liệu

Chỉ sau required checks đạt và xem diff; nhánh docs/day1-assignment-alignment. Nếu chưa push thành công, dùng:

```bash
git push -u origin docs/day1-assignment-alignment
gh pr list --repo NguyenKhanhHungDev/Swe_project --head docs/day1-assignment-alignment --state all
gh pr create --repo NguyenKhanhHungDev/Swe_project --base main --head docs/day1-assignment-alignment --title 'docs: align BrewLite day 1 with both assignments' --body-file docs/scrum/day1-pr-body.md
```

Chỉ tạo PR nếu chưa có PR tương ứng. Không tự merge. Không dùng Closes cho 26 task vì đây là nháp quản lý, chưa nghiệm thu chức năng.

</details>
