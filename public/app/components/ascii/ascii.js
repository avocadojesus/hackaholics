var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var figlet = require('./figlet').Figlet
require('./jquery.figlet.js')(figlet, $)

var Ascii = React.createClass({
  displayName: 'Ascii',
  componentDidMount: function() {
    this.$node = $(ReactDOM.findDOMNode(this))
    this.$node.figlet('hammer', 'graffiti')
  },
  render: function() {
    return (
      <pre></pre>
    )
  }
})

module.exports = Ascii
