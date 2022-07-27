FROM node:16.14-alpine as builder

WORKDIR /app

ARG FRONTEND_API_URL
ARG FRONTEND_SOCKET_URL
ARG FRONTEND_IP
ARG FRONTEND_DOMAIN

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install --production

COPY ./frontend/. ./

RUN npm run build

FROM nginx:1.21.6-alpine
LABEL org.opencontainers.image.source https://github.com/TArch64/delivery-help

WORKDIR /app

COPY --from=builder /app/dist /app/
COPY ./deployment/staging/config.nginx /etc/nginx/templates/default.conf.template