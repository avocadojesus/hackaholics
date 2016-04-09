var React = require('react')
var CommandParser = require('../../lib/command-parser')
require('./hello-world.less')

var HelloWorld = React.createClass({
  displayName: 'HelloWorld',
  propTypes: {

  },
  getDefaultProps: function() {
    return {
    }
  },
  getInitialState: function() {
    return {
    }
  },
  render: function() {
    return (
      <div className='hello-world'>
        hello HelloWorld
      </div>
    )
  }
})

module.exports = HelloWorld
