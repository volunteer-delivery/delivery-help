#!/usr/bin/env bash

export $(cat .env | xargs) && \
ssh -i "$REMOTE_KEY" "$REMOTE_USER@$REMOTE_HOST" "$(cat ./update-remote.sh)"
