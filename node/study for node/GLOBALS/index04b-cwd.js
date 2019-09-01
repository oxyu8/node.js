
var path = require("path")

var sourceFilePath = process.argv[1];
var sourceFileDire = path.dirname(sourceFilePath);

console.log(process.cwd());
process.chdir(path.dirname(process.argv[1]));
console.log(process.cwd());