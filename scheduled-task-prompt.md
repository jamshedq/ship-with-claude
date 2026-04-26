# Scheduled Task Prompt — Sunday Sweep

This is the prompt you paste into Cowork's "Create scheduled task" flow.

**Cron expression:** `0 16 * * 0` (Sunday 4 PM, local time)

**Task ID:** `linkedin-weekly-sweep`

**Description:** `Generate next week's LinkedIn drafts every Sunday at 4 PM from the LinkedIn_Strategy folder`

**Replace `[YOUR_FOLDER_PATH]` below with the actual absolute path to your LinkedIn_Strategy folder** (e.g. `/Users/yourname/Desktop/NeuralFlow/LinkedIn_Strategy`).

---

## The prompt

```
You are running the weekly LinkedIn loop sweep. Everything you need lives in `[YOUR_FOLDER_PATH]/`. Do not reference any other folder, vault, MCP, or note. The NeuralFlow MCP is OK for read/search of this folder; for writing prefer the file tools so the NeuralFlow watcher updates immediately.

## Step 1 — Load context (in this order, with the Read tool)

1. `[YOUR_FOLDER_PATH]/how-this-works.md` — the loop spec, this is your contract
2. `[YOUR_FOLDER_PATH]/playbook.md` — positioning, pillars, substance bar, voice rules
3. `[YOUR_FOLDER_PATH]/voice-samples.md` — real voice; if filled in, it overrides generic voice rules
4. `[YOUR_FOLDER_PATH]/performance-log.md` — last 4 weeks of rows; bias toward winners, avoid retired patterns
5. `[YOUR_FOLDER_PATH]/inbox.md` — pending briefs
6. `[YOUR_FOLDER_PATH]/wednesday-topic-bank.md` — recurring franchise topics
7. `[YOUR_FOLDER_PATH]/drafts/_sweep-log.md` — what's already been drafted recently (avoid repeats within 30 days)

Also list the contents of `drafts/` so you know what's already been produced.

## Step 2 — Compute biases before drafting

From `performance-log.md` (only if it has 8+ filled rows; otherwise skip):
- Identify the top 3 hook archetypes by D7 engagement rate — bias new drafts toward these
- Identify any retired archetypes (flagged via the bomb trigger) — avoid these entirely
- Note the previous week's top performer — surface as a follow-up brief candidate in your summary

From `voice-samples.md`:
- If 1+ samples are filled in, use them to pattern-match draft sentence rhythm and hook style
- Hard-reject any draft containing entries from the "phrases I'd never say" blocklist
- Bias word choice toward the "phrases that sound like me" allowlist
- If empty, fall back to playbook voice rules and flag this in the summary

## Step 3 — Plan the next 7 days

Use the weekly cadence from `playbook.md`. (Default: Mon educational, Tue build log, Wed franchise, Thu news, Fri ROI/business, Sat build/educational rotate, Sun reflection.)

For each day, choose a topic in this order of preference:
1. A pending `[ ]` brief from `inbox.md` whose `target day` matches
2. For Wednesday only: the next `[ ]` topic from `wednesday-topic-bank.md`
3. A pending `[ ]` brief from `inbox.md` whose pillar matches the day
4. A topic you generate that fits the day's pillar — but only if it clears the substance bar AND aligns with the performance biases from Step 2

## Step 4 — Substance check (apply to every chosen topic)

Reject if the topic is generic, beginner-level, has no specific artifact, or repeats a hook used in the last 7 drafts. See `how-this-works.md` for the full criteria. If a brief from the inbox can't clear the bar, do not draft it — instead move it to **Blocked** in `inbox.md` with a one-line question.

## Step 5 — Draft each post

For each accepted topic, write a file at `[YOUR_FOLDER_PATH]/drafts/YYYY-MM-DD-slug.md`. Use the date the post will be published. Use kebab-case for the slug.

Use the exact frontmatter spec and body structure from `how-this-works.md`. Every draft must include:
- Hook (≤49 chars)
- Caption (1,200–1,800 chars, short paragraphs, line breaks every 1–2 sentences)
- Carousel slides (if format is carousel)
- The artifact (command, prompt, config, screenshot reference, or number)
- A single CTA
- 3–5 hashtags
- Posting notes for the user — must end with: "Run `publish-checklist.md` before hitting Post. Log a Day-0 row in `performance-log.md` immediately after publishing."

For the franchise day (default Wednesday), the title must follow `[FRANCHISE NAME] #N — [topic]` where N is the next sequential number (look at past drafts in `drafts/` to find the last N used).

## Step 6 — Update tracking files

- `inbox.md` — flip used briefs to `[x]` under **Drafted** with link + decision note. Move blocked briefs to `[!]` **Blocked**.
- `wednesday-topic-bank.md` — flip the used topic to `[x]` under **Drafted**.
- `drafts/_sweep-log.md` — prepend a new sweep entry with date, drafts created, blocks, bank/inbox status, performance signals applied.

## Step 7 — Report back

Send a short summary message in this shape:

```
LinkedIn sweep complete — week of {date range}.

✅ Drafted {N}:
- Mon: {title} → drafts/{file}
- Tue: ...
- Wed: {franchise} #{N} — {title} → drafts/{file}
- ...

⚠️ Blocked {N} (questions in inbox.md):
- {brief title}: {question}

📊 Topic bank: {X} topics remaining (refill if <4)
📥 Inbox queue: {Y} briefs still pending
📈 Performance signal:
  - Top archetypes biased: {list, or "n/a — <8 rows in performance-log"}
  - Unfollowed-up 2x+ hits: {list, or "none"}
  - Rows missing D7 metrics: {N}
🎙️ Voice: {samples loaded count, or "fallback voice (voice-samples.md empty)"}
```

## Hard rules

- Never reference any folder outside `[YOUR_FOLDER_PATH]/`
- Never publish anything — only draft
- Never lower the substance bar to fill a slot — block it instead
- If `drafts/` already has files dated for the upcoming week, skip those days and only draft what's missing
- Prefer the file tools (Write/Edit) for writes so the NeuralFlow watcher syncs immediately
```

---

## How to install in Cowork

1. Open Cowork
2. Type: `Create a scheduled task`
3. Paste the prompt above (with `[YOUR_FOLDER_PATH]` replaced)
4. Set cron: `0 16 * * 0`
5. Click "Run now" once to pre-approve tool permissions (otherwise the first scheduled run will pause asking for them)

The task lives at `~/Documents/Claude/Scheduled/linkedin-weekly-sweep/SKILL.md` after creation. You can edit it there directly if you want to tweak the prompt later.
