#!/usr/bin/env bash
# Tạo bộ SFX cơ bản bằng ffmpeg (không cần tải gì). Dùng: bash make_sfx.sh public/sfx
set -euo pipefail
D="${1:-public/sfx}"; mkdir -p "$D"
f() { ffmpeg -v error -y -f lavfi -i "$1" -af "$2" -ar 44100 -ac 2 "$D/$3.wav"; }
f "anoisesrc=d=0.35:c=pink:a=0.8" "highpass=f=400,lowpass=f=6000,afade=t=in:d=0.15,afade=t=out:st=0.15:d=0.2,volume=0.8" whoosh
f "anoisesrc=d=0.25:c=white:a=0.9" "bandpass=f=2500:w=3000,afade=t=in:d=0.05,afade=t=out:st=0.05:d=0.2" swish
f "sine=f=900:d=0.09" "asetrate=44100*1.0,vibrato=f=30:d=0.3,afade=t=out:st=0.02:d=0.07,volume=0.7" pop
f "sine=f=2200:d=0.03" "afade=t=out:d=0.03,volume=0.35" tick
f "sine=f=55:d=0.9" "afade=t=out:st=0.05:d=0.85,volume=1.6" boom
f "sine=f=1800:d=0.5" "aecho=0.8:0.7:40:0.4,afade=t=out:st=0.1:d=0.4,volume=0.5" ding
f "sine=f=2600:d=0.6" "tremolo=f=25:d=0.9,afade=t=out:st=0.2:d=0.4,volume=0.4" kaching
f "anoisesrc=d=0.08:c=white:a=1" "highpass=f=1500,afade=t=out:d=0.08" shutter
f "sine=f=320:d=0.5" "vibrato=f=12:d=0.8,afade=t=out:st=0.1:d=0.4,volume=0.6" boing
f "anoisesrc=d=1.2:c=brown:a=0.6" "lowpass=f=300,afade=t=in:d=0.1,afade=t=out:st=0.6:d=0.6" rumble
ls "$D"
