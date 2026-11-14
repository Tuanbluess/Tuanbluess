# Thiết kế âm thanh

Đo được: ~130 transient/phút, 75% cú cắt có SFX trong ±150 ms, gần như không có giây im lặng. Âm thanh gánh một nửa sự "cuốn".

## Lớp
1. **Giọng** (narrator + nhân vật) — ưu tiên số 1, -16 LUFS trước master.
2. **Nhạc nền** liên tục, đổi track theo hồi (bí ẩn/hồi hộp cho cold open, ấm áp cho quá khứ, căng cho phần khủng hoảng). Duck -8 dB dưới giọng.
3. **SFX** — mỗi cú cắt và mỗi vật xuất hiện.
4. **Room tone/ambience** theo set: tiếng mưa, quán ăn, văn phòng, thành phố đêm.

## Bản đồ SFX → sự kiện hình
| Sự kiện | SFX |
|---|---|
| Chuyển cảnh thường | whoosh ngắn (100–250 ms) |
| Vật bật ra/scale-in | pop / bubble |
| Số tiền đếm lên | coin rattle + ka-ching ở số cuối |
| Thẻ đen chữ hiện | tick/typewriter nhẹ mỗi từ + low boom khi vào |
| Câu đinh / twist | stinger, record scratch, bass hit |
| Ghim ảnh/chụp ảnh | camera shutter |
| Lịch lật / đồng hồ | paper flip, clock tick nhanh |
| Bảng cược nhảy % | slot-machine ding |
| Sốc nhân vật | cartoon "boing" / glass crack |
| Whip pan | swish mạnh |

## Nguồn SFX
Pixabay (miễn phí, license thương mại), freesound (CC0), hoặc tự tổng hợp bằng ffmpeg/sox (`scripts/make_sfx.sh` tạo whoosh/pop/tick/boom cơ bản).

## Master
Loudness -14 LUFS, true peak -1 dB: `ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1:LRA=11 out.wav`.
