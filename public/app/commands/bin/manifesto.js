var React = require('react')
var $ = window.jQuery = window.$ = require('jquery')
var Ascii = require('../../components/ascii')
var LineBreak = require('../../components/line-break')
var Markdown = require('../../components/markdown')

module.exports = function(args) {
  return [
    <Ascii key={0} value='Manifesto' font='block'/>,
    <LineBreak key={1} />,
    <Markdown file='/markdown/manifesto.md'/>
  ]
}
