exports.expectOption = function(option, args) {
  return (args.indexOf(option) > -1)
}

exports.expectOptionWithArgument = function(option, args) {
  if (args.indexOf(option) === -1) return false
  var argument_index = args.indexOf(option) + 1
  if (!args[argument_index]) return false
  return args[argument_index]
}
