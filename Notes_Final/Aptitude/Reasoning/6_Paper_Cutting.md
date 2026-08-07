# 6. Paper Cutting & Folding

---

## 1. What is Paper Folding and Cutting?

These reasoning problems evaluate your spatial visualization ability. You are shown a sequence of diagrams where a square or circular piece of paper is sequentially folded along dotted lines, followed by a punch, cut, or perforation made on the fully folded paper. Your task is to visualize the pattern that appears when the paper is completely unfolded.

---

## 2. Core Concepts & Visual Rules

Paper unfolding is fundamentally an application of **Mirror and Water Images**.
- Every time a paper is folded, a crease is formed.
- When unfolding the paper, the crease acts exactly like a **Mirror** (if folded vertically/diagonally) or a **Water reflection line** (if folded horizontally).

### The Reverse Unfolding Process
1. **Trace the Path Backwards**: Always unfold the paper in the exact reverse sequence of how it was folded. The last fold made is the first one you unfold.
2. **Apply Symmetry**: 
   - Unfolding Left/Right $ightarrow$ Apply **Mirror Image** rules laterally.
   - Unfolding Top/Bottom $ightarrow$ Apply **Water Image** rules vertically.
   - Unfolding Diagonally $ightarrow$ Apply Diagonal mirror reflection (X and Y axes swap).
3. **Multiplication of Cuts**: If paper is folded 3 times (halved thrice, resulting in 8 layers), a single hole punched through it will result in exactly 8 holes when unfolded.

---

## 3. Pro-Tips for Fast Solving

1. **Draw the Axis of Symmetry**: Mentally draw lines where the paper was folded on the final folded image.
2. **Locate the Central Cuts**: If a cut touches the exact center of the completely folded paper, it will form a unified central shape (like a star or diamond) when unfolded.
3. **Locate the Edge Cuts**: If a cut is made on the outer edge, it will appear symmetrically on the opposing outer edge when unfolded.
4. **Use Elimination**: Look at the original cut in the folded state. Check the options: the final unfolded pattern *must* contain that exact cut in the original quadrant. Eliminate options where the base cut is distorted.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 601,
    "question": "A square paper is folded in half vertically, then in half horizontally to form a smaller square. A single circular hole is punched through all layers. How many holes will appear when fully unfolded?",
    "options": [
      "2",
      "4",
      "6",
      "8"
    ],
    "correctIndex": 1,
    "explanation": "Folding in half vertically creates 2 layers. Folding in half horizontally doubles that to 4 layers. Punching one hole goes through all 4 layers, resulting in 4 holes when unfolded."
  },
  {
    "id": 602,
    "question": "Unfolding a paper upwards (vertically) across a horizontal crease requires applying which visual rule?",
    "options": [
      "Mirror Image",
      "Water Image",
      "Rotation by 90 degrees",
      "No change"
    ],
    "correctIndex": 1,
    "explanation": "A horizontal crease acts as a horizontal mirror. Reflecting shapes across a horizontal axis follows the exact rules of a Water Image (Top becomes Bottom)."
  },
  {
    "id": 603,
    "question": "A paper is folded in half diagonally. A triangle is cut near the folded edge. When unfolded, what relationship will the two resulting triangles share?",
    "options": [
      "They will be identical and face the same direction",
      "They will be mirror images across the diagonal axis",
      "They will merge into a square",
      "One will be smaller than the other"
    ],
    "correctIndex": 1,
    "explanation": "The diagonal crease acts as the line of symmetry. Any cut made will reflect perfectly across this diagonal axis, forming mirror images relative to that diagonal."
  },
  {
    "id": 604,
    "question": "If a paper is folded 4 times (halving it each time) making 16 layers, and a semi-circle is cut on the folded edge, what shape will it form upon unfolding that specific edge?",
    "options": [
      "16 Semi-circles",
      "8 Full Circles",
      "16 Full Circles",
      "8 Semi-circles"
    ],
    "correctIndex": 1,
    "explanation": "A semi-circle cut on a folded edge perfectly mirrors upon unfolding, merging to form a full circle. Since there are 16 layers, unfolding them creates 8 continuous folded edges that open up into 8 full circles."
  },
  {
    "id": 605,
    "question": "What is the most effective first step to eliminate wrong options in paper cutting problems?",
    "options": [
      "Count the total number of edges",
      "Find the area of the paper",
      "Check if the final pattern contains the exact original cut in its respective quadrant",
      "Guess based on symmetry"
    ],
    "correctIndex": 2,
    "explanation": "The most effective shortcut is verifying the original folded segment. The original cut cannot change shape or orientation in its own quadrant. Any option missing that exact starting cut can be instantly eliminated."
  }
]
```
