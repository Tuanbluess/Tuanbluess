# Thiết kế nhân vật biếm họa theo người thật (kiểu meme)

Mục tiêu: người xem **nhận ra ngay trong 0,5 giây** chỉ nhờ vài dấu hiệu, dù nhân vật cực đơn giản.

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
4. Render `npm run cast` → xem `out/cast.png`. Tự hỏi: che tên đi có đoán được không? Nếu không, đổi dấu hiệu.
5. Nhân vật phụ vô danh (đặc vụ, nhà đầu tư, nhân viên) dùng các preset `generic_*`, màu áo khác nhau.

## Các trường `Look`
| Trường | Giá trị |
|---|---|
| `hair` | silver, bob, short, bald, slick, bun, messy, sidepart, long, curly, spiky, combover, buzz, receding, ponytail |
| `hairColor` | mã màu |
| `glasses` | none, round, shades, square, rimless, aviator |
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
- **Jensen Huang**: tóc bạc bông + kính vuông + áo da đen + cầm chip phát sáng.
- **Elon Musk**: tóc nâu chải lệch + áo phông đen chữ "X" + cầm tên lửa.
- **Warren Buffett**: tóc trắng chải ngang + kính vuông + vest + cà vạt đỏ đậm + burger.
- **Tim Cook**: tóc xám cắt sát + kính không gọng + áo cổ lọ đen.

## Giới hạn
- Biếm họa người nổi tiếng để bình luận/kể chuyện là hình thức phổ biến; **không** vẽ họ làm việc phạm pháp/bỉ ổi mà họ chưa bị cáo buộc thật, không gán lời nói bịa như phát ngôn thật.
- Không dùng logo thương hiệu thật dạng nguyên bản trên thumbnail; dùng chữ/ký hiệu gợi ý.
- Không dựng nhân vật là người bình thường (không nổi tiếng) bị nêu tên trong tin.
