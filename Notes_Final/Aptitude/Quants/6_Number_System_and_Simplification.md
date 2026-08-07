# 6. Number System & Simplification

---

## 1. Classification & Divisibility Rules

- **Divisibility by 3 / 9**: Sum of digits must be cleanly divisible by 3 or 9.
- **Divisibility by 8**: Last three digits must form a number divisible by 8.
- **Divisibility by 11**: Difference between sum of odd positional digits and even positional digits must be $0$ or divisible by 11.

---

## 2. Unit Digit Cyclicity & LCM/HCF

- **Cyclicity 1**: Numbers ending in $0, 1, 5, 6$ always retain their ending digit for any power $n$.
- **Cyclicity 4**: Numbers ending in $2, 3, 7, 8$ repeat patterns every 4 powers. Divide exponent by 4 to find remainder power.
- **HCF $	imes$ LCM Relation**: $\text{HCF}(A, B) \times \text{LCM}(A, B) = A \times B$.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 601,
    "question": "The HCF and LCM of two distinct numbers are 16 and 192, respectively. If one of the numbers is 64, what is the value of the other number?",
    "options": [
      "32",
      "48",
      "80",
      "96"
    ],
    "correctIndex": 1,
    "explanation": "HCF × LCM = Product -> 16 × 192 = 64 × B -> B = (16 × 192) / 64 = 48."
  },
  {
    "id": 602,
    "question": "What is the exact numerical value of the infinite radical chain: √(30 + √(30 + √(30 + ... ∞)))?",
    "options": [
      "5",
      "6",
      "15",
      "30"
    ],
    "correctIndex": 1,
    "explanation": "Here 30 = 5 × 6 (consecutive factors). For positive addition infinite series involving √(x + ...), the result equals the larger integer factor, which is 6."
  }
]
```