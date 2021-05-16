//todo:
//1.create the cube
//2. add crystals
vaxInit({ antialias: true, alpha: true });
const color = 0xFFFFFF;
const intensity = 2;
const secondLight = new THREE.DirectionalLight(color, intensity);
secondLight.position.set(-1, 2, 4);
scene.add(secondLight);
const thirdLight = new THREE.DirectionalLight(color, intensity);
thirdLight.position.set(1, -1, -2);
scene.add(thirdLight);

camera.fov = 25;
camera.near = 400;
camera.far = 3000;

const crystalGeom = new THREE.OctahedronGeometry(20, 1);

scene.background = new THREE.CubeTextureLoader().load([
    'rainbow/posx.jpg', 'rainbow/negx.jpg',
    'rainbow/posy.jpg', 'rainbow/negy.jpg',
    'rainbow/posz.jpg', 'rainbow/negz.jpg']);

const textureCrystal = new THREE.CubeTextureLoader().load([
    'rainbow/posx.jpg', 'rainbow/negx.jpg',
    'rainbow/posy.jpg', 'rainbow/negy.jpg',
    'rainbow/posz.jpg', 'rainbow/negz.jpg']);
textureCrystal.mapping = THREE.CubeRefractionMapping;

const crystalMaterial = new THREE.MeshBasicMaterial({ color: "white", envMap: textureCrystal, refractionRatio: 0.95, side: THREE.DoubleSide });

//crystals 
const crystals = [];

for (let i = 0; i < 300; i++) {
    const crystal = new THREE.Mesh(crystalGeom, crystalMaterial);

    const r = THREE.Math.randFloat(600, 1000);  //so they are inside the cube
    a = THREE.Math.randFloat(0, 2 * Math.PI),
        b = THREE.Math.randFloat(0, Math.PI);
    crystal.position.setFromSphericalCoords(r, b, a);
    crystals.push(crystal);
    scene.add(crystal);
}
let time = 0,
    oldTime = 0;

window.addEventListener("deviceorientation", (event) => {

    time = Date.now();//to try to remove shivering, take new angles at an interval of 50 miliseconds
  //  if (time > oldTime + 50) {
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
//    }

}, true);

/*onWindowResize();

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.minPolarAngle = 0.1;
controls.maxPolarAngle = Math.PI - 0.1;
controls.dampingFactor = 0.1;
*/
function animate() {
    for (let i = 0; i < 100; i++)
        crystals[i].rotation.y = t + i;

    // controls.update();
}