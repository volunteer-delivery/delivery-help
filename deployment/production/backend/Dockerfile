FROM node:16.14-alpine
LABEL org.opencontainers.image.source https://github.com/TArch64/delivery-help

WORKDIR /app

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm install

COPY ./backend ./
