exports.name = 'error'
exports.description = 'general error handling'
exports.invalidCommand = function(cmd) {
  return 'unrecognized command: ' + (cmd || 'undefined')
}
exports.execute = function(args) {
  
}
