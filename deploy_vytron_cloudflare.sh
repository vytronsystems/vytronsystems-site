#!/usr/bin/env bash
set -euo pipefail

##
## Vytron Systems — Cloudflare deployment helper (Linux only)
##
## Usage (from any directory on this machine):
##   bash /home/dev/projects/VytronSystemsSite/vytronsystems-site/deploy_vytron_cloudflare.sh
##

REPO_DIR="/home/dev/projects/VytronSystemsSite/vytronsystems-site"

echo "==> Vytron Systems | Cloudflare deploy (Linux helper)"
echo "Repo: ${REPO_DIR}"

cd "${REPO_DIR}"

echo "==> Current git status:"
git status -sb || echo "Warning: git not available or status failed."

echo "==> Installing production dependencies (npm ci --omit=dev)..."
npm ci --omit=dev

echo "==> Building Next.js app (npm run build)..."
npm run build

echo "==> Building OpenNext/Cloudflare bundle (npx opennextjs-cloudflare build)..."
npx opennextjs-cloudflare build

echo "==> Deploying to Cloudflare via npm run deploy..."
echo "    (Requires Cloudflare credentials/config already set in this environment.)"
npm run deploy

echo "==> Deployment script completed."

