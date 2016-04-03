var React = require('react')
var CommandParser = require('../../lib/command-parser')

var CommandDisplay = React.createClass({
  displayName: 'CommandDisplay',
  propTypes: {
    command: React.PropTypes.object.isRequired,
    parsed: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      command: '',
      parsed: false
    }
  },
  getInitialState: function() {
    return {
      parsed_command: this.props.parsed ? CommandParser.parse(this.props.command.text) : null
    }
  },
  render: function() {
    return (
      <div className='command-display'>
        {this.props.parsed && this.state.parsed_command}
        {!this.props.parsed && this.props.command.text}
      </div>
    )
  }
})

module.exports = CommandDisplay
