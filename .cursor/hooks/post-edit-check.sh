#!/bin/bash
# Post-edit hook: checks for common issues after file edits
input=$(cat)
file_path=$(echo "$input" | python3 -c "import sys,json; print(json.load(sys.stdin).get('path',''))" 2>/dev/null)

issues=""

if [[ -n "$file_path" && -f "$file_path" ]]; then
  # Check for hardcoded old phone numbers
  if grep -q "1800 808 149\|0432 040 404\|1800808149\|0432040404" "$file_path" 2>/dev/null; then
    issues="$issues\n- OLD PHONE NUMBER detected in $file_path (must use SITE_CONFIG.phone)"
  fi

  # Check for hardcoded contact form references
  if grep -qi "contact.*form\|ContactForm\|contact-form" "$file_path" 2>/dev/null; then
    if ! grep -q "NO.*form\|no.*form\|// NOTE" "$file_path" 2>/dev/null; then
      issues="$issues\n- CONTACT FORM reference detected — client explicitly removed contact forms"
    fi
  fi

  # Check for console.log in production code
  if [[ "$file_path" == *.tsx || "$file_path" == *.ts ]] && [[ "$file_path" != *test* && "$file_path" != *spec* ]]; then
    if grep -q "console\.log" "$file_path" 2>/dev/null; then
      issues="$issues\n- console.log found in $file_path — remove before production"
    fi
  fi
fi

if [[ -n "$issues" ]]; then
  echo "{\"additional_context\": \"Post-edit hook warnings:$issues\"}"
else
  echo "{}"
fi
exit 0
