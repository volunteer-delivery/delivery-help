FROM ghcr.io/tarch64/delivery-help-node:latest as builder

WORKDIR /app

ENV NODE_ENV production

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci --production

COPY ./backend ./

RUN npm run build:prod



FROM ghcr.io/tarch64/delivery-help-node:latest
LABEL org.opencontainers.image.source https://github.com/TArch64/delivery-help

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/scripts ./scripts/
COPY --from=builder /app/node_modules ./node_modules
