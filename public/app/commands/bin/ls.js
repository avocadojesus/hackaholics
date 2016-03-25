var React = require('react')
var Error = require('./error')
var Manifesto = require('./manifesto')
var commands = require('../../config.js').commands

module.exports = function() {
  console.log(commands)
  return commands.map(function(command, i) {
    console.log(command)
    return <div key={i}><b>{command.name}</b>: {command.description}</div>
  })
}
