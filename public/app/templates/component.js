var React = require('react')
require('./{{component_name}}.less')

var {{component_class}} = React.createClass({
  displayName: '{{component_class}}',
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
      <div className='{{component_name}}'>
        hello {{component_class}}
      </div>
    )
  }
})

module.exports = {{component_class}}
