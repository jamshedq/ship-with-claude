---
type: spec
created: 2026-04-25
updated: 2026-04-25
tags: [linkedin, loop, spec]
---

# How this works — the loop spec

This file is the contract Claude follows when generating LinkedIn posts from this folder. Read this first on every sweep, then `playbook.md`, then `inbox.md`.

## Folder layout

```
LinkedIn_Strategy/
├── playbook.md                  ← positioning, pillars, substance bar, voice rules
├── inbox.md                     ← Jamshed drops briefs here
├── wednesday-topic-bank.md      ← Claude Code Wednesdays franchise topics
├── how-this-works.md            ← this file (the loop spec)
├── voice-samples.md             ← Jamshed's real posts + voice rules — biggest quality lever
├── performance-log.md           ← measurement layer — drives what gets more rotation
├── engagement-playbook.md       ← non-content side: comment ritual, DMs, algorithm habits
├── publish-checklist.md         ← Jamshed's pre-flight before hitting Post
├── raw-inbox.md                 ← free-form capture: links, half-thoughts, screenshots
├── templates/
│   └── carousel-day1-example.html  ← the visual master — print-to-PDF carousel template
├── headshot-bw-embed.jpg        ← B&W headshot, embedded in every carousel footer
├── drafts/                      ← Claude writes posts here as YYYY-MM-DD-slug.md
│   ├── _sweep-log.md            ← append-only log of every sweep
│   └── YYYY-MM-DD-slug.html     ← populated carousel HTML (auto-generated alongside .md)
├── LinkedIn_Strategy.docx       ← long-form playbook (reference only)
└── 30_Day_Content_Calendar.xlsx ← first-month topic bank (reference only)
```

## Trigger patterns

The loop runs in two ways:

1. **On demand.** Jamshed says "run my LinkedIn inbox" or similar. Claude does one pass.
2. **Scheduled.** Every Sunday at 4:00 PM PT, the scheduled task `linkedin-weekly-sweep` fires automatically and generates the next 7 days of posts.

Both run the same procedure below.

## The procedure (every sweep)

1. **Load context, in order:**
   - `playbook.md` — pillars, weekly cadence, substance bar (the contract)
   - `voice-samples.md` — Jamshed's real voice; if filled in, this overrides any generic voice rules
   - `performance-log.md` — last 4 weeks of rows; bias toward winning hook archetypes, avoid retired ones
   - `inbox.md` — pending briefs from Jamshed (structured)
   - `raw-inbox.md` — free-form captures from the week (links, half-thoughts, screenshots) — process per the rules below
   - `wednesday-topic-bank.md` — Claude Code Wednesdays franchise topics
   - `drafts/_sweep-log.md` — what was drafted recently (no repeats within 30 days)
2. **Pick this week's 7 slots** (Mon–Sun) per `playbook.md` weekly cadence.
3. **For each slot:**
   - If a `[ ]` brief in `inbox.md` matches the day → use that brief
   - Else if the slot is **Wednesday** → pull the next `[ ]` topic from `wednesday-topic-bank.md`
   - Else → pick the highest-priority `[ ]` brief from `inbox.md`, or if none exist, generate a topic that matches the day's pillar from the playbook
4. **Run the substance check** on the chosen topic. If it can't clear the bar (see below), move the brief to **Blocked** in `inbox.md` with a one-line question. Skip; don't force.
5. **Draft the post** following the post structure in `playbook.md`. Save to `drafts/YYYY-MM-DD-slug.md` using the frontmatter spec below.
6. **Generate the carousel HTML** alongside it. Save to `drafts/YYYY-MM-DD-slug.html` — see "Carousel HTML generation" section below.
7. **Update tracking files:**
   - `inbox.md` — flip the brief to `[x]` under **Drafted** with link + decision note, OR move to `[!]` **Blocked** if skipped
   - `wednesday-topic-bank.md` — flip the topic to `[x]` under **Drafted** if used
8. **Append a sweep summary** to `drafts/_sweep-log.md` with date, what was generated, what was blocked, and any flags (e.g., "Wednesday bank below 4 — refill needed").

## Carousel HTML generation

Every draft gets a corresponding `.html` file at `drafts/YYYY-MM-DD-slug.html` — a print-ready, populated copy of the master carousel template at `templates/carousel-day1-example.html`. Jamshed opens it in Chrome and uses Cmd+P → Save as PDF to publish.

**Use the master template as the visual contract.** Read `templates/carousel-day1-example.html` to confirm:
- Cream notebook bg with horizontal ruled lines, thin orange margin line on left
- Patrick Hand SC titles, Patrick Hand body, Caveat for stats and brand mark
- Color-coded section blocks (orange, blue, purple, green, yellow, pink, light-blue) with thick colored left borders
- Numbered orange circle for sections; dark navy "VS" badge for comparisons
- Highlighter swipes (pink, green, orange, yellow, blue, purple), strikethrough for myths, wavy underline for emphasis
- Stat cards: big orange Caveat number + small body label, in 3-up rows
- Bottom-line callout: orange border + tilt + "★ Label" header
- Checklist block: light blue bg, orange checkbox header, hand-drawn empty boxes per item
- Pages 1 to N-1 use the small footer (name + tagline + page indicator). Page N uses the **full orange footer bar** with the embedded B&W headshot circle.

**Page count is driven by substance, never capped.**
- 2 pages — short tips, quick takes, simple comparisons
- 3 pages — standard build logs, teardowns
- 4–5+ pages — deep dives with multiple architecture sections, eval breakdowns, long teardowns

Never compress real content to fit a page count. Never pad sparse content to look longer either. The right number of pages is whatever the substance demands.

**Block library — pick whichever fit each post (no fixed sequence):**
- Title with highlighted phrase
- Subtitle (one line)
- VS comparison row (pink + green blocks with "VS" badge)
- Numbered section (orange / blue / purple / green / yellow — pick the color per topic, rotate so the feed is varied)
- Stat row (3 cards across)
- Bottom-line callout (orange border, tilted, "★ The Bottom Line" label)
- Checklist block (light blue, "YOUR NEXT STEP" pattern)
- Down-arrow connector between major sections

**Tagline (used in every footer):** "Hands-on with AI. Less hype, more shipping."
**Brand line:** "Follow @JamshedQureshi"
**URL:** linkedin.com/in/jamshedqureshi
**Headshot:** B&W circle, embedded as base64 from `headshot-bw-embed.jpg`. Same image, every post, every page-N footer.

## Raw-inbox processing (read on every sweep)

After loading `raw-inbox.md`, walk through every unprocessed item (anything without a `[drafted]`, `[promoted]`, `[skipped]`, or `[ask]` marker). For each:

1. **Can it become a post that clears the substance bar?**
   - **Yes, with everything needed already there** → draft the post directly. Mark the raw item `[drafted: <slug>]` with the new file path. Don't move it; just annotate.
   - **Yes, but it should be a brief Jamshed reviews first** → move it to `inbox.md` as a properly formatted brief (under **Pending**). Mark the raw item `[promoted]`.
   - **Yes, but you need more context** (e.g., a vague reference, a link without a take, an unfinished thought) → mark it `[ask: <one-line question>]`. Don't draft. Jamshed will respond next time.
   - **No** (off-brand, redundant with a recent post, or just not enough material) → mark it `[skipped: <one-line reason>]`. Move on.

2. **Never delete items.** Always annotate in place — Jamshed can clean up old `[drafted]` / `[skipped]` items himself when he wants the file tidier.

3. **Order priority for the week's slots:** structured `inbox.md` briefs first, then raw-inbox items that match a day's pillar, then `wednesday-topic-bank.md` for Wednesday, then auto-generated topics for any unfilled slots.

4. **In the sweep summary**, report counts: how many raw items were drafted, promoted, asked-about, skipped.

## Performance-driven biasing (read on every sweep)

After loading `performance-log.md`, before drafting:

- **Top 3 hook archetypes by D7 engagement rate** — bias new drafts toward these (not exclusively; one slot per week may experiment outside)
- **Retired archetypes** (any flagged "retire" via the bomb trigger) — never draft these
- **Last week's top performer** — surface as a follow-up brief candidate in the sweep summary if Jamshed hasn't already added one to `inbox.md`
- **Patterns <50% baseline twice in 2 weeks** — drop that pattern from the next 4 weeks

If `performance-log.md` has fewer than 8 filled rows, skip biasing — there's not enough signal yet. Use the playbook defaults.

## Voice fidelity (read on every sweep)

After loading `voice-samples.md`:

- If the file has 1+ samples filled in, pattern-match draft sentence rhythm and hook style against them
- Hard-reject any draft containing a "phrases I'd never say" entry from that file
- Bias word choice toward the "phrases that sound like me" allowlist
- If the file has no samples filled, fall back to the voice rules in `playbook.md` and add a flag in the sweep summary: "voice-samples.md empty — drafts using fallback voice"

## Substance check (every post)

Reject and don't draft if the topic:

- Could be answered by a Wikipedia paragraph ("what is X")
- Has no specific artifact (command, prompt, config, screenshot, number)
- Reads as generic productivity advice ("AI saves you time", "be more efficient")
- Predicts the future of an industry without a shipped example
- Repeats a hook archetype Claude used in the last 7 drafts

Accept and draft if the topic has at least one of:

- A copy-pastable command, hook, slash command, prompt, or config snippet
- A specific failure mode, limit, or gotcha
- A real number from production (cost, time, error rate)
- A non-obvious comparison with a clear decision rule
- A named pattern with reusable structure

## Per-draft frontmatter (required)

Every file in `drafts/` opens with:

```yaml
---
type: linkedin-draft
created: YYYY-MM-DD
target_publish: YYYY-MM-DD
status: draft | scheduled | published | killed
day: Mon | Tue | Wed | Thu | Fri | Sat | Sun
pillar: P1-BuildLog | P2-Teardown | P3-News | P4-Founder | P5-Educational | Personal
subtype: build-log | teardown | news | roi | evergreen | tip-of-week | reflection
format: carousel | single-image | text-only
audience_primary: developers | founders | knowledge-workers | enterprise
hook_archetype: story | stat | contrarian | question | how-to | til | curiosity | comparison | confession
cta_tier: 1-engage | 2-conversation | 3-direct-offer
substance_markers: [list any of: artifact-syntax, failure-mode, production-number, comparison-rule, named-pattern]
hashtags: [list of 3-5]
source_brief: link to inbox.md anchor or topic-bank entry
---
```

If `pillar` is `P2-Teardown` AND `day` is `Wed`, the post is part of the Claude Code Wednesdays franchise — title must follow `Claude Code Wednesdays #N — [topic]`.

## Per-draft body structure

```markdown
# {Hook — ≤49 chars}

## Caption (LinkedIn body, 1,200–1,800 chars)
{The actual post text. Short paragraphs. Line breaks every 1–2 sentences.}

## Carousel slides (if format == carousel)
- S1 HOOK — ...
- S2 CONTEXT — ...
- S3 FRAME — ...
- S4–S(N-1) — one idea per slide
- S(N-1) SUMMARY — ...
- SN CTA — ...

## Artifact
{The actual command / prompt / config / screenshot reference / number that anchors this post.}

## CTA
{The single call-to-action, copy-final.}

## Hashtags
{3–5 hashtags, on one line.}

## Posting notes
{Anything Jamshed needs to know at publish time — e.g., "first comment: link to gist", "tag @anthropic", "repost in DevTools group on day 3"}
```

## Blocked-brief format (when Claude can't clear the substance bar)

When Claude moves a brief to **Blocked** in `inbox.md`, it adds:

```
### [!] {original title} — blocked YYYY-MM-DD
- one-line reason
- the question Claude needs answered to proceed
```

## Sunday scheduled sweep — what gets posted to Jamshed

After the sweep completes, the scheduled task notifies Jamshed with:

- ✅ N drafts created (with file links)
- ⚠️ N briefs blocked (with the questions)
- 📊 Wednesday topic bank status (X unfilled remaining; flag if <4)
- 📥 Inbox status (Y pending briefs not yet pulled)
- 📈 Performance signal (from last 4 weeks of `performance-log.md`):
  - Top 3 hook archetypes biased toward this week
  - Any 2x+ hits with no follow-up scheduled
  - Any rows still missing D7 metrics (gentle nudge to fill them in)
- 🎙️ Voice fidelity status (samples loaded vs fallback)

## On regeneration / edits

If Jamshed edits a draft directly in `drafts/` and wants Claude to re-run, he writes `regenerate` in the frontmatter `status` field. Claude re-drafts and overwrites, preserving the original `created` date.

If Jamshed wants to kill a draft, he sets `status: killed` — Claude excludes it from any future logic but keeps the file as a record of what was tried.

## Per-draft "Posting notes" must include

Every draft's `## Posting notes` block ends with:

> Run `publish-checklist.md` before hitting Post. Log a Day-0 row in `performance-log.md` immediately after publishing.

This keeps the publish-side discipline tied to the draft itself.

## Rules Claude must follow

- Never reference, link to, or pull context from any folder outside `LinkedIn_Strategy/`
- The NeuralFlow MCP is now pointed at this folder — `mcp__neuralflow__*` tools are OK to use for read/search; for writing prefer the file tools so the watcher picks up changes immediately
- Never re-pitch a topic that's been drafted in the last 30 days (check `drafts/_sweep-log.md`)
- Never publish — Claude only drafts. Jamshed publishes.
- Never assume Jamshed has time to fix a weak draft. If it can't clear the substance bar, block it.
- Never lower the substance bar to fill a slot — block it instead, with a question Jamshed can answer in 30 seconds
