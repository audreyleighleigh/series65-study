# Series 65 Study Card Authoring Guide

Use this document when creating new concept cards with Claude in the browser. Copy-paste the relevant sections into your chat as needed.

---

## Quick Start Prompt

Paste this into a new Claude chat to set context:

> I'm building a Series 65 study app in React. I need you to help me write new concept cards. Each card is a JavaScript object that goes into a `CONCEPTS` array. I'll give you the exact format below — please output new cards in this format so I can paste them directly into my code.

Then paste the **Card Template** section below.

---

## Card Template

Each concept card is a JS object with exactly these 7 fields plus a `quiz` array:

```javascript
{
  id: "kebab-case-id",           // unique, lowercase, hyphens (e.g., "mutual-fund-fees")
  category: "Category Name",     // see category list below
  title: "Human-Readable Title", // short, descriptive
  color: "#HEX123",              // hex color for UI theming
  analogy: "A vivid, spatial or narrative analogy that makes the concept stick. Think: a real-world scene the learner can picture. 1-3 sentences.",
  rule: "The actual exam-testable rule or definition. Be specific — include thresholds, formulas, hierarchies. Bold the key facts. 2-4 sentences.",
  watch: "The exam trap. What do test-takers get wrong? 1-2 sentences calling out the common mistake.",
  quiz: [
    {
      q: "Question text here?",
      options: [
        "Option A text",
        "Option B text",
        "Option C text",
        "Option D text"
      ],
      answer: 0,       // index of the correct option (0-3)
      explain: "Why the correct answer is right AND why the others are wrong. Include calculation steps if applicable."
    }
    // add more question objects as needed (typically 2-5 per concept)
  ]
}
```

---

## Existing Categories & Colors

Use these to keep things consistent. Pick the closest match or create a new one if needed.

| Category               | Color     |
|------------------------|-----------|
| Bonds                  | `#E8C547` |
| Equities               | `#7EC8A4` |
| Derivatives            | `#A78BF5` |
| Regulations            | `#FF6B6B` |
| Tax                    | `#F2A65A` |
| Global                 | `#60A5FA` |
| Investment Companies   | `#34D399` |
| Alternative Investments| `#EC4899` |
| Suitability            | `#F59E0B` |

---

## Field-by-Field Guidance

### `analogy` — Make it memorable
- Paint a picture: a rental unit, a vending machine, a storage locker
- Connect abstract finance concepts to everyday experiences
- This is the "front" of the flashcard — it's the memory hook

**Good:** "A mutual fund NAV is like the price tag on a smoothie — it's recalculated at closing time based on whatever fruit is in the blender that day."
**Bad:** "NAV is calculated daily based on total net assets divided by shares outstanding."

### `rule` — Make it testable
- State the actual rule, formula, or threshold the exam tests
- Include specific numbers (e.g., "≥ 10%", "within 45 days", "$250,000 limit")
- This is the "back" of the flashcard — the thing they need to know cold

### `watch` — Make it a warning
- What's the trap? What do people pick on the exam that's *almost* right?
- Frame it as: "Don't confuse X with Y" or "The trick is..."

### `quiz` questions — Make them exam-realistic
- Write 4 plausible options (wrong answers should be tempting)
- `explain` should address *all four options*, not just the correct one
- Include math steps when the question involves calculation
- Vary difficulty: mix straightforward recall with tricky application questions

---

## Example: Complete Card

```javascript
{
  id: "12b1-fees",
  category: "Investment Companies",
  title: "12b-1 Fees",
  color: "#34D399",
  analogy: "Imagine your gym charges a monthly 'marketing fee' on top of membership — that's a 12b-1 fee. The fund skims a little off your balance each year to pay for advertising and distribution, whether you knew about it or not.",
  rule: "12b-1 fees are annual charges deducted from fund assets to cover distribution and marketing costs. FINRA caps them at 0.75% for distribution + 0.25% service fee = 1.00% max total. A fund charging any 12b-1 fee cannot call itself 'no-load.'",
  watch: "A fund can charge up to 0.25% and still market itself as no-load — but only if it has NO front-end or back-end load AND the 12b-1 fee stays at or below 0.25%.",
  quiz: [
    {
      q: "What is the maximum 12b-1 fee a mutual fund can charge annually?",
      options: [
        "0.25%",
        "0.50%",
        "0.75%",
        "1.00%"
      ],
      answer: 3,
      explain: "The max total 12b-1 fee is 1.00% (0.75% distribution + 0.25% service). 0.25% is only the service fee component. 0.75% is the distribution cap alone."
    },
    {
      q: "A mutual fund charges a 0.20% 12b-1 fee and no sales loads. Can it call itself 'no-load'?",
      options: [
        "No — any 12b-1 fee disqualifies it",
        "Yes — 12b-1 fees under 0.25% with no loads qualifies as no-load",
        "Yes — but only if it also waives the management fee",
        "No — only index funds can be no-load"
      ],
      answer: 1,
      explain: "A fund can call itself no-load if it has no front-end or back-end sales charge AND its 12b-1 fee is ≤ 0.25%. At 0.20%, this fund qualifies. A: incorrect — the 0.25% threshold exists. C/D: invented rules."
    }
  ]
}
```

---

## Workflow Tips

1. **Ask Claude for a batch:** "Give me 3 concept cards on [topic]" — then review and tweak
2. **Request the raw JS object** — not markdown tables or prose explanations
3. **Check `id` uniqueness** — each id must be different from all existing cards
4. **Aim for 2-5 quiz questions per card** — enough to test, not so many it's a slog
5. **Paste directly into `StudyGuide.jsx`** — cards go inside the `CONCEPTS = [...]` array, before the closing `];`

---

## Inserting Cards Into the Code

Cards go into `src/StudyGuide.jsx` in the `CONCEPTS` array. Add new cards before the closing bracket:

```javascript
const CONCEPTS = [
  // ... existing cards ...

  // YOUR NEW CARD HERE
  {
    id: "new-card",
    // ...
  },

];  // <-- end of CONCEPTS array
```

No imports, no separate files — just add the object to the array.
