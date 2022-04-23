#!/usr/bin/env bash

export $(cat .env | xargs) && \
echo $CR_PASSWORD | docker login ghcr.io -u $CR_USERNAME --password-stdin && \
docker compose -f ./docker-compose-build.yaml build && \
docker compose -f ./docker-compose-build.yaml push && \
./update.sh
