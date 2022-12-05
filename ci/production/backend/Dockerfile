ARG CR_BASE
ARG CR_LABEL

FROM $CR_BASE/node:4
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

ENV NODE_ENV production
RUN apt-get update && apt-get install --no-install-recommends -y openssl libssl-dev

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci --omit=dev

COPY ./backend ./

RUN npm run build:prod
