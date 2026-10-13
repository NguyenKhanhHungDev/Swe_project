# Audit đồng bộ Google Drive — BrewLite bước 1–12

**Ngày:** 13/10/2026 (Asia/Ho_Chi_Minh). **Phạm vi:** chỉ bước 1–12.

**Lưu ý phiên bản:** Phần audit bên dưới ghi kết quả đối chiếu Drive ban đầu. Xác nhận mới của Hưng được ghi ở mục cuối và [REQUIREMENTS_DECISIONS.md](../REQUIREMENTS_DECISIONS.md); các vấn đề đã chốt không còn chờ quyết định. Mục cập nhật trực tiếp Google Drive ở cuối ghi 13 Google Docs và 6 file nguồn đã sửa/đọc lại; bản Word và ảnh sơ đồ vẫn chưa đồng bộ.

Repository local có origin `https://github.com/NguyenKhanhHungDev/Swe_project.git`, HEAD `337b57df4a376e79412c6928d0107673915333e6`, nhánh `docs/sequence-products`. Working tree ban đầu sạch. Không đổi nhánh, commit, push, merge hoặc tạo PR; không fetch/pull GitHub. Kết quả đối chiếu áp dụng checkout local, chưa xác minh khác biệt với HEAD remote.

## Phương pháp và giới hạn

Đọc AGENTS và tài liệu ngữ cảnh trước chỉnh sửa. Xác minh nguồn bằng metadata và đọc nội dung qua Google Drive connector, không dùng bản tóm tắt như bằng chứng đã đọc tài liệu gốc. Chỉ bổ sung nội dung có nguồn; những điểm CONFLICT giữ trạng thái cần review. Không thay source ứng dụng, cấu hình Docker, Prisma, migration hoặc dữ liệu.

MATCHED là khớp phần nội dung đã đối chiếu; MISSING là thiếu tài liệu/nội dung; OUTDATED có bằng chứng mô tả cũ; CONFLICT là mâu thuẫn; UNVERIFIED là chưa đủ bằng chứng; BLOCKED là không đọc được phần nguồn cần thiết. Đây là trạng thái audit, không phải TODO/DONE của nhóm. Một bước có thể có nhiều trạng thái vì gồm nhiều sản phẩm.

Các tài liệu hỗn hợp có nhắc bước sau chỉ được dùng phần liên quan bước 1–12. Mục “12” của đề PDF là số mục đề, không phải bước 12 nội bộ. Không kiểm tra hay sửa API Specification/Sequence/triển khai ở bước 13 trở đi.

## Nguồn Google Drive

Thư mục xác minh: [SWE](https://drive.google.com/drive/folders/1doluSMHhBnxFnfyzZOOyTb0RhKe2IQWF), tên dự án được xác nhận bằng SRS/Báo cáo và tài liệu BrewLite bên trong. Đã liệt kê đầy đủ các danh sách trả về (mỗi thư mục dưới 100 mục), chưa có bằng chứng đây là toàn bộ mọi nguồn của nhóm.

Các nhánh đã liệt kê: [userstory](https://drive.google.com/drive/folders/1IWiNqyOAl0Yy01KXxbfmbL51LHPYQfeY), [usecase và đặc tả](https://drive.google.com/drive/folders/1bPGtkgqg5CqCklxQ_WimDIvczDwpKJt0), [ERD](https://drive.google.com/drive/folders/1gho65dPWV6yJr46Qp2lnCnVIQNxZc48k), [activity](https://drive.google.com/drive/folders/15Wypw9A_DUkmlPTTVbjjpfZ4KOXmeqiJ), [Các bước xử lý](https://drive.google.com/drive/folders/10fTEK8Rjaf-Bd1tRXVb93vKR3kXN0l_5).

Metadata modifiedTime dưới đây là thời điểm cập nhật của Drive, không chứng minh bản đã được duyệt hoặc là phiên bản nghiệp vụ chính thức. Không truy vấn revision history; không suy ra thứ tự ưu tiên chỉ từ ngày sửa file.

| Tài liệu nguồn | Cập nhật (UTC) / phiên bản | Phần đã đọc và giới hạn |
| --- | --- | --- |
| [SRS](https://docs.google.com/document/d/1kyRvgCaQwPqj8K8K2Ul-ElkborVdeVx3VGyKybSM3mc/edit) | 2026-10-10T18:39:02.194Z | Văn bản phạm vi, tác nhân, UC-01–18; kết thúc ở UC-18. |
| [Báo cáo](https://docs.google.com/document/d/1DPEMtgALd2dY_ytcdFeYo6dz-kynu3el7BUnGA3TJ7g/edit) | 2026-10-07T16:01:39.420Z | Mục 1/2/5/7 và tiêu đề 9; ảnh nhúng chưa đối chiếu trực quan. |
| [Chia việc](https://docs.google.com/document/d/1M3npyzoghO0Ul9vrFCBoMVnVlwWmjFmN6BI71FKNoK8/edit) | 2026-10-10T16:06:06.102Z | Cây tài liệu, bảng chia việc và mẫu UC; phần văn bản đọc được không phải phân công hiện hành đã duyệt. |
| [Quy tắc dữ liệu/cấu trúc code](https://drive.google.com/file/d/15aDj6ZgmCdsqJUvysrGT0ixf8qflf4q6/view) | 2026-10-05T06:32:43.691Z; ngày trong tài liệu 30/09 | Phân công, tên dữ liệu, enum, cấu trúc đề xuất và phối hợp kiến trúc; không đồng bộ hợp đồng API hoặc triển khai. |
| [Quy trình hoàn thành](https://docs.google.com/document/d/1OyixPSR-orvRPep7C2Dro1kUoDqUhiBfMrpUHKyhe68/edit) | 2026-10-05T07:16:08.250Z | Ghi “ok” 1–5, 7–8 và “chưa xong” 6; chỉ là ghi nhận cũ, không bằng chứng nghiệm thu. |
| [Đề BrewLite-CongNghePhanMem.pdf](https://drive.google.com/file/d/13IZRr_uYsv4FTWTJdQ7KHQNGBuvc5_dK/view) | 2026-09-19T16:13:05.000Z; VER 1.0 | Văn bản yêu cầu, NFR, wireframe, backlog và thực thể tối thiểu; không audit API ở mục sau. Đề bắt buộc Next.js/NestJS; Prisma/PostgreSQL là định hướng gợi ý, nhóm chọn trong thiết kế. |
| [Untitled Diagram](https://drive.google.com/file/d/1wsQXk5Fg7PtLk2fEFBOJZGLZzR89g8jm/view?usp=drivesdk) | `2026-10-07T16:54:04.422Z` | Đã tải raw và đọc nhãn/thuộc tính XML; chưa render và chưa xác minh toàn bộ cạnh/cardinality. |
| [ERD sơ bộ](https://docs.google.com/document/d/1JlXkxMNQ1qLp69GhH7JjDnC-ZRQMI1MtJB1O1eJ_4SU/edit?usp=drivesdk) | `2026-10-07T16:26:11.534Z` | Connector trả văn bản trống; không tuyên bố đã đọc nội dung. ERD sơ bộ có thể chứa hình; SRS trong userstory chưa có văn bản đọc được. |
| [Phát](https://docs.google.com/document/d/14B5i1T5eBWmxsRLSNTT8532N7u0H5ufq53nU_dAGZPE/edit?usp=drivesdk) | `2026-10-13T13:03:21.687Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [Huy](https://docs.google.com/document/d/1WfTyIfMBKTFL4knT1oThN1_gWi_4-5H-dHnTjrxyuq8/edit?usp=drivesdk) | `2026-10-12T14:01:00.081Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [Thắng](https://docs.google.com/document/d/1rOfXVO11MkJyi9BN1ZvcAagoXbGh2yqB-hCMvtSS1x4/edit?usp=drivesdk) | `2026-10-11T08:01:48.206Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [khoa us](https://docs.google.com/document/d/1Sqbk87voCTRfNBQhOwUykEFrL38Xa1LB0Be75ySif7M/edit?usp=drivesdk) | `2026-10-11T05:58:21.392Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [hưng](https://docs.google.com/document/d/1ciuUITAEyG-ReAhc-HXsLy0mGGbl48e3g_T0Z1DFl3s/edit?usp=drivesdk) | `2026-10-07T13:29:42.236Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [Untitled Diagram](https://drive.google.com/file/d/1oAsIHsXjxbWT-Q0_3f-9Ml1n7ttO7PLj/view?usp=drivesdk) | `2026-10-07T04:21:09.391Z` | Đã tải raw và đọc nhãn/thuộc tính XML; chưa render và chưa xác minh toàn bộ cạnh/cardinality. |
| [SRS](https://docs.google.com/document/d/1cxMihzykwpCmyu8gx4OpibxHs2rsUpgrZ_aCfZ5ka2c/edit?usp=drivesdk) | `2026-10-02T17:41:01.240Z` | Connector trả văn bản trống; không tuyên bố đã đọc nội dung. ERD sơ bộ có thể chứa hình; SRS trong userstory chưa có văn bản đọc được. |
| [Phát](https://docs.google.com/document/d/1Hw7XrMjGUDZA8uQUg_JRRDUAnQKgEYSvMBVHzp_Fgj8/edit?usp=drivesdk) | `2026-10-02T17:35:36.625Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [SWE_NguyenHuuThang.docx](https://docs.google.com/document/d/1y2MQ_WThR8aR18wkUo98VqMNZpnYfKLe/edit?usp=drivesdk&ouid=117184662316202678053&rtpof=true&sd=true) | `2026-10-02T17:34:42.697Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [Tạ Ngọc Khánh Huy](https://docs.google.com/document/d/1IkHi3wh6lEskZV087zQgyvaJc5RN9l4lQBrjQBi2paM/edit?usp=drivesdk) | `2026-10-02T17:34:25.180Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [khoa](https://docs.google.com/document/d/18ngBzChWOSe1KXZIl-biookabVUv501Oq3pvU8RK4hI/edit?usp=drivesdk) | `2026-10-02T17:23:04.340Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [Hưng](https://docs.google.com/document/d/1Gdu1LOdYetB7yVannlFq0uwOxk00Go3PnvTpLJGipdA/edit?usp=drivesdk) | `2026-09-30T13:45:15.154Z` | Đã đọc văn bản; story/AC hoặc UC được trích để review. Không xác nhận ảnh nhúng hoặc phê duyệt. |
| [khoa_các bước xử lý](https://docs.google.com/document/d/1MwsaLlV-fPylcOiq6mA95IsUxLcDGjMKLZE-47bXaKc/edit?usp=drivesdk) | `2026-10-11T05:47:25.212Z` | Đã fetch văn bản; rà các đoạn tên chức năng/phối hợp/tồn/điểm/phiên thuộc thiết kế; không hợp nhất quy tắc khác nguồn SRS. |
| [thắng_từng bước xử lý](https://docs.google.com/document/d/1YQLQwZlqEVYO9fl6DmZGdg9iyPNI4pMsw67ZfSZYLc0/edit?usp=drivesdk) | `2026-10-05T06:13:36.776Z` | Đã fetch văn bản; rà các đoạn tên chức năng/phối hợp/tồn/điểm/phiên thuộc thiết kế; không hợp nhất quy tắc khác nguồn SRS. |
| [phát_từng bước xử lý](https://docs.google.com/document/d/1j1MnZJJGaU_mJkWZCuDdrQs8R6DHVbHzP84nZc340d4/edit?usp=drivesdk) | `2026-10-04T12:49:59.080Z` | Đã fetch văn bản; rà các đoạn tên chức năng/phối hợp/tồn/điểm/phiên thuộc thiết kế; không hợp nhất quy tắc khác nguồn SRS. |
| [Huy_các bước xử lý](https://docs.google.com/document/d/1K5FBvu3FMCSxvUKoplxjaLn9CmfxrnUt-F_TwGkUVz0/edit?usp=drivesdk) | `2026-10-02T10:34:14.584Z` | Đã fetch văn bản; rà các đoạn tên chức năng/phối hợp/tồn/điểm/phiên thuộc thiết kế; không hợp nhất quy tắc khác nguồn SRS. |
| [cấu trúc viết từng bước xử lý](https://docs.google.com/document/d/15YgpbSnJGybXN8EZWpwoVY77Tng_8DFTb14Nki9CGgo/edit?usp=drivesdk) | `2026-09-30T13:52:54.240Z` | Đã fetch văn bản; rà các đoạn tên chức năng/phối hợp/tồn/điểm/phiên thuộc thiết kế; không hợp nhất quy tắc khác nguồn SRS. |

11 nguồn mã Activity đã đọc và thời điểm cập nhật được liệt kê từng file tại [ACTIVITY_DIAGRAMS.md](../ACTIVITY_DIAGRAMS.md). Ảnh PNG ở bốn thư mục Activity chỉ được liệt kê metadata, chưa đọc trực quan. Tám nguồn `.puml`/`.uml` và hai `Untitled Diagram` tải raw thành công sau khi fetch text rỗng; không còn bị chặn truy cập file raw. Không đưa signed download URL, file tạm, hoặc bản dump nguồn vào Git.

## Tài liệu repository đã kiểm tra

- `AGENTS.md`, `README.md`.
- `docs/PROJECT_CONTEXT.md`, `docs/PROJECT_ROADMAP.md`, `docs/TEAM_ASSIGNMENTS.md`, `docs/REQUIREMENTS_TRACEABILITY.md`: dùng ngữ cảnh, phân công và truy vết; không sửa các bước ngoài phạm vi.
- `docs/PROJECT_SCOPE.md`, `docs/SRS.md`, `docs/BUSINESS_RULES.md`, `docs/ARCHITECTURE.md`, `docs/ERD_PRELIMINARY.md`, `docs/ERD_DETAILED.md`: đọc/đối chiếu bước 1–12.
- Kiểm kê `docs/`: ban đầu không có User Stories, AC, Use Cases, Figma/User Flow, Activity hoặc REQUIREMENTS_REVIEW dù SRS/Business Rules liên kết tới một số file này.
- `docker-compose.yml`, ba `package.json`, thông tin lockfile và sự tồn tại ba mẫu env; kiểm tra cấu trúc và đọc tối thiểu `backend/src/main.ts`, `app.module.ts`, `products/products.module.ts`, `frontend/src/app/page.tsx` để xác minh setup. Không sửa source, không đọc/in env cá nhân.
- `docs/api/` và `docs/diagrams/sequence/` chỉ nhận diện đường dẫn để loại khỏi phạm vi, không audit nội dung.

## Bảng trạng thái 12 bước

| Bước | Kết quả đối chiếu | Sau đồng bộ / phần còn thiếu |
| --- | --- | --- |
| 1 Scope | MATCHED | Khớp Báo cáo mục 1 và SRS mục 1–2; thêm link nguồn, không đánh dấu duyệt. |
| 2 Requirements/SRS | MATCHED; MISSING tham chiếu | 18 UC và NFR khớp; link thiếu được bổ sung. SRS Drive UC-14 tham chiếu mục 4 không hiện diện; repository đã có quy tắc từ Báo cáo. |
| 3 User Stories | MISSING → bổ sung; UNVERIFIED nghiệm thu | 15 story từ năm nguồn, giữ mã và mô tả. Không tự tạo story đăng xuất/quầy riêng ngoài nguồn. |
| 4 Acceptance Criteria | MISSING → bổ sung; UNVERIFIED nghiệm thu | Tách toàn bộ tiêu chí của 15 story; bảng chuyển trạng thái liên kết BR để tránh lặp. Chưa có bằng chứng AC đã được chấp nhận. |
| 5 Business Rules | MATCHED văn bản; CONFLICT liên nguồn | 34 BR khớp Báo cáo; giữ nguyên nghiệp vụ và mã. Bảng chuyển trạng thái khớp US-ORDER-02; chưa xem lại ảnh Báo cáo. |
| 6 Use Cases | MISSING → bổ sung; CONFLICT; UNVERIFIED UML | Có đặc tả 18 UC và link sơ đồ đã đọc XML; UC-06/08/14 cần xác nhận. Không khẳng định toàn bộ UML đúng hoặc đã duyệt. |
| 7 Setup/Docker | MATCHED cấu hình; UNVERIFIED chạy/nghiệm thu | Compose chỉ DB postgres:17-alpine, localhost:5433, volume/healthcheck; frontend/backend chạy npm. Config validation đạt; không chạy container/test/build trong audit tài liệu. |
| 8 Architecture | OUTDATED mô tả tài liệu; CONFLICT phân công | Sửa câu “chưa có tài liệu” bằng link thực; giữ thiết kế/phân công hiện hành. Không có tài liệu kiến trúc độc lập trên Drive được tìm thấy. |
| 9 Preliminary ERD | CONFLICT; UNVERIFIED; BLOCKED phần text Doc | XML Drive có Giỏ hàng/Dòng giỏ, Danh mục, Lịch sử trạng thái, base price/phụ thu, khác mô hình repository. Google Doc ERD sơ bộ fetch text trống; giữ nguyên ERD. |
| 10 Figma/UI/UX | UNVERIFIED | Ghi nguồn phân công và wireframe đề; chưa tìm được link Figma BrewLite. Không coi không tìm thấy là không tồn tại. |
| 11 Activity | MISSING index → bổ sung; CONFLICT; UNVERIFIED đầy đủ | Đã đọc 11 nguồn mã có sẵn; chỉ ghi kiểm kê và vấn đề. Không tạo sơ đồ, không đánh dấu tất cả xong. |
| 12 Detailed ERD | UNVERIFIED; CONFLICT với quy ước nguồn | Có bản chi tiết local để review; chưa tìm được nguồn Drive chi tiết tương ứng hoặc bằng chứng phê duyệt. Giữ nguyên toàn bộ file. |

## Thay đổi và bằng chứng

| File thay đổi | Nội dung / nguồn chứng minh |
| --- | --- |
| `docs/PROJECT_SCOPE.md` | Thêm link Báo cáo/SRS và ngày đối chiếu; không sửa phạm vi nghiệp vụ. |
| `docs/SRS.md` | Thêm provenance và cập nhật trạng thái/link story, AC, UC theo các file đã đồng bộ. |
| `docs/BUSINESS_RULES.md` | Thêm provenance cho 34 BR, phân biệt kiểm tra văn bản và ảnh chưa xem; không sửa BR. |
| `docs/ARCHITECTURE.md` | Chỉ sửa đoạn đầu nói tài liệu chưa có; dựa trên danh sách file local và audit. Không đổi phần bước 13 trở đi. |
| `docs/USER_STORIES.md` | Tạo 15 mô tả từ năm tài liệu trong userstory, mỗi mục có source link; không lấy tác giả làm chủ module. |
| `docs/ACCEPTANCE_CRITERIA.md` | Tách tiêu chí nguyên nghĩa từ cùng nguồn, không chép lại mô tả story; chuyển bảng trạng thái thành link BR. |
| `docs/USE_CASES.md` | Tập hợp đặc tả năm nguồn và link sơ đồ tồn tại; loại phần trình bày lặp, đánh dấu mâu thuẫn. |
| `docs/ACTIVITY_DIAGRAMS.md` | Chỉ mục 11 nguồn đã đọc, phiên bản và điểm review; không thêm sơ đồ. |
| `docs/UI_UX.md` | Ghi tình trạng tìm kiếm, trách nhiệm, wireframe tham khảo và link Figma chưa xác minh. |
| `docs/REQUIREMENTS_REVIEW.md` | Đích link nội bộ đã thiếu từ trước, trỏ vào danh sách vấn đề audit để tránh lặp. |
| `docs/audits/drive-sync-steps-01-12.md` | Báo cáo này, inventory, kết quả và giới hạn kiểm tra. |

## Các vấn đề cần thành viên xác nhận

1. **CONFLICT — Thanh toán ngay:** bảng UC-06 Huy (cập nhật 12/10) chỉ mua món hiện tại và không đổi giỏ, bản văn xuôi cùng file lại thêm vào toàn bộ giỏ; SRS UC-06, BR-06, US-PROD-03, US-CART-01 và Activity UC-06 đều theo toàn bộ giỏ. Hưng/Huy/Phát/Thắng cần chốt một bản. Không tự chọn theo timestamp.
2. **CONFLICT — lượt mã:** UC-08 Huy/Activity UC08 và Các bước xử lý Huy nhắc còn lượt/hết lượt; US-PROMO-01 nói chưa giới hạn lượt toàn hệ thống/tài khoản. Huy xác nhận. Không thêm trường hoặc quy tắc giới hạn vào ERD/BR.
3. **CONFLICT — hết hạn:** Activity Thắng dùng EXPIRED; SRS/BR dùng CANCELLED sau 15 phút. Thắng/Phát đối chiếu, không sửa sơ đồ nguồn thay chủ module.
4. **CONFLICT — checkout/replay/hủy:** checkout tạo đơn trước xác nhận; Activity hủy trả 409 cho CANCELLED trong khi UC-13/18 Phát cho replay phản hồi trạng thái cũ sau kiểm tra quyền. Phát/Thắng phân biệt lần mới với replay và chốt nhánh.
5. **CONFLICT — phân công:** tài liệu quy tắc Drive gán Inventory cho Phát, lịch sử UI cho Khoa; bản local ngày 11/10 gán Inventory cho Khoa, Orders UI cho Phát. Drive cũng gán một số phần điểm/khuyến mãi cho Khoa trong mô tả phối hợp; bản local là Huy. Không thay phân công vì người viết tài liệu không nhất thiết sở hữu module. Nhóm xác nhận bản áp dụng.
6. **UNVERIFIED/CONFLICT — auth:** US-AUTH-02 nêu token trong bộ nhớ, Architecture còn ghi chưa chốt; Các bước xử lý Khoa nhắc local/session storage và backend hủy token/session. Khoa cần xác nhận lưu token, thời hạn và khả năng thu hồi thực tế. Không tự sửa quyết định kiến trúc.
7. **UNVERIFIED — điểm:** UC-14 Khoa thêm UI lịch sử tích/tiêu, SRS chỉ xem số dư; không có đổi điểm lấy quà trong phạm vi. Khoa/Huy xác nhận đây là lịch sử cộng/đảo hay mở rộng tiêu điểm, trước khi hợp nhất SRS.
8. **CONFLICT — ERD:** XML sơ bộ Drive có bảng giỏ và dòng giỏ trong khi SRS/local chỉ lưu giỏ trình duyệt; có danh mục/lịch sử trạng thái/số điện thoại không được mô tả tương ứng trong local. Giá Drive/US-PROD-03 dùng base price + surcharge theo món–size, local ERD chi tiết dùng giá size đầy đủ; topping Drive có giá chung, local có giá theo cặp. Hưng và nhóm review, không tự thay ERD.
9. **UNVERIFIED — Detailed ERD:** chưa thấy bản Drive có kiểu, FK, index/ràng buộc tương ứng. `full_name VARCHAR(120)` local khác giới hạn nhập tối đa 100 của US-AUTH-01 (không nhất thiết lỗi DB, cần phân biệt miền nghiệp vụ và độ dài lưu). Payment enum local PENDING/SUCCEEDED/FAILED + bảng Refund khác Architecture/Drive PROCESSING/SUCCEEDED/FAILED/REFUNDED; cần ánh xạ rõ thay vì coi tự động khớp. Tồn `on_hand/reserved_quantity` cần chủ module xác nhận cách ánh xạ stock/version.
10. **MISSING/UNVERIFIED — Activity:** tập đọc được chưa bao phủ đầy đủ Products, đăng xuất, điểm, xử lý quầy; sơ đồ Inventory còn thiếu đồng thời/hoàn/hết hạn; đăng ký thiếu xác nhận/băm. Mỗi chủ module cung cấp phần được giao và minh chứng review; không tự tạo phần thiếu.
11. **UNVERIFIED — Figma/NFR/nghiệm thu:** Phát cần cung cấp URL/page/frame và phiên bản; nhóm xác nhận ma trận browser, tải/dữ liệu/API cần đo <500 ms và log review/AC. Ghi “ok” trong quy trình hoặc có file không đủ nghiệm thu.
12. **OUTDATED — tài liệu ngữ cảnh:** PROJECT_CONTEXT và ROADMAP còn nói nguồn 1–6 chưa có, bước 9 đang chuẩn bị dù ERD local tồn tại; REQUIREMENTS_TRACEABILITY còn nói đề chưa được đối chiếu. Không sửa các tài liệu tổng thể chứa bước sau trong lần này; audit cung cấp nguồn mới để nhóm cập nhật phạm vi riêng sau.

## Nguồn không đọc được / phần chưa xác minh

Không có phản hồi từ chối quyền hoặc mất kết nối Drive trong lần audit. **BLOCKED phần nội dung đọc được:** Google Doc `ERD sơ bộ` và `SRS` trong userstory trả text rỗng. Chưa đọc ảnh nhúng/PNG hoặc render sơ đồ, không tuyên bố đã xem chúng. Đây không phải bằng chứng file trống hoặc không có quyền. XML sơ bộ đã đọc được giúp chỉ ra khác biệt nhưng không thay việc review bản hình/cardinality.

Chưa tìm thấy URL Figma và nguồn Detailed ERD riêng: **UNVERIFIED**, không gọi là lỗi quyền truy cập. Bản PDF trùng ở thư mục cá nhân khác được tìm thấy qua search nhưng không cần đọc thêm. Tài liệu `Figma` ở thư mục ngoài SWE chưa xác minh liên quan nên không truy cập. Tìm kiếm không chứng minh mọi nguồn của nhóm đều đã được phát hiện.

## Verification và Git diff

| Lệnh / phép kiểm tra | Kết quả |
| --- | --- |
| `docker compose --env-file .env.example config --quiet` | Exit 0; cấu hình hợp lệ với mẫu env; không in cấu hình resolved hoặc khởi động DB. |
| `git diff --check` | Exit 0; không có lỗi whitespace trong diff tracked. |
| `git diff --stat` và `git diff -- docs/ARCHITECTURE.md docs/PROJECT_SCOPE.md docs/SRS.md docs/BUSINESS_RULES.md` | Đã review 4 file tracked: 16 dòng thêm, 5 dòng bỏ. Chỉ provenance, link và trạng thái tài liệu. |
| `git status --short` / `git ls-files --others --exclude-standard` | 4 file sửa + 7 file mới, toàn bộ Markdown trong docs. Git diff mặc định không hiện nội dung file mới; đã đọc/kiểm tra riêng file mới. |
| `python3 /tmp/brewlite-verify-20261013.py` | Exit 0; script kiểm tra tài liệu dùng thư viện chuẩn, không sửa database/source. 85 link Markdown nội bộ (đường dẫn/anchor) hợp lệ; 15 story và 15 nhóm AC khớp mã, không trùng; đúng 18 heading UC-01–18 không lặp; mô tả và 144 dòng tiêu chí giữ nguyên nguồn; bảng trạng thái liên kết BR. |
| Cùng script: đối chiếu 34 BR và phạm vi file | 34 BR khớp nguyên văn Báo cáo Drive; 11 file thay đổi đều thuộc phạm vi tài liệu; hai ERD byte-for-byte giống HEAD; file mới không có trailing whitespace. |

Script kiểm tra và bản nguồn tải về nằm trong `/tmp`, không phải sản phẩm commit. Kiểm tra liên kết chỉ xác minh local path/anchor; không giả định mọi URL ngoài đã truy cập (chỉ các nguồn Drive nêu trong inventory được đọc). Lần kiểm tra đầu phát hiện heading UC lặp từ bản nguồn Huy và bộ kiểm tra whitespace quá chặt với hai dấu cách Markdown sẵn có trong SRS; đã bỏ heading lặp và giới hạn kiểm tra file mới, sau đó chạy lại toàn bộ kiểm tra đạt. Không thay whitespace nội dung người dùng từ trước.

Không khởi động/dừng container hoặc chạy SQL, migration, seed, reset database. Không chạy lint có --fix, test/build ứng dụng vì thay đổi chỉ tài liệu. Config validation không chứng minh dịch vụ chạy healthy hoặc tính năng nghiệp vụ đạt AC. Không đổi trạng thái DONE ở bất kỳ bước nào.

## Khả năng tạo Pull Request

Có thể chuẩn bị PR tài liệu để review sau khi người dùng cho phép chọn nhánh phù hợp. Nhánh hiện tại là `docs/sequence-products`, cần tránh trộn công việc Sequence vào PR sync; chưa đối chiếu diff với base remote. Các mâu thuẫn được giữ rõ, nên PR không được mô tả là “hoàn tất/duyệt toàn bộ bước 1–12”. Không tạo PR, commit hoặc push trong nhiệm vụ này.

## Cập nhật sau xác nhận của Hưng

Hưng chốt mua ngay chỉ mua món hiện tại, thanh toán từ giỏ mua toàn bộ giỏ và đồng ý các đề xuất review đề. Đã điều chỉnh SRS, BR-06/08, AC Products/Cart/Orders/Payments, UC-05/06/08/09/10 và Architecture; mua ngay không xóa giỏ có sẵn. Đã giữ 15 phút, 1–99 ly, 0–3 phần topping, công thức điểm và phân công ngày 11/10; bản đầu không giới hạn lượt mã. Đã thêm REQUIREMENTS_DECISIONS.md và bảng ánh xạ ERD_DETAILED với mục 12.2 của đề; không thay cấu trúc ERD. Đề của thầy ưu tiên hơn bản chép Drive, các con số bổ sung được ghi là quyết định nhóm.

Các kiểm tra giữ nguyên văn nguồn ở audit ban đầu chỉ áp dụng bản trước xác nhận; bản hiện tại chủ động khác nguồn theo quyết định mới. Activity chỉ cập nhật hướng review trong chỉ mục, chưa sửa sơ đồ Drive; EXPIRED vẫn được ghi trong lịch sử phát hiện, không phải trạng thái hiện hành. Nguồn thiếu, Figma, JWT, phép đo NFR và duyệt bản ERD vẫn cần minh chứng.

Kiểm tra sau cập nhật: `git diff --check` exit 0; script Python thư viện chuẩn kiểm tra 97 link nội bộ (file/anchor) đạt, 15 mã US/15 nhóm AC/18 UC không trùng, provenance quyết định có ở các tài liệu nghiệp vụ, câu mua ngay cũ đã loại khỏi tài liệu hiện hành. Tổng working tree từ đầu audit: 13 file Markdown trong docs; không có source/API/Sequence/Prisma/migration thay đổi. Không chạy test/build ứng dụng vì chỉ sửa tài liệu.
## Cập nhật trực tiếp Google Drive theo yêu cầu của Hưng — 13/10/2026

Phần này là trạng thái mới nhất, thay thế nhận định “chưa sửa Drive” trong các mốc audit trước. Đã cập nhật **13 Google Docs và 6 file nguồn**, giữ nguyên ID/tên/vị trí; không tạo sơ đồ mới. Nguồn quyết định: yêu cầu trực tiếp của Hưng về hai luồng mua và đồng ý các đề xuất tại [REQUIREMENTS_DECISIONS.md](../REQUIREMENTS_DECISIONS.md); đề giảng viên vẫn ưu tiên. Không sửa API Specification, Sequence, source code hoặc cấu trúc ERD.

### Google Docs đã ghi và xác minh

| Tài liệu | Kết quả |
| --- | --- |
| [SRS](https://docs.google.com/document/d/1kyRvgCaQwPqj8K8K2Ul-ElkborVdeVx3VGyKybSM3mc/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Báo cáo](https://docs.google.com/document/d/1DPEMtgALd2dY_ytcdFeYo6dz-kynu3el7BUnGA3TJ7g/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Hưng](https://docs.google.com/document/d/1Gdu1LOdYetB7yVannlFq0uwOxk00Go3PnvTpLJGipdA/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Tạ Ngọc Khánh Huy](https://docs.google.com/document/d/1IkHi3wh6lEskZV087zQgyvaJc5RN9l4lQBrjQBi2paM/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [hưng](https://docs.google.com/document/d/1ciuUITAEyG-ReAhc-HXsLy0mGGbl48e3g_T0Z1DFl3s/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Huy](https://docs.google.com/document/d/1WfTyIfMBKTFL4knT1oThN1_gWi_4-5H-dHnTjrxyuq8/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Phát](https://docs.google.com/document/d/14B5i1T5eBWmxsRLSNTT8532N7u0H5ufq53nU_dAGZPE/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Thắng](https://docs.google.com/document/d/1rOfXVO11MkJyi9BN1ZvcAagoXbGh2yqB-hCMvtSS1x4/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Phát](https://docs.google.com/document/d/1Hw7XrMjGUDZA8uQUg_JRRDUAnQKgEYSvMBVHzp_Fgj8/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Huy_các bước xử lý](https://docs.google.com/document/d/1K5FBvu3FMCSxvUKoplxjaLn9CmfxrnUt-F_TwGkUVz0/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [phát_từng bước xử lý](https://docs.google.com/document/d/1j1MnZJJGaU_mJkWZCuDdrQs8R6DHVbHzP84nZc340d4/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [thắng_từng bước xử lý](https://docs.google.com/document/d/1YQLQwZlqEVYO9fl6DmZGdg9iyPNI4pMsw67ZfSZYLc0/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |
| [Chia việc ](https://docs.google.com/document/d/1M3npyzoghO0Ul9vrFCBoMVnVlwWmjFmN6BI71FKNoK8/edit) | Đã ghi và đọc lại: khớp các đoạn thay thế |

Mỗi Google Doc được đọc trước, sửa bằng replaceAllText với requiredRevisionId rồi đọc lại. Tất cả đoạn thay thế hiện diện sau ghi; số bảng và phần tử ảnh nhúng trước/sau không đổi. Đã đọc cả các tab của Usecase Huy/Phát; không xóa tab dựa vào tên tab. Kiểm tra này không thay thế kiểm tra bố cục trực quan.

Nội dung sửa: mua ngay chỉ cấu hình món hiện tại và giữ giỏ; thanh toán giỏ dùng toàn bộ giỏ; xóa giỏ sau thành công chỉ áp dụng luồng từ giỏ; bỏ giới hạn lượt mã ở bản đầu; thống nhất Khoa Inventory, Huy Promotions/Loyalty, Phát Orders/UI lịch sử.

### File nguồn đã ghi và đọc lại

| File | Thay đổi |
| --- | --- |
| [UC06_Activity.puml](https://drive.google.com/file/d/1IBEzga1jNXNox0Zs1mHqQBy2BYqgkwnv/view) | Tách mua ngay khỏi thao tác thêm/gộp giỏ. |
| [UC08_Activity.puml](https://drive.google.com/file/d/13BGxHtJh3G05uzkqEA9JbWEwjK98D_Zr/view) | Bỏ điều kiện còn lượt mã. |
| [activity_2_thanhtoan (3).puml](https://drive.google.com/file/d/10-Vwhz35mAX-ToEtKz2mZFVhJW1QnWvC/view) | Hết hạn dùng CANCELLED, hoàn tồn một lần; phân biệt xử lý giỏ theo luồng. |
| [activity_1_checkout.puml](https://drive.google.com/file/d/1NMZ_dusGYXHjhSxoIEorXqVmyTeYGKnE/view) | Xác nhận trước tạo đơn/giữ kho, hỗ trợ hai danh sách mua, replay hợp lệ trả cùng đơn. |
| [p_cancel.uml](https://drive.google.com/file/d/1DYvO_EQ37e0bwaKKcDsd9icwo2XWz50V/view) | CANCELLED có nhánh kiểm tra quyền/replay, không hoàn/đảo lần nữa. |
| [BrewLite_QuyTac_DuLieu_CauTruc_Code.md](https://drive.google.com/file/d/15aDj6ZgmCdsqJUvysrGT0ixf8qflf4q6/view) | Sửa các đoạn phân công Inventory và Orders/history UI. |

Đã tải lại cả 6 file sau ghi và so sánh byte với nội dung đã gửi: 6/6 khớp. Chưa chạy PlantUML/render; thay đổi sơ đồ chỉ được xác minh văn bản, chưa coi bước 11 hoàn thành.

### Phần chưa đồng bộ và giới hạn

- [SWE_NguyenHuuThang.docx](https://drive.google.com/file/d/1y2MQ_WThR8aR18wkUo98VqMNZpnYfKLe/view) chưa sửa; còn bản chép cũ về xử lý giỏ/phối hợp điểm. Công cụ Google Docs không nhận Word ID. Workflow documents yêu cầu runtime được resolve qua workspace dependency loader và render/kiểm tra từng trang; chưa có loader/runtime tương ứng để thực hiện an toàn trong phiên này. Không phải lỗi quyền Drive.
- PNG và ảnh nhúng vẫn giữ nguyên, có thể còn thể hiện quy tắc cũ dù nguồn PlantUML đã sửa. Chưa có PlantUML trong môi trường để dựng/kiểm chứng bản ảnh thay thế; không ghi đè ảnh bằng hình chưa kiểm tra.
- Các khác biệt ERD, JWT/session, Figma, NFR và mức bao phủ Activity chưa đủ căn cứ vẫn giữ nguyên. Không suy ra phê duyệt thiết kế từ việc sửa văn bản.
- Chưa tuyên bố toàn bộ kho Drive đồng nhất hoặc bước 1–12 hoàn thành. PR tài liệu có thể dùng để review phần đã xác minh, nhưng cần nêu rõ các giới hạn trên; chưa tạo PR/commit/push.

### Verification lần ghi Drive

13/13 Google Docs đọc lại đạt; 6/6 file nguồn tải lại khớp byte. Local chỉ cập nhật báo cáo, chỉ mục Activity và liên kết trạng thái quyết định trong lần này. Không chạy database, build/test ứng dụng hoặc thay nhánh.
