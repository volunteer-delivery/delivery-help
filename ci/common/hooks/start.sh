#!/usr/bin/env sh

root="$HOME/delivery-help"
config="$root/app/ci/staging/docker-compose.yaml";

export $(cat "$root/.env" | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f "$config" down --remove-orphans && \
docker compose -f "$config" up --detach;
