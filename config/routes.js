var config = require('./application')
var port = config.port || 3069
var PagesController = require('../app/controllers/pages')

exports.init = function(app) {
  app.get('*', function(req, res) {
    return PagesController.home(req, res)
  });

  app.listen(port);
  console.log('Hackaholics is waiting on ' + port)
}
