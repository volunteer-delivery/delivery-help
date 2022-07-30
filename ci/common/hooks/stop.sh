#!/usr/bin/env sh

pwd;

docker compose -f ci/staging/docker-compose.yaml down --remove-orphans;
