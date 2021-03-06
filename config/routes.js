var config = require('./application')
var port = config.port || 3069
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
    socket.on('/client/chat_message', function(message) {
      io.emit('/server/chat_message', message)
    })

    socket.on('/client/broadcast_command', function(command) {
      io.emit('/server/broadcast_command', command)
    })
  })

  http.listen(port)
  console.log('Hackaholics is waiting on ' + port)
}
