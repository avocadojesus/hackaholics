var React = require('react')
var View = require('../views/home-view')
var CommandStore = require('../stores/command-store')
var CommandActions = require('../actions/command-actions')

var HomeController = React.createClass({
  displayName: 'HomeController',
  getInitialState: function() {
    return {
      commands: CommandStore.get()
    }
  },
  componentDidMount: function() {
    CommandStore.addChangeListener(this.__handleChangeEvent)
    CommandActions.create('welcome', {hide_unparsed: true})
    window.io.on('/server/chat_message', function(message) {
      CommandActions.create('print ' + message, {hide_unparsed: true})
    })
    window.io.on('/server/broadcast_command', function(command) {
      CommandActions.create('print {{' + command.user + '}}:', {hide_unparsed: true})
      CommandActions.create(command.command, {hide_unparsed: true})
    })
  },
  render: function() {
    return (
      <View
        commands={this.state.commands}
        />
    )
  },
  __handleChangeEvent: function() {
    this.setState({
      commands: CommandStore.get()
    })
  }
})

module.exports = HomeController
