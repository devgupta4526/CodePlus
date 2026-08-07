# 13. Dictionary & Alphabetical Order

---

## 1. What is Dictionary Order?

These problems require you to arrange a given set of words exactly as they would appear in an English dictionary. The arrangement is strictly based on the standard alphabetical sequence (A to Z).

---

## 2. Rules of Lexicographical Sorting

1. **First Letter Rule**: Words are sorted based on their first letter (e.g., Apple comes before Banana).
2. **Successive Letter Rule**: If two words have the exact same first letter, compare the second letter. If the second is also identical, compare the third, and so on until a difference is found.
   - Example: **BA**T vs **BA**LL. The first two letters (BA) are identical. Compare the third: 'T' vs 'L'. Since L comes before T in the alphabet, BALL comes before BAT.
3. **Length Rule**: If one word is entirely contained within another word as a prefix, the shorter word comes first.
   - Example: CAR vs CART. CAR comes first because it has no 4th letter to compete with 'T'.

---

## 3. Reverse Dictionary Order

Occasionally, the question may ask for the **Reverse Dictionary Order**.
- **Strategy**: Find the standard dictionary order first (1, 2, 3, 4, 5), and then reverse the sequence completely (5, 4, 3, 2, 1). Do not try to solve it backwards in your head, as it leads to errors.

---

## Interactive Practice Quiz Deck

```quiz
[
  {
    "id": 1301,
    "question": "Arrange the following words in Dictionary Order: 1. Habit 2. Habitat 3. Handle 4. Hammer 5. Hanger",
    "options": [
      "1, 2, 4, 3, 5",
      "1, 2, 4, 5, 3",
      "2, 1, 4, 3, 5",
      "1, 2, 5, 4, 3"
    ],
    "correctIndex": 1,
    "explanation": "All start with 'Ha'. The 3rd letters are b, b, n, m, n. 'b' comes first. Comparing Habit (1) and Habitat (2), 'Habit' is shorter, so 1 then 2. Next is 'm' (Hammer = 4). Next are 'Handle' (3) and 'Hanger' (5). 4th letter 'd' comes before 'g', so 3 comes before 5. Wait, 4th letter of Hanger is 'g'. So 'Hand' vs 'Hang'. d comes before g. So Handle(3) then Hanger(5). Wait, no. Let's re-verify: Ha-b-i-t (1), Ha-b-i-t-a-t (2), Ha-m-m-e-r (4), Ha-n-d-l-e (3), Ha-n-g-e-r (5). Correct order: 1, 2, 4, 3, 5. Option A is correct."
  },
  {
    "id": 1302,
    "question": "Arrange in Dictionary Order: 1. Preach 2. Praise 3. Precinct 4. Precept 5. Precede",
    "options": [
      "2, 1, 5, 4, 3",
      "2, 1, 3, 5, 4",
      "2, 1, 5, 3, 4",
      "1, 2, 5, 4, 3"
    ],
    "correctIndex": 0,
    "explanation": "All start with Pr. 'Praise' (2) has 'a' as 3rd letter, so it's first. The rest have 'e'. Preach (1) has 'a' as 4th letter, so it's second. The rest are Prec-. Precede (5) has 'e', Precept (4) has 'e', Precinct (3) has 'i'. Between 5 and 4: Precede (5) vs Precept (4). 6th letter 'd' vs 'p'. 5 comes before 4. Then 3. Order: 2, 1, 5, 4, 3."
  },
  {
    "id": 1303,
    "question": "Which word will appear FOURTH in the dictionary? 1. Sentinel 2. Sentiment 3. Sentence 4. Sensible 5. Separate",
    "options": [
      "Sentence",
      "Sentinel",
      "Sentiment",
      "Separate"
    ],
    "correctIndex": 1,
    "explanation": "Sort them: Sensible (Sen-s), Sentence (Sen-t-e-n), Sentiment (Sen-t-i-m), Sentinel (Sen-t-i-n), Separate (Sep). Order: 4, 3, 2, 1, 5. The fourth word is Sentinel (1)."
  },
  {
    "id": 1304,
    "question": "Arrange in Reverse Dictionary Order: 1. Eagle 2. Earth 3. Eager 4. Early 5. Earn",
    "options": [
      "2, 5, 4, 1, 3",
      "2, 5, 4, 3, 1",
      "1, 3, 4, 5, 2",
      "3, 1, 4, 5, 2"
    ],
    "correctIndex": 0,
    "explanation": "Standard order: Eager(3), Eagle(1), Early(4), Earn(5), Earth(2). Reverse it: 2, 5, 4, 1, 3."
  },
  {
    "id": 1305,
    "question": "When two words are completely identical up to a certain point (e.g., BOOK and BOOKLET), which comes first in the dictionary?",
    "options": [
      "The longer word",
      "The shorter word",
      "It depends on vowels",
      "They are listed randomly"
    ],
    "correctIndex": 1,
    "explanation": "The Length Rule states that if one word is a prefix of another, the shorter word appears first because a 'blank' space precedes any alphabet character."
  }
]
```
