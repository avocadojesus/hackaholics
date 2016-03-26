var React = require('react')
var config = require('../../config.js')
var bulk = require('bulk-require')
var members = bulk(__dirname + '/../../members/', './*.js')

module.exports = function() {
  var arr = []
  for (var i in members) {
    var member = members[i]
    arr.push(<div>{member.name}: {member.description}</div>)
  }
  return arr
}
