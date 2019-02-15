#!/bin/bash
cur_time=$(date '+%Y-%m-%d')
sevendays_time=$(date -d -7days '+%Y-%m-%d')
SHELL_FOLDER=$(cd "$(dirname "$0")";pwd)

export PGPASSWORD=111
echo "Starting Backup PostgreSQL ..."
rm -rf $SHELL_FOLDER/$sevendays_time.gz
pg_dump -d coinsever_main -U coinsever_main -h 127.0.0.1 -p 5432 | gzip > "$SHELL_FOLDER/$cur_time.gz"
echo "Finish Backup ...