ARG PYTHON_VERSION=3.12.1



FROM python:${PYTHON_VERSION}-alpine AS stage-development
RUN <<EOF
    apk --update --no-cache add libc6-compat curl gcc libc-dev libffi-dev
    pip install --upgrade pip
EOF
ARG SERVICE_API_HOSTNAME=0.0.0.0
ARG SERVICE_API_PORT=4321
ARG SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES
ARG SERVICE_API_USER_ROOT_EMAIL
ARG SERVICE_DB_SERVER
ARG SERVICE_DB_PORT
ARG SERVICE_DB_DATABASE
ARG SERVICE_DB_USER
ENV SERVICE_API_HOSTNAME=$SERVICE_API_HOSTNAME
ENV SERVICE_API_PORT=$SERVICE_API_PORT
ENV SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES=$SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES
ENV SERVICE_API_USER_ROOT_EMAIL=$SERVICE_API_USER_ROOT_EMAIL
ENV SERVICE_DB_SERVER=$SERVICE_DB_SERVER
ENV SERVICE_DB_PORT=$SERVICE_DB_PORT
ENV SERVICE_DB_DATABASE=$SERVICE_DB_DATABASE
ENV SERVICE_DB_USER=$SERVICE_DB_USER
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIPENV_VENV_IN_PROJECT=1
WORKDIR /usr/src/service/api
COPY ./Pipfile* ./
RUN <<EOF
    pip install pipenv
    pipenv --python $PYTHON_VERSION --clear install --dev
    pipenv requirements --dev > ./requirements.txt
    pip install --no-cache-dir --upgrade -r ./requirements.txt
EOF
COPY ./ ./
EXPOSE $SERVICE_API_PORT
CMD uvicorn app.main:app --host $SERVICE_API_HOSTNAME --port $SERVICE_API_PORT --reload



FROM python:${PYTHON_VERSION}-alpine AS stage-production-base
RUN <<EOF
    apk --update --no-cache add libc6-compat curl gcc libc-dev libffi-dev
    pip install --upgrade pip
    addgroup --system --gid 10001 nonroot
    adduser --system --uid 10001 nonroot --disabled-password --no-create-home
EOF
ARG SERVICE_API_HOSTNAME=0.0.0.0
ARG SERVICE_API_PORT=4321
ARG SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES
ARG SERVICE_API_USER_ROOT_EMAIL
ARG SERVICE_DB_SERVER
ARG SERVICE_DB_PORT
ARG SERVICE_DB_DATABASE
ARG SERVICE_DB_USER
ENV SERVICE_API_HOSTNAME=$SERVICE_API_HOSTNAME
ENV SERVICE_API_PORT=$SERVICE_API_PORT
ENV SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES=$SERVICE_API_AUTH_ACCESS_TOKEN_EXPIRE_MINUTES
ENV SERVICE_API_USER_ROOT_EMAIL=$SERVICE_API_USER_ROOT_EMAIL
ENV SERVICE_DB_SERVER=$SERVICE_DB_SERVER
ENV SERVICE_DB_PORT=$SERVICE_DB_PORT
ENV SERVICE_DB_DATABASE=$SERVICE_DB_DATABASE
ENV SERVICE_DB_USER=$SERVICE_DB_USER
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PIPENV_VENV_IN_PROJECT=1
WORKDIR /usr/src/service/api

FROM stage-production-base AS stage-production-requirements
COPY ./Pipfile* ./
RUN <<EOF
    pip install pipenv
    pipenv --python $PYTHON_VERSION --clear install
    pipenv requirements > ./requirements.txt
EOF

FROM stage-production-base AS stage-production
COPY --chown=nonroot:nonroot ./ ./
COPY --from=stage-production-requirements --chown=nonroot:nonroot /usr/src/service/api/requirements.txt ./requirements.txt
RUN <<EOF
    pip install --no-cache-dir --upgrade -r ./requirements.txt
EOF
EXPOSE $SERVICE_API_PORT
USER nonroot
CMD gunicorn app.main:app --workers 8 --worker-class uvicorn.workers.UvicornWorker --bind $SERVICE_API_HOSTNAME:$SERVICE_API_PORT
