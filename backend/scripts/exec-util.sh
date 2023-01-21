#!/usr/bin/env bash

if [[ "$BACKEND_ENV" == 'DEVELOPMENT' ]]; then
    npx ts-node "libs/prisma/src/$1/execute";
else
    node "dist/db-util/$1/execute";
fi;
