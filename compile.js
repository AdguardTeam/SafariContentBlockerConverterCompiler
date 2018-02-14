const fs = require('fs');

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
    dependenciesContent += fileContent + "\n";
}

let template = fs.readFileSync("JSConverter.template.js").toString();

let placeholder = "/* DEPENDENCIES_CONTENT_PLACEHOLDER */";
// Using this to avoid patterns: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
let converter = template.split(placeholder).join(dependenciesContent);

fs.writeFileSync("./compiled/JSConverter.js", converter);