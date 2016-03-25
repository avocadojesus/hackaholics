exports.invalidCommand = function(cmd) {
  return 'unrecognized command: ' + (cmd || 'undefined')
}
