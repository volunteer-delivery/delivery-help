#!/usr/bin/env sh

if [[ "$BACKEND_ENV" == 'DEVELOPMENT' ]]; then
    npx ts-node ./src/console.ts
else
    node ./dist/console
fi;
