#!/usr/bin/env sh

rm .env && \
secrets-loader get -r $AWS_REGION -p /staging -l instance-main >> '.env' && \
export $(cat '.env' | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose pull;
