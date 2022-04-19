FROM node:16.14-alpine
LABEL org.opencontainers.image.source https://github.com/TArch64/dostavka-hub

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
