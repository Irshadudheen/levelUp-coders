#!/bin/bash

# $1 is the path to the file containing the user's code
CODE_FILE=$1

# Check if the file exists
if [ ! -f "$CODE_FILE" ]; then
  echo "Error: File not found: $CODE_FILE"
  exit 1
fi

# Identify the language based on file extension and execute accordingly
if [[ "$CODE_FILE" == *.py ]]; then
  echo "Running Python code..."
  python3 "$CODE_FILE"
elif [[ "$CODE_FILE" == *.js ]]; then
  echo "Running JavaScript code..."
  node "$CODE_FILE"
else
  echo "Error: Unsupported language or file type: $CODE_FILE"
  exit 1
fi