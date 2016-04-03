var React = require('react');
var ReactDOM = require('react-dom');
var $ = window.jQuery = require('jquery');
require('typed.js');
require('./sudo.less');

var Bio = React.createClass({
  displayName: 'Avojeez0Bio',
  componentDidMount: function() {
    var self = this

    $(ReactDOM.findDOMNode(this.refs.header)).typed({
      strings: [
        " <br/>",
        "destroy me.self",
        "cappucino mix",
        "^1000 harold"
      ],
      typeSpeed: 200,
      showCursor: false,
      callback: function() {
        // $(ReactDOM.findDOMNode(self.refs.p)).typed({
        //   strings: [
        //     "================================================================<br/>\
        //      everything will be better tommorow                                 <br/>\
        //      if i can just be a better son, daughter, mother, father...         <br/>\
        //      they will never like me, they will never accept me ...              <br/>\
        //      i will never be enough... smart enough, funny enough, happy enough.. <br/>\
        //      <br/>\
        //      Have you asked  your 'self' these questions?<br/>\
        //      you could be suffering from a common human condition..<br/>\
        //      sudo can grant you root access to the source of this defect<br/>\
        //      sudo can free you from the bondage of your human coil <br/>\
        //      sudo can help you see past the veil <br/>\
        //      sudo can ... and will <br/>\
        //      <br/>\
        //      <br/>\
        //      .... provided you follow a few simple directions <br/>\
        //      <br/>\
        //      STEP # 1 <br/>\
        //      <br/>\
        //      take the red pill. <br/>\
        //      <br/>\
        //      take it now. <br/>\
        //      <br/>\
        //      <br/>\
        //     "
        //   ],
        //   typeSpeed: 100,
        //   showCursor: false,
        //   callback: function(){
        //     window.location.href = "http://hackaholics.io";
        //
        //   }
        // });
      }
    });
  },
  render: function() {
    return (
      <div className='sudo-bio'>
        <h1 ref='header'></h1>
        <p ref='p'></p>
      </div>
    )
  }
})

module.exports = Bio
