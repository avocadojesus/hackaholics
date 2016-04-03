var GithubAdaptor = require('../adaptors/github')
var Git = require('github')
var shell = require('shelljs')

exports.handleWebhook = function(req, res) { 
  //var parsed = GithubAdaptor.parseEventData(req.body)
  //if (!parsed) return console.log('failed to parse event data')
  //console.log('parsed: ', parsed)
  
  // if the event was a push
  //if (parsed.events.indexOf('push') > -1) {
    //console.log('executing ' + __dirname + '/../scripts/git-pull.sh')
    shell.exec('git pull origin development', function(code, output) {
      console.log(code, output)
      shell.exec('gulp', function(code, output) {
        console.log(code, output)
      })
    })
  //}
}
