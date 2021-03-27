vaxInit();

const groundGeom = new THREE.BoxGeometry(100, 100, 2);
const cg = new THREE.CylinderGeometry(2, 2, 80);
const cgg = new THREE.CylinderGeometry(1, 1, 20);
const dark = new THREE.MeshLambertMaterial({ color: 'gray' });

const ground = new THREE.Mesh(groundGeom, dark);
const first = new THREE.Mesh(cg, dark);
const second = new THREE.Mesh(cgg, dark);

ground.rotation.set(90, 0, 0);
first.rotation.set(90, 0, 0);
first.position.set(0, 5, 0);

second.rotation.set(90, 0, 0);
second.position.set(0, 5, 0);


scene.add(first);
first.add(second);

scene.add(ground);

function animate() {
    first.rotation.y += 0.1;
    second.position.y += 0.1;
}