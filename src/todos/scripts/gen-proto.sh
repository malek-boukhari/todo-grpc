#!/bin/bash

# Set the path to your proto directory
PROTO_DIR="./src/proto"

# Set the output directory for generated TypeScript files
OUTPUT_DIR="./src/generated"

# Delete existing stub files
rm -rf "$OUTPUT_DIR"/*

# Loop through all .proto files in the proto directory
for proto_file in "$PROTO_DIR"/*.proto; do
  echo "Generating TypeScript code for $proto_file"

  protoc \
    -I="$PROTO_DIR" \
    --plugin="./node_modules/.bin/protoc-gen-ts" \
    --ts_out="$OUTPUT_DIR" \
      "$proto_file"

 printf "\nDone\n"
done
