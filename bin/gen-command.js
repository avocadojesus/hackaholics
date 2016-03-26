// bin/gen-command.js
// generates a new command using the prompt

var fs = require('fs')
var prompt = require('prompt');
prompt.start();

prompt.get(['command-name', 'short-description'], function (err, result) {
  if (err) { return onErr(err); }
  var command_name = result['command-name'].replace(/\s/g, '-')
  var description = result['short-description']
  var file = __dirname + '/../public/app/commands/bin/' + command_name + '.js'
  var contents = "exports.name = \"" + command_name + "\"\n"
  var contents = contents + "exports.description = \"" + description + "\"\n"
  var contents = contents + "exports.execute = function() {\n\n}"

  fs.stat(file, function(err, stat) {
    if (!err) return console.error('the command "' + file + '" already exists. please choose another name')
    fs.writeFile(file , contents, function(err) {
      if (err) return console.error(err)
      console.log('made file: ' + file)
    })
  });
});
