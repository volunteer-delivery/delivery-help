#!/usr/bin/env sh

config="ci/staging/docker-compose.yaml";

docker compose -f "$config" up --detach && \
docker compose -f "$config" down --remove-orphans;
