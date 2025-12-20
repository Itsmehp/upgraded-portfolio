#!/bin/bash
# Deployment script for automatic GitHub-triggered deployments

set -e

REPO_DIR="/opt/portfolio"
COMPOSE_FILE="docker-compose.yml"
LOG_FILE="$REPO_DIR/deploy.log"
COMMIT_ID=${1:-"unknown"}
COMMIT_MSG=${2:-"Manual deploy"}

# Create log directory
mkdir -p "$REPO_DIR"
exec 1> >(tee -a "$LOG_FILE")
exec 2>&1

echo "=========================================="
echo "🚀 DEPLOYMENT STARTED"
echo "=========================================="
echo "Time: $(date)"
echo "Commit ID: $COMMIT_ID"
echo "Commit Message: $COMMIT_MSG"
echo ""

# Navigate to repository directory
cd "$REPO_DIR" || exit 1

# Step 1: Pull latest changes from GitHub
echo "Step 1: Pulling latest changes from GitHub..."
git fetch origin master
git reset --hard origin/master
echo "✓ Code pulled successfully"
echo ""

# Step 2: Build Docker image
echo "Step 2: Building Docker image..."
docker compose build portfolio --no-cache
echo "✓ Docker image built successfully"
echo ""

# Step 3: Stop and remove old container
echo "Step 3: Stopping old container..."
docker compose down portfolio 2>/dev/null || true
echo "✓ Old container stopped"
echo ""

# Step 4: Start new container
echo "Step 4: Starting new container..."
docker compose up -d portfolio
echo "✓ New container started"
echo ""

# Step 5: Wait for container to be ready
echo "Step 5: Waiting for portfolio to be ready..."
sleep 5
RETRY_COUNT=0
MAX_RETRIES=30

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if timeout 3 curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✓ Portfolio is responding ($(($RETRY_COUNT + 1)) attempts)"
        break
    fi
    echo "  Waiting for portfolio to respond... (attempt $((RETRY_COUNT + 1))/$MAX_RETRIES)"
    sleep 2
    RETRY_COUNT=$((RETRY_COUNT + 1))
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo "✗ ERROR: Portfolio failed to respond after $MAX_RETRIES attempts"
    exit 1
fi
echo ""

# Step 6: Verify HTTPS is working
echo "Step 6: Verifying HTTPS access..."
if timeout 5 curl -I https://harshil07.in -s | grep -q "200\|301"; then
    echo "✓ HTTPS is accessible"
else
    echo "⚠ Warning: HTTPS check returned unexpected status"
fi
echo ""

# Step 7: Clean up old images
echo "Step 7: Cleaning up old Docker images..."
docker image prune -f --filter "dangling=true" > /dev/null 2>&1 || true
echo "✓ Cleanup completed"
echo ""

# Step 8: Check container health
echo "Step 8: Final health check..."
if docker compose ps portfolio | grep -q "Up"; then
    echo "✓ Container is running and healthy"
else
    echo "✗ ERROR: Container is not running"
    exit 1
fi
echo ""

echo "=========================================="
echo "✅ DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "=========================================="
echo "Time: $(date)"
echo "Commit: $COMMIT_ID"
echo ""

# Return success
exit 0
