#!/usr/bin/env bash

docker compose down
git pull
docker image rm $(docker image ls -aq)
docker compose build
docker compose up -d
