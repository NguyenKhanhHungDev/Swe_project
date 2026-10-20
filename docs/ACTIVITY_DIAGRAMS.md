# BrewLite — Kiểm kê Activity Diagrams

**Mốc kiểm kê lịch sử:** Activity (nguồn cũ). **Ngày:** 13/10/2026. **Trạng thái:** Có nguồn để review; chưa xác nhận tất cả hoàn thành.

Đã liệt kê bốn thư mục Khoa, Huy, Phát, Thắng trong [SWE/activity](https://drive.google.com/drive/folders/15Wypw9A_DUkmlPTTVbjjpfZ4KOXmeqiJ). Repository ban đầu không có Activity; các file Sequence thuộc bước 14 được loại khỏi kiểm tra. Mốc kiểm kê ban đầu chỉ ghi nhận sơ đồ đã có. Lần cập nhật được Hưng yêu cầu sau đó đã sửa năm file nguồn hiện có; không tạo sơ đồ mới.

Đã đọc ba đoạn PlantUML trong Google Docs của Khoa và tải/đọc nguyên văn tám file `.puml`/`.uml` của Huy, Phát, Thắng. Tải raw là cần thiết vì connector trả văn bản trống cho MIME `application/octet-stream`. Ảnh PNG chỉ kiểm kê metadata, chưa xác minh render hoặc đối chiếu từng ảnh với mã sơ đồ.

| Nguồn đã đọc | Cập nhật (UTC) | Kết quả review văn bản |
| --- | --- | --- |
| [activity 3](https://docs.google.com/document/d/10PtwC-dF22o7BHZinu2j-ngIM-IkcdozTvm8V0k1N5o/edit?usp=drivesdk) | `2026-10-11T06:31:16.697Z` | Tồn kho: nói nguyên liệu/món, thiếu transaction/version, hoàn kho và hết hạn; phạm vi chuẩn hiện là theo sản phẩm. |
| [activity1](https://docs.google.com/document/d/1a1npVmfQb7x9d4INmwnUUWlLFhXI-wlMtoiBd0fbn8U/edit?usp=drivesdk) | `2026-10-11T06:30:02.238Z` | UC-01: thiếu xác nhận mật khẩu, băm mật khẩu và bảo đảm email duy nhất khi đồng thời so với US-AUTH-01. |
| [activity2](https://docs.google.com/document/d/14bx7SE1EH9DcldxJS13uBs3iYd18fR-MlJ_eFQO8rBs/edit?usp=drivesdk) | `2026-10-11T06:29:52.837Z` | UC-02: có giữ giỏ/quay lại luồng; token/session còn chung chung so với story token trong bộ nhớ. |
| [UC08_Activity.puml](https://drive.google.com/file/d/13BGxHtJh3G05uzkqEA9JbWEwjK98D_Zr/view?usp=drivesdk) | `2026-10-08T12:55:12.101Z` | Có kiểm tra total > 0, giữ mã cũ; có điều kiện “còn lượt” mâu thuẫn US-PROMO-01. |
| [UC07_Activity.puml](https://drive.google.com/file/d/1T5vNgJy4AHJr5s-6774RPQxb5Sxex5s4/view?usp=drivesdk) | `2026-10-08T12:53:19.007Z` | Có hủy đơn trước khi sửa giỏ, điều chỉnh qty và kiểm tra lại mã. Chưa có minh chứng render/duyệt. |
| [UC06_Activity.puml](https://drive.google.com/file/d/1IBEzga1jNXNox0Zs1mHqQBy2BYqgkwnv/view?usp=drivesdk) | `2026-10-08T12:49:58.236Z` | Có gộp cấu hình, tổng số ly, không giữ kho và thêm một lần; khác UC-06 dạng bảng mới trong file Use Case Huy. |
| [p_cancel.uml](https://drive.google.com/file/d/1DYvO_EQ37e0bwaKKcDsd9icwo2XWz50V/view?usp=drivesdk) | `2026-10-07T02:07:36.507Z` | Có transaction hủy/hoàn; đã CANCELLED trả 409, khác UC-13/18 Phát trả trạng thái cũ khi replay hợp lệ. Chưa thể hiện đủ cạnh tranh/hoàn đúng một lần. |
| [p_history.uml](https://drive.google.com/file/d/1Y59n9G2BBouMXiyvusCmWXc1a21rtqAh/view?usp=drivesdk) | `2026-10-07T02:07:05.994Z` | Có quyền chủ đơn và snapshot; cần review lỗi không tìm thấy/không được phép, nhánh empty/loading/error và hết hạn. |
| [p_create.uml](https://drive.google.com/file/d/1eleEtfcilQDid1NrJ_ZhOrmYTEO10y66/view?usp=drivesdk) | `2026-10-07T02:06:12.592Z` | Có JWT, chống lặp, snapshot, transaction và version; chưa thể hiện đủ nhánh xử lý version conflict khác thiếu tồn. |
| [activity_1_checkout.puml](https://drive.google.com/file/d/1NMZ_dusGYXHjhSxoIEorXqVmyTeYGKnE/view?usp=drivesdk) | `2026-10-10T15:19:00.629Z` | Tạo đơn khi vào Checkout trước xác nhận; “trùng đơn” báo lỗi, khác yêu cầu replay trả cùng đơn. Cần thống nhất với UC-09. |
| [activity_2_thanhtoan (3).puml](https://drive.google.com/file/d/10-Vwhz35mAX-ToEtKz2mZFVhJW1QnWvC/view?usp=drivesdk) | `2026-10-10T15:15:18.896Z` | Hết hạn chuyển EXPIRED thay vì CANCELLED; chưa phân biệt replay khóa cũ với lần thanh toán mới; thiếu quyền, điểm và nhánh mất kết nối. |

Phân công hiện hành theo [TEAM_ASSIGNMENTS.md](TEAM_ASSIGNMENTS.md): mỗi chủ module thực hiện; Phát phụ trách Orders, Hưng đối chiếu tổng thể. Tác giả/thư mục nguồn không tự thay đổi chủ module. Chưa thấy thư mục Activity Products của Hưng trong phạm vi đã liệt kê; không suy ra chưa làm ở nơi khác. Các luồng đăng xuất, điểm và xử lý quầy chưa có đủ sơ đồ được xác minh trong tập này. Xem [audit](audits/drive-sync-steps-01-12.md).

Trục quản lý hiện hành: [A1/A2](PROJECT_ROADMAP.md); Huy phụ trách Activity Checkout theo [phân công](TEAM_ASSIGNMENTS.md). Các nội dung timer/hết hạn trong nguồn lịch sử bên dưới thuộc [PD-05](scrum/team-working-agreement.md#pending-decisions), không dùng để tạo timer.

## Quy tắc đối chiếu sau xác nhận nhóm

Ngày 13/10/2026, Hưng xác nhận [quyết định yêu cầu](REQUIREMENTS_DECISIONS.md). Bảng phía trên ghi tình trạng nguồn Drive tại lúc đọc, chưa chứng minh file Drive đã được sửa. Các chủ module cần cập nhật sơ đồ đã được phân công:

- Hưng/Huy: mua ngay chỉ mua món hiện tại, giữ nguyên giỏ; thanh toán trong giỏ dùng toàn bộ giỏ. Activity UC06 hiện mô tả thêm món khi mua ngay nên đã lỗi thời theo quyết định mới.
- Huy: bỏ điều kiện còn lượt/hết lượt mã ở bản đầu.
- Thắng/Phát: hết hạn đơn chưa trả dùng CANCELLED, không EXPIRED; checkout phải xác nhận danh sách trước tạo đơn, phân biệt replay với lần mới.
- Các chủ module: giữ transaction, optimistic locking, kiểm tra quyền và chống tác động lặp theo đề/BR.

Sau yêu cầu đồng bộ Drive của Hưng, đã sửa và tải lại đối chiếu byte năm nguồn: UC06, UC08, checkout, thanh toán và hủy. Bảng trên giữ lịch sử phát hiện trước sửa. Các ảnh PNG/ảnh nhúng chưa cập nhật; chưa render PlantUML hoặc xác minh hoàn thành Activity. Chi tiết tại [báo cáo cập nhật Drive](audits/drive-sync-steps-01-12.md).
