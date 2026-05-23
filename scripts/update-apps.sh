#!/bin/sh
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

if [ -f .env ]; then
  set -o allexport
  . .env
  set +o allexport
fi

echo "Pulling the latest Docker images..."
docker compose pull

echo "Updating running services..."
docker compose up -d --remove-orphans

echo "Restarting services with latest images..."
docker compose ps
