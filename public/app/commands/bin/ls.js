var React = require('react')
var Error = require('./error')
var Manifesto = require('./manifesto')
var bulk = require('bulk-require')
var _ = require('lodash')
var commands = _.values(bulk(__dirname + '/', './*.js'))

exports.name = "ls"
exports.description = "Lists all available actions with descriptions"
exports.execute = function() {
  return commands.map(function(command, i) {
    return <div key={i}><b>{command.name}</b>: {command.description}</div>
  })
}
