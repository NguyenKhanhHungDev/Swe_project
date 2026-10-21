#!/bin/bash
cd -- "$(dirname -- "${BASH_SOURCE[0]}")" || exit 1

# Tự động cài đặt nếu thiếu thư mục node_modules
[ ! -d "apps/api/node_modules" ] && npm --prefix apps/api install
[ ! -d "apps/web/node_modules" ] && npm --prefix apps/web install

# Đảm bảo tắt toàn bộ tiến trình con khi nhấn Ctrl+C
trap 'kill 0' SIGINT

npm --prefix apps/api run start:dev &
npm --prefix apps/web run dev -- --port 3000 &
wait
