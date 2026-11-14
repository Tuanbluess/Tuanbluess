---
name: paper-money-toon
description: Làm video hoạt hình kể chuyện tiền bạc / doanh nghiệp / tin nóng theo trend (ngách kiểu Paper Billions — "money stories, drawn on paper") dài 12–20 phút, 16:9, nhịp cực nhanh (cắt cảnh ~2,4 s, chuyển động không ngừng), nhân vật biếm họa người thật kiểu meme (tóc, kính, áo khoác, đồ hay cầm), bối cảnh 2D ánh sáng điện ảnh, giọng đọc nhanh, SFX dày, thẻ chữ đen viết tay. Bắt đầu bằng việc đề xuất 5 tiêu đề hot rồi cho chọn ngôn ngữ, thời lượng, tiêu đề, thumbnail theo phong cách đối thủ. Dùng khi người dùng nói "làm phim kiểu Paper Billions", "video hoạt hình kể chuyện công ty/tỷ phú", "money story animation", "dựng tập mới ngách này", "tìm chủ đề hot", hoặc đưa một tin nóng (CEO từ chức, gián điệp, sập công ty, IPO…).
---

# Paper Money Toon — phim hoạt hình chuyện tiền theo trend

Rút ra từ việc đo trực tiếp 2 video của kênh mẫu (19:48 và 14:20). Con số đo: `references/pacing-and-structure.md`.

## 7 luật vàng (đừng phá)

1. **Không frame nào đứng yên.** Camera luôn trôi, nhân vật luôn thở/lắc/nói, hạt bụi luôn bay. Mỗi ~1 giây có một sự kiện mới trong shot (`references/motion-library.md`).
2. **Mỗi câu = ít nhất một cảnh mới.** Cắt trung vị 2,4 s; 18–25 cảnh/phút; 40 s đầu 25–42 cảnh/phút; hiếm khi > 6 s.
3. **Giọng nhanh, liền mạch:** ~165–175 từ/phút (EN), khoảng lặng giữa câu ≤ 0,25 s.
4. **Nhân vật là biếm họa người thật**: nhận ra trong 0,5 s nhờ tóc, kính, áo, đồ hay cầm (`references/caricature-guide.md`).
5. **Kể bằng ẩn dụ chuyển động**, không bằng chữ: số liệu thành vật (cột tiền, bảng cược, heo đất nứt, áo khoác trên ma-nơ-canh).
6. **Thẻ chữ đen** ~20 s/lần, ~2 s, 9–13% thời lượng — cho câu đinh và tên chương.
7. **SFX trên mọi cú cắt** (≥ 70%), ~2 tiếng/giây; nhạc nền không bao giờ tắt.

## Quy trình

### Bước 0 — Chọn cùng người dùng (BẮT BUỘC hỏi trước khi viết)
Làm theo `references/topic-and-packaging.md`:
1. **Tìm & chấm điểm tin nóng 14 ngày** → trình bày **5 tiêu đề hot** viết theo công thức tiêu đề của đối thủ (kèm lý do hot, điểm, nguồn). Hỏi chọn 1.
2. **Ngôn ngữ** (EN mặc định như đối thủ; VI, ES, PT, DE, JA, KO).
3. **Thời lượng** như đối thủ: 12–15 phút hoặc 15–20 phút.
4. **Tiêu đề**: 3 phương án theo công thức How/Why + tên lớn + yếu tố lạ.
5. **Thumbnail**: 3 phương án theo `references/thumbnail-prompts.md` — viết prompt AI ảnh (tranh hoạt hình chi tiết, nhân vật mặt to cảm xúc cực đại, vật ẩn dụ phát sáng xanh, chừa 22% trên), rồi đặt chữ sans siêu đậm (số tiền đỏ có dấu âm + từ trắng) bằng `npm run still`.
Dùng `AskUserQuestion` (gộp 1–4 câu mỗi lần). Có thể hỏi 0.2 + 0.3 cùng lúc với 0.1.

### Bước 1 — Nghiên cứu & dàn ý
Kiểm chứng mọi sự kiện/số liệu bằng nguồn thật; lưu `research.md` (link nguồn). Thoại "diễn lại" phải là dựng lại rõ ràng, không bịa phát ngôn thật của người thật. Dàn ý theo khung 8 hồi trong `references/pacing-and-structure.md#khung-truyen`.

### Bước 2 — Kịch bản
Đủ số từ theo thời lượng + ngôn ngữ đã chọn. Viết theo beat: mỗi dòng 1 câu ≤ 15 từ, nhãn `N:` (narrator) hoặc tên nhân vật; ~30–40% là thoại nhân vật ngắn, hài khô. Mỗi 3–5 beat một câu đinh → thẻ đen. Có callback mở–kết, quy đổi số tiền về từng người xem. Xuất `script.md`.

### Bước 3 — Dàn nhân vật
Với mỗi người thật trong truyện: làm theo `references/caricature-guide.md` → thêm vào `template/cast/presets.json` → `npm run cast` → xem `out/cast.png` và sửa tới khi nhận ra được. Gửi ảnh cast cho người dùng duyệt.

### Bước 4 — Giọng
Narrator + mỗi nhân vật chính 1 giọng riêng (TTS người dùng có: OmniVoice, ElevenLabs…), tốc độ 1.08–1.15x, cắt khoảng lặng dài. Ghép `public/voice.wav`, lấy timestamp từng beat (Whisper/sherpa-onnx) → điền `start`/`end`. **Hình khớp theo giọng.**

### Bước 5 — Storyboard JSON
Theo `references/beat-schema.md`. Mỗi shot: set, nhân vật (+ `exprs`/`path` giữa shot), `pops`, `labels`, `camera`, `transition`, `particles`, `impacts`, `sfx`. Chạy `python3 scripts/check_storyboard.py storyboard/epXX.json` tới khi hết cảnh báo.

### Bước 6 — Dựng (Remotion)
Copy `template/` thành project (`npm i`). `npx remotion studio` để xem; components: `Character` (biếm họa, 10 biểu cảm), `TransitionIn` (11 kiểu), `Particles`, `SpeedLines`, `PopItem`, `CameraRig`, `BlackCard`, `NameTag`, `Label`, `MoneyStack`, `Glow`, `Vignette`, bối cảnh trong `Sets.tsx` (hoặc ảnh nền AI `img:<file>`, prompt trong `references/style-bible.md`).

### Bước 7 — Âm thanh
`references/sound-design.md`. SFX cơ bản: `bash scripts/make_sfx.sh public/sfx`; nên thay bằng SFX thật (Pixabay/freesound) cho chất lượng cao. Master -14 LUFS.

### Bước 8 — QC & đóng gói
- `bash scripts/analyze_reference.sh out/episode.mp4` trên bản render; so mục tiêu (median 2–2,8 s; thẻ đen 8–14%; ≥ 70% cắt có SFX; im lặng ≈ 0).
- Sponsor/CTA ở 35–40%, nối từ câu chuyện. Kết: quay về cảnh mở + câu hỏi mở + end screen 20 s.
- Giao: video, thumbnail đã chọn, tiêu đề, mô tả (tóm tắt + nguồn + chương mục), 10–15 tag.

## Phân tích đối thủ mới
`bash scripts/analyze_reference.sh <file.mp4>` → số cảnh, nhịp/phút, % thẻ đen, mật độ SFX, contact sheet. Ảnh thumbnail đối thủ: xem ảnh và cập nhật `references/thumbnail-prompts.md`.

## Ghi chú môi trường
- Render trong container cloud: thêm `--browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome` nếu Remotion không tự tải Chromium.
- Demo: `cd template && npm i && npm run render` (video), `npm run still` (thumbnail), `npm run cast` (bảng nhân vật).
