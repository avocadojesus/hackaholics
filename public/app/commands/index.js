var commands = {
  clear: require('./bin/clear'),
  error: require('./bin/error'),
  ls: require('./bin/ls'),
  manifesto: require('./bin/manifesto'),
  when: require('./bin/when'),
  where: require('./bin/where')
}
var command_list = ['error', 'ls', 'manifesto']


module.exports = commands
exports.list = command_list
