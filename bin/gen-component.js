// bin/gen-component.js
// generates a new component using the prompt

var fs = require('fs')
var prompt = require('prompt');
prompt.start();

prompt.get(['component-name'], function (err, result) {
  if (err) { return onErr(err); }
  // captures the name of the component, replacing spaces with dashes (i.e. hello-world)
  var component_name = result['component-name'].replace(/\s/g, '-').toLowerCase()
  // captures the class name of the component, i.e. HelloWorld
  var component_class = component_name.replace(/-([a-z])/g, function(v) { return v.replace(/-/, '').toUpperCase() })
  component_class = component_class.charAt(0).toUpperCase() + component_class.substring(1)

  var template_file_location = __dirname + '/../public/app/templates/component.js'
  var dir = __dirname + '/../public/app/components/' + component_name
  var file = __dirname + '/../public/app/components/' + component_name + '/' + component_name + '.js'
  var index_file = __dirname + '/../public/app/components/' + component_name + '/index.js'
  var less_file = __dirname + '/../public/app/components/' + component_name + '/' + component_name + '.less'
  var index_contents = 'module.exports = require("./' + component_name + '")'
  var less_contents = '@import "../../config.less";'


  fs.mkdir(dir, function(e) {
    if (e) return console.error(e)
    console.log('reading template file: ' + template_file_location)

    // capture content from template file
    var content = fs.readFileSync(template_file_location, 'utf8')
    if (!content) return console.error('Failed to read template file')

    // replace content with relevant vars
    content = content.replace(/{{component_name}}/g, component_name)
    content = content.replace(/{{component_class}}/g, component_class)

    // write main file
    fs.writeFile(file, content, function(err) {
      if (err) return console.error(err)
      console.log('made command file: ' + file)
    })
    // write index file
    fs.writeFile(index_file, index_contents, function(err) {
      if (err) return console.error(err)
      console.log('made index file: ' + index_file)
    })
    // write .less file
    fs.writeFile(less_file, less_contents, function(err) {
      if (err) return console.error(err)
      console.log('made less file: ' + less_file)
    })
  })
});
