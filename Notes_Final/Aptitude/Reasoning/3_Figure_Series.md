# 3. Figure Series (Non-Verbal)

---

## 1. What is a Figure Series?

A **Figure Series** problem consists of a sequence of images that change step-by-step according to a specific logical rule. Your task is to identify the rule governing the transition from one frame to the next and select the figure that correctly continues the series.

---

## 2. Common Patterns & Logical Rules

When analyzing a figure series, look for the following transformations:

### 1. Rotation (Clockwise / Anti-Clockwise)
Elements inside the figure often rotate by specific angles (e.g., $45^\circ$, $90^\circ$, $135^\circ$, $180^\circ$).
- Observe the tip of an arrow or a shaded corner to track the exact degree of rotation.

### 2. Shifting of Elements
Icons or shapes may move along the edges, corners, or center of the primary frame.
- **Clockwise shift**: Element moves from Top-Left $ightarrow$ Top-Right $ightarrow$ Bottom-Right $ightarrow$ Bottom-Left.
- **Diagonal swap**: Elements at opposite corners swap places.

### 3. Addition or Deletion of Elements
- A new line, dot, or shape is added in each successive frame.
- Conversely, an existing element is systematically removed.
- Look for mathematical progressions in additions (e.g., +1, +2, +3 lines).

### 4. Shading / Color Toggling
- Alternating colors: A shape switches between filled (black) and empty (white) in each step.
- Progressive shading: A larger area of the figure gets shaded in each step.

### 5. Water / Mirror Imaging Alternation
The figure alternates between its mirror image (horizontal flip) and water image (vertical flip).

---

## 3. How to Approach Figure Series Questions

1. **Track a Single Element First**: Instead of looking at the whole complex image, isolate one symbol (like a dot or arrow) and track its behavior across all frames.
2. **Eliminate Options**: Once you know where the isolated element should be in the next frame, eliminate all options where it is placed incorrectly.
3. **Verify with a Second Element**: Pick another shape to confirm the remaining options and lock in your final answer.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 301,
    "question": "In a figure series, an arrow points North in frame 1, North-East in frame 2, East in frame 3, and South-East in frame 4. Where will it point in frame 5?",
    "options": [
      "South",
      "South-West",
      "West",
      "North-West"
    ],
    "correctIndex": 0,
    "explanation": "The arrow is rotating 45° clockwise in each step. After pointing South-East, another 45° clockwise rotation will make it point strictly South."
  },
  {
    "id": 302,
    "question": "A square has a black dot in the top-left corner in step 1. In step 2, it shifts to the top-right. In step 3, it shifts to the bottom-right. Where will the dot be in step 5?",
    "options": [
      "Top-Left",
      "Top-Right",
      "Bottom-Left",
      "Bottom-Right"
    ],
    "correctIndex": 0,
    "explanation": "The dot is moving clockwise from corner to corner. Step 1: Top-Left, Step 2: Top-Right, Step 3: Bottom-Right, Step 4: Bottom-Left. Following the cycle, Step 5 brings it back to Top-Left."
  },
  {
    "id": 303,
    "question": "A shape series starts with a triangle (3 sides), then a square (4 sides), then a pentagon (5 sides). What will the 5th shape in the series be?",
    "options": [
      "Hexagon",
      "Heptagon",
      "Octagon",
      "Nonagon"
    ],
    "correctIndex": 1,
    "explanation": "The number of sides increases by +1 in each step. Step 1: 3 sides, Step 2: 4 sides, Step 3: 5 sides, Step 4: 6 sides (Hexagon), Step 5: 7 sides (Heptagon)."
  },
  {
    "id": 304,
    "question": "A circle is divided into 4 quadrants. In frame 1, quadrant 1 is shaded. In frame 2, quadrant 2 is shaded. This pattern continues clockwise. What will frame 6 look like?",
    "options": [
      "Quadrant 1 shaded",
      "Quadrant 2 shaded",
      "Quadrant 3 shaded",
      "Quadrant 4 shaded"
    ],
    "correctIndex": 1,
    "explanation": "The shading moves clockwise +1 quadrant per step. The sequence is 1, 2, 3, 4, 1, 2. Frame 6 corresponds to Quadrant 2 being shaded."
  },
  {
    "id": 305,
    "question": "A series alternates between a figure and its mirror image. Frame 1 is 'd'. Frame 2 is 'b'. Frame 3 is 'd'. What is Frame 4?",
    "options": [
      "p",
      "q",
      "b",
      "d"
    ],
    "correctIndex": 2,
    "explanation": "The pattern is a simple alternation. Step 1: d, Step 2: b (mirror), Step 3: d. Step 4 will logically be the mirror image 'b' again."
  }
]
```
