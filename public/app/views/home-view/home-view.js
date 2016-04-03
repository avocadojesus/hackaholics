var React = require('react')
var ReactDOM = require('react-dom')
var $ = require('jquery')
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
  componentDidUpdate: function() {
    $(document).scrollTop($(document).height() + 1000);
    setTimeout(function() {
      $(document).scrollTop($(document).height() + 1000);
    }, 200)
  },
  render: function() {
    return (
      <div className='home-view view'>
        <Stars />
        <div className='main-container'>
          <div className='command-display-container'>
            {this.props.commands.map(function(command, i){
              return (
                <div key={i}>
                  {
                    !command.opts.hide_unparsed &&
                    <CommandPromptEntry>
                      <CommandDisplay command={command} />
                    </CommandPromptEntry>
                  }
                  <CommandPromptEntry>
                    <CommandDisplay parsed={true} command={command} />
                  </CommandPromptEntry>
                </div>
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
