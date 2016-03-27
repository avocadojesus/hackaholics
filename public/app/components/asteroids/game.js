var THREE = window.THREE = require('three')
console.log(THREE)
window.THREEx = {}
var $ = require('jquery')
var SpaceShips = require('./assets/threex.spaceships/threex.spaceships.js')
var WIDTH = 0
var HEIGHT = 0
var renderer = new THREE.WebGLRenderer()
var camera = new THREE.PerspectiveCamera(45, 1.6, 1, 600)
var scene = new THREE.Scene();
var active_lasers = []
var ship
scene.add(camera);
camera.position.z = 320;

function setup() {
  draw();
}
function draw() {
  renderer.render(scene, camera);
  requestAnimationFrame(draw);
  laserPhysics()
}
function laserPhysics() {
  var ballDirX = 1, ballDirY = 1, ballSpeed = 2;
  active_lasers.map(function(laser, i) {
    laser.position.x += ballDirX * ballSpeed;
    laser.position.y += ballDirY * ballSpeed;
  })
}
function fire() {
  var radius = 5
  var segments = 6
  var rings = 6

  // create the sphere's material
  var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xD43001});

  // Create a ball with sphere geometry
  var laser = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, rings),
    sphereMaterial
  );

  scene.add(laser)
  active_lasers.push(laser)

  // // create a point light
  pointLight = new THREE.PointLight(0xF8D898);

  // set its position
  pointLight.position.x = -1000;
  pointLight.position.y = 0;
  pointLight.position.z = 1000;
  pointLight.intensity = 2.9;
  pointLight.distance = 10000;

  // add to the scene
  scene.add(pointLight);
}

exports.start = function(container) {
  var self = this
  setup()
  WIDTH = $(container).width()
  HEIGHT = $(container).height()
  renderer.setSize(WIDTH, HEIGHT)
  container.appendChild(renderer.domElement)

  SpaceShips.loadSpaceFighter01(function(object3d){
    // object3d is the loaded spacefighter
    // now we add it to the scene
    scene.add(object3d)
  })

  document.addEventListener("keyup", function(e) {
    switch (e.which) {
      case 32: // space
        fire()
        break;
    }
  }, false);
}
