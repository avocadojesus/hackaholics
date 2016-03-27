var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument
var CommandActions = require('../../../actions/command-actions')



exports.description = 'Clears your console window'
exports.name = 'clear'
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  CommandActions.deleteAll()
}
exports.help = function() {
  return [
    <Ascii key={0} value='clear' font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
