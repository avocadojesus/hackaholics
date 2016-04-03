var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var Command = require('../../../lib/command')

exports.description = "wont u come"
exports.name = "blackholesun"
exports.execute = function(args) {
  var cmd = new Command(args)
  cmd.expectOption('-h', 'help')
  cmd.expectOption('--h', 'help')
  if (cmd.findOptionByLabel('help')) return this.help()
  return "make me do something, plz"
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
