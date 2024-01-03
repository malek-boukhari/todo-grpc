#!/bin/bash

# Set the path to your proto directory
PROTO_DIR="./src/proto"

# Set the output directory for generated TypeScript files
OUTPUT_DIR="./src/generated"

BUF_BINARY="./node_modules/.bin"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Delete existing stub files
rm -rf "$OUTPUT_DIR"/*

# Loop through all .proto files in the proto directory
for proto_file in "$PROTO_DIR"/*.proto; do
  echo "Generating TypeScript code for $proto_file"

  # Run the Protobuf compiler with protoc-gen-connect-es for each .proto file
  PATH=$PATH:$BUF_BINARY \
   protoc -I="$PROTO_DIR" \
      --connect-es_out="$OUTPUT_DIR" \
      --connect-es_opt target=ts \
      --es_out="$OUTPUT_DIR" \
      --es_opt target=ts \
      "$proto_file"


 printf "\nDone\n"
done
