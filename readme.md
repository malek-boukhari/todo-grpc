# Todos gRPC Workspace

A user-friendly todo app using gRPC, React and Node.js with typescript

## Project Overview

- **todos:** Service for user and todos management.
- **ui-todos:** UI service built with React for a user-friendly interface.

## Dependencies
- docker
- docker compose

## Environment Configuration
Set up environment variables in the .env files within the env directory.

## Build steps
- `make copy-and-build` to copy the proto files from src/proto directory and build the project.
- `docker-compose up` to start the containers.

## Scripts
- build.sh: Script for building the project.
- copy-proto.sh: Script for copying Proto files from the shared directory to services.
- gen-proto.sh: Script for generating Proto stubs from inside the services

## Proto Files
Proto files for defining service interfaces are located in the services/proto directory.
- `make copy-proto` to copy Proto files into service directories.
- `make generate` to generate Proto stubs for all services.
- `make generate-for SERVICE=SERVICE_NAME` to generate Proto stubs for a particular service.
- `make copy-generate` to copy Proto files and generate Proto stubs for all services.

## TODO
- [ ] Authenticate routes (the logic is already there)
- [x] Polish ui
- [ ] Add sort and filter todos
