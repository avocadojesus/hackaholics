var GithubAdaptor = require('../adaptors/github')
var Git = require('github')
var shell = require('shelljs')

exports.handleWebhook = function(req, res) { 
  shell.exec('git pull origin development', function(code, output) {
    console.log(code, output)
    shell.exec('gulp build', function(code, output) {
      console.log(code, output)
    })
  })
}
