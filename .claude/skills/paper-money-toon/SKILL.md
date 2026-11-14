---
name: paper-money-toon
description: Làm video hoạt hình kể chuyện tiền bạc / doanh nghiệp / tin nóng theo trend (ngách kiểu Paper Billions — "money stories, drawn on paper") dài 12–20 phút, 16:9, nhịp cực nhanh (cắt cảnh ~2,4 s), nhân vật đầu tròn vẽ phẳng trong bối cảnh 2D có ánh sáng điện ảnh, kể gần như hoàn toàn bằng chuyển động + SFX + thoại nhân vật, xen thẻ chữ đen viết tay. Dùng khi người dùng nói "làm phim kiểu Paper Billions", "video hoạt hình kể chuyện công ty/tỷ phú", "money story animation", "dựng tập mới ngách này", đưa một chủ đề tin nóng (CEO từ chức, gián điệp, sập công ty, IPO…) và muốn ra kịch bản + storyboard + animation Remotion + SFX.
---

# Paper Money Toon — phim hoạt hình chuyện tiền theo trend

Skill này được rút ra từ việc đo trực tiếp 2 video của kênh mẫu (19:48 và 14:20).
Mọi con số ở đây là **đo được**, không đoán. Chi tiết đo: `references/pacing-and-structure.md`.

## 6 luật vàng (đừng phá)

1. **Mỗi câu thoại = ít nhất một cảnh mới.** Cắt trung vị 2,4 s, trung bình 3,1 s; 18–25 cảnh/phút; 40 s đầu tới 25–42 cảnh/phút. Không cảnh nào đứng yên > 6 s trừ cảnh "thở" có chủ đích.
2. **Kể bằng hình ẩn dụ, không bằng chữ.** Số liệu luôn biến thành vật: cột tiền xanh mọc lên, bảng cược 18% → 100%, áo khoác trên ma-nơ-canh "$300 vs $225", heo đất "RETIREMENT" nứt, bánh xe đạp vs tòa tháp.
3. **Nhân vật trong truyện nói thoại thật** (giọng riêng, câu 2–6 chữ, hài khô) — narrator dẫn, nhân vật "diễn" lại. ~30–40% thời lượng là thoại nhân vật.
4. **Thẻ chữ đen** (nền đen, chữ trắng viết tay nghiêng, hiện từng chữ theo giọng) cứ ~20 s xuất hiện một lần, dài ~2 s, chiếm 9–13% thời lượng. Dùng cho câu "đinh" và tên chương.
5. **SFX trên mọi cú cắt.** 75–77% cú cắt có tiếng transient trong ±150 ms; mật độ ~130 transient/phút (~2 tiếng/giây). Nhạc nền **không bao giờ tắt** (im lặng < 0,2%).
6. **Hook = cảnh giữa truyện + câu hỏi**, tiêu đề hiện ở ~0:40, rồi mới lùi về quá khứ.

## Quy trình (làm theo thứ tự)

### Bước 1 — Chọn chủ đề theo trend
- Tin nóng ≤ 2 tuần về một **người** cụ thể gắn với **tiền lớn** (CEO, tỷ phú, gián điệp, gian lận, sập sàn).
- Phải có: (a) một cảnh "điện ảnh" mở đầu được, (b) một quá khứ "zero to hero" để kể lại, (c) một góc **ảnh hưởng tới người xem** ("quỹ hưu của bạn có Nvidia").
- Tiêu đề dạng câu hỏi/khẳng định gây tò mò: *How a Chinese Spy Got Inside Nvidia*, *Why Nvidia Would Fail Without Jensen Huang*.
- Kiểm chứng mọi sự kiện/số liệu bằng nguồn thật; không bịa trích dẫn của người thật. Thoại "diễn lại" phải rõ là dựng lại, không gán lời giả cho người thật như phát ngôn thật.

### Bước 2 — Kịch bản (≈160 từ/phút → 14 phút ≈ 2.200 từ)
Dùng khung 8 hồi trong `references/pacing-and-structure.md#khung-truyen`. Viết theo **beat**: mỗi dòng là 1 câu ≤ 15 từ, gắn nhãn `N:` (narrator) hoặc tên nhân vật. Mỗi 3–5 beat chèn một câu đinh để làm thẻ chữ đen. Xuất `script.md`.

### Bước 3 — Storyboard JSON
Chuyển từng beat thành shot theo `references/beat-schema.md`. Mỗi shot chọn: bối cảnh (set), nhân vật + biểu cảm, chuyển động camera, prop ẩn dụ, nhãn chữ, SFX. Xuất `storyboard/epXX.json`. Kiểm tra bằng `python3 scripts/check_storyboard.py storyboard/epXX.json` (báo shot quá dài, thiếu SFX, thẻ đen quá thưa).

### Bước 4 — Giọng
- Narrator: 1 giọng nam/nữ trầm, nói nhanh, rõ, hơi mỉa.
- Mỗi nhân vật chính 1 giọng riêng; vai phụ dùng chung 2–3 giọng.
- Dùng TTS người dùng có (OmniVoice, ElevenLabs…). Ghép thành `public/voice.wav`, rồi lấy timestamp từng beat (Whisper / sherpa-onnx) → điền `start`/`end` vào storyboard. **Hình luôn khớp theo giọng, không ngược lại.**

### Bước 5 — Dựng hình (Remotion)
Copy `template/` thành project (`npm i`, `npx remotion studio`). Thư viện có sẵn:
- `Character` — nhân vật đầu tròn (tham số: tóc, kính, áo, màu da, biểu cảm, miệng nói theo giọng).
- `BlackCard` — thẻ đen chữ viết tay hiện từng chữ.
- `NameTag` — nhãn tên góc dưới kiểu ngoặc xanh.
- `CameraRig` — push-in / pan / shake / whip.
- `MoneyStack`, `Label` (chữ viết tay số liệu xanh), `Vignette`, `Glow`.
- `EpisodeFromJson` — đọc storyboard JSON và tự xếp shot.
Bộ nhận diện hình: `references/style-bible.md`. Muốn bối cảnh đẹp hơn có thể vẽ nền bằng AI ảnh (prompt mẫu trong style-bible) rồi đặt nhân vật vector lên trên.

### Bước 6 — Âm thanh
Theo `references/sound-design.md`: nhạc nền liên tục -22 LUFS dưới giọng, whoosh trên mọi chuyển cảnh, "pop" khi vật xuất hiện, ka-ching cho số tiền, typewriter/tick cho thẻ đen, stinger cho câu đinh. Master -14 LUFS.

### Bước 7 — QC & đóng gói
- Chạy `scripts/analyze_reference.sh video.mp4` lên **bản render của mình** và so với mục tiêu (median shot 2–2,8 s; thẻ đen 8–14%; ≥70% cắt có SFX).
- Sponsor/CTA chèn ở ~35–40% thời lượng bằng một câu nối từ chính câu chuyện.
- Kết bằng quay về cảnh mở đầu + câu hỏi mở; end screen "Watch next" 20 s.
- Thumbnail: nhân vật chính biểu cảm mạnh + 1 vật ẩn dụ phát sáng + ≤ 4 chữ.

## Phân tích video tham chiếu mới
Khi người dùng đưa thêm video của kênh mẫu/đối thủ: `bash scripts/analyze_reference.sh <file.mp4>` → in số cảnh, nhịp/phút, % thẻ đen, mật độ SFX, contact sheet. Cập nhật lại `references/pacing-and-structure.md` nếu nhịp khác.

## Ghi chú môi trường
- Render trong container cloud: thêm `--browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome` nếu Remotion không tự tải được Chromium.
- Demo 17 s: `cd template && npm i && npm run render` → `out/episode.mp4` (truyện hư cấu, chỉ để minh họa thư viện).
