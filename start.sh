#!/usr/bin/env bash
cd -- "$(dirname -- "${BASH_SOURCE[0]}")" || exit 1
npm --prefix apps/api run start:dev &
npm --prefix apps/web run dev -- --port 3000 &
wait