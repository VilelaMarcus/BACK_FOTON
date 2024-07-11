#!/bin/bash



DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
echo "Clearing out old layer..."
rm -rf .prisma-layer

echo "Generating Prisma Client"
sh $DIR/generate-prisma.sh

echo "Creating Prisma Layer..."
mkdir -p .prisma-layer/nodejs/node_modules/.prisma
mkdir -p .prisma-layer/nodejs/node_modules/@prisma

echo "Copying over @prisma and .prisma to the layer"
cp -r node_modules/.prisma .prisma-layer/nodejs/node_modules
cp -r node_modules/@prisma .prisma-layer/nodejs/node_modules

echo "Copying over the prisma folder, where our SQLite DBs are (not necessary for non-sqlite)"
cp -r prisma .prisma-layer/nodejs/prisma

echo "Copying over the OpenSSL 1.0.x Binary to the generic client folder in the layer"
mkdir -p .prisma-layer/nodejs/node_modules/.prisma/client
cp -f $DIR/libquery_engine-rhel-openssl-1.0.x.so.node .prisma-layer/nodejs/node_modules/.prisma/client

echo "Layer Built"
