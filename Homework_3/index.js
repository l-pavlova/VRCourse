vaxInitParallax();

let data = {
    alpha: 50,
    beta: 25,
    gamma: 90,
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

    time = Date.now();
    if(time - oldTime > 100)
    {
        camera.rotation.x = data.alpha;
        camera.rotation.y = data.beta;
        camera.rotation.z = -90;
        oldTime = time;//set camera orientation face us
       // camera.updateMatrixWorld();
    }
    //scene.simulate(1 / 50);

   
}