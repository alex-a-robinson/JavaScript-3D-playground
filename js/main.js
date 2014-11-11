//js

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth
                    / window.innerHeight, 0.1, 1000);

var directionalLight = new THREE.DirectionalLight(0x101010, 0.5);
directionalLight.castShadow = true;
directionalLight.shadowDarkness = 0.5;
directionalLight.shadowCameraVisible = true;
scene.add(directionalLight);


var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

// Add cube
var geometry = new THREE.BoxGeometry(50, 50, 50);
var material = new THREE.MeshBasicMaterial( {color: '#00FF00'} );
var cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

// Add Grid
var size = 500,
    step = 50;

var geometry = new THREE.Geometry();

for (var i = -size; i <= size; i += step) {
    geometry.vertices.push( new THREE.Vector3(-size, 0, i));
    geometry.vertices.push( new THREE.Vector3( size, 0, i));

    geometry.vertices.push( new THREE.Vector3( i, 0, -size));
    geometry.vertices.push( new THREE.Vector3( i, 0,  size));
}

var material = new THREE.LineBasicMaterial({color: '#FFFFFF'});

var line = new THREE.Line(geometry, material, THREE.LinePieces);
scene.add(line);

camera.position.z = 500;

directionalLight.position.z = 500;

line.rotation.x = 0.2;
cube.rotation.x = 0.2;
cube.rotation.y = 1;
cube.position.y += 50;


function render() {
    requestAnimationFrame(render);
    //cube.rotation.x += 0.01;
    renderer.render(scene, camera);
    //line.rotation.x += 0.01;
}

render()
