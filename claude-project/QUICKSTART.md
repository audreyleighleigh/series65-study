# Voice Study Setup — Quickstart

Get your Series 65 deck into a Claude Project so you can voice-quiz while walking, doing dishes, etc.

## One-time setup

### 1. Export the deck

From the project root:

```
npm run export-deck
```

This regenerates `claude-project/study-deck.md` from your current cards in `src/data.js`.

### 2. Create the Claude Project

1. Go to [claude.ai](https://claude.ai/) and sign in.
2. Click **Projects** → **New project**.
3. Name it: **Series 65 Review Coach**.

### 3. Paste custom instructions

1. Open `claude-project/instructions.md` in your editor.
2. Copy the entire contents.
3. In the Claude Project, click **Set custom instructions** (or wherever the settings icon is).
4. Paste and save.

### 4. Upload the deck and unit map

1. In the Claude Project, click **Add content** → **Upload files**.
2. Upload BOTH files:
   - `claude-project/study-deck.md` (all your cards)
   - `claude-project/kaplan-units.md` (Kaplan's 24-unit structure mapped to your cards, so you can say "let's do Unit 3")
3. They'll be available to Claude in every conversation you start inside this project.

### 5. Test it once (typed)

Start a new chat inside the project and type:

> Quiz me on the LATE exclusion.

You should see Claude ask you a question from the actual deck (not a made-up one) and wait for your answer.

### 6. Use voice mode on mobile

1. Open the Claude app on your phone.
2. Navigate to the **Series 65 Review Coach** project.
3. Start a new chat inside it.
4. Tap the voice-mode icon.
5. Say: "Quiz me on Regulations."

Now you can walk around, do dishes, whatever, and drill.

---

## When you add new cards

The deck file needs to be regenerated and re-uploaded:

```
npm run export-deck
```

Then in the Claude Project:
1. Delete the existing `study-deck.md` file.
2. Upload the newly generated one.

That's it — Claude picks up the new cards next conversation.

---

## Tips for voice sessions

- **"Let's do Unit 3"** — Claude quizzes you on cards from Kaplan Unit 3 only. Use "next unit" to advance sequentially.
- **"Surprise me"** — Claude picks a mix, weighted toward the largest categories (mostly Regulations right now).
- **"Focus on custody vs. discretion"** — Claude drills a specific concept until you're solid.
- **"That was a calculation one, skip"** — voice mode isn't great for multi-step math; ask to skip and cover those in typed sessions.
- **"Give me an origin"** — Claude tells you the historical backstory of a rule (from the Origins section of the deck).
- **"Recap"** — at the end of a walk, Claude summarizes what you covered and what needs more work.

## What this is NOT good for

- **New concepts.** Voice mode is a review tool. First-pass learning is better in typed sessions where Claude can research/verify.
- **Calculations.** Multi-step math (net estate, DRIP cost basis, yield hierarchies) is painful verbally.
- **Verifying against Kaplan.** Claude won't pause to look things up in voice mode — that would break the walking rhythm. Save "wait, is that really what Kaplan says?" for typed sessions.
