#!/bin/bash

echo 'Downloading files..'
mkdir download
cd download

WGET_COMMAND="wget -i ../compile_files.txt"
if ! type "wget" > /dev/null; then
WGET_COMMAND="cat ../compile_files.txt | tr '\n' '\0' | xargs -0 -n 1 curl -O"
fi

eval $WGET_COMMAND

cd ..

echo 'Checks requires..'
DPATH="./download/*.js"
TFILE="./out.tmp.$$"
for f in $DPATH
do
  if [ -f $f -a -r $f ]; then
   sed "s/require('..\/lib\/utils\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/lib\/filter\/rules\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/lib\/prefs/require('..\/prefs/g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/..\/lib\/utils\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/..\/lib\/filter\/rules\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/..\/lib\/prefs/require('..\/prefs/g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/..\/..\/lib\/utils\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/..\/..\/lib\/filter\/rules\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('..\/..\/..\/lib\/prefs/require('..\/prefs/g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('utils\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('filter\/rules\//require('.\//g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('prefs/require('..\/prefs/g" "$f" > $TFILE && mv $TFILE "$f"
   sed "s/require('punycode/require('.\/punycode/g" "$f" > $TFILE && mv $TFILE "$f"
  else
   echo "Error: Cannot read $f"
  fi
done
/bin/rm $TFILE

echo 'Compiling files..'
node compile.js

# echo 'Copy output to ios directory..'
# cp -v ./compiled/JSConverter.js ../../../Applications/iOS/AdguardSafariExtension/AdguardExtension/SharedComponents/Services/JSConverter.js
echo 'Cleaning..'
rm -rf download/
echo 'Success'
