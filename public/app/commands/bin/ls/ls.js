var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument
var bulk = require('bulk-require')
var _ = require('lodash')
var commands = _.values(bulk(__dirname + '/../', '*/index.js'))

exports.name = "ls"
exports.description = "Lists all available actions with descriptions"
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  return commands.map(function(command, i) {
    if (!command.name || !command.description) return false
    return <div key={i}><b>{command.name}</b>: {command.description}</div>
  })
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
