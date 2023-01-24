#!/usr/bin/env bash

UTIL_IMAGE="$REPO_IMAGE/db-util"

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building db util";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$UTIL_IMAGE-builder:latest" || true;
docker pull "$UTIL_IMAGE:latest" || true;

docker build \
  --target builder \
  --tag "$UTIL_IMAGE-builder:latest" \
  --tag "$UTIL_IMAGE-builder:$APP_VERSION" \
  --file "ci/$ENV/build/db-util.Dockerfile" \
  --cache-from "$REPO_IMAGE/backend-node:$APP_VERSION" \
  --cache-from "$REPO_IMAGE/backend-source:$APP_VERSION" \
  --cache-from "$UTIL_IMAGE-builder:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$UTIL_IMAGE-builder" && \

docker build \
  --tag "$UTIL_IMAGE:latest" \
  --tag "$UTIL_IMAGE:$APP_VERSION" \
  --file "ci/$ENV/build/db-util.Dockerfile" \
  --cache-from "$REPO_IMAGE/backend-node:$APP_VERSION" \
  --cache-from "$REPO_IMAGE/backend-source:$APP_VERSION" \
  --cache-from "$UTIL_IMAGE-builder:$APP_VERSION" \
  --cache-from "$UTIL_IMAGE:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_LABEL \
  --build-arg APP_IMAGE \
  --build-arg APP_VERSION \
  . && \
docker push -a "$UTIL_IMAGE";
