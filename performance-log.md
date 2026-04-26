---
type: log
created: 2026-04-25
updated: 2026-04-25
tags: [linkedin, performance, analytics]
---

# Performance Log

Single source of truth for what each post actually did. The Sunday sweep reads this — patterns that win get more rotation, patterns that bomb get cut.

## Capture cadence

| When | What to log |
|---|---|
| **Day 0 (publish day)** | Add a row with everything you know at publish: post link, day, pillar, format, hook archetype, CTA tier |
| **Day 2** | Fill D2 reach + engagement + comments. Reach stabilizes by ~48h. |
| **Day 7** | Fill D7 reach + final engagement rate + saves + profile views + followers gained. Write the **learning** column. |
| **Sunday** | 15-min review ritual (see bottom). Updates patterns section. |

## Baseline

A post is **B+** if it exceeds 100% of the **median D7 reach of the prior 4 weeks**. **A+** = 2x median. **Bomb** = <50% median. First 4 weeks: no baseline yet — just collect.

Update the rolling median after each Sunday review. Track here:

| Period | D7 median reach | D7 median engagement rate | Sample size |
|---|---|---|---|
| Apr 2026 (forming) | — | — | — |
| May 2026 | | | |
| Jun 2026 | | | |

## Posts

Most recent at top. Add a row at Day 0, fill in over the week.

| Date | Post | Day | Pillar | Format | Hook archetype | D2 reach | D7 reach | Eng rate | Comments | Saves | Profile views | Followers | CTA worked? | Grade | Learning |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| (first publish goes here) | | | | | | | | | | | | | | | |

## Weekly rollup

### Week of (date)

- Posts published: 
- Total D7 reach:
- Avg engagement rate:
- Top performer (and why):
- Bottom performer (and why):
- Action for next week:

(Add a new ## heading per week.)

## Monthly rollup

### (Month YYYY)

- Posts: 
- Total reach:
- Avg engagement rate:
- Followers gained:
- Inbound DMs (offer-relevant):
- Top 3 posts:
  1. 
  2. 
  3. 
- Bottom 3 (what to cut):
  1. 
  2. 
  3. 

## Patterns (living section)

Build this as evidence accumulates. Empty until ~Week 4.

### What works (with evidence)

- 

### What doesn't (with evidence)

- 

### Hypotheses to test

- **H1:** 
- **H2:** 

## Heatmaps (fill after 10+ posts per cell)

### Hook archetype performance

| Archetype | Avg eng rate | Sample | Verdict |
|---|---|---|---|
| Story | | | |
| Stat | | | |
| Contrarian | | | |
| Question | | | |
| How-to | | | |
| TIL | | | |
| Curiosity gap | | | |
| Comparison | | | |
| Confession | | | |
| Social proof | | | |

### Format performance

| Format | Avg eng rate | Sample | Verdict |
|---|---|---|---|
| Carousel | | | |
| Single image | | | |
| Text-only | | | |
| Native video | | | |

### Pillar performance

| Pillar | Avg eng rate | Sample | Verdict |
|---|---|---|---|
| P1 — Build Log | | | |
| P2 — Tool Teardown (incl. Claude Code Wed) | | | |
| P3 — News Reaction | | | |
| P4 — Founder/ROI | | | |
| P5 — Educational | | | |

### Day-of-week performance

| Day | Avg eng rate | Sample | Verdict |
|---|---|---|---|
| Mon | | | |
| Tue | | | |
| Wed (Claude Code) | | | |
| Thu | | | |
| Fri | | | |
| Sat | | | |
| Sun | | | |

## Triggers — when a post hits, act

| Trigger | Action | Window |
|---|---|---|
| 2x baseline reach | Schedule a carousel follow-up on the same theme | Within 7 days |
| 3x baseline reach | Write a long-form expansion / newsletter-shape essay | Within 14 days |
| 5x baseline reach | Pitch a podcast / guest article / collaboration | Within 30 days |
| 10x+ (viral) | Screenshot, file in `wins/`, write a "what worked" teardown for next week | Within 7 days |

## Triggers — when a pattern bombs

- One post <50% baseline → no action, single data point
- Same pattern <50% twice in 2 weeks → flag in Sunday review, drop next rotation
- Pillar consistently <70% baseline for a month → reweight in `playbook.md`
- A specific hook archetype <60% over 8 uses → retire it

## Sunday 15-min review ritual

1. Open this file. Read this week's rows.
2. Answer: top performer — what hook, format, topic?
3. Answer: bottom performer — same questions.
4. Any 2x+ hits? Add a follow-up brief to `inbox.md` (target the same hook archetype, adjacent angle).
5. Any patterns hitting bomb territory twice? Note in **Patterns / What doesn't**.
6. Update the rolling median in the Baseline section.
7. Confirm the Sunday 4pm sweep ran (check `drafts/_sweep-log.md`).

## How the loop uses this

The Sunday scheduled sweep reads this file. Specifically:

- It looks at the last 4 weeks of rows
- Identifies the top 3 performing hook archetypes and biases new drafts toward them
- Identifies any retired archetypes (per the bomb trigger above) and avoids them
- Surfaces any 2x+ hits in the sweep summary so you don't miss the follow-up window
