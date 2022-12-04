ARG CR_BASE
ARG CR_LABEL

FROM $CR_BASE/node:3 as builder

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



FROM $CR_BASE/nginx:1
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

COPY --from=builder /app/dist ./
COPY ./ci/production/frontend/config.nginx /etc/nginx/templates/default.conf.template
