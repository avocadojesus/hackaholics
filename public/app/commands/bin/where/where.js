var config = require('../../../config.js')

exports.name = "where"
exports.description = "Discloses the location of the meetup"
exports.execute = function(args) {
  if (expectOption('-h', args) || expectOption('--help', args)) return this.help()
  return config.address
}
exports.help = function() {
  return [
    <Ascii key={0} value={this.name} font='bell'/>,
    <Markdown file={'/app/commands/bin/' + this.name + '/help.md'}/>
  ]
}
