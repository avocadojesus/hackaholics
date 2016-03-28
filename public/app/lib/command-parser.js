var shellParse = require('shell-parse')
var availableCommands = require('../commands')

exports.parse = function(command) {
  var cmd = shellParse(command)[0].command.value
  var args = shellParse(command)[0].args.map(function(arg){return arg.value})

  if (!availableCommands[cmd]) return availableCommands.error.invalidCommand(cmd)
  return availableCommands[cmd].execute(args)
}
