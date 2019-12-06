#!/bin/sh

echo "Removing old files"

rm -rf ../components
rm -rf ../locales
rm -rf ../models
rm -rf ../styles
rm -rf ../helpers
rm -rf ../index.d.ts
rm -rf ../index.js

echo "Running TS Compiler"

tsc

echo "Copying CSS"

cp -r ./src/styles .