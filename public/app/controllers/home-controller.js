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
    CommandActions.create('asteroids')
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
