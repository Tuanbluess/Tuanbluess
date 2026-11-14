# Thiết kế nhân vật biếm họa theo người thật (kiểu meme)

Mục tiêu: người xem **nhận ra ngay trong 0,5 giây** chỉ nhờ vài dấu hiệu, dù nhân vật cực đơn giản.

## Nguyên tắc số 1: tương phản độ chi tiết
Ví dụ thật từ kênh mẫu (video *Why Nvidia Would Fail Without Jensen Huang*, 1 triệu view sau 1 ngày): người xem nhận ra Jensen Huang **không cần tên** vì:
- **Mặt cực trơn**: 2 mắt chấm, miệng tròn, không mũi.
- **Món đồ đặc trưng vẽ chi tiết gấp nhiều lần mặt**: áo khoác da có khóa kéo giữa + đầu khóa, cổ bẻ to có đinh tán, túi khóa kéo chéo ở ngực, túi ngang dưới, đường may vai, vệt bóng da, viền gấu áo.
- **Tóc là một khối có hình dáng riêng**, không phải mũ trùm: vuốt lệch một bên, có mái, có các nét lọn tóc tối hơn.
- **Kính đúng kiểu thật**: chữ nhật nhỏ, hẹp, đeo thấp — không phải kính vuông chung chung.
→ Quy tắc: chọn 1–2 món "chữ ký" và vẽ chúng **chi tiết nhất khung hình**; mọi thứ khác đơn giản hết mức. Nếu món chữ ký cũng trơn như phần còn lại, nhân vật sẽ không nhận ra được.

## Quy trình cho mỗi nhân vật thật
1. Tìm 3–5 ảnh công khai gần đây (WebSearch hình ảnh / mô tả báo chí). Ghi lại:
   - **Kiểu tóc + màu tóc** (bạc bông, vuốt ngược, hói, xoăn, chải lệch…)
   - **Kính** (tròn, vuông, gọng mảnh, kính đen, phi công) hoặc không
   - **Râu** (lún phún, quai nón, ria, dê)
   - **Trang phục "đồng phục"** (áo da đen, áo cổ lọ đen, hoodie xám, áo phông đen, vest + cà vạt đỏ)
   - **Đồ hay cầm / gắn với họ** (chip, tên lửa, burger, cốc cà phê, cặp, micro)
   - **Logo/chữ** gắn với họ (X, AI, $)
   - Dấu hiệu tuổi (nếp nhăn, bọng mắt), tỉ lệ đầu (đầu to = hài hơn)
2. Chọn **tối đa 4 dấu hiệu mạnh nhất** — phóng đại chúng, bỏ hết chi tiết khác.
3. Điền vào `Look` (xem `template/src/components/Character.tsx`) và lưu vào `template/cast/presets.json`.
4. Nếu món chữ ký chưa có trong `Character.tsx`, **thêm nó vào code với độ chi tiết cao** (như cách `leather` được vẽ: khóa kéo, cổ, túi, đường may, vệt bóng) thay vì dùng kiểu chung chung.
5. Render `npm run cast` → xem `out/cast.png`. Tự hỏi: che tên đi có đoán được không? Nếu không, tăng chi tiết món chữ ký.
6. Nhân vật phụ vô danh (đặc vụ, nhà đầu tư, nhân viên) dùng các preset `generic_*`, màu áo khác nhau.

## Các trường `Look`
| Trường | Giá trị |
|---|---|
| `hair` | swept (tóc bạc vuốt lệch có lọn), silver, bob, short, bald, slick, bun, messy, sidepart, long, curly, spiky, combover, buzz, receding, ponytail |
| `hairColor` | mã màu |
| `glasses` | narrow (chữ nhật nhỏ đeo thấp), none, round, shades, square, rimless, aviator |
| `beard` | none, stubble, gray-stubble, full, goatee, mustache |
| `outfit` | suit, leather, turtleneck, hoodie, tshirt, dress, vest, blazer, uniform |
| `outfitColor`, `shirtColor`, `tie` | mã màu |
| `logo` | chữ ngắn in trên áo |
| `hat` | none, cap, maga, cowboy, top, beanie |
| `holding` | none, phone, coffee, cigar, chip, briefcase, money, mic, rocket, burger |
| `earrings`, `wrinkles`, `eyeBags`, `cheeks` | true/false |
| `headScale` | 1.0–1.2 (đầu to = meme hơn) |

Biểu cảm (`expr`): neutral, happy, talk, shock, sad, smug, doubt, angry, cry, sweat.

## Ví dụ (đã có trong presets)
- **Jensen Huang**: tóc bạc vuốt lệch (`swept`) + kính hẹp (`narrow`) + áo khoác da biker chi tiết (`leather`) + cầm chip phát sáng.
- **Elon Musk**: tóc nâu chải lệch + áo phông đen chữ "X" + cầm tên lửa.
- **Warren Buffett**: tóc trắng chải ngang + kính vuông + vest + cà vạt đỏ đậm + burger.
- **Tim Cook**: tóc xám cắt sát + kính không gọng + áo cổ lọ đen.

## Giới hạn
- Biếm họa người nổi tiếng để bình luận/kể chuyện là hình thức phổ biến; **không** vẽ họ làm việc phạm pháp/bỉ ổi mà họ chưa bị cáo buộc thật, không gán lời nói bịa như phát ngôn thật.
- Không dùng logo thương hiệu thật dạng nguyên bản trên thumbnail; dùng chữ/ký hiệu gợi ý.
- Không dựng nhân vật là người bình thường (không nổi tiếng) bị nêu tên trong tin.
