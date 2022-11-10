#!/usr/bin/env sh

root="$HOME/delivery-help"
env="$DEPLOYMENT_GROUP_NAME"

update_secrets() {
    rm "$root/.env";
    ssm_json=$(aws ssm get-parameters-by-path --path "/$env" --no-paginate --with-decryption);
    ssm_vars=$(echo "$ssm_json" | jq -r '.Parameters[] | "export " + (.Name | split("/")[-1] | ascii_upcase | gsub("-"; "_")) + "=" + .Value')
    echo "$ssm_vars" >> "$root/.env"
}

export $(cat "$root/.env" | xargs) && \
echo $CR_PASSWORD | docker login $CR_HOST -u $CR_USERNAME --password-stdin && \
docker compose -f "$root/app/ci/$env/docker-compose.yaml" pull;
