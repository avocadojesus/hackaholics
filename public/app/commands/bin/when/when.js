var config = require('../../../config.js')
exports.name = "when"
exports.description = "Discloses the times for the meetup"
exports.execute = function() {
  return config.time
}
