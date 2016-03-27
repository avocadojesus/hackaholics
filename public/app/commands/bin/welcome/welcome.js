var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument

exports.name = "welcome"
exports.description = "Displays a welcome message"
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  return [
    <Ascii key={0} value='Welcome' font='isometric2'/>,
    <LineBreak key={1} />,
    <Markdown key={2} file='/markdown/welcome.md'/>
  ]
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
