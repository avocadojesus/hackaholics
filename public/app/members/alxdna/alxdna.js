var React = require('react')
var ReactDOM = require('react-dom')
var $ = window.jQuery = require('jquery');
require('typed.js');
require('./alxdna.less')

var Bio = React.createClass({
  displayName: 'alxdna-bio',
  componentDidMount: function() {
    var self = this

    $(ReactDOM.findDOMNode(this.refs.header)).typed({
      strings: [
        "You get a big 'ol hunk of awesome!</br>"
      ],
      typeSpeed: 200,
      showCursor: false,
      callback: function() {
        $(ReactDOM.findDOMNode(self.refs.alxdna)).addClass('active');
      }
    });
  },
  render: function() {
    return (
      <div ref='alxdna' className='alxdna-bio'>
        <h1 ref='header'></h1>
        <p ref='p'></p>
        <marquee>WHEEEEEEEEEEEEEEEEEEE!</marquee>
      </div>
    )
  }
})

module.exports = Bio
