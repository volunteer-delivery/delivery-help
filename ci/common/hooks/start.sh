#!/usr/bin/env sh

config="$HOME/delivery-help/app/ci/staging/docker-compose.yaml";

docker compose -f "$config" up --detach && \
docker compose -f "$config" down --remove-orphans;
