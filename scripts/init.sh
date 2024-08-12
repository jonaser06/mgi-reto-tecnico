#!/bin/bash
cd /app
yarn install
yes | npx prisma generate
yes | npx prisma migrate deploy
yarn run start:dev