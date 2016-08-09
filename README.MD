#Safari Content Blocker Converter Compiler

For iOS version of Adguard we need a js rules converter compiled to one single file.
So this utility scripts will donwload required files from AdguardBrowserExtension repository and then build one js file out of it.

###Requirements

- Node 
- NPM
- node-uglifier (npm install "node-uglifier")

###Building

Run the following command in the Compiler directory:
```
    ./bin/bash compile.sh
```

You can find the result JSConverter.js in **./compiled/** directory.

###Running tests

To check the result run **./test/test.html** and check browser's console.



