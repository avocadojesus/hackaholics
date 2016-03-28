var AppDispatcher = require('../dispatchers/app-dispatcher');
var appConstants = require('../constants/app-constants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';
var _store;
var addItem = function(item){
  _store.list.push(item);
};
var removeItem = function(index){
  _store.list.splice(index, 1);
}
var initStore = function() {
  _store = {
    list: []
  };
}

initStore()

var commandStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  get: function(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case appConstants.CREATE_COMMAND:
      addItem(action.data);
      commandStore.emit(CHANGE_EVENT);
      break;
    case appConstants.DELETE_ALL_COMMANDS:
      initStore()
      commandStore.emit(CHANGE_EVENT);
      break;
    case appConstants.DELETE_LAST_COMMAND:
      _store.list.pop()
      commandStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = commandStore;
