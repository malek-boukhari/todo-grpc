#!/bin/bash

# Change the working directory to the root directory
cd "$(dirname "$0")/.." || exit

echo 'Copying proto files from ./src/proto to src/todos/src'
mkdir -p src/todos/src/proto
# Delete existing proto files
rm -rf src/todos/src/proto/*
# Copy files
cp -r src/proto src/todos/src
echo 'Done'

echo 'Copying proto files from ./src/proto to src/ui-todos/src'
mkdir -p src/ui-todos/src/proto
# Delete existing proto files
rm -rf src/ui-todos/src/proto/*
# Copy files
cp -r src/proto src/ui-todos/src
echo 'Done'
