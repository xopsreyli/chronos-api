.PHONY: build prod stop

build:
	@echo "Building server..."
	docker compose build

start:
	@echo "Starting server..."
	docker compose up -d
	@echo "Running containers:"
	docker ps --filter name=chronos_

stop:
	@echo "Stopping server..."
	docker rm -f $$(docker ps -q --filter name=chronos_)