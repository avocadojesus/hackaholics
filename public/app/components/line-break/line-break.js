var React = require('react')

var LineBreak = React.createClass({
  displayName: 'LineBreak',
  render: function() {
    return (
      <div style={{overflowX:'hidden'}}>====================================================================================================================================================================</div>
    )
  }
})

module.exports = LineBreak
