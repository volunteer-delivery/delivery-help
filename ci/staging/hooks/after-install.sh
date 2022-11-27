#!/usr/bin/env sh

sudo chown -R $USER:$USER . && \
rm -f .env && \
./secrets-loader get -r eu-central-1 -p /staging -l instance-main >> .env && \
export $(cat .env | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose pull;
