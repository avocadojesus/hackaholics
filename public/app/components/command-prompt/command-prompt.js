var React = require('react')
var ReactDOM = require('react-dom')
var CommandActions = require('../../actions/command-actions')
require('./command-prompt.less')

var CommandPrompt = React.createClass({
  displayName: 'CommandPrompt',
  getInitialState: function() {
    return {
      command_value: ''
    }
  },
  componentDidMount: function() {
    $(ReactDOM.findDOMNode(this.refs.prompt_input)).focus()
  },
  render: function() {
    var self = this

    return (
      <div className='command-prompt'>
        <input
          className='prompt-input'
          ref='prompt_input'
          type='text'
          value={this.state.command_value}
          onKeyUp={function(e) {
            console.log(e.which, e, e.ctrlKey)
            if (e.which === 13) self.__createCommand() // if enter
            if (e.which === 75 && e.ctrlKey) self.__deleteAllCommands()  // if ctrl + k
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
  },
  __deleteAllCommands: function() {
    CommandActions.deleteAll()
    this.setState({command_value: ''})
  }
})

module.exports = CommandPrompt
