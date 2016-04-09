var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument
var YouTube = require('react-youtube').default

exports.name = "rickroll"
exports.description = "i think you know what this will do"
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  var opts = {
    width: $(window).width(),
    height: $(window).height(),
    playerVars: {
      autoplay: 1
    }
  };
  return <YouTube videoId="oHg5SJYRHA0" opts={opts} />
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
