var bulk = require('bulk-require')
var commands = bulk(__dirname + '/bin/', './*.js')
var command_list = []
for (var i in commands) {
  command_list.push(i)
}


module.exports = commands
exports.list = command_list
