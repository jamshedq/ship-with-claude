# Five Monday Plays for non-developers using Claude Cowork

The 5 plays from the Monday Apr 27 LinkedIn post — each one expanded into a **full, ready-to-paste prompt** for Claude Cowork. Copy a prompt, paste it into Cowork, swap the bracketed bits for your specifics, and run it.

→ Original LinkedIn post: [link to be added once published]

---

## Setup (one-time, ~10 minutes)

These plays assume you have:

- **Claude Cowork** installed (free download in your Claude desktop app)
- The relevant connectors enabled — each play tells you which one it needs:

| Play | Connector(s) needed |
|---|---|
| 1. Inbox triage | Gmail (or any email connector) |
| 2. Notes → status | Your notes folder (NeuralFlow / Notion / Google Drive / Obsidian) |
| 3. Deck from brief | File system access (or attach the brief in chat) |
| 4. Contract review | File system access (or attach the PDF) |
| 5. Week planning | Google Calendar + your task tool (Things, Linear, Asana, etc.) |

If a play uses a connector you don't have set up yet, click **Add connector** in Cowork before running it. Most connectors take 30 seconds to wire up.

---

## Play 1 — Inbox Triage

**What it does:** Reads your Gmail inbox from the last 24 hours, sorts emails into 3 buckets (reply now / schedule / archive), and drafts the replies for "reply now" — in your voice.

**Connector needed:** Gmail

**Time saved (mine):** 90 minutes → 11 minutes

**Prompt — copy-paste:**

> Triage my Gmail inbox from the last 24 hours into 3 buckets:
>
> - **Reply now** — urgent + I'm the right person to answer
> - **Schedule** — low-urgency but worth a thoughtful reply later
> - **Archive** — no action needed (newsletters, FYIs, automated)
>
> For everything in "reply now", draft a 3–5 sentence reply in my voice — warm, direct, no oversell. Show me the bucket counts first, then the drafts. **Don't send anything** — I'll review and send manually.

---

## Play 2 — Notes → Status Update

**What it does:** Pulls from your second-brain notes folder for the last 7 days, finds what you actually worked on, and writes a status update for your team or manager.

**Connector needed:** Your notes folder (NeuralFlow MCP, Notion, Google Drive, Obsidian, or any file system)

**Time saved (mine):** 45 minutes → 5 minutes

**Prompt — copy-paste (replace `[project]` with your project name, or remove for all projects):**

> Pull from my notes folder for the last 7 days. Find anything I wrote about `[project]` — meeting notes, scratchpads, decisions, blockers, design sketches.
>
> Write a status update for my team in this format:
>
> - **What shipped this week** (3–5 lines max)
> - **What I'm blocked on** (each blocker with the specific question or decision needed)
> - **Next week's top priority** (one thing)
> - **One thing worth their attention** (anything they should know but haven't asked)
>
> Keep it under 250 words. Cite the note that each line came from. Plain language, no corporate-speak.

---

## Play 3 — Deck from Brief

**What it does:** Reads a brief (Word doc, PDF, markdown, or Google Doc), structures a 7–10 slide deck, and writes the slides + speaker notes.

**Connector needed:** File system access (or just attach the brief in the chat)

**Time saved (mine):** 3 hours → 30 minutes

**Prompt — copy-paste (replace `[path or filename]` and `[audience]`):**

> Read the brief at `[path or filename]`. Structure a 7–10 slide deck for `[audience — e.g., executive sponsors, engineering team, prospective customer]`.
>
> For each slide, give me:
>
> - **Slide title** — one line, hook-style (not "Agenda" or "Background")
> - **Body** — 3–5 bullets max, no walls of text
> - **Speaker notes** — 2 sentences I'd actually say out loud
>
> Use the existing brief language where possible. **Don't invent data** — flag any number you'd want me to verify. Output as markdown so I can paste into Google Slides or Keynote.

---

## Play 4 — Contract Review

**What it does:** Reads a contract PDF and surfaces the 4 clauses you should look at twice. Not legal advice — pre-screening to save you a lawyer call on the small stuff.

**Connector needed:** File system access (or attach the PDF)

**Time saved (mine):** 60 minutes → 8 minutes

**Prompt — copy-paste (replace `[file path]`):**

> Read the contract at `[file path]`. Surface the 4 clauses I should look at twice. Focus on:
>
> 1. **Auto-renewal traps** (silent rollover, notice-period requirements that favor them)
> 2. **Indemnity carve-outs** that I'd carry, not them
> 3. **IP assignment** that goes beyond the scope of this work
> 4. **Liability caps** that are absurdly low, missing, or one-sided
>
> For each clause:
>
> - **Quote** the relevant text
> - **Explain** in one sentence why it matters
> - **Suggest** the redline I'd ask for
>
> Don't pretend to be a lawyer. If anything is genuinely complex (regulated industry, multi-jurisdiction, large financial exposure), say "send this to a lawyer."

---

## Play 5 — Week Planning

**What it does:** Reconciles your calendar for the next 5 business days with your open task list, and gives you the 3 things that have to ship this week + what to say no to.

**Connector needed:** Google Calendar + your task tool (Things, Linear, Asana, etc.)

**Time saved (mine):** 30 minutes → 4 minutes

**Prompt — copy-paste (replace `[tool/path]` with your task list source):**

> Read my Google Calendar for the next 5 business days and my open tasks in `[tool/path]`. Reconcile them and give me:
>
> - **The 3 things that have to ship this week** — for each, the calendar slot when I'll actually do it
> - **What I should say no to or defer** — with a one-line reason for each
> - **Any meetings I should cancel or shorten** — because they don't tie to a deliverable
>
> Output as a single page I can scan in 30 seconds Monday morning. **Bias toward fewer commitments**, not more.

---

## How to extend / make these your own

- **Voice match.** All these prompts assume "in my voice." Cowork knows your voice if it's read your past notes, emails, or docs. If outputs feel generic, run a quick warm-up prompt: *"Read my last 5 sent emails. Notice my tone — direct, slightly informal, no exclamation marks. Use that voice in everything you draft for me today."*

- **Add domain context.** For contract reviews in regulated industries (healthcare, finserv, defense) — append your industry to the prompt and ask Claude to focus on industry-specific clauses (HIPAA in healthcare contracts, SOX disclosures in financial deals, etc.).

- **Save winning variations.** When a tweak works well, save it back as your own play. The whole point of the loop is that *your version* compounds — start with mine, end with yours.

---

## Disclosure

I'm not a lawyer, an AI safety expert, or a productivity guru. These are the prompts I actually use, with the time-saved numbers I actually measured. Your mileage will vary. Use them as a starting point, not a finished playbook.

If you ship a variation worth sharing, DM me on LinkedIn ([@JamshedQureshi](https://www.linkedin.com/in/jamshedqureshi/)) — happy to feature good ones in a future post.

Built on **NeuralFlow** ([neuralflow.run](https://neuralflow.run)) — free local app, MCP server included, no subscription needed for the prompts above. Disclosure: I built it. Solo project, still shipping.
