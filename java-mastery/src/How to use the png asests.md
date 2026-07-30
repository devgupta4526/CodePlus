# 📦 HOW TO USE THE PNG ASSETS — ANIMATION WORKFLOW GUIDE

This guide explains how to take the individual PNG assets (from `PNG-Asset-Prompts.md`) and assemble them into the full animated video described in the main script.

---

## 1. THE CORE IDEA: "PUPPET" ASSEMBLY

Instead of generating one finished video clip per scene, you are generating **separate character parts, objects, and UI pieces as individual transparent PNGs**. This is the same method used in cutout/puppet animation (South Park, classic Adobe Character Animator workflows). You then:

1. Import each PNG into your animation software as its own layer.
2. Position layers on top of a background plate.
3. Animate each layer's position, rotation, scale, and opacity over time.
4. Swap out expression/pose PNGs at the right moments instead of re-generating video.

This gives you far more control than asking an AI video model to generate a whole moving scene at once — and it's cheaper and more consistent.

---

## 2. GENERATION STEP

- Take each line from `PNG-Asset-Prompts.md` and paste it into your image generator (Midjourney, SDXL, DALL·E, Ideogram, etc.).
- Add `transparent background` or `isolated on white background` explicitly in the generator settings if the tool supports background removal, since not all models output true transparency.
- For any asset that doesn't generate with a clean transparent background, run it through a background remover (remove.bg, Photoshop's "Select Subject," or Clipdrop's Remove Background tool) before using it.
- Export every asset as a `.png` with alpha channel preserved.
- **Keep the same seed number** (if your tool supports it, e.g. Midjourney's `--seed 12345`) across all variations of the same character (e.g., all 5 Candidate poses, all 4 Dog poses) so the design stays visually consistent across expressions.

---

## 3. FOLDER STRUCTURE (recommended)

Organize your generated PNGs like this before importing into your editor:

```
/assets
  /characters
    candidate_neutral.png
    candidate_nervous.png
    candidate_panic_glitch.png
    candidate_confident.png
    candidate_robotic.png
    interviewer_neutral.png
    interviewer_interested.png
    interviewer_bored.png
    architect_drawing.png
    builder_holding_blueprint.png
    stick_figure_walking.png
    stick_figure_bounce.png
    stick_figure_dazed.png
  /animals
    dog_running.png
    dog_sitting.png
    dog_barking.png
    dog_sick.png
    cat_sitting.png
    cat_meowing.png
    duck_standing.png
    duck_quacking.png
    chameleon_green.png
    chameleon_blue.png
    chameleon_orange.png
  /objects
    blueprint_sheet.png
    house_red_door.png
    house_blue_door.png
    house_solar.png
    house_crumbling.png
    school_building.png
    car_side.png
    car_cutaway.png
    car_interior.png
    motorbike.png
    old_terminal.png
    time_machine.png
    factory_line.png
    data_orb.png
    robot_factory_unit.png
    domino_piece.png
    capsule_closed.png
    capsule_open.png
    padlock.png
    vault_safe.png
    smartphone_call.png
    cell_tower.png
    universal_remote.png
    tv.png
    speaker.png
    dvd_player.png
    jvm_engine.png
    compiler_checklist.png
    warning_alarm.png
    question_cloud.png
    fireworks.png
  /diagrams
    heap_memory_block.png
    class_blueprint_card.png
    object_instance_card.png
    single_inheritance.png
    multilevel_inheritance.png
    hierarchical_inheritance.png
    diamond_problem.png
    diamond_solved.png
    red_x.png
    green_check.png
  /ui
    code_editor_frame.png
    callout_box_empty.png
    tag_class.png
    tag_object.png
    table_frame.png
    flashcard_front.png
    flashcard_back.png
    subscribe_button.png
    next_video_card.png
    pillar.png
    badge_abstraction.png
    badge_encapsulation.png
    badge_inheritance.png
    badge_polymorphism.png
  /backgrounds
    dark_studio.png
    blueprint_grid.png
    road_horizon.png
    office_room.png
    park.png
    zoo_enclosure.png
```

---

## 4. ASSEMBLY WORKFLOW BY SCENE TYPE

### A. Character scenes (candidate, architect, builder, animals)
1. Drop the matching **background plate** (e.g. `office_room.png`) as your bottom layer.
2. Add the **neutral pose** PNG of the character as the next layer.
3. At the exact timestamp where the expression changes (e.g., neutral → panic), **swap the layer** for the matching expression PNG (nervous/panic/confident) using a hard cut or a 2-3 frame cross-dissolve.
4. Animate simple transforms on the layer itself: position (walk-in from off-screen), scale (breathing pulse, idle bounce), rotation (slight head tilt).
5. For "talking" or "reacting" beats, use a subtle bounce/scale-pulse (105%→100%) timed to narration emphasis rather than trying to animate a mouth — flat vector characters read fine with body language alone.

### B. Object/prop scenes (house, blueprint, capsule, car cutaway)
1. Place the background plate.
2. Import the object PNG (e.g. `blueprint_sheet.png`).
3. Animate using standard motion graphics techniques:
   - **Reveal:** scale from 0→100% with ease-out, or a wipe mask.
   - **Duplication (blueprint → 3 houses):** duplicate the layer 3 times, offset positions, then cross-fade each duplicate into its corresponding `house_*.png` variant.
   - **Transformation (capsule open/close):** cross-dissolve between `capsule_closed.png` and `capsule_open.png`, with a slight scale-squish on the transition frame for a "pop" feel.
   - **Collapse (school crumbling):** animate `school_building.png` with a downward scale + rotation jitter, cross-fade into `house_crumbling.png`-style debris, add particle overlay (dust) from a separate stock particle PNG/video if available.

### C. Diagram scenes (inheritance trees, diamond problem, memory blocks)
1. No background plate needed — diagrams usually sit directly on the `dark_studio.png` plate.
2. Import the diagram frame PNG (e.g. `heap_memory_block.png`) — these are **empty containers**.
3. Add your actual text (variable names, values, labels) as a **separate text layer** on top in your editor (After Effects text tool, Premiere titles, or Canva/CapCut text boxes) — this keeps text crisp and editable instead of baked into the image.
4. Animate the frame sliding/scaling in, then animate the text layer typing in on top of it.
5. For diagrams with arrows (e.g. `single_inheritance.png`), if the arrow isn't already baked into the PNG, draw it as a vector shape layer in your editor and animate it with a "line draw-on" trim-paths effect so it draws from A to B in sync with narration.

### D. UI element scenes (callouts, tags, tables, flashcards)
1. These are lightweight overlay elements — always placed on the **topmost layer** above whatever scene is playing underneath.
2. Animate with simple spring/scale pop-ins (0→105%→100% over ~0.3s) timed to narration beats.
3. Table frame (`table_frame.png`): duplicate rows within it if you need more rows than the base asset has, or build rows as separate thin rectangle PNGs stacked with text on top.
4. Flashcards: animate a horizontal or vertical 3D flip (scale X or Y down to 0 at the midpoint, swap `flashcard_front.png` for `flashcard_back.png`, then scale back up) to fake the "card flip" reveal.

---

## 5. TIMING & SYNC CHECKLIST

- Match every asset swap or animation beat to the **narration timestamp** in the main script — read the line just before you animate the swap so the visual lands on the matching word.
- Keep idle animations (breathing pulse, subtle sway) running continuously under static narration so nothing on screen ever looks frozen/dead.
- Use consistent easing: **ease-out** for things entering/arriving, **ease-in** for things leaving/exiting, **ease-in-out** for looping idle motion.
- Standard pop-in duration: **0.25–0.4 seconds**. Standard cross-dissolve: **0.2–0.3 seconds**. Don't go slower than this or the pacing will drag against the fast narration style.

---

## 6. RECOMMENDED SOFTWARE PAIRINGS

| Task | Tool |
|------|------|
| Generating the PNGs | Midjourney, SDXL/Automatic1111, DALL·E, Ideogram |
| Background removal | remove.bg, Clipdrop, Photoshop Select Subject |
| Layer assembly & keyframe animation | Adobe After Effects (best control), or CapCut/Canva (simpler, faster) |
| Character rigging for expression swap | Adobe Character Animator (auto-swap triggers), or manual layer swap in After Effects |
| Line-draw / trim-path arrow animation | After Effects (Trim Paths on shape layers) |
| Final cut, music, captions | Premiere Pro, DaVinci Resolve, or CapCut |

---

## 7. QUICK SANITY CHECK BEFORE ANIMATING

Before you start assembling, confirm for each asset:
- [ ] Background is fully transparent (no white box around the subject)
- [ ] Character proportions match across all expression variants of the same character
- [ ] Colors match the global style tag (dark background family, neon green/blue accents)
- [ ] File is named clearly and placed in the right folder
- [ ] Resolution is high enough to scale up to at least 1080p without visible blur (generate at 2K+ if your tool allows)

Once every asset passes this checklist, you can move scene-by-scene through the main script and the companion `OOP-Java-Animation-Scene-Guide.md` file, building each shot from these reusable pieces.