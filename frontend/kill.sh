#!/usr/bin/env bash

set -eu -o pipefail

backend_up() {
  curl -fsS http://localhost:4242/actuator/health &> /dev/null
}

run_kill() {
  kill "$(lsof -sTCP:LISTEN -ti tcp:4242)" &> /dev/null || true
}

run_kill

until ! backend_up; do
  run_kill
  sleep 1
done

