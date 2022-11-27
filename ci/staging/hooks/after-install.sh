#!/usr/bin/env sh

root="$HOME/app"
env_file="$root/.env"

sudo chown -R $USER:$USER $root && \
rm -f $env_file && \
./secrets-loader get -r eu-central-1 -p /staging -l instance-main >> $env_file && \
export $(cat $env_file | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose pull;
