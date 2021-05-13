vaxInitParallax();

let data = {
    alpha: 50,
    beta: 25,
    gamma: 50,
};
const radius = 100;

const boxGeom = new THREE.BoxBufferGeometry(100, 100, 100);
const planeG = new THREE.BoxBufferGeometry(1000, 1000, 1);
const material = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0.3,
    shininess: 200,
    side: THREE.DoubleSide
});

const box = new THREE.Mesh(boxGeom, material);
const plane = new THREE.Mesh(planeG, material);
plane.rotation.x = Math.PI / 2;

//scene.add(plane);
scene.add(box);


window.addEventListener("deviceorientation", deviceOrientation, true);

function deviceOrientation(event) {

    data.alpha = event.alpha;//THREE.Math.degToRad( event.alpha ),
    data.beta = event.beta;//THREE.Math.degToRad( event.beta ),
    data.gamma = event.gamma;//THREE.Math.degToRad( event.gamma );
}

//todo: add cones
function animate() {

    scene.simulate(1 / 50);
    camera.position.set(0, 0, 0);
    
    camera.rotation.x = data.alpha;
    camera.rotation.y = data.beta;
    camera.rotation.z = 0;//data.gamma;
    camera.updateMatrixWorld();
}