var AppDispatcher = require('../dispatchers/app-dispatcher')
var appConstants = require('../constants/app-constants')

exports.create = function(command, opts) {
  AppDispatcher.handleAction({
    actionType: appConstants.CREATE_COMMAND,
    data: {text: command, opts: opts || {}}
  });
}

exports.deleteAll = function() {
  AppDispatcher.handleAction({
    actionType: appConstants.DELETE_ALL_COMMANDS
  });
}

exports.deleteLast = function() {
  AppDispatcher.handleAction({
    actionType: appConstants.DELETE_LAST_COMMAND
  });
}
