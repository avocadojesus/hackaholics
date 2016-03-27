var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument
var config = require('../../../config.js')
var bulk = require('bulk-require')
var members = bulk(__dirname + '/../../../members/', './*/index.js')

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
  if (expectOption('-h', args) || expectOption('--help', args)) return help()
  var username = expectOptionWithArgument('-u', args)
  if (username) return listUser(username)
  return listUsers()
}
var help = function() {
  return [
    <Ascii key={0} value='members' font='bell'/>,
    <Markdown file={'/app/commands/bin/members/help.md'}/>
  ]
}

exports.name = "members"
exports.description = "Displays a list of members"
exports.execute = execute
