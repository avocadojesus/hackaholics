var React = require('react')
var CommandPrompt = require('../../components/command-prompt')

var HomeView = React.createClass({
  displayName: 'HomeView',
  render: function() {
    return (
      <div className='home-view view'>
        <CommandPrompt />
      </div>
    )
  }
})

module.exports = HomeView
