ARG REPO_IMAGE
ARG APP_VERSION
FROM $REPO_IMAGE/backend-source:$APP_VERSION as builder

ARG CR_LABEL
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

RUN npm run build:console


ARG REPO_IMAGE
ARG APP_VERSION
FROM $REPO_IMAGE/backend-node:$APP_VERSION

ARG CR_LABEL
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/libs/prisma/src/client ./dist/db-util/client
COPY --from=builder /app/node_modules ./node_modules
COPY ./backend/prisma ./prisma
COPY ./backend/scripts ./scripts
COPY ./backend/package.json ./backend/package-lock.json ./

