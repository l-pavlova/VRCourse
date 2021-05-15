//vaxInit({ antialias: true, alpha: true });
vaxInitParallax({ antialias: true, alpha: true });
camera.position.set(0, 0, 0);
let data = {
    alpha: 50,
    beta: 25,
    gamma: 90,
};
const radius = 100;

const boxGeom = new THREE.BoxBufferGeometry(800, 800, 800);
const planeG = new THREE.BoxBufferGeometry(1000, 1000, 1);
const coneG = new THREE.CylinderGeometry(1, 10, 30, 32);

const boxTexture = new THREE.TextureLoader().load("textures/starts.jpg");
boxTexture.wrapS = THREE.RepeatWrapping;
boxTexture.wrapT = THREE.RepeatWrapping;
boxTexture.repeat.set(1, 1);

const material = new THREE.MeshBasicMaterial({
    map: boxTexture,
    side: THREE.DoubleSide
});

const box = new THREE.Mesh(boxGeom, material);

scene.add(box);

for (let i = 0; i < 500; i++) {
    const coneMaterial = new THREE.MeshBasicMaterial({ color: THREE.Math.randInt(0, 0xFFFFFF)});
    const cone = new THREE.Mesh(coneG, coneMaterial);

    const r = 390;//so they are inside the cube
        a = THREE.Math.randFloat(0, 2 * Math.PI),
        b = THREE.Math.randFloat(0, Math.PI);
    cone.position.setFromSphericalCoords(r, b, a);

    scene.add(cone);
}

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
