var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
var CommandActions = require('../../actions/command-actions')
require('./command-prompt.less')

var CommandPrompt = React.createClass({
  displayName: 'CommandPrompt',
  getInitialState: function() {
    return {
      command_value: '',
      log: []
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
            if (e.which === 13) self.__createCommand() // if enter
            if (e.which === 38) self.__usePreviousCommand() // if up arrow
            if (e.which === 40) self.__useNextCommand() // if down arrow
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
    var log = this.state.log
    log.push(this.state.command_value)

    this.setState({
      command_value: '',
      log: log,
      log_index: null
    })
  },
  __deleteAllCommands: function() {
    CommandActions.deleteAll()
  },
  __usePreviousCommand: function() {
    var log_index = (this.state.log_index === null) ? (this.state.log.length - 1) : this.state.log_index - 1

    if (typeof this.state.log[log_index] === 'string') {
      this.setState({
        command_value: this.state.log[log_index],
        log_index: log_index
      })
    }
  },
  __useNextCommand: function() {
    var log_index = (this.state.log_index === null) ? (this.state.log.length - 1) : this.state.log_index + 1

    if (typeof this.state.log[log_index] === 'string') {
      this.setState({
        command_value: this.state.log[log_index],
        log_index: log_index
      })
    } else {
      this.setState({
        command_value: '',
        log_index: null
      })
    }
  }
})

module.exports = CommandPrompt
