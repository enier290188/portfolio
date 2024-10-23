include ./env/.env

.DEFAULT_GOAL := help

.PHONY: help
help: ### >>> - Print this message and exit.
	@echo
	@echo 'Commands:'
	@grep -E '^[a-zA-Z0-9_-]+:.*?### .*$$' $(MAKEFILE_LIST) | sed 's/^Makefile:/  make /g' | sed -n 's/^\(.*\): \(.*\)###\(.*\)/\1\3/p' | column -t  -s '>>>'
	@echo

.PHONY: ___dc-up___
___dc-up___:
ifdef DC_PROJECT_NAME
ifdef DC_PROJECT_STAGE
ifeq ($(DC_PROJECT_STAGE), development)
	cd ../service/web && npm install -g npm@latest && npm install
	cd ../service/api && export PIPENV_VENV_IN_PROJECT=1 && pipenv --python 3.12.7 --clear install --dev && source .venv/bin/activate && pip install --upgrade pip
	DC_PROJECT_NAME=$(DC_PROJECT_NAME) DC_PROJECT_STAGE=$(DC_PROJECT_STAGE) docker compose --project-name project-$(DC_PROJECT_NAME)-$(DC_PROJECT_STAGE) --file ./stage/$(DC_PROJECT_STAGE)/docker-compose.yaml --env-file ./stage/$(DC_PROJECT_STAGE)/env/.env up --build --force-recreate --detach
	DC_PROJECT_NAME=$(DC_PROJECT_NAME) DC_PROJECT_STAGE=$(DC_PROJECT_STAGE) docker compose --project-name project-$(DC_PROJECT_NAME)-$(DC_PROJECT_STAGE) --file ./stage/$(DC_PROJECT_STAGE)/docker-compose.yaml --env-file ./stage/$(DC_PROJECT_STAGE)/env/.env watch --no-up --quiet
endif
ifeq ($(DC_PROJECT_STAGE), production)
	DC_PROJECT_NAME=$(DC_PROJECT_NAME) DC_PROJECT_STAGE=$(DC_PROJECT_STAGE) docker compose --project-name project-$(DC_PROJECT_NAME)-$(DC_PROJECT_STAGE) --file ./stage/$(DC_PROJECT_STAGE)/docker-compose.yaml --env-file ./stage/$(DC_PROJECT_STAGE)/env/.env up --build --force-recreate --detach
endif
endif
endif

.PHONY: ___dc-down___
___dc-down___:
ifdef DC_PROJECT_NAME
ifdef DC_PROJECT_STAGE
ifeq ($(DC_PROJECT_STAGE), development)
	DC_PROJECT_NAME=$(DC_PROJECT_NAME) DC_PROJECT_STAGE=$(DC_PROJECT_STAGE) docker compose --project-name project-$(DC_PROJECT_NAME)-$(DC_PROJECT_STAGE) --file ./stage/$(DC_PROJECT_STAGE)/docker-compose.yaml --env-file ./stage/$(DC_PROJECT_STAGE)/env/.env down
endif
ifeq ($(DC_PROJECT_STAGE), production)
	DC_PROJECT_NAME=$(DC_PROJECT_NAME) DC_PROJECT_STAGE=$(DC_PROJECT_STAGE) docker compose --project-name project-$(DC_PROJECT_NAME)-$(DC_PROJECT_STAGE) --file ./stage/$(DC_PROJECT_STAGE)/docker-compose.yaml --env-file ./stage/$(DC_PROJECT_STAGE)/env/.env down
endif
endif
endif

.PHONY: dc-dev-up
dc-dev-up: ### >>> - (dev) docker compose up
	make ___dc-up___ DC_PROJECT_STAGE=development

.PHONY: dc-dev-down
dc-dev-down: ### >>> - (dev) docker compose down
	make ___dc-down___ DC_PROJECT_STAGE=development

.PHONY: dc-prod-up
dc-prod-up: ### >>> - (prod) docker compose up
	make ___dc-up___ DC_PROJECT_STAGE=production

.PHONY: dc-prod-down
dc-prod-down: ### >>> - (prod) docker compose down
	make ___dc-down___ DC_PROJECT_STAGE=production
