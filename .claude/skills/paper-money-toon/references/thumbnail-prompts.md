# Thumbnail — công thức thật của kênh mẫu + prompt AI

Phân tích từ 4 thumbnail thật (ảnh chụp kênh, tháng 11/2026):

| Tiêu đề | Chữ trên thumbnail | Hình | Lượt xem | Dài |
|---|---|---|---|---|
| How a Chinese Spy Got Inside Nvidia | **$2 BILLION** (đỏ) **OF CHIPS** (trắng) | Jensen cười ngây thơ, chống cằm; nữ gián điệp kính đen váy đỏ cười nham hiểm, lén đẩy con chip phát sáng xanh dưới khăn bàn; nhà hàng nến, hoa hồng | 2,5 Tr / 3 ngày | 19:48 |
| Why the Stock Market Just Crashed | **NVIDIA** (trắng) **-$400B** (đỏ) | Jensen hoảng, mồ hôi, há miệng hét, bám vào con chip GPU khổng lồ đang nứt đôi phát sáng xanh; nền đêm tối | 1,1 Tr / 5 ngày | 15:00 |
| Why Nvidia Would Fail Without Jensen Huang | **ONE ZIPPER.** (trắng) **-$2 TRILLION** (đỏ) | Jensen nhăn nhó nghiến răng, mồ hôi, cầm đầu khóa kéo áo da phát sáng xanh (chơi chữ vụ bê bối); nền nhà hàng mờ | 1 Tr / 1 ngày | 14:21 |
| The Biggest IPO in History Lost $80 Billion | **-$80 BILLION** (đỏ) | CEO tóc xoăn kính tròn cười gượng, mồ hôi, kéo chuông sàn chứng khoán; sau lưng sàn giao dịch cháy, tiền bay, người chạy | 171 N / 7 ngày | 14:09 |

## Công thức (6 điểm)
1. **Phong cách hình KHÁC video**: thumbnail là tranh hoạt hình **vẽ chi tiết, tô bóng, viền đen dày** (do AI ảnh tạo), không phải vector phẳng. Nhân vật vẫn giữ dấu hiệu nhận diện (tóc, kính, áo da) nhưng chi tiết và cảm xúc mạnh hơn nhiều.
2. **1 nhân vật chính, mặt to** chiếm 35–50% khung, đặt bên trái/giữa; **biểu cảm cực đại**: hoảng + mồ hôi, cười gượng nghiến răng, hoặc ngây thơ đối lập với kẻ nham hiểm.
3. **Nhân vật đang chạm vào 1 vật ẩn dụ phát sáng** (xanh neon Nvidia): đầu khóa kéo, chip dưới bàn, GPU nứt, quả chuông. Vật đó chính là "câu chuyện".
4. **Chữ ở dải trên cùng**, 1 dòng, **phông sans siêu đậm in hoa** (kiểu Anton / Bebas Neue / Montserrat Black), viền đen + bóng đổ. **Số tiền màu đỏ** (thường có dấu **âm**: -$2 TRILLION, -$400B, -$80 BILLION), phần chữ còn lại màu trắng. 1–4 từ.
5. **Chữ bổ sung, không lặp tiêu đề**: tiêu đề nói "tại sao/thế nào", thumbnail nói "bao nhiêu tiền" + một móc chơi chữ ("ONE ZIPPER.").
6. **Nền là bối cảnh thật của truyện**, ánh sáng ấm hoặc lửa, có độ sâu mờ (bokeh); tông tối để chữ và vật phát sáng nổi bật.

## Quy trình tạo
1. Viết **3 ý tưởng** theo bảng: (nhân vật + biểu cảm) × (vật ẩn dụ phát sáng) × (chữ: số tiền đỏ + 0–2 từ trắng).
2. Tạo ảnh nền + nhân vật bằng AI ảnh (Nano Banana / Imagen / GPT-Image / Midjourney) với prompt mẫu bên dưới, **không yêu cầu AI viết chữ**, chừa trống 22% phía trên.
3. Đặt chữ bằng Remotion: sửa `storyboard/<ep>.thumb.json` (chế độ `image`) → `npm run still` — chữ sắc nét, đúng màu, đúng phông.
4. Xuất 1280×720, xem thử ở cỡ nhỏ (320×180): vẫn đọc được số tiền và nhận ra nhân vật.

## Khung prompt (tiếng Anh, dán vào AI ảnh)
```
YouTube thumbnail illustration, 16:9. Detailed cartoon style with thick black outlines, soft cel shading,
oversized round head, small body, expressive exaggerated face.
CHARACTER: {mô tả biếm họa: tóc, kính, áo, màu da — lấy từ cast}, {biểu cảm: panicked, sweating, gritted teeth / naive happy / sly smirk}.
ACTION: {nhân vật đang làm gì với vật ẩn dụ}.
KEY OBJECT: {vật ẩn dụ}, glowing bright neon green with light rays and sparks.
SETTING: {bối cảnh truyện}, cinematic warm lighting, shallow depth of field, bokeh background, dark moody tones.
COMPOSITION: character large on the left/center taking 40% of frame, object in center-right,
leave the top 22% of the image empty dark background for text. No text, no letters, no logos, no watermark.
```

## 4 prompt mẫu (dựng lại từ thumbnail thật)
**A — gián điệp dưới bàn**
```
YouTube thumbnail illustration, 16:9, detailed cartoon style, thick black outlines, cel shading, oversized round heads.
Left: an older Asian man with thick swept silver-gray hair, thin rectangular glasses, black leather biker jacket, smiling naively with chin on hand, holding a glass of red wine.
Right: a woman with a sleek black bob, cat-eye black sunglasses, red lipstick, gold earrings, red satin dress, sly smirk, chin on hand, secretly sliding a small glowing neon-green computer chip under the tablecloth.
Candlelit luxury restaurant table, red roses in a glass vase, candle, steaks, warm bokeh lights, red curtains.
Leave the top 22% dark and empty for text. No text, no logos.
```
**B — chip nứt**
```
YouTube thumbnail illustration, 16:9, detailed cartoon style, thick black outlines.
An older Asian man with thick swept silver-gray hair, thin rectangular glasses, black leather jacket, screaming in panic, sweat drops, wide eyes, clinging to the edge of a giant GPU computer chip that is cracking in half, the crack glowing intense neon green with sparks and flying components.
Dark night background, green smoke. Character on the left, chip center-right. Leave top 22% dark for text. No text.
```
**C — khóa kéo**
```
YouTube thumbnail illustration, 16:9, detailed cartoon style, thick black outlines, cel shading.
Close-up of an older Asian man with thick swept silver-gray hair, thin rectangular glasses, sweating, gritted teeth, worried eyebrows, wearing a black leather biker jacket, holding up the jacket's zipper pull which glows bright neon green with light rays.
Blurred luxury restaurant background with warm lamps and red curtains. Leave top 22% dark for text. No text.
```
**D — chuông IPO cháy**
```
YouTube thumbnail illustration, 16:9, detailed cartoon style, thick black outlines.
A man with curly dark-brown hair, round glasses, navy sweater, forced nervous grin, sweating, pulling the rope of a large golden stock-exchange bell.
Behind him a trading floor on fire, flying dollar bills, panicked small cartoon traders running, red falling charts on screens.
Character left-center, bell right. Leave top 22% dark for text. No text.
```
