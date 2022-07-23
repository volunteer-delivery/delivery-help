#!/usr/bin/env bash

function load_update_script() {
  script="$(cat ./deploy-update-remote.sh)";
  script="${script/__DEPLOYMENT_BRANCH__/$(git branch --show-current)}"
  echo "$script";
}

function exec_docker() {
  docker compose -f ./docker-compose-build.yaml $1
}

function docker_login() {
    echo $CR_PASSWORD | docker login ghcr.io -u $CR_USERNAME --password-stdin
}

function send_telegram_noty() {
  message="<b>$1</b>%0AApp URL https://staging.delivery-help.com.ua"
  curl \
    --silent \
    --data parse_mode=HTML \
    --data chat_id="$TELEGTAM_NOTY_CHAT" \
    --data text="$message" \
    --request POST "https://api.telegram.org/bot$TELEGRAM_NOTY_TOKEN/sendMessage"
}

export $(cat .env | xargs) && \
send_telegram_noty '🚀 Deploy started'
docker_login && \
exec_docker 'build' && \
exec_docker 'push' && \
./connect.sh "$(load_update_script)";

send_telegram_noty '✅ Deploy finished'
