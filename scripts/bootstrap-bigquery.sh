#!/usr/bin/env bash
# Idempotent BigQuery bootstrap for the Zap It MVP.
# Creates 12 datasets + reserved table shells in the GCP project.
# Safe to rerun — all SQL uses CREATE IF NOT EXISTS / CREATE OR REPLACE.
#
# Prerequisites:
#   - gcloud CLI installed (brew install --cask google-cloud-sdk)
#   - Authenticated: gcloud auth login (as sharjeel@meetapex.ai)
#   - bq command available (ships with gcloud)
#
# Usage:
#   ./scripts/bootstrap-bigquery.sh
#
# Adam-dependent steps NOT covered by this script:
#   - GA4 → BigQuery export linking (manual, after GA4 property exists)
#   - sql/002_staging_views.sql (run AFTER first daily GA4 export lands)

set -euo pipefail

readonly PROJECT_ID="zapit-business-intelligence"
readonly REGION="australia-southeast1"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
readonly SQL_DIR="${REPO_ROOT}/sql"

bold() { printf "\033[1m%s\033[0m\n" "$*"; }
green() { printf "\033[32m✓ %s\033[0m\n" "$*"; }
red() { printf "\033[31m✗ %s\033[0m\n" "$*" >&2; }
info() { printf "  %s\n" "$*"; }

bold "Zap It MVP — BigQuery Bootstrap"
echo

# --- Step 1: Verify gcloud is installed ---
bold "Step 1/5 — Verifying gcloud installation"
if ! command -v gcloud >/dev/null 2>&1; then
  red "gcloud CLI not installed."
  info "Install with: brew install --cask google-cloud-sdk"
  exit 1
fi
green "gcloud installed: $(gcloud --version | head -1)"
echo

# --- Step 2: Verify authentication ---
bold "Step 2/5 — Verifying authentication"
active_account="$(gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>/dev/null || true)"
if [[ -z "${active_account}" ]]; then
  red "No active gcloud account."
  info "Run: gcloud auth login"
  exit 1
fi
green "Authenticated as: ${active_account}"
echo

# --- Step 3: Set active project ---
bold "Step 3/5 — Setting active project to ${PROJECT_ID}"
gcloud config set project "${PROJECT_ID}" --quiet
current_project="$(gcloud config get-value project 2>/dev/null)"
if [[ "${current_project}" != "${PROJECT_ID}" ]]; then
  red "Failed to set project. Current: ${current_project}"
  exit 1
fi
green "Project set: ${current_project}"
echo

# --- Step 4: Smoke test BigQuery access ---
bold "Step 4/5 — Smoke testing BigQuery access"
smoke_result="$(bq --location="${REGION}" query --use_legacy_sql=false --format=json --quiet 'SELECT 1 AS test' 2>&1 || true)"
if ! echo "${smoke_result}" | grep -q '"test":"1"'; then
  red "BigQuery smoke test failed."
  echo "${smoke_result}" >&2
  exit 1
fi
green "BigQuery responsive — SELECT 1 returned successfully in ${REGION}"
echo

# --- Step 5: Run SQL files ---
# IMPORTANT: --location=australia-southeast1 must match the dataset region.
# Without it, bq defaults to US and fails with "Location specified in query
# australia-southeast1 is not consistent with current execution region US".
bold "Step 5/5 — Running SQL bootstrap files (region: ${REGION})"
for sql_file in "001_create_datasets.sql" "003_reserved_schemas.sql"; do
  full_path="${SQL_DIR}/${sql_file}"
  if [[ ! -f "${full_path}" ]]; then
    red "Missing: ${full_path}"
    exit 1
  fi
  info "Running ${sql_file}…"
  bq --location="${REGION}" query --use_legacy_sql=false --quiet < "${full_path}"
  green "Completed: ${sql_file}"
done
echo

# --- Verification ---
bold "Verification — listing datasets created"
bq --location="${REGION}" ls --project_id="${PROJECT_ID}" --format=prettyjson 2>/dev/null | grep -E '"datasetId"|"location"' | head -40
echo

bold "Bootstrap complete."
info "Next manual steps (not in this script):"
info "  1. Create fresh GA4 account/property under sharjeel@meetapex.ai, invite Adam as Admin"
info "  2. Link GA4 → BigQuery export (Admin → Product Links → BigQuery)"
info "  3. After first daily GA4 export lands (~24h), run sql/002_staging_views.sql"
info "  4. Configure GTM container per docs/gtm-blueprint.md"
