#!/usr/bin/env bash

echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "Building backend-node";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";
echo "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<";
echo ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>";

docker pull "$REPO_IMAGE/backend-node:latest" || true;

docker build \
  --tag "$REPO_IMAGE/backend-node:latest" \
  --tag "$REPO_IMAGE/backend-node:$APP_VERSION" \
  --file "ci/$ENV/build/backend-node.Dockerfile" \
  --cache-from "$REPO_IMAGE/backend-node:latest" \
  --build-arg BUILDKIT_INLINE_CACHE \
  --build-arg CR_BASE \
  --build-arg CR_LABEL \
  . && \
docker push -a "$REPO_IMAGE/backend-node";
