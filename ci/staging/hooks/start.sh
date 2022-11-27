#!/usr/bin/env sh

export $(cat '.env' | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose down --remove-orphans && \
docker compose up --detach;
