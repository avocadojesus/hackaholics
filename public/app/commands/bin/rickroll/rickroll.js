var React = require('react')
var YouTube = require('react-youtube').default
var $ = require('jquery')

  // // Video from Youtube
  // React.render(
  //   <Video from='youtube' videoId={videoId} />,
  //   $mountNode
  // );
  //
  // // Video from Vimeo
  // React.render(
  //   <Video from='vimeo' videoId={videoId} />,
  //   $mountNode
  // );

exports.name = "rickroll"
exports.description = "i think you know what this will do"
exports.execute = function() {
  var opts = {
    width: $(window).width(),
    height: $(window).height(),
    playerVars: {
      autoplay: 1
    }
  };
  return <YouTube videoId="oHg5SJYRHA0" opts={opts} />
}
