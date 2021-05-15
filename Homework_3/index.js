vaxInitParallax();

let data = {
    alpha: 50,
    beta: 25,
    gamma: 90,
};
const radius = 100;

const boxGeom = new THREE.BoxBufferGeometry(400, 400, 400);
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
const dragFactor=0.2;
let time = 0,
    oldTime = 0;

window.addEventListener("deviceorientation", deviceOrientation, true);

function deviceOrientation(event) {

    data.alpha = event.alpha;//THREE.Math.degToRad( event.alpha ),
    data.beta = event.beta;//THREE.Math.degToRad( event.beta ),
    data.gamma = event.gamma;//THREE.Math.degToRad( event.gamma );
}
camera.position.set(0, 0, 0);

//todo: add cones
function animate() {

    const phi = THREE.Math.degToRad(90 - data.alpha);
    const theta = THREE.Math.degToRad(data.beta);

    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.cos(phi);
    let z = radius * Math.sin(phi) * Math.sin(theta);
    camera.lookAt(new THREE.Vector3(x, y,z))//todo: figure out how to make them normalized
}