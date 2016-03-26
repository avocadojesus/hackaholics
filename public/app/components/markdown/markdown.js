var React = require('react')
var $ = require('jquery')
var ReactMarkdown = require('react-markdown')

var LineBreak = React.createClass({
  displayName: 'Markdown',
  getInitialState: function() {
    return {
      markdown: ''
    }
  },
  propTypes: {
    file: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      file: ''
    }
  },
  componentDidMount: function() {
    var self = this
    $.get(this.props.file, function(data) {
      self.setState({markdown: data});
    });
  },
  render: function() {
    return (
      <ReactMarkdown source={this.state.markdown}/>
    )
  }
})

module.exports = LineBreak
