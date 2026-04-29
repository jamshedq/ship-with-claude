# The LinkedIn Loop

A weekly drafting system that produces 7 LinkedIn posts every Sunday — caption text, carousel content, hashtags, and a print-to-PDF carousel page — without you sitting down to write.

**The whole package is here. Free. Fork it, change the positioning to match yours, ship daily.**

> **Runs on NeuralFlow → [https://neuralflow.run](https://neuralflow.run)**
> *Free download. Markdown-native second brain with native MCP, so Claude can read & write your notes directly. (Disclosure: I built NeuralFlow — solo project, still shipping.)*

If you found this from a LinkedIn post — welcome. The post that pointed you here:
[link to original post will go here]

---

## What this is, in one paragraph

Most operators don't post on LinkedIn consistently because Sunday night is a blank page. This package is the system I built to fix that for myself — an automated weekly sweep that drafts 7 posts (one per day) at 4 PM Sunday using my own playbook, voice, and last week's performance data. I tweak, print to PDF, and schedule. The work shifts from writing to reviewing.

It's not "AI writes my posts." It's "AI removes the blank page so my voice, my receipts, and my take are the only things left to provide."

---

## What you get

| File | What it does |
|------|--------------|
| **README.md** | This file |
| **how-this-works.md** | The contract — every Sunday's run reads this first |
| **playbook.md** | Positioning, content pillars, weekly cadence, substance bar, voice rules |
| **voice-samples.md** | Where you drop your real posts — the loop matches your voice from these |
| **performance-log.md** | What each post did. Drives "what to write more of" on future runs |
| **inbox.md** | Where you drop one-line briefs all week |
| **raw-inbox.md** | Free-form capture for half-thoughts that haven't earned a brief slot yet |
| **wednesday-topic-bank.md** | A franchise slot — example uses Claude Code; replace with your own theme |
| **engagement-playbook.md** | The non-content side: comment ritual, DM playbook, algorithm habits |
| **publish-checklist.md** | 60-second pre-flight before hitting Post |
| **scheduled-task-prompt.md** | The prompt that runs every Sunday at 4 PM in Cowork |
| **templates/carousel-template-example.html** | Print-to-PDF carousel template (notebook + navy + orange) |
| **dashboard.html** | A live dashboard you can run as a Cowork artifact |
| **dashboard-architecture.md** | Walkthrough of every element in the dashboard and why it's built that way |

---

## What you'll need

- **NeuralFlow** — markdown-native second brain that holds the playbook, inbox, drafts. **The free local app includes the MCP server** (what lets Claude read and write to your notes) — and that's all the loop needs. AI features and Cloud Sync are paid tiers if you want them, but the loop runs fine without either.
  → https://neuralflow.run *(disclosure: I built NeuralFlow. Solo project, still shipping.)*
- **Claude Cowork** — desktop app for non-developer Claude workflows. Where the scheduled Sunday task runs.
- A LinkedIn account
- ~25 minutes a week to review drafts

---

## Setup — 15 minutes

1. **Install NeuralFlow + Cowork.** Sign in with the same account in both.
   - NeuralFlow: **[https://neuralflow.run](https://neuralflow.run)** (free download)
   - Cowork: install through the Claude desktop app
2. **Create a folder in your NeuralFlow vault** called `LinkedIn_Strategy` (or whatever name you want).
3. **Drop these files into that folder** (everything from this repo except the README and `templates/`).
4. **Edit `playbook.md`** — replace my positioning, audience, pillars, and tagline with yours. The structure stays; the words become yours.
5. **Edit `voice-samples.md`** — paste 2–3 of your real posts. This is the single highest-leverage edit. Without it, drafts will sound like generic AI.
6. **Edit `wednesday-topic-bank.md`** — replace the Claude Code topics with whatever your weekly franchise will be (e.g., "Marketing Mondays," "Growth Tuesdays," etc.).
7. **Open Cowork** and ask it to read `how-this-works.md`, `playbook.md`, and `inbox.md`. Then paste `scheduled-task-prompt.md` into Cowork's "Create scheduled task" flow with cron `0 16 * * 0` (Sunday 4 PM, local time).
8. **Customize the carousel template** in `templates/carousel-template-example.html` — replace the embedded headshot, swap the brand colors if needed, change the tagline in the footer.
9. **Optional: install the dashboard.html as a Cowork live artifact** for at-a-glance status of your loop.

That's it. Drop one-line briefs into `inbox.md` during the week. Sunday at 4 PM, the loop runs. Sunday night, you tweak and schedule.

---

## How to customize for your brand

- **Tagline** — the example uses *"Hands-on with AI. Less hype, more shipping."* Replace it in `playbook.md`, the carousel template footer, and the small page footers.
- **Headshot** — the carousel template embeds a B&W headshot as base64. Run a quick Pillow script to convert your photo to soft B&W on white, then replace the `data:image/jpeg;base64,...` in the template.
- **Color palette** — the example uses navy `#0A2540` + warm orange `#F26B3A` + cream paper `#F5F0E4`. Find/replace in the template if you want different brand colors.
- **Pillars** — the example has 5 (Build Log, Tool Teardown, News Reaction, Founder/ROI, Educational). Edit `playbook.md` to your pillar mix.
- **Wednesday slot** — example is Claude Code. Yours could be anything that compounds: "Customer Friday," "Hiring Tuesday," "Pricing Thursday."

---

## When you ship

If you build a version of this and post about it, I'd love to see it.
DM @JamshedQureshi on LinkedIn — happy to amplify other practitioners doing this well.

If you hit a snag wiring it up, ping me too. I built it solo, so the docs are practitioner-grade rather than enterprise-grade — feedback is welcome.

---

## License

MIT. Use it, fork it, sell what you build with it. Just don't claim you wrote the original — give a one-line credit somewhere.

---

*Built by [@JamshedQureshi](https://linkedin.com/in/jamshedqureshi) — Hands-on with AI. Less hype, more shipping.*
