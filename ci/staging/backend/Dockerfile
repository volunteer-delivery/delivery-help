ARG CR_BASE
ARG CR_LABEL

FROM $CR_BASE/node:3 as builder

WORKDIR /app

ENV NODE_ENV production

COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci --production

COPY ./backend ./

RUN npm run build:prod



FROM $CR_BASE/node:latest
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist/
COPY --from=builder /app/scripts ./scripts/
COPY --from=builder /app/node_modules ./node_modules
