var React = require('react')
var ReactDOM = require('react-dom')
var Asteroids = require('../../components/asteroids')
var Stars = require('../../components/stars')
require('./asteroids-view.less')

var AsteroidsView = React.createClass({
  displayName: 'AsteroidsView',
  render: function() {
    return (
      <div className='asteroids-view view'>
        <Stars />
        <Asteroids/>
      </div>
    )
  }
})

module.exports = AsteroidsView
