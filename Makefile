.PHONY: build start stop restart sh

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

restart: stop start

sh:
	docker-compose exec wordpress bash
