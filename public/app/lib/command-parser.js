var shellParse = require('shell-parse')

exports.parse = function(command) {
  var cmd = shellParse(command)[0].command.value
  var args = shellParse(command)[0].args.map(function(arg){return arg.value})

  if (!availableCommands[cmd]) return availableCommands.error.invalidCommand(cmd)
  return availableCommands[cmd].execute(args)
}

exports.expectOption = function(option, args) {
  return (args.indexOf(option) > -1)
}

exports.expectOptionWithArgument = function(option, args) {
  if (args.indexOf(option) === -1) return false
  var argument_index = args.indexOf(option) + 1
  if (!args[argument_index]) return false
  return args[argument_index]
}

var availableCommands = require('../commands') // leave @bottom for circular dependancy workaround
