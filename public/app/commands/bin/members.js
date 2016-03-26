var React = require('react')
var config = require('../../config.js')
var bulk = require('bulk-require')
var members = bulk(__dirname + '/../../members/', './*.js')

exports.name = "members"
exports.description = "Displays a list of members."
exports.execute = function() {
  var arr = []
  for (var i in members) {
    var member = members[i]
    arr.push(<div>{member.name}: {member.description}</div>)
  }
  return arr
}
