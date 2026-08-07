# 9. Number Series

---

## 1. What is a Number Series?

A **Number Series** is a sequence of numbers arranged according to a specific logical, mathematical, or algebraic rule. The task is usually to identify this hidden rule and find either the missing number in the sequence or the wrong number that breaks the pattern.

---

## 2. Standard Mathematical Patterns

1. **Arithmetic Progression (Addition/Subtraction)**
   The difference between consecutive numbers remains constant.
   - Example: 5, 8, 11, 14, 17 (Rule: +3)

2. **Geometric Progression (Multiplication/Division)**
   Each number is multiplied or divided by a constant factor.
   - Example: 2, 6, 18, 54, 162 (Rule: $\times 3$)

3. **Squares and Cubes Series**
   - Pure Squares: 1, 4, 9, 16, 25 ($n^2$)
   - Pure Cubes: 1, 8, 27, 64, 125 ($n^3$)
   - Modified Squares/Cubes: $n^2 + 1$, $n^2 - n$, $n^3 + n$ (e.g., 2, 6, 12, 20 $\rightarrow 1^2+1, 2^2+2, 3^2+3$)

4. **Prime Number Series**
   Numbers that are divisible only by 1 and themselves.
   - Example: 2, 3, 5, 7, 11, 13, 17

5. **Double Difference Series**
   When the first difference doesn't reveal a pattern, find the difference of the differences.
   - Series: 5, 12, 26, 47, 75
   - 1st Diff: 7, 14, 21, 28
   - 2nd Diff: 7, 7, 7 (Constant)

6. **Alternate / Mixed Series**
   Two separate series interleaved into one.
   - Example: 5, 10, 7, 20, 9, 30
   - Odd positions: 5, 7, 9 (+2)
   - Even positions: 10, 20, 30 (+10)

---

## 3. How to Identify the Pattern Quickly

1. **Check the Rate of Growth**:
   - Slow steady growth $\rightarrow$ Addition/Subtraction difference series.
   - Rapid explosive growth $\rightarrow$ Multiplication, Squares, or Cubes.
2. **Always find the Differences First**: The majority of exam questions can be solved by simply writing down the 1st and 2nd layer of differences between consecutive terms.
3. **Look for Multiplier + Addition**: e.g., $\times 2 + 1$, $\times 3 - 2$.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 901,
    "question": "Find the missing number: 2, 5, 10, 17, 26, ?",
    "options": [
      "35",
      "37",
      "39",
      "41"
    ],
    "correctIndex": 1,
    "explanation": "The series follows the pattern (n² + 1). 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26. The next term is 6²+1 = 36+1 = 37."
  },
  {
    "id": 902,
    "question": "Find the missing number: 4, 9, 20, 43, 90, ?",
    "options": [
      "185",
      "180",
      "195",
      "175"
    ],
    "correctIndex": 0,
    "explanation": "The logic is (Previous Number × 2) + Alternative Addition. 4×2+1=9. 9×2+2=20. 20×2+3=43. 43×2+4=90. Therefore, 90×2+5 = 185."
  },
  {
    "id": 903,
    "question": "Find the wrong number in the series: 3, 8, 15, 24, 34, 48",
    "options": [
      "15",
      "24",
      "34",
      "48"
    ],
    "correctIndex": 2,
    "explanation": "Let's check the differences: 8-3=5, 15-8=7, 24-15=9. The difference is increasing by 2. Next difference should be 11. 24+11 = 35. But 34 is given. Thus, 34 is the wrong number."
  },
  {
    "id": 904,
    "question": "Find the missing number: 7, 10, 8, 11, 9, 12, ?",
    "options": [
      "10",
      "13",
      "11",
      "14"
    ],
    "correctIndex": 0,
    "explanation": "This is an alternating series. Sub-series 1 (odd positions): 7, 8, 9... Next will be 10. Sub-series 2 (even positions): 10, 11, 12..."
  },
  {
    "id": 905,
    "question": "Find the missing number: 120, 99, 80, 63, 48, ?",
    "options": [
      "35",
      "38",
      "39",
      "40"
    ],
    "correctIndex": 0,
    "explanation": "The logic follows (n² - 1) in reverse order. 11²-1=120, 10²-1=99, 9²-1=80, 8²-1=63, 7²-1=48. Next is 6²-1 = 36-1 = 35."
  }
]
```
