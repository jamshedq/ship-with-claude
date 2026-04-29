#!/usr/bin/env node

// CCW#1 — PreToolUse hook for Claude Code
// Intercepts dangerous Bash commands and asks for user confirmation before they run.
//
// Install: copy to ~/.claude/hooks/dangerous-cmd-guard.js
// Then add the contents of settings.json to your ~/.claude/settings.json
//
// Disclosure: this is a personal tool, not a security product.
// Test it before relying on it. Add patterns that match your specific risks.

const cmd = process.env.CLAUDE_TOOL_INPUT_command || "";

const dangerPatterns = [
  // Filesystem nukes
  { name: "rm -rf at root", pattern: /\brm\s+-rf\s+\/\s*$/ },
  { name: "rm -rf into /", pattern: /\brm\s+-rf\s+\/[^a-zA-Z0-9_.-]/ },
  { name: "rm -rf with dangerous trailing space", pattern: /\brm\s+-rf\s+\S+\s+\/(?:\s|$)/ },

  // Git history rewrites
  { name: "git push --force", pattern: /\bgit\s+push\s+(--force|-f)\b/ },
  { name: "git reset --hard origin", pattern: /\bgit\s+reset\s+--hard\s+origin/ },

  // Permission disasters
  { name: "chmod 777 (recursive or not)", pattern: /\bchmod\s+(-R\s+)?777\b/ },

  // Disk overwrite
  { name: "dd if=...", pattern: /\bdd\s+if=/ },

  // Fork bomb
  { name: "fork bomb", pattern: /:\(\)\s*\{\s*:\|:&\s*\}\s*;\s*:/ },

  // Unverified pipe-to-shell
  { name: "curl|sh", pattern: /\bcurl\s+[^|]*\|\s*(sh|bash)/ },
  { name: "wget|sh", pattern: /\bwget\s+[^|]*\|\s*(sh|bash)/ },

  // sudo on dangerous patterns above (catches escalation)
  { name: "sudo rm -rf /", pattern: /\bsudo\s+rm\s+-rf\s+\// },
];

for (const { name, pattern } of dangerPatterns) {
  if (pattern.test(cmd)) {
    console.log(JSON.stringify({
      decision: "block",
      message: `Blocked dangerous command (matched pattern: "${name}").\n\nProposed: ${cmd}\n\nIf this is intentional, approve manually.`,
    }));
    process.exit(0);
  }
}

// No match — allow the command through.
console.log(JSON.stringify({ decision: "allow" }));
