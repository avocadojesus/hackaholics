exports.parseEventData = function(event) {
  var data = {}
  if (!event.hook) return false
  if (!event.hook.events) return false

  data.events = event.hook.events
  return data
}
