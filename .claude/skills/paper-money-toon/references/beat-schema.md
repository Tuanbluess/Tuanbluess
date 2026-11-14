# Storyboard JSON schema

```json
{
  "title": "Why X Would Fail Without Y",
  "fps": 30,
  "voice": "voice.wav",
  "music": ["music_mystery.mp3", "music_warm.mp3"],
  "cast": {
    "boss":  {"hair": "silver", "glasses": "round", "outfit": "#111111", "skin": "#F2C9A0"},
    "spy":   {"hair": "bob",    "glasses": "shades","outfit": "#C8102E", "skin": "#F2C9A0"}
  },
  "shots": [
    {
      "id": "s001",
      "start": 0.0, "end": 2.4,
      "line": "This is Jensen.",
      "type": "scene",
      "set": "rooftop_sunset",
      "actors": [{"who": "boss", "x": 0.5, "y": 0.62, "scale": 1, "expr": "smug", "talking": false}],
      "props": [{"kind": "moneyStack", "x": 0.5, "y": 0.8, "grow": [0, 1]}],
      "labels": [{"text": "2026", "x": 0.06, "y": 0.08}],
      "camera": {"move": "pushIn", "amount": 0.06},
      "sfx": [{"at": 0.0, "name": "whoosh"}, {"at": 0.6, "name": "pop"}]
    },
    {
      "id": "s002", "start": 2.4, "end": 4.1,
      "line": "And Jensen has a huge problem.",
      "type": "blackCard",
      "text": "And Jensen has a huge problem.",
      "sfx": [{"at": 0.0, "name": "boom"}]
    }
  ]
}
```

- `type`: `scene` | `blackCard` | `title` | `map` | `chart`.
- `start`/`end`: giây, lấy từ timestamp giọng. Shot nối liền nhau, không hở.
- `camera.move`: `static` | `pushIn` | `pullOut` | `panLeft` | `panRight` | `shake` | `whip`.
- `expr`: `neutral` | `happy` | `talk` | `shock` | `sad` | `smug` | `doubt`.
- Mọi `x`,`y` là tỉ lệ 0–1 của khung.
- Mỗi shot `scene` nên có ≥ 1 `sfx` ở `at: 0`.

## Trường chuyển động (xem `motion-library.md`)
| Trường | Ví dụ |
|---|---|
| `transition` | `"whip"` — cut, whip, zoomIn, zoomOut, flash, slideUp, slideLeft, iris, glitch, spin, drop |
| `actors[].exprs` | `[{"at": 1.1, "expr": "shock", "talking": false}]` |
| `actors[].path` | `[{"at": 1.4, "x": 0.7, "y": 0.9}]` — đi tới vị trí mới |
| `actors[].enterAt` | `0.4` — bật vào sau 0,4 s |
| `pops` | `[{"content": "💾", "x": 0.5, "y": 0.4, "at": 0.6, "size": 140, "from": "top"}]` |
| `particles` | `"dust"` / `"money"` / `"rain"` / `"sparks"` / `"confetti"` / `"snow"` |
| `impacts` | `[0.8]` — rung khung tại 0,8 s |
| `speedLines` | `true` |

`cast` lấy từ `template/cast/presets.json` (biếm họa người thật) — xem `caricature-guide.md`.
