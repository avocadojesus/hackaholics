var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;
var HomeController = require('./controllers/home-controller');
require('./app.less');

window.onload = function() {
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route component={HomeController} locales={['en-US']} name='home' path='/'/>
    </Router>
  ), document.querySelector('#app-target'));
}
