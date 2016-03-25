var React = require('react')
var CommandPrompt = require('../../components/command-prompt')
var CommandPromptEntry = require('../../components/command-prompt-entry')
var CommandDisplay = require('../../components/command-display')
var Stars = require('../../components/stars')
require('./home-view.less')

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
        <Stars />
        <div className='main-container'>
          <div className='command-display-container'>
            {this.props.commands.map(function(command, i){
              return (
                <CommandPromptEntry>
                  <CommandDisplay command={command} key={i} />
                </CommandPromptEntry>
              )
            })}
          </div>
          <CommandPromptEntry>
            <CommandPrompt />
          </CommandPromptEntry>
        </div>
      </div>
    )
  }
})

module.exports = HomeView
