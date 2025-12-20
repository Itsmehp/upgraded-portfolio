# Portfolio Deployment Guide

This guide explains how to deploy your Next.js portfolio alongside n8n on a single server with HTTPS and automated GitHub deployments.

## Architecture Overview

```
Internet → Nginx Reverse Proxy (ports 80/443)
                    ↓
         ┌─────────────────────┐
         │                     │
    domain.com          n8n.domain.com
         ↓                     ↓
    Portfolio:3000        n8n:5678
         
         └── Webhook:9000 (GitHub auto-deploy)
```

## Prerequisites

- Ubuntu/Debian server with Docker and Docker Compose installed
- Domain pointed to your server IP (A records for `domain.com`, `www.domain.com`, `n8n.domain.com`)
- Ports 80, 443, 22 forwarded
- Existing n8n Docker container running

## Initial Server Setup

### 1. Create Docker Network

```bash
# Create a shared network for all containers
docker network create web
```

### 2. Connect Your Existing n8n Container

```bash
# Connect n8n to the web network
docker network connect web <your-n8n-container-name>

# Verify connection
docker network inspect web
```

### 3. Clone Repository on Server

```bash
# Create directory and clone
mkdir -p /opt/apps
cd /opt/apps
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
```

### 4. Create Environment File

```bash
# Create .env file with your webhook secret
cat > .env << EOF
WEBHOOK_SECRET=your-super-secret-webhook-key-here
EOF
```

### 5. Update Domain Names

Replace `domain.com` with your actual domain in these files:
- `nginx/conf.d/portfolio.conf`
- `nginx/conf.d/n8n.conf`
- `docker-compose.yml` (if needed)

```bash
# Quick replace (Linux/Mac)
sed -i 's/domain.com/yourdomain.com/g' nginx/conf.d/*.conf
```

### 6. Update n8n Container Name

Edit `nginx/conf.d/n8n.conf` and update the proxy_pass line:
```nginx
proxy_pass http://YOUR_N8N_CONTAINER_NAME:5678;
```

## SSL Certificate Setup

### Initial Setup (Before First Run)

Create temporary nginx config without SSL for certbot:

```bash
# Create temporary config directory
mkdir -p nginx/conf.d.temp

# Create HTTP-only config for initial certbot
cat > nginx/conf.d.temp/temp.conf << 'EOF'
server {
    listen 80;
    server_name domain.com www.domain.com n8n.domain.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 200 'Server is running';
    }
}
EOF
```

### Obtain SSL Certificates

```bash
# Start nginx with temporary config
docker compose run --rm -v ./nginx/conf.d.temp:/etc/nginx/conf.d:ro nginx-proxy

# In another terminal, run certbot
docker compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email your-email@example.com \
    --agree-tos \
    --no-eff-email \
    -d domain.com \
    -d www.domain.com \
    -d n8n.domain.com

# Stop temporary nginx
docker compose down
```

## Deploy

### First Deployment

```bash
# Make deploy script executable
chmod +x deploy.sh

# Build and start all services
docker compose up -d --build

# Check status
docker compose ps

# View logs
docker compose logs -f
```

### Verify Deployment

```bash
# Check if services are running
curl -I https://domain.com
curl -I https://n8n.domain.com

# Check SSL certificate
openssl s_client -connect domain.com:443 -servername domain.com
```

## GitHub Webhook Setup

### 1. Generate Webhook Secret

```bash
# Generate a secure random secret
openssl rand -hex 32
```

### 2. Configure GitHub Webhook

1. Go to your GitHub repository → Settings → Webhooks → Add webhook
2. Configure:
   - **Payload URL**: `https://domain.com/webhook`
   - **Content type**: `application/json`
   - **Secret**: Your generated secret (same as in .env)
   - **SSL verification**: Enable
   - **Events**: Just the push event
   - **Active**: Check this box

### 3. Update Server Environment

```bash
# Update .env with your secret
echo "WEBHOOK_SECRET=your-generated-secret" > .env

# Restart webhook container
docker compose restart webhook
```

### 4. Test Webhook

Push a commit to main branch and check logs:
```bash
docker compose logs -f webhook
```

## Maintenance

### View Logs

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f portfolio
docker compose logs -f nginx-proxy
docker compose logs -f webhook
```

### Manual Deployment

```bash
cd /opt/apps/portfolio
git pull origin main
docker compose build portfolio
docker compose up -d portfolio
```

### Restart Services

```bash
docker compose restart
# or specific service
docker compose restart portfolio
```

### SSL Certificate Renewal

Certificates auto-renew via certbot container. To manually renew:

```bash
docker compose run --rm certbot renew
docker compose restart nginx-proxy
```

### Update All Containers

```bash
docker compose pull
docker compose up -d --build
```

## Troubleshooting

### Port Already in Use

If n8n is currently using ports 80/443:

```bash
# Stop n8n temporarily
docker stop <n8n-container>

# Update n8n to not expose ports directly (use internal network)
# Then start all services
docker compose up -d

# n8n will be accessible via nginx reverse proxy
```

### Check Container Networks

```bash
docker network inspect web
```

### Permission Issues

```bash
# Fix deploy script permissions
chmod +x deploy.sh

# Fix volume permissions
sudo chown -R 1001:1001 /opt/apps/portfolio
```

### Webhook Not Triggering

1. Check webhook logs: `docker compose logs webhook`
2. Verify secret matches in GitHub and .env
3. Test webhook URL: `curl -X POST https://domain.com/webhook`
4. Check GitHub webhook delivery history

## File Structure

```
portfolio/
├── Dockerfile              # Next.js container build
├── docker-compose.yml      # All services definition
├── deploy.sh              # Auto-deployment script
├── .env                   # Environment variables (not in git)
├── nginx/
│   ├── nginx.conf         # Main nginx config
│   └── conf.d/
│       ├── portfolio.conf # domain.com routing
│       └── n8n.conf       # n8n.domain.com routing
└── webhook/
    └── hooks.json         # GitHub webhook config
```

## Security Checklist

- [ ] Strong webhook secret (32+ characters)
- [ ] SSL certificates valid
- [ ] Firewall configured (only 80, 443, 22 open)
- [ ] .env file not in git repository
- [ ] Regular security updates
- [ ] Docker socket access restricted

---

## Quick Commands Reference

```bash
# Start everything
docker compose up -d

# Stop everything
docker compose down

# Rebuild and restart portfolio
docker compose up -d --build portfolio

# View real-time logs
docker compose logs -f

# Check status
docker compose ps

# Manual deploy
./deploy.sh
```
