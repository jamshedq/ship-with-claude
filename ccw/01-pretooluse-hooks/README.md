# CCW#1 — PreToolUse hook for Claude Code guardrails

The hook from **Claude Code Wednesdays #1** — intercepts dangerous Bash commands before Claude executes them, asks you to confirm, and only proceeds on explicit approval.

→ Original LinkedIn post: [coming once published]

## What it catches

Out of the box:

- `rm -rf /` (and variants — including the typo-space gotcha that prompted this hook)
- `git push --force` / `git push -f`
- `git reset --hard origin/...`
- `chmod 777` (with or without `-R`)
- `dd if=...` (disk overwrite)
- Fork bombs (`:(){ :|:& };:`)
- `curl ... | sh` / `wget ... | sh` (unverified pipe-to-shell)
- `sudo rm -rf /` (escalation variants)

Each pattern is named, so when the hook blocks something, the message tells you *which* danger pattern matched.

## Install (5 minutes)

1. **Copy the guard script** to your Claude Code hooks directory:
   ```
   mkdir -p ~/.claude/hooks
   cp dangerous-cmd-guard.js ~/.claude/hooks/dangerous-cmd-guard.js
   chmod +x ~/.claude/hooks/dangerous-cmd-guard.js
   ```

2. **Merge `settings.json`** into your existing Claude Code settings at `~/.claude/settings.json`. If you don't have one, copy this whole file. If you do, merge the `hooks.PreToolUse` array.

3. **Restart Claude Code.** The hook is now live.

4. **Test it** — ask Claude to run `rm -rf /tmp/test_dir/`. It should be allowed (no `/` at the very end). Now ask it to run `rm -rf /` and confirm it gets blocked.

## How to extend

Add patterns to the `dangerPatterns` array in `dangerous-cmd-guard.js`. Each pattern has:

- `name`: human-readable name (shown in the block message)
- `pattern`: a regex matched against the proposed command

Match conservatively. Over-matching is annoying. Under-matching is dangerous. Test new patterns with realistic inputs before relying on them.

## The gotcha

- Hooks run in **your shell environment**. Env vars matter.
- Race conditions exist if Claude is streaming multiple Bash calls.
- Slow hooks make every Claude action sluggish. Keep them tight: regex match, exit fast.
- Don't put network calls inside hooks.

## Disclosure

This is a personal tool, not a security product. I'm not a security professional. Test the hook before relying on it. Add the patterns that match your specific risks.

If you find a pattern this hook misses or a false-positive that's annoying — open an issue or DM me on LinkedIn ([@JamshedQureshi](https://www.linkedin.com/in/jamshedqureshi/)).
