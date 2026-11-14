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
for i, s in enumerate(shots):
    d = s["end"] - s["start"]
    durs.append(d)
    if i and abs(s["start"] - shots[i - 1]["end"]) > 0.05:
        problems.append(f'{s["id"]}: hở/chồng {s["start"] - shots[i-1]["end"]:+.2f}s so với shot trước')
    if s.get("type", "scene") == "scene":
        if d > 6.5:
            problems.append(f'{s["id"]}: dài {d:.1f}s (> 6.5s) — tách thành 2–3 shot')
        if not s.get("sfx"):
            problems.append(f'{s["id"]}: thiếu SFX')
    if s.get("type") == "blackCard":
        if s["start"] - last_card > 45:
            problems.append(f'{s["id"]}: {s["start"]-last_card:.0f}s không có thẻ đen trước đó (mục tiêu ~20s)')
        last_card = s["end"]
total = shots[-1]["end"] - shots[0]["start"]
cards = sum(s["end"] - s["start"] for s in shots if s.get("type") == "blackCard")
print(f'{len(shots)} shot, {total/60:.1f} phút, {len(shots)/total*60:.1f} shot/phút')
print(f'Trung vị {st.median(durs):.2f}s (mục tiêu 2.0–2.8), TB {st.mean(durs):.2f}s (≤3.3)')
print(f'Thẻ đen {100*cards/total:.0f}% (mục tiêu 8–14%)')
first40 = [s for s in shots if s["start"] < 40]
print(f'40s đầu: {len(first40)} shot (mục tiêu ≥ 18)')
print("\n".join(problems) if problems else "Không có lỗi.")
