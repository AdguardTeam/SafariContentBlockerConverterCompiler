#!/bin/bash

echo 'Downloading files..'
rm -rf extension
mkdir extension
cd extension

WGET_COMMAND="wget -i ../compile_files.txt"
if ! type "wget" > /dev/null; then
WGET_COMMAND="cat ../compile_files.txt | tr '\n' '\0' | xargs -0 -n 1 curl -O"
fi

eval $WGET_COMMAND

cd ..

echo 'Compiling files..'
node compile.js

echo 'Success'
