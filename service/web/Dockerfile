ARG NODE_VERSION=20.11.0



FROM node:${NODE_VERSION}-alpine AS stage-development
RUN <<EOF
    apk --update --no-cache add libc6-compat curl
    npm install -g npm@latest
EOF
ARG SERVICE_WEB_HOSTNAME=0.0.0.0
ARG SERVICE_WEB_PORT=3210
ARG SERVICE_WEB_SERVER_API
ENV SERVICE_WEB_HOSTNAME=$SERVICE_WEB_HOSTNAME
ENV SERVICE_WEB_PORT=$SERVICE_WEB_PORT
ENV VITE_SERVICE_WEB_SERVER_API=$SERVICE_WEB_SERVER_API
WORKDIR /usr/src/service/web
COPY ./package*.json ./
RUN <<EOF
    npm i
EOF
COPY ./ ./
EXPOSE $SERVICE_WEB_PORT
CMD npx vite dev --host $SERVICE_WEB_HOSTNAME --port $SERVICE_WEB_PORT --cors --strictPort --force --debug



FROM node:${NODE_VERSION}-alpine AS stage-production-base
RUN <<EOF
    apk --update --no-cache add libc6-compat curl
    npm install -g npm@latest
    addgroup --system --gid 10001 nonroot
    adduser --system --uid 10001 nonroot --disabled-password --no-create-home
EOF
ARG SERVICE_WEB_HOSTNAME=0.0.0.0
ARG SERVICE_WEB_PORT=3210
ARG SERVICE_WEB_SERVER_API
ENV SERVICE_WEB_HOSTNAME=$SERVICE_WEB_HOSTNAME
ENV SERVICE_WEB_PORT=$SERVICE_WEB_PORT
ENV VITE_SERVICE_WEB_SERVER_API=$SERVICE_WEB_SERVER_API
WORKDIR /usr/src/service/web

FROM stage-production-base AS stage-production-dependencies
COPY ./package*.json ./
RUN <<EOF
    npm ci
EOF

FROM stage-production-base AS stage-production-builder
COPY --from=stage-production-dependencies /usr/src/service/web/node_modules ./node_modules
COPY ./ ./
RUN <<EOF
    npm run tsc
    npx vite build --outDir dist --assetsDir asset --assetsInlineLimit 4096
EOF

FROM nginx:1.26.0-alpine AS stage-production
RUN <<EOF
    apk --update --no-cache add libc6-compat curl
EOF
ARG SERVICE_WEB_HOSTNAME=0.0.0.0
ARG SERVICE_WEB_PORT=3210
ARG SERVICE_WEB_SERVER_API
ARG NGINX_HOSTNAME=$SERVICE_WEB_HOSTNAME
ARG NGINX_PORT=$SERVICE_WEB_PORT
ENV SERVICE_WEB_HOSTNAME=$SERVICE_WEB_HOSTNAME
ENV SERVICE_WEB_PORT=$SERVICE_WEB_PORT
ENV VITE_SERVICE_WEB_SERVER_API=$SERVICE_WEB_SERVER_API
ENV NGINX_HOSTNAME=$NGINX_HOSTNAME
ENV NGINX_PORT=$NGINX_PORT
WORKDIR /usr/src/service/web
RUN <<EOF
    cp -r -a /usr/share/nginx/html/* ./
EOF
COPY --from=stage-production-builder /usr/src/service/web/dist ./
EXPOSE $SERVICE_WEB_PORT
CMD ["nginx", "-g", "daemon off;"]
