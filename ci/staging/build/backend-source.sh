#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building backend-source";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$REPO_IMAGE/backend-source:latest" || true;

docker build \
  --tag "$REPO_IMAGE/backend-source:latest" \
  --tag "$REPO_IMAGE/backend-source:$APP_VERSION" \
  --file "ci/$ENV/build/backend-source.Dockerfile" \
  --cache-from "$REPO_IMAGE/backend-source:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg REPO_IMAGE \
  --build-arg APP_VERSION \
  --build-arg CR_LABEL \
  . && \
docker push -a "$REPO_IMAGE/backend-source";
