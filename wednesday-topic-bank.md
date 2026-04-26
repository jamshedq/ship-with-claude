---
type: topic-bank
created: 2026-04-25
updated: 2026-04-25
tags: [linkedin, wednesday, claude-code, franchise]
---

# Claude Code Wednesdays — Topic Bank

The recurring Wednesday slot. Every entry below is a single, specific Claude Code practice, command, or pattern — never a "what is" explainer, never a tool listicle.

**Rules for what belongs here:**

- Must be one specific feature, command, hook, slash command, sub-agent pattern, settings file, or workflow
- Must have a copy-pastable artifact attached (command syntax, config snippet, prompt)
- Must have a "the gotcha" — the failure mode, the limit, the thing not in the docs
- Must be defensible by someone who has actually used it, not summarized from documentation

**How Claude uses this:**

- If `inbox.md` has no Wednesday brief for the upcoming week, Claude pulls the next `[ ]` topic from this file
- After drafting, Claude flips the topic to `[x]` with the draft link
- If the bank drops below 4 unfilled topics, Claude flags it in the weekly Sunday summary so you can refill

**Numbering & abbreviation:** Internal IDs use `CCW#N` (Claude Code Wednesdays). Post titles spell it out — `Claude Code Wednesdays #N — [topic]` — and may include the short form in parentheses early on, e.g. *"Claude Code Wednesdays #3 (CCW#3) — Hooks for guardrails."* Once the franchise is recognized (~3 months in), drop the parenthetical and use `CCW#N` more freely.

---

## Pending topics

### [x] CCW#1 — Hooks: PreToolUse for guardrails before destructive commands — drafted 2026-04-25
→ [[drafts/2026-04-29-claude-code-wednesdays-1-pretooluse-hooks]]
- Artifact: real `settings.json` hook config that blocks `rm -rf` / `git push --force` and asks for confirmation
- The gotcha: hooks fire in your shell environment — env vars matter; race conditions if you're streaming

### [ ] CCW#2 — PostToolUse hook to auto-run tests after every file edit
- Artifact: hook config + the one-line bash that runs only the affected test file
- The gotcha: noise. Mute the hook for non-source paths or you'll drown

### [ ] CCW#3 — SessionStart hook to load project context automatically
- Artifact: hook that injects the latest commit log + open PR list into the session
- The gotcha: you can't return huge payloads — session-start is a context tax

### [ ] CCW#4 — Custom slash commands as muscle memory
- Artifact: `.claude/commands/deploy.md` — turn a 7-step deploy into `/deploy`
- The gotcha: slash commands are just markdown prompts. They don't have logic. Don't try to make them clever.

### [ ] CCW#5 — Sub-agents for parallel review (security / perf / readability)
- Artifact: the `Agent({ subagent_type: "code-reviewer" })` invocation × 3 in one message
- The gotcha: sub-agents don't share state. Don't use them for tasks where reviewers need to know each other's findings.

### [ ] CCW#6 — CLAUDE.md as project memory: what to put in, what to leave out
- Artifact: a real CLAUDE.md from a shipped repo — annotated
- The gotcha: it's loaded on every session. Bloat = cost. Keep < 200 lines.

### [ ] CCW#7 — Plan mode: when to use it, when to skip it
- Artifact: side-by-side of the same task — plan-mode vs straight execution
- The gotcha: plan mode adds latency for trivial tasks. Use it for changes touching 3+ files.

### [ ] CCW#8 — TodoWrite as a forcing function for long sessions
- Artifact: example session where TodoWrite kept Claude from drift
- The gotcha: don't over-decompose. 3–7 items is the sweet spot; more becomes cargo-cult.

### [ ] CCW#9 — Permission system: settings.json patterns for safe autonomy
- Artifact: a tiered `permissions` config — read-anywhere, write-only-in-repo, never-network
- The gotcha: blanket allow lists are how repos leak. Default deny, allow per pattern.

### [ ] CCW#10 — Output styles: when a custom one is worth it
- Artifact: a "concise commit message" output style + a "verbose teaching" output style
- The gotcha: most people don't need a custom output style. Reach for it only when your team has a shared format expectation.

### [ ] CCW#11 — Statusline customization to keep model + cost visible
- Artifact: statusline config showing model, token count, dollar burn
- The gotcha: don't put network calls in your statusline — it runs constantly

### [ ] CCW#12 — Git worktree isolation for risky agent work
- Artifact: the `Agent({ isolation: "worktree" })` pattern + how to inspect the diff before merge
- The gotcha: cleanup. Worktrees pile up. Set a retention policy.

### [ ] CCW#13 — MCP server picking: when to write your own vs use a community one
- Artifact: decision tree + the 4 questions to ask before writing one
- The gotcha: a custom MCP is a maintenance commitment. Don't write one for a one-off task.

### [ ] CCW#14 — Sub-agent vs slash command vs hook: the decision matrix
- Artifact: a 2x2 matrix with 8 real workflows placed in the right cell
- The gotcha: most people reach for sub-agents when they want a slash command. Pick the lightest tool.

### [ ] CCW#15 — The Bash tool: patterns that prevent the "that wasn't supposed to run" moment
- Artifact: the dry-run wrapper, the confirmation prompt, the read-only mode
- The gotcha: long-running commands kill the session. Background or split.

### [ ] CCW#16 — Memory files vs CLAUDE.md vs context window: when to use each
- Artifact: a real project — what lives where and why
- The gotcha: memory bleeds. If sensitive info goes in a memory file, it's there for every session that loads it.

### [ ] CCW#17 — Context compaction: what to compact, what to preserve
- Artifact: a session where compaction was triggered — what survived, what was lost
- The gotcha: the system can't preserve what you didn't mark important. Use TodoWrite as your anchor.

### [ ] CCW#18 — Streaming output: when it's a feature, when it's a trap
- Artifact: a comparison — streaming on for "show me your work," streaming off for "give me JSON"
- The gotcha: streaming + tool calls = subtle ordering bugs in your client

### [ ] CCW#19 — The Agent SDK in 30 lines: your first custom agent
- Artifact: a working 30-line agent that processes a directory of receipts
- The gotcha: error handling. The SDK gives you primitives, not retries. Wrap accordingly.

### [ ] CCW#20 — Settings hierarchy: project / user / system — and why this trips teams up
- Artifact: a real precedence example — same key, three levels, what wins
- The gotcha: a settings change in one repo doesn't follow you to another. Document the project-level config in CLAUDE.md.

### [ ] CCW#21 — File-edit ergonomics: when to use Write vs Edit vs MultiEdit
- Artifact: the same task done three ways with the diff size for each
- The gotcha: Write replaces. One typo and you've lost the file. Edit when uncertain.

### [ ] CCW#22 — Plugins: when a plugin beats a custom MCP
- Artifact: an installed plugin doing in 2 minutes what a custom MCP took a week to build
- The gotcha: plugins are versioned by their author. Pin or expect drift.

### [ ] CCW#23 — Model picking inside a session (Haiku for triage, Sonnet for structure, Opus for hard)
- Artifact: a session that switches models per task with the cost line at the end
- The gotcha: model switching mid-session resets some context. Plan the boundary.

### [ ] CCW#24 — Background tasks: when to fire-and-forget, when to wait
- Artifact: a real workflow with a long-running task moved to background
- The gotcha: background failures are silent unless you wire a notification hook

### [ ] CCW#25 — Custom skills: when to write one vs reach for a slash command
- Artifact: a 30-line `.claude/skills/foo/SKILL.md` that turns a recurring workflow into a one-call
- The gotcha: skills load on trigger, not every session — but they live in your repo, so PR review matters. A bad skill description = wrong skill firing on the wrong prompt.

### [ ] CCW#26 — `/clear` vs `/compact` vs `--continue`: managing session boundaries
- Artifact: a real session log showing when each was the right call
- The gotcha: `--continue` resumes the same context; `/compact` summarizes lossily; `/clear` is destructive. Don't `/clear` mid-task — and don't trust `/compact` to preserve TodoWrite state without re-anchoring.

### [ ] CCW#27 — Building a LinkedIn MCP for creators (because the official API won't give you your own data) — *target Wed Oct 28, 2026*
- Artifact: a 4-tool MCP server — `linkedin_list_posts`, `linkedin_post_metrics`, `linkedin_profile_stats`, `linkedin_set_session` — wired to LinkedIn's Voyager API with cookie-based auth
- The gotcha: rate limits are tighter than the UI implies. Keep request volume under 5/min, randomize timing, expect to refresh cookies every ~12 months. ToS gray area — personal use only, never multi-tenant. LinkedIn fingerprints headless requests; spoof headers carefully.
- Build window: Apr 25 → Oct 28 (~6 months). Plenty of time to ship V1, run it against the loop for 60+ days, then write the post with real production numbers.

---

## Drafted

(Claude moves topics here as they get used:)

```
### [x] CCW#N — Title — drafted YYYY-MM-DD
→ drafts/YYYY-MM-DD-slug.md
```

---

## Refill log

When the bank dips below 4 unfilled topics, add new ones here and promote them up to **Pending**.
