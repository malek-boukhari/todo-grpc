#!/bin/bash

# Change the working directory to the root directory
cd "$(dirname "$0")/.." || exit

echo 'Creating proto directory in src/todos/src'

mkdir -p src/todos/src/proto

echo 'Creating proto directory in src/ui-todos/src'

mkdir -p src/ui-todos/src/proto

echo 'Copying proto files to src/todos/src'

# remove all possible existing proto files
rm -rf src/todos/src/proto/*
cp -r src/proto src/todos/src

echo 'Copying proto files to src/ui-todos/src'
# remove all possible existing proto files
rm -rf src/ui-todos/src/proto/*
cp -r src/proto src/ui-todos/src

echo 'Running npm install in src/todos'
cd src/todos
npm install

echo 'Running npm install in src/ui-todos'
cd ../ui-todos
npm install

echo 'Returning to the root directory'
cd ../..

echo 'running docker-compose build'
docker-compose build ui-todos
