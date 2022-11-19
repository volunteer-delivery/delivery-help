#!/usr/bin/env sh

root="$HOME/app"
env_file="$root/.env"

rm $env_file && \
secrets-loader get -r $AWS_REGION -p /staging -l instance-main >> $env_file && \
export $(cat $env_file | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f "$root/docker-compose.yaml" pull;
