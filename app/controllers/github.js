var GithubAdaptor = require('../adaptors/github')
var Git = require('github')

exports.handleWebhook = function(req, res) { 
  var parsed = GithubAdaptor.parseEventData(req.body)
  console.log('parsed: ', parsed)
  
  // if the event was a push
  if (parsed.events.indexOf('push') > -1) {
    console.log('executing ' + __dirname + '/../scripts/git-pull.sh')
    execFile(__dirname + '/../scripts/git-pull.sh')
  }
}
