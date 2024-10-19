#!/bin/sh

set -e

echo "Install node packages and mount them to volume"

npm run migration:run
npm run seed

echo "Running Node server.."
npm run ${@}
