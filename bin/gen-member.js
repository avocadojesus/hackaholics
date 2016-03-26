// bin/gen-member.js
// generates a new member using prompt

var fs = require('fs')
var prompt = require('prompt');
prompt.start();

prompt.get(['member-name', 'short-description', 'bio'], function (err, result) {
  if (err) { return onErr(err); }
  var member_name = result['member-name'].replace(/\s/g, '-')
  var description = result['short-description']
  var bio = result['bio']
  var dir = __dirname + '/../public/app/members/' + member_name
  var file = __dirname + '/../public/app/members/' + member_name + '/index.js'
  var contents = "exports.name = \"" + member_name + "\"\n"
  var contents = contents + "exports.description = \"" + description + "\"\n"
  var contents = contents + "exports.bio = function() {\n  return \"" + bio + "\"\n}"

  fs.mkdir(dir, function(e){
    if (e) return console.error(e)
    fs.writeFile(file , contents, function(err) {
      if (err) return console.error(err)
      console.log('made dir: ' + dir)
      console.log('made file: ' + file)
    })
  });
});
