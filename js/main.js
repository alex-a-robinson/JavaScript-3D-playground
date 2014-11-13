var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth
                    / window.innerHeight, 0.1, 1000);

// Initialise renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.setClearColor(new THREE.Color('#EEEEEE', 1.0));
document.body.appendChild(renderer.domElement);

// Add light
var spotLight = new THREE.SpotLight('#FFFFFF');
spotLight.position.set(0, 100, 0);
spotLight.castShadow = true;
spotLight.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(spotLight);

// Add cube
var geometry = new THREE.BoxGeometry(5, 5, 5);
var material = new THREE.MeshLambertMaterial( {color: '#00FF00'} );

var size = {'x': 15, 'z': 15};
var width = 6;
var depth = 6;
var randRange = 3;

var cubes =  [];

for (var x = - (size['x'] * width) / 2; x < (size['x'] * width) / 2; x += width) {
    for (var z = - (size['z'] * depth) / 2; z < (size['z'] * depth) / 2; z += depth) {
        var cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.position.x = x;
        cube.position.y = Math.floor(Math.random() * randRange);
        cube.position.z = z;
        scene.add(cube);
        cubes.push(cube);
    }
}


camera.position.y = 150;
camera.position.x = 100;
camera.position.z = 100;
camera.lookAt(new THREE.Vector3(0, 0, 0));

var updatePercent = 0;

function render() {
    requestAnimationFrame(render);

    for (var i = 0;i < cubes.length; i++) {
        if (Math.random() > updatePercent) {
            if (Math.random() > 0.5) {
                cubes[i].position.y -= 1;
            } else {
                cubes[i].position.y += 1;
            }
        }
    }

    renderer.render(scene, camera);
}

render();
