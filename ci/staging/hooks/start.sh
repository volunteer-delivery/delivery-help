#!/usr/bin/env sh

root="$HOME/app"
env_file="$root/.env"

export $(cat $env_file | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose down --remove-orphans && \
docker compose up --detach;
