var React = require('react')
var Bio = require('./alxdna')

exports.name = "alxdna"
exports.description = "what happens when you mix \"alx\" with \"dna\"?"
exports.bio = function() {
  return <Bio />
}
