#!/bin/bash
# Deployment script triggered by GitHub webhook
# This script runs inside the webhook container

set -e

REPO_DIR="/app/portfolio"
COMPOSE_FILE="docker-compose.yml"

echo "=========================================="
echo "Starting deployment at $(date)"
echo "=========================================="

# Navigate to repository directory
cd "$REPO_DIR" || exit 1

# Pull latest changes from GitHub
echo "Pulling latest changes from GitHub..."
git fetch origin main
git reset --hard origin/main

# Rebuild and restart the portfolio container
echo "Rebuilding portfolio container..."
docker compose build portfolio

echo "Restarting portfolio container..."
docker compose up -d portfolio

# Clean up old images
echo "Cleaning up old Docker images..."
docker image prune -f

echo "=========================================="
echo "Deployment completed at $(date)"
echo "=========================================="
