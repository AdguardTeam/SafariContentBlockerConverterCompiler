# Safari Content Blocker Converter Compiler

For iOS version of Adguard we need a js rules converter compiled to one single file.
So this utility scripts will donwload required files from AdguardBrowserExtension repository and then build one js file out of it.

### Requirements

- Node 
- NPM

### Building

Run the following command in the compiler directory to compile the JSConverter:
```
    npm install
    ./bin/bash compile.sh
```

You can find the result JSConverter.js in **./compiled/** directory.

### Generating a blocklist manually

You can use the newly compiled JSConverter to generate a content blocker manually.

```
node index.js filterIds outputPath
```

* `filterIds` -- a comma-separated list of the filters identifiers
* `outputPath` -- path to write the output blocklist json

Example that converts English, Spyware, Social filters into a content blocker:
```
node index.js 2,3,4 blocklist.json
```