vaxInit();
//planet with threes
const earthGeom = new THREE.SphereGeometry(35, 20, 20);
const threeGeom = new THREE.IcosahedronBufferGeometry(7);
const stemGeom = new THREE.CylinderGeometry(1, 2, 17);

const earthMat =  new THREE.MeshLambertMaterial({ color: 'brown' });
const greenMat =  new THREE.MeshLambertMaterial({ color: 'green' });
// планета
const planet = new THREE.Mesh(
    earthGeom,
    earthMat
);
const stem = new THREE.Mesh(stemGeom, earthMat);
stem.position.y = 42.5;
const crown = new THREE.Mesh(threeGeom, greenMat);

crown.position.y = 48;
scene.add(planet);

const masterThree = new THREE.Group();
masterThree.add(stem, crown);

for(let i=0; i<100; i++){
    let three = masterThree.clone();
    three.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, Math.random()*Math.PI);
    planet.add(three);
}

function animate() {
    planet.rotation.y = t / 2;
}