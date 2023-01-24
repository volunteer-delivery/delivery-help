ARG REPO_IMAGE
ARG APP_VERSION
FROM $REPO_IMAGE/backend-node:$APP_VERSION

ARG CR_LABEL
LABEL org.opencontainers.image.source = $CR_LABEL

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm pkg delete scripts.prepare
RUN npm ci --omit=dev

COPY ./backend ./
RUN npm run prisma generate
