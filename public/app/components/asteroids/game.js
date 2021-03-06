var THREE = require('three')
var Detector = require('./Detector')
var Stats = require('./stats.min.js')
require('./CopyShader')
require('./EffectComposer')
require('./FilmPass')
require('./FilmShader')
require('./FlyControls')
require('./MaskPass')
require('./RenderPass')
require('./ShaderPass')

var asteroids_loop; // used for animation frame
var radius = 6371;
var tilt = 0.41;
var rotationSpeed = 0.02;

var cloudsScale = 1.005;
var moonScale = 0.23;

var MARGIN = 0;
var SCREEN_HEIGHT = window.innerHeight - MARGIN * 2;
var SCREEN_WIDTH  = window.innerWidth;

var container, stats;
var camera, controls, scene, sceneCube, renderer;
var geometry, meshPlanet, meshClouds, meshMoon;
var dirLight, pointLight, ambientLight;

var textureLoader = new THREE.TextureLoader();

var d, dPlanet, dMoon, dMoonVec = new THREE.Vector3();

var clock = new THREE.Clock();

exports.start = function() {
  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  init();
  animate();

  function init() {
    container = document.getElementById('asteroids-game-container');

    camera = new THREE.PerspectiveCamera( 25, SCREEN_WIDTH / SCREEN_HEIGHT, 50, 1e7 );
    camera.position.z = radius * 5;

    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2( 0x000000, 0.00000025 );

    controls = new THREE.FlyControls( camera );

    controls.movementSpeed = 1000;
    controls.domElement = container;
    controls.rollSpeed = Math.PI / 24;
    controls.autoForward = false;
    controls.dragToLook = false;

    dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.position.set( -1, 0, 1 ).normalize();
    scene.add( dirLight );

    var materialNormalMap = new THREE.MeshPhongMaterial( {
      specular: 0x333333,
      shininess: 15,
      map: textureLoader.load( "/app/components/asteroids/earth_atmos_2048.jpg" ),
      specularMap: textureLoader.load( "/app/components/asteroids/earth_specular_2048.jpg" ),
      normalMap: textureLoader.load( "/app/components/asteroids/earth_normal_2048.jpg" ),
      normalScale: new THREE.Vector2( 0.85, 0.85 )
    });

    // planet

    geometry = new THREE.SphereGeometry( radius, 100, 50 );

    meshPlanet = new THREE.Mesh( geometry, materialNormalMap );
    meshPlanet.rotation.y = 0;
    meshPlanet.rotation.z = tilt;
    scene.add( meshPlanet );

    // clouds

    var materialClouds = new THREE.MeshLambertMaterial( {

      map: textureLoader.load( "/app/components/asteroids/earth_clouds_1024.png" ),
      transparent: true

    } );

    meshClouds = new THREE.Mesh( geometry, materialClouds );
    meshClouds.scale.set( cloudsScale, cloudsScale, cloudsScale );
    meshClouds.rotation.z = tilt;
    scene.add( meshClouds );

    // moon
    var materialMoon = new THREE.MeshPhongMaterial( {
      map: textureLoader.load( "/app/components/asteroids/moon_1024.jpg" )
    });

    meshMoon = new THREE.Mesh( geometry, materialMoon );
    meshMoon.position.set( radius * 5, 0, 0 );
    meshMoon.scale.set( moonScale, moonScale, moonScale );
    scene.add( meshMoon );

    // stars

    var i, r = radius, starsGeometry = [ new THREE.Geometry(), new THREE.Geometry() ];

    for ( i = 0; i < 250; i ++ ) {

      var vertex = new THREE.Vector3();
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.multiplyScalar( r );

      starsGeometry[ 0 ].vertices.push( vertex );

    }

    for ( i = 0; i < 1500; i ++ ) {

      var vertex = new THREE.Vector3();
      vertex.x = Math.random() * 2 - 1;
      vertex.y = Math.random() * 2 - 1;
      vertex.z = Math.random() * 2 - 1;
      vertex.multiplyScalar( r );

      starsGeometry[ 1 ].vertices.push( vertex );

    }

    var stars;
    var starsMaterials = [
      new THREE.PointsMaterial( { color: 0x555555, size: 2, sizeAttenuation: false } ),
      new THREE.PointsMaterial( { color: 0x555555, size: 1, sizeAttenuation: false } ),
      new THREE.PointsMaterial( { color: 0x333333, size: 2, sizeAttenuation: false } ),
      new THREE.PointsMaterial( { color: 0x3a3a3a, size: 1, sizeAttenuation: false } ),
      new THREE.PointsMaterial( { color: 0x1a1a1a, size: 2, sizeAttenuation: false } ),
      new THREE.PointsMaterial( { color: 0x1a1a1a, size: 1, sizeAttenuation: false } )
    ];

    for ( i = 10; i < 30; i ++ ) {

      stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

      stars.rotation.x = Math.random() * 6;
      stars.rotation.y = Math.random() * 6;
      stars.rotation.z = Math.random() * 6;

      s = i * 10;
      stars.scale.set( s, s, s );

      stars.matrixAutoUpdate = false;
      stars.updateMatrix();

      scene.add( stars );

    }

    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    renderer.sortObjects = false;

    renderer.autoClear = false;

    container.appendChild( renderer.domElement );

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );

    window.addEventListener( 'resize', onWindowResize, false );

    // postprocessing

    var renderModel = new THREE.RenderPass( scene, camera );
    var effectFilm = new THREE.FilmPass( 0.35, 0.75, 2048, false );

    effectFilm.renderToScreen = true;

    composer = new THREE.EffectComposer( renderer );

    composer.addPass( renderModel );
    composer.addPass( effectFilm );
  }

  function onWindowResize( event ) {
    SCREEN_HEIGHT = window.innerHeight;
    SCREEN_WIDTH  = window.innerWidth;

    renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );

    camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
    camera.updateProjectionMatrix();

    composer.reset();
  }

  function animate() {
    asteroids_loop = requestAnimationFrame( animate );
    render();
    stats.update();
  }

  function render() {
    // rotate the planet and clouds
    var delta = clock.getDelta();
    meshPlanet.rotation.y += rotationSpeed * delta;
    meshClouds.rotation.y += 1.25 * rotationSpeed * delta;

    // slow down as we approach the surface
    dPlanet = camera.position.length();
    dMoonVec.subVectors( camera.position, meshMoon.position );
    dMoon = dMoonVec.length();

    if ( dMoon < dPlanet ) {
      d = ( dMoon - radius * moonScale * 1.01 );
    } else {
      d = ( dPlanet - radius * 1.01 );
    }

    controls.movementSpeed = 0.33 * d;
    controls.update( delta );

    renderer.clear();
    composer.render( delta );
  }
}

exports.stop = function() {
  cancelAnimationFrame(asteroids_loop);// Stop the animation
  scene = null;
  camera = null;
  controls = null;
  container.innerHTML = ''
}
