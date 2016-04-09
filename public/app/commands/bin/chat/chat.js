var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../../components/ascii')
var Markdown = require('../../../components/markdown')
var Command = require('../../../lib/command')
var ls = require('local-storage')

var __getUser = function() {
  if (ls.get('username')) return ls.get('username')
  return 'annonymous'
}

var __setUser = function(username) {
  ls.set('username', username)
}

exports.description = "opens up communication channel with all other users"
exports.name = "chat"
exports.execute = function(args) {
  var cmd = new Command(args)
  cmd.expectOption('-h', 'help')
  cmd.expectOption('--h', 'help')
  cmd.expectOptionWithArgs('-u', 'user')
  cmd.expectOptionWithArgs('--user', 'user')
  cmd.expectOptionWithArgs('-v', 'video')
  cmd.expectOptionWithArgs('--video', 'video')
  if (cmd.findOptionByLabel('help')) return this.help()
  if (cmd.findOptionByLabel('user')) {
    __setUser(cmd.findOptionByLabel('user').args[0])
  }
  if (cmd.findOptionByLabel('video')) return this.video(cmd.findOptionByLabel('video').args[0])

  window.io.emit('/client/chat_message', '{{' + __getUser() + '}}: ' + cmd.input.join(' '))
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
exports.video = function() {
  return <Ascii key={0} value='hammer balls' font='bell'/>
}
