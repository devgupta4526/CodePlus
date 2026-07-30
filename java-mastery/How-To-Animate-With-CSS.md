# 🎞️ HOW TO ANIMATE THE VIDEO WITH HTML/CSS

This explains how the two HTML files work together and how to turn them into your actual finished video.

---

## THE TWO FILES

1. **`CSS-Animation-Patterns.html`** — a library of 10 standalone, reusable animation patterns (pop-in, walk-in, expression cross-fade, capsule squish, card flip, line-draw arrows, table row build, glitch flash, domino fall, clone spread). Open it in a browser and hit "replay" on any block to see it in isolation. Copy whichever `@keyframes` + class you need into your own project.

2. **`Scene-Sequencer.html`** — shows how those patterns get **chained together on a timeline** to actually play through the video, scene after scene, using JavaScript to toggle which `.scene` div is visible and when. Hit "▶ Play full sequence" to watch 4 example scenes play back-to-back with a progress bar, exactly like a real video would.

Both are plain HTML/CSS/JS — no build tools, no frameworks. Just open the `.html` file directly in any browser.

---

## STEP-BY-STEP: BUILDING YOUR FULL VIDEO

### Step 1 — Generate your PNGs
Use the prompts from `PNG-Asset-Prompts.txt` in Midjourney/SDXL/DALL·E, remove backgrounds if needed, and save them into an `/assets/` folder next to your HTML file.

### Step 2 — Replace placeholders with real images
Everywhere you see:
```html
<div class="placeholder-asset dog">dog_sitting.png</div>
```
Replace it with:
```html
<img class="dog" src="assets/dog_sitting.png" style="width:100%;height:100%;object-fit:contain;">
```
The CSS classes (`.candidate`, `.dog`, `.house-1`, etc.) already carry the position/size/animation — you're just swapping the placeholder div for a real `<img>` tag with the same class.

### Step 3 — Duplicate the `.scene` pattern for every shot in the script
Each `.scene` in `Scene-Sequencer.html` is one shot from the main script. To add a new scene:
1. Copy an existing `<div class="scene" id="scene-N">...</div>` block and give it a new id.
2. Copy its matching CSS block (positions + `@keyframes`) and rename the selectors to match.
3. Add the new scene's id and duration (in milliseconds) to the `scenes` and `durations` arrays at the bottom of the file.
4. Add a matching entry to the `labels` array so the "Now playing" caption stays accurate.

Repeat this for all ~90 shots described in `OOP-Java-Animation-Scene-Guide.md` — by the end you'll have one long `Scene-Sequencer.html` that plays your entire video top to bottom.

### Step 4 — Match durations to the real script timestamps
The `durations` array controls how long each scene stays on screen. Pull these numbers directly from the timestamp ranges in the main script (e.g., `[13:30–20:00]` for Abstraction = 6.5 minutes = split across several shorter internal scenes within that range, not one giant 6.5-minute scene).

### Step 5 — Add narration/audio
This page only handles visuals. Record your voiceover separately (or generate it), then either:
- **Simplest:** screen-record the browser playing the sequence (with browser dev tools' responsive mode set to your target resolution, e.g. 1920×1080), then sync the audio track on top in your video editor.
- **More precise:** use the Web Audio API to `play()` an `<audio>` tag at the same time you call `playSequence()`, so visuals and voice are frame-locked inside the browser itself before you record.

### Step 6 — Export
Once everything is synced and looks right in-browser:
- Use a screen recorder (OBS Studio is free and reliable) set to capture just the `#stage` element's browser window at your target resolution and frame rate (30 or 60fps).
- Trim the recording in your video editor, add music/SFX per the production notes in the main script, and export your final video file.

---

## WHY THIS APPROACH WORKS

- **No AI video generation needed** — everything is deterministic CSS/JS, so it renders identically every time and costs nothing to re-render.
- **Fully editable text** — captions, code, and labels are real HTML text, not baked into images, so you can fix typos or retime things in seconds.
- **Reusable patterns** — the same "pop-in" or "card flip" class works for every scene that needs it; you're not hand-animating each moment from scratch.
- **Precise timing control** — the JS timeline gives you exact millisecond control over when each beat happens, which is hard to get from AI video generators.

---

## COMMON CUSTOMIZATIONS

| Want to... | Do this |
|---|---|
| Slow an animation down | Increase the duration value in the `animation:` CSS property (e.g. `.45s` → `.9s`) |
| Delay when something appears within a scene | Add/adjust `animation-delay` in seconds |
| Make text type itself out | Wrap the text in spans per character with a JS loop that reveals one span every ~40ms (classic typewriter effect) |
| Add a background music bed | Add an `<audio autoplay loop>` tag and trigger `.play()` inside `playSequence()` |
| Export at 4K instead of 1080p | Set your browser window / OBS capture resolution to 3840×2160 before recording — the layout uses relative/percentage units so it scales cleanly |
| Add captions/subtitles | Add a fixed-position `<div id="captions">` at the bottom of `#stage`, update its `textContent` inside each scene's timer callback in the JS |

---

## FILE CHECKLIST

- [ ] `/assets/` folder with all generated PNGs (from `PNG-Asset-Prompts.txt`)
- [ ] `CSS-Animation-Patterns.html` — kept as your personal reference library
- [ ] `Scene-Sequencer.html` — expanded to include all ~90 scenes from the script
- [ ] Voiceover audio file(s), one per section or one continuous track
- [ ] Screen recording software (OBS Studio recommended, free)
- [ ] Final video editor (DaVinci Resolve, Premiere, or CapCut) for trimming + music/SFX sync

Once `Scene-Sequencer.html` plays your whole video correctly in-browser with audio, you're just one screen-recording away from a finished export.
