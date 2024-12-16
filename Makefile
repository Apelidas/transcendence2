
.PHONY: create-certificate run stop-dependencies clean re

run: stop-dependencies
	docker compose up -d --build

stop-dependencies:
	docker compose down

clean: stop-dependencies
	docker system prune -af
	docker volume prune -af

re: clean run