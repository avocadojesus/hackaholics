var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var routes = require('./config/routes');
var config = require('./config/application')
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static('public'));

routes.initSocket(io, http)
routes.init(app)
