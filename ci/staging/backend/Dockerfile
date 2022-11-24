FROM ghcr.io/volunteer-delivery/node:latest as builder

WORKDIR /app

ENV NODE_ENV production

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci --production

COPY ./backend ./

RUN npm run build:prod



FROM ghcr.io/volunteer-delivery/node:latest
LABEL org.opencontainers.image.source https://github.com/volunteer-delivery

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/scripts ./scripts/
COPY --from=builder /app/node_modules ./node_modules
