var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var expectOption = require('../../../lib/command-helper').expectOption
var expectOptionWithArgument = require('../../../lib/command-helper').expectOptionWithArgument
var browserHistory = require('react-router').browserHistory

exports.description = "a fun game for teh lawlz"
exports.name = "asteroids"
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  // return <Asteroids />
  browserHistory.push('/asteroids')
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
