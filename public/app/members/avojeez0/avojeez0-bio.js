var React = require('react')
var ReactDOM = require('react-dom')
var $ = window.jQuery = require('jquery');
require('typed.js');
require('./avojeez0-bio.less')

var Bio = React.createClass({
  displayName: 'Avojeez0Bio',
  componentDidMount: function() {
    var self = this

    $(ReactDOM.findDOMNode(this.refs.header)).typed({
      strings: [
        "Avogadr0 would find me better fish"
      ],
      typeSpeed: 200,
      showCursor: false,
      callback: function() {
        $(ReactDOM.findDOMNode(self.refs.p)).typed({
          strings: [
            "avojeez000: who are you androgino u keep finding me<br/>\
            androgino: i keep you bringin sideways<br/>\
            avoJeez000: keep bringin heat, packin, ganna drive u to m00n.<br/>\
            avoJeez000: $$$ bring me cereal prob capn crunch make it good.<br/>\
            androgino: nah u aint got it @avojeez0 bs i saw u dont even lyk @astros<br/>\
            avoJeez000: HOW DARE U ANDROGINO I <33333 @astros what F u knx<br/>\
            "
          ],
          typeSpeed: 80,
          showCursor: false
        });
      }
    });
  },
  render: function() {
    return (
      <div className='avojeez0-bio'>
        <h1 ref='header'></h1>
        <p ref='p'></p>
      </div>
    )
  }
})

module.exports = Bio
