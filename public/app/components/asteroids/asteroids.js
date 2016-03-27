var React = require('react')
var Phaser = require('./phaser.min.js')

var gameProperties = {
    screenWidth: 640,
    screenHeight: 480,
};

var states = {
    game: "game",
};

var gameState = function(game){

};

gameState.prototype = {

    preload: function () {

    },

    create: function () {

    },

    update: function () {

    },
};

var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.game, gameState);
game.state.start(states.game);

var Asteroids = React.createClass({
  displayName: 'Asteroids',
  render: function() {

  }
})

module.exports = Asteroids
