var React = require('react')
var URLParser = require('js-video-url-parser')
var YouTube = require('react-youtube').default
require('./video.less')

var Video = React.createClass({
  displayName: 'Video',
  propTypes: {
    url: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      url: ''
    }
  },
  getInitialState: function() {
    var url_data = URLParser.parse(this.props.url)
    return {
      video_id: url_data.id,
      video_provider: url_data.provider,
      valid: url_data.mediaType === "video"
    }
  },
  render: function() {
    if (!this.state.valid) return 'invalid video'
    switch (this.state.video_provider) {
      case 'youtube':
        return <YouTube videoId={this.state.video_id} />
    }

    return 'unrecognized video provider: ' + this.state.video_provider
  }
})

module.exports = Video
