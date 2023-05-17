#!/usr/bin/env bash

set -Ceu

script_dir=$(cd $(dirname $0); pwd)

docker run \
  --name progate-path-chat-api-mysql \
  -d \
  -v ${script_dir}/initdb:/docker-entrypoint-initdb.d \
  -e MYSQL_ROOT_PASSWORD=this-is-password_please-rewrite-this \
  -e MYSQL_DATABASE=chat_app_db \
  -p 3306:3306 \
  mysql:8.0.33
