#!/usr/bin/env sh

docker compose -f ci/staging/docker-compose.yaml down --remove-orphans;
