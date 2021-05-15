vaxInitParallax({ antialias: true, alpha: true });
camera.position.set(0, 0, 0);
let data = {
    alpha: 50,
    beta: 25,
    gamma: 90,
};

const boxSize = 1200;

const boxGeom = new THREE.BoxBufferGeometry(boxSize, boxSize, boxSize);
const coneG = new THREE.CylinderGeometry(1, 20, 40, 42);

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
//generate cones inside the cube
for (let i = 0; i < 500; i++) {
    const coneMaterial = new THREE.MeshBasicMaterial({ color: THREE.Math.randInt(0, 0xFFFFFF) });
    const cone = new THREE.Mesh(coneG, coneMaterial);

    const r = boxSize / 2 - 10;//so they are inside the cube
    a = THREE.Math.randFloat(0, 2 * Math.PI),
        b = THREE.Math.randFloat(0, Math.PI);
    cone.position.setFromSphericalCoords(r, b, a);

    scene.add(cone);
}
let time = 0,
    oldTime = 0;
window.addEventListener("deviceorientation", (event) => {

    time = Date.now();
    if (time > oldTime + 50) {
        oldTime = time;
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

}, true);
