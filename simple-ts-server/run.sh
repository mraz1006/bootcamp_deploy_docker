#!/usr/bin/env bash

set -Ceu

script_dir=$(cd "$(dirname "$0")"; pwd)
cd "$script_dir"

# Write docker commands to build and run a server.
# ex: docker build ...
