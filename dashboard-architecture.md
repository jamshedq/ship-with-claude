---
type: explainer
created: 2026-04-25
updated: 2026-04-25
tags: [linkedin, dashboard, architecture, build-in-public, neuralflow]
---

# The LinkedIn Loop Dashboard — how it works, every element

A walkthrough of the live dashboard that runs the LinkedIn loop. What each element is, why it's there, how the data flows.

Built as a Cowork live artifact. Reads NeuralFlow notes via MCP. Renders Chart.js. ~28 KB of self-contained HTML.

---

## The dashboard in one sentence

A single page that answers four questions every time I open it: **What's queued? What just shipped? How is it doing? What do I do next?**

Everything else on it is in service of those four.

---

## The data flow, end to end

```
You drop briefs in inbox.md (any time, during the week)
            ↓
You drop raw stuff in raw-inbox.md (any time)
            ↓
Sunday 4 PM PT — scheduled Cowork task fires
            ↓
Loop reads: playbook + voice-samples + performance-log
            + inbox + raw-inbox + topic bank
            ↓
Drafts 7 posts (.md + .html each) into drafts/
            ↓
Updates inbox / raw-inbox / topic-bank / sweep-log
            ↓
You publish each day → log a row in performance-log.md
            ↓
Dashboard reads all of the above, every time you open it
            ↓
You see status + growth + recent post performance
            ↓
You click an action button → message goes back to Claude → files update
            ↓
Loop closes
```

The dashboard is the **read layer** over a system that's mostly file-based. NeuralFlow holds the truth. The dashboard renders it.

---

## Architecture — the four moving parts

### 1. The Cowork artifact runtime

The dashboard is a single self-contained HTML file (CSS + JS inline). Cowork's `create_artifact` API saves it to disk under `~/Documents/Claude/Artifacts/linkedin-loop-dashboard/index.html` and renders it in a sandboxed iframe in the Cowork sidebar.

- **Persists across sessions** — close Cowork, reopen tomorrow, same dashboard
- **Sandboxed for security** — can't reach arbitrary URLs, only allowlisted CDNs (Chart.js from jsdelivr is one of them)
- **Two-way bridge** — `window.cowork.callMcpTool(name, args)` to fetch data; `window.sendPrompt(text)` to send a message into the chat as if I typed it

That second bridge is what makes the action buttons work. They're not REST calls. They're prompts to Claude.

### 2. NeuralFlow MCP — the live data fetch

Every time the dashboard loads, it calls four MCP tools in parallel:

```js
Promise.all([
  callMcp('mcp__neuralflow__read_note', { slug: 'LinkedIn_Strategy/inbox' }),
  callMcp('mcp__neuralflow__read_note', { slug: 'LinkedIn_Strategy/wednesday-topic-bank' }),
  callMcp('mcp__neuralflow__read_note', { slug: 'LinkedIn_Strategy/drafts/_sweep-log' }),
  callMcp('mcp__neuralflow__list_recent_notes', { limit: 50 }),
  callMcp('mcp__neuralflow__read_note', { slug: 'LinkedIn_Strategy/performance-log' })
])
```

NeuralFlow's MCP returns each note as text — frontmatter + body. The dashboard parses that text client-side.

### 3. performance-log.md — the data store

Per-post metrics live in a markdown table. The dashboard parses the table into JS objects, then derives every metric and chart from those objects. No database, no JSON file — just a markdown table you can also edit by hand.

Schema (one row per post):

```
Date | Post | Day | Pillar | Format | Hook | Imp D2 | Imp D7 | Likes
| Comments | Reposts | Saves | Profile views | Followers gained
| DMs | Eng rate % | Grade | Learning
```

This is filled by either (a) you typing values manually, or (b) the `fetch-metrics` flow, which uses Claude in Chrome to scrape LinkedIn analytics and write the row.

### 4. Chart.js — the growth visualization

The growth chart is the only piece that needs an external library. Loaded via:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.js" ...></script>
```

(Cowork's CSP allowlist includes jsdelivr.) Two datasets, two y-axes — cumulative followers (blue, left) and daily impressions (orange dashed, right).

Renders only when there are 7+ rows in `performance-log.md`. Below that, it shows an explicit "Building data..." empty state instead of a meaningless single-point chart.

---

## Walking the dashboard top to bottom

### Header strip

**What you see:** "LinkedIn loop" title with an orange accent bar, plus a status line that says "Last sweep: 2026-04-26 16:03 PT — scheduled."

**Why it's there:** First thing your eye lands on. Tells you in one glance whether the system is alive. If the last sweep was 3 weeks ago, something broke.

**How it works:** Status line is computed from the most recent entry in `drafts/_sweep-log.md`.

---

### Four top metric cards

Each card is one number that should be glanceable in <1 second.

**Pending briefs** (blue tint): how many `[ ]` items in the **Pending** section of `inbox.md`. Subtitle shows `[!]` blocked count if any exist.

**Drafts queued** (green tint): count of files matching `LinkedIn_Strategy/drafts/*.md` (excluding `_sweep-log`). Pulled from `list_recent_notes` filtered by slug prefix.

**CCW bank** (orange tint, with warning state): count of `[ ]` items under "## Pending topics" in `wednesday-topic-bank.md`. Card turns amber and shows "refill needed" when count drops below 4.

**Until next sweep** (amber tint): JS-computed countdown to the next Sunday 4 PM PT, ticked every 60 seconds via `setInterval`.

**Why four:** any more and the eye stops scanning. Any fewer and we'd have to drop something useful. These are the metrics where "any change at all" matters.

---

### "This week" grid

**What you see:** Seven cells (Mon–Sun) color-coded by content pillar — Educational/teal, Build log/blue, Claude Code Wed/orange, News/purple, Founder/green, Reflection/gray. Each cell shows the pillar name and either the date or "drafted" if a `.md` file for that date exists in `drafts/`.

**Why it's there:** At-a-glance "do I have a post for tomorrow?" If today is Wednesday and the cell still shows the date instead of "drafted," the loop didn't produce one — manual review needed.

**How it works:** Compute Mon–Sun dates for the current week. Cross-reference each date against the parsed slugs from the drafts folder. Mark cells "done" if there's a match.

The pillar colors are duplicated in the legend below for accessibility (color alone can't be the only signal).

---

### Three-column operational row

Three cards, side by side. Each answers a specific operational question.

#### Pending briefs

**What you see:** Up to 6 brief titles with a colored day badge (the brief's `target day`) and the pillar.

**Why:** Lets you see what's going into Sunday's sweep without opening `inbox.md`. If this is empty, the sweep will auto-generate topics.

**How:** Parse the **Pending** section of `inbox.md` looking for `### [ ] Title` headers, plus the body lines below them. The `target day:` and `pillar:` regexes extract the metadata for the badge.

#### Next Claude Code Wednesdays (CCW)

**What you see:** Up to 6 upcoming franchise topics with `CCW#N` badges in orange. Title shown without the redundant `CCW#N — ` prefix (parsed off, displayed in the badge instead).

**Why:** Wednesday is the recurring slot — readers learn to expect it. Knowing what's coming next 6 weeks deep means the franchise compounds without you stress-refilling at the last minute.

**How:** Parse `wednesday-topic-bank.md` Pending Topics section. Regex out the `CCW#N` prefix from each title. Display badge + clean title.

#### Recent sweeps

**What you see:** Last 4 sweep entries with date, drafted count, blocked count.

**Why:** This is the "is the automation alive?" signal. If the last entry is from 2 weeks ago, the scheduled task broke or got disabled.

**How:** Parse `drafts/_sweep-log.md`. Each sweep is a `## YYYY-MM-DD HH:MM PT — trigger` heading. Extract drafted/blocked counts via regex.

---

### Growth over time

**What you see:** A line chart over the last 30 days with two series:
- Cumulative followers gained (solid blue, left axis)
- Daily impressions (dashed orange, right axis)

Or — if there isn't enough data yet — an explicit empty state: *"Building data... The growth chart needs ~7 published posts with logged metrics before it can show a meaningful trend. Right now you have 1."*

**Why:** Snapshot metrics tell you "today's number." Growth tells you "is this working?" Without the trend you make decisions on noise.

**Why two series, not one:** Followers is the lagging indicator (slow, accumulates). Impressions is the leading indicator (fast, per-post). Plotting them together shows whether reach growth is feeding follower growth — or just dissipating.

**Why dashed orange for impressions:** color-blind safe pairing. The dashed line is also legible as "this one's per-day" without reading the legend.

**How:** Build a 30-day date map. Walk every row in `performance-log.md`. For each row whose date falls in the window, accumulate `Followers gained` (cumulative) and `Imp D7 || Imp D2` (daily). Render via Chart.js with two y-axes.

**Why the 7-post threshold:** A line chart with 1 data point is misleading. A chart with 3 is noise. By 7+ posts, you're likely a couple of weeks in and the shape starts being meaningful. Honest empty states beat lying graphs.

---

### Recent post performance

Two layers — aggregate at top, table below.

#### Aggregate mini-bar (4 cards)

**Posts (this week):** count of rows whose date is within the last 7 days.

**Total impressions:** sum of `Imp D7` (or D2 fallback) for those rows. Formatted as `12.3k` for readable scale.

**Avg engagement rate:** average of `Eng rate %` across those rows.

**Top performer:** the row with the highest engagement rate this week, displayed as the post slug + the rate.

**Why these four:** they map to the four questions a serious creator asks every Sunday — *Did I show up? Did anyone see me? Did anyone engage? What worked best?*

#### Performance table (5 most recent posts)

Columns: Date | Post | Imp D7 | Likes | Comments | Saves | DMs | Eng % | Grade

**Why a table:** when you want to compare 5 posts at once, a table is unbeatable. Cards waste space, charts hide patterns.

**The Grade column:** color-coded pill — A+ (≥2× baseline), B+ (≥1× baseline), C (0.5–1×), Bomb (<0.5×), Pending (no D7 yet). Quick visual sort: which posts are pulling weight, which to study, which to retire.

**Saves and DMs intentionally before Eng %:** the most underweighted metrics in LinkedIn analytics get prime middle real estate. Likes and comments are crowded. Saves and DMs are the conversion proxy.

---

### Action buttons (the bottom row)

Five buttons. The primary one (orange) is the most-used; the other four are utility.

| Button | What happens when clicked |
|--------|--------------------------|
| **Run loop now** (primary) | `sendPrompt("Run my LinkedIn loop now")` — Claude in chat picks up, runs the same procedure as the scheduled task, drafts 7 posts |
| **Add brief** | `sendPrompt("Add a new brief to my LinkedIn inbox")` — Claude prompts for the brief, writes it to `inbox.md` |
| **View drafts** | `sendPrompt("Open the drafts folder and summarize what is queued for this week")` — Claude lists drafts |
| **Fetch metrics** | `sendPrompt("Fetch the latest LinkedIn metrics ... following the prompt in fetch-metrics-prompt.md.")` — triggers the Chrome browser automation |
| **Refill CCW bank** | `sendPrompt("Refill the Claude Code Wednesdays (CCW) topic bank with 5 new advanced topics")` — Claude appends new topics |

**The trick that makes this work:** `sendPrompt` injects text into the chat as if I typed it. From Claude's side, there's no difference between me typing the prompt and the dashboard sending it. Same context, same tools, same result.

This means **any future capability** — a new sweep variant, a new metrics view, an emergency "kill this draft" button — is just one more button + one more prompt template. No backend changes needed.

---

## Build decisions worth naming

These are the calls that meaningfully shaped the result. Worth surfacing because they're the parts other people will most want to argue with.

### Why MCP-driven (vs static data store)

I could have stored everything in a JSON file and re-rendered when it changed. Instead the dashboard fetches markdown from NeuralFlow on every open.

**Tradeoff:** Slightly slower first paint (4 MCP calls in parallel, ~500ms total). But: zero sync logic, zero drift, the markdown files are the source of truth. You can edit `inbox.md` directly in NeuralFlow and the dashboard reflects it on the next refresh. No "wait, why is the dashboard showing old data?" moments.

### Why on-demand fetch (vs background sync)

The `fetch-metrics` flow runs on demand, not on a schedule. You click the button when you want fresh numbers.

**Why:** LinkedIn metrics change in slow rhythms (D2, D7). There's no value in pulling every hour. Background syncs also fail silently — on-demand fetch surfaces errors immediately.

### Why hardcoded colors (vs CSS variables)

The Cowork artifact uses hardcoded hex values rather than CSS custom properties. That's deliberate — Cowork's iframe sandbox sometimes strips CSS variables in print/export contexts. Hardcoded colors are dumb but predictable.

### Why the 7-post empty state for the growth chart

A chart with <7 data points is more misleading than no chart. People look at a 2-point upward line and think "we're growing." It's noise. Explicit "building data" copy is more honest and educational.

### Why a single 1200px page (vs tabs / multiple views)

Tabs hide things. The whole point of a dashboard is "everything you need to know in one glance." If a piece doesn't earn its real estate, it shouldn't be on the dashboard at all — not pushed behind a tab.

---

## What I'd add next

Real things on the roadmap, not "future work" wishlist items.

- **Today's post panel** — surfaces the day's draft at the top with copy buttons for caption + first comment + a "Mark posted" action that updates the frontmatter
- **Hook archetype heatmap** — once `performance-log.md` has 20+ rows, show which hook patterns perform best
- **Best-time heatmap** — day-of-week × hour-of-day × engagement rate
- **Voice-samples staleness flag** — warn if `voice-samples.md` hasn't been updated in 60+ days (drafts will start drifting)
- **Per-post detail view** — click a row in the performance table to see the full post + its metrics history

---

## The whole thing in five bullets

1. **One file** — 28 KB of self-contained HTML, persisted as a Cowork artifact
2. **Live data, no database** — reads markdown notes from NeuralFlow via MCP on every open
3. **Two-way bridge** — `callMcpTool` for fetch, `sendPrompt` for actions
4. **Honest empty states** — every panel has a clear "not enough data yet" message instead of misleading defaults
5. **Markdown is the truth** — you can edit any source file by hand and the dashboard reflects it next refresh

The dashboard is small. The system underneath isn't. That's the whole point.

---

*Built by [@JamshedQureshi](https://linkedin.com/in/jamshedqureshi) — Hands-on with AI. Less hype, more shipping.*
*The full code lives in [public-share/dashboard.html](./public-share/dashboard.html). Disclosure: I built NeuralFlow ([neuralflow.run](https://neuralflow.run)) — solo project, still shipping.*
