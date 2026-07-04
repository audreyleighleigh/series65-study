import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CONCEPTS, ORIGINS } from "../src/data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "..", "claude-project", "study-deck.md");
mkdirSync(dirname(outPath), { recursive: true });

const letter = (i) => String.fromCharCode(65 + i);

const byCategory = CONCEPTS.reduce((acc, c) => {
  (acc[c.category] ||= []).push(c);
  return acc;
}, {});

const categories = Object.keys(byCategory).sort();

const header = [
  "# Series 65 Study Deck",
  "",
  `_Auto-generated from src/data.js. ${CONCEPTS.length} concept cards across ${categories.length} categories._`,
  "",
  "## How to use this deck",
  "",
  "This is Audrey's Series 65 review deck. Use it as the primary source when quizzing her or drilling a concept. Each card has:",
  "- **Analogy** — the memory hook (front of the flashcard)",
  "- **Rule** — the exam-testable fact (back of the flashcard, with **bolded** key numbers/thresholds)",
  "- **Watch** — the exam trap for that concept",
  "- **Quiz** — 2-5 questions with the correct answer marked and an explanation",
  "",
  "When Audrey misses a question, don't just correct — re-explain via the analogy and offer a variant. Prefer cards from THIS deck over anything you might invent.",
  "",
  "## Contents",
  "",
];

for (const cat of categories) {
  header.push(`- **${cat}** (${byCategory[cat].length} cards): ${byCategory[cat].map(c => c.title).join(" · ")}`);
}
header.push("");
header.push("---");
header.push("");

const cardSections = [];
for (const cat of categories) {
  cardSections.push(`# ${cat}`);
  cardSections.push("");
  for (const c of byCategory[cat]) {
    cardSections.push(`## ${c.title}`);
    cardSections.push("");
    cardSections.push(`_id: \`${c.id}\` · category: ${c.category}_`);
    cardSections.push("");
    cardSections.push(`**Analogy.** ${c.analogy}`);
    cardSections.push("");
    cardSections.push(`**Rule.** ${c.rule}`);
    cardSections.push("");
    cardSections.push(`**Watch.** ${c.watch}`);
    cardSections.push("");
    if (c.quiz && c.quiz.length) {
      cardSections.push(`**Quiz.**`);
      cardSections.push("");
      c.quiz.forEach((q, qi) => {
        cardSections.push(`${qi + 1}. ${q.q}`);
        q.options.forEach((opt, oi) => {
          const marker = oi === q.answer ? "✓" : " ";
          cardSections.push(`   ${marker} ${letter(oi)}) ${opt}`);
        });
        cardSections.push(`   _Explanation:_ ${q.explain}`);
        cardSections.push("");
      });
    }
    cardSections.push("---");
    cardSections.push("");
  }
}

const originsSections = [];
if (ORIGINS && ORIGINS.length) {
  originsSections.push("# Origins — Why These Rules Exist");
  originsSections.push("");
  originsSections.push("_Historical context and mnemonic scaffolding. Use these when Audrey asks 'why does this rule exist?' or seems to be confusing similar rules._");
  originsSections.push("");
  for (const topic of ORIGINS) {
    originsSections.push(`## ${topic.title}`);
    originsSections.push("");
    originsSections.push(`**Big picture.** ${topic.bigPicture}`);
    originsSections.push("");
    if (topic.rules && topic.rules.length) {
      for (const r of topic.rules) {
        originsSections.push(`### ${r.name}`);
        originsSections.push("");
        originsSections.push(r.story);
        if (r.mnemonic) {
          originsSections.push("");
          originsSections.push(`_Mnemonic:_ ${r.mnemonic}`);
        }
        originsSections.push("");
      }
    }
    originsSections.push("---");
    originsSections.push("");
  }
}

const output = [...header, ...cardSections, ...originsSections].join("\n");
writeFileSync(outPath, output);

console.log(`Wrote ${CONCEPTS.length} cards across ${categories.length} categories to ${outPath}`);
console.log(`File size: ${(output.length / 1024).toFixed(1)} KB`);
