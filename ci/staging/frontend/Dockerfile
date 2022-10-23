FROM ghcr.io/tarch64/delivery-help-node:latest as builder

WORKDIR /app

ARG FRONTEND_API_URL
ARG FRONTEND_SOCKET_URL
ARG FRONTEND_ENV
ARG FRONTEND_BUGSNAG_KEY
ENV NODE_ENV production

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci --production

COPY ./frontend/. ./

RUN npm run build



FROM ghcr.io/tarch64/delivery-help-nginx:latest
LABEL org.opencontainers.image.source https://github.com/TArch64/delivery-help

WORKDIR /app

COPY --from=builder /app/dist ./
COPY ./ci/staging/frontend/config.nginx /etc/nginx/templates/default.conf.template
