var CommandActions = require('../../actions/command-actions')

exports.description = 'Clears your console window'
exports.name = 'clear'
exports.execute = function() {
  CommandActions.deleteAll()
}
