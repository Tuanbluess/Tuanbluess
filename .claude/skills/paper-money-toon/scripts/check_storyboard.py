#!/usr/bin/env python3
"""Kiểm tra storyboard JSON so với nhịp mục tiêu của ngách.
Dùng: python3 check_storyboard.py storyboard/ep01.json
"""
import json, statistics as st, sys

sb = json.load(open(sys.argv[1]))
shots = sb["shots"]
problems = []
durs = []
last_card = 0.0
static_count = 0
prev_special = None


def events(s):
    """Số sự kiện chuyển động trong shot (ngoài camera trôi)."""
    n = len(s.get("pops", [])) + len(s.get("props", [])) + len(s.get("impacts", []))
    n += sum(1 for l in s.get("labels", []) if l.get("countTo") is not None or l.get("at", 0) > 0.3)
    for a in s.get("actors", []):
        n += len(a.get("exprs", [])) + len(a.get("path", [])) + (1 if a.get("enterAt", 0) > 0 else 0)
    return n + (1 if s.get("speedLines") else 0)


for i, s in enumerate(shots):
    d = s["end"] - s["start"]
    durs.append(d)
    kind = s.get("type", "scene")
    if i and abs(s["start"] - shots[i - 1]["end"]) > 0.05:
        problems.append(f'{s["id"]}: hở/chồng {s["start"] - shots[i-1]["end"]:+.2f}s so với shot trước')
    if kind == "scene":
        if d > 6.5:
            problems.append(f'{s["id"]}: dài {d:.1f}s (> 6.5s) — tách thành 2–3 shot')
        if not s.get("sfx"):
            problems.append(f'{s["id"]}: thiếu SFX')
        need = 0 if d < 1.0 else (1 if d <= 3 else int(d))  # shot < 1s = montage chớp
        if events(s) < need:
            problems.append(f'{s["id"]}: {d:.1f}s nhưng chỉ {events(s)} sự kiện (cần ≥ {need}) — thêm exprs/path/pops/labels')
        if s.get("camera", {}).get("move") == "static":
            static_count += 1
        t = s.get("transition", "cut")
        if t != "cut" and t == prev_special and d >= 1.0:
            problems.append(f'{s["id"]}: chuyển cảnh "{t}" lặp lại liền nhau')
        prev_special = t if t != "cut" else None
        if d >= 1.0 and not s.get("particles") and s.get("set", "") in ("night_city", "fancy_dinner", "dark_desk", "void_green"):
            problems.append(f'{s["id"]}: cảnh tối nên có particles (dust/rain/sparks)')
    if kind == "blackCard":
        if s["start"] - last_card > 45:
            problems.append(f'{s["id"]}: {s["start"]-last_card:.0f}s không có thẻ đen trước đó (mục tiêu ~20s)')
        last_card = s["end"]

scenes = [s for s in shots if s.get("type", "scene") == "scene"]
if scenes and static_count / len(scenes) > 0.1:
    problems.append(f'camera static ở {static_count}/{len(scenes)} shot (tối đa 10%)')
total = shots[-1]["end"] - shots[0]["start"]
cards = sum(s["end"] - s["start"] for s in shots if s.get("type") == "blackCard")
words = sum(len(s.get("line", "").split()) for s in shots)
print(f'{len(shots)} shot, {total/60:.1f} phút, {len(shots)/total*60:.1f} shot/phút')
print(f'Trung vị {st.median(durs):.2f}s (mục tiêu 2.0–2.8), TB {st.mean(durs):.2f}s (≤3.3)')
print(f'Thẻ đen {100*cards/total:.0f}% (mục tiêu 8–14%)')
if words:
    print(f'Tốc độ lời thoại ≈ {words/total*60:.0f} từ/phút (EN mục tiêu 165–175)')
first40 = [s for s in shots if s["start"] < 40]
if total >= 40:
    print(f'40s đầu: {len(first40)} shot (mục tiêu ≥ 18)')
print("\n".join(problems) if problems else "Không có lỗi.")
