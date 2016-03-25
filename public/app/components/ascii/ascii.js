var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var figlet = require('./figlet').Figlet
require('./jquery.figlet.js')(figlet, $)

var Ascii = React.createClass({
  displayName: 'Ascii',
  propTypes: {
    value: React.PropTypes.string,
    font: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      font: 'graffiti',
      value: 'Add value prop'
    }
  },
  componentDidMount: function() {
    this.$node = $(ReactDOM.findDOMNode(this))
    this.$node.figlet(this.props.value, this.props.font)
  },
  render: function() {
    return (
      <pre></pre>
    )
  }
})

module.exports = Ascii
