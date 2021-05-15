//vaxInit({ antialias: true, alpha: true });
vaxInitParallax({ antialias: true, alpha: true });
camera.position.set(0, 0, 0);
let data = {
    alpha: 50,
    beta: 25,
    gamma: 90,
};
const radius = 100;

const boxGeom = new THREE.BoxBufferGeometry(400, 400, 400);
const planeG = new THREE.BoxBufferGeometry(1000, 1000, 1);
const coneG = new THREE.CylinderGeometry(1, 10, 10, 32);

const boxTexture = new THREE.TextureLoader().load("textures/starts.jpg");
boxTexture.wrapS = THREE.RepeatWrapping;
boxTexture.wrapT = THREE.RepeatWrapping;
boxTexture.repeat.set(1, 1);

const material = new THREE.MeshBasicMaterial({
    map:boxTexture,
    side: THREE.DoubleSide
});

const coneMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const box = new THREE.Mesh(boxGeom, material);

for (let i = 0; i < 100; i++) {
    let cone = new THREE.Mesh(coneG, coneMaterial);
    cone.position.x += i * 100;
}
scene.add(box);

window.addEventListener("deviceorientation", deviceOrientation, true);
function deviceOrientation(event) {

    let alpha = event.alpha,
        gamma = event.gamma;

    if (alpha === null) return;

    if (gamma >= 0) {
        gamma = 90 - gamma;
    } else {
        alpha = alpha + 180;
        gamma = -90 - gamma;
    }

    alpha = THREE.Math.degToRad(alpha);
    gamma = THREE.Math.degToRad(gamma);

    camera.rotation.set(gamma, alpha, 0, 'YZX');
}

//todo: add cones
