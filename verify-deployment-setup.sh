#!/bin/bash

# 🔍 GitHub Deployment Setup Verification Script
# This script checks if everything is configured correctly for automatic deployments

set -e

RESET='\033[0m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${BLUE}║  GitHub Deployment Setup Verification${RESET}                  ${BLUE}║${RESET}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${RESET}"
echo

PASSED=0
FAILED=0

check_item() {
  local name=$1
  local command=$2
  
  if eval "$command" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${RESET} $name"
    ((PASSED++))
  else
    echo -e "${RED}✗${RESET} $name"
    ((FAILED++))
  fi
}

info() {
  echo -e "${BLUE}ℹ${RESET} $1"
}

warn() {
  echo -e "${YELLOW}⚠${RESET} $1"
}

# Check Docker
echo -e "${BLUE}Docker Setup:${RESET}"
check_item "Docker daemon running" "docker ps > /dev/null"
check_item "Docker compose installed" "docker compose version > /dev/null"
check_item "Web network exists" "docker network inspect web > /dev/null 2>&1"
echo

# Check containers
echo -e "${BLUE}Container Status:${RESET}"
check_item "Webhook container running" "docker ps | grep -q webhook"
check_item "Portfolio container running" "docker ps | grep -q portfolio"
check_item "Nginx container running" "docker ps | grep -q nginx-proxy"
echo

# Check files
echo -e "${BLUE}Server-side Files:${RESET}"
check_item "docker-compose.yml exists" "test -f /opt/portfolio/docker-compose.yml"
check_item "deploy.sh exists" "test -f /opt/portfolio/deploy.sh"
check_item "deploy.sh is executable" "test -x /opt/portfolio/deploy.sh"
check_item "webhook hooks.json exists" "test -f /opt/portfolio/webhook/hooks.json"
check_item "webhook hooks.json is valid JSON" "python3 -m json.tool /opt/portfolio/webhook/hooks.json > /dev/null"
echo

# Check webhook service
echo -e "${BLUE}Webhook Service:${RESET}"
check_item "Webhook service is accessible" "curl -s -I http://localhost:9000/hooks/deploy > /dev/null"

# Check if WEBHOOK_SECRET is set in docker-compose
if grep -q "WEBHOOK_SECRET" /opt/portfolio/docker-compose.yml; then
  echo -e "${GREEN}✓${RESET} WEBHOOK_SECRET configured in docker-compose.yml"
  ((PASSED++))
else
  warn "WEBHOOK_SECRET not configured in docker-compose.yml"
  echo "   → Add this to webhook service environment:"
  echo "     - WEBHOOK_SECRET=${WEBHOOK_SECRET:-it00CZRUS93rhsFRfd/p1f8Fy18LKrNN9ryDeQZN+Fc=}"
  ((FAILED++))
fi
echo

# Check SSL
echo -e "${BLUE}SSL/HTTPS Setup:${RESET}"
check_item "Let's Encrypt certificates exist" "test -f /etc/letsencrypt/live/harshil07.in/fullchain.pem"
check_item "HTTPS working for harshil07.in" "curl -s -I https://harshil07.in 2>/dev/null | grep -q 'HTTP'"
echo

# Check logs
echo -e "${BLUE}Logging:${RESET}"
check_item "Log directory exists" "test -d /var/log && test -w /var/log"
if [ -f /var/log/portfolio-deploy.log ]; then
  echo -e "${GREEN}✓${RESET} Deploy log exists"
  ((PASSED++))
else
  info "Deploy log will be created on first deployment"
fi
echo

# Check git
echo -e "${BLUE}Git Configuration:${RESET}"
check_item "Git is installed" "git --version > /dev/null"
check_item "Portfolio directory is a git repo" "test -d /opt/portfolio/.git"
if [ -d /opt/portfolio/.git ]; then
  CURRENT_BRANCH=$(cd /opt/portfolio && git rev-parse --abbrev-ref HEAD 2>/dev/null)
  if [ "$CURRENT_BRANCH" = "main" ]; then
    echo -e "${GREEN}✓${RESET} Currently on 'main' branch"
    ((PASSED++))
  else
    warn "Currently on '$CURRENT_BRANCH' branch, not 'main'"
    ((FAILED++))
  fi
fi
echo

# Summary
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo -e "${GREEN}Passed: $PASSED${RESET}  ${RED}Failed: $FAILED${RESET}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${RESET}"
echo

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed! Your server is ready for GitHub deployments.${RESET}"
  echo
  echo "Next steps:"
  echo "1. Create GitHub repository secrets (WEBHOOK_SECRET, WEBHOOK_URL)"
  echo "2. Create .github/workflows/deploy.yml in your portfolio repository"
  echo "3. Push to main branch to trigger deployment"
  echo
  echo "After pushing to main:"
  echo "  - Watch GitHub Actions: https://github.com/YOUR_USERNAME/portfolio/actions"
  echo "  - Monitor server: tail -f /var/log/portfolio-deploy.log"
  echo
else
  echo -e "${RED}✗ Some checks failed. See above for details.${RESET}"
  echo
  echo "Common issues:"
  echo "1. Webhook container not running → docker compose up -d webhook"
  echo "2. Deploy script not executable → chmod +x /opt/portfolio/deploy.sh"
  echo "3. WEBHOOK_SECRET not set → Add to docker-compose.yml and restart"
  echo
  exit 1
fi
