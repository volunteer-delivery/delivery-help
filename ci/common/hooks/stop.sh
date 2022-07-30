#!/usr/bin/env sh

root="$HOME/delivery-help"

docker compose -f "$root/app/ci/staging/docker-compose.yaml" down --remove-orphans;
