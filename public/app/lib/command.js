var _ = require('lodash')

var Command = function(args) {
  this.args = args
  this.input = args
  this.options = {}
}

Command.prototype.expectOption = function(flag, label) {
  this.options[flag] = {
    label: label || flag,
    flag: flag,
    found: this.args.indexOf(flag) > -1,
    indexes: [this.args.indexOf(flag)]
  }

  if (this.options[flag].found) _.pull(this.input, flag)
}

Command.prototype.expectOptionWithArgs = function(flag, label, num_args) {
  var self = this
  if (!flag) return false
  if (!label) label = flag
  num_args = num_args || 1

  this.options[flag] = {
    label: label,
    flag: flag,
    found: this.args.indexOf(flag) > -1,
    args: [],
    indexes: [this.args.indexOf(flag)]
  }

  if (this.options[flag].found) {
    _.pull(this.input, flag)

    for (i = 0; i < num_args; i++) {
      var arg_index = this.args.indexOf(flag) + (i + 1)
      var arg = this.args[arg_index]

      _.pull(this.input, arg)
      this.options[flag].args.push(arg)
      this.options[flag].indexes.push(arg_index)
    }
  }
}

Command.prototype.findOptionByLabel = function(label) {
  for (var i in this.options) {
    var opt = this.options[i]
    if (opt.label === label && opt.found) return opt
  }

  return false
}

module.exports = Command
