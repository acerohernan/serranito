#!/bin/sh
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

if [ -f .env ]; then
  set -o allexport
  . .env
  set +o allexport
fi

if [ -z "$DOCKERHUB_USERNAME" ]; then
  echo "ERROR: DOCKERHUB_USERNAME is not defined in .env or environment."
  exit 1
fi

echo "Pulling the latest Docker images..."
docker compose -f docker-compose.prod.yml pull

echo "Updating running services..."
docker compose -f docker-compose.prod.yml up -d --remove-orphans

echo "Restarting services with latest images..."
docker compose -f docker-compose.prod.yml ps
