Array.prototype.each = Array.prototype.forEach;

// var NodeUglifier = require("node-uglifier");
// var nodeUglifier = new NodeUglifier("./JSConverter.js");
// nodeUglifier.merge();//.uglify();
// //nodeUglifier..uglify();
//
// //exporting
// nodeUglifier.exportToFile("./compiled/JSConverter.js");

var concat = require('concat-files');

concat([
    './download/adguard.js',
    './prefs.js',
    './download/punycode.js',
    './download/common.js',
    './download/url.js',
    './download/log.js',
    './download/rules.js',
    './download/local-script-rules.js',
    './download/simple-regex.js',
    './browser-utils.js',
    './download/base-filter-rule.js',
    './download/filter-rule-builder.js',
    './download/css-filter-rule.js',
    './download/script-filter-rule.js',
    './download/url-filter-rule.js',
    './download/converter.js',
    './JSConverter.js'
], './compiled/JSConverter.js', function (err) {
    if (err) throw err;
    console.log('done');
});