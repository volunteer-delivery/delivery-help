#!/usr/bin/env sh

docker compose --env-file "$HOME/delivery-help/.env" -f ../staging/docker-compose-up.yaml up --detach;
