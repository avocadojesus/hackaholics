var AppDispatcher = require('../dispatchers/app-dispatcher')
var appConstants = require('../constants/app-constants')

exports.create = function(command) {
  AppDispatcher.handleAction({
    actionType: appConstants.CREATE_COMMAND,
    data: command
  });
}

exports.deleteAll = function() {
  AppDispatcher.handleAction({
    actionType: appConstants.DELETE_ALL_COMMANDS
  });
}
