#!/usr/bin/env bash

docker compose down
git pull
docker image rm $(docker image ls -aq)
docker compose build
docker compose run frontend npm i
docker compose run backend npm i
docker compose up -d
