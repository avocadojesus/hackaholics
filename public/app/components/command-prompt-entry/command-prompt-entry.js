var React = require('react')
require('./command-prompt-entry.less')

var CommandPromptEntry = React.createClass({
  displayName: 'CommandPromptEntry',
  render: function() {
    var self = this

    return (
      <div className='command-prompt-entry'>
        <div className='prompt-prefix'>$</div>
        <div className='entry'>{this.props.children}</div>
      </div>
    )
  }
})

module.exports = CommandPromptEntry
