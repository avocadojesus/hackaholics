var React = require('react')
var Error = require('./error')
var Manifesto = require('./manifesto')
var commands = require('../../config.js').commands

module.exports = function() {
  return commands.map(function(command, i) {
    return <div key={i}><b>{command.name}</b>: {command.description}</div>
  })
}
