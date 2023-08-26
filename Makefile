.PHONY: build start stop restart sh logs compress

build:
	docker-compose build

start:
	docker-compose up -d

stop:
	docker-compose down

restart: stop start

sh:
	docker-compose exec wordpress bash

logs:
	docker-compose logs -f wordpress

compress:
	docker-compose exec wordpress bash -c "cd /var/www/html/wp-content/plugins && rm audioblog/audioblog.zip && zip -r audioblog/audioblog.zip audioblog"
