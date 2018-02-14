window = global;
const { jsonFromFilters } = require('./compiled/JSConverter.js');
const fs = require("fs");
const downloadFileSync = require('download-file-sync');

const FILTER_URL_TEMPLATE = "https://filters.adtidy.org/ios/filters/{filterId}_optimized.txt";

/**
 * Prints usage
 */
let printUsage = function () {
    console.log("Usage: node index.js filters output");
    console.log("");
    console.log("filters - comma-separated list of the filters identifiers");
    console.log("output - path to the output file");
    console.log("");
    console.log("Example:");
    console.log("node index.js 1,2,3,4,11,12 blocklist.json");
};

let args = process.argv.slice(2);
if (args.length < 2) {
    printUsage();
    return;
}

let filters = args[0].split(",");
let output = args[1];

// Download and parse filters

let uniqueCheck = {};
let rules = [];
let iFilters = filters.length;
while (iFilters--) {
    let filterId = filters[iFilters];
    let downloadUrl = FILTER_URL_TEMPLATE.replace("{filterId}", filterId);

    console.log("Downloading %s", downloadUrl);
    let content = downloadFileSync(downloadUrl);

    if (!content) {
        throw "Cannot download filter " + filterId;
    }

    let lines = content.split("\n");
    let iLines = lines.length;
    while (iLines--) {
        let line = lines[iLines].trim();
        if (!uniqueCheck[line]) {
            rules.push(line);
            uniqueCheck[line] = true;
        }
    }
}

// Do the actual conversion
let result = jsonFromFilters(rules, 50000, false);

console.log("Total converted count: %d", result.totalConvertedCount);
console.log("Converted count: %d", result.convertedCount);
console.log("Errors count: %d", result.errorsCount);
console.log("Overlimit: %s", result.overLimit);

// Beautify the blocklist
let contentBlocker = JSON.parse(result.converted);
fs.writeFileSync(output, JSON.stringify(contentBlocker, null, 4));

console.log("Content blocker was saved to %s", output);