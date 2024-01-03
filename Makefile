.PHONY: copy-and-build copy-proto generate generate-for copy-generate

copy-and-build:
	./scripts/build.sh

# Copies the proto files from the shared directory to the services
copy-proto:
	./scripts/copy-proto.sh

# Generates the proto stubs for all services
generate:
	docker-compose exec todos ./scripts/gen-proto.sh
	docker-compose exec ui-todos ./scripts/gen-proto.sh

# Generates the proto stubs for a particular service
generate-for:
	docker-compose exec $(SERVICE) /bin/bash ./scripts/gen-proto.sh

# Copies proto files and generates proto stubs for all services (Laziness level=999)
copy-generate:
	./scripts/copy-proto.sh && \
    docker-compose exec todos ./scripts/gen-proto.sh && \
    docker-compose exec ui-todos ./scripts/gen-proto.sh
