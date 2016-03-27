var React = require('react')
var Ascii = require('../../components/ascii')
var LineBreak = require('../../components/line-break')
var Markdown = require('../../components/markdown')

exports.name = "welcome"
exports.description = "Displays a welcome message"
exports.execute = function(args) {
  return [
    <Ascii key={0} value='Welcome' font='isometric2'/>,
    <LineBreak key={1} />,
    <Markdown key={2} file='/markdown/welcome.md'/>
  ]
}
