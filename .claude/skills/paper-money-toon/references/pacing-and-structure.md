# Nhịp dựng & cấu trúc truyện (đo từ 2 video mẫu)

Video A: *How a Chinese Spy Got Inside Nvidia* — 19:48
Video B: *Why Nvidia Would Fail Without Jensen Huang* — 14:20
Công cụ: ffmpeg scene detect (ngưỡng 0.25), phát hiện khung đen, phân tích transient âm thanh, chép lời bằng Whisper small.en.

## Số đo

| Chỉ số | A | B | Mục tiêu cho skill |
|---|---|---|---|
| Số cảnh | 389 | 260 | ~20/phút |
| Độ dài cảnh trung vị | 2,40 s | 2,45 s | 2,0–2,8 s |
| Trung bình | 3,05 s | 3,31 s | ≤ 3,3 s |
| 10% ngắn nhất | ≤ 0,70 s | ≤ 0,27 s | có cú cắt "chớp" 0,2–0,7 s |
| 90% | ≤ 6,1 s | ≤ 6,0 s | hiếm khi > 6 s |
| Cảnh/phút phút đầu | 25 | 42 | 30–40 |
| Thẻ chữ đen | 58 lần, 13% | 38 lần, 9% | 1 lần / ~20 s, ~2 s mỗi lần |
| Tốc độ đọc | ~163 từ/phút | ~160 từ/phút | 155–165 |
| Cắt có SFX (±150 ms) | 75% | 77% | ≥ 70% |
| Transient âm cao/phút | 128 | 131 | ~2 tiếng/giây |
| Thời gian im lặng | 0,2% | 0,1% | ~0 (nhạc nền luôn chạy) |

Nhịp không đều: có phút 8–9 cảnh (cảnh "thở", thường là cảnh cảm xúc hoặc giải thích dài bằng một ẩn dụ chuyển động liên tục) xen phút 27–33 cảnh (dồn dập, montage). Xen kẽ nhanh/chậm khoảng mỗi 2–3 phút.

## Khung truyện 8 hồi {#khung-truyen}

| # | Hồi | Thời điểm (14 phút) | Mẫu từ video |
|---|---|---|---|
| 1 | **Cold open giữa truyện** | 0:00–0:35 | B: "This is Jensen and Jensen has a huge problem… 33 years and this week he lost it." A: bữa tối ở Singapore, đặc vụ chụp ảnh, "Jensen has no idea." |
| 2 | Câu hỏi lớn + tiêu đề | 0:35–0:45 | "Can NVIDIA survive without him?" → title card |
| 3 | Lùi về gốc rễ (zero → hero) | 0:45–4:00 | Rửa toilet ở Kentucky, Denny's, 30 ngày trước phá sản |
| 4 | Cơ chế / "tại sao quan trọng" bằng ẩn dụ | 3:00–5:30 | 1 đầu bếp vs 10.000 đầu bếp; tòa tháp vs bánh xe đạp |
| 5 | **Kéo người xem vào** | ~5:00 | "Got an S&P 500 fund? Then you own Nvidia." / "$13 from every person in America" |
| 6 | Sponsor nối từ câu chuyện | ~35–40% | "So if you think Nvidia is going down… you can place that trade" |
| 7 | Tiền lệ lịch sử so sánh (2–3 ca) | giữa | HP–Mark Hurd, Intel 2018, Apple mất Jobs 1985 vs 2011 |
| 8 | Quay về cảnh mở + câu hỏi mở | 2 phút cuối | Ghế trống cạnh Jensen; "Tuesday… nobody knows who gets to…" |

Tên chương xuất hiện bằng thẻ đen ("The Man With the Key", "The Approach").

## Kỹ thuật viết thoại

- Câu ngắn, cắt ngang câu ở chỗ bất ngờ để cắt cảnh: "…because he couldn't keep his pants zipped."
- **Lặp lại & đảo** để làm punchline: "Dishes first. Then busboy. Then more dishes." … (cuối) "Still remember how? Dishes first."
- **Callback**: chi tiết ở phút 1 trả lại ở phút cuối (bữa tối, chiếc áo khoác, "30 days").
- **Quy đổi số về con người**: "$4.5 billion… about $13 from every person in America"; "$10,000 in an S&P fund → six or seven hundred is Nvidia".
- **Thoại diễn lại 2 vế** hài khô giữa câu narrator: "Can I keep the jacket?" "No."; "How long have we got?" "30 days." "And if the chip doesn't sell?" "29."
- Đặt câu hỏi rồi trả lời ngay bằng hình: "Name one Nvidia executive who isn't Jensen Huang. You can't."
- "Hold that thought." — treo một ý để trả lại sau.

## Cấu trúc một shot điển hình (2–3 s)
1. Cắt vào (whoosh/pop) → 2. camera đang trôi chậm (push-in 3–8% hoặc pan) → 3. một hành động chính (vật xuất hiện, nhân vật quay đầu, số đếm lên) đúng từ khóa trong câu → 4. cắt ra trước khi câu kế bắt đầu 2–4 frame.
