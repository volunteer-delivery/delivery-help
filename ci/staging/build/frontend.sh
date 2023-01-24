#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building front-end";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

FRONTEND_IMAGE="$REPO_IMAGE/frontend"

docker pull "$FRONTEND_IMAGE-builder:latest" || true;
docker pull "$FRONTEND_IMAGE:latest" || true;

docker build \
  --target builder \
  --tag "$FRONTEND_IMAGE-builder:latest" \
  --tag "$FRONTEND_IMAGE-builder:$APP_VERSION" \
  --file "ci/$ENV/build/frontend.Dockerfile" \
  --cache-from "$FRONTEND_IMAGE-builder:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_BASE \
  --build-arg CR_LABEL \
  --build-arg FRONTEND_API_URL \
  --build-arg FRONTEND_SOCKET_URL \
  --build-arg FRONTEND_ENV \
  --build-arg FRONTEND_BUGSNAG_KEY \
  . && \
docker push -a "$FRONTEND_IMAGE-builder"

docker build \
  --tag "$FRONTEND_IMAGE:latest" \
  --tag "$FRONTEND_IMAGE:$APP_VERSION" \
  --file "ci/$ENV/build/frontend.Dockerfile" \
  --cache-from "$FRONTEND_IMAGE-builder:$APP_VERSION" \
  --cache-from "$FRONTEND_IMAGE:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_BASE \
  --build-arg CR_LABEL \
  --build-arg FRONTEND_API_URL \
  --build-arg FRONTEND_SOCKET_URL \
  --build-arg FRONTEND_ENV \
  --build-arg FRONTEND_BUGSNAG_KEY \
  . && \
docker push -a "$FRONTEND_IMAGE";
