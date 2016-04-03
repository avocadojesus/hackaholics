var React = require('react')
var Bio = require('./avojeez0-bio')

exports.name = <span style={{color: 'red'}}>avojeez0</span>
exports.description = "tries hard and often has teh failz"
exports.bio = function() {
  return <Bio />
}
