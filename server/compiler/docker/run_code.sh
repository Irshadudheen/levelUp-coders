#!/bin/bash

# Enable error tracing
set -e

# Enable command echoing for debugging
set -x

# $1 is the language (file extension)
# $2 is the path to the file containing the user's code
LANGUAGE=$1
CODE_FILE=$2

echo "Starting execution of $CODE_FILE"

# Check if the file exists
if [ ! -f "$CODE_FILE" ]; then
  echo "Error: File not found: $CODE_FILE"
  exit 1
fi

# Execute based on the provided language
case "$LANGUAGE" in
  py)
    echo "Running Python code..."
    python3 -u "$CODE_FILE"
    ;;
  js)
    echo "Running JavaScript code..."
    node "$CODE_FILE"
    ;;
  *)
    echo "Error: Unsupported language: $LANGUAGE"
    exit 1
    ;;
esac

echo "Execution completed successfully"