var bulk = require('bulk-require')
var commands = bulk(__dirname + '/bin/', './*/index.js')
module.exports = commands
