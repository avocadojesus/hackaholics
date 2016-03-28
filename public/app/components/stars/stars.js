var React = require('react')
var ReactDOM = require('react-dom')
var THREE = require('three')
require('./stars.less')

var Stars = React.createClass({
  displayName: 'Stars',
  componentDidMount: function() {
    this.node = ReactDOM.findDOMNode(this)
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 5;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({alpha: true});
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.stars = []

    this.__addStar()
    this.__starAnimationLoop()
    this.node.appendChild(this.renderer.domElement);
  },
  render: function() {
    return (
      <div className='stars-component'></div>
    )
  },
  __addStar: function() {
    // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
    for ( var z= -1000; z < 1000; z+=20 ) {
      // Make a sphere (exactly the same as before).
      var geometry = new THREE.SphereGeometry(0.5, 32, 32)
      var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
      var sphere = new THREE.Mesh(geometry, material)

      // This time we give the sphere random x and y positions between -500 and 500
      sphere.position.x = Math.random() * 1000 - 500;
      sphere.position.y = Math.random() * 1000 - 500;

      sphere.position.z = z; // Then set the z position to where it is in the loop (distance of camera)
      sphere.scale.x = sphere.scale.y = 1.2; // scale it up a bit
      this.scene.add(sphere); //add the sphere to the scene
      this.stars.push(sphere); //finally push it to the stars array
    }
  },
  __starAnimationLoop: function() {
    requestAnimationFrame(this.__starAnimationLoop);
    this.renderer.render(this.scene, this.camera);
    this.__animateStars();
  },
  __animateStars: function() {
    this.stars.map(function(star, i) {
      star.position.z += (i / 350); // and move it forward dependent on the mouseY position.
      if (star.position.z > 1000) star.position.z -= 2000; // if the particle is too close move it to the back
      return star
    })
  }
})

module.exports = Stars
