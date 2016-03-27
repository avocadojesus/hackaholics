var React = require('react')
var config = require('../../../config.js')
var bulk = require('bulk-require')
var members = bulk(__dirname + '/../../../members/', './*/index.js')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument

var listUsers = function() {
  var arr = []
  for (var i in members) {
    var member = members[i]
    arr.push(<div>{member.name}: {member.description}</div>)
  }
  return arr
}

var listUser = function(username) {
  if (!members[username]) return "Username not found: " + username + "... try running `members` first to see a list of members"
  if (!typeof members[username].bio === 'function') return "Invalid configuration for member bio. Please try again later"
  return members[username].bio()
}

var execute = function(args) {
  var username = expectOptionWithArgument('-u', args)
  if (username) return listUser(username)
  return listUsers()
}

exports.name = "members"
exports.description = "Displays a list of members."
exports.execute = execute
