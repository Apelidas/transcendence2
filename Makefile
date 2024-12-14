
.PHONY: create-certificate run stop-dependencies clean re

create-certificate:
	./create_certificate.sh

run: stop-dependencies create-certificate
	docker compose up -d --build

stop-dependencies:
	docker compose down

clean: stop-dependencies
	docker system prune -af
	docker volume prune -af

re: clean run