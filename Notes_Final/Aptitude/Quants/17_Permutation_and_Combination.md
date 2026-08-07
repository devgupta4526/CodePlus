# 17. Permutation & Combination

---

## 1. Counting, Arrangements & Group Selection

- **Permutation ($^n P_r$)**: Order matters (arrangements, podium positions) $= \frac{n!}{(n - r)!}$.
- **Combination ($^n C_r$)**: Order does NOT matter (committees, generic groups) $= \frac{n!}{r! (n - r)!}$.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 1701,
    "question": "In how many completely distinct ways can the 6 letters of the word 'LEADER' be arranged?",
    "options": [
      "720 ways",
      "360 ways",
      "180 ways",
      "120 ways"
    ],
    "correctIndex": 1,
    "explanation": "Total letters N = 6, with letter 'E' repeated twice (p = 2). Total permutations = 6! / 2! = 720 / 2 = 360 ways."
  },
  {
    "id": 1702,
    "question": "A delegation of 4 executive officers must be chosen from a pool of 7 applicants. In how many distinct ways can this committee be formed?",
    "options": [
      "210 ways",
      "35 ways",
      "840 ways",
      "70 ways"
    ],
    "correctIndex": 1,
    "explanation": "Requires combination formula ⁷C₄. By symmetry ⁷C₄ = ⁷C₃ = (7 × 6 × 5) / (3 × 2 × 1) = 35 ways."
  }
]
```