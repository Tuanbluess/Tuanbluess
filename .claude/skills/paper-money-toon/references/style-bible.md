# Style bible — tạo hình & bối cảnh

Mục tiêu: **nhân vật vector phẳng, cực đơn giản** đặt trong **bối cảnh 2D có chiều sâu và ánh sáng điện ảnh** (đèn ấm, glow, vignette, bokeh). Hãy tạo bộ nhân vật và màu riêng cho kênh của bạn — đừng sao chép nhân vật/thiết kế của kênh mẫu.

## Nhân vật
- **Đầu**: hình tròn lớn (~45% chiều cao nhân vật), màu da phẳng + gradient tối nhẹ ở cằm, viền mảnh tối.
- **Mắt**: 2 chấm đen; cảm xúc bằng lông mày 1 nét + miệng. Nhân vật đặc trưng có phụ kiện mắt (kính tròn, kính đen).
- **Tóc**: 1 khối hình học (bob, tóc bạc bông, chải ngược…) — là dấu hiệu nhận diện số 1.
- **Thân**: khối "hạt đậu" nhỏ, không cổ; tay chân que hoặc ống mảnh. Trang phục = 1 màu đặc trưng (áo khoác da đen, áo đỏ, vest xanh navy + cà vạt).
- **Biểu cảm cần có**: neutral, cười tít mắt, há miệng nói, sốc (răng nghiến + đường căng), buồn, nghi ngờ (1 mày nhướn), ngủ gật.
- Mỗi người thật = **1 dấu hiệu + 1 màu** (vd: tóc bạc + kính + áo da đen). Nhân vật phụ: đầu tròn trơn, màu áo khác nhau, đứng thành đám đông.
- Miệng nhép theo biên độ giọng (2–3 hình miệng là đủ).

## Bối cảnh
- Vẽ theo lớp: nền xa (skyline, cửa sổ sáng) → trung (tường, bàn, cửa) → tiền (đèn, ly rượu, cây) để parallax.
- Ánh sáng: nguồn sáng ấm trong khung (nến, đèn bàn, biển hiệu neon) + vignette tối 4 góc + glow mềm. Ban đêm chiếm đa số.
- Bộ set lặp lại xuyên suốt tập (tiết kiệm + tạo nhận diện): nhà hàng sang (đỏ–vàng nến), phòng làm việc đêm Washington (bàn xanh, điện thoại quay số), văn phòng công ty (nhạt, cây cọ, bảng trắng), quán ăn kiểu diner, phòng họp hội đồng, bản đồ thế giới giấy (xanh nhạt, mây), sàn chứng khoán đỏ, vũ trụ tối với chip phát sáng.
- Màu "tiền" = **xanh neon (#39FF14–#76E05A) phát sáng**; màu "nguy hiểm" = đỏ; màu "chính phủ" = xanh navy.

## Chữ trên hình
- Phông viết tay (vd: *Caveat*, *Kalam*, *Patrick Hand* — Google Fonts) cho mọi nhãn.
- Nhãn địa điểm/thời gian góc dưới trái nhỏ: `JUNE 2024 · TAIPEI`.
- Nhãn tên: ngoặc vuông xanh + tên in hoa + chức danh dưới.
- Số tiền: xanh phát sáng, đếm lên (`$6,250,056` → `$ BILLIONS`).
- Thẻ đen: chữ trắng nghiêng viết tay, giữa khung, hiện dần theo từng từ của giọng.

## Kiểu ẩn dụ hình (thư viện ý tưởng)
cột tiền xanh mọc theo năm · lịch lật / khoanh đỏ ngày · bảng cược % · heo đất nứt · bản đồ với mũi tên bay · bảng ghim ảnh + chỉ đỏ (điều tra) · khung ống ngắm máy ảnh (bị theo dõi) · đồng hồ quay nhanh · hộp phủ mạng nhện rồi bùng sáng (đầu tư dài hạn trả quả) · biểu đồ nến · áo/ghế trống (người vắng mặt) · sơ đồ bánh xe vs kim tự tháp (tổ chức).

## Prompt nền AI (nếu muốn nền đẹp hơn vector)
```
flat 2D cartoon background, {SET}, cinematic night lighting, warm practical lights, soft glow, subtle paper texture, vignette, no people, no text, 16:9, clean vector shapes with soft gradients
```
