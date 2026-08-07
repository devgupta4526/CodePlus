# 1. Symbols & Math Foundations

---

## 1. Essential Mathematical Symbols & Notations

Understanding standard mathematical symbols is the foundation of solving quantitative aptitude problems rapidly. Below is a comprehensive reference table of symbols frequently encountered in algebra, geometry, and arithmetic.

| Symbol | Name / Meaning | Example Usage / Context |
| :---: | :--- | :--- |
| **=** | Equal to | $x = 5$ (Values on both sides are equivalent) |
| **$
eq$** | Not equal to | $x \neq 0$ (Denominator cannot be zero) |
| **$pprox$** | Approximately equal to | $\pi \approx 3.14159$ |
| **$>$ / $<$** | Greater than / Less than | $a > b$ (a is larger than b); $c < d$ |
| **$\ge$ / $\le$** | Greater than or equal / Less than or equal | $x \ge 0$ (Non-negative real numbers) |
| **$\sqrt{\phantom{x}}$** | Square root | $\sqrt{144} = 12$ |
| **$\sqrt[3]{\phantom{x}}$** | Cube root | $\sqrt[3]{512} = 8$ |
| **$\infty$** | Infinity | Represents unbounded numerical quantity |
| **$\propto$** | Proportional to | $V \propto T$ (Direct proportionality) |
| **$\sum$** | Sigma / Summation | $\sum x_i$ (Sum of all individual terms) |
| **$\Delta$** | Delta / Change / Triangle | $\Delta x$ (Change in x) or $\Delta ABC$ |
| **$ngle$** | Angle | $\angle ABC = 60^\circ$ |
| **$\perp$** | Perpendicular to | $AB \perp CD$ (Intersection at a $90^\circ$ right angle) |
| **$\parallel$** | Parallel to | $AB \parallel CD$ (Lines never intersect) |
| **$\cong$** | Congruent to | $\Delta ABC \cong \Delta DEF$ (Identical shape and size) |
| **$\sim$** | Similar to | $\Delta ABC \sim \Delta PQR$ (Same proportional shape) |

---

## 2. Standard Measurement & Unit Conversions

Quantitative exams frequently test unit conversion traps. Memorizing standard measurement conversions is vital for time, speed, volume, and weight word problems.

### Metric Prefixes and Weight Conversions
- **10 Milligrams (mg)** = 1 Centigram (cg)
- **10 Centigrams (cg)** = 1 Decigram (dg)
- **10 Decigrams (dg)** = 1 Gram (g) = 1,000 mg
- **1,000 Grams (g)** = 1 Kilogram (kg)
- **100 Kilograms (kg)** = 1 Quintal
- **10 Quintals (1,000 kg)** = 1 Metric Tonne (T)

### Length & Distance Conversions
- **1 Centimeter (cm)** = 10 Millimeters (mm)
- **1 Meter (m)** = 100 cm = 1,000 mm
- **1 Kilometer (km)** = 1,000 meters = 3,280.84 feet $\approx 0.6214$ miles
- **1 Mile** = 1.609 Kilometers = 1,609 meters = 5,280 feet
- **1 Inch** = 2.54 centimeters
- **1 Foot** = 12 inches = 30.48 cm
- **1 Yard** = 3 feet = 36 inches = 91.44 cm

### Volume & Capacity Conversions
- **1 Liter (L)** = 1,000 Milliliters (mL) = 1,000 cubic centimeters ($cm^3$ or cc)
- **1 Cubic Meter ($m^3$)** = 1,000 Liters
- **1 Gallon (US)** = 3.785 Liters
- **1 Hectare** = $10,000\text{ }m^2$ (Standard unit for agricultural land area problems)

---

## 3. Core Algebraic Identities & Formulae

Mastering algebraic identities simplifies polynomial equations, number system calculations, and algebraic factorization.

1. **$(a + b)^2 = a^2 + 2ab + b^2$**
2. **$(a - b)^2 = a^2 - 2ab + b^2$**
3. **$a^2 - b^2 = (a + b)(a - b)$** *(Most important difference of squares identity)*
4. **$(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$**
5. **$(a + b)^2 - (a - b)^2 = 4ab$**
6. **$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca)$**
7. **$(a + b)^3 = a^3 + b^3 + 3ab(a + b)$**
8. **$(a - b)^3 = a^3 - b^3 - 3ab(a - b)$**
9. **$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$**
10. **$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$**
11. **$a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)$**
    - **Special Shortcut Rule**: If $a + b + c = 0$, then $a^3 + b^3 + c^3 = 3abc$.

---

## 4. Fundamental Calculation Shortcuts

### Trick 1: Digital Sum Technique
The **Digital Sum** of a number is obtained by continuously adding its digits until a single digit remains. In calculations involving multiplication, addition, subtraction, and exact division, the digital sum of the expression matches the digital sum of the correct option.
- **Example**: Find the product of $345 \times 12$.
  - Digital sum of $345 = 3 + 4 + 5 = 12 \rightarrow 1 + 2 = 3$.
  - Digital sum of $12 = 1 + 2 = 3$.
  - Product of digital sums $= 3 \times 3 = 9$.
  - Checking the correct result: $4140 \rightarrow 4 + 1 + 4 + 0 = 9$. It matches!

### Trick 2: Squaring Numbers Ending in 5
To square any number ending in 5 ($N5$): Take leading digit(s) $N$, multiply by $(N + 1)$, and append **25**.
- **Example**: $85^2 \rightarrow 8 \times 9 = 72 \rightarrow \mathbf{7225}$.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 101,
    "question": "If a + b + c = 0, what is the simplified algebraic value of (a³ + b³ + c³)?",
    "options": [
      "0",
      "3abc",
      "abc",
      "2(ab + bc + ca)"
    ],
    "correctIndex": 1,
    "explanation": "According to the fundamental identity: a³ + b³ + c³ - 3abc = (a + b + c)(a² + b² + c² - ab - bc - ca). When (a + b + c) = 0, the right hand side becomes 0, resulting in a³ + b³ + c³ = 3abc."
  },
  {
    "id": 102,
    "question": "Using the calculation shortcut for squaring numbers ending in 5, what is the exact value of 125²?",
    "options": [
      "14425",
      "15625",
      "16225",
      "12525"
    ],
    "correctIndex": 1,
    "explanation": "For any number N5, multiply N by (N + 1) and append 25. Here, N = 12. So, 12 × 13 = 156. Appending 25 yields 15625."
  },
  {
    "id": 103,
    "question": "How many liters of water can be stored in a completely filled cubic reservoir with a volume of 4.5 cubic meters (m³)?",
    "options": [
      "450 Liters",
      "4,500 Liters",
      "45,000 Liters",
      "4.5 Liters"
    ],
    "correctIndex": 1,
    "explanation": "By definition, 1 cubic meter (m³) is exactly equivalent to 1,000 Liters. Therefore, 4.5 m³ = 4.5 × 1,000 = 4,500 Liters."
  }
]
```