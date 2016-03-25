var React = require('react')
var CommandPrompt = require('../../components/command-prompt')
var CommandDisplay = require('../../components/command-display')

var HomeView = React.createClass({
  displayName: 'HomeView',
  propTypes: {
    commands: React.PropTypes.array.isRequired
  },
  getDefaultProps: function() {
    return {
      commands: []
    }
  },
  render: function() {
    return (
      <div className='home-view view'>
        <div className='command-display-container'>
          {this.props.commands.map(function(command, i){
            return (
              <CommandDisplay command={command} key={i} />
            )
          })}
        </div>
        <CommandPrompt />
      </div>
    )
  }
})

module.exports = HomeView
