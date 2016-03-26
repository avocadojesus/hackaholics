var React = require('react')
var Ascii = require('../../components/ascii')
var Markdown = require('../../components/markdown')

exports.name = "welcome"
exports.description = "Displays a welcome message"
exports.execute = function(args) {
  return [
    <Ascii key={0} value='Welcome' font='cyberlarge'/>,
    <Markdown file='/markdown/welcome.md'/>
  ]
}
