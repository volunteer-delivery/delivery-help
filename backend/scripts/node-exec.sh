#!/usr/bin/env bash

if [[ "$BACKEND_ENV" == 'DEVELOPMENT' ]]; then
    npx ts-node "./src/$1"
else
    node "./dist/$1"
fi;
