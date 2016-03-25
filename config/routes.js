var config = require('./application')
var port = config.port || 3069

exports.init = function(app) {
  app.get('*', function(req, res) {
    res.render('index');
  });

  app.listen(port);
  console.log('Hackaholics is waiting on ' + port)
}
