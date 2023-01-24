#!/usr/bin/env bash

APP_NAME="$1";
APP_IMAGE="$REPO_IMAGE/backend-$APP_NAME";

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building backend microservice $APP_NAME";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$APP_IMAGE-builder:latest" || true;
docker pull "$APP_IMAGE:latest" || true;

docker build \
  --target builder \
  --tag "$APP_IMAGE-builder:latest" \
  --tag "$APP_IMAGE-builder:$APP_VERSION" \
  --file "ci/$ENV/build/backend-microservice.Dockerfile" \
  --cache-from "$REPO_IMAGE/backend-node:$APP_VERSION" \
  --cache-from "$REPO_IMAGE/backend-source:$APP_VERSION" \
  --cache-from "$APP_IMAGE-builder:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg REPO_IMAGE \
  --build-arg APP_VERSION \
  --build-arg CR_LABEL \
  --build-arg APP_NAME="$APP_NAME" \
  . && \
docker push -a "$APP_IMAGE-builder" && \

docker build \
  --tag "$APP_IMAGE:latest" \
  --tag "$APP_IMAGE:$APP_VERSION" \
  --file "ci/$ENV/build/backend-microservice.Dockerfile" \
  --cache-from "$REPO_IMAGE/backend-node:$APP_VERSION" \
  --cache-from "$REPO_IMAGE/backend-source:$APP_VERSION" \
  --cache-from "$APP_IMAGE-builder:$APP_VERSION" \
  --cache-from "$APP_IMAGE:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg REPO_IMAGE \
  --build-arg APP_VERSION \
  --build-arg CR_LABEL \
  --build-arg APP_NAME="$APP_NAME" \
  . && \
docker push -a "$APP_IMAGE";
