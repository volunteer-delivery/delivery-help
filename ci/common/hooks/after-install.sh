#!/usr/bin/env sh

root="$HOME/delivery-help"
env="$DEPLOYMENT_GROUP_NAME"

export $(cat "$root/.env" | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f "$root/app/ci/$env/docker-compose.yaml" pull;
