var React = require('react')
var ReactDOM = require('react-dom')
var Game = require('./game')
require('./asteroids.less')

var Asteroids = React.createClass({
  displayName: 'Asteroids',
  componentDidMount: function() {
    this.node = ReactDOM.findDOMNode(this)
    Game.start(this.node)
  },
  render: function() {
    return <div id='asteroids-container'></div>
  }
})

module.exports = Asteroids
