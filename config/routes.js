var config = require('./application')
var port = config.port || 3069
var socket_port = config.socket_port || 3070
var PagesController = require('../app/controllers/pages')
var GithubController = require('../app/controllers/github')

exports.init = function(app) {
  app.post('/github', function(req, res) {
    GithubController.handleWebhook(req, res)
  })
  app.get('/', function(req, res) {
    return PagesController.home(req, res)
  });
}

exports.initSocket = function(io, http) {
  io.on('connection', function(socket) {
    io.emit('/chat-message', 'hello birld')
  })

  http.listen(port)
  console.log('Hackaholics is waiting on ' + port)
}
