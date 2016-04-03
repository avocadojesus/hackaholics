// bin/gen-command.js
// generates a new command using the prompt

var fs = require('fs')
var prompt = require('prompt');
prompt.start();

prompt.get(['command-name', 'short-description'], function (err, result) {
  if (err) { return onErr(err); }
  var command_name = result['command-name'].replace(/\s/g, '-')
  var description = result['short-description']

  var template_file_location = __dirname + '/../public/app/templates/commands/command.js'
  var dir = __dirname + '/../public/app/commands/bin/' + command_name
  var file = __dirname + '/../public/app/commands/bin/' + command_name + '/' + command_name + '.js'
  var index_file = __dirname + '/../public/app/commands/bin/' + command_name + '/index.js'
  var help_file = __dirname + '/../public/app/commands/bin/' + command_name + '/help.md'
  var index_contents = 'module.exports = require("./' + command_name + '")'
  var help_contents = '* ' + command_name + ': ' + description + '\n'
  help_contents = help_contents + '* ' + command_name + ' -h: show help menu'
  help_contents = help_contents + '* ' + command_name + ' --help: show help menu'

  fs.mkdir(dir, function(e) {
    if (e) return console.error(e)
    console.log('reading template file: ' + template_file_location)

    // capture content from template file
    var content = fs.readFileSync(template_file_location, 'utf8')
    if (!content) return console.error('Failed to read template file')

    // replace content with relevant vars
    content = content.replace('{{name}}', command_name)
    content = content.replace('{{description}}', description)

    // write main file
    fs.writeFile(file, content, function(err) {
      if (err) return console.error(err)
      console.log('made command file: ' + file)
    })
    // write index file
    fs.writeFile(index_file, index_contents, function(err) {
      if (err) return console.error(err)
      console.log('made index file: ' + index_file)
    })
    // write help file
    fs.writeFile(help_file, help_contents, function(err) {
      if (err) return console.error(err)
      console.log('made help file: ' + help_file)
    })
  })
});
