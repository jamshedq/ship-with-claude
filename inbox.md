---
type: inbox
created: 2026-04-25
updated: 2026-04-25
tags: [linkedin, inbox, content-pipeline]
---

# Inbox

Drop briefs here. Claude sweeps this note on demand or every Sunday at 4pm PT, drafts each pending brief into `drafts/`, and moves it to **Drafted** below.

The minimum viable brief is one line. Anything you don't fill in, Claude infers from `playbook.md`.

## Brief template

Copy this block under **Pending** when adding something new:

```
### [ ] Short title
- one-line idea, raw, in your own voice
- pillar: P1-BuildLog | P2-Teardown | P3-News | P4-Founder | P5-Educational     (optional)
- format: carousel | single-image | text-only                                    (optional, default carousel)
- target day: Mon | Tue | Wed | Thu | Fri | Sat | Sun                            (optional)
- artifact: link / screenshot path / command / prompt / number                   (optional but increases substance)
- notes: anything else
```

Status legend:
- `[ ]` pending — Claude will pick this up
- `[~]` in-progress — Claude is drafting
- `[x]` drafted — moved to **Drafted** with link to file
- `[!]` blocked — Claude needs more from you (see note)

## Wednesday slot is reserved

Every Wednesday is **Claude Code Wednesdays** — a recurring branded slot. You don't need to add Wednesday briefs unless you want a specific topic that week. If the Wednesday lane is empty, Claude pulls the next topic from `wednesday-topic-bank.md` automatically.

## The substance bar (auto-applied)

Every brief — yours or pulled from the topic bank — gets drafted under the substance bar in `playbook.md`:

- Real artifact (command / prompt / config / screenshot / number) required
- No "what is X" intros, no generic productivity claims, no "AI will change [industry]" takes
- Banned hook shapes are auto-rejected and rewritten

If a brief is too thin to clear the bar, Claude moves it to **Blocked** with a question instead of forcing a weak post.

---

## Pending

### [ ] (sample — delete or replace) Sub-agent pattern for parallel code review
- Use case from this week: ran 3 sub-agents in parallel reviewing the same PR from different angles (security, performance, readability). Cut review time from 40 min to 8.
- pillar: P2-Teardown
- format: carousel
- target day: Wed
- artifact: the actual `Agent({ subagent_type: ... })` invocation pattern + the screenshot of all three reports
- notes: bonus slide on when NOT to parallelize (when reviewers need to share state)

---

## In progress

(Claude moves briefs here when starting a draft, then to **Drafted** when done.)

---

## Drafted

(Format Claude uses when a draft lands:)

```
### [x] Title — drafted YYYY-MM-DD HH:MM
→ drafts/YYYY-MM-DD-slug.md
- pillar / format / target day actually used
- one-line note on any decisions Claude made (e.g. "downgraded from carousel to single-image because no comparison content")
```

---

## Blocked

(Briefs that need more from you before drafting. Claude leaves a question here.)
