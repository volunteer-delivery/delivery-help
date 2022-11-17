#!/usr/bin/env sh

root="$HOME/delivery-help"
secrets_loader_bin="$root/secrets-loader/build/linux-arm64";
env="$DEPLOYMENT_GROUP_NAME"
env_file="$root/.env"

rm $env_file && \
$secrets_loader_bin get -r eu-central-1 -p /$env -l isntance-main >> "$root/.env" && \
export $(cat $env_file | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f "$root/app/ci/$env/docker-compose.yaml" pull;
