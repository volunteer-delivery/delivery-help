ARG CR_BASE
FROM $CR_BASE/node:5 as builder

ARG CR_LABEL
LABEL org.opencontainers.image.source = $CR_LABEL

WORKDIR /app

ARG FRONTEND_API_URL
ARG FRONTEND_SOCKET_URL
ARG FRONTEND_ENV
ARG FRONTEND_BUGSNAG_KEY
ENV NODE_ENV production

# Required by nuxt + webpack in 18 node
ENV NODE_OPTIONS '--openssl-legacy-provider'

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci --omit=dev

COPY ./frontend/. ./

RUN npm run build



ARG CR_BASE
FROM $CR_BASE/nginx:1

ARG CR_LABEL
LABEL org.opencontainers.image.source = $CR_LABEL

WORKDIR /app

COPY --from=builder /app/dist ./
COPY ./ci/staging/nginx/config.nginx /etc/nginx/templates/default.conf.template
