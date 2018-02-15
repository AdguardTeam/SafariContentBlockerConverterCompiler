const fs = require('fs');
const path = require('path');
const pjson = require('./package.json');

const files = [
    './extension/adguard.js',
    './stubs/prefs.js',
    './extension/punycode.js',
    './extension/common.js',
    './extension/url.js',
    './extension/log.js',
    './extension/rules.js',
    './extension/local-script-rules.js',
    './extension/simple-regex.js',
    './stubs/browser-utils.js',
    './stubs/csp-filter.js',
    './extension/base-filter-rule.js',
    './extension/filter-rule-builder.js',
    './extension/css-filter-rule.js',
    './extension/script-filter-rule.js',
    './extension/url-filter-rule.js',
    './extension/converter.js'
];

let dependenciesContent = "";
for (let i = 0; i < files.length; i++) {

    let fileContent = fs.readFileSync(files[i]).toString();

    // Remove the head comment
    fileContent = fileContent.replace(/^\s*\/\*\*[\s\S]*?\*\//, "").trim();

    // Prepend the file name
    let fileName = path.basename(files[i]);
    fileContent = "/** start of " + fileName + " */\n" +
        fileContent + "\n/** end of " + fileName + " */\n";

    // Append to the dependencies content
    dependenciesContent += fileContent;
}

let template = fs.readFileSync("JSConverter.template.js").toString();

const dependenciesPlaceholder = "/* DEPENDENCIES_CONTENT_PLACEHOLDER */";
const versionPlaceholder = "${version}";
// Using this to avoid patterns messing with the result: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
let converter = template.split(dependenciesPlaceholder).join(dependenciesContent);
converter = converter.split(versionPlaceholder).join(pjson.version);

fs.writeFileSync("./compiled/JSConverter.js", converter);