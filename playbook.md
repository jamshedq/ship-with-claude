---
type: playbook
created: 2026-04-25
updated: 2026-04-25
owner: Jamshed Qureshi
tags: [linkedin, strategy, ai, claude-code, claude-cowork, anthropic]
---

# LinkedIn Playbook — Building in Public with Claude

This is the source of truth for what gets posted from this folder. It distills `LinkedIn_Strategy.docx` and `30_Day_Content_Calendar.xlsx` into a single working reference that Claude reads on every sweep.

## Positioning

**One line:** I build with Claude in public — every day I share one specific thing I learned, shipped, or broke using Claude Code, Cowork, and the rest of the Anthropic stack.

**Why this works:** practitioner credibility ("I shipped this") is legible to all four target audiences at once — developers verify, founders extract leverage lessons, knowledge workers copy patterns, and decision-makers see proof.

## Audience mix (target)

- 30% Developers & technical builders
- 25% Founders & SaaS operators
- 25% Non-technical knowledge workers
- 20% Enterprise / decision-makers

Every post is readable by all four. Each post leans into one as the primary reader.

## Content pillars (with weights)

1. **P1 — Build Logs (30%)** — specific things shipped this week. Screenshots, prompts, before/after.
2. **P2 — Tool Teardowns (20%)** — how a feature actually works (hooks, MCP, sub-agents, SDK, Cowork skills).
3. **P3 — News Reactions (20%)** — Anthropic releases, model updates, MCP ecosystem, competitor moves.
4. **P4 — Founder/Operator Lessons (15%)** — ROI math, hiring impact, automation patterns, pricing.
5. **P5 — Educational Carousels (15%)** — evergreen explainers, frameworks, mental models.

## Weekly cadence (anchored slots)

| Day | Slot | Pillar | Format |
|---|---|---|---|
| Mon | Frame the week | P5 — Educational | Carousel |
| Tue | Build log | P1 — Build Log | Carousel or single image |
| **Wed** | **Claude Code Wednesdays** ⚙️ | P2 — Tool Teardown | Carousel |
| Thu | News reaction | P3 — News | Carousel or single image |
| Fri | ROI / business angle | P4 — Founder | Carousel |
| Sat | Build log or evergreen | P1 or P5 | Carousel |
| Sun | Reflection | Personal | Text-only |

### Claude Code Wednesdays — the anchor franchise

Every Wednesday is dedicated to **one specific Claude Code practice, command, or pattern**. This is a recurring branded slot that compounds — readers start checking the feed on Wednesday for it.

**Topic bank:** see `wednesday-topic-bank.md`. Always pick from this bank for Wednesday. If the bank runs low, refill before posting.

**Format requirements for this slot:**

- Title pattern: `Claude Code Wednesdays #N — [the specific thing]`
- Must show actual command syntax, hook config, slash command, or similar concrete artifact
- Must include a "the gotcha" slide — the failure mode, the thing that's not in the docs, the limit nobody told you about
- Must end with "what I'd do differently" or "when not to use this"
- Always carousel format (this is the franchise look)

## The substance bar — non-negotiable

**Default reader:** someone who already uses Claude Code or Cowork daily. Even the non-technical readers in the audience are watching builders and want signal, not 101.

**Every post must contain at least one of:**

- A specific command, prompt, hook config, slash command, or syntax — copy-pastable
- A specific failure mode or limit (citation drift %, context-window edge, tool-loop trap)
- A specific number from production (cost, hours, error rate, before/after metric)
- A non-obvious comparison (Claude Code vs Cursor vs IDE — with the actual decision rule, not "it depends")
- A pattern with a name (the "verification pass," the "metadata routing layer," the "session-boundary hook")

**Banned content shapes (will be auto-rejected by the loop):**

- "What is X?" intros where X is Claude, MCP, agents, AI in general
- "5 ways to use AI" lists where any item is generic productivity
- "AI will change [industry]" predictions with no specific shipped example
- "Try writing better prompts" or "ask it to think step by step" — reader knows
- Any post that could have been written by someone who has never used the tool being discussed

**Voice:**
- Lead with the point. No preamble.
- Short paragraphs (1–2 sentences).
- Numbers > adjectives.
- Show, don't tell — screenshots and code beat description.
- Honest about failures. The "what broke" slide is often the most-saved.

## Post structure (single-image)

1. Hook (≤49 chars to clear the "see more" cutoff)
2. The specific thing — what, with one line of why
3. The artifact (command, prompt, screenshot, number)
4. The gotcha or the lesson
5. CTA — one only

## Carousel skeleton (default format)

1. **S1 Hook** — one bold claim or specific number. Big type.
2. **S2 Context** — why this matters in 2026. Two sentences.
3. **S3 Frame** — the 3 / 5 / 7 things you'll cover.
4. **S4–N One idea per slide** — title, one paragraph or 3 bullets, one screenshot/icon.
5. **Penultimate** — summary as a single visual.
6. **Final** — CTA + your handle.

Slide count sweet spot: 7–10. Drop completion rate above 12.

## Visual rules

- 4:5 vertical (1080×1350)
- Two fonts only: bold display for headlines, clean sans for body
- Three colors: deep navy background (`#0A2540`), white text, accent (warm orange `#F26B3A`)
- Brand the bottom-left corner with name + handle on every slide
- Claude Code Wednesdays slot uses the same palette but adds a small "⚙️ Claude Code Wednesdays #N" marker on slide 1

## CTA library (rotate)

- Comment-bait: "Comment 'prompt' and I'll DM you the exact one I used."
- Save-bait: "Save this — comes in handy the next time you set up X."
- Share-bait: "Tag the engineer on your team who runs Claude Code."
- Follow: "Follow Jamshed for one of these every weekday."
- Conversation: "What's your gotcha with this? Curious."
- Soft pitch: "I help teams ship internal tools with Claude. DM 'build' if you want a hand."

## Hashtag strategy

3–5 per post. One large + two mid + one niche.

- **Large:** `#AI #ArtificialIntelligence #Productivity #SaaS #FutureOfWork`
- **Mid:** `#Anthropic #ClaudeAI #LLM #AIagents #BuildInPublic #DevTools`
- **Niche:** `#ClaudeCode #ClaudeCowork #MCP #ModelContextProtocol #AgentSDK`

## KPIs (review weekly)

| Metric | Why | Month-1 target | Month-3 target |
|---|---|---|---|
| Followers gained / week | Audience growth signal | +50 | +200 |
| Avg dwell time | Best content-quality proxy | >15s | >25s |
| Profile views / week | Are people checking who you are | >200 | >800 |
| Inbound DMs / week | Only metric that matters for monetization | >3 | >15 |

## See also

- `LinkedIn_Strategy.docx` — long-form playbook (this is the distilled version)
- `30_Day_Content_Calendar.xlsx` — first-month topic bank
- `wednesday-topic-bank.md` — Claude Code franchise slot
- `inbox.md` — drop briefs here
- `how-this-works.md` — the loop spec
- `drafts/` — generated posts land here
