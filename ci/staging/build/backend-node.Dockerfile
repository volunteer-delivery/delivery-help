ARG CR_BASE
FROM $CR_BASE/node:5

ARG CR_LABEL
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

ENV NODE_ENV production
RUN apt-get update && apt-get install --no-install-recommends -y openssl libssl-dev
