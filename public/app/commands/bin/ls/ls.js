var React = require('react')
var bulk = require('bulk-require')
var _ = require('lodash')
console.log(bulk(__dirname + '/../', '*/index.js'))
var commands = _.values(bulk(__dirname + '/../', '*/index.js'))

exports.name = "ls"
exports.description = "Lists all available actions with descriptions"
exports.execute = function() {
  return commands.map(function(command, i) {
    if (!command.name || !command.description) return false
    return <div key={i}><b>{command.name}</b>: {command.description}</div>
  })
}
