var React = require('react')
var Bio = require('./bio')

exports.name = "Charlie"
exports.description = "likes software projects that help people"
exports.bio = function() {
  return <Bio/>;
}
