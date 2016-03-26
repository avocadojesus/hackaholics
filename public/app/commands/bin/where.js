var config = require('../../config.js')

exports.name = "where"
exports.description = "Discloses the location of the meetup"
exports.execute = function() {
  return config.address
}
