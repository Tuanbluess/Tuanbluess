# Thư viện chuyển động — "không có frame nào đứng yên"

Kênh mẫu giữ người xem bằng **chuyển động liên tục ở 3 tầng**. Mỗi shot phải có đủ cả 3.

## Tầng 1 — Luôn chạy (tự động, không cần khai báo)
- Camera trôi (`camera.move`, mặc định pushIn) — không dùng `static` quá 1 lần mỗi 10 shot.
- Nhân vật thở, lắc lư, chớp mắt; khi `talking` thì nhún, vung tay, miệng nhép.
- Đèn nến/neon nhấp nháy, cửa sổ thành phố bật tắt.
- `particles` (dust/rain/sparks/money/confetti/snow) cho mọi cảnh tối.

## Tầng 2 — Mỗi ~1 giây một sự kiện trong shot
Shot 2–3 s cần **1–2 sự kiện**; shot > 3 s cần **≥ 1 sự kiện mỗi giây**:
- `exprs`: đổi biểu cảm đúng từ khóa (`{"at": 1.2, "expr": "shock"}`)
- `path`: nhân vật bước vào/ra, tiến lại gần (`{"at": 1.5, "x": 0.7, "y": 0.88}`)
- `pops`: vật bay vào (emoji, ký hiệu, chữ to) từ scale/trái/phải/trên/dưới
- `labels` với `countTo`: số tiền đếm lên
- `props`: cột tiền mọc
- `impacts`: rung khung tại giây va chạm (kèm SFX boom)
- `speedLines`: đường tốc độ cho twist/sốc

## Tầng 3 — Chuyển cảnh đa dạng
`transition`: cut, whip, zoomIn, zoomOut, flash, slideUp, slideLeft, iris, glitch, spin, drop.
- Mặc định là **cut + SFX whoosh** (~60% số shot).
- Còn lại xoay vòng; **không dùng 1 kiểu đặc biệt 2 lần liền**.
- `flash`/`glitch` cho twist; `whip` cho đổi địa điểm; `zoomIn` vào chi tiết; `iris` mở chương; `drop`/`spin` cho hài.

## Kỹ thuật dựng nhịp
- **Cắt ngang câu**: đổi hình giữa câu tại từ khóa, không đợi hết câu.
- **Montage 0,3–0,7 s**: 4–8 shot liên tiếp cho danh sách ("Cisco, Microsoft, Texas Instruments").
- **Match cut**: hình tròn → đồng hồ → đồng xu; áo khoác → áo khoác trên ma-nơ-canh.
- **Cảnh thở** 5–6 s chỉ dùng sau đoạn dồn dập, 1 lần mỗi 2–3 phút, vẫn có camera trôi + hạt.
- **Thẻ đen** cắt ngang dòng hình, đẩy câu đinh; ngay sau thẻ đen là shot có chuyển động mạnh.

`scripts/check_storyboard.py` báo shot thiếu sự kiện, chuyển cảnh lặp, camera tĩnh quá nhiều.
