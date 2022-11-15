#!/usr/bin/env sh

secrets_loader_download=https://raw.githubusercontent.com/volunteer-delivery/secrets-loader/main/build/linux-arm64

root="$HOME/delivery-help"
env="$DEPLOYMENT_GROUP_NAME"
env_file="$root/.env"
secrets_loader_bin="$HOME/secrets-loader"

update_secrets() {
    rm $env_file $secrets_loader_bin && \
    curl $secrets_loader_download -o $secrets_loader_bin && \
    chmod +x $secrets_loader_bin && \
    $secrets_loader_bin get -r eu-central-1 -p /$env -l isntance-main >> "$root/.env"
}

update_secrets && \
export $(cat $env_file | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f "$root/app/ci/$env/docker-compose.yaml" pull;
