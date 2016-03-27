var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var CommandActions = require('../../../actions/command-actions')
var expectOption = require('../../../lib/command-parser').expectOption
var expectOptionWithArgument = require('../../../lib/command-parser').expectOptionWithArgument

exports.description = 'Clears your console window'
exports.name = 'clear'
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  CommandActions.deleteAll()
}
exports.help = function() {
  return [
    <Ascii key={0} value='clear' font='bell'/>,
    <Markdown file='/markdown/commands/manifesto.md'/>
  ]
}
