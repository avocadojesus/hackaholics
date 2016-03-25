var React = require('react')
var View = require('../views/home-view')
var CommandStore = require('../stores/command-store')

var HomeController = React.createClass({
  displayName: 'HomeController',
  getInitialState: function() {
    return {
      commands: CommandStore.get()
    }
  },
  componentDidMount: function() {
    CommandStore.addChangeListener(function() {
      alert('kkkkkk')
    })
  },
  render: function() {
    return (
      <View/>
    )
  }
})

module.exports = HomeController
