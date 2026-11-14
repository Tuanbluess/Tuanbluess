#!/usr/bin/env bash
# Đo nhịp dựng của một video: số cảnh, độ dài cảnh, cảnh/phút, % thẻ chữ đen,
# mật độ SFX, % cú cắt có SFX, và xuất contact sheet 72 giây đầu.
# Dùng: bash analyze_reference.sh video.mp4 [out_dir]
set -euo pipefail
IN="$1"; OUT="${2:-$(dirname "$IN")/analysis_$(basename "${IN%.*}")}"
mkdir -p "$OUT"
ffmpeg -v error -i "$IN" -vf "select='gt(scene,0.25)',metadata=print:file=$OUT/scenes.txt" -an -f null -
ffmpeg -v error -y -i "$IN" -vf "fps=5,scale=64:36,format=gray" -f rawvideo "$OUT/gray.raw"
ffmpeg -v error -y -i "$IN" -ac 1 -ar 16000 "$OUT/audio.wav"
ffmpeg -v error -y -i "$IN" -t 72 -vf "fps=1,scale=384:-1,tile=6x12" -frames:v 1 "$OUT/contact_open.jpg"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
python3 - "$OUT" "$DUR" <<'PY'
import sys, re, wave, statistics as st
import numpy as np
out, dur = sys.argv[1], float(sys.argv[2])
cuts = [float(x) for x in re.findall(r'pts_time:([\d.]+)', open(f'{out}/scenes.txt').read())]
t = [0] + cuts + [dur]; d = sorted(b - a for a, b in zip(t, t[1:]))
print(f'Thời lượng {dur/60:.1f} phút | {len(d)} cảnh | {len(d)/dur*60:.1f} cảnh/phút')
print(f'Độ dài cảnh: trung vị {st.median(d):.2f}s, TB {st.mean(d):.2f}s, p10 {d[len(d)//10]:.2f}s, p90 {d[len(d)*9//10]:.2f}s')
print('Cảnh theo phút:', ' '.join(str(sum(1 for x in t if m <= x < m + 60)) for m in range(0, int(dur), 60)))
g = np.fromfile(f'{out}/gray.raw', dtype=np.uint8).reshape(-1, 36 * 64)
dark = (g > 40).mean(1) < 0.06; segs = []; s = None
for i, x in enumerate(list(dark) + [False]):
    if x and s is None: s = i
    if not x and s is not None:
        if i - s >= 4: segs.append((i - s) / 5)
        s = None
if segs: print(f'Thẻ chữ đen: {len(segs)} lần, {100*sum(segs)/(len(g)/5):.0f}% thời lượng, TB {st.mean(segs):.1f}s')
w = wave.open(f'{out}/audio.wav'); sr = w.getframerate()
a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
n = sr // 20; f = a[:len(a)//n*n].reshape(-1, n)
rms = 20 * np.log10(np.sqrt((f**2).mean(1)) + 1e-9)
F = np.abs(np.fft.rfft(f * np.hanning(n), axis=1)); hf = F[:, F.shape[1]//2:].sum(1)
on = np.where(np.diff(np.log(hf + 1e-6)) > 1.2)[0]; on = on[np.insert(np.diff(on) > 3, 0, True)] / 20
hit = sum(1 for c in cuts if np.any(np.abs(on - c) < 0.15))
print(f'Âm thanh: im lặng {100*(rms<-50).mean():.1f}% | transient {len(on)/dur*60:.0f}/phút | cắt có SFX {hit}/{len(cuts)} ({100*hit/max(1,len(cuts)):.0f}%)')
PY
rm -f "$OUT/gray.raw"
echo "Contact sheet: $OUT/contact_open.jpg"
