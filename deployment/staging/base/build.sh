#!/usr/bin/env bash

docker build -f "./$1.Dockerfile" -t "ghcr.io/tarch64/delivery-help-$1:latest" . && \
docker push "ghcr.io/tarch64/delivery-help-$1:latest";
