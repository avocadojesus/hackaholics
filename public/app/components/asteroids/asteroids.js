var React = require('react')
var ReactDOM = require('react-dom')
var browserHistory = require('react-router').browserHistory
var Game = require('./game')
var CommandActions = require('../../actions/command-actions')
require('./asteroids.less')

var Asteroids = React.createClass({
  displayName: 'Asteroids',
  componentDidMount: function() {
    this.node = ReactDOM.findDOMNode(this)
    Game.start()

    window.addEventListener('keydown', function(e) {
      if ((e.which === 75 || e.which === 67) && e.ctrlKey) {
        Game.stop()
        CommandActions.deleteLast()
      }
    })
  },
  render: function() {
    return (
      <div id="info">
  		  <b>WASD</b> move, <b>R|F</b> up | down, <b>Q|E</b> roll, <b>up|down</b> pitch, <b>left|right</b> yaw<br/>
        <div id='asteroids-game-container'></div>
  		</div>
    )
  }
})

module.exports = Asteroids
