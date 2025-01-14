#!/bin/bash

pnpm run db:push
echo "Migrations run. Starting the app"\

pnpm run start