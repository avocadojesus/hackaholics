var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../components/ascii')
var LineBreak = require('../../components/line-break')
var Markdown = require('../../components/markdown')

exports.name = "manifesto"
exports.description = "Displays the glorious hackaholics manifesto"
exports.execute = function(args) {
  return [
    <Ascii key={0} value='Manifesto' font='ogre'/>,
    <LineBreak key={1} />,
    <Markdown file='/markdown/manifesto.md'/>
  ]
}
