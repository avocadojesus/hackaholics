var React = require('react')
var CommandParser = require('../../lib/command-parser')

var CommandDisplay = React.createClass({
  displayName: 'CommandDisplay',
  propTypes: {
    command: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      command: ''
    }
  },
  render: function() {
    return (
      <div>{CommandParser.parse(this.props.command)}</div>
    )
  }
})

module.exports = CommandDisplay
