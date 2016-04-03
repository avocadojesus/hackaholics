var config = require('./application')
var port = config.port || 3069
var PagesController = require('../app/controllers/pages')
var GithubController = require('../app/controllers/github')

exports.init = function(app) {
  app.post('/github', function(req, res) {
    GithubController.handleWebhook(req, res)
  })
  app.get('*', function(req, res) {
    return PagesController.home(req, res)
  });

  app.listen(port);
  console.log('Hackaholics is waiting on ' + port)
}
