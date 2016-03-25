var React = require('react')
var CommandActions = require('../../actions/command-actions')

var CommandPrompt = React.createClass({
  displayName: 'CommandPrompt',
  getInitialState: function() {
    return {
      command_value: ''
    }
  },
  render: function() {
    var self = this

    return (
      <div className='command-prompt'>
        <input
          ref='prompt_input'
          type='text'
          value={this.state.command_value}
          onKeyUp={function(e) {
            if (e.which === 13) self.__createCommand()
          }}
          onChange={function(e) {
            self.setState({command_value: e.target.value})
          }}/>
      </div>
    )
  },
  __createCommand: function() {
    CommandActions.create(this.state.command_value)
    this.setState({command_value: ''})
  }
})

module.exports = CommandPrompt
