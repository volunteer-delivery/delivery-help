#!/usr/bin/env sh

export $(cat "$HOME/delivery-help/.env" | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f ci/staging/docker-compose.yaml pull;
