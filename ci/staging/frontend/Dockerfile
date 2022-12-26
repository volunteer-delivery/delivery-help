ARG CR_BASE
ARG CR_LABEL

FROM $CR_BASE/node:4 as builder
LABEL org.opencontainers.image.source $CR_LABEL

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



FROM backend-app as backend



FROM $CR_BASE/nginx:1
LABEL org.opencontainers.image.source $CR_LABEL

WORKDIR /app

COPY --from=builder /app/dist ./
COPY --from=backend /app/node_modules/adminjs/lib/frontend/assets /app-adminjs/assets
COPY ./ci/staging/frontend/config.nginx /etc/nginx/templates/default.conf.template
