var React = require('react')
require('./video.less')

var Video = React.createClass({
  displayName: 'Video',
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
      <div className='video'>
        hello Video
      </div>
    )
  }
})

module.exports = Video
