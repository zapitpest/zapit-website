#!/bin/bash
# Safety guard: blocks destructive commands
input=$(cat)
command=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null)

if echo "$command" | grep -qE "rm\s+-rf\s+/|drop\s+table|git\s+push.*--force|git\s+reset.*--hard"; then
  echo '{
    "permission": "deny",
    "user_message": "BLOCKED: This command was blocked by the safety guard hook. Destructive operations (rm -rf /, DROP TABLE, force push, hard reset) require manual execution.",
    "agent_message": "The safety hook blocked this destructive command. Ask the user to run it manually if truly needed."
  }'
  exit 0
fi

echo '{ "permission": "allow" }'
exit 0
