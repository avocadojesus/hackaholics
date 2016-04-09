var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var Video = require('../../../components/video')
var Command = require('../../../lib/command')

exports.description = "reads a url and displays a video"
exports.name = "video"
exports.execute = function(args) {
  var cmd = new Command(args)
  cmd.expectOption('-h', 'help')
  cmd.expectOption('--h', 'help')
  cmd.expectOptionWithArgs('-u', 'url')
  cmd.expectOptionWithArgs('--url', 'url')
  if (cmd.findOptionByLabel('help')) return this.help()
  var url = cmd.findOptionByLabel('url') ? cmd.findOptionByLabel('url').args[0] : cmd.input[0]
  return <Video url={url} />
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
