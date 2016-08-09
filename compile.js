var NodeUglifier = require("node-uglifier");
var nodeUglifier = new NodeUglifier("./JSConverter.js");
nodeUglifier.merge();//.uglify();
//nodeUglifier..uglify();

//exporting
nodeUglifier.exportToFile("./compiled/JSConverter.js");