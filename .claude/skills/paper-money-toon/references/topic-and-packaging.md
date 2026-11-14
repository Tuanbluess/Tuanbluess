# Bước 0 — Chọn chủ đề, ngôn ngữ, thời lượng, tiêu đề, thumbnail

Bước này **hỏi người dùng** trước khi viết kịch bản. Dùng `AskUserQuestion` cho từng lựa chọn (tối đa 4 câu một lần).

## 0.1 Tìm 5 tiêu đề hot

1. Tìm tin trong **14 ngày gần nhất** (WebSearch, chế độ `extended`), gửi các truy vấn song song:
   - `CEO resigns`, `billionaire scandal`, `company collapse`, `biggest stock drop`, `spy arrested tech`, `IPO`, `antitrust ruling`, `fraud charges founder`, `richest person lost`, `layoffs AI`.
   - Thêm tên các công ty/người đang nổi: Nvidia, OpenAI, Tesla, Apple, Meta, Amazon, TSMC, Microsoft, Google, các sàn crypto.
2. Chấm điểm mỗi tin (0–5 mỗi tiêu chí, lấy tổng):
   | Tiêu chí | Câu hỏi |
   |---|---|
   | Người nổi tiếng | Có 1 nhân vật mà ai cũng nhận ra không? (vẽ biếm họa được) |
   | Tiền lớn | Có con số tỷ đô / mất giá / tài sản? |
   | Kịch tính | Có bí mật, phản bội, gián điệp, sụp đổ, quay xe? |
   | Cảnh mở đầu | Có một khoảnh khắc cụ thể dựng thành cảnh phim được không? |
   | Quá khứ để kể | Có hành trình "từ số 0" / lịch sử công ty đủ hay? |
   | Liên quan người xem | Ảnh hưởng tới tiền/quỹ hưu/giá sản phẩm của khán giả? |
   | Còn nóng | Tin ≤ 7 ngày = 5, ≤ 14 ngày = 3 |
3. Lấy 5 tin điểm cao nhất, viết **mỗi tin 1 tiêu đề theo phong cách đối thủ** (mục 0.4), kèm 1 dòng "tại sao hot" + điểm + nguồn.
4. Cho người dùng chọn 1 (hoặc tự nhập chủ đề khác).

## 0.2 Ngôn ngữ

Hỏi ngôn ngữ của **giọng đọc và chữ trên hình**. Gợi ý:
| Ngôn ngữ | Ghi chú | Tốc độ đọc mục tiêu (ước lượng) |
|---|---|---|
| English (mặc định, giống kênh mẫu) | Thị trường lớn nhất, RPM cao | 165–175 từ/phút |
| Tiếng Việt | Đổi số liệu sang ví dụ gần gũi người Việt | 230–260 âm tiết/phút |
| Español | Thị trường lớn, ít đối thủ ngách này | 180–200 từ/phút |
| Português (BR) | | 170–190 từ/phút |
| Deutsch | RPM cao | 140–155 từ/phút |
| 日本語 / 한국어 | Cần phông viết tay hỗ trợ ký tự (Yomogi, Gaegu) | đo theo bản đọc mẫu |

Các con số tốc độ ở bảng (trừ tiếng Anh) là ước lượng; sau bước giọng, đo lại và chỉnh. Kênh mẫu đọc ~160–163 từ/phút **không tính khoảng nghỉ** — giọng phải nhanh, liền mạch, gần như không nghỉ giữa câu (khoảng lặng ≤ 0,25 s). Với TTS: tốc độ 1.08–1.15x, cắt khoảng lặng dài bằng `ffmpeg -af silenceremove`.

## 0.3 Thời lượng (giống đối thủ)

Kênh mẫu: 14:20 và 19:48. Cho chọn:
- **12–15 phút** (~2.000–2.500 từ EN) — dễ giữ chân hơn, đủ dài để chèn quảng cáo giữa video.
- **15–20 phút** (~2.500–3.300 từ EN) — giống tập dài nhất của đối thủ, cần câu chuyện có 2 tuyến (vd: quá khứ nhân vật + vụ việc hiện tại).
- Sponsor/CTA ở 35–40%; end screen 20 s.

## 0.4 Công thức tiêu đề (học từ đối thủ)

Tiêu đề quan sát được: *How a Chinese Spy Got Inside Nvidia* · *Why Nvidia Would Fail Without Jensen Huang*. (Mới thấy 2 tiêu đề — khi có thêm, cập nhật mục này.)

Đặc điểm:
- Bắt đầu bằng **How** hoặc **Why**; câu khẳng định, không dấu hỏi.
- Chứa **1 tên lớn** (công ty hoặc người) — tên viết đúng, không viết tắt.
- Có **1 yếu tố lạ/xung đột** ("Chinese Spy", "Would Fail") đặt cạnh cái tên quen.
- 6–8 từ, chữ thường kiểu Title Case, **không** VIẾT HOA cả câu, không emoji, không số liệu.

Khuôn mẫu:
- `How a [nhân vật bất ngờ] Got Inside [Công ty]`
- `Why [Công ty] Would Fail Without [Người]`
- `How [Người] Lost [Thứ quý giá] in [Thời gian]`
- `Why [Công ty] Is Quietly Paying [Đối thủ] Billions`
- `How [Người] Turned [Thứ nhỏ] Into [Đế chế]`
- `The [Tính từ] Reason [Công ty] [Hành động bất ngờ]`
Viết 3 phương án cho chủ đề đã chọn, cho người dùng chọn. Tiếng Việt: giữ cấu trúc ("Vì sao Nvidia sẽ sụp đổ nếu thiếu Jensen Huang").

## 0.5 Thumbnail

**Lưu ý trung thực:** thumbnail thật của kênh mẫu chưa được phân tích (chỉ có video). Công thức dưới đây suy ra từ phong cách trong video + chuẩn ngách; khi người dùng gửi ảnh thumbnail đối thủ (hoặc mạng cho phép YouTube), xem ảnh và cập nhật mục này.

Công thức (đã có sẵn trong `template/src/Thumbnail.tsx`, sửa `storyboard/<ep>.thumb.json`):
- Nhân vật chính **biếm họa, đầu to chiếm 40–50% khung**, biểu cảm cực mạnh (shock/smug/cry).
- Nhân vật thứ 2 (đối thủ/kẻ phản diện) nhỏ hơn, biểu cảm trái ngược.
- **1 vật ẩn dụ phát sáng** ở giữa (chip, $, ghế trống, ổ khóa, áo khoác).
- **≤ 4 chữ** viết tay trắng viền đen, nói thứ tiêu đề **không** nói ("He had no idea", "$2 TRILLION GONE").
- Nền tối tương phản cao, vignette, có thể thêm mũi tên đỏ.
- Xuất 2–3 phương án để A/B test.
