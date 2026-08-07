# 14. Sitting Arrangement

---

## 1. What is Sitting Arrangement?

Sitting arrangement problems provide a set of clues regarding how individuals are positioned relative to one another (left, right, between, opposite). Your task is to use logic to deduce the exact seating order of the entire group.

---

## 2. Types of Arrangements

### A. Linear Arrangement (Row)
People sit in a straight line.
- **Facing North**: Your Left is their Left. Your Right is their Right.
- **Facing South**: Your Left is their Right. Your Right is their Left (Inverted directions).

### B. Circular Arrangement
People sit in a closed circle.
- **Facing Center**: 
  - **Left** means moving **Clockwise**.
  - **Right** means moving **Anti-Clockwise**.
- **Facing Outside**: Directions reverse (Left is Anti-Clockwise, Right is Clockwise).

---

## 3. Keywords & Logical Connectors

Misinterpreting language is the #1 cause of errors in these problems.

- **"AND" / "BUT"**: Refers to the **First Person** in the preceding sentence.
  - *Example*: "A is right of B, **and** is left of C." (A is left of C).
- **"WHO" / "WHOM" / "WHICH" / "WHOSE"**: Refers to the **Second Person** (the immediate preceding noun).
  - *Example*: "A is right of B, **who** is left of C." (B is left of C).
- **"Adjacent" / "Immediate Neighbor"**: They sit directly next to each other with no gaps.
- **"Between"**: Implies the person is strictly in the middle, but does NOT specify order. (A is between B and C means it could be B-A-C or C-A-B).

---

## 4. Pro-Tips for Fast Solving

1. **Never Start with 'Between' Clues**: They create multiple possibilities. Always start with definitive clues (e.g., "A sits at the extreme left end" or "A sits 3rd to the right of B").
2. **Draw Multiple Cases**: If a clue creates ambiguity, quickly draw two separate diagrams. Future clues will eliminate one of them naturally.
3. **Count the Seats**: Always draw the exact number of seats (dashes or dots) before placing anyone.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 1401,
    "question": "In a circular arrangement facing the center, moving to the 'Right' means moving in which direction?",
    "options": [
      "Clockwise",
      "Anti-Clockwise",
      "Towards the center",
      "Away from the center"
    ],
    "correctIndex": 1,
    "explanation": "When facing the center of a circle, your right arm points in the anti-clockwise direction. Therefore, moving to the right is Anti-Clockwise."
  },
  {
    "id": 1402,
    "question": "Read the statement: 'P is 2nd to the left of Q, who is an immediate neighbor of R.' Who is the immediate neighbor of R?",
    "options": [
      "P",
      "Q",
      "Both P and Q",
      "Neither"
    ],
    "correctIndex": 1,
    "explanation": "The word 'who' always refers to the noun immediately preceding it. Here, 'who' refers to Q. Thus, Q is the immediate neighbor of R."
  },
  {
    "id": 1403,
    "question": "If 5 people are sitting in a row facing North, and A is at the extreme left end while E is at the extreme right end, how many people sit between them?",
    "options": [
      "2",
      "3",
      "4",
      "5"
    ],
    "correctIndex": 1,
    "explanation": "The total positions are 5. A is at position 1. E is at position 5. The positions between them are 2, 3, and 4. That is a total of 3 people between them."
  },
  {
    "id": 1404,
    "question": "Read the statement: 'M is sitting to the right of N and is the left of O.' Who does 'and' refer to?",
    "options": [
      "M",
      "N",
      "O",
      "Both M and N"
    ],
    "correctIndex": 0,
    "explanation": "The connector 'and' (or 'but') refers to the first subject of the sentence. Therefore, M is the left of O."
  },
  {
    "id": 1405,
    "question": "Why is it advised to avoid starting a puzzle with a 'Between' statement (e.g., 'X is between Y and Z')?",
    "options": [
      "Because 'between' implies they are not adjacent",
      "Because it creates two separate possibilities (Y-X-Z or Z-X-Y)",
      "Because it means they are sitting opposite",
      "Because 'between' statements are always false"
    ],
    "correctIndex": 1,
    "explanation": "A 'between' statement provides relative positioning but not exact order, creating ambiguity (Y could be on the left or right). Starting with definitive positional clues is much faster and reduces confusion."
  }
]
```
