var React = require('react')
var ReactDOM = require('react-dom')
var Game = require('./game')
require('./asteroids.less')

var Asteroids = React.createClass({
  displayName: 'Asteroids',
  componentDidMount: function() {
    this.node = ReactDOM.findDOMNode(this)
    Game.start()
  },
  render: function() {
    return (
      <div id="blocker">
        <div id="instructions">
          <span style={{fontSize: '40px'}}>Click to play</span>
          <br />
          (W, A, S, D = Move, SPACE = Jump, MOUSE = Look around)
        </div>
      </div>
    )
  }
})

module.exports = Asteroids
